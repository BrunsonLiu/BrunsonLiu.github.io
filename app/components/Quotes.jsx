﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import quotesData from "../../data/quotes.json";
import personalQuotes from "../../data/personal-quotes.json";

const themeColors = {
  cyan: {
    bg: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.12)",
    text: "rgba(255,255,255,0.8)",
    label: "rgba(255,255,255,0.4)",
  },
  gold: {
    bg: "rgba(230,57,70,0.05)",
    border: "rgba(230,57,70,0.15)",
    text: "rgba(230,57,70,0.8)",
    label: "rgba(230,57,70,0.4)",
  },
  purple: {
    bg: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.12)",
    text: "rgba(255,255,255,0.8)",
    label: "rgba(255,255,255,0.4)",
  },
  orange: {
    bg: "rgba(230,57,70,0.05)",
    border: "rgba(230,57,70,0.15)",
    text: "rgba(230,57,70,0.8)",
    label: "rgba(230,57,70,0.4)",
  },
};

const categoryIcons = {
  philosophy: "◎",
  investment: "◇",
  gaming: "⬡",
  sports: "△",
};

// 打字效果语录
function TypewriterQuote({ quote, onComplete }) {
  const [displayed, setDisplayed] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < quote.text.length) {
      const timer = setTimeout(() => {
        setDisplayed((prev) => prev + quote.text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 30 + Math.random() * 20);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      setTimeout(onComplete, 2000);
    }
  }, [currentIndex, quote, onComplete]);

  return (
    <motion.p
      className="text-lg lg:text-xl leading-relaxed mb-6 font-light"
      style={{ color: "var(--text)" }}
    >
      "{displayed}"
      <motion.span
        className="inline-block w-0.5 h-5 ml-1"
        style={{ background: "var(--brand)" }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </motion.p>
  );
}

// 淡入语录卡片
function QuoteCard({ quote, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const theme = themeColors[quote.theme] || themeColors.cyan;

  return (
    <motion.div
      ref={ref}
      className="relative p-8 lg:p-12"
      style={{
        background: theme.bg,
        border: `1px solid ${theme.border}`,
        borderRadius: "2px",
      }}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* 分类图标 */}
      <div className="text-xs  tracking-widest mb-6" style={{ color: theme.label }}>
        {categoryIcons[quote.category]} {quote.category.toUpperCase()}
      </div>

      {/* 语录内容 */}
      <p className="text-lg lg:text-xl leading-relaxed mb-8 font-light" style={{ color: "var(--text)" }}>
        "{quote.text}"
      </p>

      {/* 底部信息 */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm font-medium mb-1" style={{ color: theme.text }}>
            — {quote.author}
          </p>
          <p className="text-xs" style={{ color: "var(--muted)", opacity: 0.4 }}>
            {quote.source}
          </p>
        </div>

        {/* 装饰编号 */}
        <span
          className="text-5xl font-black"
          style={{ color: theme.border }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* 装饰线 */}
      <div
        className="absolute top-0 left-12 w-px h-full"
        style={{ background: `linear-gradient(180deg, ${theme.text}, transparent)` }}
      />
    </motion.div>
  );
}

// 全屏语录轮播
function QuoteRotator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const quotes = quotesData;

  const handleTypingComplete = () => {
    setIsTyping(false);
    setTimeout(() => {
      setCurrentIndex((prev) => quotes.length > 0 ? (prev + 1) % quotes.length : 0);
      setIsTyping(true);
    }, 2000);
  };

  if (!quotes || quotes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm" style={{ color: "var(--muted)" }}>语录正在建设中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-8 sm:px-12 lg:px-24">
      <div className="max-w-4xl w-full">
        {isTyping ? (
          <TypewriterQuote quote={quotes[currentIndex]} onComplete={handleTypingComplete} />
        ) : (
          <motion.p
            className="text-lg lg:text-xl leading-relaxed mb-6 font-light"
            style={{ color: "var(--text)" }}
          >
            "{quotes[currentIndex].text}"
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p
            className="text-sm font-medium mb-1"
            style={{ color: themeColors[quotes[currentIndex].theme].text }}
          >
            — {quotes[currentIndex].author}
          </p>
          <p className="text-xs" style={{ color: "var(--muted)", opacity: 0.4 }}>
            {quotes[currentIndex].source}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function Quotes() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  // 个人金句 + 经典语录混合展示
  const allQuotes = [
    // 个人原创金句放在最前面
    ...personalQuotes.map((q, i) => ({
      ...q,
      id: `personal-${q.id}`,
      author: "Brunson",
      source: q.context,
      isPersonal: true,
    })),
    // 经典语录
    ...quotesData,
  ];

  return (
    <section ref={sectionRef} className="relative py-32 px-8 sm:px-12 lg:px-24">
      {/* 章节标题 */}
      <motion.div
        className="mb-20 lg:mb-32"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p
          className="text-[10px]  tracking-[0.3em] uppercase mb-4"
          style={{ color: "var(--brand)", opacity: 0.5 }}
        >
          Words That Resonate
        </p>
        <h2
          className="text-4xl lg:text-6xl font-light"
          style={{ color: "var(--text)" }}
        >
          Wisdom from
          <br />
          <span className="gradient-text">different paths.</span>
        </h2>
      </motion.div>

      {/* 原创金句标签 */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px]  tracking-widest uppercase px-3 py-1 " style={{ background: "rgba(230,57,70,0.08)", color: "var(--brand)", border: "1px solid rgba(230,57,70,0.15)" }}>
            ◎ Personal Thoughts
          </span>
          <div className="flex-1 h-px" style={{ background: "rgba(230,57,70,0.08)" }} />
        </div>
      </div>

      {/* 语录网格 */}
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        {allQuotes.map((quote, i) => (
          <QuoteCard key={quote.id} quote={{ ...quote, theme: quote.theme || "cyan" }} index={i} />
        ))}
      </div>
    </section>
  );
}
