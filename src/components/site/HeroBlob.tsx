'use client';

import React, { useEffect, useRef } from 'react';
import { whenIdle } from './gsap';

/**
 * Hero centrepiece: a liquid metaball "blob" shaded as a glossy 3D surface,
 * in the fromanother x huyml palette (cobalt body, teal + coral rims, cream specular).
 * Raw WebGL1, one full-screen triangle, no library (~3 KB).
 * - starts only when the browser is idle; until then (or without WebGL) the CSS blob shows
 * - renders at reduced resolution (the soft edges are meant to be out of focus)
 * - pauses when offscreen or the tab is hidden; one still frame with reduced motion
 */
const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

const FRAG = `precision mediump float;
uniform vec2 uR;uniform float uT;uniform vec2 uM;uniform float uS;uniform vec2 uC;uniform float uZ;
float F(vec2 p){
  float f=0.;
  for(int i=0;i<5;i++){
    float k=float(i);
    vec2 c=vec2(sin(uT*.23+k*1.7),cos(uT*.19+k*2.4))*vec2(.3,.19)*(1.+.3*sin(uT*.17+k*1.1));
    c+=uM*(.035+.02*k);
    float r=.145+.045*sin(uT*.41+k*1.9);
    vec2 d=p-c;f+=r*r/(dot(d,d)+.0001);
  }
  return f;
}
float H(vec2 p){return sqrt(clamp(1.-1./F(p),0.,1.))*.24;}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*uR)/uR.y;
  uv=(uv-uC)*uZ*(1.+uS*.55);
  float a=uT*.05+uS*.9;uv*=mat2(cos(a),-sin(a),sin(a),cos(a));
  float f=F(uv);
  float e=.016;
  float hx=(H(uv+vec2(e,0.))-H(uv-vec2(e,0.)))/(2.*e);
  float hy=(H(uv+vec2(0.,e))-H(uv-vec2(0.,e)))/(2.*e);
  vec3 n=normalize(vec3(-hx,-hy,1.));
  float fr=pow(1.-n.z,1.3);
  vec3 cob=vec3(.090,.251,.663),nig=vec3(.063,.090,.294),tea=vec3(.267,.773,.671),cor=vec3(1.,.42,.298),cre=vec3(1.,.992,.886),sky=vec3(.694,.843,.929);
  vec3 col=mix(nig*.85,cob*1.08,clamp(.55+.45*n.y-.2*n.x,0.,1.));
  float side=.5+.5*sin(atan(n.y,n.x)*1.+uT*.21);
  col=mix(col,mix(tea,cor,smoothstep(.25,.85,side)),clamp(fr*2.2,0.,1.));
  vec3 l=normalize(vec3(-.5,.65,.6));
  float dif=max(dot(n,l),0.);
  col*=.75+.35*dif;
  float sp=pow(max(dot(reflect(-l,n),vec3(0.,0.,1.)),0.),14.)*smoothstep(.2,.7,fr+.15);
  col+=cre*sp*.55+sky*pow(fr,4.)*.2+mix(sky,cre,.4)*pow(max(dot(n,normalize(vec3(-.4,.55,.75))),0.),18.)*.42;
  float body=smoothstep(.9,1.35,f);
  float halo=smoothstep(.12,1.,f)*.3;
  vec3 hc=mix(tea,cob,.5);
  float al=body+halo*(1.-body);
  vec3 c=(col*body+hc*halo*(1.-body))/max(al,.001);
  al*=.94;
  gl_FragColor=vec4(c*al,al);
}`;

export const HeroBlob: React.FC = () => {
  const wrap = useRef<HTMLDivElement>(null);
  const cvs = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = wrap.current;
    const canvas = cvs.current;
    if (!host || !canvas) return;
    let dead = false;
    let stop = () => {};

    whenIdle(1500).then(() => {
      if (dead) return;
      const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true, powerPreference: 'low-power', depth: false, stencil: false });
      if (!gl) return; // CSS blob stays
      const sh = (type: number, src: string) => {
        const s = gl.createShader(type)!;
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
      };
      const prog = gl.createProgram()!;
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
      gl.useProgram(prog);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, 'p');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      const U = (n: string) => gl.getUniformLocation(prog, n);
      const uR = U('uR'), uT = U('uT'), uM = U('uM'), uS = U('uS'), uC = U('uC'), uZ = U('uZ');

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let w = 0, h = 0, wide = true;
      // geometry is cached here (resize only), so the frame loop never forces layout
      let hostTop = 0, hostH = 1;
      const size = () => {
        const r = host.getBoundingClientRect();
        hostTop = r.top + window.scrollY;
        hostH = Math.max(1, r.height);
        // the surface is meant to be soft: render at ~half resolution, capped
        const scale = Math.min(0.55, 720 / Math.max(1, r.width));
        const nw = Math.max(2, Math.round(r.width * scale));
        const nh = Math.max(2, Math.round(r.height * scale));
        // reallocating the drawing buffer clears it (a visible flash): only when the size really changes
        if (nw !== w || nh !== h) {
          w = nw;
          h = nh;
          canvas.width = w;
          canvas.height = h;
          gl.viewport(0, 0, w, h);
        }
        wide = r.width >= 900;
      };
      size();

      const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
      const onMove = (e: PointerEvent) => {
        mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      const ro = new ResizeObserver(size);
      ro.observe(host);

      let raf = 0;
      let visible = true;
      let lastScroll = -1e9;
      const onScroll = () => {
        lastScroll = performance.now();
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      let t0 = performance.now();
      let tAcc = 0;
      const frame = (now: number) => {
        raf = 0;
        // while the page scrolls, the blob holds its last frame (the canvas is just a
        // composited layer then) and resumes once scrolling rests: scroll always wins
        if (now - lastScroll < 140) {
          if (!reduce && visible && !document.hidden) raf = requestAnimationFrame(frame);
          return;
        }
        tAcc += Math.min(50, now - t0) / 1000;
        t0 = now;
        mouse.x += (mouse.tx - mouse.x) * 0.05;
        mouse.y += (mouse.ty - mouse.y) * 0.05;
        const s = Math.min(1, Math.max(0, (window.scrollY - hostTop) / hostH));
        const aspect = w / h;
        gl.uniform2f(uR, w, h);
        gl.uniform1f(uT, tAcc + 8);
        gl.uniform2f(uM, mouse.x, mouse.y);
        gl.uniform1f(uS, s);
        gl.uniform2f(uC, wide ? aspect * 0.2 : 0, wide ? 0.02 : 0.1);
        gl.uniform1f(uZ, wide ? 1.05 : 1.55);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        if (!host.classList.contains('is-live')) host.classList.add('is-live');
        if (!reduce && visible && !document.hidden) raf = requestAnimationFrame(frame);
      };
      const play = () => {
        if (!raf && visible && !document.hidden) {
          t0 = performance.now();
          raf = requestAnimationFrame(frame);
        }
      };
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible) play();
      });
      io.observe(host);
      const onVis = () => play();
      document.addEventListener('visibilitychange', onVis);
      play();

      stop = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('scroll', onScroll);
        document.removeEventListener('visibilitychange', onVis);
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      };
    });

    return () => {
      dead = true;
      stop();
    };
  }, []);

  return (
    <div ref={wrap} className="ah-blob" aria-hidden="true">
      <span className="ah-blob-fallback" />
      <canvas ref={cvs} className="ah-blob-canvas" />
    </div>
  );
};
