"use client";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlowIn, AccentLine, FadeIn, SectionLabel } from "../components/space";
import {
  stats,
  basketball,
  basketballPlayers,
  basketballGallery,
  basketballStory,
  trainingLog,
  philosophy,
} from "../data/athletic";
import Link from "next/link";

function PlayerCard({ player, onClick }) {
  return (
    <motion.button
      className="bball-player-card"
      onClick={() => onClick(player)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bball-player-img-wrap">
        <img
          src={player.image}
          alt={player.nameZh}
          className="bball-player-img"
          draggable={false}
        />
        <div className="bball-player-img-overlay" />
      </div>
      <div className="bball-player-info">
        <h3 className="bball-player-name">{player.name}</h3>
        <p className="bball-player-namezh">{player.nameZh}</p>
        {player.number && (
          <span className="bball-player-number">{player.number}</span>
        )}
        <div className="bball-player-tags">
          {player.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="bball-player-tag">
              {tag}
            </span>
          ))}
        </div>
        <p className="bball-player-quote-preview">
          "{player.quoteZh.length > 30 ? player.quoteZh.slice(0, 30) + "…" : player.quoteZh}"
        </p>
      </div>
    </motion.button>
  );
}

export default function AthleticPage() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const handleClose = useCallback(() => setSelectedPlayer(null), []);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleClose]);

  return (
    <div className="space-athletic min-h-screen pt-16">
      <div className="space-grain" />

      <div className="bball-container">
        <SlowIn>
          <Link href="/" prefetch={false} className="bball-back-link">
            ← 首页
          </Link>
        </SlowIn>

        <SlowIn delay={0.06}>
          <p className="bball-eyebrow">空间 03 — 运动</p>
        </SlowIn>

        <SlowIn delay={0.12}>
          <h1 className="bball-title">自律。</h1>
        </SlowIn>

        <SlowIn delay={0.2}>
          <AccentLine width="64px" />
          <p className="bball-subtitle">
            通过身体践行长期主义。跑步、篮球，以及每天出现的哲学。
          </p>
        </SlowIn>

        <SlowIn delay={0.3}>
          <div className="bball-hero">
            <img
              src={basketballPlayers[0].image}
              alt="LeBron James"
              className="bball-hero-img"
              draggable={false}
            />
            <div className="bball-hero-overlay" />
            <div className="bball-hero-text">
              <span className="bball-hero-label">BASKETBALL</span>
              <p className="bball-hero-quote">
                "I'm going to use all my tools, my God-given ability, and make
                the best life I can with it."
              </p>
              <span className="bball-hero-author">— LeBron James</span>
            </div>
          </div>
        </SlowIn>

        <SlowIn delay={0.1}>
          <SectionLabel>跑步 PB</SectionLabel>
        </SlowIn>
        <div className="bball-stats-grid">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.08}>
              <div className="bball-stat-card">
                <p className="bball-stat-value">
                  {stat.value}
                  <span className="bball-stat-unit">{stat.unit}</span>
                </p>
                <p className="bball-stat-label">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <SlowIn delay={0.1}>
          <SectionLabel>训练日志</SectionLabel>
        </SlowIn>
        <div className="bball-log-list">
          {trainingLog.map((log, i) => (
            <FadeIn key={log.date} delay={i * 0.06}>
              <div className="bball-log-row">
                <span className="bball-log-date">{log.date}</span>
                <span className="bball-log-type">{log.type}</span>
                <span className="bball-log-detail">{log.detail}</span>
                <span className="bball-log-pace">{log.pace}</span>
              </div>
            </FadeIn>
          ))}
        </div>

        <SlowIn delay={0.1}>
          <SectionLabel>篮球 · 球星卡</SectionLabel>
        </SlowIn>
        <div className="bball-players-grid">
          {basketballPlayers.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onClick={setSelectedPlayer}
            />
          ))}
        </div>

        <SlowIn delay={0.1}>
          <SectionLabel>球场掠影</SectionLabel>
        </SlowIn>
        <div className="bball-gallery">
          {basketballGallery.map((item, i) => (
            <FadeIn key={item.caption} delay={i * 0.1}>
              <div className="bball-gallery-item">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="bball-gallery-img"
                  draggable={false}
                />
                <div className="bball-gallery-caption">{item.caption}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        <SlowIn delay={0.1}>
          <SectionLabel>篮球感悟</SectionLabel>
        </SlowIn>
        <div className="bball-story-list">
          {basketballStory.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.08}>
              <div className="bball-story-card">
                <h3 className="bball-story-title">{s.title}</h3>
                <p className="bball-story-content">{s.content}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <SlowIn delay={0.1}>
          <SectionLabel>运动哲学</SectionLabel>
        </SlowIn>
        <div className="bball-philosophy-grid">
          {philosophy.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.08}>
              <div className="bball-philosophy-card">
                <h3 className="bball-philosophy-title">{p.title}</h3>
                <p className="bball-philosophy-desc">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPlayer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bball-panel-overlay"
              onClick={handleClose}
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bball-panel-wrapper"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bball-panel-card">
                <button
                  onClick={handleClose}
                  className="bball-panel-close"
                  aria-label="关闭"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                <div className="bball-panel-header">
                  <img
                    src={selectedPlayer.image}
                    alt=""
                    className="bball-panel-img"
                    draggable={false}
                  />
                  <div className="bball-panel-header-text">
                    <h2 className="bball-panel-name">{selectedPlayer.name}</h2>
                    <p className="bball-panel-namezh">
                      {selectedPlayer.nameZh}
                    </p>
                    {selectedPlayer.number && (
                      <span className="bball-panel-number">
                        {selectedPlayer.number}
                      </span>
                    )}
                    <div className="bball-panel-tags">
                      {selectedPlayer.tags.map((tag) => (
                        <span key={tag} className="bball-panel-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bball-panel-body">
                  <div className="bball-panel-quote-section">
                    <blockquote className="bball-panel-quote">
                      "{selectedPlayer.quote}"
                    </blockquote>
                    <p className="bball-panel-quotezh">
                      {selectedPlayer.quoteZh}
                    </p>
                  </div>

                  <div className="bball-panel-thought">
                    <h4 className="bball-panel-thought-label">我的想法</h4>
                    <p className="bball-panel-thought-text">
                      {selectedPlayer.thought}
                    </p>
                  </div>
                </div>

                <div className="bball-panel-footer">
                  <span>点击外部区域返回</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
