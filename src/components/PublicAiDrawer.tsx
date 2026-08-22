import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Shield, 
  Lock, 
  CheckCircle2, 
  Cpu, 
  BookOpen, 
  Layers, 
  RefreshCw, 
  AlertCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { AiChatMessage } from '../types';
import { Language } from '../data/translations';

interface PublicAiDrawerProps {
  isOpen: boolean;
  language?: Language;
  onClose: () => void;
  onNavigateToPricing: () => void;
  onNavigateToPqc: () => void;
}

const PRESET_QUERIES_ID = [
  'Jelaskan 4 repo utama dalam ekosistem NusaSec',
  'Bagaimana NusaSec mengotomatisasi kepatuhan OJK POJK 11 dan UU PDP?',
  'Apa itu standar kriptografi pasca-kuantum NIST FIPS 203 (ML-KEM)?',
  'Bagaimana cara kerja migrasi Hybrid TLS 1.3?',
  'Apa perbedaan visibilitas 4-tier di NusaSec AI?'
];

const PRESET_QUERIES_EN = [
  'What are the 4 main repos in the NusaSec ecosystem?',
  'How does NusaSec help with NIST FIPS 203 (ML-KEM) and PQC migration?',
  'What is the difference between Public AI, Customer AI, and Internal AI?',
  'How does NusaSec automate ISO 27001 and OJK compliance?',
  'How does NusaSec ingest multi-cloud posture without latency?'
];

