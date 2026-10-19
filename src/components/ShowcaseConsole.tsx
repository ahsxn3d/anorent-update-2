'use client';

import React, { useState, useEffect } from 'react';

import { motion } from 'motion/react';
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Eye,
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
      <div className="flex items-center justify-between gap-2 sm:gap-4 px-1 sm:px-2">
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#E8EBF2]/45">
          {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          <span className="ml-3 text-[#E8EBF2]/80">{projects[activeIndex]?.title}</span>
        </p>
        <p className="text-[11px] tracking-[0.16em] uppercase text-[#E8EBF2]/35">
          {projects[activeIndex]?.category}
        </p>
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
                className={`absolute top-0 w-[92%] sm:w-[560px] lg:w-[680px] h-[335px] sm:h-[460px] rounded-2xl sm:rounded-[28px] p-3.5 sm:p-5 bg-[#0B0D12]/75 border transition-colors duration-300 overflow-hidden shadow-2xl flex flex-col justify-between ${
                  isCenter
                    ? 'border-[#E8EBF2]/70 cursor-default'
                    : 'border-[#E8EBF2]/15 hover:border-[#E8EBF2]/40 cursor-pointer'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: 1000,
                }}
              >
                {/* Media Banner */}
                <div className="relative w-full h-32 sm:h-52 rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8EBF2]/10 bg-[#0B0D12] shrink-0">
                  <img
                    src={project.thumbnailUrl || project.coverImageUrl}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F1E] via-transparent to-[#0B0D12]/30 pointer-events-none" />

                  {/* Badges */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex items-center gap-1.5 sm:gap-2">
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#0B0D12]/70 border border-[#E8EBF2]/20 text-[9px] sm:text-[10px] font-mono text-[#E8EBF2] uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[8px] sm:text-[9px] font-mono font-bold text-emerald-300">
                      ★ 5.0
                    </span>
                  </div>

                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                    <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#0B0D12]/80 border border-[#E8EBF2]/15 text-[9px] sm:text-[10px] font-mono text-emerald-400 font-bold">
                      {project.fpsBenchmark || 60} FPS
                    </span>
                  </div>
                </div>

                {/* Project Metadata */}
                <div className="space-y-1 sm:space-y-2 mt-1 sm:mt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-sm sm:text-xl font-extrabold text-[#E8EBF2] tracking-tight truncate">
                      {project.title}
                    </h3>
                    <span className="text-[10px] sm:text-[11px] font-mono text-[#E8EBF2]/45 shrink-0">
                      {project.auditScore || 100}
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
                        className="px-2 py-0.5 rounded-full bg-[#E8EBF2]/5 border border-[#E8EBF2]/15 text-[9px] sm:text-[10px] font-mono text-[#E8EBF2]/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Pill Buttons (Center card only) */}
                <div className="pt-2 sm:pt-3 border-t border-[#E8EBF2]/10 flex items-center gap-2 sm:gap-3">
                  {isCenter ? (
                    <>
                      <ButterButton
                        variant="outline"
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
                        variant="outline"
                        size="sm"
                        onClick={() => onInspect?.(project)}
                        icon={<Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                        iconPosition="left"
                        className="text-[10px] sm:text-[11px] font-extrabold tracking-wider !py-1 sm:!py-1.5"
                      >
                        Inspect
                      </ButterButton>
                    </>
                  ) : (
                    <div className="w-full text-center py-0.5">
                      <span className="text-[10px] sm:text-[11px] font-mono text-[#E8EBF2]/45 uppercase tracking-wider">
                        Select
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
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <ButterButton
          variant="outline"
          size="sm"
          onClick={() => changeSlide(activeIndex - 1, 'left')}
          className="!px-3 sm:!px-5 !py-1 sm:!py-2 text-slate-300 hover:text-[#E8EBF2] text-[10px] sm:text-xs"
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
              aria-label={`Show ${p.title}`}
              aria-current={idx === activeIndex ? 'true' : undefined}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? 'w-6 sm:w-8 bg-[#E8EBF2]'
                  : 'w-1.5 sm:w-2 bg-[#E8EBF2]/20 hover:bg-[#E8EBF2]/40'
              }`}
            />
          ))}
        </div>

        {/* Right Arrow with Bubble Pill Button */}
        <ButterButton
          variant="outline"
          size="sm"
          onClick={() => changeSlide(activeIndex + 1, 'right')}
          className="!px-3 sm:!px-5 !py-1 sm:!py-2 text-slate-300 hover:text-[#E8EBF2] text-[10px] sm:text-xs"
        >
          <span className="font-bold">NEXT</span>
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5 sm:mr-1" />
        </ButterButton>
      </div>
    </div>
  );
};

export default ShowcaseConsole;
