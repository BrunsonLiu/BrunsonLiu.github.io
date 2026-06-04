"use client";
import { useState } from "react";
import { FadeIn, AccentLine } from "../../components/space";
import { poems } from "../../data/literature";
import Link from "next/link";

const PROSE_TITLES = new Set([
  "滕王阁序",
  "岳阳楼记",
  "出师表",
  "阿房宫赋",
  "洛神赋",
  "前赤壁赋",
]);

const cardThemes = {
  "毛泽东": {
    gradient: "linear-gradient(160deg, #1a0000 0%, #8b0000 50%, #cc4400 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=red%20flag%20on%20mountain%20peak%20at%20dawn%2C%20revolutionary%20chinese%20landscape%2C%20dramatic%20red%20sky%2C%20vast%20mountains%20and%20rivers%2C%20epic%20scale%2C%20warm%20red%20and%20gold%20tones%2C%20no%20people&image_size=landscape_16_9",
  },
  "苏轼": {
    gradient: "linear-gradient(160deg, #0a0a1a 0%, #1a2a3a 50%, #3a4a2a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=autumn%20moon%20over%20calm%20river%2C%20misty%20cliffs%20and%20bamboo%2C%20traditional%20chinese%20shanshui%20painting%2C%20warm%20amber%20tones%2C%20contemplative%20atmosphere%2C%20no%20people&image_size=landscape_16_9",
  },
  "李白": {
    gradient: "linear-gradient(160deg, #0a0a0a 0%, #2a1a00 50%, #4a3a00 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=magnificent%20waterfall%20cascading%20from%20heavenly%20heights%2C%20dramatic%20golden%20light%2C%20wild%20mountain%20river%2C%20epic%20chinese%20landscape%2C%20free%20and%20bold%20spirit%2C%20no%20people&image_size=landscape_16_9",
  },
  "王勃": {
    gradient: "linear-gradient(160deg, #0a0a1a 0%, #2a1a0a 50%, #4a3a1a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sunset%20over%20grand%20pavilion%20by%20river%2C%20flying%20geese%20and%20autumn%20water%2C%20golden%20and%20amber%20sky%2C%20majestic%20chinese%20architecture%2C%20poetic%20atmosphere%2C%20no%20people&image_size=landscape_16_9",
  },
  "张若虚": {
    gradient: "linear-gradient(160deg, #0a0a2a 0%, #0a1a3a 50%, #1a2a4a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=full%20moon%20over%20spring%20river%2C%20silver%20moonlight%20on%20water%2C%20flowering%20trees%20along%20shore%2C%20serene%20and%20ethereal%20chinese%20landscape%2C%20cool%20blue%20and%20silver%20tones%2C%20no%20people&image_size=landscape_16_9",
  },
  "范仲淹": {
    gradient: "linear-gradient(160deg, #0a0a1a 0%, #1a2a3a 50%, #2a3a4a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vast%20lake%20and%20tower%20pavilion%2C%20storm%20clouds%20and%20sunlight%20breaking%20through%2C%20dramatic%20chinese%20landscape%2C%20tower%20overlooking%20water%2C%20noble%20atmosphere%2C%20no%20people&image_size=landscape_16_9",
  },
  "诸葛亮": {
    gradient: "linear-gradient(160deg, #0a0a0a 0%, #1a1a0a 50%, #2a2a1a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ancient%20straw%20thatched%20cottage%20in%20mountains%2C%20misty%20bamboo%20forest%2C%20solemn%20and%20loyal%20atmosphere%2C%20warm%20amber%20light%2C%20chinese%20ink%20painting%20style%2C%20no%20people&image_size=landscape_16_9",
  },
  "杜牧": {
    gradient: "linear-gradient(160deg, #0a0a0a 0%, #2a0a0a 50%, #3a1a0a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=grand%20ancient%20palace%20ruins%20at%20sunset%2C%20overgrown%20courtyards%2C%20dramatic%20red%20and%20gold%20sky%2C%20melancholic%20chinese%20landscape%2C%20no%20people&image_size=landscape_16_9",
  },
  "曹植": {
    gradient: "linear-gradient(160deg, #0a0a1a 0%, #1a0a2a 50%, #2a1a3a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ethereal%20goddess%20over%20misty%20river%2C%20flowing%20silk%20robes%20and%20moonlight%2C%20chinese%20mythological%20landscape%2C%20graceful%20and%20romantic%20atmosphere%2C%20soft%20purple%20and%20silver%20tones%2C%20no%20people%2C%20no%20text&image_size=landscape_16_9",
  },
  "曹操": {
    gradient: "linear-gradient(160deg, #0a0a0a 0%, #1a0a0a 50%, #3a1a0a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=warrior%20king%20standing%20on%20cliff%20overlooking%20vast%20ocean%2C%20dramatic%20red%20sunset%2C%20epic%20chinese%20warlord%20landscape%2C%20crows%20flying%2C%20no%20people&image_size=landscape_16_9",
  },
  "杜甫": {
    gradient: "linear-gradient(160deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a1a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=autumn%20mountains%20and%20rushing%20river%2C%20falling%20leaves%20in%20wind%2C%20high%20terrace%2C%20melancholic%20chinese%20landscape%2C%20muted%20earth%20tones%2C%20no%20people&image_size=landscape_16_9",
  },
  "白居易": {
    gradient: "linear-gradient(160deg, #0a0a1a 0%, #0a1a2a 50%, #1a1a3a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=moonlit%20river%20at%20night%2C%20lone%20boat%20with%20lantern%2C%20maple%20leaves%20and%20reed%20flowers%2C%20melancholic%20chinese%20landscape%2C%20silver%20and%20amber%20tones%2C%20no%20people&image_size=landscape_16_9",
  },
  "屈原": {
    gradient: "linear-gradient(160deg, #0a0a0a 0%, #1a1a2a 50%, #0a2a3a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ancient%20poet%20standing%20by%20misty%20river%2C%20quyuan%20miluo%20river%2C%20dragon%20boat%20and%20rice%20dumplings%2C%20chinese%20ink%20painting%2C%20dark%20blue%20and%20jade%20green%20tones%2C%20tragic%20and%20noble%20atmosphere%2C%20no%20people%2C%20no%20text&image_size=landscape_16_9",
  },
  "李煜": {
    gradient: "linear-gradient(160deg, #0a0a0a 0%, #1a0a1a 50%, #2a0a2a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fallen%20petals%20on%20rainy%20courtyard%2C%20lonely%20pavilion%20under%20autumn%20moon%2C%20chinese%20ink%20painting%2C%20melancholic%20and%20elegant%20atmosphere%2C%20deep%20purple%20and%20silver%20tones%2C%20no%20people%2C%20no%20text&image_size=landscape_16_9",
  },
  "杨慎": {
    gradient: "linear-gradient(160deg, #0a0a0a 0%, #1a2030 40%, #2a3030 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=grand%20yangtze%20river%20rushing%20eastward%2C%20white%20rapids%20and%20misty%20cliffs%2C%20morning%20sun%20breaking%20through%20clouds%2C%20epic%20scale%20chinese%20landscape%2C%20nostalgic%20historic%20atmosphere%2C%20no%20people%2C%20no%20text&image_size=landscape_16_9",
  },
  "朱敦儒": {
    gradient: "linear-gradient(160deg, #0a0a0a 0%, #1a2a1a 50%, #2a3a2a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=secluded%20garden%20with%20flowering%20plum%20trees%2C%20wine%20cup%20and%20drifting%20petals%2C%20morning%20mist%2C%20traditional%20chinese%20ink%20painting%2C%20hermit%20poet%20atmosphere%2C%20soft%20jade%20and%20pink%20tones%2C%20no%20people%2C%20no%20text&image_size=landscape_16_9",
  },
  "晏几道": {
    gradient: "linear-gradient(160deg, #0a0a1a 0%, #1a1a2a 50%, #2a1a3a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=moonlit%20tower%20with%20lowered%20silk%20curtains%2C%20drifting%20incense%20smoke%2C%20lotus%20pond%20at%20night%2C%20southern%20song%20dynasty%20lyric%20poetry%20atmosphere%2C%20sentimental%20and%20elegant%20mood%2C%20soft%20lavender%20and%20silver%20tones%2C%20no%20people%2C%20no%20text&image_size=landscape_16_9",
  },
  "秦观": {
    gradient: "linear-gradient(160deg, #0a0a1a 0%, #1a0a2a 50%, #2a0a2a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=magpie%20bridge%20over%20milky%20way%20at%20night%2C%20two%20lovers%20meeting%20among%20stars%2C%20autumn%20moon%20and%20silver%20clouds%2C%20romantic%20and%20ethereal%20chinese%20landscape%2C%20soft%20purple%20and%20silver%20tones%2C%20no%20people%2C%20no%20text&image_size=landscape_16_9",
  },
};

