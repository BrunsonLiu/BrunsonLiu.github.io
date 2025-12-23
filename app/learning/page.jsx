import { listMarkdown } from "../lib/markdown";
import LearningList from "./LearningList";

export default function LearningIndex() {
  const notes = listMarkdown("study");
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 
        className="text-3xl font-semibold mb-4"
        style={{ color: "var(--brand)" }}
      >
        Learning
      </h1>
      <p 
        className="mb-8" 
        style={{ color: "var(--muted)" }}
      >
        Browse through my study notes and learning materials.
      </p>
      <LearningList notes={notes} />
    </main>
  );
}


