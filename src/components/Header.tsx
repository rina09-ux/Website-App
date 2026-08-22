import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Sparkles, 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight, 
  Lock, 
  Cloud, 
  FileCheck, 
  Cpu, 
  Globe
} from 'lucide-react';
import { PageRoute } from '../types';
import { Language, TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  currentRoute: PageRoute;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate: (route: PageRoute) => void;
  onOpenAi: () => void;
  onOpenDemo: () => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  language,
  onLanguageChange,
  onNavigate,
  onOpenAi,
  onOpenDemo,
  onOpenAuth
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const t = TRANSLATIONS[language].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === 'id' ? 'en' : 'id';
    onLanguageChange(nextLang);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-lg text-slate-900 py-3.5' 
        : 'bg-white text-slate-900 border-b border-slate-200 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: 3 zones in one single row */}
        <div className="flex items-center justify-between gap-4 sm:gap-6">
          
          {/* ZONE 1: Brand Title (Single text element with icon mark) */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1"
            >
              <div className="relative w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 group-hover:border-blue-400 transition-colors overflow-hidden">
                <span className="absolute inset-0 rounded-lg bg-blue-400/20 blur-md glow-pulse-dot" />
                <Shield className="relative w-4 h-4 text-blue-600" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-display">
                  Nusa<span className="text-blue-600">Sec</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-medium px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 hidden sm:inline-block">
                  PQC & Cloud
                </span>
              </div>
            </button>
          </div>

          {/* ZONE 2: Nav Links (4-6 links, single-line, 1-2 words) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* Platform Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('platform')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNavClick('platform')}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  currentRoute === 'platform' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {t.platform}
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {activeDropdown === 'platform' && (
                <div className="absolute top-full left-0 w-80 rounded-xl animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xl">
                  <div className="space-y-1">
                    <button
                      onClick={() => handleNavClick('platform')}
                      className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-100 text-left transition-colors group"
                    >
                      <div className="p-2 rounded bg-slate-100 text-blue-600 group-hover:bg-blue-500/20">
                        <Lock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900 group-hover:text-blue-600">Security Posture (CSPM)</div>
                        <div className="text-[11px] text-slate-500">Multi-cloud graph telemetry & drift analysis</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('platform')}
                      className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-100 text-left transition-colors group"
                    >
                      <div className="p-2 rounded bg-slate-100 text-blue-600 group-hover:bg-blue-500/20">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900 group-hover:text-blue-600">Post-Quantum Cryptography (PQC)</div>
                        <div className="text-[11px] text-slate-500">NIST FIPS 203/204 CBOM & hybrid agility</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('platform')}
                      className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-100 text-left transition-colors group"
                    >
                      <div className="p-2 rounded bg-slate-100 text-amber-600 group-hover:bg-amber-500/20">
                        <FileCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900 group-hover:text-amber-600">Continuous Compliance</div>
                        <div className="text-[11px] text-slate-500">SOC 2, ISO 27001, OJK POJK 11, UU PDP</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('platform')}
                      className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-100 text-left transition-colors group"
                    >
                      <div className="p-2 rounded bg-slate-100 text-purple-600 group-hover:bg-purple-500/20">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900 group-hover:text-purple-600">NusaSec AI Reasoning</div>
                        <div className="text-[11px] text-slate-500">4-tier isolated intelligence layer</div>
                      </div>
                    </button>
                  </div>
                </div>
                </div>
              )}
            </div>

            {/* Solutions */}
            <button
              onClick={() => handleNavClick('solutions')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                currentRoute === 'solutions' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.solutions}
            </button>

            {/* AI */}
            <button
              onClick={() => handleNavClick('ai')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                currentRoute === 'ai' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              {t.ai}
            </button>

            {/* Pricing */}
            <button
              onClick={() => handleNavClick('pricing')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                currentRoute === 'pricing' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.pricing}
            </button>

            {/* Resources */}
            <button
              onClick={() => handleNavClick('resources')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                currentRoute === 'resources' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.resources}
            </button>

            {/* Security & Trust */}
            <button
              onClick={() => handleNavClick('security')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                currentRoute === 'security' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.trust}
            </button>

            {/* Company */}
            <button
              onClick={() => handleNavClick('company')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                currentRoute === 'company' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.company}
            </button>
          </nav>

          {/* ZONE 3: 1-2 Primary Actions + Language Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono font-bold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
              title={language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === 'id' ? '🇮🇩 ID' : '🇬🇧 EN'}</span>
            </button>

            {/* Talk to AI Action */}
            <button
              onClick={onOpenAi}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 hover:border-slate-300 transition-colors whitespace-nowrap"
              title="Talk to Public NusaSec AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.talkToAi}</span>
            </button>

            {/* Book a Demo */}
            <button
              onClick={onOpenDemo}
              className="btn-shimmer hidden md:inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-500 hover:bg-blue-400 text-slate-950 font-medium transition-colors whitespace-nowrap shadow-sm shadow-blue-500/30"
            >
              <span>{t.bookDemo}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Customer / Internal Access */}
            <button
              onClick={() => onOpenAuth('login')}
              className="px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
              {t.signIn}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 mt-2 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-xs text-slate-500 font-mono">Pilih Bahasa / Language</span>
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-slate-100 text-blue-600 border border-slate-200 flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'id' ? 'Bahasa Indonesia (ID)' : 'English (EN)'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <button
              onClick={() => handleNavClick('home')}
              className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-slate-100 text-slate-700"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('platform')}
              className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-slate-100 text-slate-700"
            >
              {t.platform}
            </button>
            <button
              onClick={() => handleNavClick('solutions')}
              className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-slate-100 text-slate-700"
            >
              {t.solutions}
            </button>
            <button
              onClick={() => handleNavClick('ai')}
              className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              {t.ai}
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-slate-100 text-slate-700"
            >
              {t.pricing}
            </button>
            <button
              onClick={() => handleNavClick('resources')}
              className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-slate-100 text-slate-700"
            >
              {t.resources}
            </button>
            <button
              onClick={() => handleNavClick('security')}
              className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-slate-100 text-slate-700"
            >
              {t.trust}
            </button>
            <button
              onClick={() => handleNavClick('company')}
              className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-slate-100 text-slate-700"
            >
              {t.company}
            </button>
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full py-2.5 px-4 text-center text-sm font-semibold rounded-lg bg-blue-500 hover:bg-blue-400 text-slate-950"
            >
              {t.bookDemo}
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAi();
                }}
                className="flex-1 py-2 text-center text-xs font-medium rounded-lg bg-slate-50 text-slate-700 border border-slate-200 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                {t.talkToAi}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="flex-1 py-2 text-center text-xs font-medium rounded-lg bg-slate-50 text-slate-700 border border-slate-200"
              >
                {t.signIn}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
