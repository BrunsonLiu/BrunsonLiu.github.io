export const profile = {
  name: "Brunson",
  role: "算法工程师 & 研究者",
  bio: "武汉大学管理科学本科 → 中国科学技术大学管理科学与工程硕士（2026 入学）。组合优化、车辆路径问题与 Learning to Optimize。",
  keywords: ["Learning to Optimize", "车辆路径优化", "供应链管理", "深度学习"],
  contacts: {
    github: { label: "GitHub", url: "https://github.com/BrunsonLiu" },
    email: { label: "Email", url: "mailto:brunson@brunsonliu.com" },
    wechat: { label: "公众号", text: "永远别说永远", image: "/wechat-qr.jpg" },
    cv: { label: "简历 PDF", url: "/武汉大学 刘元辛 中文_0131.pdf" },
  },
};

export const education = [
  { degree: "管理科学（商业分析） 学士", school: "武汉大学", period: "2022 – 2026" },
  { degree: "管理科学与工程 硕士", school: "中国科学技术大学", period: "2026 – 2029", status: "next" },
];

export const researchAreas = [
  { title: "Learning to Optimize", desc: "用神经网络学习组合优化问题的求解策略，替代手工设计的启发式算法。", tag: "L2O" },
  { title: "车辆路径问题", desc: "面向物流配送、无人机巡检、供应链网络的高效路径优化算法。", tag: "VRP" },
  { title: "供应链优化", desc: "端到端的供应链设计与运营优化框架，处理需求不确定性与设施选址决策。", tag: "SCM" },
];

export const skills = {
  "优化求解": ["Gurobi", "CPLEX", "OR-Tools", "元启发式"],
  "机器学习": ["PyTorch", "深度强化学习", "Transformer"],
  "编程语言": ["Python", "C++", "Java", "SQL"],
  "工具链": ["LaTeX", "Git", "Linux", "Docker"],
};

export const projects = [
  {
    id: "drone-lrp",
    title: "分布式光伏电站多无人机协同巡检",
    subtitle: "双目标选址-路径优化研究",
    label: "本科毕设",
    period: "2026",
    desc: "面向分布式光伏电站多机自动化巡检场景，解决机巢选址、任务分配、路径规划一体化联合优化问题。构建MILP模型，设计MO-ACO-ALNS混合智能优化算法。",
    tags: ["LRP", "MO-ACO", "ALNS", "Gurobi"],
    detail: `【背景】分布式光伏电站规模大、分布散、人工巡检成本高。用无人机替代人工是趋势，但问题随之而来：无人机续航有限，需要在合适位置部署机巢供充电/起降；每个电站巡检时长不同，需要合理分配任务；路径规划影响总完工时间。选址、分配、路径三者强耦合——选址决定了分配和路径，路径成本又反过来影响选址的优劣。

【建模】抽象为双目标定位-路径问题(LRP)，构建混合整数线性规划(MILP)模型——最小化总飞行距离 + 最小化巡检完成时间Cmax。

【算法】MO-ACO-ALNS混合算法：主框架多目标蚁群(MO-ACO)搭配三层信息素架构（机场选择→任务分配→路径序列），嵌入ALNS的瓶颈移除、Cmax感知插入等专用算子，双层非支配档案+自适应权重+信息素重启策略平衡探索与开发。

【实验】Prodhon CLRP基准 + 常州市分布式光伏地理数据。对比NSGA-II / SPEA2 / MOPSO / MOEA/D / Gurobi。在超体积(HV)、Pareto前沿覆盖度、收敛速度、求解稳定性上均显著优势。机场数量K敏感性分析揭示非线性影响与边际效益递减规律。`,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=abstract%20aerial%20drone%20view%20of%20infrastructure%20inspection%2C%20dark%20blue%20background%2C%20minimal%20geometric%20lines%2C%20research%20paper%20illustration%20style&image_size=landscape_16_9",
  },
  {
    id: "ors",
    title: "生鲜冷链仓网布局优化",
    subtitle: "中国运筹学会竞赛 · 队长",
    label: "竞赛项目",
    period: "2025",
    desc: "在需求不确定的情况下最小化仓储+运输+损耗总成本。构建两阶段随机规划模型，CPLEX+MPC+场景树联合求解，担任队长协调建模/编程/论文三线并行。",
    tags: ["随机规划", "CPLEX", "MPC", "供应链"],
    detail: `【背景】生鲜电商面临的核心物流难题：仓库建在哪、建几个、怎么配送到末端——每个决策都影响成本和时效。更麻烦的是，生鲜需求波动大（季节、天气、促销），需求预测不准，必须提前考虑不确定性。

【建模】构建两阶段随机规划模型：min Σcᵢⱼxᵢⱼ + E[Q(x,ξ)]，第一阶段仓库选址决策，第二阶段需求实现后的配送补偿。

【求解】CPLEX精确求解确定性等价模型 + MPC模型预测控制滚动优化 + 场景树离散化需求分布。

【队长工作】协调建模/编程/论文三线并行，拆解赛题→分配模块→设定里程碑，每日早会同步进度识别阻塞点。`,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=abstract%20supply%20chain%20network%2C%20cold%20chain%20logistics%2C%20warehouse%20optimization%2C%20dark%20background%2C%20geometric%20node%20connections&image_size=landscape_16_9",
  },
];

