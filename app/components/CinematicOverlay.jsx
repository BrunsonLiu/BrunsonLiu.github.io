"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CinematicOverlay() {
  const [curtainVisible, setCurtainVisible] = useState(true);
  const [vignetteOpacity, setVignetteOpacity] = useState(0.06);
  const ticking = useRef(false);

  useEffect(() => {
    setTimeout(() => setCurtainVisible(false), 400);

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
        setVignetteOpacity(0.06 + progress * 0.14);
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Opening curtain — fades from black */}
      <AnimatePresence>
        {curtainVisible && (
          <motion.div
            className="fixed inset-0 z-[10001] pointer-events-none"
            style={{ background: "#0a0a0a" }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Vignette — darkens edges, intensifies with scroll */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 9997,
          opacity: vignetteOpacity,
          background: `radial-gradient(ellipse at center, transparent 55%, rgba(10,10,10,0.7) 100%)`,
          transition: "opacity 0.6s ease",
        }}
      />

      {/* Film grain */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 9996,
          opacity: 0.06,
          mixBlendMode: "overlay",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
}