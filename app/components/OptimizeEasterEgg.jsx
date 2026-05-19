"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function OptimizeEasterEgg() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let buffer = "";
    const TARGET = "optimize";

    const onKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable) return;

      buffer += e.key.toLowerCase();
      if (buffer.length > TARGET.length) {
        buffer = buffer.slice(-TARGET.length);
      }

      if (buffer === TARGET) {
        buffer = "";
        setMessage("✓ Optimized.");
        setShow(true);
        setTimeout(() => setShow(false), 2000);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-8 left-1/2 z-[10000]"
          style={{ transform: "translateX(-50%)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="px-6 py-3 text-sm font-bold tracking-wider uppercase"
            style={{
              background: "var(--text)",
              color: "#fff",
            }}
          >
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}