import React from 'react';
import { getAboutData, getProofMetricsData } from '@/lib/data';
import { AboutPage } from '@/views/AboutPage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PublicAboutRoute() {
  const [aboutContent, proofMetrics] = await Promise.all([
    getAboutData(),
    getProofMetricsData(),
  ]);

  return (
    <AboutPage
      aboutContent={aboutContent}
      proofMetrics={proofMetrics}
    />
  );
}

