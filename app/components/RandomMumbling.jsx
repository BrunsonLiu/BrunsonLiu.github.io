﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import personalQuotes from "../../data/personal-quotes.json";

export default function RandomMumbling({ className = "" }) {
  const [mumbling, setMumbling] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const random = personalQuotes[Math.floor(Math.random() * personalQuotes.length)];
    setMumbling(random);
  }, []);

  if (!mounted || !mumbling) return null;

  const themeColors = {
    cyan: {
      bg: "rgba(255,255,255,0.04)",
      border: "rgba(255,255,255,0.10)",
      text: "rgba(255,255,255,0.7)",
      tag: "rgba(255,255,255,0.4)",
    },
    gold: {
      bg: "rgba(230,57,70,0.06)",
      border: "rgba(230,57,70,0.12)",
      text: "rgba(230,57,70,0.7)",
      tag: "rgba(230,57,70,0.4)",
    },
    purple: {
      bg: "rgba(255,255,255,0.04)",
      border: "rgba(255,255,255,0.10)",
      text: "rgba(255,255,255,0.7)",
      tag: "rgba(255,255,255,0.4)",
    },
    orange: {
      bg: "rgba(230,57,70,0.06)",
      border: "rgba(230,57,70,0.12)",
      text: "rgba(230,57,70,0.7)",
      tag: "rgba(230,57,70,0.4)",
    },
  };

  const theme = themeColors[mumbling.theme] || themeColors.cyan;

  return (
    <motion.div
      className={`relative p-6 ${className}`}
      style={{
        background: theme.bg,
        border: `1px solid ${theme.border}`,
        borderRadius: "8px",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px]  tracking-widest uppercase" style={{ color: theme.tag }}>
          ▸ {mumbling.context}
        </span>
        <span className="text-[8px]" style={{ color: theme.tag, opacity: 0.5 }}>
          ✦
        </span>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: theme.text }}>
        {mumbling.text}
      </p>
    </motion.div>
  );
}
