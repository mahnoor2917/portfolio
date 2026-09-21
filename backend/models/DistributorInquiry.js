const mongoose = require("mongoose");

const distributorInquirySchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true, trim: true, maxlength: 150 },
    contactName: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    email: { type: String, trim: true, maxlength: 200 },
    city: { type: String, required: true, trim: true, maxlength: 100 },
    businessType: {
      type: String,
      enum: ["Retailer", "Wholesaler", "Distributor", "Foodservice", "Other"],
      default: "Retailer",
    },
    interestedCategories: [{ type: String, maxlength: 60 }],
    message: { type: String, trim: true, maxlength: 3000 },
    status: {
      type: String,
      enum: ["new", "contacted", "onboarded", "closed"],
      default: "new",
    },
    notes: { type: String, trim: true, maxlength: 2000 },
  },
  { timestamps: true }
);

distributorInquirySchema.index({ createdAt: -1 });
distributorInquirySchema.index({ status: 1 });

module.exports = mongoose.model("DistributorInquiry", distributorInquirySchema);
