import {
  DeploymentProduct,
  HeroContent,
  ContactSubmission,
  AboutContent,
  ProofMetricCard,
  ReviewItem,
  FaqHeaderConfig,
  FAQItem,
  StoryStage,
} from '../types';


// ---------------------------------------------------------------------------
// A. Deployments Normalizer
// ---------------------------------------------------------------------------
export function normalizeDeploymentProduct(raw: any): DeploymentProduct {
  if (!raw) {
    return {
      id: 'placeholder',
      slug: 'placeholder',
      title: 'Deployment Syncing...',
      shortDescription: 'Deployments syncing with core repository...',
      thumbnailUrl: '',
      demoUrl: '#',
      techStack: [],
      isFeatured: false,
      category: 'UI Templates',
    };
  }

  const slug = raw.slug || raw.id || `deploy-${Date.now()}`;
  const shortDesc = raw.shortDescription || raw.description || raw.fullDescription || 'High-performance interactive deployment.';
  const fullDesc = raw.fullDescription || raw.description || raw.shortDescription || shortDesc;
  const thumb = raw.thumbnailUrl || raw.thumbnail || '/placeholder.png';
  const cover = raw.coverImageUrl || raw.thumbnailUrl || raw.thumbnail || thumb;

  let techStack: string[] = [];
  if (Array.isArray(raw.techStack)) techStack = raw.techStack;
  else if (typeof raw.techStack === 'string') techStack = raw.techStack.split(',').map((s: string) => s.trim()).filter(Boolean);
  if (techStack.length === 0) techStack = ['Next.js 15', 'React 19', 'Tailwind CSS', 'WebGL'];

  let tags: string[] = [];
  if (Array.isArray(raw.tags)) tags = raw.tags;
  else if (typeof raw.tags === 'string') tags = raw.tags.split(',').map((s: string) => s.trim()).filter(Boolean);

  let features: string[] = [];
  if (Array.isArray(raw.features)) features = raw.features;
  else if (typeof raw.features === 'string') features = raw.features.split(',').map((s: string) => s.trim()).filter(Boolean);

  let metrics: any[] = [];
  if (Array.isArray(raw.technicalMetrics)) metrics = raw.technicalMetrics;
  else if (Array.isArray(raw.metrics)) metrics = raw.metrics;
  else if (Array.isArray(raw.stats)) metrics = raw.stats;

  return {
    id: raw.id || slug,
    slug,
    title: raw.title || 'Untitled Deployment',
    client: raw.client || undefined,
    year: raw.year || '2026',
    category: raw.category || 'UI Templates',
    badge: raw.badge || undefined,
    shortDescription: shortDesc,
    fullDescription: fullDesc,
    description: shortDesc,
    thumbnailUrl: thumb,
    thumbnail: thumb,
    coverImageUrl: cover,
    previewVideoUrl: raw.previewVideoUrl || undefined,
    demoUrl: raw.demoUrl || raw.liveUrl || '#',
    liveUrl: raw.liveUrl || raw.demoUrl || '#',
    githubUrl: raw.githubUrl || raw.sourceUrl || undefined,
    sourceUrl: raw.githubUrl || raw.sourceUrl || undefined,
    rating: typeof raw.rating === 'number' ? raw.rating : 5.0,
    usersCount: raw.usersCount || undefined,
    viewsCount: raw.viewsCount || undefined,
    tags,
    techStack,
    features,
    metrics,
    fpsBenchmark: typeof raw.fpsBenchmark === 'number' ? raw.fpsBenchmark : 60,
    auditScore: typeof raw.auditScore === 'number' ? raw.auditScore : 100,
    status: raw.status || 'Production',
    isFeatured: raw.isFeatured ?? false,
    isPublished: raw.isPublished ?? true,
    displayOrder: typeof raw.displayOrder === 'number' ? raw.displayOrder : 0,
    createdAt: raw.createdAt || new Date().toISOString(),
    updatedAt: raw.updatedAt || new Date().toISOString(),
  };
}

export function normalizeDeploymentList(items: any[] | null | undefined): DeploymentProduct[] {
  if (!items || !Array.isArray(items)) return [];
  return items.map(normalizeDeploymentProduct);
}

