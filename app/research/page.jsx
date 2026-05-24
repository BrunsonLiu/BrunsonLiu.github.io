"use client";
import { FadeIn } from "../components/space";
import Link from "next/link";

const arc = [
  { phase: "建模", period: "2022–2024", desc: "MILP、启发式、Gurobi。把问题写成数学，再让计算机解。", skills: ["Gurobi", "MILP", "元启发式"] },
  { phase: "学习", period: "2024–2025", desc: "用神经网络替代手工规则。GNN编码图结构，PPO学习构造策略。", skills: ["PyTorch", "GNN", "PPO"] },
  { phase: "泛化", period: "2025–现在", desc: "一个模型解多种VRP变体。不重新训练，直接迁移。这是L2O的核心承诺。", skills: ["L2O", "Transfer", "VRP"] },
];

const projects = [
  {
    title: "无人机巡检定位-路径联合优化",
    context: "本科毕设",
    problem: "分布式光伏电站需要多架无人机协同巡检，选址和路径互相影响，不能分开优化。",
    method: "MO-ACO + ALNS 混合算法，三层信息素架构。选址层决定巡检点，路径层规划访问顺序，联合层协调两者。",
    result: "Pareto前沿显著优于NSGA-II，解的多样性和收敛性均提升。",
    tags: ["MO-ACO", "ALNS", "MILP", "Pareto"],
  },
  {
    title: "L2O 求解 VRP",
    context: "硕士研究方向",
    problem: "传统启发式算法需要针对每种VRP变体手工设计规则，换一个变体就要重新写。能不能让模型自己学会求解？",
    method: "GNN编码节点和边的关系，PPO训练构造策略。关键：设计跨变体的统一状态表示，让同一个模型处理CVRP、VRPTW等不同约束。",
    result: "大规模实例上逼近Gurobi，推理速度比精确算法快2-3个数量级。",
    tags: ["L2O", "GNN", "PPO", "VRP"],
  },
  {
    title: "多目标黑盒优化",
    context: "CXMT · 算法实习",
    problem: "电路参数优化，20维搜索空间，每次仿真耗时数小时，数据极其稀疏。",
    method: "多保真贝叶斯优化 + NSGA2。用低保真代理模型筛选候选解，只对有潜力的解跑高保真仿真。搭建了完整的优化-仿真闭环框架。",
    result: "评估次数减少60%以上，Pareto前沿质量不降。",
    tags: ["BoTorch", "NSGA2", "多保真", "代理模型"],
  },
];

export default function ResearchPage() {
  return (
    <div className="space-academic min-h-screen">
      <div className="space-grain" />

      <div className="px-6 lg:px-8 py-24" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <FadeIn>
          <Link href="/" prefetch={false} className="text-xs font-medium uppercase tracking-[0.4em] inline-block mb-16 transition-opacity duration-300 hover:opacity-60"
            style={{ color: "var(--sp-muted)" }}>
            ← 首页
          </Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="mb-4" style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.02em",
            color: "var(--sp-text)",
          }}>
            研究
          </h1>
          <div style={{ width: "32px", height: "1px", background: "var(--sp-accent)", marginBottom: "1rem" }} />
          <p className="text-base leading-relaxed max-w-xl mb-20" style={{ color: "var(--sp-muted)" }}>
            用算法解组合优化问题。从手工设计启发式到让模型自己学，核心问题是泛化——一个模型能不能解一类问题？
          </p>
        </FadeIn>

        <FadeIn>
          <p className="text-xs font-medium uppercase tracking-[0.3em] mb-8" style={{ color: "var(--sp-accent)" }}>
            研究路径
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {arc.map((a, i) => (
            <FadeIn key={a.phase} delay={0.1 * i}>
              <div className="rsch-arc-card">
                <div className="rsch-arc-num">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="rsch-arc-phase">{a.phase}</h3>
                <p className="rsch-arc-period">{a.period}</p>
                <p className="rsch-arc-desc">{a.desc}</p>
                <div className="rsch-arc-skills">
                  {a.skills.map((s) => (
                    <span key={s} className="rsch-arc-skill">{s}</span>
                  ))}
                </div>
                {i < arc.length - 1 && (
                  <div className="rsch-arc-arrow md:block hidden">→</div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <p className="text-xs font-medium uppercase tracking-[0.3em] mb-8" style={{ color: "var(--sp-accent)" }}>
            项目
          </p>
        </FadeIn>

        <div className="space-y-8">
          {projects.map((proj, i) => (
            <FadeIn key={proj.title} delay={0.08 * i}>
              <div className="rsch-proj">
                <div className="rsch-proj-head">
                  <div>
                    <h3 className="rsch-proj-title">{proj.title}</h3>
                    <p className="rsch-proj-context">{proj.context}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {proj.tags.map((t) => (
                      <span key={t} className="rsch-proj-tag">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="rsch-proj-body">
                  <div className="rsch-proj-block">
                    <p className="rsch-proj-label">问题</p>
                    <p className="rsch-proj-text">{proj.problem}</p>
                  </div>
                  <div className="rsch-proj-block">
                    <p className="rsch-proj-label">方法</p>
                    <p className="rsch-proj-text">{proj.method}</p>
                  </div>
                  <div className="rsch-proj-block">
                    <p className="rsch-proj-label">结果</p>
                    <p className="rsch-proj-text">{proj.result}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div style={{ height: "80px" }} />
      </div>
    </div>
  );
}
