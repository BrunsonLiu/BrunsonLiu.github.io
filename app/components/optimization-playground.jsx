﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

function dist(a, b) {
  if (!a || !b) return Infinity;
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function nearestNeighbor(nodes) {
  const validNodes = nodes.filter(n => n && typeof n.x === 'number');
  const n = validNodes.length;
  if (n === 0) return [];
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
        const d = dist(validNodes[current], validNodes[j]);
        if (d < minDist) { minDist = d; nearest = j; }
      }
    }
    if (nearest >= 0) {
      visited[nearest] = true;
      tour.push(nearest);
      current = nearest;
    }
  }
  return tour;
}

function tourCost(nodes, tour) {
  let cost = 0;
  for (let i = 0; i < tour.length; i++) {
    cost += dist(nodes[tour[i]], nodes[tour[(i + 1) % tour.length]]);
  }
  return cost;
}

function twoOptStep(nodes, tour) {
  let bestTour = [...tour];
  let bestCost = tourCost(nodes, bestTour);
  let improved = false;
  let bestI = -1;
  let bestJ = -1;

  for (let i = 1; i < bestTour.length - 2; i++) {
    for (let j = i + 1; j < bestTour.length - 1; j++) {
      const newTour = [...bestTour];
      const segment = newTour.slice(i, j + 1).reverse();
      newTour.splice(i, j - i + 1, ...segment);
      const newCost = tourCost(nodes, newTour);
      if (newCost < bestCost) {
        bestTour = newTour;
        bestCost = newCost;
        improved = true;
        bestI = i;
        bestJ = j;
      }
      if (improved) break;
    }
    if (improved) break;
  }

  return { tour: bestTour, cost: bestCost, improved, i: bestI, j: bestJ };
}

