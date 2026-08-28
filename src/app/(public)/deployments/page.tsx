import React from 'react';
import { getDeploymentsData } from '@/lib/data';
import { DeploymentsPage } from '@/views/DeploymentsPage';

export const revalidate = 60;

export default async function PublicDeploymentsRoute() {
  const products = await getDeploymentsData();

  return (
    <DeploymentsPage
      products={products}
    />
  );
}

