import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const telegramUrl = 'https://t.me/Kora_china_bot';
const botHandle = '@Kora_china_bot';

const highlights = [
  {
    icon: 'food',
    title: '本地吃喝推荐',
    text: '把距离、预算、评分、地址、营业时间和口味建议放在一起，不只是给一串榜单。',
  },
  {
    icon: 'map',
    title: 'Amap 导航',
    text: '给出适合中国本地场景的导航方向、地铁/打车建议和 Amap 链接。',
  },
  {
    icon: 'warning',
    title: '避坑建议',
    text: '不只推荐去哪，也会解释哪里不值得去，比如景观溢价、游客陷阱和同质化连锁。',
  },
  {
    icon: 'kit',
    title: '中国生存包',
    text: '把支付宝、微信支付、VPN、打车、地铁、关键中文短语等来华必备问题，整理成外国游客能照做的步骤。',
  },
  {
    icon: 'map',
    title: '上海主场，其他城市也能查',
    text: '上海沉淀了更深的 curated knowledge；杭州、北京、西安等城市则结合 Amap live data 提供地址、路线和基础生活建议。',
  },
  {
    icon: 'chat',
    title: '多语言对话',
    text: '外国旅客可以用 English、中文、French、Russian 等语言提问，KORA 会尽量匹配用户输入的语言回答。',
  },
  {
    icon: 'check',
    title: '推荐 + 导航 + 避坑',
    text: 'KORA 是本地向导，不是交易平台。它提供建议、步骤、Amap 链接和沟通辅助，交易由用户自己完成。',
  },
];

const whatIsKora = [
  {
    icon: 'chat',
    title: 'Telegram Bot',
    text: '当前体验入口是 Telegram：@Kora_china_bot。用户打开 Bot 后直接用自然语言提问，不需要网页登录。',
  },
  {
    icon: 'map',
    title: 'AI city guide',
    text: '它把吃喝推荐、真实地址、Amap 导航、支付/出行/中文沟通步骤和避坑建议整理成可执行回复。',
  },
  {
    icon: 'arrival',
    title: '面向来华外国旅客',
    text: '适合刚落地中国、需要解决餐厅、路线、打车、支付、中文表达和本地判断的外国游客或商务旅客。',
  },
];

const actionBoundary = {
  does: [
    '推荐餐厅、酒吧和城市体验',
    '提供真实地址和 Amap 导航',
    '拆解支付宝、打车、中文沟通步骤',
    '提醒游客陷阱、景观溢价和不划算选择',
  ],
  doesNot: [
    '不替用户付款',
    '不帮用户订桌',
    '不帮用户订酒店或机票',
    '不替用户下单',
  ],
};

const translationCards = [
  {
    scenario: '静安寺附近的吃喝',
    userNeed: '用户不是要一篇攻略，而是想马上知道附近吃什么、多少钱、走多远。',
    koraAction: '把餐厅、预算、评分、地址、步行距离、营业时间和推荐理由合并成一条可执行建议。',
    productMeaning: '从“信息列表”转成“行动方案”，适合刚到中国、需要快速决策的外国旅客。',
    tags: ['距离', '预算', '营业时间'],
  },
  {
    scenario: '陆家嘴夜景怎么选',
    userNeed: '用户想拍夜景，但不知道该上高楼、去滨江，还是只看地标。',
    koraAction: '结合天气、能见度和场景提醒：如果雾和霾明显，高楼观光厅的体验可能打折。',
    productMeaning: 'KORA 不只推荐景点，也会帮助用户判断是否值得花钱。',
    tags: ['天气判断', '场景建议', '省钱'],
  },
  {
    scenario: '世纪大道附近黑名单',
    userNeed: '用户想知道哪里不要去，比只问“推荐去哪”更接近本地决策。',
    koraAction: '给出识别规则：地标、金融区、大商场和景观餐厅，常见问题是卖风景不卖味道。',
    productMeaning: '产品价值不只是推荐好地方，也包括像本地朋友一样提醒避坑。',
    tags: ['避坑', '规则', '本地判断'],
  },
  {
    scenario: '支付宝支付',
    userNeed: '外国游客不是想了解支付宝概念，而是想知道落地后怎么设置并扫码付款。',
    koraAction: '拆成下载 Alipay、护照注册、绑定国际信用卡、扫码付款等步骤，并提醒仍由用户自己完成支付。',
    productMeaning: '这是中国生存包能力：提供平台使用指导，但不代替用户交易。',
    tags: ['step-by-step', '支付指导', '边界清楚'],
  },
  {
    scenario: '杭州西湖英文提问',
    userNeed: '用户用英文问非上海城市的本地餐厅，希望得到不踩雷的选择。',
    koraAction: '用英文解释南山路场景，提醒湖景餐厅可能卖景观不卖味道，并按 taste + value 筛选。',
    productMeaning: '体现多语言对话和上海以外城市的可用性：其他城市可结合 Amap live data 和本地判断给建议。',
    tags: ['多语言', '杭州', 'taste + value'],
  },
];

