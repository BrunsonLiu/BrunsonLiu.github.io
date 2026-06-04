"use client";
import { useState } from "react";
import { FadeIn } from "./components/space";
import { profile, education, researchAreas, skills, projects, competitions, internships, spaces } from "./data/academic";
import Link from "next/link";

function ProjectModal({ project, onClose }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={onClose}>
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg"
        style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-surface-border)" }}
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center text-xl leading-none rounded-full"
          style={{ color: "var(--sp-muted)", background: "var(--sp-surface-border)" }}>&times;</button>

        {project.image && (
          <div className="w-full h-40 sm:h-52 overflow-hidden rounded-t-lg"
            style={!imgOk ? { background: "linear-gradient(135deg, #1a1a2a 0%, #2a2a3a 50%, #0a0a1a 100%)" } : {}}>
            {imgOk && (
              <img src={project.image} alt={project.title} className="w-full h-full object-cover"
                onError={() => setImgOk(false)} />
            )}
          </div>
        )}

        <div className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-bold tracking-[0.15em] px-2 py-0.5 rounded"
            style={{ color: "var(--sp-accent)", border: "1px solid var(--sp-accent)33" }}>
            {project.label}
          </span>
          <span className="text-sm" style={{ color: "var(--sp-muted)" }}>{project.period}</span>
        </div>

        <h2 className="text-xl font-semibold mb-1" style={{ color: "var(--sp-text)" }}>
          {project.title}
        </h2>
        {project.subtitle && (
          <p className="text-sm mb-4" style={{ color: "var(--sp-accent)" }}>{project.subtitle}</p>
        )}

        <div className="flex flex-wrap items-center gap-2 mb-6">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded"
              style={{ color: "var(--sp-muted)", background: "var(--sp-surface-border)" }}>{tag}</span>
          ))}
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              className="text-xs px-3 py-1 rounded ml-auto transition-opacity duration-200 hover:opacity-70"
              style={{ color: "var(--sp-accent)", border: "1px solid var(--sp-accent)33" }}>
              {project.link.includes("github.com") ? "代码 ↗" : "试玩 ↗"}
            </a>
          )}
        </div>

        <div className="whitespace-pre-line text-sm leading-relaxed" style={{ color: "var(--sp-muted)" }}>
          {project.detail}
        </div>
        </div>
      </div>
    </div>
  );
}

function ExpandableBlock({ item, i }) {
  const [open, setOpen] = useState(false);
  const isLong = item.detail.length > 100;
  const preview = isLong ? item.detail.split("\n").slice(0, 2).join("\n") + "…" : item.detail;

  return (
    <FadeIn key={item.id} delay={i * 0.05}>
      <div className="py-3 cursor-pointer" style={{ borderBottom: "1px solid var(--sp-surface-border)" }}
        onClick={() => isLong && setOpen(!open)}>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
          <div className="flex items-baseline gap-3">
            <p className="text-base font-medium" style={{ color: "var(--sp-text)" }}>{item.name}</p>
            <span className="text-sm" style={{ color: "var(--sp-accent)" }}>{item.role}</span>
          </div>
          <span className="text-sm" style={{ color: "var(--sp-muted)" }}>{item.period}</span>
        </div>
        <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "var(--sp-muted)" }}>
          {open ? item.detail : preview}
        </p>
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {item.tags.map((tag) => (
              <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded"
                style={{ color: "var(--sp-muted)", background: "var(--sp-surface-border)" }}>{tag}</span>
            ))}
          </div>
        )}
        {isLong && (
          <span className="inline-block mt-1 text-xs" style={{ color: "var(--sp-accent)" }}>
            {open ? "收起 ▲" : "展开 ▼"}
          </span>
        )}
      </div>
    </FadeIn>
  );
}

function SectionLabel({ text }) {
  return (
    <FadeIn>
      <p className="text-xs font-medium uppercase tracking-[0.3em] mb-3" style={{ color: "var(--sp-accent)" }}>
        {text}
      </p>
    </FadeIn>
  );
}

