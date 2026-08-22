import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Language } from '../data/translations';

interface FaqSectionProps {
  language?: Language;
  onOpenDemo: () => void;
  onOpenAi: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  language = 'id',
  onOpenDemo,
  onOpenAi,
}) => {
  const isId = language === 'id';
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqItems = [
    {
      q: isId 
        ? 'Apa itu Kriptografi Pasca-Kuantum (PQC) dan mengapa enterprise wajib bersiap sekarang?' 
        : 'What is Post-Quantum Cryptography (PQC) and why must enterprises prepare today?',
      category: 'PQC & CRYPTOGRAPHY',
      a: isId
        ? 'Kriptografi Pasca-Kuantum (PQC) adalah algoritma enkripsi berbasis kisi (lattice-based) yang telah distandardisasi oleh NIST (FIPS 203 ML-KEM dan FIPS 204 ML-DSA) untuk kebal terhadap pemecahan kode oleh komputer kuantum. Enterprise wajib bersiap sekarang karena ancaman "Harvest Now, Decrypt Later" (HNDL), di mana penyerang merekam lalu lintas data sensitif Anda hari ini untuk didekripsi saat komputasi kuantum matang.'
        : 'Post-Quantum Cryptography (PQC) comprises lattice-based cryptographic algorithms standardized by NIST (FIPS 203 ML-KEM & FIPS 204 ML-DSA) designed to withstand quantum cryptanalysis. Organizations must prepare today due to "Harvest Now, Decrypt Later" (HNDL) attacks where adversaries intercept encrypted data today to decrypt it once quantum computers reach scale.'
    },
    {
      q: isId 
        ? 'Bagaimana NusaSec membantu kepatuhan OJK POJK 11/2022 dan UU PDP No. 27/2022?' 
        : 'How does NusaSec automate OJK POJK 11/2022 and Personal Data Protection (UU PDP) compliance?',
      category: 'REGULATORY COMPLIANCE',
      a: isId
        ? 'NusaSec memetakan kontrol keamanan multi-cloud langsung ke pasal regulasi Indonesia (OJK POJK 11/2022, UU PDP No. 27/2022, Surat Edaran OJK) serta standar global (ISO 27001, SOC 2). Platform ini mengumpulkan bukti audit secara otomatis dengan tanda tangan digital FIPS 204 yang tidak dapat dipalsukan, memangkas waktu persiapan audit hingga 85%.'
        : 'NusaSec maps multi-cloud configurations directly to Indonesian financial and data privacy mandates (OJK POJK 11/2022, UU PDP No. 27/2022) as well as global frameworks (ISO 27001, SOC 2). The platform continuously gathers immutable, cryptographically signed audit evidence, cutting audit cycles by 85%.'
    },
    {
      q: isId 
        ? 'Apa perbedaan Analisis Jalur Serangan (Attack Path) NusaSec dengan CSPM tradisional?' 
        : 'How is NusaSec’s Attack Path Analysis different from legacy CSPM scanners?',
      category: 'ATTACK PATH GRAPH',
      a: isId
        ? 'CSPM tradisional hanya memunculkan daftar ribuan temuan kerentanan tanpa konteks, menyebabkan kelelahan peringatan (alert fatigue). NusaSec mengkorelasikan seluruh topologi jaringan, izin IAM, keterpaparan internet publik, dan basis data sensitif dalam satu graf konteks terpadu untuk hanya menyoroti kombinasi toksik yang benar-benar dapat dieksploitasi penyerang (mengeliminasi 92% noise).'
        : 'Legacy CSPM tools produce thousands of isolated alerts without real-world context, creating severe alert fatigue. NusaSec correlates network hops, IAM permissions, internet ingress, and sensitive datastores into a unified security graph to only surface toxic combinations with validated exploit paths, eliminating 92% of noise.'
    },
    {
      q: isId 
        ? 'Apakah NusaSec memerlukan instalasi agen (agent) di setiap server kami?' 
        : 'Does NusaSec require agent installation on every virtual server?',
      category: 'ARCHITECTURE & DEPLOYMENT',
      a: isId
        ? 'NusaSec menggunakan pendekatan Agentless berbasis API & snapshot untuk pemindaian permukaan serangan (Attack Surface), inventaris CBOM, dan evaluasi postur awal tanpa overhead CPU atau downtime. Untuk pemantauan memori runtime dan pertahanan pasca-kuantum real-time, tersedia sensor eBPF ultra-ringan opsional.'
        : 'NusaSec operates primarily agentless via cloud read-only APIs and disk snapshots for instant posture assessment, CBOM cryptographic inventory, and attack path mapping. For real-time in-memory defense and live quantum handshake enforcement, an ultra-lightweight eBPF sensor is optionally deployed.'
    },
    {
      q: isId 
        ? 'Bagaimana NusaSec AI menjamin keamanan dan privasi data kami (Zero Data Retention)?' 
        : 'How does NusaSec AI ensure privacy and Zero Data Retention?',
      category: 'AI GOVERNANCE & PRIVACY',
      a: isId
        ? 'NusaSec menerapkan kebijakan Zero Data Retention (ZDR) yang ketat. Seluruh prompt analisis, telemetry, dan metadata infrastruktur Anda diisolasi per tenant (Dedicated Sovereign Isolation), dienkripsi secara end-to-end, dan tidak pernah digunakan untuk melatih model AI publik.'
        : 'NusaSec enforces a strict Zero Data Retention (ZDR) policy. All telemetry, infrastructure metadata, and analysis prompts are isolated per tenant with Dedicated Sovereign Isolation, encrypted end-to-end, and strictly never used to train external or shared AI foundation models.'
    }
  ];

  const filteredFaqs = faqItems.filter(item => 
    item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-24 bg-slate-50 text-slate-900 relative overflow-hidden" id="faq">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-mono font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isId ? 'PERTANYAAN UMUM & DUKUNGAN TEKNIS' : 'FREQUENTLY ASKED QUESTIONS'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
            {isId ? 'Semua yang Perlu Anda Ketahui tentang NusaSec' : 'Everything You Need to Know About NusaSec'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {isId 
              ? 'Jawaban komprehensif seputar arsitektur cloud security, korelasi jalur serangan, kesiapan kriptografi pasca-kuantum, dan kepatuhan regulasi.'
              : 'Detailed technical answers covering multi-cloud architecture, attack path correlation, post-quantum cryptography, and continuous compliance.'}
          </p>

          {/* Quick FAQ Search Bar */}
          <div className="max-w-md mx-auto relative pt-2">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none mt-1" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isId ? "Cari topik (misal: PQC, OJK, Agentless)..." : "Search topics (e.g., PQC, Compliance, Agentless)..."}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-blue-300 transition-colors shadow-inner"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 pt-2">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'bg-white border-blue-200 shadow-xl ring-1 ring-blue-500/20' 
                    : 'bg-white/60 border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 select-none focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-blue-600 uppercase">
                      {faq.category}
                    </span>
                    <div className="text-base sm:text-lg font-bold font-display text-slate-900">
                      {faq.q}
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg shrink-0 transition-transform duration-200 ${isOpen ? 'bg-blue-500/20 text-blue-600 rotate-180' : 'bg-slate-50 text-slate-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/80 animate-in fade-in duration-150">
                    <p>{faq.a}</p>
                    <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-xs text-slate-500 font-mono">
                      <span className="flex items-center gap-1 text-blue-600">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{isId ? 'Diverifikasi oleh Tim Riset Kriptografi NusaSec' : 'Verified by NusaSec Cryptographic Research'}</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
              <p className="text-sm text-slate-500">
                {isId ? 'Tidak ada pertanyaan yang sesuai dengan kata kunci Anda.' : 'No matching questions found for your query.'}
              </p>
              <button
                onClick={onOpenAi}
                className="px-4 py-2 rounded-xl bg-blue-500 text-slate-950 text-xs font-bold inline-flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isId ? 'Tanyakan Langsung ke NusaSec AI' : 'Ask NusaSec AI Assistant'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Bottom Support Banner */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <div className="text-sm font-bold text-slate-900 font-display">
              {isId ? 'Punya pertanyaan arsitektur yang lebih spesifik?' : 'Have specific architectural questions?'}
            </div>
            <div className="text-xs text-slate-500">
              {isId ? 'Diskusikan langsung dengan tim insinyur keamanan dan kriptografer kami.' : 'Consult directly with our cloud security engineers and cryptographers.'}
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAi}
              className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{isId ? 'Tanya AI' : 'Talk to AI'}</span>
            </button>
            <button
              onClick={onOpenDemo}
              className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>{isId ? 'Hubungi Kami' : 'Contact Us'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
