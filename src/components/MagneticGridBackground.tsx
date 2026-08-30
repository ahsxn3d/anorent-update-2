'use client';

import React, { useState, useEffect, useRef } from 'react';

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export const MagneticGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  
  const mouseX = useMotionValue(500);
  const mouseY = useMotionValue(400);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 24, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 24, mass: 0.4 });

  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;

  const tiltX = useTransform(springX, [0, windowWidth], [-8, 8]);
  const tiltY = useTransform(springY, [0, windowHeight], [-8, 8]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Dynamic particle constellation canvas with cursor gravity (Optimized, 0 React Re-renders)
  useEffect(() => {
    // On mobile / touch screens (<768px), bypass particle canvas loop entirely to preserve 120 FPS
    if (typeof window === 'undefined' || window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      pulse: number;
    }

    // Keep particle count lightweight for rock-solid 60+ FPS
    const particleCount = Math.min(32, Math.floor((width * height) / 45000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.5 + 1,
        alpha: Math.random() * 0.35 + 0.15,
        pulse: Math.random() * Math.PI,
      });
    }

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const targetX = mouseX.get();
      const targetY = mouseY.get();

      // Render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.015;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Gravitational magnetic pull toward cursor (low computational overhead)
        const dx = targetX - p.x;
        const dy = targetY - p.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < 22500) { // 150px squared
          const distToMouse = Math.sqrt(distSq) || 1;
          const force = (1 - distToMouse / 150) * 0.04;
          p.x += (dx / distToMouse) * force * 8;
          p.y += (dy / distToMouse) * force * 8;
        }

        // Draw particle
        const currentAlpha = p.alpha * (0.8 + Math.sin(p.pulse) * 0.2);
        ctx.fillStyle = `rgba(192, 132, 252, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Optimized neighbor linking (capped to next 3 particles to avoid O(N^2) lag)
        const maxNeighbors = Math.min(particles.length, i + 4);
        for (let j = i + 1; j < maxNeighbors; j++) {
          const p2 = particles[j];
          const ndx = p.x - p2.x;
          const ndy = p.y - p2.y;
          const ndistSq = ndx * ndx + ndy * ndy;
          if (ndistSq < 8100) { // 90px squared
            const dist = Math.sqrt(ndistSq);
            const lineAlpha = (1 - dist / 90) * 0.14;
            ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    let mouseRafId: number | null = null;
    let pendingMouseX = width / 2;
    let pendingMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      pendingMouseX = e.clientX;
      pendingMouseY = e.clientY;

      if (mouseRafId === null) {
        mouseRafId = requestAnimationFrame(() => {
          mouseX.set(pendingMouseX);
          mouseY.set(pendingMouseY);

          if (spotlightRef.current) {
            const mask = `radial-gradient(550px circle at ${pendingMouseX}px ${pendingMouseY}px, black 0%, rgba(0,0,0,0.5) 50%, transparent 100%)`;
            spotlightRef.current.style.webkitMaskImage = mask;
            spotlightRef.current.style.maskImage = mask;
          }
          mouseRafId = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (mouseRafId !== null) cancelAnimationFrame(mouseRafId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Interactive Constellation Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60 pointer-events-none will-change-transform" />

      {/* Base Subtle Grid Matrix */}
      <div className="absolute inset-0 opacity-[0.07] sm:opacity-[0.05] bg-[radial-gradient(#8B00EE_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Mobile Grid */}
      <div className="block md:hidden absolute inset-0 opacity-75">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="mobile-grid-pattern" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#8B00EE" strokeWidth="1" strokeOpacity="0.3" />
              <circle cx="0" cy="0" r="1.5" fill="#8B00EE" fillOpacity="0.8" />
              <circle cx="48" cy="48" r="1.5" fill="#8B00EE" fillOpacity="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mobile-grid-pattern)" />
        </svg>
      </div>

      {/* Desktop Dynamic Spotlight & Parallax Pull Layer */}
      <motion.div
        ref={spotlightRef}
        suppressHydrationWarning
        className="hidden md:block absolute -inset-10 will-change-transform"
        style={
          hasMounted
            ? {
                x: tiltX,
                y: tiltY,
                WebkitMaskImage: 'radial-gradient(650px circle at 50% 40%, black 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
                maskImage: 'radial-gradient(650px circle at 50% 40%, black 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
              }
            : {
                WebkitMaskImage: 'radial-gradient(650px circle at 50% 40%, black 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
                maskImage: 'radial-gradient(650px circle at 50% 40%, black 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
              }
        }
      >
        <div className="w-full h-full opacity-90">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="desktop-grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#A855F7" strokeWidth="1.2" strokeOpacity="0.45" />
                <circle cx="0" cy="0" r="2" fill="#C084FC" fillOpacity="0.9" />
                <circle cx="60" cy="0" r="2" fill="#C084FC" fillOpacity="0.9" />
                <circle cx="0" cy="60" r="2" fill="#C084FC" fillOpacity="0.9" />
                <circle cx="60" cy="60" r="2" fill="#C084FC" fillOpacity="0.9" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#desktop-grid-pattern)" />
          </svg>
        </div>
      </motion.div>

      {/* Cyber Light Cones */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#8B00EE]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#6D28D9]/10 blur-[150px] pointer-events-none" />
    </div>
  );
};
