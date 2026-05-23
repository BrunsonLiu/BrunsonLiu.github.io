"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlowIn, AccentLine, FadeIn } from "../components/space";
import { thoughts } from "../data/reflection";
import Link from "next/link";

export default function ReflectionPage() {
  const [expandedIdx, setExpandedIdx] = useState(null);

  return (
    <div className="space-reflection min-h-screen">
      <div className="space-grain" />

      <div className="refl-hero-bg">
        <img
          src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=abstract%20diagonal%20light%20beam%20cutting%20through%20dark%20architectural%20space%2C%20warm%20amber%20light%20streaks%20through%20window%20blinds%2C%20dust%20particles%20in%20air%2C%20concrete%20texture%2C%20cinematic%20still%20photography%2C%20contemplative%20atmosphere%2C%20no%20people%2C%20wide%20angle&image_size=landscape_16_9"
          alt=""
          className="refl-hero-bg-img"
          draggable={false}
        />
        <div className="refl-hero-bg-overlay" />
      </div>

      <div className="refl-content px-6 lg:px-8 pt-16" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <FadeIn>
          <Link href="/" prefetch={false} className="text-[10px] font-medium uppercase tracking-[0.4em] inline-block mb-16 transition-opacity duration-300 hover:opacity-60"
            style={{ color: "var(--sp-muted)" }}>
            ← 空间
          </Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] mb-4" style={{ color: "var(--sp-muted)", opacity: 0.5 }}>
            空间 05
          </p>
          <h1 className="mb-4" style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 300, lineHeight: 1.2, letterSpacing: "0.08em",
            color: "var(--sp-text)", fontFamily: "var(--font-reading)",
          }}>
            思考
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <AccentLine width="32px" />
          <p className="text-sm leading-relaxed max-w-sm mb-4" style={{ color: "var(--sp-muted)", letterSpacing: "0.04em", fontStyle: "italic" }}>
            I think, therefore I am.
          </p>
          <p className="text-[10px] mb-20" style={{ color: "var(--sp-muted)", opacity: 0.4 }}>
            — René Descartes
          </p>
        </FadeIn>

        <div className="refl-list">
          {thoughts.map((thought, i) => {
            const isExpanded = expandedIdx === i;
            const isLong = thought.excerpt.length > 120;
            const displayText = isExpanded || !isLong
              ? thought.excerpt
              : thought.excerpt.slice(0, 120) + "……";

            return (
              <FadeIn key={thought.title} delay={0.04 * i}>
                <div className="refl-card">
                  <button
                    className="refl-card-header"
                    onClick={() => setExpandedIdx(isExpanded ? null : i)}
                  >
                    <div className="refl-card-left">
                      <span className="refl-card-num">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h2 className="refl-card-title">{thought.title}</h2>
                        <div className="refl-card-meta">
                          <span className="refl-card-date">{thought.date}</span>
                          {thought.tags.map((tag) => (
                            <span key={tag} className="refl-card-tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="refl-card-toggle" style={{
                      transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}>
                      +
                    </span>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="refl-card-body">
                          <div className="refl-card-rule" />
                          <p className="refl-card-text">{thought.excerpt}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isExpanded && isLong && (
                    <p className="refl-card-preview">{displayText}</p>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>

        <div style={{ height: "120px" }} />
      </div>
    </div>
  );
}
