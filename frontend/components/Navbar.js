"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/distribution", label: "Become a Distributor" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-11 h-11">
            <Image
              src="/images/logo/usama-asghar-logo.png"
              alt="Usama Asghar & Co logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="leading-tight">
            <p className="font-display font-bold text-navy text-lg">Usama Asghar & Co</p>
            <p className="text-[11px] text-accent font-medium tracking-wide uppercase">
              Distribution &amp; Retailing
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-accent"
                  : "text-navy/80 hover:text-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:03016856800"
            className="bg-navy text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-accent transition-colors"
          >
            Call Now
          </a>
        </nav>

        <button
          className="md:hidden text-navy text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open ? (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-navy font-medium py-1.5"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:03016856800"
            className="block text-center bg-navy text-white font-semibold py-2.5 rounded-full mt-2"
          >
            Call Now
          </a>
        </div>
      ) : null}
    </header>
  );
}
