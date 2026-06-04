﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿export default function HobbyLayout({ children }) {
  return (
    <div className="relative min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="relative z-10 px-4 py-12 max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  );
}