"use client";
import { motion } from "framer-motion";
import Card from "../components/Card";

const researchTopics = [
  {
    title: "L2O",
    description: "Learning to Optimize - Neural networks for combinatorial optimization",
    href: "/research/l2o"
  },
  {
    title: "VRP",
    description: "Vehicle Routing Problems with reinforcement learning",
    href: "/research/vrp"
  },
  {
    title: "Reading List",
    description: "Papers and books I'm currently reading",
    href: "/research/reading-list"
  },
  {
    title: "Ideas",
    description: "Research ideas and future directions",
    href: "/research/ideas"
  }
];

export default function ResearchPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <motion.h1 
        className="text-3xl font-semibold mb-4"
        style={{ color: "var(--brand)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Research
      </motion.h1>
      <motion.p 
        className="mb-8" 
        style={{ color: "var(--muted)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        My research focuses on bridging optimization algorithms and machine learning, 
        exploring how neural networks can learn to solve complex combinatorial problems.
      </motion.p>
      <div className="grid sm:grid-cols-2 gap-6">
        {researchTopics.map((topic, i) => (
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


