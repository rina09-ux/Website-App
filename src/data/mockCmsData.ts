import { Article, PricingTier, SecurityStatusItem, PqcAlgorithm } from '../types';

export const PQC_ALGORITHMS: PqcAlgorithm[] = [
  {
    name: 'ML-KEM (Kyber)',
    standard: 'NIST FIPS 203',
    type: 'KEM',
    securityLevel: 'Category 1, 3, 5 (AES-128/192/256 equivalent)',
    nusaSecStatus: 'PRODUCTION_READY',
    description: 'Primary post-quantum key encapsulation mechanism for general encryption and hybrid TLS 1.3 handshakes.'
  },
  {
    name: 'ML-DSA (Dilithium)',
    standard: 'NIST FIPS 204',
    type: 'Signature',
    securityLevel: 'Category 2, 3, 5',
    nusaSecStatus: 'PRODUCTION_READY',
    description: 'Primary lattice-based digital signature standard for identity verification, code signing, and root of trust.'
  },
  {
    name: 'SLH-DSA (SPHINCS+)',
    standard: 'NIST FIPS 205',
    type: 'Signature',
    securityLevel: 'Category 1, 3, 5',
    nusaSecStatus: 'PRODUCTION_READY',
    description: 'Stateless hash-based signature scheme providing mathematical backup against lattice-cryptanalysis breakthroughs.'
  },
  {
    name: 'Hybrid X25519 + ML-KEM-768',
    standard: 'IETF RFC Draft',
    type: 'KEM',
    securityLevel: 'Combined Classical & Quantum-Resistant',
    nusaSecStatus: 'HYBRID_MODE',
    description: 'Zero-downtime transitional cipher suite ensuring classical security while resisting Harvest-Now-Decrypt-Later (HNDL) attacks.'
  }
];

