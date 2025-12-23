import SearchClient from "./searchClient";
import { listAllContent } from "../lib/markdown";

export default function SearchPage() {
  const items = listAllContent();
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-semibold mb-4" style={{ color: "var(--brand)" }}>Search</h1>
      <p className="mb-6" style={{ color: "var(--muted)" }}>Find notes across all categories.</p>
      <SearchClient items={items} />
    </main>
  );
}


