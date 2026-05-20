"use client";
import { motion } from "framer-motion";
import { SlowIn } from "../components/space";
import { places, englishJourney, notes } from "../data/voyage";

export default function VoyagePage() {
  return (
    <div className="space-voyage min-h-screen">
      <div className="space-grain" />

      <section className="relative flex items-end" style={{ minHeight: "100vh" }}>
        <img
          src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vast%20Australian%20coastline%20at%20golden%20hour%2C%20endless%20ocean%20meeting%20horizon%2C%20grassy%20sea%20cliffs%2C%20cinematic%20wide%20angle%2C%20muted%20natural%20colors%2C%20editorial%20photography%2C%2035mm%20film%20grain&image_size=landscape_16_9"
          alt="Coastline"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.35) saturate(0.6)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--sp-bg) 0%, transparent 50%)" }} />
        <div className="relative z-10 px-6 lg:px-8 pb-24 w-full" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 2 }}
            className="text-[10px] font-medium uppercase tracking-[0.5em] mb-8"
            style={{ color: "var(--sp-muted)" }}
          >
            空间 04 — 旷野
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              fontSize: "clamp(48px, 10vw, 120px)",
              fontWeight: 200,
              lineHeight: 1,
              letterSpacing: "0.08em",
              color: "var(--sp-text)",
            }}
          >
            旷野。
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 2 }}
            className="mt-6 text-base"
            style={{ color: "var(--sp-muted)", letterSpacing: "0.05em" }}
          >
            一个人在世界边缘缓慢行走。
          </motion.p>
        </div>
      </section>

      <section className="px-6 lg:px-8" style={{ paddingTop: "12rem", paddingBottom: "10rem", maxWidth: "var(--reading-width)", margin: "0 auto" }}>
        <SlowIn>
          <div style={{ width: "100%", height: "1px", background: "var(--sp-surface-border)", marginBottom: "6rem" }} />
        </SlowIn>
        <SlowIn>
          <p className="text-[10px] font-medium uppercase tracking-[0.5em] mb-12" style={{ color: "var(--sp-muted)" }}>
            关于远方
          </p>
        </SlowIn>
        <SlowIn delay={0.2}>
          <p className="text-lg leading-loose" style={{ color: "var(--sp-text)", letterSpacing: "0.02em" }}>
            我不喜欢"旅游"这个词。它太轻了，像打卡、像消费、像一种社交货币。
          </p>
        </SlowIn>
        <SlowIn delay={0.4}>
          <p className="text-lg leading-loose mt-8" style={{ color: "var(--sp-text)", letterSpacing: "0.02em" }}>
            我喜欢的是出发的感觉——当城市在后视镜里变小，当空气开始有盐的味道，当天空大到让人沉默。
          </p>
        </SlowIn>
        <SlowIn delay={0.6}>
          <p className="text-lg leading-loose mt-8" style={{ color: "var(--sp-muted)", letterSpacing: "0.02em" }}>
            去远方不是为了拍照。是为了感受自己的尺度——在旷野里，在海岸线上，在一条没有尽头的公路上。
          </p>
        </SlowIn>
      </section>

      <section className="px-6 lg:px-8" style={{ paddingTop: "6rem", paddingBottom: "10rem", maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <SlowIn>
          <p className="text-[10px] font-medium uppercase tracking-[0.5em] mb-16" style={{ color: "var(--sp-muted)" }}>
            记忆的坐标
          </p>
        </SlowIn>
        {places.map((place, i) => (
          <SlowIn key={place.name} delay={0.1}>
            <div className="mb-32 last:mb-0">
              <div className="overflow-hidden mb-8" style={{ aspectRatio: "21/9" }}>
                <img src={place.image} alt={place.name} className="w-full h-full object-cover" loading="lazy"
                  style={{ filter: "brightness(0.55) saturate(0.5) contrast(1.1)" }} />
              </div>
              <div style={{ maxWidth: "var(--reading-width)" }}>
                <h3 className="text-2xl font-light mb-4" style={{ color: "var(--sp-text)", letterSpacing: "0.06em" }}>{place.name}</h3>
                <p className="text-base leading-relaxed" style={{ color: "var(--sp-muted)", letterSpacing: "0.02em" }}>{place.feeling}</p>
              </div>
            </div>
          </SlowIn>
        ))}
      </section>

      <section className="px-6 lg:px-8" style={{ paddingTop: "6rem", paddingBottom: "10rem", maxWidth: "var(--reading-width)", margin: "0 auto" }}>
        <SlowIn>
          <div style={{ width: "100%", height: "1px", background: "var(--sp-surface-border)", marginBottom: "6rem" }} />
        </SlowIn>
        <SlowIn>
          <p className="text-[10px] font-medium uppercase tracking-[0.5em] mb-6" style={{ color: "var(--sp-muted)" }}>
            语言是另一片海
          </p>
        </SlowIn>
        <SlowIn delay={0.2}>
          <p className="text-base leading-relaxed mb-16" style={{ color: "var(--sp-muted)", letterSpacing: "0.02em" }}>
            学英语不是为了考试。是为了多一双眼睛看世界，多一扇窗透气。
          </p>
        </SlowIn>
        {englishJourney.map((stage, i) => (
          <SlowIn key={stage.stage} delay={i * 0.15}>
            <div className="mb-16 last:mb-0">
              <span className="text-xs font-medium block mb-3" style={{ color: "var(--sp-accent)", letterSpacing: "0.1em" }}>{stage.period}</span>
              <h3 className="text-xl font-light mb-3" style={{ color: "var(--sp-text)", letterSpacing: "0.04em" }}>{stage.stage}</h3>
              <p className="text-base leading-relaxed" style={{ color: "var(--sp-muted)", letterSpacing: "0.02em" }}>{stage.desc}</p>
            </div>
          </SlowIn>
        ))}
      </section>

      <section className="px-6 lg:px-8" style={{ paddingTop: "6rem", paddingBottom: "12rem", maxWidth: "var(--reading-width)", margin: "0 auto" }}>
        <SlowIn>
          <div style={{ width: "100%", height: "1px", background: "var(--sp-surface-border)", marginBottom: "6rem" }} />
        </SlowIn>
        <SlowIn>
          <p className="text-[10px] font-medium uppercase tracking-[0.5em] mb-16" style={{ color: "var(--sp-muted)" }}>
            旷野笔记
          </p>
        </SlowIn>
        {notes.map((note, i) => (
          <SlowIn key={i} delay={i * 0.12}>
            <p className="text-lg leading-loose mb-12 last:mb-0" style={{
              color: i % 2 === 0 ? "var(--sp-text)" : "var(--sp-muted)",
              letterSpacing: "0.02em",
              fontStyle: i % 2 !== 0 ? "italic" : "normal",
            }}>
              {note}
            </p>
          </SlowIn>
        ))}
      </section>

      <section className="relative" style={{ height: "70vh" }}>
        <img
          src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=endless%20ocean%20horizon%20at%20sunset%2C%20minimalist%20composition%2C%20vast%20sky%2C%20golden%20and%20muted%20blue%20tones%2C%20cinematic%2C%20editorial%20photography%2C%2035mm%20film%2C%20wide%20angle&image_size=landscape_16_9"
          alt="Horizon" loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.3) saturate(0.4)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, var(--sp-bg) 0%, transparent 30%, transparent 70%, var(--sp-bg) 100%)" }} />
        <div className="relative z-10 flex items-center justify-center h-full">
          <SlowIn>
            <p className="text-center text-sm" style={{ color: "var(--sp-muted)", letterSpacing: "0.15em" }}>
              地平线永远在退后。但正是这个距离，让人想继续走。
            </p>
          </SlowIn>
        </div>
      </section>
    </div>
  );
}
