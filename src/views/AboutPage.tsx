'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { Mail, MapPin, Sparkles, Send, Terminal, Shield, Award, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import { Page, AboutContent, ProofMetricCard } from '../types';
import { ButterButton } from '../components/ButterButton';
import { ScrollReveal } from '../components/ScrollReveal';
import { GsapPlayfulText } from '../components/GsapPlayfulText';
import { AboutStatsMatrix } from '../components/AboutStatsMatrix';
import { sound } from '../utils/audio';

interface AboutPageProps {
  setCurrentPage?: (page: Page) => void;
  aboutContent?: AboutContent;
  proofMetrics?: ProofMetricCard[];
  name?: string;
  artistName?: string;
  title?: string;
  tagline?: string;
  executiveBio?: string;
  bio?: string;
  avatarUrl?: string;
  locationTimezone?: string;
  availabilityStatus?: string;
  contactEmail?: string;
  skills?: string[];
  techSkills?: string[];
  isSignedIn?: boolean;
  setIsSignedIn?: (val: boolean) => void;
  openAuthModal?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  setCurrentPage: propSetCurrentPage,
  aboutContent,
  name,
  artistName,
  title,
  tagline,
  executiveBio,
  bio,
  avatarUrl,
  locationTimezone,
  availabilityStatus,
  contactEmail,
  skills,
  techSkills,
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

  const finalName = name || artistName || aboutContent?.name || aboutContent?.artistName || aboutContent?.profileName || 'Ahsan';
  const finalTitle = title || tagline || aboutContent?.title || aboutContent?.tagline || aboutContent?.role || 'Solo Creative Developer & 3D Artist';
  const finalBio = executiveBio || bio || aboutContent?.executiveBio || aboutContent?.bio || 'I design and engineer bespoke web experiences, interactive 3D WebGL environments, and production-ready Next.js interfaces directly for founders and modern brands. Operating as an independent developer, I provide end-to-end craft—from shaders and 3D assets to clean, scalable full-stack code with zero agency overhead or middlemen.';
  const finalEmail = contactEmail || aboutContent?.contactEmail || 'ahsxn3d@gmail.com';
  const finalLocation = locationTimezone || aboutContent?.locationTimezone || aboutContent?.location || 'Remote / Global (UTC+5)';
  const finalAvailability = availabilityStatus || aboutContent?.availabilityStatus || aboutContent?.availability || 'Available for Hire';
  const finalHandle = aboutContent?.handle || '@Ahsanwebdesign';

  const defaultSkills = [
    'Next.js 15',
    'React 19',
    'Tailwind CSS',
    'Prisma ORM',
    'Three.js',
    'GSAP',
    'Blender',
    'Maya',
    'Houdini',
    'Unreal Engine 5',
    'TypeScript',
    'WebGL / GLSL',
  ];
  const finalSkills = skills || techSkills || aboutContent?.techSkills || defaultSkills;

