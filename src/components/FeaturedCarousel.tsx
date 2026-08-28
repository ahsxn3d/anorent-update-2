'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

import {
  ExternalLink,
  Layers,
  Zap,
  Shield,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Activity,
  Maximize2,
  Play,
  Pause,
  Lock,
  ArrowRight,
  Sparkles,
  Code2,
  Eye,
  Terminal,
  Radio,
  Gauge,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DeploymentProduct } from '../types';
import { ButterButton } from './ButterButton';
import { sound } from '../utils/audio';

export interface FeaturedCarouselProps {
  projects: DeploymentProduct[];
  totalCatalogCount?: number;
  onInspect?: (project: DeploymentProduct) => void;
  onViewAll?: () => void;
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({
  projects,
  totalCatalogCount = 7,
  onInspect,
  onViewAll,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [activeTab, setActiveTab] = useState<'preview' | 'topology' | 'specs'>('preview');
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  // 3D Mouse Parallax Tilt state
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const viewportRef = useRef<HTMLDivElement>(null);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Showcase curated premier flagship deployments
  const curatedProjects = projects.slice(0, 4);
  const total = curatedProjects.length || 1;

  const nextSlide = useCallback(() => {
    if (total === 0) return;
    sound.playClick();
    setDirection(1);
    setCurrentIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
    setProgress(0);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    sound.playClick();
    setDirection(-1);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
    setProgress(0);
  }, [total]);

  const goToSlide = (idx: number) => {
    if (idx === currentIndex) return;
    sound.playClick();
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
    setProgress(0);
  };

  // Autoplay progression with linear progress timeline
  useEffect(() => {
    if (!isAutoPlay || isHovered || total <= 1) return;

    const interval = 40; // update progress every 40ms
    const totalDuration = 6000; // 6 seconds per slide
    const increment = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setDirection(1);
          setCurrentIndex((idx) => (idx < total - 1 ? idx + 1 : 0));
          return 0;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isAutoPlay, isHovered, total]);

  // 3D Parallax Mouse Movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!viewportRef.current) return;
    if (window.matchMedia && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const rect = viewportRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5.5;
    const rotateY = ((x - centerX) / centerX) * 5.5;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, glareX, glareY });
  };

