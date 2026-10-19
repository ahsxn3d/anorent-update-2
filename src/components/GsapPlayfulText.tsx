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
  staggerDelay = 0.016,
  initialDelay = 0.12,
}) => {
  const words = useMemo(() => text.split(' '), [text]);

  return (
    <Component className={className}>
      {words.map((word, index) => {
        const isHighlighted = highlightWords.some((hw) =>
          word.toLowerCase().includes(hw.toLowerCase())
        );
        return (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom mr-[0.28em]">
            <motion.span
              initial={{ y: '120%', opacity: 0, filter: 'blur(8px)' }}
              animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
              transition={{
                duration: 0.9,
                delay: initialDelay + index * Math.min(staggerDelay * 2.2, 0.045),
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`inline-block ${isHighlighted ? 'text-white lux-mark' : ''}`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </Component>
  );
};

export default GsapPlayfulText;
