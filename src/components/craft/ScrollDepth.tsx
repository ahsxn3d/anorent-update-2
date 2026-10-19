'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/**
 * Scroll motion system. One owner per element, transform + opacity only.
 *
 *  data-fx="rise"      block settles from a shallow 3D tilt (scrubbed, start/end clamped)
 *  data-fx="screen"    large surface rises like a screen tilting up (scrubbed)
 *  data-fx="cards"     container; its [data-fx-item] children hinge in (ScrollTrigger.batch, once)
 *  data-fx="media"     frame clip-reveals once; its [data-fx-inner] gets an 8% depth parallax (scrubbed)
 *  data-fx="hpin"      pinned horizontal track (desktop only); [data-fx-track], [data-fx-progress], [data-fx-panel]
 *  data-fx="recede"    element tilts back into depth as it leaves the top (scrubbed)
 *  data-fx="bg"        background layer drifts slower than the page (scrubbed)
 *
 * Lenis drives ScrollTrigger.update (see SmoothScroll). Everything is created inside gsap.matchMedia,
 * so it is reverted on route change / unmount and never runs for reduced motion.
 */
export function ScrollDepth() {
  const pathname = usePathname();

  useEffect(() => {
    const mm = gsap.matchMedia();
    let refreshTimer = 0;
    const refresh = () => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    };

    // Build triggers once the first screen has painted and the main thread is idle (keeps LCP and TBT low).
    let idle = 0;
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const start = window.setTimeout(() => {
      const build = () => mm.add(
        {
          desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
          tablet: '(min-width: 768px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)',
          mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
        },
        (ctx) => {
          const { desktop, mobile } = ctx.conditions as { desktop: boolean; tablet: boolean; mobile: boolean };
          const k = mobile ? 0.45 : 1; // lighter angles / distances on phones
          // Elements already on screen when the page opens are left alone: no entrance, nothing hidden at load.
          const firstScreen = (el: Element) => el.getBoundingClientRect().top + window.scrollY < window.innerHeight * 0.92;
          const q = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel);

          // Background layers (hero grid): slower drift = depth. Media only, never text.
          q('[data-fx="bg"]').forEach((el) => {
            gsap.to(el, {
              yPercent: 18 * k,
              ease: 'none',
              scrollTrigger: { trigger: el.parentElement, start: 'top top', end: 'bottom top', scrub: true },
            });
          });

          // Recede: a block tilts back in z as it scrolls off the top (hero services strip).
          q('[data-fx="recede"]').forEach((el) => {
            gsap.fromTo(
              el,
              { rotateX: 0, z: 0, transformPerspective: 1000, transformOrigin: '50% 100%' },
              {
                rotateX: 16 * k, z: -80 * k, opacity: 0.4, ease: 'none',
                scrollTrigger: { trigger: el, start: 'top 55%', end: 'bottom top', scrub: true },
              },
            );
          });

          // Rise: shallow 3D settle for section blocks and headers.
          q('[data-fx="rise"]').forEach((el) => {
            if (firstScreen(el)) return;
            gsap.fromTo(
              el,
              { rotateX: 9 * k, y: 56 * k, opacity: 0, transformPerspective: 1200, transformOrigin: '50% 0%' },
              {
                rotateX: 0, y: 0, opacity: 1, ease: 'none',
                scrollTrigger: { trigger: el, start: 'clamp(top 96%)', end: 'clamp(top 76%)', scrub: 0.6 },
              },
            );
          });

          // Screen: big surfaces (carousel, before/after, playground) tilt up like a monitor.
          q('[data-fx="screen"]').forEach((el) => {
            if (firstScreen(el)) return;
            gsap.fromTo(
              el,
              { rotateX: 22 * k, scale: 0.9, y: 40 * k, opacity: 0, transformPerspective: 1600, transformOrigin: '50% 100%' },
              {
                rotateX: 0, scale: 1, y: 0, opacity: 1, ease: 'none',
                scrollTrigger: { trigger: el, start: 'clamp(top bottom)', end: 'clamp(top 55%)', scrub: 0.8 },
              },
            );
          });

          // Cards: hinge in from a 3D flip, batched per row, once. clearProps hands transform back to CSS.
          q('[data-fx="cards"]').forEach((group) => {
            if (desktop && group.closest('[data-fx="hpin"]')) return; // the pin owns these panels on desktop
            const items = gsap.utils.toArray<HTMLElement>(group.querySelectorAll('[data-fx-item]'));
            if (!items.length) return;
            gsap.set(items, { rotateX: -38 * k, y: 40 * k, opacity: 0, transformPerspective: 1000, transformOrigin: '50% 0%' });
            ScrollTrigger.batch(items, {
              start: 'top 92%',
              once: true,
              onEnter: (batch) =>
                gsap.to(batch, {
                  rotateX: 0, y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08,
                  overwrite: true, clearProps: 'transform,opacity',
                }),
            });
          });

          // Media: clip-path reveal once, plus 8% depth parallax on the inner layer.
          q('[data-fx="media"]').forEach((frame) => {
            gsap.fromTo(
              frame,
              { clipPath: 'inset(14% 10% 14% 10% round 16px)' },
              {
                clipPath: 'inset(0% 0% 0% 0% round 16px)', duration: 1.2, ease: 'power3.out',
                scrollTrigger: { trigger: frame, start: 'top 88%', once: true },
                clearProps: 'clipPath',
              },
            );
            const inner = frame.querySelector('[data-fx-inner]');
            if (inner) {
              gsap.fromTo(
                inner,
                { yPercent: -8 * k, scale: 1.18 },
                {
                  yPercent: 8 * k, scale: 1.18, ease: 'none',
                  scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
                },
              );
            }
          });

          // Horizontal pin (desktop only): track slides left, panels swing in on Y, progress line fills.
          if (desktop) {
            q('[data-fx="hpin"]').forEach((section) => {
              const track = section.querySelector<HTMLElement>('[data-fx-track]');
              if (!track) return;
              const distance = () => Math.max(0, track.scrollWidth - section.clientWidth);
              if (distance() < 40) return;
              // Centre the pinned block in the space under the 72px nav when it fits, else pin under the nav.
              const pinStart = () => (section.offsetHeight > window.innerHeight - 72 ? 'top top+=72' : 'center center+=36');
              const tween = gsap.to(track, {
                x: () => -distance(),
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: pinStart,
                  end: () => `+=${distance()}`,
                  pin: true,
                  pinSpacing: true,
                  pinType: 'transform', // no fixed/static flip, so no layout shift; Lenis keeps it in lockstep
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              });
              const bar = section.querySelector('[data-fx-progress]');
              if (bar) {
                gsap.fromTo(bar, { scaleX: 0 }, {
                  scaleX: 1, ease: 'none', transformOrigin: '0% 50%',
                  scrollTrigger: { trigger: section, start: pinStart, end: () => `+=${distance()}`, scrub: true, invalidateOnRefresh: true },
                });
              }
              gsap.utils.toArray<HTMLElement>(section.querySelectorAll('[data-fx-panel]')).forEach((panel, i) => {
                if (i === 0) return;
                gsap.fromTo(
                  panel,
                  { rotateY: -28, z: -120, opacity: 0, transformPerspective: 1400, transformOrigin: '0% 50%' },
                  {
                    rotateY: 0, z: 0, opacity: 1, ease: 'none',
                    scrollTrigger: { trigger: panel, containerAnimation: tween, start: 'left 95%', end: 'left 55%', scrub: true },
                  },
                );
              });
            });
          }

          ScrollTrigger.refresh();
        },
      );
      if (ric) idle = ric(build, { timeout: 700 });
      else build();
    }, 60);

    // Keep trigger positions honest: refresh after fonts, images and any height change (accordions, filters).
    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener('load', refresh);
    const imgs = Array.from(document.querySelectorAll('main img')) as HTMLImageElement[];
    imgs.forEach((img) => { if (!img.complete) img.addEventListener('load', refresh, { once: true }); });
    let lastH = document.body.scrollHeight;
    const ro = new ResizeObserver(() => {
      const h = document.body.scrollHeight;
      if (Math.abs(h - lastH) > 4) { lastH = h; refresh(); }
    });
    const mainEl = document.querySelector('main');
    if (mainEl) ro.observe(mainEl);

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(refreshTimer);
      const cic = (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
      if (idle && cic) cic(idle);
      window.removeEventListener('load', refresh);
      ro.disconnect();
      mm.revert();
    };
  }, [pathname]);

  return null;
}
