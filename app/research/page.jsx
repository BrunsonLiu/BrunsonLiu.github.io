"use client";
import { FadeIn, SectionLabel } from "../components/space";
import { researchProjects } from "../data/research";

export default function ResearchPage() {
  return (
    <div className="space-academic min-h-screen pt-16">
      <div className="space-grain" />

      <div className="px-6 lg:px-8 py-24" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <FadeIn>
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] mb-16" style={{ color: "var(--sp-muted)" }}>
            空间 01 — 学术
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="mb-6" style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.04em",
            color: "var(--sp-text)", fontFamily: "var(--font-display)",
          }}>
            研究。
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ width: "64px", height: "1px", background: "var(--sp-accent)", marginBottom: "1.5rem" }} />
          <p className="text-base leading-relaxed max-w-lg mb-24" style={{ color: "var(--sp-muted)" }}>
            用算法理解复杂世界，用代码逼近最优解。
          </p>
        </FadeIn>

        <div className="space-y-24">
          {researchProjects.map((proj, i) => (
            <FadeIn key={proj.title} delay={0.1}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="overflow-hidden" style={{ border: "1px solid var(--sp-surface-border)" }}>
                  <img src={proj.image} alt={proj.title} loading="lazy" className="w-full h-48 lg:h-64 object-cover"
                    style={{ filter: "brightness(0.7) contrast(1.1)" }} />
                </div>
                <div>
                  <div className="flex gap-2 mb-3">
                    {proj.tags.map((t) => (
                      <span key={t} className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--sp-brand)" }}>{t}</span>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold mb-2" style={{ color: "var(--sp-text)" }}>{proj.title}</h2>
                  <p className="text-xs mb-3" style={{ color: "var(--sp-accent)" }}>{proj.subtitle}</p>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--sp-muted)" }}>{proj.desc}</p>
                  <p className="text-xs font-mono" style={{ color: "var(--sp-brand)", opacity: 0.5 }}>{proj.formula}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
