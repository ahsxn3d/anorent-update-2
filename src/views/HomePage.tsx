'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { Page, DeploymentProduct, ReviewItem, HeroContent } from '../types';
import { ReviewsDisplay } from '../components/ReviewsSection';
import { ButterButton } from '../components/ButterButton';
import { HeroSpotlight, Magnetic, TokenPlayground, BeforeAfter, ScopeConfigurator } from '../components/craft/Interactive';
import { ScrollReveal } from '../components/ScrollReveal';
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

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 sm:pb-32">
      {/* ================= HERO SECTION WITH 3D QUANTUM HOLOGRAM ================= */}
      <section className="relative left-1/2 -translate-x-1/2 w-screen max-w-[100vw] -mt-8 sm:-mt-14 min-h-[88svh] flex flex-col justify-end px-6 lg:px-8 pt-28 pb-12 lux-hero">
        <div className="lux-hero-grid" aria-hidden="true" />
        <HeroSpotlight />
        <div className="relative max-w-[1200px] w-full mx-auto">
          <p className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-[#8B93A7]"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" aria-hidden="true" />
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
            <Magnetic>
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
</Magnetic>

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

        <div className="relative max-w-[1200px] w-full mx-auto lux-stats mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-5 border border-[#232837] rounded-[10px] overflow-hidden bg-[#0B0D12]/60 [&>*]:p-5 [&>*]:border-[#232837] [&>*:not(:last-child)]:sm:border-r [&>*]:max-sm:border-b">
          {SERVICES.map(([index, title, detail]) => (
            <button
              key={title}
              type="button"
              onClick={() => {
                setCurrentPage('deployments');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left group transition-transform duration-500 ease-out hover:-translate-y-0.5"
            >
              <span className="block text-[10px] tracking-[0.18em] uppercase text-[#E8EBF2]/35">{index}</span>
              <span className="mt-1 block text-sm sm:text-base text-[#E8EBF2]/80 group-hover:text-[#E8EBF2] transition-colors duration-500">{title}</span>
              <span className="mt-1 block text-xs text-[#E8EBF2]/40 group-hover:text-[#E8EBF2]/70 transition-colors duration-500">{detail}</span>
            </button>
          ))}
          <div className="hidden sm:block">
            <span className="block text-[10px] tracking-[0.18em] uppercase text-[#E8EBF2]/35">Response</span>
            <span className="mt-1 block font-display text-2xl text-[#E8EBF2]">{finalLatency}</span>
          </div>
          <div className="hidden sm:block">
            <span className="block text-[10px] tracking-[0.18em] uppercase text-[#E8EBF2]/35">Uptime</span>
            <span className="mt-1 block font-display text-2xl text-[#E8EBF2]">{finalUptime}</span>
          </div>
        </div>
      </section>

      {/* ================= FEATURED DEPLOYMENTS PROJECT CAROUSEL ================= */}
      {products && products.length > 0 && (
        <section className="relative left-1/2 -translate-x-1/2 w-screen max-w-[100vw] px-6 lg:px-8 space-y-10 sm:space-y-12 ">
          <ScrollReveal direction="up" delay={0.05} distance={20}>
            <div className="lux-sh flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#E8EBF2]/10 pb-5">
              <div className="space-y-0.5 sm:space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#5E667A]">
                    Curated Assets & Systems
                  </span>
                  <span className="text-[11px] tracking-[0.16em] uppercase text-[#E8EBF2]/30">
                    Featured
                  </span>
                </div>
                <div className="mask-container">
                  <h2 className="lux-sh-title cyber-reveal-line font-display text-4xl sm:text-6xl text-[#E8EBF2]" style={{ animationDelay: '0.15s' }}>
                    Featured Digital Deployments
                  </h2>
                </div>
              </div>

              <ButterButton
                variant="outline"
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
          </ScrollReveal>

          {/* AUTONOMOUS HUD SHOWCASE CONSOLE */}
          <ScrollReveal direction="up" delay={0.1} distance={24}>
            <div className="lux-depth"><ShowcaseConsole
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
            /></div>
          </ScrollReveal>
        </section>
      )}

      {/* BEFORE / AFTER + SCOPE CONFIGURATOR */}
      <section className="space-y-10">
        <div className="lux-sh flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#232837] pb-5">
          <div>
            <p className="lux-sh-eyebrow">Before / After</p>
            <h2 className="lux-sh-title font-display text-4xl sm:text-6xl text-[#E8EBF2]">{finalLine3}</h2>
          </div>
          <p className="max-w-md text-[15px] text-[#8B93A7]">{finalBioSubtext}</p>
        </div>
        <div className="lux-depth"><BeforeAfter title={finalLine1} subtitle={finalBioSubtext} cta={finalPrimaryCtaText} /></div>
      </section>

      {/* PINNED 3D UI STACK */}
      <section className="lux-stack-stage relative h-[540px] sm:h-[680px] overflow-visible" aria-label="Services">
        <div className="lux-sh border-b border-[#232837] pb-5">
          <p className="lux-sh-eyebrow">Services</p>
          <h2 className="lux-sh-title font-display text-4xl sm:text-6xl text-[#E8EBF2]">{finalLine2}</h2>
        </div>
        <div className="lux-stack-inner absolute inset-x-0 top-32 sm:top-40 bottom-0 flex items-center justify-center [perspective:1400px] [transform-style:preserve-3d]">
          {[...SERVICES, ['04', finalLine2, finalPricingNotice]].map(([index, title, detail], i) => (
            <div
              key={index}
              className="lux-stack-card lux-card-surface absolute w-[230px] sm:w-[280px] h-[300px] sm:h-[340px] rounded-[12px] border border-[#232837] bg-[#11141B] p-6 flex flex-col justify-between will-change-transform"
              style={{ zIndex: 10 - i }}
            >
              <span className="font-mono text-[11px] text-[#5E667A]">{index}</span>
              <div>
                <div className="h-24 mb-6 rounded-[8px] border border-[#232837] bg-[#171B24] grid grid-cols-3 gap-2 p-3">
                  <span className="col-span-2 rounded bg-[#232837]" /><span className={`rounded ${i === 0 ? 'bg-[#4F7CFF]' : 'bg-[#232837]'}`} />
                  <span className="rounded bg-[#232837]" /><span className="col-span-2 rounded bg-[#232837]/60" />
                </div>
                <p className="text-[20px] tracking-[-0.02em] text-[#E8EBF2] leading-tight">{title}</p>
                <p className="mt-2 text-[13px] text-[#8B93A7] line-clamp-2">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-10">
        <div className="lux-sh border-b border-[#232837] pb-5">
          <p className="lux-sh-eyebrow">Scope</p>
          <h2 className="lux-sh-title font-display text-4xl sm:text-6xl text-[#E8EBF2]">{finalPrimaryCtaText}</h2>
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

      {/* REVIEWS AND RATING SECTION (SCROLL TRIGGERED) */}
      <section className="pt-2 sm:pt-6">
        <ScrollReveal direction="up" delay={0.1} distance={20}>
          <div className="lux-depth"><ReviewsDisplay reviews={reviews} /></div>
        </ScrollReveal>
      </section>

      {/* CLOSING CTA */}
      <section className="lux-closing border-t border-[#232837] pt-24 sm:pt-32 text-left">
        <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#5E667A]">{finalBadgeText}</p>
        <div className="mt-6 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <p className="max-w-2xl text-[22px] sm:text-[32px] leading-[1.2] tracking-[-0.02em] text-[#E8EBF2]">{finalBioSubtext}</p>
          <div className="flex flex-col items-start gap-3 shrink-0">
            <Magnetic>
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
</Magnetic>
            <p className="text-xs text-[#5E667A]">{finalPricingNotice}</p>
          </div>
        </div>
        <div className="mt-16 sm:mt-20">
          <div className="lux-depth"><TokenPlayground title={finalLine1} body={finalBioSubtext} cta={finalPrimaryCtaText} meta={finalPricingNotice} /></div>
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
