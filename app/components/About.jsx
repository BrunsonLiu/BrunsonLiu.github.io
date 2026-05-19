"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FaFlask, FaCode, FaBook, FaLightbulb, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Divider } from "./ui";
import { SkillTags, InfoCard } from "./ui";
import { TiltCard } from "./interactive";
import { PokerFlipGrid, PokerFlipCard } from "./poker-flip";

// 三层分级技能标签 + hover实战心得
function SkillTag({ skill, level, insight }) {
  const [showInsight, setShowInsight] = useState(false);
  
  const levelStyles = {
    core: {
      bg: "rgba(230,57,70,0.12)",
      color: "var(--brand)",
      border: "rgba(230,57,70,0.2)",
    },
    technical: {
      bg: "rgba(255,255,255,0.06)",
      color: "var(--muted)",
      border: "rgba(255,255,255,0.1)",
    },
    tools: {
      bg: "rgba(255,255,255,0.03)",
      color: "rgba(255,255,255,0.5)",
      border: "rgba(255,255,255,0.06)",
    },
  };

  const style = levelStyles[level] || levelStyles.tools;

  return (
    <motion.span
      className="relative px-3 py-1.5  text-xs font-medium border cursor-default"
      style={style}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.05 }}
      whileHover={{ scale: 1.05 }}
      onMouseEnter={() => setShowInsight(true)}
      onMouseLeave={() => setShowInsight(false)}
    >
      {skill}
      {/* hover弹出实战心得 */}
      <motion.div
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg whitespace-nowrap text-[10px] leading-relaxed z-20 pointer-events-none"
        style={{
          background: "rgba(20,20,20,0.95)",
          border: "1px solid rgba(230,57,70,0.15)",
          color: "var(--muted)",
          opacity: showInsight ? 1 : 0,
          transform: showInsight ? "translate(-50%, 0)" : "translate(-50%, 4px)",
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {insight}
        {/* 小三角 */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
          <div
            className="w-2 h-2 rotate-45"
            style={{ background: "rgba(20,20,20,0.95)", borderTop: "1px solid rgba(230,57,70,0.15)", borderRight: "1px solid rgba(230,57,70,0.15)" }}
          />
        </div>
      </motion.div>
    </motion.span>
  );
}

// 交互数字背景
function InteractiveNumberGrid() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const gridRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initGrid();
    };

    const initGrid = () => {
      gridRef.current = [];
      const cols = Math.floor(canvas.width / 60);
      const rows = Math.floor(canvas.height / 60);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          gridRef.current.push({
            x: i * 60 + 30,
            y: j * 60 + 30,
            num: (Math.random() * 100).toFixed(1),
            opacity: 0.02 + Math.random() * 0.03,
          });
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    let frame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      gridRef.current.forEach((cell) => {
        const dx = mouseRef.current.x - cell.x;
        const dy = mouseRef.current.y - cell.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const baseOpacity = 0.02;
        const mouseOpacity = dist < 200 ? (1 - dist / 200) * 0.3 : 0;
        const finalOpacity = baseOpacity + mouseOpacity;

        ctx.fillStyle = `rgba(230,57,70,${finalOpacity})`;
        ctx.font = "10px monospace";
        ctx.fillText(cell.num, cell.x - 15, cell.y);
      });

      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

// 滚动进度指示
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  return (
    <motion.div
      className="fixed top-0 left-0 h-0.5 z-50"
      style={{
        width,
        background: "linear-gradient(90deg, var(--brand), var(--spot), var(--brand))",
      }}
    />
  );
}

const researchAreas = {
  core: ["Operations Research", "Machine Learning", "Combinatorial Optimization"],
  technical: ["Deep Learning", "Reinforcement Learning", "Time Series", "Data Mining"],
  tools: ["Python", "SQL", "Gurobi", "GAMS", "PyTorch", "LangChain"],
};

