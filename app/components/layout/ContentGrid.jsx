﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿"use client";
import { motion } from "framer-motion";
import Card from "../Card";

export default function ContentGrid({ items, columns = 3, staggerDelay = 0.1, delay = 0.3 }) {
  const gridClasses = {
    2: "grid sm:grid-cols-2 gap-6",
    3: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6",
    4: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6",
  };

  return (
    <div className={gridClasses[columns] || gridClasses[3]}>
      {items.map((item, i) => (
        <motion.div
          key={item.href || i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + i * staggerDelay,
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          <Card
            title={item.title}
            description={item.description}
            href={item.href}
            icon={item.icon}
          />
        </motion.div>
      ))}
    </div>
  );
}
