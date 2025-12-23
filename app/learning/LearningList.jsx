"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";

export default function LearningList({ notes }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    if (!q) return notes;
    const fuse = new Fuse(notes, { keys: ["slug", "meta.title", "meta.description"], threshold: 0.4 });
    return fuse.search(q).map((r) => r.item);
  }, [q, notes]);

  return (
    <>
      <div className="mb-6">
        <input 
          value={q} 
          onChange={(e) => setQ(e.target.value)} 
          placeholder="Search notes..." 
          className="w-full rounded-xl px-4 py-2 outline-none transition card"
          style={{ color: "var(--text)" }}
        />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((n) => (
          <Link 
            key={n.slug} 
            href={`/learning/${n.slug}`} 
            className="block card p-5 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            <h3 className="font-medium" style={{ color: "var(--brand)" }}>{n.meta.title || n.slug}</h3>
            <p className="text-sm mt-2 line-clamp-2" style={{ color: "var(--muted)" }}>{n.meta.description || ""}</p>
          </Link>
        ))}
      </div>
    </>
  );
}


