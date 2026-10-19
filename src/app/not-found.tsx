import React from 'react';
import Link from 'next/link';
import { PublicShell } from '@/components/PublicShell';
import { BlurText } from '@/components/site/BlurText';

export default function NotFound() {
  return (
    <PublicShell>
      <section className="ah-404">
        <div className="ah-glow ah-glow-warm" aria-hidden="true" />
        <div className="ah-grid">
          <p className="ah-chapter" style={{ marginBottom: 0 }}>
            <span className="ah-pill"><span className="ah-pill-dot" />404</span>
          </p>
          <h1 className="ah-404-num" aria-label="404">
            4<i>0</i>4
          </h1>
          <div className="ah-404-foot" style={{ gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: 28 }}>
            <BlurText load delay={0.2} as="h2" text="This page could not be found." serif={['found.']} className="ah-d3" />
            <Link href="/" className="ah-btn ah-btn-primary">
              Home
            </Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
