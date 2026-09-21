const express = require("express");
const router = express.Router();
const PageView = require("../models/PageView");
const rateLimit = require("../utils/rateLimit");
const { str } = require("../utils/clean");

const BOT_RE = /bot|crawl|spider|slurp|facebookexternalhit|preview|monitor|headless|lighthouse/i;
const limiter = rateLimit({ windowMs: 60 * 1000, max: 120 });

function deviceFrom(ua) {
  if (/ipad|tablet|kindle|silk/i.test(ua) || (/android/i.test(ua) && !/mobile/i.test(ua))) return "tablet";
  if (/mobi|iphone|ipod|android/i.test(ua)) return "mobile";
  return "desktop";
}

// POST /api/track - anonymous page-view counter (always answers 204)
router.post("/", limiter, async (req, res) => {
  try {
    let path = str(req.body.path, 200).split("?")[0].split("#")[0];
    if (path.length > 1) path = path.replace(/\/+$/, "");
    const visitorId = str(req.body.visitorId, 64).replace(/[^a-zA-Z0-9-]/g, "");
    const ua = req.get("user-agent") || "";

    if (path.startsWith("/") && !path.startsWith("/admin") && visitorId && !BOT_RE.test(ua)) {
      await PageView.create({ path, visitorId, device: deviceFrom(ua) });
    }
  } catch (err) {
    console.error("track error:", err.message);
  }
  res.status(204).end();
});

module.exports = router;
