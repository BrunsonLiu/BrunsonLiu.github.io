"use client";
import { useEffect, useRef } from "react";

export default function CursorRing() {
  const ringRef = useRef(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;

      ring.style.transform = `translate(${currentX - 16}px, ${currentY - 16}px)`;

      const dx = mouseX - currentX;
      const dy = mouseY - currentY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 2) {
        ring.style.opacity = Math.min(0.7, speed / 30);
        ring.style.width = `${Math.max(24, 32 - speed * 0.02)}px`;
        ring.style.height = `${Math.max(24, 32 - speed * 0.02)}px`;
      } else {
        ring.style.opacity = 0.15;
        ring.style.width = "32px";
        ring.style.height = "32px";
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    const frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      className="fixed pointer-events-none"
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        border: "1.5px solid var(--brand)",
        opacity: 0,
        zIndex: 9999,
        top: 0,
        left: 0,
        transition: "width 0.15s ease, height 0.15s ease, opacity 0.3s ease",
      }}
    />
  );
}