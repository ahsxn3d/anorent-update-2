'use client';

import React, { useEffect } from 'react';
import type Lenis from 'lenis';
import { loadGsap, whenSettled } from './site/gsap';

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

    // Lenis + the GSAP ticker arrive once settled (first scroll intent or idle); native scroll until then
    whenSettled().then(async () => {
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
        autoRaf: false, // one RAF only: Lenis is driven by gsap.ticker below
      });
      lenisInstance = lenis;
      const onScroll = () => ScrollTrigger.update();
      lenis.on('scroll', onScroll);
      const update = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(update);
      // never "catch up" after a long frame: Lenis and scrubs stay locked to real time
      gsap.ticker.lagSmoothing(0);
      cleanup = () => {
        gsap.ticker.remove(update);
        lenis.off('scroll', onScroll);
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
