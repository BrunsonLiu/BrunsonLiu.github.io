"use client";
import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlowIn, AccentLine } from "../../components/space";
import { bookClusters } from "../../data/literature";
import Link from "next/link";

const BOOK_COVERS = [
  "/images/books/wo-yu-di-tan.jpg",
  "/images/books/bing-xi-sui-bi.jpg",
  "/images/books/huo-zhe.jpg",
  "/images/books/xu-san-guan-mai-xue-ji.jpg",
  "/images/books/zai-xi-yu-zhong-hu-han.jpg",
  "/images/books/educated.jpg",
  "/images/books/the-kite-runner.jpg",
  "/images/books/moon-and-sixpence.jpg",
  "/images/books/one-hundred-years-solitude.jpg",
  "/images/books/wei-cheng.jpg",
  "/images/books/the-little-prince.jpg",
  "/images/books/the-three-body-problem.jpg",
  "/images/books/1984.jpg",
];

function flattenBooks(clusters) {
  const result = [];
  clusters.forEach((cluster) => {
    cluster.books.forEach((book) => {
      const idx = result.length;
      result.push({
        ...book,
        clusterId: cluster.id,
        clusterTitle: cluster.title,
        clusterThought: cluster.thought,
        idx,
        cover: BOOK_COVERS[idx],
      });
    });
  });
  return result;
}

function getBookPosition(i, activeIdx, total) {
  const dist = i - activeIdx;
  const absDist = Math.abs(dist);

  const rotateY = dist * 52;
  const translateZ = -absDist * 180;
  const translateX = dist * 280;

  let scale;
  if (absDist === 0) scale = 1;
  else if (absDist === 1) scale = 0.78;
  else if (absDist === 2) scale = 0.6;
  else if (absDist === 3) scale = 0.44;
  else scale = 0.32;

  let opacity;
  if (absDist <= 1) opacity = 1;
  else if (absDist === 2) opacity = 0.6;
  else if (absDist === 3) opacity = 0.35;
  else opacity = 0.15;

  let brightness;
  if (absDist === 0) brightness = 1;
  else if (absDist === 1) brightness = 0.8;
  else if (absDist === 2) brightness = 0.6;
  else if (absDist === 3) brightness = 0.45;
  else brightness = 0.3;

  return { rotateY, translateZ, translateX, scale, opacity, brightness, zIndex: total - absDist };
}

