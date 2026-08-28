import React from 'react';
import { getHeroData, getDeploymentsData, getReviewsData } from '@/lib/data';
import { HomePage } from '@/views/HomePage';

export const revalidate = 60; // ISR revalidation every 60s

export default async function PublicHomePage() {
  const [heroContent, products, reviews] = await Promise.all([
    getHeroData(),
    getDeploymentsData(),
    getReviewsData(true),
  ]);

  return (
    <HomePage
      products={products}
      reviews={reviews}
      heroContent={heroContent}
      isLoaded={true}
    />
  );
}

