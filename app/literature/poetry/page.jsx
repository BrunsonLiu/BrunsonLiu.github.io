"use client";
import { SlowIn, AccentLine } from "../../components/space";
import { poems } from "../../data/literature";
import Link from "next/link";

export default function PoetryPage() {
  return (
    <div className="space-literature min-h-screen pt-16">
      <div className="space-grain" />

      <div className="px-6 lg:px-8 py-24" style={{ maxWidth: "var(--reading-width)", margin: "0 auto" }}>
        <SlowIn>
          <Link href="/literature" className="text-[10px] font-medium uppercase tracking-[0.4em] inline-block mb-16 transition-opacity duration-300 hover:opacity-60"
            style={{ color: "var(--sp-muted)" }}>
            ← 文学空间
          </Link>
        </SlowIn>

        <SlowIn delay={0.1}>
          <h1 className="mb-4" style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 300, lineHeight: 1.2, letterSpacing: "0.08em",
            color: "var(--sp-text)", fontFamily: "var(--font-reading)",
          }}>
            诗词
          </h1>
        </SlowIn>

        <SlowIn delay={0.2}>
          <AccentLine width="32px" />
          <p className="text-sm leading-relaxed max-w-sm mb-32" style={{ color: "var(--sp-muted)", letterSpacing: "0.04em" }}>
            山河与时间。留白处，是读不出的意思。
          </p>
        </SlowIn>

        {poems.map((poem, i) => (
          <SlowIn key={poem.title} delay={0.05}>
            <div className="mb-24 last:mb-0">
              <div className="mb-10">
                <h2 className="text-xl font-medium mb-1" style={{
                  color: "var(--sp-text)",
                  fontFamily: "var(--font-reading)",
                  letterSpacing: "0.06em",
                }}>
                  {poem.title}
                </h2>
                <p className="text-xs" style={{ color: "var(--sp-accent)", letterSpacing: "0.1em" }}>{poem.author}</p>
              </div>
              <div className="pl-4" style={{ borderLeft: "1px solid var(--sp-surface-border)" }}>
                {poem.lines.map((line, j) => (
                  line === "" ? (
                    <div key={j} style={{ height: "1.5rem" }} />
                  ) : (
                    <p key={j} className="text-base leading-loose" style={{
                      color: "var(--sp-text)",
                      fontFamily: "var(--font-reading)",
                      opacity: 0.85,
                      letterSpacing: "0.04em",
                    }}>
                      {line}
                    </p>
                  )
                ))}
              </div>
            </div>
          </SlowIn>
        ))}
      </div>
    </div>
  );
}
