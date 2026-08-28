'use client';

import React from 'react';
import CyberButton from './CyberButton';

interface DeploymentCardProps {
  data: {
    id: string;
    title: string;
    category: string;
    rating: number;
    image: string;
    description: string;
    tech: string[];
    liveUrl?: string;
  };
}

export default function DeploymentCard({ data }: DeploymentCardProps) {
  return (
    <div
      className="relative bg-[#08080c] border border-white/10 rounded-xl overflow-hidden group transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] [transform-style:preserve-3d] [backface-visibility:hidden] [transform:translateZ(0)] will-change-transform flex flex-col justify-between"
      style={{
        WebkitFontSmoothing: 'subpixel-antialiased',
        textRendering: 'optimizeLegibility',
      }}
    >
      {/* Media Layer */}
      <div className="relative w-full h-48 overflow-hidden bg-black">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-purple-300 uppercase tracking-wider">
          {data.category}
        </div>
        <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-amber-400">
          ★ {data.rating}
        </div>
      </div>

      {/* Elevated Content Layer: translateZ(30px) ensures razor sharp font rendering */}
      <div className="relative z-10 p-5 [transform:translateZ(30px)] [backface-visibility:hidden] flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
            {data.title}
          </h4>
          <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
            {data.description}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
          {/* Tech Stack Pills */}
          <div className="flex gap-1.5 flex-wrap">
            {data.tech.slice(0, 3).map((t, i) => (
              <span
                key={i}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action CTA */}
          <CyberButton
            href={data.liveUrl || '/deployments'}
            variant="purple"
            size="sm"
            className="!px-3 !py-1.5"
          >
            Live Demo ↗
          </CyberButton>
        </div>
      </div>
    </div>
  );
}