// ---------------------------------------------------------------------------
// B. Hero Section Normalizer
// ---------------------------------------------------------------------------
export function normalizeHeroContent(raw: any): HeroContent {
  if (!raw) {
    return {
      id: 'hero-singleton',
      headlineLine1: 'CYBERNETiC CRAFT',
      headlineLine2: 'DiGiTAL REALMS',
      headlineLine3: 'ENGiNEERED.',
      badgeText: '[ SOLO CREATIVE DEVELOPER & 3D ARTIST ]',
      bioSubtext: 'I design and build high-performance 3D websites, WebGL shaders, and bespoke Next.js interfaces for founders who want to stand out.',
    };
  }

  const badgeText = raw.badgeText || raw.superTitle || raw.topBadgeText || '[ SOLO CREATIVE DEVELOPER & 3D ARTIST ]';
  const headlineLine1 = raw.mainHeading || raw.mainTitle || raw.headlineLine1 || 'CYBERNETiC CRAFT';
  const headlineLine2 = raw.headlineLine2 || 'DiGiTAL REALMS';
  const headlineLine3 = raw.headlineLine3 || (raw.highlightedWord ? `${raw.highlightedWord}.` : 'ENGiNEERED.');
  const bioSubtext = raw.subheading || raw.subtitle || raw.bioSubtext || 'I design and build high-performance 3D websites, WebGL shaders, and bespoke Next.js interfaces for founders who want to stand out.';


  const primaryCtaLabel = raw.primaryCtaLabel || raw.primaryCtaText || 'START A PROJECT ↗';
  const primaryCtaText = raw.primaryCtaText || primaryCtaLabel;
  const primaryCtaRoute = raw.primaryCtaRoute || raw.primaryCtaUrl || 'contact';

  const secondaryCtaLabel = raw.secondaryCtaLabel || raw.secondaryCtaText || 'BROWSE DEPLOYMENTS';
  const secondaryCtaText = raw.secondaryCtaText || secondaryCtaLabel;
  const secondaryCtaRoute = raw.secondaryCtaRoute || raw.secondaryCtaUrl || 'deployments';

  const telemetryStatus = raw.telemetryStatus || 'ONLINE';
  const telemetryLatency = raw.telemetryLatency || '4ms';
  const telemetryUptime = raw.telemetryUptime || '99.98%';

  return {
    id: raw.id || 'hero-singleton',
    badgeText,
    topBadgeText: badgeText,
    superTitle: badgeText,
    headlineLine1,
    headlineLine2,
    headlineLine3,
    mainHeading: headlineLine1,
    mainTitle: headlineLine1,
    highlightedWord: raw.highlightedWord || 'CRAFT',
    highlightWords: Array.isArray(raw.highlightWords) && raw.highlightWords.length > 0 ? raw.highlightWords : ['high-performance', '3D websites', 'WebGL shaders', 'bespoke Next.js interfaces', 'founders', 'stand out'],

    subheading: bioSubtext,
    subtitle: bioSubtext,
    bioSubtext,
    primaryCtaLabel,
    primaryCtaText,
    primaryCtaRoute,
    primaryCtaUrl: primaryCtaRoute,
    secondaryCtaLabel,
    secondaryCtaText,
    secondaryCtaRoute,
    secondaryCtaUrl: secondaryCtaRoute,
    pricingNoticeText: raw.pricingNoticeText || 'Custom builds starting at $500 - $1,000 // Fast turnaround',
    telemetryStatus,
    telemetryLatency,
    telemetryUptime,
    particleModes: Array.isArray(raw.particleModes) ? raw.particleModes : ['quantum', 'orbital', 'matrix'],
    defaultParticleMode: raw.defaultParticleMode || 'quantum',
    baseNodeCount: typeof raw.baseNodeCount === 'number' ? raw.baseNodeCount : 100,
    targetFps: typeof raw.targetFps === 'number' ? raw.targetFps : 60,
  };
}

