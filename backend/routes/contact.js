const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const rateLimit = require("../utils/rateLimit");
const { str, EMAIL_RE } = require("../utils/clean");

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: "You have sent several messages already. Please wait a few minutes or call us directly.",
});

// POST /api/contact - public contact form
router.post("/", limiter, async (req, res) => {
  try {
    const name = str(req.body.name, 100);
    const email = str(req.body.email, 200);
    const subject = str(req.body.subject, 200);
    const message = str(req.body.message, 5000);

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "Name, email, and message are required." });
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ success: false, error: "Please enter a valid email address." });
    }

    await Message.create({ name, email, subject, message });
    res.status(201).json({ success: true });
  } catch (err) {
    console.error("contact error:", err.message);
    res.status(500).json({ success: false, error: "Could not save your message. Please try again." });
  }
});

module.exports = router;