  const handleMouseLeaveViewport = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!curatedProjects || curatedProjects.length === 0) return null;

  const activeProject = curatedProjects[currentIndex] || curatedProjects[0];
  const imageSrc = activeProject.thumbnailUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80';
  const tags = activeProject.techStack || ['React 19', 'TypeScript', 'Tailwind', 'WebGL Shaders'];
  const description = activeProject.shortDescription || 'State-of-the-art interactive web architecture engineered for speed, conversion, and fluid 60FPS visuals.';
  const category = activeProject.category || 'ENTERPRISE SAAS';

  // Motion variants for directional slideshow
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 260, damping: 28 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.25 },
    }),
  };


  return (
    <div
      className="w-full relative py-2 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ================= AMBIENT DYNAMIC LUXURY BACKDROP AURA ================= */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-7xl h-[520px] bg-gradient-to-r from-[#8B00EE]/25 via-[#38BDF8]/20 to-[#C084FC]/25 blur-[150px] pointer-events-none rounded-full" />

      {/* ================= LUXURY HUD STATUS & SLIDESHOW HEADER ================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 px-1 font-mono text-xs">
        {/* Left: Flagship Telemetry Node */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0e0924]/90 border border-purple-500/40 backdrop-blur-xl text-slate-200 shadow-[0_0_20px_rgba(139,0,238,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            </span>
            <span className="font-extrabold tracking-wider text-cyan-300">FLAGSHIP NODE 0{currentIndex + 1}</span>
            <span className="text-slate-600">•</span>
            <span className="text-purple-300 font-bold hidden sm:inline">60FPS GLSL ENGINE</span>
          </div>

          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-purple-900/50 text-[11px] text-slate-400">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>RENDER SPEED: <strong className="text-emerald-400">0.02s</strong></span>
          </div>
        </div>

        {/* Right: Interactive Mode Tabs & Autoplay Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Interactive Slide Mode Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-black/60 border border-purple-900/60 backdrop-blur-md">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('preview');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-purple-600/40 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(34,211,238,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CINEMATIC</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('topology');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'topology'
                  ? 'bg-purple-600/40 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(34,211,238,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">TOPOLOGY</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('specs');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'specs'
                  ? 'bg-purple-600/40 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(34,211,238,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">TECH SPECS</span>
            </button>
          </div>

          {/* Autoplay Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setIsAutoPlay((p) => !p);
            }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              isAutoPlay
                ? 'bg-purple-950/80 border-cyan-400/60 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.25)]'
                : 'bg-black/50 border-purple-900/50 text-slate-400 hover:text-white'
            }`}
          >
            {isAutoPlay ? <Pause className="w-3.5 h-3.5 text-cyan-400" /> : <Play className="w-3.5 h-3.5 text-slate-400" />}
            <span className="hidden sm:inline">{isAutoPlay ? 'AUTOPLAY' : 'PAUSED'}</span>
          </button>
        </div>
      </div>

      {/* ================= MASTER PANORAMIC 3D SHOWCASE FRAME ================= */}
      <div
        ref={viewportRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeaveViewport}
        className="relative rounded-2xl sm:rounded-3xl border border-purple-500/40 bg-gradient-to-b from-[#140b2e]/95 via-[#0d0920]/95 to-[#060412]/95 backdrop-blur-2xl overflow-hidden shadow-[0_0_50px_rgba(139,0,238,0.3),0_0_100px_rgba(34,211,238,0.15)] transition-all duration-300"
        style={{
          perspective: '1200px',
        }}
      >
        {/* Dynamic Holographic Glare Reflection */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle 350px at ${tilt.glareX}% ${tilt.glareY}%, rgba(34, 211, 238, 0.12), transparent 80%)`,
          }}
        />

        {/* Cyber Corner Brackets */}
        <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-30" />
        <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-purple-400 pointer-events-none z-30" />
        <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-purple-400 pointer-events-none z-30" />
        <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-30" />

        {/* Cyber OS Top Navigation Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-purple-500/25 bg-black/70 text-xs font-mono relative z-20">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
            <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block shadow-[0_0_8px_rgba(234,179,8,0.7)]" />
            <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
            <span className="ml-2 text-slate-300 font-bold hidden sm:inline text-[11px] tracking-wider">
              SHOWCASE://FLAGSHIP-NODE-0{currentIndex + 1}.DEV
            </span>
          </div>

          {/* SSL Address Bar */}
          <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-purple-500/30 text-[11px] text-slate-300 max-w-[260px] sm:max-w-md w-full mx-2 truncate justify-center shadow-inner">
            <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="text-slate-400 hidden sm:inline">https://</span>
            <span className="text-cyan-300 font-semibold truncate">
              {activeProject.demoUrl?.replace(/^https?:\/\//, '') || 'quantum-showcase.dev'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-[10px] text-cyan-300 font-extrabold shadow-[0_0_10px_rgba(34,211,238,0.3)]">
              PROD ACTIVE
            </span>
          </div>
        </div>

        {/* Panoramic Grid: Split Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">
          
          {/* Left Column: Interactive Visual / Topology / Spec Media Stage (7 cols) */}
          <div className="lg:col-span-7 relative p-4 sm:p-6 lg:p-8 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-purple-500/20 bg-[#05030e]/80">
            <div
              className="relative h-[280px] sm:h-[390px] md:h-[440px] w-full rounded-2xl overflow-hidden border border-purple-500/35 bg-[#000] group shadow-2xl transition-transform duration-300 ease-out"
              style={{
                transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* TAB 1: CINEMATIC PREVIEW WITH ANIMATED LASER SCANLINE */}
              {activeTab === 'preview' && (
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={activeProject.id || currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="relative w-full h-full"
                  >
                    <img
                      src={imageSrc}
                      alt={activeProject.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-106"
                    />

                    {/* Gradient & Cyber Scanline Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060412] via-transparent to-black/35 pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:22px_22px] opacity-15 pointer-events-none" />

                    {/* Animated Cyber Laser Sweep Beam */}
                    <motion.div
                      animate={{
                        top: ['0%', '100%', '0%'],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] pointer-events-none z-20 opacity-80"
                    />

                    {/* Top Floating Luxury Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                      <span className="px-3.5 py-1.5 bg-black/80 backdrop-blur-md border border-cyan-500/50 rounded-full text-xs font-mono font-extrabold text-cyan-300 flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                        <Zap className="w-3.5 h-3.5 text-cyan-400" />
                        {category.toUpperCase()}
                      </span>

                      <span className="px-3.5 py-1.5 bg-black/80 backdrop-blur-md border border-purple-500/50 rounded-full text-xs font-mono font-extrabold text-purple-200 flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                        <span className="text-yellow-400">★</span>
                        <span>4.99 RATING</span>
                      </span>
                    </div>

                    {/* Bottom Floating Quick 3D Expand Action */}
                    <div className="absolute bottom-4 right-4 z-20">
                      <button
                        onClick={() => {
                          sound.playClick();
                          onInspect?.(activeProject);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-black/85 hover:bg-[#8B00EE] border border-purple-400/60 hover:border-cyan-400 text-white text-xs font-mono font-bold flex items-center gap-2 backdrop-blur-md transition-all shadow-xl cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-cyan-300" />
                        <span>EXPAND 3D VIEW</span>
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}

              {/* TAB 2: TOPOLOGY NETWORK ARCHITECTURE NODE MAP */}
              {activeTab === 'topology' && (
                <div className="relative w-full h-full p-6 bg-[#090518] flex flex-col justify-between overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-purple-500/30 pb-3">
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                        NODE TOPOLOGY // {activeProject.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded">
                      ALL NODES SYNCHRONIZED
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
                    <div className="p-3 rounded-xl bg-black/60 border border-purple-500/30 font-mono text-xs">
                      <span className="text-[10px] text-slate-500 block">EDGE GATEWAY</span>
                      <strong className="text-cyan-300 text-sm">Cloudflare CDN</strong>
                      <span className="text-[10px] text-emerald-400 block mt-1">✓ Global Anycast</span>
                    </div>
                    <div className="p-3 rounded-xl bg-black/60 border border-purple-500/30 font-mono text-xs">
                      <span className="text-[10px] text-slate-500 block">GPU COMPUTE</span>
                      <strong className="text-purple-300 text-sm">WebGL 2.0 / GLSL</strong>
                      <span className="text-[10px] text-cyan-400 block mt-1">✓ 60-120 FPS Native</span>
                    </div>
                    <div className="p-3 rounded-xl bg-black/60 border border-purple-500/30 font-mono text-xs col-span-2 sm:col-span-1">
                      <span className="text-[10px] text-slate-500 block">STATE PIPELINE</span>
                      <strong className="text-white text-sm">Reactive Signals</strong>
                      <span className="text-[10px] text-purple-400 block mt-1">✓ Zero Lag Virtual DOM</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/70 border border-cyan-500/30 font-mono text-xs text-slate-300">
                    <div className="flex items-center gap-2 text-cyan-300 mb-1 font-bold">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>TELEMETRY STREAM</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Incoming request verification passed. Latency stable at 14ms across 12 distributed edge POPs.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: CODE & TECH SPEC ARCHITECTURE SCHEMA */}
              {activeTab === 'specs' && (
                <div className="relative w-full h-full p-6 bg-[#070414] font-mono text-xs overflow-y-auto flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-purple-500/30 pb-3 mb-3">
                      <span className="text-cyan-300 font-bold flex items-center gap-2">
                        <Code2 className="w-4 h-4" />
                        <span>MANIFEST SCHEMA // {activeProject.id}</span>
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold">JSON 2.0</span>
                    </div>

                    <pre className="p-4 rounded-xl bg-black/80 border border-purple-900/60 text-[11px] text-purple-200 leading-relaxed overflow-x-auto">
{`{
  "system": "${activeProject.title}",
  "category": "${category}",
  "frameworks": ${JSON.stringify(tags, null, 2)},
  "runtime": "Edge Container V8",
  "audit": {
    "performance": 100,
    "accessibility": 100,
    "security": "A+ Enterprise"
  }
}`}
                    </pre>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400">
                    <span>STATUS: VALIDATED</span>
                    <span className="text-cyan-400 font-bold">SHA-256 SIGNED</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Specifications, Luxury Gauges & Signature ButterButtons (5 cols) */}
          <div className="lg:col-span-5 p-5 sm:p-8 lg:p-9 flex flex-col justify-between space-y-6">
            <div>
              {/* Top Subtitle & Category Header */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono text-cyan-400 font-extrabold uppercase tracking-widest">
                  FLAGSHIP ASSET // 0{currentIndex + 1} OF 0{total}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-purple-300 font-bold">
                  {category}
                </span>
              </div>

              {/* Project Title with Kinetic Reveal */}
              <AnimatePresence custom={direction} mode="wait">
                <motion.h3
                  key={activeProject.id || currentIndex}
                  custom={direction}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white tracking-tight leading-tight mb-3"
                >
                  {activeProject.title}
                </motion.h3>
              </AnimatePresence>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                {description}
              </p>

              {/* Tech Stack Chips with Interactive Glow */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold block">
                  ARCHITECTURE & FRAMEWORKS
                </span>
                <div className="flex gap-2 flex-wrap">
                  {tags.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="text-xs uppercase font-mono px-3 py-1 rounded-lg bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 hover:border-cyan-400 text-purple-200 hover:text-cyan-200 font-bold shadow-sm transition-all cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* LUXURY CIRCULAR / TELEMETRY GAUGES COMPONENT */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-black/60 border border-purple-900/60 text-xs font-mono shadow-inner">
                {/* Gauge 1: 60FPS WebGL Compositor */}
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-purple-950/80"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-cyan-400"
                        strokeDasharray="90, 100"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-[10px] font-bold text-cyan-300">60</span>
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] text-slate-500 block font-semibold">GPU RENDER</span>
                    <span className="font-bold text-white">60 FPS Native</span>
                  </div>
                </div>

                {/* Gauge 2: 100/100 Lighthouse Audit */}
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-purple-950/80"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-emerald-400"
                        strokeDasharray="100, 100"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-[10px] font-bold text-emerald-300">100</span>
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] text-slate-500 block font-semibold">SECURITY AUDIT</span>
                    <span className="font-bold text-emerald-400">100% Score</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Signature Luxury ButterButtons Suite */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-5 border-t border-purple-900/50">
              <ButterButton
                variant="primary"
                size="md"
                href={activeProject.demoUrl || '#'}
                target="_blank"
                rel="noreferrer"
                icon={<ExternalLink className="w-4 h-4 text-cyan-300" />}
                iconPosition="right"
                showArrow={true}
                className="w-full sm:flex-1 font-black shadow-[0_0_25px_rgba(34,211,238,0.3)]"
              >
                Launch Live Demo
              </ButterButton>

              <ButterButton
                variant="secondary"
                size="md"
                onClick={() => {
                  sound.playClick();
                  onInspect?.(activeProject);
                }}
                icon={<Layers className="w-4 h-4 text-purple-300" />}
                iconPosition="left"
                showArrow={false}
                className="w-full sm:flex-1 font-bold border-purple-500/50"
              >
                Inspect 3D Specs
              </ButterButton>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SYNCHRONIZED THUMBNAIL SELECTOR & SLIDESHOW CONTROLS ================= */}
      <div className="space-y-3 pt-5">
        {/* Smooth Autoplay Timeline Progress Bar */}
        {isAutoPlay && total > 1 && (
          <div className="w-full h-1.5 bg-purple-950/70 rounded-full overflow-hidden border border-purple-500/30 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-400 transition-all duration-75 shadow-[0_0_12px_#22d3ee]"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Thumbnail Selector Cards Rail for Curated Flagships */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {curatedProjects.map((project, idx) => {
            const isSelected = currentIndex === idx;
            const thumb = project.thumbnailUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80';

            return (
              <button
                key={project.id || idx}
                onClick={() => goToSlide(idx)}
                className={`relative rounded-xl overflow-hidden p-2.5 text-left transition-all duration-300 border cursor-pointer flex flex-col gap-2 ${
                  isSelected
                    ? 'border-cyan-400 bg-purple-950/80 shadow-[0_0_25px_rgba(34,211,238,0.4)] ring-1 ring-cyan-400 scale-[1.02]'
                    : 'border-purple-900/40 bg-black/40 hover:border-purple-500/60 hover:bg-purple-950/30 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="relative h-24 w-full rounded-lg overflow-hidden border border-purple-800/30 bg-black">
                  <img src={thumb} alt={project.title} className="w-full h-full object-cover" />
                  <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-cyan-300 font-bold border border-cyan-500/30">
                    0{idx + 1}
                  </span>
                </div>

                <div className="truncate w-full">
                  <h4 className="text-xs font-bold text-white truncate">{project.title}</h4>
                  <p className="text-[10px] text-slate-400 font-mono truncate">{project.category}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Direction Nav Arrows Row + View All Catalog Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-1 pt-3 gap-3 border-t border-purple-900/30">
          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <span className="text-cyan-400 font-bold">0{currentIndex + 1} / 0{total} FEATURED</span>
            <span className="text-slate-600">•</span>
            <span>USE ARROWS OR CLICK THUMBNAILS TO GLIDE</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <ButterButton
              variant="glass"
              size="sm"
              onClick={onViewAll}
              icon={<ArrowRight className="w-3.5 h-3.5 text-purple-300" />}
              iconPosition="right"
              className="text-xs font-bold font-mono tracking-wider text-purple-200 border-purple-500/30 hover:border-purple-400"
            >
              Explore All {totalCatalogCount} Deployments
            </ButterButton>

            <div className="flex items-center gap-2">
              <ButterButton
                variant="secondary"
                size="icon"
                onClick={prevSlide}
                aria-label="Previous Deployment"
                className="border-purple-500/40 hover:border-cyan-400"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </ButterButton>

              <ButterButton
                variant="secondary"
                size="icon"
                onClick={nextSlide}
                aria-label="Next Deployment"
                className="border-purple-500/40 hover:border-cyan-400"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </ButterButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
