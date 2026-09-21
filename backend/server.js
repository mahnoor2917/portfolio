require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");

const contactRoutes = require("./routes/contact");
const distributionRoutes = require("./routes/distribution");
const trackRoutes = require("./routes/track");
const adminRoutes = require("./routes/admin");

const app = express();
app.set("trust proxy", 1); // Render/Vercel sit behind a proxy
app.disable("x-powered-by");

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// Only your own website may call the API from a browser
const allowedOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((s) => s.trim().replace(/\/$/, ""))
  .filter(Boolean);
if (process.env.NODE_ENV !== "production") {
  allowedOrigins.push("http://localhost:3000", "http://127.0.0.1:3000");
}
if (!process.env.FRONTEND_URL) {
  console.warn("Warning: FRONTEND_URL is not set - only localhost can use this API.");
}
app.use(
  cors({
    origin: (origin, cb) => cb(null, !origin || allowedOrigins.includes(origin)),
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "20kb" }));

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/distribution", distributionRoutes);
app.use("/api/track", trackRoutes);
app.use("/api/admin", adminRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Usama Asghar & Co API is running" });
});

// Bad JSON / unexpected errors
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed" || err.type === "entity.too.large") {
    return res.status(400).json({ success: false, error: "Invalid request." });
  }
  console.error(err);
  res.status(500).json({ success: false, error: "Something went wrong." });
});

if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || (process.env.JWT_SECRET || "").length < 16) {
  console.warn("Warning: ADMIN_EMAIL / ADMIN_PASSWORD / JWT_SECRET are not set correctly - admin login is disabled.");
}

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
