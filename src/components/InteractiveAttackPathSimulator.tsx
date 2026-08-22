import React, { useState } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  Cpu, 
  Lock, 
  Cloud, 
  ArrowRight, 
  GitPullRequest, 
  Terminal, 
  Layers, 
  RefreshCw,
  Server,
  Database,
  Key,
  Globe,
  ExternalLink
} from 'lucide-react';
import { Language } from '../data/translations';

interface InteractiveAttackPathSimulatorProps {
  language?: Language;
  onBookDemo: () => void;
}

interface Scenario {
  id: string;
  name: string;
  nameId: string;
  environment: string;
  cloud: 'AWS' | 'GCP' | 'Azure' | 'Hybrid';
  nodes: {
    id: string;
    label: string;
    type: 'internet' | 'gateway' | 'compute' | 'iam' | 'database';
    vulnerability?: string;
    pqcStatus: 'VULNERABLE_RSA' | 'QUANTUM_SAFE' | 'HYBRID_KEM';
    critical: boolean;
  }[];
  toxicComboSummary: string;
  toxicComboSummaryId: string;
  remediationPr: {
    title: string;
    file: string;
    diffSnippet: string;
  };
  evidenceProof: {
    id: string;
    control: string;
    framework: string;
    signedBy: string;
  };
}

