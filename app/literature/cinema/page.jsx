"use client";
import { FadeIn, SectionLabel, AccentLine } from "../../components/space";
import { films } from "../../data/literature";
import Link from "next/link";

export default function CinemaPage() {
  return (
    <div className="space-literature min-h-screen pt-16">
      <div className="space-grain" />

      <div className="px-6 lg:px-8 py-24" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <FadeIn>
          <Link href="/literature" className="text-[10px] font-medium uppercase tracking-[0.4em] inline-block mb-16 transition-opacity duration-300 hover:opacity-60"
            style={{ color: "var(--sp-muted)" }}>
            ← 文学空间
          </Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="mb-4" style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 300, lineHeight: 1.1, letterSpacing: "0.06em",
            color: "var(--sp-text)", fontFamily: "var(--font-reading)",
          }}>
            电影。
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <AccentLine />
          <p className="text-base leading-relaxed max-w-lg mb-32" style={{ color: "var(--sp-muted)" }}>
            黑暗中的光。不是评分列表，是真正进入过我的电影。
          </p>
        </FadeIn>

        {films.map((film, i) => (
          <FadeIn key={film.title} delay={0.1 * i}>
            <div className="mb-32 last:mb-0">
              <div className="overflow-hidden mb-8" style={{ aspectRatio: "21/9" }}>
                <img
                  src={film.image}
                  alt={film.title}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.5) saturate(0.4) contrast(1.2)" }}
                />
              </div>
              <div style={{ maxWidth: "var(--reading-width)" }}>
                <div className="flex items-baseline gap-4 mb-3">
                  <h2 className="text-xl font-medium" style={{
                    color: "var(--sp-text)",
                    fontFamily: "var(--font-reading)",
                    letterSpacing: "0.02em",
                  }}>
                    {film.title}
                  </h2>
                  <span className="text-xs" style={{ color: "var(--sp-muted)" }}>{film.year}</span>
                </div>
                <p className="text-xs mb-4" style={{ color: "var(--sp-accent)", letterSpacing: "0.1em" }}>{film.director}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--sp-muted)", fontStyle: "italic" }}>
                  {film.note}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