const chatScenes = [
  {
    id: 'food',
    label: '🍜 静安寺吃喝',
    user: '静安寺附近的吃喝',
    reply: '给你串好了，都在地铁站步行 250 米内。先吃毒蛇面馆，¥42/人，步行 180 米。',
    cardTitle: '毒蛇面馆（静安寺店）',
    cardLines: ['4.7 · ¥42/人 · 愚园路 140 号', '步行 180 米 · 09:00-22:00'],
    followUser: '来点世纪大道附近的黑名单',
    followReply: '这才是本地朋友的价值：告诉你哪些别去，比告诉你去哪更省钱。',
    tools: ['预算', '营业时间', '避坑理由'],
  },
  {
    id: 'night',
    label: '🗼 陆家嘴夜景',
    user: '陆家嘴晚上去哪拍夜景？',
    reply: '先看能见度。如果今晚雾和霾明显，上高楼观光厅会打折；想拍天际线，优先陆家嘴滨江。',
    cardTitle: '夜景判断',
    cardLines: ['东方明珠 / 陆家嘴滨江 / 上海中心', '按天气、预算和拍照目的选择'],
    followUser: '那要不要买观光厅票？',
    followReply: '如果只是拍天际线，不一定要买票。先去滨江或地铁站周边看视野，再决定是否上楼。',
    tools: ['Amap 路线', '天气判断', '省钱建议'],
  },
  {
    id: 'pay',
    label: '💳 支付宝支付',
    user: '支付宝支付',
    reply: '给你外国游客版最简教程：下载 Alipay，用护照注册，绑定 Visa / Mastercard / Amex。',
    cardTitle: 'Alipay 设置步骤',
    cardLines: ['App Store / Google Play 下载，Google Play 可能需要 VPN', '不需要中国银行账户，绑定外卡后可扫码付款'],
    followUser: '哪些地方能用？',
    followReply: '餐厅、便利店、地铁、打车等常见场景基本都能用；具体付款仍由你自己完成。',
    tools: ['护照注册', '绑定外卡', '扫码付款'],
  },
  {
    id: 'avoid',
    label: '🚫 世纪大道避坑',
    user: '来点世纪大道附近的黑名单',
    reply: '世纪大道 / 陆家嘴是游客陷阱高发区。金融区 + 地标景点，很多地方卖风景不卖味道。',
    cardTitle: '识别规则',
    cardLines: ['摩天楼景观餐厅：多数在为窗景付钱', '大商场连锁店：体验容易同质化'],
    followUser: '那晚上拍夜景去哪？',
    followReply: '如果今晚雾和霾明显，上高楼观光厅能见度会打折。想拍天际线，优先陆家嘴滨江。',
    tools: ['天气判断', 'Amap 路线', '省钱建议'],
  },
  {
    id: 'hangzhou',
    label: '🌊 Hangzhou Local Food',
    user: 'Recommend local food near West Lake.',
    reply:
      'Be careful with lake-view restaurants — many sell the view, not the food. I picked places by taste + value.',
    cardTitle: 'Nanshan Road · 南山路',
    cardLines: ['Linglong Xiaozhen · 4.7 · ¥101/person', 'Xihu Renjia · 4.6 · ¥59/person'],
    followUser: 'Can I ask in English?',
    followReply: 'Yes. You can ask about food, routes, payment, and tourist traps in English.',
    tools: ['English query', 'Hangzhou', 'Taste + value'],
  },
];

const comparison = {
  generic: [
    '更适合通用问答，容易给泛泛攻略',
    '可能缺少中国本地地点、路线和平台细节',
    '地址、电话、营业时间可能不准',
    '不一定知道 Amap、支付、中文沟通等本地细节',
    '支付场景里可能只解释支付宝是什么',
    '可能推荐“西湖边热门餐厅”但不解释景观溢价',
    '很少直接说“这家不值得去”',
  ],
  kora: [
    '聚焦外国旅客在中国的本地生活问题',
    '结合 Amap 地址、路线和上海本地知识',
    '给出距离、预算、时间、场景建议和 step-by-step guides',
    '把下载、注册、绑卡、扫码付款拆成能照做的步骤',
    '会提醒湖景餐厅可能卖景观不卖味道，并按口味和性价比筛选',
    '支持多语言沟通和关键中文表达辅助',
    '会提醒游客陷阱和不划算选择，但不代替用户交易',
  ],
};

