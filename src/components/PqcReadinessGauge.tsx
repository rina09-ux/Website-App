import React, { useState, useMemo } from 'react';
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';
import {
  Cpu,
  ShieldCheck,
  ShieldAlert,
  Zap,
  Lock,
  RefreshCw,
  ArrowRight,
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Server,
  KeyRound,
  Download,
  Info
} from 'lucide-react';
import { Language } from '../data/translations';

interface PqcReadinessGaugeProps {
  language?: Language;
  onOpenDemo?: () => void;
  onOpenAi?: () => void;
}

export type EnterpriseTier = 'banking' | 'sovereign_gov' | 'telecom' | 'enterprise_saas';

export const PqcReadinessGauge: React.FC<PqcReadinessGaugeProps> = ({
  language = 'id',
  onOpenDemo,
  onOpenAi,
}) => {
  const isId = language === 'id';

  // State
  const [selectedTier, setSelectedTier] = useState<EnterpriseTier>('banking');
  const [currentPhase, setCurrentPhase] = useState<number>(2); // 1 to 4
  const [isSimulatingTransition, setIsSimulatingTransition] = useState<boolean>(false);

  // Industry Profile Base Configurations
  const tierConfigs = useMemo(() => {
    return {
      banking: {
        title: isId ? 'Sektor Perbankan & FinTech (OJK POJK 11)' : 'Core Banking & FinTech (OJK Mandate)',
        baseScore: [32, 64, 88, 100],
        fips203Progress: [25, 60, 92, 100], // ML-KEM
        fips204Progress: [15, 45, 84, 100], // ML-DSA
        cbomDiscovered: '1,420 / 1,420',
        legacyRsaPct: [82, 45, 12, 0],
        hndlRisk: [
          isId ? 'KRITIS (78% Transaksi Masih RSA-2048)' : 'CRITICAL (78% Payload on RSA-2048)',
          isId ? 'SEDANG (Hybrid ML-KEM Aktif di Edge)' : 'MODERATE (Hybrid ML-KEM on Edge)',
          isId ? 'RENDAH (Sovereign DB Terenkripsi PQC)' : 'LOW (Sovereign DB PQC-Shielded)',
          isId ? 'KEBAL (100% Post-Quantum Native)' : 'IMMUNE (100% PQC-Native FIPS 203/204)'
        ],
        description: isId 
          ? 'Mandat kepatuhan POJK 11 dan UU PDP mewajibkan retensi data sensitif nasabah hingga 10 tahun, menjadikannya target utama serangan Harvest Now, Decrypt Later (HNDL).'
          : 'POJK 11 and UU PDP require up to 10-year sensitive data retention, making core banking transaction records prime targets for Harvest Now, Decrypt Later (HNDL).'
      },
      sovereign_gov: {
        title: isId ? 'Infrastruktur Kritis Pemerintah & Kedaulatan' : 'Sovereign Government & Critical Infra',
        baseScore: [28, 55, 82, 100],
        fips203Progress: [20, 50, 85, 100],
        fips204Progress: [10, 40, 78, 100],
        cbomDiscovered: '3,890 / 3,890',
        legacyRsaPct: [88, 52, 18, 0],
        hndlRisk: [
          isId ? 'KRITIS (Arsip Intelijen Berisiko HNDL)' : 'CRITICAL (Intelligence Archives Exposed)',
          isId ? 'SEDANG (Gerbang Kedaulatan Terisolasi)' : 'MODERATE (Sovereign Gateways Guarded)',
          isId ? 'RENDAH (Enkripsi Kisi Terpasang)' : 'LOW (Lattice Cryptography Enforced)',
          isId ? 'KEBAL (Sovereign Quantum Immunity)' : 'IMMUNE (Sovereign Quantum Immunity)'
        ],
        description: isId
          ? 'Kedaulatan data nasional memerlukan sertifikat FIPS 204 untuk tanda tangan digital dokumen resmi dan isolasi penuh dari jaringan publik.'
          : 'National data sovereignty mandates FIPS 204 digital signature verification for official records and complete isolation from untrusted egress.'
      },
      telecom: {
        title: isId ? 'Telekomunikasi & ISP Backbone' : 'Telecommunications & Backbone ISP',
        baseScore: [40, 70, 90, 100],
        fips203Progress: [35, 72, 94, 100],
        fips204Progress: [22, 58, 86, 100],
        cbomDiscovered: '5,210 / 5,210',
        legacyRsaPct: [75, 38, 8, 0],
        hndlRisk: [
          isId ? 'TINGGI (Backbone Fiber Rentan Sadap)' : 'HIGH (Backbone Fiber Interception Risk)',
          isId ? 'SEDANG (mTLS PQC di Core Network)' : 'MODERATE (mTLS PQC in Core Network)',
          isId ? 'RENDAH (Enkripsi End-to-End ML-KEM)' : 'LOW (End-to-End ML-KEM Handshake)',
          isId ? 'KEBAL (Zero Fiber Harvest Exposure)' : 'IMMUNE (Zero Fiber Harvest Exposure)'
        ],
        description: isId
          ? 'Jaringan throughput tinggi membutuhkan algoritma ML-KEM berlatensi ultra-rendah untuk melindungi jutaan sambungan mTLS secara real-time.'
          : 'High-throughput carrier networks require low-overhead ML-KEM cipher suites to secure millions of concurrent edge handshakes.'
      },
      enterprise_saas: {
        title: isId ? 'Enterprise Multi-Tenant Cloud SaaS' : 'Enterprise Multi-Tenant Cloud SaaS',
        baseScore: [38, 68, 92, 100],
        fips203Progress: [30, 68, 95, 100],
        fips204Progress: [18, 52, 88, 100],
        cbomDiscovered: '870 / 870',
        legacyRsaPct: [70, 32, 6, 0],
        hndlRisk: [
          isId ? 'TINGGI (Kunci API & JWT Masih Klasik)' : 'HIGH (Legacy JWT & RSA API Keys)',
          isId ? 'SEDANG (Hybrid TLS 1.3 Ingress)' : 'MODERATE (Hybrid TLS 1.3 Ingress)',
          isId ? 'RENDAH (FIPS 204 Token Signatures)' : 'LOW (FIPS 204 Token Signatures)',
          isId ? 'KEBAL (100% Crypto-Agility Stack)' : 'IMMUNE (100% Crypto-Agility Stack)'
        ],
        description: isId
          ? 'Penggantian token JWT dan sertifikat TLS pelanggan secara otomatis tanpa downtime melalui arsitektur NusaSec Crypto-Agility Proxy.'
          : 'Automated rotation of customer JWT signatures and public ingress certificates with zero downtime via NusaSec Crypto-Agility.'
      }
    };
  }, [isId]);

  const activeConfig = tierConfigs[selectedTier];
  const phaseIndex = currentPhase - 1;

  const currentScore = activeConfig.baseScore[phaseIndex];
  const currentFips203 = activeConfig.fips203Progress[phaseIndex];
  const currentFips204 = activeConfig.fips204Progress[phaseIndex];
  const currentLegacyRsa = activeConfig.legacyRsaPct[phaseIndex];
  const currentHndlRisk = activeConfig.hndlRisk[phaseIndex];

  // Radial Bar Data for the Main Gauge
  const gaugeData = [
    {
      name: 'PQC Readiness',
      value: currentScore,
      fill: currentScore >= 90 ? '#325FE8' : currentScore >= 60 ? '#38bdf8' : '#f59e0b',
    }
  ];

  // CBOM Pie Breakdown Data
  const cbomPieData = useMemo(() => {
    const pqcPart = Math.round((currentFips203 + currentFips204) / 2);
    const legacyPart = 100 - pqcPart;
    return [
      { name: 'NIST FIPS 203/204 (ML-KEM / ML-DSA)', value: pqcPart, color: '#325FE8' },
      { name: 'ECC Transitional (P-384)', value: Math.round(legacyPart * 0.4), color: '#38bdf8' },
      { name: 'Legacy RSA-2048 / 1024 (HNDL Risk)', value: Math.round(legacyPart * 0.6), color: '#ef4444' },
    ];
  }, [currentFips203, currentFips204]);

  // Handle Step Simulation
  const handleNextPhase = () => {
    if (currentPhase >= 4) return;
    setIsSimulatingTransition(true);
    setTimeout(() => {
      setCurrentPhase(prev => Math.min(4, prev + 1));
      setIsSimulatingTransition(false);
    }, 450);
  };

  const handleResetPhase = () => {
    setIsSimulatingTransition(true);
    setTimeout(() => {
      setCurrentPhase(1);
      setIsSimulatingTransition(false);
    }, 300);
  };

  // Phase Definitions
  const phases = [
    {
      phase: 1,
      title: isId ? 'Tahap 1: CBOM Inventory & Risk Scoring' : 'Phase 1: CBOM Inventory & Discovery',
      badge: 'DISCOVERY',
      desc: isId ? 'Inventarisasi seluruh sertifikat, kunci privat, dan cipher suites di multi-cloud.' : 'Agentless discovery of all crypto assets, certificates, and TLS ciphers.'
    },
    {
      phase: 2,
      title: isId ? 'Tahap 2: Hybrid ML-KEM-768 Ingress' : 'Phase 2: Hybrid ML-KEM Ingress',
      badge: 'FIPS 203 HYBRID',
      desc: isId ? 'Penerapan negosiasi kunci ganda (X25519 + ML-KEM-768) pada load balancer & ingress.' : 'Dual-key negotiation (X25519 + ML-KEM-768) enabled on public ingress.'
    },
    {
      phase: 3,
      title: isId ? 'Tahap 3: FIPS 204 Digital Signature Vault' : 'Phase 3: FIPS 204 Signatures',
      badge: 'FIPS 204 ENFORCED',
      desc: isId ? 'Migrasi tanda tangan digital JWT, audit log, dan identitas mTLS ke ML-DSA.' : 'Transition of JWT tokens, audit trails, and mTLS identities to ML-DSA.'
    },
    {
      phase: 4,
      title: isId ? 'Tahap 4: Full Quantum-Native Agility' : 'Phase 4: Full Quantum-Native Agility',
      badge: 'NATIVE AGILITY',
      desc: isId ? 'Enkripsi data at-rest di database kedaulatan serta orkestrasi rotasi kunci nir-sentuh.' : 'Sovereign datastore at-rest encryption and automated zero-touch key rotation.'
    }
  ];

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 text-slate-900 shadow-2xl relative overflow-hidden space-y-8" id="pqc-gauge">
      
      {/* Background Ambience */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Section Concept */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-mono font-bold">
            <Cpu className="w-3.5 h-3.5" />
            <span>{isId ? 'INDIKATOR KESIAPAN PQC & NIST FIPS 203/204' : 'PQC AGILITY GAUGE (NIST FIPS 203/204)'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
            {isId ? (
              <>
                Kalkulator Indeks Kesiapan & <span className="text-blue-600">Migrasi Kriptografi Pasca-Kuantum</span>
              </>
            ) : (
              <>
                Post-Quantum Cryptographic <span className="text-blue-600">Agility & Migration Gauge</span>
              </>
            )}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {isId 
              ? 'Pantau progres adopsi standar NIST FIPS 203 (ML-KEM) dan FIPS 204 (ML-DSA) untuk meniadakan risiko intersepsi data Harvest Now, Decrypt Later (HNDL).'
              : 'Track your organization’s transition progress towards NIST FIPS 203 (ML-KEM) and FIPS 204 (ML-DSA), eliminating Harvest Now, Decrypt Later risks.'}
          </p>
        </div>

        {/* Industry Sector Selector Tabs */}
        <div className="space-y-1.5 shrink-0">
          <label className="text-[11px] font-mono uppercase text-slate-500 block font-bold">
            {isId ? 'Pilih Profil Industri Enterprise:' : 'Select Industry Profile:'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-xl bg-white border border-slate-200 text-xs font-mono">
            {[
              { id: 'banking' as const, label: 'Perbankan / FinTech' },
              { id: 'sovereign_gov' as const, label: 'Pemerintah / Kedaulatan' },
              { id: 'telecom' as const, label: 'Telco / ISP' },
              { id: 'enterprise_saas' as const, label: 'Cloud SaaS' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTier(tab.id)}
                className={`px-3 py-2 rounded-lg text-center transition-all ${
                  selectedTier === tab.id
                    ? 'bg-blue-500 text-slate-950 font-bold shadow'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Recharts Circular Gauge + Cryptographic Progress Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Recharts Circular Gauge & Score (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-3xl bg-white/80 border border-slate-200 shadow-xl relative">
          
          <div className="w-full text-center pb-2">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
              {isId ? 'SKOR KETAHANAN KUANTUM (PQC SCORE)' : 'POST-QUANTUM AGILITY SCORE'}
            </span>
          </div>

          {/* Recharts Circular Gauge */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="75%"
                outerRadius="100%"
                barSize={18}
                data={gaugeData}
                startAngle={220}
                endAngle={-40}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  background={{ fill: '#e2e8f0' }}
                  dataKey="value"
                  cornerRadius={12}
                />
              </RadialBarChart>
            </ResponsiveContainer>

            {/* Inner Center Score Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <div className="text-4xl sm:text-5xl font-black font-display tracking-tight text-slate-900">
                {currentScore}<span className="text-blue-600 text-2xl font-mono">/100</span>
              </div>
              <div className={`mt-1 text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                currentScore >= 90
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : currentScore >= 60
                  ? 'bg-sky-50 text-sky-700 border-sky-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {currentScore >= 90 ? 'Quantum Immune' : currentScore >= 60 ? 'Hybrid Transitional' : 'Vulnerable to HNDL'}
              </div>
            </div>
          </div>

          {/* Gauge Subtext Badges */}
          <div className="w-full mt-4 grid grid-cols-2 gap-2 text-center text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[10px] block">{isId ? 'CBOM Terdeteksi' : 'CBOM Discovered'}</span>
              <strong className="text-slate-900 text-xs">{activeConfig.cbomDiscovered}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[10px] block">{isId ? 'Sisa Paparan RSA' : 'Legacy RSA Remaining'}</span>
              <strong className={currentLegacyRsa > 40 ? 'text-red-600 text-xs' : 'text-blue-600 text-xs'}>
                {currentLegacyRsa}%
              </strong>
            </div>
          </div>

          {/* Status HNDL Alert Banner */}
          <div className="w-full mt-3 p-3 rounded-xl bg-slate-50/90 border border-slate-200 flex items-start gap-2.5 text-xs">
            <ShieldAlert className={`w-4 h-4 shrink-0 mt-0.5 ${currentScore >= 90 ? 'text-blue-600' : 'text-amber-600'}`} />
            <div>
              <span className="font-bold text-slate-900 font-mono">{isId ? 'Status Ancaman HNDL:' : 'HNDL Risk:'} </span>
              <span className={currentScore >= 90 ? 'text-blue-300' : 'text-amber-300'}>{currentHndlRisk}</span>
            </div>
          </div>

        </div>

        {/* Right Column: NIST FIPS Standard Progress Bars & CBOM Pie (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Sector Profile Description */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 leading-relaxed font-sans">
            <strong className="text-slate-900 font-display block mb-1">{activeConfig.title}</strong>
            {activeConfig.description}
          </div>

          {/* Standard 1: NIST FIPS 203 (ML-KEM) Progress */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-blue-500/10 border border-blue-200 text-blue-600 font-bold">
                  FIPS 203
                </span>
                <span className="font-bold text-slate-900">NIST FIPS 203 (ML-KEM / Kyber)</span>
                <span className="text-slate-500 text-[11px] hidden sm:inline">— Key Encapsulation Mechanism</span>
              </div>
              <span className="text-blue-600 font-bold">{currentFips203}%</span>
            </div>
            
            <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                style={{ width: `${currentFips203}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>{isId ? 'Handshake TLS 1.3 & mTLS Kuantum' : 'Quantum-Safe TLS 1.3 & mTLS Ingress'}</span>
              <span>{currentFips203 === 100 ? '✅ 100% Enforced' : `${100 - currentFips203}% Pending Transition`}</span>
            </div>
          </div>

          {/* Standard 2: NIST FIPS 204 (ML-DSA) Progress */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-purple-500/10 border border-purple-200 text-purple-600 font-bold">
                  FIPS 204
                </span>
                <span className="font-bold text-slate-900">NIST FIPS 204 (ML-DSA / Dilithium)</span>
                <span className="text-slate-500 text-[11px] hidden sm:inline">— Digital Signature Standard</span>
              </div>
              <span className="text-purple-600 font-bold">{currentFips204}%</span>
            </div>
            
            <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-blue-400 rounded-full transition-all duration-500"
                style={{ width: `${currentFips204}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>{isId ? 'Tanda Tangan Digital Kriptografis, Token & Audit' : 'Immutable Digital Signatures, JWT & Audits'}</span>
              <span>{currentFips204 === 100 ? '✅ 100% Enforced' : `${100 - currentFips204}% Pending Transition`}</span>
            </div>
          </div>

          {/* CBOM Distribution Summary Mini Pie Bar */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-mono uppercase text-slate-500 font-bold">
                {isId ? 'Komposisi Kriptografi Aktif (CBOM Snapshot)' : 'Active Crypto Composition (CBOM)'}
              </div>
              <div className="text-xs text-slate-600 font-sans">
                {isId ? 'Distribusi kunci aktif pada seluruh sertifikat dan basis data.' : 'Live key distribution across multi-cloud endpoints.'}
              </div>
            </div>

            {/* Visual Color Pill Distribution */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                <span className="text-slate-600">PQC Native</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <span className="text-slate-600">Transitional</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="text-slate-600">Legacy RSA</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 4-Step Interactive Migration Pipeline Simulator */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold font-mono text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>{isId ? 'Simulasi Roadmap 4-Tahap Migrasi Kriptografi (NusaSec Agility)' : '4-Phase Cryptographic Migration Roadmap'}</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {isId 
                ? 'Klik setiap tahapan untuk melihat perubahan indeks kesiapan dan parameter teknis secara real-time.' 
                : 'Click each phase to simulate live posture index improvements and technical parameters.'}
            </p>
          </div>

          {/* Controller Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {currentPhase < 4 ? (
              <button
                onClick={handleNextPhase}
                disabled={isSimulatingTransition}
                className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSimulatingTransition ? 'animate-spin' : ''}`} />
                <span>{isId ? 'Simulasi Tahap Berikutnya →' : 'Simulate Next Phase →'}</span>
              </button>
            ) : (
              <button
                onClick={handleResetPhase}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs flex items-center gap-1.5 transition-colors border border-slate-300"
              >
                <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                <span>{isId ? 'Reset ke Tahap 1' : 'Reset to Phase 1'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Phase Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {phases.map((p) => {
            const isActive = currentPhase === p.phase;
            const isCompleted = currentPhase > p.phase;

            return (
              <button
                key={p.phase}
                onClick={() => setCurrentPhase(p.phase)}
                className={`p-4 rounded-2xl text-left border transition-all duration-200 relative overflow-hidden ${
                  isActive
                    ? 'bg-white border-blue-200 shadow-lg ring-1 ring-blue-500/30'
                    : isCompleted
                    ? 'bg-white/60 border-slate-200 hover:border-slate-300'
                    : 'bg-white/30 border-slate-850 opacity-60 hover:opacity-100 hover:border-slate-200'
                }`}
              >
                {/* Active Indicator Strip */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-blue-400" />
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-blue-600">
                    {p.badge}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  ) : isActive ? (
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  ) : (
                    <span className="text-[10px] font-mono text-slate-600">Phase {p.phase}</span>
                  )}
                </div>

                <div className="text-xs font-bold text-slate-900 font-display mb-1">
                  {p.title}
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                  {p.desc}
                </p>
              </button>
            );
          })}
        </div>

      </div>

      {/* Bottom Conversion Action Strip */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-bold text-slate-900 font-display flex items-center justify-center sm:justify-start gap-1.5">
            <FileCheck2 className="w-4 h-4 text-blue-600" />
            <span>{isId ? 'Dapatkan Blueprint Transisi Kriptografi Pasca-Kuantum Organisasi Anda' : 'Generate Your Enterprise PQC Migration Blueprint'}</span>
          </div>
          <div className="text-[11px] text-slate-500">
            {isId ? 'Termasuk pemindaian CBOM tanpa agen dan rekomendasi kepatuhan OJK POJK 11 / NIST FIPS 203.' : 'Includes agentless CBOM inventory and POJK 11 / NIST compliance mapping.'}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {onOpenAi && (
            <button
              onClick={onOpenAi}
              className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-850 text-slate-600 border border-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{isId ? 'Analisis dengan AI' : 'Explain PQC with AI'}</span>
            </button>
          )}

          {onOpenDemo && (
            <button
              onClick={onOpenDemo}
              className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
            >
              <span>{isId ? 'Konsultasi Arsitektur PQC' : 'Book PQC Briefing'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