export default function OptimizationPlayground({ theme = "cyan" }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [isInteracting, setIsInteracting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [obstacles, setObstacles] = useState([]);
  const [currentObstacle, setCurrentObstacle] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(-1);
  const [nodeCount, setNodeCount] = useState(15);

  const [optimizationState, setOptimizationState] = useState({
    initialTour: [],
    currentTour: [],
    optimizedTour: [],
    isOptimizing: false,
    optimizingSegment: { i: -1, j: -1 },
    iterationCount: 0,
    initialCost: 0,
    currentCost: 0,
    optimizedCost: 0,
    costHistory: [],
  });

  const [nodeAnimations, setNodeAnimations] = useState([]);
  const [showControls, setShowControls] = useState(false);
  const [firstTimeGuide, setFirstTimeGuide] = useState(true);
  const [justConverged, setJustConverged] = useState(false);
  const [convergenceToast, setConvergenceToast] = useState(false);
  const [postGuide, setPostGuide] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const sweepProgress = useRef(0);

  const themeColors = {
    cyan: { node: "rgba(92,181,173,", line: "rgba(92,181,173,", accent: "#5cb5ad" },
    orange: { node: "rgba(201,145,122,", line: "rgba(201,145,122,", accent: "#c9917a" },
    purple: { node: "rgba(138,126,181,", line: "rgba(138,126,181,", accent: "#8a7eb5" },
    gold: { node: "rgba(191,168,122,", line: "rgba(191,168,122,", accent: "#bfa87a" },
    green: { node: "rgba(230,57,70,", line: "rgba(230,57,70,", accent: "#e63946" },
  };

  const colors = themeColors[theme] || themeColors.cyan;

  const runOptimization = useCallback((allNodes) => {
    if (allNodes.length < 2) return;

    const initial = nearestNeighbor(allNodes);
    const initialCost = tourCost(allNodes, initial);

    setOptimizationState((prev) => ({
      ...prev,
      initialTour: initial,
      currentTour: initial,
      optimizedTour: initial,
      isOptimizing: true,
      iterationCount: 0,
      initialCost,
      currentCost: initialCost,
      optimizedCost: initialCost,
      costHistory: [initialCost],
    }));

    let currentTour = [...initial];
    let iteration = 0;
    const costHistory = [initialCost];

    function step() {
      const result = twoOptStep(allNodes, currentTour);
      iteration++;
      costHistory.push(result.cost);

      setOptimizationState((prev) => ({
        ...prev,
        currentTour: result.tour,
        optimizedTour: result.tour,
        optimizingSegment: result.improved ? { i: result.i, j: result.j } : { i: -1, j: -1 },
        iterationCount: iteration,
        currentCost: result.cost,
        optimizedCost: result.cost,
        costHistory: [...costHistory],
      }));

      if (result.improved) {
        currentTour = result.tour;
        animFrameRef.current = setTimeout(step, 50);
      } else {
        setOptimizationState((prev) => ({
          ...prev,
          isOptimizing: false,
          optimizingSegment: { i: -1, j: -1 },
        }));
      }
    }

    animFrameRef.current = setTimeout(step, 300);
  }, []);

  const generateNodes = useCallback((count, width, height, existing = []) => {
    const padding = 60;
    const newNodes = [];
    for (let i = 0; i < count; i++) {
      newNodes.push({
        x: padding + Math.random() * (width - padding * 2),
        y: padding + Math.random() * (height - padding * 2),
      });
    }
    return [...existing, ...newNodes];
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const initialNodes = generateNodes(nodeCount, width, height);
    setNodes(initialNodes);
    runOptimization(initialNodes);
  }, [nodeCount, generateNodes, runOptimization]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || nodes.length === 0) return;

    // 防御：过滤掉 undefined 节点
    const validNodes = nodes.filter(n => n && typeof n.x === 'number');
    if (validNodes.length === 0) return;

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

    if (isInteracting) {
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) / 1.5);
      gradient.addColorStop(0, colors.line + "0.02)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    const displayTour = optimizationState.currentTour.filter(i => i < nodes.length && nodes[i] && typeof nodes[i].x === 'number');
    const { i: segI, j: segJ } = optimizationState.optimizingSegment;

    if (displayTour.length > 1) {
      for (let k = 0; k < displayTour.length; k++) {
        const fromIdx = displayTour[k];
        const toIdx = displayTour[(k + 1) % displayTour.length];
        const from = nodes[fromIdx];
        const to = nodes[toIdx];
        if (!from || !to) continue;

        const isOptimizingSegment = optimizationState.isOptimizing && segI >= 0 && segJ >= 0 &&
          ((k >= segI && k < segJ) || (k >= segI && k < segJ));

        ctx.beginPath();
        if (isOptimizingSegment) {
          ctx.strokeStyle = colors.line + "0.6)";
          ctx.lineWidth = 2;
        } else {
          ctx.strokeStyle = colors.line + (isInteracting ? "0.2)" : "0.06)");
          ctx.lineWidth = 1;
        }
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }
    }

    obstacles.forEach((obs) => {
      ctx.fillStyle = "rgba(255,255,255,0.02)";
      ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);
    });

    if (currentObstacle) {
      ctx.fillStyle = "rgba(255,255,255,0.03)";
      ctx.fillRect(currentObstacle.x, currentObstacle.y, currentObstacle.w, currentObstacle.h);
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      ctx.strokeRect(currentObstacle.x, currentObstacle.y, currentObstacle.w, currentObstacle.h);
    }

    nodes.forEach((node, i) => {
      if (!node || typeof node.x !== 'number') return;
      const anim = nodeAnimations[i];
      const animProgress = anim ? Math.min(1, (Date.now() - anim.startTime) / anim.duration) : 1;
      const isHovered = i === hoveredNode;
      const baseRadius = isHovered ? 6 : 3;
      const radius = anim ? baseRadius * animProgress : baseRadius;
      const alpha = isInteracting ? (isHovered ? 0.8 : 0.4) : (isHovered ? 0.5 : 0.1);

      if (anim && animProgress < 1) {
        const rippleRadius = 20 * animProgress;
        const rippleAlpha = 0.3 * (1 - animProgress);
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, rippleRadius);
        gradient.addColorStop(0, colors.node + rippleAlpha + ")");
        gradient.addColorStop(1, colors.node + "0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, rippleRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (isHovered) {
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 20);
        gradient.addColorStop(0, colors.node + "0.15)");
        gradient.addColorStop(1, colors.node + "0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = colors.node + alpha + ")";
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    if (isInteracting && mousePos.x > 0) {
      ctx.strokeStyle = colors.line + "0.03)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      nodes.forEach((node) => {
        if (!node) return;
        const d = Math.sqrt((node.x - mousePos.x) ** 2 + (node.y - mousePos.y) ** 2);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.stroke();
        }
      });
      ctx.setLineDash([]);
    }

    // 收敛后的高光扫动
    if (justConverged && displayTour.length > 1) {
      const totalSegments = displayTour.length;
      const segmentsToShow = Math.floor(totalSegments * sweepProgress.current);
      ctx.beginPath();
      ctx.strokeStyle = colors.line + "0.8)";
      ctx.lineWidth = 3;
      ctx.shadowBlur = 10;
      ctx.shadowColor = colors.accent;
      for (let k = 0; k < segmentsToShow; k++) {
        const from = nodes[displayTour[k]];
        const to = nodes[displayTour[(k + 1) % displayTour.length]];
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }, [nodes, hoveredNode, mousePos, isInteracting, colors, obstacles, currentObstacle, nodeAnimations, optimizationState, justConverged]);

  useEffect(() => {
    let active = true;
    function tick() {
      if (!active) return;
      setNodeAnimations((prev) => {
        const now = Date.now();
        const updated = prev.filter((anim) => now - anim.startTime < anim.duration);
        return updated.length !== prev.length ? updated : prev;
      });
      requestAnimationFrame(tick);
    }
    const id = requestAnimationFrame(tick);
    return () => { active = false; cancelAnimationFrame(id); };
  }, []);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    setIsInteracting(true);

    let closest = -1;
    let minDist = 15;
    nodes.forEach((node, i) => {
      if (!node || typeof node.x !== 'number') return;
      const d = Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2);
      if (d < minDist) {
        minDist = d;
        closest = i;
      }
    });
    setHoveredNode(closest);

    if (dragging && dragStart) {
      setCurrentObstacle({
        x: Math.min(dragStart.x, x),
        y: Math.min(dragStart.y, y),
        w: Math.abs(x - dragStart.x),
        h: Math.abs(y - dragStart.y),
      });
    }
  };

  const handleMouseLeave = () => {
    setIsInteracting(false);
    setHoveredNode(-1);
    setMousePos({ x: 0, y: 0 });
  };

  const handleClick = (e) => {
    if (dragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setNodeAnimations((prev) => [
      ...prev,
      { nodeIndex: nodes.length, startTime: Date.now(), duration: 500 },
    ]);

    const newNodes = [...nodes, { x, y }];
    setNodes(newNodes);
    runOptimization(newNodes);
  };

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      const rect = canvasRef.current.getBoundingClientRect();
      setDragStart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setDragging(true);
    }
  };

  const handleMouseUp = (e) => {
    if (dragging && currentObstacle && currentObstacle.w > 10 && currentObstacle.h > 10) {
      const newObstacles = [...obstacles, currentObstacle];
      setObstacles(newObstacles);

      const filteredNodes = nodes.filter((node) => {
        if (!node) return true;
        return !newObstacles.some((obs) =>
          node.x >= obs.x && node.x <= obs.x + obs.w &&
          node.y >= obs.y && node.y <= obs.y + obs.h
        );
      });

      if (filteredNodes.length > 1) {
        setNodes(filteredNodes);
        runOptimization(filteredNodes);
      }
    }
    setDragging(false);
    setDragStart(null);
    setCurrentObstacle(null);
  };

  const handleDoubleClick = () => {
    const container = containerRef.current;
    if (!container) return;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const newNodes = generateNodes(nodeCount, width, height);
    setNodes(newNodes);
    setObstacles([]);
    runOptimization(newNodes);
  };

  const handleReset = () => {
    const container = containerRef.current;
    if (!container) return;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const newNodes = generateNodes(nodeCount, width, height);
    setNodes(newNodes);
    setObstacles([]);
    runOptimization(newNodes);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) clearTimeout(animFrameRef.current);
    };
  }, []);

  // 首次引导 2 秒后消失
  useEffect(() => {
    const timer = setTimeout(() => setFirstTimeGuide(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // 优化完成检测
  useEffect(() => {
    if (!optimizationState.isOptimizing && optimizationState.iterationCount > 0) {
      setJustConverged(true);
      setConvergenceToast(true);

      // 高光扫动动画
      sweepProgress.current = 0;
      const sweepInterval = setInterval(() => {
        sweepProgress.current += 0.05;
        if (sweepProgress.current >= 1) {
          clearInterval(sweepInterval);
          setJustConverged(false);
        }
      }, 30);

      // 3 秒后显示后续引导
      const postTimer = setTimeout(() => {
        setConvergenceToast(false);
        setPostGuide(true);
        setTimeout(() => setPostGuide(false), 3000);
      }, 3000);

      return () => {
        clearInterval(sweepInterval);
        clearTimeout(postTimer);
      };
    }
  }, [optimizationState.isOptimizing]);

  const improvementPercent = optimizationState.initialCost > 0
    ? (((optimizationState.initialCost - optimizationState.optimizedCost) / optimizationState.initialCost) * 100).toFixed(1)
    : 0;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ pointerEvents: "auto" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onDoubleClick={handleDoubleClick}
    >
      <canvas ref={canvasRef} className="w-full h-full" />

      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <motion.button
          className="px-3 py-1.5 rounded-md text-[10px]  tracking-wider"
          style={{
            background: "rgba(255,255,255,0.05)",
            color: colors.accent,
            border: `1px solid ${colors.accent}20`,
            opacity: isInteracting ? 0.6 : 0,
          }}
          whileHover={{ scale: 1.05, opacity: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            handleReset();
          }}
        >
          RESET
        </motion.button>
        <motion.span
          className="text-[9px]  tracking-wider px-2 py-1"
          style={{
            color: isInteracting ? colors.accent : "var(--muted)",
            opacity: isInteracting ? 0.7 : 0,
          }}
          animate={optimizationState.isOptimizing ? { scale: [1, 1.05, 1] } : {}}
          transition={{ repeat: Infinity, duration: 0.8 }}
        >
          {nodes.length}个点 · 路径缩短{improvementPercent}% · {optimizationState.iterationCount}轮优化收敛
        </motion.span>
      </div>

      <motion.div
        className="absolute bottom-4 left-4 text-[9px]  tracking-widest"
        style={{
          color: "var(--muted)",
          opacity: isInteracting ? 0.08 : 0,
        }}
      >
        最近邻初始化 + 2-opt局部搜索优化
      </motion.div>

      <AnimatePresence>
        {firstTimeGuide && nodes.length > 0 && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center gap-2">
              <motion.div
                style={{ color: colors.accent }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                </svg>
              </motion.div>
              <div className="text-[10px]  tracking-wider" style={{ color: colors.accent }}>
                点击添加节点，看算法实时优化最短路径
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {convergenceToast && (
          <motion.div
            className="absolute top-4 right-4 px-4 py-2 rounded-md  text-xs tracking-wider"
            style={{
              background: colors.line + "0.1)",
              border: `1px solid ${colors.accent}40`,
              color: colors.accent,
            }}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
          >
            优化收敛完成 · 路径缩短 {improvementPercent}%
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {postGuide && (
          <motion.div
            className="absolute top-4 left-4 text-[9px]  tracking-wider"
            style={{ color: colors.accent, opacity: 0.3 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.3, y: 0 }}
            exit={{ opacity: 0 }}
          >
            拖拽画障碍，看算法实时避障
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
