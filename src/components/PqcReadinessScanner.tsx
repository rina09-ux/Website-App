import React, { useState } from 'react';
import { 
  Shield, 
  Cpu, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  RefreshCw,
  Cloud,
  FileCheck,
  Zap,
  Info
} from 'lucide-react';

interface ScannerProps {
  onBookDemo: () => void;
}

export const PqcReadinessScanner: React.FC<ScannerProps> = ({ onBookDemo }) => {
  const [clouds, setClouds] = useState<string[]>(['AWS', 'Kubernetes']);
  const [ciphers, setCiphers] = useState<string[]>(['RSA-2048', 'ECC P-256']);
  const [compliance, setCompliance] = useState<string[]>(['ISO 27001', 'SOC 2']);
  const [dataLifespan, setDataLifespan] = useState<'3y' | '7y' | '10y+'>('7y');
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);

  const toggleCloud = (c: string) => {
    setClouds(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  const toggleCipher = (cp: string) => {
    setCiphers(prev => prev.includes(cp) ? prev.filter(x => x !== cp) : [...prev, cp]);
  };

  const toggleCompliance = (comp: string) => {
    setCompliance(prev => prev.includes(comp) ? prev.filter(x => x !== comp) : [...prev, comp]);
  };

  const runEvaluation = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
    }, 800);
  };

  // Calculation logic
  const hasQuantumSafe = ciphers.includes('Hybrid ML-KEM-768') || ciphers.includes('ML-DSA (Dilithium)');
  const hasLegacyRsa = ciphers.includes('RSA-2048') || ciphers.includes('RSA-1024 / SHA-1');
  
  let hndlRiskLevel = 'HIGH';
  let postureScore = 64;
  let agilityLevel = 'Level 1 (Classical Legacy)';

  if (hasQuantumSafe && !hasLegacyRsa) {
    hndlRiskLevel = 'LOW';
    postureScore = 96;
    agilityLevel = 'Level 4 (Post-Quantum Native)';
  } else if (hasQuantumSafe && hasLegacyRsa) {
    hndlRiskLevel = 'MODERATE';
    postureScore = 82;
    agilityLevel = 'Level 3 (Hybrid Transitional)';
  } else if (ciphers.includes('ECC P-384') && !hasLegacyRsa) {
    hndlRiskLevel = dataLifespan === '10y+' ? 'HIGH' : 'MODERATE';
    postureScore = 74;
    agilityLevel = 'Level 2 (Crypto Inventory Aware)';
  } else {
    hndlRiskLevel = dataLifespan === '10y+' ? 'CRITICAL' : 'HIGH';
    postureScore = 52;
    agilityLevel = 'Level 1 (Vulnerable to HNDL)';
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl relative overflow-hidden">
      
      {/* Background Accent Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-md bg-blue-500/10 border border-blue-200 text-blue-600">
              <Cpu className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-mono tracking-widest text-blue-600 font-semibold">
              Interactive Assessment Engine
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            NusaSec Post-Quantum & Cloud Posture Analyzer
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Simulate your infrastructure stack against NIST FIPS 203/204/205 and continuous compliance benchmarks.
          </p>
        </div>

        <button
          onClick={runEvaluation}
          disabled={isScanning}
          className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shrink-0"
        >
          {isScanning ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing Graph...</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              <span>Run Assessment</span>
            </>
          )}
        </button>
      </div>

      {/* Config Selectors Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-b border-slate-200 text-xs">
        
        {/* Step 1: Cloud Providers */}
        <div>
          <label className="block font-semibold text-slate-600 mb-2.5 uppercase font-mono text-[11px]">
            1. Cloud Environments
          </label>
          <div className="space-y-1.5">
            {['AWS', 'Google Cloud', 'Microsoft Azure', 'Kubernetes', 'On-Prem / Private HSM'].map(c => (
              <button
                key={c}
                type="button"
                onClick={() => toggleCloud(c)}
                className={`w-full text-left px-3 py-2 rounded-lg border transition-all flex items-center justify-between ${
                  clouds.includes(c)
                    ? 'bg-blue-500/10 border-blue-200 text-blue-300 font-medium'
                    : 'bg-slate-100/60 border-slate-300/60 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <span>{c}</span>
                {clouds.includes(c) && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Cryptographic Suites */}
        <div>
          <label className="block font-semibold text-slate-600 mb-2.5 uppercase font-mono text-[11px]">
            2. Active Encryption Suites
          </label>
          <div className="space-y-1.5">
            {[
              'RSA-2048', 
              'ECC P-256', 
              'ECC P-384', 
              'Hybrid ML-KEM-768', 
              'ML-DSA (Dilithium)', 
              'RSA-1024 / SHA-1'
            ].map(cp => (
              <button
                key={cp}
                type="button"
                onClick={() => toggleCipher(cp)}
                className={`w-full text-left px-3 py-2 rounded-lg border transition-all flex items-center justify-between ${
                  ciphers.includes(cp)
                    ? 'bg-blue-500/10 border-blue-200 text-blue-300 font-medium'
                    : 'bg-slate-100/60 border-slate-300/60 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <span className="font-mono text-[11px]">{cp}</span>
                {ciphers.includes(cp) && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Compliance Frameworks */}
        <div>
          <label className="block font-semibold text-slate-600 mb-2.5 uppercase font-mono text-[11px]">
            3. Regulatory Frameworks
          </label>
          <div className="space-y-1.5">
            {['ISO 27001:2022', 'SOC 2 Type II', 'OJK POJK 11/2022', 'PCI-DSS v4.0', 'NIST SP 800-207'].map(comp => (
              <button
                key={comp}
                type="button"
                onClick={() => toggleCompliance(comp)}
                className={`w-full text-left px-3 py-2 rounded-lg border transition-all flex items-center justify-between ${
                  compliance.includes(comp)
                    ? 'bg-amber-500/10 border-amber-200 text-amber-300 font-medium'
                    : 'bg-slate-100/60 border-slate-300/60 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <span>{comp}</span>
                {compliance.includes(comp) && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />}
              </button>
            ))}
          </div>
        </div>

        {/* Step 4: Data Lifespan */}
        <div>
          <label className="block font-semibold text-slate-600 mb-2.5 uppercase font-mono text-[11px]">
            4. Data Confidentiality Lifespan
          </label>
          <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
            Data intercepted today under <em>Harvest-Now-Decrypt-Later</em> stays vulnerable for its full retention lifespan.
          </p>
          <div className="space-y-2">
            {[
              { id: '3y', label: '1 - 3 Years', desc: 'Ephemeral transaction records' },
              { id: '7y', label: '5 - 7 Years', desc: 'Standard financial & audit records' },
              { id: '10y+', label: '10+ Years / Sovereign', desc: 'State secrets, health & biometric PII' }
            ].map(tier => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setDataLifespan(tier.id as any)}
                className={`w-full text-left p-2.5 rounded-lg border transition-all ${
                  dataLifespan === tier.id
                    ? 'bg-purple-500/10 border-purple-200 text-purple-200'
                    : 'bg-slate-100/60 border-slate-300/60 text-slate-500 hover:bg-slate-100'
                }`}
              >
                <div className="font-semibold text-xs text-slate-900">{tier.label}</div>
                <div className="text-[10px] text-slate-500">{tier.desc}</div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Results Dashboard Preview */}
      <div className="relative z-10 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          
          {/* Posture Score */}
          <div className="p-4 rounded-xl bg-white/70 border border-slate-200">
            <div className="text-[11px] text-slate-500 uppercase font-mono mb-1">
              Estimated NusaSec Posture Score
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-extrabold font-display ${
                postureScore >= 80 ? 'text-blue-600' : postureScore >= 60 ? 'text-amber-600' : 'text-red-600'
              }`}>
                {postureScore}/100
              </span>
              <span className="text-xs text-slate-500">
                {postureScore >= 80 ? 'Optimal' : postureScore >= 60 ? 'Moderate Risk' : 'Action Required'}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  postureScore >= 80 ? 'bg-blue-400' : postureScore >= 60 ? 'bg-amber-400' : 'bg-red-400'
                }`}
                style={{ width: `${postureScore}%` }}
              />
            </div>
          </div>

          {/* HNDL Risk Index */}
          <div className="p-4 rounded-xl bg-white/70 border border-slate-200">
            <div className="text-[11px] text-slate-500 uppercase font-mono mb-1">
              Quantum Interception (HNDL) Risk
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xl font-bold font-mono px-2 py-0.5 rounded ${
                hndlRiskLevel === 'LOW' 
                  ? 'text-blue-600 bg-blue-50 border border-blue-200' 
                  : hndlRiskLevel === 'MODERATE'
                  ? 'text-amber-600 bg-amber-50 border border-amber-200'
                  : 'text-red-600 bg-red-50 border border-red-200'
              }`}>
                {hndlRiskLevel}
              </span>
              <span className="text-xs text-slate-500">
                {dataLifespan === '10y+' ? '10yr confidentiality exposure' : 'Standard exposure'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2.5">
              {hasLegacyRsa 
                ? 'Classical RSA/ECC algorithms present. Immediate CBOM inventory recommended.' 
                : 'PQC hybrid algorithms active for critical endpoints.'}
            </p>
          </div>

          {/* Post-Quantum Agility Tier */}
          <div className="p-4 rounded-xl bg-white/70 border border-slate-200">
            <div className="text-[11px] text-slate-500 uppercase font-mono mb-1">
              Crypto-Agility Readiness Tier
            </div>
            <div className="text-sm font-semibold text-slate-900 font-mono text-blue-600">
              {agilityLevel}
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Complies with NIST FIPS 203 (ML-KEM) and FIPS 204 (ML-DSA) roadmap milestones.
            </p>
          </div>

        </div>

        {/* 3-Step Recommendation Plan */}
        <div className="p-4 sm:p-5 rounded-xl bg-white/90 border border-slate-200/90 space-y-3">
          <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            <span>NusaSec Automated Migration Blueprint for your Stack</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600 pt-1">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="font-semibold text-blue-600 mb-1">Phase 1: Automated CBOM</div>
              <p className="text-slate-500 text-[11px]">
                Continuous inventory across {clouds.join(', ')} discovering hardcoded certificates and deprecated cipher suites.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="font-semibold text-blue-600 mb-1">Phase 2: Hybrid TLS 1.3</div>
              <p className="text-slate-500 text-[11px]">
                Deploy dual-handshake proxies (X25519 + ML-KEM-768) ensuring legacy clients connect without downtime.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="font-semibold text-purple-600 mb-1">Phase 3: Continuous Audit</div>
              <p className="text-slate-500 text-[11px]">
                Feed cryptographically signed evidence into {compliance.join(' & ')} automated audit vaults.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-200">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-slate-500" />
              <span>Full cryptographic report available with enterprise consultation.</span>
            </div>
            <button
              onClick={onBookDemo}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Schedule Architecture Review</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
