"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { company } from "@/lib/data";
import { submitContactMessage } from "@/lib/api";

const initialState = { name: "", email: "", subject: "", message: "" };

export default function ContactPage() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      await submitContactMessage(form);
      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        "Could not send your message right now. Please make sure the backend server is running, or reach us directly by phone."
      );
    }
  }

  return (
    <>
      <section className="hero-gradient text-white py-20 text-center">
        <Reveal>
          <p className="text-accent font-semibold uppercase tracking-wider text-sm">Get in Touch</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">Contact Us</h1>
          <p className="text-white/70 mt-4 max-w-xl mx-auto">
            Have a question, order enquiry, or want to discuss distribution? Reach out anytime.
          </p>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-5 gap-10">
        {/* Contact info + map */}
        <Reveal className="md:col-span-2">
          <div className="space-y-6">
            <InfoCard icon="📍" title="Address" text={company.address} />
            <InfoCard
              icon="📞"
              title="Phone"
              text={company.phones.join(" / ")}
              href={`tel:${company.phones[0].replace(/-/g, "")}`}
            />
            <InfoCard icon="✉️" title="Email" text={company.email} href={`mailto:${company.email}`} />
            <InfoCard icon="👤" title="Contact Person" text={company.contactPerson} />

            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-md h-64">
              <iframe
                title="Usama Asghar & Co location"
                src="https://maps.google.com/maps?q=Usama+Asghar+%26+Co+Distribution+Retailing+Company+Sama+Satta+Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
            <a
              href={company.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-accent font-semibold text-sm"
            >
              Open exact location in Google Maps →
            </a>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={100} className="md:col-span-3">
          {status === "success" ? (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center">
              <div className="text-4xl mb-3">✅</div>
              <h2 className="font-display text-xl font-bold">Message Sent!</h2>
              <p className="mt-2">We'll get back to you as soon as possible.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-navy font-semibold underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-gray-100 shadow-lg rounded-2xl p-8 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Subject</label>
                <input
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Message *</label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              {status === "error" ? <p className="text-red-600 text-sm">{errorMsg}</p> : null}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-navy hover:bg-accent transition-colors text-white font-semibold py-3.5 rounded-full disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </Reveal>
      </section>
    </>
  );
}

function InfoCard({ icon, title, text, href }) {
  const content = (
    <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="font-display font-semibold text-navy text-sm">{title}</p>
        <p className="text-gray-500 text-sm mt-0.5">{text}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block">
      {content}
    </a>
  ) : (
    content
  );
}
