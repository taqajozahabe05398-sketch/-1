import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  BarChart3, 
  Target, 
  Zap, 
  Users, 
  ShieldCheck, 
  TrendingUp,
  Cpu,
  Globe,
  Share2,
  Download,
  ChevronRight
} from 'lucide-react';
import { AuroraCard } from './AuroraUI';
import { MODULES, MOCK_DATA } from '../data/mockData';

// --- Sub-components for Modules ---

const ModuleHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="mb-6 border-b border-white/10 pb-4">
    <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
      <span className="w-1 h-6 bg-gradient-to-b from-aria-cyan to-aria-purple rounded-full"></span>
      {title}
    </h2>
    <p className="text-aria-text-sub mt-1 ml-4 text-sm">{subtitle}</p>
  </div>
);

const M0_Overview = () => {
  const [score, setScore] = useState(MOCK_DATA.score);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 3) + 1; // 1 to 3
      const direction = Math.random() > 0.5 ? 1 : -1;
      setScore(prev => Math.min(100, Math.max(0, prev + change * direction)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <ModuleHeader title="投资概览" subtitle="Investment Highlights & Core Thesis" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AuroraCard className="p-6 md:col-span-2">
          <h3 className="text-aria-text-sub text-sm font-mono mb-2">CORE THESIS</h3>
          <p className="text-aria-text-main leading-relaxed text-lg">
            {MOCK_DATA.summary}
          </p>
          <div className="mt-6 flex gap-4">
            <div className="px-3 py-1 bg-aria-green/10 border border-aria-green/20 rounded text-aria-green text-xs font-mono">
              BULLISH
            </div>
            <div className="px-3 py-1 bg-aria-purple/10 border border-aria-purple/20 rounded text-aria-purple text-xs font-mono">
              HIGH GROWTH
            </div>
          </div>
        </AuroraCard>
        
        <div className="space-y-4">
          <AuroraCard className="p-4 flex items-center justify-between">
            <div>
              <div className="text-aria-text-sub text-xs font-mono mb-1">ARIA SCORE</div>
              <div className="text-4xl font-display font-bold text-aria-cyan aurora-text-shadow transition-all duration-500">
                {score}
                <span className="text-sm text-aria-text-sub ml-1 font-normal">/100</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full border-2 border-aria-cyan/30 flex items-center justify-center">
              <Zap className="w-6 h-6 text-aria-cyan" />
            </div>
          </AuroraCard>
          
          <AuroraCard className="p-4">
             <div className="text-aria-text-sub text-xs font-mono mb-2">MARKET CAP</div>
             <div className="text-2xl font-mono text-white">{MOCK_DATA.marketCap}</div>
             <div className="text-aria-green text-sm flex items-center mt-1">
               <TrendingUp className="w-3 h-3 mr-1" /> {MOCK_DATA.change} (24h)
             </div>
          </AuroraCard>
        </div>
      </div>
    </div>
  );
};

const M1_Market = () => (
  <div className="space-y-6">
    <ModuleHeader title="市场测算" subtitle="TAM / SAM / SOM Analysis" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AuroraCard className="p-6">
        <h3 className="text-aria-text-sub text-sm font-mono mb-6">TOTAL ADDRESSABLE MARKET (2030)</h3>
        <div className="flex items-end gap-2 mb-2">
          <span className="text-5xl font-display font-bold text-white">{MOCK_DATA.m1_market.tam}</span>
          <span className="text-aria-cyan font-mono mb-2">USD</span>
        </div>
        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mb-4">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-aria-cyan to-aria-purple"
          />
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-aria-text-sub">CAGR (2025-2030)</span>
          <span className="text-aria-green font-mono">{MOCK_DATA.m1_market.cagr}</span>
        </div>
      </AuroraCard>

      <AuroraCard className="p-6">
        <h3 className="text-aria-text-sub text-sm font-mono mb-6">MARKET SEGMENTATION</h3>
        <div className="space-y-4">
          {MOCK_DATA.m1_market.segments.map((seg, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white">{seg.name}</span>
                <span className="font-mono text-aria-text-sub">{seg.value}%</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${seg.value}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className="h-full bg-aria-cyan/60"
                  style={{ opacity: 1 - idx * 0.15 }}
                />
              </div>
            </div>
          ))}
        </div>
      </AuroraCard>
    </div>
  </div>
);

