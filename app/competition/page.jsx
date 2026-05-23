﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿"use client";
import { FadeIn, SectionLabel } from "../components/space";
import { competitions, internships } from "../data/experience";

export default function CompetitionPage() {
  return (
    <div className="space-academic min-h-screen pt-16">
      <div className="space-grain" />

      <div className="px-6 lg:px-8 py-24" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <FadeIn>
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] mb-16" style={{ color: "var(--sp-muted)" }}>
            经历 — 竞赛
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="mb-6" style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.04em",
            color: "var(--sp-text)", fontFamily: "var(--font-display)",
          }}>
            竞赛。
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ width: "64px", height: "1px", background: "var(--sp-accent)", marginBottom: "1.5rem" }} />
          <p className="text-base leading-relaxed max-w-lg mb-24" style={{ color: "var(--sp-muted)" }}>
            数学建模与运筹优化的实战检验。每一次都是对问题建模和团队协作的压力测试。
          </p>
        </FadeIn>

        <div className="space-y-12">
          {competitions.map((comp, i) => (
            <FadeIn key={comp.title} delay={i * 0.1}>
              <div className="p-8" style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-surface-border)" }}>
                <div className="flex flex-wrap gap-2 mb-4">
                  {comp.stats.map((s) => (
                    <span key={s} className="text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-1"
                      style={{ background: "rgba(230,57,70,0.1)", color: "var(--sp-accent)" }}>{s}</span>
                  ))}
                </div>
                <h2 className="text-xl font-bold mb-1" style={{ color: "var(--sp-text)" }}>{comp.title}</h2>
                <p className="text-xs mb-4" style={{ color: "var(--sp-accent)" }}>{comp.subtitle}</p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--sp-muted)" }}>{comp.desc}</p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--sp-text)", opacity: 0.8 }}>{comp.note}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {comp.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1"
                      style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-surface-border)", color: "var(--sp-accent)" }}>{tag}</span>
                  ))}
                </div>
                <p className="text-xs font-mono" style={{ color: "var(--sp-brand)", opacity: 0.4 }}>{comp.formula}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-32">
          <FadeIn><SectionLabel>实习</SectionLabel></FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-16" style={{ color: "var(--sp-text)", fontFamily: "var(--font-display)" }}>实习经历</h2>
          </FadeIn>

          <div className="space-y-12">
            {internships.map((intern, i) => (
              <FadeIn key={intern.title} delay={i * 0.1}>
                <div className="p-8" style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-surface-border)" }}>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {intern.stats.map((s) => (
                      <span key={s} className="text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-1"
                        style={{ background: "rgba(230,57,70,0.1)", color: "var(--sp-accent)" }}>{s}</span>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold mb-1" style={{ color: "var(--sp-text)" }}>{intern.title}</h2>
                  <p className="text-xs mb-4" style={{ color: "var(--sp-accent)" }}>{intern.subtitle}</p>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--sp-muted)" }}>{intern.desc}</p>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--sp-text)", opacity: 0.8 }}>{intern.note}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {intern.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1"
                        style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-surface-border)", color: "var(--sp-accent)" }}>{tag}</span>
                    ))}
                  </div>
                  <p className="text-xs font-mono" style={{ color: "var(--sp-brand)", opacity: 0.4 }}>{intern.formula}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
