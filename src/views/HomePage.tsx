'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { Page, DeploymentProduct, ReviewItem, HeroContent } from '../types';
import { loadGsap, whenSettled } from '../components/site/gsap';
import { ScrollOrb } from '../components/site/ScrollOrb';

// The project modal (and its animation library) only loads when a project is opened
const DeploymentModal = dynamic(() => import('../components/DeploymentModal').then((m) => m.DeploymentModal), { ssr: false });
import { BlurText } from '../components/site/BlurText';
import { sound } from '../utils/audio';
import '../components/home/home.css';


interface HomePageProps {
  setCurrentPage?: (page: Page) => void;
  onSelectProduct?: (product: DeploymentProduct) => void;
  products: DeploymentProduct[];
  reviews: ReviewItem[];
  heroContent?: HeroContent;
  headlineLine1?: string;
  headlineLine2?: string;
  headlineLine3?: string;
  bioSubtext?: string;
  isLoaded?: boolean;
}

const pad = (n: number) => String(n).padStart(2, '0');

const Arrow: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 12L12 2M12 2H4.5M12 2V9.5" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

/** Splits text into words and flags the ones that fall inside a highlight phrase. */
function markWords(text: string, phrases: string[]) {
  const lower = text.toLowerCase();
  const ranges: Array<[number, number]> = [];
  phrases.filter(Boolean).forEach((p) => {
    const i = lower.indexOf(p.toLowerCase());
    if (i >= 0) ranges.push([i, i + p.length]);
  });
  const out: { word: string; hot: boolean }[] = [];
  const re = /\S+/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const start = m.index;
    out.push({ word: m[0], hot: ranges.some(([a, b]) => start >= a && start < b) });
  }
  return out;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentPage: propSetCurrentPage,
  onSelectProduct,
  products,
  reviews,
  heroContent,
  headlineLine1,
  headlineLine2,
  headlineLine3,
  bioSubtext,
  }) => {
  const router = useRouter();
  const root = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<DeploymentProduct | null>(null);

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

  // Derive final hero props with Prisma field alignment and bulletproof fallbacks
  const finalBadgeText = heroContent?.badgeText || heroContent?.superTitle || '[ SOLO CREATIVE DEVELOPER & 3D ARTIST ]';
  const finalLine1 = headlineLine1 || heroContent?.headlineLine1 || heroContent?.mainHeading || heroContent?.mainTitle || 'CYBERNETiC CRAFT';
  const finalLine2 = headlineLine2 || heroContent?.headlineLine2 || 'DiGiTAL REALMS';
  const finalLine3 = headlineLine3 || heroContent?.headlineLine3 || (heroContent?.highlightedWord ? `${heroContent.highlightedWord}.` : 'ENGiNEERED.');
  const finalBioSubtext = bioSubtext || heroContent?.subheading || heroContent?.subtitle || heroContent?.bioSubtext || 'I design and build high-performance 3D websites, WebGL shaders, and bespoke Next.js interfaces for founders who want to stand out.';
  const finalPrimaryCtaText = heroContent?.primaryCtaText || heroContent?.primaryCtaLabel || 'EXPLORE DEPLOYMENTS';
  const finalPrimaryCtaRoute = (heroContent?.primaryCtaRoute || heroContent?.primaryCtaUrl || 'deployments') as Page;
  const finalSecondaryCtaText = heroContent?.secondaryCtaText || heroContent?.secondaryCtaLabel || 'DIRECT CHAT';
  const finalSecondaryCtaRoute = (heroContent?.secondaryCtaRoute || heroContent?.secondaryCtaUrl || 'contact') as Page;
  const finalPricingNotice = heroContent?.pricingNoticeText || 'Custom builds starting at $500 - $1,000 // Fast turnaround';
  const finalLatency = heroContent?.telemetryLatency || '4ms';
  const finalUptime = heroContent?.telemetryUptime || '99.98%';

  const services = [
    ['01', 'Web Architecture', 'Next.js, React, Tailwind'],
    ['02', 'Animated Sites', 'Motion, shaders, physics'],
    ['03', 'SaaS Dashboards', 'Analytics and APIs'],
  ];

  const process = [
    { n: '01', when: 'Days 1-2', title: 'Discover', desc: 'A short call, your references and goals, turned into a one-page brief with scope and price locked.', out: ['Brief', 'Sitemap', 'Fixed quote'] },
    { n: '02', when: 'Week 1', title: 'Design', desc: 'Art direction, key screens and a motion study you can click through before a line of code ships.', out: ['Moodboard', 'Key screens', 'Motion study'] },
    { n: '03', when: 'Weeks 2-3', title: 'Build', desc: 'Next.js, 3D and motion wired to your content, tuned against a 60fps budget on real phones.', out: ['Next.js build', '3D + motion', 'CMS + forms'] },
    { n: '04', when: 'Week 4', title: 'Launch', desc: 'QA across devices, SEO and analytics, then deploy and hand over everything you own.', out: ['QA pass', 'SEO setup', 'Handover'] },
  ];
  const facts: Array<[string, string]> = [
    ['Pricing', 'Fixed, agreed upfront'],
    ['Feedback', 'Live preview link every week'],
    ['Performance', '60fps motion budget'],
  ];

  const statementWords = useMemo(
    () => markWords(finalBioSubtext, heroContent?.highlightWords || []),
    [finalBioSubtext, heroContent?.highlightWords]
  );

  // up to 8 distinct technologies from the projects, floated around the statement
  const annotations = useMemo(() => {
    const seen = new Set<string>();
    (products || []).forEach((p) => (p.techStack || []).forEach((t) => seen.add(t)));
    return Array.from(seen).slice(0, 8);
  }, [products]);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  // CTA headline: the primary CTA label, without any trailing arrow glyph (an SVG arrow is drawn instead)
  const ctaWords = finalPrimaryCtaText.replace(/[\u2197\u2192]\s*$/, '').trim().split(/\s+/);

  const inspect = (project: DeploymentProduct) => {
    if (onSelectProduct) onSelectProduct(project);
    else setSelectedProduct(project);
  };

  /* ------------------------------------------------------------------ */
  /* Scroll choreography: transform + opacity only, Lenis-synced via the */
  /* shared SmoothScroll ticker. Nothing runs with reduced motion.        */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    let cancelled = false;
    let teardown = () => {};
    whenSettled()
      .then(loadGsap)
      .then(({ gsap, ScrollTrigger }) => {
        if (cancelled || !root.current) return;
        let inner: void | (() => void);
        const ctx = gsap.context(() => {
          inner = (() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          desktop: '(min-width: 900px)',
        },
        (context) => {
          const { motion, desktop } = context.conditions as { motion: boolean; desktop: boolean };
          if (!motion) return;

          // Hero chrome drifts up and dims as the next chapter arrives
          gsap.to('.ah-hero-chrome', {
            yPercent: -30,
            opacity: 0,
            ease: 'none',
            scrollTrigger: { trigger: '.ah-hero', start: 'top top', end: 'bottom 30%', scrub: true },
          });

          // Hero title: drifts up and thins out as the reel rises over it
          gsap.to('.ah-hero-h1', {
            yPercent: -16,
            opacity: 0.25,
            ease: 'none',
            scrollTrigger: { trigger: '.ah-hero', start: 'top top', end: 'bottom top', scrub: true },
          });

          // Process: the coral rule draws across, the four steps fold up out of depth
          gsap.fromTo(
            '.ah-steps-fill',
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: { trigger: '.ah-steps-wrap', start: desktop ? 'top 82%' : 'top 85%', end: desktop ? 'top 30%' : 'bottom 75%', scrub: true },
            }
          );
          const steps = gsap.utils.toArray<HTMLElement>('.ah-step-inner');
          if (desktop && steps.length) {
            gsap.timeline({
              scrollTrigger: { trigger: '.ah-steps', start: 'top 92%', end: 'top 38%', scrub: true },
            }).fromTo(
              steps,
              { rotateX: -38, yPercent: 16, opacity: 0, transformPerspective: 1400, transformOrigin: '50% 0%' },
              { rotateX: 0, yPercent: 0, opacity: 1, ease: 'power2.out', stagger: 0.18, duration: 1 }
            );
          } else {
            steps.forEach((st) => {
              gsap.fromTo(
                st,
                { rotateX: -24, yPercent: 10, opacity: 0, transformPerspective: 1100, transformOrigin: '50% 0%' },
                { rotateX: 0, yPercent: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: st, start: 'top 96%', end: 'top 66%', scrub: true } }
              );
            });
          }

          // Statement: word-by-word reading reveal
          gsap.fromTo(
            '.ah-word',
            // opacity only: a per-frame blur on dozens of word layers was the main scroll jank
            { opacity: 0.12 },
            {
              opacity: 1,
              ease: 'none',
              stagger: 0.08,
              scrollTrigger: {
                trigger: '.ah-statement-text',
                start: desktop ? 'top 78%' : 'top 85%',
                end: desktop ? 'bottom 48%' : 'bottom 60%',
                scrub: true,
              },
            }
          );

          // Section labels + titles: masked line rise
          gsap.utils.toArray<HTMLElement>('.ah-rise').forEach((el) => {
            gsap.from(el, {
              yPercent: 105,
              duration: 1.2,
              ease: 'expo.out',
              scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            });
          });
          gsap.utils.toArray<HTMLElement>('.ah-fade').forEach((el) => {
            gsap.from(el, {
              y: 24,
              opacity: 0,
              duration: 1,
              ease: 'expo.out',
              scrollTrigger: { trigger: el, start: 'top 92%', once: true },
            });
          });

          // Services chapter: the off-white sheet lifts up from depth as it arrives
          gsap.fromTo(
            '.ah-services',
            { scale: desktop ? 0.9 : 0.94, yPercent: 4, transformOrigin: '50% 0%' },
            {
              scale: 1,
              yPercent: 0,
              ease: 'none',
              scrollTrigger: { trigger: '.ah-services', start: 'top bottom', end: 'top 20%', scrub: true },
            }
          );

          // Services index: rows fold up in 3D, then brighten as they cross the centre
          gsap.utils.toArray<HTMLElement>('.ah-service').forEach((row) => {
            const inner = row.querySelector('.ah-service-inner');
            gsap.fromTo(
              inner,
              { rotateX: desktop ? -72 : -40, yPercent: 40, opacity: 0, transformPerspective: 1100, transformOrigin: '50% 0%' },
              {
                rotateX: 0,
                yPercent: 0,
                opacity: 1,
                ease: 'power2.out',
                scrollTrigger: { trigger: row, start: 'top 98%', end: 'top 62%', scrub: true },
              }
            );
            if (desktop) {
              gsap.fromTo(
                row.querySelector('.ah-service-title'),
                { opacity: 0.22 },
                {
                  opacity: 1,
                  ease: 'none',
                  scrollTrigger: { trigger: row, start: 'top 90%', end: 'top 62%', scrub: true },
                }
              );
            }
          });

          // Case studies: media tilts up out of depth, inner image parallax, counter slides
          gsap.utils.toArray<HTMLElement>('.ah-case').forEach((cs) => {
            const frame = cs.querySelector('.ah-case-frame');
            const img = cs.querySelector('.ah-case-img');
            gsap.fromTo(
              frame,
              { rotateX: desktop ? 16 : 10, scale: desktop ? 0.86 : 0.92, yPercent: 8, opacity: 0.35, transformPerspective: 1600, transformOrigin: '50% 100%' },
              {
                rotateX: 0,
                scale: 1,
                yPercent: 0,
                opacity: 1,
                ease: 'power2.out',
                scrollTrigger: { trigger: cs, start: 'top 95%', end: desktop ? 'top 22%' : 'top 40%', scrub: true },
              }
            );
            gsap.fromTo(
              img,
              { yPercent: -7, scale: 1.16 },
              {
                yPercent: 7,
                scale: 1.16,
                ease: 'none',
                scrollTrigger: { trigger: cs, start: 'top bottom', end: 'bottom top', scrub: true },
              }
            );
            gsap.from(cs.querySelectorAll('.ah-case-digit'), {
              yPercent: 100,
              duration: 1.2,
              ease: 'expo.out',
              stagger: 0.08,
              scrollTrigger: { trigger: cs, start: 'top 70%', once: true },
            });
            gsap.from(cs.querySelectorAll('.ah-case-reveal'), {
              y: 36,
              opacity: 0,
              duration: 1.1,
              ease: 'expo.out',
              stagger: 0.08,
              scrollTrigger: { trigger: cs.querySelector('.ah-case-body'), start: 'top 88%', once: true },
            });
          });

          // Reviews: sticky stage, the names list works like an index (active bright, rest dim)
          const stage = document.querySelector<HTMLElement>('.ah-reviews-track');
          const names = gsap.utils.toArray<HTMLElement>('.ah-review-name');
          const quotes = gsap.utils.toArray<HTMLElement>('.ah-quote');
          if (desktop && stage && quotes.length > 0) {
            gsap.set(quotes, { opacity: 0, yPercent: 14, rotateX: -18, transformPerspective: 1200, transformOrigin: '50% 100%' });
            gsap.set(quotes[0], { opacity: 1, yPercent: 0, rotateX: 0 });
            gsap.set(names, { opacity: 0.18 });
            gsap.set(names[0], { opacity: 1 });
            const tl = gsap.timeline({
              defaults: { ease: 'power2.inOut', duration: 1 },
              scrollTrigger: { trigger: stage, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
            });
            for (let i = 1; i < quotes.length; i++) {
              const at = i * 2 - 1;
              tl.to(quotes[i - 1], { opacity: 0, yPercent: -10, rotateX: 12, duration: 0.45, ease: 'power2.in' }, at)
                .to(quotes[i], { opacity: 1, yPercent: 0, rotateX: 0, duration: 0.5, ease: 'power2.out' }, at + 0.5)
                .to(names[i - 1], { opacity: 0.18, duration: 0.5 }, at)
                .to(names[i], { opacity: 1, duration: 0.5 }, at + 0.45);
            }
            tl.to({}, { duration: 1 });
            gsap.to('.ah-reviews-progress', {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: { trigger: stage, start: 'top top', end: 'bottom bottom', scrub: true },
            });
          } else {
            gsap.utils.toArray<HTMLElement>('.ah-review-card').forEach((card) => {
              gsap.from(card, {
                y: 40,
                opacity: 0,
                rotateX: -20,
                transformPerspective: 900,
                duration: 1.1,
                ease: 'expo.out',
                scrollTrigger: { trigger: card, start: 'top 90%', once: true },
              });
            });
          }

          // Closing CTA: giant words rise out of their masks, slight depth on the block
          gsap.from('.ah-cta-word', {
            yPercent: 110,
            rotateX: -50,
            transformPerspective: 900,
            transformOrigin: '50% 100%',
            duration: 1.3,
            ease: 'expo.out',
            stagger: 0.09,
            scrollTrigger: { trigger: '.ah-cta', start: 'top 72%', once: true },
          });
        }
      );

      // Re-measure only when layout really changes (late fonts, images, data), never on a
      // timer mid-scroll. Mobile URL-bar resizes are ignored so sticky scenes don't jump.
      ScrollTrigger.config({ ignoreMobileResize: true });
      let lastH = document.documentElement.scrollHeight;
      let rt = 0;
      const refresh = () => {
        window.clearTimeout(rt);
        rt = window.setTimeout(() => {
          const h = document.documentElement.scrollHeight;
          if (Math.abs(h - lastH) < 2) return;
          lastH = h;
          ScrollTrigger.refresh();
        }, 180);
      };
      if (document.fonts && document.fonts.status !== 'loaded') document.fonts.ready.then(() => ScrollTrigger.refresh());
      const ro = new ResizeObserver(refresh);
      ro.observe(document.body);

      return () => {
        ro.disconnect();
        window.clearTimeout(rt);
        mm.revert();
      };
          })();
        }, root);
        teardown = () => {
          if (typeof inner === 'function') inner();
          ctx.revert();
        };
      });
    return () => {
      cancelled = true;
      teardown();
    };
  }, [products.length, reviews.length]);

  const total = products?.length || 0;

  return (
    <div ref={root} className="ah-home">
      {/* ============================ 01 HERO ============================ */}
      <section className="ah-hero ah-bleed" data-orb="0.68 0.5 1 0 1" data-orb-m="0.5 0.44 1 0 0.9" data-orb-at="top">
        <div className="ah-glow" aria-hidden="true" />
        <div className="ah-hero-top ah-hero-chrome ah-load" style={{ animationDelay: '0.1s' }}>
          <p className="ah-label">{finalBadgeText}</p>
          <p className="ah-label ah-hero-telemetry">
            <span>Response <span className="ah-hi">{finalLatency}</span></span>
            <span>Uptime <span className="ah-hi">{finalUptime}</span></span>
          </p>
        </div>

        <div className="ah-hero-title">
          <h1 className="ah-hero-h1" aria-label={`${finalLine1} ${finalLine2} ${finalLine3}`}>
            <BlurText as="span" load text={finalLine1} delay={0.05} className="ah-hero-l1" />
            <BlurText as="span" load text={finalLine2} delay={0.05} offset={finalLine1.split(/\s+/).length + 1} className="ah-hero-l2" />
            <BlurText
              as="span"
              load
              text={finalLine3}
              delay={0.05}
              offset={finalLine1.split(/\s+/).length + finalLine2.split(/\s+/).length + 2}
              className="ah-hero-l3"
            />
          </h1>
        </div>

        <div className="ah-hero-foot ah-hero-chrome">
          <p className="ah-hero-note">
            {finalPricingNotice}
          </p>

          <div className="ah-scrollcue ah-load" style={{ animationDelay: '1.1s' }} aria-hidden="true">
            <span className="ah-scrollcue-dot" />
            <span className="ah-scrollcue-line" />
          </div>

          <div className="ah-hero-ctas ah-load" style={{ animationDelay: '1s' }}>
            <button
              type="button"
              id="hero-start-project-btn"
              className="ah-btn ah-btn-primary"
              onClick={() => {
                sound.playPageSwitch();
                setCurrentPage(finalPrimaryCtaRoute);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>{finalPrimaryCtaText}</span>
            </button>
            <button
              type="button"
              id="hero-browse-deployments-btn"
              className="ah-btn ah-btn-ghost"
              onClick={() => {
                sound.playPageSwitch();
                setCurrentPage(finalSecondaryCtaRoute);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>{finalSecondaryCtaText}</span>
              <Arrow className="ah-btn-arrow" />
            </button>
          </div>
        </div>
      </section>

      {/* travelling orb: after the hero in the DOM so it sits over the hero glow, under every section */}
      <ScrollOrb />

      {/* ticker: the existing service names, squared-media style */}
      <div className="ah-ticker ah-bleed" aria-hidden="true">
        <div className="ah-ticker-track">
          {[0, 1].map((rep) => (
            <span key={rep} className="ah-ticker-run">
              {services.concat(services).map(([, title, detail], k) => (
                <span key={`${rep}-${k}`} className="ah-ticker-item">
                  <span>{title}</span>
                  <i className="ah-serif">{detail}</i>
                  <b className="ah-ticker-sep" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ============================ 01 PROCESS ========================= */}
      <section
        className="ah-process ah-bleed"
        aria-label="Process"
        data-orb="0.85 0.24 0.42 0.3 0.95"
        data-orb-m="0.84 0.2 0.42 0.3 0.7"
      >
        <div className="ah-grid ah-process-head">
          <p className="ah-chapter">
            <span className="ah-serif">01</span>
            <span className="ah-chapter-rule" />
            <span>Process</span>
            <span className="ah-chapter-tag">4 stages</span>
          </p>
          <h2 className="ah-h2">
            <span className="ah-mask"><span className="ah-rise">From first call</span></span>
            <span className="ah-mask"><span className="ah-rise">to <span className="ah-process-h2-it">live launch</span></span></span>
          </h2>
          <p className="ah-process-lead ah-fade">
            Every build follows the same four stages, so you always know what ships next and when. No surprises, no vanishing weeks.
          </p>
        </div>

        <div className="ah-steps-wrap">
          <span className="ah-steps-rule" aria-hidden="true"><span className="ah-steps-fill" /></span>
          <ol className="ah-steps">
            {process.map((st) => (
              <li key={st.n} className="ah-step">
                <div className="ah-step-inner">
                  <span className="ah-step-num" aria-hidden="true">{st.n}</span>
                  <span className="ah-label ah-step-when">{st.when}</span>
                  <h3 className="ah-step-title">{st.title}</h3>
                  <p className="ah-step-desc">{st.desc}</p>
                  <ul className="ah-step-out" aria-label={`${st.title} deliverables`}>
                    {st.out.map((o) => <li key={o}>{o}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <dl className="ah-process-facts">
          {facts.map(([k, v]) => (
            <div key={k} className="ah-fact ah-fade">
              <dt className="ah-label">{k}</dt>
              <dd className="ah-fact-v" style={{ margin: 0 }}>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ========================== 02 STATEMENT ========================== */}
      <section className="ah-section ah-statement ah-bleed" aria-label="Statement" data-orb="0.12 0.52 0.5 0.55 0.9" data-orb-m="0.18 0.78 0.5 0.55 0.55">
        <div className="ah-notes" aria-hidden="true">
          {annotations.map((t, k) => (
            <span key={t} className={`ah-note ah-note-${k}`}>{t}</span>
          ))}
        </div>
        <div className="ah-grid">
          <p className="ah-chapter">
            <span className="ah-serif">02</span>
            <span className="ah-chapter-rule" />
            <span>Studio</span>
          </p>
          <p className="ah-statement-text">
            {statementWords.map((w, i) => (
              <span key={`${w.word}-${i}`} className={`ah-word ${w.hot ? 'ah-word-hot' : ''}`}>
                {w.word}{' '}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ========================== 03 SERVICES =========================== */}
      <section className="ah-section ah-services ah-light ah-bleed" aria-label="Services" data-orb="0.86 0.5 0.45 0.65 1" data-orb-m="0.82 0.5 0.4 0.65 0.6">
        <div className="ah-grid">
          <p className="ah-chapter">
            <span className="ah-serif">03</span>
            <span className="ah-chapter-rule" />
            <span>Services</span>
          </p>
        </div>
        <ul className="ah-service-list">
          {services.map(([index, title, detail]) => (
            <li key={title} className="ah-service">
              <button
                type="button"
                onClick={() => {
                  setCurrentPage('deployments');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="ah-service-inner"
              >
                <span className="ah-service-index ah-label">{index}</span>
                <span className="ah-service-title">{title}</span>
                <span className="ah-service-detail">{detail}</span>
                <Arrow className="ah-service-arrow" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* ============================ 04 WORK ============================= */}
      {products && products.length > 0 && (
        <section className="ah-section ah-work ah-bleed" aria-label="Featured Digital Deployments" data-orb="0.13 0.64 0.6 0.75 0.45" data-orb-m="0.86 0.22 0.45 0.75 0.35">
          <div className="ah-grid ah-work-head">
            <p className="ah-chapter">
              <span className="ah-serif">04</span>
              <span className="ah-chapter-rule" />
              <span>Curated Assets &amp; Systems</span>
              <span className="ah-chapter-tag">Featured</span>
            </p>
            <h2 className="ah-h2">
              <span className="ah-mask"><span className="ah-rise">Featured Digital</span></span>
              <span className="ah-mask"><span className="ah-rise">Deployments</span></span>
            </h2>
            <button
              type="button"
              className="ah-link ah-fade"
              onClick={() => {
                sound.playPageSwitch();
                setCurrentPage('deployments');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>View All Deployments</span>
              <Arrow />
            </button>
          </div>

          <div className="ah-cases">
            {products.map((project, i) => {
              const [name, ...restTitle] = project.title.split(' | ');
              const subtitle = restTitle.join(' | ');
              const stack = (project.techStack || []).slice(0, 3);
              const image = project.coverImageUrl || project.thumbnailUrl || project.thumbnail;
              const live = project.liveUrl || project.demoUrl;
              const num = pad(i + 1);
              return (
                <article key={project.id} className="ah-case">
                  <div className="ah-case-side">
                    <div className="ah-case-count" aria-label={`Project ${i + 1} of ${total}`}>
                      <span className="ah-case-digits">
                        {num.split('').map((d, k) => (
                          <span key={k} className="ah-mask-inline"><span className="ah-case-digit">{d}</span></span>
                        ))}
                      </span>
                      <span className="ah-serif ah-case-total">/{pad(total)}</span>
                    </div>
                    <dl className="ah-meta">
                      <div><dt>Category</dt><dd>{project.category}</dd></div>
                      {project.year ? <div><dt>Year</dt><dd>{project.year}</dd></div> : null}
                      {project.status ? <div><dt>Status</dt><dd>{project.status}</dd></div> : null}
                      {stack.length > 0 ? <div><dt>Stack</dt><dd>{stack.join(', ')}</dd></div> : null}
                      {typeof project.auditScore === 'number' ? (
                        <div><dt>Audit</dt><dd>{project.auditScore} / {project.fpsBenchmark ?? 60} FPS</dd></div>
                      ) : null}
                    </dl>
                  </div>

                  <div className="ah-case-main">
                    <button
                      type="button"
                      className="ah-case-frame"
                      onClick={() => inspect(project)}
                      aria-label={`Inspect ${project.title}`}
                    >
                      <span className="ah-case-media">
                        {image ? (
                          <Image
                            className="ah-case-img"
                            src={image}
                            alt={project.title}
                            width={1376}
                            height={768}
                            sizes="(min-width: 900px) 64vw, 100vw"
                          />
                        ) : null}
                      </span>
                      <span className="ah-case-hover ah-label">
                        Inspect <Arrow />
                      </span>
                    </button>

                    <div className="ah-case-body">
                      <h3 className="ah-case-title ah-case-reveal">
                        <span className="ah-case-name">{name}</span>
                        {subtitle ? <span className="ah-case-sub">{subtitle}</span> : null}
                      </h3>
                      <div className="ah-case-aside">
                        <p className="ah-case-desc ah-case-reveal">{project.shortDescription}</p>
                        <div className="ah-case-actions ah-case-reveal">
                          <button type="button" className="ah-link" onClick={() => inspect(project)}>
                            <span>Inspect</span>
                            <Arrow />
                          </button>
                          {live ? (
                            <a className="ah-link ah-link-dim" href={live} target="_blank" rel="noopener noreferrer">
                              <span>Launch Demo</span>
                              <Arrow />
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* =========================== 05 REVIEWS =========================== */}
      {reviews && reviews.length > 0 && (
        <section className="ah-reviews ah-cobalt-ground ah-bleed" aria-label="Client Reviews" data-orb="0.8 0.5 0.6 0.85 0.4" data-orb-m="0.2 0.5 0.5 0.85 0.3">
          <div className="ah-reviews-track" style={{ ['--ah-count' as string]: reviews.length } as React.CSSProperties}>
            <div className="ah-reviews-stage">
              <div className="ah-grid ah-reviews-head">
                <p className="ah-chapter">
                  <span className="ah-serif">05</span>
                  <span className="ah-chapter-rule" />
                  <span>02 // VERIFIED FEEDBACK</span>
                </p>
                <h2 className="ah-h3">Client Reviews</h2>
                <p className="ah-reviews-score ah-label">
                  <span className="ah-accent">{avgRating}</span> / 5.0 <span className="ah-dot">•</span> {reviews.length} Reviews
                </p>
              </div>

              <div className="ah-grid ah-reviews-body">
                <ol className="ah-review-names">
                  {reviews.map((rev) => (
                    <li key={rev.id} className="ah-review-name">{rev.name}</li>
                  ))}
                </ol>
                <span className="ah-reviews-rail" aria-hidden="true"><span className="ah-reviews-progress" /></span>
                <div className="ah-quotes">
                  {reviews.map((rev) => (
                    <figure key={rev.id} className="ah-quote ah-review-card">
                      <blockquote className="ah-quote-text">&ldquo;{rev.comment}&rdquo;</blockquote>
                      <figcaption className="ah-quote-by">
                        <span className="ah-quote-name">{rev.name}</span>
                        {rev.roleCompany || rev.role ? (
                          <span className="ah-quote-role">{rev.roleCompany || [rev.role, rev.company].filter(Boolean).join(', ')}</span>
                        ) : null}
                        <span className="ah-quote-meta ah-label">
                          <span className="ah-stars" aria-label={`${rev.rating} out of 5`}>
                            {'★★★★★'.slice(0, Math.max(0, Math.min(5, Math.round(rev.rating))))}
                          </span>
                          {rev.dateString}
                        </span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================ 06 CTA ============================== */}
      <section className="ah-section ah-cta ah-bleed" aria-label="Start a project" data-orb="0.74 0.48 1.05 0.9 1" data-orb-m="0.62 0.62 0.9 1 0.85">
        <div className="ah-glow ah-glow-low ah-glow-warm" aria-hidden="true" />
        <div className="ah-grid">
          <p className="ah-chapter">
            <span className="ah-serif">06</span>
            <span className="ah-chapter-rule" />
            <span>Contact</span>
          </p>
          <button
            type="button"
            className="ah-cta-big"
            onClick={() => {
              sound.playPageSwitch();
              setCurrentPage(finalPrimaryCtaRoute);
            }}
            aria-label={finalPrimaryCtaText}
          >
            {ctaWords.map((w, i) => (
              <span key={`${w}-${i}`} className="ah-mask-inline ah-cta-mask">
                <span className="ah-cta-word">
                  {w}
                  {i === ctaWords.length - 1 ? <Arrow className="ah-cta-arrow" /> : null}
                </span>
              </span>
            ))}
          </button>
          <div className="ah-cta-foot">
            <p className="ah-cta-note ah-fade">{finalPricingNotice}</p>
            <button
              type="button"
              className="ah-link ah-fade"
              onClick={() => {
                sound.playPageSwitch();
                setCurrentPage(finalSecondaryCtaRoute);
              }}
            >
              <span>{finalSecondaryCtaText}</span>
              <Arrow />
            </button>
          </div>
        </div>
      </section>

      {/* LIVE INTERACTIVE DEPLOYMENT INSPECTOR MODAL */}
      {selectedProduct && (
        <DeploymentModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};
