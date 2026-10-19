'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Page } from '../types';
import { sound } from '../utils/audio';

interface NavbarProps {
  currentPage?: Page;
  setCurrentPage?: (page: Page) => void;
}

const pad = (n: number) => String(n).padStart(2, '0');

export const Navbar: React.FC<NavbarProps> = ({ currentPage: propCurrentPage, setCurrentPage }) => {
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

  useEffect(() => {
    document.documentElement.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

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

  const menuItems = [...navItems, { id: 'contact' as Page, label: 'Contact', href: '/contact' }];

  return (
    <header className={`ah-nav ${scrolled ? 'is-scrolled' : ''} ${isMobileMenuOpen ? 'is-open' : ''}`}>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="ah-menu md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ah-glow" aria-hidden="true" />
            <ul className="ah-menu-list">
              {menuItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: 0.18 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    onClick={() => handleNavClick(item)}
                    className={`ah-menu-item ${activePage === item.id ? 'is-active' : ''}`}
                  >
                    <small>{pad(i + 1)}</small>
                    <span>{item.label}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="ah-menu-foot ah-label">
              <span>Anorix</span>
              <span>© 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="ah-nav-bar">
        <button type="button" onClick={() => handleNavClick({ id: 'home', href: '/' })} className="ah-logo" aria-label="Anorix home">
          Anor<i>ix</i>
        </button>

        <nav className="ah-nav-links" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => handleNavClick(item)}
                id={`nav-link-${item.id}`}
                onMouseEnter={() => sound.playHover()}
                className={`ah-nav-link ${isActive ? 'is-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="ah-nav-right">
          <button
            type="button"
            onClick={() => handleNavClick({ id: 'contact', href: '/contact' })}
            id="nav-contact-cta-btn"
            className="ah-nav-cta"
          >
            Contact
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setIsMobileMenuOpen((prev) => !prev);
            }}
            id="mobile-nav-dropdown-toggle"
            aria-label="Toggle Page Menu"
            aria-expanded={isMobileMenuOpen}
            className="ah-burger"
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
};
