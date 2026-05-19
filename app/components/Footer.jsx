﻿﻿﻿﻿﻿"use client";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub } from "react-icons/fa";

const credits = [
  { role: "Name", name: "Brunson" },
  { role: "Role", name: "Algorithm Engineer & Researcher" },
  { role: "Education", name: "WHU → USTC" },
  { role: "Location", name: "Shanghai, China" },
  { role: "Contact", name: "1815751961@qq.com" },
  { role: "GitHub", name: "BrunsonLiu" },
];

const stagger = 0.12;

export default function Footer() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Title */}
      <motion.h2
        className="cinema-display mb-16"
        style={{ color: "#fff" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Credits
      </motion.h2>

      {/* Credit roll */}
      <div className="space-y-6 mb-20">
        {credits.map((credit, i) => (
          <motion.div
            key={credit.role}
            className="flex items-baseline gap-4 sm:gap-8"
            style={{ color: "rgba(255,255,255,0.5)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * stagger, duration: 0.6 }}
          >
            <span
              className="text-xs font-bold uppercase tracking-[0.3em] w-24 sm:w-32 flex-shrink-0"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              {credit.role}
            </span>
            <span
              className="text-base sm:text-lg font-medium"
              style={{ color: "#fff" }}
            >
              {credit.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Red line divider */}
      <motion.div
        style={{ width: "60px", height: "2px", background: "#e63946", marginBottom: "2rem" }}
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: credits.length * stagger, duration: 0.6 }}
      />

      {/* Social links */}
      <motion.div
        className="flex gap-6 mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: credits.length * stagger + 0.3, duration: 0.6 }}
      >
        <a href="mailto:1815751961@qq.com" className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          <FaEnvelope style={{ color: "#e63946", fontSize: "14px" }} />
          1815751961@qq.com
        </a>
        <a href="https://github.com/BrunsonLiu" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          <FaGithub style={{ color: "#e63946", fontSize: "14px" }} />
          BrunsonLiu
        </a>
      </motion.div>

      {/* QR Code */}
      <motion.div
        className="p-6"
        style={{ border: "1px solid rgba(255,255,255,0.08)", maxWidth: "280px" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: credits.length * stagger + 0.6, duration: 0.6 }}
      >
        <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
          WeChat: 永远别说永远
        </p>
        <div className="w-36 h-36 mx-auto overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
          <img src="/wechat-qr.jpg" alt="微信公众号二维码" className="w-full h-full object-contain" />
        </div>
      </motion.div>

      {/* Copyright */}
      <motion.p
        className="text-xs mt-20"
        style={{ color: "rgba(255,255,255,0.15)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: credits.length * stagger + 0.8, duration: 0.6 }}
      >
        &copy; 2026 Brunson — Continuously Optimizing.
      </motion.p>
    </div>
  );
}