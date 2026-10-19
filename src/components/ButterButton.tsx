'use client';

import React, { useRef, useState, useEffect } from 'react';

import { sound } from '../utils/audio';

export interface ButterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'emerald' | 'pink' | 'blue' | 'white' | 'purple' | 'cyan' | 'green' | 'ghost' | 'solid' | 'line' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  butterColor?: string;
  showArrow?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const ButterButton: React.FC<ButterButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  className = '',
  children,
  icon,
  iconPosition = 'left',
  butterColor,
  showArrow = false,
  onClick,
  ...rest
}) => {
  const btnRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [isTouchDevice, setIsTouchDevice] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    }
    return false;
  });

  // Detect genuine touch/mobile/tablet devices where hover physically does not exist
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

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (isTouchDevice) return;
    sound.playHover();
    const el = btnRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      setCoords({ x, y });
    }
    setIsHovered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (isTouchDevice) return;
    const el = btnRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      setCoords({ x, y });
    }
    setIsHovered(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    sound.playClick();
    if (onClick) onClick(e);
  };

  // Sizing styles
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs gap-1.5 rounded-full',
    md: 'px-6 py-2.5 sm:py-3 text-xs sm:text-sm gap-2 rounded-full',
    lg: 'px-8 py-3.5 text-sm sm:text-base gap-2.5 rounded-full font-extrabold',
    icon: 'w-9 h-9 sm:w-10 sm:h-10 p-0 flex items-center justify-center rounded-full',
  }[size];

  // Color themes
  const colorThemes = {
    primary: {
      defaultBg: 'bg-[#180A30]',
      text: 'text-[#E8EBF2]',
      hoverText: 'text-[#E8EBF2]',
      wipeGradient: 'linear-gradient(135deg, #8B00EE 0%, #A855F7 50%, #38BDF8 100%)',
      shadow: 'hover:shadow-[0_0_30px_rgba(139,0,238,0.65)]',
    },
    purple: {
      defaultBg: 'bg-[#180A30]',
      text: 'text-[#E8EBF2]',
      hoverText: 'text-[#E8EBF2]',
      wipeGradient: 'linear-gradient(135deg, #8B00EE 0%, #A855F7 50%, #C084FC 100%)',
      shadow: 'hover:shadow-[0_0_30px_rgba(139,0,238,0.65)]',
    },
    secondary: {
      defaultBg: 'bg-[#09152B]',
      text: 'text-[#E8EBF2]',
      hoverText: 'text-[#E8EBF2]',
      wipeGradient: 'linear-gradient(135deg, #0284C7 0%, #06B6D4 50%, #8B00EE 100%)',
      shadow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]',
    },
    cyan: {
      defaultBg: 'bg-[#081F33]',
      text: 'text-[#E8EBF2]',
      hoverText: 'text-[#E8EBF2]',
      wipeGradient: 'linear-gradient(135deg, #00F0FF 0%, #0284C7 60%, #38BDF8 100%)',
      shadow: 'hover:shadow-[0_0_30px_rgba(0,240,255,0.6)]',
    },
    emerald: {
      defaultBg: 'bg-[#07241A]',
      text: 'text-[#E8EBF2]',
      hoverText: 'text-[#E8EBF2]',
      wipeGradient: 'linear-gradient(135deg, #00FF9D 0%, #10B981 50%, #059669 100%)',
      shadow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]',
    },
    green: {
      defaultBg: 'bg-[#07241A]',
      text: 'text-[#E8EBF2]',
      hoverText: 'text-[#E8EBF2]',
      wipeGradient: 'linear-gradient(135deg, #00FF9D 0%, #10B981 50%, #06B6D4 100%)',
      shadow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]',
    },
    pink: {
      defaultBg: 'bg-[#2B0A23]',
      text: 'text-[#E8EBF2]',
      hoverText: 'text-[#E8EBF2]',
      wipeGradient: 'linear-gradient(135deg, #FF0055 0%, #EC4899 50%, #8B00EE 100%)',
      shadow: 'hover:shadow-[0_0_30px_rgba(255,0,85,0.6)]',
    },
    glass: {
      defaultBg: 'bg-[#181932]',
      text: 'text-[#E8EBF2]',
      hoverText: 'text-[#E8EBF2]',
      wipeGradient: 'linear-gradient(135deg, #8B00EE 0%, #A855F7 50%, #38BDF8 100%)',
      shadow: 'hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]',
    },
    ghost: {
      defaultBg: 'bg-[#15172C]',
      text: 'text-[#E8EBF2]',
      hoverText: 'text-[#E8EBF2]',
      wipeGradient: 'linear-gradient(135deg, #8B00EE 0%, #C084FC 100%)',
      shadow: 'hover:shadow-[0_0_22px_rgba(168,85,247,0.4)]',
    },
    blue: {
      defaultBg: 'bg-[#09152B]',
      text: 'text-[#E8EBF2]',
      hoverText: 'text-[#E8EBF2]',
      wipeGradient: 'linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)',
      shadow: 'hover:shadow-[0_0_30px_rgba(56,189,248,0.6)]',
    },
    white: {
      defaultBg: 'bg-[#E8EBF2]/15',
      text: 'text-[#E8EBF2]',
      hoverText: 'text-[#E8EBF2]',
      wipeGradient: 'linear-gradient(135deg, #8B00EE 0%, #A855F7 100%)',
      shadow: 'hover:shadow-[0_0_30px_rgba(139,0,238,0.55)]',
    },
    solid: {
      defaultBg: 'bg-[#E8EBF2]',
      text: 'text-[#0B0D12]',
      hoverText: 'group-hover:text-[#E8EBF2]',
      wipeGradient: 'linear-gradient(160deg, #0B0D12 0%, #1c1c1c 100%)',
      shadow: 'hover:shadow-[0_12px_40px_rgba(6, 8, 12,0.35)]',
    },
    line: {
      defaultBg: 'bg-transparent',
      text: 'text-[#E8EBF2]',
      hoverText: 'group-hover:text-[#0B0D12]',
      wipeGradient: '#E8EBF2',
      shadow: '',
    },
    outline: {
      defaultBg: 'bg-transparent',
      text: 'text-[#E8EBF2]',
      hoverText: 'text-[#E8EBF2]',
      wipeGradient: 'linear-gradient(115deg, rgba(232, 235, 242,0) 0%, rgba(232, 235, 242,0.22) 48%, rgba(232, 235, 242,0) 100%)',
      shadow: 'hover:shadow-[0_0_24px_rgba(232, 235, 242,0.14)]',
    },
  }[variant] || {
    defaultBg: 'bg-[#180A30]',
    text: 'text-[#E8EBF2]',
    hoverText: 'text-[#E8EBF2]',
    wipeGradient: 'linear-gradient(135deg, #8B00EE 0%, #A855F7 50%, #38BDF8 100%)',
    shadow: 'hover:shadow-[0_0_30px_rgba(139,0,238,0.65)]',
  };

  const isIconButton = size === 'icon';

  // On touch/mobile devices: gradient is ALWAYS 100% active & visible!
  // On desktop: directional wipe tracks the mouse coordinate.
  const isWipeActive = isTouchDevice || isHovered;

  const content = (
    <>
      {/* 
        DIRECTIONAL COLOR WIPE:
        - Permanently active on touch/mobile/tablet devices!
        - Directional slow-motion sweep on desktop hover at any screen size!
      */}
      <span
        className="butter-button-wipe absolute inset-0 z-0 pointer-events-none rounded-full overflow-hidden will-change-[clip-path]"
        style={{
          background: butterColor || colorThemes.wipeGradient,
          clipPath: isWipeActive
            ? isTouchDevice
              ? 'circle(170% at 50% 50%)'
              : `circle(170% at ${coords.x}px ${coords.y}px)`
            : `circle(0% at ${coords.x}px ${coords.y}px)`,
          transition: isTouchDevice ? 'none' : 'clip-path 0.55s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      />


      {/* Button Content */}
      <span className={`relative z-10 font-mono font-bold tracking-wider uppercase inline-flex items-center gap-2 ${colorThemes.text} ${colorThemes.hoverText} transition-all duration-300`}>
        {icon && iconPosition === 'left' && (
          <span className="shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5">
            {icon}
          </span>
        )}
        <span className="whitespace-nowrap">{children}</span>
        {icon && iconPosition === 'right' && (
          <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
            {icon}
          </span>
        )}
        {showArrow && !isIconButton && (
          <span className="shrink-0 font-mono text-cyan-200 transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        )}
      </span>
    </>
  );

  // Zero borders, zero outlines, responsive active scaling
  const frame = variant === 'outline' ? 'border-2 border-[#E8EBF2]' : variant === 'line' ? 'border border-[#E8EBF2]/80' : 'border-0';
  const buttonClasses = `butter-button relative overflow-hidden group ${frame} outline-none ring-0 focus:outline-none focus:ring-0 transition-all duration-300 cursor-pointer select-none hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.96] inline-flex items-center justify-center font-mono ${colorThemes.defaultBg} ${colorThemes.shadow} ${sizeClasses} ${className}`;

  if (href) {
    const isExternal = href.startsWith('http://') || href.startsWith('https://');
    const computedTarget = target || (isExternal ? '_blank' : undefined);
    const computedRel = rel || (computedTarget === '_blank' ? 'noopener noreferrer' : undefined);

    return (
      <a
        ref={btnRef as any}
        href={href}
        target={computedTarget}
        rel={computedRel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={buttonClasses}
        style={{ outline: 'none', border: variant === 'outline' || variant === 'line' ? undefined : 'none' }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as any}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={buttonClasses}
      style={{ outline: 'none', border: variant === 'outline' || variant === 'line' ? undefined : 'none' }}
      {...(rest as any)}
    >
      {content}
    </button>
  );
};

export default ButterButton;
