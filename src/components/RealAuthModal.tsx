import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Building2, CheckCircle2, ChevronDown, KeyRound, Lock, Search, Shield, X } from 'lucide-react';
import { login, signup, verifyMfa, LoginResult, SignupPayload } from '../lib/coreApi';
import { redirectToPlane, GOOGLE_LOGIN_URL } from '../lib/platform';
import { COUNTRIES } from '../data/countries';

interface RealAuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup';
  onClose: () => void;
  onNavigateToPricing: () => void;
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
      <path fill="#4285F4" d="M21.35 12.23c0-.7-.06-1.37-.18-2.02H12v3.82h5.24a4.48 4.48 0 0 1-1.95 2.95v2.46h3.15c1.84-1.7 2.91-4.2 2.91-7.21Z" />
      <path fill="#34A853" d="M12 21.75c2.63 0 4.84-.87 6.45-2.35l-3.15-2.46c-.88.59-2 1-3.3 1-2.54 0-4.7-1.72-5.47-4.03H3.27v2.54A9.75 9.75 0 0 0 12 21.75Z" />
      <path fill="#FBBC05" d="M6.53 13.91a5.87 5.87 0 0 1 0-3.76V7.61H3.27a9.75 9.75 0 0 0 0 8.84l3.26-2.54Z" />
      <path fill="#EA4335" d="M12 6.12c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.23 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.73 5.36l3.26 2.54C7.3 7.84 9.46 6.12 12 6.12Z" />
    </svg>
  );
}

type SignupState = 'form' | 'verification';

