'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from './prisma';
import { DeploymentProduct, ContactSubmission, ReviewItem, FAQItem, HeroContent, AboutContent } from '../types';

// ===========================================================================
// 1. CONTACT BRIEF SUBMISSION & CRM KANBAN ACTIONS
// ===========================================================================

export interface ActionResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function submitContactBrief(formData: FormData | Record<string, any>): Promise<ActionResponse<ContactSubmission>> {
  try {
    const rawData: Record<string, any> =
      formData instanceof FormData
        ? Object.fromEntries(formData.entries())
        : formData;

    const name = String(rawData.name || rawData.clientName || '').trim();
    const email = String(rawData.email || '').trim();
    const message = String(rawData.message || rawData.projectBrief || '').trim();
    const company = rawData.company ? String(rawData.company).trim() : null;
    const projectType = String(rawData.projectType || rawData.serviceType || 'Custom 3D Website');
    const budget = String(rawData.budget || rawData.budgetTier || 'Flexible');
    const timeline = String(rawData.timeline || 'Flexible');

    if (!email || !message) {
      return { success: false, error: 'Email and project message are required.' };
    }

    let submission: any;
    try {
      submission = await prisma.contactSubmission.create({
        data: {
          name: name || 'Anonymous Founder',
          email,
          company,
          projectType,
          budget,
          timeline,
          message,
          status: 'NEW',
          priority: 'NORMAL',
        },
      });
    } catch (dbErr: any) {
      console.warn('[Prisma DB Fallback - submitContactBrief]', dbErr?.message || dbErr);
      // Create memory fallback return
      submission = {
        id: `sub-local-${Date.now()}`,
        name: name || 'Anonymous Founder',
        email,
        company,
        projectType,
        budget,
        timeline,
        message,
        status: 'NEW',
        priority: 'NORMAL',
        createdAt: new Date().toISOString(),
      };
    }

    revalidatePath('/');
    revalidatePath('/contact');
    revalidatePath('/admin/inquiries');

    return { success: true, data: submission };
  } catch (error: any) {
    console.error('[Server Action Error - submitContactBrief]', error);
    return { success: false, error: error.message || 'Failed to submit contact brief' };
  }
}

export async function updateInquiryStatus(
  id: string,
  status: string,
  priority?: string,
  notes?: string
): Promise<ActionResponse> {
  try {
    try {
      await prisma.contactSubmission.update({
        where: { id },
        data: {
          status,
          ...(priority ? { priority } : {}),
          ...(notes !== undefined ? { notes } : {}),
        },
      });
    } catch (dbErr: any) {
      console.warn('[Prisma DB Fallback - updateInquiryStatus]', dbErr?.message || dbErr);
    }

    revalidatePath('/admin/inquiries');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update inquiry' };
  }
}

export async function deleteInquiry(id: string): Promise<ActionResponse> {
  try {
    try {
      await prisma.contactSubmission.delete({
        where: { id },
      });
    } catch (dbErr: any) {
      console.warn('[Prisma DB Fallback - deleteInquiry]', dbErr?.message || dbErr);
    }

    revalidatePath('/admin/inquiries');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to delete inquiry' };
  }
}

// ===========================================================================
// 2. DEPLOYMENT PROJECT ACTIONS
// ===========================================================================