export default function BooksPage() {
  const books = useMemo(() => flattenBooks(bookClusters), []);
  const [activeIdx, setActiveIdx] = useState(6);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showGrid, setShowGrid] = useState(false);
  const total = books.length;

  const goTo = useCallback((idx) => {
    if (idx >= 0 && idx < total) setActiveIdx(idx);
  }, [total]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") {
        if (showGrid) { setShowGrid(false); return; }
        if (selectedBook) { setSelectedBook(null); return; }
        return;
      }
      if (selectedBook || showGrid) return;
      if (e.key === "ArrowLeft") goTo(activeIdx - 1);
      if (e.key === "ArrowRight") goTo(activeIdx + 1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedBook, showGrid, activeIdx, goTo]);

  const handleDragEnd = useCallback((e, info) => {
    const threshold = 50;
    const velocityThreshold = 400;
    if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      goTo(activeIdx + 1);
    } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      goTo(activeIdx - 1);
    }
  }, [activeIdx, goTo]);

  const activeBook = books[activeIdx];

  return (
    <>
      <div className="cf-page">
        <div className="space-grain" />
        <div className="cf-container">
          <SlowIn>
            <Link href="/literature" prefetch={false} className="cf-back-link">
              ← 文学空间
            </Link>
          </SlowIn>

          <SlowIn delay={0.06}>
            <h1 className="cf-title">书架</h1>
          </SlowIn>

          <SlowIn delay={0.12}>
            <AccentLine />
            <p className="cf-subtitle">← → 键盘或拖拽切换 · 点击封面查看笔记</p>
          </SlowIn>

          <SlowIn delay={0.2}>
            <div className="cf-stage">
              <motion.div
                className="cf-viewport"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.08}
                onDragEnd={handleDragEnd}
                whileDrag={{ cursor: "grabbing" }}
              >
                <div className="cf-carousel" style={{ perspective: 2200 }}>
                  <div className="cf-carousel-fade cf-carousel-fade-l" />
                  <div className="cf-carousel-fade cf-carousel-fade-r" />

                  {books.map((book, i) => {
                    const pos = getBookPosition(i, activeIdx, total);
                    const isActive = i === activeIdx;

                    return (
                      <div key={book.idx} className="cf-book-wrapper" style={{ zIndex: pos.zIndex }}>
                        <motion.button
                          onClick={() => isActive ? setSelectedBook(book) : goTo(i)}
                          className={`cf-book ${isActive ? "cf-book-active" : ""}`}
                          animate={{
                            x: pos.translateX,
                            scale: pos.scale,
                            rotateY: pos.rotateY,
                            opacity: pos.opacity,
                            z: pos.translateZ,
                          }}
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 90,
                            damping: 22,
                            mass: 1.5,
                          }}
                          style={{ filter: `brightness(${pos.brightness})` }}
                        >
                          <div className="cf-book-front">
                            <img
                              src={book.cover}
                              alt={`${book.title} — ${book.author}`}
                              className="cf-cover-img"
                              draggable={false}
                            />
                            <div className="cf-cover-overlay" />
                            <div className="cf-cover-label">
                              <span>{book.title}</span>
                            </div>
                          </div>
                          <div className="cf-book-spine" />
                        </motion.button>

                        <motion.div
                          className="cf-reflection"
                          animate={{
                            x: pos.translateX,
                            scale: pos.scale,
                            rotateY: pos.rotateY,
                            opacity: pos.opacity * 0.12,
                            z: pos.translateZ,
                          }}
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 90,
                            damping: 22,
                            mass: 1.5,
                          }}
                          style={{ filter: `brightness(${pos.brightness * 0.6})` }}
                        >
                          <img
                            src={book.cover}
                            alt=""
                            className="cf-reflect-img"
                            draggable={false}
                          />
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              <div className="cf-ground-line" />
              <div className="cf-ground-glow" />
            </div>
          </SlowIn>

          <SlowIn delay={0.35}>
            <div className="cf-bottom-bar">
              <div className="cf-nav">
                <button onClick={() => goTo(activeIdx - 1)} disabled={activeIdx === 0} className="cf-nav-btn" aria-label="上一本">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="10,2 5,8 10,14" />
                  </svg>
                </button>
                <span className="cf-nav-counter">{String(activeIdx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
                <button onClick={() => goTo(activeIdx + 1)} disabled={activeIdx === total - 1} className="cf-nav-btn" aria-label="下一本">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,2 11,8 6,14" />
                  </svg>
                </button>
                <button onClick={() => setShowGrid(true)} className="cf-nav-btn cf-grid-btn" aria-label="查看全部">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="1" y="1" width="5" height="5" rx="1" /><rect x="10" y="1" width="5" height="5" rx="1" />
                    <rect x="1" y="10" width="5" height="5" rx="1" /><rect x="10" y="10" width="5" height="5" rx="1" />
                  </svg>
                </button>
              </div>

              {activeBook && (
                <div className="cf-active-info">
                  <p className="cf-active-title">{activeBook.title}</p>
                  <p className="cf-active-author">{activeBook.author} · {activeBook.clusterTitle}</p>
                </div>
              )}

              <div className="cf-footer">
                <p className="cf-footer-text">
                  史铁生和余华讲同一个真理：活下去。塔拉和阿米尔讲：走出去。斯特里克兰证明：你可以选择月亮。
                </p>
              </div>
            </div>
          </SlowIn>
        </div>
      </div>

      <AnimatePresence>
        {selectedBook && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="cf-panel-overlay"
              onClick={() => setSelectedBook(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="cf-panel-wrapper"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cf-panel-card">
                <button onClick={() => setSelectedBook(null)} className="cf-panel-close" aria-label="关闭">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                <div className="cf-panel-header">
                  <img
                    src={selectedBook.cover}
                    alt=""
                    className="cf-panel-cover-img"
                    draggable={false}
                  />
                  <div className="cf-panel-header-text">
                    <span className="cf-panel-tag">{selectedBook.clusterTitle}</span>
                    <h2 className="cf-panel-name">{selectedBook.title}</h2>
                    <p className="cf-panel-writer">{selectedBook.author}</p>
                  </div>
                </div>

                <div className="cf-panel-body">
                  <section className="cf-section">
                    <h3 className="cf-section-label">思考</h3>
                    <div className="cf-section-content">
                      {selectedBook.reflection.split("\n\n").filter(Boolean).map((para, pi) => (
                        <p key={pi} className="cf-para">{para}</p>
                      ))}
                    </div>
                  </section>

                  <section className="cf-section cf-section-quotes">
                    <h3 className="cf-section-label">摘抄</h3>
                    <div className="cf-quote-list">
                      {selectedBook.quotes.map((quote, qi) => (
                        <blockquote key={qi} className="cf-quote">
                          <span className="cf-quote-mark">"</span>
                          <p className="cf-quote-text">{quote}</p>
                        </blockquote>
                      ))}
                    </div>
                  </section>

                  {selectedBook.clusterThought && (
                    <section className="cf-section cf-section-thought">
                      <div className="cf-thought-box">
                        <p>{selectedBook.clusterThought}</p>
                      </div>
                    </section>
                  )}
                </div>

                <div className="cf-panel-footer">
                  <span>点击外部区域返回书架</span>
                  <span className="cf-dot-sep">·</span>
                  <span className="cf-page-num">{books.indexOf(selectedBook) + 1} / {total}</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGrid && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="cf-grid-overlay"
              onClick={() => setShowGrid(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35 }}
              className="cf-grid-panel"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cf-grid-header">
                <h3>全部书籍</h3>
                <button onClick={() => setShowGrid(false)} className="cf-grid-close" aria-label="关闭">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="cf-grid-list">
                {books.map((book, i) => (
                  <button
                    key={book.idx}
                    className={`cf-grid-item ${i === activeIdx ? "cf-grid-item-active" : ""}`}
                    onClick={() => { setActiveIdx(i); setShowGrid(false); }}
                  >
                    <img src={book.cover} alt="" className="cf-grid-thumb" draggable={false} />
                    <div className="cf-grid-info">
                      <span className="cf-grid-title">{book.title}</span>
                      <span className="cf-grid-author">{book.author}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}