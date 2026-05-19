"use client";
import { useState, useEffect, useRef } from "react";

export function NumberScramble({ value, prefix = "", suffix = "", duration = 600 }) {
  const [display, setDisplay] = useState(String(value));
  const [scrambling, setScrambling] = useState(false);
  const timerRef = useRef(null);
  const frameRef = useRef(null);

  const scramble = () => {
    if (scrambling) return;
    setScrambling(true);

    const start = Date.now();
    const isNumeric = !isNaN(Number(value));

    const tick = () => {
      const elapsed = Date.now() - start;
      if (elapsed >= duration) {
        setDisplay(String(value));
        setScrambling(false);
        return;
      }

      if (isNumeric) {
        const progress = elapsed / duration;
        const ease = 1 - Math.pow(1 - progress, 3);
        const range = (1 - ease) * 20;
        const offset = (Math.random() - 0.5) * range;
        setDisplay((Number(value) + offset).toFixed(1));
      } else {
        const chars = String(value).split("");
        const scrambled = chars
          .map((c) => (c === " " ? " " : String.fromCharCode(65 + Math.floor(Math.random() * 26))))
          .join("");
        setDisplay(scrambled);
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
  };

  const handleEnter = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(scramble, 100);
  };

  const handleLeave = () => {
    clearTimeout(timerRef.current);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setDisplay(String(value));
    setScrambling(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <span
      className="inline-block cursor-default font-bold"
      style={{ color: "var(--brand)", fontVariantNumeric: "tabular-nums" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {prefix}{display}{suffix}
    </span>
  );
}