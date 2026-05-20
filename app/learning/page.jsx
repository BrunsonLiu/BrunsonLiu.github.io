"use client";
import { SlowIn, AccentLine } from "../components/space";
import { learningTopics } from "../data/learning";

const statusLabels = {
  exploring: "探索中",
  understood: "已理解",
  applying: "应用",
};

function FragmentEntry({ entry, index }) {
  return (
    <SlowIn delay={0.06 * index}>
      <div className="group pb-14">
        <div className="pl-4" style={{ borderLeft: "1px solid var(--sp-surface-border)" }}>
          <span className="text-[10px] font-medium tracking-[0.15em] mb-3 inline-block"
            style={{ color: "var(--sp-muted)" }}>
            {entry.date}
          </span>

          <p className="text-sm leading-relaxed mb-2"
            style={{ color: "var(--sp-text)", letterSpacing: "0.02em" }}>
            {entry.insight}
          </p>

          {entry.discovery && (
            <p className="text-xs leading-relaxed mb-4"
              style={{ color: "var(--sp-accent)", fontStyle: "italic", opacity: 0.8 }}>
              → {entry.discovery}
            </p>
          )}

          <span className="text-[10px] font-medium tracking-[0.1em] px-2 py-0.5 inline-block"
            style={{
              color: "var(--sp-muted)",
              background: "var(--sp-surface)",
              border: "1px solid var(--sp-surface-border)",
            }}>
            {statusLabels[entry.status] || entry.status}
          </span>
        </div>
      </div>
    </SlowIn>
  );
}

export default function LearningPage() {
  return (
    <div className="space-learning min-h-screen pt-16">
      <div className="space-grain" />

      <div className="px-6 lg:px-8 py-24" style={{ maxWidth: "var(--reading-width)", margin: "0 auto" }}>
        <SlowIn>
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] mb-16"
            style={{ color: "var(--sp-muted)" }}>
            认知日志
          </p>
        </SlowIn>

        <SlowIn delay={0.1}>
          <h1 className="mb-6" style={{
            fontSize: "clamp(36px, 6vw, 56px)",
            fontWeight: 300, lineHeight: 1.15, letterSpacing: "-0.01em",
            color: "var(--sp-text)",
          }}>
            学习。
          </h1>
        </SlowIn>

        <SlowIn delay={0.2}>
          <AccentLine width="40px" />
          <p className="text-sm leading-relaxed max-w-sm mb-24"
            style={{ color: "var(--sp-muted)", letterSpacing: "0.02em" }}>
            不是在记录学了多少，而是在观察思维如何生长。
          </p>
        </SlowIn>

        {learningTopics.map((topic) => (
          <div key={topic.id} className="mb-24 last:mb-0">
            <SlowIn delay={0.15}>
              <div className="mb-3">
                <h2 className="text-lg font-medium mb-1"
                  style={{ color: "var(--sp-text)", letterSpacing: "0.04em" }}>
                  {topic.name}
                </h2>
                <p className="text-xs"
                  style={{ color: "var(--sp-muted)", letterSpacing: "0.03em" }}>
                  {topic.description}
                </p>
              </div>
            </SlowIn>

            <div>
              {topic.entries.map((entry, i) => (
                <FragmentEntry key={entry.id} entry={entry} index={i} />
              ))}
            </div>

            <div style={{ width: "100%", height: "1px", background: "var(--sp-surface-border)", marginTop: "0.5rem" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
