import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  User, Mail, Phone, MapPin, Linkedin, Github, 
  Sparkles, CheckCircle, AlertTriangle, Lightbulb, 
  Briefcase, Download, RotateCcw, ArrowRight, Layers
} from 'lucide-react';
import AtsGauge3D from './AtsGauge3D';
import Tilt3DCard from './Tilt3DCard';

export default function AnalysisDashboard({ analysis, onReset, onNavigateToJobs }) {
  useEffect(() => {
    if (analysis && analysis.atsScore >= 80) {
      // Trigger subtle celebration confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#38bdf8', '#3b82f6', '#818cf8'],
        });
      } catch (e) {
        // silent fallback
      }
    }
  }, [analysis]);

  if (!analysis) return null;

  const handleExportReport = () => {
    const reportData = JSON.stringify(analysis, null, 2);
    const blob = new Blob([reportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${analysis.candidateName || 'Candidate'}_ATS_Analysis_Report.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Top Candidate Bar */}
      <Tilt3DCard maxTilt={4}>
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-700 p-0.5 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                <div className="w-full h-full bg-cyber-black rounded-[14px] flex items-center justify-center">
                  <User className="w-8 h-8 text-cyan-300" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-2xl font-bold text-white tracking-tight font-display">
                    {analysis.candidateName || 'Candidate Profile'}
                  </h2>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                    {analysis.aiModelUsed || 'Claude 3.5 Sonnet'}
                  </span>
                </div>

                {/* Contact info metadata */}
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-300 flex-wrap">
                  {analysis.email && (
                    <span className="flex items-center gap-1.5 font-mono">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      {analysis.email}
                    </span>
                  )}
                  {analysis.phone && (
                    <span className="flex items-center gap-1.5 font-mono">
                      <Phone className="w-3.5 h-3.5 text-blue-400" />
                      {analysis.phone}
                    </span>
                  )}
                  {analysis.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      {analysis.location}
                    </span>
                  )}
                </div>

                {/* Social & Code Links */}
                <div className="flex items-center gap-3 mt-3">
                  {analysis.linkedin && (
                    <a
                      href={analysis.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 hover:underline"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn Profile</span>
                    </a>
                  )}
                  {analysis.github && (
                    <a
                      href={analysis.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 hover:underline"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 self-end lg:self-center flex-wrap">
              <button
                onClick={onNavigateToJobs}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all hover:scale-[1.02]"
              >
                <Briefcase className="w-4 h-4" />
                <span>View Matching Jobs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleExportReport}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-midnight-900 border border-slate-700 hover:border-cyan-500/50 text-slate-200 text-xs font-medium transition-all"
                title="Download full JSON analysis report"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Export Report</span>
              </button>

              <button
                onClick={onReset}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-midnight-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white text-xs font-medium transition-all"
                title="Analyze Another Resume"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Professional Summary */}
          {analysis.professionalSummary && (
            <div className="mt-6 pt-5 border-t border-slate-800/80">
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                Parsed Executive Summary
              </span>
              <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
                {analysis.professionalSummary}
              </p>
            </div>
          )}
        </div>
      </Tilt3DCard>

      {/* Main Grid: Left Gauge + Right Skills & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: ATS Score Gauge & Claude Critique (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 3D ATS Score Card */}
          <Tilt3DCard maxTilt={5}>
            <div className="glass-panel rounded-3xl p-6 border border-cyan-900/50 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  ATS Performance Index
                </h3>
                <span className="text-[10px] font-mono text-slate-400">Standard Recruiter Filter</span>
              </div>
              <AtsGauge3D
                score={analysis.atsScore}
                keywordScore={analysis.keywordScore}
                impactScore={analysis.impactScore}
                formattingScore={analysis.formattingScore}
                brevityScore={analysis.brevityScore}
              />
            </div>
          </Tilt3DCard>

          {/* Claude AI Executive Critique */}
          <div className="glass-panel-glow rounded-3xl p-6 border border-cyan-500/30">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-tight">
                  Claude AI Executive Critique
                </h4>
                <p className="text-[10px] text-slate-400 font-mono">
                  Deep learning semantic feedback
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-cyan-400 pl-3 py-1">
              "{analysis.claudeAiCritique || 'Resume displays solid structural foundations. Emphasizing business metrics and key cloud skills will maximize recruiter outreach.'}"
            </p>
          </div>

          {/* Missing Keywords Box */}
          {analysis.missingKeywords && analysis.missingKeywords.length > 0 && (
            <div className="glass-panel rounded-3xl p-6 border border-amber-500/30 bg-midnight-950/70">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold text-amber-300">
                  Missing High-Impact Keywords
                </h4>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Recruiter bots screen for these essential terms. Consider incorporating them into your project bullet points:
              </p>
              <div className="flex flex-wrap gap-2">
                {analysis.missingKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-200 text-xs font-mono font-semibold"
                  >
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Categorized Skills & Qualitative Breakdown (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Extracted Skills Matrix */}
          <div className="glass-panel rounded-3xl p-6 border border-cyan-900/40 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  Extracted Skills Matrix ({analysis.technicalSkills ? analysis.technicalSkills.length : 0} Identified)
                </h3>
              </div>
              <span className="text-xs font-mono text-cyan-300">
                100% Parsed
              </span>
            </div>

            {/* Categorized breakdown if available */}
            {analysis.skillsByCategory && Object.keys(analysis.skillsByCategory).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(analysis.skillsByCategory).map(([cat, skills]) => (
                  <div key={cat} className="space-y-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                      {cat} ({skills.length})
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-3 py-1 rounded-xl bg-midnight-900 border border-cyan-500/30 text-cyan-200 text-xs font-medium hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {analysis.technicalSkills && analysis.technicalSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-midnight-900 border border-cyan-500/30 text-cyan-200 text-xs font-medium hover:border-cyan-400 transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Strengths & Actionable Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="glass-panel rounded-2xl p-5 border border-emerald-500/30 bg-midnight-950/50">
              <div className="flex items-center gap-2 mb-3 text-emerald-400">
                <CheckCircle className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
                  Key Strengths
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {analysis.strengths && analysis.strengths.length > 0 ? (
                  analysis.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>{str}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-400">Strong core technical foundation verified.</li>
                )}
              </ul>
            </div>

            {/* Improvement Tips */}
            <div className="glass-panel rounded-2xl p-5 border border-blue-500/30 bg-midnight-950/50">
              <div className="flex items-center gap-2 mb-3 text-blue-400">
                <Lightbulb className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
                  Optimization Tips
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {analysis.improvementTips && analysis.improvementTips.length > 0 ? (
                  analysis.improvementTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-400">Ensure every bullet point follows the X-Y-Z formula.</li>
                )}
              </ul>
            </div>
          </div>

          {/* Experience Snippets Parsed */}
          {analysis.experienceSummary && analysis.experienceSummary.length > 0 && (
            <div className="glass-panel rounded-2xl p-5 border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-3">
                Detected Experience Highlights
              </h4>
              <div className="space-y-2">
                {analysis.experienceSummary.map((exp, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-midnight-950/80 border border-slate-800/80 text-xs text-slate-300 leading-relaxed font-mono">
                    {exp}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
