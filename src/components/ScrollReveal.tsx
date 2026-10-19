'use client';

import React from 'react';
import { motion } from 'motion/react';

export interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'zoom' | 'fade';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  id?: string;
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 1.15,
  distance = 56,
  className = '',
  id,
  threshold = 0.18,
}) => {
  const getInitialProps = () => {
    const base = { opacity: 0, filter: 'blur(10px)' };
    switch (direction) {
      case 'up':
        return { ...base, y: distance };
      case 'down':
        return { ...base, y: -distance };
      case 'left':
        return { ...base, x: distance * 0.7 };
      case 'right':
        return { ...base, x: -distance * 0.7 };
      case 'zoom':
        return { ...base, y: 24, scale: 0.96 };
      case 'fade':
      default:
        return base;
    }
  };

  const getAnimateInView = () => {
    switch (direction) {
      case 'left':
      case 'right':
        return { opacity: 1, x: 0, filter: 'blur(0px)' };
      case 'zoom':
        return { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' };
      case 'fade':
        return { opacity: 1, filter: 'blur(0px)' };
      case 'up':
      case 'down':
      default:
        return { opacity: 1, y: 0, filter: 'blur(0px)' };
    }
  };

  return (
    <motion.div
      id={id}
      initial={getInitialProps()}
      whileInView={getAnimateInView()}
      viewport={{ once: true, amount: threshold, margin: '0px 0px -12% 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
