import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  Shield, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Cloud, 
  Cpu, 
  FileCheck, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Mail,
  Network,
  Globe,
  Crosshair,
  BarChart3
} from 'lucide-react';
import { PageRoute } from '../types';
import { PqcReadinessScanner } from '../components/PqcReadinessScanner';
import { PqcReadinessGauge } from '../components/PqcReadinessGauge';
import { GlobalThreatIntelligence } from '../components/GlobalThreatIntelligence';
import { InteractiveAttackPathSimulator } from '../components/InteractiveAttackPathSimulator';
import { ExposureToFixPipeline } from '../components/ExposureToFixPipeline';
import { CustomerSuccessMetrics } from '../components/CustomerSuccessMetrics';
import { FaqSection } from '../components/FaqSection';
import { CyberSecurityThreatGraph } from '../components/CyberSecurityThreatGraph';
import { CMS_ARTICLES } from '../data/mockCmsData';
import { Language, TRANSLATIONS } from '../data/translations';
import { Meteors, DotGrid, BlobGlow } from '../components/magic/effects';
import { LiveCertLogos, CertLogoItem } from '../components/magic/LiveCertLogos';

interface HomePageProps {
  language?: Language;
  onNavigate: (route: PageRoute) => void;
  onOpenAi: () => void;
  onOpenDemo: () => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  language = 'id',
  onNavigate,
  onOpenAi,
  onOpenDemo,
  onOpenAuth
}) => {
  const [heroEmail, setHeroEmail] = useState('');
  const [activeCapabilityTab, setActiveCapabilityTab] = useState<number>(0);
  const [activePlatformModule, setActivePlatformModule] = useState<'cspm' | 'pqc' | 'audit' | 'graph'>('cspm');
  const [activeFeatureTab, setActiveFeatureTab] = useState<string>('metrics');
  const featureTabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const featureTabScrollRef = useRef<HTMLDivElement>(null);

  const handleFeatureTabClick = (id: string) => {
    setActiveFeatureTab(id);
    // Manually computed scroll instead of scrollIntoView: it's deterministic
    // in both directions (forward reveals later tabs, backward reveals
    // earlier ones) regardless of the sticky/backdrop-blur wrapper this bar
    // sits in, which scrollIntoView's ancestor-detection doesn't always
    // handle reliably on mobile browsers.
    const container = featureTabScrollRef.current;
    const btn = featureTabRefs.current[id];
    if (container && btn) {
      // getBoundingClientRect diff instead of offsetLeft: offsetLeft is
      // measured against the nearest *positioned* ancestor, which here is
      // the sticky wrapper (not the scroll container itself), so it gave
      // the wrong offset in one direction. Rect math sidesteps that.
      const containerRect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      const targetLeft = container.scrollLeft + (btnRect.left - containerRect.left) - 16;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      container.scrollTo({
        left: Math.max(0, Math.min(targetLeft, maxScrollLeft)),
        behavior: 'smooth',
      });
    }
  };
  const t = TRANSLATIONS[language];
  const isId = language === 'id';

  const capabilityIcons = [Cloud, Cpu, FileCheck, Layers];

  const featureTabs: { id: string; icon: typeof Cloud; label: string; colorClass: string; chipClass: string }[] = [
    { id: 'metrics', icon: BarChart3, label: isId ? 'Hasil Nyata' : 'Real Results', colorClass: 'text-emerald-600', chipClass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600' },
    { id: 'pqc', icon: Lock, label: isId ? 'Kripto Kuantum' : 'Quantum Crypto', colorClass: 'text-amber-600', chipClass: 'bg-amber-500/10 border-amber-500/30 text-amber-600' },
    { id: 'graph', icon: Network, label: isId ? 'Peta Ancaman' : 'Threat Graph', colorClass: 'text-violet-600', chipClass: 'bg-violet-500/10 border-violet-500/30 text-violet-600' },
    { id: 'global', icon: Globe, label: isId ? 'Intelijen Global' : 'Global Intel', colorClass: 'text-teal-600', chipClass: 'bg-teal-500/10 border-teal-500/30 text-teal-600' },
    { id: 'simulator', icon: Crosshair, label: isId ? 'Jalur Serangan' : 'Attack Path', colorClass: 'text-rose-600', chipClass: 'bg-rose-500/10 border-rose-500/30 text-rose-600' },
    { id: 'pipeline', icon: Cloud, label: isId ? 'Cloud Posture' : 'Cloud Posture', colorClass: 'text-blue-600', chipClass: 'bg-blue-500/10 border-blue-500/30 text-blue-600' },
  ];

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroEmail.trim()) {
      onOpenAuth('signup');
    } else {
      onOpenDemo();
    }
  };

  return (
    <div className="space-y-0 text-slate-900 bg-slate-50 font-sans selection:bg-slate-900 selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. HIGH-IMPACT HERO SECTION WITH NUSA-SENTINEL MASCOT & EMAIL INPUT */}
      {/* ========================================================================= */}
      <section className="relative bg-slate-50 text-slate-900 pt-32 pb-28 lg:pt-36 lg:pb-40 overflow-hidden">
        
        {/* Technical Coordinate Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e130_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e130_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        
        {/* Calibrated Ambient Glow — asymmetric, off-center so it doesn't read as a stock centered blob */}
        <BlobGlow className="top-[-4rem] left-[8%] w-[640px] h-[420px] bg-blue-500/10" />
        <BlobGlow className="top-1/3 right-[4%] w-[420px] h-[320px] bg-teal-400/10" />

        <Meteors count={4} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 items-center">
            
            {/* Hero Messaging & Interactive Input */}
            <div className="max-w-3xl mx-auto space-y-6 text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-slate-900 leading-[1.12]">
                {isId ? (
                  <>
                    Lindungi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-blue-400">Semua yang Anda Bangun</span> dan Jalankan di Multi-Cloud
                  </>
                ) : (
                  <>
                    Protect <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-blue-400">Everything You Build</span> and Run Across Multi-Cloud
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                {isId 
                  ? 'NusaSec menghubungkan kode, arsitektur multi-cloud, dan runtime ke dalam satu graf konteks terpadu dengan ketahanan Kriptografi Pasca-Kuantum (NIST FIPS 203/204) dan otomasi kepatuhan OJK POJK 11 / UU PDP.'
                  : 'NusaSec connects code, multi-cloud posture, and runtime into a unified security graph with Post-Quantum Cryptographic agility (NIST FIPS 203/204) and continuous compliance automation.'}
              </p>

              {/* Work Email + Single-Line Action Controls */}
              <div className="pt-2">
                <form
                  onSubmit={handleHeroSubmit}
                  className="flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto"
                >
                  <div className="relative w-full sm:flex-1">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      value={heroEmail}
                      onChange={(e) => setHeroEmail(e.target.value)}
                      placeholder={isId ? "Masukkan email kantor Anda..." : "Enter your work email..."}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-shimmer w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] whitespace-nowrap"
                  >
                    <span>{isId ? 'Get Started / Mulai' : 'Get Started'}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                </form>

                {/* Secondary Button Row: Talk to AI & Book Demo */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                  <button
                    onClick={onOpenAi}
                    className="px-4 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 hover:border-slate-400 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>{isId ? 'Talk to AI / Tanya Asisten' : 'Talk to AI'}</span>
                  </button>
                  <button
                    onClick={onOpenDemo}
                    className="px-4 py-2 rounded-lg text-slate-500 hover:text-slate-800 text-xs font-medium transition-colors"
                  >
                    {isId ? 'Jadwalkan Live Demo →' : 'Schedule Live Demo →'}
                  </button>
                </div>
              </div>

              {/* Trust & Certification Standards — real logos floating on the
                  page (no card/box), grayscale by default, come to life on tap */}
              <div className="pt-6 border-t border-slate-200 mt-6">
                <LiveCertLogos
                  items={[
                    {
                      id: 'soc2',
                      src: `${import.meta.env.BASE_URL}logos/certifications/soc2.png`,
                      alt: 'AICPA SOC 2 Type II',
                      label: t.hero.certifications.soc2,
                      glowColor: '#2563eb',
                    },
                    {
                      id: 'iso27001',
                      src: `${import.meta.env.BASE_URL}logos/certifications/iso27001.png`,
                      alt: 'ISO/IEC 27001:2022',
                      label: t.hero.certifications.iso,
                      glowColor: '#1d4ed8',
                    },
                    {
                      id: 'nist',
                      src: `${import.meta.env.BASE_URL}logos/certifications/nist.png`,
                      alt: 'NIST FIPS 203/204',
                      label: t.hero.certifications.pqc,
                      glowColor: '#0f172a',
                    },
                    {
                      id: 'bssn',
                      src: `${import.meta.env.BASE_URL}logos/certifications/bssn.png`,
                      alt: 'Badan Siber dan Sandi Negara (BSSN)',
                      label: isId ? 'Diakui Badan Siber dan Sandi Negara (BSSN)' : 'Recognized by Indonesia\'s National Cyber Agency (BSSN)',
                      glowColor: '#ca8a04',
                    },
                  ]}
                />
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ========================================================================= */}
      {/* 4-10. PLATFORM CAPABILITIES — ICON TAB SWITCHER (Wiz-style)               */}
      {/* Only the active tab's panel is rendered, keeping the page short.          */}
      {/* ========================================================================= */}
      <section className="relative bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto pt-14 sm:pt-20 pb-8 space-y-3">
            <div className="text-xs uppercase font-mono tracking-widest text-blue-600 font-bold">
              {isId ? 'PLATFORM NUSASEC' : 'THE NUSASEC PLATFORM'}
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
              {isId ? 'Satu Platform, Enam Kapabilitas Inti' : 'One Platform, Six Core Capabilities'}
            </h2>
          </div>

          {/* Icon Tab Bar */}
          <div className="sticky top-[68px] sm:top-[76px] z-20 -mx-4 sm:mx-0 bg-white/90 backdrop-blur-sm border-b border-slate-200">
            <div ref={featureTabScrollRef} className="flex items-center justify-start sm:justify-center gap-1 sm:gap-2 overflow-x-auto px-4 sm:px-0 no-scrollbar" role="tablist">
              {featureTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeFeatureTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => { featureTabRefs.current[tab.id] = el; }}
                    onClick={() => handleFeatureTabClick(tab.id)}
                    role="tab"
                    aria-selected={isActive}
                    className={`relative shrink-0 flex items-center gap-2.5 px-3.5 sm:px-4 py-3.5 text-sm font-semibold transition-colors whitespace-nowrap ${
                      isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-7 h-7 rounded-lg border shrink-0 transition-colors ${
                        isActive ? tab.chipClass : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <span>{tab.label}</span>

                    {isActive && (
                      <motion.span
                        layoutId="feature-tab-indicator"
                        className={`absolute left-0 right-0 -bottom-px h-0.5 rounded-full ${tab.colorClass.replace('text-', 'bg-')}`}
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Panel — fades/slides in on tab change instead of jump-cutting */}
          <div className="py-12 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeatureTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {activeFeatureTab === 'pipeline' && (
                  <ExposureToFixPipeline language={language} onOpenDemo={onOpenDemo} />
                )}

                {activeFeatureTab === 'graph' && (
                  <CyberSecurityThreatGraph language={language} onOpenDemo={onOpenDemo} onOpenAi={onOpenAi} />
                )}

                {activeFeatureTab === 'global' && (
                  <GlobalThreatIntelligence language={language} onOpenDemo={onOpenDemo} onOpenAi={onOpenAi} />
                )}

                {activeFeatureTab === 'simulator' && (
                  <div className="space-y-12">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                      <div className="text-xs uppercase font-mono tracking-widest text-blue-600 font-bold">
                        {isId ? 'SIMULASI KORELASI GRAF' : 'INTERACTIVE ATTACK GRAPH SIMULATOR'}
                      </div>
                      <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
                        {isId ? 'Lihat Bagaimana NusaSec Menutup Jalur Serangan Kritis' : 'See How NusaSec Eliminates Multi-Cloud Attack Paths'}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {isId 
                          ? 'Pilih skenario serangan di bawah ini, amati bagaimana kombinasi toksik teridentifikasi, dan jalankan perbaikan GitOps otomatis.'
                          : 'Select an infrastructure attack scenario below, observe toxic combination detection, and generate automated GitOps pull requests.'}
                      </p>
                    </div>
                    <InteractiveAttackPathSimulator language={language} onBookDemo={onOpenDemo} />
                  </div>
                )}

                {activeFeatureTab === 'pqc' && (
                  <div className="space-y-12">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                      <div className="text-xs uppercase font-mono tracking-widest text-blue-600 font-bold">
                        {isId ? 'ORKESTRASI KRIPTOGRAFI PASCA-KUANTUM (PQC)' : 'POST-QUANTUM CRYPTO-AGILITY & STANDARDS'}
                      </div>
                      <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
                        {isId ? 'Uji & Ukur Kesiapan Migrasi Kriptografi Menuju Standar NIST FIPS 203/204' : 'Measure & Accelerate Migration Towards NIST FIPS 203/204 Standards'}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {isId 
                          ? 'Pantau progres eliminasi enkripsi warisan (RSA/ECC), transisi ke algoritma tahan kuantum ML-KEM dan ML-DSA, serta amankan arsip data dari serangan Harvest Now, Decrypt Later (HNDL).'
                          : 'Track legacy RSA/ECC deprecation, transition to lattice-based ML-KEM and ML-DSA ciphers, and shield long-term archives from Harvest Now, Decrypt Later (HNDL) threats.'}
                      </p>
                    </div>

                    <PqcReadinessGauge 
                      language={language} 
                      onOpenDemo={onOpenDemo} 
                      onOpenAi={onOpenAi} 
                    />

                    <div className="pt-6">
                      <PqcReadinessScanner onBookDemo={onOpenDemo} />
                    </div>
                  </div>
                )}

                {activeFeatureTab === 'metrics' && (
                  <CustomerSuccessMetrics language={language} onOpenDemo={onOpenDemo} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 11. RESEARCH & CMS STREAM */}
      {/* ========================================================================= */}
      <section className="relative py-24 bg-slate-50 overflow-hidden">
        <DotGrid className="opacity-70" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-xs uppercase font-mono tracking-widest text-blue-600 font-bold mb-2">
                {isId ? 'Publikasi dari NusaSec-Core CMS' : 'Published from NusaSec-Core CMS'}
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
                {isId ? 'Riset Kriptografi Terkini & Analisis Ancaman' : 'Latest Cryptographic Research & Threat Advisories'}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('resources')}
              className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start md:self-auto whitespace-nowrap"
            >
              <span>{isId ? 'Lihat Semua Artikel' : 'View All Publications'}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>

          {/* Mobile: horizontally swipeable carousel (snap-scroll) — three
              evenly-sized cards you drag through, with a peek of the next
              card as a swipe affordance. Desktop: unchanged asymmetric bento. */}
          <div className="md:hidden -mx-4 px-4">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2">
              {CMS_ARTICLES.slice(0, 3).map((article) => (
                <div
                  key={article.id}
                  onClick={() => onNavigate('resources')}
                  className="snap-start shrink-0 w-[82%] cursor-pointer group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm active:scale-[0.98] transition-transform flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span className="uppercase text-blue-600 font-bold">{article.category}</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="font-bold font-display text-slate-900 leading-snug text-base line-clamp-3">
                      {article.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-xs line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
                    <span>{article.author.name}</span>
                    <span className="text-blue-600 font-semibold">
                      {isId ? 'Baca →' : 'Read →'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-1.5 pt-4">
              {CMS_ARTICLES.slice(0, 3).map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              ))}
            </div>
          </div>

          <div className="hidden md:block bento-asymmetric">
            {CMS_ARTICLES.slice(0, 3).map((article, idx) => {
              const isLead = idx === 0;
              if (isLead) {
                return (
                  <div
                    key={article.id}
                    onClick={() => onNavigate('resources')}
                    className="bento-cell-lg cursor-pointer group rounded-2xl border border-slate-200 bg-white p-6 lg:p-8 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                        <span className="uppercase text-blue-600 font-bold">{article.category}</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="font-bold font-display text-slate-900 group-hover:text-blue-600 transition-colors leading-snug text-xl sm:text-2xl">
                        {article.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-sm line-clamp-4">
                        {article.summary}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                      <span>{article.author.name}</span>
                      <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                        {isId ? 'Baca riset →' : 'Read paper →'}
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={article.id}
                  onClick={() => onNavigate('resources')}
                  className={`bento-cell-md cursor-pointer group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all ${idx === 1 ? 'tilt-a' : 'tilt-b'}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                      <span className="uppercase text-blue-600 font-bold">{article.category}</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="font-bold font-display text-slate-900 group-hover:text-blue-600 transition-colors leading-snug text-base">
                      {article.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-xs line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                    <span>{article.author.name}</span>
                    <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                      {isId ? 'Baca riset →' : 'Read paper →'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 11. FREQUENTLY ASKED QUESTIONS & SEO RICH KNOWLEDGE BASE */}
      {/* ========================================================================= */}
      <FaqSection language={language} onOpenDemo={onOpenDemo} onOpenAi={onOpenAi} />


      {/* ========================================================================= */}
      {/* 12. FINAL ARCHITECTURAL BRIEFING CONVERSION CTA */}
      {/* ========================================================================= */}
      <section className="py-24 bg-slate-50 text-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12)_0,transparent_70%)] pointer-events-none" />
        <Meteors count={3} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="relative w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400 overflow-hidden">
            <span className="absolute inset-0 rounded-2xl bg-blue-400/20 blur-md glow-pulse-dot" />
            <Shield className="relative w-7 h-7" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
            {isId 
              ? 'Siap Mengamankan Infrastruktur Multi-Cloud Anda di Era Pasca-Kuantum?'
              : 'Ready to secure your multi-cloud infrastructure for the post-quantum era?'}
          </h2>

          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {isId 
              ? 'Bergabunglah dengan para CISO, arsitek keamanan, dan pimpinan GRC terkemuka yang mempercayakan ketahanan multi-cloud pada NusaSec.'
              : 'Join leading enterprise CISOs, security architects, and compliance officers who rely on NusaSec for continuous posture, attack path correlation, and cryptographic agility.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <button
              onClick={onOpenDemo}
              className="btn-shimmer w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl hover:shadow-blue-500/20 whitespace-nowrap"
            >
              <span>{isId ? 'Jadwalkan Briefing Arsitektur' : 'Book an Architecture Briefing'}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <button
              onClick={() => onOpenAuth('signup')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-sm transition-colors whitespace-nowrap shadow-sm"
            >
              {isId ? 'Mulai Uji Coba Enterprise 14 Hari' : 'Start 14-Day Enterprise Trial'}
            </button>
          </div>

          <p className="text-xs text-slate-500 pt-2">
            {isId 
              ? 'Aktivasi cepat • Tanpa perlu instalasi agen untuk asesmen awal • Jaminan isolasi data penuh'
              : 'Instant deployment • Agentless initial assessment • Full tenant data sovereignty'}
          </p>
        </div>
      </section>

    </div>
  );
};
