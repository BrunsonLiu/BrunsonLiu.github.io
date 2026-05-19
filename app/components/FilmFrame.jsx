"use client";

const ratios = {
  "16:9": "56.25%",
  "2.35:1": "42.55%",
  "4:3": "75%",
  "1:1": "100%",
};

export default function FilmFrame({ children, ratio = "16:9", className = "", border = true }) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div className="relative w-full" style={{ paddingBottom: ratios[ratio] || ratios["16:9"] }}>
        <div className="absolute inset-0">{children}</div>
      </div>

      {border && (
        <>
          {/* Letterbox bars — subtle */}
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{
              height: "3px",
              background: "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, transparent 100%)",
              zIndex: 2,
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: "3px",
              background: "linear-gradient(0deg, rgba(0,0,0,0.12) 0%, transparent 100%)",
              zIndex: 2,
            }}
          />
        </>
      )}
    </div>
  );
}

export function SceneNumber({ number, className = "" }) {
  return (
    <div className={`flex items-center gap-4 mb-8 ${className}`}>
      <span
        className="text-xs font-bold tracking-[0.3em] uppercase"
        style={{ color: "var(--muted)" }}
      >
        Scene {String(number).padStart(2, "0")}
      </span>
      <div style={{ flex: 1, height: "1px", background: "var(--text)", opacity: 0.15 }} />
    </div>
  );
}