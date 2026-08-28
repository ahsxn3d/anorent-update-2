'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { Page, DeploymentProduct, ReviewItem, HeroContent } from '../types';
import { ReviewsDisplay } from '../components/ReviewsSection';
import { CyberButton } from '../components/CyberButton';
import { ButterButton } from '../components/ButterButton';
import { ScrollReveal } from '../components/ScrollReveal';
import { HeroHologramCanvas } from '../components/HeroHologramCanvas';
import { HoloCard } from '../components/HoloCard';
import { DeploymentModal } from '../components/DeploymentModal';
import { KineticHeroTitle } from '../components/KineticHeroTitle';
import { GsapPlayfulText } from '../components/GsapPlayfulText';
import HorizontalStory from '../components/HorizontalStory';
import ShowcaseConsole from '../components/ShowcaseConsole';
import { sound } from '../utils/audio';
import { ArrowRight, Box, Sparkles, Zap } from 'lucide-react';

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
      <section className="relative min-h-[75svh] lg:min-h-[90vh] flex flex-col justify-center py-2 sm:py-6 lg:py-10 overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 items-center">
          
          {/* HERO LEFT COLUMN (Copy & Streamlined Dual CTAs) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            
            {/* ONE CLEAN, MINIMAL STATUS BADGE */}
            <ScrollReveal direction="down" delay={0.05} distance={16}>
              <div 
                onMouseEnter={() => sound.playHover()}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 bg-[#8B00EE]/15 backdrop-blur-2xl border border-purple-500/40 rounded-full shadow-[0_0_25px_rgba(139,0,238,0.3)] cursor-default group"
              >
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] sm:text-xs font-mono font-extrabold uppercase tracking-widest text-[#C084FC] group-hover:text-white transition-colors">
                  {finalBadgeText}
                </span>
              </div>
            </ScrollReveal>

            {/* Massive GSAP-Style Kinetic Animated Headline */}
            <ScrollReveal direction="up" delay={0.12} distance={24}>
              <KineticHeroTitle
                line1={finalLine1}
                line2={finalLine2}
                line3={finalLine3}
                isReady={isLoaded}
              />
            </ScrollReveal>

            {/* Subtitle Bio with Letter-by-Letter 3D Rotating & Jumping Wave Animation */}
            <ScrollReveal direction="up" delay={0.2} distance={20}>
              <GsapPlayfulText
                text={finalBioSubtext}
                highlightWords={heroContent?.highlightWords || [
                  'high-performance',
                  '3D websites',
                  'WebGL shaders',
                  'bespoke Next.js interfaces',
                  'founders',
                  'stand out',
                ]}
                gradientTheme="purple-cyan"
                className="text-xs sm:text-base md:text-lg text-slate-200 leading-relaxed max-w-2xl font-medium tracking-wide"
                staggerDelay={0.016}
                initialDelay={0.2}
              />
            </ScrollReveal>

            {/* STREAMLINED DUAL CTAs & TRANSPARENT PRICING SUBTEXT */}
            <ScrollReveal direction="up" delay={0.28} distance={16}>
              <div className="space-y-2.5 sm:space-y-3 pt-1 sm:pt-2 flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2.5 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto sm:mx-0">
                  <ButterButton
                    variant="primary"
                    size="lg"
                    onClick={() => {
                      sound.playPageSwitch();
                      setCurrentPage(finalPrimaryCtaRoute);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    id="hero-start-project-btn"
                    icon={<Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300" />}
                    iconPosition="right"
                    className="w-full sm:w-auto justify-center uppercase tracking-wider font-black shadow-[0_0_25px_rgba(139,0,238,0.5)] !py-2.5 sm:!py-3.5 !px-5 sm:!px-8 text-xs sm:text-base"
                  >
                    {finalPrimaryCtaText}
                  </ButterButton>

                  <ButterButton
                    variant="secondary"
                    size="lg"
                    onClick={() => {
                      sound.playPageSwitch();
                      setCurrentPage(finalSecondaryCtaRoute);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    id="hero-browse-deployments-btn"
                    icon={<ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300" />}
                    iconPosition="right"
                    className="w-full sm:w-auto justify-center uppercase tracking-wider font-black !py-2.5 sm:!py-3.5 !px-5 sm:!px-8 text-xs sm:text-base"
                  >
                    {finalSecondaryCtaText}
                  </ButterButton>
                </div>

                {/* Direct Pricing Pre-qualification Subtext */}
                <p className="text-[11px] sm:text-sm font-mono text-purple-300/80 tracking-wide text-center sm:text-left">
                  {finalPricingNotice}
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* HERO RIGHT COLUMN (Interactive 3D Quantum Hologram Sphere) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            <ScrollReveal direction="zoom" delay={0.2} distance={0}>
              <HeroHologramCanvas />
            </ScrollReveal>

            {/* 3 Quick Category 3D Holo Cards with Permanent Blurry Glass & Ambient Back-glow */}
            <div className="w-full relative mt-3 sm:mt-5 left-0 right-0 z-20">
              {/* Vibrant Ambient Glow Orbs positioned behind the cards for visible glass refraction */}
              <div className="absolute inset-0 grid grid-cols-3 pointer-events-none -z-10 opacity-70 blur-2xl">
                <div className="w-full h-full bg-purple-600/30 rounded-full scale-75" />
                <div className="w-full h-full bg-emerald-500/30 rounded-full scale-75" />
                <div className="w-full h-full bg-cyan-500/30 rounded-full scale-75" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                {/* Card 1 - Web Architecture (Purple) */}
                <HoloCard
                  maxTilt={24}
                  theme="purple"
                  onClick={() => {
                    setCurrentPage('deployments');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-2.5 sm:p-3 cursor-pointer group h-full flex flex-col justify-between"
                >
                  <div className="flex flex-col h-full justify-between [transform-style:preserve-3d]">
                    <div className="flex items-center justify-between [transform-style:preserve-3d]">
                      <div
                        style={{ transform: 'translateZ(30px)' }}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#8B00EE]/30 border border-purple-400/50 flex items-center justify-center text-[#C084FC] group-hover:bg-[#8B00EE] group-hover:text-white transition-all duration-200 shadow-[0_4px_12px_rgba(139,0,238,0.3)]"
                      >
                        <Box className="w-3.5 h-3.5" />
                      </div>
                      <span
                        style={{ transform: 'translateZ(24px)' }}
                        className="text-[8px] sm:text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-[#8B00EE]/30 text-[#C084FC] border border-[#8B00EE]/60 shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                      >
                        LIVE
                      </span>
                    </div>
                    <div className="mt-2 [transform-style:preserve-3d]">
                      <h4
                        style={{ transform: 'translateZ(34px)' }}
                        className="font-bold text-[12px] sm:text-[13px] text-white tracking-wide transition-colors duration-200 group-hover:text-purple-200 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] truncate"
                      >
                        Web Architecture
                      </h4>
                      <p
                        style={{ transform: 'translateZ(20px)' }}
                        className="text-[9.5px] sm:text-[10px] text-slate-300/80 font-normal truncate mt-0.5"
                      >
                        Next.js, React, Tailwind v4
                      </p>
                    </div>
                  </div>
                </HoloCard>

                {/* Card 2 - Animated Sites (Green / 60 FPS) */}
                <HoloCard
                  maxTilt={24}
                  theme="green"
                  onClick={() => {
                    setCurrentPage('deployments');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-2.5 sm:p-3 cursor-pointer group h-full flex flex-col justify-between"
                >
                  <div className="flex flex-col h-full justify-between [transform-style:preserve-3d]">
                    <div className="flex items-center justify-between [transform-style:preserve-3d]">
                      <div
                        style={{ transform: 'translateZ(30px)' }}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/25 border border-emerald-400/50 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-200 shadow-[0_4px_12px_rgba(16,185,129,0.3)]"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <span
                        style={{ transform: 'translateZ(24px)' }}
                        className="text-[8px] sm:text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/25 text-emerald-300 border border-emerald-500/60 shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                      >
                        60 FPS
                      </span>
                    </div>
                    <div className="mt-2 [transform-style:preserve-3d]">
                      <h4
                        style={{ transform: 'translateZ(34px)' }}
                        className="font-bold text-[12px] sm:text-[13px] text-white tracking-wide transition-colors duration-200 group-hover:text-emerald-200 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] truncate"
                      >
                        Animated Sites
                      </h4>
                      <p
                        style={{ transform: 'translateZ(20px)' }}
                        className="text-[9.5px] sm:text-[10px] text-slate-300/80 font-normal truncate mt-0.5"
                      >
                        Motion, Shaders, Physics
                      </p>
                    </div>
                  </div>
                </HoloCard>

                {/* Card 3 - SaaS Dashboards (Blue / Cyan) */}
                <HoloCard
                  maxTilt={24}
                  theme="blue"
                  onClick={() => {
                    setCurrentPage('deployments');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-2.5 sm:p-3 cursor-pointer group h-full flex flex-col justify-between"
                >
                  <div className="flex flex-col h-full justify-between [transform-style:preserve-3d]">
                    <div className="flex items-center justify-between [transform-style:preserve-3d]">
                      <div
                        style={{ transform: 'translateZ(30px)' }}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-500/25 border border-cyan-400/50 flex items-center justify-center text-[#38BDF8] group-hover:bg-[#38BDF8] group-hover:text-[#0A0B14] transition-all duration-200 shadow-[0_4px_12px_rgba(56,189,248,0.3)]"
                      >
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                      <span
                        style={{ transform: 'translateZ(24px)' }}
                        className="text-[8px] sm:text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-cyan-500/25 text-[#38BDF8] border border-cyan-500/60 shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                      >
                        VERIFIED
                      </span>
                    </div>
                    <div className="mt-2 [transform-style:preserve-3d]">
                      <h4
                        style={{ transform: 'translateZ(34px)' }}
                        className="font-bold text-[12px] sm:text-[13px] text-white tracking-wide transition-colors duration-200 group-hover:text-cyan-200 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] truncate"
                      >
                        SaaS Dashboards
                      </h4>
                      <p
                        style={{ transform: 'translateZ(20px)' }}
                        className="text-[9.5px] sm:text-[10px] text-slate-300/80 font-normal truncate mt-0.5"
                      >
                        Analytics & Modern APIs
                      </p>
                    </div>
                  </div>
                </HoloCard>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= BESPOKE HORIZONTAL CRAFT & ENGINEERING LAB ================= */}
      <HorizontalStory setCurrentPage={setCurrentPage} />

      {/* ================= FEATURED DEPLOYMENTS PROJECT CAROUSEL ================= */}
      <section className="pt-4 sm:pt-10 space-y-4 sm:space-y-6">
        <ScrollReveal direction="up" delay={0.05} distance={20}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-b border-purple-500/20 pb-3 sm:pb-4">
            <div className="space-y-0.5 sm:space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#C084FC]">
                  Curated Assets & Systems
                </span>
                <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-[#8B00EE]/20 border border-purple-500/30 text-[8px] sm:text-[9px] font-mono text-purple-200">
                  FEATURED SHOWCASE
                </span>
              </div>
              <div className="mask-container">
                <h2 className="cyber-reveal-line font-display text-xl sm:text-3xl font-extrabold text-white" style={{ animationDelay: '0.15s' }}>
                  Featured Digital Deployments
                </h2>
              </div>
            </div>

            <ButterButton
              variant="secondary"
              size="sm"
              onClick={() => {
                sound.playPageSwitch();
                setCurrentPage('deployments');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              icon={<ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C084FC]" />}
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
