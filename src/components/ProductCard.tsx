'use client';

import React, { useState } from 'react';

import { ExternalLink, Copy, Check, Star, Tag, Layers, Cpu, Sparkles, Zap, Globe } from 'lucide-react';
import { DeploymentProduct } from '../types';
import { HoloCard } from './HoloCard';
import { ButterButton } from './ButterButton';
import { sound } from '../utils/audio';

interface ProductCardProps {
  item?: DeploymentProduct;
  id?: string;
  slug?: string;
  title?: string;
  category?: string;
  badge?: string;
  shortDescription?: string;
  description?: string;
  fullDescription?: string;
  thumbnailUrl?: string;
  thumbnail?: string;
  coverImageUrl?: string;
  isFeatured?: boolean;
  demoUrl?: string;
  githubUrl?: string;
  sourceUrl?: string;
  liveUrl?: string;
  techStack?: string[];
  fpsBenchmark?: number;
  auditScore?: number;
  rating?: number;
  onInspect?: (product: DeploymentProduct) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  id = 'prod-default',
  slug,
  title = 'Untitled Deployment',
  category = 'UI Templates',
  badge,
  shortDescription = 'High-performance interactive web experience.',
  description,
  fullDescription,
  thumbnailUrl = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  thumbnail,
  coverImageUrl,
  isFeatured = false,
  demoUrl = '#',
  githubUrl,
  sourceUrl,
  liveUrl,
  techStack = ['React', 'Next.js', 'Tailwind CSS'],
  fpsBenchmark = 60,
  auditScore = 100,
  rating = 5.0,
  onInspect,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const effectiveShortDesc = item?.shortDescription || item?.description || description || shortDescription;
  const effectiveThumb = item?.thumbnailUrl || item?.thumbnail || thumbnail || thumbnailUrl;
  const effectiveDemo = item?.demoUrl || item?.liveUrl || liveUrl || demoUrl;
  const effectiveSource = item?.githubUrl || item?.sourceUrl || githubUrl || sourceUrl;

  const product: DeploymentProduct = item || {
    id,
    slug: slug || id,
    title,
    category,
    badge,
    shortDescription: effectiveShortDesc,
    fullDescription: fullDescription || effectiveShortDesc,
    description: effectiveShortDesc,
    thumbnailUrl: effectiveThumb,
    thumbnail: effectiveThumb,
    coverImageUrl,
    isFeatured,
    demoUrl: effectiveDemo,
    liveUrl: effectiveDemo,
    githubUrl: effectiveSource,
    sourceUrl: effectiveSource,
    techStack,
    fpsBenchmark,
    auditScore,
    rating,
    displayOrder: 1,
  };

