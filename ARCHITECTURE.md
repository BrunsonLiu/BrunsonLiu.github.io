# 项目架构

Brunson 个人主页 — Next.js 15 + Framer Motion + WebGL/Canvas 艺术前端

---

## 技术栈

| 层 | 技术 |
|---|---|
| 框架 | Next.js 15 (App Router, Turbopack) |
| 样式 | Tailwind CSS 4 + 全局 CSS 变量 (Design Tokens) |
| 动画 | Framer Motion |
| 特效 | WebGL GLSL (Shader) / Canvas 2D |
| 内容 | MDX |
| 部署 | GitHub Pages |

---

## 目录结构

```
├── app/
│   ├── layout.js                    # 全局布局 (Navbar + ProgressBar + EasterEgg + 水波折射层)
│   ├── page.js                      # 首页 (Hero → About → Hobbies → Projects → Quotes → Footer)
│   ├── globals.css                  # 设计系统 (颜色/间距/圆角/动画/页面主题)
│   ├── not-found.jsx                # 404 页
│   │
│   ├── about/                       # About 页面
│   │   ├── page.jsx
│   │   └── me/page.mdx
│   │
│   ├── study/                       # 学习 — 暖雾灰橙
│   │   ├── layout.js                # → .page-study 类
│   │   ├── page.jsx                 # 扑克牌翻转卡片
│   │   ├── optimization/page.mdx
│   │   ├── ml-dl/page.mdx
│   │   ├── math/page.mdx
│   │   ├── management/page.mdx
│   │   └── interdisciplinary/page.mdx
│   │
│   ├── research/                    # 研究 — 灰调雾紫
│   │   ├── layout.js                # → .page-research 类
│   │   ├── page.jsx
│   │   ├── l2o/page.mdx
│   │   ├── vrp/page.mdx
│   │   ├── reading-list/page.mdx
│   │   └── ideas/page.mdx
│   │
│   ├── diary/                       # 日记 — 青墨灰绿
│   │   ├── layout.js                # → .page-diary 类
│   │   ├── page.jsx
│   │   ├── hobbies/page.mdx
│   │   ├── reflections/page.mdx
│   │   └── philosophy/page.mdx
│   │
│   ├── internship/                  # 实习 — 灰雾蓝
│   │   ├── page.jsx                 # → .page-internship 类
│   │   ├── cxmt/page.jsx
│   │   ├── shuibao/page.jsx
│   │   ├── supply-chain-project/page.mdx
│   │   ├── ad-algorithm-notes/page.mdx
│   │   └── reflection/page.mdx
│   │
│   ├── competition/                 # 竞赛 — 灰青
│   │   ├── page.jsx                 # → .page-competition 类
│   │   └── [slug]/page.jsx
│   │
│   ├── learning/                    # 学习笔记
│   │   ├── page.jsx
│   │   ├── LearningList.jsx
│   │   └── [slug]/page.jsx
│   │
│   ├── llm-agent/                   # LLM Agent
│   │   ├── page.jsx
│   │   └── [slug]/page.jsx
│   │
│   ├── playground/                  # TSP 算法游乐场
│   │   └── page.jsx
│   │
│   ├── contact/                     # 联系
│   │   └── page.jsx
│   │
│   ├── search/                      # 搜索
│   │   ├── page.jsx
│   │   └── searchClient.jsx
│   │
│   ├── components/                  # 组件库
│   │   ├── layout/
│   │   │   ├── ContentGrid.jsx      # 内容网格容器
│   │   │   └── PageHeader.jsx       # 页面标题
│   │   │
│   │   ├── 全局/页面级
│   │   │   ├── Hero.jsx             # Hero (TSP背景 + 文字粒子 + 旋转文字 + 艺术排版)
│   │   │   ├── Navbar.jsx           # 顶部导航
│   │   │   ├── Footer.jsx           # 底部信息
│   │   │   ├── About.jsx            # 关于我
│   │   │   ├── ProgressBar.jsx      # 滚动进度条
│   │   │   ├── ConsoleEasterEgg.jsx # 控制台彩蛋
│   │   │   └── GlobalWaterRefraction.jsx  # 全局水波折射层 (Canvas 2D, z-index:9999)
│   │   │
│   │   ├── 首页组件
│   │   │   ├── Hobbies.jsx          # 爱好展示
│   │   │   ├── Projects.jsx         # 项目卡片
│   │   │   ├── Quotes.jsx           # 名言轮播
│   │   │   ├── AlgorithmNarrative.jsx # 算法叙事过渡
│   │   │   └── ParallaxTextCloud.jsx  # 视差文字云 (Canvas 2D 粒子)
│   │   │
│   │   ├── 交互/动效
│   │   │   ├── poker-flip.jsx       # 扑克翻转卡片 (轻3D + 呼吸光效 + 物理弹性)
│   │   │   ├── interactive.jsx      # 交互组件 (TiltCard)
│   │   │   ├── ui.jsx               # UI 基础 (Divider, SkillTags, InfoCard)
│   │   │   └── Card.jsx             # 卡片组件
│   │   │
│   │   ├── 特效层
│   │   │   ├── WebGLShaderOverlay.jsx      # WebGL 水波着色器 (单页面背景层)
│   │   │   ├── theme-easter-eggs.jsx       # 页面特效 (BasketballBounce, EnergyGlow, InkWashReveal)
│   │   │   ├── page-themes.jsx             # 页面主题包装器 (StudyPageTheme, ResearchPageTheme等)
│   │   │   └── lusion-effects.jsx          # Lusion 风格效果
│   │   │
│   │   ├── 装饰/氛围
│   │   │   ├── decorations.jsx      # 装饰元素
│   │   │   ├── QuoteBox.jsx         # 引用框
│   │   │   ├── ReadingProgress.jsx  # 阅读进度
│   │   │   ├── RandomMumbling.jsx   # 随机碎碎念
│   │   │   └── ThinkingTree.jsx     # 思考树
│   │   │
│   │   └── 算法可视化
│   │       └── optimization-playground.jsx  # TSP 交互优化演示
│   │
│   ├── hooks/
│   │   └── useMousePosition.js      # 鼠标位置追踪 Hook
│   │
│   └── lib/
│       └── markdown.js              # MDX 内容加载
│
├── content/                         # MD 内容文件
│   ├── competition/
│   ├── diary/
│   ├── internship/
│   ├── llm-agent/
│   ├── research/
│   └── study/
│
├── data/                            # JSON 数据
│   ├── hobbies.json
│   ├── personal-quotes.json
│   ├── projects.json
│   ├── quotes.json
│   └── timeline.json
│
└── public/                          # 静态资源
    └── wechat-qr.jpg
```

