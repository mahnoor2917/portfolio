const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Message = require("../models/Message");
const DistributorInquiry = require("../models/DistributorInquiry");
const PageView = require("../models/PageView");
const requireAdmin = require("../middleware/requireAdmin");
const rateLimit = require("../utils/rateLimit");
const { safeEqual, sign } = require("../utils/auth");
const { str, escapeRegex } = require("../utils/clean");

const TZ = "Asia/Karachi";
const DAY = 24 * 60 * 60 * 1000;
const dayKey = (d) => new Date(d).toLocaleDateString("en-CA", { timeZone: TZ }); // YYYY-MM-DD

const wrap = (fn) => (req, res) =>
  Promise.resolve(fn(req, res)).catch((err) => {
    console.error("admin error:", err);
    res.status(500).json({ success: false, error: "Something went wrong." });
  });

// ---------------------------------------------------------------- login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  message: "Too many login attempts. Please wait 15 minutes and try again.",
});

router.post("/login", loginLimiter, (req, res) => {
  const { ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !JWT_SECRET || JWT_SECRET.length < 16) {
    return res.status(503).json({ success: false, error: "Admin login is not configured on the server." });
  }
  const email = str(req.body.email, 200).toLowerCase();
  const password = typeof req.body.password === "string" ? req.body.password.slice(0, 200) : "";

  const emailOk = safeEqual(email, ADMIN_EMAIL.trim().toLowerCase());
  const passOk = safeEqual(password, ADMIN_PASSWORD);
  if (!emailOk || !passOk) {
    return res.status(401).json({ success: false, error: "Wrong email or password." });
  }
  const token = sign({ role: "admin" }, JWT_SECRET, 12 * 60 * 60);
  res.json({ success: true, token });
});

// everything below needs a valid login
router.use(requireAdmin);

router.get("/me", (req, res) => res.json({ success: true }));

// ---------------------------------------------------------------- stats
router.get(
  "/stats",
  wrap(async (req, res) => {
    const now = Date.now();
    const since30 = new Date(now - 30 * DAY);

    const [
      messagesTotal,
      messagesNew,
      inquiryByStatus,
      dailyRaw,
      visitorIds,
      topPagesRaw,
      devicesRaw,
      recentMessages,
      recentInquiries,
    ] = await Promise.all([
      Message.countDocuments(),
      Message.countDocuments({ status: "new" }),
      DistributorInquiry.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      PageView.aggregate([
        { $match: { createdAt: { $gte: since30 } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt", timezone: TZ } },
            count: { $sum: 1 },
          },
        },
      ]),
      PageView.distinct("visitorId", { createdAt: { $gte: since30 } }),
      PageView.aggregate([
        { $match: { createdAt: { $gte: since30 } } },
        { $group: { _id: "$path", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 6 },
      ]),
      PageView.aggregate([
        { $match: { createdAt: { $gte: since30 } } },
        { $group: { _id: "$device", count: { $sum: 1 } } },
      ]),
      Message.find().sort({ createdAt: -1 }).limit(6).lean(),
      DistributorInquiry.find().sort({ createdAt: -1 }).limit(6).lean(),
    ]);

    // per-day series for the last 30 days (zeros filled in)
    const perDay = Object.fromEntries(dailyRaw.map((d) => [d._id, d.count]));
    const series = [];
    for (let i = 29; i >= 0; i--) {
      const key = dayKey(now - i * DAY);
      series.push({ date: key, views: perDay[key] || 0 });
    }

    const inquiries = { total: 0, new: 0, contacted: 0, onboarded: 0, closed: 0 };
    for (const row of inquiryByStatus) {
      inquiries[row._id] = row.count;
      inquiries.total += row.count;
    }

    const recent = [
      ...recentMessages.map((m) => ({
        type: "messages",
        id: String(m._id),
        title: m.name,
        sub: m.subject || m.message.slice(0, 70),
        status: m.status,
        createdAt: m.createdAt,
      })),
      ...recentInquiries.map((q) => ({
        type: "inquiries",
        id: String(q._id),
        title: q.businessName,
        sub: `${q.contactName} · ${q.city}`,
        status: q.status,
        createdAt: q.createdAt,
      })),
    ]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 8);

    res.json({
      success: true,
      data: {
        messages: { total: messagesTotal, new: messagesNew },
        inquiries,
        views: {
          today: series[series.length - 1].views,
          last7: series.slice(-7).reduce((s, d) => s + d.views, 0),
          last30: series.reduce((s, d) => s + d.views, 0),
          visitors30: visitorIds.length,
        },
        series,
        topPages: topPagesRaw.map((p) => ({ path: p._id, count: p.count })),
        devices: devicesRaw.map((d) => ({ device: d._id, count: d.count })),
        recent,
      },
    });
  })
);

