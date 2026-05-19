export const researchProjects = [
  {
    title: "无人机巡检定位-路径联合优化",
    subtitle: "本科毕业设计",
    desc: "分布式光伏多无人机协同巡检——双目标选址-路径联合优化。MO-ACO-ALNS 混合算法，三层信息素架构实现端到端联合优化，效果显著优于 NSGA-II。",
    tags: ["MO-ACO", "ALNS", "MILP", "Pareto"],
    formula: "min Σdᵢⱼxᵢⱼ",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=abstract%20aerial%20drone%20view%20of%20infrastructure%20inspection%2C%20dark%20blue%20background%2C%20minimal%20geometric%20lines%2C%20research%20paper%20illustration%20style&image_size=landscape_16_9",
  },
  {
    title: "L2O 求解 VRP",
    subtitle: "硕士研究方向",
    desc: "跨 VRP 变体泛化的 Learning-to-Optimize 框架，无需针对新场景重新训练。GNN 编码 + PPO 求解，在大规模 VRP 上逼近 Gurobi。",
    tags: ["L2O", "VRP", "GNN", "PPO"],
    formula: "π(a|s) = softmax(W·h(s))",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=abstract%20neural%20network%20optimizing%20routing%20paths%2C%20dark%20background%2C%20glowing%20nodes%20and%20edges%2C%20minimal%20scientific%20illustration&image_size=landscape_16_9",
  },
  {
    title: "多目标黑盒优化",
    subtitle: "CXMT · 电路优化",
    desc: "20 维参数空间的黑盒优化，数据稀疏 + 仿真成本高。多保真贝叶斯优化 + NSGA2，搭建优化-仿真框架降低评估成本。",
    tags: ["BoTorch", "NSGA2", "多保真建模", "代理模型"],
    formula: "min f(x) s.t. x∈X",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=abstract%20multi%20objective%20optimization%20pareto%20front%2C%20dark%20background%2C%20curved%20surface%20with%20scattered%20points%2C%20minimal%20scientific%20illustration&image_size=landscape_16_9",
  },
  {
    title: "供应链网络设计",
    subtitle: "设施选址与运输决策",
    desc: "考虑需求不确定性的多级供应链优化，包含设施选址与运输决策。MILP 建模 + Gurobi 求解 + Benders 分解。",
    tags: ["SCM", "MILP", "Gurobi", "Benders"],
    formula: "min Σcᵢⱼxᵢⱼ + Σfᵢyᵢ",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=abstract%20supply%20chain%20network%20visualization%2C%20dark%20background%2C%20connected%20nodes%20and%20flow%20lines%2C%20minimal%20data%20visualization%20style&image_size=landscape_16_9",
  },
];
