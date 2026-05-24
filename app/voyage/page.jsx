"use client";
import { useState } from "react";
import { FadeIn, AccentLine } from "../components/space";
import { places, notes } from "../data/voyage";
import Link from "next/link";

export default function VoyagePage() {
  const [activePlace, setActivePlace] = useState(0);
  const [imgOk, setImgOk] = useState(true);

  return (
    <div className="space-voyage min-h-screen pt-16">
      <div className="space-grain" />

      <div className="px-6 lg:px-8 py-12" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <FadeIn>
          <Link href="/" prefetch={false} className="text-[10px] font-medium uppercase tracking-[0.4em] inline-block mb-6 transition-opacity duration-300 hover:opacity-60"
            style={{ color: "var(--sp-muted)" }}>
            ← 空间
          </Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] mb-2" style={{ color: "var(--sp-muted)", opacity: 0.5 }}>
            空间 04
          </p>
          <h1 className="mb-2" style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 300, lineHeight: 1.2, letterSpacing: "0.08em",
            color: "var(--sp-text)", fontFamily: "var(--font-reading)",
          }}>
            旅行
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <AccentLine width="32px" />
          <p className="text-sm leading-relaxed max-w-sm mb-8" style={{ color: "var(--sp-muted)", letterSpacing: "0.04em" }}>
            一叶浮萍归大海，为人何处不相逢。
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] mb-6" style={{ color: "var(--sp-accent)", opacity: 0.6 }}>
            去过
          </p>
        </FadeIn>

        <div className="voyage-places-row">
          {places.map((place, i) => (
            <button
              key={place.name}
              className={`voyage-place-tab ${i === activePlace ? "voyage-place-tab-active" : ""}`}
              onClick={() => { setActivePlace(i); setImgOk(true); }}
            >
              {place.name}
            </button>
          ))}
        </div>

        <div className="voyage-place-detail">
          <div className="voyage-place-detail-img-wrap" style={!imgOk ? { background: "linear-gradient(135deg, #0a1a2a 0%, #1a2a3a 50%, #0a0a1a 100%)" } : {}}>
            {imgOk && (
              <img
                src={places[activePlace].image}
                alt={places[activePlace].name}
                className="voyage-place-detail-img"
                draggable={false}
                onError={() => setImgOk(false)}
              />
            )}
          </div>
          <div className="voyage-place-detail-text">
            <h2 className="voyage-place-detail-name">{places[activePlace].name}</h2>
            <p className="voyage-place-detail-feeling">{places[activePlace].feeling}</p>
          </div>
        </div>

        <div style={{ height: "120px" }} />
      </div>
    </div>
  );
}
