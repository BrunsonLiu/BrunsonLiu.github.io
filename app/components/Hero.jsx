"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { NumberScramble } from "./NumberScramble";

function dist(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function nearestNeighbor(nodes) {
  const n = nodes.length;
  const visited = new Array(n).fill(false);
  const tour = [];
  let current = 0;
  visited[0] = true;
  tour.push(0);
  for (let step = 1; step < n; step++) {
    let nearest = -1;
    let minDist = Infinity;
    for (let j = 0; j < n; j++) {
      if (!visited[j]) {
        const d = dist(nodes[current], nodes[j]);
        if (d < minDist) { minDist = d; nearest = j; }
      }
    }
    visited[nearest] = true;
    tour.push(nearest);
    current = nearest;
  }
  return tour;
}

function TSPBackground({ scrollProgress }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const nodesRef = useRef([]);
  const cursorRef = useRef({ x: -1000, y: -1000, active: false });
  const frameRef = useRef(null);

  const generateNodes = useCallback((count, width, height) => {
    const padding = 120;
    const newNodes = [];
    for (let i = 0; i < count; i++) {
      const x = padding + Math.random() * (width - padding * 2);
      const y = padding + Math.random() * (height - padding * 2);
      newNodes.push({ homeX: x, homeY: y, x, y });
    }
    return newNodes;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    nodesRef.current = generateNodes(18, width, height);

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      cursorRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    const onMouseLeave = () => { cursorRef.current.active = false; };
    window.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [generateNodes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const animate = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.scale(dpr, dpr);

      const nodes = nodesRef.current;
      const cursor = cursorRef.current;
      const alpha = 0.06 + scrollProgress * 0.04;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += (n.homeX - n.x) * 0.02;
        n.y += (n.homeY - n.y) * 0.02;
        if (cursor.active) {
          const dx = cursor.x - n.x, dy = cursor.y - n.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 200 && d > 1) {
            const f = (200 - d) / 200 * 0.3;
            n.x += (dx / d) * f;
            n.y += (dy / d) * f;
          }
        }
      }

      const tour = nearestNeighbor(nodes.map(n => ({ x: n.x, y: n.y })));
      ctx.clearRect(0, 0, width, height);

      if (tour.length > 1) {
        for (let i = 0; i < tour.length; i++) {
          const from = nodes[tour[i]];
          const to = nodes[tour[(i + 1) % tour.length]];
          if (!from || !to) continue;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(230,57,70,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.stroke();
        }
      }

      nodes.forEach((node) => {
        if (!node) return;
        const na = cursor.active
          ? alpha * 1.8 + 0.06 * Math.max(0, 1 - Math.hypot(cursor.x - node.x, cursor.y - node.y) / 200)
          : alpha * 1.8;
        ctx.fillStyle = `rgba(230,57,70,${na})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [scrollProgress]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0, opacity: 0.7 }}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 800], [1, 1.05]);
  const scrollProgress = useTransform(scrollY, [0, 800], [0, 1]);
  const [currentScroll, setCurrentScroll] = useState(0);

  useEffect(() => {
    return scrollProgress.on("change", (v) => setCurrentScroll(v));
  }, [scrollProgress]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      style={{ background: "#0a0a0a", padding: 0 }}
    >
      {/* Giant watermark — scene number */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{
          fontSize: "clamp(300px, 60vw, 800px)",
          fontWeight: 900,
          lineHeight: 0.8,
          color: "rgba(230,57,70,0.03)",
          zIndex: 0,
          letterSpacing: "-0.08em",
        }}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        01
      </motion.div>

      <motion.div className="absolute inset-0" style={{ scale }}>
        <TSPBackground scrollProgress={currentScroll} />
      </motion.div>

      {/* Geometric accent — red diagonal slash */}
      <motion.div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: "clamp(160px, 25vw, 400px)",
          height: "clamp(160px, 25vw, 400px)",
          background: "#e63946",
          zIndex: 0,
          clipPath: "polygon(100% 0, 100% 100%, 50% 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative z-10 h-screen flex flex-col justify-center px-8 sm:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto w-full">

          {/* Scene marker */}
          <motion.div
            className="flex items-center gap-4 mb-16 sm:mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <span className="text-xs font-bold tracking-[0.5em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
              Opening Titles
            </span>
            <div style={{ width: "60px", height: "1px", background: "#e63946", opacity: 0.6 }} />
          </motion.div>

          {/* Credit line */}
          <motion.p
            className="text-xs sm:text-sm font-medium tracking-[0.4em] uppercase mb-8 sm:mb-12"
            style={{ color: "rgba(255,255,255,0.4)" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
          >
            A Portfolio by
          </motion.p>

          {/* Title card — the name */}
          <motion.h1
            className="leading-[0.85]"
            style={{
              fontSize: "clamp(64px, 15vw, 200px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#fff",
            }}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 1.3 }}
          >
            Brunson
          </motion.h1>

          {/* Red accent line beneath name */}
          <motion.div
            style={{ width: "clamp(80px, 15vw, 200px)", height: "3px", background: "#e63946", marginTop: "clamp(16px, 4vw, 40px)" }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Subtitle — bottom credits style */}
          <motion.div
            className="mt-12 sm:mt-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1 }}
          >
            <div className="sm:w-1/2">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                <span>Optimization</span>
                <span style={{ color: "#e63946" }}>·</span>
                <span>Machine Learning</span>
                <span style={{ color: "#e63946" }}>·</span>
                <span>Operations Research</span>
              </div>
              <p className="text-sm mt-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.35)", maxWidth: "420px" }}>
                Bridging mathematical optimization and machine learning.
              </p>
            </div>

            <div className="flex gap-3 sm:gap-4 flex-shrink-0">
              <a href="/research"
                className="px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300"
                style={{ background: "#e63946", color: "#fff" }}>
                Research
              </a>
              <a href="/about"
                className="px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300"
                style={{ border: "2px solid rgba(255,255,255,0.3)", color: "#fff" }}>
                About
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          className="flex flex-wrap gap-x-12 gap-y-4 mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {[
            { value: 12, suffix: "+", label: "Projects" },
            { value: 3, suffix: "+", label: "Papers" },
            { value: 8, suffix: "+", label: "Skills" },
            { value: 2, suffix: "nd", label: "ICM Contest" },
          ].map((stat) => (
            <div key={stat.label} className="group cursor-default">
              <div className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: "#fff" }}>
                <NumberScramble value={stat.value} suffix={stat.suffix} duration={800} />
              </div>
              <div className="text-xs font-medium uppercase tracking-[0.2em] mt-1" style={{ color: "rgba(255,255,255,0.25)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom: timecode + scroll line */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 3.4 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Space Grotesk', monospace" }}>
          24fps — reel 01
        </span>
        <div style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.3)" }} />
      </motion.div>
    </section>
  );
}