const steps = [
  {
    title: '下载 Telegram',
    text: '准备一个 Telegram 账号，这是当前体验 KORA 的入口。',
  },
  {
    title: '搜索 @Kora_china_bot',
    text: '打开 Bot 后，可以直接用英文、中文或其他语言开始提问。',
  },
  {
    title: '描述城市和需求',
    text: '例如“静安寺附近的吃喝”“陆家嘴晚上去哪拍照”“Recommend local food near West Lake”。',
  },
  {
    title: '根据建议行动',
    text: '根据 KORA 给出的地址、预算、路线和建议行动，具体支付、订票或下单由用户自己完成。',
  },
  {
    title: '遇到问题继续追问',
    text: '如果路线、支付、中文沟通或预算有变化，可以继续追问并细化需求。',
  },
];

const scenarios = [
  {
    icon: 'arrival',
    title: '刚落地中国',
    text: '从机场到酒店、地铁还是打车、地址怎么给司机看。',
  },
  {
    icon: 'food',
    title: '找附近不踩雷餐厅',
    text: '避开游客陷阱，寻找本地小馆、独立餐厅和符合口味的选择。',
  },
  {
    icon: 'route',
    title: '获取 Amap 导航',
    text: '把目的地变成更容易执行的路线、打车方向和中文地址。',
  },
  {
    icon: 'pay',
    title: '不会用支付宝 / 微信支付',
    text: '解释如何下载、注册、绑定外卡和扫码付款，但不会代替用户完成支付。',
  },
  {
    icon: 'night',
    title: '想拍夜景但不知道去哪',
    text: '结合天气、能见度、位置和预算，判断高楼观景还是滨江拍照更合适。',
  },
  {
    icon: 'phrase',
    title: '多语言询问中国本地生活',
    text: '外国旅客可以用英文、中文或其他语言询问吃喝、路线、支付和避坑建议。',
  },
];

const simulatorOptions = {
  cities: ['上海', '杭州', '北京'],
  needs: ['吃饭', '夜景', '支付', '避坑'],
  budgets: ['低预算', '适中', '不限'],
} as const;

type SimulatorCity = (typeof simulatorOptions.cities)[number];
type SimulatorNeed = (typeof simulatorOptions.needs)[number];
type SimulatorBudget = (typeof simulatorOptions.budgets)[number];

const budgetHints: Record<SimulatorBudget, string> = {
  低预算: '优先控制在 ¥30-60/person，能坐下吃就不为环境溢价。',
  适中: '大约 ¥60-120/person，平衡口味、位置和舒适度。',
  不限: '体验优先，但仍会提醒景观溢价和不值得花的钱。',
};

const cityMockData: Record<
  SimulatorCity,
  Record<
    SimulatorNeed,
    {
      question: string;
      answer: string;
      distance: string;
      scene: string;
      trap: string;
    }
  >
