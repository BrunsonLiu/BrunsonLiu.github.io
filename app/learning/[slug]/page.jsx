import { getMarkdownHtml, listMarkdown } from "../../lib/markdown";

export async function generateStaticParams() {
  const notes = listMarkdown("study");
  return notes.map((note) => ({ slug: note.slug }));
}

export default async function LearningNote({ params }) {
  const { slug } = await params;
  const { html, meta } = await getMarkdownHtml("study", slug);
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 prose">
      <h1 style={{ color: "var(--brand)" }}>{meta.title || slug}</h1>
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}


