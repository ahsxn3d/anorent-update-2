'use client';

import { useEffect } from 'react';

const FRAMES = '.ah-work-frame, .ah-case-frame';

/**
 * squared-media style case cursor: the frame's own "Inspect" chip follows the
 * pointer inside the media. Writes two CSS variables per frame on rAF; fine pointers only.
 */
export const CursorChip: React.FC = () => {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let raf = 0;
    let el: HTMLElement | null = null;
    let x = 0;
    let y = 0;
    const paint = () => {
      raf = 0;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--cx', `${x - r.left}px`);
      el.style.setProperty('--cy', `${y - r.top}px`);
    };
    const onMove = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest?.(FRAMES) as HTMLElement | null;
      if (t !== el) {
        el?.classList.remove('is-cursor');
        el = t;
        el?.classList.add('is-cursor');
      }
      x = e.clientX;
      y = e.clientY;
      if (el && !raf) raf = requestAnimationFrame(paint);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
};
