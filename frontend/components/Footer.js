import Link from "next/link";
import { company } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <p className="font-display font-bold text-white text-xl">{company.name}</p>
          <p className="text-sm mt-2 text-accent font-medium">{company.tagline}</p>
          <p className="text-sm mt-4 leading-relaxed">{company.serviceArea}</p>
        </div>

        <div>
          <p className="font-display font-semibold text-white mb-4">Quick Links</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-accent">About Us</Link></li>
            <li><Link href="/products" className="hover:text-accent">Our Products</Link></li>
            <li><Link href="/distribution" className="hover:text-accent">Become a Distributor</Link></li>
            <li><Link href="/contact" className="hover:text-accent">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-display font-semibold text-white mb-4">Categories</p>
          <ul className="space-y-2 text-sm">
            <li>Beverages &amp; Juices</li>
            <li>Cooking Oil &amp; Banaspati</li>
            <li>Detergents &amp; Home Care</li>
            <li>Spices &amp; Grocery</li>
          </ul>
        </div>

        <div>
          <p className="font-display font-semibold text-white mb-4">Get in Touch</p>
          <ul className="space-y-2 text-sm">
            <li>📍 {company.address}</li>
            <li>📞 {company.phones.join(" / ")}</li>
            <li>✉️ {company.email}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {company.name}. All rights reserved. Serving Sama Satta &amp; all of Punjab.
      </div>
    </footer>
  );
}
