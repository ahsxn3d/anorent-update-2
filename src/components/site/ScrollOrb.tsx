'use client';

import React, { useEffect, useRef } from 'react';
import { loadGsap, whenIdle } from './gsap';
import { lenisInstance } from '../SmoothScroll';

/**
 * Homepage orb: a liquid metaball shaded as a glossy 3D surface that travels down the page.
 * - One fixed layer. Its only transform driver is this component's frame loop (on gsap.ticker,
 *   the same RAF that drives Lenis + ScrollTrigger), so nothing else ever touches its transform.
 * - Every section that wants the orb marks itself with data-orb="x y scale hue alpha"
 *   (desktop) and optionally data-orb-m="..." (mobile). Anchor scroll positions are measured on
 *   ScrollTrigger refresh / resize only, never inside the frame loop.
 * - Colour, morph and scroll-velocity wobble live in the shader (uniforms), not CSS filters.
 * - Low-end devices (or no WebGL) get the same journey with a gradient orb (no shader, no blur).
 * - Reduced motion: the orb stays in the hero, one still frame.
 */
const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

const FRAG = `precision mediump float;
uniform vec2 uR;uniform float uT;uniform vec2 uM;uniform float uS;uniform float uH;uniform float uV;
float F(vec2 p){
  float f=0.;
  for(int i=0;i<5;i++){
    float k=float(i);
    float spread=.78+.32*uS;
    vec2 c=vec2(sin(uT*.23+k*1.7),cos(uT*.19+k*2.4))*vec2(.2,.15)*spread*(1.+.25*sin(uT*.17+k*1.1));
    c+=uM*(.025+.015*k);
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
  vec3 bodyA=mix(nig*.85,cob*1.08,clamp(.55+.45*n.y-.2*n.x,0.,1.));
  vec3 bodyB=mix(nig*.7,mix(cob,vec3(.36,.16,.52),.55),clamp(.55+.45*n.y-.2*n.x,0.,1.));
  float hA=smoothstep(.35,1.,uH);
  vec3 col=mix(bodyA,bodyB,hA);
  float side=.5+.5*sin(atan(n.y,n.x)+uT*.21+uH*3.);
  vec3 rimA=mix(tea,cor,smoothstep(.25,.85,side));
  vec3 rimB=mix(cor,mix(cor,cre,.55),smoothstep(.3,.9,side));
  col=mix(col,mix(rimA,rimB,hA),clamp(fr*(2.2+.8*hA),0.,1.));
  vec3 l=normalize(vec3(-.5,.65,.6));
  float dif=max(dot(n,l),0.);
  col*=.75+.35*dif;
  float sp=pow(max(dot(reflect(-l,n),vec3(0.,0.,1.)),0.),14.)*smoothstep(.2,.7,fr+.15);
  col+=cre*sp*.55+sky*pow(fr,4.)*.2+mix(sky,cre,.4)*pow(max(dot(n,normalize(vec3(-.4,.55,.75))),0.),18.)*.42;
  float body=smoothstep(.9,1.35,f);
  float halo=smoothstep(.12,1.,f)*.3;
  vec3 hc=mix(mix(tea,cob,.5),mix(cor,cob,.35),hA);
  float al=body+halo*(1.-body);
  vec3 c=(col*body+hc*halo*(1.-body))/max(al,.001);
  al*=.94*smoothstep(.5,.36,length(uv0));
  gl_FragColor=vec4(c*al,al);
}`;

type Pose = { x: number; y: number; s: number; h: number; a: number };
type Anchor = Pose & { at: number };

const parse = (v: string | undefined): Pose | null => {
  if (!v) return null;
  const [x, y, s, h, a] = v.trim().split(/\s+/).map(Number);
  if ([x, y, s, h, a].some((n) => Number.isNaN(n))) return null;
  return { x, y, s, h, a };
};
const smooth = (t: number) => t * t * (3 - 2 * t);