// ---------------------------------------------------------------------------
// C. Contact & Kanban Normalizer
// ---------------------------------------------------------------------------
export function normalizeContactSubmission(raw: any): ContactSubmission {
  if (!raw) {
    return {
      id: `sub-${Date.now()}`,
      name: 'Anonymous Client',
      clientName: 'Anonymous Client',
      email: 'client@example.com',
      company: 'Stealth Labs',
      projectType: 'Custom 3D System',
      budget: '$5,000 - $10,000',
      budgetTier: '$5,000 - $10,000',
      timeline: '2-4 Weeks',
      message: 'Initial project inquiry submission.',
      projectBrief: 'Initial project inquiry submission.',
      status: 'NEW',
      notes: '',
      createdAt: new Date().toISOString(),
    };
  }

  const name = raw.name || raw.clientName || 'Anonymous Founder';
  const brief = raw.message || raw.projectBrief || '';
  const budget = raw.budget || raw.budgetTier || 'Not specified';
  const projectType = raw.projectType || raw.serviceType || 'Custom System';
  const timeline = raw.timeline || 'Flexible';
  const status = raw.status || 'NEW';

  return {
    id: raw.id || `sub-${Date.now()}`,
    name,
    clientName: name,
    email: raw.email || 'unknown@domain.com',
    company: raw.company || undefined,
    projectType,
    budget,
    budgetTier: budget,
    timeline,
    message: brief,
    projectBrief: brief,
    status: status as any,
    notes: raw.notes || '',
    createdAt: raw.createdAt || new Date().toISOString(),
    updatedAt: raw.updatedAt || new Date().toISOString(),
  };
}

export function normalizeSubmissionList(items: any[] | null | undefined): ContactSubmission[] {
  if (!items || !Array.isArray(items)) return [];
  return items.map(normalizeContactSubmission);
}

// ---------------------------------------------------------------------------
// D. About & Proof Normalizer
// ---------------------------------------------------------------------------
export function normalizeAboutContent(raw: any): AboutContent {
  if (!raw) {
    return {
      id: 'about-singleton',
      name: 'Ahsan',
      handle: '@Ahsanwebdesign',
      role: 'Solo Creative Developer & 3D Artist',
      executiveBio: 'I design and engineer bespoke web experiences, interactive 3D WebGL environments, and production-ready Next.js interfaces directly for founders.',
      contactEmail: 'ahsxn3d@gmail.com',
      availabilityStatus: 'Available for Hire',
      techSkills: ['Next.js 15', 'React 19', 'Tailwind CSS v4', 'Three.js', 'GSAP 3', 'TypeScript', 'WebGL / GLSL'],
    };
  }

  const name = raw.name || raw.artistName || raw.profileName || 'ANORENT';
  const executiveBio = raw.executiveBio || raw.bio || 'I design and engineer bespoke web experiences, interactive 3D WebGL environments, and production-ready Next.js interfaces directly for founders and modern brands.';

  const role = raw.role || raw.title || 'Lead Creative Technologist & Full-Stack Architect';
  const tagline = raw.tagline || 'Solo Creative Developer & 3D Artist';
  const handle = raw.handle || 'ahsxn.3d';
  const avatarUrl = raw.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';

  let techSkills = ['Next.js 15', 'React 19', 'Tailwind CSS v4', 'Prisma ORM', 'Three.js', 'GSAP 3', 'Blender PBR', 'Maya', 'Houdini', 'Unreal Engine 5', 'TypeScript', 'WebGL / GLSL'];

  if (Array.isArray(raw.techSkills) && raw.techSkills.length > 0) {
    techSkills = raw.techSkills;
  }

  return {
    id: raw.id || 'about-singleton',
    name,
    artistName: name,
    profileName: name,
    role,
    title: role,
    tagline,
    handle,
    executiveBio,
    bio: executiveBio,
    avatarUrl,
    location: raw.location || 'Global Remote // Earth Grid',
    locationTimezone: raw.locationTimezone || 'UTC / EST Active',
    availability: raw.availability || raw.availabilityStatus || 'LIMITED SLOTS AVAILABLE',
    availabilityStatus: raw.availabilityStatus || raw.availability || 'LIMITED SLOTS AVAILABLE',
    yearsActive: raw.yearsActive || '7+ Years',
    deploymentsDelivered: raw.deploymentsDelivered || '48+',
    clientSatisfaction: raw.clientSatisfaction || '99.8%',
    techSkills,
    contactEmail: raw.contactEmail || 'hello@anorent.com',
  };
}

