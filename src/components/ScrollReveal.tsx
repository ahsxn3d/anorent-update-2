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
  duration = 0.65,
  distance = 36,
  className = '',
  id,
  threshold = 0.15,
}) => {
  const getInitialProps = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance, scale: 0.98 };
      case 'down':
        return { opacity: 0, y: -distance, scale: 0.98 };
      case 'left':
        return { opacity: 0, x: distance, scale: 0.98 };
      case 'right':
        return { opacity: 0, x: -distance, scale: 0.98 };
      case 'zoom':
        return { opacity: 0, scale: 0.92 };
      case 'fade':
      default:
        return { opacity: 0 };
    }
  };

  const getAnimateInView = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0, scale: 1 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0, scale: 1 };
      case 'zoom':
      case 'fade':
      default:
        return { opacity: 1, scale: 1 };
    }
  };

  return (
    <motion.div
      id={id}
      initial={getInitialProps()}
      whileInView={getAnimateInView()}
      viewport={{ once: false, amount: threshold, margin: '0px 0px -40px 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Smooth buttery cubic bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
