import React from 'react';
import { Server, Lock, Key, Users, GitBranch, AlertTriangle, Cpu, Network } from 'lucide-react';
import { Language } from '../data/translations';

interface SecurityArchitecturePageProps {
  language?: Language;
}

const ArchBlock: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}> = ({ icon: Icon, title, children }) => (
  <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
      <Icon className="w-5 h-5" />
    </div>
    <h3 className="font-bold text-base text-slate-900 font-display">{title}</h3>
    <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">{children}</div>
  </div>
);

export const SecurityArchitecturePage: React.FC<SecurityArchitecturePageProps> = ({ language = 'id' }) => {
  const isId = language === 'id';

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <section className="relative bg-white text-slate-900 py-14 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 text-xs font-mono">
            <Server className="w-3.5 h-3.5" />
            <span>{isId ? 'Arsitektur Keamanan' : 'Security Architecture'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">
            {isId ? 'Bagaimana NusaSec Dibangun untuk Aman' : 'How NusaSec Is Built to Be Secure'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            {isId
              ? 'Ringkasan teknis arsitektur keamanan platform NusaSec: bagaimana kami mengisolasi data pelanggan, mengenkripsi informasi dalam transit dan penyimpanan, mengelola akses, dan mempersiapkan migrasi kriptografi pasca-kuantum.'
              : 'A technical overview of the NusaSec platform\'s security architecture: how we isolate customer data, encrypt information in transit and at rest, manage access, and prepare for post-quantum cryptographic migration.'}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <ArchBlock icon={Network} title={isId ? 'Isolasi Jaringan & Multi-Region' : 'Network Isolation & Multi-Region'}>
            <p>
              {isId
                ? 'Setiap workload berjalan dalam VPC terisolasi dengan segmentasi jaringan berbasis zero-trust. Data sektor keuangan dan pemerintahan Indonesia diproses dalam enklave kedaulatan data khusus di region Jakarta, terpisah dari lalu lintas region global lainnya (Tokyo, Frankfurt, Ashburn).'
                : 'Every workload runs in an isolated VPC with zero-trust network segmentation. Indonesian financial and government sector data is processed within a dedicated data-sovereignty enclave in the Jakarta region, separated from global traffic in other regions (Tokyo, Frankfurt, Ashburn).'}
            </p>
          </ArchBlock>

          <ArchBlock icon={Lock} title={isId ? 'Enkripsi dalam Transit & Penyimpanan' : 'Encryption in Transit & at Rest'}>
            <p>
              {isId
                ? 'Seluruh trafik menggunakan TLS 1.3. Untuk jalur berisiko tinggi terhadap ancaman "harvest-now-decrypt-later", kami menerapkan skema hibrida yang menggabungkan ECDHE klasik dengan ML-KEM (NIST FIPS 203) sesuai standar pasca-kuantum. Data tersimpan dienkripsi dengan AES-256-GCM, kunci dikelola via HSM.'
                : 'All traffic uses TLS 1.3. For paths at higher risk from "harvest-now-decrypt-later" threats, we apply a hybrid scheme combining classical ECDHE with ML-KEM (NIST FIPS 203) per post-quantum standards. Data at rest is encrypted with AES-256-GCM, with keys managed via HSM.'}
            </p>
          </ArchBlock>

          <ArchBlock icon={Key} title={isId ? 'Identitas & Kontrol Akses' : 'Identity & Access Control'}>
            <p>
              {isId
                ? 'Akses internal mengikuti prinsip hak akses minimum (least privilege) dengan kontrol berbasis peran (RBAC). SSO/SAML dan MFA wajib untuk seluruh akun staf. Akses produksi memerlukan persetujuan berjenjang (just-in-time access) dan dicatat penuh dalam audit trail.'
                : 'Internal access follows least-privilege principles with role-based access control (RBAC). SSO/SAML and MFA are mandatory for all staff accounts. Production access requires tiered approval (just-in-time access) and is fully recorded in an audit trail.'}
            </p>
          </ArchBlock>

          <ArchBlock icon={Users} title={isId ? 'Isolasi Multi-Tenant' : 'Multi-Tenant Isolation'}>
            <p>
              {isId
                ? 'Data setiap pelanggan dipisahkan secara logis dengan kunci enkripsi unik per-tenant. Pelanggan pada paket Sovereign dapat memilih isolasi infrastruktur khusus (dedicated) sepenuhnya, terpisah dari tenant lain.'
                : 'Each customer\'s data is logically separated with unique per-tenant encryption keys. Sovereign-tier customers can opt for fully dedicated infrastructure isolation, separate from other tenants.'}
            </p>
          </ArchBlock>

          <ArchBlock icon={GitBranch} title={isId ? 'Siklus Pengembangan Aman (Secure SDLC)' : 'Secure Development Lifecycle'}>
            <p>
              {isId
                ? 'Setiap perubahan kode melalui review keamanan otomatis (SAST/SCA), pengujian oleh tim keamanan independen, dan proses GitOps dengan approval berjenjang sebelum deployment ke produksi. Dependensi dipindai berkelanjutan untuk kerentanan yang diketahui.'
                : 'Every code change goes through automated security review (SAST/SCA), testing by an independent security team, and a GitOps process with tiered approval before production deployment. Dependencies are continuously scanned for known vulnerabilities.'}
            </p>
          </ArchBlock>

          <ArchBlock icon={AlertTriangle} title={isId ? 'Respons Insiden' : 'Incident Response'}>
            <p>
              {isId
                ? 'Tim respons insiden 24/7 beroperasi dengan runbook terdefinisi dan target waktu pemulihan (RTO) sesuai tingkat keparahan. Pelanggan Enterprise dan Sovereign menerima notifikasi insiden sesuai kewajiban SLA dan regulasi (termasuk pelaporan ke OJK/BSSN bila relevan).'
                : 'A 24/7 incident response team operates with defined runbooks and severity-based recovery time targets (RTO). Enterprise and Sovereign customers receive incident notifications per SLA and regulatory obligations (including reporting to OJK/BSSN where relevant).'}
            </p>
          </ArchBlock>

        </div>

        <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-600 shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 font-display mb-1">
              {isId ? 'Peta Jalan Migrasi Kriptografi Pasca-Kuantum' : 'Post-Quantum Cryptography Migration Roadmap'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isId
                ? 'NusaSec menerapkan pendekatan kripto-agilitas: algoritma dapat diganti tanpa merombak arsitektur inti, memungkinkan transisi bertahap dari kriptografi klasik (RSA/ECC) menuju standar NIST FIPS 203/204 (ML-KEM/ML-DSA) sesuai kesiapan masing-masing sistem pelanggan.'
                : 'NusaSec applies a crypto-agility approach: algorithms can be swapped without re-architecting the core platform, enabling a phased transition from classical cryptography (RSA/ECC) to NIST FIPS 203/204 standards (ML-KEM/ML-DSA) as each customer system becomes ready.'}
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-400 pt-6 max-w-2xl">
          {isId
            ? 'Dokumen ini adalah ringkasan tingkat tinggi untuk keperluan publik. Detail teknis lebih dalam (termasuk laporan penetrasi dan diagram arsitektur lengkap) tersedia bagi pelanggan Enterprise/Sovereign di bawah NDA — hubungi tim akun Anda.'
            : 'This document is a high-level public summary. Deeper technical detail (including penetration test reports and full architecture diagrams) is available to Enterprise/Sovereign customers under NDA — contact your account team.'}
        </p>
      </div>
    </div>
  );
};
