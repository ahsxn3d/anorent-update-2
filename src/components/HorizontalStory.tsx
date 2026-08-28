'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ButterButton } from './ButterButton';
import { sound } from '../utils/audio';
import { Page } from '../types';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Matrix glyph characters for cyber scramble decoding
const GLYPHS = '!<>-_\\/[]{}—=+*^?#0101XYZ@$%&';

// Rock-solid Cyber Text Scramble/Decode Component for Headlines
// Never cuts out mid-scroll, never gets stuck in scrambled state, runs smoothly on 60-120fps RAF
const CyberScrambleHeading: React.FC<{
  line1: string;
  line2: string;
  gradientClass?: string;
  isActive: boolean;
  triggerCount?: number;
  duration?: number;
}> = ({
  line1,
  line2,
  gradientClass = 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400',
  isActive,
  triggerCount = 0,
  duration = 1400, // Duration in milliseconds
}) => {
  const [displayLine1, setDisplayLine1] = useState(line1);
  const [displayLine2, setDisplayLine2] = useState(line2);
  const [isGlitching, setIsGlitching] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  // Scramble animation worker function using requestAnimationFrame with timestamp delta
  const runScramble = useCallback(
    (animDuration: number) => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }

      setIsGlitching(true);
      try {
        sound.playHover();
      } catch {
        // Audio playback safe catch
      }

      const startTime = performance.now();
      let lastGlyphChange = 0;
      let tempLine1 = line1;
      let tempLine2 = line2;

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / animDuration);

        // Update glyphs every 25ms to prevent overwhelming screen reader / DOM
        if (now - lastGlyphChange > 25 || progress >= 1) {
          lastGlyphChange = now;

          // Line 1 decoding
          const l1Len = line1.length;
          tempLine1 = line1
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' ';
              // Char resolves once progress exceeds its individual threshold
              const resolveThreshold = (i / l1Len) * 0.85;
              if (progress >= resolveThreshold) return line1[i];
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join('');

          // Line 2 decoding
          const l2Len = line2.length;
          tempLine2 = line2
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' ';
              const resolveThreshold = (i / l2Len) * 0.85;
              if (progress >= resolveThreshold) return line2[i];
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join('');

          setDisplayLine1(tempLine1);
          setDisplayLine2(tempLine2);
        }

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(tick);
        } else {
          // Guaranteed final clean resolution
          setDisplayLine1(line1);
          setDisplayLine2(line2);
          setIsGlitching(false);
          animFrameRef.current = null;
        }
      };

      animFrameRef.current = requestAnimationFrame(tick);
    },
    [line1, line2]
  );

  // Trigger Matrix Glitch Scramble Decode when stage becomes active in view
  useEffect(() => {
    if (!isActive) {
      // If inactive, cancel any running frame and immediately ensure clean, readable text
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      setDisplayLine1(line1);
      setDisplayLine2(line2);
      setIsGlitching(false);
      return;
    }

    // Run full animation
    runScramble(duration);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [isActive, triggerCount, line1, line2, duration, runScramble]);

  const handleManualHover = () => {
    runScramble(550);
  };

  return (
    <h2
      className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-mono text-white leading-tight tracking-tight mb-4 sm:mb-6 select-none cursor-default"
      onMouseEnter={handleManualHover}
    >
      <span
        className={`transition-colors duration-150 ${
          isGlitching ? 'text-cyan-300 drop-shadow-[0_0_18px_rgba(6,182,212,0.9)]' : ''
        }`}
      >
        {displayLine1}
      </span>
      <br />
      <span className={gradientClass}>{displayLine2}</span>
    </h2>
  );
};

interface HorizontalStoryProps {
  setCurrentPage?: (page: Page) => void;
}

