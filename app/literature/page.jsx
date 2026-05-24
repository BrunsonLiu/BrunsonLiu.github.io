"use client";
import { SlowIn, FadeIn } from "../components/space";
import Link from "next/link";

const pavilions = [
  {
    title: "诗词",
    subtitle: "Poetry",
    href: "/literature/poetry",
    excerpt: "俱往矣，数风流人物，还看今朝。",
  },
  {
    title: "书",
    subtitle: "Books",
    href: "/literature/books",
    excerpt: "人是为了活着本身而活着，而不是为了活着之外的任何事物。",
  },
  {
    title: "电影",
    subtitle: "Cinema",
    href: "/literature/cinema",
    excerpt: "Hope is a good thing, maybe the best of things, and no good thing ever dies.",
  },
];

export default function LiteraturePage() {
  return (
    <div className="space-literature min-h-screen">
      <div className="space-grain" />

      <div className="lit-hero">
        <img
          src="/literature-bg.png"
          alt=""
          className="lit-hero-img"
          draggable={false}
        />
        <div className="lit-hero-overlay" />
        <div className="lit-hero-content">
          <SlowIn>
            <Link href="/" prefetch={false} className="text-[10px] font-medium uppercase tracking-[0.4em] inline-block mb-6 transition-opacity duration-300 hover:opacity-60"
              style={{ color: "var(--sp-muted)" }}>
              ← 空间
            </Link>
          </SlowIn>
          <SlowIn delay={0.1}>
            <p className="text-[10px] font-medium uppercase tracking-[0.4em] mb-4" style={{ color: "var(--sp-muted)", opacity: 0.5 }}>
              空间 02
            </p>
            <h1 className="mb-4" style={{
              fontSize: "clamp(40px, 7vw, 72px)",
              fontWeight: 300, lineHeight: 1.05, letterSpacing: "0.06em",
              color: "var(--sp-text)", fontFamily: "var(--font-reading)",
              textShadow: "0 2px 30px rgba(0,0,0,0.5)",
            }}>
              文学空间
            </h1>
          </SlowIn>
          <SlowIn delay={0.2}>
            <div style={{ width: "32px", height: "1px", background: "var(--sp-accent)", marginBottom: "1rem" }} />
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: "var(--sp-muted)", letterSpacing: "0.04em" }}>
              好男儿志在四方！
            </p>
          </SlowIn>
        </div>
      </div>

      <div className="px-6 lg:px-8 py-16" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <div className="space-y-0">
          {pavilions.map((p, i) => (
            <FadeIn key={p.title} delay={0.08 * i}>
              <Link href={p.href} prefetch={false} className="block group">
                <div className="py-10 px-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 transition-all duration-700"
                  style={{ borderBottom: "1px solid var(--sp-surface-border)" }}>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-4 mb-2">
                      <h2 className="text-3xl font-medium transition-colors duration-500"
                        style={{
                          color: "var(--sp-text)",
                          fontFamily: "var(--font-reading)",
                          letterSpacing: "0.04em",
                        }}>
                        {p.title}
                      </h2>
                      <span className="text-xs font-medium uppercase tracking-[0.2em]"
                        style={{ color: "var(--sp-muted)" }}>
                        {p.subtitle}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed max-w-md transition-opacity duration-500"
                      style={{
                        color: "var(--sp-muted)",
                        fontFamily: "var(--font-reading)",
                        fontStyle: "italic",
                        opacity: 0.7,
                      }}>
                      {p.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 flex-shrink-0">
                    <span className="text-sm transition-transform duration-500 group-hover:translate-x-2"
                      style={{ color: "var(--sp-accent)" }}>
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
