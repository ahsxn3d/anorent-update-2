'use client';

import React, { useState, useEffect, useRef } from 'react';

import { Mail, Copy, Check, Send, Sparkles, MessageCircle, Clock, Zap, Layers, ArrowUpRight, Twitter, ChevronDown, DollarSign, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Page, ReviewItem, ContactSubmission } from '../types';
import { AddReviewForm } from '../components/ReviewsSection';
import { ButterButton } from '../components/ButterButton';
import { ScrollReveal } from '../components/ScrollReveal';
import { GsapPlayfulText } from '../components/GsapPlayfulText';

interface ContactPageProps {
  setCurrentPage?: (page: Page) => void;
  onAddReview?: (review: Omit<ReviewItem, 'id' | 'dateString' | 'isVerified' | 'isApproved'>) => void;
  onContactSubmit?: (submission: ContactSubmission) => void | Promise<void>;

  contactEmail?: string;
  whatsappNumber?: string;
  fiverrUrl?: string;
  dribbbleUrl?: string;
  twitterUrl?: string;
}

interface BudgetOption {
  value: string;
  range: string;
  scope: string;
  badge?: string;
  isPopular?: boolean;
}

const BUDGET_OPTIONS: BudgetOption[] = [
  {
    value: '$1k - $3k (Micro Deployment)',
    range: '$1k – $3k',
    scope: 'Micro Deployment • MVP, High-Performance Landing or UI Suite',
    badge: '⚡ Fast Sprint',
  },
  {
    value: '$3k - $7k (Full Web App)',
    range: '$3k – $7k',
    scope: 'Full Web App • Bespoke Dynamic Architecture, Custom APIs, Edge Database',
    badge: '★ Most Popular',
    isPopular: true,
  },
  {
    value: '$7k - $15k (Enterprise Architecture)',
    range: '$7k – $15k',
    scope: 'Enterprise Architecture • High-Throughput System, 3D/Shaders & High Scale',
    badge: '🛡️ Scaled Infra',
  },
  {
    value: '$15k+ (Bespoke Retainer / Studio Partner)',
    range: '$15k+',
    scope: 'Bespoke Retainer • Dedicated Studio Sprints & Full Lead Architecture',
    badge: '💎 Executive Tier',
  },
];

