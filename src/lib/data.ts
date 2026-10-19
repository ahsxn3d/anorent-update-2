import { Prisma } from '@prisma/client';
import { prisma } from './prisma';
import {
  normalizeDeploymentList,
  normalizeHeroContent,
  normalizeAboutContent,
  normalizeProofCardsList,
  normalizeReviewList,
  normalizeFaqList,
  normalizeFaqHeaderConfig,
  normalizeSiteConfig,
  normalizeStoryStagesList,
  normalizeSubmissionList,
  NormalizedSiteConfig,
} from './normalizers';
import {
  DeploymentProduct,
  HeroContent,
  AboutContent,
  ProofMetricCard,
  ReviewItem,
  FAQItem,
  FaqHeaderConfig,
  StoryStage,
  ContactSubmission,
} from '../types';

const FALLBACK_HERO: HeroContent = {
  id: 'hero-singleton',
  headlineLine1: 'CYBERNETiC CRAFT',
  headlineLine2: 'DiGiTAL REALMS',
  headlineLine3: 'ENGiNEERED.',
  badgeText: '[ SOLO CREATIVE DEVELOPER & 3D ARTIST ]',
  bioSubtext: 'I design and build high-performance 3D websites, WebGL shaders, and bespoke Next.js interfaces for founders who want to stand out.',
  highlightWords: ['high-performance', '3D websites', 'WebGL shaders', 'bespoke Next.js interfaces', 'founders', 'stand out'],
  primaryCtaLabel: 'START A PROJECT',
  primaryCtaRoute: 'contact',
  secondaryCtaLabel: 'BROWSE DEPLOYMENTS',
  secondaryCtaRoute: 'deployments',
  pricingNoticeText: 'Custom builds starting at $500 - $1,000 // Fast turnaround',
  telemetryLatency: '4ms',
  telemetryUptime: '99.98%',
};

const FALLBACK_ABOUT: AboutContent = {
  id: 'about-singleton',
  name: 'Ahsan',
  handle: '@Ahsanwebdesign',
  role: 'Solo Creative Developer & 3D Artist',
  executiveBio: 'I design and engineer bespoke web experiences, interactive 3D WebGL environments, and production-ready Next.js interfaces directly for founders.',
  contactEmail: 'ahsxn3d@gmail.com',
  locationTimezone: 'Remote / Global (UTC+5)',
  availabilityStatus: 'Available for Hire',
  techSkills: ['Next.js 15', 'React 19', 'Tailwind CSS v4', 'Prisma ORM', 'Three.js', 'GSAP 3', 'TypeScript', 'WebGL / GLSL'],
};

export async function getHeroData(): Promise<HeroContent> {
  try {
    const raw = await prisma.heroContent.findFirst();
    return normalizeHeroContent(raw ?? FALLBACK_HERO);
  } catch (error) {
    console.warn('[Prisma getHeroData fallback]', error);
    return normalizeHeroContent(FALLBACK_HERO);
  }
}

// Raw SQL on purpose: the live table stores status as an enum (cast to text here) and does not
// have every column the Prisma model lists, so findFirst/findMany on it would fail.
async function readDeployments(where: Prisma.Sql, limit?: number): Promise<DeploymentProduct[]> {
  const raw = await prisma.$queryRaw<Record<string, unknown>[]>`
    SELECT
      id, slug, title, client, year, category, badge,
      "shortDescription", "fullDescription", "thumbnailUrl", "coverImageUrl",
      "previewVideoUrl", "demoUrl", "githubUrl", "liveUrl", rating,
      tags, "techStack", features, "fpsBenchmark", "auditScore",
      status::text AS status,
      "isFeatured", "isPublished", "displayOrder", "createdAt", "updatedAt"
    FROM "DeploymentProduct"
    WHERE ${where}
    ORDER BY "displayOrder" ASC, "createdAt" DESC
    ${limit ? Prisma.sql`LIMIT ${limit}` : Prisma.empty}
  `;
  return normalizeDeploymentList(raw);
}

export async function getDeploymentsData(): Promise<DeploymentProduct[]> {
  try {
    return await readDeployments(Prisma.sql`"isPublished" = true`);
  } catch (error) {
    console.warn('[Prisma getDeploymentsData fallback]', error);
    return [];
  }
}

