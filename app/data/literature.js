export const poems = [
  {
    title: "沁园春·雪",
    author: "毛泽东",
    lines: [
      "北国风光，千里冰封，万里雪飘。",
      "望长城内外，惟余莽莽；",
      "大河上下，顿失滔滔。",
      "山舞银蛇，原驰蜡象，欲与天公试比高。",
      "须晴日，看红装素裹，分外妖娆。",
      "",
      "江山如此多娇，引无数英雄竞折腰。",
      "惜秦皇汉武，略输文采；",
      "唐宗宋祖，稍逊风骚。",
      "一代天骄，成吉思汗，只识弯弓射大雕。",
      "俱往矣，数风流人物，还看今朝。",
    ],
  },
  {
    title: "沁园春·长沙",
    author: "毛泽东",
    lines: [
      "独立寒秋，湘江北去，橘子洲头。",
      "看万山红遍，层林尽染；",
      "漫江碧透，百舸争流。",
      "鹰击长空，鱼翔浅底，万类霜天竞自由。",
      "怅寥廓，问苍茫大地，谁主沉浮？",
    ],
  },
  {
    title: "七律·长征",
    author: "毛泽东",
    lines: [
      "红军不怕远征难，万水千山只等闲。",
      "五岭逶迤腾细浪，乌蒙磅礴走泥丸。",
      "金沙水拍云崖暖，大渡桥横铁索寒。",
      "更喜岷山千里雪，三军过后尽开颜。",
    ],
  },
  {
    title: "念奴娇·昆仑",
    author: "毛泽东",
    lines: [
      "横空出世，莽昆仑，阅尽人间春色。",
      "飞起玉龙三百万，搅得周天寒彻。",
      "而今我谓昆仑：不要这高，不要这多雪。",
      "安得倚天抽宝剑，把汝裁为三截？",
    ],
  },
  {
    title: "卜算子·咏梅",
    author: "毛泽东",
    lines: [
      "风雨送春归，飞雪迎春到。",
      "已是悬崖百丈冰，犹有花枝俏。",
      "俏也不争春，只把春来报。",
      "待到山花烂漫时，她在丛中笑。",
    ],
  },
  {
    title: "水调歌头·重上井冈山",
    author: "毛泽东",
    lines: [
      "久有凌云志，重上井冈山。",
      "千里来寻故地，旧貌变新颜。",
      "可上九天揽月，可下五洋捉鳖，谈笑凯歌还。",
      "世上无难事，只要肯登攀。",
    ],
  },
  {
    title: "贺新郎·读史",
    author: "毛泽东",
    lines: [
      "人猿相揖别。只几个石头磨过，小儿时节。",
      "铜铁炉中翻火焰，为问何时猜得？",
      "一篇读罢头飞雪，但记得斑斑点点，几行陈迹。",
    ],
  },
  {
    title: "念奴娇·赤壁怀古",
    author: "苏轼",
    lines: [
      "大江东去，浪淘尽，千古风流人物。",
      "故垒西边，人道是，三国周郎赤壁。",
      "乱石穿空，惊涛拍岸，卷起千堆雪。",
      "人生如梦，一尊还酹江月。",
    ],
  },
];

