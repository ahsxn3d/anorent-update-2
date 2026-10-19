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
    <footer className="ah-footer">
      <div className="ah-glow ah-glow-low ah-glow-warm" aria-hidden="true" />
      <div className="ah-footer-grid">
        <div className="ah-footer-lede">
          <p className="ah-label" style={{ marginBottom: 20 }}>Anorix</p>
          <p className="ah-footer-quote">
            &ldquo;Where Cyberpunk Aesthetics Meet <em>High-Performance</em> Web Engineering.&rdquo;
          </p>
          <p className="ah-label" style={{ marginTop: 28, color: 'var(--ah-faint)' }}>
            © 2026 ANORIX STUDIO. All rights reserved.
          </p>
        </div>

        <div className="ah-footer-col">
          <p className="ah-label" style={{ marginBottom: 18 }}>Pages</p>
          <ul>
            <li><button type="button" onClick={() => go('home')}>Home</button></li>
            <li><button type="button" onClick={() => go('deployments')}>Deployments</button></li>
            <li><button type="button" onClick={() => go('about')}>About Studio</button></li>
            <li><button type="button" onClick={() => go('faq')}>FAQ & Guides</button></li>
            <li><button type="button" onClick={() => go('contact')}>Direct Contact Portals</button></li>
          </ul>
        </div>

        <div className="ah-footer-col">
          <p className="ah-label" style={{ marginBottom: 18 }}>Channels</p>
          <ul>
            <li>
              <a href="https://www.fiverr.com/ahsxn_dev" target="_blank" rel="noopener noreferrer">
                Fiverr Pro
              </a>
            </li>
            <li>
              <a href="https://dribbble.com/ahsxn_dev" target="_blank" rel="noopener noreferrer">
                Dribbble
              </a>
            </li>
          </ul>
        </div>

        <div className="ah-footer-col is-time">
          <p className="ah-label" style={{ marginBottom: 18 }}>Studio time</p>
          <p suppressHydrationWarning className="ah-footer-time">
            {formattedTime}
          </p>
          <p suppressHydrationWarning className="ah-dim" style={{ marginTop: 10, fontSize: 14 }}>
            {formattedDate}
          </p>
        </div>
      </div>

      <span className="ah-footer-word" aria-hidden="true" data-r="blur">
        Anor<i>ix</i>
      </span>

      <div className="ah-footer-base ah-label">
        <span>Anorix Architecture // Modern Portfolio Showcase</span>
        <span>Powered by Anorix Core Engine</span>
      </div>
    </footer>
  );
};
