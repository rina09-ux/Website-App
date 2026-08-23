import React, { useState } from 'react';
import { Shield, Cpu, CheckCircle2, ArrowRight, RefreshCw, Zap, Info } from 'lucide-react';

interface ScannerProps { onBookDemo: () => void; }

type Result = {
  posture_score: number;
  hndl_risk: string;
  crypto_agility: string;
  has_quantum_safe: boolean;
  has_legacy_classical: boolean;
};

const CORE_API_URL = (import.meta.env.VITE_NUSASEC_CORE_API_URL || import.meta.env.VITE_NUSASEC_CORE_URL || '').replace(/\/$/, '');

export const PqcReadinessScanner: React.FC<ScannerProps> = ({ onBookDemo }) => {
  const [clouds, setClouds] = useState<string[]>(['AWS', 'Kubernetes']);
  const [ciphers, setCiphers] = useState<string[]>(['RSA-2048', 'ECC P-256']);
  const [compliance, setCompliance] = useState<string[]>(['ISO 27001', 'SOC 2']);
  const [dataLifespan, setDataLifespan] = useState<'3y' | '7y' | '10y+'>('7y');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggle = (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.includes(value) ? prev.filter(x => x !== value) : [...prev, value]);
  };

  const runEvaluation = async () => {
    if (!CORE_API_URL) { setError('Core public endpoint belum dikonfigurasi.'); return; }
    setIsScanning(true);
    setError(null);
    try {
      const response = await fetch(`${CORE_API_URL}/api/v1/public/pqc-assessments/estimate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ clouds, ciphers, compliance, data_lifespan: dataLifespan }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(typeof body?.detail === 'string' ? body.detail : `Assessment failed (${response.status})`);
      setResult(body.result as Result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Assessment gagal dijalankan.');
      setResult(null);
    } finally { setIsScanning(false); }
  };

  const postureScore = result?.posture_score ?? null;
  const hndlRiskLevel = result?.hndl_risk ?? 'UNKNOWN';
  const agilityLevel = result?.crypto_agility ?? 'Not assessed';

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5"><span className="p-1.5 rounded-md bg-blue-500/10 border border-blue-200 text-blue-600"><Cpu className="w-4 h-4" /></span><span className="text-xs uppercase font-mono tracking-widest text-blue-600 font-semibold">Interactive Assessment Engine</span></div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900">NusaSec Post-Quantum & Cloud Posture Analyzer</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Server-generated public estimator. This is not a live tenant/cloud scan.</p>
        </div>
        <button onClick={() => void runEvaluation()} disabled={isScanning} className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shrink-0">
          {isScanning ? <><RefreshCw className="w-4 h-4 animate-spin" /><span>Analyzing…</span></> : <><Zap className="w-4 h-4" /><span>Run Assessment</span></>}
        </button>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-b border-slate-200 text-xs">
        <div><label className="block font-semibold text-slate-600 mb-2.5 uppercase font-mono text-[11px]">1. Cloud Environments</label><div className="space-y-1.5">{['AWS','Google Cloud','Microsoft Azure','Kubernetes','On-Prem / Private HSM'].map(c => <button key={c} type="button" onClick={() => toggle(c,setClouds)} className={`w-full text-left px-3 py-2 rounded-lg border transition-all flex items-center justify-between ${clouds.includes(c)?'bg-blue-500/10 border-blue-200 text-blue-700 font-medium':'bg-slate-100/60 border-slate-300/60 text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}><span>{c}</span>{clouds.includes(c)&&<CheckCircle2 className="w-3.5 h-3.5 text-blue-600"/>}</button>)}</div></div>
        <div><label className="block font-semibold text-slate-600 mb-2.5 uppercase font-mono text-[11px]">2. Active Encryption Suites</label><div className="space-y-1.5">{['RSA-2048','ECC P-256','ECC P-384','Hybrid ML-KEM-768','ML-DSA (Dilithium)','RSA-1024 / SHA-1'].map(cp => <button key={cp} type="button" onClick={() => toggle(cp,setCiphers)} className={`w-full text-left px-3 py-2 rounded-lg border transition-all flex items-center justify-between ${ciphers.includes(cp)?'bg-blue-500/10 border-blue-200 text-blue-700 font-medium':'bg-slate-100/60 border-slate-300/60 text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}><span className="font-mono text-[11px]">{cp}</span>{ciphers.includes(cp)&&<CheckCircle2 className="w-3.5 h-3.5 text-blue-600"/>}</button>)}</div></div>
        <div><label className="block font-semibold text-slate-600 mb-2.5 uppercase font-mono text-[11px]">3. Regulatory Frameworks</label><div className="space-y-1.5">{['ISO 27001:2022','SOC 2 Type II','OJK POJK 11/2022','PCI-DSS v4.0','NIST SP 800-207'].map(comp => <button key={comp} type="button" onClick={() => toggle(comp,setCompliance)} className={`w-full text-left px-3 py-2 rounded-lg border transition-all flex items-center justify-between ${compliance.includes(comp)?'bg-amber-500/10 border-amber-200 text-amber-700 font-medium':'bg-slate-100/60 border-slate-300/60 text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}><span>{comp}</span>{compliance.includes(comp)&&<CheckCircle2 className="w-3.5 h-3.5 text-amber-600"/>}</button>)}</div></div>
        <div><label className="block font-semibold text-slate-600 mb-2.5 uppercase font-mono text-[11px]">4. Data Confidentiality Lifespan</label><p className="text-[11px] text-slate-500 mb-3 leading-relaxed">Use the expected retention horizon to estimate HNDL exposure.</p><div className="space-y-2">{[{id:'3y',label:'1 - 3 Years'},{id:'7y',label:'5 - 7 Years'},{id:'10y+',label:'10+ Years / Sovereign'}].map(tier => <button key={tier.id} type="button" onClick={() => setDataLifespan(tier.id as '3y'|'7y'|'10y+')} className={`w-full text-left p-2.5 rounded-lg border transition-all ${dataLifespan===tier.id?'bg-purple-500/10 border-purple-200 text-purple-800':'bg-slate-100/60 border-slate-300/60 text-slate-500 hover:bg-slate-100'}`}><div className="font-semibold text-xs text-slate-900">{tier.label}</div></button>)}</div></div>
      </div>

      {error && <div className="relative z-10 mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700">{error}</div>}

      <div className="relative z-10 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-white/70 border border-slate-200"><div className="text-[11px] text-slate-500 uppercase font-mono mb-1">Estimated NusaSec Posture Score</div><div className="flex items-baseline gap-2"><span className={`text-3xl font-extrabold font-display ${postureScore===null?'text-slate-400':postureScore>=80?'text-blue-600':postureScore>=60?'text-amber-600':'text-red-600'}`}>{postureScore===null?'—':`${postureScore}/100`}</span><span className="text-xs text-slate-500">{postureScore===null?'Run assessment':postureScore>=80?'Optimal':postureScore>=60?'Moderate Risk':'Action Required'}</span></div></div>
          <div className="p-4 rounded-xl bg-white/70 border border-slate-200"><div className="text-[11px] text-slate-500 uppercase font-mono mb-1">Quantum Interception (HNDL) Risk</div><div className="flex items-center gap-2"><span className="text-xl font-bold font-mono px-2 py-0.5 rounded text-slate-700 bg-slate-50 border border-slate-200">{hndlRiskLevel}</span><span className="text-xs text-slate-500">{dataLifespan==='10y+'?'10yr confidentiality exposure':'Standard exposure'}</span></div><p className="text-[11px] text-slate-500 mt-2.5">{result?.has_legacy_classical?'Classical algorithms present. CBOM inventory recommended.':'Run the estimator to receive a server-generated assessment.'}</p></div>
          <div className="p-4 rounded-xl bg-white/70 border border-slate-200"><div className="text-[11px] text-slate-500 uppercase font-mono mb-1">Crypto-Agility Readiness Tier</div><div className="text-sm font-semibold text-slate-900 font-mono text-blue-600">{agilityLevel}</div><p className="text-[11px] text-slate-500 mt-2">Public estimator only; live enterprise readiness requires authenticated Core evidence.</p></div>
        </div>

        <div className="p-4 sm:p-5 rounded-xl bg-white/90 border border-slate-200/90 space-y-3"><div className="text-xs font-semibold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2"><Shield className="w-4 h-4 text-blue-600"/><span>Assessment Scope</span></div><div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600 pt-1"><div className="p-3 rounded-lg bg-slate-50 border border-slate-200"><div className="font-semibold text-blue-600 mb-1">Public Estimator</div><p className="text-slate-500 text-[11px]">Calculates a server-side estimate from the inputs selected above.</p></div><div className="p-3 rounded-lg bg-slate-50 border border-slate-200"><div className="font-semibold text-blue-600 mb-1">Live Enterprise</div><p className="text-slate-500 text-[11px]">Uses authenticated cloud/PQC evidence, CBOM and tenant-scoped data from Core.</p></div><div className="p-3 rounded-lg bg-slate-50 border border-slate-200"><div className="font-semibold text-purple-600 mb-1">Next Step</div><p className="text-slate-500 text-[11px]">Schedule an architecture review to turn this estimator into a real assessment.</p></div></div><div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-200"><div className="text-xs text-slate-500 flex items-center gap-1.5"><Info className="w-3.5 h-3.5 text-slate-500"/><span>Estimator result is not an enterprise certification.</span></div><button onClick={onBookDemo} className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"><span>Schedule Architecture Review</span><ArrowRight className="w-3.5 h-3.5"/></button></div></div>
      </div>
    </div>
  );
};