export const bookClusters = [
  {
    id: "revolution",
    title: "革命与浪漫",
    excerpt: "俱往矣，数风流人物，还看今朝。",
    mood: "壮阔 · 热烈 · 历史",
    books: [
      { title: "活着", author: "余华", note: "读完很久缓不过来。活着本身就是意义。" },
    ],
    thought: "毛泽东的诗词里有一种别人写不出来的东西——不是文人的浪漫，是行动者的浪漫。他真的走过那些路，打过那些仗，然后写下来。所以每一句都有重量。",
  },
  {
    id: "wilderness",
    title: "旷野与孤独",
    excerpt: "在绝望里找到活着的理由，比任何哲学都管用。",
    mood: "沉静 · 内省 · 坚韧",
    books: [
      { title: "我与地坛", author: "史铁生", note: "在绝望里找到活着的理由，比任何哲学都管用。" },
      { title: "病隙碎笔", author: "史铁生", note: "生病的人写出来的东西，反而最清醒。" },
      { title: "追风筝的人", author: "Khaled Hosseini", note: "为你，千千万万遍。有些亏欠一辈子也还不清。" },
    ],
    thought: "史铁生让我知道，最深的思考不是来自图书馆，是来自病床。当身体困在一个地方，精神反而走得最远。",
  },
  {
    id: "heroism",
    title: "英雄主义",
    excerpt: "可上九天揽月，可下五洋捉鳖，谈笑凯歌还。",
    mood: "豪迈 · 不屈 · 信念",
    books: [
      { title: "许三观卖血记", author: "余华", note: "笑着笑着就哭了，余华最擅长这个。" },
      { title: "你当像鸟飞往你的山", author: "Tara Westover", note: "教育不是被塑造，是自己挣脱。" },
    ],
    thought: "真正的英雄主义不是不害怕，是害怕完了继续走。许三观卖血卖了一辈子，但他从来没倒下。",
  },
  {
    id: "classical",
    title: "中国古典诗性",
    excerpt: "大江东去，浪淘尽，千古风流人物。",
    mood: "悠远 · 苍凉 · 旷达",
    books: [
      { title: "红楼梦", author: "曹雪芹", note: "每个年龄段读都是不同的书。" },
    ],
    thought: "苏轼和曹雪芹，一个写尽了时间，一个写尽了人世。中国古典最厉害的地方是，它不说教，它只呈现，然后你自己悟。",
  },
  {
    id: "modernity",
    title: "现代性与荒诞",
    excerpt: "满地都是六便士，他抬头看见了月亮。",
    mood: "冷峻 · 讽刺 · 追问",
    books: [
      { title: "月亮与六便士", author: "毛姆", note: "满地都是六便士，他抬头看见了月亮。" },
      { title: "百年孤独", author: "马尔克斯", note: "时间是一个圆，孤独是唯一的常数。" },
      { title: "在细雨中呼喊", author: "余华", note: "记忆不是线性的，成长也不是。" },
    ],
    thought: "现代文学最打动我的，是它不给你答案。它只是把荒诞摆在你面前，然后沉默。你得自己找路。",
  },
  {
    id: "innocence",
    title: "纯真与宇宙",
    excerpt: "真正重要的东西，眼睛看不见。",
    mood: "温柔 · 纯粹 · 敬畏",
    books: [
      { title: "小王子", author: "圣埃克苏佩里", note: "真正重要的东西，眼睛看不见。" },
      { title: "三体", author: "刘慈欣", note: "宇宙很大，生活更大。黑暗森林让我失眠。" },
    ],
    thought: "小王子和三体，一个极小一个极大，但都在说同一件事——重要的东西不在表面。",
  },
];

export const films = [
  {
    title: "2001: A Space Odyssey",
    director: "Stanley Kubrick",
    year: "1968",
    note: "人类进化的终极寓言。从骨头到飞船，从沉默到沉默。",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=2001%20A%20Space%20Odyssey%20film%20still%2C%20minimalist%20space%20scene%2C%20widescreen%20cinematic%20composition%2C%20deep%20black%20space%2C%20cold%20blue%20light%2C%20Criterion%20Collection%20aesthetic&image_size=landscape_16_9",
  },
  {
    title: "Stalker",
    director: "Andrei Tarkovsky",
    year: "1979",
    note: "欲望、信仰与禁区。塔可夫斯基最慢的电影，也是最深的那部。",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Tarkovsky%20Stalker%20film%20still%2C%20desolate%20industrial%20landscape%2C%20muted%20sepia%20tones%2C%20widescreen%20cinematic%20composition%2C%20fog%20and%20water%2C%20Criterion%20Collection%20aesthetic&image_size=landscape_16_9",
  },
  {
    title: "花样年华",
    director: "王家卫",
    year: "2000",
    note: "克制是最高级的情感表达。旗袍、走廊、雨声。",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=In%20the%20Mood%20for%20Love%20film%20still%2C%20narrow%20hallway%20with%20warm%20light%2C%20silhouette%20in%20qipao%2C%20muted%20red%20and%20amber%20tones%2C%20widescreen%20cinematic%20composition%2C%20Criterion%20Collection%20aesthetic&image_size=landscape_16_9",
  },
  {
    title: "The Grand Budapest Hotel",
    director: "Wes Anderson",
    year: "2014",
    note: "对称、色彩与消逝的文明。童话外壳下是深深的哀伤。",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Grand%20Budapest%20Hotel%20film%20still%2C%20symmetrical%20pink%20facade%2C%20pastel%20color%20palette%2C%20widescreen%20cinematic%20composition%2C%20miniature%20aesthetic%2C%20Criterion%20Collection%20aesthetic&image_size=landscape_16_9",
  },
];
