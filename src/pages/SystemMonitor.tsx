import React, { useState, useEffect } from 'react';
import { AuroraCard, AuroraButton } from '../components/AuroraUI';
import { MONITOR_DATA } from '../data/mockData';
import { 
  Activity, 
  Cpu, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle,
  Server,
  Database,
  Clock,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SystemMonitor = () => {
  const [metrics, setMetrics] = useState(MONITOR_DATA.metrics);
  const [logs, setLogs] = useState(MONITOR_DATA.logs);
  const [gpuUsage, setGpuUsage] = useState([45, 62, 30, 88]);
  const [versions, setVersions] = useState(MONITOR_DATA.versions);

  // Simulate Metrics & GPU
  useEffect(() => {
    const interval = setInterval(() => {
      // Update Total Req
      setMetrics(prev => prev.map(m => {
        if (m.label === 'Total Req') {
          const val = parseInt(m.value.replace(/,/g, ''));
          return { ...m, value: (val + Math.floor(Math.random() * 3) + 1).toLocaleString() };
        }
        return m;
      }));

      // Update GPU
      setGpuUsage(prev => prev.map(() => Math.floor(Math.random() * 60) + 20));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Simulate Logs
  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = {
        type: ['login', 'gen', 'sec', 'doc', 'sync'][Math.floor(Math.random() * 5)],
        user: 'System',
        action: 'Auto-Maintenance Task',
        time: new Date().toLocaleTimeString()
      };
      setLogs(prev => [newLog, ...prev.slice(0, 7)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSetVersion = (ver: string) => {
    setVersions(prev => prev.map(v => ({
      ...v,
      status: v.ver === ver ? 'active' : 'inactive'
    })));
    // Toast would go here
  };

  return (
    <div className="space-y-8">
      {/* Top Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((m, i) => (
          <AuroraCard key={i} className="p-4 flex flex-col justify-between h-24">
            <div className="text-xs text-aria-text-sub font-medium">{m.label}</div>
            <div className="text-xl font-mono font-bold text-white truncate">{m.value}</div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-aria-cyan/50 w-2/3" />
            </div>
          </AuroraCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: GPU Monitor */}
        <AuroraCard className="p-6">
          <h3 className="text-lg font-display font-bold text-white mb-6 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-aria-cyan" />
            GPU Cluster Status
          </h3>
          <div className="space-y-6">
            {gpuUsage.map((usage, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white font-mono">NVIDIA A100-80G #{i + 1}</span>
                  <span className={`font-mono ${
                    usage > 80 ? 'text-aria-orange' : usage > 50 ? 'text-yellow-400' : 'text-aria-green'
                  }`}>{usage}%</span>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${usage}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full ${
                      usage > 80 ? 'bg-aria-orange' : usage > 50 ? 'bg-yellow-400' : 'bg-aria-green'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
            <div className="text-center">
              <div className="text-xs text-aria-text-sub mb-1">VRAM Usage</div>
              <div className="text-xl font-mono text-white">284 GB / 320 GB</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-aria-text-sub mb-1">System RAM</div>
              <div className="text-xl font-mono text-white">64 GB / 128 GB</div>
            </div>
          </div>
        </AuroraCard>

        {/* Right: Security Logs */}
        <AuroraCard className="p-6">
          <h3 className="text-lg font-display font-bold text-white mb-6 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-aria-purple" />
            Security Audit Logs
          </h3>
          <div className="space-y-3 overflow-hidden">
            <AnimatePresence initial={false}>
              {logs.map((log, i) => (
                <motion.div
                  key={`${log.time}-${i}`}
                  initial={{ opacity: 0, x: 20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  className="flex items-center gap-3 p-3 rounded bg-white/5 border border-white/5 text-sm"
                >
                  <div className={`p-1.5 rounded ${
                    log.type === 'sec' ? 'bg-aria-orange/20 text-aria-orange' : 
                    log.type === 'login' ? 'bg-aria-cyan/20 text-aria-cyan' : 'bg-white/10 text-white'
                  }`}>
                    {log.type === 'sec' ? <AlertTriangle className="w-3 h-3" /> : 
                     log.type === 'login' ? <UserIcon className="w-3 h-3" /> : <Activity className="w-3 h-3" />}
                  </div>
                  <div className="flex-1">
                    <span className="text-aria-text-sub font-mono mr-2">[{log.time}]</span>
                    <span className="text-white">{log.action}</span>
                  </div>
                  <div className="text-xs text-aria-text-sub px-2 py-0.5 bg-black/20 rounded">
                    {log.user}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </AuroraCard>
      </div>

      {/* Bottom: Prompt Versions */}
      <section>
        <h3 className="text-lg font-display font-bold text-white mb-4">Prompt Version Management</h3>
        <div className="bg-aria-card border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-aria-text-sub font-mono text-xs">
              <tr>
                <th className="p-4">Version</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Description</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {versions.map((v) => (
                <tr key={v.ver} className={`
                  transition-colors
                  ${v.status === 'active' ? 'bg-aria-cyan/5' : 'hover:bg-white/5'}
                `}>
                  <td className="p-4 font-mono font-bold text-white">{v.ver}</td>
                  <td className="p-4 text-aria-text-sub font-mono">{v.date}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      v.status === 'active' 
                        ? 'bg-aria-green/10 text-aria-green border border-aria-green/20' 
                        : 'bg-white/10 text-aria-text-sub'
                    }`}>
                      {v.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-aria-text-main">{v.desc}</td>
                  <td className="p-4 text-right">
                    {v.status !== 'active' && (
                      <button 
                        onClick={() => handleSetVersion(v.ver)}
                        className="text-xs text-aria-cyan hover:underline"
                      >
                        Set as Current
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
