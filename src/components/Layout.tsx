import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Library, 
  Database, 
  Activity, 
  Settings,
  LogOut
} from 'lucide-react';
import { motion } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: '控制台' },
    { id: 'generate', icon: FileText, label: '生成研报' },
    { id: 'library', icon: Library, label: '研报库' },
    { id: 'knowledge', icon: Database, label: '知识库' },
    { id: 'monitor', icon: Activity, label: '系统监控' },
  ];

  return (
    <div className="flex h-screen bg-aria-bg text-aria-text-main overflow-hidden font-sans">
      {/* Background Effects */}
      <div className="fixed top-[-10%] left-[-10%] w-[800px] h-[800px] bg-aria-cyan rounded-full blur-[600px] opacity-[0.06] pointer-events-none mix-blend-screen animate-pulse-slow z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-aria-purple rounded-full blur-[400px] opacity-[0.06] pointer-events-none mix-blend-screen z-0" />
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0" />

      {/* Sidebar */}
      <aside className="w-64 bg-aria-card/50 backdrop-blur-xl border-r border-white/5 flex flex-col z-20 relative">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-aria-cyan to-aria-purple rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,217,255,0.3)]">
            <span className="font-display font-bold text-white">A</span>
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white">ARIA</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-aria-cyan/10 text-aria-cyan border border-aria-cyan/20 shadow-[0_0_15px_rgba(0,217,255,0.1)]' 
                    : 'text-aria-text-sub hover:bg-white/5 hover:text-white border border-transparent'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-aria-cyan' : 'group-hover:text-white'}`} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute left-0 w-1 h-8 bg-aria-cyan rounded-r-full" 
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-aria-cyan to-aria-purple flex items-center justify-center text-xs font-bold text-white">
              JS
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-medium text-white truncate">John Smith</div>
              <div className="text-xs text-aria-text-sub truncate">Senior Analyst</div>
            </div>
            <Settings className="w-4 h-4 text-aria-text-sub hover:text-white cursor-pointer" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative z-10 overflow-hidden flex flex-col">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-aria-bg/50 backdrop-blur-sm">
          <div className="text-aria-text-sub text-sm font-mono">
            PATH: <span className="text-aria-cyan">/ {activePage.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-aria-green animate-pulse-glow" />
              <span className="text-xs font-mono text-aria-text-sub">SYSTEM ONLINE</span>
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
};
