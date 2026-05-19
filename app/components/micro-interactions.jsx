"use client";
import { motion } from "framer-motion";

export function StaggerText({ text, className = "" }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function RuleLine({ className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ width: 0 }}
      whileInView={{ width: "100%" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ height: 1, background: "var(--brand)", opacity: 0.3 }}
    />
  );
}

export function GridReveal({ children, className = "" }) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.04 } },
      }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--brand)", zIndex: 10 }}
        variants={{
          hidden: { scaleX: 1, transformOrigin: "left" },
          visible: { scaleX: 0, transformOrigin: "right", transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
        }}
      />
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.3, delay: 0.2 } },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function SectionRule({ label }) {
  return (
    <div className="flex items-center gap-4 my-12">
      <motion.div
        className="flex-1"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ height: 1, background: "var(--surface-border)" }} />
      </motion.div>
      {label && (
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "var(--muted)", opacity: 0.5 }}>
          {label}
        </span>
      )}
      <motion.div
        className="flex-1"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <div style={{ height: 1, background: "var(--surface-border)" }} />
      </motion.div>
    </div>
  );
}