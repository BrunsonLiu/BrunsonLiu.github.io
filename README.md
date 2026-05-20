# BrunsonLiu.github.io

数字人格空间（Digital Personal Universe）—— Brunson Liu 的个人主页。基于 Next.js 15 静态导出，部署于 GitHub Pages。

---

## 设计哲学

不是传统 portfolio，而是 5 个独立精神空间，每个空间有自己的配色、字体、节奏：

| 空间 | 路由 | 色板 | 气质 |
|------|------|------|------|
| 学术 | `/` | `space-academic` — 深黑 + 瑞士红 | 克制、精确、结构感 |
| 文学 | `/literature` | `space-literature` — 暖黑 + 琥珀金 | 安静、纸质感、阅读节奏 |
| 运动 | `/athletic` | `space-athletic` — 纯黑 + 荧光红 | 激烈、数据驱动、自律 |
| 旷野 | `/voyage` | `space-voyage` — 暮色蓝 + 日落金 | 开阔、自然、电影感 |
| 沉思 | `/reflection` | `space-reflection` — 冷黑 + 灰 | 最慢节奏、内省 |

文学空间下设三个独立展馆：诗词 `/literature/poetry`、书 `/literature/books`、电影 `/literature/cinema`。

---

## 技术栈

| 层 | 选取 |
|---|---|
| 框架 | Next.js 15.5 (App Router, Turbopack, `output: "export"`) |
| 样式 | Tailwind CSS 4 + CSS 自定义属性 (Design Tokens) |
| 字体 | Inter (正文) + Space Grotesk (Display) + Crimson Pro (文学阅读) |
| 动画 | Framer Motion (FadeIn / SlowIn / ScrollReveal) |
| 特效 | WebGL GLSL (水波着色器) + Canvas 2D (文字粒子云 / TSP 背景) |
| 内容 | MDX + gray-matter + remark-html |
| 搜索 | fuse.js 客户端模糊搜索 |
| 图标 | react-icons |
| 部署 | GitHub Actions → GitHub Pages |

---

## 目录结构

```
app/
├── layout.js                        全局布局：Navbar + ProgressBar + ConsoleEasterEgg
├── page.js                          学术空间首页
├── globals.css                      设计系统：全局令牌 + 5 套空间色板 + 页面主题 + 动画
├── not-found.jsx                    404 页面
│
├── data/                            数据层
│   ├── academic.js                  个人信息、教育、研究方向、技术栈、项目
│   ├── literature.js                诗词、书集群、电影
│   ├── athletic.js                  跑步PB、篮球、训练日志、运动哲学
│   ├── voyage.js                    城市、英语学习、旷野笔记
│   ├── reflection.js                随笔
│   ├── research.js                  研究项目详情
│   ├── experience.js                竞赛、实习
│   └── contact.js                   联系方式
│
├── components/
│   ├── Navbar.jsx                   5 空间导航 + 联系入口
│   ├── ProgressBar.jsx              页面滚动进度条
│   ├── ConsoleEasterEgg.jsx         控制台彩蛋
│   ├── Hero.jsx                     Hero 区域（TSP 背景 + 文字粒子 + 旋转装饰文字）
│   ├── Footer.jsx                   页脚
│   ├── About.jsx                    关于我
│   ├── Hobbies.jsx                  爱好展示
│   ├── Projects.jsx                 项目卡片
│   ├── Quotes.jsx                   名言轮播
│   ├── AlgorithmNarrative.jsx       算法叙事过渡
│   ├── ParallaxTextCloud.jsx        Canvas 2D 文字粒子云
│   ├── WebGLShaderOverlay.jsx       WebGL 水波着色器
│   ├── RandomMumbling.jsx           随机碎碎念
│   ├── ThinkingTree.jsx             思考树可视化
│   ├── ReadingProgress.jsx          阅读进度条
│   ├── QuoteBox.jsx                 引用框
│   ├── Card.jsx                     卡片组件
│   ├── CursorRing.jsx               鼠标光环
│   ├── NumberScramble.jsx           数字跳动
│   ├──SceneReveal.jsx              场景揭示动画
│   ├── CinematicOverlay.jsx         电影感叠加层
│   ├── CinematicSection.jsx         电影感章节过渡
│   ├── CutTransition.jsx            剪辑式转场
│   ├── FilmFrame.jsx                胶片框
│   ├── FilmSprocket.jsx             胶片齿孔
│   ├── PaperTexture.jsx             纸质感纹理
│   ├── Timeline.jsx                 时间线
│   ├── poker-flip.jsx               扑克翻转卡片（3D + spring easing）
│   ├── interactive.jsx              交互组件（TiltCard）
│   ├── ui.jsx                       UI 基础（Divider / SkillTags / InfoCard）
│   ├── decorations.jsx              SVG 装饰元素
│   ├── lusion-effects.jsx           Lusion 风格效果
│   ├── micro-interactions.jsx       微交互
│   ├── page-themes.jsx              页面主题包装器
│   ├── theme-easter-eggs.jsx        页面动效彩蛋（BasketballBounce / EnergyGlow / InkWashReveal）
│   ├── optimization-playground.jsx  TSP 2-opt 算法可视化
│   ├── space/
│   │   └── index.jsx                共享动画组件（FadeIn / SlowIn / ScrollReveal / SectionLabel / AccentLine）
│   └── layout/
│       ├── ContentGrid.jsx          内容网格容器
│       └── PageHeader.jsx           页面标题
│
├── literature/                      文学空间
│   ├── page.jsx                     入口（三个展馆）
│   ├── poetry/page.jsx              诗词空间
│   ├── poetry/[author]/             诗人详情页
│   ├── books/page.jsx               阅读档案馆
│   └── cinema/page.jsx              电影档案馆
│
├── athletic/page.jsx                运动空间
├── voyage/page.jsx                  旷野空间
├── reflection/page.jsx              沉思空间
│
├── research/                        研究（layout.js → .page-research）
│   ├── page.jsx
│   ├── l2o/page.mdx                 Learning to Optimize
│   ├── vrp/page.mdx                 车辆路径问题
│   ├── reading-list/page.mdx        阅读清单
│   └── ideas/page.mdx               研究想法
│
├── study/                           学习笔记（layout.js → .page-study）
│   ├── page.jsx                     扑克牌翻转卡片入口
│   ├── optimization/page.mdx        最优化
│   ├── ml-dl/page.mdx               机器学习/深度学习
│   ├── math/page.mdx                数学
│   ├── management/page.mdx          管理学
│   └── interdisciplinary/page.mdx   跨学科
│
├── internship/                      实习经历（→ .page-internship）
│   ├── page.jsx
│   ├── cxmt/page.jsx                超新星
│   ├── shuibao/page.jsx             水保
│   ├── supply-chain-project/page.mdx
│   ├── ad-algorithm-notes/page.mdx
│   └── reflection/page.mdx
│
├── competition/                     竞赛（→ .page-competition，[slug] 动态路由）
├── diary/                           日记（→ .page-diary）
├── learning/                        学习笔记列表
├── llm-agent/                       LLM Agent 笔记
├── playground/                      TSP 算法游乐场
├── search/                          全文搜索（fuse.js）
├── contact/                         联系方式
├── about/                           关于页面
│
├── hooks/
│   └── useMousePosition.js          鼠标位置追踪 Hook
│
└── lib/
    ├── markdown.js                  MDX 加载 + frontmatter 解析
    └── poetry.js                    诗词工具函数
```

