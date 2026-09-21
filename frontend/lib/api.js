export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function post(path, data) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  let json = {};
  try {
    json = await res.json();
  } catch {
    // ignore - handled below
  }
  if (!res.ok) throw new Error(json.error || "Request failed");
  return json;
}

export function submitContactMessage(data) {
  return post("/api/contact", data);
}

export function submitDistributorInquiry(data) {
  return post("/api/distribution", data);
}

// ---------------------------------------------------------------
// Anonymous page-view counter (feeds the admin dashboard)
// ---------------------------------------------------------------
export function trackPageView(path) {
  try {
    let id = localStorage.getItem("ua_vid");
    if (!id) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      localStorage.setItem("ua_vid", id);
    }
    fetch(`${API_BASE}/api/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, visitorId: id }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // tracking must never break the site
  }
}

// ---------------------------------------------------------------
// Admin dashboard helpers
// ---------------------------------------------------------------
const TOKEN_KEY = "ua_admin_token";

export const adminToken = {
  get() {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set(token) {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {}
  },
  clear() {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {}
  },
};

export async function adminLogin(email, password) {
  const json = await post("/api/admin/login", { email, password });
  adminToken.set(json.token);
  return json;
}

// method: GET/PATCH/DELETE. Set raw=true to get a Blob (for CSV downloads).
export async function adminFetch(path, { method = "GET", body, raw = false } = {}) {
  const token = adminToken.get();
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401) {
    adminToken.clear();
    const err = new Error("Session expired. Please log in again.");
    err.status = 401;
    throw err;
  }
  if (raw) {
    if (!res.ok) throw new Error("Download failed");
    return res.blob();
  }
  let json = {};
  try {
    json = await res.json();
  } catch {
    // ignore
  }
  if (!res.ok) throw new Error(json.error || "Request failed");
  return json;
}