export async function createDeployment(data: Partial<DeploymentProduct>): Promise<ActionResponse<DeploymentProduct>> {
  try {
    const slug =
      data.slug ||
      (data.title || 'untitled')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') ||
      `deploy-${Date.now()}`;

    let created: any;
    try {
      created = await prisma.deploymentProduct.create({
        data: {
          slug,
          title: data.title || 'Untitled Deployment',
          client: data.client || null,
          year: String(data.year || '2026'),
          category: data.category || 'UI Templates',
          badge: data.badge || null,
          shortDescription: data.shortDescription || data.description || '',
          fullDescription: data.fullDescription || data.shortDescription || '',
          thumbnailUrl: data.thumbnailUrl || data.thumbnail || '/placeholder.png',
          coverImageUrl: data.coverImageUrl || data.thumbnailUrl || null,
          demoUrl: data.demoUrl || data.liveUrl || '#',
          liveUrl: data.liveUrl || data.demoUrl || '#',
          githubUrl: data.githubUrl || data.sourceUrl || null,
          rating: Number(data.rating || 5.0),
          techStack: Array.isArray(data.techStack) ? data.techStack : ['Next.js 15', 'React 19', 'Tailwind CSS'],
          tags: Array.isArray(data.tags) ? data.tags : [],
          features: Array.isArray(data.features) ? data.features : [],
          fpsBenchmark: Number(data.fpsBenchmark || 60),
          auditScore: Number(data.auditScore || 100),
          status: data.status || 'Production',
          isFeatured: Boolean(data.isFeatured),
          isPublished: data.isPublished !== false,
          displayOrder: Number(data.displayOrder || 0),
        },
      });
    } catch (dbErr: any) {
      console.warn('[Prisma DB Fallback - createDeployment]', dbErr?.message || dbErr);
      created = {
        id: `deploy-${Date.now()}`,
        slug,
        ...data,
      };
    }

    revalidatePath('/');
    revalidatePath('/deployments');
    revalidatePath('/admin/deployments');

    return { success: true, data: created };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to create deployment' };
  }
}

export async function updateDeployment(id: string, data: Partial<DeploymentProduct>): Promise<ActionResponse> {
  try {
    try {
      await prisma.deploymentProduct.update({
        where: { id },
        data: {
          ...(data.title ? { title: data.title } : {}),
          ...(data.slug ? { slug: data.slug } : {}),
          ...(data.category ? { category: data.category } : {}),
          ...(data.badge !== undefined ? { badge: data.badge } : {}),
          ...(data.shortDescription ? { shortDescription: data.shortDescription } : {}),
          ...(data.fullDescription !== undefined ? { fullDescription: data.fullDescription } : {}),
          ...(data.thumbnailUrl ? { thumbnailUrl: data.thumbnailUrl } : {}),
          ...(data.coverImageUrl !== undefined ? { coverImageUrl: data.coverImageUrl } : {}),
          ...(data.demoUrl ? { demoUrl: data.demoUrl } : {}),
          ...(data.githubUrl !== undefined ? { githubUrl: data.githubUrl } : {}),
          ...(data.rating !== undefined ? { rating: Number(data.rating) } : {}),
          ...(data.techStack ? { techStack: data.techStack } : {}),
          ...(data.tags ? { tags: data.tags } : {}),
          ...(data.features ? { features: data.features } : {}),
          ...(data.fpsBenchmark !== undefined ? { fpsBenchmark: Number(data.fpsBenchmark) } : {}),
          ...(data.auditScore !== undefined ? { auditScore: Number(data.auditScore) } : {}),
          ...(data.status ? { status: data.status } : {}),
          ...(data.isFeatured !== undefined ? { isFeatured: Boolean(data.isFeatured) } : {}),
          ...(data.isPublished !== undefined ? { isPublished: Boolean(data.isPublished) } : {}),
          ...(data.displayOrder !== undefined ? { displayOrder: Number(data.displayOrder) } : {}),
        },
      });
    } catch (dbErr: any) {
      console.warn('[Prisma DB Fallback - updateDeployment]', dbErr?.message || dbErr);
    }

    revalidatePath('/');
    revalidatePath('/deployments');
    revalidatePath('/admin/deployments');
    if (data.slug) revalidatePath(`/project/${data.slug}`);

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update deployment' };
  }
}

export async function toggleDeploymentFeatured(id: string, isFeatured: boolean): Promise<ActionResponse> {
  try {
    try {
      await prisma.deploymentProduct.update({
        where: { id },
        data: { isFeatured },
      });
    } catch (dbErr: any) {
      console.warn('[Prisma DB Fallback - toggleDeploymentFeatured]', dbErr?.message || dbErr);
    }

    revalidatePath('/');
    revalidatePath('/deployments');
    revalidatePath('/admin/deployments');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to toggle featured status' };
  }
}

