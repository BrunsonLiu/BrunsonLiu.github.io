﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿"use client";
import { motion } from "framer-motion";

const styles = {
  default: {
    badge: {
      background: "var(--surface)",
      color: "var(--brand)",
      border: "1px solid var(--surface-border)",
    },
  },
};

export function Badge({ children, variant = "default" }) {
  const s = styles[variant] || styles.default;
  return (
    <span
      className="inline-block px-3 py-1 text-xs font-medium"
      style={s.badge}
    >
      {children}
    </span>
  );
}

export function SkillTags({ skills }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, i) => (
        <span
          key={i}
          className="px-3 py-1.5 text-xs font-medium inline-block"
          style={{
            background: "var(--surface)",
            color: "var(--text)",
            border: "1px solid var(--surface-border)",
          }}
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

export function InfoCard({ children, className = "" }) {
  return (
    <div
      className={`p-5 ${className}`}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--surface-border)",
      }}
    >
      {children}
    </div>
  );
}

export function TimelineItem({ year, title, description, children }) {
  return (
    <motion.div
      className="flex gap-4 items-start"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex-shrink-0 w-12 text-right">
        <span className="text-xs font-bold" style={{ color: "var(--brand)" }}>{year}</span>
      </div>
      <div
        className="flex-1 pb-6 pl-6"
        style={{ borderLeft: "1px solid var(--surface-border)" }}
      >
        <h4 className="font-bold text-sm" style={{ color: "var(--text)" }}>{title}</h4>
        {description && (
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>{description}</p>
        )}
        {children}
      </div>
    </motion.div>
  );
}

export function Alert({ type = "info", children }) {
  const alertStyles = {
    info: { background: "rgba(255,255,255,0.04)", borderColor: "var(--text)", color: "var(--text)" },
    success: { background: "rgba(230,57,70,0.06)", borderColor: "var(--brand)", color: "var(--brand)" },
    warning: { background: "rgba(255,255,255,0.04)", borderColor: "var(--muted)", color: "var(--muted)" },
  };
  const s = alertStyles[type] || alertStyles.info;
  return (
    <div className="p-4 text-sm" style={{ background: s.background, borderLeft: `3px solid ${s.borderColor}`, color: s.color }}>
      {children}
    </div>
  );
}

export function CodeBlock({ code, language = "" }) {
  return (
    <pre
      className="p-5 overflow-auto text-sm"
      style={{
        background: "var(--surface)",
        borderLeft: "2px solid var(--brand)",
        color: "var(--text)",
        fontFamily: "'SF Mono', 'Fira Code', monospace",
      }}
    >
      {language && (
        <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: "var(--brand)", opacity: 0.5 }}>
          {language}
        </div>
      )}
      <code>{code}</code>
    </pre>
  );
}

export function ProgressBar({ value = 0, max = 100, label }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-xs mb-1.5">
          <span style={{ color: "var(--muted)" }}>{label}</span>
          <span style={{ color: "var(--text)" }}>{Math.round(pct)}%</span>
        </div>
      )}
      <div className="w-full h-1.5 overflow-hidden" style={{ background: "var(--surface-border)" }}>
        <motion.div
          className="h-full"
          style={{ background: "var(--brand)" }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

export function Divider({ className = "" }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1" style={{ height: 1, background: "var(--surface-border)" }} />
      <div style={{ width: 6, height: 6, background: "var(--brand)" }} />
      <div className="flex-1" style={{ height: 1, background: "var(--surface-border)" }} />
    </div>
  );
}