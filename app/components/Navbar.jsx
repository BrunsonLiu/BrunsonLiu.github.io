﻿"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contact } from "../data/contact";

const spaces = [
  { name: "学术", href: "/", className: "space-academic" },
  { name: "学习", href: "/learning", className: "space-learning" },
  { name: "文学", href: "/literature", className: "space-literature" },
  { name: "运动", href: "/athletic", className: "space-athletic" },
  { name: "旅行", href: "/voyage", className: "space-voyage" },
  { name: "思考", href: "/reflection", className: "space-reflection" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setScrolled(window.scrollY > 20);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          background: scrolled || menuOpen ? "rgba(10,10,10,0.95)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
          borderBottom: scrolled || menuOpen ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <nav className="max-w-[1200px] mx-auto px-5 lg:px-8 h-12 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold tracking-tight" style={{ color: "var(--text)" }}>
            Brunson
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {spaces.map((space) => {
              const isActive = pathname === space.href ||
                (space.href !== "/" && pathname.startsWith(space.href));
              return (
                <Link
                  key={space.name}
                  href={space.href}
                  className="relative text-[11px] font-medium uppercase tracking-[0.2em] transition-opacity duration-300"
                  style={{
                    color: isActive ? "var(--text)" : "var(--muted)",
                    opacity: isActive ? 1 : 0.5,
                  }}
                >
                  {space.name}
                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ background: "var(--brand)" }}
                    />
                  )}
                </Link>
              );
            })}

            <span className="w-px h-3 mx-1" style={{ background: "rgba(255,255,255,0.1)" }} />

            <a href={`mailto:${contact.email}`}
              className="text-[11px] font-medium uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-100"
              style={{ color: "var(--muted)", opacity: 0.5 }}>
              联系
            </a>
          </div>

          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="菜单"
          >
            <span
              className="block w-4 h-px transition-all duration-300"
              style={{
                background: "var(--text)",
                transform: menuOpen ? "rotate(45deg) translate(2px, 2px)" : "none",
              }}
            />
            <span
              className="block w-4 h-px transition-all duration-300"
              style={{
                background: "var(--text)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-4 h-px transition-all duration-300"
              style={{
                background: "var(--text)",
                transform: menuOpen ? "rotate(-45deg) translate(2px, -2px)" : "none",
              }}
            />
          </button>
        </nav>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ background: "rgba(10,10,10,0.98)", paddingTop: "3rem" }}
        >
          <div className="flex flex-col items-start px-8 pt-8 gap-6">
            {spaces.map((space) => {
              const isActive = pathname === space.href ||
                (space.href !== "/" && pathname.startsWith(space.href));
              return (
                <Link
                  key={space.name}
                  href={space.href}
                  className="text-lg font-light tracking-[0.15em] transition-opacity duration-300"
                  style={{
                    color: isActive ? "var(--text)" : "var(--muted)",
                    opacity: isActive ? 1 : 0.5,
                  }}
                >
                  {space.name}
                  {isActive && (
                    <span
                      className="inline-block ml-3 w-4 h-px align-middle"
                      style={{ background: "var(--brand)" }}
                    />
                  )}
                </Link>
              );
            })}

            <span className="w-8 h-px my-2" style={{ background: "rgba(255,255,255,0.08)" }} />

            <a href={`mailto:${contact.email}`}
              className="text-sm font-light tracking-[0.15em]"
              style={{ color: "var(--muted)", opacity: 0.5 }}>
              联系
            </a>
          </div>
        </div>
      )}
    </>
  );
}
