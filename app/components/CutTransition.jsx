"use client";
import { useEffect, useRef, useState } from "react";

const CUT_THRESHOLD = 80;

export default function CutTransition() {
  const [active, setActive] = useState(false);
  const lastScroll = useRef(0);
  const ticking = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = Math.abs(currentY - lastScroll.current);
        if (delta > CUT_THRESHOLD && !active) {
          setActive(true);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => setActive(false), 400);
        }
        lastScroll.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [active]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{
        background: "rgba(255,255,255,0.03)",
        opacity: active ? 1 : 0,
        transition: "opacity 0.15s ease-out, opacity 0.3s ease-in",
      }}
    />
  );
}