'use client';

import React, { useState } from 'react';
import { DeploymentProduct } from '../types';
import { sound } from '../utils/audio';
import { Arrow } from './site/BlurText';

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
  /** Position in the list, shown as an editorial index */
  index?: number;
}

const pad = (n: number) => String(n).padStart(2, '0');

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
  index,
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

  const [name, ...rest] = product.title.split(' | ');
  const subtitle = rest.join(' | ');

  return (
    <article className={`ah-work ${className}`}>
      <div
        role="button"
        tabIndex={0}
        className="ah-work-frame"
        data-r="media"
        onClick={() => onInspect?.(product)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onInspect?.(product);
          }
        }}
        aria-label={`Inspect ${product.title}`}
      >
        <span className="ah-work-zoom">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.thumbnailUrl} alt={product.title} loading="lazy" decoding="async" width={1200} height={900} />
        </span>
        <span className="ah-work-top">
          <span className="ah-chip">{product.category}</span>
          <button type="button" onClick={handleCopyUrl} className="ah-chip" title="Copy deployment link">
            {copied ? 'Copied' : 'Copy'}
          </button>
        </span>
        <span className="ah-work-hover ah-chip">
          Inspect <Arrow size={11} />
        </span>
      </div>

      <div className="ah-work-row" data-r="">
        <h3 className="ah-work-title">
          {typeof index === 'number' ? <em className="ah-serif ah-dim" style={{ fontSize: '0.5em', marginRight: 10, verticalAlign: '0.5em' }}>{pad(index + 1)}</em> : null}
          {name}
          {subtitle ? <span>{subtitle}</span> : null}
        </h3>
        <span className="ah-work-rate" aria-label="Rated 4.9">
          <b>★</b> 4.9
        </span>
      </div>

      <p className="ah-work-desc" data-r="" style={{ ['--d' as string]: '0.06s' } as React.CSSProperties}>
        {product.shortDescription}
      </p>

      <div className="ah-work-foot" data-r="" style={{ ['--d' as string]: '0.12s' } as React.CSSProperties}>
        <div className="ah-tags">
          {(product.techStack || []).slice(0, 3).map((tech, idx) => (
            <span key={idx} className="ah-tag">{tech}</span>
          ))}
        </div>
        <button
          type="button"
          className="ah-link"
          onClick={(e) => {
            e.stopPropagation();
            window.open(product.demoUrl, '_blank');
          }}
        >
          <span>VISIT DEMO</span>
          <Arrow />
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
