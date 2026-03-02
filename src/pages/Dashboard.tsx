import React, { useState, useEffect } from 'react';
import { DASHBOARD_DATA } from '../data/mockData';
import { AuroraCard } from '../components/AuroraUI';
import { 
  FileText, 
  Clock, 
  Database, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  CheckCircle2,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

export const Dashboard = () => {
  const [stats, setStats] = useState(DASHBOARD_DATA.stats);
  const [agents, setAgents] = useState(DASHBOARD_DATA.agents);

  // Simulate stats fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => prev.map(stat => {
        if (stat.label === '模型响应延迟') {
          const val = parseInt(stat.value);
          const change = Math.floor(Math.random() * 20) - 10;
          return { ...stat, value: `${val + change}` };
        }
        return stat;
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Simulate agent status
  useEffect(() => {
    const interval = setInterval(() => {
      const activeIndex = Math.floor(Math.random() * agents.length);
      setAgents(prev => prev.map((agent, idx) => ({
        ...agent,
        status: idx === activeIndex ? 'running' : (Math.random() > 0.7 ? 'complete' : 'idle')
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <AuroraCard key={idx} className="p-6 flex flex-col justify-between h-32 group">
            <div className="flex justify-between items-start">
              <span className="text-aria-text-sub text-sm font-medium">{stat.label}</span>
              <div className={`p-2 rounded-lg bg-white/5 group-hover:bg-aria-cyan/10 transition-colors`}>
                {idx === 0 && <FileText className="w-4 h-4 text-aria-cyan" />}
                {idx === 1 && <Clock className="w-4 h-4 text-aria-purple" />}
                {idx === 2 && <Database className="w-4 h-4 text-aria-green" />}
                {idx === 3 && <Activity className="w-4 h-4 text-aria-orange" />}
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-mono font-bold text-white aurora-text-shadow">{stat.value}</span>
                <span className="text-xs text-aria-text-sub font-mono">{stat.unit}</span>
              </div>
              <div className={`text-xs font-mono flex items-center ${stat.change.startsWith('+') ? 'text-aria-green' : 'text-aria-orange'}`}>
                {stat.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {stat.change}
              </div>
            </div>
          </AuroraCard>
        ))}
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Reports */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-display font-bold text-white">最近研报</h3>
            <button className="text-xs text-aria-cyan hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {DASHBOARD_DATA.recentReports.map((report) => (
              <AuroraCard key={report.id} className="p-4 flex items-center justify-between group hover:bg-white/5 transition-colors relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-aria-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-xl">
                    {report.emoji}
                  </div>
                  <div>
                    <div className="font-bold text-white">{report.company}</div>
                    <div className="text-xs text-aria-text-sub flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px]">{report.modules} Modules</span>
                      <span>Time: {report.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-xs text-aria-text-sub">Score</div>
                    <div className="font-mono font-bold text-aria-cyan">{report.score}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-aria-cyan/50 group-hover:text-aria-cyan transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </AuroraCard>
            ))}
          </div>
        </div>

        {/* Data Sources */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-display font-bold text-white">数据源状态</h3>
            <button className="text-xs text-aria-cyan hover:underline">Manage</button>
          </div>
          <div className="space-y-3">
            {DASHBOARD_DATA.dataSources.map((source, idx) => (
              <AuroraCard key={idx} className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${source.status === 'online' ? 'bg-aria-green animate-pulse-glow' : 'bg-aria-orange'}`} />
                    <span className="font-medium text-white text-sm">{source.name}</span>
                  </div>
                  <span className="text-xs font-mono text-aria-text-sub">{source.count}</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-aria-cyan to-aria-purple"
                    style={{ width: `${source.progress}%` }}
                  />
                </div>
              </AuroraCard>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Agents */}
      <div className="space-y-4">
        <h3 className="text-lg font-display font-bold text-white">Agent 工作流状态</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {agents.map((agent: any) => (
            <AuroraCard 
              key={agent.id} 
              className={`
                p-3 flex flex-col items-center justify-center text-center gap-2 border transition-all duration-300
                ${agent.status === 'running' ? 'border-aria-purple/50 bg-aria-purple/5' : 
                  agent.status === 'complete' ? 'border-aria-green/30 bg-aria-green/5' : 'border-white/5'}
              `}
            >
              <div className="relative">
                {agent.status === 'running' ? (
                  <Loader2 className="w-5 h-5 text-aria-purple animate-spin" />
                ) : agent.status === 'complete' ? (
                  <CheckCircle2 className="w-5 h-5 text-aria-green" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-white/20" />
                )}
              </div>
              <span className={`text-xs font-medium ${
                agent.status === 'running' ? 'text-aria-purple' : 
                agent.status === 'complete' ? 'text-aria-green' : 'text-aria-text-sub'
              }`}>
                {agent.name}
              </span>
            </AuroraCard>
          ))}
        </div>
      </div>
    </div>
  );
};
