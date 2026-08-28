import React from 'react';
import { getDeploymentsData } from '@/lib/data';
import { DeploymentsPage } from '@/views/DeploymentsPage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PublicDeploymentsRoute() {
  const products = await getDeploymentsData();

  return (
    <DeploymentsPage
      products={products}
    />
  );
}

