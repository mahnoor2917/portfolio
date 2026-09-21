"use client";

import { useCallback, useEffect, useState } from "react";
import { adminFetch } from "@/lib/api";
import { StatusBadge, fmtDateTime, timeAgo, waNumber } from "./utils";

const CONFIG = {
  messages: {
    title: "Messages",
    subtitle: "Messages sent from your Contact page.",
    endpoint: "/api/admin/messages",
    statuses: ["new", "read", "replied", "archived"],
    csv: "messages.csv",
  },
  inquiries: {
    title: "Distributor Inquiries",
    subtitle: "Requests from the Become a Distributor page.",
    endpoint: "/api/admin/inquiries",
    statuses: ["new", "contacted", "onboarded", "closed"],
    csv: "distributor-inquiries.csv",
  },
};

function Field({ label, children }) {
  if (!children) return null;
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>
      <p className="text-sm text-navy break-words">{children}</p>
    </div>
  );
}

function ItemHeader({ type, item }) {
  if (type === "messages") {
    return (
      <>
        <p className="font-medium text-navy truncate">{item.name}</p>
        <p className="text-sm text-gray-500 truncate">{item.subject || item.message}</p>
      </>
    );
  }
  return (
    <>
      <p className="font-medium text-navy truncate">{item.businessName}</p>
      <p className="text-sm text-gray-500 truncate">
        {item.contactName} · {item.city} · {item.businessType}
      </p>
    </>
  );
}

