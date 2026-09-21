const { verify } = require("../utils/auth");

module.exports = function requireAdmin(req, res, next) {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 16) {
    return res.status(503).json({ success: false, error: "Admin login is not configured on the server." });
  }
  const header = req.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const payload = verify(token, secret);
  if (!payload || payload.role !== "admin") {
    return res.status(401).json({ success: false, error: "Please log in again." });
  }
  next();
};
