'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SmoothScroll } from './SmoothScroll';
import { FogPlanes } from './FogPlanes';
import { ScrollDepth } from './craft/ScrollDepth';
import { Page } from '../types';

export const PublicShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const go = (page: Page) => {
    router.push(page === 'home' ? '/' : `/${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#0B0D12] text-[#E8EBF2] flex flex-col">
        <FogPlanes />
        <div className="lux-grain" aria-hidden="true" />

        <motion.div
          className="fixed top-0 left-0 right-0 h-px bg-[#4F7CFF] origin-left z-[200] pointer-events-none"
          style={{ scaleX }}
        />

        <ScrollDepth />
        <Navbar />

        <main data-route={pathname} className="flex-1 w-full max-w-[1200px] mx-auto px-6 lg:px-8 pt-8 sm:pt-14 relative z-10">
          {/* No page-level fade: content paints with the HTML (fast LCP); sections bring their own entrances. */}
          <div data-page-root>{children}</div>
        </main>

        <Footer setCurrentPage={go} />
      </div>
    </SmoothScroll>
  );
};
