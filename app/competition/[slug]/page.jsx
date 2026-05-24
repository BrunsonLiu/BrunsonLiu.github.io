import { getMarkdownHtml, listMarkdown } from "../../lib/markdown";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { meta } = await getMarkdownHtml("competition", slug);
  return { title: meta.title || slug };
}

export default async function CompetitionPost({ params }) {
  const { slug } = await params;
  const { html, meta } = await getMarkdownHtml("competition", slug);

  return (
    <main className="min-h-screen" style={{ background: "var(--sp-bg, #0a0a0a)" }}>
      <article
        className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20"
        style={{ color: "var(--sp-text, #e0e0e0)" }}
      >
        <header className="mb-16">
          <a
            href="/competition"
            className="text-xs font-medium uppercase tracking-[0.3em] mb-8 inline-block transition-opacity duration-300 hover:opacity-60"
            style={{ color: "var(--sp-muted, #888)" }}
          >
            ← 竞赛
          </a>
          <h1
            className="mb-6"
            style={{
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "var(--sp-text, #e0e0e0)",
            }}
          >
            {meta.title || slug}
          </h1>
          {meta.tags && (
            <div className="flex flex-wrap gap-2 mb-8">
              {meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1"
                  style={{
                    background: "rgba(230,57,70,0.08)",
                    color: "var(--sp-accent, #e63946)",
                    border: "1px solid rgba(230,57,70,0.2)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div style={{ width: "32px", height: "1px", background: "var(--sp-accent, #e63946)" }} />
        </header>

        <div
          className="prose prose-lg max-w-none"
          style={{
            color: "var(--sp-text, #e0e0e0)",
            lineHeight: 1.9,
            fontSize: "16px",
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  const posts = listMarkdown("competition");
  return posts.map((p) => ({ slug: p.slug }));
}