export default function HomePage() {
  const [selectedProj, setSelectedProj] = useState(null);

  return (
    <div className="space-academic min-h-screen">
      <div className="space-grain" />

      {selectedProj && <ProjectModal project={selectedProj} onClose={() => setSelectedProj(null)} />}

      <div className="px-6 lg:px-8 py-16" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <FadeIn>
          <h1 className="mb-2" style={{
            fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.02em",
            color: "var(--sp-text)",
          }}>
            {profile.name}
          </h1>
          <p className="text-base mb-3" style={{ color: "var(--sp-accent)" }}>{profile.role}</p>
          <p className="text-base leading-relaxed max-w-lg mb-4" style={{ color: "var(--sp-muted)" }}>
            {profile.bio}
          </p>
          <div className="flex flex-wrap items-center gap-2 mb-12">
            <a href={profile.contacts.github.url} target="_blank" rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 rounded transition-opacity duration-200 hover:opacity-70"
              style={{ border: "1px solid var(--sp-surface-border)", color: "var(--sp-text)" }}>
              GitHub ↗
            </a>
            <a href={profile.contacts.email.url}
              className="text-xs px-3 py-1.5 rounded transition-opacity duration-200 hover:opacity-70"
              style={{ border: "1px solid var(--sp-surface-border)", color: "var(--sp-text)" }}>
              Email
            </a>
            <a href={profile.contacts.cv.url} target="_blank" rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 rounded transition-opacity duration-200 hover:opacity-70"
              style={{ border: "1px solid var(--sp-surface-border)", color: "var(--sp-text)" }}>
              简历 PDF ↓
            </a>
            <span className="text-xs px-3 py-1.5 rounded"
              style={{ border: "1px solid var(--sp-surface-border)", color: "var(--sp-muted)" }}>
              公众号 · {profile.contacts.wechat.text}
            </span>
          </div>
        </FadeIn>

        <SectionLabel text="教育" />
        <div className="mb-12">
          {education.map((edu, i) => (
            <FadeIn key={edu.school} delay={i * 0.05}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 py-3"
                style={{ borderBottom: "1px solid var(--sp-surface-border)" }}>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-medium" style={{ color: "var(--sp-text)" }}>{edu.degree}</p>
                    {edu.status === "next" && (
                      <span className="text-[10px] font-bold tracking-[0.15em] px-1.5 py-0.5 rounded"
                        style={{ color: "var(--sp-accent)", border: "1px solid var(--sp-accent)33" }}>
                        NEXT
                      </span>
                    )}
                  </div>
                  <p className="text-sm" style={{ color: "var(--sp-muted)" }}>{edu.school}</p>
                </div>
                <span className="text-sm" style={{ color: "var(--sp-muted)" }}>{edu.period}</span>
              </div>
            </FadeIn>
          ))}
        </div>

        <SectionLabel text="研究方向" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12">
          {researchAreas.map((area, i) => (
            <FadeIn key={area.tag} delay={i * 0.05}>
              <div className="p-4 rounded-md" style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-surface-border)" }}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold tracking-[0.15em]" style={{ color: "var(--sp-accent)" }}>{area.tag}</span>
                </div>
                <p className="text-base font-medium mb-1" style={{ color: "var(--sp-text)" }}>{area.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--sp-muted)" }}>{area.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <SectionLabel text="项目" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {projects.map((proj, i) => (
            <FadeIn key={proj.id} delay={i * 0.05}>
              <div className="rounded-md cursor-pointer transition-all duration-200 hover:scale-[1.02] group overflow-hidden h-full flex flex-col"
                style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-surface-border)" }}
                onClick={() => setSelectedProj(proj)}>
                {proj.image && (
                  <div className="w-full h-20 overflow-hidden flex-shrink-0" style={{ background: "var(--sp-surface-border)" }}>
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = "none"; }} />
                  </div>
                )}
                <div className="px-3 py-3 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-[10px] font-bold tracking-[0.1em] px-1.5 py-0.5 rounded"
                      style={{ color: "var(--sp-accent)", border: "1px solid var(--sp-accent)33" }}>
                      {proj.label}
                    </span>
                    <span className="text-xs" style={{ color: "var(--sp-muted)" }}>{proj.period}</span>
                  </div>
                  <p className="text-sm font-medium mb-0.5" style={{ color: "var(--sp-text)" }}>
                    {proj.title}
                  </p>
                  {proj.subtitle && (
                    <p className="text-xs mb-2" style={{ color: "var(--sp-accent)" }}>{proj.subtitle}</p>
                  )}
                  <p className="text-xs leading-relaxed mb-2 flex-1" style={{ color: "var(--sp-muted)" }}>
                    {proj.desc}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded"
                        style={{ color: "var(--sp-muted)", background: "var(--sp-surface-border)" }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <SectionLabel text="竞赛" />
        <div className="mb-12">
          {competitions.map((comp, i) => (
            <ExpandableBlock key={comp.id} item={comp} i={i} />
          ))}
        </div>

        <SectionLabel text="实习" />
        <div className="mb-12">
          {internships.map((intern, i) => (
            <ExpandableBlock key={intern.id} item={intern} i={i} />
          ))}
        </div>

        <div style={{ height: "60px" }} />

        <footer className="pt-8 mt-8" style={{ borderTop: "1px solid var(--sp-surface-border)" }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs" style={{ color: "var(--sp-muted)" }}>
            <p>© 2026 Brunson · 武汉大学 → 中国科学技术大学</p>
            <p>Last updated: 2026.05</p>
          </div>
        </footer>
      </div>
    </div>
  );
}