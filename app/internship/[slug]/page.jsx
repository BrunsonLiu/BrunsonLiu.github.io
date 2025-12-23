import { getMarkdownHtml, listMarkdown } from "../../lib/markdown";

export async function generateStaticParams() {
  const posts = listMarkdown("internship");
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function InternshipPost({ params }) {
  const { slug } = await params;
  const { html, meta } = await getMarkdownHtml("internship", slug);
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 prose">
      <h1 style={{ color: "var(--brand)" }}>{meta.title || slug}</h1>
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}


