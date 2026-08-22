import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  Shield, 
  Cloud, 
  Lock, 
  AlertTriangle, 
  FileCheck, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Terminal, 
  CheckCircle2, 
  Check, 
  Key, 
  Binary, 
  Database,
  ArrowUpRight
} from 'lucide-react';
import { PlatformSubTab } from '../types';
import { PQC_ALGORITHMS } from '../data/mockCmsData';

interface PlatformPageProps {
  onOpenDemo: () => void;
  onOpenAi: () => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
}

export const PlatformPage: React.FC<PlatformPageProps> = ({
  onOpenDemo,
  onOpenAi,
  onOpenAuth
}) => {
  const [activeTab, setActiveTab] = useState<PlatformSubTab>('security');

  const platformModules = [
    {
      id: 'security' as PlatformSubTab,
      label: 'Security Posture (CSPM)',
      tag: 'Continuous Graph Evaluation',
      headline: 'Real-time multi-cloud configuration & posture intelligence',
      description: 'NusaSec continuously scans cloud configurations against CIS benchmarks, cloud provider best practices, and internal security baselines with sub-second event streaming.',
      icon: Lock,
      color: 'blue',
      features: [
        'Agentless multi-cloud discovery across AWS, Google Cloud, and Azure',
        'Sub-second drift detection via eBPF kernel probes and cloud event hooks',
        'Automated CIS Benchmark v3.0 audit scoring and historical posture tracking',
        'Native GitOps pull request generation for infrastructure-as-code (Terraform, Pulumi)'
      ],
      codeSnippet: `# NusaSec Policy Rule (Rego / OPA)
package nusasec.cloud.iam

default allow = false

allow {
    input.mfa_enforced == true
    input.session_duration_seconds <= 3600
    input.cipher_suite == "ML-KEM-768"
}`
    },
    {
      id: 'crypto-pqc' as PlatformSubTab,
      label: 'Post-Quantum Cryptography',
      tag: 'NIST FIPS 203 / 204 / 205',
      headline: 'Automated CBOM and quantum-resilient crypto-agility',
      description: 'Discover every cryptographic algorithm in your enterprise stack and transition smoothly to NIST-standardized post-quantum algorithms without breaking legacy consumers.',
      icon: Cpu,
      color: 'blue',
      features: [
        'Automated Cryptographic Bill of Materials (CBOM) inventorying',
        'Harvest-Now-Decrypt-Later (HNDL) exposure heatmaps',
        'Hybrid TLS 1.3 dual-handshake enforcement (X25519 + ML-KEM-768)',
        'Full support for NIST FIPS 203 (ML-KEM), FIPS 204 (ML-DSA), and FIPS 205 (SLH-DSA)'
      ],
      codeSnippet: `// Post-Quantum Hybrid TLS 1.3 Configuration
const tlsConfig = {
  minVersion: 'TLSv1.3',
  supportedGroups: [
    'X25519_ML_KEM_768', // NIST FIPS 203 Hybrid
    'SecP256r1_ML_KEM_768'
  ],
  signatureAlgorithms: [
    'ML_DSA_65',         // NIST FIPS 204
    'ECDSA_P256_SHA256'
  ]
};`
    },
    {
      id: 'compliance' as PlatformSubTab,
      label: 'Continuous Compliance',
      tag: 'Zero-Touch Audit Vault',
      headline: 'Automated evidence collection for SOC 2, ISO 27001 & OJK',
      description: 'Eliminate manual audit chaos with automated evidence gathering, deduplication across 12+ frameworks, and an immutable auditor portal.',
      icon: FileCheck,
      color: 'amber',
      features: [
        'Continuous evidence collectors capturing signed cloud configuration proofs',
        'Cross-framework control mapping (SOC 2, ISO 27001, OJK POJK 11, PCI-DSS v4, GDPR)',
        'Auditor portal with cryptographically signed immutable evidence timestamps',
        'Real-time posture classification: PASS, FAIL, UNKNOWN, NOT_APPLICABLE'
      ],
      codeSnippet: `// NusaSec Immutable Evidence Proof
{
  "evidence_id": "ev_84f901c",
  "framework": "ISO_27001_2022",
  "control": "A.8.24_USE_OF_CRYPTOGRAPHY",
  "posture_status": "PASS",
  "signature": "ML-DSA-65:48a9f02c...382e",
  "timestamp": "2026-08-19T20:24:00Z"
}`
    },
    {
      id: 'risk' as PlatformSubTab,
      label: 'Risk & Attack Paths',
      tag: 'Graph-Based Blast Radius',
      headline: 'Prioritize vulnerabilities by reachable attack paths',
      description: 'Instead of prioritizing thousands of disconnected CVEs, NusaSec correlates network exposure, IAM entitlements, and runtime exploits to pinpoint the few critical paths that lead to sensitive assets.',
      icon: AlertTriangle,
      color: 'red',
      features: [
        'Multi-hop visual attack graph reconstruction',
        'Contextual exploitability filtering (95% reduction in alert noise)',
        'Toxic combination analysis (Public IP + IAM AssumeRole + Unpatched CVE)',
        'Instant blast radius simulation before executing production changes'
      ],
      codeSnippet: `// Attack Path Traversal Graph
(Internet:Public_IP)
    └──> [ALB:Ingress_Gateway]
            └──> [Pod:Payment_API] (CVE-2026-3829)
                    └──> [IAM:S3_FullAccess]
                            └──> (S3:Financial_Ledger_Vault)`
    },
    {
      id: 'cloud' as PlatformSubTab,
      label: 'Multi-Cloud Visibility',
      tag: 'AWS, GCP, Azure, K8s',
      headline: 'Unified visibility across hybrid and sovereign infrastructure',
      description: 'One single pane of glass aggregating inventory, IAM relationships, container registries, and serverless functions across all public clouds and on-premise clusters.',
      icon: Cloud,
      color: 'sky',
      features: [
        'Unified asset graph spanning all regions and cloud accounts',
        'Kubernetes KSPM with admission controller webhook policies',
        'Serverless function security and unmanaged resource discovery',
        'Zero-impact onboarding via read-only cloud IAM roles'
      ],
      codeSnippet: `// Multi-Cloud Telemetry Event
{
  "cloud_provider": "AWS",
  "account_id": "894102948192",
  "region": "ap-southeast-1",
  "resource_type": "AWS::KMS::Key",
  "pqc_status": "HYBRID_READY",
  "drift_detected": false
}`
    },
    {
      id: 'identity' as PlatformSubTab,
      label: 'Identity & MFA Governance',
      tag: 'Zero Trust Least Privilege',
      headline: 'Eliminate identity drift and privilege escalation chains',
      description: 'Govern human and machine identities (IAM roles, service principals, OAuth tokens) to prevent privilege escalation and enforce Zero Trust principles.',
      icon: Key,
      color: 'purple',
      features: [
        'Automated analysis of unused and over-permissioned IAM policies',
        'Cross-account role assumption chaining detection',
        'FIDO2 WebAuthn & hardware MFA posture enforcement',
        'Ephemeral just-in-time (JIT) access broker integration'
      ],
      codeSnippet: `// NusaSec JIT Privilege Token
{
  "subject": "architect@enterprise.com",
  "role_granted": "DatabaseAdmin",
  "ttl_seconds": 1800,
  "hardware_token_verified": true,
  "quantum_safe_signed": true
}`
    },
    {
      id: 'data-intelligence' as PlatformSubTab,
      label: 'Data Intelligence',
      tag: 'Data Classification & Lineage',
      headline: 'Discover, classify, and protect critical enterprise data',
      description: 'Automatically locate sensitive PII, financial ledgers, and trade secrets across S3 buckets, Cloud Storage, and RDS databases to ensure sovereign data residency.',
      icon: Database,
      color: 'teal',
      features: [
        'Automated discovery of unencrypted databases and storage buckets',
        'Contextual data classification (PII, PCI, HIPAA, State Secrets)',
        'Data residency compliance (Indonesian UU PDP, EU GDPR)',
        'Column-level cryptographic protection monitoring'
      ],
      codeSnippet: `// Data Classification Finding
{
  "data_store": "s3://production-customer-vault-prod",
  "classification": "CONFIDENTIAL_PII",
  "encryption_at_rest": "AES-256 (KMS Managed)",
  "pqc_migration_priority": "CRITICAL",
  "data_residency": "ID_LOCAL_SOVEREIGN"
}`
    },
    {
      id: 'ai' as PlatformSubTab,
      label: 'NusaSec AI Reasoning',
      tag: '4-Tier Visibility Layer',
      headline: 'Context-aware intelligence with zero data retention',
      description: 'An AI engine designed specifically for cybersecurity reasoning that evaluates complex posture graphs without storing or training on sensitive tenant data.',
      icon: Sparkles,
      color: 'indigo',
      features: [
        'Strict 4-tier visibility model: PUBLIC, CUSTOMER, and INTERNAL planes',
        'Automated pull request generation for infrastructure remediation',
        'Plain-language risk and compliance executive summaries',
        'Cryptographic zero-retention guarantee for all reasoning inputs'
      ],
      codeSnippet: `// NusaSec-AI Delegated Context Call
POST /api/v1/ai/reason
{
  "visibility_tier": "CUSTOMER_AUTHORIZED",
  "tenant_id": "org_9841af",
  "context_scope": "ATTACK_PATH_REMEDIATION",
  "zero_retention_enforced": true
}`
    },
    {
      id: 'migration' as PlatformSubTab,
      label: 'Migration & Modernization',
      tag: 'Automated GitOps Workflows',
      headline: 'Safe, zero-downtime cryptographic and cloud migration',
      description: 'Modernize legacy security architectures and classical cipher suites through phased, automated migration workflows with built-in rollback protection.',
      icon: Layers,
      color: 'orange',
      features: [
        'Step-by-step PQC migration roadmap tailored to your stack',
        'Automated dual-certificate provisioning for hybrid TLS transitions',
        'Rollback validation tests for canary deployments',
        'Cryptographic compliance readiness benchmarks'
      ],
      codeSnippet: `// Migration Execution Pipeline
$ nusasec migrate pqc --target=FIPS_203 --mode=hybrid
[stage 1] Ingesting CBOM... OK
[stage 2] Generating Dual Certs... OK
[stage 3] Testing Canary Ingress... OK
[stage 4] Production Traffic Migrated: 100%`
    }
  ];

  const currentModule = platformModules.find(m => m.id === activeTab) || platformModules[0];

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      
      {/* Platform Header */}
      <section className="relative bg-white text-slate-900 py-16 border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-200 text-blue-600 text-xs font-mono">
              <Shield className="w-3.5 h-3.5" />
              <span>NusaSec Unified Architecture</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900">
              The NusaSec Platform
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              An enterprise-grade operating system unifying cloud security posture, attack path analysis, continuous compliance, and post-quantum cryptographic transitions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Platform Explorer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs uppercase font-mono tracking-wider text-slate-500 font-bold px-3 mb-2">
              Platform Modules
            </div>
            {platformModules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setActiveTab(mod.id)}
                className={`relative overflow-hidden w-full text-left p-3.5 rounded-xl border transition-colors flex items-center justify-between ${
                  activeTab === mod.id
                    ? 'text-slate-900 border-blue-400/50 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {activeTab === mod.id && (
                  <motion.span
                    layoutId="platform-tab-highlight"
                    className="absolute inset-0 bg-slate-50 -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${activeTab === mod.id ? 'bg-slate-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
                    <mod.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs sm:text-sm">{mod.label}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{mod.tag}</div>
                  </div>
                </div>
                {activeTab === mod.id && <ArrowRight className="w-4 h-4 text-blue-600" />}
              </button>
            ))}
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="space-y-6"
              >
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              
              <div className="space-y-2">
                <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-100 text-blue-800 border border-blue-200">
                  {currentModule.tag}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
                  {currentModule.headline}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {currentModule.description}
                </p>
              </div>

              {/* Bullet Features */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Key Technical Capabilities:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentModule.features.map((feat, fIdx) => (
                    <div key={fIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code / Configuration Snippet */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>Engine Implementation Sample</span>
                  <span className="text-blue-700 font-semibold">NusaSec Core Spec</span>
                </div>
                <div className="p-4 rounded-xl bg-white text-slate-800 font-mono text-xs overflow-x-auto shadow-inner border border-slate-200">
                  <pre>{currentModule.codeSnippet}</pre>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                <div className="text-xs text-slate-500">
                  Ready to test this capability in your cloud environment?
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={onOpenDemo}
                    className="btn-shimmer flex-1 sm:flex-none px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Request Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onOpenAuth('signup')}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 font-semibold text-xs transition-colors"
                  >
                    Start Free Trial
                  </button>
                </div>
              </div>

            </div>

            {/* PQC Algorithms Reference Table */}
            {activeTab === 'crypto-pqc' && (
              <div className="bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-lg font-display text-slate-900">
                    Supported Post-Quantum Cryptographic Standards (NIST Finalized)
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="py-2.5 pr-4">Algorithm</th>
                        <th className="py-2.5 px-4">Standard</th>
                        <th className="py-2.5 px-4">Type</th>
                        <th className="py-2.5 px-4">NusaSec Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-600">
                      {PQC_ALGORITHMS.map((algo, aIdx) => (
                        <tr key={aIdx} className="hover:bg-slate-100/40">
                          <td className="py-3 pr-4 font-bold text-slate-900">{algo.name}</td>
                          <td className="py-3 px-4 text-slate-500">{algo.standard}</td>
                          <td className="py-3 px-4 text-blue-600">{algo.type}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded text-[10px] bg-blue-50 text-blue-600 border border-blue-200">
                              {algo.nusaSecStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

    </div>
  );
};
