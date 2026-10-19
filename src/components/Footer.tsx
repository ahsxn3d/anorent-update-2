'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Page } from '../types';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const router = useRouter();
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

  const go = (page: Page) => {
    setCurrentPage(page);
    router.push(page === 'home' ? '/' : `/${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 w-full mt-24 sm:mt-32 border-t border-[#E8EBF2]/10">
      <div data-fx="rise" className="max-w-[1200px] mx-auto px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5 space-y-5">
            <p className="text-[15px] tracking-[-0.04em] text-[#E8EBF2]">Anorix</p>
            <p className="text-sm text-[#E8EBF2]/55 leading-relaxed max-w-sm">
              &ldquo;Where Cyberpunk Aesthetics Meet High-Performance Web Engineering.&rdquo;
            </p>
            <p className="text-xs text-[#E8EBF2]/35">
              © 2026 ANORIX STUDIO. All rights reserved.
            </p>
          </div>

          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#E8EBF2]/35 mb-4">Pages</p>
              <ul className="space-y-2.5 text-sm text-[#E8EBF2]/70">
                <li><button onClick={() => go('home')} className="lux-link cursor-pointer">Home</button></li>
                <li><button onClick={() => go('deployments')} className="lux-link cursor-pointer">Deployments</button></li>
                <li><button onClick={() => go('about')} className="lux-link cursor-pointer">About Studio</button></li>
                <li><button onClick={() => go('faq')} className="lux-link cursor-pointer">FAQ & Guides</button></li>
                <li><button onClick={() => go('contact')} className="lux-link cursor-pointer">Direct Contact Portals</button></li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#E8EBF2]/35 mb-4">Channels</p>
              <ul className="space-y-2.5 text-sm text-[#E8EBF2]/70">
                <li>
                  <a href="https://www.fiverr.com/ahsxn_dev" target="_blank" rel="noopener noreferrer" className="lux-link">
                    Fiverr Pro
                  </a>
                </li>
                <li>
                  <a href="https://dribbble.com/ahsxn_dev" target="_blank" rel="noopener noreferrer" className="lux-link">
                    Dribbble
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#E8EBF2]/35 mb-4">Studio time</p>
            <p suppressHydrationWarning className="text-3xl tracking-[-0.04em] text-[#E8EBF2] tabular-nums">
              {formattedTime}
            </p>
            <p suppressHydrationWarning className="mt-2 text-sm text-[#E8EBF2]/45">
              {formattedDate}
            </p>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-[#E8EBF2]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] tracking-[0.14em] uppercase text-[#E8EBF2]/30">
          <span>Anorix Architecture // Modern Portfolio Showcase</span>
          <span>Powered by Anorix Core Engine</span>
        </div>
      </div>
    </footer>
  );
};
