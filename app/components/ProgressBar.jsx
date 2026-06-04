﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [showConvergence, setShowConvergence] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      setProgress(pct);
      if (pct > 95) {
        setShowConvergence(true);
      } else {
        setShowConvergence(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[60]">
      <div
        className="h-[1px]"
        style={{ width: `${progress}%`,
          background: "var(--sp-brand, var(--brand))" }}
      />
      <AnimatePresence>
        {showConvergence && (
          <motion.div
            className="text-[9px]  tracking-wider px-2 py-0.5"
            style={{ color: "var(--brand)", opacity: 0.5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
          >
            — fin
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


