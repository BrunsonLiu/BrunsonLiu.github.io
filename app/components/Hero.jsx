"use client";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center text-center relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10"
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 gradient-text">
          Hey, I'm Brunson 👋
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-8" style={{ color: "var(--muted)" }}>
          A postgraduate exploring <span style={{ color: "var(--brand)" }}>Optimization + Machine Learning</span>.  
          I love algorithms, interdisciplinary research, and elegant design.
        </p>
        
        {/* Social Links */}
        <motion.div 
          className="flex gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <a 
            href="https://github.com/Brunson" 
            target="_blank" 
            rel="noreferrer"
            className="p-3 rounded-full card card-hover transition"
            style={{ color: "var(--brand)" }}
          >
            <FaGithub size={24} />
          </a>
          <a 
            href="https://linkedin.com/in/brunson" 
            target="_blank" 
            rel="noreferrer"
            className="p-3 rounded-full card card-hover transition"
            style={{ color: "var(--brand)" }}
          >
            <FaLinkedin size={24} />
          </a>
          <a 
            href="mailto:brunson@example.com"
            className="p-3 rounded-full card card-hover transition"
            style={{ color: "var(--brand)" }}
          >
            <FaEnvelope size={24} />
          </a>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 rounded-full flex justify-center pt-2"
          style={{ borderColor: "var(--muted)" }}
        >
          <motion.div 
            className="w-1.5 h-3 rounded-full"
            style={{ backgroundColor: "var(--brand)" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}