const M2_Competition = () => (
  <div className="space-y-6">
    <ModuleHeader title="竞争格局" subtitle="Competitive Landscape & Market Share" />
    <div className="grid grid-cols-1 gap-4">
      {MOCK_DATA.m2_competitors.map((comp, idx) => (
        <AuroraCard key={idx} className="p-4 flex items-center gap-4" delay={idx}>
          <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center font-mono text-aria-text-sub text-xs">
            {idx + 1}
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <span className={`font-medium ${idx === 0 ? 'text-aria-cyan' : 'text-white'}`}>{comp.name}</span>
              <span className="font-mono text-sm text-aria-text-sub">Share: {comp.share}%</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${comp.strength}%` }}
                transition={{ duration: 1, delay: idx * 0.1 }}
                className={`h-full ${idx === 0 ? 'bg-gradient-to-r from-aria-cyan to-aria-purple' : 'bg-white/20'}`}
              />
            </div>
          </div>
          <div className="text-right min-w-[80px]">
            <div className="text-xs text-aria-text-sub mb-1">YoY Growth</div>
            <div className="font-mono text-aria-green">+{comp.growth}%</div>
          </div>
        </AuroraCard>
      ))}
    </div>
  </div>
);

const M3_Metrics = () => (
  <div className="space-y-6">
    <ModuleHeader title="多维对比" subtitle="Quantitative Metrics Analysis" />
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {MOCK_DATA.m3_metrics.map((metric, idx) => (
        <AuroraCard key={idx} className="p-6 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors" delay={idx}>
          <div className="relative w-24 h-24 flex items-center justify-center mb-4">
            <svg className="w-full h-full -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="transparent" />
              <motion.circle 
                cx="48" cy="48" r="40" 
                stroke="url(#gradient)" 
                strokeWidth="6" 
                fill="transparent"
                strokeDasharray={251.2}
                strokeDashoffset={251.2}
                animate={{ strokeDashoffset: 251.2 * (1 - metric.score / 100) }}
                transition={{ duration: 1.5, delay: idx * 0.1 }}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00D9FF" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-mono text-xl font-bold text-white">
              {metric.score}
            </div>
          </div>
          <div className="text-aria-text-sub text-sm font-medium">{metric.label}</div>
        </AuroraCard>
      ))}
    </div>
  </div>
);

const M4_Customers = () => (
  <div className="space-y-6">
    <ModuleHeader title="客户分析" subtitle="Customer Demographics & Concentration" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AuroraCard className="p-6">
        <h3 className="text-aria-text-sub text-sm font-mono mb-6">REVENUE BY REGION</h3>
        <div className="space-y-4">
          {MOCK_DATA.m4_customers.regions.map((region, idx) => (
            <div key={idx} className="relative">
              <div className="flex justify-between text-sm mb-1 z-10 relative">
                <span className="text-white">{region.name}</span>
                <span className="font-mono text-aria-text-sub">{region.value}%</span>
              </div>
              <div className="w-full bg-white/5 h-8 rounded overflow-hidden relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${region.value}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className="h-full bg-gradient-to-r from-aria-cyan/20 to-aria-purple/20 border-r border-aria-cyan/50"
                />
              </div>
            </div>
          ))}
        </div>
      </AuroraCard>

      <div className="space-y-6">
        <AuroraCard className="p-6">
          <h3 className="text-aria-text-sub text-sm font-mono mb-4">CUSTOMER TYPES</h3>
          <div className="flex h-4 rounded-full overflow-hidden mb-4">
            {MOCK_DATA.m4_customers.types.map((type, idx) => (
              <motion.div
                key={idx}
                initial={{ width: 0 }}
                animate={{ width: `${type.value}%` }}
                transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                className={`h-full ${type.color}`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {MOCK_DATA.m4_customers.types.map((type, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <div className={`w-3 h-3 rounded-full ${type.color}`} />
                <span className="text-aria-text-sub">{type.name} ({type.value}%)</span>
              </div>
            ))}
          </div>
        </AuroraCard>

        <div className="grid grid-cols-2 gap-4">
          <AuroraCard className="p-4 text-center">
            <div className="text-xs text-aria-text-sub font-mono mb-1">CONCENTRATION</div>
            <div className="text-xl font-bold text-aria-green">{MOCK_DATA.m4_customers.concentration}</div>
          </AuroraCard>
          <AuroraCard className="p-4 text-center">
            <div className="text-xs text-aria-text-sub font-mono mb-1">TOP 5 REV %</div>
            <div className="text-xl font-bold text-white">{MOCK_DATA.m4_customers.top5Revenue}</div>
          </AuroraCard>
        </div>
      </div>
    </div>
  </div>
);

const M5_Policy = () => (
  <div className="space-y-6">
    <ModuleHeader title="政策追踪" subtitle="Regulatory Landscape & Impact Analysis" />
    <div className="relative border-l border-white/10 ml-4 space-y-8 py-2">
      {MOCK_DATA.m5_policy.map((item, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.2 }}
          className="relative pl-8"
        >
          <div className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full border-2 border-aria-bg ${
            item.impact === 'positive' ? 'bg-aria-green' : 
            item.impact === 'negative' ? 'bg-aria-orange' : 'bg-aria-text-sub'
          }`} />
          
          <AuroraCard className="p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-white font-medium text-lg">{item.title}</h3>
              <span className={`text-xs font-mono px-2 py-1 rounded border ${
                item.impact === 'positive' ? 'bg-aria-green/10 border-aria-green/20 text-aria-green' : 
                item.impact === 'negative' ? 'bg-aria-orange/10 border-aria-orange/20 text-aria-orange' : 'bg-white/5 border-white/10 text-aria-text-sub'
              }`}>
                {item.impact.toUpperCase()}
              </span>
            </div>
            <p className="text-aria-text-sub text-sm mb-3">{item.desc}</p>
            <div className="text-xs font-mono text-aria-text-sub/50">{item.date}</div>
          </AuroraCard>
        </motion.div>
      ))}
    </div>
  </div>
);

