'use client';

import { useEffect } from 'react';

const FRAMES = '.ah-work-frame, .ah-case-frame';

/**
 * squared-media style case cursor: the frame's own "Inspect" chip follows the
 * pointer inside the media. JS only writes two CSS variables (on rAF) on the
 * frame under the pointer; showing/hiding is CSS :hover, so no state can stick.
 * Re-targets on scroll (content moves under a still pointer) and forgets the
 * pointer when it leaves the window or the tab loses focus. Fine pointers only.
 */
export const CursorChip: React.FC = () => {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const html = document.documentElement;
    html.classList.add('ah-cursor-on');
    let raf = 0;
    let has = false;
    let x = 0;
    let y = 0;
    const paint = () => {
      raf = 0;
      if (!has) return;
      const hit = document.elementFromPoint(x, y)?.closest?.(FRAMES) as HTMLElement | null;
      if (!hit) return;
      const r = hit.getBoundingClientRect();
      hit.style.setProperty('--cx', `${(x - r.left).toFixed(1)}px`);
      hit.style.setProperty('--cy', `${(y - r.top).toFixed(1)}px`);
    };
    const queue = () => {
      if (has && !raf) raf = requestAnimationFrame(paint);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      has = true;
      x = e.clientX;
      y = e.clientY;
      queue();
    };
    const forget = () => {
      has = false;
    };
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) forget();
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerout', onOut, { passive: true });
    document.addEventListener('pointercancel', forget, { passive: true });
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('blur', forget);
    return () => {
      html.classList.remove('ah-cursor-on');
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onOut);
      document.removeEventListener('pointercancel', forget);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('blur', forget);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
};
