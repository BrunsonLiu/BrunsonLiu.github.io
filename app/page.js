"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn, SectionLabel } from "./components/space";
import { profile, education, researchAreas, skills, projects, spaces } from "./data/academic";

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="space-academic min-h-screen" ref={containerRef}>
      <div className="space-grain" />

      <motion.section
        className="min-h-screen flex flex-col justify-center px-6 lg:px-8 pt-12"
        style={{ maxWidth: "var(--max-width)", margin: "0 auto", opacity: heroOpacity }}
      >
        <motion.p className="text-[10px] font-medium uppercase tracking-[0.4em] mb-16" style={{ color: "var(--sp-muted)" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
          空间 01 — 学术
        </motion.p>

        <motion.h1 className="leading-[0.9] mb-6"
          style={{ fontSize: "clamp(48px, 10vw, 120px)", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--sp-text)", fontFamily: "var(--font-display)" }}
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          {profile.name}
        </motion.h1>

        <motion.div style={{ width: "64px", height: "1px", background: "var(--sp-accent)", marginBottom: "1.5rem" }}
          initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />

        <motion.p className="text-lg mb-3" style={{ color: "var(--sp-accent)", fontWeight: 400 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}>
          {profile.role}
        </motion.p>

        <motion.p className="text-sm leading-relaxed max-w-lg mb-10" style={{ color: "var(--sp-muted)" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }}>
          {profile.bio}
        </motion.p>

        <motion.div className="flex flex-wrap gap-x-8 gap-y-2 mb-12"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.8 }}>
          {profile.keywords.map((a) => (
            <span key={a} className="text-xs font-medium tracking-wide" style={{ color: "var(--sp-muted)" }}>{a}</span>
          ))}
        </motion.div>

        <motion.div className="flex gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1, duration: 0.8 }}>
          <a href="/research" className="text-xs font-bold uppercase tracking-[0.15em] px-5 py-2.5 transition-opacity duration-300 hover:opacity-80" style={{ background: "var(--sp-brand)", color: "#fff" }}>研究</a>
          <a href="/about" className="text-xs font-bold uppercase tracking-[0.15em] px-5 py-2.5 transition-opacity duration-300 hover:opacity-80" style={{ border: "1px solid var(--sp-surface-border)", color: "var(--sp-text)" }}>关于</a>
        </motion.div>
      </motion.section>

      <section className="px-6 lg:px-8 py-24" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <FadeIn><SectionLabel>研究</SectionLabel></FadeIn>
        <FadeIn delay={0.1}><h2 className="text-3xl sm:text-4xl font-bold mb-16" style={{ color: "var(--sp-text)", fontFamily: "var(--font-display)" }}>研究方向</h2></FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {researchAreas.map((area, i) => (
            <FadeIn key={area.tag} delay={i * 0.1}>
              <div className="p-6 h-full" style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-surface-border)" }}>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: "var(--sp-brand)" }}>{area.tag}</span>
                <h3 className="text-lg font-bold mb-3" style={{ color: "var(--sp-text)" }}>{area.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--sp-muted)" }}>{area.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-8 py-16" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <FadeIn><SectionLabel>背景</SectionLabel></FadeIn>
        <FadeIn delay={0.1}><h2 className="text-3xl sm:text-4xl font-bold mb-16" style={{ color: "var(--sp-text)", fontFamily: "var(--font-display)" }}>教育经历</h2></FadeIn>
        <div className="space-y-8">
          {education.map((edu, i) => (
            <FadeIn key={edu.school} delay={i * 0.1}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 pb-8" style={{ borderBottom: "1px solid var(--sp-surface-border)" }}>
                <div>
                  <h3 className="text-base font-bold" style={{ color: "var(--sp-text)" }}>{edu.degree}</h3>
                  <p className="text-sm" style={{ color: "var(--sp-muted)" }}>{edu.school}</p>
                </div>
                <span className="text-xs font-medium" style={{ color: "var(--sp-muted)" }}>{edu.period}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-8 py-16" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <FadeIn><SectionLabel>能力</SectionLabel></FadeIn>
        <FadeIn delay={0.1}><h2 className="text-3xl sm:text-4xl font-bold mb-16" style={{ color: "var(--sp-text)", fontFamily: "var(--font-display)" }}>技术栈</h2></FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(skills).map(([category, items], i) => (
            <FadeIn key={category} delay={i * 0.1}>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "var(--sp-accent)" }}>{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item} className="text-xs px-3 py-1.5" style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-surface-border)", color: "var(--sp-text)" }}>{item}</span>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-8 py-16" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <FadeIn><SectionLabel>项目</SectionLabel></FadeIn>
        <FadeIn delay={0.1}><h2 className="text-3xl sm:text-4xl font-bold mb-16" style={{ color: "var(--sp-text)", fontFamily: "var(--font-display)" }}>代表性工作</h2></FadeIn>
        <div className="space-y-12">
          {projects.map((proj, i) => (
            <FadeIn key={proj.title} delay={i * 0.15}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="overflow-hidden" style={{ border: "1px solid var(--sp-surface-border)" }}>
                  <img src={proj.image} alt={proj.title} loading="lazy" className="w-full h-48 lg:h-64 object-cover" style={{ filter: "brightness(0.7) contrast(1.1)" }} />
                </div>
                <div>
                  <div className="flex gap-2 mb-3">
                    {proj.tags.map((t) => (
                      <span key={t} className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--sp-brand)" }}>{t}</span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: "var(--sp-text)" }}>{proj.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--sp-muted)" }}>{proj.desc}</p>
                  <a href="/research" className="text-xs font-medium underline-hover" style={{ color: "var(--sp-accent)" }}>了解更多 →</a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-8 pb-24" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <div style={{ height: "1px", background: "var(--sp-surface-border)", marginBottom: "4rem" }} />
        <FadeIn><SectionLabel>其他空间</SectionLabel></FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {spaces.map((space, i) => (
            <FadeIn key={space.name} delay={i * 0.1}>
              <a href={space.href} className="block p-6 transition-all duration-300 hover:translate-y-[-2px]"
                style={{ background: space.palette, border: "1px solid var(--sp-surface-border)" }}>
                <div style={{ width: "24px", height: "2px", background: space.accent, marginBottom: "1rem" }} />
                <p className="text-sm font-bold mb-1" style={{ color: "var(--sp-text)" }}>{space.name}</p>
                <p className="text-xs" style={{ color: "var(--sp-muted)" }}>{space.desc}</p>
              </a>
            </FadeIn>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <FadeIn delay={0.1}>
            <a href="/competition" className="block p-6 transition-all duration-300 hover:translate-y-[-2px]"
              style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-surface-border)" }}>
              <div style={{ width: "24px", height: "2px", background: "var(--sp-accent)", marginBottom: "1rem" }} />
              <p className="text-sm font-bold mb-1" style={{ color: "var(--sp-text)" }}>竞赛 & 实习</p>
              <p className="text-xs" style={{ color: "var(--sp-muted)" }}>美赛 · 运筹学会 · CXMT · 丝宝</p>
            </a>
          </FadeIn>
          <FadeIn delay={0.2}>
            <a href="/contact" className="block p-6 transition-all duration-300 hover:translate-y-[-2px]"
              style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-surface-border)" }}>
              <div style={{ width: "24px", height: "2px", background: "var(--sp-accent)", marginBottom: "1rem" }} />
              <p className="text-sm font-bold mb-1" style={{ color: "var(--sp-text)" }}>联系我</p>
              <p className="text-xs" style={{ color: "var(--sp-muted)" }}>Email · GitHub · 微信公众号</p>
            </a>
          </FadeIn>
          <FadeIn delay={0.3}>
            <a href="/about" className="block p-6 transition-all duration-300 hover:translate-y-[-2px]"
              style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-surface-border)" }}>
              <div style={{ width: "24px", height: "2px", background: "var(--sp-accent)", marginBottom: "1rem" }} />
              <p className="text-sm font-bold mb-1" style={{ color: "var(--sp-text)" }}>关于</p>
              <p className="text-xs" style={{ color: "var(--sp-muted)" }}>完整背景与技术栈</p>
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
