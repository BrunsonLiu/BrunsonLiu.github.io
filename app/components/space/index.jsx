"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SlowIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollReveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay, duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ children }) {
  return (
    <p className="text-[10px] font-medium uppercase tracking-[0.4em] mb-8" style={{ color: "var(--sp-muted)" }}>
      {children}
    </p>
  );
}

export function SpaceLabel({ children }) {
  return (
    <p className="text-[10px] font-medium uppercase tracking-[0.4em] mb-16" style={{ color: "var(--sp-muted)" }}>
      {children}
    </p>
  );
}

export function AccentLine({ width = "48px" }) {
  return <div style={{ width, height: "1px", background: "var(--sp-accent)", marginBottom: "1.5rem" }} />;
}

export function BackLink({ href = "/literature", label = "← 文学空间" }) {
  return (
    <a href={href} className="text-[10px] font-medium uppercase tracking-[0.4em] inline-block mb-16 transition-opacity duration-300 hover:opacity-60"
      style={{ color: "var(--sp-muted)" }}>
      {label}
    </a>
  );
}