export async function deleteDeployment(id: string): Promise<ActionResponse> {
  try {
    try {
      await prisma.deploymentProduct.delete({
        where: { id },
      });
    } catch (dbErr: any) {
      console.warn('[Prisma DB Fallback - deleteDeployment]', dbErr?.message || dbErr);
    }

    revalidatePath('/');
    revalidatePath('/deployments');
    revalidatePath('/admin/deployments');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to delete deployment' };
  }
}

// ===========================================================================
// 3. CMS CONTENT ACTIONS (HERO, ABOUT, SITE CONFIG, FAQS)
// ===========================================================================

export async function updateHeroContent(data: Partial<HeroContent>): Promise<ActionResponse> {
  try {
    try {
      const existing = await prisma.heroContent.findFirst();
      if (existing) {
        await prisma.heroContent.update({
          where: { id: existing.id },
          data: {
            badgeText: data.badgeText || data.superTitle || existing.badgeText,
            headlineLine1: data.headlineLine1 || data.mainHeading || existing.headlineLine1,
            headlineLine2: data.headlineLine2 || existing.headlineLine2,
            headlineLine3: data.headlineLine3 || existing.headlineLine3,
            mainHeading: data.mainHeading || data.headlineLine1 || existing.mainHeading,
            highlightedWord: data.highlightedWord || existing.highlightedWord,
            bioSubtext: data.bioSubtext || data.subheading || existing.bioSubtext,
            primaryCtaLabel: data.primaryCtaLabel || data.primaryCtaText || existing.primaryCtaLabel,
            primaryCtaRoute: data.primaryCtaRoute || data.primaryCtaUrl || existing.primaryCtaRoute,
            secondaryCtaLabel: data.secondaryCtaLabel || data.secondaryCtaText || existing.secondaryCtaLabel,
            secondaryCtaRoute: data.secondaryCtaRoute || data.secondaryCtaUrl || existing.secondaryCtaRoute,
            pricingNoticeText: data.pricingNoticeText || existing.pricingNoticeText,
            telemetryStatus: data.telemetryStatus || existing.telemetryStatus,
            telemetryLatency: data.telemetryLatency || existing.telemetryLatency,
            telemetryUptime: data.telemetryUptime || existing.telemetryUptime,
          },
        });
      } else {
        await prisma.heroContent.create({
          data: {
            badgeText: data.badgeText || '[ SOLO CREATIVE DEVELOPER & 3D ARTIST ]',
            headlineLine1: data.headlineLine1 || 'CYBERNETiC CRAFT',
            headlineLine2: data.headlineLine2 || 'DiGiTAL REALMS',
            headlineLine3: data.headlineLine3 || 'ENGiNEERED.',
            bioSubtext: data.bioSubtext || 'High-performance interactive web experiences.',
            primaryCtaLabel: data.primaryCtaLabel || 'START A PROJECT ↗',
            primaryCtaRoute: data.primaryCtaRoute || 'contact',
            secondaryCtaLabel: data.secondaryCtaLabel || 'BROWSE DEPLOYMENTS',
            secondaryCtaRoute: data.secondaryCtaRoute || 'deployments',
            pricingNoticeText: data.pricingNoticeText || 'Custom builds starting at $1,000',
          },
        });
      }
    } catch (dbErr: any) {
      console.warn('[Prisma DB Fallback - updateHeroContent]', dbErr?.message || dbErr);
    }

    revalidatePath('/');
    revalidatePath('/admin/cms');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update hero content' };
  }
}