export default function HorizontalStory({ setCurrentPage }: HorizontalStoryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Active Stage Tracker (0 to 3) and in-view flag
  const [activeStage, setActiveStage] = useState(0);
  const [isSectionInView, setIsSectionInView] = useState(false);
  const [triggerCount, setTriggerCount] = useState(0);

  // Panel 1: GPU Runtime State
  const [activeGpuTab, setActiveGpuTab] = useState<'particle' | 'glsl' | 'edge' | 'reflow'>('glsl');

  // Panel 2: Spring Sandbox State
  const [springMode, setSpringMode] = useState<'snappy' | 'liquid' | 'elastic' | 'inertia'>('snappy');
  const [tension, setTension] = useState(300);
  const [damping, setDamping] = useState(24);
  const [ballOffset, setBallOffset] = useState({ x: 0, y: 0 });
  const [isDraggingBall, setIsDraggingBall] = useState(false);

  // Panel 3: Architecture Node State
  const [activeArchNode, setActiveArchNode] = useState<'cdn' | 'api' | 'redis' | 'sql' | 'sockets'>('cdn');
  const [isSimulating, setIsSimulating] = useState(false);

  // Spring physics release animation loop
  useEffect(() => {
    if (!isDraggingBall && (ballOffset.x !== 0 || ballOffset.y !== 0)) {
      let x = ballOffset.x;
      let y = ballOffset.y;
      let vx = 0;
      let vy = 0;
      let animId: number;

      const animateSpring = () => {
        const ax = -tension * 0.0008 * x - damping * 0.04 * vx;
        const ay = -tension * 0.0008 * y - damping * 0.04 * vy;
        vx += ax;
        vy += ay;
        x += vx;
        y += vy;

        if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1 && Math.abs(vx) < 0.1 && Math.abs(vy) < 0.1) {
          setBallOffset({ x: 0, y: 0 });
        } else {
          setBallOffset({ x, y });
          animId = requestAnimationFrame(animateSpring);
        }
      };

      animId = requestAnimationFrame(animateSpring);
      return () => cancelAnimationFrame(animId);
    }
  }, [isDraggingBall, tension, damping]);

  // Master GSAP matchMedia Setup for True Responsive Perfection
  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      // DESKTOP (xl+): Full Horizontal Pinned Scrub across all 4 complete stages without premature cut-off
      mm.add('(min-width: 1280px)', () => {
        const getTotalScroll = () => track.scrollWidth - window.innerWidth;

        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getTotalScroll() * 1.3}`,
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
            onEnter: () => {
              setIsSectionInView(true);
              setActiveStage(0);
              setTriggerCount((c) => c + 1);
            },
            onEnterBack: () => {
              setIsSectionInView(true);
              setTriggerCount((c) => c + 1);
            },
            onLeave: () => {
              setIsSectionInView(false);
            },
            onLeaveBack: () => {
              setIsSectionInView(false);
            },
            onUpdate: (self) => {
              const p = self.progress;
              // Evenly calibrated 4-stage distribution (0: 0-0.25, 1: 0.25-0.5, 2: 0.5-0.75, 3: 0.75-1.0)
              if (p < 0.25) {
                setActiveStage((prev) => {
                  if (prev !== 0) setTriggerCount((c) => c + 1);
                  return 0;
                });
              } else if (p < 0.5) {
                setActiveStage((prev) => {
                  if (prev !== 1) setTriggerCount((c) => c + 1);
                  return 1;
                });
              } else if (p < 0.75) {
                setActiveStage((prev) => {
                  if (prev !== 2) setTriggerCount((c) => c + 1);
                  return 2;
                });
              } else {
                setActiveStage((prev) => {
                  if (prev !== 3) setTriggerCount((c) => c + 1);
                  return 3;
                });
              }
            },
          },
        });

        // Translate the track completely to -getTotalScroll() so the 4th stage sits 100% in viewport
        masterTl.to(
          track,
          {
            x: () => -getTotalScroll(),
            ease: 'none',
            duration: 10,
          },
          0
        );

        // Parallax depth
        masterTl.fromTo(
          '.interactive-stage-card',
          { y: 25, opacity: 0.8 },
          { y: -5, opacity: 1, stagger: 2, ease: 'power1.out', duration: 3 },
          0.2
        );
      });

      // MOBILE & TABLET (< 1280px): Clean Vertical Narrative Straight Scroll with individual ScrollTrigger Reveals
      mm.add('(max-width: 1279px)', () => {
        setIsSectionInView(true);

        const panels = gsap.utils.toArray<HTMLElement>('.stage-panel');
        panels.forEach((panel, idx) => {
          gsap.fromTo(
            panel,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 85%',
                onEnter: () => {
                  setActiveStage(idx);
                  setTriggerCount((c) => c + 1);
                },
                onEnterBack: () => {
                  setActiveStage(idx);
                  setTriggerCount((c) => c + 1);
                },
              },
            }
          );
        });
      });

      return () => {
        mm.revert();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: sectionRef }
  );

  const handleSimulatePacket = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playChime();
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 1200);
  };

  const isolatePointerEvents = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <section
      ref={sectionRef}
      id="horizontal-showcase-story"
      className="relative w-full xl:w-screen xl:left-1/2 xl:right-1/2 xl:-ml-[50vw] xl:-mr-[50vw] min-h-screen xl:h-screen bg-transparent overflow-hidden border-y border-purple-500/20 select-none my-8"
    >
      {/* Top Telemetry Header */}
      <div className="hidden sm:flex absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 z-30 items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 sm:gap-3 px-3.5 py-1.5 rounded-full bg-[#080514]/90 backdrop-blur-md border border-purple-500/30 font-mono text-[10px] sm:text-[11px] text-purple-300 pointer-events-auto shadow-lg">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
          ENGINEERING SPECIFICATION // 2026 LAB
        </div>

        {/* Desktop Quick Jump Navigation */}
        <div className="hidden xl:flex items-center gap-2 pointer-events-auto">
          {[
            { id: 0, label: '01 ARCHITECTURE' },
            { id: 1, label: '02 MOTION PHYSICS' },
            { id: 2, label: '03 CLOUD BACKEND' },
            { id: 3, label: '04 ESCROW TRUST' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                sound.playClick();
                if (!sectionRef.current) return;
                const trigger = ScrollTrigger.getAll().find((t) => t.trigger === sectionRef.current);
                if (trigger) {
                  const targetScroll = trigger.start + (item.id / 3) * (trigger.end - trigger.start);
                  window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                }
              }}
              className={`px-3 py-1 rounded font-mono text-[10px] transition-all cursor-pointer ${
                activeStage === item.id
                  ? 'bg-purple-950/80 border border-purple-400 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.4)] scale-105'
                  : 'bg-black/40 border border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Track Container */}
      <div
        ref={trackRef}
        className="flex flex-col xl:flex-row h-auto xl:h-full items-center will-change-transform bg-transparent relative z-20 pt-6 sm:pt-12 xl:pt-0"
      >
        {/* ================= STAGE 01: ARCHITECTURAL MASTERY ================= */}
        <div className="stage-panel w-full xl:w-screen min-h-screen xl:h-screen flex-shrink-0 flex flex-col xl:flex-row items-center justify-center xl:justify-between px-4 sm:px-8 xl:px-24 py-12 xl:py-0 gap-8 xl:gap-12">
          <div className="w-full max-w-xl text-center xl:text-left">
            <span className="px-3.5 py-1 rounded bg-purple-950/50 border border-purple-500/40 text-purple-300 font-mono text-[10px] sm:text-xs uppercase tracking-widest inline-block mb-3 sm:mb-4">
              01 // ARCHITECTURAL MASTERY
            </span>

            {/* Matrix Scramble / Decode Heading */}
            <CyberScrambleHeading
              line1="SUB-MILLISECOND"
              line2="DIGITAL REALMS."
              gradientClass="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
              isActive={isSectionInView && activeStage === 0}
              triggerCount={triggerCount}
              duration={1600}
            />

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 font-sans max-w-lg mx-auto xl:mx-0">
              I reject slow, bloated website themes. Every interface is custom-architected on Next.js 15, React 19, and Tailwind v4 with zero runtime layout thrashing and hardware-accelerated shaders.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 font-mono text-[10px] sm:text-[11px]">
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 hover:border-purple-500/30 transition-all text-left">
                <span className="text-purple-400 font-bold block">React 19 & Next 15</span>
                <span className="text-zinc-500">Server Actions</span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 hover:border-cyan-500/30 transition-all text-left">
                <span className="text-cyan-400 font-bold block">WebGL / GLSL</span>
                <span className="text-zinc-500">Hardware 60 FPS</span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 hover:border-emerald-500/30 transition-all text-left">
                <span className="text-emerald-400 font-bold block">Zero Thrash</span>
                <span className="text-zinc-500">0 Cumulative Shift</span>
              </div>
            </div>
          </div>

          {/* Right Interactive GPU Widget */}
          <div
            onPointerDown={isolatePointerEvents}
            className="interactive-stage-card w-full max-w-xl xl:w-[520px] p-4 sm:p-6 rounded-2xl bg-[#080514]/90 border border-purple-500/30 backdrop-blur-xl shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <span className="font-mono text-xs text-purple-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                GPU RUNTIME CONTROLLER
              </span>
              <span className="font-mono text-[11px] text-emerald-400 font-bold">59 FPS // 0.18ms</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 mb-4">
              {(['particle', 'glsl', 'edge', 'reflow'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playHover();
                    setActiveGpuTab(tab);
                  }}
                  className={`py-1.5 text-[9px] sm:text-[10px] font-mono uppercase rounded transition-all cursor-pointer ${
                    activeGpuTab === tab
                      ? 'bg-purple-600/40 text-purple-200 border border-purple-400/60 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                      : 'bg-black/40 text-zinc-500 border border-white/5 hover:text-zinc-300'
                  }`}
                >
                  {tab === 'particle' && 'Particle Core'}
                  {tab === 'glsl' && 'GLSL Radar'}
                  {tab === 'edge' && 'Edge Stream'}
                  {tab === 'reflow' && 'Zero Reflow'}
                </button>
              ))}
            </div>

            <div className="h-40 sm:h-44 rounded-xl bg-black/60 border border-white/10 relative overflow-hidden flex flex-col items-center justify-center p-4">
              {activeGpuTab === 'glsl' && (
                <div className="relative flex items-center justify-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-purple-500/40 animate-ping absolute opacity-40" />
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-cyan-500/60 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_#06b6d4]" />
                  </div>
                  <span className="absolute bottom-[-22px] font-mono text-[9px] sm:text-[10px] text-zinc-400">
                    Signed Distance Fields (GLSL Raymarch)
                  </span>
                </div>
              )}
              {activeGpuTab === 'particle' && (
                <div className="text-center font-mono text-xs text-purple-300">
                  <div className="text-2xl font-black mb-1">16,240</div>
                  <div className="text-zinc-500 text-[10px]">GPU Nodes Active</div>
                </div>
              )}
              {activeGpuTab === 'edge' && (
                <div className="text-center font-mono text-xs text-cyan-300">
                  <div className="text-lg font-bold">[EDGE HYDRATION]</div>
                  <div className="text-zinc-500 text-[10px] mt-1">Time to First Byte: 18ms</div>
                </div>
              )}
              {activeGpuTab === 'reflow' && (
                <div className="text-center font-mono text-xs text-emerald-300">
                  <div className="text-lg font-bold">ZERO LAYOUT JUMP</div>
                  <div className="text-zinc-500 text-[10px] mt-1">100% Geometry Stabilized</div>
                </div>
              )}
            </div>

            <div className="mt-3 sm:mt-4 flex items-center justify-between text-zinc-400 font-mono text-[10px]">
              <span>GPU Particle Density</span>
              <span className="text-purple-400 font-bold">64%</span>
            </div>
          </div>
        </div>

        {/* ================= STAGE 02: MOTION CHOREOGRAPHY ================= */}
        <div className="stage-panel w-full xl:w-screen min-h-screen xl:h-screen flex-shrink-0 flex flex-col xl:flex-row items-center justify-center xl:justify-between px-4 sm:px-8 xl:px-24 py-12 xl:py-0 gap-8 xl:gap-12">
          <div className="w-full max-w-xl text-center xl:text-left">
            <span className="px-3.5 py-1 rounded bg-cyan-950/50 border border-cyan-500/40 text-cyan-300 font-mono text-[10px] sm:text-xs uppercase tracking-widest inline-block mb-3 sm:mb-4">
              02 // MOTION CHOREOGRAPHY
            </span>

            {/* Matrix Scramble / Decode Heading */}
            <CyberScrambleHeading
              line1="ELASTIC SPRINGS."
              line2="ZERO RIGIDITY."
              gradientClass="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"
              isActive={isSectionInView && activeStage === 1}
              triggerCount={triggerCount}
              duration={1600}
            />

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 font-sans max-w-lg mx-auto xl:mx-0">
              Great interfaces feel tactile. I replace lifeless linear CSS transitions with calibrated mathematical damped springs and cursor attraction vectors.
            </p>
            <div className="space-y-2 font-mono text-[10px] sm:text-xs text-zinc-400 text-left max-w-md mx-auto xl:mx-0">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Damped Harmonic Oscillators calculated at 120Hz frame rates
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Magnetic Vector Attraction towards interactive click targets
              </div>
            </div>
          </div>

          {/* Spring Physics Sandbox */}
          <div
            onPointerDown={isolatePointerEvents}
            className="interactive-stage-card w-full max-w-xl xl:w-[520px] p-4 sm:p-6 rounded-2xl bg-[#080514]/90 border border-cyan-500/30 backdrop-blur-xl shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <span className="font-mono text-xs text-cyan-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                SPRING PHYSICS & BEZIER LAB
              </span>
              <span className="font-mono text-[10px] text-zinc-400">Interactive Sandbox</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 mb-4">
              {(['snappy', 'liquid', 'elastic', 'inertia'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playHover();
                    setSpringMode(mode);
                    if (mode === 'snappy') { setTension(360); setDamping(26); }
                    if (mode === 'liquid') { setTension(180); setDamping(16); }
                    if (mode === 'elastic') { setTension(450); setDamping(12); }
                    if (mode === 'inertia') { setTension(240); setDamping(35); }
                  }}
                  className={`py-1.5 text-[9px] sm:text-[10px] font-mono uppercase rounded transition-all cursor-pointer ${
                    springMode === mode
                      ? 'bg-cyan-600/40 text-cyan-200 border border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                      : 'bg-black/40 text-zinc-500 border border-white/5 hover:text-zinc-300'
                  }`}
                >
                  {mode === 'snappy' && 'Snappy'}
                  {mode === 'liquid' && 'Liquid'}
                  {mode === 'elastic' && 'Elastic'}
                  {mode === 'inertia' && 'Inertia'}
                </button>
              ))}
            </div>

            {/* Interactive Draggable Spring Area with Touch Pan-Y */}
            <div
              onPointerDown={(e) => {
                e.stopPropagation();
                setIsDraggingBall(true);
                sound.playClick();
              }}
              onPointerMove={(e) => {
                e.stopPropagation();
                if (isDraggingBall) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left - rect.width / 2;
                  const y = e.clientY - rect.top - rect.height / 2;
                  setBallOffset({ x: Math.max(-100, Math.min(100, x)), y: Math.max(-50, Math.min(50, y)) });
                }
              }}
              onPointerUp={(e) => {
                e.stopPropagation();
                setIsDraggingBall(false);
                sound.playChime();
              }}
              onPointerLeave={() => setIsDraggingBall(false)}
              className="h-40 sm:h-44 rounded-xl bg-black/60 border border-white/10 relative flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing touch-action-none"
            >
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1="50%"
                  y1="50%"
                  x2={`calc(50% + ${ballOffset.x}px)`}
                  y2={`calc(50% + ${ballOffset.y}px)`}
                  stroke="#06b6d4"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                />
              </svg>

              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center font-mono text-[9px] sm:text-[10px] font-bold text-black shadow-[0_0_25px_rgba(6,182,212,0.6)] select-none transition-transform duration-75"
                style={{
                  transform: `translate(${ballOffset.x}px, ${ballOffset.y}px)`,
                }}
              >
                DRAG
              </div>
              <span className="absolute bottom-2 font-mono text-[9px] text-zinc-500 pointer-events-none">
                Click / touch & pull orb to test spring physics
              </span>
            </div>

            {/* Controls */}
            <div className="mt-3 sm:mt-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between gap-3">
                <span className="text-zinc-400 text-[10px] w-14">Tension</span>
                <span className="text-cyan-400 font-bold w-8">{tension}</span>
                <input
                  type="range"
                  min="100"
                  max="500"
                  value={tension}
                  onChange={(e) => {
                    e.stopPropagation();
                    setTension(Number(e.target.value));
                  }}
                  className="flex-1 accent-cyan-400 cursor-pointer touch-action-pan-y"
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-zinc-400 text-[10px] w-14">Damping</span>
                <span className="text-purple-400 font-bold w-8">{damping}</span>
                <input
                  type="range"
                  min="10"
                  max="50"
                  value={damping}
                  onChange={(e) => {
                    e.stopPropagation();
                    setDamping(Number(e.target.value));
                  }}
                  className="flex-1 accent-purple-400 cursor-pointer touch-action-pan-y"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= STAGE 03: FULL-STACK ARCHITECTURE ================= */}
        <div className="stage-panel w-full xl:w-screen min-h-screen xl:h-screen flex-shrink-0 flex flex-col xl:flex-row items-center justify-center xl:justify-between px-4 sm:px-8 xl:px-24 py-12 xl:py-0 gap-8 xl:gap-12">
          <div className="w-full max-w-xl text-center xl:text-left">
            <span className="px-3.5 py-1 rounded bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] sm:text-xs uppercase tracking-widest inline-block mb-3 sm:mb-4">
              03 // FULL-STACK ARCHITECTURE
            </span>

            {/* Matrix Scramble / Decode Heading */}
            <CyberScrambleHeading
              line1="SCALABLE SAAS."
              line2="ZERO DOWNTIME."
              gradientClass="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400"
              isActive={isSectionInView && activeStage === 2}
              triggerCount={triggerCount}
              duration={1600}
            />

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 font-sans max-w-lg mx-auto xl:mx-0">
              Visual brilliance requires hardened engineering. I build complete production-grade backends with authenticated RBAC APIs, serverless databases, real-time WebSockets, and Redis token bucket rate limiting.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 font-mono text-[10px] sm:text-[11px]">
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 hover:border-emerald-500/30 transition-all text-left">
                <span className="text-emerald-400 font-bold block">Zero-Trust Auth</span>
                <span className="text-zinc-500">JWT + Secure HTTP-only cookies</span>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 hover:border-cyan-500/30 transition-all text-left">
                <span className="text-cyan-400 font-bold block">Real-time WebSockets</span>
                <span className="text-zinc-500">Sub-10ms pub/sub broadcast</span>
              </div>
            </div>
          </div>

          {/* Architecture Simulator */}
          <div
            onPointerDown={isolatePointerEvents}
            className="interactive-stage-card w-full max-w-xl xl:w-[520px] p-4 sm:p-6 rounded-2xl bg-[#080514]/90 border border-emerald-500/30 backdrop-blur-xl shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <span className="font-mono text-xs text-emerald-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                DISTRIBUTED ARCHITECTURE MAP
              </span>
              <span className="font-mono text-[10px] text-emerald-400 font-bold">100% UPTIME</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1 sm:gap-1.5 mb-4">
              {(['cdn', 'api', 'redis', 'sql', 'sockets'] as const).map((node) => (
                <button
                  key={node}
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playHover();
                    setActiveArchNode(node);
                  }}
                  className={`py-1.5 text-[8px] sm:text-[9px] font-mono uppercase rounded transition-all cursor-pointer ${
                    activeArchNode === node
                      ? 'bg-emerald-600/40 text-emerald-200 border border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'bg-black/40 text-zinc-500 border border-white/5 hover:text-zinc-300'
                  }`}
                >
                  {node === 'cdn' && '1. Edge CDN'}
                  {node === 'api' && '2. Next API'}
                  {node === 'redis' && '3. Redis KV'}
                  {node === 'sql' && '4. SQL Base'}
                  {node === 'sockets' && '5. Sockets'}
                </button>
              ))}
            </div>

            <div className="min-h-[150px] rounded-xl bg-black/60 border border-white/10 p-3 sm:p-4 flex flex-col justify-between font-mono text-xs">
              <div>
                <div className="text-emerald-400 font-bold uppercase text-[10px] sm:text-[11px] mb-1">
                  NODE: {activeArchNode === 'cdn' && 'GLOBAL EDGE CLUSTER (Latency: 4ms)'}
                  {activeArchNode === 'api' && 'REST / GRAPHQL ROUTER (12ms)'}
                  {activeArchNode === 'redis' && 'UPSTASH KV CACHE (1ms)'}
                  {activeArchNode === 'sql' && 'POSTGRESQL / CLOUDSQL (40 Conns)'}
                  {activeArchNode === 'sockets' && 'WEBHOOK EVENT HUB (Active)'}
                </div>
                <p className="text-zinc-400 text-[9px] sm:text-[10px] leading-relaxed font-sans">
                  {activeArchNode === 'cdn' && 'Anycast routing across 300+ global edge nodes. Static assets and cached responses served in single-digit milliseconds.'}
                  {activeArchNode === 'api' && 'Direct RPC function calls with compile-time TypeScript type validation. Keys remain securely server-side.'}
                  {activeArchNode === 'redis' && 'Distributed rate limiting, session cache, and fast key-value lookups with sub-millisecond retrieval.'}
                  {activeArchNode === 'sql' && 'Type-safe relational database schema management with automated migrations and continuous backups.'}
                  {activeArchNode === 'sockets' && 'Bidirectional real-time notification dispatch, instant user sync, and live telemetry streaming.'}
                </p>
              </div>

              <button
                onClick={handleSimulatePacket}
                className="w-full mt-3 py-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[9px] sm:text-[10px] font-bold tracking-wider hover:bg-emerald-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSimulating ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    PACKET TRANSMITTED (0.4ms)
                  </>
                ) : (
                  '⚡ SIMULATE DATA PACKET FLOW'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ================= STAGE 04: ESCROW & TRUST ================= */}
        <div className="stage-panel w-full xl:w-screen min-h-screen xl:h-screen flex-shrink-0 flex flex-col xl:flex-row items-center justify-center xl:justify-between px-4 sm:px-8 xl:px-24 py-12 xl:py-0 gap-8 xl:gap-12">
          <div className="w-full max-w-xl text-center xl:text-left">
            <span className="px-3.5 py-1 rounded bg-purple-950/50 border border-purple-500/40 text-purple-300 font-mono text-[10px] sm:text-xs uppercase tracking-widest inline-block mb-3 sm:mb-4">
              04 // ZERO-RISK EXECUTION
            </span>

            {/* Matrix Scramble / Decode Heading */}
            <CyberScrambleHeading
              line1="VERIFIED ESCROW."
              line2="100% IP TRANSFER."
              gradientClass="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400"
              isActive={isSectionInView && activeStage === 3}
              triggerCount={triggerCount}
              duration={1600}
            />

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 sm:mb-8 font-sans max-w-lg mx-auto xl:mx-0">
              I work under protected milestone escrow via Fiverr Pro. You review and interact with live staging builds before approving each milestone release phase.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-3 sm:gap-4">
              <ButterButton
                variant="primary"
                size="lg"
                onClick={() => {
                  sound.playPageSwitch();
                  if (setCurrentPage) {
                    setCurrentPage('contact');
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                showArrow
                className="w-full sm:w-auto uppercase tracking-wider shadow-[0_0_35px_rgba(139,0,238,0.6)] font-extrabold"
              >
                Start Project Brief
              </ButterButton>

              <ButterButton
                variant="secondary"
                size="lg"
                onClick={() => {
                  sound.playPageSwitch();
                  if (setCurrentPage) {
                    setCurrentPage('deployments');
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto uppercase tracking-wider font-extrabold"
              >
                Inspect Deployments
              </ButterButton>
            </div>
          </div>

          {/* Milestone Lifecycle Card */}
          <div
            onPointerDown={isolatePointerEvents}
            className="interactive-stage-card w-full max-w-xl xl:w-[520px] p-4 sm:p-6 rounded-2xl bg-[#080514]/90 border border-purple-500/30 backdrop-blur-xl shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <span className="font-mono text-xs text-purple-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                MILESTONE ESCROW LIFECYCLE
              </span>
              <span className="font-mono text-[10px] text-emerald-400 font-bold">Fiverr Pro Verified</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="p-2.5 sm:p-3 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between hover:border-purple-500/30 transition-all gap-2">
                <div className="text-left">
                  <span className="text-purple-300 font-bold block text-[10px] sm:text-[11px]">Phase 1: Architecture & Wireframes</span>
                  <span className="text-zinc-500 text-[9px] font-sans">Design tokens, 3D moodboards, and architecture locked.</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-400 text-[8px] border border-purple-500/30 whitespace-nowrap">Protected</span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between hover:border-cyan-500/30 transition-all gap-2">
                <div className="text-left">
                  <span className="text-cyan-300 font-bold block text-[10px] sm:text-[11px]">Phase 2: Alpha Build & Motion</span>
                  <span className="text-zinc-500 text-[9px] font-sans">Live staging domain for client interactive review.</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[8px] border border-cyan-500/30 whitespace-nowrap">Staged</span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between hover:border-pink-500/30 transition-all gap-2">
                <div className="text-left">
                  <span className="text-pink-300 font-bold block text-[10px] sm:text-[11px]">Phase 3: Production Hardening</span>
                  <span className="text-zinc-500 text-[9px] font-sans">Lighthouse 95+ and zero-leak memory audit.</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-pink-950 text-pink-400 text-[8px] border border-pink-500/30 whitespace-nowrap">Audited</span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between hover:border-emerald-500/30 transition-all gap-2">
                <div className="text-left">
                  <span className="text-emerald-300 font-bold block text-[10px] sm:text-[11px]">Phase 4: Full Codebase & 100% IP Transfer</span>
                  <span className="text-zinc-500 text-[9px] font-sans">Clean GitHub repo transfer and deployment.</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[8px] border border-emerald-500/30 whitespace-nowrap">Ready</span>
              </div>
            </div>

            <div className="mt-3 sm:mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-zinc-400 font-mono text-[9px] sm:text-[10px]">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span>✓</span> Commercial IP Transferred
              </span>
              <span className="text-zinc-500">Signed Agreement</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
