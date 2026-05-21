﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿"use client";
import { motion } from "framer-motion";
import { FaBriefcase, FaAd, FaLightbulb, FaMicrochip } from "react-icons/fa";
import { PokerFlipGrid, PokerFlipCard } from "../components/poker-flip";

const internshipTopics = [
  {
    title: "CXMT",
    subtitle: "长鑫存储 · 运筹优化算法",
    description: "复杂电路多目标黑盒优化，多保真贝叶斯优化 + NSGA2 算法",
    href: "/internship/cxmt",
    icon: <FaMicrochip size={32} />,
    backContent: "第一次把优化模型跑在芯片设计数据上，20维参数空间的黑盒优化，比课本里的问题刺激100倍",
    tags: ["BoTorch", "NSGA2", "贝叶斯优化", "多保真建模"],
    stats: ["AI部门", "电路优化"],
    formula: "min f(x) s.t. x∈X",
    insight: "搭建优化-仿真框架，降低评估成本、提升迭代效率",
  },
  {
    title: "丝宝实业",
    subtitle: "数据分析",
    description: "巨量千川投流优化、用户画像建模、时间序列预测",
    href: "/internship/shuibao",
    icon: <FaAd size={32} />,
    backContent: "数据分析的本质不是跑模型，而是理解业务——让决策者看到数据背后的故事",
    tags: ["STL分解", "K-means", "ARIMA", "GARCH"],
    stats: ["投流优化", "用户画像"],
    formula: "y(t) = T(t) + S(t) + R(t)",
    insight: "用STL分解定位转化节点，K-means做用户分群，ARIMA+GARCH预测会员增长",
  },
  {
    title: "Reflection",
    subtitle: "实习反思",
    description: "从校园理论到工业实践的认知迭代",
    href: "/internship/reflection",
    icon: <FaLightbulb size={32} />,
    backContent: "工业界的算法研发更看重实用性和落地性——稳定可解释的Pareto解比单一理论最优解更有意义",
    tags: ["成长", "反思", "工业实践"],
    stats: ["2段实习", "认知升级"],
    formula: "theory → practice",
    insight: "从学术到工业，最大的收获是理解了约束条件的重要性",
  },
];

export default function InternshipPage() {
  return (
    <main className="page-internship mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 min-h-screen relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72  blur-3xl" style={{ background: "var(--page-glow)", opacity: 0.3 }} />
        <div className="absolute bottom-20 right-10 w-96 h-96  blur-3xl" style={{ background: "var(--page-glow)", opacity: 0.3 }} />
      </div>

      {/* 页面标题 */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mb-20"
      >
        <p className="text-[10px]  tracking-[0.3em] uppercase mb-6" style={{ color: "var(--page-brand)" }}>
          Experience — Internship
        </p>
        <h1
          className="max-w-4xl"
          style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 0.95, letterSpacing: "-0.03em" }}
        >
          <span className="block" style={{ color: "var(--text)" }}>From</span>
          <span className="block gradient-text">theory to</span>
          <span className="block" style={{ color: "var(--text)", opacity: 0.3 }}>industry.</span>
        </h1>
        <p className="max-w-lg mt-8 text-base leading-relaxed" style={{ color: "var(--muted)", opacity: 0.6 }}>
          两段实习经历，从电商数据分析到芯片电路优化，每一次都是对理论知识的工业级检验。
        </p>
      </motion.div>

      {/* 扑克翻转卡片网格 */}
      <PokerFlipGrid>
        {internshipTopics.map((topic, i) => (
          <a key={i} href={topic.href} className="block">
            <PokerFlipCard
              flipOnHover={true}
              delay={i}
              size="medium"
              front={
                <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6"
                    style={{ color: "var(--page-brand)" }}
                  >
                    {topic.icon}
                  </motion.div>
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ color: "var(--text)" }}
                  >
                    {topic.title}
                  </h3>
                  <p className="text-xs  tracking-wider mb-4" style={{ color: "var(--page-brand)", opacity: 0.6 }}>
                    {topic.subtitle}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)", opacity: 0.7 }}>
                    {topic.description}
                  </p>
                  <div className="absolute bottom-4 right-4 opacity-20" style={{ color: "var(--page-brand)" }}>
                    <span className="text-[8px]  tracking-widest uppercase">Flip to explore</span>
                  </div>
                </div>
              }
              back={
                <div className="h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, var(--page-surface) 0%, rgba(20,20,20,1) 100%)",
                    border: "1px solid var(--page-surface-border)",
                  }}
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                    style={{
                      fontSize: "48px",
                      fontFamily: "serif",
                      fontStyle: "italic",
                      color: "var(--page-brand)",
                      opacity: 0.04,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {topic.formula}
                  </div>

                  <p className="text-xs mb-4 relative z-10" style={{ color: "var(--page-brand)", opacity: 0.8 }}>
                    {topic.insight}
                  </p>

                  <p className="text-sm leading-relaxed mb-6 relative z-10" style={{ color: "var(--muted)", opacity: 0.7 }}>
                    {topic.backContent}
                  </p>

                  <div className="flex flex-wrap gap-2 justify-center mb-4 relative z-10">
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

                  <div className="flex gap-3 justify-center relative z-10">
                    {topic.stats.map((stat, j) => (
                      <span
                        key={j}
                        className="px-2 py-1 rounded text-[10px] "
                        style={{
                          background: "var(--page-surface)",
                          color: "var(--page-muted)",
                        }}
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                </div>
              }
            />
          </a>
        ))}
      </PokerFlipGrid>
    </main>
  );
}