export const InteractiveAttackPathSimulator: React.FC<InteractiveAttackPathSimulatorProps> = ({
  language = 'id',
  onBookDemo
}) => {
  const isId = language === 'id';

  const scenarios: Scenario[] = [
    {
      id: 'sc-1',
      name: 'E-Commerce Ingress to Sovereign Database Blast Path',
      nameId: 'Jalur Serangan Ingress E-Commerce ke Basis Data Kedaulatan',
      environment: 'Production Jakarta Region (ap-southeast-3)',
      cloud: 'AWS',
      nodes: [
        {
          id: 'n1',
          label: 'Internet: Public Attack Surface',
          type: 'internet',
          pqcStatus: 'VULNERABLE_RSA',
          critical: false
        },
        {
          id: 'n2',
          label: 'ALB: Ingress Gateway (Port 443)',
          type: 'gateway',
          vulnerability: 'TLS 1.2 RSA-2048 Cipher (HNDL Exposed)',
          pqcStatus: 'VULNERABLE_RSA',
          critical: true
        },
        {
          id: 'n3',
          label: 'EKS Pod: Checkout API (CVE-2026-4029)',
          type: 'compute',
          vulnerability: 'Remote Code Execution via unpatched lib',
          pqcStatus: 'VULNERABLE_RSA',
          critical: true
        },
        {
          id: 'n4',
          label: 'IAM Role: AdminS3RDSFullAccess',
          type: 'iam',
          vulnerability: 'Over-privileged wildcard action: "*"',
          pqcStatus: 'QUANTUM_SAFE',
          critical: true
        },
        {
          id: 'n5',
          label: 'RDS Aurora: Customer Financial Ledger',
          type: 'database',
          vulnerability: 'Unrotated static credentials in config map',
          pqcStatus: 'VULNERABLE_RSA',
          critical: true
        }
      ],
      toxicComboSummary: 'Public IP Ingress + Unpatched Container RCE + Wildcard IAM Role leads directly to Sovereign Customer Database in 3 network hops.',
      toxicComboSummaryId: 'Ingress IP Publik + RCE Kontainer Belum Dipatch + Role IAM Wildcard membuka akses langsung ke Database Finansial dalam 3 langkah.',
      remediationPr: {
        title: 'Fix: Lock down IAM AssumeRole & Upgrade Ingress to Hybrid ML-KEM-768',
        file: 'terraform/modules/iam_ingress_policy.tf',
        diffSnippet: `- resource "aws_iam_role_policy" "wildcard_access" {
-   action = "*"
-   resource = "*"
+ resource "aws_iam_role_policy" "least_privilege_checkout" {
+   action   = ["rds-data:ExecuteStatement"]
+   resource = [aws_rds_cluster.customer_ledger.arn]
+   condition {
+     test     = "StringEquals"
+     variable = "aws:PrincipalTag/PqcHandshake"
+     values   = ["ML-KEM-768"]
+   }
+ }`
      },
      evidenceProof: {
        id: 'ev_nusasec_8921a4',
        control: 'OJK POJK 11 / Pasal 24 (Enkripsi & Akses Minimal)',
        framework: 'OJK_POJK_11_2022',
        signedBy: 'NusaSec-Core (ML-DSA-65 Validated)'
      }
    },
    {
      id: 'sc-2',
      name: 'Banking API Gateway to Core Ledger Cross-Account Chaining',
      nameId: 'Rantai Eskalasi Gateway API Perbankan ke Core Ledger Lintas Akun',
      environment: 'Multi-Account FinTech Mesh (AWS + GCP)',
      cloud: 'Hybrid',
      nodes: [
        {
          id: 'n1',
          label: 'External Mobile Client Traffic',
          type: 'internet',
          pqcStatus: 'VULNERABLE_RSA',
          critical: false
        },
        {
          id: 'n2',
          label: 'Cloud Armor / WAF Ingress',
          type: 'gateway',
          pqcStatus: 'HYBRID_KEM',
          critical: false
        },
        {
          id: 'n3',
          label: 'GKE Microservice: Payment Router',
          type: 'compute',
          vulnerability: 'Unsigned JWT secret token bypass',
          pqcStatus: 'VULNERABLE_RSA',
          critical: true
        },
        {
          id: 'n4',
          label: 'Cross-Cloud IAM Federation Bridge',
          type: 'iam',
          vulnerability: 'Overly permissive Trust Relationship',
          pqcStatus: 'VULNERABLE_RSA',
          critical: true
        },
        {
          id: 'n5',
          label: 'Vault HSM Root Key Store',
          type: 'database',
          vulnerability: 'Single-factor classical key wrapping',
          pqcStatus: 'HYBRID_KEM',
          critical: false
        }
      ],
      toxicComboSummary: 'Bypassed JWT validation permits cross-cloud identity assumption targeting primary key vault.',
      toxicComboSummaryId: 'Bypass validasi JWT mengizinkan eskalasi identitas lintas cloud menuju brankas kunci utama.',
      remediationPr: {
        title: 'Fix: Enforce FIDO2 WebAuthn & Restrict IAM Trust Relationship',
        file: 'kubernetes/manifests/payment-ingress-auth.yaml',
        diffSnippet: `- enable_legacy_jwt_fallback: true
+ enable_legacy_jwt_fallback: false
+ jwt_verification_algorithm: "ML-DSA-65"
+ require_hardware_mfa: true`
      },
      evidenceProof: {
        id: 'ev_nusasec_4481c9',
        control: 'ISO/IEC 27001:2022 Control A.8.24 (Cryptography)',
        framework: 'ISO_27001_2022',
        signedBy: 'NusaSec-Core (FIPS 204 ML-DSA-65)'
      }
    }
  ];

  const [activeScenarioId, setActiveScenarioId] = useState<string>('sc-1');
  const [isSimulating, setIsSimulating] = useState(false);
  const [remediated, setRemediated] = useState(false);
  const [activeTab, setActiveTab] = useState<'graph' | 'gitops' | 'evidence'>('graph');

  const currentScenario = scenarios.find(s => s.id === activeScenarioId) || scenarios[0];

  const handleTriggerRemediation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setRemediated(true);
      setActiveTab('gitops');
    }, 900);
  };

  const handleReset = () => {
    setRemediated(false);
    setActiveTab('graph');
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl space-y-6">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-500/10 text-red-600 border border-red-200">
              <Layers className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold font-display text-slate-900">
              {isId ? 'Simulator Visual Jalur Serangan & Graf Risiko' : 'Interactive Attack Path & Posture Graph Simulator'}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {isId 
              ? 'Uji bagaimana NusaSec mengidentifikasi kombinasi toksik (Toxic Combinations) dan menghasilkan PR GitOps otomatis.'
              : 'Test how NusaSec correlates multi-cloud toxic combinations and issues instant automated GitOps PR remediations.'}
          </p>
        </div>

        {/* Scenario Switcher */}
        <div className="flex items-center gap-2">
          {scenarios.map((sc) => (
            <button
              key={sc.id}
              onClick={() => {
                setActiveScenarioId(sc.id);
                setRemediated(false);
                setActiveTab('graph');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeScenarioId === sc.id
                  ? 'bg-blue-500 text-slate-950 font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sc.cloud} {isId ? 'Skenario' : 'Scenario'} {sc.id.replace('sc-', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Sub tabs: Graph View / GitOps PR / Evidence Proof */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('graph')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'graph' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isId ? 'Graf Jalur Serangan' : 'Attack Path Graph'}</span>
          </button>

          <button
            onClick={() => setActiveTab('gitops')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'gitops' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <GitPullRequest className="w-3.5 h-3.5 text-blue-600" />
            <span>{isId ? 'Remediasi GitOps (IaC)' : 'GitOps Remediation (IaC)'}</span>
            {remediated && (
              <span className="w-2 h-2 rounded-full bg-blue-400" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('evidence')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'evidence' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            <span>{isId ? 'Bukti Audit Kriptografis' : 'Cryptographic Audit Proof'}</span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
          {currentScenario.environment}
        </div>
      </div>

      {/* TAB 1: Attack Path Graph Visualizer */}
      {activeTab === 'graph' && (
        <div className="space-y-4">
          
          {/* Toxic combo warning alert */}
          <div className={`p-4 rounded-xl border flex items-start gap-3 transition-colors ${
            remediated 
              ? 'bg-blue-50 border-blue-200 text-blue-300' 
              : 'bg-red-50 border-red-200 text-red-300'
          }`}>
            {remediated ? (
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            )}
            <div className="text-xs space-y-1">
              <div className="font-bold uppercase tracking-wider font-mono">
                {remediated 
                  ? (isId ? 'STATUS JALUR: TERREMEDIASI & TERISOLASI' : 'BLAST RADIUS CONTAINED & SECURED')
                  : (isId ? 'KOMBINASI TOKSIK KRITIS TERDETEKSI' : 'CRITICAL TOXIC COMBINATION DETECTED')}
              </div>
              <p className="text-slate-600 leading-relaxed">
                {remediated 
                  ? (isId 
                      ? 'Kebijakan IAM least-privilege telah diterbitkan dan enkripsi Hybrid ML-KEM-768 telah aktif. Akses basis data terlindungi.'
                      : 'Least-privilege IAM policy applied & Hybrid ML-KEM-768 enabled. Blast radius eradicated.')
                  : (isId ? currentScenario.toxicComboSummaryId : currentScenario.toxicComboSummary)}
              </p>
            </div>
          </div>

          {/* Interactive Flow Nodes */}
          <div className="space-y-2 pt-2">
            <div className="text-[11px] font-mono uppercase text-slate-500 font-bold">
              {isId ? 'Langkah Penetrasi Lintas Aset (Multi-Hop Traversal):' : 'Multi-Hop Penetration Traversal:'}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {currentScenario.nodes.map((node, nIdx) => {
                const isNodeRemediated = remediated && node.critical;

                return (
                  <div
                    key={node.id}
                    className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all relative ${
                      isNodeRemediated
                        ? 'bg-white border-blue-200 shadow-blue-500/10'
                        : node.critical
                          ? 'bg-white border-red-200'
                          : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[10px] text-slate-500 font-bold">HOP {nIdx + 1}</span>
                        {node.pqcStatus === 'VULNERABLE_RSA' ? (
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${
                            isNodeRemediated ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
                          }`}>
                            {isNodeRemediated ? 'ML-KEM' : 'RSA-2048'}
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-blue-50 text-blue-600">
                            PQC READY
                          </span>
                        )}
                      </div>

                      <div className="font-semibold text-xs text-slate-900 mb-1.5">
                        {node.label}
                      </div>

                      {node.vulnerability && (
                        <div className={`text-[10px] font-mono leading-tight ${
                          isNodeRemediated ? 'text-blue-600' : 'text-red-300'
                        }`}>
                          {isNodeRemediated ? '✓ Remediated' : `⚠ ${node.vulnerability}`}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 mt-2 border-t border-slate-900 text-[10px] font-mono flex items-center justify-between text-slate-500">
                      <span>{node.type.toUpperCase()}</span>
                      {node.critical && !isNodeRemediated && (
                        <span className="text-red-600 font-bold animate-pulse">EXPLOITABLE</span>
                      )}
                      {isNodeRemediated && (
                        <span className="text-blue-600 font-bold">LOCKED</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
            <div className="text-xs text-slate-500">
              {isId 
                ? 'NusaSec menghubungkan konfigurasi IAM, routing jaringan, dan CBOM dalam hitungan milidetik.'
                : 'NusaSec correlates IAM configurations, network routing, and CBOM in milliseconds.'}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {!remediated ? (
                <button
                  onClick={handleTriggerRemediation}
                  disabled={isSimulating}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                >
                  {isSimulating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>{isId ? 'Memproses GitOps PR...' : 'Generating GitOps PR...'}</span>
                    </>
                  ) : (
                    <>
                      <GitPullRequest className="w-3.5 h-3.5" />
                      <span>{isId ? 'Generate GitOps PR & Kunci Jalur' : 'Generate GitOps PR & Contain Path'}</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-mono text-xs transition-colors"
                >
                  {isId ? '↺ Reset Simulasi' : '↺ Reset Simulation'}
                </button>
              )}

              <button
                onClick={onBookDemo}
                className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs transition-colors"
              >
                {isId ? 'Jadwalkan Demo Langsung' : 'Book Live Demo'}
              </button>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: GitOps IaC Remediation PR View */}
      {activeTab === 'gitops' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <GitPullRequest className="w-4 h-4 text-blue-600" />
              <span className="font-bold text-slate-900">{currentScenario.remediationPr.title}</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200 text-[10px]">
              PR #1084 • MERGE READY
            </span>
          </div>

          <div className="text-[11px] font-mono text-slate-500">
            Target File: <span className="text-slate-900">{currentScenario.remediationPr.file}</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 font-mono text-xs overflow-x-auto shadow-inner">
            <pre className="text-slate-600 leading-relaxed whitespace-pre-wrap">
              {currentScenario.remediationPr.diffSnippet}
            </pre>
          </div>

          <div className="p-3 rounded-lg bg-slate-100/60 border border-slate-300/50 text-xs text-slate-600 flex items-center justify-between">
            <span>
              {isId 
                ? 'PR ini dapat di-merge otomatis melalui integrasi GitHub / GitLab / Terraform Cloud.'
                : 'This PR can be automatically merged via GitHub / GitLab / Terraform Cloud CI/CD.'}
            </span>
            <span className="font-mono text-blue-600 font-bold">100% Zero-Touch</span>
          </div>
        </div>
      )}

      {/* TAB 3: Cryptographic Audit Proof */}
      {activeTab === 'evidence' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500">EVIDENCE_PROOF_ID</span>
              <span className="text-slate-900 font-bold">{currentScenario.evidenceProof.id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">REGULATORY_CONTROL</span>
              <span className="text-blue-600">{currentScenario.evidenceProof.control}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">CRYPTOGRAPHIC_SIGNATURE</span>
              <span className="text-blue-600">{currentScenario.evidenceProof.signedBy}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">TIMESTAMP_IMMUTABLE</span>
              <span className="text-slate-600">2026-08-19T20:30:00Z (FIPS 204 Validated)</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            {isId 
              ? 'Bukti ini dienkripsi dengan algoritma pasca-kuantum dan dapat diverifikasi secara independen oleh auditor eksternal tanpa memerlukan akses kredensial ke infrastruktur cloud Anda.'
              : 'This proof is signed with post-quantum algorithms and can be independently verified by external auditors without granting them credentials to your cloud accounts.'}
          </p>
        </div>
      )}

    </div>
  );
};
