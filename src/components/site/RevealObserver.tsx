'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const SELECTOR = '.ah-bt:not(.ah-bt-load):not(.is-in), [data-r]:not(.is-in), .ah-bar:not(.is-in)';

/**
 * One IntersectionObserver for the whole site. Elements opt in with
 * `.ah-bt` (BlurText), `[data-r]` (block / media reveals) or `.ah-bar`.
 * It only adds `.is-in`; every motion is a CSS transition on transform, opacity or a short blur.
 */
export const RevealObserver: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timers: number[] = [];

    const settle = (el: Element) => {
      if (!el.classList.contains('ah-bt')) return;
      // drop the blur filter once the words have landed so nothing keeps a filtered layer
      timers.push(window.setTimeout(() => el.classList.add('is-done'), 2600));
    };

    const pending = new Set<Element>();
    const reveal = (el: Element) => {
      el.classList.add('is-in');
      settle(el);
      io.unobserve(el);
      pending.delete(el);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          // also reveal anything already scrolled past (fast flicks / jumps skip the intersecting state)
          if (e.isIntersecting || e.boundingClientRect.bottom < 0) reveal(e.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );

    const scan = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (reduce) {
          el.classList.add('is-in', 'is-done');
          return;
        }
        if (!pending.has(el)) {
          pending.add(el);
          io.observe(el);
        }
      });
      document.querySelectorAll('.ah-bt-load:not(.is-done)').forEach((el) => {
        timers.push(window.setTimeout(() => el.classList.add('is-done'), 2600));
      });
    };

    scan();
    // safety net for jumps (End key, anchor, scrollbar drag, fast fling): IO never reports
    // an element that went from below the fold straight to above it, which left it invisible
    let sraf = 0;
    const sweep = () => {
      sraf = 0;
      const vh = window.innerHeight;
      pending.forEach((el) => {
        if (el.getBoundingClientRect().top < vh * 0.92) reveal(el);
      });
    };
    let sweepT = 0;
    const onScroll = () => {
      window.clearTimeout(sweepT);
      sweepT = window.setTimeout(() => {
        if (!sraf) sraf = window.requestAnimationFrame(sweep);
      }, 120);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    let raf = 0;
    const mo = new MutationObserver(() => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(sweepT);
      if (sraf) window.cancelAnimationFrame(sraf);
      if (raf) window.cancelAnimationFrame(raf);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [pathname]);

  return null;
};

export default RevealObserver;