export const CMS_ARTICLES: Article[] = [
  {
    id: 'res-1',
    title: 'Migrating Enterprise PKI to NIST FIPS 203 & 204: A Practical Execution Framework',
    slug: 'migrating-enterprise-pki-fips-203-204',
    category: 'research',
    date: 'Aug 14, 2026',
    readTime: '12 min read',
    featured: true,
    summary: 'An architectural guide on inventorying classical cryptographic algorithms across legacy services and executing hybrid dual-certificate transitions without downtime.',
    author: {
      name: 'Dr. Harris Gunawan',
      role: 'Head of Cryptographic Research, NusaSec'
    },
    tags: ['PQC', 'NIST FIPS', 'PKI', 'Hybrid TLS', 'Cryptography'],
    content: [
      'The publication of finalized NIST Post-Quantum Cryptography standards (FIPS 203, 204, and 205) shifts post-quantum readiness from theoretical research to mandatory infrastructure modernization.',
      'Organisations facing "Harvest-Now, Decrypt-Later" (HNDL) threats cannot wait until fault-tolerant quantum computers (Q-Day) materialize. Data with a confidentiality lifespan of 5+ years (PII, financial ledgers, classified state secrets) intercepted today will be decrypted retroactively.',
      'NusaSec provides an automated Cryptographic Bill of Materials (CBOM) engine that discovers hardcoded cipher suites, expired root certificates, and quantum-vulnerable public key exchanges across multi-cloud infrastructure in real time.',
      'Phase 1 focuses on continuous automated CBOM inventorying; Phase 2 introduces dual-certificate hybrid TLS 1.3 endpoints; Phase 3 completes native ML-KEM/ML-DSA enforcement across edge proxies, API gateways, and database column-level encryption.'
    ]
  },
  {
    id: 'res-2',
    title: 'NusaSec Q3 2026 Threat Landscape: Cloud Identity Drift & Quantum Interception Vectors',
    slug: 'q3-2026-threat-landscape-report',
    category: 'whitepapers',
    date: 'Aug 02, 2026',
    readTime: '18 min read',
    featured: true,
    summary: 'Analysis of 14 million enterprise cloud assets showing how misconfigured IAM role assumptions correlate with lateral movement and unencrypted data exfiltration.',
    author: {
      name: 'Raden Wicaksono',
      role: 'Chief Security Officer, NusaSec'
    },
    tags: ['Threat Intel', 'Cloud Security', 'IAM Drift', 'Zero Trust'],
    content: [
      'Over 64% of enterprise multi-cloud breaches analyzed in Q3 2026 originated not from zero-day code exploits, but from cross-account role chaining and excessive service principal permissions.',
      'NusaSec Cloud Graph engine correlates identity graph relationships with active network flow logs to expose non-obvious attack paths before adversaries can exploit them.',
      'This whitepaper provides actionable baseline configurations for AWS IAM, Google Cloud Workload Identity Federation, and Azure Entra ID to enforce true least privilege without breaking CI/CD velocity.'
    ]
  },
  {
    id: 'res-3',
    title: 'Bank Mandiri Digital & FinTech Alliance: Continuous OJK POJK 11 & ISO 27001 Automation',
    slug: 'case-study-fintech-bank-compliance',
    category: 'case-studies',
    date: 'Jul 28, 2026',
    readTime: '7 min read',
    summary: 'How a tier-1 banking group reduced compliance audit prep from 120 days to 4 hours using NusaSec automated evidence collection and immutable audit logs.',
    author: {
      name: 'NusaSec Enterprise Solutions',
      role: 'Banking & Financial Services Practice'
    },
    tags: ['Case Study', 'Fintech', 'ISO 27001', 'OJK POJK', 'Banking'],
    content: [
      'Financial institutions face stringent regulatory requirements from central banks and data sovereignty laws. Manual screenshot collection and spreadsheet audit prep created massive operational drag.',
      'By integrating NusaSec Core and continuous evidence collectors across 85 AWS accounts and 3 on-prem private cloud clusters, the customer achieved continuous compliance posture tracking.',
      'Auditors gained a dedicated read-only cryptographically verifiable evidence portal, reducing audit cycle costs by 82%.'
    ]
  },
  {
    id: 'res-4',
    title: 'NusaSec Core v4.8 Released: Real-time Multi-Region Posture Engine & Webhook v2',
    slug: 'nusasec-core-v4-8-release-notes',
    category: 'news',
    date: 'Aug 18, 2026',
    readTime: '4 min read',
    summary: 'Announcing ultra-low latency graph streaming, automated Kubernetes admission controller webhooks, and native HashiCorp Vault PQC key engine integrations.',
    author: {
      name: 'NusaSec Engineering Team',
      role: 'Core Systems'
    },
    tags: ['Release', 'NusaSec-Core', 'Kubernetes', 'Vault'],
    content: [
      'We are excited to release NusaSec Core v4.8, bringing millisecond-level posture updates across distributed multi-region Kubernetes clusters.',
      'Key updates include zero-impact eBPF telemetry sensors, dynamic admission mutation for PQC TLS certificates, and out-of-the-box integrations with Splunk, Datadog, and Jira Service Management.'
    ]
  },
  {
    id: 'res-5',
    title: 'Zero Trust Architecture Guide: Implementing NIST SP 800-207 with NusaSec',
    slug: 'zero-trust-architecture-nist-800-207',
    category: 'guides',
    date: 'Jul 15, 2026',
    readTime: '15 min read',
    summary: 'A step-by-step technical implementation guide for security architects mapping NusaSec Policy Decision Points (PDP) to hybrid corporate workloads.',
    author: {
      name: 'NusaSec Architecture Team',
      role: 'Zero Trust Systems'
    },
    tags: ['Zero Trust', 'NIST 800-207', 'PDP', 'Architecture'],
    content: [
      'NIST SP 800-207 defines Zero Trust as a cybersecurity paradigm focused on resource protection and the premise that trust is never granted implicitly.',
      'This guide covers how NusaSec acts as the Policy Engine and Policy Administrator, continuously validating identity, device posture, and cryptographic integrity before issuing ephemeral credentials.'
    ]
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Foundation',
    badge: 'Essential Posture',
    description: 'Continuous cloud security visibility, CIS baseline auditing, and automated vulnerability scanning for growing engineering teams.',
    monthlyPrice: 349,
    annualPrice: 289,
    popular: false,
    features: [
      'Up to 250 Cloud Resources & Workloads',
      'Continuous CSPM for AWS, GCP & Azure',
      'CIS Benchmark & Basic NIST Compliance',
      'Cryptographic Inventory (Classical Algorithms)',
      'Public NusaSec AI Assistant Access',
      'Daily Automated Security Audits',
      'Email & Slack Alert Integrations'
    ],
    specs: {
      cloudAssets: '250 assets',
      complianceFrameworks: '3 frameworks (CIS, SOC 2, ISO 27001)',
      pqcScanFrequency: 'Weekly',
      aiQueries: '500 queries/mo',
      retention: '90 days audit history',
      support: 'Standard Business SLA (24h)'
    },
    ctaLabel: 'Start 14-Day Free Trial'
  },
  {
    id: 'growth',
    name: 'Advanced Posture & AI',
    badge: 'Most Popular',
    description: 'Complete multi-cloud attack path analysis, automated compliance evidence collection, and NusaSec-AI reasoning integration.',
    monthlyPrice: 899,
    annualPrice: 749,
    popular: true,
    features: [
      'Up to 1,500 Cloud Resources & Kubernetes Pods',
      'Real-time Cloud Graph & Attack Path Analysis',
      'SOC 2, ISO 27001, PCI-DSS & OJK Automation',
      'Automated Evidence Collector & Audit Vault',
      'Post-Quantum Cryptography (PQC) Readiness Scanner',
      'Customer Control Plane AI Reasoning Engine',
      'Automated Remediation Webhooks & PR Generator',
      'Multi-team RBAC & SSO / SAML / Okta Integration'
    ],
    specs: {
      cloudAssets: '1,500 assets',
      complianceFrameworks: '12+ global & regional frameworks',
      pqcScanFrequency: 'Continuous (Real-time)',
      aiQueries: '5,000 queries/mo',
      retention: '1 Year immutable audit trail',
      support: 'Priority SLA (4h response)'
    },
    ctaLabel: 'Deploy Advanced Security'
  },
  {
    id: 'enterprise',
    name: 'Enterprise & PQC Agility',
    badge: 'Mission-Critical',
    description: 'Full-spectrum enterprise posture, post-quantum crypto-migration workbench, sovereign data residency, and dedicated security engineering.',
    monthlyPrice: 2199,
    annualPrice: 1849,
    popular: false,
    features: [
      'Unlimited Cloud Resources, Clusters & Gateways',
      'Full PQC Migration Workbench (FIPS 203/204/205)',
      'Hybrid TLS 1.3 & Post-Quantum PKI Management',
      'Sovereign Data Isolation & Private Tenant VPC',
      'Dedicated NusaSec-AI fine-tuned on company policies',
      'Custom Compliance Framework Builder',
      '24/7/365 SOC Advisory & Threat Response Support',
      'Dedicated Technical Account Manager & Cryptographer'
    ],
    specs: {
      cloudAssets: 'Unlimited scalable assets',
      complianceFrameworks: 'All frameworks + Custom policy engine',
      pqcScanFrequency: 'Continuous real-time eBPF streaming',
      aiQueries: 'Unlimited enterprise reasoning',
      retention: '7 Years compliance & audit retention',
      support: '24/7 Dedicated 15-minute SLA'
    },
    ctaLabel: 'Request Enterprise Trial'
  },
  {
    id: 'sovereign',
    name: 'GovCloud & Sovereign',
    badge: 'Air-Gapped & Defense',
    description: 'On-premise air-gapped deployment, state-grade hardware security module (HSM) support, and national sovereignty compliance.',
    monthlyPrice: 0,
    annualPrice: 0,
    popular: false,
    features: [
      'Self-Hosted / Air-Gapped Kubernetes Deployment',
      'FIPS 140-3 Level 4 HSM & Quantum RNG Integration',
      'Zero Outbound Telemetry Guarantee',
      'National Defense & Critical Infrastructure Ready',
      'Bespoke Post-Quantum Cryptographic Migration Plan',
      'Source Code Escrow & On-Premise Audit Rights'
    ],
    specs: {
      cloudAssets: 'Unlimited air-gapped nodes',
      complianceFrameworks: 'National Security & Custom Defense',
      pqcScanFrequency: 'Hardware-accelerated continuous',
      aiQueries: 'Self-hosted on-prem AI models',
      retention: 'Permanent sovereign ledger',
      support: 'Dedicated On-Call Cryptographic Engineers'
    },
    ctaLabel: 'Contact Government Solutions'
  }
];

