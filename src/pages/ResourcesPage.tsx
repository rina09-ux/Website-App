import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Tag, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  X, 
  FileText, 
  Shield, 
  Download,
  Share2,
  ShieldCheck,
  Building2,
  Newspaper,
  ChevronRight
} from 'lucide-react';
import { CMS_ARTICLES } from '../data/mockCmsData';
import { Article, ResourceCategory } from '../types';

const CATEGORY_META: Record<string, { icon: React.ComponentType<{ className?: string }>; colorClass: string }> = {
  research: { icon: FileText, colorClass: 'text-blue-600 bg-blue-50 border-blue-200' },
  whitepapers: { icon: ShieldCheck, colorClass: 'text-violet-600 bg-violet-50 border-violet-200' },
  'case-studies': { icon: Building2, colorClass: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  guides: { icon: BookOpen, colorClass: 'text-amber-600 bg-amber-50 border-amber-200' },
  news: { icon: Newspaper, colorClass: 'text-rose-600 bg-rose-50 border-rose-200' },
};
const getCategoryMeta = (cat: string) => CATEGORY_META[cat] || CATEGORY_META.research;

export const ResourcesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = CMS_ARTICLES.filter((art) => {
    const matchesCat = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesQuery = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      
      {/* Header */}
      <section className="relative bg-white text-slate-900 py-16 border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 text-xs font-mono">
              <BookOpen className="w-3.5 h-3.5" />
              <span>NusaSec-Core CMS Publishing Feed</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900">
              Research, Whitepapers & Intelligence
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Peer-reviewed post-quantum cryptography benchmarks, cloud attack path analyses, and enterprise compliance implementation guides.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {[
              { id: 'all', label: 'All Publications' },
              { id: 'research', label: 'PQC Research' },
              { id: 'whitepapers', label: 'Threat Reports' },
              { id: 'case-studies', label: 'Case Studies' },
              { id: 'guides', label: 'Architecture Guides' },
              { id: 'news', label: 'Release News' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-slate-50 text-slate-900 shadow-sm font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search research or tags..."
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

        </div>
      </div>

      {/* Articles — compact editorial list on mobile, card grid from tablet up.
          Avoids repeating the same tall bordered box down the page on small screens. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {filteredArticles.map((article, idx) => {
            const meta = getCategoryMeta(article.category);
            const CatIcon = meta.icon;
            return (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className={`group cursor-pointer flex items-start gap-3.5 py-4 border-b border-slate-200 transition-colors
                  md:flex md:flex-col md:justify-between md:items-stretch md:gap-0 md:py-0 md:border-b-0
                  md:bg-white md:rounded-2xl md:border md:border-slate-200 md:p-6 md:hover:border-blue-500/60 md:hover:shadow-lg
                  ${idx === 0 ? 'pt-1 md:pt-6' : ''}`}
              >
                {/* Category glyph — replaces the heavy top badge on mobile */}
                <span className={`flex md:hidden shrink-0 w-9 h-9 rounded-xl border items-center justify-center ${meta.colorClass}`}>
                  <CatIcon className="w-4 h-4" />
                </span>

                <div className="min-w-0 flex-1">
                  {/* Desktop-only top row (category badge + read time) */}
                  <div className="hidden md:flex items-center justify-between text-xs text-slate-500 font-mono mb-3">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-bold uppercase text-[10px]">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Mobile-only compact meta row */}
                  <div className="flex md:hidden items-center gap-2 text-[10px] font-mono text-slate-500 mb-1">
                    <span className={`uppercase font-bold ${meta.colorClass.split(' ')[0]}`}>{article.category}</span>
                    <span className="text-slate-300">•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-sm md:text-base font-bold font-display text-slate-900 group-hover:text-blue-700 transition-colors leading-snug mb-1 md:mb-2 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="hidden md:block text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {article.summary}
                  </p>

                  {/* Mobile-only single-line author + affordance */}
                  <div className="flex md:hidden items-center gap-1.5 text-[11px] text-slate-500">
                    <span className="font-medium text-slate-600">{article.author.name}</span>
                  </div>

                  {/* Desktop-only tags + footer */}
                  <div className="hidden md:block">
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.map((t, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="font-medium text-slate-700">{article.author.name}</span>
                      <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Read Article →
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile-only trailing chevron */}
                <ChevronRight className="md:hidden w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-white/80 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedArticle(null)}
          />

          <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 text-slate-900 shadow-2xl z-10 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-800">
                <span className="px-2 py-0.5 rounded bg-blue-100 border border-blue-200 uppercase font-bold text-[10px]">
                  {selectedArticle.category}
                </span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 leading-tight">
                {selectedArticle.title}
              </h2>

              {/* Author Card */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{selectedArticle.author.name}</div>
                  <div className="text-slate-500 font-mono text-[11px]">{selectedArticle.author.role}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => alert("Research document cached for offline reading.")}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium flex items-center gap-1.5 text-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

              {/* Article Content */}
              <div className="pt-4 space-y-4 text-sm text-slate-700 leading-relaxed">
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Tags */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-1.5">
                {selectedArticle.tags.map((t, idx) => (
                  <span key={idx} className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
