/**
 * GSAP + ScrollTrigger are loaded on demand (after first paint), never in the
 * initial bundle. Every scroll scene awaits this single shared promise.
 */
type GsapBundle = {
  gsap: typeof import('gsap').gsap;
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
};

let pending: Promise<GsapBundle> | null = null;

export function loadGsap(): Promise<GsapBundle> {
  if (!pending) {
    pending = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([g, st]) => {
      g.gsap.registerPlugin(st.ScrollTrigger);
      return { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger };
    });
  }
  return pending;
}

/** Resolve after the browser is idle (or a timeout), so heavy work never competes with first paint. */
export function whenIdle(timeout = 1200): Promise<void> {
  return new Promise((resolve) => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const go = () => (w.requestIdleCallback ? w.requestIdleCallback(() => resolve(), { timeout }) : window.setTimeout(resolve, 200));
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go, { once: true });
  });
}

/**
 * Resolve on the first sign of intent to move (scroll, wheel, touch, key, pointer down).
 * Scroll choreography is only needed once the visitor starts scrolling, so the
 * 70 KB animation runtime stays off the critical path entirely.
 */
export function whenInteract(): Promise<void> {
  return new Promise((resolve) => {
    if (window.scrollY > 0) return resolve();
    const evs = ['scroll', 'wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
    const go = () => {
      evs.forEach((e) => window.removeEventListener(e, go));
      resolve();
    };
    evs.forEach((e) => window.addEventListener(e, go, { passive: true, once: true }));
  });
}
