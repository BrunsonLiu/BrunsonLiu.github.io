export default function QuoteBox({ text, author }) {
  return (
    <div className="card p-6 text-center">
      <p className="italic" style={{ color: "var(--text)" }}>“{text}”</p>
      {author ? <p className="mt-2" style={{ color: "var(--muted)" }}>— {author}</p> : null}
    </div>
  );
}


