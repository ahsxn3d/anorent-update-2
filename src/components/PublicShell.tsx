'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SmoothScroll } from './SmoothScroll';
import { RevealObserver } from './site/RevealObserver';
import { ScrollProgress } from './site/ScrollProgress';
import { CursorChip } from './site/CursorChip';
import { RouteCurtain } from './site/RouteCurtain';
import { interTight, instrumentSerif } from './site/fonts';
import { Page } from '../types';
import './site/site.css';
import './site/motion.css';

export const PublicShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const go = (page: Page) => {
    router.push(page === 'home' ? '/' : `/${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SmoothScroll>
      <div className={`ah-site ${interTight.variable} ${instrumentSerif.variable}`}>
        <div className="ah-grain" aria-hidden="true" />
        <ScrollProgress />

        <Navbar />

        <main className="ah-main">{children}</main>

        <Footer setCurrentPage={go} />
        <RevealObserver />
        <CursorChip />
        <RouteCurtain />
      </div>
    </SmoothScroll>
  );
};
