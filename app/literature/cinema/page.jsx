"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, AccentLine } from "../../components/space";
import { films } from "../../data/literature";
import Link from "next/link";

export default function CinemaPage() {
  const [selectedFilm, setSelectedFilm] = useState(null);

  useEffect(() => {
    if (selectedFilm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedFilm]);

  return (
    <div className="space-literature min-h-screen pt-16">
      <div className="space-grain" />

      <div className="px-6 lg:px-8 py-24" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <FadeIn>
          <Link href="/literature" className="text-[10px] font-medium uppercase tracking-[0.4em] inline-block mb-16 transition-opacity duration-300 hover:opacity-60"
            style={{ color: "var(--sp-muted)" }}>
            ← 文学空间
          </Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="mb-4" style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 300, lineHeight: 1.1, letterSpacing: "0.06em",
            color: "var(--sp-text)", fontFamily: "var(--font-reading)",
          }}>
            电影
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <AccentLine />
          <p className="text-base leading-relaxed max-w-lg mb-16" style={{ color: "var(--sp-muted)" }}>
            第七艺术
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="max-w-xl mb-20" style={{ borderLeft: "1px solid var(--sp-surface-border)", paddingLeft: "1.5rem" }}>
            <p className="text-sm leading-[2.2] mb-4" style={{ color: "var(--sp-text)", opacity: 0.6, fontFamily: "var(--font-reading)" }}>
              我很早就不看动画片了。小时候跟着我爸看电视，长影频道和电影频道经常放国语的港片——成龙、周星驰，那些九十年代的经典。我爸说，他看周星驰的电影能笑一晚上。后来我自己去网上找，仍然以香港为主。
            </p>
            <p className="text-sm leading-[2.2] mb-4" style={{ color: "var(--sp-text)", opacity: 0.6, fontFamily: "var(--font-reading)" }}>
              初中英语慢慢好起来，我开始在手机上看豆瓣高分电影。那是我第一次知道评分可以判断电影好坏。我直接点开了《肖申克的救赎》——我人都傻了。我当然看过好莱坞大片、漫威、变形金刚，但我从来没看过这种电影：如此优美，如此安静，如此自由。
            </p>
            <p className="text-sm leading-[2.2] mb-4" style={{ color: "var(--sp-text)", opacity: 0.6, fontFamily: "var(--font-reading)" }}>
              后来我疯狂看豆瓣 Top 系列，每一部都让我震撼。我喜欢一个人看电影——不要微信消息，不要 QQ 咳嗽，不要爸妈喊我。关灯，在小屋子里，安静地看。记得第一次看完《星际穿越》，又是那种感觉：你看到这种级别的画面，远远超乎你的想象。
            </p>
            <p className="text-xs mt-6" style={{ color: "var(--sp-muted)", letterSpacing: "0.1em", fontStyle: "italic" }}>
              电影不是消遣，是一个人走进黑暗，然后被光击中。
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {films.map((film, i) => (
            <FadeIn key={film.title} delay={0.03 * i}>
              <button
                onClick={() => setSelectedFilm(film)}
                className="w-full text-left group relative overflow-hidden cursor-pointer"
                style={{ aspectRatio: "2/3" }}
                aria-label={`查看 ${film.title}`}
              >
                <img
                  src={film.image}
                  alt={film.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  style={{ filter: "brightness(0.45) saturate(0.4) contrast(1.1)" }}
                />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)" }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-xs font-medium leading-tight mb-1"
                    style={{ color: "var(--sp-text)", fontFamily: "var(--font-reading)" }}>
                    {film.title}
                  </p>
                  <p className="text-[10px]" style={{ color: "var(--sp-muted)" }}>{film.year}</p>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedFilm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
            onClick={() => setSelectedFilm(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full max-w-2xl overflow-hidden"
              style={{ background: "var(--sp-bg)", border: "1px solid var(--sp-surface-border)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-hidden" style={{ aspectRatio: "16/7" }}>
                <img
                  src={selectedFilm.image}
                  alt={selectedFilm.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.55) saturate(0.5) contrast(1.15)" }}
                />
              </div>
              <div className="p-8 max-h-[70vh] overflow-y-auto">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-medium mb-1" style={{
                      color: "var(--sp-text)",
                      fontFamily: "var(--font-reading)",
                      letterSpacing: "0.02em",
                    }}>
                      {selectedFilm.title}
                    </h2>
                    <div className="flex items-center gap-3">
                      <p className="text-xs" style={{ color: "var(--sp-accent)", letterSpacing: "0.1em" }}>{selectedFilm.director}</p>
                      <span className="text-[10px]" style={{ color: "var(--sp-muted)" }}>{selectedFilm.year}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedFilm(null)}
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0 transition-opacity duration-300 hover:opacity-60"
                    style={{ color: "var(--sp-muted)" }}
                    aria-label="关闭"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-base leading-relaxed mb-6" style={{
                  color: "var(--sp-text)",
                  fontFamily: "var(--font-reading)",
                  opacity: 0.85,
                }}>
                  {selectedFilm.review || selectedFilm.note}
                </p>
                {selectedFilm.quotes && selectedFilm.quotes.length > 0 && (
                  <div className="mb-6">
                    <p className="text-[10px] font-medium uppercase tracking-[0.4em] mb-4" style={{ color: "var(--sp-muted)" }}>经典台词</p>
                    <div className="space-y-3">
                      {selectedFilm.quotes.map((q, i) => (
                        <p key={i} className="text-sm leading-relaxed pl-4" style={{
                          color: "var(--sp-text)",
                          fontFamily: "var(--font-reading)",
                          fontStyle: "italic",
                          opacity: 0.7,
                          borderLeft: "1px solid var(--sp-accent)",
                        }}>
                          {q}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
                {selectedFilm.critique && (
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.4em] mb-4" style={{ color: "var(--sp-muted)" }}>专业评价</p>
                    <p className="text-sm leading-relaxed" style={{
                      color: "var(--sp-muted)",
                      fontFamily: "var(--font-reading)",
                    }}>
                      {selectedFilm.critique}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
