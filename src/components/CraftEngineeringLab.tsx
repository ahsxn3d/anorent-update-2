'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Activity, 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Zap, 
  Terminal, 
  ArrowRight, 
  CheckCircle2, 
  Radio, 
  Code2, 
  Server, 
  Lock, 
  Sliders,
  Maximize2,
  Play,
  RotateCcw,
  SlidersHorizontal,
  Workflow,
  Globe,
  Database,
  Shield,
  Eye
} from 'lucide-react';
import { ButterButton } from './ButterButton';
import { Page } from '../types';
import { sound } from '../utils/audio';
import { lenisInstance } from './SmoothScroll';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CraftEngineeringLabProps {
  setCurrentPage: (page: Page) => void;
}

// Matrix glyph characters for cyber scramble decoding
const GLYPHS = '!<>-_\\/[]{}—=+*^?#0101XYZ';

// Cyber Hacker Text Scramble + Glitch Decode Component
const CyberGlitchHeading: React.FC<{
  text: string;
  gradientText?: string;
  isActive: boolean;
  stageId: number;
}> = ({ text, gradientText = '', isActive, stageId }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const originalFullText = gradientText ? `${text} ${gradientText}` : text;

  // Trigger Matrix Glitch Scramble Decode when stage scrolls in-frame
  useEffect(() => {
    if (!isActive) return;

    setIsGlitching(true);
    let iteration = 0;
    const target = originalFullText;
    const maxIterations = target.length * 2.5;

    const interval = setInterval(() => {
      setDisplayText(
        target
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / 2.5) {
              return target[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      iteration += 1;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(target);
        setIsGlitching(false);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [isActive, originalFullText]);

  return (
    <div className="relative group cursor-default">
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-mono leading-[1.08] tracking-tight transition-all duration-300 ${
          isGlitching ? 'text-cyan-300 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]' : 'text-white'
        }`}
        onMouseEnter={() => {
          sound.playHover();
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 400);
        }}
      >
        {displayText}
      </h2>

      {/* Chromatic RGB Split Glitch Shadow during in-frame activation */}
      {isGlitching && (
        <>
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-mono leading-[1.08] tracking-tight text-pink-500 opacity-70 pointer-events-none select-none animate-pulse"
            style={{ transform: 'translate(-2px, 1px)', clipPath: 'inset(10% 0 30% 0)' }}
          >
            {displayText}
          </span>
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-mono leading-[1.08] tracking-tight text-cyan-400 opacity-70 pointer-events-none select-none animate-pulse"
            style={{ transform: 'translate(2px, -1px)', clipPath: 'inset(40% 0 10% 0)' }}
          >
            {displayText}
          </span>
        </>
      )}
    </div>
  );
};

export const CraftEngineeringLab: React.FC<CraftEngineeringLabProps> = ({ setCurrentPage }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [activeStage, setActiveStage] = useState(0);

  // --- STAGE 01 STATE: GPU Shader Frequency & Mode ---
  const [shaderMode, setShaderMode] = useState<'particle' | 'raymarch' | 'stream' | 'dom'>('particle');
  const [particleDensity, setParticleDensity] = useState(64);
  const [liveFps, setLiveFps] = useState(60);

  // --- STAGE 02 STATE: Interactive Spring Physics Lab ---
  const [springTension, setSpringTension] = useState(300);
  const [springDamping, setSpringDamping] = useState(24);
  const [ballOffset, setBallOffset] = useState({ x: 0, y: 0 });
  const [isDraggingBall, setIsDraggingBall] = useState(false);
  const [springPreset, setSpringPreset] = useState<'snappy' | 'liquid' | 'elastic' | 'heavy'>('snappy');

  // --- STAGE 03 STATE: Interactive Node Flow with Data Packets ---
  const [activeNode, setActiveNode] = useState<'edge' | 'api' | 'cache' | 'db' | 'sockets'>('edge');
  const [packetTrigger, setPacketTrigger] = useState(0);

  // --- STAGE 04 STATE: Interactive Milestone Escrow ---
  const [activeMilestone, setActiveMilestone] = useState(1);

  // Simulate subtle FPS fluctuations for realistic telemetry
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveFps(59 + Math.floor(Math.random() * 2));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Spring physics release animation
  useEffect(() => {
    if (!isDraggingBall && (ballOffset.x !== 0 || ballOffset.y !== 0)) {
      let x = ballOffset.x;
      let y = ballOffset.y;
      let vx = 0;
      let vy = 0;
      let animId: number;

      const animateSpring = () => {
        const ax = -springTension * 0.0008 * x - springDamping * 0.04 * vx;
        const ay = -springTension * 0.0008 * y - springDamping * 0.04 * vy;
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
  }, [isDraggingBall, springTension, springDamping]);

  // Master GSAP ScrollTrigger Setup
  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const totalScroll = track.scrollWidth - window.innerWidth;

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalScroll * 1.25}`,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: [0, 0.333, 0.666, 1.0], // Exact snap to each stage center in-frame
            duration: { min: 0.25, max: 0.5 },
            ease: 'power2.inOut',
          },
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.20) setActiveStage(0);
            else if (p < 0.50) setActiveStage(1);
            else if (p < 0.80) setActiveStage(2);
            else setActiveStage(3);
          },
        },
      });

      // Smooth horizontal track translation across the 4 stages
      masterTl.to(
        track,
        {
          x: () => -totalScroll,
          ease: 'none',
          duration: 10,
        },
        0
      );

      return () => {
        masterTl.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: sectionRef }
  );

  // Jump to specific stage via Lenis
  const scrollToStage = (stageIndex: number) => {
    sound.playClick();
    if (!sectionRef.current || !trackRef.current) return;
    const trigger = ScrollTrigger.getAll().find((t) => t.trigger === sectionRef.current) || ScrollTrigger.getAll()[0];
    if (trigger) {
      const scrollStart = trigger.start;
      const scrollTotal = trigger.end - trigger.start;
      const targetPos = scrollStart + (stageIndex / 3) * scrollTotal;
      if (lenisInstance) {
        lenisInstance.scrollTo(targetPos, { duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      } else {
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="craft-engineering-lab"
      className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-screen bg-[#070412] overflow-hidden border-y border-purple-500/20 select-none my-12"
    >
      {/* Background Spatial Grid & Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,50,240,0.18),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* TOP HUD TELEMETRY & STAGE NAVIGATION CONTROLLER */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 z-40 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-none">
        
        {/* Left Telemetry Protocol Badge */}
        <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0E0824]/90 backdrop-blur-xl border border-purple-500/30 shadow-[0_0_25px_rgba(168,85,247,0.2)] pointer-events-auto">
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span className="font-mono text-[11px] font-extrabold tracking-wider text-purple-200 uppercase">
            ENGINEERING SPECIFICATION // 2026 LAB
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Right Stage Selector Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#0E0824]/90 backdrop-blur-xl border border-white/10 shadow-xl pointer-events-auto overflow-x-auto max-w-full">
          {[
            { id: 0, label: '01 ARCHITECTURE' },
            { id: 1, label: '02 MOTION PHYSICS' },
            { id: 2, label: '03 CLOUD BACKEND' },
            { id: 3, label: '04 ESCROW TRUST' },
          ].map((stage) => {
            const isCurrent = activeStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => scrollToStage(stage.id)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-[11px] font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                  isCurrent
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.6)] border border-purple-300 scale-105'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {stage.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* MASTER 4-STAGE HORIZONTAL RUNTIME (400vw) */}
      <div
        ref={trackRef}
        className="flex h-full items-center will-change-transform relative z-20"
      >
        {/* ========================================================================= */}
        {/* STAGE 01: ARCHITECTURAL MASTERY & GPU RUNTIME */}
        {/* ========================================================================= */}
        <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-6 sm:px-12 md:px-20 pt-16 pb-8 relative">
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border text-purple-300 font-mono text-xs uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all duration-500 ${
                activeStage === 0 ? 'border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.5)] scale-105' : 'border-purple-500/30'
              }`}>
                <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>01 // ARCHITECTURAL MASTERY</span>
              </div>

              {/* Glowing Laser Scanline */}
              <div className={`h-0.5 bg-gradient-to-r from-purple-500 via-pink-400 to-cyan-400 transition-all duration-700 shadow-[0_0_15px_#c084fc] ${
                activeStage === 0 ? 'w-56' : 'w-16 opacity-40'
              }`} />

              {/* Matrix Glitch Decode Heading */}
              <CyberGlitchHeading
                stageId={0}
                text="SUB-MILLISECOND DIGITAL REALMS."
                isActive={activeStage === 0}
              />

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans max-w-xl">
                We reject slow, bloated website themes. Every interface is custom-architected on Next.js 15, React 19, and Tailwind v4 with zero runtime layout thrashing, hardware-accelerated shaders, and sub-0.2s First Contentful Paint.
              </p>

              {/* High-Contrast Spec Pill Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {[
                  { title: 'React 19 & Next 15', desc: 'Server Actions' },
                  { title: 'WebGL / GLSL', desc: 'Hardware 60 FPS' },
                  { title: 'Zero Layout Thrash', desc: '0 Cumulative Shift' },
                  { title: 'TypeScript Strict', desc: '100% Type Safety' },
                  { title: 'Lighthouse 99+', desc: 'Speed Index < 0.6s' },
                  { title: 'Micro-Feedback', desc: 'Spatial Sound FX' },
                ].map((spec, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#0E0824]/90 border border-white/10 backdrop-blur-xl hover:border-purple-500/50 hover:scale-105 transition-all duration-300">
                    <div className="text-xs font-bold text-white font-mono">{spec.title}</div>
                    <div className="text-[10px] text-purple-300/80 font-mono">{spec.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Interactive GPU Runtime Sandbox */}
            <div className="lg:col-span-6">
              <div className={`p-6 rounded-2xl bg-[#0B061A]/95 border backdrop-blur-2xl transition-all duration-500 space-y-4 ${
                activeStage === 0 ? 'border-purple-500 shadow-[0_0_60px_rgba(168,85,247,0.35)] scale-[1.02]' : 'border-purple-500/30'
              }`}>
                
                {/* Console Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-purple-300 font-bold">
                    <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span>GPU RUNTIME CONTROLLER</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="px-2.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold animate-pulse">
                      {liveFps} FPS
                    </span>
                    <span className="text-zinc-500">|</span>
                    <span className="text-cyan-400 font-bold">0.18ms</span>
                  </div>
                </div>

                {/* Interactive Mode Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'particle', label: 'Particle Core' },
                    { id: 'raymarch', label: 'GLSL Radar' },
                    { id: 'stream', label: 'Edge Stream' },
                    { id: 'dom', label: 'Zero Reflow' },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => {
                        sound.playHover();
                        setShaderMode(mode.id as any);
                      }}
                      className={`px-3 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                        shaderMode === mode.id
                          ? 'bg-purple-600 text-white border border-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.6)] scale-105'
                          : 'bg-black/60 text-zinc-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>

                {/* Live Interactive Waveform Canvas */}
                <div className="h-44 sm:h-52 rounded-xl bg-black/80 border border-purple-500/30 relative overflow-hidden flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f710_1px,transparent_1px),linear-gradient(to_bottom,#a855f710_1px,transparent_1px)] bg-[size:16px_16px]" />
                  
                  {shaderMode === 'particle' && (
                    <div className="relative w-full h-full flex items-center justify-around">
                      {[...Array(16)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 bg-gradient-to-t from-purple-500 via-pink-400 to-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#c084fc]"
                          style={{
                            height: `${25 + Math.sin(i * 0.7 + particleDensity * 0.05) * 55}%`,
                            animationDuration: `${0.6 + (i % 5) * 0.25}s`,
                          }}
                        />
                      ))}
                      <div className="absolute bottom-2 px-3 py-1 rounded-full bg-purple-950/90 border border-purple-400 text-purple-200 font-mono text-[11px] shadow-lg">
                        {particleDensity * 160} GPU Nodes Active
                      </div>
                    </div>
                  )}

                  {shaderMode === 'raymarch' && (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="w-28 h-28 rounded-full border-2 border-dashed border-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
                      <div className="absolute w-20 h-20 rounded-full border-2 border-purple-500 animate-ping" />
                      <div className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_25px_#06b6d4]" />
                      <div className="absolute bottom-2 font-mono text-[11px] text-cyan-300 bg-black/70 px-3 py-0.5 rounded-full border border-cyan-500/30">
                        Signed Distance Fields (GLSL Raymarch)
                      </div>
                    </div>
                  )}

                  {shaderMode === 'stream' && (
                    <div className="w-full space-y-3 font-mono text-xs px-2">
                      <div className="flex justify-between text-emerald-400 font-bold">
                        <span>[EDGE HYDRATION]</span>
                        <span>0.04ms Response</span>
                      </div>
                      <div className="w-full bg-zinc-900 h-3 rounded-full overflow-hidden border border-white/10 p-0.5">
                        <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-full rounded-full w-[96%]" />
                      </div>
                      <div className="flex justify-between text-purple-300 text-[11px]">
                        <span>Time to First Byte: 18ms</span>
                        <span>DOM Complete: 100%</span>
                      </div>
                    </div>
                  )}

                  {shaderMode === 'dom' && (
                    <div className="w-full grid grid-cols-3 gap-2.5 font-mono text-center text-xs">
                      <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/40">
                        <div className="text-[10px] text-zinc-400">DOM Nodes</div>
                        <div className="text-purple-300 font-bold text-sm">280 (Optimal)</div>
                      </div>
                      <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40">
                        <div className="text-[10px] text-zinc-400">Layout Shifts</div>
                        <div className="text-cyan-300 font-bold text-sm">0.00 CLS</div>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40">
                        <div className="text-[10px] text-zinc-400">Memory Heap</div>
                        <div className="text-emerald-300 font-bold text-sm">11.8 MB</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Particle Density Live Slider Control */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs font-mono text-zinc-400">
                    <span>GPU Particle Density</span>
                    <span className="text-purple-300 font-bold">{particleDensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={particleDensity}
                    onChange={(e) => setParticleDensity(Number(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg appearance-none"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* STAGE 02: KINETIC MOTION CHOREOGRAPHY & SPRING PHYSICS */}
        {/* ========================================================================= */}
        <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-6 sm:px-12 md:px-20 pt-16 pb-8 relative">
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border text-cyan-300 font-mono text-xs uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all duration-500 ${
                activeStage === 1 ? 'border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.5)] scale-105' : 'border-cyan-500/30'
              }`}>
                <Sliders className="w-4 h-4 text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>02 // MOTION CHOREOGRAPHY</span>
              </div>

              {/* Glowing Laser Scanline */}
              <div className={`h-0.5 bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 transition-all duration-700 shadow-[0_0_15px_#38bdf8] ${
                activeStage === 1 ? 'w-56' : 'w-16 opacity-40'
              }`} />

              {/* Matrix Glitch Decode Heading */}
              <CyberGlitchHeading
                stageId={1}
                text="ELASTIC SPRINGS. ZERO RIGIDITY."
                isActive={activeStage === 1}
              />

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans max-w-xl">
                Great interfaces are tactile. We replace lifeless linear transitions with calibrated mathematical damped springs, magnetic cursor attraction vectors, and smooth scroll momentum.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  { title: 'Damped Harmonic Oscillators', desc: 'Mass, tension, and damping calculated at 120hz frame rates' },
                  { title: 'Magnetic Vector Attraction', desc: 'Smooth cursor pulls anchor effortlessly to interactive buttons' },
                  { title: 'Inertial Scroll Scrubbing', desc: 'Components inherit velocity from user scroll momentum' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#0E0824]/90 border border-white/10 backdrop-blur-xl hover:border-cyan-500/50 hover:scale-105 transition-all duration-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white font-mono">{item.title}</h4>
                      <p className="text-[11px] text-zinc-400 font-sans">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Interactive Spring Physics Sandbox */}
            <div className="lg:col-span-6">
              <div className={`p-6 rounded-2xl bg-[#0B061A]/95 border backdrop-blur-2xl transition-all duration-500 space-y-4 ${
                activeStage === 1 ? 'border-cyan-500 shadow-[0_0_60px_rgba(6,182,212,0.35)] scale-[1.02]' : 'border-cyan-500/30'
              }`}>
                
                {/* Console Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-cyan-300 font-bold">
                    <Terminal className="w-4 h-4 text-purple-400" />
                    <span>SPRING PHYSICS & BEZIER LAB</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 font-bold">Interactive Sandbox</span>
                </div>

                {/* Spring Presets */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'snappy', label: 'Snappy Spring', tension: 360, damping: 26 },
                    { id: 'liquid', label: 'Liquid Flow', tension: 180, damping: 16 },
                    { id: 'elastic', label: 'Elastic Bounce', tension: 450, damping: 12 },
                    { id: 'heavy', label: 'Heavy Inertia', tension: 240, damping: 35 },
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        sound.playHover();
                        setSpringPreset(preset.id as any);
                        setSpringTension(preset.tension);
                        setSpringDamping(preset.damping);
                      }}
                      className={`px-3 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                        springPreset === preset.id
                          ? 'bg-cyan-600 text-white border border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.6)] scale-105'
                          : 'bg-black/60 text-zinc-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Interactive Drag & Pull Spring Stage */}
                <div
                  className="h-44 sm:h-52 rounded-xl bg-black/80 border border-cyan-500/30 relative overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing p-4"
                  onMouseDown={(e) => {
                    setIsDraggingBall(true);
                    sound.playClick();
                  }}
                  onMouseMove={(e) => {
                    if (isDraggingBall) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left - rect.width / 2;
                      const y = e.clientY - rect.top - rect.height / 2;
                      setBallOffset({ x: Math.max(-100, Math.min(100, x)), y: Math.max(-60, Math.min(60, y)) });
                    }
                  }}
                  onMouseUp={() => {
                    setIsDraggingBall(false);
                    sound.playChime();
                  }}
                  onMouseLeave={() => {
                    setIsDraggingBall(false);
                  }}
                >
                  {/* Visual Elastic Vector String */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line
                      x1="50%"
                      y1="50%"
                      x2={`calc(50% + ${ballOffset.x}px)`}
                      y2={`calc(50% + ${ballOffset.y}px)`}
                      stroke="url(#spring-line-grad)"
                      strokeWidth="3"
                      strokeDasharray="4 4"
                    />
                    <defs>
                      <linearGradient id="spring-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Center Anchor Point */}
                  <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_12px_#a855f7]" />

                  {/* Interactive Draggable 3D Physics Orb */}
                  <div
                    className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 via-teal-400 to-white shadow-[0_0_30px_#06b6d4] flex items-center justify-center font-mono text-[10px] font-bold text-black select-none transition-transform duration-75"
                    style={{
                      transform: `translate(${ballOffset.x}px, ${ballOffset.y}px)`,
                    }}
                  >
                    DRAG
                  </div>

                  <div className="absolute bottom-2 text-[10px] font-mono text-zinc-400 bg-black/80 px-3 py-1 rounded-full border border-white/10">
                    Click & pull the orb to test spring physics
                  </div>
                </div>

                {/* Physics Telemetry Readout */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-zinc-400">
                      <span>Tension</span>
                      <span className="text-cyan-300 font-bold">{springTension}</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="600"
                      value={springTension}
                      onChange={(e) => setSpringTension(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-zinc-800 rounded-lg appearance-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-zinc-400">
                      <span>Damping</span>
                      <span className="text-cyan-300 font-bold">{springDamping}</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      value={springDamping}
                      onChange={(e) => setSpringDamping(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-zinc-800 rounded-lg appearance-none"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* STAGE 03: FULL-STACK SAAS CORE & DISTRIBUTED DATA FLOW */}
        {/* ========================================================================= */}
        <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-6 sm:px-12 md:px-20 pt-16 pb-8 relative">
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border text-emerald-300 font-mono text-xs uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all duration-500 ${
                activeStage === 2 ? 'border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.5)] scale-105' : 'border-emerald-500/30'
              }`}>
                <Server className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>03 // FULL-STACK ARCHITECTURE</span>
              </div>

              {/* Glowing Laser Scanline */}
              <div className={`h-0.5 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 transition-all duration-700 shadow-[0_0_15px_#34d399] ${
                activeStage === 2 ? 'w-56' : 'w-16 opacity-40'
              }`} />

              {/* Matrix Glitch Decode Heading */}
              <CyberGlitchHeading
                stageId={2}
                text="SCALABLE SAAS. ZERO DOWNTIME."
                isActive={activeStage === 2}
              />

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans max-w-xl">
                Visual brilliance requires hardened engineering. We build complete, production-grade backends: authenticated RBAC APIs, serverless databases, real-time WebSockets, and Redis token bucket rate limiting.
              </p>

              {/* High-Tech Architecture Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { icon: <Lock className="w-4 h-4 text-emerald-400" />, title: 'Zero-Trust Auth', desc: 'JWT + Secure HTTP-only cookies' },
                  { icon: <Zap className="w-4 h-4 text-cyan-400" />, title: 'Real-time WebSockets', desc: 'Sub-10ms pub/sub broadcast' },
                  { icon: <Layers className="w-4 h-4 text-purple-400" />, title: 'Distributed SQL / KV', desc: 'Multi-region replication' },
                  { icon: <Code2 className="w-4 h-4 text-pink-400" />, title: 'Secure API Proxies', desc: 'Third-party secret shielding' },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#0E0824]/90 border border-white/10 backdrop-blur-xl flex items-start gap-2.5 hover:border-emerald-500/50 hover:scale-105 transition-all duration-300">
                    {item.icon}
                    <div>
                      <div className="text-xs font-bold text-white font-mono">{item.title}</div>
                      <div className="text-[10px] text-zinc-400 font-sans">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Interactive Cloud Architecture Console */}
            <div className="lg:col-span-6">
              <div className={`p-6 rounded-2xl bg-[#0B061A]/95 border backdrop-blur-2xl transition-all duration-500 space-y-4 ${
                activeStage === 2 ? 'border-emerald-500 shadow-[0_0_60px_rgba(16,185,129,0.35)] scale-[1.02]' : 'border-emerald-500/30'
              }`}>
                
                {/* Console Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-emerald-300 font-bold">
                    <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span>DISTRIBUTED ARCHITECTURE MAP</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold animate-pulse">
                    100% UPTIME
                  </span>
                </div>

                {/* Node Selector Pills */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                  {[
                    { id: 'edge', label: '1. Edge CDN' },
                    { id: 'api', label: '2. Next API' },
                    { id: 'cache', label: '3. Redis KV' },
                    { id: 'db', label: '4. SQL Base' },
                    { id: 'sockets', label: '5. Sockets' },
                  ].map((node) => (
                    <button
                      key={node.id}
                      onClick={() => {
                        sound.playHover();
                        setActiveNode(node.id as any);
                        setPacketTrigger((prev) => prev + 1);
                      }}
                      className={`px-2 py-1.5 rounded-lg font-mono text-[10px] font-bold transition-all cursor-pointer ${
                        activeNode === node.id
                          ? 'bg-emerald-600 text-white border border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.6)] scale-105'
                          : 'bg-black/60 text-zinc-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {node.label}
                    </button>
                  ))}
                </div>

                {/* Active Node Telemetry Card */}
                <div className="p-4 rounded-xl bg-black/80 border border-emerald-500/30 space-y-3 font-mono">
                  {activeNode === 'edge' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-emerald-400 font-bold">
                        <span>NODE: GLOBAL EDGE CLUSTER</span>
                        <span>LATENCY: 6ms</span>
                      </div>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        Anycast routing across 300+ global edge nodes. Static assets, compressed images, and cached responses served in single-digit milliseconds.
                      </p>
                      <div className="flex gap-2 text-[10px] text-zinc-400 pt-1">
                        <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10">Brotli / Gzip</span>
                        <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10">TLS 1.3 Strict</span>
                      </div>
                    </div>
                  )}

                  {activeNode === 'api' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-cyan-400 font-bold">
                        <span>NODE: NEXT.JS SERVER ACTIONS</span>
                        <span>EXECUTION: 18ms</span>
                      </div>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        Direct RPC function calls with compile-time TypeScript type validation. Secret third-party API keys remain securely hidden server-side.
                      </p>
                      <div className="flex gap-2 text-[10px] text-zinc-400 pt-1">
                        <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10">Zod Validation</span>
                        <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10">Middleware Shield</span>
                      </div>
                    </div>
                  )}

                  {activeNode === 'cache' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-purple-400 font-bold">
                        <span>NODE: REDIS IN-MEMORY CACHE</span>
                        <span>THROUGHPUT: 150k ops/sec</span>
                      </div>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        Token-bucket rate limiting prevents DDoS and API abuse, while distributed session locks guarantee transactional consistency.
                      </p>
                      <div className="flex gap-2 text-[10px] text-zinc-400 pt-1">
                        <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10">Upstash Serverless</span>
                        <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10">Token Bucket</span>
                      </div>
                    </div>
                  )}

                  {activeNode === 'db' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-emerald-400 font-bold">
                        <span>NODE: POSTGRESQL / CLOUDSQL</span>
                        <span>POOL: 40 Connections</span>
                      </div>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        Type-safe relational database schema management with automated migrations, continuous backup snapshots, and optimized indexing.
                      </p>
                      <div className="flex gap-2 text-[10px] text-zinc-400 pt-1">
                        <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10">Drizzle / Prisma ORM</span>
                        <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10">Zero Data Loss</span>
                      </div>
                    </div>
                  )}

                  {activeNode === 'sockets' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-pink-400 font-bold">
                        <span>NODE: REAL-TIME WEBSOCKET HUB</span>
                        <span>CONNECTIONS: Active</span>
                      </div>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        Bidirectional WebSocket communication delivering instant notifications, collaborative multiplayer state sync, and live streaming metrics.
                      </p>
                      <div className="flex gap-2 text-[10px] text-zinc-400 pt-1">
                        <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10">SSE & WS Fallback</span>
                        <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10">Heartbeat Keepalive</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Packet Simulation Trigger Button */}
                <button
                  onClick={() => {
                    sound.playChime();
                    setPacketTrigger((prev) => prev + 1);
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>SIMULATE DATA PACKET FLOW</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* STAGE 04: COMMERCIAL ESCROW & ZERO-RISK LIFECYCLE */}
        {/* ========================================================================= */}
        <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-6 sm:px-12 md:px-20 pt-16 pb-8 relative">
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border text-purple-300 font-mono text-xs uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all duration-500 ${
                activeStage === 3 ? 'border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.5)] scale-105' : 'border-purple-500/30'
              }`}>
                <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>04 // ZERO-RISK EXECUTION</span>
              </div>

              {/* Glowing Laser Scanline */}
              <div className={`h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 transition-all duration-700 shadow-[0_0_15px_#c084fc] ${
                activeStage === 3 ? 'w-56' : 'w-16 opacity-40'
              }`} />

              {/* Matrix Glitch Decode Heading */}
              <CyberGlitchHeading
                stageId={3}
                text="VERIFIED ESCROW. 100% IP TRANSFER."
                isActive={activeStage === 3}
              />

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans max-w-xl">
                We work under protected milestone escrow via Fiverr Pro. You review and interact with live staging builds before approving each milestone release phase.
              </p>

              {/* Butter-Wipe Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-3">
                <ButterButton
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    sound.playPageSwitch();
                    setCurrentPage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  className="uppercase tracking-wider font-extrabold shadow-[0_0_35px_rgba(139,0,238,0.6)]"
                >
                  Start Project Brief
                </ButterButton>

                <ButterButton
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    sound.playPageSwitch();
                    setCurrentPage('deployments');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  icon={<Maximize2 className="w-4 h-4 text-purple-300" />}
                  iconPosition="left"
                  className="uppercase tracking-wider font-extrabold"
                >
                  Inspect Deployments
                </ButterButton>
              </div>
            </div>

            {/* Right Interactive Escrow Milestone Tracker */}
            <div className="lg:col-span-6">
              <div className={`p-6 rounded-2xl bg-[#0B061A]/95 border backdrop-blur-2xl transition-all duration-500 space-y-4 ${
                activeStage === 3 ? 'border-purple-500 shadow-[0_0_60px_rgba(168,85,247,0.35)] scale-[1.02]' : 'border-purple-500/30'
              }`}>
                
                {/* Console Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-purple-300 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>MILESTONE ESCROW LIFECYCLE</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold">
                    Fiverr Pro Verified
                  </span>
                </div>

                {/* 4 Interactive Milestone Steps */}
                <div className="space-y-2.5">
                  {[
                    {
                      step: 1,
                      title: 'Phase 1: Architecture & Interactive Wireframe',
                      desc: 'Design tokens, 3D moodboards, and full technical architecture locked.',
                      badge: 'Escrow Protected',
                    },
                    {
                      step: 2,
                      title: 'Phase 2: Alpha Build & Motion Choreography',
                      desc: 'Live deployment on private staging domain for client interactive review.',
                      badge: 'Client Staged',
                    },
                    {
                      step: 3,
                      title: 'Phase 3: Production Hardening & Audits',
                      desc: 'Lighthouse 99+ optimization, zero-leak memory audit, and security review.',
                      badge: 'Audited',
                    },
                    {
                      step: 4,
                      title: 'Phase 4: Full Codebase & 100% IP Handover',
                      desc: 'Clean GitHub repo transfer, documentation, and live production deployment.',
                      badge: 'Release Ready',
                    },
                  ].map((m) => {
                    const isSelected = activeMilestone === m.step;
                    return (
                      <div
                        key={m.step}
                        onClick={() => {
                          sound.playClick();
                          setActiveMilestone(m.step);
                        }}
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-purple-950/70 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)] scale-[1.01]'
                            : 'bg-black/60 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2 font-mono text-xs font-bold text-white">
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                              isSelected ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-400'
                            }`}>
                              0{m.step}
                            </span>
                            <span>{m.title}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-[10px] text-emerald-300 font-mono">
                            {m.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 font-sans pl-7">{m.desc}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Final Handover Guarantee Banner */}
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Commercial Copyright Transferred</span>
                  </div>
                  <span className="text-purple-300 font-bold">Signed Agreement</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
