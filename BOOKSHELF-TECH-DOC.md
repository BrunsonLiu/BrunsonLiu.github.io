# 书架页面技术实现文档

> 本文档如实记录 `/literature/books` 页面的 3D Cover Flow 书架 + 读书笔记面板的完整技术实现路线，供审查参考。

---

## 一、整体架构

```
app/literature/books/page.jsx    ← 主组件（客户端渲染 "use client"）
app/data/literature.js            ← 数据源（bookClusters：5 个分类、13 本书）
app/globals.css                  ← 样式（section 10-11：cf-* 类名空间）
public/images/books/              ← 13 张手动下载的封面图（jpg 格式）
```

**技术栈**：React (Next.js 15 App Router) + Framer Motion 动画 + CSS 3D Transforms

---

## 二、3D Cover Flow 书架

### 2.1 设计参考

用户提供的参考：`https://codepen.io/mcli/pen/VwYeNwW`（3D Bookshelf Cover Flow）

核心特征：
- 中间书本正对观众，两侧书本向内旋转（Y 轴旋转）
- 每本书下方有倒影（reflection / mirror effect）
- 远处书本缩小 + 变暗 + 向后推移
- 点击中间书本打开详情

### 2.2 数据结构

```js
// bookClusters 来自 literature.js，原始结构是 5 个 cluster（分类）：
//   - "生命的韧性"：我与地坛、病隙碎笔
//   - "余华的刀"：活着、许三观卖血记、在细雨中呼喊
//   - "出走与回归"：Educated、追风筝的人
//   - "月亮与六便士"：月亮与六便士
//   - "荒诞与现实"：百年孤独、围城、小王子、三体、1984

// flattenBooks() 把所有 cluster 展平成一个数组，每本书携带：
{
  title, author, reflection, quotes,  // 原始数据
  clusterId, clusterTitle, clusterThought,  // 分类元信息
  idx,          // 全局索引 0-12
  cover: "/images/books/xxx.jpg",  // 封面图路径
}
```

共 **13 本书**，不再按分类分组展示，全部在一个 Cover Flow 里。

### 2.3 3D 定位算法

核心函数 `getBookPosition(i, activeIdx, total)`：

```js
function getBookPosition(i, activeIdx, total) {
  const dist = i - activeIdx;        // 相对活跃索引的距离（负=左，正=右）
  const absDist = Math.abs(dist);

  const rotateY = dist * 58;           // Y轴旋转角度，每本 ±58°
  const translateZ = -absDist * 140;    // Z轴深度，越远越往后推
  const translateX = dist * 210;        // X轴间距，每本偏移 210px

  // 缩放：根据距离衰减
  let scale;
  if (absDist === 0) scale = 1;         // 当前：100%
  else if (absDist === 1) scale = 0.78;  // 紧邻：78%
  else if (absDist === 2) scale = 0.6;   // 第2层：60%
  else if (absDist === 3) scale = 0.44;  // 第3层：44%
  else scale = 0.32;                     // 更远：32%

  // 透明度：根据距离衰减
  let opacity;
  if (absDist <= 1) opacity = 1;
  else if (absDist === 2) opacity = 0.5;
  else if (absDist === 3) opacity = 0.22;
  else opacity = 0.06;

  return { rotateY, translateZ, translateX, scale, opacity, zIndex: total - absDist };
}
```

**关键参数一览**：

| 参数 | 值 | 说明 |
|---|---|---|
| `rotateY` 步进 | 58° | 两侧书本的倾斜角 |
| `translateZ` 步进 | -140px | Z轴深度递减 |
| `translateX` 步进 | 210px | X轴水平间距 |
| 外层 `perspective` | 1800px | 整体透视距离 |
| 书本自身 `perspective` | 800px | 单书内部3D |
| `transform-origin` | center center | 旋转中心在书本中心 |

### 2.4 DOM 结构

```
.cf-stage                    ← 容器
  .cf-viewport               ← 视口（高度 560/620px）
    .cf-carousel             ← 3D轮播容器（perspective: 1800, height: 520/580px）
      .cf-carousel-fade-l   ← 左侧渐变遮罩（淡入背景色）
      .cf-carousel-fade-r   ← 右侧渐变遮罩

      .cf-book-wrapper      ×13 ← 每本书的包装层（absolute定位, left:50%）
        motion.button       ← 可点击的书本（framer-motion 驱动动画）
          .cf-book-front   ← 封面（translateZ(12px) 推向前方）
            img            ← 封面图
            .cf-cover-overlay  ← 底部渐变遮罩
            .cf-cover-label    ← 底部书名文字
          .cf-book-spine     ← 书脊侧面（rotateY(-90deg), 宽24px 渐变）

        motion.div           ← 倒影（同样的动画参数，opacity×0.15）
          img                ← 同一张封面图 scaleY(-1)
          mask-image          ← 从上到下渐变消失

  .cf-ground-line            ← 地面线（1px 细线）
  .cf-ground-glow           ← 地面光晕（radial-gradient）
```

