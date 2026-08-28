import { NextResponse } from 'next/server';
import { getDeploymentsData } from '@/lib/data';

export async function GET() {
  try {
    const products = await getDeploymentsData();
    return NextResponse.json(products);
  } catch (error) {
    console.warn('[Prisma Projects Fetch Fallback]', error);
    return NextResponse.json([]);
  }
}