export const ScrollOrb: React.FC = () => {
  const wrap = useRef<HTMLDivElement>(null);
  const cvs = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = wrap.current;
    const canvas = cvs.current;
    if (!host || !canvas) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      host.classList.add('is-static');
    }
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const lowEnd =
      (nav.hardwareConcurrency || 8) <= 2 || (nav.deviceMemory || 8) <= 2 || !!nav.connection?.saveData;

    let dead = false;
    let stop = () => {};

    whenIdle(1500).then(async () => {
      if (dead) return;
      const { gsap, ScrollTrigger } = await loadGsap();
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
            U = Object.fromEntries(['uR', 'uT', 'uM', 'uS', 'uH', 'uV'].map((n) => [n, g.getUniformLocation(prog, n)]));
          }
        }
      }

      /* ----------------------------- geometry ----------------------------- */
      let vw = window.innerWidth, vh = window.innerHeight, side = 1, w = 0, h = 0, mobile = vw < 900;
      let anchors: Anchor[] = [];
      const measure = () => {
        vw = window.innerWidth;
        vh = window.innerHeight;
        mobile = vw < 900;
        side = mobile ? Math.min(vw * 0.98, vh * 0.62) : Math.min(vh * 0.86, vw * 0.56);
        host.style.width = host.style.height = `${Math.round(side)}px`;
        // soft by design: render at reduced resolution, capped (mobile lower still)
        const res = Math.round(Math.min(mobile ? 240 : 400, side * (mobile ? 0.42 : 0.5)));
        if (gl && (res !== w || res !== h)) {
          w = h = res;
          canvas.width = canvas.height = res;
          gl.viewport(0, 0, res, res);
        }
        const sy = window.scrollY;
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
        const list: Anchor[] = [];
        document.querySelectorAll<HTMLElement>('[data-orb]').forEach((el) => {
          const pose = parse((mobile && el.dataset.orbM) || el.dataset.orb);
          if (!pose) return;
          const r = el.getBoundingClientRect();
          const top = r.top + sy;
          // the pose is fully reached when the section top sits at 25% of the viewport
          const at = el.dataset.orbAt === 'top' ? 0 : Math.min(maxScroll, Math.max(0, top - vh * 0.25));
          list.push({ ...pose, at });
        });
        list.sort((p, q) => p.at - q.at);
        // final fade before the footer
        if (list.length) list.push({ ...list[list.length - 1], a: 0, s: list[list.length - 1].s * 0.8, at: maxScroll + 1 });
        anchors = list;
      };
      measure();

      const poseAt = (y: number): Pose => {
        if (!anchors.length) return { x: 0.68, y: 0.5, s: 1, h: 0, a: 1 };
        if (y <= anchors[0].at) return anchors[0];
        for (let i = 1; i < anchors.length; i++) {
          const A = anchors[i - 1], B = anchors[i];
          if (y <= B.at) {
            const t = smooth((y - A.at) / Math.max(1, B.at - A.at));
            return { x: A.x + (B.x - A.x) * t, y: A.y + (B.y - A.y) * t, s: A.s + (B.s - A.s) * t, h: A.h + (B.h - A.h) * t, a: A.a + (B.a - A.a) * t };
          }
        }
        return anchors[anchors.length - 1];
      };

      /* ------------------------------ frame ------------------------------- */
      const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        mouse.tx = (e.clientX / vw - 0.5) * 2;
        mouse.ty = -(e.clientY / vh - 0.5) * 2;
      };
      window.addEventListener('pointermove', onMove, { passive: true });

      let tAcc = 8, lastY = window.scrollY, vel = 0, lastNow = performance.now(), frameN = 0, live = false;
      let cur: Pose | null = null;
      let lastT = '', lastA = -1;
      const frame = () => {
        if (document.hidden) return;
        const now = performance.now();
        const dt = Math.min(50, now - lastNow);
        lastNow = now;
        const y = lenisInstance ? lenisInstance.animatedScroll : window.scrollY;
        // scroll velocity (px/frame), eased, feeds the wobble uniform only
        vel += (Math.max(-60, Math.min(60, y - lastY)) - vel) * 0.12;
        lastY = y;
        const target = reduce ? (anchors[0] || { x: 0.68, y: 0.5, s: 1, h: 0, a: 1 }) : poseAt(y);
        if (!cur) cur = { ...target };
        // light follow so section-to-section moves glide (fixed layer: no scroll-sync jitter)
        const k = 1 - Math.pow(1 - 0.16, dt / 16.7);
        cur.x += (target.x - cur.x) * k;
        cur.y += (target.y - cur.y) * k;
        cur.s += (target.s - cur.s) * k;
        cur.h += (target.h - cur.h) * k;
        cur.a += (target.a - cur.a) * k;
        mouse.x += (mouse.tx - mouse.x) * 0.05;
        mouse.y += (mouse.ty - mouse.y) * 0.05;

        const tx = Math.round((cur.x * vw - side / 2) * 10) / 10;
        const ty = Math.round((cur.y * vh - side / 2) * 10) / 10;
        const tr = `translate3d(${tx}px,${ty}px,0) scale(${cur.s.toFixed(4)})`;
        if (tr !== lastT) {
          host.style.transform = tr;
          lastT = tr;
        }
        const al = Math.round(cur.a * 100) / 100;
        if (al !== lastA) {
          host.style.opacity = String(al);
          host.style.visibility = al < 0.01 ? 'hidden' : 'visible';
          lastA = al;
        }

        if (!gl || al < 0.01) return;
        tAcc += dt / 1000;
        frameN++;
        // while scrolling the shader redraws every 3rd frame (mobile idle: every 2nd); the transform
        // still updates every frame, so motion stays fluid and scroll keeps the main budget
        const every = Math.abs(vel) > 0.6 ? 3 : mobile ? 2 : 1;
        if (frameN % every) return;
        gl.uniform2f(U.uR, w, h);
        gl.uniform1f(U.uT, tAcc);
        gl.uniform2f(U.uM, mouse.x, mouse.y);
        gl.uniform1f(U.uS, Math.min(1, y / Math.max(1, vh * 6)));
        gl.uniform1f(U.uH, cur.h);
        gl.uniform1f(U.uV, vel / 30);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        if (!live) {
          live = true;
          host.classList.add('is-live');
        }
        if (reduce) gsap.ticker.remove(frame);
      };
      if (!gl) host.classList.add('is-css');
      gsap.ticker.add(frame);

      const onRefresh = () => measure();
      ScrollTrigger.addEventListener('refresh', onRefresh);
      let rt = 0;
      const onResize = () => {
        window.clearTimeout(rt);
        rt = window.setTimeout(measure, 150);
      };
      window.addEventListener('resize', onResize);
      const ro = new ResizeObserver(onResize);
      ro.observe(document.body);
      host.classList.add('is-on');

      stop = () => {
        gsap.ticker.remove(frame);
        ScrollTrigger.removeEventListener('refresh', onRefresh);
        window.removeEventListener('resize', onResize);
        window.removeEventListener('pointermove', onMove);
        window.clearTimeout(rt);
        ro.disconnect();
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
    </div>
  );
};
