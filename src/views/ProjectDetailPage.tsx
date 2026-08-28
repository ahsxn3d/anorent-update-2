'use client';

import React, { useState } from 'react';

import { motion } from 'motion/react';
import {
  ArrowLeft,
  ExternalLink,
  Star,
  Zap,
  Activity,
  ShieldCheck,
  Sparkles,
  Copy,
  Check,
  Layers,
  Send,
  Globe,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DeploymentProduct, Page } from '../types';
import { ButterButton } from '../components/ButterButton';
import { ScrollReveal } from '../components/ScrollReveal';
import { sound } from '../utils/audio';

interface ProjectDetailPageProps {
  product: DeploymentProduct;
  onBack?: () => void;
  setCurrentPage?: (page: Page) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  product,
  onBack,
  setCurrentPage: propSetCurrentPage,
}) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

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

  const handleBack = () => {
    sound.playClick();
    if (onBack) {
      onBack();
    } else {
      router.push('/deployments');
    }
  };


  const handleCopyLink = () => {
    sound.playChime();
    navigator.clipboard.writeText(product.demoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 sm:space-y-10 pb-16 pt-2">
      
      {/* ------------------------------------------------------------- */}
      {/* TOP NAVIGATION & ACTION BAR */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-500/20 pb-4 sm:pb-6">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#131422]/90 hover:bg-[#1f1638] border border-purple-500/30 text-xs sm:text-sm font-bold text-white transition-all shadow-md cursor-pointer hover:border-purple-400/70 group"
        >
          <ArrowLeft className="w-4 h-4 text-[#C084FC] group-hover:-translate-x-1 transition-transform" />
          <span>Back to Deployments</span>
        </button>


        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#131422]/90 hover:bg-[#1f1638] border border-purple-500/30 text-xs font-mono font-semibold text-slate-300 hover:text-white transition-all shadow-sm cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-purple-300" />
                <span>Share Project</span>
              </>
            )}
          </button>

          <ButterButton
            variant="primary"
            size="sm"
            onClick={() => {
              window.open(product.demoUrl, '_blank');
            }}
            icon={<ExternalLink className="w-3.5 h-3.5" />}
            iconPosition="right"
            className="uppercase tracking-wider font-extrabold text-xs"
          >
            Launch Live Demo
          </ButterButton>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MAIN PROJECT SHOWCASE HERO */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-6 sm:space-y-8">
        
        {/* BIG FULL-SIZE HIGH-RES THUMBNAIL FRAME */}
        <ScrollReveal direction="down" delay={0.05} distance={20}>
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-purple-500/40 bg-[#080210] shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(139,0,238,0.25)]">
            <img
              src={product.thumbnailUrl}
              alt={product.title}
              className="w-full h-auto max-h-[560px] object-cover object-center"
            />

            {/* Subtle Gradient Rim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B14] via-transparent to-black/20 pointer-events-none" />

            {/* Floating Live Telemetry Watermark */}
            <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-6 right-3 sm:right-6 flex items-center justify-between text-white text-[10px] sm:text-xs pointer-events-none">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono font-bold tracking-wider text-slate-200">
                  LIVE 60FPS SHADER ENGINE
                </span>
              </div>
              <span className="hidden sm:inline font-mono text-purple-300/80 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10">
                HTTPS://ANORIX.STUDIO
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* ------------------------------------------------------------- */}
        {/* PRODUCT DETAILS & COMPLETE DESCRIPTION (NO CUTOFFS) */}
        {/* ------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* LEFT 8 COLS: Title, Full Description & Tech Stack */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="p-5 sm:p-8 bg-[#131422]/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-purple-500/30 shadow-2xl space-y-4">
              
              {/* Category & Status */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#8B00EE]/20 border border-[#8B00EE]/40 text-[#C084FC] text-xs font-mono font-extrabold uppercase rounded-full tracking-wider shadow-sm">
                    {product.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    ID: {product.id}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold rounded-full shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9 / 5.0 Rating</span>
                </div>
              </div>

              {/* Exact Title in Full */}
              <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                {product.title}
              </h1>

              {/* FULL UNCUT DESCRIPTION (Everything is readable) */}
              <div className="pt-2 border-t border-purple-500/20 space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300 block">
                  Complete System Description
                </span>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                  {product.fullDescription || product.shortDescription}
                </p>
              </div>

              {/* Client & Year Metadata */}
              {(product.client || product.year) && (
                <div className="pt-2 flex items-center gap-4 text-xs font-mono text-slate-400">
                  {product.client && (
                    <span>Client: <strong className="text-white">{product.client}</strong></span>
                  )}
                  {product.year && (
                    <span>Year: <strong className="text-white">{product.year}</strong></span>
                  )}
                  <span>Status: <strong className="text-emerald-400">{product.status || 'Production'}</strong></span>
                </div>
              )}

              {/* Complete Tech Stack */}
              <div className="pt-4 border-t border-purple-500/20 space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300 block">
                  Full Technology Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {(product.techStack || []).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 bg-[#1f1035] border border-purple-400/40 text-purple-200 text-xs font-mono font-bold rounded-xl shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT 4 COLS: Performance, Escrow & Inquire Actions */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Action Box */}
            <div className="p-5 sm:p-6 bg-[#131422]/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-purple-500/30 shadow-2xl space-y-4">
              <h3 className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#C084FC]">
                Live Deployment Actions
              </h3>

              <ButterButton
                variant="primary"
                size="lg"
                onClick={() => {
                  window.open(product.demoUrl, '_blank');
                }}
                icon={<ExternalLink className="w-4 h-4" />}
                iconPosition="right"
                className="w-full uppercase tracking-wider font-extrabold shadow-[0_0_25px_rgba(139,0,238,0.5)]"
              >
                Visit Live Demo
              </ButterButton>

              <ButterButton
                variant="secondary"
                size="md"
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                icon={<Send className="w-3.5 h-3.5 text-[#C084FC]" />}
                iconPosition="left"
                className="w-full uppercase tracking-wider font-bold text-xs"
              >
                Inquire for Similar Build
              </ButterButton>

              {/* Status checklist */}
              <div className="pt-3 border-t border-purple-500/20 space-y-2.5 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-2 text-emerald-400">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Awwwards-Grade Architecture</span>
                </div>
                <div className="flex items-center gap-2 text-purple-300">
                  <Zap className="w-4 h-4 shrink-0 text-[#A855F7]" />
                  <span>8ms TTFB & 60 FPS WebGL</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Globe className="w-4 h-4 shrink-0 text-cyan-400" />
                  <span>Global Edge CDN Distributed</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
