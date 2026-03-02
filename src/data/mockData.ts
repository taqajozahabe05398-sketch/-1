import { 
  TrendingUp, 
  Users, 
  Target, 
  ShieldCheck, 
  Zap, 
  Globe, 
  BarChart3,
  Activity,
  Cpu,
  Search,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Database,
  Server,
  Lock,
  Clock
} from 'lucide-react';

// --- Shared Types ---
export interface ReportModule {
  id: string;
  title: string;
  icon: any;
  status: 'pending' | 'loading' | 'complete';
}

// --- Dashboard Data ---
export const DASHBOARD_DATA = {
  stats: [
    { label: "今日研报", value: 12, unit: "份", change: "+2" },
    { label: "平均耗时", value: 45, unit: "s", change: "-12%" },
    { label: "知识库文档", value: 12840, unit: "篇", change: "+156" },
    { label: "模型响应延迟", value: 240, unit: "ms", change: "-5ms" }
  ],
  recentReports: [
    { id: 1, emoji: "🤖", company: "宇树科技", modules: 7, score: 4.3, time: "42s" },
    { id: 2, emoji: "🔋", company: "宁德时代", modules: 7, score: 4.6, time: "38s" },
    { id: 3, emoji: "💊", company: "百济神州", modules: 7, score: 4.1, time: "55s" },
    { id: 4, emoji: "🏗️", company: "三一重工", modules: 7, score: 4.0, time: "40s" },
    { id: 5, emoji: "💻", company: "中芯国际", modules: 7, score: 4.4, time: "62s" }
  ],
  dataSources: [
    { name: "Wind金融终端", status: "online", count: "2.4M", progress: 100 },
    { name: "企查查企业库", status: "online", count: "850K", progress: 92 },
    { name: "天眼查风险库", status: "online", count: "620K", progress: 88 },
    { name: "国家政策库", status: "pending", count: "12K", progress: 45 },
    { name: "研报PDF库", status: "online", count: "150K", progress: 78 }
  ],
  agents: [
    { id: "master", name: "主控Agent" },
    { id: "m1", name: "M1 市场测算" },
    { id: "m2", name: "M2 竞争格局" },
    { id: "m3", name: "M3 多维对比" },
    { id: "m4", name: "M4 客户分析" },
    { id: "m5", name: "M5 政策追踪" },
    { id: "m6", name: "M6 增长逻辑" },
    { id: "validator", name: "一致性校验" }
  ]
};

// --- Generate Report Data ---
export const GENERATE_LOGS = [
  { type: 'header', text: 'ARIA RESEARCH SYSTEM V2.0 // INITIALIZING...' },
  { type: 'info', text: '[INIT] Loading knowledge base indices: Wind, Qichacha, GovPolicy...' },
  { type: 'success', text: '[SUCCESS] Knowledge base loaded (2.4M records).' },
  { type: 'header', text: '>>> STARTING M1: MARKET SIZING (BOTTOM-UP)' },
  { type: 'info', text: '[M1] Retrieving Unitree robotics shipment data (2023-2024)...' },
  { type: 'detail', text: '  > Found source: 2024 Q3 Financial Report (Confidence: 0.98)' },
  { type: 'detail', text: '  > Found source: Industrial Robotics Association Annual Report' },
  { type: 'info', text: '[M1] Calculating TAM for Humanoid Robots in Industrial Inspection...' },
  { type: 'detail', text: '  > Formula: Target Factories * Robots per Factory * Unit Price' },
  { type: 'detail', text: '  > Variable A (Factories): 37,700 (Scale > 100M RMB)' },
  { type: 'detail', text: '  > Variable B (Penetration): 8.5 units/factory (Avg)' },
  { type: 'detail', text: '  > Variable C (Price): 203,000 RMB (ASP)' },
  { type: 'success', text: '[M1] Calculation Complete. TAM = 65.0B RMB.' },
  { type: 'divider', text: '----------------------------------------' },
  { type: 'header', text: '>>> STARTING M2: COMPETITIVE LANDSCAPE' },
  { type: 'info', text: '[M2] Identifying key competitors in "Quadruped/Humanoid"...' },
  { type: 'detail', text: '  > Entity Identified: Boston Dynamics (Benchmark)' },
  { type: 'detail', text: '  > Entity Identified: UBTECH (HK.09880)' },
  { type: 'detail', text: '  > Entity Identified: Xiaomi CyberGear' },
  { type: 'info', text: '[M2] Extracting technical specs: Torque, Battery Life, Payload...' },
  { type: 'success', text: '[M2] Matrix generated. 5 Entities, 12 Dimensions.' },
  { type: 'divider', text: '----------------------------------------' },
  { type: 'header', text: '>>> STARTING M6: GROWTH LOGIC INFERENCE' },
  { type: 'info', text: '[M6] Analyzing correlation: Labor Shortage vs Robot Adoption...' },
  { type: 'detail', text: '  > Correlation Coefficient: 0.82 (Strong Positive)' },
  { type: 'info', text: '[M6] Running Devil\'s Advocate simulation...' },
  { type: 'detail', text: '  > Risk Scenario 1: Battery cost stagnation' },
  { type: 'detail', text: '  > Risk Scenario 2: Safety regulation tightening' },
  { type: 'success', text: '[M6] Growth thesis validated. Confidence: High.' },
  { type: 'header', text: '>>> FINALIZING REPORT' },
  { type: 'info', text: '[MAIN] Running consistency check (M1 vs M6)...' },
  { type: 'success', text: '[MAIN] Check passed. Generating final PDF structure.' },
  { type: 'success', text: 'REPORT GENERATION COMPLETE.' }
];

