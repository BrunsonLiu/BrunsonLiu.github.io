import { poems } from "../../../data/literature";
import AuthorClient from "./AuthorClient";

export function generateStaticParams() {
  const authorSet = new Set();
  poems.forEach((p) => { authorSet.add(p.author); });
  return Array.from(authorSet).map((author) => ({ author: encodeURIComponent(author) }));
}

export default async function AuthorPage({ params }) {
  const { author } = await params;
  const decoded = decodeURIComponent(author);
  const authorPoems = poems.filter((p) => p.author === decoded);
  return <AuthorClient author={decoded} poems={authorPoems} />;
}