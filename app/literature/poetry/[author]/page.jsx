import { poems } from "../../../data/literature";
import AuthorClient from "./AuthorClient";

export function generateStaticParams() {
  const countMap = {};
  poems.forEach((p) => { countMap[p.author] = (countMap[p.author] || 0) + 1; });
  const majorAuthors = Object.entries(countMap)
    .filter(([, c]) => c >= 2)
    .map(([a]) => a);

  const params = majorAuthors.map((author) => ({ author: encodeURIComponent(author) }));
  params.push({ author: "other" });
  return params;
}

export default async function AuthorPage({ params }) {
  const { author } = await params;
  const decoded = decodeURIComponent(author);

  let authorPoems;
  if (decoded === "other") {
    const countMap = {};
    poems.forEach((p) => { countMap[p.author] = (countMap[p.author] || 0) + 1; });
    const majorAuthors = Object.entries(countMap)
      .filter(([, c]) => c >= 2)
      .map(([a]) => a);
    authorPoems = poems.filter((p) => !majorAuthors.includes(p.author));
  } else {
    authorPoems = poems.filter((p) => p.author === decoded);
  }

  return <AuthorClient author={decoded} poems={authorPoems} />;
}