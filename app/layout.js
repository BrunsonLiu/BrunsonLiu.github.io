﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿import "./globals.css";
import Navbar from "./components/Navbar";
import ProgressBar from "./components/ProgressBar";
import ConsoleEasterEgg from "./components/ConsoleEasterEgg";

export const metadata = {
  title: {
    default: "Brunson — Digital Personal Universe",
    template: "%s | Brunson",
  },
  description: "Algorithm engineer, researcher, and interdisciplinary thinker. Optimization, literature, athletics, and beyond.",
  keywords: ["algorithm engineer", "optimization", "machine learning", "operations research", "academic researcher"],
  authors: [{ name: "Brunson" }],
  creator: "Brunson",
  metadataBase: new URL("https://brunson.github.io"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://brunson.github.io",
    title: "Brunson — Digital Personal Universe",
    description: "Algorithm engineer, researcher, and interdisciplinary thinker.",
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
