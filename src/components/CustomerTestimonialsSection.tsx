import React from 'react';
import { Star, ShieldCheck, Award, Quote, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Language } from '../data/translations';

interface CustomerTestimonialsSectionProps {
  language?: Language;
  onOpenDemo: () => void;
}

export const CustomerTestimonialsSection: React.FC<CustomerTestimonialsSectionProps> = ({
  language = 'id',
  onOpenDemo,
}) => {
  const isId = language === 'id';

  const g2Badges = [
    { title: 'Leader', subtitle: 'WINTER 2026', color: 'border-amber-400 bg-amber-50 text-amber-900' },
    { title: 'Best Usability', subtitle: 'ENTERPRISE', color: 'border-blue-400 bg-blue-50 text-blue-900' },
    { title: 'Momentum Leader', subtitle: 'CSPM & PQC', color: 'border-blue-400 bg-blue-50 text-blue-900' },
    { title: 'Most Implementable', subtitle: 'ZERO-TOUCH', color: 'border-purple-400 bg-purple-50 text-purple-900' },
    { title: 'Best Relationship', subtitle: 'SOVEREIGN GRC', color: 'border-teal-400 bg-teal-50 text-teal-900' },
  ];

  const testimonials = [
    {
      quote: isId
        ? "Analisis Jalur Serangan NusaSec tidak hanya membuat daftar kerentanan biasa. Platform ini memetakan bagaimana penyerang dapat bergerak secara lateral di seluruh akun cloud kami, sehingga tim kami dapat mengabaikan 92% alarm palsu dan fokus pada kombinasi risiko yang nyata."
        : "NusaSec's Attack Path Analysis doesn't just list vulnerabilities. It maps how an attacker could move laterally across our multi-cloud accounts, allowing us to ignore 92% of the noise and remediate true toxic combinations.",
      author: "Budi Hermawan",
      title: "Chief Information Security Officer (CISO)",
      company: "Bank KBMI 4 Nasional",
      frameworks: ["OJK POJK 11/2022", "ISO 27001:2022"]
    },
    {
      quote: isId
        ? "Kesiapan Kriptografi Pasca-Kuantum (PQC) NusaSec adalah yang pertama di kawasan ini yang benar-benar siap produksi. Kami berhasil menginventarisasi CBOM di 14.000 endpoint dan menerapkan Hybrid TLS 1.3 (ML-KEM-768) tanpa sedikit pun downtime."
        : "NusaSec's Post-Quantum Cryptography readiness is the first production-grade implementation in ASEAN. We inventoried CBOM across 14,000 endpoints and rolled out Hybrid TLS 1.3 (ML-KEM-768) with zero disruption.",
      author: "Arya Wicaksono",
      title: "Head of Infrastructure & Cloud Security",
      company: "National Payment Gateway & Switch",
      frameworks: ["NIST FIPS 203", "PCI-DSS v4.0"]
    },
    {
      quote: isId
        ? "Brankas Bukti Kepatuhan Otomatis NusaSec memotong waktu persiapan audit tahunan kami dari 6 minggu menjadi hanya 4 jam. Auditor eksternal kami dapat memverifikasi bukti konfigurasi dengan tanda tangan digital FIPS 204 secara mandiri."
        : "The Automated Compliance Audit Vault reduced our annual audit prep from 6 weeks to 4 hours. Our third-party auditors independently verified cryptographically signed FIPS 204 proofs in real-time.",
      author: "Siti Rahmawati",
      title: "VP of Governance, Risk & Compliance (GRC)",
      company: "FinTech SuperApp & Unicorn",
      frameworks: ["UU PDP No. 27/2022", "SOC 2 Type II"]
    }
  ];

  return (
    <section className="py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Top Section: G2 Badges & Rating */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-12 border-b border-slate-200">
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold font-mono">
              <Award className="w-4 h-4 text-amber-600" />
              <span>THE REVIEWS ARE IN</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
              {isId ? 'Pengguna Menilai NusaSec #1 di Keamanan Cloud & PQC' : 'Customers rate NusaSec #1 in Cloud & PQC Security'}
            </h2>
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-1">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-800">4.9 / 5.0 Rating</span>
              <span className="text-xs text-slate-500">• 480+ Enterprise Reviews</span>
            </div>
          </div>

          {/* G2 Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {g2Badges.map((badge, idx) => (
              <div
                key={idx}
                className={`px-3.5 py-2.5 rounded-xl border text-center font-mono shadow-sm ${badge.color}`}
              >
                <div className="text-[10px] font-bold tracking-wider opacity-75">{badge.subtitle}</div>
                <div className="text-xs font-extrabold tracking-tight mt-0.5">{badge.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Driving Outcomes Section (Big Metric Callouts) */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
              {isId ? 'Hasil Terukur di Garis Depan' : 'Driving Measurable Outcomes'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              {isId ? 'Dampak nyata terhadap kecepatan tim keamanan dan pengembang di seluruh lingkungan enterprise.' : 'Proven business impact accelerating DevSecOps and compliance velocity.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <div className="text-4xl sm:text-5xl font-extrabold font-display text-blue-600">
                85%
              </div>
              <div className="text-sm font-bold text-slate-900">
                {isId ? 'Pengurangan Waktu Persiapan Audit' : 'Reduction in Audit Prep Time'}
              </div>
              <p className="text-xs text-slate-600">
                {isId ? 'Pengumpulan bukti kriptografis otomatis menggantikan screenshot manual.' : 'Zero-touch continuous evidence replacing manual spreadsheet evidence.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <div className="text-4xl sm:text-5xl font-extrabold font-display text-blue-600">
                70%
              </div>
              <div className="text-sm font-bold text-slate-900">
                {isId ? 'Penurunan MTTR dengan GitOps Fix' : 'Reduction in MTTR via GitOps PRs'}
              </div>
              <p className="text-xs text-slate-600">
                {isId ? 'Pembuatan Pull Request Terraform otomatis langsung ke repositori developer.' : 'Automated 1-click Terraform code fixes dispatched to developer repos.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <div className="text-4xl sm:text-5xl font-extrabold font-display text-purple-600">
                92%
              </div>
              <div className="text-sm font-bold text-slate-900">
                {isId ? 'Penyaringan Alarm Palsu (Noise)' : 'False Positive Noise Eliminated'}
              </div>
              <p className="text-xs text-slate-600">
                {isId ? 'Hanya memperingatkan jalur serangan yang terbukti memiliki eksploitasi aktif.' : 'Only surfacing toxic combinations with validated exploit paths.'}
              </p>
            </div>
          </div>
        </div>

        {/* Customer Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 text-slate-900 border border-slate-200 flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-blue-600 opacity-60" />
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-2">
                <div>
                  <div className="font-bold text-sm text-slate-900 font-display">{item.author}</div>
                  <div className="text-xs text-slate-500">{item.title}</div>
                  <div className="text-xs font-semibold text-blue-600">{item.company}</div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.frameworks.map((fw, fIdx) => (
                    <span
                      key={fIdx}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-mono border border-slate-300"
                    >
                      {fw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Callout with Mascot Companion */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-slate-50 via-white to-slate-50 border border-slate-200 text-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
              {isId ? 'Siap Meningkatkan Ketahanan Multi-Cloud Anda?' : 'Ready to Elevate Your Cloud Security Posture?'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              {isId 
                ? 'Jadwalkan sesi live walkthrough dengan pakar kriptografi dan arsitek cloud security NusaSec.'
                : 'Schedule a tailored architecture walkthrough with NusaSec security and post-quantum cryptographers.'}
            </p>
          </div>

          <button
            onClick={onOpenDemo}
            className="px-6 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all whitespace-nowrap shadow-lg shrink-0"
          >
            <span>{isId ? 'Jadwalkan Panggilan dengan Pakar' : 'Schedule a Call with a NusaSec Expert'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