const skillInsights = {
  "Operations Research": "武大管科核心，中科大L2O方向的基石",
  "Machine Learning": "优化与ML的交叉是我的独特优势",
  "Combinatorial Optimization": "Neural CO是我研究的主战场",
  "Deep Learning": "从理论到实战，调参也是一门艺术",
  "Reinforcement Learning": "教AI做决策，这比我想象的更有趣",
  "Time Series": "STL分解+ARIMA+GARCH，电商投流优化实战",
  "Data Mining": "K-means画像建模，从数据里找规律",
  "Python": "从研究到工程，Python是第一生产力",
  "SQL": "海量仿真数据抽取，SQL是基本功",
  "Gurobi": "工业级求解器，性能碾压一切heuristic",
  "GAMS": "运筹优化建模的标准工具",
  "PyTorch": "动态图的优雅，用过就回不去",
  "LangChain": "LLM应用开发的新尝试",
};

const quickFacts = [
  { icon: <FaFlask size={18} />, title: "Research Focus", description: "Learning to Optimize & ML for Optimization", backNote: "中科大硕士方向，让机器学会做优化决策" },
  { icon: <FaCode size={18} />, title: "Tech Stack", description: "Python, Gurobi, GAMS, PyTorch, SQL", backNote: "写代码和研究算法一样，追求的是优雅和效率" },
  { icon: <FaBook size={18} />, title: "Education", description: "武大管科本科 → 中科大硕士（保研）", backNote: "GPA 3.88/4.0，专业排名2/29，数据结构100分" },
  { icon: <FaLightbulb size={18} />, title: "Philosophy", description: "优化算法的本质是在约束里找最优解，人生也是", backNote: "最好的研究是既能写paper又能落地到工业界的" },
];

