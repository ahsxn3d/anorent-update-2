'use client';

import React, { useState } from 'react';

import { ArrowLeft, ArrowRight, ExternalLink, Copy, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DeploymentProduct, Page } from '../types';
import { ButterButton } from '../components/ButterButton';
import { sound } from '../utils/audio';

interface ProjectDetailPageProps {
  product: DeploymentProduct;
  onBack?: () => void;
  setCurrentPage?: (page: Page) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  product,
  onBack,
  setCurrentPage: propSetCurrentPage,
}) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const navigateTo = (page: Page) => {
    sound.playPageSwitch();
    if (propSetCurrentPage) {
      propSetCurrentPage(page);
    } else {
      router.push(page === 'home' ? '/' : `/${page}`);
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const setCurrentPage = navigateTo;

  const handleBack = () => {
    sound.playClick();
    if (onBack) {
      onBack();
    } else {
      router.push('/deployments');
    }
  };


  const handleCopyLink = () => {
    sound.playChime();
    navigator.clipboard.writeText(product.demoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stack = product.techStack || [];
  const facts: [string, React.ReactNode][] = [
    ['Category', product.category],
    ...(product.client ? [['Client', product.client] as [string, React.ReactNode]] : []),
    ...(product.year ? [['Year', String(product.year)] as [string, React.ReactNode]] : []),
    ['Status', product.status || 'Production'],
    ['Rating', '4.9 / 5.0'],
  ];

  return (
    <div className="lux-detail pt-4 sm:pt-6 pb-8">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 pb-5 border-b border-[rgba(232,235,242,0.08)]">
        <button type="button" onClick={handleBack} className="lux-ghost-btn group">
          <ArrowLeft className="w-4 h-4 transition-[translate] duration-200 group-hover:-translate-x-0.5" aria-hidden="true" />
          <span>All deployments</span>
        </button>
        <button type="button" onClick={handleCopyLink} className="lux-ghost-btn" aria-live="polite">
          {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
          <span>{copied ? 'Link copied' : 'Share'}</span>
        </button>
      </div>

      {/* Header */}
      <header data-fx="rise" className="mt-12 sm:mt-16 grid lg:grid-cols-12 gap-8 lg:gap-8 items-end">
        <div className="lg:col-span-8">
          <p className="lux-sh-eyebrow">{product.category}{product.year ? ` · ${product.year}` : ''}</p>
          <h1 className="lux-sh-title mt-5 text-[40px] sm:text-[64px] lg:text-[76px] leading-[1] text-[#E8EBF2]">
            {product.title}
          </h1>
          {product.shortDescription && (
            <p className="mt-6 max-w-2xl text-[16px] sm:text-[18px] leading-relaxed text-[#8B93A7]">{product.shortDescription}</p>
          )}
        </div>
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3">
          <ButterButton
            variant="outline"
            size="lg"
            onClick={() => {
              window.open(product.demoUrl, '_blank');
            }}
            icon={<ExternalLink className="w-4 h-4" />}
            iconPosition="right"
            className="lux-primary w-full sm:w-auto justify-center uppercase tracking-wider !py-3.5 !px-8 text-xs sm:text-sm"
          >
            Visit Live Demo
          </ButterButton>
          <ButterButton
            variant="line"
            size="md"
            onClick={() => {
              setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            className="w-full sm:w-auto justify-center uppercase tracking-wider text-xs"
          >
            Inquire for Similar Build
          </ButterButton>
        </div>
      </header>

      {/* Media */}
      <div
        data-fx="media"
        className="mt-10 sm:mt-14 relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-[16px] overflow-hidden border border-[rgba(232,235,242,0.08)] bg-[#171B24]"
      >
        <div data-fx-inner className="absolute inset-0">
          <img
            src={product.thumbnailUrl}
            alt={product.title}
            loading="eager"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Overview + facts */}
      <div className="mt-14 sm:mt-20 grid lg:grid-cols-12 gap-12 lg:gap-8">
        <div className="lg:col-span-7" data-fx="rise">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#8B93A7]">Overview</p>
          <p className="mt-5 text-[17px] sm:text-[20px] leading-[1.6] text-[#E8EBF2]/85">
            {product.fullDescription || product.shortDescription}
          </p>
        </div>
        <div className="lg:col-span-4 lg:col-start-9" data-fx="rise">
          <dl className="border-t border-[rgba(232,235,242,0.08)]">
            {facts.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-6 py-3.5 border-b border-[rgba(232,235,242,0.08)]">
                <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#8B93A7]">{k}</dt>
                <dd className="text-[14px] text-[#E8EBF2] text-right">{v}</dd>
              </div>
            ))}
          </dl>
          {stack.length > 0 && (
            <div className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#8B93A7]">Stack</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {stack.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full border border-[rgba(232,235,242,0.12)] text-[12px] text-[#E8EBF2]/80">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
