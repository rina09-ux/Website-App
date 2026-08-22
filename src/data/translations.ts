export type Language = 'id' | 'en';

export const TRANSLATIONS = {
  id: {
    // Navigation & Common
    nav: {
      platform: 'Platform',
      solutions: 'Solusi',
      ai: 'NusaSec AI',
      pricing: 'Harga & Paket',
      resources: 'Riset & CMS',
      trust: 'Pusat Kepercayaan',
      company: 'Tentang Kami',
      talkToAi: 'Tanya AI',
      bookDemo: 'Jadwalkan Demo',
      signIn: 'Masuk',
      startTrial: 'Uji Coba Gratis 14 Hari',
      langLabel: 'ID'
    },
    // Hero
    hero: {
      announcementTag: 'NusaSec Core v4.8',
      announcementText: 'Engine Kriptografi Pasca-Kuantum NIST FIPS 203/204 Resmi Dirilis',
      headline1: 'Platform Intelijen Keamanan Terpadu, Postur Multi-Cloud & ',
      headlineGradient: 'Kriptografi Pasca-Kuantum',
      subheadline: 'NusaSec membantu korporasi dan institusi ter regulasi memahami, mengukur, dan mengamankan postur multi-cloud, jalur serangan (attack paths), kepatuhan audit berkelanjutan (OJK, UU PDP, ISO 27001), serta transisi algoritma tahan kuantum dari satu konsol terpadu.',
      ctaDemo: 'Jadwalkan Demo Arsitektur',
      ctaTrial: 'Mulai Asesmen Gratis',
      ctaAi: 'Konsultasi dengan AI Publik',
      trialBadge: '14 Hari',
      certifications: {
        soc2: 'Tersertifikasi SOC 2 Type II',
        iso: 'Terverifikasi ISO 27001:2022',
        pqc: 'Standar NIST FIPS 203 (ML-KEM)',
        ojk: 'Kepatuhan POJK 11 & UU PDP'
      },
      telemetry: {
        title: 'STREAM TELEMETRI REAL-TIME',
        region: 'ap-southeast-3 (Jakarta) & Global Mesh',
        pass: 'LULUS: 1.428',
        fail: 'TEMUAN: 3',
        pqcRatio: 'TRANSISI PQC: 84%',
        card1Title: 'Postur Multi-Akun Cloud',
        card1Status: 'OPTIMAL',
        card1Count: '84 Akun Terhubung',
        card1Desc: '0 eskalasi izin IAM kritis terdeteksi',
        card2Title: 'Daftar Kriptografi (CBOM)',
        card2Status: 'HYBRID ML-KEM',
        card2Count: '2.840 Kunci & Sertifikat',
        card2Desc: 'Nol penggunaan RSA-1024 atau SHA-1',
        card3Title: 'Brankas Bukti Kepatuhan Otomatis',
        card3Status: 'TERVERIFIKASI',
        card3Count: '100% Kesiapan Audit',
        card3Desc: 'Kontrol OJK & ISO ditandatangani digital'
      }
    },
    // Problem Section
    problem: {
      tag: 'Tantangan Keamanan Enterprise',
      title: 'Tim Keamanan Terbebani oleh Solusi Terfragmentasi & Ancaman Dekripsi Masa Depan',
      description: 'Pendekatan keamanan perimeter klasik tidak lagi memadai di era multi-cloud yang kompleks, regulasi ketat (UU PDP & OJK), serta ancaman komputasi kuantum.',
      p1Title: 'Fragmentasi Alat & Banjir Notifikasi (Alert Fatigue)',
      p1Desc: 'Tim keamanan harus memantau belasan konsol terpisah (CSPM, IAM, K8s, container) menghasilkan ribuan notifikasi tanpa konteks hubungan grafis antar aset.',
      p1Result: 'Dampak: Jalur serangan kritis luput dari deteksi',
      p2Title: 'Ancaman HNDL (Harvest Now, Decrypt Later)',
      p2Desc: 'Pihak asing dan penyerang mulai menyadap dan menyimpan data enkripsi sensitif hari ini. Ketika komputer kuantum matang, enkripsi RSA-2048 & ECC akan jebol seketika.',
      p2Result: 'Dampak: Data rahasia masa kini bocor di masa depan',
      p3Title: 'Beban Audit Kepatuhan Manual yang Melelahkan',
      p3Desc: 'Tim GRC menghabiskan berbulan-bulan mengambil tangkapan layar manual dan merapikan spreadsheet untuk memenuhi audit OJK POJK 11, UU PDP, ISO 27001, dan SOC 2.',
      p3Result: 'Dampak: Pemborosan sumber daya dan risiko sanksi denda'
    },
    // Architecture Section
    architecture: {
      tag: 'Pemisahan Arsitektur Berlapis',
      title: 'Satu Sistem Otoritatif dengan Isolasi Kriptografis Ketat',
      description: 'NusaSec dibangun di atas prinsip isolasi matematis: Core menjamin kebenaran data, AI memberikan penalaran, sementara Tenant dan Internal beroperasi pada bidang kontrol terisolasi.',
      plane1Title: 'NusaSec-Website',
      plane1Role: 'Lapisan Publik & Edukasi',
      plane1Desc: 'Pusat informasi publik, riset kriptografi terbuka, status layanan, dan gerbang aktivasi komersial.',
      plane2Title: 'App-Customer',
      plane2Role: 'Bidang Kontrol Tenant',
      plane2Desc: 'Konsol privat pelanggan untuk investigasi jalur serangan, eksekusi remediasi GitOps, dan brankas bukti audit.',
      plane3Title: 'NusaSec-AI',
      plane3Role: 'Mesin Penalaran Cerdas',
      plane3Desc: 'Lapisan AI 4-tier dengan jaminan Zero Data Retention dan isolasi ketat antar tenant.',
      plane4Title: 'NusaSec-Core',
      plane4Role: 'Sistem Otoritatif (System of Record)',
      plane4Desc: 'Manajemen identitas, evaluasi graf postur, pencatatan CBOM, billing berulang, dan log audit yang tidak dapat diubah (immutable).'
    },
    // Capabilities
    capabilities: {
      tag: 'Kapabilitas Unggulan',
      title: 'Rekayasa Keamanan Siber untuk Skala Korporasi',
      description: 'Setiap modul ditenagai evaluasi grafis real-time, menghilangkan titik buta di seluruh cloud dan aset kriptografi.',
      tabs: [
        {
          title: 'Postur Keamanan Cloud (CSPM)',
          tag: 'Graf Multi-Cloud',
          desc: 'Penemuan aset otomatis tanpa agen, deteksi miskonfigurasi, dan korelasi izin identitas di AWS, GCP, Azure, dan Kubernetes.',
          bullets: [
            'Inventaris multi-cloud diperbarui real-time via event streaming',
            'Skoring kepatuhan otomatis CIS Benchmark v3.0 & standar industri',
            'Deteksi rantai eskalasi hak istimewa (privilege escalation) pada IAM',
            'Remediasi penyimpangan konfigurasi otomatis via GitOps Pull Request'
          ]
        },
        {
          title: 'Kriptografi Pasca-Kuantum (PQC)',
          tag: 'NIST FIPS 203/204',
          desc: 'Pemindaian Cryptographic Bill of Materials (CBOM), dukungan TLS 1.3 hybrid, dan migrasi kunci tahan kuantum.',
          bullets: [
            'Pemetaan otomatis kunci rentan RSA-2048, ECC, dan hash lawas',
            'Skoring eksposur ancaman Harvest-Now-Decrypt-Later (HNDL)',
            'Handshake Hybrid TLS (X25519 + ML-KEM-768) tanpa gangguan operasional',
            'Integrasi Hardware Security Module (HSM) FIPS 140-3'
          ]
        },
        {
          title: 'Kepatuhan Berkelanjutan (Audit Vault)',
          tag: 'Bukti Kriptografis',
          desc: 'Pengumpulan bukti audit otomatis dan bukti bertanda tangan digital untuk OJK POJK 11, UU PDP, ISO 27001, dan SOC 2.',
          bullets: [
            'Kolektor bukti otomatis berkala dari API cloud multi-wilayah',
            'Portal auditor read-only dengan verifikasi tanda tangan kriptografis',
            'Klasifikasi status kontrol: LULUS, GAGAL, TIDAK DIKETAHUI, TIDAK BERLAKU',
            'Deduplikasi kontrol lintas regulasi untuk menghemat 80%+ waktu audit'
          ]
        },
        {
          title: 'Analisis Jalur Serangan (Attack Paths)',
          tag: 'Intelijen Grafis',
          desc: 'Korelasi grafis yang menggabungkan eksposur internet, hak akses IAM, konfigurasi jaringan, dan kerentanan CVE.',
          bullets: [
            'Rekonstruksi visual jalur serangan multi-langkah (multi-hop)',
            'Analisis kombinasi toksik (IP Publik + Role Admin + CVE yang dapat dieksploitasi)',
            'Penyaringan 95% alarm palsu dengan fokus pada radius ledakan kritis',
            'Pembuatan kebijakan pengisolasian (containment) 1-klik'
          ]
        }
      ]
    },
    // Compliance & Regulations
    regulations: {
      tag: 'Kepatuhan & Kedaulatan Data',
      title: 'Memenuhi Standar Regulasi Nasional & Global',
      description: 'Didesain khusus untuk memenuhi regulasi perlindungan data dan ketahanan siber di Indonesia dan pasar internasional.'
    },
    // Metrics
    metrics: {
      tag: 'Hasil Terukur Pelanggan',
      title: 'Dipercaya oleh Institusi Finansial & Infrastruktur Kritis',
      m1Val: '82%',
      m1Label: 'Pengurangan Waktu Persiapan Audit Tahunan',
      m1Desc: 'Bank KBMI 4 mengotomatisasi pengumpulan bukti OJK POJK 11 dan ISO 27001 di 85 akun cloud.',
      m2Val: '100%',
      m2Label: 'Inventarisasi Aset Kriptografi (CBOM)',
      m2Desc: 'Jaringan sistem pembayaran nasional memetakan 4.200 endpoint RSA untuk migrasi ke NIST FIPS 203.',
      m3Val: '94%',
      m3Label: 'Penurunan Notifikasi Palsu (False Positives)',
      m3Desc: 'Unicorn FinTech memangkas kebisingan peringatan menggunakan analisis jalur ledakan grafis NusaSec.'
    }
  },
  en: {
    // Navigation & Common
    nav: {
      platform: 'Platform',
      solutions: 'Solutions',
      ai: 'NusaSec AI',
      pricing: 'Pricing',
      resources: 'Resources',
      trust: 'Trust Center',
      company: 'Company',
      talkToAi: 'Talk to AI',
      bookDemo: 'Book Demo',
      signIn: 'Sign In',
      startTrial: 'Start 14-Day Trial',
      langLabel: 'EN'
    },
    // Hero
    hero: {
      announcementTag: 'NusaSec Core v4.8',
      announcementText: 'NIST FIPS 203/204 Post-Quantum Engine Released',
      headline1: 'Unified Security Intelligence, Cloud Posture, and ',
      headlineGradient: 'Post-Quantum Agility',
      subheadline: 'NusaSec helps modern enterprises understand, measure, and govern security posture, attack paths, continuous compliance (SOC 2, ISO 27001, OJK, GDPR), multi-cloud exposure, and quantum cryptographic transitions from a single authoritative platform.',
      ctaDemo: 'Book an Architecture Demo',
      ctaTrial: 'Start Free Assessment',
      ctaAi: 'Talk to Public AI',
      trialBadge: '14 Days',
      certifications: {
        soc2: 'SOC 2 Type II Certified',
        iso: 'ISO 27001:2022 Verified',
        pqc: 'NIST FIPS 203 (ML-KEM) Ready',
        ojk: 'OJK POJK 11 & PDP Compliant'
      },
      telemetry: {
        title: 'LIVE TELEMETRY STREAM',
        region: 'ap-southeast-3 & Global Mesh',
        pass: 'PASS: 1,428',
        fail: 'FAIL: 3',
        pqcRatio: 'PQC TRANSITION: 84%',
        card1Title: 'AWS Multi-Account Posture',
        card1Status: 'OPTIMAL',
        card1Count: '84 Accounts Monitored',
        card1Desc: '0 critical IAM privilege escalations',
        card2Title: 'Cryptographic Bill of Materials',
        card2Status: 'ML-KEM HYBRID',
        card2Count: '2,840 Keys & Certs Inventoried',
        card2Desc: 'Zero RSA-1024 or SHA-1 detected',
        card3Title: 'Automated Evidence Vault',
        card3Status: 'SYNCED',
        card3Count: '100% Audit Readiness',
        card3Desc: 'SOC 2 & ISO controls timestamped'
      }
    },
    // Problem Section
    problem: {
      tag: 'The Enterprise Challenge',
      title: 'Modern Security Teams are Drowning in Fragmented Point Tools and Impending Quantum Obsolescence',
      description: 'Traditional security operations were designed for static perimeters. Today\'s reality is multi-cloud sprawl, continuous regulatory mandates, and cryptographic vulnerabilities.',
      p1Title: 'Fragmented Posture & Alert Fatigue',
      p1Desc: 'Security leads toggle between 15 disconnected consoles for CSPM, IAM, container security, and vulnerability management — generating 10,000 alerts with zero unified context.',
      p1Result: 'Result: Critical attack paths missed',
      p2Title: 'The Quantum HNDL Threat (Harvest Now, Decrypt Later)',
      p2Desc: 'Adversaries are actively exfiltrating and archiving encrypted enterprise and state secrets today. When quantum computers arrive, RSA-2048 and ECC will break retroactively.',
      p2Result: 'Result: Confidential data exposed forever',
      p3Title: 'Exhausting Manual Compliance Audits',
      p3Desc: 'GRC teams spend 4 months a year manually taking screenshots and assembling spreadsheets to prove compliance to SOC 2, ISO 27001, OJK, and PCI-DSS auditors.',
      p3Result: 'Result: Massive operational drag and human error'
    },
    // Architecture Section
    architecture: {
      tag: 'Architectural Separation',
      title: 'One Unified System of Record, Engineered for Strict Isolation',
      description: 'NusaSec is built on foundational mathematical separation: Core maintains data truth, AI delivers reasoning, while Customer and Internal planes operate in isolated control environments.',
      plane1Title: 'NusaSec-Website',
      plane1Role: 'Public Layer',
      plane1Desc: 'Brand, education, trust center, product discovery, and commercial conversion gateway.',
      plane2Title: 'App-Customer',
      plane2Role: 'Customer Control Plane',
      plane2Desc: 'Customer control plane for investigating attack paths, remediation actions, and audit evidence.',
      plane3Title: 'NusaSec-AI',
      plane3Role: 'Intelligence Layer',
      plane3Desc: '4-tier visibility model: PUBLIC_GENERAL, PUBLIC_SPECIFIC, CUSTOMER_AUTHORIZED, INTERNAL_AUTHORIZED.',
      plane4Title: 'NusaSec-Core',
      plane4Role: 'System of Record',
      plane4Desc: 'Identity, RBAC, tenant isolation, posture evaluation, billing, PQC certificates, and immutable audit logs.'
    },
    // Capabilities
    capabilities: {
      tag: 'Core Capabilities',
      title: 'Enterprise Security Engineering Built for Scale',
      description: 'Every capability is backed by real-time graph evaluation, eliminating blind spots across cloud and cryptographic assets.',
      tabs: [
        {
          title: 'Cloud Security Posture (CSPM)',
          tag: 'Multi-Cloud Graph',
          desc: 'Continuous asset discovery, misconfiguration detection, and identity graph correlation across AWS, GCP, Azure, and Kubernetes.',
          bullets: [
            'Multi-cloud inventory updated in real time via event streaming',
            'CIS Benchmarks v3.0 automated compliance scoring',
            'IAM role assumption chaining & privilege escalation detection',
            'Automated drift remediation via GitOps pull requests'
          ]
        },
        {
          title: 'Post-Quantum Cryptography (PQC)',
          tag: 'NIST FIPS 203/204',
          desc: 'Automated Cryptographic Bill of Materials (CBOM) scanning, hybrid TLS 1.3 agility, and quantum-resistant key migration.',
          bullets: [
            'Real-time discovery of legacy RSA-2048, ECC, and weak hashes',
            'Harvest-Now-Decrypt-Later (HNDL) exposure scoring',
            'Dual-handshake Hybrid TLS (X25519 + ML-KEM-768)',
            'FIPS 140-3 Hardware Security Module (HSM) key lifecycle management'
          ]
        },
        {
          title: 'Continuous Compliance & Audit',
          tag: 'Zero-Touch Vault',
          desc: 'Automated evidence collection and cryptographically signed audit trails for SOC 2 Type II, ISO 27001:2022, and OJK POJK 11.',
          bullets: [
            'Continuous automated proof collection from multi-cloud APIs',
            'Read-only cryptographically verifiable auditor portal',
            'Posture state tracking: PASS, FAIL, UNKNOWN, NOT_APPLICABLE',
            'Pre-mapped cross-framework control deduplication'
          ]
        },
        {
          title: 'Attack Path Analysis & Graph',
          tag: 'Graph Intelligence',
          desc: 'Graph-based correlation combining cloud exposure, IAM permissions, network routing, and exploitability into actionable paths.',
          bullets: [
            'Visual multi-hop attack path reconstruction',
            'Contextual blast radius & toxic combination detection',
            'Exploitability scoring weighted by asset business criticality',
            'One-click containment policy generation'
          ]
        }
      ]
    },
    // Compliance & Regulations
    regulations: {
      tag: 'Compliance & Trust',
      title: 'Continuous Assurance Across Global & Regional Mandates',
      description: 'Engineered specifically to satisfy stringent data sovereignty, privacy, and cybersecurity mandates across Indonesia and international markets.'
    },
    // Metrics
    metrics: {
      tag: 'Customer Outcomes',
      title: 'Trusted by Regulated Enterprises & Infrastructure Leaders',
      m1Val: '82%',
      m1Label: 'Reduction in Audit Cycle Prep Time',
      m1Desc: 'Tier-1 Bank automated evidence collection across 85 AWS accounts for OJK POJK 11 and ISO 27001 continuous verification.',
      m2Val: '100%',
      m2Label: 'Post-Quantum CBOM Inventory',
      m2Desc: 'National payment network identified and migrated 4,200 legacy RSA endpoints to NIST FIPS 203 Hybrid ML-KEM-768.',
      m3Val: '94%',
      m3Label: 'Reduction in False Positive Alerts',
      m3Desc: 'FinTech Unicorn utilized NusaSec graph intelligence to eliminate noisy isolated alerts and focus solely on critical blast radius.'
    }
  }
};
