'use client';

import React from 'react';

import { motion } from 'motion/react';

interface AlphabetPopTextProps {
  text: string;
  className?: string;
  baseDelay?: number;
  staggerDelay?: number;
  gradientClass?: string;
  enableSound?: boolean;
}

// Web Audio API pop sound generator for gentle acoustic popping effects
const playPopSound = (pitchMultiplier = 1) => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Gentle acoustic pop curve
    const freq = 320 * pitchMultiplier + Math.random() * 80;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.8, ctx.currentTime + 0.04);
    osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.09);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.095);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch {
    // Ignore audio restrictions
  }
};

export const AlphabetPopText: React.FC<AlphabetPopTextProps> = ({
  text,
  className = '',
  baseDelay = 0.2,
  staggerDelay = 0.05,
  gradientClass = '',
  enableSound = true,
}) => {
  const words = text.split(' ');
  let globalCharIndex = 0;

  return (
    <span className={`inline-flex flex-wrap gap-x-3 sm:gap-x-4 items-center ${className}`}>
      {words.map((word, wordIdx) => {
        const letters = word.split('');

        return (
          <span key={`word-${wordIdx}`} className="inline-flex overflow-visible py-1">
            {letters.map((char) => {
              const charIdx = globalCharIndex;
              globalCharIndex += 1;

              const charDelay = baseDelay + charIdx * staggerDelay;

              // GSAP-style kinetic rotation and scale initial state
              const rotationDeg = (charIdx % 2 === 0 ? -18 : 18);

              return (
                <motion.span
                  key={`char-${charIdx}`}
                  initial={{
                    opacity: 0,
                    scale: 0,
                    rotate: rotationDeg,
                    y: 20,
                    filter: 'blur(6px)',
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    y: 0,
                    filter: 'blur(0px)',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 160,
                    damping: 12,
                    mass: 0.6,
                    delay: charDelay,
                  }}
                  onAnimationStart={() => {
                    if (enableSound) {
                      playPopSound(0.85 + (charIdx % 8) * 0.1);
                    }
                  }}
                  whileHover={{
                    scale: 1.3,
                    y: -8,
                    rotate: (charIdx % 2 === 0 ? 1 : -1) * 8,
                    transition: { type: 'spring', stiffness: 350, damping: 18 },
                  }}
                  onMouseEnter={() => {
                    if (enableSound) {
                      playPopSound(1.2 + Math.random() * 0.3);
                    }
                  }}
                  onPointerDown={() => {
                    if (enableSound) {
                      playPopSound(1.35 + Math.random() * 0.35);
                    }
                  }}
                  className={`inline-block cursor-pointer select-none origin-center drop-shadow-[0_8px_16px_rgba(2,3,22,0.12)] transition-colors duration-200 hover:z-50 ${gradientClass}`}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
};
