'use client';

import React, { useEffect, useRef } from 'react';

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export const MagneticGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 400);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 24, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 24, mass: 0.4 });

  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;

  const tiltX = useTransform(springX, [0, windowWidth], [-8, 8]);
  const tiltY = useTransform(springY, [0, windowHeight], [-8, 8]);

  // Dynamic particle constellation canvas with cursor gravity (Optimized, 0 React Re-renders)
  useEffect(() => {
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

    const particleCount = Math.min(50, Math.floor((width * height) / 28000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.2,
        pulse: Math.random() * Math.PI,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const targetX = mouseX.get();
      const targetY = mouseY.get();

      // Render & link particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Gravitational magnetic pull toward cursor
        const dx = targetX - p.x;
        const dy = targetY - p.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        if (distToMouse < 160) {
          const force = (1 - distToMouse / 160) * 0.06;
          p.x += (dx / distToMouse) * force * 12;
          p.y += (dy / distToMouse) * force * 12;
        }

        // Draw particle
        const currentAlpha = p.alpha * (0.8 + Math.sin(p.pulse) * 0.3);
        ctx.fillStyle = `rgba(192, 132, 252, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect with nearby neighbors
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 100) {
            const lineAlpha = (1 - dist / 100) * 0.16;
            ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
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

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Direct DOM update for spotlight mask without triggering React component re-renders
      if (spotlightRef.current) {
        const mask = `radial-gradient(650px circle at ${e.clientX}px ${e.clientY}px, black 0%, rgba(0,0,0,0.6) 50%, transparent 100%)`;
        spotlightRef.current.style.webkitMaskImage = mask;
        spotlightRef.current.style.maskImage = mask;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
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
        className="hidden md:block absolute -inset-10 will-change-transform"
        style={{
          x: tiltX,
          y: tiltY,
          WebkitMaskImage: 'radial-gradient(650px circle at 50% 40%, black 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
          maskImage: 'radial-gradient(650px circle at 50% 40%, black 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
        }}
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