```
content/                             独立 Markdown 内容文件
├── competition/                     竞赛详情（first-competition.md）
├── diary/                           日记条目
├── internship/                      实习详情（cxmt.md / shuibao.md）
├── llm-agent/                       LLM Agent 条目
├── research/                        研究详情（drone-inspection-lrp.md / l2o.md / vrp.md）
└── study/                           学习笔记（math.md / optimization.md）

data/                                JSON 数据
├── hobbies.json                     爱好数据
├── personal-quotes.json             个人名言
├── projects.json                    项目数据
├── quotes.json                      名言库
└── timeline.json                    时间线

public/                              静态资源
├── wechat-qr.jpg                    微信二维码
└── 布鲁森个人宣传册_中文_0131.pdf    个人宣传册
```

---

## 构建与部署

```bash
npm run dev        # 开发 (Turbopack, localhost:3000)
npm run build      # 生产构建 (静态导出至 out/)
npm run start      # 预览构建结果
```

静态导出配置在 `next.config.mjs`：`output: "export"`，图片使用 `unoptimized`，MDX 通过 `@next/mdx` 编译。

GitHub Actions 自动部署，工作流配置在 `.github/workflows/deploy.yml`。

---

## 设计系统

### 全局设计令牌（`:root`）

| 变量 | 值 | 用途 |
|---|---|---|
| `--bg` | `#0a0a0a` | 全局背景 |
| `--text` | `#e8e8e8` | 正文色 |
| `--muted` | `#666666` | 辅助灰 |
| `--brand` | `#e63946` | 瑞士红品牌色 |
| `--accent` | `#c8c8c8` | 辅助色 |
| `--surface` | `#141414` | 卡片底色 |
| `--surface-border` | `#222222` | 卡片边框 |

### 空间色板系统

每套空间色板定义在 `globals.css` 的 `.space-*` 类中：

| 变量 | 用途 |
|------|------|
| `--sp-bg` | 空间背景 |
| `--sp-text` | 正文色 |
| `--sp-muted` | 辅助灰 |
| `--sp-accent` | 强调色 |
| `--sp-brand` | 品牌色 |
| `--sp-surface` | 卡片底色 |
| `--sp-surface-border` | 卡片边框 |
| `--sp-grain` | 胶片颗粒强度 |
| `--sp-font` | 空间专属字体 |

### 页面主题色（`.page-*`）

深层页面（study / research / diary / internship / competition）继承自空间色板，通过 `.page-*` CSS 类覆盖主题色：

| CSS 类 | 页面 | 主色 |
|---|---|---|
| `.page-study` | 学习笔记 | 灰橙 `#c9917a` |
| `.page-research` | 研究 | 灰紫 `#8a7eb5` |
| `.page-diary` | 日记 | 灰青 `#5cb5ad` |
| `.page-internship` | 实习 | 灰蓝 `#7a9ec9` |
| `.page-competition` | 竞赛 | 灰青 `#5fb8b0` |

---

## 如何添加内容

所有内容数据在 `app/data/` 目录下，修改对应文件即可：

- 加一首诗 → `data/literature.js` → `poems` 数组
- 加一本书 → `data/literature.js` → `bookClusters` 对应集群的 `books` 数组
- 加一部电影 → `data/literature.js` → `films` 数组
- 加一条训练记录 → `data/athletic.js` → `trainingLog` 数组
- 加一个竞赛 → `data/experience.js` → `competitions` 数组
- 加一篇随笔 → `data/reflection.js` → `thoughts` 数组
- 改联系方式 → `data/contact.js`

MDX 子页面（研究笔记 / 学习笔记 / 实习记录 / 日记）直接在对应 `page.mdx` 文件中编写 Markdown 内容即可，路由和布局由 `layout.js` 和 metadata 自动生成。