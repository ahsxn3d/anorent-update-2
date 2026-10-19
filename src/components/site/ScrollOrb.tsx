'use client';

import React, { useEffect, useRef } from 'react';
import { loadGsap, whenIdle, whenSettled } from './gsap';
import { lenisInstance, scrollHooks } from '../SmoothScroll';

/**
 * Homepage orb: one liquid WebGL object that has a job in every chapter.
 *   hero       focal object, leans toward the cursor, headline sits beside it
 *   process    rides the coral progress line (pinned) and docks on the active stage
 *   statement  a reading lens: words light up as it passes over them
 *   services   selector: docks behind the hovered / scroll-active service, tinted to it
 *   work       cursor lens over a case ("Inspect"), tinted to the project's own colours
 *   reviews    rides the reviews progress rail
 *   cta        becomes the CTA: magnetic, grows on hover (a real <button> sits on top of it)
 *   footer     rests, small, beside the wordmark
 *
 * Rules: one layer, its only transform driver is this loop; the loop runs on the shared
 * ticker (right after Lenis when Lenis runs, so pinned/cursor modes never lag a frame).
 * Positions are document-space for anything attached to content (the orb then scrolls
 * natively with it, no sync jitter on touch) and viewport-space only for pinned rails and
 * the cursor. All geometry is cached on resize/refresh; the frame loop never reads layout.
 * Section "activation" is class toggles (on change only). No CSS filters anywhere.
 * Fallbacks: low-end / no WebGL = gradient orb on the same path; reduced motion = still
 * orb in the hero, every chapter fully lit, the CTA keeps its own static orb.
 */
const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

const FRAG = `precision mediump float;
uniform vec2 uR;uniform float uT;uniform vec2 uM;uniform float uS;uniform float uH;uniform float uV;
uniform float uK;uniform vec3 uC;uniform float uA;uniform float uG;uniform float uQ;
float F(vec2 p){
  float f=0.;
  float spread=mix(.78+.32*uS,.2,uK);
  for(int i=0;i<5;i++){
    float k=float(i);
    vec2 c=vec2(sin(uT*.23+k*1.7),cos(uT*.19+k*2.4))*vec2(.2,.15)*spread*(1.+.25*sin(uT*.17+k*1.1));
    c+=uM*(.025+.015*k)*(1.-.6*uK);
    c.y+=uV*.05*sin(k*2.1+uT);
    float r=.13+.04*sin(uT*.41+k*1.9);
    vec2 d=p-c;f+=r*r/(dot(d,d)+.0001);
  }
  return f;
}
float H(vec2 p){return sqrt(clamp(1.-1./F(p),0.,1.))*.24;}
void main(){
  vec2 uv0=(gl_FragCoord.xy-.5*uR)/uR.y;
  vec2 uv=uv0*1.18;
  float a=uT*.05+uS*2.2;uv*=mat2(cos(a),-sin(a),sin(a),cos(a));
  float f=F(uv);
  float e=.016;
  float hx=(H(uv+vec2(e,0.))-H(uv-vec2(e,0.)))/(2.*e);
  float hy=(H(uv+vec2(0.,e))-H(uv-vec2(0.,e)))/(2.*e);
  vec3 n=normalize(vec3(-hx,-hy,1.));
  float fr=pow(1.-n.z,1.3);
  vec3 cob=vec3(.090,.251,.663),nig=vec3(.063,.090,.294),tea=vec3(.267,.773,.671),cor=vec3(1.,.42,.298),cre=vec3(1.,.992,.886),sky=vec3(.694,.843,.929);
  float lit=clamp(.55+.45*n.y-.2*n.x,0.,1.);
  vec3 col=mix(nig*.85,cob*1.08,lit);
  col=mix(col,mix(uC*.35,uC*1.05,lit),uA);
  float hA=smoothstep(.35,1.,uH);
  float side=.5+.5*sin(atan(n.y,n.x)+uT*.21+uH*3.);
  vec3 rimA=mix(tea,cor,smoothstep(.25,.85,side));
  vec3 rimB=mix(cor,mix(cor,cre,.55),smoothstep(.3,.9,side));
  vec3 rim=mix(mix(rimA,rimB,hA),mix(uC,cre,.45),uA*.6);
  col=mix(col,rim,clamp(fr*(2.2+.8*hA+uG),0.,1.));
  vec3 l=normalize(vec3(-.5,.65,.6));
  float dif=max(dot(n,l),0.);
  col*=.75+.35*dif;
  float sp=pow(max(dot(reflect(-l,n),vec3(0.,0.,1.)),0.),14.)*smoothstep(.2,.7,fr+.15);
  col+=cre*sp*(.55+.3*uG)+sky*pow(fr,4.)*.2+mix(sky,cre,.4)*pow(max(dot(n,normalize(vec3(-.4,.55,.75))),0.),18.)*.42;
  float body=smoothstep(.9,1.35,f);
  float halo=smoothstep(.12,1.,f)*(.3+.25*uG)*uQ;
  vec3 hc=mix(mix(mix(tea,cob,.5),mix(cor,cob,.35),hA),uC,uA*.7);
  float al=body+halo*(1.-body);
  vec3 c=(col*body+hc*halo*(1.-body))/max(al,.001);
  al*=.94*smoothstep(.5,.36,length(uv0));
  gl_FragColor=vec4(c*al,al);
}`;