  return (
    <div className="space-y-10 sm:space-y-12 pb-16">
      
      {/* STEP 1: TOP IDENTITY STRIP CARD (SCROLL REVEAL) */}
      <ScrollReveal direction="down" delay={0.05} distance={20}>
        <div className="relative z-10 isolate p-3.5 sm:p-6 bg-[#131422]/90 backdrop-blur-2xl rounded-xl sm:rounded-3xl border border-purple-500/30 shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative shrink-0">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#8B00EE] via-[#5B009D] to-[#0A0B14] flex items-center justify-center text-[#EDE9E3] font-black text-sm sm:text-lg shadow-md border border-purple-400/40">
                {finalName.slice(0, 2).toUpperCase()}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#A855F7] border-2 border-[#0A0B14] shadow-[0_0_8px_#A855F7]" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-[#EDE9E3] truncate">{finalName}</h3>
                <span className="px-2 py-0.5 bg-[#8B00EE]/20 border border-[#8B00EE]/40 text-[#C084FC] text-[9px] sm:text-[10px] font-mono font-extrabold uppercase rounded-full shrink-0">
                  {finalTitle}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300 font-medium truncate">
                {finalEmail} • {finalLocation} • {finalHandle}
              </p>
            </div>
          </div>

          {/* Direct Contact Button */}
          <ButterButton
            variant="primary"
            size="sm"
            onClick={() => {
              setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            icon={<Mail className="w-3.5 h-3.5" />}
            iconPosition="left"
            className="uppercase tracking-wider w-full sm:w-auto text-center justify-center"
          >
            Contact Studio
          </ButterButton>
        </div>
      </ScrollReveal>

      {/* STEP 2: MAIN DUAL COLUMN LAYOUT WITH STAGGERED SCROLL REVEALS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-start">
        
        {/* LEFT COLUMN: Profile Info (8 cols) */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-8">
          
          <ScrollReveal direction="up" delay={0.1} distance={20}>
            <div className="space-y-2 sm:space-y-3">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8B00EE]/20 border border-[#8B00EE]/40 rounded-full text-[11px] sm:text-xs font-extrabold text-[#C084FC]">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C084FC] animate-pulse" />
                <span>Executive Profile // {finalTitle}</span>
              </div>

              {/* Huge Bold Name H1 with Letter-by-Letter 3D Kinetic Roll & Jump */}
              <GsapPlayfulText
                as="h1"
                text={finalName.toUpperCase()}
                highlightWords={[finalName.toUpperCase()]}
                gradientTheme="pure-purple"
                className="font-display text-3xl sm:text-6xl lg:text-7xl font-black text-[#EDE9E3] tracking-tight leading-none uppercase"
                staggerDelay={0.035}
                initialDelay={0.1}
              />

              {/* Subtitle Line with GSAP Letter Wave */}
              <GsapPlayfulText
                as="p"
                text={`${finalTitle} • ${finalLocation} • ${finalHandle}`}
                highlightWords={['Digital Artist', 'Frontend Developer', finalHandle]}
                gradientTheme="purple-cyan"
                className="text-xs sm:text-base font-bold text-[#C084FC] tracking-wide"
                staggerDelay={0.015}
                initialDelay={0.18}
              />
            </div>
          </ScrollReveal>

          {/* BIO & EXECUTIVE SUMMARY CARD */}
          <ScrollReveal direction="up" delay={0.16} distance={20}>
            <div className="relative z-10 isolate p-4 sm:p-8 bg-[#131422]/90 backdrop-blur-2xl rounded-xl sm:rounded-3xl border border-purple-400/50 shadow-[0_4px_25px_rgba(12, 11, 10,0.7),0_0_20px_rgba(139,0,238,0.2)] space-y-3 sm:space-y-4 hover:border-purple-400/80 transition-all duration-300">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C084FC]" />
                <h2 className="font-display text-base sm:text-xl font-black text-[#EDE9E3] uppercase tracking-wider">
                  Bio & Executive Summary
                </h2>
              </div>
              <div className="border-l-2 sm:border-l-3 border-[#A855F7] pl-3 sm:pl-4 py-0.5 sm:py-1">
                <GsapPlayfulText
                  as="p"
                  text={finalBio}
                  highlightWords={[
                    'digital artist',
                    'frontend developer',
                    '3D aesthetics',
                    'hyper-scalable',
                    'creative artistic expression',
                    'bulletproof engineering',
                    'high-performance',
                  ]}
                  gradientTheme="purple-cyan"
                  className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium"
                  staggerDelay={0.01}
                  initialDelay={0.25}
                />
              </div>
            </div>
          </ScrollReveal>

          {/* INTERACTIVE ANIMATED STATS & TELEMETRY MATRIX */}
          <ScrollReveal direction="up" delay={0.22} distance={20}>
            <AboutStatsMatrix setCurrentPage={setCurrentPage} />
          </ScrollReveal>

          {/* TECHNICAL STACK & SPECIALIZATIONS */}
          <ScrollReveal direction="up" delay={0.28} distance={20}>
            <div className="relative z-10 isolate p-4 sm:p-8 bg-[#131422]/90 backdrop-blur-2xl rounded-xl sm:rounded-3xl border border-purple-400/50 shadow-[0_4px_25px_rgba(12, 11, 10,0.7),0_0_20px_rgba(139,0,238,0.2)] space-y-3 sm:space-y-4 hover:border-purple-400/80 transition-all duration-300">
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C084FC]" />
                <h2 className="font-display text-sm sm:text-lg font-black text-[#EDE9E3] uppercase tracking-wider">
                  Technical Stack & Specializations
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {finalSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#8B00EE]/20 text-[#C084FC] border border-purple-400/40 text-[11px] sm:text-xs font-mono font-bold rounded-lg sm:rounded-xl transition-all shadow-[0_0_8px_rgba(139,0,238,0.25)] hover:scale-105 hover:bg-[#8B00EE]/35"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* INQUIRE CTA BUTTON */}
          <ScrollReveal direction="up" delay={0.34} distance={20}>
            <div>
              <ButterButton
                variant="primary"
                size="md"
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                id="inquire-collaboration-btn"
                icon={<Send className="w-4 h-4" />}
                iconPosition="left"
                className="w-full sm:w-auto uppercase tracking-widest shadow-[0_0_25px_rgba(139,0,238,0.4)] text-center justify-center"
              >
                Inquire for Collaboration
              </ButterButton>
            </div>
          </ScrollReveal>

        </div>

        {/* RIGHT SIDE STICKY CARD (4 cols) */}
        <div className="lg:col-span-4 sticky top-28 space-y-4 sm:space-y-6">
          <ScrollReveal direction="left" delay={0.18} distance={20}>
            <div className="relative z-10 isolate p-4 sm:p-7 bg-[#131422]/90 backdrop-blur-2xl rounded-xl sm:rounded-3xl border border-purple-500/30 shadow-2xl text-center space-y-4 sm:space-y-6 hover:border-purple-400/60 transition-all duration-300">
              
              {/* Profile Photo */}
              <div className="w-16 h-16 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#8B00EE] via-[#5B009D] to-[#0A0B14] flex items-center justify-center text-[#EDE9E3] font-black text-xl sm:text-3xl shadow-xl mx-auto border-2 border-purple-400/40">
                {finalName.slice(0, 2).toUpperCase()}
              </div>

              <div className="space-y-0.5 sm:space-y-1">
                <GsapPlayfulText
                  as="h3"
                  text={finalName}
                  highlightWords={[finalName]}
                  gradientTheme="pure-purple"
                  className="font-display text-lg sm:text-xl font-black text-[#EDE9E3]"
                  staggerDelay={0.03}
                  initialDelay={0.2}
                />
                <p className="text-[11px] sm:text-xs font-mono font-bold text-[#C084FC] uppercase tracking-wider">
                  {finalTitle}
                </p>
              </div>

              {/* Clean Stacked Info List */}
              <div className="space-y-2.5 sm:space-y-3 pt-2.5 sm:pt-3 border-t border-purple-500/20 text-left text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C084FC] shrink-0" />
                  <span className="font-mono font-semibold text-[#EDE9E3] truncate">{finalEmail}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C084FC] shrink-0" />
                  <span className="font-semibold text-[#EDE9E3]">{finalLocation}</span>
                </div>
                <div className="flex items-center justify-between pt-2.5 sm:pt-3 border-t border-purple-500/20">
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-400 uppercase">Availability</span>
                  
                  {/* Green "Available for Hire" Badge */}
                  <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[9px] sm:text-[10px] font-mono font-extrabold rounded-full flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{finalAvailability}</span>
                  </span>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>

      </div>

    </div>
  );
};
