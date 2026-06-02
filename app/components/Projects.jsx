﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿"use client";
import { motion } from "framer-motion";
import { FaBrain, FaRoute, FaChartBar } from "react-icons/fa";
import projects from "../../data/projects.json";

const iconMap = {
  brain: FaBrain,
  route: FaRoute,
  chart: FaChartBar,
};

export default function Projects() {
  return (
    <section id="projects" className="text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Featured Projects
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8 mt-8">
        {projects.map((p, i) => {
          const Icon = iconMap[p.icon] || FaBrain;
          return (
            <motion.div
              key={i}
              className="card card-hover p-6 transition"
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-4" style={{ color: "var(--brand)" }}>
                <Icon size={32} className="mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold mb-2" style={{ color: "var(--brand)" }}>
                {p.title}
              </h3>
              <p style={{ color: "var(--muted)" }}>{p.desc}</p>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {p.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="px-3 py-1  text-xs"
                    style={{
                      background: "var(--bg-accent-1)",
                      color: "var(--muted)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