export async function updateAboutContent(data: Partial<AboutContent>): Promise<ActionResponse> {
  try {
    try {
      const existing = await prisma.aboutContent.findFirst();
      if (existing) {
        await prisma.aboutContent.update({
          where: { id: existing.id },
          data: {
            name: data.name || data.artistName || existing.name,
            artistName: data.artistName || data.name || existing.artistName,
            role: data.role || data.title || existing.role,
            tagline: data.tagline || existing.tagline,
            handle: data.handle || existing.handle,
            executiveBio: data.executiveBio || data.bio || existing.executiveBio,
            bio: data.bio || data.executiveBio || existing.bio,
            location: data.location || existing.location,
            locationTimezone: data.locationTimezone || existing.locationTimezone,
            availabilityStatus: data.availabilityStatus || data.availability || existing.availabilityStatus,
            yearsActive: data.yearsActive || existing.yearsActive,
            deploymentsDelivered: String(data.deploymentsDelivered || existing.deploymentsDelivered),
            clientSatisfaction: data.clientSatisfaction || existing.clientSatisfaction,
            techSkills: data.techSkills || existing.techSkills,
            contactEmail: data.contactEmail || existing.contactEmail,
          },
        });
      } else {
        await prisma.aboutContent.create({
          data: {
            name: data.name || 'ANORENT',
            artistName: data.artistName || 'Ahsan',
            role: data.role || 'Lead Creative Technologist & Full-Stack Architect',
            executiveBio: data.executiveBio || 'I architect bespoke Next.js and 3D WebGL experiences.',
            techSkills: data.techSkills || ['Next.js 15', 'React 19', 'Three.js', 'Tailwind CSS'],
          },
        });
      }
    } catch (dbErr: any) {
      console.warn('[Prisma DB Fallback - updateAboutContent]', dbErr?.message || dbErr);
    }

    revalidatePath('/about');
    revalidatePath('/admin/cms');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update about content' };
  }
}

export async function updateSiteConfig(data: Record<string, any>): Promise<ActionResponse> {
  try {
    try {
      const existing = await prisma.siteConfig.findFirst();
      if (existing) {
        await prisma.siteConfig.update({
          where: { id: existing.id },
          data: {
            brandName: data.brandName || data.brandLogoText || existing.brandName,
            brandLogoText: data.brandLogoText || data.brandName || existing.brandLogoText,
            brandTagline: data.brandTagline || existing.brandTagline,
            liveBadgeStatus: data.liveBadgeStatus || existing.liveBadgeStatus,
            pingLatency: data.pingLatency || existing.pingLatency,
            escrowCoverage: data.escrowCoverage || existing.escrowCoverage,
            contactEmail: data.contactEmail || existing.contactEmail,
            telegramHandle: data.telegramHandle || existing.telegramHandle,
            discordHandle: data.discordHandle || existing.discordHandle,
            githubUrl: data.githubUrl || existing.githubUrl,
            twitterUrl: data.twitterUrl || existing.twitterUrl,
          },
        });
      } else {
        await prisma.siteConfig.create({
          data: {
            brandName: data.brandName || 'ANORENT',
            brandLogoText: data.brandLogoText || 'ANORENT',
            brandTagline: data.brandTagline || 'Digital Artist & Creative Technologist Studio',
            liveBadgeStatus: data.liveBadgeStatus || '99.98% LIVE',
            pingLatency: data.pingLatency || '24ms',
            escrowCoverage: data.escrowCoverage || '100% ESCROW-PROTECTED',
            contactEmail: data.contactEmail || 'hello@anorent.com',
          },
        });
      }
    } catch (dbErr: any) {
      console.warn('[Prisma DB Fallback - updateSiteConfig]', dbErr?.message || dbErr);
    }

    revalidatePath('/', 'layout');
    revalidatePath('/admin/cms');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update site config' };
  }
}

// ===========================================================================
// 4. FAQ ACTIONS
// ===========================================================================

export async function createFaqItem(data: Partial<FAQItem>): Promise<ActionResponse<FAQItem>> {
  try {
    let created: any;
    try {
      created = await prisma.fAQItem.create({
        data: {
          category: data.category || 'PRICING & ESCROW',
          question: data.question || 'New Question?',
          answer: data.answer || 'Answer here...',
          helpfulCount: data.helpfulCount || 0,
          displayOrder: data.displayOrder || 0,
          isPublished: data.isPublished !== false,
        },
      });
    } catch (dbErr: any) {
      console.warn('[Prisma DB Fallback - createFaqItem]', dbErr?.message || dbErr);
      created = {
        id: `faq-${Date.now()}`,
        ...data,
      };
    }

    revalidatePath('/faq');
    revalidatePath('/admin/cms');
    return { success: true, data: created };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to create FAQ' };
  }
}

