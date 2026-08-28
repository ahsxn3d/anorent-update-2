import React from 'react';
import { notFound } from 'next/navigation';
import { getDeploymentBySlug, getDeploymentsData } from '@/lib/data';
import { ProjectDetailPage } from '@/views/ProjectDetailPage';

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getDeploymentsData();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export default async function PublicProjectDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getDeploymentBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <ProjectDetailPage
      product={product}
    />
  );
}

