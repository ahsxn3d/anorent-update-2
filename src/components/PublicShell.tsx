'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SmoothScroll } from './SmoothScroll';
import { FogPlanes } from './FogPlanes';
import { ScrollDepth } from './craft/ScrollDepth';
import { Page } from '../types';

export const PublicShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
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
      <div className="relative min-h-screen bg-[#121110] text-[#EDE9E3] flex flex-col">
        <FogPlanes />
        <div className="lux-grain" aria-hidden="true" />

        <motion.div
          className="fixed top-0 left-0 right-0 h-px bg-[#3B82F6] origin-left z-[200] pointer-events-none"
          style={{ scaleX }}
        />

        <ScrollDepth />
        <Navbar />

        <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 lg:px-8 pt-8 sm:pt-14 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            data-page-root
          >
            {children}
          </motion.div>
        </main>

        <Footer setCurrentPage={go} />
      </div>
    </SmoothScroll>
  );
};