---

## 设计系统 (globals.css)

### 全局变量

| 变量 | 值 | 用途 |
|---|---|---|
| `--bg` | `#0d0f14` | 深灰蓝背景 |
| `--text` | `#d4dae4` | 柔和白文字 |
| `--muted` | `#6b7a99` | 灰调辅助文字 |
| `--brand` | `#7a9ec9` | 灰雾蓝主品牌色 |
| `--accent` | `#9b8dbf` | 灰紫辅助色 |
| `--spot` | `#5fb8b0` | 灰青高光点缀 |
| `--surface` | `rgba(255,255,255,0.025)` | 卡片表面 |
| `--surface-border` | `rgba(255,255,255,0.04)` | 卡片边框 |

### 页面专属主题色

| CSS 类 | 页面 | 主色 | 光晕 |
|---|---|---|---|
| `.page-study` | Study | `#c9917a` 灰橙 | `rgba(201,145,122,0.04)` |
| `.page-research` | Research | `#8a7eb5` 灰紫 | `rgba(138,126,181,0.04)` |
| `.page-diary` | Diary | `#5cb5ad` 灰青 | `rgba(92,181,173,0.04)` |
| `.page-hobby` | Hobby | `#bfa87a` 灰金 | `rgba(191,168,122,0.04)` |
| `.page-internship` | Internship | `#7a9ec9` 灰蓝 | `rgba(122,158,201,0.04)` |
| `.page-competition` | Competition | `#5fb8b0` 灰青 | `rgba(95,184,176,0.04)` |

---

## 组件依赖关系

```
layout.js
├── Navbar.jsx
├── ProgressBar.jsx
├── ConsoleEasterEgg.jsx
└── GlobalWaterRefraction.jsx (Canvas 2D 水波纹, fixed, z-9999)

page.js (首页)
├── AlgorithmNarrative.jsx
├── Hero.jsx
│   ├── TSPScrollBackground (内嵌)
│   ├── ParallaxTextCloud.jsx (Canvas 2D 文字粒子)
│   └── RotatingDecorativeText (内嵌)
├── About.jsx
│   ├── ui.jsx (Divider, SkillTags, InfoCard)
│   └── interactive.jsx (TiltCard)
├── Hobbies.jsx
│   └── interactive.jsx (TiltCard)
├── Projects.jsx
├── Quotes.jsx
└── Footer.jsx

study/page.jsx ───→ StudyPageTheme (page-themes.jsx) + BasketballBounce (theme-easter-eggs.jsx)
research/page.jsx ─→ ResearchPageTheme + EnergyGlow
diary/page.jsx ───→ DiaryPageTheme + RandomMumbling + InkWashReveal
internship/page.jsx ─→ .page-internship
competition/page.jsx ─→ .page-competition
playground/page.jsx ───→ optimization-playground.jsx

通用:
├── poker-flip.jsx (Anton Korin 轻3D + Louis Hoebregts 物理弹性)
├── Card.jsx
├── layout/ContentGrid.jsx
├── layout/PageHeader.jsx
├── theme-easter-eggs.jsx
├── page-themes.jsx
└── hooks/useMousePosition.js
```

---

## 4 位前端艺术大佬风格融合

| 大佬 | 风格 | 落地位置 | 核心实现 |
|---|---|---|---|
| Matt DesLauriers | 算法艺术粒子 | ParallaxTextCloud, WebGLShaderOverlay | 网格有序粒子 + FBM 噪声 + 低饱和配色 |
| Anton Korin | 轻3D柔和光影 | poker-flip.jsx | 鼠标跟随倾斜 + 顶部微光 + 呼吸式光效 |
| Louis Hoebregts | 丝滑物理动效 | poker-flip.jsx, globals.css | spring easing `[0.34,1.56,0.64,1]` + 弹跳入场 |
| Jenna Motta | 艺术留白排版 | Hero.jsx | 不对称标题 + 粗细对比 + 大间距留白 |

---

## 渲染层级 (Hero 页)

```
z-1:  TSPScrollBackground (TSP 算法路径 Canvas)
z-1:  ParallaxTextCloud (文字粒子 Canvas)
z-10: Hero 内容 (文字/按钮)
z-50: Navbar (固定顶部)
z-9999: GlobalWaterRefraction (水波纹 Canvas, fixed 全屏覆盖)
```
