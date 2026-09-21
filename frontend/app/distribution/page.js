"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { categories } from "@/lib/data";
import { submitDistributorInquiry } from "@/lib/api";

const initialState = {
  businessName: "",
  contactName: "",
  phone: "",
  email: "",
  city: "",
  businessType: "Retailer",
  interestedCategories: [],
  message: "",
};

export default function DistributionPage() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function toggleCategory(name) {
    setForm((f) => {
      const has = f.interestedCategories.includes(name);
      return {
        ...f,
        interestedCategories: has
          ? f.interestedCategories.filter((c) => c !== name)
          : [...f.interestedCategories, name],
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      await submitDistributorInquiry(form);
      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        "Could not submit your request right now. Please make sure the backend server is running, or contact us directly by phone."
      );
    }
  }

  return (
    <>
      <section className="hero-gradient text-white py-20 text-center">
        <Reveal>
          <p className="text-accent font-semibold uppercase tracking-wider text-sm">Partner With Us</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">
            Become a Distributor or Retail Partner
          </h1>
          <p className="text-white/70 mt-4 max-w-xl mx-auto">
            Stock trusted brands, benefit from reliable supply and grow your business with
            Usama Asghar &amp; Co's distribution network across Punjab.
          </p>
        </Reveal>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Reveal>
          {status === "success" ? (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-3">✅</div>
              <h2 className="font-display text-xl font-bold">Thank you!</h2>
              <p className="mt-2">
                Your interest has been submitted. Our team will reach out to you shortly.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-navy font-semibold underline"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-gray-100 shadow-lg rounded-2xl p-8 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <Field
                  label="Business / Shop Name *"
                  value={form.businessName}
                  onChange={(v) => update("businessName", v)}
                  required
                />
                <Field
                  label="Your Name *"
                  value={form.contactName}
                  onChange={(v) => update("contactName", v)}
                  required
                />
                <Field
                  label="Phone Number *"
                  value={form.phone}
                  onChange={(v) => update("phone", v)}
                  required
                  type="tel"
                />
                <Field
                  label="Email"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  type="email"
                />
                <Field
                  label="City / Area *"
                  value={form.city}
                  onChange={(v) => update("city", v)}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">
                    Business Type
                  </label>
                  <select
                    value={form.businessType}
                    onChange={(e) => update("businessType", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    {["Retailer", "Wholesaler", "Distributor", "Foodservice", "Other"].map(
                      (t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Interested Product Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => {
                    const active = form.interestedCategories.includes(cat.name);
                    return (
                      <button
                        type="button"
                        key={cat.slug}
                        onClick={() => toggleCategory(cat.name)}
                        className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                          active
                            ? "bg-accent text-white border-accent"
                            : "bg-white text-navy border-gray-200 hover:border-accent"
                        }`}
                      >
                        {cat.icon} {cat.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">
                  Additional Message
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Tell us about your store, order volumes, or any questions..."
                />
              </div>

              {status === "error" ? (
                <p className="text-red-600 text-sm">{errorMsg}</p>
              ) : null}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-navy hover:bg-accent transition-colors text-white font-semibold py-3.5 rounded-full disabled:opacity-60"
              >
                {status === "loading" ? "Submitting..." : "Submit Interest"}
              </button>
            </form>
          )}
        </Reveal>
      </section>
    </>
  );
}

function Field({ label, value, onChange, type = "text", required = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-navy mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent"
      />
    </div>
  );
}
