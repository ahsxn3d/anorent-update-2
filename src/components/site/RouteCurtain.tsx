'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Monogram } from './Logo';

/**
 * Page transition: after a client-side route change a cobalt sheet with the
 * AX monogram lifts off the new page. Never runs on the first load (no LCP cost).
 * Transform-only, never blocks input, and always removes itself (animationend
 * or a timeout if the tab was hidden mid-animation). Rapid route changes restart it.
 */
export const RouteCurtain: React.FC = () => {
  const pathname = usePathname();
  const first = useRef(true);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setRun((n) => n + 1);
  }, [pathname]);

  useEffect(() => {
    if (!run) return;
    const t = window.setTimeout(() => setRun(0), 1300);
    return () => window.clearTimeout(t);
  }, [run]);

  if (!run) return null;
  return (
    <div
      key={run}
      className="ah-curtain"
      aria-hidden="true"
      onAnimationEnd={(e) => e.target === e.currentTarget && e.animationName === 'ah-curtain' && setRun(0)}
    >
      <Monogram className="ah-curtain-mark" />
    </div>
  );
};
