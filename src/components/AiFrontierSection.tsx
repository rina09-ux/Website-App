import React, { useState } from 'react';
import { 
  Sparkles, 
  Cpu, 
  ShieldAlert, 
  ShieldCheck, 
  Database, 
  Layers, 
  ArrowRight, 
  Lock, 
  Search, 
  Server, 
  Terminal, 
  Bot,
  Zap,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Language } from '../data/translations';

interface AiFrontierSectionProps {
  language?: Language;
  onOpenDemo: () => void;
  onOpenAi: () => void;
}

export const AiFrontierSection: React.FC<AiFrontierSectionProps> = ({
  language = 'id',
  onOpenDemo,
  onOpenAi,
}) => {
  const isId = language === 'id';
  const [activeTab, setActiveTab] = useState<'visibility' | 'risk' | 'posture' | 'runtime'>('visibility');

  const aiInventory = [
    { name: 'Claude 3.5 Sonnet / 3.7 Sonnet', provider: 'AWS Bedrock & GCP Vertex', count: 42, status: 'SECURED', pqc: 'ML-KEM-768' },
    { name: 'GPT-4o & o3-mini Endpoints', provider: 'Azure OpenAI & Direct API', count: 38, status: 'SECURED', pqc: 'Hybrid TLS 1.3' },
    { name: 'Self-Hosted Llama 3.3 70B', provider: 'Kubernetes GPU Cluster (Jakarta)', count: 14, status: 'SECURED', pqc: 'FIPS 203 Validated' },
    { name: 'MCP (Model Context Protocol) Servers', provider: 'Internal Tooling & Pipelines', count: 26, status: 'RESTRICTED', pqc: 'Zero-Trust RBAC' },
    { name: 'Vector Datastores (Pinecone/Milvus)', provider: 'Enterprise RAG Stores', count: 19, status: 'ENCRYPTED', pqc: 'ML-DSA Signed' },
  ];

  return (
    <section className="py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Header & AI Frontier Messaging */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{isId ? 'AI-SPM & KEAMANAN FRONTIER MODEL' : 'AI-SPM & FRONTIER MODEL SECURITY'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 tracking-tight leading-tight">
              {isId ? (
                <>
                  NusaSec Mengamankan <span className="text-blue-600">Frontier AI & Model Multi-Cloud</span>
                </>
              ) : (
                <>
                  NusaSec Secures the <span className="text-blue-600">AI Frontier & Cloud Models</span>
                </>
              )}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {isId 
                ? 'Laboratorium AI, bank, dan enterprise mempercayakan keamanan workload AI, model foundation, server MCP, pipeline RAG, dan data training berharga mereka pada NusaSec.'
                : 'Frontier AI labs, banks, and enterprises rely on NusaSec to discover, govern, and protect foundation models, MCP servers, RAG vector pipelines, and training datasets.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAi}
              className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap shadow-sm"
            >
              <Bot className="w-4 h-4 text-blue-600" />
              <span>{isId ? 'Konsultasi NusaSec AI' : 'Talk to NusaSec AI'}</span>
            </button>
            <button
              onClick={onOpenDemo}
              className="px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap shadow-sm"
            >
              <span>{isId ? 'Jadwalkan Demo' : 'Book a Demo'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Interactive 4-Tab View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Tabs */}
          <div className="lg:col-span-4 space-y-2">
            {[
              {
                id: 'visibility' as const,
                title: isId ? 'Visibilitas Penuh (Discovery)' : 'Full AI Visibility',
                desc: isId ? 'Temukan otomatis model AI, agen otonom, server MCP, dan layanan shadow AI di multi-cloud.' : 'Continuously discover AI models, autonomous agents, MCP servers, and shadow AI across clouds.',
                icon: Layers
              },
              {
                id: 'risk' as const,
                title: isId ? 'Risiko Native AI & Prompt Injection' : 'AI Native Risk & Prompt Defense',
                desc: isId ? 'Deteksi kerentanan eksfiltrasi data, model inversion, dan eksploitasi API LLM.' : 'Detect data exfiltration paths, model inversion risks, and vulnerable LLM pipeline endpoints.',
                icon: ShieldAlert
              },
              {
                id: 'posture' as const,
                title: isId ? 'Postur AI & Tata Kelola RBAC' : 'AI Posture & RBAC Governance',
                desc: isId ? 'Terapkan guardrail ketat pada hak akses IAM model, kredensial API key, dan izin server MCP.' : 'Enforce tight IAM guardrails, API token rotations, and least-privilege MCP tool boundaries.',
                icon: Lock
              },
              {
                id: 'runtime' as const,
                title: isId ? 'Runtime & Respons Kriptografis' : 'Runtime & Zero-Retention Audit',
                desc: isId ? 'Monitoring eBPF waktu-nyata dengan bukti audit bertanda tangan digital FIPS 204 ML-DSA.' : 'Real-time eBPF runtime monitoring with immutable cryptographically signed FIPS 204 audit proofs.',
                icon: Zap
              }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isActive
                      ? 'bg-slate-50 text-slate-900 border-slate-900 shadow-md ring-1 ring-blue-500/30'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-500/20 text-blue-600' : 'bg-white text-slate-600 border border-slate-200'}`}>
                      <TabIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`text-sm font-bold font-display ${isActive ? 'text-slate-900' : 'text-slate-900'}`}>
                        {tab.title}
                      </div>
                      <div className={`text-xs mt-0.5 line-clamp-2 ${isActive ? 'text-slate-600' : 'text-slate-500'}`}>
                        {tab.desc}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Live Visual Simulation Card */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xl text-slate-900">
            
            {/* Top Bar Status */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2.5 font-mono text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-slate-900 font-bold">NusaSec AI-SPM Scanner</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-500">Jakarta & Global Multi-Cloud</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200 text-[10px] font-mono uppercase">
                  139 AI Resources Discovered
                </span>
              </div>
            </div>

            {/* Inventory List */}
            <div className="pt-4 space-y-3 font-mono text-xs">
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold px-2 flex justify-between">
                <span>Resource & Pipeline</span>
                <span className="hidden sm:inline">PQC Shield / Security State</span>
              </div>

              {aiInventory.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50/90 border border-slate-200 hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-300 flex items-center justify-center text-blue-600 shrink-0">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-slate-900 font-bold font-sans text-xs sm:text-sm">{item.name}</div>
                      <div className="text-[11px] text-slate-500">{item.provider}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px]">
                      {item.count} endpoints
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200 text-[11px] flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{item.pqc}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Security Guarantee */}
            <div className="mt-5 p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between text-xs text-slate-600 font-sans">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  {isId 
                    ? 'Protokol Zero Data Retention: Prompt atau data inferensi tidak pernah disimpan atau dipakai melatih model eksternal.'
                    : 'Zero Data Retention Guarantee: Customer prompts & inferencing vectors are never stored or leaked.'}
                </span>
              </div>
              <span className="text-[11px] font-mono text-blue-600 hidden md:inline">ISO 27001 / SOC 2 Type II</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
