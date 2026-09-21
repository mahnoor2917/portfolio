"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import VideoModal from "@/components/VideoModal";
import { categories, getProductsByCategory } from "@/lib/data";

export default function ProductsPage() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <>
      <section className="hero-gradient text-white py-20 text-center">
        <Reveal>
          <p className="text-accent font-semibold uppercase tracking-wider text-sm">Our Range</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">
            Products We Distribute
          </h1>
          <p className="text-white/70 mt-4 max-w-xl mx-auto">
            Trusted brands across every category, supplied reliably to retailers all over Punjab.
          </p>
        </Reveal>
      </section>

      {/* Category quick nav */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex gap-3 overflow-x-auto">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="whitespace-nowrap text-sm font-medium text-navy bg-navy/5 hover:bg-accent hover:text-white px-4 py-2 rounded-full transition-colors"
            >
              {cat.icon} {cat.name}
            </a>
          ))}
        </div>
      </div>

      {categories.map((cat) => {
        const items = getProductsByCategory(cat.slug);
        if (items.length === 0) return null;
        return (
          <section id={cat.slug} key={cat.slug} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-40">
            <Reveal>
              <div className="mb-10">
                <span className="text-3xl">{cat.icon}</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mt-2">
                  {cat.name}
                </h2>
                <p className="text-gray-500 mt-1">{cat.description}</p>
              </div>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((product, i) => (
                <Reveal key={product.id} delay={i * 60}>
                  <ProductCard product={product} onOpenVideo={setActiveVideo} />
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}

      <VideoModal product={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  );
}
