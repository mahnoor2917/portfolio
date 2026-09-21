"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function ProductCard({ product, onOpenVideo }) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});
  const [glareStyle, setGlareStyle] = useState({});

  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04,1.04,1.04)`,
    });
    setGlareStyle({
      opacity: 1,
      transform: `translate(${x - rect.width / 2}px, ${y - rect.height / 2}px)`,
    });
  }

  function handleMouseLeave() {
    setStyle({ transform: "rotateX(0deg) rotateY(0deg) scale3d(1,1,1)" });
    setGlareStyle({ opacity: 0 });
  }

  return (
    <div
      ref={cardRef}
      className="tilt-card group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="tilt-card-inner relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md h-full flex flex-col"
        style={style}
      >
        <div
          className="tilt-glare absolute w-40 h-40 rounded-full blur-2xl opacity-0 pointer-events-none"
          style={glareStyle}
        />

        <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 left-3 bg-navy/90 text-white text-[11px] font-semibold px-3 py-1 rounded-full tracking-wide">
            {product.brand}
          </div>

          {product.youtubeId ? (
            <button
              onClick={() => onOpenVideo(product)}
              className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors"
              aria-label={`Watch ${product.name} video`}
            >
              <span className="w-14 h-14 rounded-full bg-accent/95 text-white flex items-center justify-center scale-0 group-hover:scale-100 transition-transform shadow-glow">
                ▶
              </span>
            </button>
          ) : null}
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-display font-semibold text-navy text-lg leading-snug">
            {product.name}
          </h3>
          <p className="text-accent text-sm font-medium mt-1">{product.tagline}</p>
          <p className="text-gray-500 text-sm mt-3 flex-1">{product.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {product.tags?.map((tag) => (
              <span
                key={tag}
                className="text-[11px] bg-navy/5 text-navy px-2.5 py-1 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
