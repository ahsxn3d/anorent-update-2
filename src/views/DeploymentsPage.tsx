'use client';

import React, { useState } from 'react';

import { Search, X, Sparkles, Layers, Cpu, Zap, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DeploymentProduct, Page } from '../types';
import { ProductCard } from '../components/ProductCard';
import { BlurText, Arrow } from '../components/site/BlurText';
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


  return (
    <div className="ah-page ah-dep">
      {/* PAGE HEADER */}
      <section className="ah-phero">
        <div className="ah-glow" aria-hidden="true" />
        <div className="ah-grid">
          <p className="ah-chapter">
            <span className="ah-serif">01</span>
            <span className="ah-chapter-rule" />
            <span>Awwwards-Grade Ecosystem</span>
          </p>
          <div className="ah-phero-title">
            <BlurText as="h1" load text="DEPLOYED DIGITAL PRODUCTS" serif={['DIGITAL']} className="ah-d1" />
          </div>
          <div className="ah-phero-side">
            <span className="ah-pill">
              <span className="ah-pill-dot" />
              <span className="ah-hi">{filteredProducts.length}</span>
              <span>of {products.length} Systems</span>
            </span>
            <BlurText
              load
              delay={0.35}
              text="High-performance web architectures, scalable SaaS dashboards, and immersive video-animated interfaces engineered for production."
              className="ah-lede"
            />
          </div>
        </div>
      </section>

      {/* FILTER INDEX + SEARCH */}
      <div className="ah-dep-bar">
        <div className="ah-tabs" role="tablist" aria-label="Filter deployments">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.name;
            const count = getCategoryCount(cat.name);
            const Icon = cat.icon;
            return (
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                key={cat.name}
                onClick={() => handleSelectCategory(cat.name)}
                id={`filter-bubble-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`ah-tab ${isActive ? 'is-active' : ''}`}
              >
                <Icon className="w-3.5 h-3.5" style={{ marginRight: 4, opacity: 0.7 }} />
                <span>{cat.label}</span>
                <sup>{count}</sup>
              </button>
            );
          })}
        </div>
        <label className="ah-search">
          <Search className="w-3.5 h-3.5" />
          <input
            type="text"
            placeholder="Search systems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setSearchQuery('');
              }}
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </label>
      </div>

      {/* GALLERY */}
      {products.length === 0 ? (
        <div className="ah-empty">
          <span className="ah-pill">
            <span className="ah-pill-dot" />
            COMMISSIONS OPEN // ZERO ACTIVE ARCHIVES
          </span>
          <BlurText as="h3" text="Production Archives Staged for New Projects" className="ah-d3" />
          <p className="ah-lede" style={{ margin: '0 auto' }}>
            No placeholder projects are listed. Custom 3D WebGL scenes, bespoke Next.js architectures, and full-stack platforms are currently available for commission.
          </p>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              if (propSetCurrentPage) {
                propSetCurrentPage('contact');
              } else {
                router.push('/contact');
              }
            }}
            className="ah-btn ah-btn-primary"
          >
            Start A Commission ↗
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="ah-empty">
          <BlurText as="h3" text="No deployments found" className="ah-d3" />
          <p className="ah-lede" style={{ margin: '0 auto' }}>
            Try adjusting your search criteria or select &apos;All&apos; from the categories above.
          </p>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="ah-btn ah-btn-ghost ah-btn-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="ah-gallery">
          {filteredProducts.map((item, idx) => (
            <ProductCard
              key={item.id}
              item={item}
              {...item}
              index={idx}
              isFeatured={false}
              onInspect={(prod) => handleSelectProduct(prod)}
            />
          ))}
        </div>
      )}

      <section className="ah-panel ah-cobalt-ground" aria-label="Start a commission">
        <div className="ah-glow ah-glow-low" aria-hidden="true" />
        <div className="ah-panel-in">
          <BlurText as="h2" text="Start A Commission" serif={['Commission']} className="ah-d2" />
          <div className="ah-panel-act">
            <button
              type="button"
              className="ah-btn ah-btn-primary"
              onClick={() => {
                sound.playClick();
                if (propSetCurrentPage) propSetCurrentPage('contact');
                else router.push('/contact');
              }}
            >
              <span>Start A Commission</span>
              <Arrow className="ah-btn-arrow" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
