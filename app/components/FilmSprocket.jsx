"use client";

export default function FilmSprocket({ position = "left" }) {
  const sprocketSide = position === "left" ? "left-0" : "right-0";

  return (
    <div
      className={`fixed top-0 bottom-0 z-[9995] pointer-events-none ${sprocketSide}`}
      style={{ width: "24px" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 18px,
            rgba(230,57,70,0.08) 18px,
            rgba(230,57,70,0.08) 20px,
            transparent 20px,
            transparent 38px
          )`,
        }}
      />
    </div>
  );
}