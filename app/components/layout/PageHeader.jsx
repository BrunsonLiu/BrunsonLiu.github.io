﻿﻿﻿﻿﻿"use client";
import { motion } from "framer-motion";

export default function PageHeader({ title, description, icon, delay = 0 }) {
  return (
    <header className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        className="flex items-center gap-3 mb-4"
      >
        {icon && (
          <div
            className="p-2 rounded-lg"
            style={{
              background: "var(--bg-accent-1)",
              color: "var(--brand)",
            }}
          >
            {icon}
          </div>
        )}
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ color: "var(--brand)" }}
        >
          {title}
        </h1>
      </motion.div>

      {description && (
        <motion.p
          className="text-base max-w-2xl"
          style={{ color: "var(--muted)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2, duration: 0.6 }}
        >
          {description}
        </motion.p>
      )}

      {/* 底部装饰线 */}
      <motion.div
        className="mt-4 h-px"
        style={{ background: "rgba(255,255,255,0.06)" }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: delay + 0.3, duration: 0.8, ease: "easeOut" }}
      />
    </header>
  );
}
