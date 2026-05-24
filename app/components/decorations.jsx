﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// 渐变光球 - 大而模糊的彩色光球
function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 主光球 */}
      <motion.div
        className="absolute w-[600px] h-[600px]"
        style={{
          background: "radial-gradient(circle, rgba(230,57,70,0.08) 0%, transparent 70%)",
          top: "-10%",
          left: "-10%",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* 副光球 */}
      <motion.div
        className="absolute w-[500px] h-[500px]"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
          top: "40%",
          right: "-5%",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      {/* 底部光球 */}
      <motion.div
        className="absolute w-[400px] h-[400px]"
        style={{
          background: "radial-gradient(circle, rgba(230,57,70,0.05) 0%, transparent 70%)",
          bottom: "-10%",
          left: "30%",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
}

// 粒子系统 - 微小的漂浮粒子
function Particles() {
  const [particles, setParticles] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.3 + 0.1,
        moveX: Math.random() > 0.5 ? 15 : -15,
      }))
    );
  }, []);

  if (!mounted || particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute "
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: "var(--brand)",
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, p.moveX, 0],
            opacity: [p.opacity, p.opacity * 0.3, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// 动态网格 - 带脉冲效果
function AnimatedGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          radial-gradient(circle at 1px 1px, rgba(230,57,70,0.05) 1px, transparent 0)
        `,
        backgroundSize: "50px 50px",
      }}
    >
      {/* 脉冲光效 */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(230,57,70,0.08) 0%, transparent 50%)",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// 流光效果 - 偶尔扫过的光线
function LightStreaks() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute h-px"
          style={{
            width: "200px",
            background: "linear-gradient(90deg, transparent, var(--brand), transparent)",
            top: `${20 + i * 25}%`,
            opacity: 0,
          }}
          animate={{
            x: ["-200px", "120vw"],
            opacity: [0, 0.15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 6,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// 组合背景 - 所有效果的集合
export function FancyBackground() {
  return (
    <>
      <GradientOrbs />
      <AnimatedGrid />
      <Particles />
      <LightStreaks />
    </>
  );
}

// 简单的漂浮几何图形（保留）
function FloatingShape({ delay = 0, duration = 20, size = 4, x = "10%", y = "20%", type = "circle" }) {
  const shapes = {
    circle: (
      <div
        className=""
        style={{
          width: size,
          height: size,
          background: "var(--brand)",
          opacity: 0.08,
        }}
      />
    ),
    square: (
      <div
        className="rounded-sm"
        style={{
          width: size,
          height: size,
          background: "var(--brand)",
          opacity: 0.06,
          transform: "rotate(45deg)",
        }}
      />
    ),
    ring: (
      <div
        className=""
        style={{
          width: size,
          height: size,
          border: "1px solid var(--brand)",
          opacity: 0.1,
        }}
      />
    ),
  };

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      {shapes[type]}
    </motion.div>
  );
}

// 连接线装饰
function ConnectionLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.04 }}
    >
      <line
        x1="10%"
        y1="20%"
        x2="40%"
        y2="60%"
        stroke="var(--brand)"
        strokeWidth="1"
      />
      <line
        x1="70%"
        y1="30%"
        x2="90%"
        y2="70%"
        stroke="var(--brand)"
        strokeWidth="1"
      />
      <circle cx="10%" cy="20%" r="2" fill="var(--brand)" />
      <circle cx="40%" cy="60%" r="2" fill="var(--brand)" />
      <circle cx="70%" cy="30%" r="2" fill="var(--brand)" />
      <circle cx="90%" cy="70%" r="2" fill="var(--brand)" />
    </svg>
  );
}

// 数据统计
function StatNumber({ value, label, delay = 0 }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, type: "spring" }}
    >
      <div
        className="text-3xl font-bold mb-1"
        style={{ color: "var(--brand)" }}
      >
        {value}
      </div>
      <div className="text-xs" style={{ color: "var(--muted)" }}>
        {label}
      </div>
    </motion.div>
  );
}

// 装饰性引用
function DecorativeQuote({ text, author }) {
  return (
    <motion.div
      className="max-w-xl mx-auto mt-8 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.8 }}
    >
      <div
        className="relative px-8 py-6"
        style={{
          borderLeft: "2px solid var(--brand)",
          borderRight: "2px solid var(--brand)",
          opacity: 0.6,
        }}
      >
        <p className="text-sm italic" style={{ color: "var(--muted)" }}>
          "{text}"
        </p>
        {author && (
          <p className="text-xs mt-2" style={{ color: "var(--brand)", opacity: 0.6 }}>
            — {author}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// 分隔线装饰
function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-4">
      <div
        className="h-px flex-1 max-w-[100px]"
        style={{ background: "linear-gradient(90deg, transparent, var(--surface-border), transparent)" }}
      />
      <div
        className="w-2 h-2 "
        style={{ backgroundColor: "var(--brand)", opacity: 0.3 }}
      />
      <div
        className="h-px flex-1 max-w-[100px]"
        style={{ background: "linear-gradient(90deg, transparent, var(--surface-border), transparent)" }}
      />
    </div>
  );
}

export {
  FloatingShape,
  ConnectionLines,
  StatNumber,
  DecorativeQuote,
  SectionDivider,
};
