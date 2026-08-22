import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Shield, 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  Cpu, 
  Building, 
  CreditCard, 
  Lock,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { PRICING_TIERS } from '../data/mockCmsData';

interface PricingPageProps {
  onOpenDemo: () => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenDemo, onOpenAuth }) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [assetCount, setAssetCount] = useState<number>(750);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Dynamic ROI calculation based on asset count
  const estimatedAuditHoursSaved = Math.round(assetCount * 0.45);
  const estimatedFalsePositiveReduction = Math.round(assetCount * 3.2);

  const faqs = [
    {
      q: 'How does NusaSec count cloud assets?',
      a: 'A cloud asset is defined as an active computing instance (EC2, VM, Compute Engine), managed database instance (RDS, Cloud SQL), container node/cluster, or API gateway. Storage buckets, IAM roles, and security groups are included for free without consuming asset quotas.'
    },
    {
      q: 'Can we transition from classical RSA to PQC without downtime?',
      a: 'Yes. NusaSec provides hybrid dual-handshake proxies (X25519 + ML-KEM-768) complying with NIST FIPS 203. Classical legacy clients continue using standard TLS while quantum-aware systems immediately receive quantum resistance.'
    },
    {
      q: 'How does the commercial lifecycle in NusaSec-Core work?',
      a: 'When you sign up, NusaSec-Core provisions an isolated tenant workspace. Commercial payment methods (Stripe, Midtrans, Xendit, or Invoice PO) are bound idempotently, generating compliant tax invoices and issuing automated entitlement tokens directly to your Customer Control Plane.'
    },
    {
      q: 'Do you offer on-premise air-gapped deployments for sovereign entities?',
      a: 'Yes. Our Sovereign & GovCloud tier is packaged as self-hosted Kubernetes Helm charts with zero outbound telemetry dependencies, FIPS 140-3 Level 4 HSM integration, and quantum random number generator (QRNG) hardware support.'
    },
    {
      q: 'Is there a free trial available?',
      a: 'Yes. Every new organization receives a 14-day full-feature trial of our Advanced Posture & AI plan with zero credit card required to connect initial cloud environments.'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      
      {/* Header */}
      <section className="bg-slate-950 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Transparent Enterprise Pricing</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white max-w-3xl mx-auto">
            Predictable Security Investment for Every Stage
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mt-3 leading-relaxed">
            No hidden asset surcharges or unpredictable query fees. Scale your cloud security posture and post-quantum readiness with clarity.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-xs sm:text-sm font-semibold ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-7 rounded-full bg-slate-800 p-1 border border-slate-700 transition-colors relative"
            >
              <div
                className={`w-5 h-5 rounded-full bg-emerald-400 transition-transform ${
                  isAnnual ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-xs sm:text-sm font-semibold ${isAnnual ? 'text-white' : 'text-slate-400'}`}>
                Annual Billing
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] uppercase font-mono">
                Save 20%
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Pricing Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_TIERS.map((tier) => {
            const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;

            return (
              <div
                key={tier.id}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all ${
                  tier.popular
                    ? 'bg-slate-900 text-white border-2 border-emerald-500 shadow-2xl relative lg:-translate-y-4'
                    : 'bg-white text-slate-900 border border-slate-200 shadow-sm'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] uppercase font-mono tracking-wider">
                    {tier.badge}
                  </div>
                )}

                <div>
                  {!tier.popular && (
                    <div className="text-[11px] font-mono text-emerald-700 font-bold uppercase mb-1">
                      {tier.badge}
                    </div>
                  )}
                  <h3 className={`text-xl font-bold font-display ${tier.popular ? 'text-white' : 'text-slate-900'}`}>
                    {tier.name}
                  </h3>
                  <p className={`text-xs mt-2 min-h-[36px] leading-relaxed ${tier.popular ? 'text-slate-400' : 'text-slate-600'}`}>
                    {tier.description}
                  </p>

                  {/* Price Section */}
                  <div className="py-5 border-b border-slate-200/40">
                    {price > 0 ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-extrabold font-display">
                          ${price}
                        </span>
                        <span className={`text-xs ${tier.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                          / month
                        </span>
                      </div>
                    ) : (
                      <div className="text-2xl font-bold font-display">
                        Custom Sovereign
                      </div>
                    )}
                    <div className={`text-[11px] mt-1 ${tier.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                      {price > 0 
                        ? (isAnnual ? 'Billed annually ($' + (price * 12).toLocaleString() + '/yr)' : 'Billed monthly')
                        : 'Air-gapped & Defense quote'}
                    </div>
                  </div>

                  {/* Specs Quick Pill */}
                  <div className={`py-3 text-[11px] font-mono space-y-1 ${tier.popular ? 'text-slate-300' : 'text-slate-700'}`}>
                    <div>• Assets: <span className="font-bold">{tier.specs.cloudAssets}</span></div>
                    <div>• Compliance: <span className="font-bold">{tier.specs.complianceFrameworks}</span></div>
                    <div>• PQC Scans: <span className="font-bold">{tier.specs.pqcScanFrequency}</span></div>
                  </div>

                  {/* Feature Bullets */}
                  <div className="pt-3 space-y-2 text-xs">
                    <div className={`font-mono text-[10px] uppercase tracking-wider font-bold ${tier.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                      Included Features:
                    </div>
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${tier.popular ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        <span className={tier.popular ? 'text-slate-300' : 'text-slate-700'}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-6 mt-6 border-t border-slate-200/40">
                  <button
                    onClick={() => {
                      if (tier.id === 'sovereign' || tier.id === 'enterprise') {
                        onOpenDemo();
                      } else {
                        onOpenAuth('signup');
                      }
                    }}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                      tier.popular
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>{tier.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Cloud Asset ROI & Savings Calculator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Interactive ROI Model
              </div>
              <h3 className="text-2xl font-bold font-display text-slate-900">
                Calculate Your Posture & Compliance Time Savings
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Adjust the slider below to estimate how many manual audit hours and alert triaging cycles NusaSec automates for your cloud footprint.
              </p>

              {/* Slider */}
              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-xs font-mono font-semibold text-slate-700">
                  <span>Monitored Cloud Resources:</span>
                  <span className="text-emerald-700 text-sm">{assetCount.toLocaleString()} Assets</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={5000}
                  step={50}
                  value={assetCount}
                  onChange={(e) => setAssetCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>100 Nodes</span>
                  <span>2,500 Nodes</span>
                  <span>5,000+ Enterprise</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-slate-900 text-white border border-slate-800">
                <div className="text-xs text-slate-400 font-mono uppercase mb-1">
                  Annual Audit Hours Saved
                </div>
                <div className="text-3xl font-extrabold font-display text-emerald-400">
                  {estimatedAuditHoursSaved.toLocaleString()} hrs
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Automated SOC 2, ISO & OJK continuous evidence collection.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 text-white border border-slate-800">
                <div className="text-xs text-slate-400 font-mono uppercase mb-1">
                  False Alerts Filtered
                </div>
                <div className="text-3xl font-extrabold font-display text-blue-400">
                  {estimatedFalsePositiveReduction.toLocaleString()}/mo
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Reachable graph-based blast radius filtering.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Commercial Lifecycle Explanation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white border border-slate-800">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2">
            NusaSec-Core Commercial Workflow
          </div>
          <h3 className="text-xl font-bold font-display text-white mb-4">
            How Onboarding and Commercial Activation Operates
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono text-slate-300">
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-emerald-400 font-bold">1. Signup & Org Provision</div>
              <p className="text-slate-400 text-[11px]">Tenant isolation initialized with isolated encryption keys.</p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-emerald-400 font-bold">2. Commercial Checkout</div>
              <p className="text-slate-400 text-[11px]">Stripe / Midtrans / PO invoice with webhook idempotency.</p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-emerald-400 font-bold">3. Entitlement Issuance</div>
              <p className="text-slate-400 text-[11px]">Core issues cryptographically signed product capability tokens.</p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-emerald-400 font-bold">4. App-Customer Cockpit</div>
              <p className="text-slate-400 text-[11px]">Instant access to attack paths, compliance, and PQC tools.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center space-y-2 mb-8">
          <h3 className="text-2xl font-bold font-display text-slate-900">
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-slate-600">
            Have questions about compliance frameworks, cloud connectors, or enterprise licensing?
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, fIdx) => (
            <div
              key={fIdx}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === fIdx ? null : fIdx)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === fIdx ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
              </button>
              {openFaq === fIdx && (
                <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
