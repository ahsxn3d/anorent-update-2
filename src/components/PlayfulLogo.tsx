'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

import { motion } from 'motion/react';
import { sound } from '../utils/audio';

interface PlayfulLogoProps {
  onClick?: () => void;
  className?: string;
}

type HoverEffect =
  | 'hourglass-morph'
  | 'clover-bloom'
  | 'folded-prism'
  | 'kinetic-hyphen'
  | 'barrel-roll'
  | 'matrix-scramble'
  | 'jelly-squash'
  | 'diamond-spin';

const EFFECTS: HoverEffect[] = [
  'hourglass-morph',
  'clover-bloom',
  'folded-prism',
  'kinetic-hyphen',
  'barrel-roll',
  'matrix-scramble',
  'jelly-squash',
  'diamond-spin',
];

const CYBER_GLYPHS = ['∆', '⬡', '◊', '✦', '❖', '∑', '0', '1', '7', 'X', 'Ø', 'Ξ'];
const ORIGINAL_CHARS = ['A', 'N', 'O', 'R', 'I', 'X'];

export const PlayfulLogo: React.FC<PlayfulLogoProps> = ({ onClick, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeEffect, setActiveEffect] = useState<HoverEffect | null>(null);
  const [scrambledChars, setScrambledChars] = useState<string[]>(ORIGINAL_CHARS);
  const [effectTargetIndex, setEffectTargetIndex] = useState<number>(0);
  const lastEffectRef = useRef<HoverEffect | null>(null);
  const scrambleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoLoopTimerRef = useRef<NodeJS.Timeout | null>(null);
  const effectResetTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger a random playful effect
  const triggerRandomEffect = useCallback((playSound = false) => {
    if (playSound) sound.playHover();
    setIsHovered(true);

    // Pick a random effect different from the last one
    const availableEffects = EFFECTS.filter((e) => e !== lastEffectRef.current);
    const chosenEffect =
      availableEffects[Math.floor(Math.random() * availableEffects.length)] || EFFECTS[0];
    lastEffectRef.current = chosenEffect;
    setActiveEffect(chosenEffect);

    // Pick target letter index for morph effects (e.g. 0 for A, 2 for O, 3 for R, 5 for X)
    const morphIndices = [0, 2, 3, 5];
    const targetIdx = morphIndices[Math.floor(Math.random() * morphIndices.length)];
    setEffectTargetIndex(targetIdx);

    // If matrix scramble effect chosen, run rapid character cycle
    if (chosenEffect === 'matrix-scramble') {
      if (scrambleTimerRef.current) clearInterval(scrambleTimerRef.current);
      let step = 0;
      const maxSteps = 8;

      scrambleTimerRef.current = setInterval(() => {
        step++;
        if (step >= maxSteps) {
          if (scrambleTimerRef.current) clearInterval(scrambleTimerRef.current);
          setScrambledChars(ORIGINAL_CHARS);
        } else {
          setScrambledChars(
            ORIGINAL_CHARS.map((orig) => {
              if (Math.random() > 0.4) {
                return CYBER_GLYPHS[Math.floor(Math.random() * CYBER_GLYPHS.length)];
              }
              return orig;
            })
          );
        }
      }, 40);
    }

    // Auto reset the effect after duration so it can trigger again cleanly
    if (effectResetTimerRef.current) clearTimeout(effectResetTimerRef.current);
    effectResetTimerRef.current = setTimeout(() => {
      setActiveEffect(null);
      setScrambledChars(ORIGINAL_CHARS);
    }, 1400);
  }, []);

  // Detect true touch-only mobile/tablet devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      const isCoarseOnly = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      setIsTouchDevice(isCoarseOnly);
    };

    checkTouch();
    const mediaQuery = window.matchMedia('(hover: none) and (pointer: coarse)');
    const handleChange = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    triggerRandomEffect(true);
  };


  const handleMouseLeave = () => {
    setIsHovered(false);
    // Instantly reset any in-flight morph or scramble effect so it never gets stuck
    if (effectResetTimerRef.current) clearTimeout(effectResetTimerRef.current);
    if (scrambleTimerRef.current) clearInterval(scrambleTimerRef.current);
    setActiveEffect(null);
    setScrambledChars(ORIGINAL_CHARS);
  };

  const handleClick = () => {
    sound.playClick();
    triggerRandomEffect(true);
    if (onClick) onClick();
  };

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      id="nav-brand-btn"
      className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl bg-[#1c0c32]/85 backdrop-blur-xl border border-purple-400/40 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(139,0,238,0.3)] hover:bg-[#281147] hover:shadow-[0_0_30px_rgba(139,0,238,0.6)] hover:border-purple-300/80 transition-all duration-300 cursor-pointer select-none relative group overflow-hidden ${className}`}
    >
      {/* Ambient Specular Sheen Sweep */}
      <motion.div
        animate={{
          x: ['-120%', '220%'],
          opacity: [0, 0.45, 0],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 2.5,
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
      />

      {/* Main Logo Text / Dynamic Characters Container */}
      <div className="flex items-center tracking-tighter font-display text-sm sm:text-2xl font-extrabold text-white">
        <div className="flex items-center">
          {ORIGINAL_CHARS.map((char, index) => {
            const isTargetChar = index === effectTargetIndex;

            // Render Hyphen Split (e.g. ANO-RENT)
            if (activeEffect === 'kinetic-hyphen' && index === 3) {
              return (
                <React.Fragment key={`char-fragment-${index}`}>
                  <motion.span
                    initial={{ scale: 0, width: 0, opacity: 0 }}
                    animate={{ scale: 1, width: 'auto', opacity: 1 }}
                    exit={{ scale: 0, width: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                    className="inline-flex items-center justify-center px-1 text-[#C084FC] font-black"
                  >
                    -
                  </motion.span>
                  <CharItem
                    char={char}
                    index={index}
                    activeEffect={activeEffect}
                    isTargetChar={isTargetChar}
                    scrambledChar={scrambledChars[index]}
                  />
                </React.Fragment>
              );
            }

            return (
              <CharItem
                key={`char-${index}`}
                char={char}
                index={index}
                activeEffect={activeEffect}
                isTargetChar={isTargetChar}
                scrambledChar={scrambledChars[index]}
              />
            );
          })}
        </div>
      </div>

      {/* Live Glowing Status Dot */}
      <motion.span
        animate={{
          scale: isHovered ? [1, 1.45, 1.2] : [1, 1.35, 1],
          opacity: [0.85, 1, 0.85],
          boxShadow: isHovered
            ? [
                '0 0 12px #A855F7',
                '0 0 24px #C084FC, 0 0 35px #8B00EE',
                '0 0 18px #A855F7',
              ]
            : [
                '0 0 10px #A855F7',
                '0 0 18px #C084FC',
                '0 0 10px #A855F7',
              ],
        }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#A855F7] shrink-0"
      />
    </motion.button>
  );
};

// Sub-component for individual character interactions
interface CharItemProps {
  char: string;
  index: number;
  activeEffect: HoverEffect | null;
  isTargetChar: boolean;
  scrambledChar: string;
}

const CharItem: React.FC<CharItemProps> = ({
  char,
  index,
  activeEffect,
  isTargetChar,
  scrambledChar,
}) => {
  // If Hourglass Morph is active on this character
  if (activeEffect === 'hourglass-morph' && isTargetChar) {
    return (
      <motion.span
        key={`morph-hourglass-${index}`}
        initial={{ scale: 0.2, rotate: -90, opacity: 0 }}
        animate={{ scale: 1, rotate: 180, opacity: 1 }}
        exit={{ scale: 0.2, rotate: 90, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 18 }}
        className="inline-flex items-center justify-center mx-0.5 w-[1.1em] h-[1.1em]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full drop-shadow-[0_0_10px_rgba(192,132,252,0.8)]"
        >
          <defs>
            <linearGradient id={`hgGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="50%" stopColor="#8B00EE" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
          <polygon points="4,3 20,3 12,12" fill={`url(#hgGrad-${index})`} />
          <polygon points="4,21 20,21 12,12" fill={`url(#hgGrad-${index})`} opacity="0.9" />
          <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />
        </svg>
      </motion.span>
    );
  }

  // If Clover Bloom is active on this character
  if (activeEffect === 'clover-bloom' && isTargetChar) {
    return (
      <motion.span
        key={`morph-clover-${index}`}
        initial={{ scale: 0, rotate: 0, opacity: 0 }}
        animate={{ scale: 1.15, rotate: 360, opacity: 1 }}
        exit={{ scale: 0, rotate: 180, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 16 }}
        className="inline-flex items-center justify-center mx-0.5 w-[1.15em] h-[1.15em]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(236,72,153,0.85)]"
        >
          <defs>
            <linearGradient id={`cloverGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="50%" stopColor="#C084FC" />
              <stop offset="100%" stopColor="#8B00EE" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="7" r="4.5" fill={`url(#cloverGrad-${index})`} />
          <circle cx="17" cy="12" r="4.5" fill={`url(#cloverGrad-${index})`} opacity="0.9" />
          <circle cx="12" cy="17" r="4.5" fill={`url(#cloverGrad-${index})`} />
          <circle cx="7" cy="12" r="4.5" fill={`url(#cloverGrad-${index})`} opacity="0.9" />
          <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" />
        </svg>
      </motion.span>
    );
  }

  // If Folded Prism is active on this character
  if (activeEffect === 'folded-prism' && isTargetChar) {
    return (
      <motion.span
        key={`morph-prism-${index}`}
        initial={{ scale: 0.1, rotateY: 90, opacity: 0 }}
        animate={{ scale: 1.1, rotateY: 0, opacity: 1 }}
        exit={{ scale: 0.1, rotateY: -90, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 18 }}
        className="inline-flex items-center justify-center mx-0.5 w-[1.1em] h-[1.1em]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(56,189,248,0.85)]"
        >
          <defs>
            <linearGradient id={`prismGrad1-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#8B00EE" />
            </linearGradient>
            <linearGradient id={`prismGrad2-${index}`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          <polygon points="12,2 22,12 12,22" fill={`url(#prismGrad1-${index})`} />
          <polygon points="12,2 2,12 12,22" fill={`url(#prismGrad2-${index})`} opacity="0.85" />
          <line x1="12" y1="2" x2="12" y2="22" stroke="#FFFFFF" strokeWidth="1" opacity="0.75" />
        </svg>
      </motion.span>
    );
  }

  // If Diamond Spin is active on this character
  if (activeEffect === 'diamond-spin' && isTargetChar) {
    return (
      <motion.span
        key={`morph-diamond-${index}`}
        initial={{ scale: 0, rotate: -45, opacity: 0 }}
        animate={{ scale: [1, 1.25, 1], rotate: [0, 180, 360], opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="inline-flex items-center justify-center mx-0.5 w-[1.1em] h-[1.1em]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(168,85,247,0.9)]"
        >
          <defs>
            <linearGradient id={`diamondGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E9D5FF" />
              <stop offset="50%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#6D28D9" />
            </linearGradient>
          </defs>
          <polygon points="12,2 22,12 12,22 2,12" fill={`url(#diamondGrad-${index})`} />
          <polygon points="12,6 18,12 12,18 6,12" fill="#FFFFFF" opacity="0.3" />
        </svg>
      </motion.span>
    );
  }

  // Animation parameters for kinetic effects applied across characters
  let charAnimate = {};
  let charTransition = {};

  if (activeEffect === 'barrel-roll') {
    charAnimate = {
      rotateX: [0, 360],
      color: ['#FFFFFF', '#C084FC', '#38BDF8', '#FFFFFF'],
      textShadow: [
        '0 0 0px rgba(0,0,0,0)',
        '0 0 15px rgba(192,132,252,0.8)',
        '0 0 0px rgba(0,0,0,0)',
      ],
    };
    charTransition = {
      duration: 0.55,
      delay: index * 0.05,
      ease: [0.34, 1.56, 0.64, 1],
    };
  } else if (activeEffect === 'jelly-squash') {
    charAnimate = {
      scaleY: [1, 1.45, 0.8, 1.15, 1],
      scaleX: [1, 0.75, 1.25, 0.9, 1],
      y: [0, -6, 2, -1, 0],
      color: ['#FFFFFF', '#E9D5FF', '#C084FC', '#FFFFFF'],
    };
    charTransition = {
      duration: 0.65,
      delay: index * 0.04,
      ease: 'easeOut',
    };
  } else if (activeEffect === 'kinetic-hyphen') {
    charAnimate = {
      y: index % 2 === 0 ? -2 : 2,
      rotate: index % 2 === 0 ? -3 : 3,
      color: '#E9D5FF',
    };
    charTransition = {
      type: 'spring',
      stiffness: 400,
      damping: 15,
      delay: index * 0.02,
    };
  }

  return (
    <motion.span
      animate={charAnimate}
      transition={charTransition}
      className={`inline-block transition-colors duration-200 ${
        activeEffect === 'matrix-scramble'
          ? 'text-[#C084FC] drop-shadow-[0_0_8px_rgba(192,132,252,0.7)] font-mono'
          : 'hover:text-[#C084FC]'
      }`}
    >
      {activeEffect === 'matrix-scramble' ? scrambledChar : char}
    </motion.span>
  );
};

export default PlayfulLogo;
