"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlowIn } from "../../../components/space";
import Link from "next/link";

const authorThemes = {
  "毛泽东": {
    gradient: "linear-gradient(135deg, #1a0000 0%, #8b0000 40%, #cc4400 70%, #1a0000 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=red%20flag%20on%20mountain%20peak%20at%20dawn%2C%20revolutionary%20chinese%20landscape%2C%20dramatic%20red%20sky%20and%20golden%20clouds%2C%20vast%20mountains%20and%20rivers%2C%20epic%20scale%2C%20victorious%20atmosphere%2C%20warm%20red%20and%20gold%20tones%2C%20no%20people%2C%20no%20text&image_size=landscape_16_9",
  },
  "苏轼": {
    gradient: "linear-gradient(135deg, #0a0a1a 0%, #1a2a3a 30%, #3a4a2a 60%, #0a0a1a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=autumn%20moon%20over%20calm%20river%2C%20misty%20cliffs%20and%20bamboo%2C%20traditional%20chinese%20shanshui%20painting%2C%20warm%20amber%20tones%2C%20contemplative%20atmosphere%2C%20no%20people%2C%20no%20text&image_size=landscape_16_9",
  },
  "李白": {
    gradient: "linear-gradient(135deg, #0a0a0a 0%, #2a1a00 30%, #4a3a00 60%, #0a0a0a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=magnificent%20waterfall%20cascading%20from%20heavenly%20heights%2C%20dramatic%20golden%20light%2C%20wild%20mountain%20river%2C%20epic%20chinese%20landscape%2C%20free%20and%20bold%20spirit%2C%20no%20people%2C%20no%20text&image_size=landscape_16_9",
  },
  "王勃": {
    gradient: "linear-gradient(135deg, #0a0a1a 0%, #2a1a0a 30%, #4a3a1a 60%, #0a0a1a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sunset%20over%20grand%20pavilion%20by%20river%2C%20flying%20geese%20and%20autumn%20water%2C%20golden%20and%20amber%20sky%2C%20majestic%20chinese%20architecture%2C%20poetic%20atmosphere%2C%20no%20people%2C%20no%20text&image_size=landscape_16_9",
  },
  "张若虚": {
    gradient: "linear-gradient(135deg, #0a0a2a 0%, #0a1a3a 30%, #1a2a4a 60%, #0a0a2a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=full%20moon%20over%20spring%20river%2C%20silver%20moonlight%20on%20water%2C%20flowering%20trees%20along%20shore%2C%20serene%20and%20ethereal%20chinese%20landscape%2C%20cool%20blue%20and%20silver%20tones%2C%20no%20people%2C%20no%20text&image_size=landscape_16_9",
  },
  "范仲淹": {
    gradient: "linear-gradient(135deg, #0a0a1a 0%, #1a2a3a 30%, #2a3a4a 60%, #0a0a1a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vast%20lake%20and%20tower%20pavilion%2C%20storm%20clouds%20and%20sunlight%20breaking%20through%2C%20dramatic%20chinese%20landscape%2C%20tower%20overlooking%20water%2C%20noble%20atmosphere%2C%20no%20people%2C%20no%20text&image_size=landscape_16_9",
  },
  "诸葛亮": {
    gradient: "linear-gradient(135deg, #0a0a0a 0%, #1a1a0a 30%, #2a2a1a 60%, #0a0a0a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ancient%20straw%20thatched%20cottage%20in%20misty%20mountains%2C%20bamboo%20forest%20at%20dawn%2C%20solemn%20and%20loyal%20atmosphere%2C%20warm%20amber%20candlelight%20glow%2C%20chinese%20ink%20painting%20style%2C%20no%20people%2C%20no%20text&image_size=landscape_16_9",
  },
  "杜牧": {
    gradient: "linear-gradient(135deg, #0a0a0a 0%, #2a0a0a 30%, #3a1a0a 60%, #0a0a0a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=grand%20ancient%20palace%20ruins%20at%20sunset%2C%20overgrown%20courtyards%2C%20dramatic%20red%20and%20gold%20sky%2C%20melancholic%20chinese%20landscape%2C%20no%20people%2C%20no%20text&image_size=landscape_16_9",
  },
  "曹植": {
    gradient: "linear-gradient(135deg, #0a0a1a 0%, #1a0a2a 30%, #2a1a3a 60%, #0a0a1a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ethereal%20goddess%20over%20misty%20river%2C%20flowing%20silk%20robes%20and%20moonlight%2C%20chinese%20mythological%20landscape%2C%20graceful%20and%20romantic%20atmosphere%2C%20soft%20purple%20and%20silver%20tones%2C%20no%20people%2C%20no%20text&image_size=landscape_16_9",
  },
  "曹操": {
    gradient: "linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 30%, #3a1a0a 60%, #0a0a0a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=warrior%20king%20on%20cliff%20overlooking%20vast%20ocean%2C%20dramatic%20red%20sunset%2C%20epic%20chinese%20warlord%20landscape%2C%20crows%20flying%2C%20no%20people%2C%20no%20text&image_size=landscape_16_9",
  },
  "杜甫": {
    gradient: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 30%, #2a2a1a 60%, #0a0a0a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=autumn%20mountains%20and%20rushing%20river%2C%20falling%20leaves%20in%20wind%2C%20high%20terrace%20overlooking%20vast%20landscape%2C%20melancholic%20chinese%20landscape%2C%20muted%20earth%20tones%2C%20no%20people%2C%20no%20text&image_size=landscape_16_9",
  },
  "白居易": {
    gradient: "linear-gradient(135deg, #0a0a1a 0%, #0a1a2a 30%, #1a1a3a 60%, #0a0a1a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=moonlit%20river%20at%20night%2C%20lone%20boat%20with%20lantern%2C%20maple%20leaves%20and%20reed%20flowers%2C%20melancholic%20chinese%20landscape%2C%20silver%20and%20amber%20tones%2C%20no%20people%2C%20no%20text&image_size=landscape_16_9",
  },
  "屈原": {
    gradient: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2a 30%, #0a2a3a 60%, #0a0a0a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ancient%20poet%20standing%20by%20misty%20river%2C%20quyuan%20miluo%20river%2C%20dragon%20boat%20and%20rice%20dumplings%2C%20chinese%20ink%20painting%2C%20dark%20blue%20and%20jade%20green%20tones%2C%20tragic%20and%20noble%20atmosphere%2C%20no%20people%2C%20no%20text&image_size=landscape_16_9",
  },
  "李煜": {
    gradient: "linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 30%, #2a0a2a 60%, #0a0a0a 100%)",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fallen%20petals%20on%20rainy%20courtyard%2C%20lonely%20pavilion%20under%20autumn%20moon%2C%20chinese%20ink%20painting%2C%20melancholic%20and%20elegant%20atmosphere%2C%20deep%20purple%20and%20silver%20tones%2C%20no%20people%2C%20no%20text&image_size=landscape_16_9",
  },
};

