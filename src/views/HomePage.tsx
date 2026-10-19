'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { Page, DeploymentProduct, ReviewItem, HeroContent } from '../types';
import { ReviewsDisplay } from '../components/ReviewsSection';
import { ButterButton } from '../components/ButterButton';
import { BeforeAfter, ScopeConfigurator } from '../components/craft/Interactive';
import { DeploymentModal } from '../components/DeploymentModal';
import { KineticHeroTitle } from '../components/KineticHeroTitle';
import ShowcaseConsole from '../components/ShowcaseConsole';
import { sound } from '../utils/audio';
import { ArrowRight } from 'lucide-react';

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
  isLoaded = true,
}) => {
  const router = useRouter();
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

  const SERVICES = [
    ['01', 'Web Architecture', 'Next.js, React, Tailwind'],
    ['02', 'Animated Sites', 'Motion, shaders, physics'],
    ['03', 'SaaS Dashboards', 'Analytics and APIs'],
  ];

  const COL = 'w-full max-w-[1200px] mx-auto px-6 lg:px-8';
  const BLEED = 'lux-bleed relative';
  // Static service copy for the pinned services track (presentation only, no data).
  const PANELS: { index: string; title: string; detail: string; points: string[]; stack: string }[] = [
    { index: '01', title: 'Web Architecture', detail: 'Fast, typed, maintainable front ends that scale with the product.', points: ['App Router + server components', 'Design-system tokens', 'Core Web Vitals budget'], stack: 'Next.js · React · Tailwind' },
    { index: '02', title: 'Animated Sites', detail: 'Scroll-driven storytelling that stays at 60fps on real devices.', points: ['Scroll choreography', 'Shader and canvas moments', 'Reduced-motion fallbacks'], stack: 'GSAP · Lenis · Motion' },
    { index: '03', title: 'SaaS Dashboards', detail: 'Dense data made calm: clear hierarchy, quick to scan.', points: ['Realtime charts', 'Role-based views', 'API integration'], stack: 'TypeScript · Prisma · APIs' },
    { index: '04', title: '3D & WebGL', detail: 'Product visualisers and interactive scenes built for the browser.', points: ['Optimised GLTF pipelines', 'Custom GLSL materials', 'Mobile-safe fallbacks'], stack: 'Three.js · R3F · GLSL' },
  ];

  return (
    <div className="lux-home flex flex-col pb-8" style={{ gap: 'clamp(96px, 12vw, 160px)' }}>
      {/* ================= HERO ================= */}
      <section className={`${BLEED} -mt-8 sm:-mt-14 min-h-[88svh] flex flex-col justify-end pt-28 pb-12 lux-hero`}>
        <div className="lux-hero-grid" data-fx="bg" aria-hidden="true" />
        <div className={`relative ${COL}`}>
          <p className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] uppercase text-[#8B93A7]"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" aria-hidden="true" />
            {finalBadgeText}
          </p>

          <KineticHeroTitle
            line1={finalLine1}
            line2={finalLine2}
            line3={finalLine3}
            isReady={isLoaded}
          />

          <p className="mt-8 max-w-xl text-[16px] sm:text-[18px] leading-relaxed text-[#E8EBF2]/62">
            {finalBioSubtext}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <ButterButton
              variant="outline"
              size="lg"
              onClick={() => {
                sound.playPageSwitch();
                setCurrentPage(finalPrimaryCtaRoute);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              id="hero-start-project-btn"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="lux-primary w-full sm:w-auto justify-center uppercase tracking-wider !py-3 sm:!py-3.5 !px-6 sm:!px-8 text-xs sm:text-sm"
            >
              {finalPrimaryCtaText}
            </ButterButton>

            <ButterButton
              variant="line"
              size="lg"
              onClick={() => {
                sound.playPageSwitch();
                setCurrentPage(finalSecondaryCtaRoute);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              id="hero-browse-deployments-btn"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="w-full sm:w-auto justify-center uppercase tracking-wider !py-3 sm:!py-3.5 !px-6 sm:!px-8 text-xs sm:text-sm"
            >
              {finalSecondaryCtaText}
            </ButterButton>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-[#E8EBF2]/40">{finalPricingNotice}</p>
        </div>

        <div className={`relative ${COL} mt-16 sm:mt-20`}>
          <div data-fx="recede" className="lux-stats grid grid-cols-2 sm:grid-cols-5 border border-[rgba(232,235,242,0.08)] rounded-[16px] overflow-hidden bg-[#11141B] [&>*]:p-5 [&>*]:border-[rgba(232,235,242,0.08)] [&>*:not(:last-child)]:sm:border-r [&>*]:max-sm:border-b">
            {SERVICES.map(([index, title, detail]) => (
              <button
                key={title}
                type="button"
                onClick={() => {
                  setCurrentPage('deployments');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left group"
              >
                <span className="block font-mono text-[10px] tracking-[0.08em] uppercase text-[#E8EBF2]/35">{index}</span>
                <span className="mt-1 block text-sm sm:text-base text-[#E8EBF2]/80 group-hover:text-[#E8EBF2] transition-colors duration-200">{title}</span>
                <span className="mt-1 block text-xs text-[#E8EBF2]/40 group-hover:text-[#E8EBF2]/70 transition-colors duration-200">{detail}</span>
              </button>
            ))}
            <div className="hidden sm:block">
              <span className="block font-mono text-[10px] tracking-[0.08em] uppercase text-[#E8EBF2]/35">Response</span>
              <span className="mt-1 block font-display text-2xl text-[#E8EBF2]">{finalLatency}</span>
            </div>
            <div className="hidden sm:block">
              <span className="block font-mono text-[10px] tracking-[0.08em] uppercase text-[#E8EBF2]/35">Uptime</span>
              <span className="mt-1 block font-display text-2xl text-[#E8EBF2]">{finalUptime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED DEPLOYMENTS CAROUSEL ================= */}
      {products && products.length > 0 && (
        <section className="space-y-8 sm:space-y-10">
          <div data-fx="rise" className="lux-sh flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b">
            <div>
              <p className="lux-sh-eyebrow">Curated Assets & Systems · Featured</p>
              <h2 className="lux-sh-title font-display text-4xl sm:text-6xl text-[#E8EBF2]">
                Featured Digital Deployments
              </h2>
            </div>
            <ButterButton
              variant="line"
              size="sm"
              onClick={() => {
                sound.playPageSwitch();
                setCurrentPage('deployments');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              icon={<ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              iconPosition="right"
              className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wide !py-1.5 sm:!py-2"
            >
              View All Deployments
            </ButterButton>
          </div>

          <div data-fx="screen">
            <ShowcaseConsole
              projects={products}
              onInspect={(project) => {
                const orig = products.find((x) => x.id === project.id);
                if (orig) {
                  if (onSelectProduct) {
                    onSelectProduct(orig);
                  } else {
                    setSelectedProduct(orig);
                  }
                }
              }}
            />
          </div>
        </section>
      )}

      {/* ================= BEFORE / AFTER ================= */}
      <section className="space-y-8 sm:space-y-10">
        <div data-fx="rise" className="lux-sh flex flex-col md:flex-row md:items-end justify-between gap-4 border-b">
          <div>
            <p className="lux-sh-eyebrow">Before / After</p>
            <h2 className="lux-sh-title font-display text-4xl sm:text-6xl text-[#E8EBF2]">Template to signature</h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-[#8B93A7]">Drag the handle to compare a generic template with the same content, rebuilt with intent.</p>
        </div>
        <div data-fx="screen"><BeforeAfter title={finalLine1} subtitle={finalBioSubtext} cta={finalPrimaryCtaText} /></div>
      </section>

      {/* ================= SERVICES: PINNED HORIZONTAL (desktop) / STACKED (mobile) ================= */}
      <section data-fx="hpin" className={`${BLEED} lux-hpin overflow-hidden`} aria-label="Services">
        <div className={COL}>
          <div data-fx="rise" className="lux-sh flex items-end justify-between gap-6 border-b">
            <div>
              <p className="lux-sh-eyebrow">Services</p>
              <h2 className="lux-sh-title font-display text-4xl sm:text-6xl text-[#E8EBF2]">What I build</h2>
            </div>
            <span className="hidden lg:block font-mono text-[11px] uppercase tracking-[0.08em] text-[#8B93A7]">04 disciplines</span>
          </div>
          <div className="hidden lg:block relative h-px mt-[-1px] overflow-hidden" aria-hidden="true">
            <div data-fx-progress className="absolute inset-0 bg-[#4F7CFF] origin-left scale-x-0" />
          </div>
        </div>
        <div
          data-fx-track
          data-fx="cards"
          className="lux-hpin-track mt-10 sm:mt-12 grid gap-4 px-6 lg:flex lg:w-max lg:gap-6"
        >
          {PANELS.map((p, i) => (
            <article
              key={p.index}
              data-fx-item
              data-fx-panel
              className="lux-panel lux-card-surface flex flex-col p-6 sm:p-8 lg:w-[440px] lg:h-[420px] shrink-0"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-[44px] sm:text-[56px] leading-none tracking-[-0.04em] text-[#E8EBF2]/90 tabular-nums">{p.index}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#8B93A7]">{p.stack}</span>
              </div>
              <div className="mt-8 lg:mt-auto">
                <h3 className="text-[24px] sm:text-[28px] leading-[1.1] text-[#E8EBF2]">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#8B93A7]">{p.detail}</p>
                <ul className="mt-6 border-t border-[rgba(232,235,242,0.08)]">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-3 py-2.5 border-b border-[rgba(232,235,242,0.08)] text-[14px] text-[#E8EBF2]/80">
                      <span className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-[#4F7CFF]' : 'bg-[#4F7CFF]/60'}`} aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= SCOPE CONFIGURATOR ================= */}
      <section className="space-y-8 sm:space-y-10">
        <div data-fx="rise" className="lux-sh border-b">
          <p className="lux-sh-eyebrow">Scope</p>
          <h2 className="lux-sh-title font-display text-4xl sm:text-6xl text-[#E8EBF2]">Shape your build</h2>
        </div>
        <ScopeConfigurator
          items={SERVICES.map(([, title, detail]) => ({ title, detail }))}
          notice={finalPricingNotice}
          cta={finalPrimaryCtaText}
          onCta={() => {
            sound.playPageSwitch();
            setCurrentPage(finalPrimaryCtaRoute);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </section>

      {/* ================= REVIEWS (cards + marquee untouched) ================= */}
      <section data-fx="rise">
        <ReviewsDisplay reviews={reviews} />
      </section>

      {/* ================= CLOSING CTA ================= */}
      <section className="lux-closing border-t border-[rgba(232,235,242,0.08)] pt-16 sm:pt-24">
        <div data-fx="rise" className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="lux-sh-eyebrow">Next step</p>
            <h2 className="mt-5 font-display text-[40px] sm:text-[64px] lg:text-[80px] leading-[1] text-[#E8EBF2]">
              Let&rsquo;s build the one people remember.
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-3 lg:text-right">
            <ButterButton
              variant="outline"
              size="lg"
              onClick={() => {
                sound.playPageSwitch();
                setCurrentPage(finalPrimaryCtaRoute);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              id="closing-start-project-btn"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="lux-primary w-full sm:w-auto justify-center uppercase tracking-wider !py-3.5 !px-8 text-xs sm:text-sm"
            >
              {finalPrimaryCtaText}
            </ButterButton>
            <p className="text-[13px] text-[#8B93A7]">{finalPricingNotice}</p>
          </div>
        </div>
      </section>

      {/* LIVE INTERACTIVE DEPLOYMENT INSPECTOR MODAL */}
      <DeploymentModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
