import { prisma } from './prisma';
import {
  normalizeDeploymentList,
  normalizeDeploymentProduct,
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

export async function getDeploymentsData(): Promise<DeploymentProduct[]> {
  try {
    const raw = await prisma.deploymentProduct.findMany({
      where: { isPublished: true },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
    return normalizeDeploymentList(raw);
  } catch (error) {
    console.warn('[Prisma getDeploymentsData fallback]', error);
    return [];
  }
}

export async function getAllAdminDeployments(): Promise<DeploymentProduct[]> {
  try {
    const raw = await prisma.deploymentProduct.findMany({
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
    return normalizeDeploymentList(raw);
  } catch (error) {
    console.warn('[Prisma getAllAdminDeployments fallback]', error);
    return [];
  }
}

export async function getFeaturedDeploymentsData(): Promise<DeploymentProduct[]> {
  try {
    const raw = await prisma.deploymentProduct.findMany({
      where: { isPublished: true, isFeatured: true },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
    return normalizeDeploymentList(raw);
  } catch (error) {
    console.warn('[Prisma getFeaturedDeploymentsData fallback]', error);
    return [];
  }
}

export async function getDeploymentBySlug(slug: string): Promise<DeploymentProduct | null> {
  try {
    const raw = await prisma.deploymentProduct.findFirst({
      where: { OR: [{ slug }, { id: slug }] },
    });
    return raw ? normalizeDeploymentProduct(raw) : null;
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
