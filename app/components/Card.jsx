"use client";
import { motion } from "framer-motion";

export default function Card({ title, description, href }) {
  return (
    <motion.a 
      href={href} 
      className="block card p-6 transition-all duration-300"
      whileHover={{ scale: 1.02, y: -4 }}
      style={{ 
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
      }}
    >
      <h3 className="font-semibold text-lg" style={{ color: "var(--brand)" }}>{title}</h3>
      {description ? <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{description}</p> : null}
    </motion.a>
  );
}


