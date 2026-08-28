'use client';

import React, { useState, useCallback, useEffect, useMemo } from 'react';

import { motion } from 'motion/react';
import { RefreshCw, Zap } from 'lucide-react';
import { sound } from '../utils/audio';

interface KineticHeroTitleProps {
  line1?: string;
  line2?: string;
  line3?: string;
  isReady?: boolean;
}

export const KineticHeroTitle: React.FC<KineticHeroTitleProps> = ({
  line1 = 'CYBERNETiC CRAFT',
  line2 = 'DiGiTAL REALMS',
  line3 = 'ENGiNEERED.',
  isReady = true,
}) => {
  const [animationKey, setAnimationKey] = useState(0);
  const [isReplaying, setIsReplaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Active vertically flipping 'I'/'i' character key (e.g. "0-8", "1-1", "1-3", "2-3")
  const [activeVerticalIKey, setActiveVerticalIKey] = useState<string | null>(null);

  // Active horizontally circular spinning character key for random other letters (e.g. "0-4", "1-5", etc.)
  const [activeHorizontalCharKey, setActiveHorizontalCharKey] = useState<string | null>(null);

  // Trigger reveal only when isReady becomes true (after loading screen goes away)
  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => {
        setHasStarted(true);
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  // Index all 'I'/'i' characters AND all other alphabet character positions across all 3 lines
  const { allICharacterKeys, allOtherCharacterKeys } = useMemo(() => {
    const lines = [line1, line2, line3];
    const iKeys: string[] = [];
    const otherKeys: string[] = [];

    lines.forEach((lineText, lineIdx) => {
      let charPos = 0;
      const words = lineText.split(' ');
      words.forEach((word) => {
        const chars = word.split('');
        chars.forEach((c) => {
          const key = `${lineIdx}-${charPos}`;
          if (c.toUpperCase() === 'I') {
            iKeys.push(key);
          } else if (c !== '.') {
            otherKeys.push(key);
          }
          charPos++;
        });
      });
    });

    return { allICharacterKeys: iKeys, allOtherCharacterKeys: otherKeys };
  }, [line1, line2, line3]);

  // 1. Horizontal circular 360° spin (rotateY) on random other characters (intermittent, not continuous)
  useEffect(() => {
    if (!hasStarted || allOtherCharacterKeys.length === 0) return;

    const interval = setInterval(() => {
      // Pick a random non-'i' character across the headline
      const pickedKey = allOtherCharacterKeys[Math.floor(Math.random() * allOtherCharacterKeys.length)];
      setActiveHorizontalCharKey(pickedKey);

      // Spin completes in 0.5s, then character immediately rests flat
      setTimeout(() => {
        setActiveHorizontalCharKey((curr) => (curr === pickedKey ? null : curr));
      }, 520);
    }, 3600);

    return () => clearInterval(interval);
  }, [hasStarted, allOtherCharacterKeys]);

  // 2. Vertical down-to-up 360° flip (rotateX) on ONE random 'i' character (intermittent, not continuous)
  useEffect(() => {
    if (!hasStarted || allICharacterKeys.length === 0) return;

    let interval: NodeJS.Timeout;
    const initialDelay = setTimeout(() => {
      interval = setInterval(() => {
        // Pick one random 'i' key
        const randomIKey = allICharacterKeys[Math.floor(Math.random() * allICharacterKeys.length)];
        setActiveVerticalIKey(randomIKey);

        // Settle cleanly flat after 0.52s
        setTimeout(() => {
          setActiveVerticalIKey((current) => (current === randomIKey ? null : current));
        }, 540);
      }, 4400);
    }, 1800);

    return () => {
      clearTimeout(initialDelay);
      if (interval) clearInterval(interval);
    };
  }, [hasStarted, allICharacterKeys]);

  // Trigger full kinetic replay with fresh key
  const triggerReplay = useCallback(() => {
    sound.playClick();
    setIsReplaying(true);
    setHasStarted(false);
    setActiveVerticalIKey(null);
    setActiveHorizontalCharKey(null);
    setTimeout(() => {
      setAnimationKey((prev) => prev + 1);
      setHasStarted(true);
      setTimeout(() => setIsReplaying(false), 2400);
    }, 80);
  }, []);

  // Compute rhythmic, steady, sequential delays for each line
  const STAGGER = 0.065; // Slow and steady 65ms per letter
  const line1BaseDelay = 0.25;
  const line2BaseDelay = line1BaseDelay + (line1.length * STAGGER) + 0.18;
  const line3BaseDelay = line2BaseDelay + (line2.length * STAGGER) + 0.18;

  return (
    <div key={animationKey} className="relative select-none py-2 overflow-visible">
      {/* SHAPE 1: 4-Petal Iridescent Spinning Flower (Top-Left) */}
      {hasStarted && (
        <motion.div
          initial={{ x: -60, y: -40, opacity: 0, scale: 0.2, rotate: -180 }}
          animate={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -top-6 -left-1 sm:-top-9 sm:-left-5 z-30 pointer-events-none"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="relative w-7 h-7 sm:w-12 sm:h-12 flex items-center justify-center filter drop-shadow-[0_0_18px_rgba(192,132,252,0.85)]"
          >
            {/* Top-Left Petal */}
            <div className="absolute top-0 left-0 w-3 h-3 sm:w-5 sm:h-5 rounded-tl-full rounded-br-sm bg-gradient-to-br from-amber-400 via-rose-500 to-purple-600 opacity-95 shadow-sm" />
            {/* Top-Right Petal */}
            <div className="absolute top-0 right-0 w-3 h-3 sm:w-5 sm:h-5 rounded-tr-full rounded-bl-sm bg-gradient-to-bl from-rose-400 via-purple-500 to-indigo-600 opacity-95 shadow-sm" />
            {/* Bottom-Left Petal */}
            <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-5 sm:h-5 rounded-bl-full rounded-tr-sm bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 opacity-95 shadow-sm" />
            {/* Bottom-Right Petal */}
            <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-5 sm:h-5 rounded-br-full rounded-tl-sm bg-gradient-to-tl from-purple-500 via-violet-600 to-indigo-500 opacity-95 shadow-sm" />
            {/* Center glowing core */}
            <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-white shadow-[0_0_10px_#FFFFFF] z-10 animate-pulse" />
          </motion.div>
        </motion.div>
      )}

      {/* SHAPE 2: Spinning Asterisk / Starburst (Top-Right) - Visible on Mobile & Desktop */}
      {hasStarted && (
        <motion.div
          initial={{ x: 40, y: -30, opacity: 0, scale: 0.2, rotate: 180 }}
          animate={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -top-2 right-0.5 sm:top-2 sm:right-8 z-20 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            className="text-pink-400 filter drop-shadow-[0_0_14px_rgba(244,114,182,0.85)] font-black text-xl sm:text-4xl select-none"
          >
            ✳
          </motion.div>
        </motion.div>
      )}

      {/* SHAPE 3: Glowing Emerald Lightning Bolt (Bottom-Right) - Visible on Mobile & Desktop */}
      {hasStarted && (
        <motion.div
          initial={{ x: 40, y: 40, opacity: 0, scale: 0.3 }}
          animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-1 right-1 sm:bottom-12 sm:right-16 z-30 flex pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, -4, 0], rotate: [-4, 4, -4] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="p-1 sm:p-1.5 rounded-lg sm:rounded-xl bg-emerald-500/20 border border-emerald-400/50 backdrop-blur-md shadow-[0_0_22px_rgba(52,211,153,0.6)]"
          >
            <Zap className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-emerald-300 fill-emerald-300" />
          </motion.div>
        </motion.div>
      )}

      {/* SHAPE 4: 3D Iridescent Wavy Ribbon (Bottom-Center) */}
      {hasStarted && (
        <motion.div
          initial={{ x: -40, y: 40, opacity: 0, scale: 0.3 }}
          animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -bottom-3 left-1/3 sm:left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        >
          <motion.svg
            width="44"
            height="26"
            viewBox="0 0 54 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ y: [0, -4, 0], scaleY: [1, 1.15, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            className="sm:w-[54px] sm:h-[32px] filter drop-shadow-[0_0_15px_rgba(192,132,252,0.9)]"
          >
            <path
              d="M 4 28 C 12 28 12 4 20 4 C 28 4 28 28 36 28 C 44 28 44 4 50 4"
              stroke="url(#ribbon-gradient-hero)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="ribbon-gradient-hero" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EC4899" />
                <stop offset="50%" stopColor="#8B00EE" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
            </defs>
          </motion.svg>
        </motion.div>
      )}

      {/* HEADLINE: Slow & Steady Letter-by-Letter Masked Reveal */}
      <div className="font-display text-3xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[0.96] flex flex-col gap-1.5 sm:gap-2.5 relative z-10">
        {/* LINE 1 */}
        <MaskedLetterLine
          text={line1}
          lineIndex={0}
          baseDelay={line1BaseDelay}
          letterStagger={STAGGER}
          isActive={hasStarted}
          activeVerticalIKey={activeVerticalIKey}
          activeHorizontalCharKey={activeHorizontalCharKey}
          className="text-white"
        />

        {/* LINE 2: Gradient Highlight */}
        <MaskedLetterLine
          text={line2}
          lineIndex={1}
          baseDelay={line2BaseDelay}
          letterStagger={STAGGER}
          isActive={hasStarted}
          activeVerticalIKey={activeVerticalIKey}
          activeHorizontalCharKey={activeHorizontalCharKey}
          isGradient
          className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 drop-shadow-[0_0_20px_rgba(192,132,252,0.4)]"
        />

        {/* LINE 3: With Glitching Cyber Dot */}
        <MaskedLetterLine
          text={line3}
          lineIndex={2}
          baseDelay={line3BaseDelay}
          letterStagger={STAGGER}
          isActive={hasStarted}
          activeVerticalIKey={activeVerticalIKey}
          activeHorizontalCharKey={activeHorizontalCharKey}
          className="text-white"
        />
      </div>

      {/* REPLAY TRIGGER */}
      <div className="pt-3 flex items-center gap-2">
        <button
          onClick={triggerReplay}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-[#8B00EE]/25 border border-purple-500/30 hover:border-purple-400 rounded-full text-[10px] sm:text-xs font-mono font-bold text-purple-300 hover:text-white transition-all cursor-pointer shadow-sm"
        >
          <RefreshCw className={`w-3 h-3 text-[#C084FC] ${isReplaying ? 'animate-spin' : ''}`} />
          <span>Replay Reveal Animation</span>
        </button>
      </div>
    </div>
  );
};

interface MaskedLetterLineProps {
  text: string;
  baseDelay: number;
  lineIndex: number;
  letterStagger?: number;
  isActive?: boolean;
  activeVerticalIKey?: string | null;
  activeHorizontalCharKey?: string | null;
  className?: string;
  isGradient?: boolean;
}

type SlideDirection = 'from-bottom' | 'from-top' | 'from-left' | 'from-right';

// Orthogonal 90° axis slides only
const DIRECTION_CYCLE: SlideDirection[] = [
  'from-bottom', // straight vertical slide up
  'from-left',   // straight horizontal slide right
  'from-top',    // straight vertical slide down
  'from-right',  // straight horizontal slide left
  'from-left',
  'from-bottom',
  'from-right',
  'from-top',
];

const DIRECTION_CLASS_MAP: Record<SlideDirection, string> = {
  'from-bottom': 'cyber-from-bottom',
  'from-top': 'cyber-from-top',
  'from-left': 'cyber-from-left',
  'from-right': 'cyber-from-right',
};

const MaskedLetterLine: React.FC<MaskedLetterLineProps> = ({
  text,
  baseDelay,
  lineIndex,
  letterStagger = 0.065,
  isActive = true,
  activeVerticalIKey,
  activeHorizontalCharKey,
  className = '',
}) => {
  const words = text.split(' ');
  let globalCharIndex = 0;

  return (
    <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-4 leading-[0.96]">
      {words.map((word, wordIdx) => {
        const chars = word.split('');
        return (
          <span key={`word-${wordIdx}`} className="inline-flex items-center">
            {chars.map((char, charIdx) => {
              const charPosition = globalCharIndex;
              const delay = baseDelay + charPosition * letterStagger;
              const direction = DIRECTION_CYCLE[(lineIndex * 5 + charPosition) % DIRECTION_CYCLE.length];
              const dirClass = DIRECTION_CLASS_MAP[direction];
              globalCharIndex++;

              const isDot = char === '.';
              const isI = char.toUpperCase() === 'I';
              const displayChar = isI ? 'i' : char;
              const charKey = `${lineIndex}-${charPosition}`;
              const isVerticalFlipping = activeVerticalIKey === charKey;
              const isHorizontalFlipping = activeHorizontalCharKey === charKey;

              return (
                <span
                  key={`char-${lineIndex}-${wordIdx}-${charIdx}`}
                  className="cyber-char-mask"
                >
                  <span
                    className={`cyber-char-reveal ${isActive ? dirClass : 'opacity-0'} ${className}`}
                    style={{
                      animationDelay: isActive ? `${delay.toFixed(3)}s` : '0s',
                      animationPlayState: isActive ? 'running' : 'paused',
                    }}
                  >
                    {isDot ? (
                      <span
                        onClick={() => sound.playChime()}
                        title="Quantum Glitch Core"
                        className="cyber-glitch-dot text-cyan-400 ml-0.5 inline-block"
                      >
                        .
                      </span>
                    ) : isVerticalFlipping ? (
                      <span className="cyber-vertical-flip-i">
                        {displayChar}
                      </span>
                    ) : isHorizontalFlipping ? (
                      <span className="cyber-fast-flip">
                        {displayChar}
                      </span>
                    ) : (
                      displayChar
                    )}
                  </span>
                </span>
              );
            })}
          </span>
        );
      })}
    </div>
  );
};
