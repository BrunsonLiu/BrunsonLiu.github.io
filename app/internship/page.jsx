"use client";
import { motion } from "framer-motion";
import Card from "../components/Card";

const internshipTopics = [
  {
    title: "Supply Chain Project",
    description: "Optimization work in logistics and supply chain",
    href: "/internship/supply-chain-project"
  },
  {
    title: "Ad Algorithm Notes",
    description: "Notes on advertising algorithms and systems",
    href: "/internship/ad-algorithm-notes"
  },
  {
    title: "Reflection",
    description: "Lessons learned and growth from internship experiences",
    href: "/internship/reflection"
  }
];

export default function InternshipPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <motion.h1 
        className="text-3xl font-semibold mb-4"
        style={{ color: "var(--brand)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Internship
      </motion.h1>
      <motion.p 
        className="mb-8" 
        style={{ color: "var(--muted)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Projects, notes, and reflections from my internship experiences in algorithm engineering.
      </motion.p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {internshipTopics.map((topic, i) => (
          <motion.div
            key={topic.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
          >
            <Card title={topic.title} description={topic.description} href={topic.href} />
          </motion.div>
        ))}
      </div>
    </main>
  );
}