function ItemDetails({ type, item, cfg, onSave, onDelete }) {
  const [notes, setNotes] = useState(item.notes || "");
  const [busy, setBusy] = useState(false);
  const phone = type === "inquiries" ? item.phone : "";

  async function save(patch) {
    setBusy(true);
    await onSave(item._id, patch);
    setBusy(false);
  }

  return (
    <div className="px-5 pb-5 pt-1 border-t border-gray-100 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4 pt-4">
        {type === "messages" ? (
          <>
            <Field label="Email">{item.email}</Field>
            <Field label="Subject">{item.subject}</Field>
          </>
        ) : (
          <>
            <Field label="Phone">{item.phone}</Field>
            <Field label="Email">{item.email}</Field>
            <Field label="City">{item.city}</Field>
            <Field label="Business type">{item.businessType}</Field>
            <Field label="Interested in">{(item.interestedCategories || []).join(", ")}</Field>
          </>
        )}
        <Field label="Received">{fmtDateTime(item.createdAt)}</Field>
      </div>

      {item.message && (
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Message</p>
          <p className="text-sm text-navy whitespace-pre-wrap break-words bg-gray-50 rounded-xl p-4">{item.message}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {phone && (
          <a href={`tel:${phone}`} className="text-sm font-medium bg-navy text-white px-4 py-2 rounded-full hover:bg-navy-light">
            Call
          </a>
        )}
        {phone && (
          <a
            href={`https://wa.me/${waNumber(phone)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
          >
            WhatsApp
          </a>
        )}
        {item.email && (
          <a href={`mailto:${item.email}`} className="text-sm font-medium border border-gray-200 text-navy px-4 py-2 rounded-full hover:border-accent hover:text-accent">
            Email
          </a>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wide text-gray-400 mb-1">Status</label>
          <select
            value={item.status}
            disabled={busy}
            onChange={(e) => save({ status: e.target.value })}
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm capitalize focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {cfg.statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wide text-gray-400 mb-1">Private notes</label>
          <textarea
            rows={2}
            value={notes}
            maxLength={2000}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Only you can see this"
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            disabled={busy || notes === (item.notes || "")}
            onClick={() => save({ notes })}
            className="mt-2 text-sm font-medium text-accent disabled:text-gray-300"
          >
            Save note
          </button>
        </div>
      </div>

      <button onClick={() => onDelete(item._id)} className="text-sm text-red-600 hover:underline">
        Delete this {type === "messages" ? "message" : "inquiry"}
      </button>
    </div>
  );
}

export default function Inbox({ type, onChanged, onAuthError }) {
  const cfg = CONFIG[type];
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const [q, setQ] = useState("");
  const [dq, setDq] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openId, setOpenId] = useState(null);

  // wait a moment after typing before searching
  useEffect(() => {
    const t = setTimeout(() => {
      setDq(q.trim());
      setPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [q]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: String(page), limit: "15" });
      if (status) params.set("status", status);
      if (dq) params.set("q", dq);
      const json = await adminFetch(`${cfg.endpoint}?${params}`);
      setItems(json.data);
      setPages(json.pages);
      setTotal(json.total);
    } catch (err) {
      if (err.status === 401) return onAuthError();
      setError(err.message || "Could not load.");
    } finally {
      setLoading(false);
    }
  }, [cfg.endpoint, page, status, dq, onAuthError]);

  useEffect(() => {
    load();
  }, [load]);

  async function save(id, patch) {
    try {
      const json = await adminFetch(`${cfg.endpoint}/${id}`, { method: "PATCH", body: patch });
      setItems((list) => list.map((it) => (it._id === id ? json.data : it)));
      onChanged();
    } catch (err) {
      if (err.status === 401) return onAuthError();
      setError(err.message || "Could not save.");
    }
  }

  async function remove(id) {
    if (!window.confirm("Delete this permanently? This cannot be undone.")) return;
    try {
      await adminFetch(`${cfg.endpoint}/${id}`, { method: "DELETE" });
      setOpenId(null);
      onChanged();
      load();
    } catch (err) {
      if (err.status === 401) return onAuthError();
      setError(err.message || "Could not delete.");
    }
  }

  function toggle(item) {
    const opening = openId !== item._id;
    setOpenId(opening ? item._id : null);
    // reading a new message marks it as read
    if (opening && type === "messages" && item.status === "new") save(item._id, { status: "read" });
  }

  async function exportCsv() {
    try {
      const blob = await adminFetch(`${cfg.endpoint}/export.csv`, { raw: true });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = cfg.csv;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      if (err.status === 401) return onAuthError();
      setError("Could not download the file.");
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">{cfg.title}</h1>
          <p className="text-sm text-gray-500">{cfg.subtitle}</p>
        </div>
        <button onClick={exportCsv} className="text-sm font-medium text-navy border border-gray-200 bg-white px-4 py-2 rounded-full hover:border-accent hover:text-accent transition-colors">
          ⬇ Download Excel (CSV)
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, phone, email, city..."
          className="flex-1 min-w-[200px] rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm capitalize focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="">All statuses</option>
          {cfg.statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
        {loading && items.length === 0 && <p className="p-6 text-sm text-gray-400">Loading...</p>}
        {!loading && items.length === 0 && (
          <p className="p-6 text-sm text-gray-400">{dq || status ? "Nothing matches your search." : "Nothing here yet."}</p>
        )}
        {items.map((item) => (
          <div key={item._id}>
            <button onClick={() => toggle(item)} className="w-full text-left flex items-center gap-4 px-5 py-4 hover:bg-gray-50">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.status === "new" ? "bg-accent" : "bg-transparent"}`} />
              <span className="min-w-0 flex-1">
                <ItemHeader type={type} item={item} />
              </span>
              <span className="hidden sm:block text-xs text-gray-400 whitespace-nowrap">{timeAgo(item.createdAt)}</span>
              <StatusBadge status={item.status} />
            </button>
            {openId === item._id && (
              <ItemDetails key={item._id + item.updatedAt} type={type} item={item} cfg={cfg} onSave={save} onDelete={remove} />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{total} total</span>
        <div className="flex items-center gap-3">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="px-4 py-2 rounded-full border border-gray-200 bg-white disabled:opacity-40">
            ← Prev
          </button>
          <span>
            Page {page} of {pages}
          </span>
          <button disabled={page >= pages} onClick={() => setPage((p) => p + 1)} className="px-4 py-2 rounded-full border border-gray-200 bg-white disabled:opacity-40">
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