export const UNITREE_REPORT = {
  m0: {
    rating: 4.3,
    conclusion: "宇树科技作为国产足式机器人领军者，凭借高性价比硬件与快速迭代的算法优势，在工业巡检与科研教育市场建立了坚实壁垒。随着通用人形机器人G1的发布，有望开启C端服务市场第二增长曲线。",
    risks: "核心零部件供应链波动；人形机器人商业化落地不及预期；海外市场地缘政治风险。"
  },
  m1: {
    formula: "3.77万(目标工厂) × 8.5台(平均渗透) × 20.3万(均价) = 650亿(TAM)",
    scenarios: [
      { name: "保守", value: "420亿", assumption: "渗透率 5.0台/厂" },
      { name: "中性", value: "650亿", assumption: "渗透率 8.5台/厂" },
      { name: "乐观", value: "980亿", assumption: "渗透率 12.0台/厂" }
    ]
  },
  m2: {
    competitors: [
      { name: "宇树科技", type: "通用足式", price: "Low", tech: "High", share: "35%" },
      { name: "优必选", type: "人形服务", price: "High", tech: "Med", share: "28%" },
      { name: "Boston Dyn", type: "液压/电驱", price: "V.High", tech: "V.High", share: "15%" },
      { name: "小米", type: "生态链", price: "Low", tech: "Med", share: "10%" },
      { name: "其他", type: "垂直领域", price: "Med", tech: "Low", share: "12%" }
    ]
  },
  m3: {
    scores: [
      { label: "产品力", val: 4.1 },
      { label: "技术壁垒", val: 4.2 },
      { label: "团队背景", val: 4.3 },
      { label: "商业化", val: 4.0 },
      { label: "财务健康", val: 4.4 }
    ]
  },
  m5: {
    policies: [
      { date: "2024-01", name: "工信部《人形机器人创新发展指导意见》", impact: "High" },
      { date: "2023-11", name: "北京机器人产业发展基金启动", impact: "Med" },
      { date: "2023-09", name: "科技部重点研发计划“智能机器人”", impact: "High" },
      { date: "2023-06", name: "上海市智能机器人标杆企业认定", impact: "Low" }
    ]
  },
  m6: {
    positive: [
      "具身智能大模型(Unitree Go2)的端侧部署能力大幅降低了二次开发门槛",
      "B1/Aliengo系列在电网巡检领域的复购率超过65%，验证了PMF"
    ],
    negative: [
      "Devil's Advocate: 电池能量密度瓶颈可能限制人形机器人单次作业时长<2小时",
      "Devil's Advocate: 开源社区算法的快速进步可能削弱其软件护城河"
    ]
  }
};

export const CATL_REPORT = {
  m0: {
    rating: 4.6,
    conclusion: "宁德时代在全球动力电池领域保持绝对统治力，神行超充电池与麒麟电池构成了极强的高端产品矩阵。尽管面临二线厂商价格战压力，其规模效应与技术溢价能力仍确保了优于行业的利润率。",
    risks: "锂矿原材料价格剧烈波动；欧美新能源汽车政策退坡；固态电池技术路线颠覆风险。"
  },
  m1: {
    formula: "9500万(全球汽车销量) × 45%(EV渗透率) × 65kWh(单车带电) = 2778GWh",
    scenarios: [
      { name: "保守", value: "2100GWh", assumption: "渗透率 35%" },
      { name: "中性", value: "2778GWh", assumption: "渗透率 45%" },
      { name: "乐观", value: "3500GWh", assumption: "渗透率 55%" }
    ]
  },
  m2: {
    competitors: [
      { name: "宁德时代", type: "全系", price: "Med", tech: "V.High", share: "37%" },
      { name: "BYD", type: "刀片LFP", price: "Low", tech: "High", share: "16%" },
      { name: "LG ES", type: "三元软包", price: "High", tech: "High", share: "14%" },
      { name: "松下", type: "圆柱", price: "Med", tech: "Med", share: "7%" },
      { name: "其他", type: "混战", price: "Low", tech: "Low", share: "26%" }
    ]
  },
  m3: {
    scores: [
      { label: "产品力", val: 4.8 },
      { label: "技术壁垒", val: 4.7 },
      { label: "团队背景", val: 4.5 },
      { label: "商业化", val: 4.9 },
      { label: "财务健康", val: 4.6 }
    ]
  },
  m5: {
    policies: [
      { date: "2024-02", name: "欧盟《新电池法》正式生效", impact: "High" },
      { date: "2023-12", name: "美国IRA法案细则更新FEOC名单", impact: "High" },
      { date: "2023-07", name: "中国购置税减免延期政策", impact: "Med" },
      { date: "2023-05", name: "国家能源局新型储能标准", impact: "Med" }
    ]
  },
  m6: {
    positive: [
      "神行Plus电池实现1000km续航+4C超充，解决了里程焦虑痛点",
      "储能业务连续3年翻倍增长，成为第二增长极"
    ],
    negative: [
      "Devil's Advocate: 全固态电池量产时间表若晚于丰田/三星，可能丧失下一代技术话语权",
      "Devil's Advocate: 欧洲本地化产能爬坡缓慢可能影响海外市场份额"
    ]
  }
};

