import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { Language } from './data/translations';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PlatformPage } from './pages/PlatformPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { AiPage } from './pages/AiPage';
import { LivePricingPage } from './pages/LivePricingPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { SecurityTrustPage } from './pages/SecurityTrustPage';
import { CompanyPage } from './pages/CompanyPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { CookiePreferencesPage } from './pages/CookiePreferencesPage';
import { SecurityArchitecturePage } from './pages/SecurityArchitecturePage';
import { RealPublicAiDrawer } from './components/RealPublicAiDrawer';
import { DemoModal } from './components/DemoModal';
import { RealAuthModal } from './components/RealAuthModal';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [language, setLanguage] = useState<Language>('id');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      if (['home', 'platform', 'solutions', 'ai', 'pricing', 'resources', 'security', 'company', 'privacy-policy', 'terms-of-service', 'cookie-preferences', 'security-architecture'].includes(hash)) {
        setCurrentRoute(hash);
      } else if (hash === 'login' || hash === 'signup') {
        setAuthMode(hash);
        setIsAuthOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
    window.location.hash = route === 'home' ? '' : route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <Header
        currentRoute={currentRoute}
        language={language}
        onLanguageChange={(lang) => setLanguage(lang)}
        onNavigate={navigateTo}
        onOpenAi={() => setIsAiOpen(true)}
        onOpenDemo={() => setIsDemoOpen(true)}
        onOpenAuth={openAuthModal}
      />

      <main className="flex-1">
        {currentRoute === 'home' && <HomePage language={language} onNavigate={navigateTo} onOpenAi={() => setIsAiOpen(true)} onOpenDemo={() => setIsDemoOpen(true)} onOpenAuth={openAuthModal} />}
        {currentRoute === 'platform' && <PlatformPage onOpenDemo={() => setIsDemoOpen(true)} onOpenAi={() => setIsAiOpen(true)} onOpenAuth={openAuthModal} />}
        {currentRoute === 'solutions' && <SolutionsPage onOpenDemo={() => setIsDemoOpen(true)} onOpenAi={() => setIsAiOpen(true)} />}
        {currentRoute === 'ai' && <AiPage onOpenAi={() => setIsAiOpen(true)} onOpenDemo={() => setIsDemoOpen(true)} />}
        {currentRoute === 'pricing' && <LivePricingPage onOpenDemo={() => setIsDemoOpen(true)} onOpenAuth={openAuthModal} />}
        {currentRoute === 'resources' && <ResourcesPage />}
        {currentRoute === 'security' && <SecurityTrustPage onOpenDemo={() => setIsDemoOpen(true)} />}
        {currentRoute === 'company' && <CompanyPage />}
        {currentRoute === 'privacy-policy' && <PrivacyPolicyPage language={language} />}
        {currentRoute === 'terms-of-service' && <TermsOfServicePage language={language} />}
        {currentRoute === 'cookie-preferences' && <CookiePreferencesPage language={language} />}
        {currentRoute === 'security-architecture' && <SecurityArchitecturePage language={language} />}
      </main>

      <Footer onNavigate={navigateTo} onOpenAi={() => setIsAiOpen(true)} onOpenDemo={() => setIsDemoOpen(true)} />

      <RealPublicAiDrawer
        isOpen={isAiOpen}
        language={language}
        onClose={() => setIsAiOpen(false)}
        onNavigateToPricing={() => {
          setIsAiOpen(false);
          navigateTo('pricing');
        }}
        onNavigateToPqc={() => {
          setIsAiOpen(false);
          navigateTo('platform');
        }}
      />

      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />

      <RealAuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onNavigateToPricing={() => {
          setIsAuthOpen(false);
          navigateTo('pricing');
        }}
      />
    </div>
  );
}
