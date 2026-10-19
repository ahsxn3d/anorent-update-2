'use client';

import React, { useState, useEffect, useRef } from 'react';

import {
  ChevronDown,
  ThumbsUp,
  HelpCircle,
  Sparkles,
  Search,
  X,
  ShieldCheck,
  Zap,
  Cpu,
  Clock,
  Copy,
  Check,
  Terminal,
  MessageSquare,
  ArrowRight,
  Code2,
  Filter,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { FAQItem, FaqHeaderConfig, Page } from '../types';
import { ButterButton } from '../components/ButterButton';
import { ScrollReveal } from '../components/ScrollReveal';
import { GsapPlayfulText } from '../components/GsapPlayfulText';
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
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = [
    { name: 'All', label: 'All Knowledge', icon: Sparkles },
    { name: 'Pricing & Scoping', label: 'Pricing & Rates', icon: Zap },
    { name: '100% IP Transfer', label: 'IP Ownership', icon: ShieldCheck },
    { name: 'Milestone Escrow', label: 'Escrow Terms', icon: Clock },
    { name: 'Engineering', label: 'Tech & 3D', icon: Cpu },
    { name: 'No Middlemen', label: 'Direct Access', icon: Terminal },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    setIsDropdownOpen(false);
  };

  const activeCategoryObj = categories.find((c) => c.name === selectedCategory) || categories[0];

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

  return (
    <div className="space-y-8 sm:space-y-12 pb-8 px-1 sm:px-0">
      
      {/* ========================================================= */}
      {/* 1. HERO HEADER WITH AWWWARDS-GRADE ANIMATED DISPLAY */}
      {/* ========================================================= */}
      <ScrollReveal direction="down" delay={0.05} distance={20}>
        <div className="lux-page-head flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-10 border-b border-[#232837] pt-10 sm:pt-20 pb-10 sm:pb-14">
          <div className="space-y-1.5 sm:space-y-2.5 max-w-2xl">
            <div className="lux-eyebrow inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#5E667A] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>DIRECT ARCHITECT DISPATCH // TRANSPARENT PROTOCOL</span>
            </div>
            
            <GsapPlayfulText
              as="h1"
              text="KNOWLEDGE VAULT & PROTOCOLS"
              highlightWords={['KNOWLEDGE', 'PROTOCOLS']}
              gradientTheme="pure-purple"
              className="font-display text-2xl sm:text-5xl lg:text-6xl font-black text-[#E8EBF2] tracking-tight uppercase"
              staggerDelay={0.02}
              initialDelay={0.1}
            />

            <GsapPlayfulText
              as="p"
              text="Clear answers on custom Next.js builds, WebGL shaders, milestone escrow security, and 100% full source code ownership."
              highlightWords={['Next.js builds', 'WebGL shaders', 'milestone escrow', '100% full source code ownership']}
              gradientTheme="purple-cyan"
              className="text-xs sm:text-sm text-slate-300 max-w-2xl font-medium leading-relaxed"
              staggerDelay={0.012}
              initialDelay={0.2}
            />
          </div>

          {/* Right Action: Direct Question CTA */}
          <div className="shrink-0">
            <ButterButton
              variant="primary"
              size="md"
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              id="faq-direct-inquiry-btn"
              icon={<MessageSquare className="w-4 h-4" />}
              iconPosition="left"
              className="uppercase tracking-wider font-black w-full sm:w-auto"
            >
              Ask Direct Question
            </ButterButton>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 order-2 lg:order-1">
      {/* ========================================================= */}
      {/* 2. LUXURY TELEMETRY STATUS PILLS (EXPENSIVE AESTHETIC) */}
      {/* ========================================================= */}
      <div data-fx="rise">
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-px bg-[#232837] border border-[#232837] rounded-[12px] overflow-hidden lux-faq-stats">
          
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#131422]/90 backdrop-blur-2xl border border-purple-500/30 shadow-xl flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-400 block">
                IP Ownership
              </span>
              <h4 className="font-bold text-xs sm:text-sm text-[#E8EBF2] truncate">100% Code Transfer</h4>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#131422]/90 backdrop-blur-2xl border border-purple-500/30 shadow-xl flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20 text-[#C084FC] border border-purple-500/30 shrink-0">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-purple-300 block">
                Average SLA
              </span>
              <h4 className="font-bold text-xs sm:text-sm text-[#E8EBF2] truncate">&lt; 1-2h Response</h4>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#131422]/90 backdrop-blur-2xl border border-purple-500/30 shadow-xl flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-[#38BDF8] border border-cyan-500/30 shrink-0">
              <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-cyan-300 block">
                Performance
              </span>
              <h4 className="font-bold text-xs sm:text-sm text-[#E8EBF2] truncate">60 FPS GPU Profiling</h4>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#131422]/90 backdrop-blur-2xl border border-purple-500/30 shadow-xl flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-amber-300 block">
                Security
              </span>
              <h4 className="font-bold text-xs sm:text-sm text-[#E8EBF2] truncate">Fiverr Pro Escrow</h4>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. DIRECT CUSTOM SCOPING / INQUIRY TERMINAL (BOTTOM CTA) */}
      {/* ========================================================= */}
      <div data-fx="rise">
        <div className="p-4 sm:p-8 bg-gradient-to-br from-[#180A30] via-[#100720] to-[#0A0B14] rounded-2xl sm:rounded-3xl border border-purple-400/40 shadow-2xl space-y-4">
          <div className="flex flex-col gap-5">
            <div className="space-y-1.5 max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-cyan-300 uppercase">
                <Terminal className="w-3.5 h-3.5 text-cyan-300" />
                <span>Custom Engineering Scoping</span>
              </div>
              <h3 className="font-display font-black text-base sm:text-2xl text-[#E8EBF2]">
                Have a specialized 3D WebGL or architectural requirement?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                Connect directly with the developer. Receive a clear scope breakdown, fixed milestone timeline, and interactive prototype demo within 24 hours.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <ButterButton
                variant="primary"
                size="md"
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="uppercase tracking-wider font-extrabold w-full sm:w-auto text-center justify-center"
              >
                Start Milestone Scope
              </ButterButton>
            </div>
          </div>
        </div>
      </div>
        </aside>
        <div className="lux-faq-main min-w-0 lg:col-span-8 space-y-8 order-1 lg:order-2">
      {/* ========================================================= */}
      {/* 3. COMPACT STRAIGHT-LINE BUBBLE CATEGORY BAR & SEARCH */}
      {/* ========================================================= */}
      <div data-fx="rise" className="relative z-40">
        <div className="relative z-40 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-2 p-1.5 sm:p-2 bg-[#131422]/90 backdrop-blur-2xl rounded-full border border-purple-500/30 shadow-xl max-xl:rounded-2xl">
          
          {/* DESKTOP (xl+) CATEGORY FILTER CHIPS */}
          <div className="hidden xl:flex items-center gap-1.5 overflow-visible py-0.5 px-1 relative z-10">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.name;
              const count = getCategoryCount(cat.name);
              const Icon = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => handleSelectCategory(cat.name)}
                  id={`faq-filter-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`relative px-3 py-1.5 text-xs font-bold rounded-full transition-colors duration-200 cursor-pointer select-none shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#E8EBF2] font-extrabold'
                      : 'text-slate-300 hover:text-[#E8EBF2] font-semibold'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFaqCategoryBubble"
                      className="absolute inset-0 bg-gradient-to-r from-[#8B00EE] via-[#A855F7] to-[#7C3AED] rounded-full shadow-[0_0_22px_rgba(168,85,247,0.75),inset_0_1px_1px_rgba(232, 235, 242,0.4)] z-0"
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 18,
                        mass: 0.8,
                        bounce: 0.45,
                      }}
                    >
                      <motion.div
                        layoutId="activeFaqCategoryOutline"
                        className="absolute -inset-[1.5px] rounded-full border-2 border-purple-200/90 shadow-[0_0_18px_rgba(192,132,252,0.85)] pointer-events-none"
                        transition={{
                          type: 'spring',
                          stiffness: 350,
                          damping: 18,
                          mass: 0.8,
                          bounce: 0.45,
                        }}
                      />
                      <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-[#E8EBF2]/25 to-transparent rounded-t-full pointer-events-none" />
                    </motion.div>
                  )}
                  <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? 'text-[#E8EBF2]' : 'text-[#C084FC]'}`} />
                  <span className="relative z-10 whitespace-nowrap text-xs">{cat.label}</span>
                  <span className={`relative z-10 text-[9px] px-1.5 py-0.2 rounded-full font-mono font-extrabold ${
                    isActive ? 'bg-[#E8EBF2]/30 text-[#E8EBF2]' : 'bg-[#E8EBF2]/10 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* MOBILE & TABLET COMPACT DROPDOWN SELECTOR (< xl) */}
          <div className="block xl:hidden relative z-50" ref={dropdownRef}>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                sound.playClick();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-full bg-[#0A0B14]/90 border border-purple-400/40 text-[#E8EBF2] cursor-pointer shadow-lg hover:border-purple-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#8B00EE]/30 flex items-center justify-center text-[#C084FC]">
                  {React.createElement(activeCategoryObj.icon, { className: 'w-3 h-3 text-[#C084FC]' })}
                </div>
                <span className="text-xs font-bold text-[#E8EBF2]">
                  {activeCategoryObj.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-[#8B00EE]/30 text-[10px] font-mono text-purple-200">
                  {getCategoryCount(activeCategoryObj.name)} items
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-purple-300 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-[#E8EBF2]' : ''}`} />
              </div>
            </motion.button>

            {/* Floating Dropdown List */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute left-0 right-0 top-full mt-1.5 overflow-hidden bg-[#100420]/95 backdrop-blur-2xl rounded-2xl border border-purple-400/60 shadow-[0_20px_50px_rgba(6, 8, 12,0.95),0_0_25px_rgba(139,0,238,0.5)] p-1.5 space-y-1 z-50"
                >
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat.name;
                    const count = getCategoryCount(cat.name);
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.name}
                        onClick={() => handleSelectCategory(cat.name)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#8B00EE] to-[#A855F7] text-[#E8EBF2] shadow-md'
                            : 'text-slate-300 hover:bg-purple-950/60 hover:text-[#E8EBF2]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#E8EBF2]' : 'text-[#C084FC]'}`} />
                          <span>{cat.label}</span>
                        </div>
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                          isSelected ? 'bg-[#E8EBF2]/30 text-[#E8EBF2]' : 'bg-purple-950/80 text-purple-300'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Compact Search Bar */}
          <div className="relative w-full lg:w-56 shrink-0 flex items-center px-1 lg:px-0 lg:pr-0.5">
            <Search className="w-3.5 h-3.5 absolute left-3.5 lg:left-3 text-[#C084FC] pointer-events-none" />
            <input
              type="text"
              placeholder="Search knowledge..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8.5 pr-7 py-1 h-8 bg-[#0A0B14]/90 border border-purple-500/35 rounded-full text-xs font-medium text-[#E8EBF2] placeholder-slate-400 focus:outline-none focus:border-[#A855F7]/90 focus:shadow-[0_0_12px_rgba(139,0,238,0.3)] transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  sound.playClick();
                  setSearchQuery('');
                }}
                className="absolute right-3 lg:right-2.5 p-1 rounded-full text-slate-400 hover:text-[#E8EBF2] transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. BESPOKE HOLOGRAPHIC ACCORDION CARDS (EXPENSIVE & RICH) */}
      {/* ========================================================= */}
      {filteredFaqs.length === 0 ? (
        <div data-fx="rise" className="text-center py-12 px-4 bg-[#131422]/60 rounded-3xl border border-purple-500/20 backdrop-blur-xl space-y-3">
          <HelpCircle className="w-10 h-10 text-purple-400 mx-auto animate-pulse" />
          <h3 className="font-display text-lg font-bold text-[#E8EBF2]">No answers matched your query</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search terms or select &apos;All Knowledge&apos; from the categories above.
          </p>
          <button
            onClick={() => {
              sound.playClick();
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 bg-[#8B00EE] hover:bg-[#A855F7] text-[#E8EBF2] text-xs font-bold rounded-full transition-all shadow-md mt-2 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4" data-fx="cards">
          {filteredFaqs.map((item) => {
            const isExpanded = expandedIds.includes(item.id);
            const hasVoted = votedIds.includes(item.id);
            const isCopied = copiedId === item.id;

            return (
              <div key={item.id}>
                <div
                  data-fx-item
                  className={`lux-flip relative overflow-hidden rounded-xl sm:rounded-2xl border transition-all duration-300 backdrop-blur-2xl ${
                    isExpanded
                      ? 'bg-[#131422]/95 border-purple-400/80 shadow-[0_10px_30px_rgba(6, 8, 12,0.8),0_0_25px_rgba(139,0,238,0.25)]'
                      : 'bg-[#131422]/80 border-purple-500/25 hover:border-purple-400/60 shadow-lg'
                  }`}
                >
                  {/* Subtle top indicator bar when open */}
                  {isExpanded && (
                    <div className="h-0.5 w-full bg-gradient-to-r from-[#8B00EE] via-[#C084FC] to-[#38BDF8]" />
                  )}

                  {/* Accordion Trigger Header */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full text-left p-3.5 sm:p-5 flex items-center justify-between gap-3 cursor-pointer focus:outline-none select-none group"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-4 flex-1 min-w-0">
                      {/* Left Badge */}
                      <span className="px-2.5 py-1 bg-[#8B00EE]/20 border border-purple-400/40 text-[#C084FC] text-[9px] sm:text-[10px] font-mono font-extrabold uppercase tracking-wider rounded-full shrink-0 shadow-sm">
                        {item.categoryTag}
                      </span>

                      {/* Question Text */}
                      <h3 className={`font-bold text-xs sm:text-base leading-snug transition-colors ${
                        isExpanded ? 'text-[#E8EBF2] font-extrabold' : 'text-slate-200 group-hover:text-[#E8EBF2]'
                      }`}>
                        {item.question}
                      </h3>
                    </div>

                    {/* Expand/Collapse Chevron Button */}
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all shrink-0 border ${
                        isExpanded
                          ? 'bg-[#8B00EE] text-[#E8EBF2] border-purple-300 shadow-[0_0_12px_rgba(139,0,238,0.6)] rotate-180'
                          : 'bg-[#0A0B14]/80 text-purple-300 border-purple-500/30 group-hover:border-purple-400 group-hover:text-[#E8EBF2]'
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300" />
                    </div>
                  </button>

                  {/* Expanded Answer Content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-3.5 sm:px-5 pb-4 sm:pb-5 pt-1 sm:pt-2 space-y-3.5 border-t border-purple-500/20">
                          
                          {/* Rich Answer Text */}
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium bg-[#0A0B14]/60 p-3 sm:p-4 rounded-xl border border-[#E8EBF2]/5 shadow-inner">
                            {item.answer}
                          </p>

                          {/* Interactive Telemetry & Action Footer */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                            
                            {/* Verification Pill */}
                            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-purple-300">
                              <Code2 className="w-3 h-3 text-[#C084FC]" />
                              <span>Direct Protocol Guarantee</span>
                            </div>

                            {/* Actions: Thumbs Up & Copy */}
                            <div className="flex items-center gap-2">
                              {/* Copy Answer Button */}
                              <button
                                onClick={(e) => handleCopyAnswer(item.id, item.answer, e)}
                                className="px-2.5 py-1 rounded-full bg-[#0A0B14]/90 hover:bg-[#131422] border border-purple-500/30 text-slate-300 hover:text-[#E8EBF2] text-[10px] font-mono font-semibold flex items-center gap-1 transition-all cursor-pointer shadow-sm"
                                title="Copy answer"
                              >
                                {isCopied ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span className="text-emerald-300">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3 text-purple-300" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>

                              {/* Was this helpful button */}
                              <button
                                onClick={(e) => handleHelpfulFAQ(item.id, e)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                                  hasVoted
                                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                                    : 'bg-[#0A0B14]/90 border-purple-500/30 text-purple-200 hover:border-purple-400 hover:text-[#E8EBF2] shadow-sm'
                                }`}
                              >
                                <ThumbsUp className={`w-3 h-3 ${hasVoted ? 'text-emerald-400' : 'text-purple-300'}`} />
                                <span>{item.helpfulCount} Helpful</span>
                              </button>
                            </div>

                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      )}

        </div>
      </div>

    </div>
  );
};

export default FAQPage;
