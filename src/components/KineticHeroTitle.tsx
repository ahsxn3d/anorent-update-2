'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface KineticHeroTitleProps {
  line1?: string;
  line2?: string;
  line3?: string;
  isReady?: boolean;
}

const ease = [0.16, 1, 0.3, 1] as const;

const RevealLine: React.FC<{
  text: string;
  start: number;
  className?: string;
  show: boolean;
  reduced: boolean;
}> = ({ text, start, className = '', show, reduced }) => {
  const words = text.split(/\s+/).filter(Boolean);
  let charIndex = 0;

  return (
    <div className={`flex flex-wrap gap-x-[0.22em] ${className}`}>
      {words.map((word, wordIndex) => {
        const letters = Array.from(word);
        const wordStart = charIndex;
        charIndex += letters.length + 1;

        return (
          <span key={`${word}-${wordIndex}`} className="inline-flex overflow-hidden pb-[0.12em]">
            {letters.map((letter, letterIndex) => (
              <motion.span
                key={`${word}-${letterIndex}`}
                initial={reduced ? false : { y: '115%' }}
                animate={show || reduced ? { y: '0%' } : { y: '115%' }}
                transition={{
                  duration: reduced ? 0 : 1.05,
                  delay: reduced ? 0 : start + (wordStart + letterIndex) * 0.028,
                  ease,
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </span>
        );
      })}
    </div>
  );
};

export const KineticHeroTitle: React.FC<KineticHeroTitleProps> = ({
  line1 = 'CYBERNETiC CRAFT',
  line2 = 'DiGiTAL REALMS',
  line3 = 'ENGiNEERED.',
  isReady = true,
}) => {
  const [show, setShow] = useState(false);
  const [reduced, setReduced] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 640], [0, -72]);
  const opacity = useTransform(scrollY, [0, 520], [1, 0.15]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(media.matches);
    if (!isReady) return;
    const timer = setTimeout(() => setShow(true), 40);
    return () => clearTimeout(timer);
  }, [isReady]);

  return (
    <motion.div style={reduced ? undefined : { y, opacity }} className="will-change-transform">
      <h1 className="font-display text-[clamp(3.15rem,8.4vw,7.6rem)] leading-[0.86] tracking-[-0.065em] text-white">
        <RevealLine text={line1} start={0.02} show={show} reduced={reduced} />
        <RevealLine
          text={line2}
          start={0.22}
          show={show}
          reduced={reduced}
          className="text-white/38 text-[0.62em] mt-[0.08em]"
        />
        <RevealLine text={line3} start={0.42} show={show} reduced={reduced} className="mt-[0.06em]" />
      </h1>
    </motion.div>
  );
};

export default KineticHeroTitle;
