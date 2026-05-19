"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SceneReveal({ children, index = 1, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4, 1], [60, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [0.96, 1, 1]);

  return (
    <motion.div ref={ref} className={className} style={{ opacity, y, scale }}>
      {children}
    </motion.div>
  );
}