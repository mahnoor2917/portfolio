const mongoose = require("mongoose");

const pageViewSchema = new mongoose.Schema(
  {
    path: { type: String, required: true, maxlength: 200 },
    visitorId: { type: String, required: true, maxlength: 64 },
    device: { type: String, enum: ["mobile", "tablet", "desktop"], default: "desktop" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// Auto-delete page views after 180 days so the free database never fills up
pageViewSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 180 });

module.exports = mongoose.model("PageView", pageViewSchema);
