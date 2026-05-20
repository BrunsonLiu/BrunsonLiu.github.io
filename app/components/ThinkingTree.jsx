﻿﻿﻿﻿﻿﻿﻿"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

// Research thinking tree - shows the connection between research ideas, papers, and projects
const treeData = {
  id: "root",
  label: "Optimization + ML",
  type: "root",
  children: [
    {
      id: "l2o",
      label: "Learning to Optimize",
      type: "research",
      href: "/research/l2o",
      children: [
        { id: "neural-co", label: "Neural Combinatorial Opt.", type: "paper", href: "/research/l2o" },
        { id: "pointer-net", label: "Pointer Network", type: "method", href: "/research/l2o" },
        { id: "attention-model", label: "Attention Model", type: "method", href: "/research/l2o" },
      ],
    },
    {
      id: "vrp",
      label: "VRP + RL",
      type: "research",
      href: "/research/vrp",
      children: [
        { id: "ppo", label: "PPO Algorithm", type: "method", href: "/research/vrp" },
        { id: "gnn", label: "Graph Neural Network", type: "method", href: "/research/vrp" },
        { id: "dataset", label: "Benchmark Dataset", type: "project", href: "/research/vrp" },
      ],
    },
    {
      id: "practice",
      label: "Industrial Practice",
      type: "practice",
      href: "/internship",
      children: [
        { id: "supply-chain", label: "Supply Chain Project", type: "project", href: "/internship/supply-chain-project" },
        { id: "ad-algo", label: "Ad Algorithm Notes", type: "note", href: "/internship/ad-algorithm-notes" },
        { id: "reflection", label: "Intern Reflection", type: "reflection", href: "/internship/reflection" },
      ],
    },
    {
      id: "growth",
      label: "Growth & Reflection",
      type: "reflection",
      href: "/diary/reflections",
      children: [
        { id: "reading", label: "Reading List", type: "note", href: "/research/reading-list" },
        { id: "ideas", label: "Research Ideas", type: "idea", href: "/research/ideas" },
        { id: "philosophy", label: "Philosophy", type: "reflection", href: "/diary/philosophy" },
      ],
    },
  ],
};

const typeColors = {
  root: { bg: "rgba(230,57,70,0.15)", text: "rgba(230,57,70,0.9)", border: "rgba(230,57,70,0.25)" },
  research: { bg: "rgba(255,255,255,0.06)", text: "rgba(255,255,255,0.8)", border: "rgba(255,255,255,0.15)" },
  method: { bg: "rgba(255,255,255,0.04)", text: "rgba(255,255,255,0.7)", border: "rgba(255,255,255,0.10)" },
  paper: { bg: "rgba(230,57,70,0.08)", text: "rgba(230,57,70,0.7)", border: "rgba(230,57,70,0.15)" },
  project: { bg: "rgba(255,255,255,0.04)", text: "rgba(255,255,255,0.7)", border: "rgba(255,255,255,0.10)" },
  note: { bg: "rgba(230,57,70,0.08)", text: "rgba(230,57,70,0.7)", border: "rgba(230,57,70,0.15)" },
  reflection: { bg: "rgba(230,57,70,0.06)", text: "rgba(230,57,70,0.6)", border: "rgba(230,57,70,0.12)" },
  idea: { bg: "rgba(255,255,255,0.04)", text: "rgba(255,255,255,0.7)", border: "rgba(255,255,255,0.10)" },
};

function TreeNode({ node, depth = 0, isLast = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const colors = typeColors[node.type] || typeColors.root;

  return (
    <div className="relative">
      {/* 连接线 */}
      {depth > 0 && (
        <>
          <div
            className="absolute"
            style={{
              left: "-16px",
              top: "50%",
              width: "16px",
              height: "1px",
              background: "rgba(230,57,70,0.15)",
            }}
          />
          {!isLast && (
            <div
              className="absolute"
              style={{
                left: "-16px",
                top: "50%",
                bottom: "-50%",
                width: "1px",
                background: "rgba(230,57,70,0.1)",
              }}
            />
          )}
        </>
      )}

      {/* 节点 */}
      <motion.div
        className={`relative inline-flex items-center gap-2 px-4 py-2  text-xs font-medium cursor-pointer ${depth === 0 ? "text-sm font-semibold" : ""}`}
        style={{
          background: isHovered ? `${colors.bg}20` : colors.bg,
          color: colors.text,
          border: `1px solid ${isHovered ? colors.text : colors.border}`,
          marginTop: depth === 0 ? 0 : 8,
          marginBottom: depth === 0 ? 16 : 0,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => node.href && (window.location.href = node.href)}
      >
        <span>{node.label}</span>
        {node.href && (
          <motion.span
            className="text-[10px] opacity-50"
            animate={{ opacity: isHovered ? 0.8 : 0.3 }}
          >
            →
          </motion.span>
        )}
      </motion.div>

      {/* 子节点 */}
      {node.children && (
        <div className="ml-8 flex flex-col">
          {node.children.map((child, i) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              isLast={i === node.children.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ThinkingTree() {
  return (
    <div className="relative">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[10px]  tracking-[0.3em] uppercase" style={{ color: "rgba(230,57,70,0.4)" }}>
          Thinking Pipeline
        </span>
        <div className="flex-1 h-px" style={{ background: "rgba(230,57,70,0.1)" }} />
      </div>

      <div className="pl-4">
        <TreeNode node={treeData} />
      </div>

      {/* 图例 */}
      <div className="mt-12 flex flex-wrap gap-4 pt-6 border-t" style={{ borderColor: "rgba(230,57,70,0.08)" }}>
        {Object.entries(typeColors).map(([type, colors]) => (
          <div key={type} className="flex items-center gap-2">
            <div className="w-2 h-2 " style={{ background: colors.text }} />
            <span className="text-[10px]  capitalize" style={{ color: colors.text, opacity: 0.6 }}>
              {type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
