﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿export default function StudyLayout({ children }) {
  return (
    <div className="page-study relative min-h-screen">
      <div className="relative z-10 px-4 pt-24 pb-24 max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  );
}