import React, { useState, useEffect, useRef } from 'react';
import { AuroraCard, AuroraButton } from '../components/AuroraUI';
import { GENERATE_LOGS, UNITREE_REPORT } from '../data/mockData';
import { 
  Sparkles, 
  CheckCircle2, 
  Loader2, 
  ChevronRight, 
  Terminal,
  FileText,
  Download,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Report Preview Components (Reused/Adapted from previous ReportView) ---
const ReportPreview = () => {
  return (
    <div className="space-y-8 p-6 animate-in fade-in duration-500">
      {/* M0 */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 bg-aria-cyan/10 text-aria-cyan text-xs font-mono rounded">M0</span>
          <h3 className="text-xl font-display font-bold text-white">投资概览</h3>
        </div>
        <AuroraCard className="p-6 border-l-4 border-l-aria-cyan">
          <div className="flex justify-between items-start mb-4">
            <div className="text-aria-text-sub text-sm font-mono">RATING</div>
            <div className="text-2xl font-bold text-aria-cyan">{UNITREE_REPORT.m0.rating}/5.0</div>
          </div>
          <p className="text-aria-text-main mb-4">{UNITREE_REPORT.m0.conclusion}</p>
          <div className="flex items-start gap-2 text-sm text-aria-orange/80 bg-aria-orange/5 p-3 rounded">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            {UNITREE_REPORT.m0.risks}
          </div>
        </AuroraCard>
      </section>

      {/* M1 */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 bg-aria-cyan/10 text-aria-cyan text-xs font-mono rounded">M1</span>
          <h3 className="text-xl font-display font-bold text-white">市场测算</h3>
        </div>
        <div className="bg-[#0A1023] p-4 rounded-lg border border-white/10 font-mono text-sm text-aria-cyan mb-4 overflow-x-auto">
          {UNITREE_REPORT.m1.formula}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {UNITREE_REPORT.m1.scenarios.map((s, i) => (
            <AuroraCard key={i} className="p-3 text-center">
              <div className="text-xs text-aria-text-sub mb-1">{s.name}</div>
              <div className="text-lg font-bold text-white mb-1">{s.value}</div>
              <div className="text-[10px] text-aria-text-sub/70">{s.assumption}</div>
            </AuroraCard>
          ))}
        </div>
      </section>

      {/* M2 */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 bg-aria-cyan/10 text-aria-cyan text-xs font-mono rounded">M2</span>
          <h3 className="text-xl font-display font-bold text-white">竞争格局</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-aria-text-sub font-mono text-xs bg-white/5">
              <tr>
                <th className="p-3 rounded-l-lg">Company</th>
                <th className="p-3">Type</th>
                <th className="p-3">Price</th>
                <th className="p-3">Tech</th>
                <th className="p-3 rounded-r-lg">Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {UNITREE_REPORT.m2.competitors.map((c, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className={`p-3 font-medium ${i === 0 ? 'text-aria-cyan' : 'text-white'}`}>{c.name}</td>
                  <td className="p-3 text-aria-text-sub">{c.type}</td>
                  <td className="p-3 text-aria-text-sub">{c.price}</td>
                  <td className="p-3 text-aria-text-sub">{c.tech}</td>
                  <td className="p-3 font-mono text-white">{c.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* M3 */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 bg-aria-cyan/10 text-aria-cyan text-xs font-mono rounded">M3</span>
          <h3 className="text-xl font-display font-bold text-white">多维评分</h3>
        </div>
        <div className="space-y-3">
          {UNITREE_REPORT.m3.scores.map((s, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="w-20 text-sm text-aria-text-sub text-right">{s.label}</span>
              <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-aria-cyan to-aria-purple" 
                  style={{ width: `${(s.val / 5) * 100}%` }}
                />
              </div>
              <span className="w-8 font-mono text-sm text-white">{s.val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* M6 */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 bg-aria-cyan/10 text-aria-cyan text-xs font-mono rounded">M6</span>
          <h3 className="text-xl font-display font-bold text-white">增长逻辑</h3>
        </div>
        <div className="space-y-3">
          {UNITREE_REPORT.m6.positive.map((text, i) => (
            <div key={i} className="flex gap-3 p-3 bg-aria-cyan/5 border border-aria-cyan/10 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-aria-cyan flex-shrink-0" />
              <p className="text-sm text-aria-text-main">{text}</p>
            </div>
          ))}
          {UNITREE_REPORT.m6.negative.map((text, i) => (
            <div key={i} className="flex gap-3 p-3 bg-aria-orange/5 border border-aria-orange/10 rounded-lg">
              <AlertCircle className="w-5 h-5 text-aria-orange flex-shrink-0" />
              <p className="text-sm text-aria-text-main">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

import { AlertCircle } from 'lucide-react';

export const GenerateReport = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [activeTab, setActiveTab] = useState<'terminal' | 'preview'>('terminal');
  const [logs, setLogs] = useState<any[]>([]);
  const [agentStatus, setAgentStatus] = useState<any>({
    master: 'idle', m1: 'idle', m2: 'idle', m3: 'idle', m4: 'idle', m5: 'idle', m6: 'idle', validator: 'idle'
  });
  const logsEndRef = useRef<HTMLDivElement>(null);

  const agents = [
    { id: 'master', name: '主控' },
    { id: 'm1', name: 'M1 市场' },
    { id: 'm2', name: 'M2 竞争' },
    { id: 'm3', name: 'M3 对比' },
    { id: 'm4', name: 'M4 客户' },
    { id: 'm5', name: 'M5 政策' },
    { id: 'm6', name: 'M6 增长' },
    { id: 'validator', name: '校验器' },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setIsComplete(false);
    setLogs([]);
    setActiveTab('terminal');
    
    // Reset agents
    setAgentStatus(Object.keys(agentStatus).reduce((acc, key) => ({...acc, [key]: 'idle'}), {}));

    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex >= GENERATE_LOGS.length) {
        clearInterval(interval);
        setIsGenerating(false);
        setIsComplete(true);
        setTimeout(() => setActiveTab('preview'), 800);
        return;
      }

      const log = GENERATE_LOGS[logIndex];
      setLogs(prev => [...prev, log]);
      
      // Update agent status based on logs (simplified logic)
      if (log.text.includes('STARTING M1')) setAgentStatus((p: any) => ({ ...p, master: 'complete', m1: 'running' }));
      if (log.text.includes('STARTING M2')) setAgentStatus((p: any) => ({ ...p, m1: 'complete', m2: 'running' }));
      if (log.text.includes('STARTING M6')) setAgentStatus((p: any) => ({ ...p, m2: 'complete', m6: 'running' }));
      if (log.text.includes('FINALIZING')) setAgentStatus((p: any) => ({ ...p, m6: 'complete', validator: 'running' }));
      if (log.text.includes('COMPLETE')) setAgentStatus((p: any) => ({ ...p, validator: 'complete' }));

      logIndex++;
    }, 100); // Fast simulation
  };

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Left Config Panel */}
      <AuroraCard className="w-[340px] flex flex-col p-6 h-full">
        <div className="space-y-6 flex-1">
          <div>
            <label className="block text-xs font-mono text-aria-text-sub mb-2">INDUSTRY</label>
            <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-aria-cyan outline-none">
              <option>人形机器人</option>
              <option>动力电池</option>
              <option>半导体</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono text-aria-text-sub mb-2">COMPANY</label>
            <input 
              type="text" 
              defaultValue="宇树科技"
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-aria-cyan outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-aria-text-sub mb-2">FOCUS AREA</label>
            <textarea 
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-aria-cyan outline-none h-24 resize-none"
              placeholder="e.g. 关注海外市场拓展与供应链风险..."
            />
          </div>
          
          <div>
            <label className="block text-xs font-mono text-aria-text-sub mb-2">MODULES</label>
            <div className="grid grid-cols-4 gap-2">
              {['M0', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6'].map(m => (
                <div key={m} className="aspect-square flex items-center justify-center rounded bg-aria-cyan/10 border border-aria-cyan/30 text-aria-cyan text-xs font-bold shadow-[0_0_10px_rgba(0,217,255,0.2)] cursor-pointer">
                  {m}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <AuroraButton 
            onClick={handleGenerate} 
            disabled={isGenerating}
            className="w-full !py-3 !text-lg"
          >
            {isGenerating ? 'Generating...' : 'Start Research Agent'}
            {!isGenerating && <Sparkles className="w-5 h-5" />}
          </AuroraButton>

          <div className="space-y-2 pt-4 border-t border-white/10">
            {agents.map(agent => (
              <div key={agent.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    agentStatus[agent.id] === 'running' ? 'bg-aria-purple animate-pulse' :
                    agentStatus[agent.id] === 'complete' ? 'bg-aria-green' : 'bg-white/20'
                  }`} />
                  <span className="text-aria-text-sub">{agent.name}</span>
                </div>
                <span className={`font-mono ${
                  agentStatus[agent.id] === 'running' ? 'text-aria-purple' :
                  agentStatus[agent.id] === 'complete' ? 'text-aria-green' : 'text-transparent'
                }`}>
                  {agentStatus[agent.id] === 'running' ? 'RUNNING' : 'DONE'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </AuroraCard>

      {/* Right Output Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Tabs */}
        <div className="flex items-center gap-1 mb-4 border-b border-white/10">
          <button 
            onClick={() => setActiveTab('terminal')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'terminal' ? 'border-aria-cyan text-white' : 'border-transparent text-aria-text-sub hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4" />
            Real-time Logs
          </button>
          <button 
            onClick={() => isComplete && setActiveTab('preview')}
            disabled={!isComplete}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'preview' ? 'border-aria-cyan text-white' : 'border-transparent text-aria-text-sub'
            } ${!isComplete ? 'opacity-50 cursor-not-allowed' : 'hover:text-white'}`}
          >
            <FileText className="w-4 h-4" />
            Report Preview
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 bg-[#050810] rounded-xl border border-white/10 overflow-hidden relative">
          {activeTab === 'terminal' ? (
            <div className="absolute inset-0 p-6 overflow-y-auto font-mono text-sm space-y-2 custom-scrollbar">
              {logs.map((log, idx) => (
                <div key={idx} className={`
                  ${log.type === 'header' ? 'text-aria-cyan font-bold mt-4 mb-2' : ''}
                  ${log.type === 'info' ? 'text-[#5B8FFF]' : ''}
                  ${log.type === 'detail' ? 'text-[#4A6080] pl-4' : ''}
                  ${log.type === 'success' ? 'text-aria-green' : ''}
                  ${log.type === 'divider' ? 'text-white/10 my-4' : ''}
                `}>
                  {log.text}
                </div>
              ))}
              <div ref={logsEndRef} />
              {isGenerating && (
                <div className="w-2 h-4 bg-aria-cyan animate-pulse inline-block align-middle ml-1" />
              )}
            </div>
          ) : (
            <div className="absolute inset-0 overflow-y-auto custom-scrollbar">
               <ReportPreview />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
