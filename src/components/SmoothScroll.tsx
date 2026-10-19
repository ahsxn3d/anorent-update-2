'use client';

import React, { useEffect } from 'react';
import type Lenis from 'lenis';
import { loadGsap, whenInteract } from './site/gsap';

export let lenisInstance: Lenis | null = null;

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.innerWidth < 768;

    // Touch devices keep 100% native inertial scrolling
    if (isTouchDevice || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let cleanup = () => {};

    // Lenis + the GSAP ticker arrive on the first scroll intent; native scroll works until then
    whenInteract().then(async () => {
      const [{ default: LenisCtor }, { gsap, ScrollTrigger }] = await Promise.all([import('lenis'), loadGsap()]);
      if (cancelled) return;
      const lenis = new LenisCtor({
        duration: 0.8,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        syncTouch: false,
        infinite: false,
      });
      lenisInstance = lenis;
      lenis.on('scroll', () => ScrollTrigger.update());
      const update = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(500, 33);
      cleanup = () => {
        gsap.ticker.remove(update);
        lenis.destroy();
        lenisInstance = null;
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <>{children}</>;
};