const DEFAULT_THEME = {
  gradient: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2a 50%, #0a0a0a 100%)",
};

export default function AuthorClient({ author, poems }) {
  const theme = authorThemes[author] || DEFAULT_THEME;
  const [imgVisible, setImgVisible] = useState(true);
  const [expandedIdx, setExpandedIdx] = useState(0);

  return (
    <div className="space-literature min-h-screen">
      <div className="space-grain" />

      <div className="poet-hero" style={{ background: theme.gradient }}>
        {theme.image && imgVisible && (
          <img
            src={theme.image}
            alt=""
            className="poet-hero-img"
            draggable={false}
            onError={() => setImgVisible(false)}
          />
        )}
        <div className="poet-hero-overlay" />
        <div className="poet-hero-content">
          <SlowIn>
            <Link href="/literature/poetry" prefetch={false} className="poet-back">
              ← 诗词
            </Link>
          </SlowIn>
          <SlowIn delay={0.1}>
            <h1 className="poet-name">{author}</h1>
          </SlowIn>
          <SlowIn delay={0.2}>
            <span className="poet-count">{poems.length} 首</span>
          </SlowIn>
        </div>
      </div>

      <div className="poet-page">
        <div className="poet-body">
          <nav className="poet-nav">
            {poems.map((poem, i) => (
              <button
                key={poem.title}
                className={`poet-nav-item ${i === expandedIdx ? "poet-nav-active" : ""}`}
                onClick={() => setExpandedIdx(i)}
              >
                <span className="poet-nav-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="poet-nav-title">{poem.title}</span>
              </button>
            ))}
          </nav>

          <div className="poet-reading">
            <AnimatePresence mode="wait">
              <motion.div
                key={expandedIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="poet-poem"
              >
                <h2 className="poet-poem-title">{poems[expandedIdx].title}</h2>
                <div className="poet-poem-body">
                  {poems[expandedIdx].lines.map((line, j) => (
                    line === "" ? (
                      <div key={j} className="poet-poem-gap" />
                    ) : (
                      <p key={j} className="poet-poem-line">{line}</p>
                    )
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
