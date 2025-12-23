"use client";
import { motion } from "framer-motion";
import Timeline from "../components/Timeline";
import timeline from "../../data/timeline.json";
import { FaDownload, FaUser } from "react-icons/fa";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <motion.h1 
        className="text-3xl font-semibold mb-4"
        style={{ color: "var(--brand)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About
      </motion.h1>
      
      <motion.p 
        className="mb-8" 
        style={{ color: "var(--muted)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Postgraduate passionate about optimization & machine learning. I'm on a journey to bridge 
        theoretical research and real-world applications.
      </motion.p>

      <motion.div
        className="mb-8 p-6 card rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2 className="text-xl mb-4" style={{ color: "var(--brand)" }}>Quick Facts</h2>
        <ul className="space-y-2" style={{ color: "var(--muted)" }}>
          <li>• Management Science & Engineering Postgraduate</li>
          <li>• Research Focus: L2O, VRP, Reinforcement Learning</li>
          <li>• Interests: Algorithms, Interdisciplinary Research, Elegant Design</li>
          <li>• Goal: Becoming an Algorithm Engineer</li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h2 className="text-xl mb-4" style={{ color: "var(--brand)" }}>Timeline</h2>
        <Timeline items={timeline} />
      </motion.div>

      <motion.div 
        className="mt-8 flex flex-wrap gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <a 
          className="inline-flex items-center gap-2 card card-hover rounded-xl px-4 py-2 transition" 
          style={{ color: "var(--brand)" }}
          href="/resume.pdf" 
          target="_blank" 
          rel="noreferrer"
        >
          <FaDownload /> Download Resume
        </a>
        <a 
          className="inline-flex items-center gap-2 card card-hover rounded-xl px-4 py-2 transition" 
          style={{ color: "var(--brand)" }}
          href="/about/me"
        >
          <FaUser /> More About Me
        </a>
      </motion.div>
    </main>
  );
}


