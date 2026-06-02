﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿import "./globals.css";
import Navbar from "./components/Navbar";
import ProgressBar from "./components/ProgressBar";
import ConsoleEasterEgg from "./components/ConsoleEasterEgg";

export const metadata = {
  title: {
    default: "Brunson — 学术 / 学习 / 兴趣",
    template: "%s | Brunson",
  },
  description: "武汉大学管理科学本科 → 中国科学技术大学管理科学与工程硕士。组合优化、车辆路径问题、Learning to Optimize。",
  keywords: ["Brunson", "组合优化", "车辆路径问题", "Learning to Optimize", "运筹学", "深度学习", "数学建模"],
  authors: [{ name: "Brunson" }],
  creator: "Brunson",
  metadataBase: new URL("https://brunsonliu.github.io"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://brunsonliu.github.io",
    title: "Brunson — 学术 / 学习 / 兴趣",
    description: "武汉大学管理科学本科 → 中国科学技术大学管理科学与工程硕士。组合优化、车辆路径问题、Learning to Optimize。",
    siteName: "Brunson",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ background: "var(--bg)", color: "var(--text)" }}>
        <Navbar />
        <ProgressBar />
        <ConsoleEasterEgg />
        {children}
      </body>
    </html>
  );
}
