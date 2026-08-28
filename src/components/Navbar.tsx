'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

import { ArrowRight, Activity, Zap, Volume2, VolumeX, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Page } from '../types';
import { ButterButton } from './ButterButton';
import { PlayfulLogo } from './PlayfulLogo';
import { sound } from '../utils/audio';

interface NavbarProps {
  currentPage?: Page;
  setCurrentPage?: (page: Page) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage: propCurrentPage,
  setCurrentPage,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  // Derive current active page from pathname or prop
  let activePage: Page = 'home';
  if (propCurrentPage) {
    activePage = propCurrentPage;
  } else if (pathname === '/deployments') {
    activePage = 'deployments';
  } else if (pathname === '/about') {
    activePage = 'about';
  } else if (pathname === '/faq') {
    activePage = 'faq';
  } else if (pathname === '/contact') {
    activePage = 'contact';
  } else if (pathname.startsWith('/project/')) {
    activePage = 'project-detail';
  }

  const navItems: { id: Page; label: string; href: string }[] = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'deployments', label: 'Deployments', href: '/deployments' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'faq', label: 'FAQ', href: '/faq' },
    { id: 'contact', label: 'Contact', href: '/contact' },
  ];

  const [hoveredNav, setHoveredNav] = useState<Page | null>(null);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (item: { id: Page; href: string }) => {
    sound.playPageSwitch();
    setIsMobileMenuOpen(false);
    if (setCurrentPage) {
      setCurrentPage(item.id);
    } else {
      router.push(item.href);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeNavItem = navItems.find((item) => item.id === activePage) || navItems[0];


  return (
    <header className="sticky top-1.5 sm:top-3 z-[100] w-full px-2 sm:px-6 transition-all duration-300 pointer-events-none">
      <motion.div
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
        className={`pointer-events-auto relative max-w-7xl mx-auto rounded-full bg-[#130722]/85 backdrop-blur-2xl sm:backdrop-blur-3xl border transition-all duration-500 overflow-visible select-none ${
          isHeaderHovered
            ? 'border-purple-400/60 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_40px_rgba(139,0,238,0.45),inset_0_1px_2px_rgba(255,255,255,0.4)]'
            : 'border-purple-500/35 shadow-[0_15px_40px_rgba(0,0,0,0.65),0_0_25px_rgba(139,0,238,0.25),inset_0_1px_1.5px_rgba(255,255,255,0.2)]'
        }`}
      >
        {/* ================= VIBRANT PURPLE GLASS BACKDROP & MESH ================= */}
        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-[#200a3e]/70 via-[#120524]/60 to-[#280d4c]/70 pointer-events-none overflow-hidden" />

        {/* Ambient Subtle Noise & Purple Glow */}
        <div className="absolute -top-10 inset-x-0 h-20 bg-gradient-to-b from-[#8B00EE]/25 to-transparent blur-xl pointer-events-none" />

        {/* ================= OUTLINE THAT RESPONDS & BOUNCES WITH PAGE SWITCHES ================= */}
        <motion.div
          key={`outline-bounce-${activePage}`}
          className="absolute inset-0 rounded-[inherit] pointer-events-none border-2 z-0"

          initial={{
            borderColor: 'rgba(192, 132, 252, 0.9)',
            boxShadow: '0 0 35px rgba(139, 0, 238, 0.7), inset 0 0 25px rgba(168, 85, 247, 0.5)',
            scale: 1.002,
          }}
          animate={{
            borderColor: 'rgba(168, 85, 247, 0.35)',
            boxShadow: '0 0 15px rgba(139, 0, 238, 0.2), inset 0 0 10px rgba(168, 85, 247, 0.15)',
            scale: 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 16,
            mass: 0.8,
          }}
        />

        {/* Top Specular Purple Glass Rim Reflection */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-200/70 to-transparent pointer-events-none z-10" />

        {/* Bottom Ambient Glow Line */}
        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B00EE]/50 to-transparent pointer-events-none z-10" />

        {/* ================= MAIN HEADER BAR CONTENT ================= */}
        <div className="relative z-10 px-2.5 sm:px-4 md:px-5 lg:px-8 h-12 sm:h-16 md:h-16 lg:h-20 flex items-center justify-between gap-1.5 sm:gap-2.5 md:gap-3 lg:gap-4">
          
          {/* LEFT: Wordmark + Outgraved Glass Studio Avatar Badge */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 flex-shrink-0">
            {/* Outgraved Glass Brand Logo with Automatic loop on Mobile & Hover on Desktop */}
            <PlayfulLogo onClick={() => handleNavClick({ id: 'home', href: '/' })} />

            <div className="hidden lg:block h-6 w-[1px] bg-purple-500/30" />

            {/* Outgraved Glass Studio Avatar & Status (Appears on wide desktops) */}
            <div className="hidden xl:flex items-center gap-2.5">
              <div className="relative p-1 rounded-2xl bg-[#1c0c32]/85 backdrop-blur-xl border border-purple-400/40 shadow-lg">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#8B00EE] via-[#5B009D] to-[#0A0B14] flex items-center justify-center text-white font-black text-xs shadow-[0_2px_10px_rgba(139,0,238,0.5)]">
                  AX
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0A0B14] shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              </div>

              <div className="flex flex-col px-2.5 py-1 rounded-xl bg-[#18092c]/75 backdrop-blur-md border border-purple-500/30 shadow-inner">
                <span className="font-extrabold text-[10.5px] text-white tracking-tight">
                  ANORIX STUDIO
                </span>
                <span className="text-[8.5px] font-black tracking-widest text-[#C084FC] uppercase">
                  DIGITAL ARTIST & DEV
                </span>
              </div>
            </div>
          </div>

          {/* CENTER (MOBILE): Dropdown Menu Switcher Button in the middle */}
          <div className="md:hidden flex items-center justify-center flex-1 min-w-0 px-1">
            <button
              onClick={() => {
                sound.playClick();
                setIsMobileMenuOpen((prev) => !prev);
              }}
              id="mobile-nav-dropdown-toggle"
              aria-label="Toggle Page Menu"
              aria-expanded={isMobileMenuOpen}
              className={`flex items-center justify-center gap-1 px-2.5 py-1 rounded-full bg-[#1c0c32]/90 backdrop-blur-xl border transition-all duration-300 select-none cursor-pointer max-w-full truncate ${
                isMobileMenuOpen
                  ? 'border-purple-300 bg-[#2b0f4c] shadow-[0_0_15px_rgba(168,85,247,0.7)] text-white'
                  : 'border-purple-400/40 text-purple-200 hover:text-white hover:border-purple-300/80 shadow-[0_0_10px_rgba(139,0,238,0.3)]'
              }`}
            >
              <span className="text-[10px] font-black tracking-wider uppercase text-[#C084FC] truncate">
                {activeNavItem.label}
              </span>
              {isMobileMenuOpen ? (
                <X className="w-3 h-3 text-purple-200 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-3 h-3 text-purple-300 flex-shrink-0" />
              )}
            </button>
          </div>

          {/* CENTER (DESKTOP & TABLET): Purple Glass Navigation Channel with Bouncing Active Glass Pill & Outline */}
          <nav className="hidden md:flex items-center bg-[#18092c]/85 backdrop-blur-2xl p-1 md:p-1.5 rounded-full border border-purple-500/35 shadow-inner relative flex-shrink-0">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              const isHovered = hoveredNav === item.id;

              return (
                <button
                  key={item.id}
                  onMouseEnter={() => {
                    setHoveredNav(item.id);
                    sound.playHover();
                  }}
                  onMouseLeave={() => setHoveredNav(null)}
                  onClick={() => handleNavClick(item)}
                  id={`nav-link-${item.id}`}
                  className={`group relative px-2.5 sm:px-3 lg:px-4 py-1.5 md:py-2 text-[11px] lg:text-xs transition-colors duration-200 cursor-pointer rounded-full select-none ${
                    isActive
                      ? 'text-white font-extrabold'
                      : 'text-slate-200 hover:text-white font-semibold'
                  }`}
                >
                  {/* Active bouncing background pill with synchronized bounding outline */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-gradient-to-r from-[#8B00EE] via-[#A855F7] to-[#7C3AED] rounded-full shadow-[0_0_25px_rgba(168,85,247,0.75),inset_0_1px_1px_rgba(255,255,255,0.4)] z-0"
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 18,
                        mass: 0.8,
                        bounce: 0.45,
                      }}
                    >
                      {/* Outline that bounces and follows the exact pill bounds in lockstep */}
                      <motion.div
                        layoutId="activeNavPillOutline"
                        className="absolute -inset-[1.5px] rounded-full border-2 border-purple-200/90 shadow-[0_0_20px_rgba(192,132,252,0.85)] pointer-events-none"
                        transition={{
                          type: 'spring',
                          stiffness: 350,
                          damping: 18,
                          mass: 0.8,
                          bounce: 0.45,
                        }}
                      />
                      <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent rounded-t-full pointer-events-none" />
                    </motion.div>
                  )}

                  {/* HOVER LINE ANIMATION UNDER NAV PAGE NAMES */}
                  <motion.div
                    className="absolute bottom-1 left-2.5 right-2.5 h-[2px] rounded-full bg-gradient-to-r from-[#C084FC] via-[#FFFFFF] to-[#38BDF8] shadow-[0_0_8px_#C084FC] pointer-events-none z-20 origin-center"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: isHovered ? 1 : 0,
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.22,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />

                  <span className="relative z-10 whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* RIGHT: Desktop Telemetry + Contact CTA, Mobile Right Compact Contact CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 flex-shrink-0">
            {/* Engraved Live Metric Pill with Real-time FPS Telemetry (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18092c]/85 backdrop-blur-md border border-cyan-500/30 text-[10px] xl:text-[11px] font-mono font-bold text-white shadow-inner">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>99.98% LIVE</span>
              </span>
              <span className="text-purple-400/40">•</span>
              <span className="text-cyan-400 flex items-center gap-1">
                <Activity className="w-3 h-3 text-cyan-400" />
                <span>24ms</span>
              </span>
              <span className="text-purple-400/40">•</span>
              <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-[#C084FC] border border-purple-500/30 text-[9px] xl:text-[10px]">
                60 FPS
              </span>
            </div>



            {/* Outgraved 3D Glass Contact CTA (Desktop + Mobile Responsive) */}
            <ButterButton
              variant="primary"
              size="md"
              onClick={() => handleNavClick({ id: 'contact', href: '/contact' })}
              id="nav-contact-cta-btn"
              icon={<ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" />}
              iconPosition="right"
              className="text-[10px] sm:text-xs md:text-sm lg:text-sm uppercase tracking-wider font-black shadow-[0_0_20px_rgba(139,0,238,0.55)] !py-1.5 sm:!py-2 md:!py-2.5 !px-3 sm:!px-4 md:!px-5 lg:!px-6 whitespace-nowrap rounded-full hover:scale-105 transition-transform"
            >
              CONTACT
            </ButterButton>
          </div>
        </div>

        {/* ================= COMPACT MOBILE DROPDOWN MENU ================= */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden absolute top-[calc(100%+8px)] inset-x-2 p-2 rounded-2xl bg-[#130722]/95 backdrop-blur-3xl border border-purple-500/40 shadow-[0_20px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(139,0,238,0.35)] z-50 flex flex-col gap-1 overflow-hidden"
            >
              {/* Subtle specular rim inside dropdown */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-300/60 to-transparent pointer-events-none" />

              <div className="px-2 py-1 flex items-center justify-between text-[9px] font-mono font-bold text-purple-400/70 uppercase tracking-widest border-b border-purple-500/20 mb-0.5">
                <span>NAVIGATION</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ONLINE
                </span>
              </div>

              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`relative w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 select-none ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-[#8B00EE]/80 via-[#A855F7]/80 to-[#7C3AED]/80 border border-purple-300/50 shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                        : 'text-slate-200 hover:text-white hover:bg-purple-900/30'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                    ) : (
                      <ArrowRight className="w-3 h-3 text-purple-400/50" />
                    )}
                  </button>
                );
              })}


            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </header>
  );
};
