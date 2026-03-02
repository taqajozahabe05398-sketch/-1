import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, Activity, ArrowRight, Terminal } from 'lucide-react';
import { AuroraCard, AuroraButton } from './AuroraUI';
import { MOCK_DATA } from '../data/mockData';

interface InputViewProps {
  onSearch: (term: string) => void;
}

export const InputView: React.FC<InputViewProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-4xl mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aria-cyan/10 border border-aria-cyan/20 text-aria-cyan text-xs font-mono mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aria-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-aria-cyan"></span>
          </span>
          SYSTEM ONLINE // ARIA V2.0
        </div>
        
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
          <span className="text-white">AI Research</span>
          <br />
          <span className="text-gradient-main aurora-text-shadow">Intelligence Assistant</span>
        </h1>
        
        <p className="text-aria-text-sub text-lg max-w-2xl mx-auto">
          输入目标企业名称或代码，ARIA 将自动聚合全网数据，生成多维度的深度投研报告。
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onSubmit={handleSearch}
        className="w-full max-w-2xl relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-aria-cyan to-aria-purple rounded-xl opacity-30 group-hover:opacity-60 blur transition duration-500"></div>
        <div className="relative flex items-center bg-[#0A1023] border border-white/10 rounded-xl p-2 shadow-2xl">
          <Search className={`w-6 h-6 ml-4 transition-colors ${isTyping ? 'text-aria-cyan' : 'text-aria-text-sub'}`} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsTyping(e.target.value.length > 0);
            }}
            placeholder="输入企业名称 (e.g. Nebula AI, Tesla, NVIDIA)..."
            className="w-full bg-transparent border-none focus:ring-0 text-white text-lg px-4 py-3 placeholder:text-aria-text-sub/50 font-sans"
            autoFocus
          />
          <AuroraButton type="submit" disabled={!searchTerm} className="!py-2 !px-6">
            Generate <Sparkles className="w-4 h-4 ml-2" />
          </AuroraButton>
        </div>
      </motion.form>

      {/* Feature Pills */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap justify-center gap-4 mt-12"
      >
        {['实时市场测算', '竞争格局图谱', '增长逻辑推演', '风险预警扫描'].map((feature, i) => (
          <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-aria-text-sub text-sm hover:bg-white/10 hover:border-aria-cyan/20 transition-colors cursor-default">
            <Activity className="w-3 h-3 text-aria-cyan" />
            {feature}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