export async function getAllAdminDeployments(): Promise<DeploymentProduct[]> {
  try {
    return await readDeployments(Prisma.sql`TRUE`);
  } catch (error) {
    console.warn('[Prisma getAllAdminDeployments fallback]', error);
    return [];
  }
}

export async function getFeaturedDeploymentsData(): Promise<DeploymentProduct[]> {
  try {
    return await readDeployments(Prisma.sql`"isPublished" = true AND "isFeatured" = true`);
  } catch (error) {
    console.warn('[Prisma getFeaturedDeploymentsData fallback]', error);
    return [];
  }
}

export async function getDeploymentBySlug(slug: string): Promise<DeploymentProduct | null> {
  try {
    // same column list + status cast as the catalog query; slug and id are bound parameters
    const [hit] = await readDeployments(Prisma.sql`slug = ${slug} OR id = ${slug}`, 1);
    return hit ?? null;
  } catch (error) {
    console.warn('[Prisma getDeploymentBySlug fallback]', error);
    return null;
  }
}

export async function getAboutData(): Promise<AboutContent> {
  try {
    const raw = await prisma.aboutContent.findFirst();
    return normalizeAboutContent(raw ?? FALLBACK_ABOUT);
  } catch (error) {
    console.warn('[Prisma getAboutData fallback]', error);
    return normalizeAboutContent(FALLBACK_ABOUT);
  }
}

export async function getProofMetricsData(): Promise<ProofMetricCard[]> {
  try {
    const raw = await prisma.proofMetricCard.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    return normalizeProofCardsList(raw);
  } catch (error) {
    console.warn('[Prisma getProofMetricsData fallback]', error);
    return [];
  }
}

export async function getFaqsData(): Promise<FAQItem[]> {
  try {
    const raw = await prisma.fAQItem.findMany({
      where: { isPublished: true },
      orderBy: [{ displayOrder: 'asc' }, { helpfulCount: 'desc' }],
    });
    return normalizeFaqList(raw);
  } catch (error) {
    console.warn('[Prisma getFaqsData fallback]', error);
    return [];
  }
}

export async function getAllAdminFaqs(): Promise<FAQItem[]> {
  try {
    const raw = await prisma.fAQItem.findMany({
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
    return normalizeFaqList(raw);
  } catch (error) {
    console.warn('[Prisma getAllAdminFaqs fallback]', error);
    return [];
  }
}

export async function getFaqHeaderData(): Promise<FaqHeaderConfig> {
  try {
    const raw = await prisma.faqHeaderConfig.findFirst();
    return normalizeFaqHeaderConfig(raw);
  } catch (error) {
    console.warn('[Prisma getFaqHeaderData fallback]', error);
    return normalizeFaqHeaderConfig(null);
  }
}

export async function getReviewsData(approvedOnly = true): Promise<ReviewItem[]> {
  try {
    const raw = await prisma.reviewItem.findMany({
      where: approvedOnly ? { isApproved: true } : {},
      orderBy: { createdAt: 'desc' },
    });
    return normalizeReviewList(raw, approvedOnly);
  } catch (error) {
    console.warn('[Prisma getReviewsData fallback]', error);
    return [];
  }
}

export async function getSiteConfigData(): Promise<NormalizedSiteConfig> {
  try {
    const raw = await prisma.siteConfig.findFirst();
    return normalizeSiteConfig(raw);
  } catch (error) {
    console.warn('[Prisma getSiteConfigData fallback]', error);
    return normalizeSiteConfig(null);
  }
}

export async function getStoryStagesData(): Promise<StoryStage[]> {
  try {
    const raw = await prisma.storyStage.findMany({
      include: {
        nodes: { orderBy: { order: 'asc' } },
        phases: { orderBy: { phaseNumber: 'asc' } },
      },
      orderBy: { stageIndex: 'asc' },
    });
    return normalizeStoryStagesList(raw);
  } catch (error) {
    console.warn('[Prisma getStoryStagesData fallback]', error);
    return [];
  }
}

export async function getInquiriesData(): Promise<ContactSubmission[]> {
  try {
    const raw = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return normalizeSubmissionList(raw);
  } catch (error) {
    console.warn('[Prisma getInquiriesData fallback]', error);
    return [];
  }
}
