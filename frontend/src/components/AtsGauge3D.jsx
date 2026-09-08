import React, { useEffect, useState } from 'react';
import { Award, Zap, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AtsGauge3D({ score = 0, keywordScore = 0, impactScore = 0, formattingScore = 0, brevityScore = 0 }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = Math.max(1, Math.ceil(score / 35));
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(current);
      }
    }, 25);
    return () => clearInterval(timer);
  }, [score]);

  // Radius and circumference
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const getScoreColor = (val) => {
    if (val >= 80) return { stroke: '#00f0ff', text: 'text-cyan-400', glow: 'rgba(0, 240, 255, 0.4)', label: 'Excellent ATS Fit' };
    if (val >= 65) return { stroke: '#38bdf8', text: 'text-sky-400', glow: 'rgba(56, 189, 248, 0.4)', label: 'Competitive Fit' };
    return { stroke: '#f59e0b', text: 'text-amber-400', glow: 'rgba(245, 158, 11, 0.4)', label: 'Needs Optimization' };
  };

  const status = getScoreColor(score);

  return (
    <div className="flex flex-col items-center">
      {/* 3D Circular Ring Gauge */}
      <div className="relative flex items-center justify-center p-4">
        {/* Glow backdrop */}
        <div
          className="absolute inset-0 rounded-full filter blur-2xl opacity-40 transition-all duration-700"
          style={{ background: status.glow }}
        />

        <svg className="w-52 h-52 transform -rotate-90" viewBox="0 0 180 180">
          <defs>
            <linearGradient id="cyberGaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="60%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          {/* Background Track */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            stroke="#0a183d"
            strokeWidth="12"
            fill="transparent"
          />
          {/* Animated Value Arc */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            stroke="url(#cyberGaugeGrad)"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${status.stroke})`,
            }}
          />
        </svg>

        {/* Center Score Readout */}
        <div className="absolute flex flex-col items-center text-center">
          <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
            ATS Score
          </span>
          <div className="flex items-baseline justify-center">
            <span className="text-5xl font-extrabold tracking-tight text-white font-mono drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]">
              {animatedScore}
            </span>
            <span className="text-slate-400 text-lg font-mono ml-1">/100</span>
          </div>
          <span className={`text-xs font-semibold tracking-wide mt-1 px-2.5 py-0.5 rounded-full bg-slate-900/80 border border-slate-700/60 ${status.text}`}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Sub-Metrics Breakdown */}
      <div className="w-full grid grid-cols-2 gap-3 mt-4">
        <SubMetricPill
          icon={<Zap className="w-3.5 h-3.5 text-cyan-400" />}
          label="Keywords"
          value={keywordScore}
          color="bg-cyan-500"
        />
        <SubMetricPill
          icon={<Award className="w-3.5 h-3.5 text-blue-400" />}
          label="Impact & Metrics"
          value={impactScore}
          color="bg-blue-500"
        />
        <SubMetricPill
          icon={<FileText className="w-3.5 h-3.5 text-indigo-400" />}
          label="Formatting"
          value={formattingScore}
          color="bg-indigo-500"
        />
        <SubMetricPill
          icon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          label="Brevity / Conciseness"
          value={brevityScore}
          color="bg-emerald-500"
        />
      </div>
    </div>
  );
}

function SubMetricPill({ icon, label, value, color }) {
  return (
    <div className="bg-midnight-900/90 border border-slate-800/80 rounded-xl p-2.5 flex flex-col justify-between">
      <div className="flex items-center justify-between text-xs mb-1.5">
        <div className="flex items-center gap-1.5 text-slate-300 font-medium">
          {icon}
          <span>{label}</span>
        </div>
        <span className="font-mono font-bold text-slate-100">{value}%</span>
      </div>
      <div className="w-full bg-slate-950/80 rounded-full h-1.5 overflow-hidden border border-slate-800">
        <div
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${Math.min(100, Math.max(5, value))}%` }}
        />
      </div>
    </div>
  );
}
