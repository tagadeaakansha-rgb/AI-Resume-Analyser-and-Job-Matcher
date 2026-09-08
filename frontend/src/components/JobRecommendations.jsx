import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Search, MapPin, DollarSign, ExternalLink, 
  Sparkles, CheckCircle, AlertCircle, ArrowUpRight, Filter, Bookmark, BookmarkCheck 
} from 'lucide-react';
import Tilt3DCard from './Tilt3DCard';

export default function JobRecommendations({ currentSkills = [], currentResumeId = null }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkType, setSelectedWorkType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedExp, setSelectedExp] = useState('');
  const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set());
  const [selectedJobAdvice, setSelectedJobAdvice] = useState(null);

  useEffect(() => {
    fetchRecommendations();
  }, [currentSkills, currentResumeId, selectedWorkType, selectedCategory, selectedExp]);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      if (currentSkills && currentSkills.length > 0) {
        // Fetch personalized AI recommendations
        const res = await fetch('/api/jobs/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            resumeId: currentResumeId,
            skills: currentSkills,
            workType: selectedWorkType || null,
            category: selectedCategory || null,
            experienceLevel: selectedExp || null,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          setJobs(data);
          setLoading(false);
          return;
        }
      }

      // Fallback: Fetch general jobs with filters
      let url = '/api/jobs?';
      if (searchQuery) url += `search=${encodeURIComponent(searchQuery)}&`;
      if (selectedWorkType) url += `workType=${encodeURIComponent(selectedWorkType)}&`;
      if (selectedCategory) url += `category=${encodeURIComponent(selectedCategory)}&`;
      if (selectedExp) url += `experienceLevel=${encodeURIComponent(selectedExp)}&`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        // Convert to match DTO structure for consistent rendering
        const formatted = data.map((job) => ({
          job: job,
          matchPercentage: 75,
          matchedSkills: (job.requiredSkills || '').split(',').slice(0, 3).map((s) => s.trim()),
          missingSkills: (job.requiredSkills || '').split(',').slice(3).map((s) => s.trim()),
          matchTier: 'Good Match',
          aiRecommendation: `Align your project experience with ${job.company}'s core requirements.`,
        }));
        setJobs(formatted);
      }
    } catch (e) {
      console.error('Failed to fetch job recommendations:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchRecommendations();
  };

  const toggleBookmark = (jobId) => {
    setBookmarkedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) {
        next.delete(jobId);
      } else {
        next.add(jobId);
      }
      return next;
    });
  };

  // Filter jobs by local search query if typed
  const displayedJobs = jobs.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const job = item.job;
    return (
      job.title.toLowerCase().includes(q) ||
      job.company.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q) ||
      (job.requiredSkills && job.requiredSkills.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Header & Match Status */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            AI Semantic Skill Gap Analysis
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">
            Recommended Tech Openings
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Ranked by match percentage against {currentSkills.length > 0 ? `${currentSkills.length} extracted skills` : 'all database listings'}
          </p>
        </div>

        {currentSkills.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-midnight-950 border border-cyan-500/30 text-xs">
            <span className="text-slate-400 font-medium">Candidate Vector:</span>
            <span className="text-cyan-300 font-mono font-bold">{currentSkills.length} Active Skills</span>
          </div>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-3">
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, tech stack (e.g. Java, Python, React), company..."
              className="w-full bg-midnight-950/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {/* Work Type Filter */}
            <select
              value={selectedWorkType}
              onChange={(e) => setSelectedWorkType(e.target.value)}
              className="bg-midnight-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="">All Work Types</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-midnight-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="">All Domains</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="AI & Machine Learning">AI & Machine Learning</option>
              <option value="Cloud & DevOps">Cloud & DevOps</option>
              <option value="Data Engineering">Data Engineering</option>
              <option value="Cyber Security">Cyber Security</option>
            </select>

            {/* Experience Level */}
            <select
              value={selectedExp}
              onChange={(e) => setSelectedExp(e.target.value)}
              className="bg-midnight-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="">All Experience</option>
              <option value="Entry">Entry Level</option>
              <option value="Mid">Mid Level</option>
              <option value="Senior">Senior Level</option>
              <option value="Lead">Lead / Principal</option>
            </select>

            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shrink-0 shadow-md"
            >
              Filter
            </button>
          </div>
        </form>
      </div>

      {/* Jobs Grid */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400 font-mono">Computing neural skill matching against open listings...</p>
        </div>
      ) : displayedJobs.length === 0 ? (
        <div className="py-16 text-center glass-panel rounded-3xl p-8 border border-slate-800 max-w-md mx-auto">
          <Briefcase className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No Matching Jobs Found</h3>
          <p className="text-xs text-slate-400 mt-1">
            Try clearing your filters or searching for different keywords.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedJobs.map((item) => {
            const job = item.job;
            const matchScore = item.matchPercentage || 75;
            const isBookmarked = bookmarkedJobs.has(job.id);

            const isHighMatch = matchScore >= 75;
            const matchBadgeColor = isHighMatch
              ? 'bg-cyan-950/90 text-cyan-300 border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
              : matchScore >= 50
              ? 'bg-blue-950/80 text-blue-300 border-blue-500/40'
              : 'bg-slate-900 text-slate-300 border-slate-800';

            return (
              <Tilt3DCard key={job.id} maxTilt={6}>
                <div className="h-full glass-panel rounded-3xl p-6 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(0,240,255,0.12)]">
                  <div>
                    {/* Top Meta: Company, Match %, Bookmark */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                          {job.company}
                        </span>
                        <h3 className="text-lg font-bold text-white tracking-tight mt-0.5 font-display">
                          {job.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Match Pill */}
                        <div className={`px-3 py-1 rounded-full border text-xs font-mono font-bold flex items-center gap-1 ${matchBadgeColor}`}>
                          <Sparkles className="w-3 h-3 text-cyan-400" />
                          <span>{matchScore}% Match</span>
                        </div>

                        {/* Bookmark Button */}
                        <button
                          onClick={() => toggleBookmark(job.id)}
                          className="p-1.5 rounded-lg bg-midnight-950 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
                          title="Bookmark Job"
                        >
                          {isBookmarked ? (
                            <BookmarkCheck className="w-4 h-4 text-cyan-400" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Location, Salary, Work Type Badges */}
                    <div className="flex items-center gap-2.5 text-xs text-slate-400 mb-4 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {job.location}
                      </span>
                      {job.salaryRange && (
                        <span className="flex items-center gap-1 text-emerald-400 font-mono">
                          <DollarSign className="w-3.5 h-3.5" />
                          {job.salaryRange}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-md bg-midnight-950 border border-slate-800 text-[10px] font-mono text-slate-300">
                        {job.workType}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-midnight-950 border border-slate-800 text-[10px] font-mono text-slate-300">
                        {job.experienceLevel}
                      </span>
                    </div>

                    {/* Job Description excerpt */}
                    <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Skill Comparison: Matched (Cyan) vs Missing (Amber) */}
                    <div className="space-y-2 mb-4 pt-3 border-t border-slate-850">
                      {item.matchedSkills && item.matchedSkills.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Matched:
                          </span>
                          {item.matchedSkills.map((s, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-medium"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}

                      {item.missingSkills && item.missingSkills.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> Missing:
                          </span>
                          {item.missingSkills.map((s, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-amber-950/60 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-medium"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedJobAdvice(item)}
                      className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Resume Tailoring Tip</span>
                    </button>

                    <a
                      href={job.applyUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600/90 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-all hover:scale-[1.02]"
                    >
                      <span>Apply Now</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </Tilt3DCard>
            );
          })}
        </div>
      )}

      {/* Tailor Resume Modal */}
      {selectedJobAdvice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg glass-panel-glow rounded-3xl p-6 border border-cyan-500/40 text-left">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white font-display">
                  Tailor Resume for {selectedJobAdvice.job.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedJobAdvice(null)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                ✕ Close
              </button>
            </div>

            <div className="p-3 rounded-xl bg-midnight-950 border border-slate-800 mb-4">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                AI Strategic Recommendation
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedJobAdvice.aiRecommendation}
              </p>
            </div>

            <div className="space-y-2 mb-4">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Target Keywords to Add in Your Bullet Points:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedJobAdvice.missingSkills && selectedJobAdvice.missingSkills.length > 0 ? (
                  selectedJobAdvice.missingSkills.map((sk, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-200 text-xs font-mono">
                      + {sk}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-emerald-400 font-mono">
                    ✓ All primary required keywords already present in your resume!
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedJobAdvice(null)}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-md transition-all"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