// --- Library Data ---
export const LIBRARY_DATA = [
  { id: 1, company: "宇树科技", industry: "人形机器人", score: 4.3, author: "王研究员", modules: 7, locked: false },
  { id: 2, company: "宁德时代", industry: "动力电池", score: 4.6, author: "李研究员", modules: 7, locked: false },
  { id: 3, company: "百济神州", industry: "创新药", score: 4.1, author: "张研究员", modules: 7, locked: true },
  { id: 4, company: "三一重工", industry: "工程机械", score: 4.0, author: "赵研究员", modules: 7, locked: true },
  { id: 5, company: "中芯国际", industry: "半导体", score: 4.4, author: "陈研究员", modules: 7, locked: true },
  { id: 6, company: "比亚迪", industry: "动力电池", score: 4.5, author: "刘研究员", modules: 7, locked: true }
];

// --- Knowledge Base Data ---
export const KB_DATA = {
  sources: [
    { id: 1, name: "Wind金融终端", status: "online", desc: "实时行情/财务数据/公告", count: "2.4M", time: "10 min ago", progress: 100 },
    { id: 2, name: "企查查企业库", status: "online", desc: "工商信息/股权穿透/风险", count: "850K", time: "1 hour ago", progress: 100 },
    { id: 3, name: "行业研报库", status: "online", desc: "券商研报/咨询报告PDF", count: "150K", time: "2 hours ago", progress: 100 },
    { id: 4, name: "新闻舆情流", status: "syncing", desc: "全网科技财经新闻抓取", count: "5.2M", time: "Syncing...", progress: 45 },
    { id: 5, name: "内部文档库", status: "offline", desc: "投委会纪要/尽调录音", count: "12K", time: "1 day ago", progress: 0 }
  ],
  searchResults: [
    { source: "Wind研报", similarity: 0.92, text: "...宇树科技在2024年Q3的市场份额达到35%，主要得益于Go2机器人的出货量激增..." },
    { source: "36Kr新闻", similarity: 0.88, text: "...人形机器人赛道融资火热，宇树科技完成B轮融资，估值接近独角兽..." },
    { source: "内部纪要", similarity: 0.85, text: "...专家访谈：目前宇树的电机核心零部件自研率超过80%，成本控制极佳..." }
  ]
};

// --- Monitor Data ---
export const MONITOR_DATA = {
  metrics: [
    { label: "Model Info", value: "Gemini 1.5 Pro" },
    { label: "Avg Latency", value: "240ms" },
    { label: "Total Req", value: "1,240,592" },
    { label: "Concurrency", value: "42" },
    { label: "Vector DB", value: "12.4M" },
    { label: "Error Rate", value: "0.02%" }
  ],
  logs: [
    { type: "login", user: "Admin", action: "System Login", time: "10:42:01" },
    { type: "gen", user: "User_88", action: "Generate Report: Unitree", time: "10:41:55" },
    { type: "sec", user: "System", action: "Block: Unauthorized API", time: "10:41:30" },
    { type: "doc", user: "Admin", action: "Upload: Q3_Report.pdf", time: "10:40:12" },
    { type: "sync", user: "System", action: "Sync: Wind Data", time: "10:40:00" }
  ],
  versions: [
    { ver: "v2.3", date: "2026-02-28", status: "active", desc: "Optimized M1 reasoning chain" },
    { ver: "v2.2", date: "2026-02-15", status: "inactive", desc: "Added Devil's Advocate mode" },
    { ver: "v2.1", date: "2026-01-20", status: "inactive", desc: "Fixed hallucination in M4" },
    { ver: "v2.0", date: "2026-01-01", status: "inactive", desc: "Initial release" }
  ]
};
