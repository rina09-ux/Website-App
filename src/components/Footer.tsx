import React from 'react';
import { Shield, CheckCircle2, Lock, Terminal, Cpu, Fingerprint, ShieldCheck, Landmark, Globe2 } from 'lucide-react';
import { PageRoute } from '../types';
import { Marquee } from './magic/effects';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onOpenAi: () => void;
  onOpenDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAi, onOpenDemo }) => {
  const handleNav = (route: PageRoute) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200 text-sm">
      {/* Trust Badge Marquee */}
      <div className="border-b border-slate-200 bg-slate-50 py-4">
        <Marquee className="max-w-7xl mx-auto px-4">
          {[
            { icon: ShieldCheck, label: 'SOC 2 Type II' },
            { icon: Fingerprint, label: 'ISO 27001' },
            { icon: Cpu, label: 'NIST FIPS 203/204' },
            { icon: Landmark, label: 'OJK POJK 11' },
            { icon: Lock, label: 'UU PDP Compliant' },
            { icon: Globe2, label: 'Multi-Cloud Certified' },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-mono text-slate-600 whitespace-nowrap"
            >
              <Icon className="w-3.5 h-3.5 text-blue-600" />
              {label}
            </div>
          ))}
        </Marquee>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          
          {/* Col 1: Platform */}
          <div>
            <div className="font-semibold text-slate-900 tracking-wide text-xs uppercase mb-4 font-mono">
              Platform
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNav('platform')} className="hover:text-slate-900 transition-colors">
                  Security Posture (CSPM)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('platform')} className="hover:text-slate-900 transition-colors">
                  Multi-Cloud Visibility
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('platform')} className="hover:text-slate-900 transition-colors">
                  Identity & MFA Governance
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('platform')} className="hover:text-slate-900 transition-colors">
                  Risk & Attack Paths
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('platform')} className="hover:text-slate-900 transition-colors">
                  Continuous Compliance
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('platform')} className="hover:text-slate-900 transition-colors">
                  Post-Quantum Cryptography
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('platform')} className="hover:text-slate-900 transition-colors">
                  Data Intelligence & Graph
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Solutions */}
          <div>
            <div className="font-semibold text-slate-900 tracking-wide text-xs uppercase mb-4 font-mono">
              Solutions
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNav('solutions')} className="hover:text-slate-900 transition-colors">
                  Enterprise Security
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('solutions')} className="hover:text-slate-900 transition-colors">
                  Cloud Security (AWS/GCP/Azure)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('solutions')} className="hover:text-slate-900 transition-colors">
                  SecOps & Incident Response
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('solutions')} className="hover:text-slate-900 transition-colors">
                  Continuous Compliance
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('solutions')} className="hover:text-slate-900 transition-colors">
                  Crypto-Agility & Inventory
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('solutions')} className="hover:text-slate-900 transition-colors">
                  PQC Modernization
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('solutions')} className="hover:text-slate-900 transition-colors">
                  Banking & FinTech Security
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: AI Intelligence */}
          <div>
            <div className="font-semibold text-slate-900 tracking-wide text-xs uppercase mb-4 font-mono">
              NusaSec AI
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNav('ai')} className="hover:text-slate-900 transition-colors">
                  Security Reasoning Engine
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('ai')} className="hover:text-slate-900 transition-colors">
                  4-Tier Visibility Model
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('ai')} className="hover:text-slate-900 transition-colors">
                  Attack Path AI Analyzer
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('ai')} className="hover:text-slate-900 transition-colors">
                  Automated Remediation PRs
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('ai')} className="hover:text-slate-900 transition-colors">
                  Zero Data Retention Guarantee
                </button>
              </li>
              <li>
                <button onClick={onOpenAi} className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Interactive AI Assistant →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources & CMS */}
          <div>
            <div className="font-semibold text-slate-900 tracking-wide text-xs uppercase mb-4 font-mono">
              Resources
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNav('resources')} className="hover:text-slate-900 transition-colors">
                  Research Papers & Benchmarks
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('resources')} className="hover:text-slate-900 transition-colors">
                  Threat Advisory Reports
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('resources')} className="hover:text-slate-900 transition-colors">
                  Documentation Hub
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('resources')} className="hover:text-slate-900 transition-colors">
                  Customer Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('resources')} className="hover:text-slate-900 transition-colors">
                  PQC Transition Whitepapers
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('resources')} className="hover:text-slate-900 transition-colors">
                  Core CMS News Releases
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Security & Trust */}
          <div>
            <div className="font-semibold text-slate-900 tracking-wide text-xs uppercase mb-4 font-mono">
              Trust & Security
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNav('security')} className="hover:text-slate-900 transition-colors">
                  Trust Center Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('security-architecture')} className="hover:text-slate-900 transition-colors">
                  Security Architecture & Isolation
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('security')} className="hover:text-slate-900 transition-colors">
                  Compliance Certifications
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('security')} className="hover:text-slate-900 transition-colors">
                  Data Sovereignty & Privacy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('security')} className="hover:text-slate-900 transition-colors">
                  Responsible Disclosure Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('security')} className="hover:text-slate-900 transition-colors">
                  Live System Status
                </button>
              </li>
            </ul>
          </div>

          {/* Col 6: Company & Commercial */}
          <div>
            <div className="font-semibold text-slate-900 tracking-wide text-xs uppercase mb-4 font-mono">
              Company
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNav('company')} className="hover:text-slate-900 transition-colors">
                  About NusaSec
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('pricing')} className="hover:text-slate-900 transition-colors">
                  Pricing & Plans
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('company')} className="hover:text-slate-900 transition-colors">
                  Cryptographic Advisory Board
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('company')} className="hover:text-slate-900 transition-colors">
                  Technology Partners
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('company')} className="hover:text-slate-900 transition-colors">
                  Careers & Research Grants
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('company')} className="hover:text-slate-900 transition-colors">
                  Contact Enterprise Sales
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-blue-600">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 font-display">
                NusaSec
              </div>
              <div className="text-[11px] text-slate-500">
                Secure intelligence for modern infrastructure.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500">
            <button onClick={() => handleNav('privacy-policy')} className="hover:text-slate-900">
              Privacy Policy
            </button>
            <button onClick={() => handleNav('terms-of-service')} className="hover:text-slate-900">
              Terms of Service
            </button>
            <button onClick={() => handleNav('cookie-preferences')} className="hover:text-slate-900">
              Cookie Preferences
            </button>
            <button onClick={() => handleNav('security-architecture')} className="hover:text-slate-900">
              Security Architecture
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-slate-500">
              © {new Date().getFullYear()} NusaSec Inc. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
