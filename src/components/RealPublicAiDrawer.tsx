import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AlertCircle, ArrowRight, BookOpen, CheckCircle2, Loader2, Send, Shield, Sparkles, X } from 'lucide-react';
import { Language } from '../data/translations';
import { NUSASEC_PLATFORM } from '../lib/platform';
import { Meteors } from './magic/effects';

interface RealPublicAiDrawerProps {
  isOpen: boolean;
  language?: Language;
  onClose: () => void;
  onNavigateToPricing: () => void;
  onNavigateToPqc: () => void;
}

type Evidence = {
  source: string;
  object_id: string;
  summary: string;
  citation_uri?: string | null;
  confidence?: number;
  freshness?: string;
};

type ChatResponse = {
  answer: string;
  conversation_id: string;
  confidence: number;
  evidence: Evidence[];
  access_tier: string;
  freshness: string;
  follow_up_questions: string[];
  language_response?: string;
};

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  evidence?: Evidence[];
  confidence?: number;
};

const presets = {
  id: [
    'Apa itu NusaSec dan bagaimana arsitekturnya?',
    'Bagaimana NusaSec membantu kesiapan PQC?',
    'Bagaimana NusaSec menangani cloud security dan compliance?',
    'Apa perbedaan Public AI, Customer AI, dan Internal AI?',
  ],
  en: [
    'What is NusaSec and how is it architected?',
    'How does NusaSec support post-quantum readiness?',
    'How does NusaSec handle cloud security and compliance?',
    'What is the difference between Public AI, Customer AI, and Internal AI?',
  ],
};

export const RealPublicAiDrawer: React.FC<RealPublicAiDrawerProps> = ({
  isOpen,
  language = 'id',
  onClose,
  onNavigateToPricing,
  onNavigateToPqc,
}) => {
  const [input, setInput] = useState('');
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const currentPresets = useMemo(() => presets[language === 'id' ? 'id' : 'en'], [language]);

  useEffect(() => {
    if (!isOpen) return;
    setMessages(prev => prev.length ? prev : [{
      id: 'welcome',
      role: 'assistant',
      content: language === 'id'
        ? 'Saya NusaSec AI dalam konteks PUBLIC_GENERAL. Saya hanya menggunakan pengetahuan publik/approved dan tidak memiliki akses ke data customer atau operasi internal.'
        : 'I am NusaSec AI operating in PUBLIC_GENERAL context. I only use public/approved knowledge and have no access to customer or internal data.',
    }]);
  }, [isOpen, language]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const send = async (preset?: string) => {
    const text = (preset ?? input).trim();
    if (!text || loading) return;

    setError(null);
    setInput('');
    setMessages(prev => [...prev, { id: `u-${Date.now()}`, role: 'user', content: text }]);
    setLoading(true);

    try {
      const response = await fetch(`${NUSASEC_PLATFORM.aiApiUrl}/v1/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          message: text,
          conversation_id: conversationId,
          intent: 'public_research',
          context: {
            mode: 'public',
            access_tier: 'public_general',
            language_requested: language,
            locale: language,
            response_style: 'research_explainer',
            depth: 'standard',
          },
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(typeof data?.detail === 'string' ? data.detail : 'NusaSec AI is temporarily unavailable.');
      }

      const result = data as ChatResponse;
      setConversationId(result.conversation_id);
      setMessages(prev => [...prev, {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: result.answer,
        evidence: result.evidence,
        confidence: result.confidence,
      }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'NusaSec AI is temporarily unavailable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <button className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm pointer-events-auto" aria-label="Close NusaSec AI" onClick={onClose} />
      <aside className="pointer-events-auto absolute right-0 top-0 h-full w-full max-w-xl bg-white text-slate-900 border-l border-slate-200 shadow-2xl flex flex-col overflow-hidden">
        <Meteors count={3} />
        <header className="relative flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 overflow-hidden">
              <span className="absolute inset-0 rounded-xl bg-blue-400/20 blur-md glow-pulse-dot" />
              <Sparkles className="relative w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold">NusaSec AI</div>
              <div className="text-[11px] text-slate-500 font-mono">PUBLIC_GENERAL · public knowledge only</div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100" aria-label="Close"><X className="w-5 h-5" /></button>
        </header>

        <div className="relative flex-1 overflow-y-auto p-5 space-y-4 bg-white">
          {messages.map(message => (
            <div key={message.id} className={message.role === 'user' ? 'ml-10' : 'mr-4'}>
              <div className={message.role === 'user'
                ? 'rounded-2xl rounded-tr-md bg-blue-500 text-slate-950 px-4 py-3 text-sm'
                : 'rounded-2xl rounded-tl-md bg-slate-100 border border-slate-200 px-4 py-3 text-sm text-slate-700'}>
                <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
              </div>
              {message.role === 'assistant' && message.evidence?.length ? (
                <div className="mt-2 rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600"><BookOpen className="w-3.5 h-3.5 text-blue-600" /> Evidence</div>
                  {message.evidence.slice(0, 4).map((e, idx) => <div key={`${e.object_id}-${idx}`} className="text-[11px] text-slate-500">{e.source}: {e.summary}</div>)}
                  {typeof message.confidence === 'number' && <div className="text-[10px] text-slate-500">Confidence {Math.round(message.confidence * 100)}%</div>}
                </div>
              ) : null}
            </div>
          ))}

          {!messages.some(m => m.role === 'user') && (
            <div className="grid gap-2">
              {currentPresets.map(query => <button key={query} onClick={() => send(query)} className="text-left rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-2.5 text-xs text-slate-600 transition-colors">{query}</button>)}
            </div>
          )}

          {loading && <div className="flex items-center gap-2 text-xs text-slate-500"><Loader2 className="w-4 h-4 animate-spin text-blue-600" /> Investigating approved public sources…</div>}
          {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-3 text-xs text-red-200 flex gap-2"><AlertCircle className="w-4 h-4 shrink-0" />{error}</div>}
          <div ref={bottomRef} />
        </div>

        <div className="relative border-t border-slate-200 bg-white p-4 space-y-3">
          <div className="flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void send(); } }} placeholder={language === 'id' ? 'Tanyakan tentang NusaSec…' : 'Ask about NusaSec…'} className="flex-1 rounded-xl bg-white border border-slate-300 px-3.5 py-3 text-sm outline-none focus:border-blue-500 text-slate-900" />
            <button onClick={() => void send()} disabled={loading || !input.trim()} className="btn-shimmer rounded-xl px-4 bg-blue-500 text-slate-950 font-semibold disabled:opacity-40" aria-label="Send"><Send className="w-4 h-4" /></button>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={onNavigateToPqc} className="text-[11px] rounded-lg border border-slate-200 px-2.5 py-1.5 text-slate-600 hover:bg-slate-100">Explore PQC</button>
            <button onClick={onNavigateToPricing} className="text-[11px] rounded-lg border border-slate-200 px-2.5 py-1.5 text-slate-600 hover:bg-slate-100">View pricing</button>
            <div className="ml-auto flex items-center gap-1 text-[10px] text-slate-500"><Shield className="w-3 h-3" /> No tenant data</div>
          </div>
        </div>
      </aside>
    </div>
  );
};
