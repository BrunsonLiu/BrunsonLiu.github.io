﻿﻿﻿import { FaGraduationCap } from "react-icons/fa";
import { listMarkdown } from "../lib/markdown";
import PageHeader from "../components/layout/PageHeader";
import LearningList from "./LearningList";

export default function LearningIndex() {
  const notes = listMarkdown("study");
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <PageHeader
        title="Learning"
        description="Browse through my study notes and learning materials."
        icon={<FaGraduationCap size={20} />}
      />
      <LearningList notes={notes} />
    </main>
  );
}
