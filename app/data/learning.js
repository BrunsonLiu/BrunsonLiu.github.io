export const learningTopics = [
  {
    id: "optimization",
    name: "Optimization",
    description: "理解决策的数学结构。",
    entries: [
      {
        id: "opt-1",
        date: "2026.05",
        insight: "Column generation 与 branch-and-price 的关系逐渐清晰——前者是后者的子程序，但两者的哲学不同：CG 是「懒计算」，B&P 是「分支+懒计算」的递归。",
        discovery: "这与 reinforcement learning 中的 action space pruning 有结构相似性——都是在巨大解空间中动态生成候选解，而非枚举。",
        status: "exploring",
      },
      {
        id: "opt-2",
        date: "2026.04",
        insight: "VRP 变体之间的本质差异往往不在于约束本身，而在于约束如何改变 cost-to-go 的结构。理解这一点比记住二十种变体的定义更有用。",
        discovery: "建模时从「决策变量 → 约束 → 目标函数」的顺序思考，比从问题分类出发更不容易遗漏。",
        status: "understood",
      },
      {
        id: "opt-3",
        date: "2026.03",
        insight: "Lagrangian relaxation 的美妙之处在于它把 hard constraints 转化为 soft penalties——这是一种对问题结构的「谈判」而非「强制执行」。",
        discovery: "",
        status: "understood",
      },
    ],
  },
  {
    id: "machine-learning",
    name: "Machine Learning",
    description: "理解从数据中学习的机制。",
    entries: [
      {
        id: "ml-1",
        date: "2026.05",
        insight: "Attention 本质上是一种动态信息路由机制——每个 token 根据自身状态，从其他 token 中「查询」相关信息。这不是记忆，是检索。",
        discovery: "这种 query-key-value 的框架在运筹优化中也隐约出现——比如在 large neighborhood search 中，destroy operator 的选择可以看作对解结构的 attention。",
        status: "exploring",
      },
      {
        id: "ml-2",
        date: "2026.04",
        insight: "深度学习中的 generalization gap 不能简单归因于 overfitting。多数情况下，模型是在「记忆训练分布」和「学习可泛化模式」之间找到了一个脆弱平衡。",
        discovery: "",
        status: "exploring",
      },
      {
        id: "ml-3",
        date: "2026.03",
        insight: "梯度下降的几何直觉——在高维空间中，local minima 其实很少，更多的是 saddle points。真正的瓶颈不是「陷进去」，而是「爬得慢」。",
        discovery: "这和优化中的 simplex 方法在几何上有有趣的对比——simplex 走的是边界，GD 走的是内部。",
        status: "understood",
      },
    ],
  },
  {
    id: "english",
    name: "English",
    description: "不只是在学语言，是在建立另一种思维节奏。",
    entries: [
      {
        id: "en-1",
        date: "2026.05",
        insight: "英语提升不仅是词汇量——真正让我感觉进步的是：开始能用英文做数学推导时的内心独白。语言切换的那一刻，思维结构也在变。",
        discovery: "播客中说话者的停顿、语气和表达习惯，比单词本身更值得关注。语言的节奏感是「语感」的核心。",
        status: "applying",
      },
      {
        id: "en-2",
        date: "2026.04",
        insight: "学术写作不是「把中文翻译成英文」，而是用英文的逻辑重新组织思想。两种语言的段落结构、论证顺序、甚至「什么是好的过渡句」都完全不同。",
        discovery: "读英文论文时，关注作者如何引入问题、如何过渡、如何收束——这比背单词有用十倍。",
        status: "applying",
      },
    ],
  },
  {
    id: "interdisciplinary",
    name: "Cross-Disciplinary",
    description: "最好的洞察往往发生在学科边界。",
    entries: [
      {
        id: "cross-1",
        date: "2026.05",
        insight: "优化、ML、经济学——三门学科在「如何在约束下做决策」这个问题上惊人地一致。差别在于：优化用数学规划，ML 用梯度，经济学用均衡。",
        discovery: "也许存在一个更底层的语言来描述「决策」这件事本身。如果找到了，这三门学科会突然变成同一个东西的不同方言。",
        status: "exploring",
      },
      {
        id: "cross-2",
        date: "2026.04",
        insight: "读书和读论文的差异：书给你框架，论文给你前沿。但真正有用的往往是两者之间的东西——框架让你不迷失，前沿让你不落伍。",
        discovery: "一个有效的学习循环：论文提出问题 → 书提供框架 → 回到论文验证 → 写下自己的理解。",
        status: "applying",
      },
    ],
  },
];
