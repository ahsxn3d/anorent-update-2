'use client';

import React, { useState, useEffect, useRef } from 'react';

import {
  Search,
  X,
  Sparkles,
  Box,
  ChevronDown,
  Layers,
  Cpu,
  Zap,
  Globe,
  Filter,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { DeploymentProduct, Page } from '../types';
import { ProjectTile } from '../components/craft/Interactive';
import { ScrollReveal } from '../components/ScrollReveal';
import { GsapPlayfulText } from '../components/GsapPlayfulText';
import { sound } from '../utils/audio';

interface DeploymentsPageProps {
  products: DeploymentProduct[];
  setCurrentPage?: (page: Page) => void;
  onSelectProduct?: (product: DeploymentProduct) => void;
}

export const DeploymentsPage: React.FC<DeploymentsPageProps> = ({
  products,
  setCurrentPage: propSetCurrentPage,
  onSelectProduct,
}) => {
  const router = useRouter();

  const handleSelectProduct = (product: DeploymentProduct) => {
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      router.push(`/project/${product.slug}`);
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('category') || 'All';
    }
    return 'All';
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = [
    { name: 'All', label: 'All Systems', icon: Globe },
    { name: 'UI Templates', label: 'UI Templates', icon: Layers },
    { name: 'Full-Stack Apps', label: 'Full-Stack Apps', icon: Cpu },
    { name: 'Animated Sites', label: 'Animated Sites', icon: Sparkles },
    { name: 'SaaS Dashboards', label: 'SaaS Dashboards', icon: Zap },
  ];

  const handleSelectCategory = (cat: string) => {
    sound.playClick();
    setSelectedCategory(cat);
    setIsDropdownOpen(false);
    if (cat === 'All') {
      window.history.pushState({}, '', '/deployments');
    } else {
      window.history.pushState({}, '', `/deployments?category=${encodeURIComponent(cat)}`);
    }
  };

  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return products.length;
    return products.filter((p) => {
      if (cat === 'UI Templates') {
        return p.category === 'UI Templates' || p.category.toLowerCase().includes('ui');
      }
      if (cat === 'Full-Stack Apps') {
        return p.category === 'Full-Stack Apps' || p.category.toLowerCase().includes('stack') || p.category.toLowerCase().includes('ai');
      }
      if (cat === 'Animated Sites') {
        return p.category === 'Animated Sites' || p.shortDescription.toLowerCase().includes('webgl') || p.category.toLowerCase().includes('animated');
      }
      if (cat === 'SaaS Dashboards') {
        return p.category === 'SaaS Dashboards' || p.category.toLowerCase().includes('saas') || p.title.toLowerCase().includes('hud');
      }
      return p.category.toLowerCase() === cat.toLowerCase();
    }).length;
  };

  const filteredProducts = products.filter((p) => {
    let matchesCategory = false;
    if (selectedCategory === 'All') {
      matchesCategory = true;
    } else if (selectedCategory === 'UI Templates') {
      matchesCategory =
        p.category === 'UI Templates' ||
        p.category === 'UI Systems' ||
        p.category.toLowerCase().includes('ui') ||
        p.category.toLowerCase().includes('template');
    } else if (selectedCategory === 'Full-Stack Apps') {
      matchesCategory =
        p.category === 'Full-Stack Apps' ||
        p.category === 'Full Stack' ||
        p.category === 'Smart Contracts' ||
        p.category === 'Generative AI' ||
        p.category.toLowerCase().includes('stack') ||
        p.category.toLowerCase().includes('contract') ||
        p.category.toLowerCase().includes('ai');
    } else if (selectedCategory === 'Animated Sites') {
      matchesCategory =
        p.category === 'Animated Sites' ||
        p.category === '3D Assets' ||
        p.category === 'AR/VR' ||
        p.shortDescription.toLowerCase().includes('webgl') ||
        p.shortDescription.toLowerCase().includes('animation') ||
        p.shortDescription.toLowerCase().includes('3d');
    } else if (selectedCategory === 'SaaS Dashboards') {
      matchesCategory =
        p.category === 'SaaS Dashboards' ||
        p.title.toLowerCase().includes('saas') ||
        p.title.toLowerCase().includes('hud') ||
        p.shortDescription.toLowerCase().includes('saas') ||
        p.shortDescription.toLowerCase().includes('dashboard');
    }

    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const activeCategoryObj = categories.find((c) => c.name === selectedCategory) || categories[0];

  return (
    <div className="space-y-8 sm:space-y-12 pb-8 px-1 sm:px-0">
      
      {/* PAGE HEADER */}
      <ScrollReveal direction="down" delay={0.05} distance={20}>
        <div className="lux-page-head flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-10 border-b border-[#232837] pt-10 sm:pt-20 pb-10 sm:pb-14">
          <div className="space-y-1 sm:space-y-2.5 max-w-2xl">
            <div className="lux-eyebrow inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#5E667A] mb-4">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C084FC] animate-pulse" />
              <span>Awwwards-Grade Ecosystem</span>
            </div>
            
            <GsapPlayfulText
              as="h1"
              text="DEPLOYED DIGITAL PRODUCTS"
              highlightWords={['DEPLOYED', 'PRODUCTS']}
              gradientTheme="pure-purple"
              className="font-display text-2xl sm:text-5xl lg:text-6xl font-black text-[#E8EBF2] tracking-tight uppercase"
              staggerDelay={0.02}
              initialDelay={0.1}
            />

            <GsapPlayfulText
              as="p"
              text="High-performance web architectures, scalable SaaS dashboards, and immersive video-animated interfaces engineered for production."
              highlightWords={['High-performance', 'SaaS dashboards', 'immersive', 'engineered for production']}
              gradientTheme="purple-cyan"
              className="text-xs sm:text-sm text-slate-300 max-w-2xl font-medium leading-relaxed"
              staggerDelay={0.012}
              initialDelay={0.2}
            />
          </div>

          {/* Metric Status Pill */}
          <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#131422]/90 backdrop-blur-2xl border border-purple-500/30 rounded-full text-[10px] sm:text-xs font-mono font-bold text-[#E8EBF2] shadow-xl flex items-center gap-2 w-fit shrink-0">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#A855F7] animate-pulse" />
            <span className="text-[#C084FC] font-extrabold">{filteredProducts.length}</span>
            <span className="text-slate-400">of {products.length} Systems</span>
          </div>
        </div>
      </ScrollReveal>

      {/* ========================================================= */}
      {/* COMPACT STRAIGHT-LINE FILTER SYSTEM & TINY CIRCULAR SEARCH */}
      {/* ========================================================= */}
      <div data-fx="rise" className="relative z-40">
        <div className="relative z-40 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-2.5 p-1.5 sm:p-2 bg-[#131422]/90 backdrop-blur-2xl rounded-full border border-purple-500/30 shadow-xl max-xl:rounded-2xl">
          
          {/* DESKTOP (xl+): COMPACT STRAIGHT-LINE BUBBLE FILTER SYSTEM */}
          <div className="hidden xl:flex items-center gap-1.5 overflow-visible py-0.5 px-1 relative z-10">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.name;
              const count = getCategoryCount(cat.name);
              const Icon = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => handleSelectCategory(cat.name)}
                  id={`filter-bubble-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`relative px-3.5 py-1.5 text-xs font-bold rounded-full transition-colors duration-200 cursor-pointer select-none shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#E8EBF2] font-extrabold'
                      : 'text-slate-300 hover:text-[#E8EBF2] font-semibold'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBubblePill"
                      className="absolute inset-0 bg-gradient-to-r from-[#8B00EE] via-[#A855F7] to-[#7C3AED] rounded-full shadow-[0_0_22px_rgba(168,85,247,0.75),inset_0_1px_1px_rgba(232, 235, 242,0.4)] z-0"
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 18,
                        mass: 0.8,
                        bounce: 0.45,
                      }}
                    >
                      <motion.div
                        layoutId="activeFilterBubbleOutline"
                        className="absolute -inset-[1.5px] rounded-full border-2 border-purple-200/90 shadow-[0_0_18px_rgba(192,132,252,0.85)] pointer-events-none"
                        transition={{
                          type: 'spring',
                          stiffness: 350,
                          damping: 18,
                          mass: 0.8,
                          bounce: 0.45,
                        }}
                      />
                      <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-[#E8EBF2]/25 to-transparent rounded-t-full pointer-events-none" />
                    </motion.div>
                  )}
                  <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? 'text-[#E8EBF2]' : 'text-[#C084FC]'}`} />
                  <span className="relative z-10 whitespace-nowrap text-xs">{cat.label}</span>
                  <span className={`relative z-10 text-[9px] px-1.5 py-0.2 rounded-full font-mono font-extrabold ${
                    isActive ? 'bg-[#E8EBF2]/30 text-[#E8EBF2]' : 'bg-[#E8EBF2]/10 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* MOBILE & TABLET COMPACT DROPDOWN SELECTOR (< xl) */}
          <div className="block xl:hidden relative z-50" ref={dropdownRef}>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                sound.playClick();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-full bg-[#0A0B14]/90 border border-purple-400/40 text-[#E8EBF2] cursor-pointer shadow-lg hover:border-purple-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#8B00EE]/30 flex items-center justify-center text-[#C084FC]">
                  {React.createElement(activeCategoryObj.icon, { className: 'w-3 h-3 text-[#C084FC]' })}
                </div>
                <span className="text-xs font-bold text-[#E8EBF2]">
                  {activeCategoryObj.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-[#8B00EE]/30 text-[10px] font-mono text-purple-200">
                  {getCategoryCount(activeCategoryObj.name)} items
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-purple-300 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-[#E8EBF2]' : ''}`} />
              </div>
            </motion.button>

            {/* Floating Dropdown List */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute left-0 right-0 top-full mt-1.5 overflow-hidden bg-[#100420]/95 backdrop-blur-2xl rounded-2xl border border-purple-400/60 shadow-[0_20px_50px_rgba(6, 8, 12,0.95),0_0_25px_rgba(139,0,238,0.5)] p-1.5 space-y-1 z-50"
                >
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat.name;
                    const count = getCategoryCount(cat.name);
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.name}
                        onClick={() => handleSelectCategory(cat.name)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#8B00EE] to-[#A855F7] text-[#E8EBF2] shadow-md'
                            : 'text-slate-300 hover:bg-purple-950/60 hover:text-[#E8EBF2]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#E8EBF2]' : 'text-[#C084FC]'}`} />
                          <span>{cat.label}</span>
                        </div>
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                          isSelected ? 'bg-[#E8EBF2]/30 text-[#E8EBF2]' : 'bg-purple-950/80 text-purple-300'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE: TINY CIRCULAR SEARCH PILL */}
          <div className="relative w-full lg:w-64 shrink-0 flex items-center pr-0.5">
            <Search className="w-3.5 h-3.5 absolute left-3.5 text-[#C084FC] pointer-events-none" />
            <input
              type="text"
              placeholder="Search systems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-7 py-1.5 h-8 sm:h-8.5 bg-[#0A0B14]/90 border border-purple-500/35 rounded-full text-xs font-medium text-[#E8EBF2] placeholder-slate-400 focus:outline-none focus:border-[#A855F7]/90 focus:shadow-[0_0_12px_rgba(139,0,238,0.3)] transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  sound.playClick();
                  setSearchQuery('');
                }}
                className="absolute right-2 p-1 rounded-full text-slate-400 hover:text-[#E8EBF2] transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* 3D HOLOCARD PRODUCT SHOWCASE */}
      {products.length === 0 ? (
        <div data-fx="rise" className="text-center py-14 sm:py-20 px-6 bg-[#131422]/70 rounded-3xl border border-purple-500/30 backdrop-blur-2xl space-y-4 max-w-2xl mx-auto shadow-2xl">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#8B00EE]/20 border border-purple-400/40 flex items-center justify-center text-[#C084FC] shadow-[0_0_25px_rgba(139,0,238,0.4)]">
            <Box className="w-7 h-7 animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-[10px] font-mono font-bold text-emerald-300 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              COMMISSIONS OPEN // ZERO ACTIVE ARCHIVES
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-black text-[#E8EBF2] tracking-tight">
              Production Archives Staged for New Projects
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              No placeholder projects are listed. Custom 3D WebGL scenes, bespoke Next.js architectures, and full-stack platforms are currently available for commission.
            </p>
          </div>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                if (propSetCurrentPage) {
                  propSetCurrentPage('contact');
                } else {
                  router.push('/contact');
                }
              }}
              className="lux-solid-cta px-6 h-11 inline-flex items-center bg-[#4F7CFF] hover:bg-[#3D68F0] text-[#E8EBF2] text-xs font-semibold uppercase tracking-wider rounded-full transition-colors duration-150 cursor-pointer"
            >
              Start A Commission ↗
            </button>
          </div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-10 sm:py-16 px-4 bg-[#131422]/60 rounded-2xl sm:rounded-3xl border border-purple-500/20 backdrop-blur-xl space-y-2 sm:space-y-3">
          <Box className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 mx-auto animate-pulse" />
          <h3 className="font-display text-base sm:text-lg font-bold text-[#E8EBF2]">No deployments found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search criteria or select &apos;All&apos; from the categories above.
          </p>
          <button
            onClick={() => {
              sound.playClick();
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-3.5 sm:px-4 py-1.5 sm:py-2 bg-[#8B00EE] hover:bg-[#A855F7] text-[#E8EBF2] text-xs font-bold rounded-full transition-all shadow-md mt-2 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-14 sm:gap-y-20 pt-4">
          {filteredProducts.map((item, idx) => {
            // First tile is full width; if the rest leave a single tile alone in the last row, widen it too.
            const wide = idx === 0 || (idx === filteredProducts.length - 1 && (filteredProducts.length - 1) % 2 === 1);
            return (
            <div key={item.id} className={wide ? 'md:col-span-2' : 'col-span-1'}>
              <ProjectTile
                title={item.title}
                category={item.category}
                description={item.shortDescription}
                image={item.coverImageUrl || item.thumbnailUrl}
                tags={(item.techStack && item.techStack.length ? item.techStack : item.tags) || []}
                year={item.year ? String(item.year) : undefined}
                large={wide}
                onOpen={() => handleSelectProduct(item)}
              />
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
