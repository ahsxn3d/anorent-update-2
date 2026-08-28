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

const themeStyles: Record<string, ThemeConfig> = {
  purple: {
    defaultGlow: 'rgba(168, 85, 247, 0.7)',
    defaultBorder: 'border-purple-500/30',
    hoverBorder: 'border-purple-400',
    hoverShadow: 'shadow-[0_20px_45px_rgba(0,0,0,0.6),0_0_35px_rgba(168,85,247,0.55),inset_0_1px_2px_rgba(255,255,255,0.4)]',
    topSheen: 'from-transparent via-purple-300/80 to-transparent',
    glassGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(139, 0, 238, 0.1) 45%, rgba(10, 11, 20, 0.35) 100%)',
    accentRgb: '168, 85, 247',
  },
  green: {
    defaultGlow: 'rgba(16, 185, 129, 0.7)',
    defaultBorder: 'border-emerald-500/30',
    hoverBorder: 'border-emerald-400',
    hoverShadow: 'shadow-[0_20px_45px_rgba(0,0,0,0.6),0_0_35px_rgba(16,185,129,0.55),inset_0_1px_2px_rgba(255,255,255,0.4)]',
    topSheen: 'from-transparent via-emerald-300/80 to-transparent',
    glassGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(16, 185, 129, 0.1) 45%, rgba(10, 11, 20, 0.35) 100%)',
    accentRgb: '16, 185, 129',
  },
  emerald: {
    defaultGlow: 'rgba(16, 185, 129, 0.7)',
    defaultBorder: 'border-emerald-500/30',
    hoverBorder: 'border-emerald-400',
    hoverShadow: 'shadow-[0_20px_45px_rgba(0,0,0,0.6),0_0_35px_rgba(16,185,129,0.55),inset_0_1px_2px_rgba(255,255,255,0.4)]',
    topSheen: 'from-transparent via-emerald-300/80 to-transparent',
    glassGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(16, 185, 129, 0.1) 45%, rgba(10, 11, 20, 0.35) 100%)',
    accentRgb: '16, 185, 129',
  },
  blue: {
    defaultGlow: 'rgba(56, 189, 248, 0.7)',
    defaultBorder: 'border-cyan-500/30',
    hoverBorder: 'border-cyan-400',
    hoverShadow: 'shadow-[0_20px_45px_rgba(0,0,0,0.6),0_0_35px_rgba(56,189,248,0.55),inset_0_1px_2px_rgba(255,255,255,0.4)]',
    topSheen: 'from-transparent via-cyan-300/80 to-transparent',
    glassGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(56, 189, 248, 0.1) 45%, rgba(10, 11, 20, 0.35) 100%)',
    accentRgb: '56, 189, 248',
  },
  cyan: {
    defaultGlow: 'rgba(56, 189, 248, 0.7)',
    defaultBorder: 'border-cyan-500/30',
    hoverBorder: 'border-cyan-400',
    hoverShadow: 'shadow-[0_20px_45px_rgba(0,0,0,0.6),0_0_35px_rgba(56,189,248,0.55),inset_0_1px_2px_rgba(255,255,255,0.4)]',
    topSheen: 'from-transparent via-cyan-300/80 to-transparent',
    glassGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(56, 189, 248, 0.1) 45%, rgba(10, 11, 20, 0.35) 100%)',
    accentRgb: '56, 189, 248',
  },
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
    const rotX = -yPct * maxTilt;
    const rotY = xPct * maxTilt;

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
            ? `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) translateY(-6px) scale3d(1.025, 1.025, 1.025)`
            : 'rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)',
          background: glassy ? activeTheme.glassGradient : '#130722',
          backdropFilter: glassy ? 'blur(16px) saturate(160%)' : undefined,
          WebkitBackdropFilter: glassy ? 'blur(16px) saturate(160%)' : undefined,
          transition: isHovered
            ? 'transform 0.08s ease-out, border-color 0.25s ease, box-shadow 0.25s ease'
            : 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease',
          transformStyle: 'preserve-3d',
        }}
        className={`relative w-full h-full rounded-xl sm:rounded-2xl border transition-colors duration-300 will-change-transform ${
          glassy
            ? 'shadow-[0_8px_32px_rgba(0,0,0,0.37),inset_0_1px_1px_rgba(255,255,255,0.22)]'
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
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 45%, transparent 75%)`,
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