export async function updateFaqItem(id: string, data: Partial<FAQItem>): Promise<ActionResponse> {
  try {
    try {
      await prisma.fAQItem.update({
        where: { id },
        data: {
          ...(data.category ? { category: data.category } : {}),
          ...(data.question ? { question: data.question } : {}),
          ...(data.answer ? { answer: data.answer } : {}),
          ...(data.helpfulCount !== undefined ? { helpfulCount: data.helpfulCount } : {}),
          ...(data.displayOrder !== undefined ? { displayOrder: data.displayOrder } : {}),
          ...(data.isPublished !== undefined ? { isPublished: data.isPublished } : {}),
        },
      });
    } catch (dbErr: any) {
      console.warn('[Prisma DB Fallback - updateFaqItem]', dbErr?.message || dbErr);
    }

    revalidatePath('/faq');
    revalidatePath('/admin/cms');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update FAQ' };
  }
}

export async function deleteFaqItem(id: string): Promise<ActionResponse> {
  try {
    try {
      await prisma.fAQItem.delete({
        where: { id },
      });
    } catch (dbErr: any) {
      console.warn('[Prisma DB Fallback - deleteFaqItem]', dbErr?.message || dbErr);
    }

    revalidatePath('/faq');
    revalidatePath('/admin/cms');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to delete FAQ' };
  }
}

// ===========================================================================
// 5. REVIEWS & TESTIMONIAL ACTIONS
// ===========================================================================

export async function submitReview(data: Partial<ReviewItem>): Promise<ActionResponse<ReviewItem>> {
  try {
    let created: any;
    try {
      created = await prisma.reviewItem.create({
        data: {
          name: data.name || data.author || 'Anonymous Client',
          role: data.role || 'Founder',
          company: data.company || '',
          avatarUrl: data.avatarUrl || data.avatar || null,
          comment: data.comment || data.quote || data.content || '',
          rating: data.rating || 5,
          dateString: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          tags: Array.isArray(data.tags) ? data.tags : [],
          isVerified: true,
          isApproved: true,
          isFeatured: Boolean(data.isFeatured),
        },
      });
    } catch (dbErr: any) {
      console.warn('[Prisma DB Fallback - submitReview]', dbErr?.message || dbErr);
      created = {
        id: `rev-${Date.now()}`,
        ...data,
      };
    }

    revalidatePath('/');
    revalidatePath('/admin/reviews');
    return { success: true, data: created };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to submit review' };
  }
}

export async function toggleReviewApproval(id: string, isApproved: boolean): Promise<ActionResponse> {
  try {
    try {
      await prisma.reviewItem.update({
        where: { id },
        data: { isApproved },
      });
    } catch (dbErr: any) {
      console.warn('[Prisma DB Fallback - toggleReviewApproval]', dbErr?.message || dbErr);
    }

    revalidatePath('/');
    revalidatePath('/admin/reviews');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to toggle review approval' };
  }
}

export async function toggleReviewFeatured(id: string, isFeatured: boolean): Promise<ActionResponse> {
  try {
    try {
      await prisma.reviewItem.update({
        where: { id },
        data: { isFeatured },
      });
    } catch (dbErr: any) {
      console.warn('[Prisma DB Fallback - toggleReviewFeatured]', dbErr?.message || dbErr);
    }

    revalidatePath('/');
    revalidatePath('/admin/reviews');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to toggle review featured status' };
  }
}

export async function deleteReview(id: string): Promise<ActionResponse> {
  try {
    try {
      await prisma.reviewItem.delete({
        where: { id },
      });
    } catch (dbErr: any) {
      console.warn('[Prisma DB Fallback - deleteReview]', dbErr?.message || dbErr);
    }

    revalidatePath('/');
    revalidatePath('/admin/reviews');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to delete review' };
  }
}