const M6_Growth = () => (
  <div className="space-y-6">
    <ModuleHeader title="增长逻辑" subtitle="Growth Drivers & Probability Assessment" />
    <div className="grid grid-cols-1 gap-4">
      {MOCK_DATA.m6_growth.map((item, idx) => (
        <AuroraCard key={idx} className="p-6 flex flex-col md:flex-row md:items-center gap-6" delay={idx}>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-aria-cyan/10 flex items-center justify-center text-aria-cyan font-bold text-sm">
                {idx + 1}
              </div>
              <h3 className="text-white font-medium text-lg">{item.title}</h3>
            </div>
            <p className="text-aria-text-sub text-sm pl-11">{item.desc}</p>
          </div>
          
          <div className="flex items-center gap-8 pl-11 md:pl-0">
            <div className="text-center">
              <div className="text-xs text-aria-text-sub font-mono mb-1">IMPACT</div>
              <div className={`font-bold ${item.impact === 'High' ? 'text-aria-cyan' : 'text-white'}`}>{item.impact}</div>
            </div>
            <div className="text-center min-w-[80px]">
              <div className="text-xs text-aria-text-sub font-mono mb-1">PROBABILITY</div>
              <div className="font-mono text-aria-green">{item.probability}</div>
            </div>
          </div>
        </AuroraCard>
      ))}
    </div>
    
    <AuroraCard className="p-6 mt-8 bg-gradient-to-r from-aria-cyan/5 to-aria-purple/5 border-aria-cyan/20">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-aria-cyan/10 text-aria-cyan">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-white font-medium">AI Projection Summary</h3>
          <p className="text-aria-text-sub text-sm mt-1">Based on the above drivers, the model predicts a <span className="text-aria-green">strong outperform</span> rating for the next 4 quarters.</p>
        </div>
      </div>
    </AuroraCard>
  </div>
);

const PlaceholderModule = ({ id }: { id: string }) => (
  <div className="flex flex-col items-center justify-center h-64 text-aria-text-sub">
    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 animate-pulse">
      <Cpu className="w-8 h-8 opacity-50" />
    </div>
    <p>Module {id} data visualization is generating...</p>
  </div>
);

// --- Main Report View ---

interface ReportViewProps {
  onBack: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({ onBack }) => {
  const [activeModule, setActiveModule] = useState('M0');
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  // Simulate log streaming
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const streamLogs = async () => {
      for (const log of MOCK_DATA.logs) {
        await new Promise(r => setTimeout(r, 800));
        setLogs(prev => [log, ...prev].slice(0, 5));
      }
    };
    streamLogs();
    return () => clearTimeout(timeout);
  }, []);

  const renderModule = () => {
    switch (activeModule) {
      case 'M0': return <M0_Overview />;
      case 'M1': return <M1_Market />;
      case 'M2': return <M2_Competition />;
      case 'M3': return <M3_Metrics />;
      case 'M4': return <M4_Customers />;
      case 'M5': return <M5_Policy />;
      case 'M6': return <M6_Growth />;
      default: return <PlaceholderModule id={activeModule} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden pt-20 pb-4 px-4 max-w-[1600px] mx-auto gap-6">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 flex-shrink-0 flex flex-col gap-2"
      >
        <div className="mb-6 px-2">
          <div className="text-xs font-mono text-aria-text-sub mb-2">TARGET ASSET</div>
          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
            <div className="w-10 h-10 rounded bg-aria-cyan/20 flex items-center justify-center text-aria-cyan font-bold">
              N
            </div>
            <div>
              <div className="font-bold text-white leading-tight">Nebula AI</div>
              <div className="text-xs text-aria-text-sub font-mono">NASDAQ: NBLA</div>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-aria-cyan/10 to-transparent border-l-2 border-aria-cyan text-white' 
                    : 'text-aria-text-sub hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                  }
                `}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-aria-cyan' : 'opacity-70'}`} />
                {mod.title}
                {isActive && <ChevronRight className="w-3 h-3 ml-auto opacity-50" />}
              </button>
            );
          })}
        </div>

        <div className="mt-auto pt-4 border-t border-white/10">
           <div className="bg-[#080C18] rounded-lg p-3 border border-white/5 font-mono text-[10px] text-aria-text-sub h-32 overflow-hidden flex flex-col-reverse">
             {logs.map((log, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="mb-1 truncate"
               >
                 <span className="text-aria-cyan mr-1">{'>'}</span> {log}
               </motion.div>
             ))}
           </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm text-aria-text-sub">
            <span className="cursor-pointer hover:text-white" onClick={onBack}>Home</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Report Generated</span>
          </div>
          <div className="flex gap-3">
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-aria-cyan/10 hover:bg-aria-cyan/20 text-aria-cyan border border-aria-cyan/20 transition-colors text-sm font-medium">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto pr-2 pb-10 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderModule()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
