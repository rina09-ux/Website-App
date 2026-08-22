import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Shield, 
  Lock, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Database, 
  EyeOff, 
  Cpu, 
  Terminal, 
  Zap,
  Key
} from 'lucide-react';

interface AiPageProps {
  onOpenAi: () => void;
  onOpenDemo: () => void;
}

export const AiPage: React.FC<AiPageProps> = ({ onOpenAi, onOpenDemo }) => {
  const [activeTier, setActiveTier] = useState<number>(0);

  const tiers = [
    {
      tier: 'PUBLIC_GENERAL',
      targetPlane: 'NusaSec-Website',
      scope: 'General security architecture, NIST PQC educational concepts, platform discovery.',
      dataAccess: 'Publicly approved Core CMS documents only.',
      isolationGuarantee: 'Cryptographically prevented from querying any customer tenant or company telemetry.',
      icon: Sparkles,
      color: 'blue'
    },
    {
      tier: 'PUBLIC_SPECIFIC',
      targetPlane: 'Public Research & Docs Hub',
      scope: 'Detailed cryptographic benchmarks, API specifications, and public threat advisories.',
      dataAccess: 'Published whitepapers & approved research data.',
      isolationGuarantee: 'Zero access to private code repositories or customer logs.',
      icon: Shield,
      color: 'blue'
    },
    {
      tier: 'CUSTOMER_AUTHORIZED',
      targetPlane: 'App-Customer Control Plane',
      scope: 'Private cloud attack path reasoning, tenant posture drift explanation, automated GitOps remediation generation.',
      dataAccess: 'Strictly bounded to authenticated tenant workspace.',
      isolationGuarantee: 'Cross-tenant bleed mathematically impossible via Core RBAC token enforcement.',
      icon: Lock,
      color: 'purple'
    },
    {
      tier: 'INTERNAL_AUTHORIZED',
      targetPlane: 'App-Internal Operating Plane',
      scope: 'SOC analyst command center, company engineering telemetry, customer success intelligence, executive reporting.',
      dataAccess: 'Authorized internal company operations.',
      isolationGuarantee: 'Requires hardware FIDO2 WebAuthn authentication and dual-custody approval.',
      icon: Terminal,
      color: 'amber'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      
      {/* Hero Header */}
      <section className="relative bg-white text-slate-900 py-16 border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-600 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NusaSec-AI Reasoning Architecture</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900">
              Deterministic Security Intelligence with Zero Data Retention
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              NusaSec-AI is not a generic chatbot. It is a specialized reasoning layer operating over real-time infrastructure graphs, governed by a strict 4-tier cryptographic visibility model.
            </p>
          </div>
        </div>
      </section>

      {/* 4-Tier Visibility Model */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="text-xs uppercase font-mono tracking-widest text-blue-600 font-bold">
            Cryptographic Separation
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            The 4-Tier AI Visibility Matrix
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Every prompt, context token, and reasoning output is bound to strict cryptographic context boundaries enforced by NusaSec-Core.
          </p>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((t, idx) => {
            const card = (
              <div 
                className={`relative overflow-hidden p-6 rounded-2xl border transition-colors cursor-pointer ${
                  activeTier === idx 
                    ? 'text-slate-900 border-purple-500/50 shadow-xl'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
                onClick={() => setActiveTier(idx)}
              >
                {activeTier === idx && (
                  <motion.span
                    layoutId="ai-tier-highlight"
                    className="absolute inset-0 bg-slate-50 ring-1 ring-purple-500/30 -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <div className="flex items-center justify-between mb-4">
                  <span className="p-2 rounded-lg bg-slate-100/80 text-purple-600">
                    <t.icon className="w-4 h-4" />
                  </span>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    TIER {idx + 1}
                  </span>
                </div>

                <div className="font-mono text-xs font-bold text-blue-600 mb-1">
                  {t.tier}
                </div>
                <div className={`text-sm font-bold font-display mb-2 ${activeTier === idx ? 'text-slate-900' : 'text-slate-900'}`}>
                  {t.targetPlane}
                </div>

                <p className={`text-xs mb-4 leading-relaxed ${activeTier === idx ? 'text-slate-600' : 'text-slate-600'}`}>
                  {t.scope}
                </p>

                <div className={`p-3 rounded-lg text-[11px] font-mono space-y-1.5 ${
                  activeTier === idx ? 'bg-white text-slate-500 border border-slate-200' : 'bg-slate-50 text-slate-600 border border-slate-100'
                }`}>
                  <div className="font-semibold text-slate-600">Data Boundary:</div>
                  <div>{t.dataAccess}</div>
                </div>
              </div>
            );
            return <React.Fragment key={idx}>{card}</React.Fragment>;
          })}
        </div>

        {/* Zero Data Retention Card */}
        <div className="mt-12 bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 p-8 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/30 text-blue-600 text-xs font-mono">
              <EyeOff className="w-3.5 h-3.5" />
              <span>Zero-Data-Retention Protocol</span>
            </div>
            <h3 className="text-2xl font-bold font-display text-slate-900">
              Your Infrastructure Code & Findings Are Never Used for Training
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              NusaSec enforces an architectural zero-retention guarantee. Telemetry payloads processed during security evaluations are kept purely in volatile memory for the duration of the reasoning pipeline and purged immediately upon return.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Zero telemetry persisted in LLM weights</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Stateless contextual memory per session</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Encrypted transit with Hybrid TLS 1.3</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Full on-premise air-gapped models available</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <button
              onClick={onOpenAi}
              className="btn-shimmer w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Public AI Assistant</span>
            </button>
            <button
              onClick={onOpenDemo}
              className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs border border-slate-300 transition-colors"
            >
              Schedule Enterprise AI Demo
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
