﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿"use client";
import { useEffect } from "react";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    const bold = "font-size: 14px; font-weight: 800; color: #e63946; letter-spacing: 2px;";
    const text = "font-size: 12px; color: #f0f0f0;";
    const muted = "font-size: 11px; color: #888;";

    console.log("%cBRUNSON", bold);
    console.log("%cAlgorithm Engineer & Researcher", muted);
    console.log("%c—————————————————————————", muted);
    console.log("%c Optimization · Machine Learning · Operations Research", text);
    console.log("%c—————————————————————————", muted);
    console.log("%c📧 1815751961@qq.com", text);
    console.log("%c🐙 github.com/BrunsonLiu", text);
    console.log("%c—————————————————————————", muted);
    console.log("%cInterested in collaboration? Let's talk.", muted);
  }, []);

  return null;
}