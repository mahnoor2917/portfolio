const str = (value, max) => (typeof value === "string" ? value.trim().slice(0, max) : "");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validPhone = (phone) => {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
};
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

module.exports = { str, EMAIL_RE, validPhone, escapeRegex };
