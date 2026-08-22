import React, { useEffect, useState } from 'react';
import { Cookie, CheckCircle2, Lock } from 'lucide-react';
import { Language } from '../data/translations';

interface CookiePreferencesPageProps {
  language?: Language;
}

type CookieCategoryId = 'necessary' | 'performance' | 'functional' | 'marketing';

interface CookiePrefs {
  necessary: true; // always on, not user-toggleable
  performance: boolean;
  functional: boolean;
  marketing: boolean;
}

const STORAGE_KEY = 'nusasec_cookie_prefs_v1';

const defaultPrefs: CookiePrefs = {
  necessary: true,
  performance: true,
  functional: true,
  marketing: false,
};

const Toggle: React.FC<{ checked: boolean; disabled?: boolean; onChange: () => void }> = ({ checked, disabled, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={onChange}
    className={`relative w-11 h-6 rounded-full shrink-0 transition-colors ${
      disabled ? 'bg-blue-300 cursor-not-allowed' : checked ? 'bg-blue-600' : 'bg-slate-300'
    }`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
        checked ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);

export const CookiePreferencesPage: React.FC<CookiePreferencesPageProps> = ({ language = 'id' }) => {
  const isId = language === 'id';
  const [prefs, setPrefs] = useState<CookiePrefs>(defaultPrefs);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setPrefs({ ...defaultPrefs, ...JSON.parse(raw) });
    } catch {
      // ignore malformed/absent storage
    }
  }, []);

  const toggle = (id: CookieCategoryId) => {
    if (id === 'necessary') return;
    setPrefs((p) => ({ ...p, [id]: !p[id] }));
    setSaved(false);
  };

  const save = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
    } catch {
      // storage unavailable — nothing to persist
    }
  };

  const acceptAll = () => {
    const all: CookiePrefs = { necessary: true, performance: true, functional: true, marketing: true };
    setPrefs(all);
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); } catch {}
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const rejectOptional = () => {
    const minimal: CookiePrefs = { necessary: true, performance: false, functional: false, marketing: false };
    setPrefs(minimal);
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(minimal)); } catch {}
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const categories: { id: CookieCategoryId; title: string; desc: string }[] = [
    {
      id: 'necessary',
      title: isId ? 'Sangat Diperlukan' : 'Strictly Necessary',
      desc: isId
        ? 'Diperlukan agar situs berfungsi: autentikasi sesi login, keamanan CSRF, dan preferensi bahasa. Tidak dapat dinonaktifkan.'
        : 'Required for the site to function: login session authentication, CSRF protection, and language preference. Cannot be disabled.',
    },
    {
      id: 'performance',
      title: isId ? 'Kinerja & Analitik' : 'Performance & Analytics',
      desc: isId
        ? 'Membantu kami memahami cara pengunjung menggunakan situs (halaman yang dilihat, waktu muat) agar dapat kami tingkatkan. Data bersifat agregat dan anonim.'
        : 'Helps us understand how visitors use the site (pages viewed, load times) so we can improve it. Data is aggregated and anonymized.',
    },
    {
      id: 'functional',
      title: isId ? 'Fungsional' : 'Functional',
      desc: isId
        ? 'Mengingat preferensi Anda (mis. filter yang dipilih, status widget AI) agar pengalaman lebih personal saat kembali berkunjung.'
        : 'Remembers your preferences (e.g. selected filters, AI widget state) for a more personalized experience on return visits.',
    },
    {
      id: 'marketing',
      title: isId ? 'Pemasaran' : 'Marketing',
      desc: isId
        ? 'Digunakan untuk mengukur efektivitas kampanye dan menampilkan konten relevan di platform pihak ketiga. Nonaktif secara default.'
        : 'Used to measure campaign effectiveness and show relevant content on third-party platforms. Off by default.',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <section className="relative bg-white text-slate-900 py-14 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 text-xs font-mono">
            <Cookie className="w-3.5 h-3.5" />
            <span>{isId ? 'Preferensi Cookie' : 'Cookie Preferences'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">
            {isId ? 'Kelola Preferensi Cookie Anda' : 'Manage Your Cookie Preferences'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            {isId
              ? 'Kami menggunakan cookie untuk menjalankan situs ini dan (jika Anda izinkan) memahami penggunaannya. Atur kategori di bawah sesuai preferensi Anda — perubahan berlaku di perangkat dan peramban ini.'
              : 'We use cookies to run this site and, if you allow it, to understand how it\'s used. Adjust the categories below to your preference — changes apply on this device and browser.'}
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={acceptAll}
            className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
          >
            {isId ? 'Terima Semua' : 'Accept All'}
          </button>
          <button
            onClick={rejectOptional}
            className="flex-1 px-4 py-2.5 rounded-lg bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-sm font-semibold transition-colors"
          >
            {isId ? 'Tolak yang Opsional' : 'Reject Optional'}
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-200">
          {categories.map((cat) => (
            <div key={cat.id} className="p-5 sm:p-6 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-sm text-slate-900 font-display">{cat.title}</h3>
                  {cat.id === 'necessary' && (
                    <span className="flex items-center gap-1 text-[10px] font-mono uppercase text-blue-600">
                      <Lock className="w-3 h-3" />
                      {isId ? 'Selalu Aktif' : 'Always On'}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{cat.desc}</p>
              </div>
              <Toggle
                checked={prefs[cat.id]}
                disabled={cat.id === 'necessary'}
                onChange={() => toggle(cat.id)}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={save}
            className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors"
          >
            {isId ? 'Simpan Preferensi' : 'Save Preferences'}
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              {isId ? 'Preferensi disimpan' : 'Preferences saved'}
            </span>
          )}
        </div>

        <p className="text-xs text-slate-400 pt-4">
          {isId
            ? 'Untuk detail lengkap tentang jenis cookie dan pihak ketiga yang kami gunakan, lihat Kebijakan Privasi kami.'
            : 'For full details on the cookie types and third parties we use, see our Privacy Policy.'}
        </p>
      </div>
    </div>
  );
};