> = {
  上海: {
    吃饭: {
      question: 'What should I eat near Jing’an Temple?',
      answer:
        'I’d keep it within a short walk from the metro. Start with a local noodle shop if you want fast and filling, or pick a sit-down Shanghainese place if you have more time.',
      distance: '静安寺地铁站步行约 180-250 米',
      scene: '适合刚到上海、想少走路先吃饱',
      trap: '少选只靠商场位置和装修卖高价的连锁店',
    },
    夜景: {
      question: 'Where should I go for Shanghai skyline tonight?',
      answer:
        'For skyline photos, I’d check visibility first. If it’s hazy, the riverside view around Lujiazui is usually better value than paying for a high-floor observatory.',
      distance: '陆家嘴地铁站到滨江步行约 10-15 分钟',
      scene: '先看天气和能见度，再决定是否上高楼',
      trap: '雾霾天观光厅可能不值票价',
    },
    支付: {
      question: 'How do I use Alipay in China?',
      answer:
        'Use the foreign visitor setup: download Alipay, register with passport, bind Visa / Mastercard / Amex, then scan to pay in restaurants, convenience stores, metro and taxi apps.',
      distance: '适用于餐厅、便利店、地铁、打车等常见场景',
      scene: '落地前装好 App 会更省心',
      trap: 'KORA 只提供设置步骤，具体付款仍由用户自己完成',
    },
    避坑: {
      question: 'Any tourist traps near Century Avenue?',
      answer:
        'This area has lots of finance-district and landmark traffic. Be careful with view restaurants and mall chains: many sell the view, not the food.',
      distance: '世纪大道 / 陆家嘴一带步行可达点很多',
      scene: '适合先判断哪里不值得去，再选替代方案',
      trap: '景观餐厅、景观咖啡和大商场连锁容易有溢价',
    },
  },
  杭州: {
    吃饭: {
      question: 'Recommend local food near West Lake.',
      answer:
        'Be careful with lake-view restaurants — many sell the view, not the food. I’d pick Nanshan Road options by taste + value, like local Hangzhou cuisine around ¥60-100/person.',
      distance: '南山路在西湖东侧，适合边走边选',
      scene: '想吃本地杭州菜，而不是只为湖景买单',
      trap: '湖边第一排餐厅可能景观溢价明显',
    },
    夜景: {
      question: 'Where should I go near West Lake at night?',
      answer:
        'I’d keep it simple: walk the lake edge if the weather is clear, and avoid paying mainly for a window seat. West Lake night views are often better as a walk than as a pricey meal.',
      distance: '西湖东侧湖边步行范围内更灵活',
      scene: '适合饭后散步、轻量拍照',
      trap: '“湖景套餐”不一定比散步看湖更值得',
    },
    支付: {
      question: 'Can I use Alipay in Hangzhou?',
      answer:
        'Yes. Set up Alipay with passport and an international card before you go out. It helps with restaurants, convenience stores, metro, taxis and many local services.',
      distance: '西湖、商圈、地铁和打车场景都常用',
      scene: '先解决支付，再去餐厅和交通点更顺',
      trap: '不要等到收银台才第一次注册和绑卡',
    },
    避坑: {
      question: 'What should I avoid near West Lake?',
      answer:
        'Avoid choosing only by lake view. Around West Lake, some places charge for the scenery more than the food, so I’d compare taste + value before walking in.',
      distance: '湖边热门区域距离近，但价格差异大',
      scene: '适合游客先避开景观溢价',
      trap: '卖湖景不卖味道的餐厅要谨慎',
    },
  },
  北京: {
    吃饭: {
      question: 'Where can I eat local food in Beijing?',
      answer:
        'I’d look for a neighborhood-style place instead of only famous lists. For a first meal, choose something easy to order and close to the subway, then ask for Chinese phrases if needed.',
      distance: '优先地铁站步行 5-10 分钟内',
      scene: '适合第一次到北京、想降低点餐沟通成本',
      trap: '只靠“网红老字号”不一定适合当天路线和预算',
    },
    夜景: {
      question: 'Where should I go for Beijing night views?',
      answer:
        'For Beijing, I’d match the night plan with your location and last metro time. A scenic walk can be better than crossing the city just for one viewpoint.',
      distance: '优先选当前住宿或地铁线附近区域',
      scene: '先看交通时间，再决定夜景点',
      trap: '别为了单一打卡点把晚上都花在路上',
    },
    支付: {
      question: 'How do foreign visitors pay in Beijing?',
      answer:
        'Set up Alipay or WeChat Pay with passport and international card. KORA can break down the setup, then give you Chinese phrases for asking whether card-linked mobile payment works.',
      distance: '地铁、打车、便利店、餐厅都常见',
      scene: '适合落地当天先解决通用支付问题',
      trap: 'KORA 不能替你支付，只能给设置指导和沟通辅助',
    },
    避坑: {
      question: 'What should I avoid in Beijing as a visitor?',
      answer:
        'Watch for places that are famous mainly because they are close to landmarks. I’d choose by route fit, food quality and value, not just tourist traffic.',
      distance: '景点周边距离近，但排队和溢价成本高',
      scene: '适合安排景点日的吃饭和休息点',
      trap: '地标旁高客流餐饮容易价格高、体验普通',
    },
  },
};

function getSimulatorReply(city: SimulatorCity, need: SimulatorNeed, budget: SimulatorBudget) {
  const data = cityMockData[city][need];

  return {
    question: data.question,
    answer: data.answer,
    details: [
      { label: '预算', value: budgetHints[budget] },
      { label: '距离', value: data.distance },
      { label: '场景判断', value: data.scene },
      { label: '避坑提醒', value: data.trap },
    ],
  };
}