export const PublicAiDrawer: React.FC<PublicAiDrawerProps> = ({
  isOpen,
  language = 'id',
  onClose,
  onNavigateToPricing,
  onNavigateToPqc
}) => {
  const isId = language === 'id';
  const presets = isId ? PRESET_QUERIES_ID : PRESET_QUERIES_EN;

  const initialMsg: AiChatMessage = {
    id: 'init-1',
    sender: 'assistant',
    content: isId
      ? 'Halo! Saya adalah **NusaSec Public AI** — beroperasi di bawah konteks visibilitas `PUBLIC_GENERAL`.\n\nSaya siap menjawab pertanyaan seputar arsitektur NusaSec, postur multi-cloud, kepatuhan audit berkelanjutan (UU PDP, OJK POJK 11, ISO 27001, SOC 2), serta transisi algoritma kriptografi pasca-kuantum (NIST FIPS 203/204/205).\n\n*Catatan: Public AI tidak memiliki akses ke data privat tenant atau operasi internal perusahaan.* Ada yang bisa saya bantu untuk tim keamanan Anda?'
      : 'Hello! I am **NusaSec Public AI** — operating under the `PUBLIC_GENERAL` visibility context.\n\nI can explain NusaSec\'s architecture, cloud posture reasoning, continuous compliance frameworks (SOC 2, ISO 27001, OJK POJK 11, UU PDP), and post-quantum cryptographic (PQC) migration standards (NIST FIPS 203/204/205).\n\n*Note: Public AI does not access private tenant data or internal company operations.* How can I assist your security team today?',
    timestamp: 'Just now',
    visibilityTier: 'PUBLIC_GENERAL',
    citations: ['NusaSec Architectural Blueprint v4.8', 'NIST PQC Standards', 'Core Publishing API']
  };

  const [messages, setMessages] = useState<AiChatMessage[]>([initialMsg]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (queryText?: string) => {
    const text = queryText || inputValue;
    if (!text.trim() || isTyping) return;

    const userMessage: AiChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // AI Reasoning Generator based on NusaSec Domain Knowledge
    setTimeout(() => {
      let responseContent = '';
      let citations: string[] = ['NusaSec Whitepaper v4.8', 'NIST Post-Quantum Cryptography'];

      const lower = text.toLowerCase();
      const queryIsId = isId || lower.includes('bagaimana') || lower.includes('apa') || lower.includes('jelaskan') || lower.includes('kepatuhan') || lower.includes('harga') || lower.includes('kriptografi');

      if (lower.includes('4 repo') || lower.includes('repo') || lower.includes('ekosistem') || lower.includes('ecosystem') || lower.includes('core') || lower.includes('internal') || lower.includes('customer')) {
        if (queryIsId) {
          responseContent = `NusaSec dirancang di atas **empat bidang arsitektur utama** dengan pemisahan matematis yang ketat:\n\n1. **\`NusaSec-Core\` (System of Record)**: Backend otoritatif untuk manajemen identitas, RBAC, isolasi tenant, evaluasi graf postur keamanan, billing, dan publikasi CMS.\n2. **\`NusaSec-AI\` (Intelligence Layer)**: Lapisan penalaran cerdas terpusat dengan 4 tingkat visibilitas (\`PUBLIC_GENERAL\`, \`PUBLIC_SPECIFIC\`, \`CUSTOMER_AUTHORIZED\`, \`INTERNAL_AUTHORIZED\`).\n3. **\`App-Customer\` (Customer Control Plane)**: Konsol operasional bagi pimpinan keamanan enterprise untuk menyelidiki jalur serangan (attack paths), meninjau bukti audit, dan mengeksekusi remediasi GitOps.\n4. **\`App-Internal\` (Company Operating Plane)**: Pusat komando internal NusaSec untuk tim teknik, analis SOC, sales, dan eksekutif.\n5. **\`NusaSec-Website\` (Public Experience Layer)**: Pusat edukasi publik, riset kriptografi, status sistem, dan gerbang aktivasi komersial.`;
          citations = ['Panduan Arsitektur NusaSec-Core', 'Spesifikasi App-Customer Control Plane'];
        } else {
          responseContent = `NusaSec is architected across **four foundational planes** governed by mathematical separation:\n\n1. **\`NusaSec-Core\` (System of Record)**: The authoritative backend for identity, RBAC, tenant isolation, billing, posture evaluations, and CMS publishing.\n2. **\`NusaSec-AI\` (Intelligence Layer)**: Centralized AI reasoning operating with 4 distinct visibility tiers (\`PUBLIC_GENERAL\`, \`PUBLIC_SPECIFIC\`, \`CUSTOMER_AUTHORIZED\`, \`INTERNAL_AUTHORIZED\`).\n3. **\`App-Customer\` (Customer Control Plane)**: The operational cockpit for enterprise security leads to investigate attack paths, review findings, and automate remediation.\n4. **\`App-Internal\` (Company Operating Plane)**: The command center for NusaSec sales, engineering, SOC analysts, and executive operations.\n5. **\`NusaSec-Website\` (Public Experience)**: Brand, education, trust, product discovery, and commercial conversion.`;
          citations = ['NusaSec-Core Architecture Guide', 'App-Customer Control Plane Spec'];
        }
      } else if (lower.includes('pqc') || lower.includes('quantum') || lower.includes('fips') || lower.includes('kyber') || lower.includes('ml-kem') || lower.includes('kuantum')) {
        if (queryIsId) {
          responseContent = `NusaSec menyediakan siklus lengkap **Kesiapan Kriptografi Pasca-Kuantum (PQC) & Crypto-Agility**:\n\n- **Pemindaian CBOM Otomatis**: Memetakan daftar kriptografi (Cryptographic Bill of Materials) secara real-time untuk mendeteksi kunci RSA-2048, ECC, dan hash SHA-1 yang rentan terhadap ancaman dekripsi masa depan (HNDL).\n- **Implementasi Standar Final NIST**:\n  - **ML-KEM / FIPS 203** (sebelumnya Kyber) untuk enkripsi umum & pertukaran kunci.\n  - **ML-DSA / FIPS 204** (sebelumnya Dilithium) untuk sertifikat identitas dan tanda tangan digital.\n  - **SLH-DSA / FIPS 205** (sebelumnya SPHINCS+) untuk tanda tangan berbasis hash tanpa status.\n- **Transisi Hybrid TLS 1.3**: Handshake ganda tanpa downtime (\`X25519 + ML-KEM-768\`) yang menjamin keamanan data terhadap penyadapan hari ini yang didekripsi di masa depan.`;
          citations = ['Standar NIST FIPS 203/204/205', 'Whitepaper Kesiapan Kriptografi NusaSec'];
        } else {
          responseContent = `NusaSec provides full-lifecycle **Post-Quantum Cryptography (PQC) Migration & Crypto-Agility**:\n\n- **Continuous CBOM Discovery**: Real-time Cryptographic Bill of Materials scanning identifies legacy RSA-2048, ECC P-256, and SHA-1 dependencies across multi-cloud infrastructure.\n- **NIST Standard Support**: Native implementation of finalized standards:\n  - **ML-KEM / FIPS 203** (formerly Kyber) for general encryption & key exchange.\n  - **ML-DSA / FIPS 204** (formerly Dilithium) for identity certificates and code signing.\n  - **SLH-DSA / FIPS 205** (formerly SPHINCS+) for stateless hash-based signatures.\n- **Transitional Hybrid TLS 1.3**: Zero-downtime dual-handshake (\`X25519 + ML-KEM-768\`) preventing *Harvest-Now-Decrypt-Later* (HNDL) attacks.`;
          citations = ['NIST FIPS 203/204/205 Guidelines', 'NusaSec Crypto-Agility Whitepaper'];
        }
      } else if (lower.includes('ojk') || lower.includes('pdp') || lower.includes('uu pdp') || lower.includes('compliance') || lower.includes('kepatuhan') || lower.includes('iso') || lower.includes('soc')) {
        if (queryIsId) {
          responseContent = `NusaSec mengotomatisasi kepatuhan berkelanjutan untuk standar regulasi Indonesia dan global:\n\n1. **OJK POJK No. 11/POJK.03/2022**: Mengotomatisasi pemenuhan Pasal 21, 24, dan 27 mengenai ketahanan siber perbankan, enkripsi data sensitif, dan manajemen risiko TI.\n2. **UU No. 27 Tahun 2022 (UU PDP)**: Memastikan perlindungan data pribadi dengan enkripsi kuat, pemisahan kontrol akses, dan pembuktian ketiadaan retensi data PII pada model AI.\n3. **ISO/IEC 27001:2022 & SOC 2 Type II**: Mengumpulkan bukti audit secara berkala dan menyimpannya di Brankas Bukti Kriptografis (Cryptographic Audit Vault) bertanda tangan digital.`;
          citations = ['Pedoman Kepatuhan OJK POJK 11', 'Standar Regulasi UU PDP No. 27/2022', 'Matriks Kontrol ISO 27001'];
        } else {
          responseContent = `NusaSec automates continuous compliance across **SOC 2 Type II, ISO 27001:2022, NIST SP 800-207, PCI-DSS v4.0, and regional mandates such as OJK POJK 11/2022 & Indonesia PDP Law**:\n\n1. **Continuous Evidence Collectors**: Real-time API & eBPF agents collect cryptographically signed configuration proofs.\n2. **Zero-Touch Audit Vault**: Immutable audit evidence timestamped to satisfy third-party auditors in hours instead of months.\n3. **Posture Evaluation**: Automated status assigned to every control (\`PASS\`, \`FAIL\`, \`UNKNOWN\`, \`NOT_APPLICABLE\`).`;
          citations = ['NusaSec Compliance Engine Spec', 'AICPA & ISO 27001 Mapping'];
        }
      } else if (lower.includes('visibilitas') || lower.includes('tier') || lower.includes('visibility') || lower.includes('privasi')) {
        if (queryIsId) {
          responseContent = `NusaSec-AI menerapkan **model pemisahan visibilitas 4-tier dengan isolasi ketat**:\n\n- **\`PUBLIC_GENERAL\` / \`PUBLIC_SPECIFIC\` (Konteks saat ini)**: Menjawab pertanyaan arsitektur umum, konsep keamanan, dan spesifikasi produk terbuka. Terisolasi total dari data tenant.\n- **\`CUSTOMER_AUTHORIZED\`**: Hanya aktif di dalam \`App-Customer\`. Menganalisis jalur serangan privat pelanggan, mengevaluasi radius ledakan risiko, dan membuat PR remediasi IaC di repositori pelanggan.\n- **\`INTERNAL_AUTHORIZED\`**: Beroperasi di dalam \`App-Internal\` untuk operasi perusahaan, telemetri SOC internal, dan analisis ancaman global NusaSec.`;
          citations = ['Matriks RBAC & Visibilitas NusaSec', 'Protokol Zero Data Retention'];
        } else {
          responseContent = `NusaSec-AI enforces **strict 4-tier cryptographic visibility boundaries**:\n\n- **\`PUBLIC_GENERAL\` / \`PUBLIC_SPECIFIC\` (You are here)**: Answers architectural questions, educational security concepts, and public product specs. Strictly prevented from accessing customer data.\n- **\`CUSTOMER_AUTHORIZED\`**: Available exclusively within \`App-Customer\`. Evaluates private attack paths, tenant risk scores, and generates automated remediation pull requests within tenant boundaries.\n- **\`INTERNAL_AUTHORIZED\`**: Available inside \`App-Internal\` for company operations, engineering telemetry, and threat intelligence telemetry.`;
          citations = ['NusaSec RBAC & Visibility Matrix', 'Zero-Data-Retention Protocol'];
        }
      } else if (lower.includes('harga') || lower.includes('pricing') || lower.includes('biaya') || lower.includes('paket') || lower.includes('cost')) {
        if (queryIsId) {
          responseContent = `Paket harga NusaSec dirancang fleksibel untuk berbagai skala:\n\n- **Foundation (Mulai dari ~$289 / Rp 4.500.000 per bulan)**: Hingga 250 aset cloud, CSPM berkelanjutan, CIS baseline & inventaris PQC dasar.\n- **Advanced Posture & AI (~$749 / Rp 11.800.000 per bulan)**: 1.500 aset, graf jalur serangan real-time, brankas bukti kepatuhan otomatis, dan Customer Plane AI.\n- **Enterprise & PQC Agility (~$1.849 / Rp 29.000.000 per bulan)**: Aset tanpa batas, Full PQC Workbench (FIPS 203/204), sovereign tenant VPC, dan dukungan kriptografer 24/7.\n- **Sovereign / GovCloud**: Penerapan on-premise terisolasi (air-gapped) untuk institusi perbankan sentral dan pertahanan negara.`;
          citations = ['Katalog Harga NusaSec Enterprise', 'Pedoman Penerapan Sovereign'];
        } else {
          responseContent = `NusaSec offers transparent, scalable pricing tiers:\n\n- **Foundation ($289/mo billed annually)**: Up to 250 cloud assets, continuous CSPM, CIS baseline & basic PQC inventory.\n- **Advanced Posture & AI ($749/mo)**: 1,500 assets, real-time attack path graph, automated compliance evidence, and Customer Plane AI.\n- **Enterprise & PQC Agility ($1,849/mo)**: Unlimited assets, full PQC Migration Workbench (FIPS 203/204), sovereign tenant VPC, and 24/7 dedicated cryptographers.\n- **Sovereign / GovCloud**: Air-gapped on-premise deployments for defense & central banking.`;
          citations = ['NusaSec Commercial Lifecycle Spec', 'Sovereign Deployment Manual'];
        }
      } else {
        if (queryIsId) {
          responseContent = `Terima kasih atas pertanyaan Anda mengenai "${text}".\n\nNusaSec mengintegrasikan **Cloud Security Posture Management (CSPM)**, **Korelasi Graf Jalur Serangan**, **Otomasi Kepatuhan (OJK, UU PDP, ISO 27001)**, dan **Kesiapan Kriptografi Pasca-Kuantum (NIST FIPS 203/204)** ke dalam satu platform otoritatif.\n\nApakah Anda ingin mencoba **Kalkulator Kesiapan PQC**, meninjau **Matriks Kepatuhan Regulasi**, atau menjadwalkan sesi demo langsung bersama tim kami?`;
          citations = ['Ikhtisar Platform NusaSec', 'Pusat Dokumentasi Publik'];
        } else {
          responseContent = `Thank you for your question regarding "${text}".\n\nNusaSec unifies **Cloud Security Posture Management (CSPM)**, **Attack Path Correlation**, **Continuous Compliance Automation**, and **Post-Quantum Cryptographic Readiness (NIST FIPS 203/204)** into a single unified control plane.\n\nWould you like to explore our **PQC Migration Tool**, review our **Compliance Matrices**, or book a live architectural session with our cryptographers?`;
          citations = ['NusaSec Platform Overview', 'Public Documentation Hub'];
        }
      }

      const botMessage: AiChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        content: responseContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        visibilityTier: 'PUBLIC_GENERAL',
        citations
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xl bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl text-slate-100 z-10 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white font-display text-base">
                  NusaSec AI
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-emerald-500/20">
                  PUBLIC_GENERAL
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isId ? 'Asisten intelijen keamanan & arsitektur publik' : 'Public security intelligence & architecture assistant'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close AI Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security / Privacy Trust Pill */}
        <div className="px-5 py-2.5 bg-slate-800/50 border-b border-slate-800 flex items-center gap-2 text-xs text-slate-300">
          <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>
            {isId 
              ? 'Isolasi Data Ketat: Hanya menggunakan data publik NusaSec-Core. Tanpa akses ke data privat tenant.'
              : 'Strict Data Isolation: Operates solely on public NusaSec-Core knowledge. Zero tenant leakage.'}
          </span>
        </div>

        {/* Chat Stream Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1 text-[11px] text-slate-400">
                <span>{msg.sender === 'user' ? (isId ? 'Anda' : 'You') : 'NusaSec AI'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
                {msg.visibilityTier && (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1 rounded">
                    {msg.visibilityTier}
                  </span>
                )}
              </div>

              <div
                className={`p-4 rounded-xl text-sm leading-relaxed max-w-[92%] ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none'
                    : 'bg-slate-800/90 text-slate-200 border border-slate-700/70 rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-line space-y-2">
                  {msg.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
                    <BookOpen className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="font-semibold text-slate-300">{isId ? 'Sumber:' : 'Sources:'}</span>
                    {msg.citations.map((cite, cIdx) => (
                      <span key={cIdx} className="bg-slate-900 px-2 py-0.5 rounded text-slate-300 border border-slate-700 text-[10px]">
                        {cite}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>{isId ? 'NusaSec-AI sedang menalar pada graf keamanan...' : 'NusaSec-AI reasoning across security graph...'}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset Query Chips */}
        <div className="px-4 py-2 border-t border-slate-800 bg-slate-950/50">
          <div className="text-[11px] text-slate-400 font-medium mb-1.5 flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-slate-400" />
            <span>{isId ? 'Contoh Pertanyaan Teknis:' : 'Suggested Technical Inquiries:'}</span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {presets.map((query, qIdx) => (
              <button
                key={qIdx}
                onClick={() => handleSend(query)}
                disabled={isTyping}
                className="text-left text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-md border border-slate-700 shrink-0 transition-colors"
              >
                {query}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isId ? "Tanyakan algoritma PQC, postur cloud, kepatuhan OJK / UU PDP..." : "Ask about PQC algorithms, cloud posture, compliance, or architecture..."}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-semibold transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500">
            <span>Powered by NusaSec-AI v4.8 Intelligence Layer</span>
            <button 
              onClick={() => {
                onClose();
                onNavigateToPqc();
              }}
              className="text-emerald-400 hover:underline flex items-center gap-0.5"
            >
              {isId ? 'Buka Scanner PQC →' : 'Launch PQC Scanner →'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
