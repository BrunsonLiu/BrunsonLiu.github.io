"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile, education, skills } from "./data/academic";
import { researchProjects } from "./data/research";
import { competitions, internships } from "./data/experience";

const ease = [0.25, 0.1, 0.25, 1];

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="space-academic min-h-screen" ref={containerRef}>
      <div className="space-grain" />
      <div className="space-vignette" />

      <motion.section className="ed-hero" style={{ opacity: heroOpacity }}>
        <div className="ed-hero-inner">
          <motion.span
            className="ed-hero-eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.4, duration: 1.5 }}
          >
            空间 01 — 学术
          </motion.span>

          <motion.h1
            className="ed-hero-name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.2, ease }}
          >
            {profile.name}
          </motion.h1>

          <motion.div
            className="ed-hero-rule"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.0, duration: 1.5, ease }}
          />

          <motion.p
            className="ed-hero-role"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1.2 }}
          >
            {profile.role}
          </motion.p>

          <motion.p
            className="ed-hero-bio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.2 }}
          >
            {profile.bio}
          </motion.p>

          <motion.div
            className="ed-hero-edu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 1.2 }}
          >
            {education.map((edu) => (
              <div key={edu.school} className="ed-hero-edu-item">
                <span className="ed-hero-edu-school">{edu.school}</span>
                <span className="ed-hero-edu-sep">·</span>
                <span className="ed-hero-edu-degree">{edu.degree}</span>
                <span className="ed-hero-edu-period">{edu.period}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.div
        className="ed-epigraph"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease }}
      >
        <p className="ed-epigraph-text">
          优化不是寻找最优解，而是在约束中理解世界。
        </p>
        <span className="ed-epigraph-source">— 研究笔记</span>
      </motion.div>

      <section className="ed-section">
        <div className="ed-section-head">
          <h2 className="ed-section-title">研究</h2>
          <span className="ed-section-en">Research</span>
        </div>
        <div className="ed-research-list">
          {researchProjects.map((proj, i) => (
            <motion.div
              key={proj.title}
              className="ed-research-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease }}
            >
              <div className="ed-research-left">
                <span className="ed-research-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="ed-research-formula">{proj.formula}</span>
              </div>
              <div className="ed-research-right">
                <span className="ed-research-subtitle">{proj.subtitle}</span>
                <h3 className="ed-research-name">{proj.title}</h3>
                <p className="ed-research-desc">{proj.desc}</p>
                <div className="ed-research-tags">
                  {proj.tags.map((t) => (
                    <span key={t} className="ed-research-tag">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="ed-section">
        <div className="ed-section-head">
          <h2 className="ed-section-title">轨迹</h2>
          <span className="ed-section-en">Journey</span>
        </div>
        <div className="ed-timeline">
          {education.map((edu) => (
            <motion.div
              key={edu.school}
              className="ed-tl-item"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease }}
            >
              <span className="ed-tl-dot ed-tl-dot-edu" />
              <span className="ed-tl-period">{edu.period}</span>
              <h3 className="ed-tl-title">{edu.school}</h3>
              <p className="ed-tl-sub">{edu.degree}</p>
            </motion.div>
          ))}
          <div className="ed-tl-sep" />
          {competitions.map((comp) => (
            <motion.div
              key={comp.title}
              className="ed-tl-item"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease }}
            >
              <span className="ed-tl-dot ed-tl-dot-comp" />
              <span className="ed-tl-period">{comp.stats.join(" · ")}</span>
              <h3 className="ed-tl-title">{comp.title}</h3>
              <p className="ed-tl-sub">{comp.subtitle}</p>
              <p className="ed-tl-desc">{comp.desc}</p>
              <div className="ed-tl-tags">
                {comp.tags.map((t) => (
                  <span key={t} className="ed-tl-tag">{t}</span>
                ))}
              </div>
              {comp.insight && <p className="ed-tl-insight">{comp.insight}</p>}
            </motion.div>
          ))}
          <div className="ed-tl-sep" />
          {internships.map((intern) => (
            <motion.div
              key={intern.title}
              className="ed-tl-item"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease }}
            >
              <span className="ed-tl-dot ed-tl-dot-intern" />
              <span className="ed-tl-period">{intern.stats.join(" · ")}</span>
              <h3 className="ed-tl-title">{intern.title}</h3>
              <p className="ed-tl-sub">{intern.subtitle}</p>
              <p className="ed-tl-desc">{intern.desc}</p>
              <div className="ed-tl-tags">
                {intern.tags.map((t) => (
                  <span key={t} className="ed-tl-tag">{t}</span>
                ))}
              </div>
              {intern.insight && <p className="ed-tl-insight">{intern.insight}</p>}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="ed-section ed-section-last">
        <div className="ed-section-head">
          <h2 className="ed-section-title">工具</h2>
          <span className="ed-section-en">Tools</span>
        </div>
        <div className="ed-skills">
          {Object.entries(skills).map(([cat, items]) => (
            <div key={cat} className="ed-skill-row">
              <span className="ed-skill-cat">{cat}</span>
              <div className="ed-skill-items">
                {items.map((item) => (
                  <span key={item} className="ed-skill-chip">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