const faqs = [
  {
    question: 'KORA 是给谁用的？',
    answer: 'KORA 面向来华外国旅客，尤其适合第一次来中国、短期旅行、商务出行，或需要快速适应中国城市生活的人。',
  },
  {
    question: 'KORA 和 ChatGPT / Claude 有什么区别？',
    answer: 'ChatGPT / Claude 是通用大模型。KORA 更像中国本地生活向导，优势不是“无所不能”，而是更聚焦：Amap 地址、上海本地知识、多语言沟通、避坑建议和 step-by-step guides。',
  },
  {
    question: '为什么要用 Amap？',
    answer: '很多外国旅客习惯 Google Maps，但它在中国并不总是好用。Amap 更贴近中国本地地点、路线和打车场景，因此更适合把推荐转成可打开、可导航、可沟通的行动。',
  },
  {
    question: 'KORA 覆盖哪些城市？',
    answer: '上海是 KORA 的 flagship / home turf，本地知识更深，包括酒吧、夜宵、city walk、饮食指南和验证过的推荐。杭州、北京、西安等其他中国城市也能用，主要结合 Amap live data 提供地址、路线和基础生活建议。',
  },
  {
    question: 'KORA 支持哪些语言？',
    answer: 'KORA 支持 English、中文、French、Russian 以及更多语言。用户用什么语言提问，KORA 会尽量用相同语言回答，降低外国旅客来华时的沟通门槛。',
  },
  {
    question: 'KORA 能不能直接帮用户支付、订票或下单？',
    answer: '不能。KORA 是本地向导，不是交易平台。它会告诉你去哪、怎么走、怎么用 Alipay / Didi / Ctrip 等工具，但实际支付、订票、订桌或下单仍由用户自己完成，这样用户能完全掌控自己的钱和订单。',
  },
  {
    question: 'KORA 是搜索引擎还是本地向导？',
    answer: '更接近本地向导。KORA is a curator + local guide, not a booking platform or a search engine. 它会把推荐、真实地址、Amap 导航链接、步骤指导和避坑建议整理成可执行的对话。',
  },
  {
    question: '中国人为什么需要了解 KORA？',
    answer: '因为它展示了 AI 产品如何从普通问答走向真实场景解决问题，也适合产品、运营、前端同学理解 AI 产品迭代方向。',
  },
];

type IconName =
  | 'map'
  | 'taste'
  | 'kit'
  | 'chat'
  | 'arrival'
  | 'food'
  | 'route'
  | 'pay'
  | 'night'
  | 'phrase'
  | 'check'
  | 'warning';

function Icon({ name }: { name: IconName }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.8,
  };

  const paths: Record<IconName, React.ReactNode> = {
    map: (
      <>
        <path {...common} d="M7 5.3 3.8 4v12.6L7 18l6-2.7 3.2 1.3V4L13 2.7 7 5.3Z" />
        <path {...common} d="M7 5.3V18M13 2.7v12.6" />
      </>
    ),
    taste: (
      <>
        <path {...common} d="M5 3v7M8 3v7M5 7h3M13 3v16M16.5 3v6.5A3.5 3.5 0 0 1 13 13" />
      </>
    ),
    kit: (
      <>
        <path {...common} d="M6.5 6V4.5A2.5 2.5 0 0 1 9 2h2a2.5 2.5 0 0 1 2.5 2.5V6" />
        <path {...common} d="M4 6h12a2 2 0 0 1 2 2v7.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15.5V8a2 2 0 0 1 2-2Z" />
        <path {...common} d="M10 9v6M7 12h6" />
      </>
    ),
    chat: (
      <>
        <path {...common} d="M4 5.5A3.5 3.5 0 0 1 7.5 2h5A3.5 3.5 0 0 1 16 5.5v4A3.5 3.5 0 0 1 12.5 13H9l-4 4v-4.3A3.5 3.5 0 0 1 4 10V5.5Z" />
        <path {...common} d="M7.5 6.5h5M7.5 9.5H11" />
      </>
    ),
    arrival: (
      <>
        <path {...common} d="M10 18s6-5.1 6-10A6 6 0 0 0 4 8c0 4.9 6 10 6 10Z" />
        <path {...common} d="M10 10.5A2.5 2.5 0 1 0 10 5a2.5 2.5 0 0 0 0 5.5Z" />
      </>
    ),
    food: (
      <>
        <path {...common} d="M4 11h12a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z" />
        <path {...common} d="M7 7c.4-1.3 1.4-2 3-2s2.6.7 3 2M6 18h8" />
      </>
    ),
    route: (
      <>
        <path {...common} d="M5 17c3-5.5 7-1.5 10-7.5" />
        <path {...common} d="M5 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM15 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      </>
    ),
    pay: (
      <>
        <path {...common} d="M3 6.5h14a1.5 1.5 0 0 1 1.5 1.5v7A1.5 1.5 0 0 1 17 16.5H3A1.5 1.5 0 0 1 1.5 15V8A1.5 1.5 0 0 1 3 6.5Z" />
        <path {...common} d="M2 10h16M6 14h3" />
      </>
    ),
    night: (
      <>
        <path {...common} d="M14.5 13.5A6.5 6.5 0 0 1 6.5 5.5 7 7 0 1 0 14.5 13.5Z" />
        <path {...common} d="M14 3.5h.1M17 6h.1" />
      </>
    ),
    phrase: (
      <>
        <path {...common} d="M3 4h14v9H8l-5 4V4Z" />
        <path {...common} d="M7 8h6M7 11h4" />
      </>
    ),
    check: <path {...common} d="m4.5 10 3.4 3.4L15.5 6" />,
    warning: (
      <>
        <path {...common} d="M10 3 2.5 16h15L10 3Z" />
        <path {...common} d="M10 7.5v4M10 14.5h.1" />
      </>
    ),
  };

  return (
    <svg aria-hidden="true" className="icon" viewBox="0 0 20 20">
      {paths[name]}
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="button-icon">
      <path
        d="M4.5 10h10m0 0-4-4m4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function BotEntry({
  onCopy,
  tone = 'light',
}: {
  onCopy: () => void;
  tone?: 'light' | 'dark';
}) {
  return (
    <div className={`bot-entry bot-entry-${tone}`}>
      <div className="bot-entry-copy">
        <span>Telegram Bot</span>
        <strong>{botHandle}</strong>
      </div>
      <div className="bot-entry-actions">
        <button className="bot-entry-button copy" type="button" onClick={onCopy}>
          复制 Bot 名称
        </button>
        <a className="bot-entry-button open" href={telegramUrl} target="_blank" rel="noopener noreferrer">
          打开 Telegram
        </a>
      </div>
    </div>
  );
}