const DEFAULT_GRADIENT = "linear-gradient(160deg, #0a0a0a 0%, #1a1a2a 50%, #0a0a0a 100%)";

function Card({ title, subtitle, excerpt, href, imageAuthor, index }) {
  const theme = cardThemes[imageAuthor];
  const [imgVisible, setImgVisible] = useState(true);

  return (
    <FadeIn delay={0.03 * index}>
      <a
        href={href}
        className="block group relative overflow-hidden"
        style={{ aspectRatio: "3/4", background: theme ? theme.gradient : DEFAULT_GRADIENT }}
      >
        {theme?.image && imgVisible && (
          <img
            src={theme.image}
            alt={title}
            loading="lazy"
            onError={() => setImgVisible(false)}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            style={{ filter: "brightness(0.35) saturate(0.5) contrast(1.1)" }}
          />
        )}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-sm font-medium leading-tight mb-0.5"
            style={{ color: "var(--sp-text)", fontFamily: "var(--font-reading)", letterSpacing: "0.06em" }}>
            {title}
          </p>
          <p className="text-[10px] mb-2" style={{ color: "var(--sp-accent)" }}>
            {subtitle}
          </p>
          {excerpt && (
            <p className="text-[10px] leading-relaxed" style={{
              color: "var(--sp-muted)",
              fontFamily: "var(--font-reading)",
              fontStyle: "italic",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {excerpt}
            </p>
          )}
        </div>
      </a>
    </FadeIn>
  );
}

function buildCards(poemList) {
  const authorCount = {};
  const authorFirstLine = {};
  poemList.forEach((p) => {
    authorCount[p.author] = (authorCount[p.author] || 0) + 1;
    if (!authorFirstLine[p.author]) {
      authorFirstLine[p.author] = p.lines.find((l) => l !== "") || "";
    }
  });

  const cards = [];
  const seen = new Set();

  poemList.forEach((poem) => {
    const count = authorCount[poem.author];
    const authorSlug = encodeURIComponent(poem.author);

    if (count >= 2) {
      if (!seen.has(poem.author)) {
        seen.add(poem.author);
        cards.push({
          title: poem.author,
          subtitle: `${count} 首`,
          excerpt: authorFirstLine[poem.author],
          href: `/literature/poetry/${authorSlug}`,
          imageAuthor: poem.author,
        });
      }
    } else {
      cards.push({
        title: poem.title,
        subtitle: poem.author,
        excerpt: poem.lines.find((l) => l !== "") || "",
        href: `/literature/poetry/${authorSlug}`,
        imageAuthor: poem.author,
      });
    }
  });

  return cards;
}

export default function PoetryPage() {
  const poemCards = buildCards(poems.filter((p) => !PROSE_TITLES.has(p.title)));
  const proseCards = buildCards(poems.filter((p) => PROSE_TITLES.has(p.title)));

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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-24">
          {poemCards.map((card, i) => (
            <Card key={card.title + card.subtitle} {...card} index={i} />
          ))}
        </div>

        <FadeIn delay={0.1}>
          <h2 className="mb-3" style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 300, lineHeight: 1.2, letterSpacing: "0.08em",
            color: "var(--sp-text)", fontFamily: "var(--font-reading)",
          }}>
            赋·文
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <AccentLine width="32px" />
          <p className="text-sm leading-relaxed max-w-sm mb-12" style={{ color: "var(--sp-muted)", letterSpacing: "0.04em" }}>
            秦人不暇自哀，而后人哀之。
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {proseCards.map((card, i) => (
            <Card key={card.title + card.subtitle} {...card} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
