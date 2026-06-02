﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizationPlayground from "../components/optimization-playground";

export default function PlaygroundPage() {
  const [theme, setTheme] = useState("cyan");
  const [showInfo, setShowInfo] = useState(false);

  const themes = [
    { id: "cyan", name: "Diary", color: "#5cb5ad" },
    { id: "orange", name: "Study", color: "#c9917a" },
    { id: "purple", name: "Research", color: "#8a7eb5" },
    { id: "gold", name: "Hobby", color: "#bfa87a" },
    { id: "green", name: "Internship", color: "#7a9ec9" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden" style={{ background: "var(--bg)" }}>
      <OptimizationPlayground theme={theme} />

      <AnimatePresence>
        {showInfo && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-[90vw] max-w-2xl p-6 rounded-xl"
            style={{ background: "rgba(20,20,20,0.95)", border: "1px solid var(--surface-border)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-semibold" style={{ color: "var(--text)" }}>关于这个 Playground</h2>
              <button
                onClick={() => setShowInfo(false)}
                className="text-xs "
                style={{ color: "var(--muted)" }}
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.02)" }}>
                <h3 className="text-xs  tracking-wider mb-2" style={{ color: "var(--brand)" }}>Nearest Neighbor</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted)", opacity: 0.6 }}>
                  贪心策略：从起始节点出发，每次选择最近的未访问节点。时间复杂度 O(n²)，快速生成初始可行解。
                </p>
              </div>
              <div className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.02)" }}>
                <h3 className="text-xs  tracking-wider mb-2" style={{ color: "var(--brand)" }}>2-opt Local Search</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted)", opacity: 0.6 }}>
                  局部优化：反复尝试翻转路径中的子段，如果总距离缩短则接受。持续迭代直到无法改进为止。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { key: "Click", desc: "新增节点" },
                { key: "Drag", desc: "创建障碍" },
                { key: "Hover", desc: "节点高亮" },
                { key: "Double-click", desc: "重置画布" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-[10px]  tracking-wider mb-1" style={{ color: "var(--brand)", opacity: 0.7 }}>
                    {item.key}
                  </p>
                  <p className="text-[9px]" style={{ color: "var(--muted)", opacity: 0.5 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              {[
                { label: "算法", value: "Nearest Neighbor + 2-opt Local Search" },
                { label: "渲染", value: "HTML5 Canvas 2D" },
                { label: "动画", value: "Framer Motion" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-[9px]  tracking-wider w-16 shrink-0" style={{ color: "var(--brand)", opacity: 0.5 }}>
                    {item.label}
                  </span>
                  <span className="text-[10px]" style={{ color: "var(--muted)", opacity: 0.6 }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="px-3 py-1.5 rounded-md text-[9px]  tracking-wider transition-all"
          style={{
            background: "rgba(255,255,255,0.05)",
            color: "var(--brand)",
            border: "1px solid var(--brand)20",
          }}
        >
          {showInfo ? "关闭" : "关于"}
        </button>
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className="w-5 h-5  transition-all"
            style={{
              background: theme === t.id ? t.color : "transparent",
              border: `2px solid ${t.color}40`,
            }}
            title={t.name}
          />
        ))}
      </div>

      <motion.div
        className="absolute bottom-4 left-4 z-20 text-[9px]  tracking-widest"
        style={{ color: "var(--muted)", opacity: 0.15 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        Optimization Playground
      </motion.div>
    </main>
  );
}
