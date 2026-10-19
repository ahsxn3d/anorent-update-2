'use client';

import React from 'react';

export const HeroHologramVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[520px] mx-auto aspect-square">
      <div className="lux-glow absolute left-[18%] top-[16%] w-[64%] h-[64%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.2),transparent_68%)] blur-md" />

      <div className="lux-orbit absolute inset-[6%] rounded-full border border-white/15">
        <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </div>
      <div className="lux-orbit-reverse absolute inset-[16%] rounded-full border border-white/10">
        <span className="absolute left-0 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70" />
      </div>
      <div className="lux-orbit absolute inset-[27%] rounded-full border border-dashed border-white/20" />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-[clamp(4.5rem,8vw,6.75rem)] leading-none tracking-[-0.08em] text-white">
          Ax
        </span>
        <span className="mt-3 text-[10px] tracking-[0.28em] uppercase text-white/40">
          Anorix / 01
        </span>
      </div>

      <div className="absolute bottom-2 left-0 right-0 grid grid-cols-3 text-[10px] tracking-[0.18em] uppercase text-white/40">
        <span>Web</span>
        <span className="text-center">Motion</span>
        <span className="text-right">Systems</span>
      </div>
    </div>
  );
};

export default HeroHologramVisual;
