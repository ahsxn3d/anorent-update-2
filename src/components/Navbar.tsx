'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Page } from '../types';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
  ];

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

  return (
    <header className="sticky top-0 z-[100] w-full">
      <div
        className={`relative h-14 sm:h-[4.25rem] px-5 sm:px-8 lg:px-10 flex items-center border-b transition-colors duration-500 ${
          scrolled || isMobileMenuOpen
            ? 'bg-[#121110]/80 backdrop-blur-xl border-[#EDE9E3]/10'
            : 'bg-[#121110]/35 backdrop-blur-md border-transparent'
        }`}
      >
        <button
          onClick={() => handleNavClick({ id: 'home', href: '/' })}
          className="relative z-10 text-[15px] tracking-[-0.04em] text-[#EDE9E3] hover:opacity-60 transition-opacity duration-500 cursor-pointer"
        >
          Anorix
        </button>

        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                id={`nav-link-${item.id}`}
                onMouseEnter={() => sound.playHover()}
                className={`lux-link text-[13px] tracking-[-0.01em] cursor-pointer transition-colors duration-500 ${
                  isActive ? 'text-[#EDE9E3]' : 'text-[#EDE9E3]/40 hover:text-[#EDE9E3]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="ml-auto relative z-10 flex items-center gap-2">
          <button
            onClick={() => handleNavClick({ id: 'contact', href: '/contact' })}
            id="nav-contact-cta-btn"
            className="inline-flex items-center h-9 px-4 rounded-full bg-[#3B82F6] text-[#EDE9E3] text-[13px] tracking-[-0.01em] hover:bg-[#2563EB] transition-colors duration-200 cursor-pointer"
          >
            Contact
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setIsMobileMenuOpen((prev) => !prev);
            }}
            id="mobile-nav-dropdown-toggle"
            aria-label="Toggle Page Menu"
            aria-expanded={isMobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 text-[#EDE9E3]/80 hover:text-[#EDE9E3] cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute left-0 right-0 top-full bg-[#121110]/95 backdrop-blur-md border-b border-[#EDE9E3]/10"
          >
            <div className="px-5 py-2 flex flex-col">
              {[...navItems, { id: 'contact' as Page, label: 'Contact', href: '/contact' }].map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`flex items-center justify-between py-3.5 border-b border-[#EDE9E3]/8 text-left text-[16px] tracking-[-0.03em] cursor-pointer ${
                      isActive ? 'text-[#EDE9E3]' : 'text-[#EDE9E3]/50'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
