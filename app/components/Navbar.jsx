"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/learning", label: "Learning" },
  { href: "/research", label: "Research" },
  { href: "/internship", label: "Internship" },
  { href: "/diary", label: "Diary" },
  { href: "/search", label: "Search" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const initial = saved === "light" ? "light" : "dark";
    setTheme(initial);
    if (typeof document !== "undefined") {
      if (initial === "light") document.documentElement.setAttribute("data-theme", "light");
      else document.documentElement.removeAttribute("data-theme");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (typeof document !== "undefined") {
      if (next === "light") document.documentElement.setAttribute("data-theme", "light");
      else document.documentElement.removeAttribute("data-theme");
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", next);
    }
  };

  return (
    <motion.nav
      className="fixed top-0 w-full flex justify-between items-center px-6 py-3 backdrop-blur-xl z-50"
      style={{ background: "var(--surface)" }}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Logo / Brand */}
      <a href="/" className="text-xl font-bold" style={{ color: "var(--brand)" }}>
        Brunson
      </a>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <ul className="flex gap-6 text-base font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a 
                href={link.href} 
                className="transition hover:opacity-70"
                style={{ color: "var(--text)" }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        
        {/* Theme Toggle - Desktop */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 rounded-lg transition hover:opacity-70"
          style={{ color: "var(--brand)" }}
        >
          {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>
      </div>

      {/* Mobile Controls */}
      <div className="md:hidden flex items-center gap-3">
        {/* Theme Toggle - Mobile */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 rounded-lg"
          style={{ color: "var(--brand)" }}
        >
          {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>
        
        {/* Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg"
          style={{ color: "var(--brand)" }}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full backdrop-blur-xl md:hidden"
            style={{ background: "var(--surface)" }}
          >
            <ul className="flex flex-col items-center py-4 gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-lg transition hover:opacity-70"
                    style={{ color: "var(--text)" }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