### 2.5 3D 实现方式（当前方案）

**CSS 3D Transforms 方案**：

1. `.cf-book` 设置 `transform-style: preserve-3d` + `perspective: 800px`
2. 封面 `.cf-book-front` 用 `transform: translateZ(12px)` 推向观察者
3. 书脊 `.cf-book-spine` 用 `transform: rotateY(-90deg) translateZ(12px)` 旋转90°作为厚度
4. Framer Motion 的 `animate={{ rotateY, translateX, scale, z }}` 驱动每一帧的位置
5. Spring 物理动画：`stiffness: 90, damping: 22, mass: 1.5`

**倒影实现**：
- 每本书下方有一个独立的 `motion.div`，使用完全相同的动画参数
- 内部 img 用 `transform: scaleY(-1)` 翻转
- 外层用 `mask-image: linear-gradient(to bottom, rgba(0,0,0,0.35), transparent 65%)` 渐隐

### 2.6 交互

- **键盘**：← → 切换书籍（ArrowLeft / ArrowRight）
- **鼠标**：点击非活跃书籍 → 跳转到那本；点击活跃书籍 → 打开笔记面板
- **导航按钮**：底部 ← → 按钮 + 页码计数器（01/13 格式）
- **入场动画**：SlowIn 组件逐级延迟（0.06s → 0.12s → 0.2s → 0.35s → 0.48s）

### 2.7 当前尺寸参数

| 元素 | 移动端 | 桌面端 |
|---|---|---|
| 视口高度 | 460px | 620px |
| 轮播高度 | 420px | 580px |
| 书本宽度 | 90px | 最大 230px |
| 书本高度 | 128px | 最大 324px |
| 书脊宽度 | 24px | 24px |

---

## 三、读书笔记面板（Modal）

### 3.1 触发方式

点击 Cover Flow 中间（active）的书本时，`setSelectedBook(book)` 打开面板。

### 3.2 面板结构

```
AnimatePresence
  ├─ .cf-panel-overlay          ← 半透明黑色遮罩（blur backdrop-filter）
  └─ .cf-panel-wrapper         ← 面板容器（fixed定位, inset:0, flex居中）
       └─ div（实际卡片）
            ├─ button.cf-panel-close    ← 右上角关闭按钮（毛玻璃圆圈）
            │
            ├─ .cf-panel-header          ← 头部（grid: 封面140px + 文字）
            │    ├─ img.cf-panel-cover-img   ← 封面缩略图（aspect-ratio 3/4）
            │    └─ .cf-panel-header-text
            │         ├─ span.cf-panel-tag   ← 分类标签（如"生命的韧性"）
            │         ├─ h2.cf-panel-name    ← 书名
            │         └─ p.cf-panel-writer   ← 作者
            │
            ├─ .cf-panel-body              ← 主体内容区（可滚动！overflow-y:auto）
            │    ├─ section.cf-section       ← 思考区
            │    │    ├─ h3.cf-section-label  ← "思考"
            │    │    └─ div.cf-section-content
            │    │         └─ p.cf-para ×N   ← 段落（reflection 按 \n\n 分割）
            │    │
            │    ├─ section.cf-section-quotes  ← 摘抄区
            │    │    ├─ h3                 ← "摘抄"
            │    │    └─ div.cf-quote-list
            │    │         └─ blockquote.cf-quote ×N
            │    │              ├─ span.cf-quote-mark  ← 引号装饰 "
            │    │              └─ p.cf-quote-text     ← 引用文本
            │    │
            │    └─ section.cf-section-thought  ← 集群思考（可选）
            │         └─ div.cf-thought-box      ← 金棕渐变高亮框
            │
            └─ .cf-panel-footer             ← 底部状态栏
                 ├─ "点击外部区域返回书架"
                 ├─ ·
                 └─ "N / 13"
```

### 3.3 面板样式特征

