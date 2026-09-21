const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, maxlength: 200 },
    subject: { type: String, trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    status: {
      type: String,
      enum: ["new", "read", "replied", "archived"],
      default: "new",
    },
    notes: { type: String, trim: true, maxlength: 2000 },
  },
  { timestamps: true }
);

messageSchema.index({ createdAt: -1 });
messageSchema.index({ status: 1 });

module.exports = mongoose.model("Message", messageSchema);
