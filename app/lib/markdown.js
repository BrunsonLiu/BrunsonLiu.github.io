﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export const contentRoot = path.join(process.cwd(), "content");

export function listMarkdown(dir) {
  const dirPath = path.join(contentRoot, dir);
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const full = path.join(dirPath, file);
      const raw = fs.readFileSync(full, "utf8");
      const { data } = matter(raw);
      return { slug, meta: data || {} };
    });
}

export async function getMarkdownHtml(dir, slug) {
  const decodedSlug = decodeURIComponent(slug);
  const filePath = path.join(contentRoot, dir, `${decodedSlug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  return { html: processed.toString(), meta: data || {} };
}

export function listAllContent() {
  const categories = ["study", "research", "diary", "internship", "competition", "llm-agent"];
  const all = [];
  for (const category of categories) {
    const items = listMarkdown(category);
    for (const item of items) {
      all.push({
        category,
        slug: item.slug,
        title: item.meta.title || item.slug,
        description: item.meta.description || "",
        url:
          category === "study"
            ? `/learning/${item.slug}`
            : `/${category}/${item.slug}`,
      });
    }
  }
  return all;
}