function App() {
  const [activeSceneId, setActiveSceneId] = useState(chatScenes[0].id);
  const [simulatorCity, setSimulatorCity] = useState<SimulatorCity>('杭州');
  const [simulatorNeed, setSimulatorNeed] = useState<SimulatorNeed>('吃饭');
  const [simulatorBudget, setSimulatorBudget] = useState<SimulatorBudget>('适中');
  const [toastMessage, setToastMessage] = useState('');
  const activeScene = chatScenes.find((scene) => scene.id === activeSceneId) ?? chatScenes[0];
  const simulatorReply = getSimulatorReply(simulatorCity, simulatorNeed, simulatorBudget);

  useEffect(() => {
    if (!toastMessage) {
      return undefined;
    }

    const timer = window.setTimeout(() => setToastMessage(''), 2600);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const handleCopyBotName = async () => {
    try {
      await navigator.clipboard.writeText(botHandle);
      setToastMessage('已复制，打开 Telegram 搜索即可体验。');
    } catch {
      setToastMessage(`请手动复制 ${botHandle}`);
    }
  };

  return (
    <div className="page">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="KORA 首页">
          <span className="brand-mark">K</span>
          <span>KORA</span>
        </a>
        <nav className="nav" aria-label="页面导航">
          <a href="#highlights">亮点</a>
          <a href="#what">定位</a>
          <a href="#translation">转译</a>
          <a href="#simulator">模拟器</a>
          <a href="#compare">对比</a>
          <a href="#steps">怎么用</a>
          <a href="#scenes">场景</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="nav-cta" href={telegramUrl} target="_blank" rel="noopener noreferrer">
          体验 KORA
        </a>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="hero-copy">
            <p className="eyebrow">AI City Guide for China</p>
            <h1>KORA：外国人来中国的 AI 城市生活向导</h1>
            <p className="hero-subtitle">
              从吃喝推荐、Amap 导航、支付宝教程，到游客陷阱避坑，KORA 通过 Telegram 对话，把中国本地生活问题拆成可执行的建议、地址、预算和步骤。
            </p>
            <div className="difference-row" aria-label="核心差异点">
              <span>Telegram Bot 入口</span>
              <span>Amap live data</span>
              <span>多语言对话</span>
              <span>上海 curated knowledge</span>
            </div>
            <div className="hero-actions">
              <a className="primary-button" href={telegramUrl} target="_blank" rel="noopener noreferrer">
                体验 KORA
                <ArrowIcon />
              </a>
              <a className="secondary-button" href="#steps">
                查看怎么用
              </a>
            </div>
            <BotEntry onCopy={handleCopyBotName} />
            <div className="proof-row" aria-label="产品边界">
              <span>上海最本地化</span>
              <span>其他城市通过 Amap 查询</span>
              <span>推荐和指导，不代替交易</span>
            </div>
          </div>

          <div className="phone-shell" aria-label="KORA Telegram 对话示意">
            <div className="phone-glow"></div>
            <div className="phone-preview">
              <div className="phone-notch"></div>
              <div className="phone-top">
                <span className="bot-avatar">K</span>
                <div>
                  <strong>@Kora_china_bot</strong>
                  <span>online · Telegram AI guide</span>
                </div>
              </div>
              <div className="chat-window">
                <div className="prompt-tabs" aria-label="切换演示场景">
                  {chatScenes.map((scene) => (
                    <button
                      className={scene.id === activeScene.id ? 'active' : ''}
                      key={scene.id}
                      onClick={() => setActiveSceneId(scene.id)}
                      type="button"
                    >
                      {scene.label}
                    </button>
                  ))}
                </div>
                <div className="message-row user-row">
                  <div className="bubble user">{activeScene.user}</div>
                </div>
                <div className="message-row bot-row">
                  <span className="mini-avatar">K</span>
                  <div className="bubble bot">
                    {activeScene.reply}
                  </div>
                </div>
                <div className="recommend-card">
                  <strong>{activeScene.cardTitle}</strong>
                  {activeScene.cardLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </div>
                <div className="message-row user-row">
                  <div className="bubble user">{activeScene.followUser}</div>
                </div>
                <div className="message-row bot-row">
                  <span className="mini-avatar">K</span>
                  <div className="bubble bot">
                    {activeScene.followReply}
                  </div>
                </div>
                <div className="amap-card">
                  <div>
                    <strong>Amap ready</strong>
                    <span>地址、路线、打车方向</span>
                  </div>
                  <span className="amap-pill">Open</span>
                </div>
                <div className="bot-tools">
                  {activeScene.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section what-section" id="what">
          <div className="section-heading centered">
            <p className="eyebrow">KORA 是什么</p>
            <h2>面向来华外国旅客的 Telegram AI 城市生活向导</h2>
            <p>
              KORA 通过对话提供本地推荐、真实地址、Amap 导航链接、支付/出行/中文沟通步骤和避坑建议。它像一个懂中国本地生活的 AI 朋友，但不是订票平台、支付平台或下单平台。
            </p>
          </div>
          <div className="what-grid">
            {whatIsKora.map((item) => (
              <article className="glass-card what-card" key={item.title}>
                <span className="icon-box">
                  <Icon name={item.icon as IconName} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="highlights">
          <div className="section-heading centered">
            <p className="eyebrow">产品亮点</p>
            <h2>不只是聊天，而是帮外国旅客解决中国城市里的真实问题</h2>
          </div>
          <div className="highlight-grid">
            {highlights.map((item) => (
              <article className="glass-card highlight-card" key={item.title}>
                <span className="icon-box">
                  <Icon name={item.icon as IconName} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section compare-section" id="compare">
          <div className="section-heading centered">
            <p className="eyebrow">为什么不是普通聊天机器人</p>
            <h2>KORA 不只是 ChatGPT，更像外国人在中国的本地朋友</h2>
          </div>
          <div className="compare-grid">
            <article className="compare-card compare-muted">
              <div className="compare-head">
                <span className="icon-box muted">
                  <Icon name="warning" />
                </span>
                <div>
                  <p>普通大模型</p>
                  <h3>更通用，但不一定贴近中国本地执行</h3>
                </div>
              </div>
              <ul>
                {comparison.generic.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="compare-card compare-kora">
              <div className="compare-head">
                <span className="icon-box">
                  <Icon name="check" />
                </span>
                <div>
                  <p>KORA</p>
                  <h3>更聚焦外国旅客在中国的真实生活问题</h3>
                </div>
              </div>
              <ul>
                {comparison.kora.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="section action-boundary-section">
          <div className="section-heading centered">
            <p className="eyebrow">KORA 做什么 / 不做什么</p>
            <h2>像本地向导一样给建议，但不替用户完成交易</h2>
          </div>
          <div className="action-boundary-grid">
            <article className="action-card action-do">
              <div className="compare-head">
                <span className="icon-box">
                  <Icon name="check" />
                </span>
                <div>
                  <p>KORA 做</p>
                  <h3>提供推荐、链接、步骤和沟通辅助</h3>
                </div>
              </div>
              <ul>
                {actionBoundary.does.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="action-card action-dont">
              <div className="compare-head">
                <span className="icon-box muted">
                  <Icon name="warning" />
                </span>
                <div>
                  <p>KORA 不做</p>
                  <h3>不接管用户的钱、订单和交易动作</h3>
                </div>
              </div>
              <ul>
                {actionBoundary.doesNot.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="section simulator-section" id="simulator">
          <div className="section-heading centered">
            <p className="eyebrow">Interactive demo</p>
            <h2>试试 KORA 会怎么帮你</h2>
            <p>
              选择城市、需求和预算，看看 KORA 会如何把一个模糊问题拆成更容易执行的本地建议。示例演示，非实时生成。
            </p>
          </div>

          <div className="simulator-panel">
            <div className="simulator-controls" aria-label="场景模拟器选项">
              <label className="select-field">
                <span>城市</span>
                <select
                  value={simulatorCity}
                  onChange={(event) => setSimulatorCity(event.target.value as SimulatorCity)}
                >
                  {simulatorOptions.cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </label>
              <label className="select-field">
                <span>需求</span>
                <select
                  value={simulatorNeed}
                  onChange={(event) => setSimulatorNeed(event.target.value as SimulatorNeed)}
                >
                  {simulatorOptions.needs.map((need) => (
                    <option key={need} value={need}>
                      {need}
                    </option>
                  ))}
                </select>
              </label>
              <label className="select-field">
                <span>预算</span>
                <select
                  value={simulatorBudget}
                  onChange={(event) => setSimulatorBudget(event.target.value as SimulatorBudget)}
                >
                  {simulatorOptions.budgets.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <article className="simulator-card" aria-live="polite">
              <div className="simulator-card-head">
                <span className="demo-badge">示例演示，非实时生成</span>
                <span>{simulatorCity} · {simulatorNeed} · {simulatorBudget}</span>
              </div>
              <div className="simulator-chat">
                <div className="sim-message sim-user">
                  <strong>User</strong>
                  <p>{simulatorReply.question}</p>
                </div>
                <div className="sim-message sim-kora">
                  <span className="mini-avatar">K</span>
                  <div>
                    <strong>KORA</strong>
                    <p>{simulatorReply.answer}</p>
                  </div>
                </div>
              </div>
              <div className="sim-meta-grid">
                {simulatorReply.details.map((detail) => (
                  <div className="sim-meta-item" key={detail.label}>
                    <span>{detail.label}</span>
                    <strong>{detail.value}</strong>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="section translation-section" id="translation">
          <div className="section-heading centered">
            <p className="eyebrow">真实体验转译</p>
            <h2>我从真实体验中提炼出的 5 个产品亮点</h2>
            <p>
              不直接展示真实截图，而是把真实体验拆成用户需求、KORA 的处理方式，以及它对产品定位的意义。
            </p>
          </div>
          <div className="translation-grid">
            {translationCards.map((card, index) => (
              <article className="translation-card" key={card.scenario}>
                <div className="translation-index">{String(index + 1).padStart(2, '0')}</div>
                <div>
                  <span className="translation-label">真实问题</span>
                  <h3>{card.scenario}</h3>
                  <p>{card.userNeed}</p>
                </div>
                <div className="translation-block">
                  <span>KORA 做了什么</span>
                  <p>{card.koraAction}</p>
                </div>
                <div className="translation-block strong">
                  <span>转译成产品价值</span>
                  <p>{card.productMeaning}</p>
                </div>
                <div className="translation-tags">
                  {card.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="steps">
          <div className="section-heading centered">
            <p className="eyebrow">怎么使用</p>
            <h2>5 步开始和 KORA 对话</h2>
          </div>
          <div className="timeline">
            {steps.map((step, index) => (
              <article className="step-card" key={step.title}>
                <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="scenes">
          <div className="section-heading centered">
            <p className="eyebrow">使用场景</p>
            <h2>像一个懂中国城市生活的 AI 本地朋友</h2>
          </div>
          <div className="scenario-grid">
            {scenarios.map((scenario) => (
              <article className="scenario-card" key={scenario.title}>
                <span className="icon-box small">
                  <Icon name={scenario.icon as IconName} />
                </span>
                <h3>{scenario.title}</h3>
                <p>{scenario.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section value-section">
          <div className="value-copy">
            <p className="eyebrow">产品价值</p>
            <h2>外国游客缺的不是信息，而是能执行的本地判断</h2>
            <p>
              来中国旅行时，信息分散、英文资料不准、地图和支付工具不熟悉，都会让一个小问题变得很难。KORA 的价值，是把距离、预算、营业时间、天气和避坑判断，变成一次次可追问的对话，同时让用户自己掌控支付、订票和下单。
            </p>
          </div>
          <div className="value-list">
            <div>
              <strong>吃喝推荐可执行</strong>
              <span>把位置、预算、评分、营业时间和为什么推荐讲清楚。</span>
            </div>
            <div>
              <strong>场景判断更像本地人</strong>
              <span>看夜景、拍天际线、上观光厅，会结合天气和实际体验给建议。</span>
            </div>
            <div>
              <strong>敢说哪里不值得去</strong>
              <span>提醒游客陷阱、景观溢价和不划算选择，降低信息成本。</span>
            </div>
            <div>
              <strong>边界清楚更可信</strong>
              <span>推荐、导航、平台使用指导和沟通辅助由 KORA 提供，交易动作由用户自己完成。</span>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="section-heading centered">
            <p className="eyebrow">FAQ</p>
            <h2>快速理解 KORA 的适用场景</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section cta-section" aria-labelledby="cta-title">
          <div>
            <p className="eyebrow">Telegram Bot 体验入口</p>
            <h2 id="cta-title">想体验 KORA？</h2>
            <p>打开 Telegram，搜索 @Kora_china_bot，开始和 KORA 对话。</p>
            <div className="cta-meta">
              <span>不需要注册网页账号</span>
              <span>适合快速试用</span>
            </div>
          </div>
          <BotEntry onCopy={handleCopyBotName} tone="dark" />
        </section>
      </main>

      <div className={`toast ${toastMessage ? 'show' : ''}`} role="status" aria-live="polite">
        {toastMessage}
      </div>

      <footer className="footer">
        <p>© 2026 KORA. AI city guide for foreign travelers in China.</p>
        <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
          @Kora_china_bot
        </a>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
