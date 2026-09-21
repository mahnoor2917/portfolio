"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { adminFetch, adminToken } from "@/lib/api";
import LoginForm from "./LoginForm";
import Overview from "./Overview";
import Inbox from "./Inbox";

export default function AdminApp() {
  const [authed, setAuthed] = useState(null); // null = checking
  const [view, setView] = useState("overview");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const logout = useCallback(() => {
    adminToken.clear();
    setStats(null);
    setAuthed(false);
  }, []);

  const loadStats = useCallback(async () => {
    try {
      const json = await adminFetch("/api/admin/stats");
      setStats(json.data);
      setError("");
    } catch (err) {
      if (err.status === 401) return logout();
      setError("Could not reach the server. Retrying...");
    }
  }, [logout]);

  // check for an existing login on first load
  useEffect(() => {
    if (!adminToken.get()) {
      setAuthed(false);
      return;
    }
    adminFetch("/api/admin/me")
      .then(() => setAuthed(true))
      .catch(() => setAuthed(false));
  }, []);

  // load + auto-refresh stats every minute while logged in
  useEffect(() => {
    if (!authed) return;
    loadStats();
    const timer = setInterval(loadStats, 60000);
    return () => clearInterval(timer);
  }, [authed, loadStats]);

  if (authed === null) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center text-white/70">
        Loading...
      </div>
    );
  }

  if (!authed) {
    return <LoginForm onLogin={() => setAuthed(true)} />;
  }

  const nav = [
    { id: "overview", label: "Overview", icon: "▦", badge: 0 },
    { id: "messages", label: "Messages", icon: "✉", badge: stats?.messages.new || 0 },
    { id: "inquiries", label: "Distributor Inquiries", icon: "☎", badge: stats?.inquiries.new || 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      <aside className="bg-navy text-white md:w-64 md:shrink-0 md:h-screen md:sticky md:top-0 flex flex-col">
        <div className="px-5 py-4 md:py-6 flex items-center justify-between md:justify-start gap-3">
          <div className="relative w-10 h-10 bg-white rounded-lg p-1 shrink-0">
            <Image src="/images/logo/usama-asghar-logo.png" alt="" fill className="object-contain p-0.5" />
          </div>
          <div className="leading-tight mr-auto">
            <p className="font-display font-bold">Usama Asghar &amp; Co</p>
            <p className="text-[11px] text-white/60 uppercase tracking-wide">Admin</p>
          </div>
          <button onClick={logout} className="md:hidden text-sm text-white/70 hover:text-white">
            Log out
          </button>
        </div>

        <nav className="flex md:flex-col gap-1 px-3 pb-3 md:pb-0 overflow-x-auto">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex items-center gap-3 whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                view === item.id ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="w-5 text-center">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge > 0 && (
                <span className="ml-auto bg-accent text-white text-xs font-bold rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="hidden md:block mt-auto p-4 space-y-1 border-t border-white/10">
          <Link href="/" target="_blank" className="block px-4 py-2 rounded-xl text-sm text-white/70 hover:bg-white/10 hover:text-white">
            ↗ View website
          </Link>
          <button onClick={logout} className="w-full text-left px-4 py-2 rounded-xl text-sm text-white/70 hover:bg-white/10 hover:text-white">
            ⎋ Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8">
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        {view === "overview" && <Overview stats={stats} onOpen={setView} onRefresh={loadStats} />}
        {view === "messages" && <Inbox key="messages" type="messages" onChanged={loadStats} onAuthError={logout} />}
        {view === "inquiries" && <Inbox key="inquiries" type="inquiries" onChanged={loadStats} onAuthError={logout} />}
      </main>
    </div>
  );
}
