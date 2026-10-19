'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { Page, DeploymentProduct, ReviewItem, HeroContent } from '../types';
import { ReviewsDisplay } from '../components/ReviewsSection';
import { ButterButton } from '../components/ButterButton';
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

  return (
    <div className="space-y-10 sm:space-y-24 pb-12 sm:pb-16">
      {/* ================= HERO SECTION WITH 3D QUANTUM HOLOGRAM ================= */}
      <section className="relative left-1/2 -translate-x-1/2 w-screen max-w-[100vw] -mt-8 sm:-mt-14 min-h-[86svh] flex flex-col justify-end px-5 sm:px-10 lg:px-16 pt-28 pb-10">
        <div className="max-w-[92rem]">
          <p className="mb-6 text-[11px] tracking-[0.22em] uppercase text-white/45">
            {finalBadgeText}
          </p>

          <KineticHeroTitle
            line1={finalLine1}
            line2={finalLine2}
            line3={finalLine3}
            isReady={isLoaded}
          />

          <p className="mt-8 max-w-xl text-[16px] sm:text-[18px] leading-relaxed text-white/62">
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
              className="w-full sm:w-auto justify-center uppercase tracking-wider !py-3 sm:!py-3.5 !px-6 sm:!px-8 text-xs sm:text-sm"
            >
              {finalPrimaryCtaText}
            </ButterButton>

            <ButterButton
              variant="outline"
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

          <p className="mt-4 text-xs sm:text-sm text-white/40">{finalPricingNotice}</p>
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-5 gap-x-6 gap-y-5 border-t border-white/10 pt-5">
          {[
            ['01', 'Web Architecture', 'Next.js, React, Tailwind'],
            ['02', 'Animated Sites', 'Motion, shaders, physics'],
            ['03', 'SaaS Dashboards', 'Analytics and APIs'],
          ].map(([index, title, detail]) => (
            <button
              key={title}
              type="button"
              onClick={() => {
                setCurrentPage('deployments');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left group transition-transform duration-500 ease-out hover:-translate-y-0.5"
            >
              <span className="block text-[10px] tracking-[0.18em] uppercase text-white/35">{index}</span>
              <span className="mt-1 block text-sm sm:text-base text-white/80 group-hover:text-white transition-colors duration-500">{title}</span>
              <span className="mt-1 block text-xs text-white/40 group-hover:text-white/70 transition-colors duration-500">{detail}</span>
            </button>
          ))}
          <div className="hidden sm:block">
            <span className="block text-[10px] tracking-[0.18em] uppercase text-white/35">Response</span>
            <span className="mt-1 block font-display text-2xl text-white">{finalLatency}</span>
          </div>
          <div className="hidden sm:block">
            <span className="block text-[10px] tracking-[0.18em] uppercase text-white/35">Uptime</span>
            <span className="mt-1 block font-display text-2xl text-white">{finalUptime}</span>
          </div>
        </div>
      </section>

      {/* ================= FEATURED DEPLOYMENTS PROJECT CAROUSEL ================= */}
      {products && products.length > 0 && (
        <section className="relative left-1/2 -translate-x-1/2 w-screen max-w-[100vw] px-4 sm:px-8 lg:px-12 pt-6 sm:pt-10 space-y-6 sm:space-y-8">
          <ScrollReveal direction="up" delay={0.05} distance={20}>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-white/10 pb-5">
              <div className="space-y-0.5 sm:space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-white/40">
                    Curated Assets & Systems
                  </span>
                  <span className="text-[11px] tracking-[0.16em] uppercase text-white/30">
                    Featured
                  </span>
                </div>
                <div className="mask-container">
                  <h2 className="cyber-reveal-line font-display text-4xl sm:text-6xl text-white" style={{ animationDelay: '0.15s' }}>
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
          </ScrollReveal>
        </section>
      )}

      {/* REVIEWS AND RATING SECTION (SCROLL TRIGGERED) */}
      <section className="pt-2 sm:pt-6">
        <ScrollReveal direction="up" delay={0.1} distance={20}>
          <ReviewsDisplay reviews={reviews} />
        </ScrollReveal>
      </section>

      {/* LIVE INTERACTIVE DEPLOYMENT INSPECTOR MODAL */}
      <DeploymentModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
