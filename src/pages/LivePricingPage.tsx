import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, CreditCard, Loader2, RefreshCw, Shield } from 'lucide-react';
import { getPublicJson } from '../lib/coreApi';
import { PRICING_TIERS } from '../data/mockCmsData';

interface LivePlan {
  code: string;
  display_name: string;
  category?: string;
  short_description?: string;
  trial_days?: number;
  features?: { code: string; display_name: string; description?: string }[];
  plans?: {
    code: string;
    display_name: string;
    positioning?: string;
    monthly_minor?: number | null;
    annual_minor?: number | null;
    currency?: string;
    included?: Record<string, unknown>;
  }[];
}

interface CatalogResponse {
  products: LivePlan[];
}

interface PricingTierFallback {
  id: string;
  name: string;
  description: string;
  badge?: string;
  popular?: boolean;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  ctaLabel: string;
}

interface LivePricingPageProps {
  onOpenDemo: () => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
}

const minorToMajor = (minor: number | null | undefined, currency = 'USD') => {
  if (minor == null) return null;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(minor / 100);
};

export const LivePricingPage: React.FC<LivePricingPageProps> = ({ onOpenDemo, onOpenAuth }) => {
  const [catalog, setCatalog] = useState<CatalogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [liveError, setLiveError] = useState<string | null>(null);
  const [isAnnual, setIsAnnual] = useState(true);

  const loadCatalog = async () => {
    setLoading(true);
    setLiveError(null);
    try {
      const response = await getPublicJson<CatalogResponse>('/products/catalog');
      if (!response?.products?.length) throw new Error('Core catalog kosong');
      setCatalog(response);
    } catch (error) {
      setCatalog(null);
      setLiveError(error instanceof Error ? error.message : 'Core catalog tidak dapat diakses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void loadCatalog(); }, []);

  const plans = useMemo<(LivePlan | PricingTierFallback)[]>(() => {
    if (catalog?.products?.length) return catalog.products;
    return PRICING_TIERS as PricingTierFallback[];
  }, [catalog]);

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <section className="relative bg-white text-slate-900 py-16 border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 text-xs font-mono mb-4">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Core-backed Commercial Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto">
            Predictable Security Investment for Every Stage
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-3 leading-relaxed">
            Pricing, plan availability, feature entitlements, and trial rules are published from NusaSec-Core.
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-xs sm:text-sm font-semibold ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>Monthly Billing</span>
            <button onClick={() => setIsAnnual((v) => !v)} className="w-14 h-7 rounded-full bg-slate-100 p-1 border border-slate-300 relative" aria-label="Toggle billing cycle">
              <div className={`w-5 h-5 rounded-full bg-blue-400 transition-transform ${isAnnual ? 'translate-x-7' : 'translate-x-0'}`} />
            </button>
            <span className={`text-xs sm:text-sm font-semibold ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>Annual Billing</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 flex items-center justify-center gap-3 text-slate-600">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading live catalog from NusaSec-Core…
          </div>
        ) : (
          <>
            {liveError && (
              <div className="mb-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800 flex items-center gap-3">
                <RefreshCw className="w-4 h-4 shrink-0" />
                <span>Core catalog belum dapat diakses. Menampilkan fallback pricing dari build.</span>
                <button onClick={() => void loadCatalog()} className="ml-auto font-semibold underline">Coba lagi</button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan: any, index) => {
                const isLive = Boolean(plan.code);
                const product = isLive ? plan as LivePlan : null;
                const fallback = !isLive ? plan as PricingTierFallback : null;
                const firstPlan = product?.plans?.[0];
                const monthly = product ? minorToMajor(firstPlan?.monthly_minor, firstPlan?.currency || 'USD') : `$${fallback!.monthlyPrice}`;
                const annual = product ? minorToMajor(firstPlan?.annual_minor, firstPlan?.currency || 'USD') : `$${fallback!.annualPrice}`;
                const price = isAnnual ? annual : monthly;
                const featureNames = product?.features?.slice(0, 8).map((f) => f.display_name) || fallback?.features || [];
                const popular = product?.plans?.some((p) => /popular|recommended|pro/i.test(`${p.positioning} ${p.display_name}`)) || fallback?.popular;
                const name = product?.display_name || fallback!.name;
                const description = product?.short_description || fallback!.description;

                const cardInner = (
                  <div className={`rounded-2xl p-6 flex flex-col justify-between h-full ${popular ? 'bg-slate-50 text-slate-900 border-2 border-blue-500/70 shadow-2xl' : 'bg-white text-slate-900 border border-slate-200 shadow-sm'}`}>
                    {popular && <div className="self-start px-2 py-0.5 rounded-full bg-blue-500 text-slate-950 font-bold text-[10px] uppercase font-mono">Recommended</div>}
                    <div>
                      <div className={`text-[10px] font-mono font-bold uppercase mb-1 ${popular ? 'text-blue-600' : 'text-blue-700'}`}>{product?.category || fallback?.badge || 'NusaSec'}</div>
                      <h3 className={`text-xl font-bold ${popular ? 'text-slate-900' : 'text-slate-900'}`}>{name}</h3>
                      <p className={`text-xs mt-2 min-h-[48px] leading-relaxed ${popular ? 'text-slate-500' : 'text-slate-600'}`}>{description}</p>

                      <div className={`py-5 border-b ${popular ? 'border-slate-200' : 'border-slate-200'}`}>
                        <span className="text-3xl sm:text-4xl font-extrabold">{price || 'Custom'}</span>
                        {price && <span className={`text-xs ml-1 ${popular ? 'text-slate-500' : 'text-slate-500'}`}>/ month</span>}
                      </div>

                      <div className="pt-4 space-y-2">
                        <div className={`text-[10px] font-mono uppercase tracking-wider font-bold ${popular ? 'text-slate-500' : 'text-slate-500'}`}>Included</div>
                        {featureNames.map((feature) => (
                          <div key={feature} className="flex items-start gap-2 text-xs">
                            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${popular ? 'text-blue-600' : 'text-blue-600'}`} />
                            <span className={popular ? 'text-slate-600' : 'text-slate-700'}>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {product?.trial_days != null && (
                        <div className={`mt-4 text-[11px] font-mono ${popular ? 'text-blue-300' : 'text-blue-700'}`}>{product.trial_days}-day trial</div>
                      )}
                    </div>

                    <div className={`pt-6 mt-6 border-t ${popular ? 'border-slate-200' : 'border-slate-200'}`}>
                      <button onClick={() => onOpenAuth('signup')} className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 ${popular ? 'bg-blue-500 hover:bg-blue-400 text-slate-950' : 'bg-slate-50 hover:bg-slate-100 text-slate-900'}`}>
                        Start with NusaSec <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );

                return (
                  <div key={product?.code || fallback?.id || index}>
                    {cardInner}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-slate-50 text-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0"><Shield className="w-4 h-4 text-blue-600" /></div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold mb-1">System of Record</div>
              <h3 className="text-xl font-bold">Commercial truth stays in NusaSec-Core</h3>
              <p className="text-xs text-slate-500 mt-2 max-w-3xl">The public site does not own pricing, entitlements, or payment state. It presents the public catalog from Core and hands account creation and checkout to the Core-backed customer plane.</p>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button onClick={onOpenDemo} className="px-5 py-2.5 rounded-xl bg-blue-500 text-slate-950 font-bold text-xs">Book a technical briefing</button>
            <button onClick={() => void loadCatalog()} className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-semibold text-xs">Refresh Core catalog</button>
          </div>
        </div>
      </div>
    </div>
  );
};
