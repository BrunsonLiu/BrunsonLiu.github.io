"use client";
import { motion } from "framer-motion";
import { SlowIn, FadeIn, SectionLabel } from "../components/space";
import { places, notes } from "../data/voyage";
import Link from "next/link";

export default function VoyagePage() {
  return (
    <div className="space-voyage min-h-screen pt-16">
      <div className="space-grain" />

      <div className="voyage-container">
        <SlowIn>
          <Link href="/" prefetch={false} className="voyage-back-link">
            ← 首页
          </Link>
        </SlowIn>

        <SlowIn delay={0.06}>
          <p className="voyage-eyebrow">空间 04 — 旅行</p>
        </SlowIn>

        <SlowIn delay={0.12}>
          <h1 className="voyage-title">旅行。</h1>
        </SlowIn>

        <SlowIn delay={0.2}>
          <p className="voyage-subtitle">
            出发，到达，再出发。
          </p>
        </SlowIn>

        <SlowIn delay={0.3}>
          <div className="voyage-intro-grid">
            <p className="voyage-intro-text">
              旅行不是打卡，不是朋友圈素材。就是换个地方待着，看看不一样的路。
            </p>
            <p className="voyage-intro-text">
              城市待久了人会钝。出去走走，不是逃避，是重新校准。在路上的时候脑子最清楚。
            </p>
          </div>
        </SlowIn>

        <SlowIn delay={0.1}>
          <SectionLabel>记忆的坐标</SectionLabel>
        </SlowIn>
        <div className="voyage-places-grid">
          {places.map((place, i) => (
            <FadeIn key={place.name} delay={i * 0.06}>
              <div className="voyage-place-card">
                <div className="voyage-place-img-wrap">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="voyage-place-img"
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="voyage-place-img-overlay" />
                  <h3 className="voyage-place-name">{place.name}</h3>
                </div>
                <p className="voyage-place-feeling">
                  {place.feeling.length > 100
                    ? place.feeling.slice(0, 100) + "…"
                    : place.feeling}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <SlowIn delay={0.1}>
          <SectionLabel>旅行笔记</SectionLabel>
        </SlowIn>
        <div className="voyage-notes-grid">
          {notes.map((note, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="voyage-note-card">
                <p className="voyage-note-text">{note}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
