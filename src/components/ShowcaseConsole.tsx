'use client';

import React, { useState, useEffect } from 'react';

import { motion } from 'motion/react';
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Eye,
  Activity,
} from 'lucide-react';
import { ButterButton } from './ButterButton';
import { DeploymentProduct } from '../types';

// Alias or interface for projects consumed by ShowcaseConsole
export type ShowcaseProject = DeploymentProduct;

interface ShowcaseConsoleProps {
  projects: DeploymentProduct[];
  onInspect?: (project: DeploymentProduct) => void;
  onLaunch?: (project: DeploymentProduct) => void;
}

export const ShowcaseConsole: React.FC<ShowcaseConsoleProps> = ({
  projects,
  onInspect,
  onLaunch,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [, setDirection] = useState<'left' | 'right'>('right');

  const count = projects ? projects.length : 0;

  // Slide changer
  const changeSlide = (nextIndex: number, dir: 'left' | 'right') => {
    setDirection(dir);
    setActiveIndex((nextIndex + count) % count);
  };

  // Autonomous Smooth Gliding Timer (3800ms interval), pauses immediately on hover
  useEffect(() => {
    if (isPaused || count <= 1) return;
    const timer = setInterval(() => {
      setDirection('right');
      setActiveIndex((prev) => (prev + 1) % count);
    }, 3800);
    return () => clearInterval(timer);
  }, [isPaused, count]);

  if (!projects || count === 0) return null;

  // Calculate relative offset for 3D stage (-1: left peek, 0: center enlarged, +1: right peek, etc.)
  const getCardOffset = (index: number) => {
    const diff = (index - activeIndex + count) % count;
    if (diff === 0) return 0;
    if (diff === 1 || (diff > count / 2 && diff === count - 1 && count <= 2)) return 1;
    if (diff === count - 1) return -1;
    return diff > count / 2 ? diff - count : diff;
  };

  return (
    <div
      className="relative w-full max-w-7xl mx-auto select-none space-y-3 sm:space-y-6 overflow-hidden py-1 sm:py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* AMBIENT BACKGROUND GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[200px] sm:h-[350px] bg-gradient-to-r from-[#8B00EE]/15 via-[#C084FC]/10 to-[#38BDF8]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* TOP TELEMETRY PILL BAR */}
      <div className="flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 py-1.5 sm:py-3 rounded-full bg-[#0D0E1A]/85 border border-purple-500/30 backdrop-blur-2xl shadow-[0_0_30px_rgba(139,0,238,0.12)]">
        {/* Telemetry Status */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex h-2 w-2 sm:h-2.5 sm:w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-400" />
          </span>
          <span className="font-mono text-[10px] sm:text-xs text-slate-300">
            NODE <span className="text-[#C084FC] font-extrabold">0{activeIndex + 1}</span> / 0{count} //{' '}
            <span className="text-emerald-400 font-bold hidden xs:inline">AUTONOMOUS GLIDE</span>
          </span>
        </div>

        {/* Live Engine Status Badge */}
        <div className="flex items-center gap-2">
          <div className="px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-[#150D2E]/90 border border-purple-500/40 text-[9px] sm:text-[11px] font-mono font-bold text-[#C084FC] flex items-center gap-1 sm:gap-1.5 shadow-[0_0_15px_rgba(139,0,238,0.3)]">
            <Activity className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#38BDF8] animate-pulse" />
            <span>60 FPS GLSL</span>
          </div>
        </div>
      </div>

      {/* 3D CENTER-ENLARGED STAGE WITH LEFT & RIGHT PEEKING CARDS */}
      <div className="relative min-h-[350px] sm:min-h-[500px] flex items-center justify-center overflow-visible py-1 sm:py-4">
        <div className="relative w-full max-w-5xl h-[340px] sm:h-[480px] flex items-center justify-center">
          {projects.map((project, idx) => {
            const offset = getCardOffset(idx);
            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isVisible = isCenter || isLeft || isRight;

            // Position calculations for peek effect
            let xPos = '0%';
            let scale = 0.82;
            let zIndex = 10;
            let opacity = 0;
            let rotateY = 0;

            if (isCenter) {
              xPos = '0%';
              scale = 1;
              zIndex = 30;
              opacity = 1;
              rotateY = 0;
            } else if (isLeft) {
              xPos = '-58%';
              scale = 0.82;
              zIndex = 15;
              opacity = 0.55;
              rotateY = 12;
            } else if (isRight) {
              xPos = '58%';
              scale = 0.82;
              zIndex = 15;
              opacity = 0.55;
              rotateY = -12;
            } else {
              xPos = offset < 0 ? '-100%' : '100%';
              scale = 0.7;
              zIndex = 5;
              opacity = 0;
            }

            if (!isVisible && Math.abs(offset) > 1) return null;

            return (
              <motion.div
                key={project.id}
                animate={{
                  x: xPos,
                  scale: scale,
                  zIndex: zIndex,
                  opacity: opacity,
                  rotateY: rotateY,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 26,
                  mass: 0.9,
                }}
                onClick={() => {
                  if (!isCenter) changeSlide(idx, idx > activeIndex ? 'right' : 'left');
                }}
                className={`absolute top-0 w-[92%] sm:w-[560px] lg:w-[620px] h-[335px] sm:h-[460px] rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 bg-[#0E0F1E]/95 border transition-colors duration-300 backdrop-blur-2xl overflow-hidden shadow-2xl flex flex-col justify-between ${
                  isCenter
                    ? 'border-purple-500/60 shadow-[0_0_40px_rgba(139,0,238,0.25)] cursor-default'
                    : 'border-purple-500/20 hover:border-purple-400/50 hover:opacity-80 cursor-pointer'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: 1000,
                }}
              >
                {/* Media Banner */}
                <div className="relative w-full h-32 sm:h-52 rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-black shrink-0">
                  <img
                    src={project.thumbnailUrl || project.coverImageUrl}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F1E] via-transparent to-black/30 pointer-events-none" />

                  {/* Badges */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex items-center gap-1.5 sm:gap-2">
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#140D2B]/90 border border-purple-500/50 text-[9px] sm:text-[10px] font-mono font-extrabold text-[#C084FC] uppercase tracking-wider shadow-lg">
                      {project.category}
                    </span>
                    <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[8px] sm:text-[9px] font-mono font-bold text-emerald-300">
                      ★ 5.0
                    </span>
                  </div>

                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                    <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/80 border border-white/15 text-[9px] sm:text-[10px] font-mono text-emerald-400 font-bold">
                      {project.fpsBenchmark || 60} FPS
                    </span>
                  </div>
                </div>

                {/* Project Metadata */}
                <div className="space-y-1 sm:space-y-2 mt-1 sm:mt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-sm sm:text-xl font-extrabold text-white tracking-tight truncate">
                      {project.title}
                    </h3>
                    <span className="text-[10px] sm:text-[11px] font-mono text-purple-300 font-bold shrink-0">
                      Audit: {project.auditScore || 100}%
                    </span>
                  </div>

                  <p className="text-[11px] sm:text-sm text-slate-300 line-clamp-2 leading-tight sm:leading-relaxed font-medium">
                    {project.shortDescription}
                  </p>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-0.5 sm:pt-1">
                    {(project.techStack || []).slice(0, 3).map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-full bg-white/5 border border-purple-500/20 text-[9px] sm:text-[10px] font-mono text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Pill Buttons (Center card only) */}
                <div className="pt-2 sm:pt-3 border-t border-purple-500/20 flex items-center gap-2 sm:gap-3">
                  {isCenter ? (
                    <>
                      <ButterButton
                        variant="primary"
                        size="sm"
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => onLaunch?.(project)}
                        icon={<ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                        iconPosition="right"
                        className="flex-1 text-[10px] sm:text-[11px] font-extrabold tracking-wider !py-1 sm:!py-1.5"
                      >
                        Launch Demo
                      </ButterButton>
                      <ButterButton
                        variant="secondary"
                        size="sm"
                        onClick={() => onInspect?.(project)}
                        icon={<Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C084FC]" />}
                        iconPosition="left"
                        className="text-[10px] sm:text-[11px] font-extrabold tracking-wider !py-1 sm:!py-1.5"
                      >
                        Inspect
                      </ButterButton>
                    </>
                  ) : (
                    <div className="w-full text-center py-0.5">
                      <span className="text-[10px] sm:text-[11px] font-mono text-purple-300 font-bold uppercase tracking-wider">
                        Click to Focus Node
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM CONTROLS & TIMELINE DOCK */}
      <div className="flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 py-1.5 sm:py-3 rounded-full bg-[#0D0E1A]/80 border border-purple-500/20 backdrop-blur-2xl">
        {/* Left Arrow with Bubble Pill Button */}
        <ButterButton
          variant="ghost"
          size="sm"
          onClick={() => changeSlide(activeIndex - 1, 'left')}
          className="!px-3 sm:!px-5 !py-1 sm:!py-2 text-slate-300 hover:text-white text-[10px] sm:text-xs"
        >
          <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />
          <span className="font-bold">PREV</span>
        </ButterButton>

        {/* Step Indicators with Glowing Pill Dots */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {projects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => changeSlide(idx, idx > activeIndex ? 'right' : 'left')}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? 'w-6 sm:w-8 bg-gradient-to-r from-[#8B00EE] to-[#38BDF8] shadow-[0_0_12px_rgba(139,0,238,0.6)]'
                  : 'w-1.5 sm:w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Right Arrow with Bubble Pill Button */}
        <ButterButton
          variant="ghost"
          size="sm"
          onClick={() => changeSlide(activeIndex + 1, 'right')}
          className="!px-3 sm:!px-5 !py-1 sm:!py-2 text-slate-300 hover:text-white text-[10px] sm:text-xs"
        >
          <span className="font-bold">NEXT</span>
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5 sm:mr-1" />
        </ButterButton>
      </div>
    </div>
  );
};

export default ShowcaseConsole;
