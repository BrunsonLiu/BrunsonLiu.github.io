"use client";
import { FadeIn, SectionLabel } from "../components/space";
import { stats, basketball, trainingLog, philosophy } from "../data/athletic";

export default function AthleticPage() {
  return (
    <div className="space-athletic min-h-screen pt-16">
      <div className="space-grain" />

      <section className="px-6 lg:px-8 py-24" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <FadeIn>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] mb-16" style={{ color: "var(--sp-muted)" }}>
            空间 03 — 运动
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="mb-8" style={{
            fontSize: "clamp(56px, 12vw, 140px)",
            fontWeight: 700, lineHeight: 0.88, letterSpacing: "-0.05em",
            color: "var(--sp-text)", fontFamily: "var(--font-display)",
          }}>
            自律
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ width: "64px", height: "2px", background: "var(--sp-accent)", marginBottom: "1.5rem" }} />
          <p className="text-sm leading-relaxed max-w-md" style={{ color: "var(--sp-muted)" }}>
            通过身体践行长期主义。跑步、篮球，以及每天出现的哲学。
          </p>
        </FadeIn>
      </section>

      <section className="px-6 lg:px-8 py-16" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <FadeIn><SectionLabel>跑步 PB</SectionLabel></FadeIn>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div>
                <p className="text-4xl sm:text-5xl font-bold" style={{ color: "var(--sp-text)", fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}>
                  {stat.value}<span className="text-lg" style={{ color: "var(--sp-muted)" }}>{stat.unit}</span>
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-2" style={{ color: "var(--sp-muted)" }}>{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="overflow-hidden mb-24" style={{ border: "1px solid var(--sp-surface-border)" }}>
            <img
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=abstract%20long%20distance%20runner%20silhouette%20at%20dawn%2C%20minimal%20black%20and%20white%20photography%2C%20high%20contrast%2C%20editorial%20sports%20style&image_size=landscape_16_9"
              alt="Running" className="w-full h-48 lg:h-72 object-cover" style={{ filter: "grayscale(1) contrast(1.3) brightness(0.6)" }}
            />
          </div>
        </FadeIn>

        <FadeIn><SectionLabel>训练日志</SectionLabel></FadeIn>
        <div className="space-y-0 mb-24">
          {trainingLog.map((log, i) => (
            <FadeIn key={log.date} delay={i * 0.08}>
              <div className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                style={{ borderBottom: "1px solid var(--sp-surface-border)" }}>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold" style={{ color: "var(--sp-accent)" }}>{log.date}</span>
                  <span className="text-sm font-bold" style={{ color: "var(--sp-text)" }}>{log.type}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs" style={{ color: "var(--sp-muted)" }}>{log.detail}</span>
                  <span className="text-xs font-bold" style={{ color: "var(--sp-text)" }}>{log.pace}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mb-24">
          <FadeIn><SectionLabel>篮球</SectionLabel></FadeIn>
          <FadeIn delay={0.1}>
            <div className="p-8" style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-surface-border)" }}>
              <div className="flex items-baseline gap-3 mb-3">
                <h3 className="text-xl font-bold" style={{ color: "var(--sp-text)", fontFamily: "var(--font-display)" }}>篮球</h3>
                <span className="text-xs" style={{ color: "var(--sp-accent)" }}>从{basketball.since}开始</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--sp-muted)" }}>{basketball.desc}</p>
            </div>
          </FadeIn>
        </div>

        <FadeIn><SectionLabel>运动哲学</SectionLabel></FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {philosophy.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.1}>
              <div className="p-6" style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-surface-border)" }}>
                <h3 className="text-sm font-bold mb-3 uppercase tracking-wide" style={{ color: "var(--sp-text)", fontFamily: "var(--font-display)" }}>{p.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--sp-muted)" }}>{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