export const SYSTEM_STATUS_DATA: SecurityStatusItem[] = [
  { name: 'NusaSec-Core Ingestion API (ap-southeast-1)', status: 'operational', uptime: '99.99%', latency: '18ms', region: 'Jakarta & Singapore' },
  { name: 'NusaSec-AI Reasoning Cluster', status: 'operational', uptime: '99.98%', latency: '42ms', region: 'Global Edge' },
  { name: 'Customer Control Plane (App-Customer)', status: 'operational', uptime: '99.99%', latency: '14ms', region: 'Multi-Region CDN' },
  { name: 'Post-Quantum Certificate Authority (PQC-CA)', status: 'operational', uptime: '100.00%', latency: '22ms', region: 'FIPS 140-3 HSM Pool' },
  { name: 'Continuous Evidence Collector & Audit Vault', status: 'operational', uptime: '99.99%', latency: '26ms', region: 'Encrypted Multi-Cloud' },
  { name: 'Public API & Status Gateway', status: 'operational', uptime: '100.00%', latency: '9ms', region: 'Anycast Edge' }
];

export const COMPLIANCE_FRAMEWORKS = [
  { name: 'SOC 2 Type II', authority: 'AICPA', scope: 'Security, Availability, Confidentiality', status: 'CERTIFIED' },
  { name: 'ISO/IEC 27001:2022', authority: 'ISO / IEC', scope: 'Information Security Management System', status: 'CERTIFIED' },
  { name: 'NIST SP 800-207', authority: 'NIST', scope: 'Zero Trust Architecture Benchmark', status: 'COMPLIANT' },
  { name: 'PCI-DSS v4.0', authority: 'PCI Security Standards Council', scope: 'Level 1 Service Provider', status: 'CERTIFIED' },
  { name: 'OJK POJK 11 / 2022', authority: 'Otoritas Jasa Keuangan', scope: 'Cyber Resilience & Banking IT', status: 'COMPLIANT' },
  { name: 'GDPR & UU PDP', authority: 'EU & Indonesia Data Privacy', scope: 'Data Sovereignty & Encryption', status: 'COMPLIANT' },
  { name: 'NIST FIPS 203 / 204 / 205', authority: 'NIST Post-Quantum', scope: 'ML-KEM, ML-DSA, SLH-DSA Readiness', status: 'STANDARDIZED' }
];