export const competitions = [
  {
    id: "mcm",
    name: "美赛 (MCM/ICM)",
    role: "建模手 · Finalist（全球前1%）",
    period: "2025",
    detail: `【赛题：奥运奖牌预测】
MCM/ICM是全球规模最大的大学生数学建模赛事。赛题要求构建数学模型预测各国在奥运会中的奖牌分布。

【为什么用零膨胀负二项回归(ZINB)】
奥运奖牌数据最显著的特征是大量零值——绝大多数国家在单届奥运会获奖牌数为0。标准Poisson或负二项回归假设零值和正值来自同一数据生成过程，无法区分"压根不具备夺牌实力"和"有实力但恰好没发挥好"这两种零。ZINB将建模拆为两层：第一层用logit模型估计"是否能获得奖牌"（处理零膨胀），第二层用负二项回归预测"能获得多少奖牌"（处理计数数据的过离散）。这种结构与奥运奖牌的产生机制天然吻合。

【方法链】
特征工程：经济(GDP)、人口、历史奖牌数、主办国效应等。
基础模型：ZINB处理零膨胀+过离散。
提升模型：XGBoost + 贝叶斯优化捕捉非线性特征交互与超参数自动调优。
模型融合：Stacking集成，综合多模型优势。`,
    tags: ["ZINB", "XGBoost", "贝叶斯优化", "Python"],
  },
  {
    id: "shuwei",
    name: "数维杯国际赛",
    role: "建模手 · Finalist",
    period: "2024",
    detail: `【赛题】地理空间数据插值——利用有限采样点推断整个区域的连续空间分布。比如在某个区域的土壤采样中，只在几个离散位置测量了重金属含量，需要推断整个区域的污染分布图。

【为什么用克里金】空间数据不是独立的——离得近的点取值相似，离得远的点差异大。普通回归假设样本独立，会丢失这种空间结构。克里金的核心思想是用变异函数（variogram）建模空间自相关：半方差随距离增大而增大，直到达到某个阈值（sill）后不再增长（range之外的点互相独立）。然后利用这个空间结构做最优无偏线性预测。

【为什么用协同克里金而非普通克里金】普通克里金只用目标变量自身的空间相关性。协同克里金可以引入辅助变量（如高程、植被指数），利用交叉变异函数建模辅助变量与目标变量的空间协同关系。如果辅助变量采样密度远高于目标变量，能显著提升估计精度——相当于用密集的辅助数据给稀疏的目标数据「补课」。

【为什么融合CNN】克里金擅长建模空间结构的全局趋势，但对多源栅格数据中的非线性纹理特征不敏感。CNN的卷积核天然适合提取空间局部特征——边缘、纹理、多通道之间的复杂关联。但CNN是纯粹的 data-driven 方法，没有地统计学的无偏性和方差评估。融合的思路是：CNN提取非线性特征→克里金对CNN残差做空间插值→加权融合。这样克里金保证全局空间趋势不被破坏，CNN补充局部细节。最终空间插值误差降低3.5%。`,
    tags: ["协同克里金", "CNN", "空间插值", "地统计"],
  },
];

export const internships = [
  {
    id: "cxmt",
    name: "CXMT · 长鑫存储",
    role: "运筹优化算法实习生",
    period: "2026春",
    detail: `【背景】长鑫存储(CXMT)是国内领先的DRAM制造商。实习期间参与两个方向的工作：集成电路设计阶段的电路参数优化，以及生产运营阶段的产能规划。

【方向一：集成电路电路参数优化】
传统人工调优效率低、多目标权衡难度大、仿真成本高。用SQL抽取仿真数据，Python完成数据清洗/标准化/可视化，参与开源优化框架工程化落地与接口封装，协助搭建电路优化实验平台。调研黑盒优化、强化学习等前沿技术。
技术难点：高维黑盒、多约束多目标问题——通过约束嵌入、代理模型应用应对；仿真成本高——代理模型替代部分仿真降低评估成本。

【方向二：半导体产能规划】
传统人工决策易出错、流程不规范、评估周期长。协助完成算法逻辑实现、联调测试和版本上线，参与机台负载分配、资源匹配等核心功能的代码编写。
技术难点：大规模决策求解、复杂关系建模——理解"规则+优化"的工程思路，将业务问题抽象为数学模型。`,
    tags: ["集成电路", "黑盒优化", "产能规划", "Python"],
  },
  {
    id: "sibao",
    name: "丝宝集团",
    role: "数据分析师实习生",
    period: "2024 暑",
    detail: `【背景】丝宝集团是日化与卫生用品领域的大型企业。实习期间在电商数据部门，负责投放优化、用户分析和销售预测三块工作——本质是用数据提高电商运营效率。

【巨量千川投流优化】STL分解定位关键转化点 → 提升投放ROI。数据驱动的投流策略迭代优化投放效率。

【用户画像建模】K-means聚类实现精准用户分层，多维度特征工程构建画像标签体系，支持精准营销。

【时间序列预测】ARIMA + GARCH建模新增会员预测，GARCH捕捉数据波动特征，提升预测精度。

【技术栈】Python + SQL + STL分解 + K-means + ARIMA/GARCH。`,
    tags: ["STL", "K-means", "ARIMA", "GARCH"],
  },
];

export const spaces = [
  { name: "文学", href: "/literature", desc: "诗歌、书籍、电影", palette: "#1a1714", accent: "#c9a96e" },
  { name: "运动", href: "/athletic", desc: "跑步、篮球、自律", palette: "#050505", accent: "#ff3b30" },
  { name: "旅行", href: "/voyage", desc: "远方、语言、自然", palette: "#111419", accent: "#c9a96e" },
  { name: "沉思", href: "/reflection", desc: "随笔、笔记、安静", palette: "#0a0a0a", accent: "#888888" },
];