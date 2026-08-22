import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Activity, 
  Cpu, 
  Server, 
  FileCheck, 
  Download, 
  ArrowUpRight, 
  Key, 
  EyeOff, 
  Globe 
} from 'lucide-react';
import { SYSTEM_STATUS_DATA, COMPLIANCE_FRAMEWORKS } from '../data/mockCmsData';

interface SecurityTrustPageProps {
  onOpenDemo: () => void;
}

export const SecurityTrustPage: React.FC<SecurityTrustPageProps> = ({ onOpenDemo }) => {
  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      
      {/* Header */}
      <section className="relative bg-white text-slate-900 py-16 border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Public Security & Trust Center</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900">
              Enterprise Trust, Compliance & Architecture
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We hold NusaSec to the highest security, privacy, and post-quantum cryptographic standards in the world. Review our certifications, live operational SLA, and data protection architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Real-time System Status Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 glow-pulse-dot" />
                <h2 className="text-xl font-bold font-display text-slate-900">
                  Live Operational Infrastructure Status
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Real-time telemetry and API response health across global regions.
              </p>
            </div>
            <div className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono font-bold">
              99.99% Global Uptime (Last 90 Days)
            </div>
          </div>

          {/* Compact status list on mobile — a status-page style feed instead of
              six stacked bordered boxes. Reverts to the card grid from md up. */}
          <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
            {SYSTEM_STATUS_DATA.map((svc, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 py-3 border-b border-slate-200 last:border-b-0
                  md:block md:py-0 md:border-b-0 md:p-4 md:rounded-xl md:bg-slate-50 md:border md:border-slate-200 md:space-y-2"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 md:hidden" />
                <div className="min-w-0 flex-1 flex items-center justify-between md:block">
                  <span className="font-semibold text-xs text-slate-900 truncate">{svc.name}</span>
                  <span className="hidden md:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800 border border-blue-200 uppercase ml-2">
                    {svc.status}
                  </span>
                </div>
                <div className="hidden md:flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                  <span>Region: {svc.region}</span>
                  <span className="text-blue-700 font-bold">{svc.latency}</span>
                </div>
                <span className="md:hidden text-[11px] font-mono text-blue-700 font-bold shrink-0">{svc.latency}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Compliance Certifications Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="space-y-4 mb-6">
          <h2 className="text-2xl font-bold font-display text-slate-900">
            Independent Compliance & Audit Attestations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Verified by accredited third-party auditing firms and international standardization bodies.
          </p>
        </div>

        {/* Compact list on mobile (seven certifications is a lot of boxes to scroll past),
            card grid from md up where three columns fit comfortably. */}
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {COMPLIANCE_FRAMEWORKS.map((fw, fIdx) => (
            <div
              key={fIdx}
              className="py-4 border-b border-slate-200 last:border-b-0
                md:bg-white md:rounded-2xl md:border md:border-slate-200 md:p-6 md:flex md:flex-col md:justify-between md:shadow-sm md:py-6"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5 md:mb-2 gap-2">
                  <span className="font-bold text-sm md:text-base text-slate-900 font-display">{fw.name}</span>
                  <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800 border border-blue-200">
                    {fw.status}
                  </span>
                </div>
                <div className="text-[11px] md:text-xs text-slate-500 font-mono mb-1.5 md:mb-3">{fw.authority}</div>
                <p className="hidden md:block text-xs text-slate-600 leading-relaxed">
                  {fw.scope}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs md:pt-4 md:mt-4 md:border-t md:border-slate-100">
                <span className="hidden md:inline text-slate-500 font-mono text-[11px]">Audit Report Available</span>
                <button 
                  onClick={onOpenDemo}
                  className="text-blue-700 hover:text-blue-800 font-semibold flex items-center gap-1 text-[11px] md:text-xs"
                >
                  Request Attestation →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Architecture & Strict Isolation Principles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xl space-y-6">
          <div className="space-y-2">
            <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-500/10 text-blue-600 border border-blue-500/30">
              Architectural Defense
            </div>
            <h3 className="text-2xl font-bold font-display text-slate-900">
              Sovereign Isolation & Hardware Security Model
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              NusaSec is architected with strict multi-tenant isolation, post-quantum cryptographic primitives, and hardware security modules (HSMs).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs font-mono">
                <Lock className="w-4 h-4" />
                <span>Tenant Isolation</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dedicated database schema and cryptographic key separation per customer organization. Mathematical prevention of cross-tenant data bleed.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs font-mono">
                <Cpu className="w-4 h-4" />
                <span>FIPS 140-3 HSM Root</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Master cryptographic keys generated in dedicated hardware security modules with quantum entropy sources (QRNG).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-purple-600 font-bold text-xs font-mono">
                <EyeOff className="w-4 h-4" />
                <span>Zero Telemetry Retention</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Raw customer code and cloud infrastructure secrets are processed in volatile memory only and never stored in LLM weights.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Responsible Disclosure & Security Contact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg font-bold font-display text-slate-900">
              Responsible Vulnerability Disclosure
            </h3>
            <p className="text-xs text-slate-600 max-w-xl">
              We welcome findings from security researchers worldwide. Encrypt your report with our public PGP key and submit to <span className="font-mono text-blue-700 font-semibold">security@nusasec.com</span>. We guarantee a 24-hour SLA on triage.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert("PGP Fingerprint: 4F2A 99D1 042E 88B4 51AC 901F A982 4B01")}
              className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 font-mono text-xs flex items-center gap-1.5 transition-colors shrink-0"
            >
              <Key className="w-3.5 h-3.5 text-blue-600" />
              <span>View PGP Key</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
