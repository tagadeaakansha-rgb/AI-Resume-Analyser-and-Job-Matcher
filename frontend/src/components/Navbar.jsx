import React from 'react';
import { Sparkles, Database, Settings, ShieldCheck, Briefcase, FileSearch, Layers } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, systemStatus, onOpenSettings }) {
  const tabs = [
    { id: 'analyser', label: 'Resume Analyser', icon: FileSearch },
    { id: 'jobs', label: 'AI Job Matcher', icon: Briefcase },
    { id: 'benchmark', label: '50+ Resume Benchmarks', icon: ShieldCheck },
    { id: 'history', label: 'Database History', icon: Layers },
  ];

  const isDbConnected = systemStatus?.database?.includes('MySQL') || systemStatus?.database?.includes('Connected');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan-900/40 bg-cyber-void/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo & Branding */}
        <div 
          onClick={() => setActiveTab('analyser')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-700 p-0.5 shadow-[0_0_20px_rgba(0,240,255,0.4)] group-hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] transition-all duration-300">
            <div className="w-full h-full bg-cyber-black rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight font-display text-white">
                NEXUS<span className="text-cyan-400">AI</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 uppercase tracking-wider">
                Claude 3.5
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-wide font-medium">
              3D AI Resume Analyser & Job Recommendation Engine
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 bg-midnight-950/90 border border-slate-800/80 p-1.5 rounded-2xl shadow-inner">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Status & Actions */}
        <div className="flex items-center gap-3">
          {/* DB Status Pill */}
          <div 
            title={`Database: ${systemStatus?.database || 'Connecting...'}`}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-midnight-900/80 border border-slate-800 text-xs text-slate-300"
          >
            <Database className={`w-3.5 h-3.5 ${isDbConnected ? 'text-cyan-400' : 'text-amber-400'}`} />
            <span className="font-mono text-[11px]">
              {systemStatus?.database?.includes('MySQL') ? 'MySQL 8.0' : 'H2 Active'}
            </span>
            <span className={`w-2 h-2 rounded-full ${isDbConnected ? 'bg-cyan-400 animate-pulse' : 'bg-amber-400'}`} />
          </div>

          {/* Settings Trigger */}
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-midnight-900/90 hover:bg-midnight-800 border border-cyan-900/50 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 text-xs font-medium transition-all shadow-md group"
            title="Configure Claude API & System Settings"
          >
            <Settings className="w-4 h-4 text-cyan-400 group-hover:rotate-90 transition-transform duration-300" />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </div>

      {/* Mobile navigation bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800/60 bg-cyber-black/95 px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-medium transition-all ${
                isActive ? 'text-cyan-400 font-bold' : 'text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
