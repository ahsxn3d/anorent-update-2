'use client';

import React, { useEffect, useRef } from 'react';

/** Coral reading bar. A damped follower on rAF; idle (no frames) when the page is still. */
export const ScrollProgress: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cur = 0;
    let raf = 0;
    const target = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    const tick = () => {
      const t = target();
      cur += (t - cur) * 0.18;
      if (Math.abs(t - cur) < 0.0005) cur = t;
      el.style.transform = `scaleX(${cur})`;
      raf = cur === t ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    kick();
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
    };
  }, []);
  return <div ref={ref} className="ah-progress" style={{ transform: 'scaleX(0)' }} aria-hidden="true" />;
};
