import { listMarkdown } from "../lib/markdown";
import LearningList from "../learning/LearningList";

export default function LlmAgentIndex() {
  const notes = listMarkdown("llm-agent");
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 
        className="text-3xl font-semibold mb-4"
        style={{ color: "var(--brand)" }}
      >
        LLM & Agent
      </h1>
      <p 
        className="mb-8" 
        style={{ color: "var(--muted)" }}
      >
        Explore my work and research on Large Language Models and AI Agents.
      </p>
      <LearningList notes={notes} />
    </main>
  );
}