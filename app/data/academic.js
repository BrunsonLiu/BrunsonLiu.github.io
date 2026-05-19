export const profile = {
  name: "Brunson",
  role: "算法工程师 & 研究者",
  bio: "武汉大学管理科学本科，即将进入中国科学技术大学攻读管理科学与工程硕士。专注于 Learning to Optimize、车辆路径问题与运筹学研究。",
  keywords: ["Learning to Optimize", "车辆路径优化", "供应链管理", "深度学习"],
};

export const education = [
  { degree: "管理科学与工程 硕士", school: "中国科学技术大学", period: "2026 – 2029" },
  { degree: "管理科学（商业分析） 学士", school: "武汉大学", period: "2022 – 2026" },
];

export const researchAreas = [
  {
    title: "Learning to Optimize",
    desc: "用神经网络学习组合优化问题的求解策略，替代手工设计的启发式算法。",
    tag: "L2O",
  },
  {
    title: "车辆路径问题",
    desc: "面向物流配送、无人机巡检、供应链网络的高效路径优化算法。",
    tag: "VRP",
  },
  {
    title: "供应链优化",
    desc: "端到端的供应链设计与运营优化框架，处理需求不确定性与设施选址决策。",
    tag: "SCM",
  },
];

export const skills = {
  "优化求解": ["Gurobi", "CPLEX", "OR-Tools", "元启发式"],
  "机器学习": ["PyTorch", "深度强化学习", "GNN", "Transformer"],
  "编程语言": ["Python", "C++", "Java", "SQL"],
  "工具链": ["LaTeX", "Git", "Linux", "Docker"],
};

export const projects = [
  {
    title: "无人机巡检定位-路径联合优化",
    desc: "基于强化学习的无人机基础设施巡检定位-路径联合优化方法。",
    tags: ["VRP", "RL", "PyTorch"],
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=abstract%20aerial%20drone%20view%20of%20infrastructure%20inspection%2C%20dark%20blue%20background%2C%20minimal%20geometric%20lines%2C%20research%20paper%20illustration%20style&image_size=landscape_16_9",
  },
  {
    title: "L2O 求解 VRP",
    desc: "跨 VRP 变体泛化的 Learning-to-Optimize 框架，无需针对新场景重新训练。",
    tags: ["L2O", "VRP", "Neural"],
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=abstract%20neural%20network%20optimizing%20routing%20paths%2C%20dark%20background%2C%20glowing%20nodes%20and%20edges%2C%20minimal%20scientific%20illustration&image_size=landscape_16_9",
  },
  {
    title: "供应链网络设计",
    desc: "考虑需求不确定性的多级供应链优化，包含设施选址与运输决策。",
    tags: ["SCM", "MILP", "Gurobi"],
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=abstract%20supply%20chain%20network%20visualization%2C%20dark%20background%2C%20connected%20nodes%20and%20flow%20lines%2C%20minimal%20data%20visualization%20style&image_size=landscape_16_9",
  },
];

export const spaces = [
  { name: "文学", href: "/literature", desc: "诗歌、书籍、电影", palette: "#1a1714", accent: "#c9a96e" },
  { name: "运动", href: "/athletic", desc: "跑步、篮球、自律", palette: "#050505", accent: "#ff3b30" },
  { name: "旷野", href: "/voyage", desc: "远方、语言、自然", palette: "#111419", accent: "#c9a96e" },
  { name: "沉思", href: "/reflection", desc: "随笔、笔记、安静", palette: "#0a0a0a", accent: "#888888" },
];
