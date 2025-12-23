export function useMDXComponents(components) {
  return {
    // 包装所有 MDX 内容
    wrapper: ({ children }) => (
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 prose prose-invert">
        {children}
      </main>
    ),
    // 自定义标题样式
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mb-6" style={{ color: "var(--brand)" }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mt-8 mb-4" style={{ color: "var(--brand)" }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium mt-6 mb-3" style={{ color: "var(--text)" }}>
        {children}
      </h3>
    ),
    // 段落和链接
    p: ({ children }) => (
      <p className="my-4 leading-relaxed" style={{ color: "var(--muted)" }}>
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a 
        href={href} 
        className="transition hover:opacity-80"
        style={{ color: "var(--brand)", borderBottom: "1px solid var(--brand)" }}
      >
        {children}
      </a>
    ),
    // 列表样式
    ul: ({ children }) => (
      <ul className="list-disc list-inside my-4 space-y-2" style={{ color: "var(--muted)" }}>
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside my-4 space-y-2" style={{ color: "var(--muted)" }}>
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="ml-2">
        {children}
      </li>
    ),
    // 代码块
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded text-sm" style={{ backgroundColor: "var(--surface)", color: "var(--brand)" }}>
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="p-4 rounded-xl my-4 overflow-x-auto" style={{ backgroundColor: "var(--surface)" }}>
        {children}
      </pre>
    ),
    // 引用
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 pl-4 my-4 italic" style={{ borderColor: "var(--brand)", color: "var(--muted)" }}>
        {children}
      </blockquote>
    ),
    // 分隔线
    hr: () => (
      <hr className="my-8 border-t" style={{ borderColor: "var(--surface)" }} />
    ),
    ...components,
  };
}
