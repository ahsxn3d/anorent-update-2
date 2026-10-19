'use client';

import React, { useEffect, useRef } from 'react';

export function FogPlanes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let time = 0;
    let px = 0;
    let py = 0;
    let tx = 0;
    let ty = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const planes = [
      { depth: 0.28, tilt: -0.22, lift: 0.46, alpha: 0.055, pace: 0.16 },
      { depth: 0.5, tilt: 0.14, lift: 0.62, alpha: 0.04, pace: 0.11 },
      { depth: 0.74, tilt: -0.08, lift: 0.34, alpha: 0.07, pace: 0.2 },
    ];

    const paint = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = '#121110';
      context.fillRect(0, 0, width, height);

      const glow = context.createRadialGradient(width * 0.72, height * 0.08, 0, width * 0.55, height * 0.4, width * 0.75);
      glow.addColorStop(0, 'rgba(237, 233, 227,0.05)');
      glow.addColorStop(1, 'rgba(18,17,16,0)');
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      planes.forEach((plane, index) => {
        const drift = Math.sin(time * plane.pace + index * 1.7) * width * 0.03;
        const rise = Math.cos(time * plane.pace * 0.8 + index) * height * 0.015;
        context.save();
        context.translate(width * 0.5 + drift + px * (40 + plane.depth * 80), height * plane.lift + rise + py * 24);
        context.rotate(plane.tilt + px * 0.03);
        context.scale(1, 0.16 + plane.depth * 0.05);
        const sheet = context.createLinearGradient(-width, 0, width, 0);
        sheet.addColorStop(0, 'rgba(237, 233, 227,0)');
        sheet.addColorStop(0.28, `rgba(237, 233, 227,${plane.alpha * 0.35})`);
        sheet.addColorStop(0.5, `rgba(237,233,227,${plane.alpha})`);
        sheet.addColorStop(0.72, `rgba(237, 233, 227,${plane.alpha * 0.25})`);
        sheet.addColorStop(1, 'rgba(237, 233, 227,0)');
        context.fillStyle = sheet;
        context.beginPath();
        context.ellipse(0, 0, width * (0.62 + plane.depth * 0.2), height * 1.15, 0, 0, Math.PI * 2);
        context.fill();
        context.restore();
      });

      const veil = context.createLinearGradient(0, height * 0.35, 0, height);
      veil.addColorStop(0, 'rgba(18,17,16,0)');
      veil.addColorStop(1, 'rgba(18,17,16,0.72)');
      context.fillStyle = veil;
      context.fillRect(0, 0, width, height);
    };

    const tick = () => {
      if (document.hidden || window.scrollY > window.innerHeight * 2.2) {
        frame = window.requestAnimationFrame(tick);
        return;
      }
      px += (tx - px) * 0.035;
      py += (ty - py) * 0.035;
      time += 0.016;
      const fade = Math.min(1, window.scrollY / (window.innerHeight * 1.1));
      canvas.style.opacity = String(1 - fade * 0.55);
      paint();
      frame = window.requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      tx = event.clientX / window.innerWidth - 0.5;
      ty = event.clientY / window.innerHeight - 0.5;
    };

    resize();
    paint();
    window.addEventListener('resize', resize);
    if (!reduce) {
      window.addEventListener('pointermove', onMove);
      frame = window.requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="fog-stage" aria-hidden="true" />;
}
