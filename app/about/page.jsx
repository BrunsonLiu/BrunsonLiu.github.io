"use client";
import { FadeIn } from "../components/space";
import { profile, education, researchAreas, skills, projects, competitions, internships, spaces } from "../data/academic";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-academic min-h-screen">
      <div className="space-grain" />

      <div className="px-6 lg:px-8 py-16" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <FadeIn>
          <h1 className="mb-2" style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.02em",
            color: "var(--sp-text)",
          }}>
            {profile.name}
          </h1>
          <p className="text-base mb-3" style={{ color: "var(--sp-accent)" }}>
            {profile.role}
          </p>
          <p className="text-base leading-relaxed max-w-lg mb-12" style={{ color: "var(--sp-muted)" }}>
            {profile.bio}
          </p>
        </FadeIn>

        <FadeIn>
          <p className="text-xs font-medium uppercase tracking-[0.3em] mb-3" style={{ color: "var(--sp-accent)" }}>
            教育
          </p>
        </FadeIn>
        <div className="mb-10">
          {education.map((edu, i) => (
            <FadeIn key={edu.school} delay={i * 0.05}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 py-3"
                style={{ borderBottom: "1px solid var(--sp-surface-border)" }}>
                <div>
                  <p className="text-base font-medium" style={{ color: "var(--sp-text)" }}>{edu.degree}</p>
                  <p className="text-sm" style={{ color: "var(--sp-muted)" }}>{edu.school}</p>
                </div>
                <span className="text-sm" style={{ color: "var(--sp-muted)" }}>{edu.period}</span>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <p className="text-xs font-medium uppercase tracking-[0.3em] mb-3" style={{ color: "var(--sp-accent)" }}>
            研究方向
          </p>
        </FadeIn>
        <div className="mb-10">
          {researchAreas.map((area, i) => (
            <FadeIn key={area.tag} delay={i * 0.05}>
              <div className="py-3" style={{ borderBottom: "1px solid var(--sp-surface-border)" }}>
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-xs font-bold tracking-[0.15em]" style={{ color: "var(--sp-accent)" }}>{area.tag}</span>
                  <p className="text-base font-medium" style={{ color: "var(--sp-text)" }}>{area.title}</p>
                </div>
                <p className="text-sm leading-relaxed max-w-md" style={{ color: "var(--sp-muted)" }}>{area.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <p className="text-xs font-medium uppercase tracking-[0.3em] mb-3" style={{ color: "var(--sp-accent)" }}>
            项目
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {projects.map((proj, i) => (
            <FadeIn key={proj.title} delay={i * 0.05}>
              <div className="p-4 rounded-md" style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-surface-border)" }}>
                <p className="text-base font-medium mb-1" style={{ color: "var(--sp-text)" }}>{proj.title}</p>
                <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--sp-muted)" }}>{proj.desc}</p>
                <div className="flex gap-2">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5" style={{ color: "var(--sp-accent)", border: "1px solid var(--sp-surface-border)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <p className="text-xs font-medium uppercase tracking-[0.3em] mb-3" style={{ color: "var(--sp-accent)" }}>
            竞赛
          </p>
        </FadeIn>
        <div className="mb-10">
          {competitions.map((comp, i) => (
            <FadeIn key={comp.id} delay={i * 0.05}>
              <div className="py-3" style={{ borderBottom: "1px solid var(--sp-surface-border)" }}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <div className="flex items-baseline gap-3">
                    <p className="text-base font-medium" style={{ color: "var(--sp-text)" }}>{comp.name}</p>
                    <span className="text-sm" style={{ color: "var(--sp-accent)" }}>{comp.role}</span>
                  </div>
                  <span className="text-sm" style={{ color: "var(--sp-muted)" }}>{comp.period}</span>
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "var(--sp-muted)" }}>{comp.detail}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <p className="text-xs font-medium uppercase tracking-[0.3em] mb-3" style={{ color: "var(--sp-accent)" }}>
            实习
          </p>
        </FadeIn>
        <div className="mb-10">
          {internships.map((intern, i) => (
            <FadeIn key={intern.id} delay={i * 0.05}>
              <div className="py-3" style={{ borderBottom: "1px solid var(--sp-surface-border)" }}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <div className="flex items-baseline gap-3">
                    <p className="text-base font-medium" style={{ color: "var(--sp-text)" }}>{intern.name}</p>
                    <span className="text-sm" style={{ color: "var(--sp-accent)" }}>{intern.role}</span>
                  </div>
                  <span className="text-sm" style={{ color: "var(--sp-muted)" }}>{intern.period}</span>
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "var(--sp-muted)" }}>{intern.detail}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <p className="text-xs font-medium uppercase tracking-[0.3em] mb-3" style={{ color: "var(--sp-accent)" }}>
            技术栈
          </p>
        </FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {Object.entries(skills).map(([category, items], i) => (
            <FadeIn key={category} delay={i * 0.05}>
              <p className="text-sm font-medium mb-2" style={{ color: "var(--sp-text)" }}>{category}</p>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span key={item} className="text-xs px-2 py-1" style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-surface-border)", color: "var(--sp-muted)" }}>
                    {item}
                  </span>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <p className="text-xs font-medium uppercase tracking-[0.3em] mb-3" style={{ color: "var(--sp-accent)" }}>
            空间
          </p>
        </FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {spaces.map((space, i) => (
            <FadeIn key={space.name} delay={i * 0.05}>
              <Link href={space.href} prefetch={false} className="block p-4 rounded-md transition-all duration-300 hover:scale-[1.02]"
                style={{ background: space.palette, border: `1px solid ${space.accent}33` }}>
                <p className="text-sm font-medium mb-1" style={{ color: space.accent }}>{space.name}</p>
                <p className="text-xs" style={{ color: `${space.accent}bb` }}>{space.desc}</p>
              </Link>
            </FadeIn>
          ))}
        </div>

        <div style={{ height: "60px" }} />
      </div>
    </div>
  );
}