export const RealAuthModal: React.FC<RealAuthModalProps> = ({ isOpen, initialMode = 'login', onClose, onNavigateToPricing }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [signupState, setSignupState] = useState<SignupState>('form');

  // Login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [pending, setPending] = useState<LoginResult | null>(null);

  // Signup fields
  const [displayName, setDisplayName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [countryCode, setCountryCode] = useState('ID');
  const [countryQuery, setCountryQuery] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [timezone, setTimezone] = useState('Asia/Jakarta');
  const [signupTenant, setSignupTenant] = useState<string | null>(null);
  const countryFieldRef = useRef<HTMLDivElement | null>(null);

  const selectedCountry = useMemo(
    () => COUNTRIES.find((c) => c.code === countryCode) || null,
    [countryCode],
  );

  const filteredCountries = useMemo(() => {
    const q = countryQuery.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter((c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
  }, [countryQuery]);

  // Timezone otomatis mengikuti ibu kota negara yang dipilih — klien tidak perlu mengisi manual
  useEffect(() => {
    if (selectedCountry) setTimezone(selectedCountry.timezone);
  }, [selectedCountry]);

  // Tutup dropdown saat klik di luar area combobox negara
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryFieldRef.current && !countryFieldRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signupReady = useMemo(() => (
    displayName.trim().length >= 2 &&
    email.trim().includes('@') &&
    password.length >= 12 &&
    organizationName.trim().length >= 2
  ), [displayName, email, password, organizationName]);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setSignupState('form');
      setPending(null);
      setError(null);
      setCode('');
      setCountryQuery('');
      setIsCountryDropdownOpen(false);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const changeMode = (nextMode: 'login' | 'signup') => {
    setMode(nextMode);
    setSignupState('form');
    setPending(null);
    setCode('');
    setError(null);
  };

  const submitLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await login(email.trim(), password);
      if (result.status === 'mfa_required') {
        setPending(result);
      } else if (result.user) {
        redirectToPlane(result.user.user_type);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login gagal.');
    } finally {
      setLoading(false);
    }
  };

  const submitMfa = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!pending?.challenge_id || !pending.challenge_token) return;
    setError(null);
    setLoading(true);
    try {
      const result = await verifyMfa(pending.challenge_id, pending.challenge_token, code.trim(), 'totp');
      if (result.user) redirectToPlane(result.user.user_type);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verifikasi MFA gagal.');
    } finally {
      setLoading(false);
    }
  };

  const submitSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!signupReady) return;
    setError(null);
    setLoading(true);
    try {
      const payload: SignupPayload = {
        email: email.trim(),
        password,
        display_name: displayName.trim(),
        organization_name: organizationName.trim(),
        country_code: countryCode,
        timezone,
      };
      const result = await signup(payload);
      setSignupTenant(result.organization?.tenant_id || null);
      setSignupState('verification');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Pendaftaran gagal.');
    } finally {
      setLoading(false);
    }
  };

  const continueWithGoogle = () => {
    window.location.assign(GOOGLE_LOGIN_URL);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} aria-label="Close" />
      <div className="relative z-10 w-full max-w-md rounded-2xl">
      <div className="relative w-full bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100" aria-label="Close"><X className="w-5 h-5" /></button>

        <div className="flex items-center gap-3 mb-6">
          <div className="relative w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center overflow-hidden">
            <span className="absolute inset-0 rounded-xl bg-blue-400/20 blur-md glow-pulse-dot" />
            <Shield className="relative w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="font-semibold">NusaSec Account Access</div>
            <div className="text-[11px] text-slate-500">Authentication is enforced by NusaSec-Core.</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-5">
          <button onClick={() => changeMode('login')} className={`rounded-xl px-3 py-2 text-sm ${mode === 'login' ? 'bg-blue-500 text-slate-950 font-semibold' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>Sign in</button>
          <button onClick={() => changeMode('signup')} className={`rounded-xl px-3 py-2 text-sm ${mode === 'signup' ? 'bg-blue-500 text-slate-950 font-semibold' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>Create account</button>
        </div>

        {mode === 'signup' && signupState === 'verification' ? (
          <div className="space-y-5">
            <div className="flex justify-center">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
              </div>
            </div>
            <div className="text-center">
              <h2 className="font-semibold text-slate-900 text-lg">Check your email</h2>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                We created your customer organization and sent a verification link to <span className="font-medium text-slate-700">{email}</span>.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
              Verify the email first, then return here and sign in. Your workspace is not activated by the signup form alone.
              {signupTenant && <div className="mt-2 text-[11px] text-slate-400">Tenant provisioning reference: {signupTenant}</div>}
            </div>
            <button type="button" onClick={() => { setMode('login'); setSignupState('form'); setPassword(''); setError(null); }} className="w-full rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-semibold py-3 flex items-center justify-center gap-2">
              Continue to sign in
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : mode === 'login' && pending?.status === 'mfa_required' ? (
          <form onSubmit={submitMfa} className="space-y-4">
            <div className="text-center">
              <div className="w-11 h-11 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto mb-3"><KeyRound className="w-5 h-5 text-blue-600" /></div>
              <div className="font-semibold">MFA verification required</div>
              <div className="text-xs text-slate-500 mt-1">Enter the TOTP code for your NusaSec account.</div>
            </div>
            <input autoFocus value={code} onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 8))} inputMode="numeric" maxLength={8} className="w-full text-center tracking-[0.45em] font-mono text-lg py-3 bg-white border border-slate-300 rounded-xl outline-none focus:border-blue-500 text-slate-900" placeholder="000000" />
            {error && <div className="text-xs text-red-300 border border-red-500/30 bg-red-500/10 rounded-xl p-3">{error}</div>}
            <button disabled={loading || code.length < 6} className="w-full rounded-xl bg-blue-500 text-slate-950 font-semibold py-3 disabled:opacity-40">{loading ? 'Verifying…' : 'Verify & continue'}</button>
          </form>
        ) : mode === 'signup' ? (
          <form onSubmit={submitSignup} className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 flex items-start gap-2">
              <Building2 className="w-4 h-4 text-blue-600 mt-0.5" />
              Your account and organization are provisioned by NusaSec-Core. The public site does not create a parallel customer database.
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full name</label>
              <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} type="text" autoComplete="name" required className="w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-sm outline-none focus:border-blue-500 text-slate-900" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Work email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" required className="w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-sm outline-none focus:border-blue-500 text-slate-900" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Organization name</label>
              <input value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} type="text" autoComplete="organization" required className="w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-sm outline-none focus:border-blue-500 text-slate-900" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div ref={countryFieldRef} className="relative">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Country</label>
                <button
                  type="button"
                  onClick={() => { setIsCountryDropdownOpen((prev) => !prev); setCountryQuery(''); }}
                  className="w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-sm text-left outline-none focus:border-blue-500 text-slate-900 flex items-center justify-between gap-2"
                >
                  <span className="truncate">{selectedCountry ? selectedCountry.name : 'Select a country'}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isCountryDropdownOpen && (
                  <div className="absolute z-20 mt-1.5 w-full sm:w-[280px] bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
                    <div className="p-2 border-b border-slate-100">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          autoFocus
                          value={countryQuery}
                          onChange={(e) => setCountryQuery(e.target.value)}
                          placeholder="Cari negara..."
                          className="w-full pl-8 pr-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500 text-slate-900"
                        />
                      </div>
                    </div>
                    <div className="max-h-52 overflow-y-auto">
                      {filteredCountries.length === 0 ? (
                        <div className="px-3.5 py-3 text-xs text-slate-400">Negara tidak ditemukan.</div>
                      ) : filteredCountries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => { setCountryCode(country.code); setIsCountryDropdownOpen(false); setCountryQuery(''); }}
                          className={`w-full text-left px-3.5 py-2.5 text-sm hover:bg-slate-50 flex items-center justify-between gap-2 ${country.code === countryCode ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700'}`}
                        >
                          <span className="truncate">{country.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono shrink-0">{country.code}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Timezone</label>
                <input value={timezone} readOnly disabled className="w-full px-3.5 py-3 bg-slate-100 border border-slate-200 rounded-xl text-sm outline-none text-slate-500 cursor-not-allowed" />
                <div className="mt-1.5 text-[11px] text-slate-400">Otomatis mengikuti negara yang dipilih.</div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="new-password" minLength={12} required className="w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-sm outline-none focus:border-blue-500 text-slate-900" />
              <div className="mt-1.5 text-[11px] text-slate-400">Use at least 12 characters.</div>
            </div>

            {error && <div className="text-xs text-red-300 border border-red-500/30 bg-red-500/10 rounded-xl p-3">{error}</div>}

            <button disabled={loading || !signupReady} className="btn-shimmer w-full rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-semibold py-3 flex items-center justify-center gap-2 disabled:opacity-40">
              {loading ? 'Creating account…' : 'Create account'}
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="relative py-1"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div><div className="relative flex justify-center"><span className="bg-white px-3 text-[11px] text-slate-400">Continue with</span></div></div>

            <button type="button" onClick={continueWithGoogle} aria-label="Continue with Google" title="Continue with Google" className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center gap-3 hover:bg-slate-100 transition-colors">
              <GoogleMark />
              <span className="text-sm font-semibold text-slate-700">Continue with Google</span>
            </button>

            <button type="button" onClick={onNavigateToPricing} className="w-full text-xs text-slate-500 hover:text-blue-600 text-center">Review plans first</button>
          </form>
        ) : (
          <form onSubmit={submitLogin} className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 flex items-start gap-2"><Lock className="w-4 h-4 text-blue-600 mt-0.5" /> Session, CSRF, MFA and tenant authorization are handled by the Core API.</div>
            <div><label className="block text-xs font-semibold text-slate-700 mb-1.5">Email</label><input value={email} onChange={e => setEmail(e.target.value)} type="email" required autoComplete="email" className="w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-sm outline-none focus:border-blue-500 text-slate-900" /></div>
            <div><label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label><input value={password} onChange={e => setPassword(e.target.value)} type="password" required autoComplete="current-password" className="w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-sm outline-none focus:border-blue-500 text-slate-900" /></div>
            {error && <div className="text-xs text-red-300 border border-red-500/30 bg-red-500/10 rounded-xl p-3">{error}</div>}
            <button disabled={loading} className="btn-shimmer w-full rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-semibold py-3 flex items-center justify-center gap-2 disabled:opacity-40">{loading ? 'Signing in…' : 'Sign in'} <ArrowRight className="w-4 h-4" /></button>

            <div className="relative py-1"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div><div className="relative flex justify-center"><span className="bg-white px-3 text-[11px] text-slate-400">Continue with</span></div></div>

            <button type="button" onClick={continueWithGoogle} aria-label="Continue with Google" title="Continue with Google" className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center gap-3 hover:bg-slate-100 transition-colors">
              <GoogleMark />
              <span className="text-sm font-semibold text-slate-700">Continue with Google</span>
            </button>

            <div className="text-[11px] text-slate-500 text-center">Internal users are routed to the internal operating plane; customer users are routed to the customer control plane.</div>
          </form>
        )}
      </div>
      </div>
    </div>
  );
};
