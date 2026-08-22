import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  Shield, 
  Building2, 
  Cloud, 
  Cpu, 
  FileCheck, 
  Activity, 
  Database, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Layers, 
  Sparkles 
} from 'lucide-react';
import { SolutionSubTab } from '../types';
import { AnimatedMetric } from '../components/magic/effects';

interface SolutionsPageProps {
  onOpenDemo: () => void;
  onOpenAi: () => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({ onOpenDemo, onOpenAi }) => {
  const [activeTab, setActiveTab] = useState<SolutionSubTab>('enterprise');

  const solutions = [
    {
      id: 'enterprise' as SolutionSubTab,
      label: 'Enterprise Infrastructure',
      badge: 'Hybrid & Multi-Cloud',
      icon: Building2,
      headline: 'Unified Posture for Complex Global Enterprises',
      description: 'Govern hundreds of cloud accounts, hybrid Kubernetes clusters, and legacy on-premises workloads from a single authoritative system of record.',
      outcomes: [
        { metric: '10x', label: 'Faster Incident Triage with unified graph context' },
        { metric: '100%', label: 'Continuous visibility across AWS, GCP, and Azure' },
        { metric: '0', label: 'Downtime during transitional post-quantum migration' }
      ],
      points: [
        'Centralized multi-tenant policy engine enforcing baseline rules across all business units',
        'Role-based access control (RBAC) with delegated administration and MFA verification',
        'Cryptographic Bill of Materials (CBOM) continuously updated across enterprise repositories',
        'Sovereign data residency controls adhering to national encryption laws'
      ]
    },
    {
      id: 'cloud-security' as SolutionSubTab,
      label: 'Cloud Security (CSPM & KSPM)',
      badge: 'AWS / GCP / Azure / K8s',
      icon: Cloud,
      headline: 'Agentless Multi-Cloud Security at Production Scale',
      description: 'Eliminate blind spots with real-time graph correlation that discovers unmanaged cloud resources, toxic IAM relationships, and exposed storage buckets.',
      outcomes: [
        { metric: '95%', label: 'Alert noise reduction via contextual blast radius filtering' },
        { metric: '< 5s', label: 'Sub-second drift detection upon infrastructure changes' },
        { metric: '1-Click', label: 'Automated GitOps pull request remediation' }
      ],
      points: [
        'Agentless ingestion via read-only cloud APIs combined with zero-overhead eBPF probes',
        'Kubernetes security posture management (KSPM) with dynamic admission controller webhooks',
        'Continuous CIS Benchmark v3.0 audits and automated drift alerting',
        'Shadow asset discovery across unmanaged regions and orphaned cloud accounts'
      ]
    },
    {
      id: 'pqc-migration' as SolutionSubTab,
      label: 'PQC Modernization',
      badge: 'NIST FIPS 203 / 204 Ready',
      icon: Cpu,
      headline: 'Guaranteed Protection Against Quantum Interception (HNDL)',
      description: 'The world\'s first enterprise crypto-agility platform automating the discovery, benchmarking, and migration of classical cryptography to NIST post-quantum standards.',
      outcomes: [
        { metric: '100%', label: 'Discovery of quantum-vulnerable RSA & ECC keys' },
        { metric: 'Dual', label: 'Hybrid TLS 1.3 handshakes (X25519 + ML-KEM-768)' },
        { metric: 'FIPS', label: 'FIPS 203, 204, and 205 native cryptographic verification' }
      ],
      points: [
        'Real-time Cryptographic Bill of Materials (CBOM) mapping across multi-cloud services',
        'Zero-downtime hybrid TLS proxies ensuring classical and quantum clients coexist seamlessly',
        'HSM key management integration with quantum random number generators (QRNG)',
        'Comprehensive timeline forecasting to meet national post-quantum regulatory deadlines'
      ]
    },
    {
      id: 'compliance' as SolutionSubTab,
      label: 'Continuous Compliance',
      badge: 'SOC 2, ISO 27001, OJK',
      icon: FileCheck,
      headline: 'Zero-Touch Evidence Collection for Regulated Industries',
      description: 'Transform painful multi-month compliance audits into a continuous, real-time automated verification process backed by cryptographically signed proofs.',
      outcomes: [
        { metric: '82%', label: 'Reduction in annual compliance audit preparation time' },
        { metric: '12+', label: 'Pre-mapped global and regional regulatory frameworks' },
        { metric: '24/7', label: 'Live auditor portal with verifiable cryptographic evidence' }
      ],
      points: [
        'Automated proof collectors continuously capturing signed system configurations',
        'Unified deduplication: collect evidence once, satisfy SOC 2, ISO 27001, OJK POJK 11, and PCI-DSS',
        'Granular posture status: PASS, FAIL, UNKNOWN, NOT_APPLICABLE for every control',
        'Automated executive compliance scorecards for Board of Directors briefings'
      ]
    },
    {
      id: 'security-operations' as SolutionSubTab,
      label: 'Security Operations & IR',
      badge: 'Attack Path Containment',
      icon: Activity,
      headline: 'Precision Threat Containment and Blast Radius Elimination',
      description: 'Empower SOC and incident response teams with visual attack paths that expose exactly how an attacker could traverse from an external perimeter to your core database.',
      outcomes: [
        { metric: '15m', label: 'Mean time to isolate compromised cloud identities' },
        { metric: '100%', label: 'Attack chain visibility from external IP to target data' },
        { metric: 'Zero', label: 'False positives on unreachable internal vulnerabilities' }
      ],
      points: [
        'Visual attack graph reconstruction highlighting active exploitation pathways',
        'Contextual risk scoring weighted by asset business criticality and network reachability',
        'Automated containment actions: IAM policy revocation, security group lockdown, pod isolation',
        'Splunk, Datadog, and Jira Service Management bi-directional integration'
      ]
    },
    {
      id: 'data-security' as SolutionSubTab,
      label: 'Data Security & Sovereignty',
      badge: 'Indonesian UU PDP & GDPR',
      icon: Database,
      headline: 'Discover, Classify, and Protect Sovereign Data Assets',
      description: 'Maintain strict data sovereignty and prevent unauthorized exfiltration with continuous data classification and column-level encryption governance.',
      outcomes: [
        { metric: '100%', label: 'Sovereign data residency boundary validation' },
        { metric: 'Zero', label: 'Unencrypted confidential database tables' },
        { metric: 'PQC', label: 'Quantum-safe column encryption for critical ledgers' }
      ],
      points: [
        'Automated discovery of sensitive data across S3 buckets, RDS, BigQuery, and Cosmos DB',
        'Verification of data encryption at rest and in transit with post-quantum algorithms',
        'Continuous compliance monitoring against UU PDP, GDPR, and sovereign cloud guidelines',
        'Automated data lineage and access audit logging'
      ]
    }
  ];

  const currentSolution = solutions.find(s => s.id === activeTab) || solutions[0];

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      
      {/* Header */}
      <section className="relative bg-white text-slate-900 py-16 border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 text-xs font-mono">
              <Shield className="w-3.5 h-3.5" />
              <span>Tailored Industry Solutions</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900">
              Solutions for High-Trust Enterprises
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Engineered specifically for financial institutions, cloud scale-ups, and defense organizations requiring uncompromising posture and quantum readiness.
            </p>
          </div>
        </div>
      </section>

      {/* Main Solution Selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Solution Grid Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-10">
          {solutions.map((sol) => (
            <button
              key={sol.id}
              onClick={() => setActiveTab(sol.id)}
              className={`relative overflow-hidden p-3.5 rounded-xl border text-left transition-colors ${
                activeTab === sol.id
                  ? 'text-slate-900 border-blue-400/60 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {activeTab === sol.id && (
                <motion.span
                  layoutId="solutions-tab-highlight"
                  className="absolute inset-0 bg-slate-50 ring-1 ring-blue-500/30 rounded-xl -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <sol.icon className={`w-4 h-4 mb-2 ${activeTab === sol.id ? 'text-blue-600' : 'text-slate-500'}`} />
              <div className="font-bold text-xs">{sol.label}</div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">{sol.badge}</div>
            </button>
          ))}
        </div>

        {/* Selected Solution Deep Dive */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8"
          >
          
          <div className="space-y-3">
            <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-100 text-blue-800 border border-blue-200">
              {currentSolution.badge}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-display text-slate-900">
              {currentSolution.headline}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
              {currentSolution.description}
            </p>
          </div>

          {/* Outcome Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {currentSolution.outcomes.map((out, oIdx) => (
              <div key={oIdx} className="p-5 rounded-xl bg-slate-50 text-slate-900 border border-slate-200">
                <div className="text-2xl sm:text-3xl font-extrabold font-display text-blue-600 mb-1">
                  <AnimatedMetric value={out.metric} />
                </div>
                <div className="text-xs text-slate-600 font-medium leading-snug">
                  {out.label}
                </div>
              </div>
            ))}
          </div>

          {/* Points List */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
              Key Solution Architecture:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentSolution.points.map((pt, pIdx) => (
                <div key={pIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Row */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Schedule a technical session with our enterprise solutions team.
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onOpenDemo}
                className="btn-shimmer flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Book Solution Briefing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenAi}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Ask AI About This Solution</span>
              </button>
            </div>
          </div>
          </motion.div>
        </AnimatePresence>

      </div>

    </div>
  );
};