- **主题色**：深色 `#0f0e0c` 背景 + `#d4cfc6` 文字
- **最大尺寸**：`max-width: 52rem`, `max-height: 85vh`（超出滚动）
- **布局模式**：flex column（header 固定 + body flex:1 可滚 + footer 固定）
- **滚动条**：自定义 4px 宽细滚动条（webkit-scrollbar）
- **入场动画**：从下方滑入 + 缩放 `y:50→0, scale:0.96→1`, duration 450ms, ease [0.22,1,0.36,1]
- **关闭动画**：向上滑出 `y:30, scale:0.97`, duration 350ms

### 3.4 内容排版细节

| 元素 | 字号 | 行高 | 颜色 |
|---|---|---|---|
| 书名 h2 | 1.5rem (桌面 1.75rem) | 1.2 | #eee8dc |
| 思考段落 | 0.8125rem | 1.7 | #b8b0a3 |
| 摘抄引用 | 0.8125rem | 1.6 | #a09888 (斜体) |
| 集群思考 | 0.8125rem | 1.65 | #9a9285 (斜体) |
| Section标签 | 8px uppercase | — | var(--sp-accent) 金色 |

---

## 四、已知问题与局限

### 4.1 3D 效果方面

1. **书本厚度不够明显**：书脊只有 24px 宽度，且用纯 CSS 渐变模拟，不是真实纹理。当 rotateY 旋转角度不够大时，侧边几乎看不见。

2. **3D 只是视觉欺骗**：本质上还是 `rotateY` + `translateZ` 的平面变换。没有真正的光照、阴影投射、材质反射等高级 3D 效果。

3. **背面没有内容**：`.cf-book-back` 定义了但未在 JSX 中渲染（目前只有 front + spine）。背面对用户不可见所以影响不大。

4. **倒影和本体可能错位**：倒影是一个独立元素做同样动画，在某些边界情况下（快速切换时）可能出现微小不同步。

5. **perspective 双重设置**：外层 carousel 设了 `perspective: 1800`，每本书又设了 `perspective: 800`，两个 perspective 可能产生复合效果导致变形不一致。

6. **书本数量固定为 13**：如果后续增删书籍，需要同时更新 `BOOK_COVERS` 数组和 `literature.js` 的数据，两者靠 index 对应，没有绑定关系，容易出错。

### 4.2 面板方面

1. **内容太长**：部分书的 reflection 有 3-4 个长段落，加上 3-5 条摘抄，总高度远超 85vh。虽然加了滚动，但体验不理想——用户需要在一个小窗口里滚很多。

2. **字体大小在小屏上可能过小**：思考段落 0.8125rem 在手机上约 13px，阅读体验一般。

3. **面板没有拖拽/resize**：只能通过点击外部区域关闭，不能拖拽移动或调整大小。

4. **没有键盘支持**：面板打开后 ESC 不能关闭（只处理了 overlay click）。

5. **封面图加载无 fallback**：如果某张图片缺失或路径错误，会显示裂图，没有占位符或 loading 状态。

### 4.3 性能方面

1. **13 本书 × 2 个元素（本体+倒影）= 26 个 framer-motion 动画节点**，每个都在监听 activeIdx 变化重新计算位置。切换时 26 个元素同时执行 spring 动画。

2. **封面图没有懒加载**：13 张图片在页面加载时全部请求（虽然已经在 public 目录下是本地文件）。

3. **AnimatePresence** 在每次开关面板时都会 mount/unmount 整个面板组件树。

---

## 五、文件清单

| 文件 | 行数 | 职责 |
|---|---|---|
| `app/literature/books/page.jsx` | ~310 | 主组件：Cover Flow + 面板逻辑 |
| `app/data/literature.js` | ~300 | 数据源：bookClusters + poems |
| `app/globals.css` section 10-11 | ~250行 | 所有 cf-* 样式 |
| `public/images/books/*.jpg` | 13张 | 手动下载的真实封面图 |

---

## 六、迭代历史

1. **v1**：手风琴折叠列表（已废弃）
2. **v2**：静态木质书架（纯色书脊 + 竖排文字，已废弃）
3. **v3**：3D Cover Flow 初版（AI 生成封面图 via trae API，失败——全是占位图）
4. **v4**：改用 Open Library ISBN API（超时——网络不通）
5. **v5（当前）**：用户手动下载 13 张真实封面到本地 `/public/images/books/`，本地引用；加大尺寸 ~35%；加真 3D 书脊厚度；面板加滚动 + 紧凑排版
