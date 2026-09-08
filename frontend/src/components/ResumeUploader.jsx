import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Sparkles, ArrowRight, Zap, Code, Shield, Brain } from 'lucide-react';
import Tilt3DCard from './Tilt3DCard';

export default function ResumeUploader({ onAnalyzeFile, onAnalyzeText, isAnalyzing }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeInputMode, setActiveInputMode] = useState('upload'); // 'upload' or 'paste'
  const [pastedText, setPastedText] = useState('');
  const fileInputRef = useRef(null);

  const sampleResumes = [
    {
      role: 'Full-Stack Java Architect',
      candidate: 'Sarah Jenkins',
      badge: 'Java + Spring + React',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      text: `Sarah Jenkins
sarah.jenkins.dev@example.com | (415) 555-0192 | San Francisco, CA
linkedin.com/in/sarah-jenkins-architect | github.com/sjenkins-cloud

PROFESSIONAL SUMMARY
Senior Full-Stack Java Engineer with 7+ years of expertise in architecting high-concurrency microservices and reactive interfaces. Spearheaded migration of legacy services to Spring Boot and React, driving a 45% latency reduction and saving $140,000 in infrastructure costs annually.

CORE TECHNICAL SKILLS
Languages: Java (8/11/17), JavaScript, TypeScript, SQL, HTML5, CSS3
Frameworks & Libraries: Spring Boot, Spring Cloud, React, Next.js, Redux, Tailwind CSS, Express
Databases & Storage: MySQL, PostgreSQL, Redis, MongoDB
Cloud & DevOps: AWS (ECS, S3, RDS), Docker, Kubernetes, CI/CD, GitHub Actions, Microservices, REST API, Kafka
Tools: Git, Maven, Postman, Linux, JIRA, Agile, JUnit

PROFESSIONAL EXPERIENCE
Lead Software Engineer | Apex Cloud Systems (2021 - Present)
• Spearheaded architecture of distributed payment microservices utilizing Spring Boot and MySQL, processing $12M+ monthly transactions with 99.99% uptime.
• Engineered responsive web applications with React and TypeScript, optimizing Web Vitals and reducing bundle load time by 38%.
• Containerized 15 microservices using Docker and orchestrated deployments on AWS Elastic Kubernetes Service.
• Mentored 6 junior and mid-level software engineers and championed test-driven development (TDD).

Senior Java Developer | NexaTech Solutions (2018 - 2021)
• Designed resilient RESTful APIs using Java and Spring Data JPA with MySQL database connection pooling.
• Implemented Redis distributed caching layer, reducing database read latency by 62% for high-frequency queries.
• Integrated Apache Kafka event streams for asynchronous audit logging and notification handling.

EDUCATION
B.S. in Computer Science | University of California, Berkeley (2014 - 2018)`,
    },
    {
      role: 'Lead AI / ML Engineer',
      candidate: 'Dr. Aaron Vance',
      badge: 'Python + PyTorch + LLM',
      icon: Brain,
      color: 'from-purple-500 to-cyan-500',
      text: `Dr. Aaron Vance
aaron.vance.ai@example.com | (206) 555-0183 | Seattle, WA
linkedin.com/in/aaron-vance-ai | github.com/aaron-vance-nlp

PROFESSIONAL SUMMARY
Principal Machine Learning & Generative AI Specialist with PhD in Artificial Intelligence and 6+ years of production ML experience. Pioneered LLM agentic reasoning pipelines and transformer architectures that scaled user retention by 28% across 4M monthly active users.

CORE TECHNICAL SKILLS
Languages: Python, C++, SQL, Bash, Go
Machine Learning & AI: PyTorch, TensorFlow, LLM, Claude API, Transformers, Hugging Face, Scikit-learn, OpenCV, NLP
Databases & Storage: PostgreSQL, Redis, Vector DB, Pinecone, Milvus
Cloud & Platform: AWS (SageMaker, Lambda), Docker, Kubernetes, FastAPI, MLflow, CI/CD, Linux, Git

PROFESSIONAL EXPERIENCE
Staff AI Engineer | DeepScale Dynamics (2022 - Present)
• Architected enterprise LLM multi-modal retrieval pipelines leveraging Claude 3.5 Sonnet and vector databases, boosting response accuracy to 94.8%.
• Optimized distributed PyTorch transformer fine-tuning on clusters of NVIDIA H100 GPUs, decreasing training epochs by 40%.
• Deployed low-latency REST inference APIs with FastAPI and Docker on Kubernetes, serving 2,500 requests per second.

Senior ML Engineer | Cognitive Cloud Corp (2019 - 2022)
• Built automated feature engineering pipelines in Python and Spark processing 15TB of customer telemetry daily.
• Productionized predictive classification models that decreased churn by 18% ($2.4M ARR impact).

EDUCATION
Ph.D. in Computer Science & Artificial Intelligence | Stanford University
B.S. in Mathematics & Computer Science | University of Washington`,
    },
    {
      role: 'Cloud DevOps & SRE Lead',
      candidate: 'Marcus Zhao',
      badge: 'AWS + Kubernetes + Terraform',
      icon: Shield,
      color: 'from-cyan-500 to-blue-600',
      text: `Marcus Zhao
marcus.zhao.sre@example.com | (512) 555-0177 | Austin, TX
linkedin.com/in/marcus-zhao-devops | github.com/marcuszhao-ops

PROFESSIONAL SUMMARY
Principal Cloud Platform & Site Reliability Engineer with 8+ years of experience leading multi-region AWS and Kubernetes infrastructure. Champion of GitOps, automated CI/CD pipelines, and zero-downtime microservices architectures.

CORE TECHNICAL SKILLS
Cloud Providers: AWS (EKS, IAM, CloudFront, Route53, VPC, S3), GCP, Azure
DevOps & Orchestration: Kubernetes, Docker, Terraform, Helm, Jenkins, GitHub Actions, ArgoCD, Linux
Scripting & Coding: Python, Bash, Go, REST API, Git
Observability & Databases: Prometheus, Grafana, MySQL, PostgreSQL, Redis, Elasticsearch, Linux

PROFESSIONAL EXPERIENCE
Head of Infrastructure & SRE | Horizon Scale Systems (2021 - Present)
• Designed and provisioned infrastructure as code (IaC) using Terraform across 3 AWS regions, reducing deployment setup time from days to 15 minutes.
• Maintained 99.995% availability for 45 containerized microservices handling 250M monthly HTTP requests on Kubernetes.
• Built automated CI/CD deployment workflows with GitHub Actions and ArgoCD, slashing release cycle times by 65%.

Senior DevOps Engineer | CloudForge Infrastructure (2017 - 2021)
• Engineered centralized monitoring using Prometheus and Grafana, lowering Mean Time to Detect (MTTD) by 55%.
• Automated MySQL automated disaster recovery failover and zero-data-loss snapshots.

EDUCATION
B.S. in Software Engineering | University of Texas at Austin`,
    },
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file) => {
    setSelectedFile(file);
  };

  const handleSubmitFile = () => {
    if (selectedFile) {
      onAnalyzeFile(selectedFile);
    }
  };

  const handleSubmitPastedText = () => {
    if (pastedText.trim()) {
      onAnalyzeText(pastedText, 'Pasted_Resume.txt');
    }
  };

  const handleSelectSample = (sample) => {
    onAnalyzeText(sample.text, `${sample.candidate}_${sample.role.replace(/\s+/g, '_')}.txt`);
  };

  return (
    <div className="w-full space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto pt-6 pb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
          Next-Gen ATS Parser Powered by Claude 3.5 & Spring Boot
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          AI Resume Analyser <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]">
            & Intelligent Job Matcher
          </span>
        </h1>
        <p className="mt-4 text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
          Upload your resume in PDF or text format. Our dual Claude AI & NLP engine parses structural layout, measures quantifiable metrics, scores ATS compatibility, and finds top matching tech jobs.
        </p>
      </div>

      {/* Input Mode Selector */}
      <div className="flex justify-center">
        <div className="bg-midnight-950/90 border border-slate-800 p-1 rounded-2xl flex items-center gap-1 shadow-lg">
          <button
            onClick={() => setActiveInputMode('upload')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeInputMode === 'upload'
                ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            Upload File (PDF / DOCX)
          </button>
          <button
            onClick={() => setActiveInputMode('paste')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeInputMode === 'paste'
                ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            Direct Text Input
          </button>
        </div>
      </div>

      {/* Main Upload Zone */}
      {activeInputMode === 'upload' ? (
        <div className="max-w-2xl mx-auto">
          <Tilt3DCard maxTilt={6}>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer rounded-3xl p-10 text-center border-2 border-dashed transition-all duration-300 glass-panel ${
                dragActive
                  ? 'border-cyan-400 bg-cyan-950/30 shadow-[0_0_40px_rgba(0,240,255,0.3)] scale-[1.01]'
                  : selectedFile
                  ? 'border-cyan-500/70 bg-midnight-900/80 shadow-[0_0_30px_rgba(0,240,255,0.15)]'
                  : 'border-slate-700/80 hover:border-cyan-500/50 hover:bg-midnight-900/60'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* 3D Icon Hub */}
              <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-blue-600/30 to-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_25px_rgba(0,240,255,0.2)]">
                <UploadCloud className="w-10 h-10 text-cyan-400" />
              </div>

              {selectedFile ? (
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 text-xs font-mono mb-2">
                    <FileText className="w-3.5 h-3.5" />
                    {(selectedFile.size / 1024).toFixed(1)} KB • Ready for AI Analysis
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{selectedFile.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">Click to change or select a different file</p>

                  <div className="mt-6 flex justify-center">
                    <button
                      type="button"
                      disabled={isAnalyzing}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSubmitFile();
                      }}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] hover:scale-[1.02] transition-all disabled:opacity-50"
                    >
                      <Sparkles className="w-4 h-4 text-cyan-200" />
                      <span>{isAnalyzing ? 'Analyzing Resume...' : 'Analyze Resume with Claude AI'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Drag & Drop your Resume here, or <span className="text-cyan-400 underline">Browse Files</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto">
                    Supported formats: PDF (preferred), DOCX, TXT. Max file size: 20MB. Fully confidential & parsed instantly.
                  </p>
                </div>
              )}
            </div>
          </Tilt3DCard>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto glass-panel rounded-3xl p-6 border border-slate-800">
          <label className="block text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">
            Paste Resume Plain Text
          </label>
          <textarea
            rows={8}
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Paste raw resume text including Summary, Skills, Work Experience, and Education..."
            className="w-full bg-midnight-950/90 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 resize-y"
          />
          <div className="mt-4 flex justify-end">
            <button
              disabled={!pastedText.trim() || isAnalyzing}
              onClick={handleSubmitPastedText}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all disabled:opacity-40"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Text with AI'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 1-Click Sample Resumes Demo Presets */}
      <div className="max-w-4xl mx-auto pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-bold text-slate-200 tracking-wide">
              Instant 1-Click Demo Profiles (Try Now)
            </h4>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            Zero upload required • Test in 1 second
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sampleResumes.map((sample, idx) => {
            const Icon = sample.icon;
            return (
              <Tilt3DCard key={idx} maxTilt={8}>
                <div
                  onClick={() => handleSelectSample(sample)}
                  className="group cursor-pointer rounded-2xl p-4 bg-midnight-950/80 border border-slate-800/90 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between h-full hover:shadow-[0_0_25px_rgba(0,240,255,0.15)]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${sample.color} p-0.5 flex items-center justify-center shadow-md`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                        {sample.badge}
                      </span>
                    </div>

                    <h5 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {sample.role}
                    </h5>
                    <p className="text-xs text-slate-400 mt-0.5">{sample.candidate}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-xs text-cyan-400 group-hover:translate-x-1 transition-transform">
                    <span className="font-semibold text-[11px]">Load & Analyze</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Tilt3DCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
