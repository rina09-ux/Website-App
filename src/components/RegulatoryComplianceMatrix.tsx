import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Lock, 
  Cpu, 
  ArrowRight, 
  Download, 
  ExternalLink,
  Building,
  Check,
  LayoutGrid,
  MapPin,
  Globe
} from 'lucide-react';
import { Language } from '../data/translations';
import { IconChoiceTabs } from './magic/IconChoiceTabs';

interface RegulatoryComplianceMatrixProps {
  language?: Language;
  onOpenDemo: () => void;
}

export const RegulatoryComplianceMatrix: React.FC<RegulatoryComplianceMatrixProps> = ({
  language = 'id',
  onOpenDemo
}) => {
  const isId = language === 'id';
  const [activeFilter, setActiveFilter] = useState<'all' | 'indonesia' | 'international'>('all');

  const frameworks = [
    {
      id: 'ojk',
      region: 'indonesia',
      name: 'OJK POJK 11/POJK.03/2022',
      title: 'Penyelenggaraan Teknologi Informasi oleh Bank Umum',
      authority: 'Otoritas Jasa Keuangan (OJK)',
      coverage: 'Pasal 21, 24, 27 (Keamanan Siber, Manajemen Risiko TI & Enkripsi Kriptografi)',
      evidenceType: 'Automated Continuous Cloud Audit Vault',
      nusasecAlignment: '100% Kontrol Terpetakan Otomatis',
      badge: 'Mandatory ID Banking',
      color: 'blue'
    },
    {
      id: 'uupdp',
      region: 'indonesia',
      name: 'UU No. 27 Tahun 2022 (UU PDP)',
      title: 'Undang-Undang Pelindungan Data Pribadi',
      authority: 'Lembaga Pelindungan Data Pribadi / Kominfo',
      coverage: 'Pasal 35 - 39 (Kewajiban Pengendali Data, Enkripsi Simpanan & Pencegahan Kebocoran)',
      evidenceType: 'Data Classification & Column-Level PQC Proofs',
      nusasecAlignment: 'Audit Trail Tanpa Retensi Data PII',
      badge: 'National Data Law',
      color: 'blue'
    },
    {
      id: 'bi',
      region: 'indonesia',
      name: 'BI PADG No. 24/7/PADG/2022',
      title: 'Ketahanan Siber bagi Penyelenggara Jasa Pembayaran',
      authority: 'Bank Indonesia (BI)',
      coverage: 'Penyelenggaraan Sistem Pembayaran & Infrastruktur Kritis Finansial',
      evidenceType: 'CBOM Kriptografi & Penilaian Kerentanan eBPF',
      nusasecAlignment: 'Hybrid TLS 1.3 untuk Sistem Transaksi',
      badge: 'Payment System',
      color: 'purple'
    },
    {
      id: 'iso27001',
      region: 'international',
      name: 'ISO/IEC 27001:2022',
      title: 'Information Security Management System (ISMS)',
      authority: 'International Organization for Standardization',
      coverage: 'Annex A.5, A.8 (A.8.24 Penggunaan Kriptografi & A.8.9 Manajemen Konfigurasi)',
      evidenceType: 'Cryptographically Signed Auditor Evidence Vault',
      nusasecAlignment: 'Sertifikasi Terverifikasi Pihak Ketiga',
      badge: 'Global Standard',
      color: 'amber'
    },
    {
      id: 'soc2',
      region: 'international',
      name: 'SOC 2 Type II (Trust Services Criteria)',
      title: 'Security, Availability, and Confidentiality',
      authority: 'AICPA',
      coverage: 'CC6.1, CC6.6, CC6.7 (Perimeter, Boundary Defense & Key Management)',
      evidenceType: 'Immutable Daily Timestamped Snapshots',
      nusasecAlignment: 'Laporan Audit Tersedia untuk Enterprise',
      badge: 'AICPA Certified',
      color: 'teal'
    },
    {
      id: 'nist-pqc',
      region: 'international',
      name: 'NIST FIPS 203 / 204 / 205 (PQC)',
      title: 'Post-Quantum Cryptography Standardization',
      authority: 'NIST (National Institute of Standards and Technology)',
      coverage: 'ML-KEM (FIPS 203), ML-DSA (FIPS 204), SLH-DSA (FIPS 205)',
      evidenceType: 'CBOM Automated Cryptographic Inventory',
      nusasecAlignment: 'Dukungan Algoritma Bawaan (Native PQC)',
      badge: 'Quantum-Safe Final',
      color: 'indigo'
    }
  ];

  const filtered = frameworks.filter(f => {
    if (activeFilter === 'all') return true;
    return f.region === activeFilter;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-50 text-blue-800 border border-blue-200 text-xs font-mono font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isId ? 'Matriks Kepatuhan Regulasi' : 'Regulatory Compliance Matrix'}</span>
          </div>
          <h3 className="text-2xl font-bold font-display text-slate-900">
            {isId ? 'Kepatuhan Otomatis Standar Regulasi Nasional & Internasional' : 'Automated Compliance Across National & Global Standards'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            {isId 
              ? 'NusaSec mengumpulkan bukti audit secara terus-menerus tanpa intervensi manual, memenuhi standar OJK, UU PDP, Bank Indonesia, ISO 27001, dan NIST PQC.'
              : 'NusaSec continuously collects audit evidence with zero manual intervention, fulfilling OJK, UU PDP, Bank Indonesia, ISO 27001, and NIST PQC mandates.'}
          </p>
        </div>

        {/* Filter Pills — icon-only, tap reveals full label as a tooltip */}
        <IconChoiceTabs
          className="self-start md:self-auto"
          activeId={activeFilter}
          onChange={(id) => setActiveFilter(id as typeof activeFilter)}
          items={[
            { id: 'all', icon: LayoutGrid, label: isId ? 'Semua Standar' : 'All Frameworks', colorClass: 'text-slate-700' },
            { id: 'indonesia', icon: MapPin, label: 'Indonesia (OJK / UU PDP / BI)', colorClass: 'text-red-600' },
            { id: 'international', icon: Globe, label: isId ? 'Global (ISO / SOC 2 / NIST)' : 'Global (ISO / SOC 2 / NIST)', colorClass: 'text-blue-600' },
          ]}
        />
      </div>

      {/* Grid of Frameworks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((fw) => (
          <div
            key={fw.id}
            className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between space-y-4 shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                  {fw.badge}
                </span>
                <span className="text-[11px] font-mono text-slate-500">{fw.authority}</span>
              </div>

              <h4 className="text-base font-bold font-display text-slate-900 mb-1">
                {fw.name}
              </h4>
              <div className="text-xs font-medium text-slate-700 mb-3">
                {fw.title}
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs space-y-1.5 font-mono">
                <div className="text-slate-500 text-[11px]">Cakupan / Kontrol:</div>
                <div className="text-slate-800 font-semibold">{fw.coverage}</div>
              </div>
            </div>

            <div>
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <span className="text-blue-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>{fw.nusasecAlignment}</span>
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Audit Vault callout */}
      <div className="p-6 rounded-xl bg-white text-slate-900 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-mono text-blue-600 font-bold uppercase">
            {isId ? 'Portal Bukti Auditor Read-Only' : 'Read-Only Auditor Evidence Portal'}
          </div>
          <div className="text-sm font-semibold text-slate-900">
            {isId 
              ? 'Beri auditor Anda akses langsung ke brankas bukti bertanda tangan kriptografis tanpa risiko keamanan.'
              : 'Grant external auditors direct read-only access to cryptographically signed proofs with zero security risk.'}
          </div>
        </div>

        <button
          onClick={onOpenDemo}
          className="px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0 shadow-md"
        >
          <span>{isId ? 'Minta Akses Contoh Laporan Audit' : 'Request Sample Audit Pack'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