export function normalizeProofCard(raw: any): ProofMetricCard {
  if (!raw) {
    return { id: 'card-placeholder', cardKey: 'systems', title: 'Loading...', value: '—', percentage: 0, displayOrder: 0 };
  }

  const title = raw.title || raw.label || 'SYSTEM TELEMETRY';
  let val = raw.value;
  if (val === undefined || val === null) {
    if (raw.numericValue !== undefined) {
      val = `${raw.numericValue}${raw.unit || '+'}`;
    } else {
      val = title;
    }
  }

  return {
    id: raw.id || `card-${raw.cardKey || Date.now()}`,
    cardKey: raw.cardKey || 'systems',
    title,
    label: title,
    value: String(val),
    subtext: raw.subtext || raw.subtitle || '',
    subtitle: raw.subtext || raw.subtitle || '',
    percentage: typeof raw.percentage === 'number' ? raw.percentage : 100,
    slaTarget: raw.slaTarget || undefined,
    displayOrder: typeof raw.displayOrder === 'number' ? raw.displayOrder : 0,
    categoryBreakdownJson: raw.metricsJson?.categoryBreakdown || raw.categoryBreakdownJson || null,
    progressMetricsJson: raw.metricsJson?.progressMetrics || raw.progressMetricsJson || null,
  };

}

export function normalizeProofCardsList(items: any[] | null | undefined): ProofMetricCard[] {
  if (!items || !Array.isArray(items)) return [];
  return items.map(normalizeProofCard);
}

// ---------------------------------------------------------------------------
// E. Reviews Normalizer
// ---------------------------------------------------------------------------
export function normalizeReviewItem(raw: any): ReviewItem {
  if (!raw) {
    return { id: `rev-${Date.now()}`, name: 'Verified Client', comment: '', rating: 5, isVerified: true, isApproved: true, dateString: 'Recent' };
  }

  const author = raw.author || raw.name || 'Verified Client';
  const comment = raw.quote || raw.comment || raw.content || '';
  const role = raw.role || 'Founder';
  const company = raw.company || '';
  const avatarUrl = raw.avatarUrl || raw.avatar || `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(author)}`;

  return {
    id: raw.id || `rev-${Date.now()}`,
    name: author,
    author,
    role,
    company,
    roleCompany: role && company ? `${role}, ${company}` : role || company,
    avatar: avatarUrl,
    avatarUrl,
    comment,
    quote: comment,
    content: comment,
    rating: typeof raw.rating === 'number' ? raw.rating : 5,
    dateString: raw.dateString || 'Recent',
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    verified: raw.isVerified ?? raw.verified ?? true,
    isVerified: raw.isVerified ?? raw.verified ?? true,
    isApproved: raw.isApproved ?? true,
    createdAt: raw.createdAt || new Date().toISOString(),
  };
}

export function normalizeReviewList(items: any[] | null | undefined, approvedOnly = true): ReviewItem[] {
  if (!items || !Array.isArray(items)) return [];
  const normalized = items.map(normalizeReviewItem);
  return approvedOnly ? normalized.filter((r) => r.isApproved) : normalized;
}

// ---------------------------------------------------------------------------
// F. Site Config & Brand Normalizer
// ---------------------------------------------------------------------------
export interface NormalizedSiteConfig {
  id: string;
  brandName: string;
  brandLogoText: string;
  brandTagline: string;
  liveBadgeStatus: string;
  pingLatency: string;
  escrowCoverage: string;
  contactEmail: string;
  telegramHandle: string;
  discordHandle: string;
  githubUrl: string;
  twitterUrl: string;
  socialChannels: Record<string, string>;
  metaTitle: string;
  metaDescription: string;
}