// ------------------------------------------------- generic inbox helpers
function listHandler(Model, searchFields) {
  return wrap(async (req, res) => {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 15));
    const filter = {};

    const status = str(req.query.status, 20);
    if (status && Model.schema.path("status").enumValues.includes(status)) filter.status = status;

    const q = str(req.query.q, 100);
    if (q) {
      const rx = new RegExp(escapeRegex(q), "i");
      filter.$or = searchFields.map((f) => ({ [f]: rx }));
    }

    const [items, total] = await Promise.all([
      Model.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Model.countDocuments(filter),
    ]);
    res.json({ success: true, data: items, page, pages: Math.max(1, Math.ceil(total / limit)), total });
  });
}

function updateHandler(Model) {
  return wrap(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, error: "Invalid id." });
    }
    const update = {};
    const status = str(req.body.status, 20);
    if (status) {
      if (!Model.schema.path("status").enumValues.includes(status)) {
        return res.status(400).json({ success: false, error: "Invalid status." });
      }
      update.status = status;
    }
    if (typeof req.body.notes === "string") update.notes = req.body.notes.trim().slice(0, 2000);

    const doc = await Model.findByIdAndUpdate(req.params.id, { $set: update }, { new: true }).lean();
    if (!doc) return res.status(404).json({ success: false, error: "Not found." });
    res.json({ success: true, data: doc });
  });
}

function deleteHandler(Model) {
  return wrap(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, error: "Invalid id." });
    }
    const doc = await Model.findByIdAndDelete(req.params.id).lean();
    if (!doc) return res.status(404).json({ success: false, error: "Not found." });
    res.json({ success: true });
  });
}

function csvCell(value) {
  let s = Array.isArray(value) ? value.join("; ") : value == null ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; // stop spreadsheet formula injection
  return `"${s.replace(/"/g, '""')}"`;
}

function csvHandler(Model, columns, filename) {
  return wrap(async (req, res) => {
    const rows = await Model.find().sort({ createdAt: -1 }).limit(5000).lean();
    const lines = [columns.map((c) => csvCell(c.label)).join(",")];
    for (const row of rows) {
      lines.push(columns.map((c) => csvCell(c.get ? c.get(row) : row[c.key])).join(","));
    }
    res.set({
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    });
    res.send("\uFEFF" + lines.join("\r\n"));
  });
}

const when = (row) => new Date(row.createdAt).toLocaleString("en-GB", { timeZone: TZ });

// ------------------------------------------------------------ messages
router.get("/messages", listHandler(Message, ["name", "email", "subject", "message"]));
router.get(
  "/messages/export.csv",
  csvHandler(
    Message,
    [
      { label: "Date", get: when },
      { label: "Name", key: "name" },
      { label: "Email", key: "email" },
      { label: "Subject", key: "subject" },
      { label: "Message", key: "message" },
      { label: "Status", key: "status" },
      { label: "Notes", key: "notes" },
    ],
    "messages.csv"
  )
);
router.patch("/messages/:id", updateHandler(Message));
router.delete("/messages/:id", deleteHandler(Message));

// ------------------------------------------------------------ inquiries
router.get(
  "/inquiries",
  listHandler(DistributorInquiry, ["businessName", "contactName", "phone", "email", "city", "message"])
);
router.get(
  "/inquiries/export.csv",
  csvHandler(
    DistributorInquiry,
    [
      { label: "Date", get: when },
      { label: "Business", key: "businessName" },
      { label: "Contact", key: "contactName" },
      { label: "Phone", key: "phone" },
      { label: "Email", key: "email" },
      { label: "City", key: "city" },
      { label: "Type", key: "businessType" },
      { label: "Interested in", key: "interestedCategories" },
      { label: "Message", key: "message" },
      { label: "Status", key: "status" },
      { label: "Notes", key: "notes" },
    ],
    "distributor-inquiries.csv"
  )
);
router.patch("/inquiries/:id", updateHandler(DistributorInquiry));
router.delete("/inquiries/:id", deleteHandler(DistributorInquiry));

module.exports = router;
