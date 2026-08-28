import React from 'react';
import { getFaqsData, getFaqHeaderData } from '@/lib/data';
import { FAQPage } from '@/views/FAQPage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PublicFaqRoute() {
  const [faqs, headerConfig] = await Promise.all([
    getFaqsData(),
    getFaqHeaderData(),
  ]);

  return (
    <FAQPage
      faqs={faqs}
      headerConfig={headerConfig}
    />
  );
}

