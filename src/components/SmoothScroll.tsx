'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export let lenisInstance: Lenis | null = null;

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const isTouchDevice =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches ||
        window.innerWidth < 768);

    // On mobile touch devices, use 100% native inertial touch scrolling (zero frame drops / touch hijacking)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || reduced) {
      return;
    }

    // Luxury Awwwards-grade smooth scroll initialization for desktop mouse/wheel devices
    const lenis = new Lenis({
      lerp: 0.1,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      syncTouch: false,
      infinite: false,
    });

    lenisInstance = lenis;

    // Connect Lenis scroll updates to GSAP ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  // Section reveals: fade/rise once as each top-level block enters (GSAP ScrollTrigger, synced to Lenis above).
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const root = document.querySelector('main [data-page-root]') as HTMLElement | null;
      const pageEl = (root?.firstElementChild as HTMLElement | null) ?? null;
      if (!pageEl) return;
      const blocks = (Array.from(pageEl.children).slice(1) as HTMLElement[]).filter((b) => !b.classList.contains('lux-stack-stage'));
      blocks.forEach((block) => {
        const kids = Array.from(block.children).filter((k) => (k as HTMLElement).offsetHeight > 0).slice(0, 8);
        const targets = kids.length > 1 ? kids : [block];
        gsap.from(targets, {
          autoAlpha: 0,
          y: 24,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.07,
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: block, start: 'top 85%', once: true },
        });
      });
      ScrollTrigger.refresh();
    });
    return () => ctx.revert();
  }, [pathname]);

  return <>{children}</>;
};
