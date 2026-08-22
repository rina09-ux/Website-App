import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Building2, 
  CheckCircle2, 
  ArrowUpRight, 
  Layers, 
  BarChart3,
  Award,
  Activity
} from 'lucide-react';
import { Language } from '../data/translations';
import { NumberTicker } from './magic/effects';
import { IconChoiceTabs } from './magic/IconChoiceTabs';

interface CustomerSuccessMetricsProps {
  language?: Language;
  onOpenDemo?: () => void;
}

export const CustomerSuccessMetrics: React.FC<CustomerSuccessMetricsProps> = ({
  language = 'id',
  onOpenDemo,
}) => {
  const isId = language === 'id';
  const [activeMetricTab, setActiveMetricTab] = useState<'timeline' | 'audit_reduction' | 'benchmark'>('timeline');

  // Chart Data: 12-Month Attack Surface & Blast Radius Reduction across Enterprise Deployments
  const attackSurfaceTimelineData = [
    { month: isId ? 'Bln 1' : 'Mo 1', beforeNusaSec: 100, withNusaSec: 92, blastRadius: 94 },
    { month: isId ? 'Bln 2' : 'Mo 2', beforeNusaSec: 104, withNusaSec: 74, blastRadius: 78 },
    { month: isId ? 'Bln 3' : 'Mo 3', beforeNusaSec: 108, withNusaSec: 51, blastRadius: 58 },
    { month: isId ? 'Bln 4' : 'Mo 4', beforeNusaSec: 115, withNusaSec: 36, blastRadius: 40 },
    { month: isId ? 'Bln 6' : 'Mo 6', beforeNusaSec: 124, withNusaSec: 22, blastRadius: 26 },
    { month: isId ? 'Bln 8' : 'Mo 8', beforeNusaSec: 132, withNusaSec: 14, blastRadius: 18 },
    { month: isId ? 'Bln 10' : 'Mo 10', beforeNusaSec: 140, withNusaSec: 9, blastRadius: 12 },
    { month: isId ? 'Bln 12' : 'Mo 12', beforeNusaSec: 148, withNusaSec: 6, blastRadius: 8 },
  ];

  // Chart Data: Audit Time Saved across Regulatory Frameworks (Days/Hours)
  const auditTimeComparisonData = [
    {
      framework: 'OJK POJK 11',
      manualHours: 320,
      nusaSecHours: 42,
      savedPct: '87%'
    },
    {
      framework: 'UU PDP No. 27',
      manualHours: 240,
      nusaSecHours: 28,
      savedPct: '88%'
    },
    {
      framework: 'ISO 27001:2022',
      manualHours: 280,
      nusaSecHours: 35,
      savedPct: '87.5%'
    },
    {
      framework: 'SOC 2 Type II',
      manualHours: 360,
      nusaSecHours: 48,
      savedPct: '86.7%'
    },
    {
      framework: 'PQC NIST FIPS',
      manualHours: 190,
      nusaSecHours: 18,
      savedPct: '90.5%'
    },
  ];

  // Chart Data: Security Posture Radar Benchmark (Industry Average vs NusaSec Protected Enterprise)
  const securityPostureRadarData = [
    { subject: isId ? 'Korelasi Jalur Serangan' : 'Attack Path Correlation', NusaSec: 96, IndustryAvg: 38 },
    { subject: isId ? 'Kesiapan Kriptografi (PQC)' : 'PQC Agility', NusaSec: 92, IndustryAvg: 20 },
    { subject: isId ? 'Otomatisasi Audit Regulasi' : 'Audit Automation', NusaSec: 95, IndustryAvg: 44 },
    { subject: isId ? 'Kecepatan Remediasi GitOps' : 'GitOps MTTR', NusaSec: 94, IndustryAvg: 32 },
    { subject: isId ? 'Visibilitas Kedaulatan Data' : 'Data Sovereignty', NusaSec: 98, IndustryAvg: 50 },
    { subject: isId ? 'Tata Kelola AI (AI-SPM)' : 'AI-SPM Governance', NusaSec: 90, IndustryAvg: 25 },
  ];

  // Custom Chart Tooltips
  const CustomTimelineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white border border-slate-300 rounded-xl shadow-xl font-mono text-xs space-y-1 z-50">
          <div className="font-bold text-slate-900 mb-1.5">{label}</div>
          <div className="text-red-600 flex items-center justify-between gap-4">
            <span>{isId ? 'Tanpa NusaSec:' : 'Legacy Posture:'}</span>
            <span className="font-bold">{payload[0]?.value} pts</span>
          </div>
          <div className="text-blue-600 flex items-center justify-between gap-4">
            <span>{isId ? 'Dengan NusaSec:' : 'With NusaSec:'}</span>
            <span className="font-bold">{payload[1]?.value} pts</span>
          </div>
          <div className="text-sky-600 flex items-center justify-between gap-4">
            <span>{isId ? 'Radius Ledakan:' : 'Blast Radius:'}</span>
            <span className="font-bold">{payload[2]?.value}%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white border border-slate-300 rounded-xl shadow-xl font-mono text-xs space-y-1.5 z-50">
          <div className="font-bold text-slate-900 border-b border-slate-200 pb-1">{label}</div>
          <div className="text-slate-500 flex items-center justify-between gap-4">
            <span>{isId ? 'Audit Manual:' : 'Manual Preparation:'}</span>
            <span className="font-bold text-slate-900">{payload[0]?.value} {isId ? 'Jam' : 'Hrs'}</span>
          </div>
          <div className="text-blue-600 flex items-center justify-between gap-4">
            <span>{isId ? 'Audit NusaSec:' : 'NusaSec Vault:'}</span>
            <span className="font-bold">{payload[1]?.value} {isId ? 'Jam' : 'Hrs'}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-24 bg-white text-slate-900 relative overflow-hidden" id="success-metrics">
      
      {/* Background Gradients & Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-blue-500/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b20_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-mono font-bold">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{isId ? 'METRIK KEBERHASILAN KONSUMEN & ROI' : 'CUSTOMER SUCCESS METRICS & ROI'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 tracking-tight leading-tight">
              {isId ? (
                <>
                  Dampak Terukur: <span className="text-blue-600">94% Reduksi Permukaan Serangan</span> & 85% Efisiensi Audit
                </>
              ) : (
                <>
                  Proven Impact: <span className="text-blue-600">94% Attack Surface Reduction</span> & 85% Audit Time Saved
                </>
              )}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {isId 
                ? 'Data agregat yang divalidasi dari implementasi NusaSec pada 40+ institusi perbankan, fintech, dan enterprise di Asia Tenggara selama 12 bulan siklus produksi.'
                : 'Aggregated production metrics validated across 40+ banking institutions, fintechs, and enterprises running NusaSec across Southeast Asia.'}
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4 shrink-0 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-200 flex items-center justify-center text-blue-600">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold font-display text-slate-900">
                <NumberTicker value={85.4} decimalPlaces={1} suffix="%" />
              </div>
              <div className="text-xs font-mono text-slate-500">{isId ? 'Rata-rata Penghematan Jam Audit' : 'Avg. Audit Prep Hours Saved'}</div>
            </div>
          </div>
        </div>

        {/* 4 Stat Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-200 transition-colors space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">{isId ? 'Reduksi Attack Surface' : 'Attack Surface Reduction'}</span>
              <span className="text-blue-600 font-mono text-xs font-bold">-94.2%</span>
            </div>
            <div className="text-3xl font-extrabold font-display text-slate-900 tracking-tight">
              <NumberTicker value={94} suffix="%" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isId ? 'Penurunan jalur kombinasi toksik yang dapat dieksploitasi dalam 6 bulan pertama.' : 'Reduction in toxic combinational attack vectors within the first 6 months.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-200 transition-colors space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">{isId ? 'Waktu Siklus Audit' : 'Audit Prep Velocity'}</span>
              <span className="text-blue-600 font-mono text-xs font-bold">-87.5%</span>
            </div>
            <div className="text-3xl font-extrabold font-display text-slate-900 tracking-tight">
              <NumberTicker value={3.2} decimalPlaces={1} /> {isId ? 'Hari' : 'Days'}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isId ? 'Dari rata-rata 28 hari kerja manual menjadi hanya 3.2 hari dengan Brankas Bukti Otomatis.' : 'Down from 28 manual days to 3.2 days using the automated Cryptographic Vault.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-200 transition-colors space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">{isId ? 'Kecepatan Remediasi' : 'GitOps MTTR Speed'}</span>
              <span className="text-blue-600 font-mono text-xs font-bold">12x {isId ? 'Lebih Cepat' : 'Faster'}</span>
            </div>
            <div className="text-3xl font-extrabold font-display text-slate-900 tracking-tight">
              <NumberTicker value={14} /> {isId ? 'Menit' : 'Mins'}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isId ? 'Rata-rata waktu dari deteksi kerentanan hingga pembuatan Pull Request Terraform terverifikasi.' : 'Average time from detection to automated Terraform pull request generation.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-200 transition-colors space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">{isId ? 'Kesiapan Kuantum PQC' : 'PQC Crypto-Agility'}</span>
              <span className="text-blue-600 font-mono text-xs font-bold">FIPS 203</span>
            </div>
            <div className="text-3xl font-extrabold font-display text-slate-900 tracking-tight">
              <NumberTicker value={100} suffix="%" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isId ? 'Inventaris CBOM lengkap dengan rencana transisi otomatis ke algoritma ML-KEM & ML-DSA.' : 'Complete CBOM inventory with automated transition blueprints to ML-KEM ciphers.'}
            </p>
          </div>

        </div>

        {/* Interactive Chart Visualizer with Recharts */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6 shadow-2xl">
          
          {/* Chart Controls & View Selector */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-bold font-mono text-slate-900 uppercase tracking-wider">
                {isId ? 'Visualisasi Data Dampak Produksi' : 'Production Impact Telemetry Visualizer'}
              </span>
            </div>

            {/* View Switcher — icon-only, tap reveals full label as a tooltip */}
            <IconChoiceTabs
              activeId={activeMetricTab}
              onChange={(id) => setActiveMetricTab(id as typeof activeMetricTab)}
              items={[
                { id: 'timeline', icon: TrendingUp, label: isId ? '1. Reduksi Permukaan Serangan' : '1. Attack Surface Reduction', colorClass: 'text-blue-600' },
                { id: 'audit_reduction', icon: Clock, label: isId ? '2. Efisiensi Jam Audit (OJK/PDP)' : '2. Audit Hours Saved', colorClass: 'text-emerald-600' },
                { id: 'benchmark', icon: Award, label: isId ? '3. Benchmark Radar Postur' : '3. Posture Radar Benchmark', colorClass: 'text-violet-600' },
              ]}
            />
          </div>

          {/* Tab 1: Attack Surface Over Time (Area Chart) */}
          {activeMetricTab === 'timeline' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-500 gap-2">
                <div>
                  <strong className="text-slate-900">12-Month Deployment Longitudinal Study:</strong>{' '}
                  {isId 
                    ? 'Evolusi skor keterpaparan kombinasi toksik vs postur terlindungi NusaSec.' 
                    : 'Toxic path exposure score evolution vs NusaSec automated active protection.'}
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-red-500/80 inline-block" />
                    <span>{isId ? 'Tanpa NusaSec' : 'Legacy Posture'}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" />
                    <span>{isId ? 'Dengan NusaSec' : 'With NusaSec'}</span>
                  </span>
                </div>
              </div>

              <div className="w-full h-80 pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={attackSurfaceTimelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorBefore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0}/>
                      </linearGradient>
                      <linearGradient id="colorNusaSec" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#325FE8" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#325FE8" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <Tooltip content={<CustomTimelineTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="beforeNusaSec" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorBefore)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="withNusaSec" 
                      stroke="#325FE8" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorNusaSec)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-500 flex items-center justify-between">
                <span>⚡ {isId ? 'Kombinasi toksik berkurang dari 100 ke 6 dalam 12 bulan pemantauan' : 'Toxic combinations decreased from 100 to 6 within 12 months'}</span>
                <span className="text-blue-600 font-bold">{isId ? 'Efektivitas 94%' : '94% Efficacy'}</span>
              </div>
            </div>
          )}

          {/* Tab 2: Audit Hours Comparison (Bar Chart) */}
          {activeMetricTab === 'audit_reduction' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-500 gap-2">
                <div>
                  <strong className="text-slate-900">Regulatory Audit Preparation Hours:</strong>{' '}
                  {isId 
                    ? 'Perbandingan jam kerja manual vs otomasi brankas bukti NusaSec.' 
                    : 'Manual engineering hours vs automated cryptographic evidence gathering.'}
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-slate-700 inline-block" />
                    <span>{isId ? 'Manual (Sebelum)' : 'Manual (Before)'}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" />
                    <span>{isId ? 'NusaSec Vault' : 'NusaSec Vault'}</span>
                  </span>
                </div>
              </div>

              <div className="w-full h-80 pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={auditTimeComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="framework" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} unit="h" />
                    <Tooltip content={<CustomBarTooltip />} />
                    <Bar dataKey="manualHours" fill="#334155" radius={[6, 6, 0, 0]} name={isId ? 'Jam Manual' : 'Manual Hours'} />
                    <Bar dataKey="nusaSecHours" fill="#325FE8" radius={[6, 6, 0, 0]} name={isId ? 'Jam NusaSec' : 'NusaSec Hours'} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 font-mono text-xs">
                {auditTimeComparisonData.map((item, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-white border border-slate-200 text-center">
                    <div className="text-slate-500 text-[10px] truncate">{item.framework}</div>
                    <div className="text-blue-600 font-bold">{item.savedPct} {isId ? 'Hemat' : 'Saved'}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Security Posture Radar Benchmark */}
          {activeMetricTab === 'benchmark' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-500 gap-2">
                <div>
                  <strong className="text-slate-900">Security Capability Index (0-100 Score):</strong>{' '}
                  {isId 
                    ? 'Perbandingan postur menyeluruh organisasi berdaya NusaSec vs rata-rata industri.' 
                    : 'Comprehensive capability benchmark of NusaSec protected enterprises vs industry baseline.'}
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-slate-600 inline-block" />
                    <span>{isId ? 'Rata-rata Industri' : 'Industry Average'}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
                    <span>NusaSec Platform</span>
                  </span>
                </div>
              </div>

              <div className="w-full h-80 pt-2 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={securityPostureRadarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155" />
                    <Radar name={isId ? 'Rata-rata Industri' : 'Industry Average'} dataKey="IndustryAvg" stroke="#64748b" fill="#64748b" fillOpacity={0.25} />
                    <Radar name="NusaSec Enterprise" dataKey="NusaSec" stroke="#325FE8" fill="#325FE8" fillOpacity={0.5} strokeWidth={2} />
                    <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-500 text-center">
                🏆 {isId ? 'Keunggulan terbesar pada Kesiapan Kuantum (+72 pts) dan Mitigasi Jalur Serangan (+58 pts).' : 'Highest differentiation in Quantum Readiness (+72 pts) and Attack Path Mitigation (+58 pts).'}
              </div>
            </div>
          )}

        </div>

        {/* Bottom Proof CTA */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-50 via-slate-50 to-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-sm font-bold text-slate-900 font-display">
              {isId ? 'Ingin Menghitung ROI & Estimasi Efisiensi untuk Organisasi Anda?' : 'Want to calculate specific ROI & time savings for your infrastructure?'}
            </div>
            <div className="text-xs text-slate-500">
              {isId ? 'Dapatkan simulasi audit dan kalkulasi pengurangan attack surface dalam 30 menit sesi arsitektur.' : 'Receive a tailored attack surface reduction projection in a 30-minute architectural session.'}
            </div>
          </div>
          
          {onOpenDemo && (
            <button
              onClick={onOpenDemo}
              className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 shadow-lg"
            >
              <span>{isId ? 'Minta Kalkulasi ROI' : 'Request ROI Assessment'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
