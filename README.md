# brunson.github.io

Brunson Liu 个人主页。基于 Next.js 15 静态导出，部署于 GitHub Pages。

---

## 技术栈

| 层 | 选取 |
|---|---|
| 框架 | Next.js 15.5 (App Router, Turbopack, `output: "export"`) |
| 样式 | Tailwind CSS 4 + 全局 CSS 自定义属性 (Design Tokens) |
| 字体 | [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts) |
| 动画 | Framer Motion (页面级入场、滚动联动、hover 微交互) |
| 特效 | Canvas 2D (TSP 背景、文字粒子云)；WebGL GLSL (ShaderOverlay，未全局启用) |
| 内容 | MDX + gray-matter + remark-html |
| 搜索 | fuse.js 客户端模糊搜索 |

---

## 当前设计定位

**瑞士现代主义（International Typographic Style）**，未完全贯彻。实际状态：

- 配色：白底 `#fafafa` / 炭黑文字 `#1a1a1a` / 瑞士红 `#e63946`
- 排版以无衬线 Inter 为主，行距 1.75，标题字重 700-900
- 圆角设为 `0px`（部分 CSS 变量，未全局强制）
- 按钮为矩形黑边框或红色实底
- Hero 采用非对称布局，右上角红色几何色块

已知不足：
- `globals.css` 第 5-10 节仍残留前几版设计方案的动画类名（.basketball-bounce、.ink-wash-enter 等），虽颜色已统一但语义不匹配当前风格
- `page-themes.jsx` 6 套页面主题的色值已替换为黑白红体系，但内部结构仍保留了旧方案的划分逻辑
- `poker-flip.jsx` 的 3D 倾斜效果与当前极简平面风格存在视觉冲突

---

## 目录结构（仅列出关键路径）

```
app/
├── layout.js                        全局布局：Navbar + ProgressBar + ConsoleEasterEgg
├── page.js                          首页：Hero → About → Hobbies → Projects → Quotes → Footer
├── globals.css                      设计令牌 + 组件基类 + 动画
├── not-found.jsx                    404 (TSP 虚线路径)
│
├── study/                           学习笔记 (layout.js 设定 .page-study)
├── research/                        研究 (layout.js 设定 .page-research)
├── diary/                           日记
├── internship/                      实习经历
├── competition/                     竞赛 (generateStaticParams)
├── learning/[slug]/                 学习笔记详情
├── llm-agent/[slug]/                LLM Agent 笔记
├── playground/                      TSP 算法交互演示
├── contact/                         联系方式
├── search/                          全文搜索 (fuse.js)
│
├── components/
│   ├── Hero.jsx                     Hero (TSP Canvas 背景 + 非对称文字)
│   ├── Navbar.jsx                   顶部导航 (磁吸链接 + dropdown)
│   ├── Footer.jsx                   页脚 (© 2026, 联系方式)
│   ├── About.jsx                    关于我 (技能云 + Timeline)
│   ├── ProgressBar.jsx              页面滚动进度条
│   ├── ConsoleEasterEgg.jsx         开发者控制台彩蛋
│   ├── WebGLShaderOverlay.jsx       GLSL 噪声着色器 (未全局启用)
│   ├── ParallaxTextCloud.jsx        Canvas 2D 文字粒子云
│   ├── poker-flip.jsx               扑克翻转卡片 (3D + spring easing)
│   ├── theme-easter-eggs.jsx        页面动效函数 (bounce, glow, reveal)
│   ├── page-themes.jsx              页面主题包装组件
│   ├── optimization-playground.jsx  TSP 2-opt 算法可视化
│   ├── ThinkingTree.jsx             思考树可视化
│   ├── ui.jsx                       Divider / SkillTags / InfoCard
│   ├── interactive.jsx              TiltCard
│   └── decorations.jsx              SVG 装饰元素
│
├── hooks/
│   └── useMousePosition.js          鼠标坐标 Hook
│
└── lib/
    └── markdown.js                  MDX 加载 + frontmatter 解析
```

---

## 构建与部署

```bash
npm run dev        # 开发 (Turbopack, localhost:3000)
npm run build      # 生产构建 (静态导出至 out/)
npm run start      # 预览构建结果
```

静态导出配置在 `next.config.mjs`：`output: "export"`, `basePath: ""`, 图片使用 `unoptimized`。

当前构建产出 41 个静态页面（2025-05 实测）。

---

## 配色体系

设计令牌定义于 `globals.css` 的 `:root`：

| 变量 | hex / rgba | 用途 |
|---|---|---|
| `--bg` | `#fafafa` | 全局背景 |
| `--text` | `#1a1a1a` | 正文色 |
| `--muted` | `#6b6b6b` | 辅助灰 |
| `--brand` | `#e63946` | 瑞士红强调色 |
| `--surface` | `#ffffff` | 卡片底色 |
| `--surface-border` | `#e0e0e0` | 卡片边框 |

6 套页面主题色已被统一为该体系，差异仅在于 `--page-bg`（`#fafafa` 或 `#ffffff`）和 `--page-brand`（`#1a1a1a` 或 `#e63946`）的互换。

---

## 已知局限性

1. **Turbopack 缓存**：修改 `globals.css` 后偶尔需手动删除 `.next` 目录重启
2. **中文文件名**：`study/learning/[slug]` 中部分 Markdown 文件名为中文，URL 编码后经 `decodeURIComponent` 处理可正常运行，但非最佳实践
3. **全局水波折射层**：`GlobalWaterRefraction.jsx` 文件仍存在于目录中但已从 `layout.js` 移除，未激活
4. **无障碍**：未系统性地检查色彩对比度、键盘导航、ARIA 标签
5. **响应式**：Tailwind 响应式类已覆盖移动端，但未在真机上系统测试各页面
6. **性能**：Framer Motion 动画 + Canvas 粒子 + WebGL 着色器同时启用时在低性能设备上可能有掉帧

---

## 设计演进历史

本主页经历了多次风格迭代：

| 版本 | 风格 | 状态 |
|---|---|---|
| v1 | 暗黑科技蓝 (`#0d0f14` / `#7a9ec9`) | 已废弃 |
| v2 | 美国国家艺术馆（象牙白 / 古典金 / Cormorant Garamond 衬线） | 尝试后放弃，"感觉有点土" |
| v3 | 瑞士现代主义（白 / 炭黑 / 红 / Inter） | 当前版本，部分完成 |

每次迭代保留了大量组件代码，部分旧样式类名（如 `.gallery-frame`、`.breathe-glow`）虽已从核心样式移除，但组件文件中可能仍有引用。