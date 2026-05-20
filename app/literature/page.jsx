"use client";
import { SlowIn } from "../components/space";
import Link from "next/link";

const pavilions = [
  {
    title: "诗词",
    subtitle: "Poetry",
    href: "/literature/poetry",
    excerpt: "山河、时间、留白。中国诗意的空间。",
    mood: "卷轴 · 墨迹 · 山水",
  },
  {
    title: "书",
    subtitle: "Books",
    href: "/literature/books",
    excerpt: "一个人的精神书架。精选，而非堆积。",
    mood: "纸页 · 批注 · 安静",
  },
  {
    title: "电影",
    subtitle: "Cinema",
    href: "/literature/cinema",
    excerpt: "黑暗中的光。剧场感，不是豆瓣列表。",
    mood: "银幕 · 黑场 · 24帧",
  },
];

export default function LiteraturePage() {
  return (
    <div className="space-literature min-h-screen pt-16">
      <div className="space-grain" />

      <div className="px-6 lg:px-8 py-24" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <SlowIn>
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] mb-16" style={{ color: "var(--sp-muted)" }}>
            空间 02 — 文学
          </p>
        </SlowIn>

        <SlowIn delay={0.1}>
          <h1 className="mb-6" style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.02em",
            color: "var(--sp-text)", fontFamily: "var(--font-reading)",
          }}>
            文学空间。
          </h1>
        </SlowIn>

        <SlowIn delay={0.2}>
          <div style={{ width: "48px", height: "1px", background: "var(--sp-accent)", marginBottom: "1.5rem" }} />
          <p className="text-base leading-relaxed max-w-lg mb-32" style={{ color: "var(--sp-muted)" }}>
            三个独立展馆。诗词、书、电影——各自有呼吸的节奏。
          </p>
        </SlowIn>

        <div className="space-y-0">
          {pavilions.map((p, i) => (
            <SlowIn key={p.title} delay={0.1 * i}>
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
                    <span className="text-[10px] font-medium uppercase tracking-[0.3em]"
                      style={{ color: "var(--sp-muted)" }}>
                      {p.mood}
                    </span>
                    <span className="text-sm transition-transform duration-500 group-hover:translate-x-2"
                      style={{ color: "var(--sp-accent)" }}>
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </SlowIn>
          ))}
        </div>
      </div>
    </div>
  );
}
