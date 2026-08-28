'use client';

import React, { useMemo } from 'react';

import { motion } from 'motion/react';

interface GsapPlayfulTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'span';
  highlightWords?: string[];
  gradientTheme?: 'purple-cyan' | 'pure-purple' | 'cyan-glow';
  staggerDelay?: number;
  initialDelay?: number;
}

export const GsapPlayfulText: React.FC<GsapPlayfulTextProps> = ({
  text,
  className = '',
  as: Component = 'p',
  highlightWords = [],
  gradientTheme = 'purple-cyan',
  staggerDelay = 0.016,
  initialDelay = 0.15,
}) => {
  // Color theme mapping matching the website
  const themeConfig = {
    'purple-cyan': {
      highlight: 'text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] via-[#A855F7] to-[#38BDF8] drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]',
      standard: 'text-slate-200',
    },
    'pure-purple': {
      highlight: 'text-transparent bg-clip-text bg-gradient-to-r from-[#E9D5FF] via-[#C084FC] to-[#A855F7] drop-shadow-[0_0_15px_rgba(192,132,252,0.5)]',
      standard: 'text-white',
    },
    'cyan-glow': {
      highlight: 'text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#06B6D4] to-[#C084FC] drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]',
      standard: 'text-slate-200',
    },
  }[gradientTheme];

  // Parse whole text into structured word & character items with absolute linear character indices
  const parsedWords = useMemo(() => {
    const words = text.split(' ');
    let globalCharIndex = 0;

    return words.map((word, wordIdx) => {
      // Check if this word is part of highlighted key terms
      const isHighlighted = highlightWords.some((hw) =>
        word.toLowerCase().includes(hw.toLowerCase())
      );

      const chars = word.split('').map((char) => {
        const idx = globalCharIndex++;
        return {
          char,
          globalIdx: idx,
          isHighlighted,
        };
      });

      // Account for the space between words
      globalCharIndex++;

      return {
        word,
        wordIdx,
        isHighlighted,
        chars,
      };
    });
  }, [text, highlightWords]);

  return (
    <Component className={`leading-relaxed [perspective:1000px] select-none ${className}`}>
      {parsedWords.map((wordObj, wIdx) => {
        return (
          <span
            key={wIdx}
            className={`inline-block mr-[0.28em] whitespace-nowrap [transform-style:preserve-3d] ${
              wordObj.isHighlighted ? 'font-extrabold' : ''
            }`}
          >
            {wordObj.chars.map((charObj) => {
              // Stagger delay from first letter (0) to last letter (N)
              const charDelay = initialDelay + charObj.globalIdx * staggerDelay;

              return (
                <motion.span
                  key={charObj.globalIdx}
                  initial={{
                    opacity: 0,
                    y: 18,
                    rotateX: -85,
                    rotateY: (charObj.globalIdx % 2 === 0 ? -20 : 20),
                    scale: 0.75,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.75,
                    delay: charDelay,
                    ease: [0.22, 1, 0.36, 1], // Kinetic elastic curve
                  }}
                  className={`inline-block [transform-style:preserve-3d] [backface-visibility:hidden] will-change-transform ${
                    charObj.isHighlighted
                      ? themeConfig.highlight
                      : themeConfig.standard
                  }`}
                  style={{
                    WebkitFontSmoothing: 'subpixel-antialiased',
                    display: 'inline-block',
                  }}
                >
                  {charObj.char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </Component>
  );
};

export default GsapPlayfulText;
