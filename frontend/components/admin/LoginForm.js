"use client";

import { useState } from "react";
import Image from "next/image";
import { adminLogin } from "@/lib/api";

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await adminLogin(email, password);
      onLogin();
    } catch (err) {
      setError(err.message || "Could not log in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative w-16 h-16 mb-3">
            <Image src="/images/logo/usama-asghar-logo.png" alt="Usama Asghar & Co" fill className="object-contain" />
          </div>
          <h1 className="font-display text-2xl font-bold text-navy">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Usama Asghar &amp; Co</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Email</label>
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Password</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full bg-accent hover:bg-accent-light disabled:opacity-60 text-white font-semibold py-3.5 rounded-full transition-colors"
          >
            {busy ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
