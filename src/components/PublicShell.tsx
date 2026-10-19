'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SmoothScroll } from './SmoothScroll';
import { RevealObserver } from './site/RevealObserver';
import { interTight, instrumentSerif } from './site/fonts';
import { Page } from '../types';
import './site/site.css';

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
      <div className={`ah-site ${interTight.variable} ${instrumentSerif.variable}`}>
        <div className="ah-grain" aria-hidden="true" />
        <motion.div className="ah-progress" style={{ scaleX }} aria-hidden="true" />

        <Navbar />

        <main className="ah-main">{children}</main>

        <Footer setCurrentPage={go} />
        <RevealObserver />
      </div>
    </SmoothScroll>
  );
};
