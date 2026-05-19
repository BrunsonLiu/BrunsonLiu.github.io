# 主页更新指南

本文档说明如何在不修改代码的情况下更新你的个人主页内容。

---

## 📁 数据文件位置

所有可编辑内容都存放在 `data/` 目录下，使用 JSON 格式：

```
brunson.github.io/
├── data/
│   ├── projects.json      ← 项目展示
│   ├── hobbies.json       ← 兴趣爱好
│   └── timeline.json      ← 时间线
├── content/               ← Markdown 文章
│   ├── study/
│   ├── research/
│   ├── diary/
│   └── ...
└── app/
    └── components/        ← 组件（通常不需要修改）
```

---

## 🔄 更新项目 (Featured Projects)

**文件位置:** `data/projects.json`

**如何更新:**
1. 打开 `data/projects.json`
2. 修改、添加或删除项目

**字段说明:**
```json
{
  "title": "项目名称",
  "desc": "项目简介",
  "icon": "图标名称 (brain/route/chart)",
  "tags": ["标签1", "标签2"]
}
```

**示例 - 添加新项目:**
```json
{
  "title": "新的项目名称",
  "desc": "这是一个很酷的新项目",
  "icon": "brain",
  "tags": ["Python", "AI", "Web"]
}
```

**可用图标:**
- `brain` - 大脑（AI/学习相关）
- `route` - 路线（路径规划/导航）
- `chart` - 图表（数据分析/优化）

---

## 🎮 更新兴趣爱好 (Hobbies)

**文件位置:** `data/hobbies.json`

**如何更新:**
1. 打开 `data/hobbies.json`
2. 修改爱好信息

**字段说明:**
```json
{
  "title": "爱好英文名称",
  "subtitle": "爱好中文名称",
  "description": "简短描述",
  "details": ["详情1", "详情2", "详情3"],
  "icon": "图标名称 (gamepad/trending/basketball/running)",
  "theme": {
    "primary": "主要颜色 (#HEX)",
    "secondary": "次要颜色 (#HEX)",
    "gradient": ["渐变色1", "渐变色2"]
  }
}
```

**可用图标:**
- `gamepad` - 游戏手柄（英雄联盟）
- `trending` - 趋势图（股市交易）
- `basketball` - 篮球
- `running` - 跑步

**推荐颜色方案:**
- 英雄联盟: primary="#C89B3C", secondary="#0AC8B9"
- 股市交易: primary="#00C853", secondary="#FF1744"
- 篮球NBA: primary="#F57C00", secondary="#5C2D91"
- 长跑: primary="#00BCD4", secondary="#4CAF50"

---

## 📝 更新文章内容

**文件位置:** `content/` 目录

**如何添加新文章:**

1. 找到对应分类目录：
   - 学习文章 → `content/study/`
   - 研究笔记 → `content/research/`
   - 日记随笔 → `content/diary/`
   - 实习经历 → `content/internship/`
   - 竞赛记录 → `content/competition/`
   - LLM/Agent → `content/llm-agent/`

2. 创建新的 `.md` 文件，例如 `content/study/new-topic.md`

3. 使用以下模板：
```markdown
---
title: "文章标题"
description: "文章简介（可选）"
---

# 文章标题

这里是文章内容...
```

4. **文件名会自动成为 URL slug**，例如：
   - 文件：`content/research/my-research.md`
   - URL: `/research/my-research`

**如何修改现有文章:**
- 直接编辑对应的 `.md` 文件即可

---

## 📄 更新日记/爱好页面

**文件位置:** `app/diary/hobbies/page.mdx`

这是你的爱好详情页，使用 MDX 格式（Markdown + 组件）。

**如何更新:**
1. 打开 `app/diary/hobbies/page.mdx`
2. 直接编辑 Markdown 内容
3. 可以使用标准 Markdown 语法：
   - `# 标题`
   - `**加粗**`
   - `- 列表项`
   - `> 引用`
   - `[链接](url)`

---

## 🎨 更新网站样式

**文件位置:** `app/globals.css`

**常用自定义变量:**
```css
:root {
  --bg: 背景颜色
  --text: 文字颜色
  --muted: 次要文字颜色
  --brand: 主题色
  --surface: 卡片背景色
}
```

**修改主题色示例:**
```css
:root {
  --brand: #ff6b6b;  /* 改为红色主题 */
}
```

---

## 🧭 更新导航菜单

**文件位置:** `app/components/Navbar.jsx`

**如何添加新导航项:**

找到 `navLinks` 数组并添加新项：
```javascript
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  // 添加新项
  { href: "/新路由", label: "新页面名称" },
  ...
];
```

**注意:** 添加新导航项后，需要确保对应的页面文件夹已存在于 `app/` 目录中。

---

## 🚀 部署更新

每次更新内容后，需要重新部署：

```bash
# 1. 提交更改
git add .
git commit -m "更新: 描述你做了什么"

# 2. 推送到 GitHub
git push origin main

# 3. GitHub Actions 会自动构建并部署
```

**本地预览:**
```bash
npm run dev
```
然后访问 `http://localhost:3000` 查看效果

---

## 📊 更新 About Me

**文件位置:** `app/components/About.jsx`

**如何更新:**
- 直接修改组件中的文字内容

---

## 📈 添加新的分类页面

如果你想添加类似 Research/Diary 的页面：

**方法 1: 使用现有模板**

1. 复制 `app/diary/page.jsx` 到新位置
2. 修改 `diaryTopics` 数组
3. 在 `content/` 创建对应目录

**方法 2: 创建全新页面**

1. 在 `app/` 下创建新文件夹，如 `app/newpage/`
2. 创建 `page.jsx` 文件
3. 在导航栏添加链接

---

## ✅ 常见更新清单

| 想更新什么 | 修改哪里 | 难度 |
|-----------|---------|------|
| 添加/修改项目 | `data/projects.json` | ⭐ |
| 更新爱好信息 | `data/hobbies.json` | ⭐ |
| 写新文章 | `content/分类/新文件.md` | ⭐⭐ |
| 修改爱好详情 | `app/diary/hobbies/page.mdx` | ⭐⭐ |
| 更新关于我 | `app/components/About.jsx` | ⭐ |
| 添加导航链接 | `app/components/Navbar.jsx` | ⭐⭐ |
| 修改主题色 | `app/globals.css` | ⭐⭐ |
| 添加新页面 | 创建 `app/新页面/page.jsx` | ⭐⭐⭐ |

---

## 🆘 遇到问题？

- 检查 JSON 文件格式是否正确（逗号、引号、括号匹配）
- 运行 `npm run dev` 查看错误信息
- 确保文件名使用小写和连字符（如 `my-new-article.md`）

---

*最后更新: 2026-04-18*
