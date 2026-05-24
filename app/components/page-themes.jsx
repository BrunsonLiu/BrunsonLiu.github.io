﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿"use client";

export function PageWrapper({ className = "", children, style = {} }) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}