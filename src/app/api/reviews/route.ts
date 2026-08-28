import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getReviewsData } from '@/lib/data';

export async function GET() {
  try {
    const reviews = await getReviewsData(false);
    return NextResponse.json(reviews);
  } catch (error) {
    console.warn('[Prisma Review Fetch Fallback]', error);
    return NextResponse.json([]);
  }
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, role, company, comment, rating, avatarUrl } = body;

    if (!name || !comment) {
      return NextResponse.json(
        { success: false, error: 'Name and comment are required' },
        { status: 400 }
      );
    }

    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('username:password')) {
      const created = await prisma.reviewItem.create({
        data: {
          name,
          role: role || 'Verified Client',
          company: company || '',
          comment,
          rating: Number(rating) || 5,
          avatarUrl: avatarUrl || '',
          dateString: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          }),
          isVerified: true,
          isApproved: true,
        },
      });
      return NextResponse.json({ success: true, data: created });
    }

    // Fallback response when DB credentials are still placeholders
    return NextResponse.json({
      success: true,
      data: {
        id: `rev-${Date.now()}`,
        name,
        role: role || 'Verified Client',
        company: company || '',
        comment,
        rating: Number(rating) || 5,
        avatarUrl: avatarUrl || '',
        dateString: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }),
        isVerified: true,
        isApproved: true,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
