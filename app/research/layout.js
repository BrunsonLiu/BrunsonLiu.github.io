﻿﻿﻿﻿export default function ResearchLayout({ children }) {
  return (
    <div className="space-academic min-h-screen pt-16">
      <div className="space-grain" />
      <div className="relative z-10 px-6 lg:px-8 pt-24 pb-32" style={{ maxWidth: "var(--reading-width)", margin: "0 auto" }}>
        {children}
      </div>
    </div>
  );
}