export function normalizeSiteConfig(raw: any): NormalizedSiteConfig {
  let socialChannels: Record<string, string> = {
    github: 'https://github.com/anorix',
    twitter: 'https://twitter.com/anorix',
    telegram: 'https://t.me/anorix',
    discord: 'https://discord.com/users/anorix',
  };

  if (raw?.socialChannels) {
    if (typeof raw.socialChannels === 'object' && !Array.isArray(raw.socialChannels)) {
      socialChannels = { ...socialChannels, ...raw.socialChannels };
    }
  } else if (raw?.socialLinks) {
    if (typeof raw.socialLinks === 'object' && !Array.isArray(raw.socialLinks)) {
      socialChannels = { ...socialChannels, ...raw.socialLinks };
    }
  }

  return {
    id: raw?.id || 'site-config-default',
    brandName: raw?.brandName || raw?.brandLogoText || 'ANORIX',
    brandLogoText: raw?.brandLogoText || raw?.brandName || 'ANORIX',
    brandTagline: raw?.brandTagline || 'Digital Artist & Creative Technologist Studio',
    liveBadgeStatus: raw?.liveBadgeStatus || '99.98% LIVE',
    pingLatency: raw?.pingLatency || '24ms',
    escrowCoverage: raw?.escrowCoverage || '100% ESCROW-PROTECTED',
    contactEmail: raw?.contactEmail || 'hello@anorix.com',
    telegramHandle: raw?.telegramHandle || '@anorix',
    discordHandle: raw?.discordHandle || 'anorix#0001',
    githubUrl: raw?.githubUrl || 'https://github.com/anorix',
    twitterUrl: raw?.twitterUrl || 'https://twitter.com/anorix',
    socialChannels,
    metaTitle: raw?.metaTitle || 'ANORIX — Cybernetic Web Experiences & 3D Architect',
    metaDescription: raw?.metaDescription || 'Bespoke Next.js web applications, real-time WebGL shaders, and high-performance frontend engineering.',
  };
}

// ---------------------------------------------------------------------------
// G. FAQ Normalizer
// ---------------------------------------------------------------------------
export function normalizeFaqHeaderConfig(raw: any): FaqHeaderConfig {
  return {
    id: raw?.id || 'faq-header-singleton',
    badgeText: raw?.badgeText || '[ CLEAR ANSWERS // ZERO AMBIGUITY ]',
    pageTitle: raw?.pageTitle || 'FREQUENTLY ASKED QUESTIONS',
    pageSubtitle: raw?.pageSubtitle || 'Straight talk on pricing, escrow milestones, WebGL performance, and production handoff.',
    searchPlaceholder: raw?.searchPlaceholder || 'Search escrow, stack, timelines, pricing...',
    supportEmail: raw?.supportEmail || 'hello@anorent.com',
    telemetry1Title: raw?.telemetry1Title || 'ESCROW PROTECTED',
    telemetry1Sub: raw?.telemetry1Sub || '100% Milestone-gated',
    telemetry2Title: raw?.telemetry2Title || 'PERFORMANCE SLA',
    telemetry2Sub: raw?.telemetry2Sub || '60 FPS WebGL Target',
    telemetry3Title: raw?.telemetry3Title || 'IP TRANSFERRED',
    telemetry3Sub: raw?.telemetry3Sub || 'Full Commercial License',
    telemetry4Title: raw?.telemetry4Title || 'RESPONSE TIME',
    telemetry4Sub: raw?.telemetry4Sub || '< 4h Direct Comm',
    categories: Array.isArray(raw?.categories) ? raw.categories : ['ALL', 'PRICING & ESCROW', 'TECH & SHADERS', 'DELIVERY TIMELINE', 'SUPPORT & SLA'],
  };
}

export function normalizeFaqList(items: any[] | null | undefined): FAQItem[] {
  if (!items || !Array.isArray(items)) return [];
  return items.map((f, idx) => ({
    id: f.id || `faq-${idx}`,
    category: f.category || 'General',
    categoryTag: f.category || 'General',
    question: f.question || '',
    answer: f.answer || '',
    helpfulCount: typeof f.helpfulCount === 'number' ? f.helpfulCount : 0,
    displayOrder: typeof f.displayOrder === 'number' ? f.displayOrder : idx,
    isPublished: f.isPublished ?? true,
    createdAt: f.createdAt || new Date().toISOString(),
    updatedAt: f.updatedAt || new Date().toISOString(),
  }));
}

// ---------------------------------------------------------------------------
// H. Story Stages Normalizer
// ---------------------------------------------------------------------------
export function normalizeStoryStagesList(items: any[] | null | undefined): StoryStage[] {
  if (!items || !Array.isArray(items)) return [];
  return items.map((s, idx) => ({
    ...s,
    stageIndex: typeof s.stageIndex === 'number' ? s.stageIndex : idx,
    description: s.description || '',
    nodes: s.nodes || [],
    phases: s.phases || [],
  }));
}
