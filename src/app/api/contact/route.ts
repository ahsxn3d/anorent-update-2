import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, projectType, budget, timeline, message } = body;

    if (!email || !message) {
      return NextResponse.json(
        { success: false, error: 'Email and message are required fields' },
        { status: 400 }
      );
    }

    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('username:password')) {
      const submission = await prisma.contactSubmission.create({
        data: {
          name: name || 'Anonymous',
          email,
          company: company || '',
          projectType: projectType || 'General Inquiry',
          budget: budget || 'Undisclosed',
          timeline: timeline || 'Standard',
          message,
          status: 'UNREAD',
        },
      });
      return NextResponse.json({ success: true, data: submission });
    }

    // Fallback response when DB credentials are still placeholders
    return NextResponse.json({
      success: true,
      data: {
        id: `sub-${Date.now()}`,
        name: name || 'Anonymous',
        email,
        company: company || '',
        projectType: projectType || 'General Inquiry',
        budget: budget || 'Undisclosed',
        timeline: timeline || 'Standard',
        message,
        status: 'UNREAD',
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('username:password')) {
      const submissions = await prisma.contactSubmission.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json(submissions);
    }
    return NextResponse.json([]);
  } catch (error: any) {
    console.warn('[Prisma Contact Submissions Fetch Fallback]', error);
    return NextResponse.json([]);
  }
}


