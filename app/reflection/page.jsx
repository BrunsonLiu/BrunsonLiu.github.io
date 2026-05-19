"use client";
import { FadeIn } from "../components/space";
import { thoughts } from "../data/reflection";

export default function ReflectionPage() {
  return (
    <div className="space-reflection min-h-screen pt-16">
      <div className="space-grain" />

      <section className="px-6 lg:px-8 py-24" style={{ maxWidth: "var(--reading-width)", margin: "0 auto" }}>
        <FadeIn>
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] mb-16" style={{ color: "var(--sp-muted)" }}>
            空间 05 — 沉思
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="mb-6" style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em",
            color: "var(--sp-text)",
          }}>
            安静的思考，审慎的结构。
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ width: "32px", height: "1px", background: "var(--sp-accent)", marginBottom: "1.5rem" }} />
          <p className="text-sm leading-relaxed mb-24" style={{ color: "var(--sp-muted)" }}>
            随笔、笔记，学科之间的空隙。
          </p>
        </FadeIn>

        <div className="space-y-0">
          {thoughts.map((thought, i) => (
            <FadeIn key={thought.title} delay={i * 0.12}>
              <div className="py-8 group cursor-default" style={{ borderBottom: "1px solid var(--sp-surface-border)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium" style={{ color: "var(--sp-muted)" }}>{thought.date}</span>
                  <div style={{ width: "12px", height: "1px", background: "var(--sp-surface-border)" }} />
                  {thought.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--sp-accent)" }}>{tag}</span>
                  ))}
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:translate-x-2 transition-transform duration-300" style={{ color: "var(--sp-text)" }}>
                  {thought.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--sp-muted)" }}>
                  {thought.excerpt}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
