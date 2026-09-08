import React, { useEffect, useState } from 'react';
import { Cpu, FileSearch, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HoloScanModal({ isOpen, fileName = 'Resume.pdf' }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: 'Parsing PDF binary layout & typography hierarchy', icon: FileSearch },
    { label: 'Extracting candidate contact details & work history', icon: Cpu },
    { label: 'Synthesizing skills with Claude 3.5 Sonnet intelligence', icon: Sparkles },
    { label: 'Calculating ATS score & benchmark keyword gaps', icon: CheckCircle2 },
  ];

  useEffect(() => {
    if (!isOpen) {
      setActiveStep(0);
      return;
    }
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 700);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel-glow rounded-3xl p-8 border border-cyan-500/40 text-center overflow-hidden shadow-2xl">
        {/* Background glow flares */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/20 rounded-full filter blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full filter blur-3xl" />

        {/* 3D Holographic Document Container with Laser Scan Beam */}
        <div className="relative w-40 h-52 mx-auto mb-6 bg-midnight-950/80 rounded-xl border border-cyan-500/40 shadow-[0_0_30px_rgba(0,240,255,0.2)] overflow-hidden flex flex-col justify-between p-3.5">
          {/* Subtle document fake text lines */}
          <div className="space-y-2 opacity-30">
            <div className="h-2 w-3/4 bg-cyan-400 rounded" />
            <div className="h-1.5 w-1/2 bg-blue-400 rounded" />
            <div className="h-1.5 w-full bg-slate-400 rounded" />
            <div className="h-1.5 w-5/6 bg-slate-400 rounded" />
            <div className="h-1.5 w-4/6 bg-slate-400 rounded" />
            <div className="h-2 w-2/3 bg-cyan-400 rounded mt-3" />
            <div className="h-1.5 w-full bg-slate-400 rounded" />
            <div className="h-1.5 w-3/4 bg-slate-400 rounded" />
          </div>

          {/* Animated Hologram Laser Scanning Beam */}
          <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00f0ff,0_0_5px_#fff] animate-scan-line pointer-events-none" />

          {/* Glowing scanner particle grid */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-cyan-500/10 pointer-events-none" />

          <div className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest text-center border-t border-cyan-900/60 pt-1">
            AI Optical Scan
          </div>
        </div>

        {/* Status Heading */}
        <h3 className="text-xl font-bold text-white mb-1 tracking-tight font-display flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          Analyzing Resume Architecture
        </h3>
        <p className="text-xs text-slate-400 font-mono mb-6 truncate max-w-xs mx-auto">
          File: <span className="text-cyan-300">{fileName}</span>
        </p>

        {/* Stepper Progress */}
        <div className="space-y-3 text-left max-w-sm mx-auto">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isDone = idx < activeStep;
            const isCurrent = idx === activeStep;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all duration-300 ${
                  isCurrent
                    ? 'bg-cyan-950/40 border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.15)] text-cyan-200'
                    : isDone
                    ? 'bg-midnight-900/60 border-slate-800 text-slate-400'
                    : 'bg-midnight-950/40 border-slate-900/60 text-slate-600'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono transition-colors ${
                    isCurrent
                      ? 'bg-cyan-500 text-black font-bold animate-pulse'
                      : isDone
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-900 text-slate-600 border border-slate-800'
                  }`}
                >
                  {isDone ? '✓' : idx + 1}
                </div>
                <span className="text-xs font-medium tracking-wide flex-1">
                  {step.label}
                </span>
                {isCurrent && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-[11px] text-slate-500 font-mono">
          Powered by Claude 3.5 Sonnet • Java Spring Boot • Apache PDFBox
        </div>
      </div>
    </div>
  );
}
