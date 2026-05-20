"use client";
import { useMemo, useState, useCallback } from "react";
import { FadeIn, AccentLine } from "../../components/space";
import { getMajorAuthors, getAuthorCounts, getPoemsByAuthor } from "../../lib/poetry";
import Link from "next/link";

const authorImages = {
  "毛泽东": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20ink%20wash%20painting%20of%20vast%20mountain%20landscape%2C%20misty%20peaks%20and%20rivers%2C%20traditional%20shanshui%20style%2C%20dramatic%20scale%2C%20muted%20ink%20tones%2C%20editorial%20art&image_size=landscape_16_9",
  "苏轼": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20ink%20wash%20painting%20of%20river%20and%20cliffs%2C%20autumn%20moon%20over%20calm%20water%2C%20traditional%20shanshui%20style%2C%20muted%20ink%20tones%2C%20editorial%20art&image_size=landscape_16_9",
};

const FALLBACK_IMAGE = "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20ink%20wash%20painting%20abstract%2C%20misty%20mountains%20and%20water%2C%20traditional%20shanshui%20style%2C%20muted%20ink%20tones%2C%20editorial%20art&image_size=landscape_16_9";

function AuthorCard({ section, index }) {
  const [imgSrc, setImgSrc] = useState(
    authorImages[section.author] || FALLBACK_IMAGE
  );
  const [imgFailed, setImgFailed] = useState(false);

  const onError = useCallback(() => {
    if (!imgFailed) {
      setImgFailed(true);
      setImgSrc(FALLBACK_IMAGE);
    }
  }, [imgFailed]);

  return (
    <FadeIn delay={0.05 * index}>
      <a
        href={`/literature/poetry/${encodeURIComponent(section.isOther ? "other" : section.author)}`}
        className="block group relative overflow-hidden"
        style={{ aspectRatio: "2/3" }}
      >
        <img
          src={imgSrc}
          alt={section.isOther ? "其他诗人作品" : section.author}
          loading="lazy"
          onError={onError}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          style={{ filter: "brightness(0.35) saturate(0.3) contrast(1.1)" }}
        />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)" }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-sm font-medium leading-tight mb-1"
            style={{ color: "var(--sp-text)", fontFamily: "var(--font-reading)", letterSpacing: "0.06em" }}>
            {section.author}
          </p>
          <p className="text-[10px] mb-2" style={{ color: "var(--sp-accent)" }}>
            {section.count} 首
          </p>
          <p className="text-[10px] leading-relaxed" style={{
            color: "var(--sp-muted)",
            fontFamily: "var(--font-reading)",
            fontStyle: "italic",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {section.excerpt}
          </p>
        </div>
      </a>
    </FadeIn>
  );
}

export default function PoetryPage() {
  const grouped = useMemo(() => {
    const countMap = getAuthorCounts();
    const majorAuthors = getMajorAuthors();

    const sections = majorAuthors.map((author) => ({
      author,
      count: countMap[author],
      excerpt: getPoemsByAuthor(author)[0]?.lines?.[0] || "",
    }));

    const otherPoems = getPoemsByAuthor("other");
    if (otherPoems.length > 0) {
      const firstOther = otherPoems[0];
      sections.push({
        author: "其他",
        count: otherPoems.length,
        excerpt: `《${firstOther.title}》${firstOther.lines[0]}`,
        isOther: true,
      });
    }

    return sections;
  }, []);

  return (
    <div className="space-literature min-h-screen pt-16">
      <div className="space-grain" />

      <div className="px-6 lg:px-8 py-24" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <FadeIn>
          <Link href="/literature" prefetch={false} className="text-[10px] font-medium uppercase tracking-[0.4em] inline-block mb-16 transition-opacity duration-300 hover:opacity-60"
            style={{ color: "var(--sp-muted)" }}>
            ← 文学空间
          </Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="mb-4" style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 300, lineHeight: 1.2, letterSpacing: "0.08em",
            color: "var(--sp-text)", fontFamily: "var(--font-reading)",
          }}>
            诗词
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <AccentLine width="32px" />
          <p className="text-sm leading-relaxed max-w-sm mb-16" style={{ color: "var(--sp-muted)", letterSpacing: "0.04em" }}>
            粪土当年万户侯！
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {grouped.map((section, i) => (
            <AuthorCard key={section.author} section={section} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
