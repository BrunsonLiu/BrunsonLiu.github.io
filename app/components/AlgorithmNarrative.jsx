﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const algorithmSteps = {
  "hero": "// 算法初始化：Brunson 个人模型",
  "about": "// 初始解：核心属性与基础能力",
  "research": "// 迭代优化：特征工程与模型调优",
  "experience": "// 落地验证：工业界泛化性测试",
  "hobbies": "// 正则化：防止过拟合的生活约束",
  "footer": "// 持续迭代：未完待续的优化方向",
};

function AlgorithmLabel({ text }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="text-[10px]  tracking-wider mb-2"
      style={{ color: "var(--brand)", opacity: isInView ? 0.25 : 0 }}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: isInView ? 0.25 : 0, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {text}
    </motion.div>
  );
}

export function AlgorithmNarrative({ section }) {
  const label = algorithmSteps[section];
  if (!label) return null;

  return <AlgorithmLabel text={label} />;
}

export function useAlgorithmScroll() {
  const [optimizationLevel, setOptimizationLevel] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      setOptimizationLevel(Math.min(1, pct));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return optimizationLevel;
}