export default function About() {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 只在客户端挂载后启用滚动效果和鼠标跟踪
  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section id="about" className="relative overflow-hidden" ref={containerRef}>
      {/* 背景层 */}
      <InteractiveNumberGrid />
      <ScrollProgress />

      {/* 巨大旋转装饰 */}
      <motion.div
        className="absolute right-0 top-1/4 pointer-events-none select-none"
        style={{ rotate }}
      >
        <span className="text-[300px] lg:text-[500px] font-black" style={{ color: "rgba(230,57,70,0.02)" }}>
          01
        </span>
      </motion.div>

      {/* 鼠标光晕 - 只在客户端挂载后渲染 */}
      {mounted && (
        <motion.div
          className="fixed pointer-events-none"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 400,
            background: "radial-gradient(circle, rgba(230,57,70,0.04) 0%, transparent 70%)",
            borderRadius: "50%",
            zIndex: 5,
          }}
        />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* 章节标题 - 极端不对称 */}
        <div className="py-32 lg:py-48">
          <motion.p
            className="text-[10px]  tracking-[0.3em] uppercase mb-8"
            style={{ color: "var(--brand)" }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Chapter 01 — About
          </motion.p>
          
          <motion.h2
            className="max-w-5xl"
            style={{ fontSize: "clamp(48px, 8vw, 120px)", lineHeight: 0.9, letterSpacing: "-0.03em" }}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block" style={{ color: "var(--text)" }}>Building bridges</span>
            <span className="block gradient-text">between</span>
            <span className="block" style={{ color: "var(--text)", opacity: 0.3 }}>math &</span>
            <span className="block gradient-text">intelligence.</span>
          </motion.h2>

          <motion.p
            className="max-w-xl mt-12 ml-auto text-base leading-relaxed"
            style={{ color: "var(--muted)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            I'm a management science postgraduate. I believe the most powerful solutions come 
            from combining the rigor of mathematical optimization with the flexibility of 
            machine learning.
          </motion.p>
        </div>

        {/* 卡片网格 - 非对称布局 */}
        <div className="pb-32">
          <motion.p
            className="text-[10px]  tracking-[0.3em] uppercase mb-12"
            style={{ color: "var(--brand)", opacity: 0.5 }}
          >
            Quick Facts
          </motion.p>

          <PokerFlipGrid>
            {quickFacts.map((fact, i) => (
              <PokerFlipCard
                key={i}
                theme="study"
                className="card-hover-lift"
                flipOnHover={true}
                delay={i * 0.1}
                size="medium"
                front={
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.4 }}
                      className="mb-6"
                      style={{ color: "var(--brand)" }}
                    >
                      {fact.icon}
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text)" }}>
                      {fact.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted)", opacity: 0.7 }}>
                      {fact.description}
                    </p>
                    <div className="absolute bottom-4 right-4 opacity-20" style={{ color: "var(--brand)" }}>
                      <span className="text-[8px]  tracking-widest uppercase">Flip to explore</span>
                    </div>
                  </div>
                }
                back={
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center" style={{ background: "linear-gradient(135deg, rgba(230,57,70,0.05) 0%, transparent 100%)" }}>
                    <div className="mb-6 relative">
                      <div className="absolute inset-0 blur-xl opacity-30" style={{ background: "var(--brand)" }} />
                      <span className="relative text-2xl" style={{ color: "var(--brand)" }}>
                        {fact.icon}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text)", opacity: 0.8 }}>
                      {fact.backNote}
                    </p>
                    <div className="mt-4">
                      <span className="text-[10px]  tracking-widest uppercase px-3 py-1 " style={{ background: "rgba(230,57,70,0.1)", color: "var(--brand)", border: "1px solid rgba(230,57,70,0.2)" }}>
                        Quick Fact #{i + 1}
                      </span>
                    </div>
                  </div>
                }
              />
            ))}
          </PokerFlipGrid>
        </div>

        {/* 研究区域 + 统计 */}
        <div className="pb-32 grid lg:grid-cols-2 gap-20">
          {/* 技能标签云 - 三层分级 */}
          <div>
            <motion.p
              className="text-[10px]  tracking-[0.3em] uppercase mb-8"
              style={{ color: "var(--brand)", opacity: 0.5 }}
            >
              Research Areas
            </motion.p>
            
            {/* 核心研究方向 */}
            <div className="mb-4">
              <p className="text-[9px]  tracking-widest uppercase mb-3" style={{ color: "var(--brand)", opacity: 0.4 }}>
                Core Research
              </p>
              <div className="flex flex-wrap gap-2">
                {researchAreas.core.map((skill, i) => (
                  <SkillTag key={skill} skill={skill} level="core" insight={skillInsights[skill]} />
                ))}
              </div>
            </div>

            {/* 核心技术能力 */}
            <div className="mb-4">
              <p className="text-[9px]  tracking-widest uppercase mb-3" style={{ color: "var(--muted)", opacity: 0.4 }}>
                Technical Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {researchAreas.technical.map((skill, i) => (
                  <SkillTag key={skill} skill={skill} level="technical" insight={skillInsights[skill]} />
                ))}
              </div>
            </div>

            {/* 辅助工具 */}
            <div>
              <p className="text-[9px]  tracking-widest uppercase mb-3" style={{ color: "var(--muted)", opacity: 0.3 }}>
                Tools & Frameworks
              </p>
              <div className="flex flex-wrap gap-2">
                {researchAreas.tools.map((skill, i) => (
                  <SkillTag key={skill} skill={skill} level="tools" insight={skillInsights[skill]} />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            {[
              { value: "3.88", label: "GPA / 4.0" },
              { value: "2", label: "Internships" },
              { value: "3", label: "Finalist Awards" },
              { value: "2:37", label: "Half Marathon" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.span
                  className="block text-5xl lg:text-6xl font-black gradient-text"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-[10px]  tracking-widest uppercase mt-2 block" style={{ color: "var(--muted)", opacity: 0.4 }}>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 社交链接 */}
        <div className="py-20 border-t" style={{ borderColor: "rgba(230,57,70,0.1)" }}>
          <div className="flex justify-center gap-8">
            {[
              { icon: <FaGithub size={24} />, href: "https://github.com/BrunsonLiu" },
              { icon: <FaLinkedin size={24} />, href: "https://linkedin.com/in/brunson" },
              { icon: <FaEnvelope size={24} />, href: "mailto:1815751961@qq.com" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl border transition-all duration-300"
                style={{ borderColor: "rgba(230,57,70,0.1)", color: "var(--muted)" }}
                whileHover={{ scale: 1.15, rotateY: 15, borderColor: "var(--brand)", color: "var(--brand)" }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
