"use client";
import { motion } from "framer-motion";
import Card from "../components/Card";

const studyTopics = [
  {
    title: "Math",
    description: "Linear algebra, calculus, and mathematical foundations",
    href: "/study/math"
  },
  {
    title: "Optimization",
    description: "Convex optimization, combinatorial optimization techniques",
    href: "/study/optimization"
  },
  {
    title: "ML & DL",
    description: "Machine learning and deep learning concepts",
    href: "/study/ml-dl"
  },
  {
    title: "Management",
    description: "Operations research and management science",
    href: "/study/management"
  },
  {
    title: "Interdisciplinary",
    description: "Cross-domain knowledge and applications",
    href: "/study/interdisciplinary"
  }
];

export default function StudyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <motion.h1 
        className="text-3xl font-semibold mb-4"
        style={{ color: "var(--brand)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Study
      </motion.h1>
      <motion.p 
        className="mb-8" 
        style={{ color: "var(--muted)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Learning notes and knowledge base across different disciplines.
      </motion.p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {studyTopics.map((topic, i) => (
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


