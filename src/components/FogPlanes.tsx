'use client';

import React, { useEffect, useRef } from 'react';

export function FogPlanes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const time = 0;
    const px = 0;
    const py = 0;
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
      context.fillStyle = '#0B0D12';
      context.fillRect(0, 0, width, height);

      const glow = context.createRadialGradient(width * 0.72, height * 0.08, 0, width * 0.55, height * 0.4, width * 0.75);
      glow.addColorStop(0, 'rgba(232, 235, 242,0.05)');
      glow.addColorStop(1, 'rgba(11, 13, 18,0)');
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
        sheet.addColorStop(0, 'rgba(232, 235, 242,0)');
        sheet.addColorStop(0.28, `rgba(232, 235, 242,${plane.alpha * 0.35})`);
        sheet.addColorStop(0.5, `rgba(232, 235, 242,${plane.alpha})`);
        sheet.addColorStop(0.72, `rgba(232, 235, 242,${plane.alpha * 0.25})`);
        sheet.addColorStop(1, 'rgba(232, 235, 242,0)');
        context.fillStyle = sheet;
        context.beginPath();
        context.ellipse(0, 0, width * (0.62 + plane.depth * 0.2), height * 1.15, 0, 0, Math.PI * 2);
        context.fill();
        context.restore();
      });

      const veil = context.createLinearGradient(0, height * 0.35, 0, height);
      veil.addColorStop(0, 'rgba(11, 13, 18,0)');
      veil.addColorStop(1, 'rgba(11, 13, 18,0.72)');
      context.fillStyle = veil;
      context.fillRect(0, 0, width, height);
    };

    // Static paint: the fog is drawn once (and on resize), never per frame, so it costs nothing while scrolling.
    const onResize = () => { resize(); paint(); };
    resize();
    paint();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fog-stage" aria-hidden="true" />;
}
