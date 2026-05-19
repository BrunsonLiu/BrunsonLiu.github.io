"use client";
import { FadeIn, SectionLabel } from "../components/space";
import { profile, education, skills } from "../data/academic";
import { contact } from "../data/contact";

export default function AboutPage() {
  return (
    <div className="space-academic min-h-screen pt-16">
      <div className="space-grain" />

      <div className="px-6 lg:px-8 py-24" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <FadeIn>
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] mb-16" style={{ color: "var(--sp-muted)" }}>
            关于
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="mb-6" style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.04em",
            color: "var(--sp-text)", fontFamily: "var(--font-display)",
          }}>
            {profile.name}
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ width: "64px", height: "1px", background: "var(--sp-accent)", marginBottom: "1.5rem" }} />
          <p className="text-lg mb-3" style={{ color: "var(--sp-accent)", fontWeight: 400 }}>
            {profile.role}
          </p>
          <p className="text-base leading-relaxed max-w-lg mb-24" style={{ color: "var(--sp-muted)" }}>
            {profile.bio}
          </p>
        </FadeIn>

        <FadeIn>
          <SectionLabel>教育</SectionLabel>
        </FadeIn>
        <div className="space-y-6 mb-24">
          {education.map((edu, i) => (
            <FadeIn key={edu.school} delay={i * 0.1}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 pb-6"
                style={{ borderBottom: "1px solid var(--sp-surface-border)" }}>
                <div>
                  <h3 className="text-base font-bold" style={{ color: "var(--sp-text)" }}>{edu.degree}</h3>
                  <p className="text-sm" style={{ color: "var(--sp-muted)" }}>{edu.school}</p>
                </div>
                <span className="text-xs font-medium" style={{ color: "var(--sp-muted)" }}>{edu.period}</span>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <SectionLabel>技术栈</SectionLabel>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {Object.entries(skills).map(([category, items], i) => (
            <FadeIn key={category} delay={i * 0.1}>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "var(--sp-accent)" }}>{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item} className="text-xs px-3 py-1.5"
                    style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-surface-border)", color: "var(--sp-text)" }}>
                    {item}
                  </span>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <SectionLabel>联系</SectionLabel>
        </FadeIn>
        <div className="space-y-0 max-w-xl">
          <FadeIn>
            <a href={`mailto:${contact.email}`}
              className="flex items-center gap-6 py-6 transition-all duration-300 group"
              style={{ borderBottom: "1px solid var(--sp-surface-border)" }}>
              <div className="flex-1">
                <p className="text-sm font-bold mb-1" style={{ color: "var(--sp-text)" }}>Email</p>
                <p className="text-xs" style={{ color: "var(--sp-muted)" }}>{contact.email}</p>
              </div>
              <span className="text-xs group-hover:translate-x-1 transition-transform duration-300" style={{ color: "var(--sp-accent)" }}>→</span>
            </a>
          </FadeIn>
          <FadeIn delay={0.1}>
            <a href={contact.github} target="_blank" rel="noreferrer"
              className="flex items-center gap-6 py-6 transition-all duration-300 group"
              style={{ borderBottom: "1px solid var(--sp-surface-border)" }}>
              <div className="flex-1">
                <p className="text-sm font-bold mb-1" style={{ color: "var(--sp-text)" }}>GitHub</p>
                <p className="text-xs" style={{ color: "var(--sp-muted)" }}>{contact.githubLabel}</p>
              </div>
              <span className="text-xs group-hover:translate-x-1 transition-transform duration-300" style={{ color: "var(--sp-accent)" }}>→</span>
            </a>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex items-center gap-6 py-6" style={{ borderBottom: "1px solid var(--sp-surface-border)" }}>
              <div className="flex-1">
                <p className="text-sm font-bold mb-1" style={{ color: "var(--sp-text)" }}>微信公众号</p>
                <p className="text-xs" style={{ color: "var(--sp-muted)" }}>{contact.wechat}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
