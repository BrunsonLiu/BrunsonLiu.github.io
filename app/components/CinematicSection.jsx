"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const filmStocks = {
  noir: { bg: "#0a0a0a", text: "#ffffff", muted: "rgba(255,255,255,0.4)", accent: "#e63946" },
  paper: { bg: "#0e0e0e", text: "#f0f0f0", muted: "rgba(255,255,255,0.4)", accent: "#e63946" },
  cool: { bg: "#0c0c0c", text: "#f0f0f0", muted: "rgba(255,255,255,0.35)", accent: "#e63946" },
  clean: { bg: "#0b0b0b", text: "#f0f0f0", muted: "rgba(255,255,255,0.35)", accent: "#e63946" },
};

export default function CinematicSection({
  children,
  scene = 1,
  label = "",
  filmStock = "clean",
  className = "",
}) {
  const ref = useRef(null);
  const stock = filmStocks[filmStock] || filmStocks.clean;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [40, 0]);

  return (
    <motion.section
      ref={ref}
      className={`min-h-screen relative overflow-hidden ${className}`}
      style={{ background: stock.bg, padding: 0 }}
    >
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-24">
        {/* Scene marker — with giant watermark */}
        <div className="flex items-center gap-4 mb-4 sm:mb-8">
          <span
            className="text-xs font-bold tracking-[0.4em] uppercase"
            style={{ color: "var(--muted)", opacity: 0.5, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Scene {String(scene).padStart(2, "0")}{label ? ` — ${label}` : ""}
          </span>
          <div style={{ width: "48px", height: "1px", background: stock.accent, opacity: 0.4 }} />
        </div>

        {/* Giant scene number watermark */}
        <div
          className="absolute right-8 sm:right-16 top-1/2 -translate-y-1/2 pointer-events-none select-none"
          style={{
            fontSize: "clamp(120px, 30vw, 400px)",
            fontWeight: 900,
            lineHeight: 0.8,
            color: "rgba(230,57,70,0.025)",
            zIndex: 0,
            letterSpacing: "-0.06em",
          }}
        >
          {String(scene).padStart(2, "0")}
        </div>

        <motion.div style={{ opacity, y }}>
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
}