"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import VideoModal from "@/components/VideoModal";
import { company, categories, products } from "@/lib/data";

const marqueeBrands = [
  "Bruno's", "Kite", "Popular", "Gourmet", "Rifsons", "Al-Habib",
  "Tipka", "Kurak", "Mario's", "Rite", "Shahbaz", "Commander",
];

export default function HomePage() {
  const [activeVideo, setActiveVideo] = useState(null);
  const featured = products.slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="hero-gradient relative overflow-hidden text-white">
        {/* dim warehouse photo on the right side, top to bottom */}
        <div
          className="hidden md:block absolute top-0 bottom-0 right-0 w-1/2 pointer-events-none select-none"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent, black 45%)",
            maskImage: "linear-gradient(to right, transparent, black 45%)",
          }}
          aria-hidden="true"
        >
          <Image
            src="/images/warehouse.jpg"
            alt=""
            fill
            priority
            sizes="50vw"
            className="object-cover opacity-30"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <span className="inline-block bg-accent/20 text-accent-light text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6">
              Since the 1990s • Sama Satta, Punjab
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Distributing Pakistan's <span className="text-accent">Most Trusted Brands</span> Across Punjab
            </h1>
            <p className="mt-6 text-white/70 text-lg max-w-xl">
              {company.name} is a foodservice distributor, wholesaler and retailing
              company connecting quality manufacturers with retailers all over Punjab —
              built on decades of trust, reach and reliability.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="bg-accent hover:bg-accent-light transition-colors px-7 py-3.5 rounded-full font-semibold shadow-glow"
              >
                Explore Our Products
              </Link>
              <Link
                href="/distribution"
                className="border border-white/30 hover:border-accent hover:text-accent transition-colors px-7 py-3.5 rounded-full font-semibold"
              >
                Become a Distributor
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <p className="font-display text-3xl font-bold text-accent">30+</p>
                <p className="text-xs text-white/60 mt-1">Years of Trust</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-accent">15+</p>
                <p className="text-xs text-white/60 mt-1">Partner Brands</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-accent">Punjab</p>
                <p className="text-xs text-white/60 mt-1">Wide Coverage</p>
              </div>
            </div>
          </div>
        </div>

        {/* decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </section>

      {/* BRAND MARQUEE */}
      <section className="bg-white py-8 border-b border-gray-100 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...marqueeBrands, ...marqueeBrands].map((b, i) => (
            <span
              key={i}
              className="mx-8 text-xl font-display font-bold text-navy/30 hover:text-accent transition-colors"
            >
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-accent font-semibold uppercase tracking-wider text-sm">What We Distribute</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mt-2">
              Our Product Categories
            </h2>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 80}>
              <Link
                href={`/products#${cat.slug}`}
                className="block bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
              >
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h3 className="font-display font-semibold text-navy text-lg">{cat.name}</h3>
                <p className="text-gray-500 text-sm mt-2">{cat.description}</p>
                <span className="inline-block mt-4 text-accent text-sm font-semibold">
                  View Products →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
              <div>
                <p className="text-accent font-semibold uppercase tracking-wider text-sm">Featured</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mt-2">
                  Popular Products We Supply
                </h2>
              </div>
              <Link href="/products" className="text-navy font-semibold hover:text-accent transition-colors">
                View All Products →
              </Link>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product, i) => (
              <Reveal key={product.id} delay={i * 60}>
                <ProductCard product={product} onOpenVideo={setActiveVideo} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION / VISION PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-10">
        <Reveal>
          <div className="bg-navy text-white rounded-2xl p-10 h-full">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="font-display text-2xl font-bold">Our Mission</h3>
            <p className="text-white/70 mt-4 leading-relaxed">{company.mission}</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="bg-accent text-white rounded-2xl p-10 h-full">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="font-display text-2xl font-bold">Our Vision</h3>
            <p className="text-white/90 mt-4 leading-relaxed">{company.vision}</p>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="hero-gradient text-white py-20 text-center">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Want to Stock Our Brands in Your Store?
          </h2>
          <p className="text-white/70 mt-4 max-w-xl mx-auto">
            Partner with {company.name} for reliable supply, competitive pricing and
            unmatched reach across Sama Satta and all of Punjab.
          </p>
          <Link
            href="/distribution"
            className="inline-block mt-8 bg-accent hover:bg-accent-light transition-colors px-8 py-4 rounded-full font-semibold shadow-glow"
          >
            Register Your Interest
          </Link>
        </Reveal>
      </section>

      <VideoModal product={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  );
}
