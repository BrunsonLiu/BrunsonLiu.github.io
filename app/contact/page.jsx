﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿"use client";
import { FadeIn, SectionLabel } from "../components/space";
import { contact } from "../data/contact";

export default function ContactPage() {
  return (
    <div className="space-academic min-h-screen pt-16">
      <div className="space-grain" />

      <div className="px-6 lg:px-8 py-24" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <FadeIn>
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] mb-16" style={{ color: "var(--sp-muted)" }}>
            联系
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="mb-6" style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.04em",
            color: "var(--sp-text)", fontFamily: "var(--font-display)",
          }}>
            联系我。
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ width: "64px", height: "1px", background: "var(--sp-accent)", marginBottom: "1.5rem" }} />
          <p className="text-base leading-relaxed max-w-lg mb-24" style={{ color: "var(--sp-muted)" }}>
            合作、学术讨论，或者只是打个招呼。
          </p>
        </FadeIn>

        <div className="space-y-0 max-w-xl">
          <FadeIn>
            <a href={`mailto:${contact.email}`}
              className="flex items-center gap-6 py-6 transition-all duration-300 group"
              style={{ borderBottom: "1px solid var(--sp-surface-border)" }}>
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-surface-border)" }}>
                <span className="text-sm" style={{ color: "var(--sp-accent)" }}>@</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold mb-1" style={{ color: "var(--sp-text)" }}>Email</p>
                <p className="text-xs" style={{ color: "var(--sp-muted)" }}>{contact.email}</p>
              </div>
              <span className="text-xs group-hover:translate-x-1 transition-transform duration-300" style={{ color: "var(--sp-accent)" }}>→</span>
            </a>
          </FadeIn>

          <FadeIn delay={0.1}>
            <a href={contact.github} target="_blank" rel="noreferrer"
              className="flex items-center gap-6 py-6 transition-all duration-300 group"
              style={{ borderBottom: "1px solid var(--sp-surface-border)" }}>
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-surface-border)" }}>
                <span className="text-sm" style={{ color: "var(--sp-accent)" }}>⌘</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold mb-1" style={{ color: "var(--sp-text)" }}>GitHub</p>
                <p className="text-xs" style={{ color: "var(--sp-muted)" }}>{contact.githubLabel}</p>
              </div>
              <span className="text-xs group-hover:translate-x-1 transition-transform duration-300" style={{ color: "var(--sp-accent)" }}>→</span>
            </a>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex items-center gap-6 py-6" style={{ borderBottom: "1px solid var(--sp-surface-border)" }}>
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-surface-border)" }}>
                <span className="text-sm" style={{ color: "var(--sp-accent)" }}>微</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold mb-1" style={{ color: "var(--sp-text)" }}>微信公众号</p>
                <p className="text-xs" style={{ color: "var(--sp-muted)" }}>{contact.wechat}</p>
              </div>
            </div>
          </FadeIn>

          {contact.wechatQr && (
            <FadeIn delay={0.3}>
              <div className="mt-8 flex justify-center">
                <div className="w-40 h-40 p-2" style={{ background: "var(--sp-surface)", border: "1px solid var(--sp-surface-border)" }}>
                  <img src={contact.wechatQr} alt="微信公众号二维码" className="w-full h-full object-contain" />
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  );
}
