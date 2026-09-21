const express = require("express");
const router = express.Router();
const DistributorInquiry = require("../models/DistributorInquiry");
const rateLimit = require("../utils/rateLimit");
const { str, EMAIL_RE, validPhone } = require("../utils/clean");

const TYPES = ["Retailer", "Wholesaler", "Distributor", "Foodservice", "Other"];

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: "You have sent several requests already. Please wait a few minutes or call us directly.",
});

// POST /api/distribution - public distributor / retailer interest form
router.post("/", limiter, async (req, res) => {
  try {
    const businessName = str(req.body.businessName, 150);
    const contactName = str(req.body.contactName, 100);
    const phone = str(req.body.phone, 30);
    const email = str(req.body.email, 200);
    const city = str(req.body.city, 100);
    const message = str(req.body.message, 3000);
    const businessType = TYPES.includes(req.body.businessType) ? req.body.businessType : "Retailer";
    const interestedCategories = Array.isArray(req.body.interestedCategories)
      ? req.body.interestedCategories.slice(0, 10).map((c) => str(c, 60)).filter(Boolean)
      : [];

    if (!businessName || !contactName || !phone || !city) {
      return res.status(400).json({
        success: false,
        error: "Business name, contact name, phone, and city are required.",
      });
    }
    if (!validPhone(phone)) {
      return res.status(400).json({ success: false, error: "Please enter a valid phone number." });
    }
    if (email && !EMAIL_RE.test(email)) {
      return res.status(400).json({ success: false, error: "Please enter a valid email address." });
    }

    await DistributorInquiry.create({
      businessName,
      contactName,
      phone,
      email,
      city,
      businessType,
      interestedCategories,
      message,
    });
    res.status(201).json({ success: true });
  } catch (err) {
    console.error("distribution error:", err.message);
    res.status(500).json({ success: false, error: "Could not save your request. Please try again." });
  }
});

module.exports = router;
