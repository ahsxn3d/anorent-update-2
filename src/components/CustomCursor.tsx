'use client';

import React, { useEffect, useState } from 'react';

import { motion, useMotionValue, useSpring } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Ultra-responsive spring physics for tracking
  const cursorX = useSpring(rawX, { stiffness: 1000, damping: 50, mass: 0.1 });
  const cursorY = useSpring(rawY, { stiffness: 1000, damping: 50, mass: 0.1 });

  const auraX = useSpring(rawX, { stiffness: 450, damping: 30, mass: 0.3 });
  const auraY = useSpring(rawY, { stiffness: 450, damping: 30, mass: 0.3 });

  useEffect(() => {
    // Only activate custom cursor on fine pointer devices (desktop/mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('button, a, input, textarea, [data-cursor-hover]');
      if (interactiveEl) {
        setIsHovered(true);
        const text = interactiveEl.getAttribute('data-cursor-text');
        setCursorText(text || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [rawX, rawY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none">
      {/* Lagging Trailing Aura Glow */}

      <motion.div
        className="absolute w-8 h-8 rounded-full border border-purple-400/60 bg-purple-500/10 backdrop-blur-[1px] shadow-[0_0_20px_rgba(168,85,247,0.4)] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: auraX,
          y: auraY,
        }}
        animate={{
          scale: isClicking ? 0.7 : isHovered ? 1.8 : 1,
          borderColor: isHovered ? 'rgba(216, 180, 254, 0.9)' : 'rgba(168, 85, 247, 0.5)',
          backgroundColor: isHovered ? 'rgba(139, 0, 238, 0.2)' : 'rgba(139, 0, 238, 0.08)',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        {cursorText && (
          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black tracking-widest uppercase text-white font-mono">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Crisp Center Precision Dot */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#FFFFFF] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isClicking ? 1.5 : isHovered ? 0.4 : 1,
          backgroundColor: isHovered ? '#C084FC' : '#FFFFFF',
        }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};