type V3 = [number, number, number];
type Box = { l: number; t: number; w: number; h: number };
type Mode = 'hero' | 'process' | 'statement' | 'services' | 'work' | 'reviews' | 'cta' | 'footer';
type Target = { x: number; y: number; d: number; view: boolean; k: number; c: number; h: number; tint: V3; ta: number; g: number; label: number; q: number };

const NONE: V3 = [0, 0, 0];
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (t: number) => t * t * (3 - 2 * t);
const docBox = (el: Element | null, sy: number): Box | null => {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { l: r.left, t: r.top + sy, w: r.width, h: r.height };
};
const rgb = (s: string | undefined): V3 | null => {
  if (!s) return null;
  const v = s.trim().split(/\s+/).map(Number);
  return v.length === 3 && v.every((n) => !Number.isNaN(n)) ? [v[0] / 255, v[1] / 255, v[2] / 255] : null;
};
/** average colour of a loaded image, pushed to a vivid cue */
const tintOf = (img: HTMLImageElement | null): V3 | null => {
  if (!img || !img.complete || !img.naturalWidth) return null;
  try {
    const c = document.createElement('canvas');
    c.width = c.height = 6;
    const x = c.getContext('2d', { willReadFrequently: true });
    if (!x) return null;
    x.drawImage(img, 0, 0, 6, 6);
    const d = x.getImageData(0, 0, 6, 6).data;
    let r = 0, g = 0, b = 0;
    for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; b += d[i + 2]; }
    const n = d.length / 4;
    let v: V3 = [r / n / 255, g / n / 255, b / n / 255];
    const m = (v[0] + v[1] + v[2]) / 3;
    v = v.map((k) => clamp01((k - m) * 2.2 + m)) as V3;
    const mx = Math.max(v[0], v[1], v[2], 0.01);
    return v.map((k) => clamp01((k / mx) * 0.95)) as V3;
  } catch {
    return null;
  }
};

