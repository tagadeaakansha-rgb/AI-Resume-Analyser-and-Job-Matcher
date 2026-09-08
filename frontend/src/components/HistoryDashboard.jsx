import React, { useState, useEffect } from 'react';
import { Layers, Trash2, ArrowRight, User, Calendar, Award } from 'lucide-react';
import Tilt3DCard from './Tilt3DCard';

export default function HistoryDashboard({ onSelectAnalysis }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/resume/history');
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (e) {
      console.error('Failed to fetch history:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this analysis record from the database?')) return;
    try {
      const res = await fetch(`/api/resume/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setHistory((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete analysis:', e);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-slate-400 font-mono">Retrieving saved resumes from MySQL database...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          MySQL Database Persistence
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">
          Resume Analysis History
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Historical records of parsed resumes stored securely in your relational database.
        </p>
      </div>

      {history.length === 0 ? (
        <div className="py-20 text-center glass-panel rounded-3xl p-8 border border-slate-800 max-w-md mx-auto">
          <Layers className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No Saved Resumes Yet</h3>
          <p className="text-xs text-slate-400 mt-1">
            Upload and analyze a resume to have it automatically archived here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item) => (
            <Tilt3DCard key={item.id} maxTilt={6}>
              <div
                onClick={() => onSelectAnalysis(item)}
                className="group cursor-pointer glass-panel rounded-3xl p-6 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between h-full hover:shadow-[0_0_25px_rgba(0,240,255,0.15)]"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-midnight-950 border border-slate-800 flex items-center justify-center text-cyan-400">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-xs">
                        {item.atsScore}/100 ATS
                      </span>
                      <button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-900 transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.candidateName || 'Unnamed Candidate'}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono truncate mt-0.5">
                    {item.fileName}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-3 font-mono">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>
                      {item.analyzedAt ? new Date(item.analyzedAt).toLocaleString() : 'Recently'}
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-850">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                      Skills Identified ({item.technicalSkills?.length || 0})
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {item.technicalSkills?.slice(0, 4).map((sk, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-midnight-950 text-[10px] text-cyan-300 font-mono border border-slate-800">
                          {sk}
                        </span>
                      ))}
                      {item.technicalSkills?.length > 4 && (
                        <span className="text-[10px] text-slate-500 font-mono self-center">
                          +{item.technicalSkills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span className="font-semibold text-xs">Open Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>
      )}
    </div>
  );
}
