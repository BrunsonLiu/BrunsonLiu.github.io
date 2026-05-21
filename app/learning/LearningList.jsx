import Link from "next/link";

export default function LearningList({ notes }) {
  if (!notes || notes.length === 0) {
    return <p style={{ color: "var(--muted)" }}>暂无笔记</p>;
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {notes.map((note) => (
        <Link
          key={note.slug}
          href={`/llm-agent/${note.slug}`}
          style={{
            display: "block",
            padding: "1rem 1.25rem",
            border: "1px solid var(--sp-surface-border, #222)",
            borderRadius: "10px",
            color: "var(--sp-text, #e8e8e8)",
            textDecoration: "none",
            transition: "border-color 0.2s",
          }}
        >
          <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: "0 0 0.25rem" }}>
            {note.meta?.title || note.slug}
          </h3>
          {note.meta?.description && (
            <p style={{ fontSize: "0.8125rem", color: "var(--sp-muted, #666)", margin: 0 }}>
              {note.meta.description}
            </p>
          )}
        </Link>
      ))}
    </div>
  );
}