export const ContactPage: React.FC<ContactPageProps> = ({
  setCurrentPage,
  onAddReview,
  onContactSubmit,
  contactEmail = 'ahsxn3d@gmail.com',
  whatsappNumber = '03284992759',
  fiverrUrl = 'https://www.fiverr.com/ahsxn_dev',
  dribbbleUrl = 'https://dribbble.com/ahsxn_dev',
  twitterUrl = 'https://x.com/Ahsanwebdesign',
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [hasMounted, setHasMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setHasMounted(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Formatted Date & Time Strings (Hydration-safe)
  const hours = hasMounted && currentTime ? String(currentTime.getHours()).padStart(2, '0') : '12';
  const minutes = hasMounted && currentTime ? String(currentTime.getMinutes()).padStart(2, '0') : '00';
  const seconds = hasMounted && currentTime ? String(currentTime.getSeconds()).padStart(2, '0') : '00';
  const dayName = hasMounted && currentTime ? currentTime.toLocaleDateString('en-US', { weekday: 'long' }) : 'Saturday';
  const monthName = hasMounted && currentTime ? currentTime.toLocaleDateString('en-US', { month: 'long' }) : 'August';
  const dayNum = hasMounted && currentTime ? currentTime.getDate() : 30;
  const year = hasMounted && currentTime ? currentTime.getFullYear() : 2026;

  // Form State for Direct Email Brief (Card 1)
  const [clientName, setClientName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [budgetTier, setBudgetTier] = useState<string>('$3k - $7k (Full Web App)');
  const [isBudgetOpen, setIsBudgetOpen] = useState<boolean>(false);
  const budgetDropdownRef = useRef<HTMLDivElement>(null);
  const [projectBrief, setProjectBrief] = useState<string>('');
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);

  // Close budget dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (budgetDropdownRef.current && !budgetDropdownRef.current.contains(event.target as Node)) {
        setIsBudgetOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedBudgetObj = BUDGET_OPTIONS.find((b) => b.value === budgetTier) || BUDGET_OPTIONS[1];

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmitBrief = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !email) return;

    if (onContactSubmit) {
      try {
        await onContactSubmit({
          name: clientName,
          email,
          budgetTier,
          projectBrief,
        });
      } catch (err) {
        console.error('Submission error:', err);
      }
    }

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setClientName('');
      setEmail('');
      setProjectBrief('');
    }, 3500);
  };

  return (
    <div className="min-h-screen text-[#EDE9E3] space-y-10 sm:space-y-12 my-4 pb-16">
      
      {/* STEP 1: HERO HEADER WITH SCROLL REVEAL & GSAP PLAYFUL TYPOGRAPHY */}
      <ScrollReveal direction="down" delay={0.05} distance={24}>
        <div className="space-y-3.5 border-b border-purple-500/20 pb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#8B00EE]/15 border border-[#8B00EE]/35 rounded-full text-xs font-black tracking-widest text-[#C084FC] uppercase shadow-md backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-[#C084FC] animate-pulse" />
            <span>Anorix Studio • Official Contact Portals</span>
          </div>
          
          <GsapPlayfulText
            as="h1"
            text="LET'S BUILD TOGETHER."
            highlightWords={["LET'S", "BUILD"]}
            gradientTheme="pure-purple"
            className="font-display text-4xl sm:text-6xl lg:text-8xl font-black text-[#EDE9E3] tracking-tight uppercase leading-none"
            staggerDelay={0.03}
            initialDelay={0.1}
          />

          <GsapPlayfulText
            as="p"
            text="Reach out via any of our official channels: Direct Email, Fiverr Pro, Dribbble, Twitter, or WhatsApp."
            highlightWords={['Direct Email', 'Fiverr Pro', 'Dribbble', 'Twitter', 'WhatsApp']}
            gradientTheme="purple-cyan"
            className="text-sm sm:text-base text-slate-300 max-w-3xl font-medium leading-relaxed"
            staggerDelay={0.012}
            initialDelay={0.2}
          />
        </div>
      </ScrollReveal>

      {/* STEP 2: UNIFIED 2-IN-1 ROW CONTACT CARDS GRID */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-6 items-stretch">
        
        {/* ================= CARD 1: DIRECT EMAIL (FULL ROW - 2 COLS) ================= */}
        <ScrollReveal direction="up" delay={0.1} distance={20} className="col-span-2 h-full">
          <div className="bg-[#131422]/90 backdrop-blur-2xl border border-[#A855F7]/80 shadow-[0_0_30px_rgba(139,0,238,0.3)] lg:border-purple-500/30 lg:shadow-2xl lg:hover:shadow-[0_0_35px_rgba(139,0,238,0.35)] lg:hover:border-[#A855F7]/80 transition-all duration-300 rounded-xl sm:rounded-3xl p-3.5 sm:p-6 lg:p-8 space-y-3 sm:space-y-6 flex flex-col justify-between h-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-purple-500/20 pb-3 sm:pb-5 gap-2.5 sm:gap-3">
              <div className="space-y-0.5 sm:space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 sm:px-2.5 py-0.5 bg-[#8B00EE]/25 text-[#C084FC] text-[8px] sm:text-[10px] font-mono font-bold rounded-full uppercase tracking-wider border border-[#8B00EE]/40 shadow-[0_0_10px_rgba(139,0,238,0.3)]">
                    Card 01
                  </span>
                  <span className="text-xs text-slate-500">•</span>
                  <h2 className="font-display text-sm sm:text-xl lg:text-2xl font-black text-[#EDE9E3] uppercase tracking-wide flex items-center gap-1.5 sm:gap-2">
                    <Mail className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#C084FC]" />
                    <span>Direct Email</span>
                  </h2>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-300 font-medium">
                  Direct transmission line to <strong className="text-[#EDE9E3] font-mono">ahsxn3d@gmail.com</strong>
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onPointerDown={() => handleCopy('ahsxn3d@gmail.com', 'direct-email')}
                  className="px-2.5 sm:px-3 py-1 sm:py-2 bg-[#8B00EE]/25 hover:bg-[#8B00EE]/40 border border-[#8B00EE]/50 text-[9px] sm:text-xs font-mono font-bold text-[#EDE9E3] rounded-lg sm:rounded-xl flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer shadow-[0_0_12px_rgba(139,0,238,0.25)] hover:scale-105"
                >
                  {copiedField === 'direct-email' ? <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" /> : <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C084FC]" />}
                  <span>{copiedField === 'direct-email' ? 'Copied!' : 'Copy Email'}</span>
                </button>
              </div>
            </div>

            {submittedSuccess ? (
              <div className="p-5 sm:p-8 text-center bg-[#8B00EE]/20 rounded-xl sm:rounded-2xl border border-[#8B00EE]/40 space-y-2 sm:space-y-3 my-auto shadow-inner">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-[#C084FC] mx-auto animate-bounce" />
                <h3 className="font-display text-base sm:text-lg font-extrabold text-[#EDE9E3] uppercase tracking-wider">
                  Direct Email Transmitted!
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-300 max-w-md mx-auto font-medium">
                  Your project parameters have been dispatched directly. SLA reply guaranteed within &lt;24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitBrief} className="space-y-2.5 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                  <div>
                    <label className="block text-[9px] sm:text-xs font-mono font-extrabold text-[#C084FC] uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcus Aurelius"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3 py-1.5 sm:py-2.5 bg-[#0A0B14]/80 border border-purple-500/30 rounded-lg sm:rounded-xl text-xs font-semibold text-[#EDE9E3] placeholder-slate-500 focus:outline-none focus:border-[#A855F7]/70 transition-all shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] sm:text-xs font-mono font-extrabold text-[#C084FC] uppercase tracking-wider mb-1">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. marcus@hyperion.io"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-1.5 sm:py-2.5 bg-[#0A0B14]/80 border border-purple-500/30 rounded-lg sm:rounded-xl text-xs font-semibold text-[#EDE9E3] placeholder-slate-500 focus:outline-none focus:border-[#A855F7]/70 transition-all shadow-xs"
                    />
                  </div>
                </div>

                {/* BESPOKE IN-FLOW CYBERPUNK BUDGET TIER SELECTOR */}
                <div className="space-y-1.5" ref={budgetDropdownRef}>
                  <div className="flex items-center justify-between">
                    <label className="block text-[9px] sm:text-xs font-mono font-extrabold text-[#C084FC] uppercase tracking-wider">
                      Budget Tier & Sprint Scope
                    </label>
                    <span className="text-[8px] sm:text-[10px] text-slate-400 font-normal">Fixed Scope & Escrow Protected</span>
                  </div>
                  
                  {/* Selected Tier Banner / Expansion Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setIsBudgetOpen(!isBudgetOpen)}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-[#0A0B14] hover:bg-[#110624] border ${
                      isBudgetOpen
                        ? 'border-[#A855F7] shadow-[0_0_20px_rgba(139,0,238,0.35)] ring-1 ring-[#A855F7]/60'
                        : 'border-purple-500/35 hover:border-purple-400/60'
                    } rounded-lg sm:rounded-xl text-left flex items-center justify-between gap-2 transition-all duration-200 cursor-pointer shadow-xs`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="px-2 py-0.5 bg-[#8B00EE]/30 border border-[#8B00EE]/50 text-purple-200 text-[10px] sm:text-xs font-mono font-black rounded-md shrink-0 shadow-[0_0_8px_rgba(139,0,238,0.3)]">
                        {selectedBudgetObj.range}
                      </div>
                      <div className="truncate flex items-center gap-1.5">
                        <span className="text-xs sm:text-sm font-bold text-[#EDE9E3] truncate">
                          {selectedBudgetObj.value.replace(/^[^(]+\(([^)]+)\)$/, '$1')}
                        </span>
                        {selectedBudgetObj.badge && (
                          <span className={`hidden xs:inline-block px-1.5 py-0.2 rounded-full text-[8px] sm:text-[9px] font-mono font-bold shrink-0 ${
                            selectedBudgetObj.isPopular
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          }`}>
                            {selectedBudgetObj.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 text-[#C084FC]">
                      <span className="text-[9px] sm:text-[10px] font-mono text-purple-300/80 hidden xs:inline">
                        {isBudgetOpen ? 'Close Tiers' : 'Change Tier'}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isBudgetOpen ? 'rotate-180 text-pink-400' : 'text-purple-400'
                        }`}
                      />
                    </div>
                  </button>

                  {/* In-Flow Animated Cyber Tier Matrix (Never clips or overlaps sibling sections) */}
                  <AnimatePresence initial={false}>
                    {isBudgetOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="bg-[#090314]/95 border border-purple-500/45 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 space-y-1.5 shadow-[0_10px_30px_rgba(12, 11, 10,0.8),0_0_20px_rgba(139,0,238,0.25)] mt-1.5">
                          <div className="px-2 py-1 text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase border-b border-purple-500/20 flex items-center justify-between">
                            <span>SELECT YOUR ESTIMATED SPRINT TIER</span>
                            <span className="text-purple-400">100% ESCROW SECURED</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-0.5">
                            {BUDGET_OPTIONS.map((opt) => {
                              const isSelected = budgetTier === opt.value;
                              return (
                                <div
                                  key={opt.value}
                                  onClick={() => {
                                    setBudgetTier(opt.value);
                                    setIsBudgetOpen(false);
                                  }}
                                  className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-150 flex items-start justify-between gap-2.5 border ${
                                    isSelected
                                      ? 'bg-gradient-to-br from-[#8B00EE]/35 to-purple-900/30 border-[#A855F7] shadow-[0_0_15px_rgba(139,0,238,0.35)] ring-1 ring-[#A855F7]/40'
                                      : 'bg-[#0E071A]/70 hover:bg-[#1A0C2E]/80 border-purple-500/20 hover:border-purple-400/50'
                                  }`}
                                >
                                  <div className="space-y-1 min-w-0 flex-1">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] sm:text-xs font-black ${
                                        isSelected
                                          ? 'bg-[#8B00EE] text-[#EDE9E3] shadow-[0_0_10px_rgba(139,0,238,0.5)]'
                                          : 'bg-[#EDE9E3]/10 text-purple-300'
                                      }`}>
                                        {opt.range}
                                      </span>
                                      <span className="font-bold text-xs text-[#EDE9E3]">
                                        {opt.value.replace(/^[^(]+\(([^)]+)\)$/, '$1')}
                                      </span>
                                    </div>
                                    <p className="text-[9.5px] sm:text-[10.5px] text-slate-300 leading-tight">
                                      {opt.scope}
                                    </p>
                                    {opt.badge && (
                                      <div className="pt-0.5">
                                        <span className={`inline-block px-1.5 py-0.2 rounded-full text-[8px] sm:text-[9px] font-mono font-bold ${
                                          opt.isPopular
                                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                            : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                        }`}>
                                          {opt.badge}
                                        </span>
                                      </div>
                                    )}
                                  </div>

                                  <div className="shrink-0 pt-0.5">
                                    {isSelected ? (
                                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                                        <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                      </div>
                                    ) : (
                                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-purple-500/30" />
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label className="block text-[9px] sm:text-xs font-mono font-extrabold text-[#C084FC] uppercase tracking-wider mb-1">
                    Project Brief & Objectives
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Describe your vision and requirements..."
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                    className="w-full px-3 py-1.5 sm:py-2.5 bg-[#0A0B14]/80 border border-purple-500/30 rounded-lg sm:rounded-xl text-xs font-semibold text-[#EDE9E3] placeholder-slate-500 focus:outline-none focus:border-[#A855F7]/70 transition-all shadow-xs"
                  />
                </div>

                <ButterButton
                  variant="primary"
                  size="md"
                  type="submit"
                  id="submit-direct-email-btn"
                  icon={<Send className="w-3.5 h-3.5" />}
                  iconPosition="right"
                  className="w-full uppercase tracking-widest font-black text-center justify-center py-2 sm:py-3"
                >
                  SEND DIRECT EMAIL BRIEF
                </ButterButton>
              </form>
            )}
          </div>
        </ScrollReveal>

        {/* ================= CARD 2: FIVERR (COL 1 OF ROW 2) ================= */}
        <ScrollReveal direction="up" delay={0.14} distance={20} className="col-span-1 h-full">
          <div className="channel-fiverr bg-[#131422]/90 backdrop-blur-2xl border border-emerald-500/80 rounded-xl sm:rounded-3xl p-3 sm:p-6 lg:p-7 space-y-2.5 sm:space-y-5 flex flex-col justify-between h-full">
            <div className="space-y-1.5 sm:space-y-2.5 border-b border-purple-500/20 pb-2 sm:pb-4">
              <div className="flex items-center justify-between">
                <span className="px-2 sm:px-2.5 py-0.5 bg-emerald-500/25 text-emerald-300 text-[8px] sm:text-[10px] font-mono font-bold rounded-full uppercase tracking-wider border border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                  Card 02
                </span>
                <span className="text-[8px] sm:text-[10px] font-mono text-emerald-400 font-bold uppercase truncate">Escrow</span>
              </div>
              
              <h2 className="font-display text-sm sm:text-xl lg:text-2xl font-black text-[#EDE9E3] uppercase tracking-wide flex items-center gap-1.5 sm:gap-2">
                <Layers className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-400 shrink-0" />
                <span className="truncate">Fiverr</span>
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-300 leading-relaxed font-medium line-clamp-2 sm:line-clamp-none">
                Hire via verified Fiverr Pro milestone escrow with 100% protection.
              </p>
            </div>

            <div className="space-y-1.5 sm:space-y-3 my-auto py-1 sm:py-2">
              <div className="p-2 sm:p-3.5 bg-[#0A0B14]/80 rounded-lg sm:rounded-2xl border border-emerald-500/30 space-y-0.5 sm:space-y-1 shadow-xs">
                <span className="text-[8px] sm:text-[10px] font-mono text-emerald-400 uppercase block font-bold">Escrow Advantage</span>
                <p className="text-[10px] sm:text-xs font-semibold text-[#EDE9E3] truncate">Funds held safely in escrow.</p>
              </div>

              <div className="p-2 sm:p-3.5 bg-[#0A0B14]/80 rounded-lg sm:rounded-2xl border border-emerald-500/30 flex items-center justify-between shadow-xs">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400">Verified</span>
                <span className="px-2 py-0.5 bg-emerald-500/25 text-emerald-300 text-[8px] sm:text-[10px] font-mono font-extrabold uppercase rounded-full border border-emerald-500/40">
                  Fiverr Pro
                </span>
              </div>
            </div>

            <ButterButton
              variant="emerald"
              size="sm"
              href={fiverrUrl || 'https://www.fiverr.com/ahsxn_dev'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order on Fiverr Pro"
              icon={<ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
              iconPosition="right"
              className="w-full uppercase tracking-wider font-extrabold text-center justify-center text-[10px] sm:text-xs py-1.5 sm:py-2.5"
            >
              FIVERR
            </ButterButton>
          </div>
        </ScrollReveal>

        {/* ================= CARD 3: DRIBBBLE (COL 2 OF ROW 2) ================= */}
        <ScrollReveal direction="up" delay={0.16} distance={20} className="col-span-1 h-full">
          <div className="channel-dribbble bg-[#131422]/90 backdrop-blur-2xl border border-pink-500/80 rounded-xl sm:rounded-3xl p-3 sm:p-6 lg:p-7 space-y-2.5 sm:space-y-5 flex flex-col justify-between h-full">
            <div className="space-y-1.5 sm:space-y-2.5 border-b border-purple-500/20 pb-2 sm:pb-4">
              <div className="flex items-center justify-between">
                <span className="px-2 sm:px-2.5 py-0.5 bg-pink-500/25 text-pink-300 text-[8px] sm:text-[10px] font-mono font-bold rounded-full uppercase tracking-wider border border-pink-500/40 shadow-[0_0_8px_rgba(236,72,153,0.3)]">
                  Card 03
                </span>
                <span className="text-[8px] sm:text-[10px] font-mono text-pink-400 font-bold uppercase truncate">40+ Shots</span>
              </div>

              <h2 className="font-display text-sm sm:text-xl lg:text-2xl font-black text-[#EDE9E3] uppercase tracking-wide flex items-center gap-1.5 sm:gap-2">
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-pink-400 shrink-0" />
                <span className="truncate">Dribbble</span>
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-300 leading-relaxed font-medium line-clamp-2 sm:line-clamp-none">
                Explore UI design concepts, motion prototypes, and component systems.
              </p>
            </div>

            <div className="space-y-1.5 sm:space-y-3 my-auto py-1 sm:py-2">
              <div className="p-2 sm:p-3.5 bg-[#0A0B14]/80 rounded-lg sm:rounded-2xl border border-pink-500/30 space-y-0.5 sm:space-y-1 shadow-xs">
                <span className="text-[8px] sm:text-[10px] font-mono text-pink-400 uppercase block font-bold">Featured Works</span>
                <p className="text-[10px] sm:text-xs font-semibold text-[#EDE9E3] truncate">Dashboards, motion & UI suites.</p>
              </div>

              <div className="p-2 sm:p-3.5 bg-[#0A0B14]/80 rounded-lg sm:rounded-2xl border border-pink-500/30 flex items-center justify-between shadow-xs">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400">Portfolio</span>
                <span className="px-2 py-0.5 bg-pink-500/25 text-pink-300 text-[8px] sm:text-[10px] font-mono font-extrabold uppercase rounded-full border border-pink-500/40">
                  Dribbble Pro
                </span>
              </div>
            </div>

            <ButterButton
              variant="pink"
              size="sm"
              href={dribbbleUrl || 'https://dribbble.com/ahsxn_dev'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Dribbble Portfolio"
              icon={<ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
              iconPosition="right"
              className="w-full uppercase tracking-wider font-extrabold text-center justify-center text-[10px] sm:text-xs py-1.5 sm:py-2.5"
            >
              DRIBBBLE
            </ButterButton>
          </div>
        </ScrollReveal>

        {/* ================= CARD 4: TWITTER (COL 1 OF ROW 3) ================= */}
        <ScrollReveal direction="up" delay={0.18} distance={20} className="col-span-1 h-full">
          <div className="channel-twitter bg-[#131422]/90 backdrop-blur-2xl border border-[#EDE9E3]/80 rounded-xl sm:rounded-3xl p-3 sm:p-6 lg:p-7 space-y-2.5 sm:space-y-5 flex flex-col justify-between h-full">
            <div className="space-y-1.5 sm:space-y-2.5 border-b border-purple-500/20 pb-2 sm:pb-4">
              <div className="flex items-center justify-between">
                <span className="px-2 sm:px-2.5 py-0.5 bg-blue-500/25 text-blue-300 text-[8px] sm:text-[10px] font-mono font-bold rounded-full uppercase tracking-wider border border-blue-500/40 shadow-[0_0_8px_rgba(59,130,246,0.3)]">
                  Card 04
                </span>
                <span className="text-[8px] sm:text-[10px] font-mono text-blue-400 font-bold uppercase truncate">Open DMs</span>
              </div>

              <h2 className="font-display text-sm sm:text-xl lg:text-2xl font-black text-[#EDE9E3] uppercase tracking-wide flex items-center gap-1.5 sm:gap-2">
                <Twitter className="w-4 h-4 sm:w-6 sm:h-6 text-[#EDE9E3] shrink-0" />
                <span className="truncate">Twitter</span>
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-300 leading-relaxed font-medium line-clamp-2 sm:line-clamp-none">
                Connect on Twitter / X for live code updates and open DMs.
              </p>
            </div>

            <div className="space-y-1.5 sm:space-y-3 my-auto py-1 sm:py-2">
              <div className="p-2 sm:p-3.5 bg-[#0A0B14]/80 rounded-lg sm:rounded-2xl border border-blue-500/30 space-y-0.5 sm:space-y-1 shadow-xs">
                <span className="text-[8px] sm:text-[10px] font-mono text-blue-400 uppercase block font-bold">Handle</span>
                <p className="text-[10px] sm:text-xs font-mono font-extrabold text-[#EDE9E3] truncate">@Ahsanwebdesign</p>
              </div>

              <div className="p-2 sm:p-3.5 bg-[#0A0B14]/80 rounded-lg sm:rounded-2xl border border-blue-500/30 flex items-center justify-between shadow-xs">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400">Status</span>
                <span className="px-2 py-0.5 bg-blue-500/25 text-blue-300 text-[8px] sm:text-[10px] font-mono font-extrabold uppercase rounded-full border border-blue-500/40">
                  Open DMs
                </span>
              </div>
            </div>

            <ButterButton
              variant="blue"
              size="sm"
              href={twitterUrl || 'https://x.com/Ahsanwebdesign'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect on Twitter / X"
              icon={<ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
              iconPosition="right"
              className="w-full uppercase tracking-wider font-extrabold text-center justify-center text-[10px] sm:text-xs py-1.5 sm:py-2.5"
            >
              TWITTER
            </ButterButton>
          </div>
        </ScrollReveal>

        {/* ================= CARD 5: WHATSAPP (COL 2 OF ROW 3) ================= */}
        <ScrollReveal direction="up" delay={0.20} distance={20} className="col-span-1 h-full">
          <div className="channel-whatsapp bg-[#131422]/90 backdrop-blur-2xl border border-emerald-500/80 rounded-xl sm:rounded-3xl p-3 sm:p-6 lg:p-7 space-y-2.5 sm:space-y-5 flex flex-col justify-between h-full">
            <div className="space-y-1.5 sm:space-y-2.5 border-b border-purple-500/20 pb-2 sm:pb-4">
              <div className="flex items-center justify-between">
                <span className="px-2 sm:px-2.5 py-0.5 bg-emerald-500/25 text-emerald-300 text-[8px] sm:text-[10px] font-mono font-bold rounded-full uppercase tracking-wider border border-emerald-500/40 shadow-[0_0_8px_rgba(37,211,102,0.3)]">
                  Card 05
                </span>
                <span className="text-[8px] sm:text-[10px] font-mono text-emerald-400 font-bold uppercase truncate">Instant</span>
              </div>

              <h2 className="font-display text-sm sm:text-xl lg:text-2xl font-black text-[#EDE9E3] uppercase tracking-wide flex items-center gap-1.5 sm:gap-2">
                <MessageCircle className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-400 shrink-0" />
                <span className="truncate">WhatsApp</span>
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-300 leading-relaxed font-medium line-clamp-2 sm:line-clamp-none">
                Instant mobile messaging for real-time project inquiries.
              </p>
            </div>

            <div className="space-y-1.5 sm:space-y-3 my-auto py-1 sm:py-2">
              <div className="p-2 sm:p-3.5 bg-[#0A0B14]/80 rounded-lg sm:rounded-2xl border border-purple-500/20 space-y-0.5 sm:space-y-1 shadow-xs">
                <span className="text-[8px] sm:text-[10px] font-mono text-emerald-400 uppercase block font-bold">Direct Line</span>
                <p className="text-[10px] sm:text-xs font-mono font-extrabold text-[#EDE9E3] truncate">03284992759</p>
              </div>

              <div className="p-2 sm:p-3.5 bg-[#0A0B14]/80 rounded-lg sm:rounded-2xl border border-purple-500/20 flex items-center justify-between shadow-xs">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400">Status</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[8px] sm:text-[10px] font-mono font-extrabold uppercase rounded-full border border-emerald-500/30">
                  Online
                </span>
              </div>
            </div>

            <ButterButton
              variant="emerald"
              size="sm"
              href="https://wa.me/923284992759"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp Message"
              icon={<ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
              iconPosition="right"
              className="w-full uppercase tracking-wider font-extrabold text-center justify-center text-[10px] sm:text-xs py-1.5 sm:py-2.5"
            >
              WHATSAPP
            </ButterButton>
          </div>
        </ScrollReveal>

      </div>

      {/* STEP 4: SYSTEM TELEMETRY & FULL LIVE CLOCK / CALENDAR BLOCK */}
      <ScrollReveal direction="up" delay={0.15} distance={24}>
        <div className="bg-[#131422]/90 backdrop-blur-2xl border border-purple-500/30 shadow-2xl hover:shadow-[0_0_35px_rgba(139,0,238,0.3)] hover:border-[#A855F7]/70 transition-all duration-300 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6 w-full">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8B00EE]/20 border border-[#8B00EE]/40 text-[#C084FC] text-[9px] sm:text-[10px] font-mono font-bold rounded-full uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-[#C084FC]" />
                <span>Studio Telemetry • Live Clock</span>
              </div>
              <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-black text-[#EDE9E3] uppercase tracking-wide">
                Real-Time Calendar & Telemetry System
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                Synchronized studio system clock displaying exact hours, minutes, seconds, day, month, and year.
              </p>
            </div>

            {/* Live Digital Clock Box */}
            <div className="p-3.5 sm:p-4 bg-[#0A0B14]/80 border border-purple-500/30 rounded-2xl flex flex-row justify-between items-center w-full lg:w-auto gap-4 sm:gap-6 shadow-inner shrink-0">
              <div className="text-left sm:text-center font-mono">
                <span className="text-[9px] sm:text-xs text-[#C084FC] block font-bold uppercase tracking-widest">EXACT CLOCK (UTC)</span>
                <span className="text-base sm:text-xl lg:text-2xl font-mono font-black text-[#EDE9E3] tracking-wider sm:tracking-widest">
                  {hours}:{minutes}:{seconds}
                </span>
              </div>
              <div className="h-6 sm:h-8 w-[1px] bg-purple-500/30 shrink-0" />
              <div className="text-right sm:text-center font-mono">
                <span className="text-[9px] sm:text-xs text-[#C084FC] block font-bold uppercase tracking-widest">CALENDAR DATE</span>
                <span className="text-xs sm:text-sm lg:text-base font-mono font-bold text-[#EDE9E3]">
                  {dayName}, {monthName} {dayNum}, {year}
                </span>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* STEP 5: REVIEW FORM SECTION WITH SCROLL REVEAL */}
      <ScrollReveal direction="up" delay={0.2} distance={24}>
        <AddReviewForm onAddReview={onAddReview || (() => {})} />
      </ScrollReveal>


    </div>
  );
};
