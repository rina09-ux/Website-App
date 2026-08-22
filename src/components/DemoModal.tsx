import React, { useState } from 'react';
import { X, CheckCircle2, Shield, Calendar, Building, Mail, User, Sparkles, ArrowRight } from 'lucide-react';
import { ParticleField } from './magic/effects';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: 'CISO / Head of Security',
    cloudScale: '100 - 1,000 Assets',
    primaryInterest: 'Post-Quantum Cryptography & Agility',
    datePreference: 'This week'
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg rounded-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl overflow-hidden">
        <ParticleField density={22} className="opacity-60" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-display text-slate-900">
              Demo Brief Scheduled
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-blue-600 font-semibold">{formData.name}</span>. A NusaSec Principal Security Architect has been assigned to prepare a tailored demonstration for <span className="text-slate-900 font-semibold">{formData.company}</span>.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Domain:</span>
                <span className="text-slate-900 font-mono">{formData.primaryInterest}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target Scale:</span>
                <span className="text-slate-900 font-mono">{formData.cloudScale}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact Dispatch:</span>
                <span className="text-blue-600 font-mono">{formData.email}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-sm transition-colors"
            >
              Return to Website
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1 rounded bg-blue-500/10 border border-blue-500/30 text-blue-600">
                  <Shield className="w-3.5 h-3.5" />
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-blue-600 font-semibold">
                  Enterprise Briefing
                </span>
              </div>
              <h3 className="text-2xl font-bold font-display text-slate-900">
                Book a NusaSec Live Architecture Demo
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                See real-time cloud graph correlation, automated compliance vaults, and post-quantum migration in action.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Organization / Company
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme FinTech Bank"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Role / Title
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                >
                  <option>CISO / Head of Security</option>
                  <option>Cloud Security Architect</option>
                  <option>DevSecOps Lead</option>
                  <option>Compliance & GRC Director</option>
                  <option>VP Engineering / CTO</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Architecture Priority
              </label>
              <select
                value={formData.primaryInterest}
                onChange={(e) => setFormData({ ...formData, primaryInterest: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
              >
                <option>Post-Quantum Cryptography & Agility (FIPS 203/204)</option>
                <option>Multi-Cloud Security Posture (CSPM & Graph)</option>
                <option>Continuous Compliance Automation (SOC 2, ISO, OJK)</option>
                <option>NusaSec-AI Security Reasoning & Remediation</option>
                <option>Sovereign On-Prem / Air-Gapped GovCloud</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn-shimmer w-full py-3 px-4 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <span>Confirm Architecture Briefing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-center text-slate-500">
              No sales spam. Briefings are conducted strictly by NusaSec Solutions Architects.
            </p>
          </form>
        )}

      </div>
      </div>
    </div>
  );
};
