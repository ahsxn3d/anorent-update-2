'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-driven 3D layer (GPU transforms only, scrubbed by ScrollTrigger which Lenis drives).
 * Disabled for reduced motion; lighter on small screens via gsap.matchMedia.
 */
export function ScrollDepth() {
  const pathname = usePathname();
  useEffect(() => {
    const mm = gsap.matchMedia();
    const id = window.setTimeout(() => {
      mm.add(
        {
          desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
          mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
        },
        (ctx) => {
          const { desktop } = ctx.conditions as { desktop: boolean; mobile: boolean };

          // 1. Hero layered parallax: grid recedes slowest, spotlight mid, stats panel tilts back in depth.
          const hero = document.querySelector('.lux-hero');
          if (hero) {
            const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
            gsap.to(hero.querySelector('.lux-hero-grid'), { yPercent: 18, scale: 1.08, ease: 'none', scrollTrigger: st });
            gsap.to(hero.querySelector('.lux-spotlight'), { yPercent: 30, ease: 'none', scrollTrigger: st });
            const stats = hero.querySelector('.lux-stats');
            if (stats) {
              gsap.to(stats, { rotateX: desktop ? 18 : 8, z: desktop ? -120 : -40, yPercent: -10, transformPerspective: 900, ease: 'none', scrollTrigger: st });
              // 5. Stats z-translate: each cell lifts toward the viewer at its own depth.
              gsap.utils.toArray<HTMLElement>(stats.children).forEach((cell, i) => {
                gsap.to(cell, { z: (i % 2 ? 40 : 70) * (desktop ? 1 : 0.4), ease: 'none', scrollTrigger: st });
              });
            }
          }

          // 2. Project tiles rotate in from perspective (rotateX) as they enter.
          gsap.utils.toArray<HTMLElement>('.lux-tile').forEach((tile) => {
            gsap.fromTo(
              tile,
              { rotateX: desktop ? 16 : 8, y: desktop ? 60 : 24, transformPerspective: 1200, transformOrigin: '50% 100%' },
              { rotateX: 0, y: 0, ease: 'none', scrollTrigger: { trigger: tile, start: 'top bottom', end: 'top 55%', scrub: 0.6 } }
            );
          });

          // 3. Pinned UI-card stack that fans out / explodes in 3D with scroll progress.
          const stage = document.querySelector('.lux-stack-stage') as HTMLElement | null;
          if (stage) {
            const cards = gsap.utils.toArray<HTMLElement>(stage.querySelectorAll('.lux-stack-card'));
            const tl = gsap.timeline({
              scrollTrigger: { trigger: stage, start: 'top top+=80', end: desktop ? '+=1200' : '+=500', scrub: 0.8, pin: desktop },
            });
            cards.forEach((c, i) => {
              const mid = (cards.length - 1) / 2;
              const off = i - mid;
              tl.fromTo(
                c,
                { rotateX: 58, rotateZ: -8, z: -i * 30, y: -i * 10, x: 0 },
                { rotateX: 0, rotateZ: off * (desktop ? 4 : 2), z: 0, x: off * (desktop ? 300 : 60), y: Math.abs(off) * 18, ease: 'power2.inOut' },
                0
              );
            });
            tl.to(stage.querySelector('.lux-stack-inner'), { rotateY: desktop ? -10 : 0, ease: 'none' }, 0);
          }

          // 4. Depth shift on section transitions: blocks settle from a slight tilt/scale as they arrive.
          if (desktop) {
            gsap.utils.toArray<HTMLElement>('.lux-depth').forEach((el) => {
              gsap.fromTo(
                el,
                { rotateX: 7, scale: 0.95, transformPerspective: 1400, transformOrigin: '50% 0%' },
                { rotateX: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 45%', scrub: 0.6 } }
              );
            });
          }

          // 6. Page-title depth: page heads recede (tilt back + push in z) as you scroll past them.
          gsap.utils.toArray<HTMLElement>('.lux-page-head').forEach((head) => {
            gsap.to(head, {
              rotateX: desktop ? 12 : 5, z: desktop ? -90 : -30, autoAlpha: 0.35, transformPerspective: 1000, transformOrigin: '50% 100%', ease: 'none',
              scrollTrigger: { trigger: head, start: 'top top+=64', end: 'bottom top', scrub: true },
            });
          });

          // 7. Flip-in rows (FAQ answers): each row hinges up from a 3D tilt as it enters.
          gsap.utils.toArray<HTMLElement>('.lux-flip').forEach((row, i) => {
            gsap.fromTo(row, { rotateX: desktop ? -24 : -10, transformPerspective: 900, transformOrigin: '50% 0%', y: 16 },
              { rotateX: 0, y: 0, ease: 'none', scrollTrigger: { trigger: row, start: 'top bottom-=20', end: 'top 70%', scrub: 0.5 } });
          });

          // 8. Pointer tilt (desktop mouse only): cards lean toward the cursor, max 4deg.
          const cleanups: Array<() => void> = [];
          if (desktop && window.matchMedia('(pointer: fine)').matches) {
            gsap.utils.toArray<HTMLElement>('.lux-tilt, [class*="channel-"]').forEach((card) => {
              const rx = gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power3.out' });
              const ry = gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power3.out' });
              gsap.set(card, { transformPerspective: 900 });
              const move = (e: PointerEvent) => {
                const r = card.getBoundingClientRect();
                ry(((e.clientX - r.left) / r.width - 0.5) * 8);
                rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
              };
              const leave = () => { rx(0); ry(0); };
              card.addEventListener('pointermove', move);
              card.addEventListener('pointerleave', leave);
              cleanups.push(() => { card.removeEventListener('pointermove', move); card.removeEventListener('pointerleave', leave); });
            });
          }

          // 9. Footer settles up from depth at the end of every page.
          const footer = document.querySelector('footer');
          if (footer && desktop) {
            gsap.fromTo(footer, { rotateX: 10, transformPerspective: 1400, transformOrigin: '50% 100%' },
              { rotateX: 0, ease: 'none', scrollTrigger: { trigger: footer, start: 'top bottom', end: 'top 60%', scrub: 0.6 } });
          }
          ScrollTrigger.refresh();
          return () => cleanups.forEach((fn) => fn());
        }
      );
    }, 120);
    return () => {
      window.clearTimeout(id);
      mm.revert();
    };
  }, [pathname]);
  return null;
}
