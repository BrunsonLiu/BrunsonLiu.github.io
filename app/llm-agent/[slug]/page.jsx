﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿import { getMarkdownHtml, listMarkdown } from "../../lib/markdown";

export async function generateStaticParams() {
  const posts = listMarkdown("llm-agent");
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { meta } = await getMarkdownHtml("llm-agent", slug);
  return { title: meta.title || slug };
}

export default async function LlmAgentPost({ params }) {
  const { slug } = await params;
  const { html, meta } = await getMarkdownHtml("llm-agent", slug);
  
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article 
        className="prose prose-lg max-w-none"
        style={{ color: "var(--text)" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
