﻿﻿"use client";
import { useState, useCallback, useEffect, useMemo } from "react";
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  ),
  "machine-learning": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  ),
  english: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  linux: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" /><line x1="8" y1="10" x2="12" y2="10" /><line x1="8" y1="14" x2="16" y2="14" /><polyline points="16 4 16 8 20 8" />
    </svg>
  ),
  "first-principles": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
          style={{
            color: statusColors[entry.status] || "var(--sp-muted)",
          }}
        >
          · {statusLabels[entry.status] || entry.status}
        </span>
      </div>
      {entry.concept && (
        <h3 className="learn-entry-concept">{entry.concept}</h3>
      )}
      <p className="learn-entry-insight">{entry.insight}</p>
      {entry.discovery && (
        <p className="learn-entry-discovery">→ {entry.discovery}</p>
      )}
    </motion.div>
  );
}

function Stats({ topics }) {
  const totalEntries = topics.reduce((s, t) => s + t.entries.length, 0);
  const allEntries = topics.flatMap((t) => t.entries);
  const latest = allEntries.reduce((a, b) => (a.date > b.date ? a : b), allEntries[0]);
  return (
    <div className="learn-stats">
      <div className="learn-stat">
        <span className="learn-stat-num">{topics.length}</span>
        <span className="learn-stat-label">主题</span>
      </div>
      <div className="learn-stat-sep" />
      <div className="learn-stat">
        <span className="learn-stat-num">{totalEntries}</span>
        <span className="learn-stat-label">笔记</span>
      </div>
      <div className="learn-stat-sep" />
      <div className="learn-stat">
        <span className="learn-stat-num" style={{ fontSize: "0.95em" }}>{latest?.date || "—"}</span>
        <span className="learn-stat-label">最近更新</span>
      </div>
    </div>
  );
}

export default function LearningPage() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [search, setSearch] = useState("");

  const handleClose = useCallback(() => setSelectedTopic(null), []);

  const filteredTopics = useMemo(() => {
    if (!search.trim()) return learningTopics;
    const q = search.toLowerCase();
    return learningTopics
      .map((topic) => ({
        ...topic,
        entries: topic.entries.filter(
          (e) =>
            e.insight.toLowerCase().includes(q) ||
            (e.discovery && e.discovery.toLowerCase().includes(q))
        ),
      }))
      .filter((t) => t.entries.length > 0);
  }, [search]);

  const isSearching = search.trim().length > 0;
  const totalMatchedEntries = filteredTopics.reduce((s, t) => s + t.entries.length, 0);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleClose]);

  return (
    <div className="space-learning min-h-screen pt-12">
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

        <SlowIn delay={0.25}>
          <Stats topics={learningTopics} />
        </SlowIn>

        <SlowIn delay={0.3}>
          <p className="learn-followup">
            更多学习记录在我的公众号 <span className="font-medium" style={{ color: "var(--sp-text)" }}>「永远别说永远」</span>
          </p>
        </SlowIn>

        <SlowIn delay={0.35}>
          <div className="learn-search-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--sp-muted)" }}>
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索笔记（支持 insight + discovery）"
              className="learn-search"
            />
            {search && (
              <button onClick={() => setSearch("")} className="learn-search-clear" aria-label="清空">
                ×
              </button>
            )}
          </div>
          {isSearching && (
            <p className="learn-search-hint">
              匹配到 <span style={{ color: "var(--sp-accent)" }}>{totalMatchedEntries}</span> 条笔记
            </p>
          )}
        </SlowIn>

        {filteredTopics.length === 0 ? (
          <div className="learn-empty">
            <p className="text-base mb-2" style={{ color: "var(--sp-muted)" }}>没有找到匹配的笔记</p>
            <p className="text-sm" style={{ color: "var(--sp-muted)", opacity: 0.6 }}>试试别的关键词，或点击右上角 × 清空</p>
          </div>
        ) : (
          <div className="learn-grid">
            {filteredTopics.map((topic) => {
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
                  <div className="learn-topic-head">
                    <div className="learn-topic-icon">
                      {topicIcons[topic.id] || topicIcons.optimization}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="learn-topic-name">{topic.name}</h2>
                      <p className="learn-topic-desc">{topic.description}</p>
                    </div>
                    <span className="learn-topic-count">{entryCount}</span>
                  </div>

                  <div className="learn-topic-stats">
                    {Object.entries(statusCounts).map(([status, count]) => (
                      <span
                        key={status}
                        className="learn-topic-stat"
                        style={{
                          color: statusColors[status],
                          borderColor: statusColors[status] + "44",
                        }}
                      >
                        {statusLabels[status]} {count}
                      </span>
                    ))}
                  </div>

                  <div className="learn-topic-preview">
                    <span className="learn-topic-preview-label">最新 · {latestEntry.date}</span>
                    {latestEntry.concept && (
                      <p className="learn-topic-preview-concept">{latestEntry.concept}</p>
                    )}
                    <p className="learn-topic-preview-text">
                      {latestEntry.insight.length > 90
                        ? latestEntry.insight.slice(0, 90) + "…"
                        : latestEntry.insight}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
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
                    <p className="learn-panel-desc">{selectedTopic.description}</p>
                  </div>
                </div>

                <div className="learn-panel-body">
                  {selectedTopic.entries.map((entry, i) => (
                    <EntryCard key={entry.id} entry={entry} index={i} />
                  ))}
                </div>

                <div className="learn-panel-footer">
                  <span>点击外部区域或按 ESC 返回</span>
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