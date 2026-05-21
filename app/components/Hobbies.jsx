﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaGamepad, FaChartLine, FaBasketballBall, FaRunning } from "react-icons/fa";
import hobbiesData from "../../data/hobbies.json";
import { TiltCard } from "./interactive";

const iconMap = {
  gamepad: FaGamepad,
  trending: FaChartLine,
  basketball: FaBasketballBall,
  running: FaRunning,
};

// 爱好卡片 - 带 3D 倾斜效果和精致的排版
function HobbyCard({ hobby, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconMap[hobby.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <TiltCard className="h-full cursor-pointer group" intensity={12}>
        <div
          className="relative p-6 transition-all duration-500 rounded-lg h-full"
          style={{
            background: isHovered
              ? `linear-gradient(135deg, ${hobby.theme.primary}08, ${hobby.theme.secondary}08)`
              : "transparent",
            border: `1px solid ${isHovered ? hobby.theme.primary + "30" : "rgba(255,255,255,0.06)"}`,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* 顶部装饰线 */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 h-px transition-all duration-500"
            style={{
              width: isHovered ? "60%" : "0%",
              background: `linear-gradient(90deg, transparent, ${hobby.theme.primary}, transparent)`,
            }}
          />

          {/* 图标 + 标题 */}
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-2.5 rounded-md"
              style={{
                background: `${hobby.theme.primary}10`,
                color: hobby.theme.primary,
              }}
            >
              <Icon size={20} />
            </motion.div>
            <div>
              <h3
                className="text-base font-semibold tracking-tight"
                style={{ color: "var(--text)" }}
              >
                {hobby.title}
              </h3>
              <p className="text-xs" style={{ color: hobby.theme.primary }}>
                {hobby.subtitle}
              </p>
            </div>
          </div>

          {/* 描述 - 更精致的排版 */}
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: "var(--muted)" }}
          >
            {hobby.description}
          </p>

          {/* 详情列表 - 极简风格 */}
          <ul className="space-y-1.5">
            {hobby.details.map((detail, i) => (
              <li
                key={i}
                className="text-xs flex items-center gap-2"
                style={{ color: "var(--muted)" }}
              >
                <span
                  className="w-1 h-1  flex-shrink-0"
                  style={{
                    backgroundColor: hobby.theme.primary,
                    opacity: 0.6,
                  }}
                />
                {detail}
              </li>
            ))}
          </ul>

          {/* 底部装饰 */}
          <div
            className="mt-4 pt-4 border-t"
            style={{ borderColor: "rgba(255,255,255,0.04)" }}
          >
            <motion.div
              className="text-xs font-medium"
              style={{ color: hobby.theme.primary }}
              animate={{ opacity: isHovered ? 1 : 0.6 }}
            >
              Explore →
            </motion.div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Hobbies() {
  return (
    <section id="hobbies" className="py-24">
      {/* 微妙的背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] "
          style={{
            background: "radial-gradient(circle, rgba(230,57,70,0.03) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* 标题区 - 极简风格 */}
        <div className="text-center mb-16">
          <motion.p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--muted)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Beyond Code
          </motion.p>
          <motion.h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ color: "var(--text)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What Shapes Me
          </motion.h2>
          <motion.div
            className="w-12 h-px mx-auto"
            style={{ background: "var(--brand)" }}
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
        </div>

        {/* 卡片网格 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hobbiesData.map((hobby, index) => (
            <HobbyCard key={index} hobby={hobby} index={index} />
          ))}
        </div>

        {/* 底部引用 */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p
            className="text-sm italic"
            style={{ color: "var(--muted)" }}
          >
            "The balance between discipline and passion defines our journey."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
