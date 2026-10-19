'use client';

import React, { useState, useEffect, useRef } from 'react';

import { ChevronDown } from 'lucide-react';
import { Collapse } from '../components/site/Collapse';
import { Page, ReviewItem, ContactSubmission } from '../types';
import { AddReviewForm } from '../components/ReviewsSection';
import { BlurText, Arrow } from '../components/site/BlurText';

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

  const channels = [
    {
      key: 'fiverr',
      card: 'Card 02',
      tag: 'Escrow',
      name: 'Fiverr',
      blurb: 'Hire via verified Fiverr Pro milestone escrow with 100% protection.',
      k1: 'Escrow Advantage',
      v1: 'Funds held safely in escrow.',
      k2: 'Verified',
      v2: 'Fiverr Pro',
      href: fiverrUrl || 'https://www.fiverr.com/ahsxn_dev',
      aria: 'Order on Fiverr Pro',
      cta: 'FIVERR',
    },
    {
      key: 'dribbble',
      card: 'Card 03',
      tag: '40+ Shots',
      name: 'Dribbble',
      blurb: 'Explore UI design concepts, motion prototypes, and component systems.',
      k1: 'Featured Works',
      v1: 'Dashboards, motion & UI suites.',
      k2: 'Portfolio',
      v2: 'Dribbble Pro',
      href: dribbbleUrl || 'https://dribbble.com/ahsxn_dev',
      aria: 'View Dribbble Portfolio',
      cta: 'DRIBBBLE',
    },
    {
      key: 'twitter',
      card: 'Card 04',
      tag: 'Open DMs',
      name: 'Twitter',
      blurb: 'Connect on Twitter / X for live code updates and open DMs.',
      k1: 'Handle',
      v1: '@Ahsanwebdesign',
      k2: 'Status',
      v2: 'Open DMs',
      href: twitterUrl || 'https://x.com/Ahsanwebdesign',
      aria: 'Connect on Twitter / X',
      cta: 'TWITTER',
    },
    {
      key: 'whatsapp',
      card: 'Card 05',
      tag: 'Instant',
      name: 'WhatsApp',
      blurb: 'Instant mobile messaging for real-time project inquiries.',
      k1: 'Direct Line',
      v1: '03284992759',
      k2: 'Status',
      v2: 'Online',
      href: 'https://wa.me/923284992759',
      aria: 'Direct WhatsApp Message',
      cta: 'WHATSAPP',
    },
  ];

  return (
    <div className="ah-page ah-contact">
      {/* STEP 1: HERO */}
      <section className="ah-phero">
        <div className="ah-glow ah-glow-warm" aria-hidden="true" />
        <div className="ah-grid">
          <p className="ah-chapter">
            <span className="ah-pill"><span className="ah-pill-dot" />Anorix Studio • Official Contact Portals</span>
          </p>
          <div className="ah-phero-title ah-ct-hero-title" style={{ gridColumn: '1 / -1' }}>
            <BlurText as="h1" load text="LET'S BUILD TOGETHER." serif={['TOGETHER.']} className="ah-d1" />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <BlurText
              load
              delay={0.35}
              text="Reach out via any of our official channels: Direct Email, Fiverr Pro, Dribbble, Twitter, or WhatsApp."
              className="ah-lede"
            />
          </div>
        </div>
      </section>

      {/* STEP 2: CARD 01, DIRECT EMAIL BRIEF */}
      <section className="ah-ct-brief ah-light" aria-label="Direct Email">
        <div className="ah-grid">
          <div className="ah-ct-brief-head">
            <span className="ah-label">Card 01</span>
            <BlurText as="h2" text="Direct Email" serif={['Email']} className="ah-d2" />
            <p className="ah-body" style={{ margin: 0 }}>
              Direct transmission line to <strong style={{ color: 'var(--ah-text)', fontWeight: 500 }}>ahsxn3d@gmail.com</strong>
            </p>
            <div>
              <button
                type="button"
                onPointerDown={() => handleCopy('ahsxn3d@gmail.com', 'direct-email')}
                className="ah-btn ah-btn-ghost ah-btn-sm"
              >
                {copiedField === 'direct-email' ? 'Copied!' : 'Copy Email'}
              </button>
            </div>
          </div>

          {submittedSuccess ? (
            <div className="ah-ct-form ah-success" data-r="blur">
              <span className="ah-pill"><span className="ah-pill-dot" />SLA</span>
              <h3 className="ah-d3">Direct Email Transmitted!</h3>
              <p className="ah-lede">
                Your project parameters have been dispatched directly. SLA reply guaranteed within &lt;24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitBrief} className="ah-ct-form">
              <div className="ah-ct-2">
                <label className="ah-field">
                  <span className="ah-field-label">Your Name *</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Aurelius"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="ah-input"
                  />
                </label>
                <label className="ah-field">
                  <span className="ah-field-label">Your Email Address *</span>
                  <input
                    type="email"
                    required
                    placeholder="e.g. marcus@hyperion.io"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="ah-input"
                  />
                </label>
              </div>

              {/* BUDGET TIER SELECTOR */}
              <div className="ah-field" ref={budgetDropdownRef}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <span className="ah-field-label">Budget Tier & Sprint Scope</span>
                  <span className="ah-field-label" style={{ color: 'var(--ah-faint)' }}>Fixed Scope & Escrow Protected</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBudgetOpen(!isBudgetOpen)}
                  className={`ah-tier-toggle ${isBudgetOpen ? 'is-open' : ''}`}
                  aria-expanded={isBudgetOpen}
                >
                  <span style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0, flexWrap: 'wrap' }}>
                    <span className="ah-tier-range">{selectedBudgetObj.range}</span>
                    <span className="ah-tier-name">{selectedBudgetObj.value.replace(/^[^(]+\(([^)]+)\)$/, '$1')}</span>
                    {selectedBudgetObj.badge && <span className="ah-tier-badge ah-dim">{selectedBudgetObj.badge}</span>}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 'none' }} className="ah-field-label">
                    <span className="ah-hide-sm">{isBudgetOpen ? 'Close Tiers' : 'Change Tier'}</span>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                <Collapse open={isBudgetOpen} ms={400}>
                      <div style={{ display: 'grid', gap: 10, paddingTop: 14 }}>
                        <div className="ah-field-label" style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                          <span>SELECT YOUR ESTIMATED SPRINT TIER</span>
                          <span style={{ color: 'var(--ah-signal)' }}>100% ESCROW SECURED</span>
                        </div>
                        <div className="ah-tiers">
                          {BUDGET_OPTIONS.map((opt) => {
                            const isSelected = budgetTier === opt.value;
                            return (
                              <button
                                type="button"
                                key={opt.value}
                                onClick={() => {
                                  setBudgetTier(opt.value);
                                  setIsBudgetOpen(false);
                                }}
                                className={`ah-tier ${isSelected ? 'is-on' : ''}`}
                                aria-pressed={isSelected}
                              >
                                <span className="ah-tier-top">
                                  <span className="ah-tier-range">{opt.range}</span>
                                  {opt.badge && <span className="ah-tier-badge">{opt.badge}</span>}
                                </span>
                                <span className="ah-tier-name">{opt.value.replace(/^[^(]+\(([^)]+)\)$/, '$1')}</span>
                                <span className="ah-tier-scope">{opt.scope}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </Collapse>
              </div>

              <label className="ah-field">
                <span className="ah-field-label">Project Brief & Objectives</span>
                <textarea
                  rows={2}
                  placeholder="Describe your vision and requirements..."
                  value={projectBrief}
                  onChange={(e) => setProjectBrief(e.target.value)}
                  className="ah-input"
                />
              </label>

              <button type="submit" id="submit-direct-email-btn" className="ah-btn ah-btn-primary ah-btn-block" style={{ height: 58 }}>
                <span>SEND DIRECT EMAIL BRIEF</span>
                <Arrow className="ah-btn-arrow" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* CARDS 02-05: CHANNELS */}
      <section className="ah-section" style={{ paddingBottom: 0 }} aria-label="Channels">
        <div className="ah-channels">
          {channels.map((c, i) => (
            <article key={c.key} className={`ah-chan channel-${c.key}-ah`} data-r="" style={{ ['--d' as string]: `${(i % 2) * 0.08}s` } as React.CSSProperties}>
              <div className="ah-chan-top">
                <span className="ah-label">{c.card}</span>
                <span className="ah-pill"><span className="ah-pill-dot" />{c.tag}</span>
              </div>
              <h2 className="ah-chan-name">{c.name}</h2>
              <p className="ah-body" style={{ margin: 0, maxWidth: '40ch' }}>{c.blurb}</p>
              <dl className="ah-chan-kv" style={{ margin: 0 }}>
                <div><dt className="ah-label">{c.k1}</dt><dd>{c.v1}</dd></div>
                <div><dt className="ah-label">{c.k2}</dt><dd>{c.v2}</dd></div>
              </dl>
              <div>
                <a href={c.href} target="_blank" rel="noopener noreferrer" aria-label={c.aria} className="ah-btn ah-btn-ghost">
                  <span>{c.cta}</span>
                  <Arrow className="ah-btn-arrow" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* STEP 4: STUDIO TELEMETRY CLOCK */}
      <section className="ah-section" aria-label="Studio Telemetry">
        <div className="ah-wrap ah-clock">
          <div style={{ display: 'grid', gap: 18 }}>
            <span className="ah-pill" style={{ justifySelf: 'start' }}><span className="ah-pill-dot" />Studio Telemetry • Live Clock</span>
            <BlurText as="h3" text="Real-Time Calendar & Telemetry System" serif={['Telemetry System']} className="ah-d2" />
            <p className="ah-lede">
              Synchronized studio system clock displaying exact hours, minutes, seconds, day, month, and year.
            </p>
          </div>
          <div style={{ display: 'grid', gap: 14 }} data-r="blur">
            <span className="ah-label">EXACT CLOCK (UTC)</span>
            <span className="ah-clock-digits" suppressHydrationWarning>
              {hours}<i>:</i>{minutes}<i>:</i>{seconds}
            </span>
            <span className="ah-label">CALENDAR DATE</span>
            <span suppressHydrationWarning style={{ fontSize: 18 }}>
              {dayName}, {monthName} {dayNum}, {year}
            </span>
          </div>
        </div>
      </section>

      {/* STEP 5: REVIEW FORM */}
      <section className="ah-ct-brief ah-light" aria-label="Add Review or Rating" style={{ borderRadius: 'clamp(16px, 2vw, 28px) clamp(16px, 2vw, 28px) 0 0' }}>
        <AddReviewForm onAddReview={onAddReview || (() => {})} />
      </section>
    </div>
  );
};
