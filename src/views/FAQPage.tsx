'use client';

import React, { useState } from 'react';

import { ThumbsUp, Sparkles, Search, X, ShieldCheck, Zap, Cpu, Clock, Copy, Check, Terminal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { FAQItem, FaqHeaderConfig, Page } from '../types';
import { BlurText, Arrow } from '../components/site/BlurText';
import { sound } from '../utils/audio';

interface FAQPageProps {
  faqs: FAQItem[];
  headerConfig?: FaqHeaderConfig;
  setCurrentPage?: (page: Page) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({
  faqs: initialFaqs,
  headerConfig,
  setCurrentPage: propSetCurrentPage,
}) => {
  const router = useRouter();

  const navigateTo = (page: Page) => {
    sound.playPageSwitch();
    if (propSetCurrentPage) {
      propSetCurrentPage(page);
    } else {
      router.push(page === 'home' ? '/' : `/${page}`);
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const setCurrentPage = navigateTo;


  const [faqs, setFaqs] = useState<FAQItem[]>(initialFaqs);
  const [expandedIds, setExpandedIds] = useState<string[]>(['faq-1', 'faq-2']);
  const [votedIds, setVotedIds] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { name: 'All', label: 'All Knowledge', icon: Sparkles },
    { name: 'Pricing & Scoping', label: 'Pricing & Rates', icon: Zap },
    { name: '100% IP Transfer', label: 'IP Ownership', icon: ShieldCheck },
    { name: 'Milestone Escrow', label: 'Escrow Terms', icon: Clock },
    { name: 'Engineering', label: 'Tech & 3D', icon: Cpu },
    { name: 'No Middlemen', label: 'Direct Access', icon: Terminal },
  ];


  const getCategoryCount = (catName: string) => {
    if (catName === 'All') return faqs.length;
    return faqs.filter((item) => {
      return (
        item.categoryTag === catName ||
        item.category.toLowerCase().includes(catName.toLowerCase())
      );
    }).length;
  };

  const handleSelectCategory = (catName: string) => {
    sound.playClick();
    setSelectedCategory(catName);
  };


  const toggleAccordion = (id: string) => {
    sound.playClick();
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleHelpfulFAQ = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (votedIds.includes(id)) return;
    sound.playChime();
    setFaqs((prev) =>
      prev.map((f) => (f.id === id ? { ...f, helpfulCount: (f.helpfulCount || 0) + 1 } : f))
    );
    setVotedIds((prev) => [...prev, id]);
  };


  const handleCopyAnswer = (id: string, answerText: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    navigator.clipboard.writeText(answerText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredFaqs = faqs.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      item.categoryTag === selectedCategory ||
      (item.category && item.category.toLowerCase().includes(selectedCategory.toLowerCase()));

    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.categoryTag && item.categoryTag.toLowerCase().includes(searchQuery.toLowerCase()));


    return matchesCategory && matchesSearch;
  });

  const pad = (n: number) => String(n).padStart(2, '0');
  const stats = [
    { icon: ShieldCheck, k: 'IP Ownership', v: '100% Code Transfer' },
    { icon: Clock, k: 'Average SLA', v: '< 1-2h Response' },
    { icon: Cpu, k: 'Performance', v: '60 FPS GPU Profiling' },
    { icon: Zap, k: 'Security', v: 'Fiverr Pro Escrow' },
  ];

  return (
    <div className="ah-page ah-faq">
      {/* 1. HERO HEADER */}
      <section className="ah-phero">
        <div className="ah-glow" aria-hidden="true" />
        <div className="ah-grid">
          <p className="ah-chapter">
            <span className="ah-pill"><span className="ah-pill-dot" />DIRECT ARCHITECT DISPATCH // TRANSPARENT PROTOCOL</span>
          </p>
          <div className="ah-phero-title">
            <BlurText as="h1" load text="KNOWLEDGE VAULT & PROTOCOLS" serif={['&']} className="ah-d1" />
          </div>
          <div className="ah-phero-side">
            <BlurText
              load
              delay={0.3}
              text="Clear answers on custom Next.js builds, WebGL shaders, milestone escrow security, and 100% full source code ownership."
              className="ah-lede"
            />
            <button
              type="button"
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              id="faq-direct-inquiry-btn"
              className="ah-btn ah-btn-primary"
            >
              <span>Ask Direct Question</span>
              <Arrow className="ah-btn-arrow" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. STATUS LINE */}
      <div className="ah-stats">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <div key={st.k} className="ah-stat" data-r="blur" style={{ ['--d' as string]: `${i * 0.08}s` } as React.CSSProperties}>
              <span className="ah-label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon className="w-3.5 h-3.5" /> {st.k}
              </span>
              <h4 className="ah-stat-v">{st.v}</h4>
            </div>
          );
        })}
      </div>

      {/* 3. CATEGORY INDEX & SEARCH */}
      <div className="ah-faq-bar">
        <div className="ah-tabs" role="tablist" aria-label="Filter questions">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.name;
            const count = getCategoryCount(cat.name);
            return (
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                key={cat.name}
                onClick={() => handleSelectCategory(cat.name)}
                id={`faq-filter-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`ah-tab ${isActive ? 'is-active' : ''}`}
              >
                <span>{cat.label}</span>
                <sup>{count}</sup>
              </button>
            );
          })}
        </div>
        <label className="ah-search">
          <Search className="w-3.5 h-3.5" />
          <input
            type="text"
            placeholder="Search knowledge..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setSearchQuery('');
              }}
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </label>
      </div>

      {/* 4. ACCORDION INDEX */}
      {filteredFaqs.length === 0 ? (
        <div className="ah-empty">
          <Sparkles className="w-6 h-6" style={{ color: 'var(--ah-coral)' }} />
          <BlurText as="h3" text="No answers matched your query" className="ah-d3" />
          <p className="ah-lede" style={{ margin: '0 auto' }}>
            Try adjusting your search terms or select &apos;All Knowledge&apos; from the categories above.
          </p>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="ah-btn ah-btn-ghost ah-btn-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <ul className="ah-acc">
          {filteredFaqs.map((item, index) => {
            const isExpanded = expandedIds.includes(item.id);
            const hasVoted = votedIds.includes(item.id);
            const isCopied = copiedId === item.id;

            return (
              <li key={item.id} className={`ah-acc-item ${isExpanded ? 'is-open' : ''}`} data-r="">
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  className="ah-acc-btn"
                  aria-expanded={isExpanded}
                >
                  <span className="ah-acc-n ah-serif ah-dim">{pad(index + 1)}</span>
                  <h3 className="ah-acc-q" style={{ margin: 0 }}>{item.question}</h3>
                  <span className="ah-acc-tag ah-label">{item.categoryTag}</span>
                  <span className="ah-acc-ico" aria-hidden="true" />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, filter: 'blur(8px)' }}
                      animate={{ height: 'auto', opacity: 1, filter: 'blur(0px)' }}
                      exit={{ height: 0, opacity: 0, filter: 'blur(8px)' }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="ah-acc-panel">
                        <div>
                          <p className="ah-acc-a">{item.answer}</p>
                          <div className="ah-acc-actions">
                            <span className="ah-label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <Terminal className="w-3 h-3" />
                              Direct Protocol Guarantee
                            </span>
                            <div className="ah-row">
                              <button
                                type="button"
                                onClick={(e) => handleCopyAnswer(item.id, item.answer, e)}
                                className="ah-mini"
                                title="Copy answer"
                              >
                                {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                <span>{isCopied ? 'Copied' : 'Copy'}</span>
                              </button>
                              <button
                                type="button"
                                onClick={(e) => handleHelpfulFAQ(item.id, e)}
                                className={`ah-mini ${hasVoted ? 'is-on' : ''}`}
                              >
                                <ThumbsUp className="w-3 h-3" />
                                <span>{item.helpfulCount} Helpful</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      )}

      {/* 5. CUSTOM SCOPING CTA */}
      <section className="ah-panel ah-cobalt-ground" aria-label="Custom Engineering Scoping">
        <div className="ah-glow ah-glow-low" aria-hidden="true" />
        <div className="ah-panel-in">
          <div style={{ display: 'grid', gap: 22 }}>
            <span className="ah-label">Custom Engineering Scoping</span>
            <BlurText
              as="h3"
              text="Have a specialized 3D WebGL or architectural requirement?"
              serif={['architectural requirement?']}
              className="ah-d2"
            />
          </div>
          <div className="ah-panel-act" style={{ display: 'grid', gap: 24, maxWidth: 440 }}>
            <p className="ah-lede" data-r="">
              Connect directly with the developer. Receive a clear scope breakdown, fixed milestone timeline, and interactive prototype demo within 24 hours.
            </p>
            <button
              type="button"
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="ah-btn ah-btn-primary"
              style={{ justifySelf: 'start' }}
            >
              <span>Start Milestone Scope</span>
              <Arrow className="ah-btn-arrow" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