export const ScrollOrb: React.FC = () => {
  const wrap = useRef<HTMLDivElement>(null);
  const cvs = useRef<HTMLCanvasElement>(null);
  const lab = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = wrap.current;
    const canvas = cvs.current;
    const label = lab.current;
    const home = host?.closest<HTMLElement>('.ah-home');
    if (!host || !canvas || !label || !home) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const lowEnd = (nav.hardwareConcurrency || 8) <= 2 || (nav.deviceMemory || 8) <= 2 || !!nav.connection?.saveData;
    if (reduce) host.classList.add('is-static');

    let dead = false;
    let stop = () => {};

    whenIdle(1500).then(() => {
      if (dead) return;

      /* ------------------------------ shader ------------------------------ */
      let gl: WebGLRenderingContext | null = null;
      let U: Record<string, WebGLUniformLocation | null> = {};
      if (!lowEnd) {
        gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true, powerPreference: 'low-power', depth: false, stencil: false });
        if (gl) {
          const g = gl;
          const sh = (type: number, src: string) => {
            const s = g.createShader(type)!;
            g.shaderSource(s, src);
            g.compileShader(s);
            return s;
          };
          const prog = g.createProgram()!;
          g.attachShader(prog, sh(g.VERTEX_SHADER, VERT));
          g.attachShader(prog, sh(g.FRAGMENT_SHADER, FRAG));
          g.linkProgram(prog);
          if (!g.getProgramParameter(prog, g.LINK_STATUS)) gl = null;
          else {
            g.useProgram(prog);
            const buf = g.createBuffer();
            g.bindBuffer(g.ARRAY_BUFFER, buf);
            g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), g.STATIC_DRAW);
            const loc = g.getAttribLocation(prog, 'p');
            g.enableVertexAttribArray(loc);
            g.vertexAttribPointer(loc, 2, g.FLOAT, false, 0, 0);
            U = Object.fromEntries(['uR', 'uT', 'uM', 'uS', 'uH', 'uV', 'uK', 'uC', 'uA', 'uG', 'uQ'].map((n) => [n, g.getUniformLocation(prog, n)]));
          }
        }
      }

      /* ----------------------------- geometry ----------------------------- */
      const q = <T extends Element>(s: string) => home.querySelector<T>(s);
      const qa = <T extends Element>(s: string) => Array.from(home.querySelectorAll<T>(s));
      let vw = 0, vh = 0, side = 1, res = 0, mobile = false, homeTop = 0;
      // section tops (doc) in page order
      let order: Array<[Mode, number]> = [];
      let hero: Box | null = null;
      // process
      let pTrack: Box | null = null, pPinH = 0, pRuleOff = 0, pRuleL = 0, pRuleW = 1, pinned = false;
      let pDocks: Array<{ x: number; y: number }> = [];
      let pSteps: HTMLElement[] = [];
      let pFill: HTMLElement | null = null;
      // statement
      let words: HTMLElement[] = [];
      let wPos: Array<{ x: number; y: number }> = [];
      let wTop = 0, wH = 1, wLine = 60;
      // services
      let sRows: HTMLElement[] = [];
      let sBox: Box[] = [];
      let sTint: V3[] = [];
      // work
      let cases: HTMLElement[] = [];
      let cFrame: Box[] = [];
      const cTint: Array<V3 | null | undefined> = [];
      // reviews
      let rTrack: Box | null = null, rStageH = 0, rRailOff = 0, rRailH = 0, rRailX = 0, rPinned = false;
      let rQuotes: Box[] = [];
      // cta + footer
      let ctaBtn = null as HTMLElement | null;
      let cta: Box | null = null, foot: Box | null = null, footTop = Infinity;

      const measure = () => {
        vw = window.innerWidth;
        vh = window.innerHeight;
        mobile = vw < 900;
        const sy = window.scrollY;
        homeTop = home.getBoundingClientRect().top + sy;
        side = mobile ? Math.min(vw * 0.98, vh * 0.62) : Math.min(vh * 0.86, vw * 0.56);
        host.style.width = host.style.height = `${Math.round(side)}px`;
        const nr = Math.round(Math.min(mobile ? 240 : 400, side * (mobile ? 0.42 : 0.5)));
        if (gl && nr !== res) {
          res = nr;
          canvas.width = canvas.height = res;
          gl.viewport(0, 0, res, res);
        }
        hero = docBox(q('.ah-hero'), sy);
        const top = (s: string) => docBox(q(s), sy)?.t;
        const o: Array<[Mode, number | undefined]> = [
          ['process', top('.ah-process')],
          ['statement', top('.ah-statement')],
          ['services', top('.ah-services')],
          ['work', top('.ah-work')],
          ['reviews', top('.ah-reviews')],
          ['cta', top('.ah-cta')],
        ];
        order = o.filter((e): e is [Mode, number] => typeof e[1] === 'number');

        // process: the pin is sticky, so everything inside it is measured relative to the pin
        const track = q<HTMLElement>('.ah-process-track');
        const pin = q<HTMLElement>('.ah-process-pin');
        const rule = q<HTMLElement>('.ah-steps-rule');
        pFill = q<HTMLElement>('.ah-steps-fill');
        pSteps = qa<HTMLElement>('.ah-step');
        pTrack = docBox(track, sy);
        pinned = !!pin && getComputedStyle(pin).position === 'sticky';
        if (pin && rule && pTrack) {
          const pr = pin.getBoundingClientRect();
          const rr = rule.getBoundingClientRect();
          pPinH = pr.height;
          pRuleOff = rr.top - pr.top;
          pRuleL = rr.left;
          pRuleW = Math.max(1, rr.width);
          pDocks = pSteps.map((li) => {
            const n = li.querySelector('.ah-step-num') || li;
            const b = n.getBoundingClientRect();
            return { x: b.left + Math.min(b.width, 80) * 0.5, y: b.top + sy + b.height * 0.5 };
          });
        }

        // statement: every word's centre (doc)
        words = qa<HTMLElement>('.ah-word');
        wPos = words.map((w) => {
          const b = w.getBoundingClientRect();
          return { x: b.left + b.width / 2, y: b.top + sy + b.height / 2 };
        });
        const st = docBox(q('.ah-statement-text'), sy);
        if (st) {
          wTop = st.t;
          wH = Math.max(1, st.h);
        }
        wLine = words[0] ? words[0].getBoundingClientRect().height : 60;

        // services rows (li are not transformed: safe to measure any time)
        sRows = qa<HTMLElement>('.ah-service');
        sBox = sRows.map((r) => docBox(r, sy)!);
        sTint = sRows.map((r) => rgb(r.dataset.tint) || [0.09, 0.25, 0.66]);

        // work: the frame is 16:9 across .ah-case-main (the frame itself is transformed)
        cases = qa<HTMLElement>('.ah-case');
        cFrame = cases.map((c) => {
          const m = docBox(c.querySelector('.ah-case-main'), sy)!;
          return { l: m.l, t: m.t, w: m.w, h: (m.w * 9) / 16 };
        });

        // reviews rail (sticky stage on desktop)
        const rt = q<HTMLElement>('.ah-reviews-track');
        const stage = q<HTMLElement>('.ah-reviews-stage');
        const rail = q<HTMLElement>('.ah-reviews-rail');
        rTrack = docBox(rt, sy);
        rPinned = !!stage && getComputedStyle(stage).position === 'sticky';
        if (stage && rail && rPinned) {
          const sr = stage.getBoundingClientRect();
          const rr = rail.getBoundingClientRect();
          rStageH = sr.height;
          rRailOff = rr.top - sr.top;
          rRailH = rr.height;
          rRailX = rr.left + rr.width / 2;
        }
        rQuotes = qa<HTMLElement>('.ah-reviews-head, .ah-quote').map((e) => docBox(e, sy)!);

        ctaBtn = q<HTMLElement>('.ah-cta-orb');
        cta = docBox(ctaBtn, sy);
        const fm = document.querySelector('.ah-footer-mark');
        foot = docBox(fm, sy);
        footTop = docBox(document.querySelector('.ah-footer'), sy)?.t ?? Infinity;
      };
      measure();

      /* ------------------------------ input ------------------------------- */
      const mouse = { x: 0, y: 0, in: false, sx: 0, sy: 0 };
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.in = true;
      };
      const onOut = (e: PointerEvent) => {
        if (!e.relatedTarget) mouse.in = false;
      };
      const onBlur = () => (mouse.in = false);
      if (fine) {
        document.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerout', onOut, { passive: true });
        window.addEventListener('blur', onBlur);
      }
      // services: hover / keyboard focus selects a row (a real button)
      let sHover = -1;
      const list = q<HTMLElement>('.ah-service-list');
      const rowOf = (t: EventTarget | null) => sRows.indexOf((t as Element | null)?.closest?.('.ah-service') as HTMLElement);
      const onSOver = (e: PointerEvent) => {
        if (e.pointerType === 'mouse') sHover = rowOf(e.target);
      };
      const onSLeave = () => (sHover = -1);
      const onSFocus = (e: FocusEvent) => (sHover = rowOf(e.target));
      list?.addEventListener('pointerover', onSOver);
      list?.addEventListener('pointerleave', onSLeave);
      list?.addEventListener('focusin', onSFocus);
      list?.addEventListener('focusout', onSLeave);
      let ctaFocus = false;
      const onCF = () => (ctaFocus = true);
      const onCB = () => (ctaFocus = false);
      ctaBtn?.addEventListener('focus', onCF);
      ctaBtn?.addEventListener('blur', onCB);

      /* ---------------------------- activation ---------------------------- */
      let mode: Mode | '' = '';
      let pActive = -2, sActive = -2, cActive = -2, lit = -1;
      const hot = new Set<number>();
      let lastFill = -1;
      const setMode = (m: Mode) => {
        if (m === mode) return;
        mode = m;
        home.dataset.orbMode = m;
      };
      const toggleIdx = (els: HTMLElement[], prev: number, next: number, cls: string) => {
        if (prev === next) return next;
        if (prev >= 0 && els[prev]) els[prev].classList.remove(cls);
        if (next >= 0 && els[next]) els[next].classList.add(cls);
        return next;
      };
      const setLit = (n: number) => {
        if (n === lit) return;
        const a = Math.min(lit, n), b = Math.max(lit, n);
        for (let i = Math.max(0, a); i < b && i < words.length; i++) words[i].classList.toggle('is-lit', i < n);
        lit = n;
      };
      const setHot = (head: number) => {
        const want = new Set<number>();
        if (head >= 0) for (let i = Math.floor(head - 1); i <= Math.ceil(head + 1); i++) if (i >= 0 && i < words.length && Math.abs(i - head) < 1.6) want.add(i);
        hot.forEach((i) => { if (!want.has(i)) { words[i]?.classList.remove('is-hot'); hot.delete(i); } });
        want.forEach((i) => { if (!hot.has(i)) { words[i]?.classList.add('is-hot'); hot.add(i); } });
      };
      let labelText = '';
      const setLabel = (t: string) => {
        if (t !== labelText) {
          labelText = t;
          label.firstElementChild!.textContent = t;
        }
      };
      // tints are sampled once per project, off the scroll path
      const wantTint = (i: number) => {
        if (cTint[i] !== undefined || !cases[i]) return;
        cTint[i] = null; // pending
        const run = () => {
          // image not decoded yet: forget, so a later frame asks again
          cTint[i] = tintOf(cases[i]?.querySelector('img') ?? null) ?? undefined;
        };
        const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
        if (w.requestIdleCallback) w.requestIdleCallback(run, { timeout: 600 });
        else window.setTimeout(run, 60);
      };

      /* ------------------------------ targets ----------------------------- */
      // diameter (px) of the compact orb -> host scale. A compact blob fills ~57% of the canvas.
      const sc = (d: number, c: number) => d / (side * (0.57 + 0.25 * (1 - c)));
      const nearest = (n: number, at: (i: number) => number, probe: number) => {
        let best = -1, bd = Infinity;
        for (let i = 0; i < n; i++) {
          const d = Math.abs(at(i) - probe);
          if (d < bd) { bd = d; best = i; }
        }
        return best;
      };
      const T: Target = { x: 0, y: 0, d: 0, view: false, k: 0.14, c: 0, h: 0, tint: NONE, ta: 0, g: 0, label: 0, q: 1 };
      const targetFor = (y: number): Target => {
        const probe = y + vh * 0.5;
        let m: Mode = 'hero';
        for (const [name, t] of order) if (probe >= t) m = name;
        if (footTop < y + vh * 0.6) m = 'footer';
        setMode(m);
        Object.assign(T, { view: false, k: 0.14, c: 1, h: 0, tint: NONE, ta: 0, g: 0, label: 0, q: 1 });
        let pIdx = -1, sIdx = -1, cIdx = -1, fill = -1;

        if (m === 'hero' && hero) {
          T.c = 0;
          T.x = vw * (mobile ? 0.5 : 0.74);
          T.y = hero.t + hero.h * (mobile ? 0.34 : 0.5);
          T.d = -1; // hero uses a direct scale
          if (fine && mouse.in) {
            const cx = T.x, cy = T.y - y;
            const dx = mouse.x - cx, dy = mouse.y - cy;
            const near = clamp01(1 - Math.hypot(dx, dy) / (side * 0.7));
            T.x += Math.max(-36, Math.min(36, dx * 0.05));
            T.y += Math.max(-36, Math.min(36, dy * 0.05));
            T.g = near;
          }
        } else if (m === 'process' && pTrack && pDocks.length) {
          T.h = 0.3;
          T.d = mobile ? 54 : 84;
          T.g = 0.5;
          if (pinned && !mobile) {
            const span = Math.max(1, pTrack.h - pPinH);
            const pinTop = pTrack.t - y + Math.min(Math.max(y - pTrack.t, 0), span);
            const p = clamp01((y - pTrack.t) / span);
            const n = pDocks.length;
            const f = Math.min(n - 1e-4, p * n);
            const i = Math.floor(f);
            // dwell on a stage, then glide to the next in the last 35% of its share
            const t = smooth(clamp01((f - i - 0.65) / 0.35));
            const j = Math.min(n - 1, i + 1);
            T.view = true;
            T.k = 0.22;
            T.x = pDocks[i].x + (pDocks[j].x - pDocks[i].x) * (i === j ? 0 : t);
            T.y = pinTop + pRuleOff;
            pIdx = t > 0.5 && i !== j ? j : i;
            fill = clamp01((T.x - pRuleL) / pRuleW);
          } else {
            pIdx = nearest(pDocks.length, (i) => pDocks[i].y, y + vh * 0.42);
            T.x = pDocks[pIdx].x;
            T.y = pDocks[pIdx].y;
            fill = (pIdx + 1) / pDocks.length;
          }
        } else if (m === 'statement' && wPos.length) {
          const p = clamp01((y + vh * 0.62 - wTop) / wH);
          const head = p * (wPos.length - 1);
          const i = Math.floor(head), j = Math.min(wPos.length - 1, i + 1), f = head - i;
          T.x = wPos[i].x + (wPos[j].x - wPos[i].x) * f;
          T.y = wPos[i].y + (wPos[j].y - wPos[i].y) * f;
          T.d = wLine * (mobile ? 1.5 : 1.7);
          T.h = 0.45;
          T.g = 0.8;
          T.k = 0.2;
          setLit(Math.ceil(head + 0.01));
          setHot(head);
        } else if (m === 'services' && sBox.length) {
          sIdx = sHover >= 0 ? sHover : nearest(sBox.length, (i) => sBox[i].t + sBox[i].h / 2, probe);
          const b = sBox[sIdx];
          T.x = b.l + b.w * (mobile ? 0.74 : 0.4);
          T.y = b.t + b.h / 2;
          T.d = b.h * (mobile ? 1.15 : 1.45);
          T.c = 0.85;
          T.tint = sTint[sIdx];
          T.ta = 0.85;
          T.g = sHover >= 0 ? 1 : 0.4;
          T.k = 0.16;
          T.q = 0.2; // a dark halo reads as a smudge on the cream sheet
        } else if (m === 'work' && cFrame.length) {
          cIdx = nearest(cFrame.length, (i) => cFrame[i].t + cFrame[i].h / 2, probe);
          let over = -1;
          if (fine && mouse.in && !mobile) {
            const my = mouse.y + y;
            over = cFrame.findIndex((b) => mouse.x >= b.l && mouse.x <= b.l + b.w && my >= b.t && my <= b.t + b.h);
          }
          if (over >= 0) cIdx = over;
          wantTint(cIdx);
          const tint = cTint[cIdx];
          T.tint = tint || [1, 0.42, 0.3];
          T.ta = 0.9;
          if (over >= 0) {
            T.view = true;
            T.k = 0.3;
            T.x = mouse.x;
            T.y = mouse.y;
            T.d = 132;
            T.g = 1;
            T.label = 1;
            setLabel('Inspect');
          } else {
            const b = cFrame[cIdx];
            T.x = b.l + b.w - (mobile ? 34 : 64);
            T.y = b.t + (mobile ? 34 : 64);
            T.d = mobile ? 58 : 86;
            T.g = 0.4;
          }
        } else if (m === 'reviews') {
          T.h = 0.55;
          T.tint = [0.69, 0.84, 0.93];
          T.ta = 0.35;
          if (rPinned && rTrack && !mobile) {
            const span = Math.max(1, rTrack.h - rStageH);
            const top = rTrack.t - y + Math.min(Math.max(y - rTrack.t, 0), span);
            const p = clamp01((y - rTrack.t) / span);
            T.view = true;
            T.k = 0.22;
            T.x = rRailX;
            T.y = top + rRailOff + p * rRailH;
            T.d = 46;
          } else if (rQuotes.length) {
            // stacked quotes: a marker beside the quote being read
            const b = rQuotes[nearest(rQuotes.length, (i) => rQuotes[i].t + rQuotes[i].h / 2, y + vh * 0.45)];
            T.x = vw * 0.86;
            T.y = b.t + 28;
            T.d = 56;
          }
        } else if (m === 'cta' && cta) {
          T.c = 0.55;
          T.h = 0.9;
          T.x = cta.l + cta.w / 2;
          T.y = cta.t + cta.h / 2;
          T.d = cta.w;
          T.g = 0.5;
          if (fine && mouse.in) {
            const cy = T.y - y;
            const dx = mouse.x - T.x, dy = mouse.y - cy;
            const dist = Math.hypot(dx, dy);
            const r = cta.w / 2;
            if (dist < r * 1.9) {
              const pull = 1 - dist / (r * 1.9);
              T.x += dx * 0.32 * pull;
              T.y += dy * 0.32 * pull;
              T.k = 0.2;
            }
            if (dist < r) {
              T.d *= 1.14;
              T.g = 1;
            }
          }
          if (ctaFocus) {
            T.d *= 1.1;
            T.g = 1;
          }
        } else if (m === 'footer' && foot) {
          T.x = foot.l + foot.w * (mobile ? 0.9 : 0.955);
          T.y = foot.t + foot.h * 0.12;
          T.d = mobile ? 30 : 44;
          T.h = 0.85;
          T.g = 0.3;
        }

        // activation (class toggles happen only when something changes)
        pActive = toggleIdx(pSteps, pActive, pIdx, 'is-active');
        sActive = toggleIdx(sRows, sActive, sIdx, 'is-orb');
        cActive = toggleIdx(cases, cActive, cIdx, 'is-orb');
        if (m !== 'statement') {
          if (hot.size) setHot(-1);
          if (probe > wTop + wH) setLit(words.length);
          else if (probe < wTop) setLit(0);
        }
        if (pFill) {
          const fv = fill >= 0 ? fill : probe > (pTrack ? pTrack.t + pTrack.h : 0) ? 1 : 0;
          if (Math.abs(fv - lastFill) > 0.0005) {
            pFill.style.transform = `scaleX(${fv.toFixed(4)})`;
            lastFill = fv;
          }
        }
        return T;
      };

      /* ------------------------------ frame ------------------------------- */
      const cur = { x: 0, y: 0, s: 1, c: 0, h: 0, tint: [0, 0, 0] as V3, ta: 0, g: 0, label: 0, q: 1, init: false };
      let tAcc = 8, lastY = window.scrollY, vel = 0, lastNow = performance.now(), frameN = 0, live = false;
      let lastT = '', lastL = '', lastLO = -1;
      const frame = () => {
        if (document.hidden) return;
        const now = performance.now();
        const dt = Math.min(50, now - lastNow);
        lastNow = now;
        const y = lenisInstance ? lenisInstance.animatedScroll : window.scrollY;
        vel += (Math.max(-60, Math.min(60, y - lastY)) - vel) * 0.12;
        lastY = y;
        const t = reduce ? null : targetFor(y);
        let tx: number, ty: number, ts: number;
        if (!t) {
          tx = vw * (mobile ? 0.5 : 0.74);
          ty = hero ? hero.t + hero.h * (mobile ? 0.34 : 0.5) : vh / 2;
          ts = mobile ? 0.9 : 0.86;
        } else {
          tx = t.x;
          ty = t.view ? t.y + y : t.y;
          ts = t.d < 0 ? (mobile ? 0.9 : 0.86) : sc(t.d, t.c);
        }
        const k = cur.init ? 1 - Math.pow(1 - (t ? t.k : 1), dt / 16.7) : 1;
        if (t && t.view) {
          // lerp in viewport space so pinned rails / the cursor never trail the scroll
          const vy = cur.y - y;
          cur.y = vy + (ty - y - vy) * k + y;
        } else cur.y += (ty - cur.y) * k;
        cur.x += (tx - cur.x) * k;
        cur.s += (ts - cur.s) * k;
        const kk = cur.init ? 1 - Math.pow(1 - 0.1, dt / 16.7) : 1;
        if (t) {
          cur.c += (t.c - cur.c) * kk;
          cur.h += (t.h - cur.h) * kk;
          cur.g += (t.g - cur.g) * kk;
          cur.ta += (t.ta - cur.ta) * kk;
          cur.q += (t.q - cur.q) * kk;
          if (t.ta > 0) for (let i = 0; i < 3; i++) cur.tint[i] += (t.tint[i] - cur.tint[i]) * kk;
          cur.label += (t.label - cur.label) * (cur.init ? 1 - Math.pow(1 - 0.2, dt / 16.7) : 1);
        }
        cur.init = true;

        const px = Math.round((cur.x - side / 2) * 10) / 10;
        const py = Math.round((cur.y - homeTop - side / 2) * 10) / 10;
        const tr = `translate3d(${px}px,${py}px,0) scale(${cur.s.toFixed(4)})`;
        if (tr !== lastT) {
          host.style.transform = tr;
          lastT = tr;
        }
        const lo = Math.round(cur.label * 100) / 100;
        if (lo !== lastLO) {
          label.style.opacity = String(lo);
          lastLO = lo;
        }
        if (lo > 0.01) {
          const lt = `scale(${(1 / Math.max(0.05, cur.s)).toFixed(3)})`;
          if (lt !== lastL) {
            label.style.transform = lt;
            lastL = lt;
          }
        }

        if (!gl) return;
        tAcc += dt / 1000;
        frameN++;
        // while scrolling the shader redraws every 3rd frame (mobile idle: every 2nd);
        // the transform above still updates every frame
        const every = Math.abs(vel) > 0.6 ? 3 : mobile ? 2 : 1;
        if (frameN % every) return;
        const mx = fine && mouse.in ? (mouse.x / vw - 0.5) * 2 : 0;
        const my = fine && mouse.in ? -(mouse.y / vh - 0.5) * 2 : 0;
        mouse.sx += (mx - mouse.sx) * 0.08;
        mouse.sy += (my - mouse.sy) * 0.08;
        gl.uniform2f(U.uR, res, res);
        gl.uniform1f(U.uT, tAcc);
        gl.uniform2f(U.uM, mouse.sx, mouse.sy);
        gl.uniform1f(U.uS, Math.min(1, y / Math.max(1, vh * 6)));
        gl.uniform1f(U.uH, cur.h);
        gl.uniform1f(U.uV, vel / 30);
        gl.uniform1f(U.uK, cur.c);
        gl.uniform3f(U.uC, cur.tint[0], cur.tint[1], cur.tint[2]);
        gl.uniform1f(U.uA, cur.ta);
        gl.uniform1f(U.uG, cur.g);
        gl.uniform1f(U.uQ, cur.q);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        if (!live) {
          live = true;
          host.classList.add('is-live');
        }
        if (reduce) stopLoop();
      };
      if (!gl) host.classList.add('is-css');
      home.classList.add('orb-on');
      if (reduce) home.classList.add('orb-static');

      // Own RAF until the scroll runtime arrives; then the shared ticker. When Lenis runs,
      // the orb steps right after Lenis inside the same tick (scrollHooks) so pinned rails
      // and the cursor lens read this frame's scroll, never the previous one.
      let raf = 0, stopped = false, onTicker = false;
      let tick: { remove: (f: () => void) => void } | null = null;
      const tickFrame = () => {
        if (!lenisInstance) frame();
      };
      const hook = () => frame();
      const rafLoop = () => {
        frame();
        if (!onTicker && !stopped) raf = requestAnimationFrame(rafLoop);
      };
      const stopLoop = () => {
        stopped = true;
        cancelAnimationFrame(raf);
        tick?.remove(tickFrame);
        scrollHooks.delete(hook);
      };
      raf = requestAnimationFrame(rafLoop);
      const onRefresh = () => measure();
      let offRefresh = () => {};
      whenSettled()
        .then(loadGsap)
        .then(({ gsap, ScrollTrigger }) => {
          if (dead || stopped) return;
          cancelAnimationFrame(raf);
          onTicker = true;
          tick = gsap.ticker;
          gsap.ticker.add(tickFrame);
          scrollHooks.add(hook);
          ScrollTrigger.addEventListener('refresh', onRefresh);
          offRefresh = () => ScrollTrigger.removeEventListener('refresh', onRefresh);
          measure();
        });

      let rt = 0;
      const onResize = () => {
        window.clearTimeout(rt);
        rt = window.setTimeout(measure, 150);
      };
      window.addEventListener('resize', onResize);
      const ro = new ResizeObserver(onResize);
      ro.observe(document.body);
      if (document.fonts) document.fonts.ready.then(() => !dead && measure());
      host.classList.add('is-on');

      stop = () => {
        stopLoop();
        offRefresh();
        window.removeEventListener('resize', onResize);
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerout', onOut);
        window.removeEventListener('blur', onBlur);
        list?.removeEventListener('pointerover', onSOver);
        list?.removeEventListener('pointerleave', onSLeave);
        list?.removeEventListener('focusin', onSFocus);
        list?.removeEventListener('focusout', onSLeave);
        ctaBtn?.removeEventListener('focus', onCF);
        ctaBtn?.removeEventListener('blur', onCB);
        window.clearTimeout(rt);
        ro.disconnect();
        home.classList.remove('orb-on', 'orb-static');
        delete home.dataset.orbMode;
        gl?.getExtension('WEBGL_lose_context')?.loseContext();
      };
    });

    return () => {
      dead = true;
      stop();
    };
  }, []);

  return (
    <div ref={wrap} className="ah-orb" aria-hidden="true">
      <span className="ah-orb-fallback" />
      <canvas ref={cvs} className="ah-orb-canvas" />
      <span ref={lab} className="ah-orb-label"><span>Inspect</span></span>
    </div>
  );
};
