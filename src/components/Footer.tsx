'use client';

import React, { useState, useEffect } from 'react';

import { Activity, Clock, ArrowUpRight } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setHasMounted(true);
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = hasMounted && time ? time.toLocaleTimeString('en-US', { hour12: false }) : '12:00:00';
  const formattedDate = hasMounted && time
    ? time.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '2026';

  return (
    <footer className="relative z-20 w-full mt-10 sm:mt-20 bg-gradient-to-tr from-[#0A0B14] via-[#131422] to-[#1F1035] border-t border-purple-500/20 overflow-hidden shadow-2xl">
      {/* Decorative ambient glowing radial background orbs */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8B00EE]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D946EF]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
          
          {/* COLUMN 1: Brand Wordmark, Pill Tag, Italic Tagline, Copyright */}
          <div className="space-y-2 sm:space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-xl sm:text-2xl font-extrabold tracking-tighter text-white drop-shadow-md">
                ANORIX
              </span>
              <span className="w-2 h-2 rounded-full bg-[#E879F9] animate-pulse" />
              <span className="px-2.5 py-0.5 bg-[#8B00EE]/40 text-purple-100 text-[10px] font-extrabold uppercase rounded-full tracking-wider border border-[#D946EF]/50 shadow-sm backdrop-blur-xs">
                Anorix Studio
              </span>
            </div>
            <p className="text-xs text-purple-100/90 italic leading-relaxed max-w-sm font-medium">
              &ldquo;Where Cyberpunk Aesthetics Meet High-Performance Web Engineering.&rdquo;
            </p>
            <p className="text-[11px] sm:text-xs text-purple-200/70 pt-1 sm:pt-2 font-mono">
              © 2026 ANORIX STUDIO. All rights reserved.
            </p>
          </div>

          {/* COLUMN 2: Ecosystem & Quick Links */}
          <div>
            <h4 className="font-display text-xs font-extrabold uppercase tracking-wider text-purple-200 mb-2 sm:mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D946EF]" />
              Studio Navigation
            </h4>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-fuchsia-300 block mb-1.5 sm:mb-2 font-mono">
                  Core Pages
                </span>
                <ul className="space-y-1.5 sm:space-y-2 text-xs font-semibold text-purple-100/90">
                  <li>
                    <button
                      onClick={() => setCurrentPage('home')}
                      className="hover:text-fuchsia-300 transition-colors cursor-pointer"
                    >
                      Home
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCurrentPage('deployments')}
                      className="hover:text-fuchsia-300 transition-colors cursor-pointer"
                    >
                      Deployments
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCurrentPage('about')}
                      className="hover:text-fuchsia-300 transition-colors cursor-pointer"
                    >
                      About Studio
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-fuchsia-300 block mb-1.5 sm:mb-2 font-mono">
                  Official Channels
                </span>
                <ul className="space-y-1.5 sm:space-y-2 text-xs font-semibold text-purple-100/90">
                  <li>
                    <a
                      href="https://www.fiverr.com/ahsxn_dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Order on Fiverr Pro"
                      className="hover:text-emerald-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Fiverr Pro</span>
                      <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://dribbble.com/ahsxn_dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View Dribbble Portfolio"
                      className="hover:text-pink-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Dribbble</span>
                      <ArrowUpRight className="w-3 h-3 text-pink-400" />
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() => setCurrentPage('contact')}
                      className="hover:text-fuchsia-300 transition-colors cursor-pointer"
                    >
                      Direct Contact Portals
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCurrentPage('faq')}
                      className="hover:text-fuchsia-300 transition-colors cursor-pointer"
                    >
                      FAQ & Guides
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* COLUMN 3: System Telemetry Clock & Calendar Card */}
          <div>
            <h4 className="font-display text-xs font-extrabold uppercase tracking-wider text-purple-200 mb-2 sm:mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B00EE]" />
              System Telemetry & Live Clock
            </h4>
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#020316]/90 backdrop-blur-md text-white space-y-2.5 sm:space-y-3 shadow-xl border border-[#D946EF]/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E879F9] animate-ping" />
                  <span className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider">Studio Live Time</span>
                </div>
                <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E879F9]" />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[11px] font-mono-tech">
                <div>
                  <span className="text-purple-300/80 block text-[9px] uppercase">Exact Clock (UTC)</span>
                  <span suppressHydrationWarning className="text-fuchsia-300 font-bold text-xs sm:text-sm tracking-widest">{formattedTime}</span>
                </div>
                <div>
                  <span className="text-purple-300/80 block text-[9px] uppercase">Calendar Date</span>
                  <span suppressHydrationWarning className="text-white font-bold text-[11px] sm:text-xs">{formattedDate}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR - Translucent badge */}
        <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-xs text-purple-200 font-semibold">
          <span className="font-mono-tech text-[10px] sm:text-[11px] px-2.5 py-0.5 sm:px-3 sm:py-1 bg-[#131422]/90 backdrop-blur-md rounded-full border border-purple-500/30 shadow-xs">
            Anorix Architecture // Modern Portfolio Showcase
          </span>
          <span className="font-mono-tech text-[10px] sm:text-[11px] px-2.5 py-0.5 sm:px-3 sm:py-1 bg-[#131422]/90 backdrop-blur-md rounded-full border border-purple-500/30 shadow-xs">
            Powered by Anorix Core Engine
          </span>
        </div>
      </div>
    </footer>
  );
};
