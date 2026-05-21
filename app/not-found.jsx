﻿﻿﻿﻿﻿﻿﻿﻿﻿"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [tour, setTour] = useState([]);

  const generateNodes = useCallback((count, width, height) => {
    const padding = 60;
    const newNodes = [];
    for (let i = 0; i < count; i++) {
      newNodes.push({
        x: padding + Math.random() * (width - padding * 2),
        y: padding + Math.random() * (height - padding * 2),
      });
    }
    return newNodes;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const initialNodes = generateNodes(12, width, height);
    setNodes(initialNodes);
    const tour = [...Array(initialNodes.length).keys()];
    tour.push(0);
    setTour(tour);
  }, [generateNodes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || nodes.length === 0) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    if (tour.length > 1) {
      for (let i = 0; i < tour.length - 1; i++) {
        const from = nodes[tour[i]];
        const to = nodes[tour[i + 1]];
        if (!from || !to) continue;
        ctx.beginPath();
        ctx.strokeStyle = "rgba(230,57,70,0.12)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }
      ctx.setLineDash([]);
    }

    nodes.forEach((node) => {
      if (!node) return;
      ctx.fillStyle = "rgba(230,57,70,0.15)";
      ctx.beginPath();
      ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [nodes, tour]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div ref={containerRef} className="absolute inset-0 overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center max-w-md px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="text-8xl font-black"
          style={{ color: "var(--brand)", letterSpacing: "-0.05em" }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          404
        </motion.div>

        <p className="text-sm font-medium mt-6 mb-2" style={{ color: "var(--text)" }}>
          Path not found in optimal solution
        </p>

        <p className="text-xs mb-8" style={{ color: "var(--muted)", opacity: 0.6 }}>
          The route you're looking for doesn't converge.
        </p>

        <Link
          href="/"
          className="px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all"
          style={{
            background: "var(--brand)",
            color: "#fff",
          }}
        >
          Return Home
        </Link>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-8 text-[9px] font-medium tracking-[0.3em] uppercase"
        style={{ color: "var(--muted)", opacity: 0.15 }}
      >
        TSP Solver / No Feasible Solution
      </motion.div>
    </div>
  );
}