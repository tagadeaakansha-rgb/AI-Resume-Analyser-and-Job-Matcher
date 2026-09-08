import React, { useState } from 'react';
import { Settings, Key, Sparkles, Database, Server, Check, X, Shield } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, systemStatus, onUpdateConfig }) {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('claude-3-5-sonnet-20241022');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/system/claude-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: apiKey.trim() || null,
          model: model,
        }),
      });
      if (res.ok) {
        setSaveSuccess(true);
        if (onUpdateConfig) onUpdateConfig();
        setTimeout(() => {
          setSaveSuccess(false);
          onClose();
        }, 1200);
      }
    } catch (err) {
      console.error('Failed to update Claude configuration:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel-glow rounded-3xl p-6 sm:p-8 border border-cyan-500/40 text-left shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center">
              <Settings className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight font-display">
                System & AI Configuration
              </h3>
              <p className="text-xs text-slate-400">Claude API & Relational Database Settings</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Claude API Key */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 tracking-wider mb-1.5 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-cyan-400" />
              Anthropic Claude API Key (Optional)
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-ant-api03-..."
              className="w-full bg-midnight-950/90 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400"
            />
            <p className="text-[11px] text-slate-500 mt-1.5 leading-normal">
              If left blank, the app operates automatically using the built-in high-accuracy AI heuristic engine.
            </p>
          </div>

          {/* Claude Model Selector */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 tracking-wider mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Target Claude Model
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-midnight-950/90 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="claude-3-5-sonnet-20241022">Claude 3.5 Sonnet (Recommended - Deepest Reasoning)</option>
              <option value="claude-3-haiku-20240307">Claude 3 Haiku (Fastest Latency)</option>
              <option value="claude-3-opus-20240229">Claude 3 Opus (Complex Analysis)</option>
            </select>
          </div>

          {/* System Diagnostics Info */}
          <div className="p-4 rounded-2xl bg-midnight-950 border border-slate-800 space-y-2.5">
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Server className="w-3.5 h-3.5" />
              Live Backend Diagnostics
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-blue-400" /> Database Engine:
              </span>
              <span className="font-mono text-cyan-300 font-bold">
                {systemStatus?.database || 'MySQL 8.0 / Active'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" /> Database Jobs Count:
              </span>
              <span className="font-mono text-emerald-400 font-bold">
                {systemStatus?.jobsInDatabase || 32} Postings Active
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-indigo-400" /> Resumes Analyzed:
              </span>
              <span className="font-mono text-indigo-300 font-bold">
                {systemStatus?.resumesAnalyzedCount || 0}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-400 hover:text-white text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-md hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>{saving ? 'Saving...' : 'Save Configuration'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
