'use client';

import React, { useState } from 'react';
import { Sparkles, Orbit, Cpu, Zap } from 'lucide-react';
import { sound } from '../utils/audio';

type HologramMode = 'quantum' | 'orbital' | 'matrix';

export const MobileHeroHologram: React.FC = () => {
  const [activeMode, setActiveMode] = useState<HologramMode>('quantum');
  const [pulseKey, setPulseKey] = useState(0);

  const handleModeSwitch = (mode: HologramMode) => {
    sound.playClick();
    setActiveMode(mode);
    setPulseKey((prev) => prev + 1);
  };

  return (
    <div
      id="hero-quantum-hologram-mobile"
      className="relative w-full max-w-[320px] xs:max-w-[350px] aspect-square flex flex-col items-center justify-center select-none mx-auto my-2"
    >
      {/* Outer Hologram Ring Vessel */}
      <div className="absolute inset-0 rounded-full border border-purple-500/30 shadow-[0_0_35px_rgba(139,0,238,0.25),inset_0_0_25px_rgba(168,85,247,0.15)] bg-gradient-to-b from-[#160728]/85 via-[#0d031a]/80 to-[#160728]/90 pointer-events-none" />

      {/* Cyber Corner HUD Telemetry */}
      <div className="absolute top-3.5 left-4 z-20 text-[#C084FC] text-[9.5px] font-mono tracking-widest flex items-center gap-1.5 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C084FC] animate-ping" />
        [QUANTUM-CORE]
      </div>

      <div className="absolute top-3.5 right-4 z-20 text-emerald-400 text-[9.5px] font-mono tracking-widest flex items-center gap-1.5 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        120 FPS // 99.8%
      </div>

      {/* Center Cybernetic Hologram Core (Pure CSS Hardware Accelerated, 0 Canvas/WebGL Overhead) */}
      <div className="relative z-10 flex items-center justify-center w-48 h-48">
        {/* Pulsing Quantum Orbs */}
        <div
          key={`pulse-${pulseKey}`}
          className={`absolute inset-4 rounded-full blur-xl transition-all duration-700 opacity-60 animate-pulse pointer-events-none ${
            activeMode === 'orbital'
              ? 'bg-cyan-500/40'
              : activeMode === 'matrix'
              ? 'bg-emerald-500/40'
              : 'bg-purple-600/40'
          }`}
        />

        {/* Rotating Concentric Kinetic Rings */}
        <div
          className={`absolute inset-3 rounded-full border border-dashed animate-spin transition-colors duration-500 ${
            activeMode === 'orbital'
              ? 'border-cyan-400/40'
              : activeMode === 'matrix'
              ? 'border-emerald-400/40'
              : 'border-purple-400/40'
          }`}
          style={{ animationDuration: '16s' }}
        />
        <div
          className={`absolute inset-8 rounded-full border border-dotted animate-spin transition-colors duration-500 ${
            activeMode === 'orbital'
              ? 'border-cyan-300/60'
              : activeMode === 'matrix'
              ? 'border-emerald-300/60'
              : 'border-fuchsia-300/60'
          }`}
          style={{ animationDuration: '10s', animationDirection: 'reverse' }}
        />

        {/* Center Quantum Holographic Core Glyph */}
        <div
          className={`w-24 h-24 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-2xl border ${
            activeMode === 'orbital'
              ? 'bg-gradient-to-tr from-[#0284C7]/80 to-[#00F0FF]/80 border-cyan-300/60 shadow-[0_0_30px_rgba(0,240,255,0.6)] rotate-45'
              : activeMode === 'matrix'
              ? 'bg-gradient-to-tr from-[#059669]/80 to-[#00FF9D]/80 border-emerald-300/60 shadow-[0_0_30px_rgba(0,255,157,0.6)] rotate-12'
              : 'bg-gradient-to-tr from-[#8B00EE]/80 to-[#C084FC]/80 border-purple-300/60 shadow-[0_0_30px_rgba(168,85,247,0.6)] -rotate-6'
          }`}
        >
          {activeMode === 'orbital' ? (
            <Orbit className="w-10 h-10 text-black -rotate-45 animate-pulse" />
          ) : activeMode === 'matrix' ? (
            <Cpu className="w-10 h-10 text-black -rotate-12 animate-pulse" />
          ) : (
            <Sparkles className="w-10 h-10 text-white rotate-6 animate-pulse" />
          )}
        </div>
      </div>

      {/* Interactive Mode Switcher */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 p-1 rounded-full bg-[#18092c]/95 border border-purple-400/35 shadow-[0_10px_25px_rgba(0,0,0,0.8)] whitespace-nowrap">
        <button
          onClick={() => handleModeSwitch('quantum')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[9.5px] font-extrabold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
            activeMode === 'quantum'
              ? 'bg-gradient-to-r from-[#8B00EE] to-[#A855F7] text-white shadow-[0_0_10px_#A855F7]'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Sparkles className="w-2.5 h-2.5 text-amber-300" />
          Quantum
        </button>

        <button
          onClick={() => handleModeSwitch('orbital')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[9.5px] font-extrabold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
            activeMode === 'orbital'
              ? 'bg-gradient-to-r from-[#0284C7] to-[#00F0FF] text-black shadow-[0_0_10px_#00F0FF]'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Orbit className="w-2.5 h-2.5 text-cyan-300" />
          Orbital
        </button>

        <button
          onClick={() => handleModeSwitch('matrix')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[9.5px] font-extrabold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
            activeMode === 'matrix'
              ? 'bg-gradient-to-r from-[#059669] to-[#00FF9D] text-black shadow-[0_0_10px_#00FF9D]'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Cpu className="w-2.5 h-2.5 text-emerald-300" />
          Matrix
        </button>

        <button
          onClick={() => {
            sound.playHover();
            setPulseKey((prev) => prev + 1);
          }}
          title="Pulse Resonance"
          className="p-1 rounded-full text-purple-300 hover:text-white cursor-pointer"
        >
          <Zap className="w-3 h-3 text-amber-300" />
        </button>
      </div>
    </div>
  );
};
