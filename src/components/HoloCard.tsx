'use client';

import React, { useRef, useState, useEffect } from 'react';

import { sound } from '../utils/audio';

export type HoloCardTheme = 'purple' | 'green' | 'emerald' | 'blue' | 'cyan' | 'custom';

interface HoloCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  maxTilt?: number;
  glowColor?: string;
  enableGlow?: boolean;
  theme?: HoloCardTheme;
  glassy?: boolean;
}

interface ThemeConfig {
  defaultGlow: string;
  defaultBorder: string;
  hoverBorder: string;
  hoverShadow: string;
  topSheen: string;
  glassGradient: string;
  accentRgb: string;
}

const quiet: ThemeConfig = {
  defaultGlow: 'rgba(232, 235, 242, 0.2)',
  defaultBorder: 'border-[#E8EBF2]/10',
  hoverBorder: 'border-[#E8EBF2]/40',
  hoverShadow: 'shadow-none',
  topSheen: 'from-transparent via-[#E8EBF2]/30 to-transparent',
  glassGradient: '#0B0D12',
  accentRgb: '255, 255, 255',
};

const themeStyles: Record<string, ThemeConfig> = {
  purple: quiet,
  green: quiet,
  emerald: quiet,
  blue: quiet,
  cyan: quiet,
};

export const HoloCard: React.FC<HoloCardProps> = ({
  children,
  className = '',
  onClick,
  maxTilt = 24,
  glowColor,
  enableGlow = true,
  theme = 'purple',
  glassy = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const activeTheme = themeStyles[theme] || themeStyles.purple;
  const effectiveGlowColor = glowColor || activeTheme.defaultGlow;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xRatio = mouseX / rect.width;
    const yRatio = mouseY / rect.height;

    // Center offset from -0.5 to 0.5
    const xPct = xRatio - 0.5;
    const yPct = yRatio - 0.5;

    // 3D tilt calculation: top tilts toward viewer when cursor is at top
    const tiltLimit = Math.min(maxTilt, 4);
    const rotX = -yPct * tiltLimit;
    const rotY = xPct * tiltLimit;

    setTilt({ x: rotX, y: rotY });
    setGlare({
      x: xRatio * 100,
      y: yRatio * 100,
      opacity: 0.75,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sound.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleClick = () => {
    sound.playClick();
    if (onClick) onClick();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ perspective: 1000 }}
      className="relative w-full h-full select-none"
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) translateY(-4px)`
            : 'rotateX(0deg) rotateY(0deg) translateY(0px)',
          background: '#0B0D12',
          backdropFilter: undefined,
          WebkitBackdropFilter: undefined,
          transition: isHovered
            ? 'transform 0.08s ease-out, border-color 0.25s ease, box-shadow 0.25s ease'
            : 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease',
          transformStyle: 'preserve-3d',
        }}
        className={`relative w-full h-full rounded-xl sm:rounded-2xl border transition-colors duration-300 will-change-transform ${
          glassy
            ? 'shadow-[0_8px_32px_rgba(6, 8, 12,0.37),inset_0_1px_1px_rgba(232, 235, 242,0.22)]'
            : 'bg-[#130722]'
        } ${
          isHovered
            ? `${activeTheme.hoverShadow} ${activeTheme.hoverBorder}`
            : `${activeTheme.defaultBorder}`
        } ${className}`}
      >
        {/* Frosted Glass Top Edge Highlight */}
        <div
          className={`absolute inset-x-0 top-0 h-[1.5px] rounded-t-xl sm:rounded-t-2xl pointer-events-none bg-gradient-to-r ${activeTheme.topSheen} opacity-90 z-20`}
        />

        {/* 3D Specular Interactive Glare Sheet on Cursor Movement */}
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-30 mix-blend-overlay transition-opacity duration-150"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(232, 235, 242, 0.4) 0%, rgba(232, 235, 242, 0.05) 45%, transparent 75%)`,
          }}
        />

        {/* Cyber Ambient Glow behind Card on Hover */}
        {enableGlow && (
          <div
            className="absolute inset-0 rounded-[inherit] transition-opacity duration-300 pointer-events-none -z-10 blur-xl"
            style={{
              opacity: isHovered ? 0.9 : 0,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, ${effectiveGlowColor}, transparent 75%)`,
            }}
          />
        )}

        {/* Inner Content moved cohesively with the full card */}
        <div className="relative z-10 w-full h-full text-rendering-optimizeLegibility antialiased">
          {children}
        </div>
      </div>
    </div>
  );
};

export default HoloCard;

