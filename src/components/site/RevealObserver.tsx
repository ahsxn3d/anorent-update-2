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

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            settle(e.target);
            io.unobserve(e.target);
          }
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
        io.observe(el);
      });
      document.querySelectorAll('.ah-bt-load:not(.is-done)').forEach((el) => {
        timers.push(window.setTimeout(() => el.classList.add('is-done'), 2600));
      });
    };

    scan();
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
      if (raf) window.cancelAnimationFrame(raf);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [pathname]);

  return null;
};

export default RevealObserver;
