'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SmoothScroll } from './SmoothScroll';
import { CustomCursor } from './CustomCursor';
import { MagneticGridBackground } from './MagneticGridBackground';

export const PublicShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#0A0B14] text-white flex flex-col selection:bg-[#8B00EE] selection:text-white">
        {/* Fine pointer interactive dot & aura cursor on desktop */}
        <CustomCursor />

        {/* Global Butter Progress Bar at the top */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B00EE] via-[#00F0FF] to-[#00FF9D] origin-left z-[9999] pointer-events-none shadow-[0_0_12px_rgba(139,0,238,0.8)]"
          style={{ scaleX }}
        />

        {/* High-Precision Interactive Magnetic Grid Background Layer */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <MagneticGridBackground />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0A0B14]/60 to-[#0A0B14] opacity-85 pointer-events-none" />
        </div>

        {/* Floating Obsidian Capsule Navbar */}
        <Navbar />

        {/* Main Content Viewport */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 relative z-10">
          {children}
        </main>

        {/* Bottom Telemetry & Ecosystem Footer */}
        <Footer setCurrentPage={() => {}} />
      </div>
    </SmoothScroll>
  );
};
