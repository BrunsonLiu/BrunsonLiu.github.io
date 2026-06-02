﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿"use client";
import { motion } from "framer-motion";
import { PokerFlipCard, PokerFlipGrid } from "../components/poker-flip";
import { FaSquareRootAlt, FaChartLine, FaBrain, FaUsersCog, FaProjectDiagram, FaLinux, FaLightbulb } from "react-icons/fa";
import { SpringEnter } from "../components/theme-easter-eggs";

const studyTopics = [
  {
    title: "Math",
    subtitle: "数学基础",
    description: "线性代数、微积分、概率论",
    href: "/study/math",
    icon: <FaSquareRootAlt size={32} />,
    backContent: "线性代数是我搞优化的本命武器，也是我熬夜最多的元凶",
    tags: ["线性代数", "微积分", "概率统计"],
    formula: "Ax = b",
  },
  {
    title: "Optimization",
    subtitle: "优化理论",
    description: "凸优化、组合优化",
    href: "/study/optimization",
    icon: <FaChartLine size={32} />,
    backContent: "啃完Boyd全本，落地3个工业级项目——这是我的研究核心底座",
    tags: ["凸优化", "线性规划", "整数规划"],
    formula: "min f(x) s.t. g(x) ≤ 0",
  },
  {
    title: "ML & DL",
    subtitle: "机器学习",
    description: "深度学习、神经网络",
    href: "/study/ml-dl",
    icon: <FaBrain size={32} />,
    backContent: "调参是一门玄学，但理解原理之后，玄学就变成了科学",
    tags: ["监督学习", "神经网络", "强化学习"],
    formula: "∇L(θ)",
  },
  {
    title: "Management",
    subtitle: "管理科学",
    description: "运筹学、决策分析",
    href: "/study/management",
    icon: <FaUsersCog size={32} />,
    backContent: "管理科学的魅力在于：把混沌的决策变成优雅的数学问题",
    tags: ["运筹学", "供应链管理", "决策理论"],
    formula: "max U(x)",
  },
  {
    title: "Interdisciplinary",
    subtitle: "交叉学科",
    description: "跨领域应用与融合",
    href: "/study/interdisciplinary",
    icon: <FaProjectDiagram size={32} />,
    backContent: "跨界的乐趣在于：用A领域的方法，解决B领域的难题",
    tags: ["数据科学", "金融工程", "生物信息"],
    formula: "f: X → Y",
  },
  {
    title: "Linux",
    subtitle: "Linux实战",
    description: "服务器、Docker、命令行",
    href: "/study/linux",
    icon: <FaLinux size={32} />,
    backContent: "不是教程，是我实际用到的命令和踩过的坑",
    tags: ["Shell", "Docker", "SSH", "GPU"],
    formula: "$ sudo",
  },
  {
    title: "First Principles",
    subtitle: "第一性原理",
    description: "从基本事实出发思考",
    href: "/study/first-principles",
    icon: <FaLightbulb size={32} />,
    backContent: "不依赖类比和经验，从最基本的约束重新推导结论",
    tags: ["思维模型", "拆解", "质疑假设"],
    formula: "∴ QED",
  },
];

export default function StudyPage() {
  return (
    <div className="page-study relative min-h-screen overflow-hidden">

      {/* 内容层 */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-28 pb-32">
        {/* 页面标题 */}
        <div className="mb-16 lg:mb-24">
          <motion.p
            className="text-[10px]  tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--theme-study)", opacity: 0.5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Learning Path
          </motion.p>
          <motion.h1
            className="text-4xl lg:text-6xl font-light mb-4"
            style={{ color: "var(--text)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Study <span className="gradient-text">Notes.</span>
          </motion.h1>
          <motion.p
            className="max-w-lg text-sm"
            style={{ color: "var(--muted)", opacity: 0.5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Learning notes and knowledge base across different disciplines. 
            Flip the cards to explore.
          </motion.p>
        </div>

        {/* 扑克翻转卡片网格 */}
        <PokerFlipGrid>
          {studyTopics.map((topic, i) => (
            <SpringEnter key={i} delay={i * 0.08}>
              <a href={topic.href} className="block">
                <PokerFlipCard
                theme="study"
                className="mx-auto"
                front={
                  <div className="h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, var(--page-surface) 0%, rgba(20,20,20,1) 100%)",
                      border: "1px solid var(--page-surface-border)",
                    }}
                  >
                    <span
                      className="absolute top-3 right-4 text-xs font-bold"
                      style={{ color: "var(--page-brand)", opacity: 0.25 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <motion.div
                      className="mb-4"
                      style={{ color: "var(--page-brand)" }}
                      whileHover={{ scale: 1.1, rotateY: 15 }}
                      transition={{ duration: 0.3 }}
                    >
                      {topic.icon}
                    </motion.div>

                    <h3 className="text-xl font-semibold mb-1" style={{ color: "var(--text)" }}>
                      {topic.title}
                    </h3>
                    <p className="text-xs mb-3" style={{ color: "var(--page-brand)", opacity: 0.5 }}>
                      {topic.subtitle}
                    </p>
                    <p className="text-xs" style={{ color: "var(--muted)", opacity: 0.5 }}>
                      {topic.description}
                    </p>

                    <motion.p
                      className="absolute bottom-3 text-[10px]  tracking-widest uppercase"
                      style={{ color: "var(--page-brand)", opacity: 0.2 }}
                      animate={{ opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Tap to flip →
                    </motion.p>
                  </div>
                }
                back={
                  <div className="h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, var(--page-glow) 0%, rgba(16,16,16,1) 100%)",
                      border: "1px solid var(--page-surface-border)",
                    }}
                  >
                    <div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                      style={{
                        fontSize: "64px",
                        fontFamily: "Inter, system-ui, sans-serif",
                        fontWeight: 700,
                        color: "var(--page-brand)",
                        opacity: 0.03,
                        letterSpacing: "0.1em",
                      }}
                    >
                      {topic.formula}
                    </div>

                    <p className="text-sm leading-relaxed mb-6 relative z-10" style={{ color: "var(--muted)", opacity: 0.7 }}>
                      {topic.backContent}
                    </p>

                    <div className="flex flex-wrap gap-2 justify-center mb-6 relative z-10">
                      {topic.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="px-3 py-1  text-xs"
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

                    <motion.div
                      className="px-4 py-2  text-xs font-medium relative z-10"
                      style={{
                        background: "var(--page-surface)",
                        color: "var(--page-brand)",
                        border: "1px solid var(--page-surface-border)",
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore →
                    </motion.div>
                  </div>
                }
                flipOnHover={true}
                delay={i}
                size="medium"
              />
            </a>
            </SpringEnter>
          ))}
        </PokerFlipGrid>
      </main>
    </div>
  );
}
