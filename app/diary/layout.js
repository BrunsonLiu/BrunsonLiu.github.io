﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿import ReadingProgress from "../components/ReadingProgress";

export default function DiaryLayout({ children }) {
  return (
    <div className="page-diary relative min-h-screen">
      <ReadingProgress />
      <div className="immersive-reading relative z-10">
        {children}
      </div>
    </div>
  );
}