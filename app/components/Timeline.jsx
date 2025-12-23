export default function Timeline({ items }) {
  return (
    <ol className="relative border-s pl-6" style={{ borderColor: "var(--surface)" }}>
      {items.map((it, idx) => (
        <li key={idx} className="mb-6">
          <div 
            className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full" 
            style={{ backgroundColor: "var(--brand)" }} 
          />
          <p className="text-sm" style={{ color: "var(--muted)" }}>{it.date}</p>
          <h3 className="font-medium" style={{ color: "var(--text)" }}>{it.title}</h3>
          {it.description ? (
            <p className="mt-1" style={{ color: "var(--muted)" }}>{it.description}</p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}


