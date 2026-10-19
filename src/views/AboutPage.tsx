'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { Page, AboutContent, ProofMetricCard } from '../types';
import { BlurText, Arrow } from '../components/site/BlurText';
import { AboutStatsMatrix } from '../components/AboutStatsMatrix';
import { sound } from '../utils/audio';

interface AboutPageProps {
  setCurrentPage?: (page: Page) => void;
  aboutContent?: AboutContent;
  proofMetrics?: ProofMetricCard[];
  name?: string;
  artistName?: string;
  title?: string;
  tagline?: string;
  executiveBio?: string;
  bio?: string;
  avatarUrl?: string;
  locationTimezone?: string;
  availabilityStatus?: string;
  contactEmail?: string;
  skills?: string[];
  techSkills?: string[];
  isSignedIn?: boolean;
  setIsSignedIn?: (val: boolean) => void;
  openAuthModal?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  setCurrentPage: propSetCurrentPage,
  aboutContent,
  name,
  artistName,
  title,
  tagline,
  executiveBio,
  bio,
  avatarUrl,
  locationTimezone,
  availabilityStatus,
  contactEmail,
  skills,
  techSkills,
}) => {
  const router = useRouter();

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

  const finalName = name || artistName || aboutContent?.name || aboutContent?.artistName || aboutContent?.profileName || 'Ahsan';
  const finalTitle = title || tagline || aboutContent?.title || aboutContent?.tagline || aboutContent?.role || 'Solo Creative Developer & 3D Artist';
  const finalBio = executiveBio || bio || aboutContent?.executiveBio || aboutContent?.bio || 'I design and engineer bespoke web experiences, interactive 3D WebGL environments, and production-ready Next.js interfaces directly for founders and modern brands. Operating as an independent developer, I provide end-to-end craft—from shaders and 3D assets to clean, scalable full-stack code with zero agency overhead or middlemen.';
  const finalEmail = contactEmail || aboutContent?.contactEmail || 'ahsxn3d@gmail.com';
  const finalLocation = locationTimezone || aboutContent?.locationTimezone || aboutContent?.location || 'Remote / Global (UTC+5)';
  const finalAvailability = availabilityStatus || aboutContent?.availabilityStatus || aboutContent?.availability || 'Available for Hire';
  const finalHandle = aboutContent?.handle || '@Ahsanwebdesign';

  const defaultSkills = [
    'Next.js 15',
    'React 19',
    'Tailwind CSS',
    'Prisma ORM',
    'Three.js',
    'GSAP',
    'Blender',
    'Maya',
    'Houdini',
    'Unreal Engine 5',
    'TypeScript',
    'WebGL / GLSL',
  ];
  const finalSkills = skills || techSkills || aboutContent?.techSkills || defaultSkills;

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="ah-page ah-about">
      {/* STEP 1: TOP IDENTITY STRIP */}
      <div className="ah-ab-strip">
        <div className="ah-ab-id">
          <span className="ah-mono-av">{finalName.slice(0, 2).toUpperCase()}</span>
          <div style={{ minWidth: 0 }}>
            <h3>
              {finalName}
              <span className="ah-pill" style={{ height: 24 }}>{finalTitle}</span>
            </h3>
            <p>
              {finalEmail} • {finalLocation} • {finalHandle}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="ah-btn ah-btn-primary ah-btn-sm"
          onClick={() => {
            setCurrentPage('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span>Contact Studio</span>
          <Arrow className="ah-btn-arrow" />
        </button>
      </div>

      {/* STEP 2: MAIN DUAL COLUMN */}
      <section className="ah-ab-main ah-phero" style={{ paddingTop: 'clamp(64px, 9vw, 150px)' }}>
        <div className="ah-glow" aria-hidden="true" />
        <div className="ah-grid">
          <div className="ah-ab-left">
            <div>
              <p className="ah-chapter" style={{ marginBottom: 28 }}>
                <span className="ah-serif">01</span>
                <span className="ah-chapter-rule" />
                <span>Executive Profile // {finalTitle}</span>
              </p>
              <BlurText as="h1" load text={finalName.toUpperCase()} className="ah-d1 ah-ab-name" />
              <BlurText
                load
                delay={0.25}
                text={`${finalTitle} • ${finalLocation} • ${finalHandle}`}
                className="ah-ab-sub"
              />
            </div>

            {/* BIO & EXECUTIVE SUMMARY */}
            <div>
              <p className="ah-chapter">
                <span className="ah-serif">02</span>
                <span className="ah-chapter-rule" />
                <span>Bio & Executive Summary</span>
              </p>
              <BlurText
                text={finalBio}
                serif={['digital artist', 'frontend developer', '3D aesthetics', 'hyper-scalable', 'creative artistic expression', 'bulletproof engineering', 'high-performance', 'end-to-end craft']}
                className="ah-ab-bio"
              />
            </div>

            {/* STATS MATRIX */}
            <div>
              <p className="ah-chapter">
                <span className="ah-serif">03</span>
                <span className="ah-chapter-rule" />
              </p>
              <AboutStatsMatrix setCurrentPage={setCurrentPage} />
            </div>

            {/* TECHNICAL STACK */}
            <div>
              <p className="ah-chapter">
                <span className="ah-serif">04</span>
                <span className="ah-chapter-rule" />
                <span>Technical Stack & Specializations</span>
              </p>
              <ul className="ah-skills">
                {finalSkills.map((skill, idx) => (
                  <li key={idx} data-r="" style={{ ['--d' as string]: `${(idx % 3) * 0.06}s` } as React.CSSProperties}>
                    <span>{pad(idx + 1)}</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* INQUIRE CTA */}
            <div data-r="">
              <button
                type="button"
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                id="inquire-collaboration-btn"
                className="ah-btn ah-btn-primary"
              >
                <span>Inquire for Collaboration</span>
                <Arrow className="ah-btn-arrow" />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE STICKY CARD */}
          <aside className="ah-ab-right">
            <div className="ah-card" data-r="blur">
              <div className="ah-card-big-av" aria-hidden="true">{finalName.slice(0, 2).toUpperCase()}</div>
              <h3 className="ah-d3" style={{ fontSize: 34 }}>{finalName}</h3>
              <p className="ah-label" style={{ marginTop: 10 }}>{finalTitle}</p>
              <div className="ah-kv">
                <div><span className="ah-label">Email</span><span>{finalEmail}</span></div>
                <div><span className="ah-label">Location</span><span>{finalLocation}</span></div>
                <div>
                  <span className="ah-label">Availability</span>
                  <span className="ah-pill" style={{ color: 'var(--ah-cream)' }}><span className="ah-pill-dot" />{finalAvailability}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
