"use client";
import Fuse from "fuse.js";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function SearchClient({ items }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    if (!q) return items;
    const fuse = new Fuse(items, {
      keys: ["title", "description", "category", "slug"],
      threshold: 0.35,
    });
    return fuse.search(q).map((r) => r.item);
  }, [q, items]);

  return (
    <>
      <div className="mb-6">
        <input 
          value={q} 
          onChange={(e) => setQ(e.target.value)} 
          placeholder="Search across notes..." 
          className="w-full rounded-xl px-4 py-2 outline-none transition card"
          style={{ color: "var(--text)" }}
        />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((n) => (
          <Link 
            key={`${n.category}-${n.slug}`} 
            href={n.url} 
            className="block card p-5 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            <div className="text-xs mb-1" style={{ color: "var(--muted)" }}>{n.category}</div>
            <h3 className="font-medium" style={{ color: "var(--brand)" }}>{n.title}</h3>
            <p className="text-sm mt-2 line-clamp-2" style={{ color: "var(--muted)" }}>{n.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
}


