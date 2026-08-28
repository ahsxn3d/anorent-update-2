'use client';

import React, { useEffect, useState, useRef } from 'react';

import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Cpu, ShieldCheck, Activity, Terminal, Zap } from 'lucide-react';
import { sound } from '../utils/audio';

interface LoadingScreenProps {
  onComplete?: () => void;
}

const SYSTEM_STAGES = [
  { threshold: 0, label: 'INITIALIZING KINETIC MATRIX' },
  { threshold: 20, label: 'COMPILING HIGH-PRECISION SHADERS' },
  { threshold: 45, label: 'SYNCING DISTRIBUTED RUNTIME' },
  { threshold: 70, label: 'PREFETCHING STUDIO ASSETS' },
  { threshold: 90, label: 'ESTABLISHING HANDSHAKE' },
  { threshold: 100, label: 'SYSTEM READY // 100%' },
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStage, setCurrentStage] = useState(SYSTEM_STAGES[0].label);

  useEffect(() => {
    let currentProgress = 0;
    const startTime = performance.now();
    const duration = 1800; // 1.8s smooth fluid boot sequence

    const updateLoader = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // Custom easeOutCubic curve for smooth natural progression
      const easeT = 1 - Math.pow(1 - t, 3);
      currentProgress = Math.min(100, Math.floor(easeT * 100));

      setProgress(currentProgress);

      const stage = [...SYSTEM_STAGES].reverse().find((s) => currentProgress >= s.threshold);
      if (stage) {
        setCurrentStage(stage.label);
      }

      if (t < 1) {
        requestAnimationFrame(updateLoader);
      } else {
        setProgress(100);
        setCurrentStage('SYSTEM READY // 100%');
        try {
          sound.playChime();
        } catch {
          // ignore if audio blocked
        }
        setTimeout(() => {
          setIsLoading(false);
          onComplete?.();
        }, 400);
      }
    };

    const animFrame = requestAnimationFrame(updateLoader);
    return () => cancelAnimationFrame(animFrame);
  }, [onComplete]);


  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isLoading && (
        <motion.div
          key="global-award-loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.98,
            filter: 'blur(10px)',
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] bg-[#070412] text-white flex flex-col items-center justify-between p-6 sm:p-10 select-none overflow-hidden font-sans"
        >
          {/* AMBIENT SPOTLIGHT GLOW (PURPLE NEON VIBE) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#8B00EE]/25 blur-[160px] pointer-events-none animate-pulse" />
          
          {/* SUBTLE BACKGROUND GRID MESH */}
          <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#A855F7_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

          {/* TOP HUD HEADER */}
          <div className="w-full flex items-center justify-between text-xs font-mono tracking-wider text-slate-300 z-10 border-b border-purple-500/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#A855F7] animate-ping" />
              <span className="font-extrabold text-white uppercase tracking-widest">
                AHSAN STUDIO // OS v2.6 LAB
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-[#C084FC]" /> CORE: OPTIMAL
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300">
                <Activity className="w-3.5 h-3.5 text-[#C084FC]" /> 60 FPS
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> AUTH: SECURE
              </span>
            </div>

            <div className="text-[#C084FC] font-bold text-[11px] font-mono">
              ENGINEERING MATRIX
            </div>
          </div>

          {/* CENTERPIECE LOADER ENGINE */}
          <div className="relative flex flex-col items-center justify-center space-y-8 z-10 my-auto">
            {/* CONCENTRIC ROTATING GEOMETRIC RINGS */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
              {/* Outer Counter-Spinning Orbit Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-[#8B00EE]/60"
              />

              {/* Middle Pulsing Accent Ring with Glowing Dots */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 sm:inset-3 rounded-full border border-[#A855F7]/40 flex items-center justify-between p-1"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#A855F7] shadow-[0_0_12px_#A855F7]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] shadow-[0_0_12px_#38BDF8]" />
              </motion.div>

              {/* Inner Glowing Spinning Sweep Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-5 sm:inset-6 rounded-full border-2 border-transparent border-t-[#C084FC] border-r-[#38BDF8]"
              />

              {/* Center Studio Pill Core */}
              <motion.div
                animate={{ scale: [0.96, 1.04, 0.96] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#120B28] text-white border border-purple-500/50 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(139,0,238,0.5)] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-[#C084FC] mb-1 animate-pulse" />
                <span className="text-[11px] font-mono font-extrabold tracking-widest text-purple-200">
                  AHSAN
                </span>
              </motion.div>
            </div>

            {/* PROGRESS COUNTER & KINETIC TELEMETRY */}
            <div className="text-center space-y-4 max-w-sm w-full">
              {/* Percentage Counter */}
              <div className="flex items-baseline justify-center gap-1 font-mono">
                <span className="font-black text-5xl sm:text-6xl text-white tracking-tight drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                  {progress}
                </span>
                <span className="text-2xl font-black text-[#C084FC]">%</span>
              </div>

              {/* Dynamic Status Ticker Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#120B28]/90 border border-purple-500/40 shadow-md text-xs font-mono font-bold text-purple-200">
                <Terminal className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                <span>{currentStage}</span>
              </div>

              {/* Precision Glowing Progress Bar */}
              <div className="w-72 sm:w-80 h-2.5 bg-[#120B28] border border-purple-500/40 rounded-full overflow-hidden p-0.5 shadow-inner mx-auto relative">
                <div
                  className="h-full bg-gradient-to-r from-[#8B00EE] via-[#A855F7] to-[#38BDF8] rounded-full shadow-[0_0_15px_rgba(168,85,247,0.9)] transition-all duration-75 relative"
                  style={{ width: `${progress}%` }}
                >
                  {/* Traveling Leading Edge Particle */}
                  <div className="absolute right-0 top-0 bottom-0 w-3 bg-white rounded-full shadow-[0_0_10px_#ffffff]" />
                </div>
              </div>

              {/* Equalizer Waveform Animation */}
              <div className="flex items-end justify-center gap-1.5 h-4 pt-1">
                {[40, 75, 100, 60, 90, 45, 80, 50].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ['20%', `${h}%`, '30%'] }}
                    transition={{
                      duration: 0.7,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      delay: i * 0.08,
                    }}
                    className="w-1.5 rounded-full bg-gradient-to-t from-purple-500 to-cyan-400 shadow-[0_0_8px_#C084FC]"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM HUD FOOTER */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono font-bold text-slate-400 z-10 border-t border-purple-500/20 pt-4 gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
              <span className="text-slate-300">DIGITAL ARTIST & PRINCIPAL FRONTEND DEVELOPER</span>
            </div>
            <div className="tracking-widest uppercase text-slate-400">
              HIGH-PERFORMANCE ARCHITECTURE • 2026 EDITION
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
