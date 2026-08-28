export type Page = 'home' | 'deployments' | 'about' | 'faq' | 'contact' | 'project-detail';

export type ProductStatus = 'Production' | 'Staging' | 'Archived';
export type SubmissionStatus =
  | 'NEW'
  | 'QUALIFYING'
  | 'PROPOSAL_SENT'
  | 'IN_NEGOTIATION'
  | 'WON'
  | 'LOST'
  | 'UNREAD'
  | 'IN_REVIEW'
  | 'CONTACTED'
  | 'MILESTONE_ACTIVE'
  | 'CLOSED'
  | 'ARCHIVED'
  | string;

export type MetricCardKey = 'systems' | 'satisfaction' | 'sla' | 'escrow';

export type DeploymentCategory =
  | 'SAAS DASHBOARDS'
  | 'UI TEMPLATES'
  | 'FULL-STACK APPS'
  | 'ANIMATED SITES'
  | 'WEB3 & CRYPTO'
  | 'AI PLATFORMS'
  | 'SaaS Dashboards'
  | 'UI Templates'
  | 'Full-Stack Apps'
  | 'Animated Sites'
  | 'Web3 & Crypto'
  | 'AI Platforms'
  | string;

/**
 * Master Database Model: DeploymentProduct
 */
export interface DeploymentProduct {
  id: string;
  slug: string;
  title: string;
  client?: string;
  year?: string | number;
  category: DeploymentCategory;
  badge?: string;
  shortDescription: string;
  fullDescription?: string;
  description?: string; // Fallback alias
  thumbnailUrl: string;
  thumbnail?: string; // Fallback alias
  coverImageUrl?: string;
  previewVideoUrl?: string;
  demoUrl: string;
  githubUrl?: string;
  sourceUrl?: string; // Fallback alias
  liveUrl?: string;
  rating?: number;
  usersCount?: string;
  viewsCount?: string;
  tags?: string[];
  techStack: string[];
  features?: string[];
  metrics?: string[] | Array<{ label: string; value: string }>;
  stats?: {
    users?: string;
    rating?: number;
    views?: string;
  };
  fpsBenchmark?: number;
  auditScore?: number;
  status?: ProductStatus;
  isFeatured: boolean;
  isPublished?: boolean;
  displayOrder?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/**
 * Master Database Model: HeroContent / HeroSectionContent
 */
export interface HeroContent {
  id?: string;
  badgeText?: string;
  topBadgeText?: string;
  superTitle?: string;
  mainHeading?: string;
  mainTitle?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  headlineLine3?: string;
  highlightedWord?: string;
  highlightWords?: string[];
  subheading?: string;
  subtitle?: string;
  bioSubtext?: string;
  primaryCtaText?: string;
  primaryCtaLabel?: string;
  primaryCtaRoute?: string;
  primaryCtaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaLabel?: string;
  secondaryCtaRoute?: string;
  secondaryCtaUrl?: string;
  telemetryLatency?: string;
  telemetryUptime?: string;
  telemetryStatus?: string;
  pricingNoticeText?: string;
  particleModes?: string[];
  defaultParticleMode?: string;
  baseNodeCount?: number;
  targetFps?: number;
}

export type HeroSectionContent = HeroContent;

/**
 * Master Database Model: ArchitectureNode
 */
export interface ArchitectureNode {
  id: string;
  stageId?: string;
  label?: string;
  title?: string;
  role?: string;
  subtitle?: string;
  status?: string;
  icon?: string;
  description?: string;
  techSpecs?: string[];
  benchmarkMetric?: string;
  key?: string;
  name?: string;
  latency?: string;
  summary?: string;
  order?: number;
}

/**
 * Master Database Model: EscrowPhase
 */
export interface EscrowPhase {
  id: string;
  stageId?: string;
  phaseNumber: number;
  title: string;
  description: string;
  verificationCriteria?: string;
  status?: 'PENDING' | 'ACTIVE' | 'SETTLED' | string;
  allocationPercentage?: number;
  badgeText?: string;
}

/**
 * Master Database Model: StoryStage / StoryStageContent
 */
export interface StoryStage {
  id?: string;
  stageIndex: number;
  phase?: string;
  year?: string;
  title?: string;
  subtitle?: string;
  description: string;
  highlightTag?: string;
  tags?: string[];
  stageBadge?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  specTag1Title?: string;
  specTag1Sub?: string;
  specTag2Title?: string;
  specTag2Sub?: string;
  specTag3Title?: string;
  specTag3Sub?: string;
  bulletPoint1?: string;
  bulletPoint2?: string;
  defaultTension?: number;
  defaultDamping?: number;
  primaryCtaLabel?: string;
  primaryCtaRoute?: string;
  secondaryCtaLabel?: string;
  secondaryCtaRoute?: string;
  architectureNodes?: ArchitectureNode[];
  escrowPhases?: EscrowPhase[];
}

export type StoryStageContent = StoryStage;

/**
 * Master Database Model: AboutContent / AboutPageContent
 */
export interface AboutContent {
  id?: string;
  name?: string;
  artistName?: string;
  profileName?: string;
  handle?: string;
  role?: string;
  title?: string;
  tagline?: string;
  executiveBio?: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
  locationTimezone?: string;
  availability?: string;
  availabilityStatus?: string;
  yearsActive?: string;
  deploymentsDelivered?: number | string;
  clientSatisfaction?: string;
  techSkills?: string[];
  contactEmail?: string;
}

export type AboutPageContent = AboutContent;

export interface CategoryBreakdownItem {
  name: string;
  count: number;
  pct: number;
  color: string;
}

export interface ProgressMetricItem {
  label: string;
  score: string | number;
  unit?: string;
}

/**
 * Master Database Model: ProofMetricCard
 */
export interface ProofMetricCard {
  id?: string;
  cardKey?: MetricCardKey;
  title?: string;
  label?: string;
  value?: string | number;
  subtext?: string;
  subtitle?: string;
  percentage?: number;
  category?: string;
  categoryBreakdownJson?: CategoryBreakdownItem[] | Record<string, unknown> | null;
  progressMetricsJson?: ProgressMetricItem[] | Record<string, unknown> | null;
  slaTarget?: string;
  displayOrder?: number;
}

/**
 * Master Database Model: FaqHeaderConfig / FaqSectionContent
 */
export interface FaqHeaderConfig {
  id?: string;
  title?: string;
  headline?: string;
  subtitle?: string;
  supportEmail?: string;
  badgeText?: string;
  pageTitle?: string;
  pageSubtitle?: string;
  searchPlaceholder?: string;
  telemetry1Title?: string;
  telemetry1Sub?: string;
  telemetry2Title?: string;
  telemetry2Sub?: string;
  telemetry3Title?: string;
  telemetry3Sub?: string;
  telemetry4Title?: string;
  telemetry4Sub?: string;
  categories?: string[];
}

export type FaqSectionContent = FaqHeaderConfig;

/**
 * Master Database Model: FAQItem
 */
export interface FAQItem {
  id: string;
  category: string;
  categoryTag?: string;
  question: string;
  answer: string;
  helpfulCount?: number;
  displayOrder?: number;
  isPublished?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/**
 * Master Database Model: ContactSubmission
 */
export interface ContactSubmission {
  id?: string;
  name?: string;
  clientName?: string; // Fallback
  email: string;
  company?: string;
  projectType?: string;
  budget?: string;
  budgetTier?: string; // Fallback
  timeline?: string;
  message?: string;
  projectBrief?: string; // Fallback
  status?: SubmissionStatus;
  priority?: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT' | string;
  notes?: string;
  internalNotes?: string[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/**
  * Master Database Model: ReviewItem
  */
export interface ReviewItem {
  id: string;
  author?: string;
  name: string;
  email?: string;
  role?: string;
  company?: string;
  roleCompany?: string;
  avatar?: string;
  avatarUrl?: string;
  quote?: string;
  comment?: string;
  content?: string;
  rating: number;
  dateString?: string;
  tags?: string[];
  verified?: boolean;
  isVerified?: boolean;
  isApproved: boolean;
  isFeatured?: boolean;
  createdAt?: string | Date;
}


export interface ContactPageContent {
  id: string;
  badgeText: string;
  pageTitle: string;
  pageSubtitle: string;
  directEmail: string;
  budgetTierOptions: string[];
}

export interface ContactChannelCard {
  id: string;
  cardNumber: string;
  title: string;
  handleOrUrl: string;
  badgeText: string;
  description: string;
  actionLabel: string;
  variantColor: 'primary' | 'emerald' | 'pink' | 'blue' | string;
  order: number;
}



