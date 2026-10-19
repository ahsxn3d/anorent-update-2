'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DeploymentProduct, Page } from '../types';
import { BlurText, Arrow } from '../components/site/BlurText';
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

  const [name, ...restTitle] = product.title.split(' | ');
  const subtitle = restTitle.join(' | ');

  return (
    <div className="ah-page ah-pd">
      {/* TOP NAVIGATION & ACTION BAR */}
      <div className="ah-pd-top">
        <button type="button" onClick={handleBack} className="ah-pd-back">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Deployments</span>
        </button>

        <div className="ah-pd-actions">
          <button type="button" onClick={handleCopyLink} className="ah-btn ah-btn-ghost ah-btn-sm">
            {copied ? 'Link Copied!' : 'Share Project'}
          </button>
          <button
            type="button"
            className="ah-btn ah-btn-primary ah-btn-sm"
            onClick={() => {
              window.open(product.demoUrl, '_blank');
            }}
          >
            <span>Launch Live Demo</span>
            <Arrow className="ah-btn-arrow" />
          </button>
        </div>
      </div>

      {/* TITLE */}
      <section className="ah-pd-head" aria-label={product.title}>
        <div className="ah-glow" aria-hidden="true" />
        <div className="ah-grid">
          <div className="ah-pd-meta-row">
            <span className="ah-pill"><span className="ah-pill-dot" />{product.category}</span>
            <span className="ah-pill">ID: {product.id}</span>
            <span className="ah-pill"><span style={{ color: 'var(--ah-coral)' }}>★</span> 4.9 / 5.0 Rating</span>
          </div>
          <div className="ah-pd-title">
            <h1 className="ah-d1" aria-label={product.title}>
              <BlurText as="span" load text={name} />
              {subtitle ? (
                <>
                  {' '}
                  <BlurText as="span" load delay={0.2} text={`| ${subtitle}`} className="ah-serif ah-dim" />
                </>
              ) : null}
            </h1>
          </div>
        </div>
      </section>

      {/* BIG FULL-SIZE HIGH-RES THUMBNAIL FRAME */}
      <div className="ah-pd-seq">
        <div className="ah-pd-sticky">
          <div className="ah-pd-media" data-r="media">
            <Image src={product.thumbnailUrl} alt={product.title} width={1600} height={900} sizes="100vw" loading="eager" className="ah-pd-shot" />
            {product.coverImageUrl && product.coverImageUrl !== product.thumbnailUrl ? (
              <Image src={product.coverImageUrl} alt="" width={1600} height={900} sizes="100vw" className="ah-pd-shot ah-pd-shot-2" />
            ) : null}
            <div className="ah-pd-overlay">
              <span className="ah-chip"><span className="ah-pill-dot" />LIVE 60FPS SHADER ENGINE</span>
              <span className="ah-chip ah-hide-sm">HTTPS://ANORIX.STUDIO</span>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT DETAILS & COMPLETE DESCRIPTION */}
      <section className="ah-pd-body ah-light">
        <div className="ah-grid">
          <p className="ah-chapter">
            <span className="ah-serif">01</span>
            <span className="ah-chapter-rule" />
            <span>Complete System Description</span>
          </p>

          <dl className="ah-pd-specs" data-r="">
            <div><dt>Category</dt><dd>{product.category}</dd></div>
            {product.client ? <div><dt>Client</dt><dd>{product.client}</dd></div> : null}
            {product.year ? <div><dt>Year</dt><dd>{product.year}</dd></div> : null}
            {product.client || product.year ? <div><dt>Status</dt><dd>{product.status || 'Production'}</dd></div> : null}
            <div><dt>ID</dt><dd>{product.id}</dd></div>
          </dl>

          <div className="ah-pd-desc">
            <BlurText text={product.fullDescription || product.shortDescription} className="ah-pd-text" />
            <div style={{ marginTop: 'clamp(48px, 5vw, 80px)' }} data-r="">
              <span className="ah-label">Full Technology Stack</span>
              <div className="ah-pd-stack">
                {(product.techStack || []).map((tech, idx) => (
                  <span key={idx} className="ah-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          <aside className="ah-pd-aside" data-r="">
            <span className="ah-label">Live Deployment Actions</span>
            <button
              type="button"
              className="ah-btn ah-btn-primary ah-btn-block"
              onClick={() => {
                window.open(product.demoUrl, '_blank');
              }}
            >
              <span>Visit Live Demo</span>
              <Arrow className="ah-btn-arrow" />
            </button>
            <button
              type="button"
              className="ah-btn ah-btn-ghost ah-btn-block"
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Inquire for Similar Build
            </button>
            <ul className="ah-pd-checks">
              <li>Awwwards-Grade Architecture</li>
              <li>8ms TTFB &amp; 60 FPS WebGL</li>
              <li>Global Edge CDN Distributed</li>
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
};
