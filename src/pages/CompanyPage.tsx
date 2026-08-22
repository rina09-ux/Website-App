import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Cpu, 
  Globe, 
  Mail, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Shield, 
  Award,
  Sparkles,
  Send
} from 'lucide-react';
import { Marquee } from '../components/magic/effects';

export const CompanyPage: React.FC = () => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'Enterprise Partnership',
    message: ''
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const leaders = [
    {
      name: 'Dr. Harris Gunawan',
      role: 'Head of Cryptographic Research',
      bio: 'PhD in Post-Quantum Lattice Cryptography. Former NIST PQC standardization contributor specializing in ML-KEM and hybrid key exchange protocols.'
    },
    {
      name: 'Raden Wicaksono',
      role: 'Chief Security Officer',
      bio: '20+ years leading enterprise cybersecurity, banking security operations, and zero-trust cloud architecture across Southeast Asia.'
    },
    {
      name: 'Maya Sartika',
      role: 'VP of Platform Engineering',
      bio: 'Distributed systems architect with deep expertise in real-time eBPF kernel telemetry, graph databases, and Kubernetes security.'
    }
  ];

  const partners = [
    'Amazon Web Services (AWS)',
    'Google Cloud Platform',
    'Microsoft Azure Security',
    'HashiCorp Vault Partner',
    'Intel SGX / Quantum Hardware',
    'Open Quantum Safe (OQS) Consortium'
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      
      {/* Header */}
      <section className="relative bg-white text-slate-900 py-16 border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 text-xs font-mono">
              <Building2 className="w-3.5 h-3.5" />
              <span>About NusaSec</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900">
              Securing Infrastructure for the Quantum Computing Era
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We are security researchers, distributed systems engineers, and cryptographers building the definitive operating platform for multi-cloud posture, attack path analysis, and post-quantum cryptographic resilience.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-3 shadow-sm">
            <div className="text-xs font-mono font-bold uppercase text-blue-600">Our Mission</div>
            <h2 className="text-2xl font-bold font-display text-slate-900">
              Deterministic Security Without Operational Friction
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To eliminate the guesswork and alert fatigue of enterprise cybersecurity. By combining mathematical multi-cloud graph modeling with deterministic NIST post-quantum standards, we give organizations complete clarity and control over their risk posture.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-3 shadow-sm">
            <div className="text-xs font-mono font-bold uppercase text-blue-600">Our Vision</div>
            <h2 className="text-2xl font-bold font-display text-slate-900">
              Universal Quantum-Resistant Infrastructure
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We envision a future where every digital payment, sovereign state ledger, and cloud transaction is natively insulated from classical and quantum computational attacks through seamless, automated crypto-agility.
            </p>
          </div>

        </div>
      </div>

      {/* Leadership & Cryptography Council */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-3 mb-10">
          <div className="text-xs font-mono font-bold uppercase text-blue-600">Leadership & Advisory</div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
            Guided by Pioneer Cryptographers & Security Architects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leaders.map((leader, lIdx) => (
            <div key={lIdx} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-50 text-blue-600 font-bold font-display flex items-center justify-center text-sm">
                {leader.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-slate-900">{leader.name}</h3>
                <div className="text-xs font-mono text-blue-700 font-semibold">{leader.role}</div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {leader.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Alliances */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 p-8 shadow-xl space-y-6">
          <div className="text-xs font-mono font-bold uppercase text-blue-600">Ecosystem Alliances</div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Integrated with Industry Leading Infrastructure
          </h3>
          <Marquee>
            {partners.map((p, idx) => (
              <div key={idx} className="w-72 shrink-0 p-3.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2 text-xs font-mono text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{p}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>

      {/* Global Offices & Contact Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-mono font-bold uppercase text-blue-600 mb-1">Global Headquarters</div>
              <h2 className="text-2xl font-bold font-display text-slate-900">Get in Touch</h2>
              <p className="text-xs text-slate-600 mt-1">
                Reach our enterprise solutions and research partnerships division.
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>Jakarta Technology Center</span>
                </div>
                <p className="text-slate-500 font-mono text-[11px]">
                  SCBD District 8, Treasury Tower Level 38, South Jakarta, Indonesia
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>Singapore Cryptography Lab</span>
                </div>
                <p className="text-slate-500 font-mono text-[11px]">
                  Marina Bay Financial Centre Tower 1, Level 21, Singapore
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-purple-600" />
                  <span>Direct Communication</span>
                </div>
                <p className="text-slate-500 font-mono text-[11px]">
                  contact@nusasec.com • security@nusasec.com
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            {contactSubmitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900">Message Received</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you. Our partnership team will respond within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <h3 className="text-lg font-bold font-display text-slate-900 mb-2">
                  Send an Inquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Alex Chen"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="alex@enterprise.com"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Topic</label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  >
                    <option>Enterprise Architecture Consultation</option>
                    <option>PQC Research Grant & Collaboration</option>
                    <option>Technology Alliance / Reseller</option>
                    <option>Careers & Security Engineering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell us about your infrastructure requirements..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-shimmer w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-blue-600" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};
