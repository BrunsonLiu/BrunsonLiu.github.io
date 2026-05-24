﻿﻿﻿﻿﻿﻿﻿"use client";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlowIn, AccentLine } from "../components/space";
import { learningTopics } from "../data/learning";
import Link from "next/link";

const statusLabels = {
  exploring: "探索中",
  understood: "已理解",
  applying: "应用",
};

const statusColors = {
  exploring: "#6b8ab0",
  understood: "#7aad7a",
  applying: "#b09a6b",
};

const topicIcons = {
  optimization: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  ),
  "machine-learning": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  ),
  english: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  linux: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" /><line x1="8" y1="10" x2="12" y2="10" /><line x1="8" y1="14" x2="16" y2="14" /><polyline points="16 4 16 8 20 8" />
    </svg>
  ),
  "first-principles": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><line x1="12" y1="1" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="1" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="23" y2="12" />
    </svg>
  ),
};

function EntryCard({ entry, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className="learn-entry"
    >
      <div className="learn-entry-header">
        <span className="learn-entry-date">{entry.date}</span>
        <span
          className="learn-entry-status"
          style={{ color: statusColors[entry.status] || "var(--sp-muted)" }}
        >
          {statusLabels[entry.status] || entry.status}
        </span>
      </div>
      <p className="learn-entry-insight">{entry.insight}</p>
      {entry.discovery && (
        <p className="learn-entry-discovery">→ {entry.discovery}</p>
      )}
    </motion.div>
  );
}

export default function LearningPage() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [search, setSearch] = useState("");

  const handleClose = useCallback(() => setSelectedTopic(null), []);

  const filteredTopics = search.trim()
    ? learningTopics.map((topic) => ({
        ...topic,
        entries: topic.entries.filter(
          (e) =>
            e.insight.toLowerCase().includes(search.toLowerCase()) ||
            (e.discovery && e.discovery.toLowerCase().includes(search.toLowerCase()))
        ),
      })).filter((t) => t.entries.length > 0)
    : learningTopics;

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleClose]);

  return (
    <div className="space-learning min-h-screen pt-16">
      <div className="space-grain" />

      <div className="learn-container">
        <SlowIn>
          <Link href="/" prefetch={false} className="learn-back-link">
            ← 首页
          </Link>
        </SlowIn>

        <SlowIn delay={0.06}>
          <p className="learn-eyebrow">认知日志</p>
        </SlowIn>

        <SlowIn delay={0.12}>
          <h1 className="learn-title">学习</h1>
        </SlowIn>

        <SlowIn delay={0.2}>
          <AccentLine width="40px" />
          <p className="learn-subtitle">
            孩儿立志出乡关，学不成名誓不还。
          </p>
        </SlowIn>

        <SlowIn delay={0.3}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索笔记..."
            className="learn-search"
            style={{
              display: "block",
              width: "100%",
              maxWidth: "400px",
              padding: "8px 14px",
              marginBottom: "24px",
              background: "var(--sp-surface)",
              border: "1px solid var(--sp-surface-border)",
              borderRadius: "6px",
              color: "var(--sp-text)",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <div className="learn-grid">
            {filteredTopics.map((topic, i) => {
              const latestEntry = topic.entries[0];
              const entryCount = topic.entries.length;
              const statusCounts = {};
              topic.entries.forEach((e) => {
                statusCounts[e.status] = (statusCounts[e.status] || 0) + 1;
              });

              return (
                <motion.button
                  key={topic.id}
                  className="learn-topic-card"
                  onClick={() => setSelectedTopic(topic)}
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="learn-topic-icon">
                    {topicIcons[topic.id] || topicIcons.optimization}
                  </div>

                  <div className="learn-topic-head">
                    <h2 className="learn-topic-name">{topic.name}</h2>
                    <span className="learn-topic-count">{entryCount} 条</span>
                  </div>

                  <p className="learn-topic-desc">{topic.description}</p>

                  <div className="learn-topic-stats">
                    {Object.entries(statusCounts).map(([status, count]) => (
                      <span
                        key={status}
                        className="learn-topic-stat"
                        style={{ color: statusColors[status] }}
                      >
                        {statusLabels[status]} {count}
                      </span>
                    ))}
                  </div>

                  <div className="learn-topic-preview">
                    <span className="learn-topic-preview-label">最新</span>
                    <p className="learn-topic-preview-text">
                      {latestEntry.insight.length > 80
                        ? latestEntry.insight.slice(0, 80) + "…"
                        : latestEntry.insight}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </SlowIn>
      </div>

      <AnimatePresence>
        {selectedTopic && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="learn-panel-overlay"
              onClick={handleClose}
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="learn-panel-wrapper"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="learn-panel-card">
                <button
                  onClick={handleClose}
                  className="learn-panel-close"
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

                <div className="learn-panel-header">
                  <div className="learn-panel-icon">
                    {topicIcons[selectedTopic.id] || topicIcons.optimization}
                  </div>
                  <div>
                    <h2 className="learn-panel-name">{selectedTopic.name}</h2>
                    <p className="learn-panel-desc">
                      {selectedTopic.description}
                    </p>
                  </div>
                </div>

                <div className="learn-panel-body">
                  {selectedTopic.entries.map((entry, i) => (
                    <EntryCard key={entry.id} entry={entry} index={i} />
                  ))}
                </div>

                <div className="learn-panel-footer">
                  <span>点击外部区域返回</span>
                  <span className="learn-dot-sep">·</span>
                  <span>{selectedTopic.entries.length} 条记录</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
