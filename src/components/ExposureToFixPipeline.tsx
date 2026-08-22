import React, { useState } from 'react';
import { 
  Globe, 
  Layers, 
  GitPullRequest, 
  ShieldCheck, 
  ArrowRight, 
  Cpu, 
  Lock, 
  Terminal, 
  CheckCircle2, 
  Sparkles,
  Zap,
  Code2
} from 'lucide-react';
import { Language } from '../data/translations';

interface ExposureToFixPipelineProps {
  language?: Language;
  onOpenDemo: () => void;
}

export const ExposureToFixPipeline: React.FC<ExposureToFixPipelineProps> = ({
  language = 'id',
  onOpenDemo
}) => {
  const isId = language === 'id';
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      stepNum: '01',
      title: isId ? 'Pemindaian Permukaan & CBOM' : 'Attack Surface & CBOM Scan',
      badge: 'EXTERNAL SCANNER',
      desc: isId
        ? 'NusaSec memetakan aset publik, port terbuka, API gateway, dan algoritma kriptografi warisan (RSA/ECC) tanpa perlu agen atau kredensial awal.'
        : 'NusaSec continuously maps externally reachable assets, open ports, API gateways, and legacy cryptography (RSA/ECC) from an attacker’s perspective.',
      codeSnippet: `nusasec scan --target *.enterprise.id\n[+] Discovered 412 public endpoints\n[+] Found 18 legacy RSA-2048 certs (HNDL Risk)\n[!] Exposed staging Selenium Hub detected`,
      highlight: isId ? 'Deteksi Otomatis Aset Eksternal' : 'Agentless External Discovery'
    },
    {
      stepNum: '02',
      title: isId ? 'Analisis Graf Konteks Internal' : 'Deep Internal Graph Analysis',
      badge: 'GRAPH ENGINE',
      desc: isId
        ? 'Kami menghubungkan kode, IAM role, konfigurasi cloud (AWS/GCP/Azure), dan database kedaulatan ke dalam graf konteks terpadu untuk menghitung radius ledakan.'
        : 'We correlate source repositories, cloud permissions, VPC network hops, and sovereign data stores into a unified graph to identify real toxic combinations.',
      codeSnippet: `MATCH (internet:Ingress) -> (pod:Kubernetes) -> (role:IAM_Admin) -> (db:Postgres_Sovereign)\n[CRITICAL] Toxic combination confirmed (Exploitability: 100%)\n[RISK_SCORE] 9.8/10 (High Priority Incident)`,
      highlight: isId ? 'Korelasi Jalur Serangan Multihop' : 'Multi-hop Attack Path Correlation'
    },
    {
      stepNum: '03',
      title: isId ? 'Remediasi Otomatis pada Kode (IaC)' : 'Fix at Scale in Code (GitOps)',
      badge: 'GITOPS PR BOT',
      desc: isId
        ? 'Alih-alih hanya mengirim alarm, NusaSec membuat Pull Request Terraform / Kubernetes otomatis yang langsung memperbaiki miskonfigurasi pada repositori developer.'
        : 'Using graph context and repository ownership mapping, NusaSec generates automated 1-click Pull Requests in Terraform and Kubernetes to remediate at source.',
      codeSnippet: `// git commit -m "fix(security): restrict ingress SG and rotate to ML-KEM-768"\n+ security_group_rule { cidr_blocks = ["10.0.0.0/16"] }\n+ tls_version = "TLS_1_3_HYBRID_PQC"\n[STATUS] PR #481 Created in GitHub`,
      highlight: isId ? '1-Klik Pull Request Perbaikan' : '1-Click Automated PR Fix'
    },
    {
      stepNum: '04',
      title: isId ? 'Deteksi & Pertahanan Pasca-Kuantum' : 'Detect, Block & Quantum Guard',
      badge: 'EBPF & PQC RUNTIME',
      desc: isId
        ? 'Sensor runtime eBPF memblokir eksploitasi zero-day secara real-time sekaligus menegakkan enkripsi Hybrid TLS 1.3 (X25519 + ML-KEM-768).'
        : 'Using NusaSec eBPF Runtime Sensor, we block live in-memory exploits and enforce zero-latency Post-Quantum Hybrid TLS 1.3 handshakes on all traffic.',
      codeSnippet: `[eBPF Runtime] Process blocked: unauthorized ptrace execution\n[PQC Handshake] Active cipher: X25519_MLKEM768 (NIST FIPS 203)\n[EVIDENCE] Signed proof dispatched to Cryptographic Vault`,
      highlight: isId ? 'Blokir Eksploitasi & Enkripsi Kuantum' : 'Exploit Containment & Quantum Agility'
    }
  ];

  return (
    <section className="py-24 bg-white text-slate-900 relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-mono font-bold">
            <Zap className="w-3.5 h-3.5" />
            <span>{isId ? 'SIKLUS KERJA TERPADU' : 'UNIFIED OPERATING LIFECYCLE'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
            {isId ? 'Bagaimana NusaSec Melindungi: Dari Deteksi hingga Perbaikan Kode' : 'How NusaSec Protects: From Exposure to Code Fix'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {isId
              ? 'Menghilangkan silo antara tim keamanan, devops, dan auditor dengan satu alur kerja terpadu yang memotong waktu remediasi (MTTR) hingga 70%.'
              : 'Eliminate silos between security, engineering, and compliance with a continuous 4-phase loop that cuts Mean Time to Remediate by over 70%.'}
          </p>
        </div>

        {/* Step Indicator Connected Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl border text-left transition-all relative ${
                  isActive
                    ? 'bg-slate-50 border-blue-300 text-slate-900 shadow-xl ring-2 ring-blue-500/20'
                    : 'bg-white/60 border-slate-200 text-slate-500 hover:bg-slate-50/40 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xl font-bold font-mono ${isActive ? 'text-blue-600' : 'text-slate-600'}`}>
                    {step.stepNum}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${isActive ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'bg-slate-50 text-slate-500 border border-slate-200'}`}>
                    {step.badge}
                  </span>
                </div>
                <div className={`text-base font-bold font-display ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                  {step.title}
                </div>
                <div className="text-xs text-slate-500 mt-2 line-clamp-2">
                  {step.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Active Step Workbench */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{steps[activeStep].highlight}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
              {steps[activeStep].title}
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              {steps[activeStep].desc}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenDemo}
                className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap"
              >
                <span>{isId ? 'Uji Coba Alur Kerja Ini' : 'Test This Workflow'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="text-xs text-slate-500 font-mono">
                {isId ? 'Dukungan AWS • GCP • Azure • GitHub' : 'Supported on AWS • GCP • Azure • GitHub'}
              </div>
            </div>
          </div>

          {/* Code & Terminal Inspection Simulation */}
          <div className="lg:col-span-6 bg-white rounded-xl p-5 border border-slate-200 font-mono text-xs shadow-inner space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-slate-500 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500/80" />
                <span className="ml-2 text-slate-600 font-bold">nusasec-engine.log</span>
              </div>
              <span className="text-blue-600">STATUS: LIVE</span>
            </div>

            <pre className="text-slate-600 text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap">
              {steps[activeStep].codeSnippet}
            </pre>

            <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
              <span>Execution Time: <strong className="text-blue-600">42ms</strong></span>
              <span>Audit Proof: <strong className="text-blue-600">FIPS 204 Verified</strong></span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
