export const TZ = "Asia/Karachi";

export function fmtDateTime(value) {
  return new Date(value).toLocaleString("en-GB", {
    timeZone: TZ,
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function timeAgo(value) {
  const secs = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 1000));
  if (secs < 60) return "just now";
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  return fmtDateTime(value);
}

// 0301-6856800 -> 923016856800 for wa.me links
export function waNumber(phone) {
  let digits = String(phone || "").replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  else if (digits.startsWith("0")) digits = "92" + digits.slice(1);
  return digits;
}

export const STATUS_STYLES = {
  new: "bg-accent/15 text-accent",
  read: "bg-gray-100 text-gray-600",
  replied: "bg-green-100 text-green-700",
  archived: "bg-gray-100 text-gray-400",
  contacted: "bg-blue-100 text-blue-700",
  onboarded: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-500",
};

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-block text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${
        STATUS_STYLES[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}
