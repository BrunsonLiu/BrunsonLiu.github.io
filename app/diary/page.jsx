﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGamepad, FaChartLine, FaBasketballBall, FaRunning, FaLightbulb, FaComments, FaYinYang } from "react-icons/fa";
import { PokerFlipGrid, PokerFlipCard } from "../components/poker-flip";
import RandomMumbling from "../components/RandomMumbling";
import { SpringEnter } from "../components/theme-easter-eggs";

const diaryTopics = [
  {
    title: "Hobbies",
    subtitle: "爱好与生活",
    description: "League of Legends, stock trading, basketball & NBA, and long distance running",
    href: "/diary/hobbies",
    icon: <FaGamepad size={32} />,
    backContent: "科研之外，这些爱好是我保持创造力的秘密武器",
    tags: ["LoL", "NBA", "Stock Trading", "Running"],
    stats: ["4 Hobbies", "∞ Passion"],
    formula: "♥",
  },
  {
    title: "Reflections",
    subtitle: "思考与成长",
    description: "Thoughts on life, growth, and learning",
    href: "/diary/reflections",
    icon: <FaComments size={32} />,
    backContent: "每次复盘都是一次自我迭代——就像优化算法的每一次iteration",
    tags: ["Growth", "Learning", "Self-discovery"],
    stats: ["Life Lessons", "Continuous Journey"],
    formula: "∂",
  },
  {
    title: "Philosophy",
    subtitle: "哲学与思想",
    description: "Ideas and perspectives that shape my thinking",
    href: "/diary/philosophy",
    icon: <FaYinYang size={32} />,
    backContent: "好的哲学家和好的算法工程师一样，都善于在复杂系统中找到规律",
    tags: ["Ideas", "Perspectives", "Thinking"],
    stats: ["Deep Thoughts", "Open Mind"],
    formula: "∞",
  },
];

export default function DiaryPage() {
  return (
    <main className="page-diary mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 min-h-screen relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72  blur-3xl" style={{ background: "var(--page-glow)", opacity: 0.3 }} />
        <div className="absolute bottom-20 right-10 w-96 h-96  blur-3xl" style={{ background: "var(--page-glow)", opacity: 0.3 }} />
      </div>

      {/* 页面标题 */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mb-20"
      >
        <p className="text-[10px]  tracking-[0.3em] uppercase mb-6" style={{ color: "var(--page-brand)" }}>
          Chapter 03 — Diary
        </p>
        <h1
          className="max-w-4xl"
          style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 0.95, letterSpacing: "-0.03em" }}
        >
          <span className="block" style={{ color: "var(--text)" }}>Beyond</span>
          <span className="block gradient-text">numbers &</span>
          <span className="block" style={{ color: "var(--text)", opacity: 0.3 }}>algorithms.</span>
        </h1>
        <p className="max-w-lg mt-8 text-base leading-relaxed" style={{ color: "var(--muted)", opacity: 0.6 }}>
          Life, thoughts, and personal reflections beyond the technical world.
        </p>
      </motion.div>

      {/* 随机碎碎念 - 非功利性内容 */}
      <div className="relative z-10 max-w-2xl mx-auto mb-20">
        <RandomMumbling />
      </div>

      {/* 扑克翻转卡片网格 */}
      <PokerFlipGrid>
        {diaryTopics.map((topic, i) => (
          <SpringEnter key={i} delay={i * 0.08}>
            <a href={topic.href} className="block">
              <PokerFlipCard
              theme="diary"
              className=""
              flipOnHover={true}
              delay={i}
              size="medium"
              front={
                <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                    style={{ color: "var(--page-brand)" }}
                  >
                    {topic.icon}
                  </motion.div>
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ color: "var(--text)" }}
                  >
                    {topic.title}
                  </h3>
                  <p className="text-xs  tracking-wider mb-4" style={{ color: "var(--page-brand)", opacity: 0.6 }}>
                    {topic.subtitle}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)", opacity: 0.7 }}>
                    {topic.description}
                  </p>
                  <div className="absolute bottom-4 right-4 opacity-20" style={{ color: "var(--page-brand)" }}>
                    <span className="text-[8px]  tracking-widest uppercase">Flip to explore</span>
                  </div>
                </div>
              }
              back={
                <div className="h-full flex flex-col items-center justify-center p-8 text-center" style={{ background: "linear-gradient(135deg, var(--page-surface) 0%, transparent 100%)" }}>
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 blur-xl opacity-30" style={{ background: "var(--page-brand)" }} />
                    <span className="relative text-2xl" style={{ color: "var(--page-brand)" }}>
                      {topic.icon}
                    </span>
                  </div>
                  <blockquote className="text-sm italic leading-relaxed mb-6 max-w-xs" style={{ color: "var(--text)", opacity: 0.8 }}>
                    "{topic.backContent}"
                  </blockquote>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {topic.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="text-[10px]  tracking-wider px-3 py-1 "
                        style={{
                          background: "var(--page-surface)",
                          color: "var(--page-brand)",
                          border: "1px solid var(--page-surface-border)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-6 mt-4">
                    {topic.stats.map((stat, j) => (
                      <div key={j} className="text-center">
                        <span className="text-xs font-bold gradient-text" style={{ color: "var(--page-brand)" }}>
                          {stat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              }
            />
          </a>
        </SpringEnter>
        ))}
      </PokerFlipGrid>
    </main>
  );
}
