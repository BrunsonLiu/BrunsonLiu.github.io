﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿"use client";
import { useEffect, useRef } from "react";

const KEYWORDS = [
  "TSP", "VRP", "L2O", "Optimization", "RL", "Neural CO", "MILP",
  "Heuristic", "Pareto", "Gurobi", "NSGA-II", "PPO", "GNN",
  "Black-box", "Multi-objective", "ACO", "ALNS", "Bayesian",
  "Combinatorial", "Learning", "Algorithm", "Solver", "Convergence",
  "Gradient", "Policy", "Attention", "Pointer Network", "Meta-heuristic",
  "Sensitivity", "Robustness", "Feasible", "Optimal", "Constraints",
];

const FONT_SIZES = [9, 11, 13, 15, 17, 20];
const LAYER_SPEEDS = [0.01, 0.02, 0.03, 0.05];
const OPACITY_LAYERS = [0.015, 0.03, 0.045, 0.06, 0.08];

export default function ParallaxTextCloud() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: -10000, y: -10000, radius: 180 };
    let scrollY = 0;

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 初始化文字粒子（分层有序排列）
    const particles = [];
    const count = 100;
    const gridSize = Math.ceil(Math.sqrt(count));
    const cellW = width / gridSize;
    const cellH = height / gridSize;

    for (let i = 0; i < count; i++) {
      const col = i % gridSize;
      const row = Math.floor(i / gridSize);
      const layer = Math.floor(Math.random() * 4);
      const fontSize = FONT_SIZES[Math.floor(Math.random() * FONT_SIZES.length)];
      const word = KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)];
      const opacityLayer = Math.floor(Math.random() * OPACITY_LAYERS.length);

      // 在网格单元内添加微小随机偏移，形成有序但不死板的布局
      const jitterX = (Math.random() - 0.5) * cellW * 0.6;
      const jitterY = (Math.random() - 0.5) * cellH * 0.6;

      particles.push({
        x: col * cellW + cellW / 2 + jitterX,
        y: row * cellH + cellH / 2 + jitterY,
        baseX: col * cellW + cellW / 2 + jitterX,
        baseY: row * cellH + cellH / 2 + jitterY,
        vx: 0,
        vy: 0,
        rotation: (Math.random() - 0.5) * 0.15,
        baseRotation: (Math.random() - 0.5) * 0.15,
        rotationSpeed: (Math.random() - 0.5) * 0.0003,
        word,
        fontSize,
        layer,
        layerSpeed: LAYER_SPEEDS[layer],
        opacity: OPACITY_LAYERS[opacityLayer],
        driftX: (Math.random() - 0.5) * 0.15,
        driftY: (Math.random() - 0.5) * 0.1,
        returnSpeed: 0.005 + Math.random() * 0.01,
      });
    }

    let time = 0;
    let animFrame;
    const animate = () => {
      time += 0.005;
      ctx.clearRect(0, 0, width, height);

      // 滚动视差偏移
      const scrollOffset = scrollY * 0.08;

      particles.forEach((p) => {
        // 基础漂移（更慢更优雅）
        p.x += p.driftX;
        p.y += p.driftY + Math.sin(time + p.baseX * 0.005) * 0.05;

        // 旋转（更慢）
        p.rotation += p.rotationSpeed;

        // 滚动视差
        const parallaxY = scrollOffset * p.layerSpeed;

        // 鼠标排斥力场（更柔和）
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (1 - dist / mouse.radius) * 1.5;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
          p.rotation += force * 0.008;
        }

        // 粒子间微弱引力（Matt DesLauriers 风格 - 有序流动）
        for (const other of particles) {
          if (other === p) continue;
          const ddx = other.x - p.x;
          const ddy = other.y - p.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < 200 && d > 30) {
            const attractForce = (1 - d / 200) * 0.008;
            p.vx += (ddx / d) * attractForce;
            p.vy += (ddy / d) * attractForce;
          }
        }

        // 弹簧回归原位
        p.vx += (p.baseX - p.x) * p.returnSpeed;
        p.vy += (p.baseY - p.y) * p.returnSpeed;

        // 阻尼
        p.vx *= 0.94;
        p.vy *= 0.94;

        // 应用速度
        p.x += p.vx;
        p.y += p.vy;

        // 边界循环
        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
        if (p.y < -50) p.y = height + 50;
        if (p.y > height + 50) p.y = -50;

        // 绘制文字
        ctx.save();
        ctx.translate(p.x, p.y + parallaxY);
        ctx.rotate(p.rotation);
        ctx.font = `${p.fontSize}px monospace`;
        ctx.fillStyle = `rgba(230,57,70,${p.opacity})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.word, 0, 0);
        ctx.restore();
      });

      // 连线（距离近的文字之间，更柔和）
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const ddx = p1.x - p2.x;
          const ddy = p1.y - p2.y;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.015;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y + scrollOffset * p1.layerSpeed);
            ctx.lineTo(p2.x, p2.y + scrollOffset * p2.layerSpeed);
            ctx.strokeStyle = `rgba(230,57,70,${opacity})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }
        }
      }

      animFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