  const handleCopyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    navigator.clipboard.writeText(product.demoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <HoloCard
      onClick={() => onInspect?.(product)}
      className={`group relative overflow-hidden min-h-[235px] h-[235px] xs:min-h-[250px] xs:h-[250px] sm:min-h-[300px] sm:h-[300px] md:min-h-[340px] md:h-[340px] lg:h-[400px] cursor-pointer rounded-xl sm:rounded-2xl border border-purple-500/30 hover:border-purple-400/80 shadow-2xl ${className}`}
    >
      {/* Background Image Layer - 100% Sharp, Clear & Crisp */}
      <img
        src={product.thumbnailUrl}
        alt={product.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-100 will-change-transform pointer-events-none"
      />

      {/* Subtle top shade for high contrast readability of top info */}
      <div className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-[#0A0B14]/95 via-[#0A0B14]/65 to-transparent pointer-events-none" />

      {/* ========================================================
          MOBILE & TABLET VIEW (< lg)
          Top: Title, Star Rating, Short Description & Visit Demo CTA
          Bottom: Category Tag & Copy Button (100% backgroundless, see-through to thumbnail at the bottom)
          ======================================================== */}
      
      <div className="lg:hidden flex flex-col justify-between h-full w-full p-2.5 sm:p-4 relative z-20 pointer-events-auto">
        {/* Top Content Area */}
        <div className="flex flex-col gap-1 sm:gap-2">
          <div className="flex items-center justify-between gap-1">
            <h3 className="font-display font-black text-xs sm:text-sm text-white truncate leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              {product.title}
            </h3>
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-500/25 text-amber-300 text-[8px] sm:text-[9.5px] font-black rounded-full shrink-0 border border-amber-500/40 shadow-sm backdrop-blur-sm">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
              <span>4.9</span>
            </div>
          </div>

          <p className="text-[9.5px] sm:text-xs text-slate-200 line-clamp-2 leading-tight font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
            {product.shortDescription}
          </p>

          <div className="pt-1">
            <ButterButton
              variant="primary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                window.open(product.demoUrl, '_blank');
              }}
              icon={<ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
              iconPosition="right"
              className="w-full uppercase tracking-wider font-black text-[8.5px] sm:text-[10px] !py-1.5 sm:!py-2 !px-2 shadow-md"
            >
              VISIT DEMO
            </ButterButton>
          </div>
        </div>

        {/* Bottom Footer Bar (100% Backgroundless & See-Through to Thumbnail) */}
        <div className="mt-auto pt-2 bg-transparent flex items-center justify-between gap-1 sm:gap-2">
          <div className="flex items-center gap-1 text-[#C084FC] text-[8.5px] sm:text-[10px] font-mono font-black uppercase tracking-wider truncate max-w-[62%] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
            <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#C084FC] shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]" />
            <span className="truncate">{product.category}</span>
          </div>

          <button
            onClick={handleCopyUrl}
            className="flex items-center gap-1 text-slate-100 hover:text-white text-[8.5px] sm:text-[10px] font-bold transition-all cursor-pointer active:scale-95 shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
            title="Copy deployment link"
          >
            {copied ? (
              <>
                <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]" />
                <span className="text-emerald-300 font-bold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]" />
                <span className="text-slate-100">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ========================================================
          DESKTOP VIEW (lg+)
          Top Badges: Category & Copy
          Bottom Overlay: Smooth Seamless Fade-In Panel on Mouse Hover
          ======================================================== */}
      
      {/* Desktop Top Header Badges */}
      <div className="hidden lg:flex absolute top-0 inset-x-0 p-3 items-center justify-between z-30 pointer-events-auto">
        <span className="px-2.5 py-1 bg-[#0A0B14]/90 backdrop-blur-md border border-purple-500/40 text-[#C084FC] text-[10px] font-mono font-bold rounded-full uppercase tracking-wider shadow-md truncate max-w-[65%]">
          {product.category}
        </span>
        <button
          onClick={handleCopyUrl}
          className="px-2.5 py-1 bg-[#0A0B14]/90 hover:bg-[#131422] backdrop-blur-md border border-purple-500/40 text-white text-[10px] font-semibold rounded-full flex items-center gap-1 transition-all cursor-pointer shadow-md hover:scale-105 shrink-0"
          title="Copy deployment link"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-300 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-purple-300" />
              <span className="text-slate-200">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Desktop Seamless Fade-In Glass Panel on Hover */}
      <div className="hidden lg:flex absolute inset-x-0 bottom-0 p-5 pt-12 bg-gradient-to-t from-[#0A0B14] via-[#0A0B14]/90 to-transparent backdrop-blur-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out will-change-transform z-20 flex-col justify-between gap-3 pointer-events-auto">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-1.5">
            <h3 className="font-display font-black text-sm text-white group-hover:text-[#C084FC] transition-colors leading-snug truncate">
              {product.title}
            </h3>
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-full shrink-0 border border-amber-500/30">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>4.9</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-snug line-clamp-2 font-medium">
            {product.shortDescription}
          </p>

          <div className="pt-0.5 flex flex-wrap gap-1">
            {(product.techStack || []).slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="px-1.5 py-0.5 bg-[#8B00EE]/30 border border-[#8B00EE]/50 text-[#E9D5FF] text-[9.5px] font-mono font-bold rounded-full truncate"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-1">
          <ButterButton
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              window.open(product.demoUrl, '_blank');
            }}
            icon={<ExternalLink className="w-3.5 h-3.5" />}
            iconPosition="right"
            className="w-full uppercase tracking-wider font-black text-xs !py-2 !px-3 shadow-md"
          >
            VISIT DEMO
          </ButterButton>
        </div>
      </div>
    </HoloCard>
  );
};

export default ProductCard;
