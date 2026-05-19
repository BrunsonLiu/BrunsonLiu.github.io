"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlowIn, SectionLabel, AccentLine } from "../../components/space";
import { bookClusters } from "../../data/literature";
import Link from "next/link";

export default function BooksPage() {
  const [openCluster, setOpenCluster] = useState(null);

  return (
    <div className="space-literature min-h-screen pt-16">
      <div className="space-grain" />

      <div className="px-6 lg:px-8 py-24" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <SlowIn>
          <Link href="/literature" className="text-[10px] font-medium uppercase tracking-[0.4em] inline-block mb-16 transition-opacity duration-300 hover:opacity-60"
            style={{ color: "var(--sp-muted)" }}>
            ← 文学空间
          </Link>
        </SlowIn>

        <SlowIn delay={0.1}>
          <h1 className="mb-4" style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.01em",
            color: "var(--sp-text)", fontFamily: "var(--font-reading)",
          }}>
            书。
          </h1>
        </SlowIn>

        <SlowIn delay={0.2}>
          <AccentLine />
          <p className="text-base leading-relaxed max-w-lg mb-32" style={{ color: "var(--sp-muted)" }}>
            一个人的精神书架。按主题，而非作者。
          </p>
        </SlowIn>

        <SlowIn delay={0.3}>
          <SectionLabel>专题</SectionLabel>
        </SlowIn>

        {bookClusters.map((cluster, i) => (
          <SlowIn key={cluster.id} delay={0.05 * i}>
            <div className="mb-2">
              <button
                onClick={() => setOpenCluster(openCluster === cluster.id ? null : cluster.id)}
                className="w-full text-left group"
              >
                <div className="py-8 px-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 transition-all duration-700"
                  style={{ borderBottom: "1px solid var(--sp-surface-border)" }}>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium mb-2 transition-colors duration-500"
                      style={{
                        color: openCluster === cluster.id ? "var(--sp-accent)" : "var(--sp-text)",
                        fontFamily: "var(--font-reading)",
                        letterSpacing: "0.02em",
                      }}>
                      {cluster.title}
                    </h3>
                    <p className="text-sm leading-relaxed max-w-md transition-opacity duration-500"
                      style={{
                        color: "var(--sp-muted)",
                        fontFamily: "var(--font-reading)",
                        fontStyle: "italic",
                        opacity: openCluster === cluster.id ? 1 : 0.6,
                      }}>
                      {cluster.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="text-[10px] font-medium uppercase tracking-[0.3em]"
                      style={{ color: "var(--sp-muted)" }}>
                      {cluster.mood}
                    </span>
                    <motion.span
                      animate={{ rotate: openCluster === cluster.id ? 45 : 0 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                      className="text-lg inline-block"
                      style={{ color: openCluster === cluster.id ? "var(--sp-accent)" : "var(--sp-muted)" }}
                    >
                      +
                    </motion.span>
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {openCluster === cluster.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-2 pt-8 pb-12" style={{ maxWidth: "var(--reading-width)" }}>
                      <div className="mb-12">
                        <SectionLabel>书</SectionLabel>
                        <div className="space-y-6">
                          {cluster.books.map((book) => (
                            <div key={book.title}>
                              <div className="flex items-baseline gap-3 mb-1">
                                <h4 className="text-base font-medium" style={{ color: "var(--sp-text)", fontFamily: "var(--font-reading)" }}>{book.title}</h4>
                                <span className="text-xs" style={{ color: "var(--sp-muted)" }}>{book.author}</span>
                              </div>
                              <p className="text-sm leading-relaxed" style={{ color: "var(--sp-accent)", fontFamily: "var(--font-reading)", fontStyle: "italic" }}>{book.note}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      {cluster.thought && (
                        <div>
                          <SectionLabel>我的想法</SectionLabel>
                          <p className="text-base leading-loose" style={{ color: "var(--sp-text)", fontFamily: "var(--font-reading)", opacity: 0.8 }}>
                            {cluster.thought}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SlowIn>
        ))}

        <SlowIn delay={0.5}>
          <div className="mt-24 pt-12" style={{ borderTop: "1px solid var(--sp-surface-border)" }}>
            <p className="text-sm leading-loose max-w-lg" style={{ color: "var(--sp-muted)", fontFamily: "var(--font-reading)", fontStyle: "italic" }}>
              这些主题之间不是孤立的。革命里有孤独，荒诞里有英雄主义，纯真里有宇宙。
              它们交叉、重叠，构成了一个完整的精神地图。
            </p>
          </div>
        </SlowIn>
      </div>
    </div>
  );
}
