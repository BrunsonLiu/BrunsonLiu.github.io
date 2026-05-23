﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const themeEasing = {
  study: [0.34, 1.56, 0.64, 1],
  research: [0.25, 0.46, 0.45, 0.94],
  diary: [0.25, 0.46, 0.45, 0.94],
  hobby: [0.34, 1.56, 0.64, 1],
};

const brandColors = {
  default: "230,57,70",
  study: "230,57,70",
  research: "230,57,70",
  diary: "230,57,70",
  hobby: "230,57,70",
};

export function PokerFlipCard({
  front,
  back,
  className = "",
  flipOnHover = false,
  autoFlip = false,
  delay = 0,
  size = "medium",
  theme = "default",
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [breathPhase, setBreathPhase] = useState(0);
  const intervalRef = useRef(null);
  const cardRef = useRef(null);
  const tiltRef = useRef({ x: 0, y: 0 });

  const sizes = {
    small: { width: "200px", height: "280px" },
    medium: { width: "280px", height: "380px" },
    large: { width: "320px", height: "420px" },
  };

  const { width, height } = sizes[size];

  if (autoFlip && !intervalRef.current) {
    intervalRef.current = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 4000 + delay * 1000);
  }

  useEffect(() => {
    if (!isHovered) return;
    let frame;
    const animate = () => {
      setBreathPhase((prev) => prev + 0.02);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isHovered]);

  const shouldFlip = flipOnHover ? isHovered : isFlipped;
  const easing = themeEasing[theme] || themeEasing.study;
  const brandColor = brandColors[theme] || brandColors.default;
  const breathIntensity = (Math.sin(breathPhase) + 1) * 0.5;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltRef.current = { x: y * -6, y: x * 6 };
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    tiltRef.current = { x: 0, y: 0 };
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative cursor-pointer ${className}`}
      style={{
        width,
        height,
        perspective: "1200px",
      }}
      onClick={() => {
        if (!flipOnHover) {
          setIsFlipped(!isFlipped);
          if (theme === "hobby") {
            setIsClicked(true);
            setTimeout(() => setIsClicked(false), 400);
          }
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: delay * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <motion.div
        className="relative"
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: `transform 0.8s cubic-bezier(${easing.join(", ")})`,
          transform: shouldFlip
            ? "rotateY(180deg)"
            : `rotateX(${tiltRef.current.x}deg) rotateY(${tiltRef.current.y}deg)`,
          borderRadius: "0",
          background: "#141414",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* 正面 */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* 顶部微光 */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: isHovered
                ? `linear-gradient(180deg, rgba(${brandColor},${0.06 + breathIntensity * 0.06}) 0%, transparent 50%)`
                : "transparent",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          />

          {/* 柔和阴影 + 呼吸光效 */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              boxShadow: isHovered
                ? `0 8px 32px rgba(${brandColor},0.15), 0 0 24px rgba(${brandColor},${0.08 + breathIntensity * 0.08}), inset 0 0 16px rgba(${brandColor},${0.04 + breathIntensity * 0.04})`
                : "0 4px 16px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)",
              transition: "box-shadow 0.5s ease",
            }}
          />

          {/* 底部光 */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-2 blur-sm"
            style={{
              background: `rgba(${brandColor},${isHovered ? 0.08 : 0.03})`,
              transition: "background 0.5s ease",
            }}
          />

          <div className="w-full h-full">{front}</div>
        </div>

        {/* 背面 */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* 背面柔和光效 */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `linear-gradient(135deg, rgba(${brandColor},0.06) 0%, rgba(255,255,255,0.03) 50%, transparent 100%)`,
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              boxShadow: `0 0 16px rgba(${brandColor},0.1), inset 0 0 12px rgba(${brandColor},0.03)`,
            }}
          />

          <div className="w-full h-full">{back}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function PokerFlipGrid({ children, className = "" }) {
  return <div className={`flex flex-wrap gap-6 justify-center ${className}`}>{children}</div>;
}

export function PokerCardPattern({ type = "default" }) {
  const patterns = {
    default: (
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
        <pattern id="poker-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1" fill="currentColor" />
          <line x1="0" y1="0" x2="10" y2="10" stroke="currentColor" strokeWidth="0.3" />
        </pattern>
        <rect width="100" height="100" fill="url(#poker-pattern)" />
      </svg>
    ),
    stars: (
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-current"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
            }}
          />
        ))}
      </div>
    ),
  };

  return patterns[type] || patterns.default;
}
