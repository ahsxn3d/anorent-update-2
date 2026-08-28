# ANORENT STUDIO // MASTER ARCHITECTURAL SPECIFICATION & DATA CONTRACT
**Document Title:** `main.md`  
**Role / Context:** Principal Software Architect & Headless CMS Data Contract Audit  
**Target Platform:** Next.js 15 App Router, React 19, Prisma ORM 6.x, PostgreSQL 16+, TypeScript 5.5+  
**Scope:** 100% Complete Structural Data Contracts, TypeScript Domain Interfaces, Component Prop Schemas, Live Data Inventory, and Target Relational `schema.prisma`.

---

## SECTION 1: COMPLETE TYPESCRIPT DOMAIN MODELS

```typescript
// =============================================================================
// ENUMS & PRIMITIVE UNIONS
// =============================================================================

export type PageRoute = 
  | 'home' 
  | 'deployments' 
  | 'about' 
  | 'faq' 
  | 'contact' 
  | 'project-detail';

export type ProductStatus = 'Production' | 'Staging' | 'Archived';

export type SubmissionStatus = 
  | 'UNREAD' 
  | 'IN_REVIEW' 
  | 'CONTACTED' 
  | 'MILESTONE_ACTIVE' 
  | 'CLOSED' 
  | 'ARCHIVED';

export type MetricCardKey = 'systems' | 'satisfaction' | 'sla' | 'escrow';

export type ParticleMode = 'quantum' | 'orbital' | 'matrix';

// =============================================================================
// 1. DEPLOYMENTS / PRODUCT CATALOG MODEL
// =============================================================================

export interface DeploymentProduct {
  id: string;                         // Primary Key (e.g. "dep-001")
  slug: string;                       // URL slug (e.g. "cyberpunk-hud-ui-kit")
  title: string;                      // Display Title
  client?: string;                    // Client Organization (e.g. "Hyperion AI")
  year?: string | number;             // Production Year (e.g. "2026")
  category: 'UI Templates' | 'Full-Stack Apps' | 'Animated Sites' | 'SaaS Dashboards' | string;
  shortDescription: string;           // 1-2 sentence preview description
  fullDescription?: string;           // Deep technical case study / architecture overview
  techStack: string[];                // Array of tech tags (e.g. ["React 19", "WebGL Shaders"])
  metrics?: string[];                 // Array of telemetry badges (e.g. ["60 FPS WebGL", "100/100 Lighthouse"])
  demoUrl: string;                    // Interactive staging / production link
  sourceUrl?: string;                 // GitHub or repository link
  thumbnailUrl: string;               // 800px web-optimized grid card image
  coverImageUrl?: string;             // 1600px full-bleed modal/detail image
  previewVideoUrl?: string;           // Optional WebM / MP4 video preview
  fpsBenchmark: number;               // Verified FPS (e.g. 60 or 90)
  auditScore: number;                 // Lighthouse / Performance score (e.g. 100)
  status?: ProductStatus;             // "Production" | "Staging" | "Archived"
  isFeatured: boolean;                // Pinned to hero / featured showcases
  displayOrder: number;               // Sequential sorting index
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

// =============================================================================
// 2. HERO SECTION DYNAMIC CONTENT MODEL
// =============================================================================

export interface HeroSectionContent {
  id: string;                         // Primary Key (e.g. "hero-section-content")
  topBadgeText: string;               // e.g. "[ SOLO CREATIVE DEVELOPER & 3D ARTIST ]"
  headlineLine1: string;              // Line 1 (e.g. "CYBERNETiC CRAFT")
  headlineLine2: string;              // Line 2 (e.g. "DiGiTAL REALMS")
  headlineLine3: string;              // Line 3 (e.g. "ENGiNEERED.")
  bioSubtext: string;                 // Paragraph summary beneath kinetic title
  highlightWords: string[];           // Words highlighted in purple/gradient
  primaryCtaLabel: string;            // e.g. "START A PROJECT ↗"
  primaryCtaRoute: string;            // e.g. "contact"
  secondaryCtaLabel: string;          // e.g. "BROWSE DEPLOYMENTS"
  secondaryCtaRoute: string;          // e.g. "deployments"
  pricingNoticeText: string;          // e.g. "Custom builds starting at $1,000 // Fast turnaround"
  particleModes: string[];            // ["quantum", "orbital", "matrix"]
  defaultParticleMode: string;        // "quantum"
  baseNodeCount: number;              // Interactive canvas node density (e.g. 100)
  targetFps: number;                  // e.g. 60
}

// =============================================================================
// 3. HORIZONTAL STORY STAGES & SUB-ENTITIES
// =============================================================================

export interface ArchitectureNode {
  id: string;                         // Primary Key (e.g. "node-1")
  stageId?: string;                   // Foreign Key -> StoryStageContent
  key: string;                        // e.g. "cdn", "api", "redis", "sql", "sockets"
  name: string;                       // e.g. "GLOBAL EDGE CLUSTER"
  latency: string;                    // e.g. "4ms", "< 1.2ms", "60 FPS"
  summary: string;                    // Architectural node overview
  order: number;                      // Sequential index (1-5)
}

export interface EscrowPhase {
  id: string;                         // Primary Key (e.g. "escrow-1")
  stageId?: string;                   // Foreign Key -> StoryStageContent
  phaseNumber: number;                // 1, 2, 3, 4
  title: string;                      // e.g. "Phase 1: Architecture & Wireframes"
  description: string;                // Detailed scope of deliverable
  badgeText: string;                  // e.g. "Protected", "Staged", "Audited", "Ready"
}

export interface StoryStageContent {
  id: string;                         // Primary Key (e.g. "stage-0")
  stageIndex: number;                 // Int 0-3 (0: Architecture, 1: Shaders, 2: Escrow, 3: Direct Access)
  stageBadge: string;                 // e.g. "01 // ARCHITECTURAL MASTERY"
  headlineLine1: string;              // e.g. "OBSIDIAN CORE &"
  headlineLine2: string;              // e.g. "EDGE PRECISION."
  description: string;                // Stage narrative
  specTag1Title?: string;             // e.g. "99.98% Uptime"
  specTag1Sub?: string;               // e.g. "Cluster Reliability"
  specTag2Title?: string;             // e.g. "< 8ms TTFB"
  specTag2Sub?: string;               // e.g. "Global Edge Latency"
  specTag3Title?: string;             // e.g. "Zero Bloat"
  specTag3Sub?: string;               // e.g. "Tailwind v4 Optimized"
  bulletPoint1?: string;              // e.g. "Microsecond Edge Compute Routing"
  bulletPoint2?: string;              // e.g. "Hardware-Accelerated WebGL Canvases"
  defaultTension?: number;            // Physics spring parameter (e.g. 320)
  defaultDamping?: number;            // Physics damping parameter (e.g. 24)
  primaryCtaLabel?: string;           // e.g. "EXPLORE ARCHITECTURE"
  primaryCtaRoute?: string;           // e.g. "deployments"
  secondaryCtaLabel?: string;         // e.g. "REQUEST AUDIT"
  secondaryCtaRoute?: string;         // e.g. "contact"
  architectureNodes?: ArchitectureNode[]; // Associated nodes (Stage 0)
  escrowPhases?: EscrowPhase[];           // Associated escrow milestones (Stage 2)
}

// =============================================================================
// 4. ABOUT / BIO & PROOF METRIC MODELS
// =============================================================================

export interface AboutPageContent {
  id: string;                         // Primary Key (e.g. "about-page-content")
  profileName: string;                // "Ahsan"
  handle: string;                     // "@Ahsanwebdesign"
  title: string;                      // "Solo Creative Developer & 3D Artist"
  executiveBio: string;               // Full biographical statement
  contactEmail: string;               // "ahsxn3d@gmail.com"
  locationTimezone: string;           // "Remote / Global (UTC+5)"
  availabilityStatus: string;         // "Available for Hire"
  techSkills: string[];               // ["Next.js 15", "Three.js", "Blender PBR", ...]
}

export interface CategoryBreakdownItem {
  name: string;                       // e.g. "UI Templates"
  count: number;                      // 3
  pct: number;                        // 25
  color: string;                      // "#8B00EE"
}

export interface ProgressMetricItem {
  label: string;                      // e.g. "Code Quality Score"
  score: string | number;             // 100
  unit?: string;                      // "%"
}

export interface ProofMetricCard {
  id: string;                         // Primary Key (e.g. "proof-1")
  cardKey: MetricCardKey;             // "systems" | "satisfaction" | "sla" | "escrow"
  title: string;                      // e.g. "Curated Systems"
  value: string;                      // e.g. "12+", "5.0", "<1-2h", "100%"
  label: string;                      // e.g. "Deployments", "Rating", "Avg Response", "Protected"
  subtext: string;                    // Card telemetry description
  categoryBreakdownJson?: CategoryBreakdownItem[] | Record<string, any> | null;
  progressMetricsJson?: ProgressMetricItem[] | Record<string, any> | null;
  slaTarget?: string;                 // e.g. "< 2 Hours SLA Guaranteed"
  percentage?: number;                // e.g. 100, 98
  displayOrder: number;               // 1-4
}

// =============================================================================
// 5. FAQ SECTION & ACCORDION ITEM MODELS
// =============================================================================

export interface FAQItem {
  id: string;                         // Primary Key (e.g. "faq-1")
  category: string;                   // e.g. "Custom Projects & Pricing"
  categoryTag: string;                // e.g. "Pricing & Scoping"
  question: string;                   // Question string
  answer: string;                     // Detailed answer string
  helpfulCount: number;               // Interactive counter
  displayOrder: number;               // Sequential sorting index
  isPublished: boolean;               // Visibility flag
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface FaqSectionContent {
  id: string;                         // Primary Key (e.g. "faq-section-content")
  badgeText: string;                  // "[ VERIFIED PROTOCOLS & ANSWERS ]"
  pageTitle: string;                  // "FREQUENTLY ASKED"
  pageSubtitle: string;               // "Clear answers on pricing, milestone escrow, 100% IP ownership, and technical SLAs."
  searchPlaceholder: string;          // "SEARCH PROTOCOLS OR KEYWORDS..."
  telemetry1Title: string;            // "< 1-2h SLA"
  telemetry1Sub: string;              // "Global Response Time"
  telemetry2Title: string;            // "100% IP Ownership"
  telemetry2Sub: string;              // "GitHub Repo Transfer"
  telemetry3Title: string;            // "Zero Risk Escrow"
  telemetry3Sub: string;              // "Milestone Deliverables"
  telemetry4Title: string;            // "30-Day Warranty"
  telemetry4Sub: string;              // "Post-Launch Support"
  categories: string[];               // ["All Categories", "Custom Projects & Pricing", ...]
}

// =============================================================================
// 6. CONTACT PAGE, CHANNELS & SUBMISSIONS
// =============================================================================

export interface ContactPageContent {
  id: string;                         // Primary Key (e.g. "contact-page-content")
  badgeText: string;                  // "[ INITIALIZE PROJECT COMMUNICATiONS ]"
  pageTitle: string;                  // "LET'S BUILD SOMETHING"
  pageSubtitle: string;               // "Direct communication with zero agency middlemen. Milestone escrow protection, fast turnaround, and 100% code ownership."
  directEmail: string;                // "ahsxn3d@gmail.com"
  budgetTierOptions: string[];        // ["$1k - $3k (Micro Deployment)", "$3k - $7k (Full Web App)", ...]
}

export interface ContactChannelCard {
  id: string;                         // Primary Key (e.g. "channel-1")
  cardNumber: string;                 // "Card 01", "Card 02", etc.
  title: string;                      // "Direct Email Brief", "Fiverr", "Dribbble", "Twitter", "WhatsApp"
  handleOrUrl: string;                // "ahsxn3d@gmail.com" | "https://fiverr.com/pro/anorent" | "@Ahsanwebdesign"
  badgeText: string;                  // "SLA <24h", "Escrow", "40+ Shots", "Open DMs", "Instant"
  description: string;                // Channel description
  actionLabel: string;                // "SEND DIRECT EMAIL BRIEF", "FIVERR", "DRIBBBLE", "TWITTER", "WHATSAPP"
  variantColor: 'primary' | 'emerald' | 'pink' | 'blue' | string;
  order: number;                      // 1-5
}

export interface ContactSubmission {
  id: string;                         // Primary Key (e.g. "sub-uuid-1234")
  clientName: string;                 // Client Full Name
  email: string;                      // Client Email Address
  company?: string;                   // Optional Company / Project Name
  budgetTier: string;                 // Selected Budget Range
  projectBrief: string;               // Project Scope & Requirements
  status: SubmissionStatus;           // "UNREAD" | "IN_REVIEW" | "CONTACTED" | "MILESTONE_ACTIVE" | "CLOSED" | "ARCHIVED"
  notes?: string;                     // Internal Architect CRM Notes
  createdAt: string | Date;
  updatedAt?: string | Date;
}

// =============================================================================
// 7. CLIENT REVIEWS & TESTIMONIALS
// =============================================================================

export interface ReviewItem {
  id: string;                         // Primary Key (e.g. "rev-1")
  name: string;                       // Reviewer Name (e.g. "Elena Rostova")
  email: string;                      // Reviewer Email (e.g. "elena@hyperion.ai")
  roleCompany?: string;               // e.g. "Product Lead @ Hyperion AI"
  rating: number;                     // 1 to 5 Stars (e.g. 5)
  comment: string;                    // Testimonial quote
  dateString: string;                 // Formatted date (e.g. "Aug 02, 2026")
  isVerified: boolean;                // Verified Client Badge
  isApproved: boolean;                // Moderation approval flag
  avatarUrl?: string;                 // Optional avatar photo
  createdAt?: string | Date;
}
```

---

## SECTION 2: COMPONENT PROP INTERFACES & CONSUMED FIELDS

Below is the verified audit of every interactive and visual UI component in the codebase, detailing required props and data model bindings:

### 1. `src/components/Navbar.tsx`
* **Props:**
  ```typescript
  interface NavbarProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
  }
  ```
* **Consumed Fields:**
  - Navigates routes: `'home' | 'deployments' | 'about' | 'faq' | 'contact'`.
  - Integrates `PlayfulLogo` and dynamic quick-hire CTA linked to `contact`.

### 2. `src/components/KineticHeroTitle.tsx`
* **Props:**
  ```typescript
  interface KineticHeroTitleProps {
    line1?: string;                   // Default: "CYBERNETiC CRAFT"
    line2?: string;                   // Default: "DiGiTAL REALMS"
    line3?: string;                   // Default: "ENGiNEERED."
    className?: string;
    onLetterHover?: (char: string) => void;
  }
  ```
* **Consumed Fields:** Custom GSAP spring splitting on characters with reactive magnetic hover displacements.

### 3. `src/components/HeroHologramCanvas.tsx`
* **Props:**
  ```typescript
  interface HeroHologramCanvasProps {
    className?: string;
    targetFps?: number;               // Target render frame rate (default: 60)
    interactive?: boolean;            // Pointer raycast interaction toggle (default: true)
    glowColor?: string;               // Custom hex/rgba glow accent
    onNodeSelect?: (nodeIndex: number) => void;
  }
  ```
* **Consumed Fields:** GPU canvas context rendering 3D wireframe geometries, dynamic particle orbits (`'quantum' | 'orbital' | 'matrix'`), and debounced resize observers.

### 4. `src/components/HoloCard.tsx`
* **Props:**
  ```typescript
  interface HoloCardProps {
    children: React.ReactNode;
    className?: string;
    maxTilt?: number;                 // Max 3D tilt angle (default: 20-25deg)
    glareOpacity?: number;            // Specular glare reflection strength (default: 0.35)
    perspective?: number;             // CSS 3D perspective distance (default: 1200px)
    glowColor?: string;               // Card hover glow aura (default: purple)
    onClick?: () => void;
  }
  ```
* **Consumed Fields:** Cursor position spring kinematics (`x`, `y`, `rotateX`, `rotateY`, `glareX`, `glareY`), 3D sub-layer depth translations (`translateZ`).

### 5. `src/components/ProductCard.tsx`
* **Props:**
  ```typescript
  interface ProductCardProps {
    product: DeploymentProduct;
    onSelect?: (product: DeploymentProduct) => void;
    layoutMode?: 'grid' | 'list';
    viewDetailsText?: string;
  }
  ```
* **Consumed Fields:** `product.id`, `product.title`, `product.client`, `product.year`, `product.category`, `product.shortDescription`, `product.techStack`, `product.metrics`, `product.demoUrl`, `product.sourceUrl`, `product.thumbnailUrl`, `product.fpsBenchmark`, `product.auditScore`, `product.status`.

### 6. `src/components/DeploymentModal.tsx`
* **Props:**
  ```typescript
  interface DeploymentModalProps {
    product: DeploymentProduct | null;
    isOpen: boolean;
    onClose: () => void;
    onNavigateContact?: () => void;
  }
  ```
* **Consumed Fields:** `product.title`, `product.client`, `product.category`, `product.year`, `product.fullDescription`, `product.techStack`, `product.metrics`, `product.demoUrl`, `product.sourceUrl`, `product.coverImageUrl`, `product.fpsBenchmark`, `product.auditScore`.

### 7. `src/components/HorizontalStory.tsx`
* **Props:**
  ```typescript
  interface HorizontalStoryProps {
    stages: StoryStageContent[];
    setCurrentPage: (page: Page) => void;
    onSelectStage?: (stageIndex: number) => void;
  }
  ```
* **Consumed Fields:**
  - `stages[i].stageIndex`, `stageBadge`, `headlineLine1`, `headlineLine2`, `description`.
  - `specTag1Title`, `specTag1Sub`, `specTag2Title`, `specTag2Sub`, `specTag3Title`, `specTag3Sub`.
  - `bulletPoint1`, `bulletPoint2`, `defaultTension`, `defaultDamping`.
  - `primaryCtaLabel`, `primaryCtaRoute`, `secondaryCtaLabel`, `secondaryCtaRoute`.
  - `architectureNodes` (`id`, `key`, `name`, `latency`, `summary`, `order`).
  - `escrowPhases` (`id`, `phaseNumber`, `title`, `description`, `badgeText`).

### 8. `src/components/ButterButton.tsx`
* **Props:**
  ```typescript
  interface ButterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'emerald' | 'pink' | 'blue' | 'cyber';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    href?: string;
    target?: string;
    rel?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    isMagnetic?: boolean;
    activeGlow?: boolean;
    children: React.ReactNode;
  }
  ```

### 9. `src/components/AboutStatsMatrix.tsx`
* **Props:**
  ```typescript
  interface AboutStatsMatrixProps {
    proofCards: ProofMetricCard[];
    aboutContent: AboutPageContent;
    onCardClick?: (cardKey: MetricCardKey) => void;
  }
  ```
* **Consumed Fields:** `card.cardKey`, `card.title`, `card.value`, `card.label`, `card.subtext`, `card.categoryBreakdownJson`, `card.progressMetricsJson`, `card.slaTarget`, `card.percentage`.

### 10. `src/components/ReviewsSection.tsx`
* **Props:**
  ```typescript
  interface ReviewsSectionProps {
    reviews: ReviewItem[];
    onAddReview: (review: Omit<ReviewItem, 'id' | 'dateString' | 'isVerified' | 'isApproved'>) => void;
  }
  ```
* **Consumed Fields:** `review.name`, `review.roleCompany`, `review.rating`, `review.comment`, `review.dateString`, `review.isVerified`, `review.isApproved`.

---

## SECTION 3: COMPLETE LIVE JSON MOCK DATASET

```json
{
  "deployments": [
    {
      "id": "dep-001",
      "slug": "cyberpunk-hud-ui-kit",
      "title": "Cyberpunk HUD UI Kit v3.4",
      "client": "Hyperion AI",
      "year": "2026",
      "category": "SaaS Dashboards",
      "shortDescription": "Ultra-dense futuristic HUD interfaces with React components, WebGL radar shaders, and full telemetry visualizers.",
      "fullDescription": "Production-ready cybernetic telemetry HUD dashboard designed for high-throughput AI agents, trading algorithms, and mission control centers. Includes custom WebGL radar shaders, reactive audio chimes, and full GLSL particle feedback.",
      "techStack": ["React 19", "WebGL Shaders", "Tailwind CSS v4", "TypeScript"],
      "metrics": ["60 FPS WebGL", "100/100 Lighthouse", "8ms TTFB"],
      "demoUrl": "https://anorent.studio/demo/hud-v3",
      "sourceUrl": "https://github.com/anorent/cyberpunk-hud-ui",
      "thumbnailUrl": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      "coverImageUrl": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=85",
      "fpsBenchmark": 60,
      "auditScore": 100,
      "status": "Production",
      "isFeatured": true,
      "displayOrder": 1
    },
    {
      "id": "dep-002",
      "slug": "neo-tokyo-3d-asset-vault",
      "title": "Neo-Tokyo 3D Asset Vault",
      "client": "Chrono Labs",
      "year": "2026",
      "category": "Animated Sites",
      "shortDescription": "High-poly procedural holographic 3D structures, neon signs, and sci-fi prop packs optimized for Three.js & Unreal 5.",
      "fullDescription": "Interactive 3D asset repository featuring real-time PBR material inspection, procedural neon sign generators, and GLTF LOD optimizations engineered for 60fps web execution.",
      "techStack": ["Three.js", "Blender PBR", "GLTF/GLB", "WebGL"],
      "metrics": ["Sub-2MB Assets", "60 FPS Canvas", "PBR Shaders"],
      "demoUrl": "https://anorent.studio/demo/3d-tokyo",
      "sourceUrl": "https://github.com/anorent/neo-tokyo-3d",
      "thumbnailUrl": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
      "coverImageUrl": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1600&q=85",
      "fpsBenchmark": 60,
      "auditScore": 99,
      "status": "Production",
      "isFeatured": true,
      "displayOrder": 2
    },
    {
      "id": "dep-003",
      "slug": "omnichain-smart-contract-core",
      "title": "OmniChain Smart Contract Core",
      "client": "Nexus Web3",
      "year": "2026",
      "category": "Full-Stack Apps",
      "shortDescription": "Audited ERC-721A & ERC-1155 contract suite featuring lazy minting, dynamic royalty splitting, and gas-less claim hooks.",
      "fullDescription": "Complete Web3 infrastructure layer with Next.js frontend interfaces, Ethers.js multi-provider fallback, and gas-optimized audited Solidity contracts with automated unit tests.",
      "techStack": ["Solidity", "Hardhat Core", "TypeScript", "Ethers.js"],
      "metrics": ["0 Gas Exploits", "Sub-second Indexing", "Multi-chain"],
      "demoUrl": "https://anorent.studio/demo/omnichain",
      "sourceUrl": "https://github.com/anorent/omnichain-core",
      "thumbnailUrl": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
      "coverImageUrl": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=85",
      "fpsBenchmark": 60,
      "auditScore": 100,
      "status": "Production",
      "isFeatured": true,
      "displayOrder": 3
    },
    {
      "id": "dep-004",
      "slug": "synthetix-ar-spatial-canvas",
      "title": "Synthetix AR Spatial Canvas",
      "client": "Metaverse3D Org",
      "year": "2026",
      "category": "Animated Sites",
      "shortDescription": "Spatial computing WebXR template for Apple Vision Pro and Meta Quest 3, rendering immersive interactive art galleries.",
      "fullDescription": "WebXR immersion canvas built for modern spatial headsets. Features spatial audio positioning, gesture recognition bounds, and low-latency WebGL raycasting.",
      "techStack": ["WebXR Spec", "Three.js Spatial", "WebAudio API"],
      "metrics": ["90 FPS Headset Target", "Zero Lag", "Spatial Audio"],
      "demoUrl": "https://anorent.studio/demo/spatial-ar",
      "sourceUrl": "https://github.com/anorent/synthetix-ar",
      "thumbnailUrl": "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=800&q=80",
      "coverImageUrl": "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=1600&q=85",
      "fpsBenchmark": 90,
      "auditScore": 98,
      "status": "Production",
      "isFeatured": false,
      "displayOrder": 4
    },
    {
      "id": "dep-005",
      "slug": "neural-engine-prompt-pipeline",
      "title": "Neural Engine Prompt Pipeline",
      "client": "Synthwave AI",
      "year": "2026",
      "category": "Full-Stack Apps",
      "shortDescription": "Custom Gemini & Stable Diffusion XL orchestration API server with real-time streaming canvas outputs and vector memory.",
      "fullDescription": "High-throughput multimodal generative AI server with streaming token responses, server-sent events, and edge vector caching for lightning-fast generative UI workflows.",
      "techStack": ["Gemini SDK", "Node ESM", "Express API", "React 19"],
      "metrics": ["120ms Generation Start", "Vector Cache", "Edge SSE"],
      "demoUrl": "https://anorent.studio/demo/neural-pipe",
      "sourceUrl": "https://github.com/anorent/neural-pipeline",
      "thumbnailUrl": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      "coverImageUrl": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85",
      "fpsBenchmark": 60,
      "auditScore": 100,
      "status": "Production",
      "isFeatured": true,
      "displayOrder": 5
    },
    {
      "id": "dep-006",
      "slug": "ghost-grid-saas-design-system",
      "title": "Ghost-Grid SaaS Design System",
      "client": "Aetheria Systems",
      "year": "2026",
      "category": "UI Templates",
      "shortDescription": "High-contrast cyberpunk UI component library with 120+ customizable React micro-interactions, dark & light themes.",
      "fullDescription": "Complete design engineering system featuring mathematical scale tokens, accessible WCAG AA contrast, subpixel font rendering, and zero-dependency micro-interactions.",
      "techStack": ["React 19", "Tailwind v4", "Motion React", "Radix UI"],
      "metrics": ["120+ Components", "0 Lint Errors", "Subpixel Polish"],
      "demoUrl": "https://anorent.studio/demo/ghost-grid",
      "sourceUrl": "https://github.com/anorent/ghost-grid-ui",
      "thumbnailUrl": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      "coverImageUrl": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=85",
      "fpsBenchmark": 60,
      "auditScore": 100,
      "status": "Production",
      "isFeatured": false,
      "displayOrder": 6
    },
    {
      "id": "dep-007",
      "slug": "apex-fintech-analytics-hud",
      "title": "Apex FinTech Analytics HUD",
      "client": "FintechX Corp",
      "year": "2026",
      "category": "SaaS Dashboards",
      "shortDescription": "Real-time financial telemetry dashboard featuring WebGL candlestick charts, algorithmic order routing, and live latency meters.",
      "fullDescription": "Institutional-grade finance dashboard with live WebSockets order book, hardware-accelerated time series charts, and sub-millisecond risk analytics calculations.",
      "techStack": ["React 19", "Recharts", "WebSockets", "Tailwind v4"],
      "metrics": ["4ms Live Latency", "10k Ticks/Sec", "60 FPS Graph"],
      "demoUrl": "https://anorent.studio/demo/apex-fintech",
      "sourceUrl": "https://github.com/anorent/apex-fintech-hud",
      "thumbnailUrl": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      "coverImageUrl": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
      "fpsBenchmark": 60,
      "auditScore": 99,
      "status": "Production",
      "isFeatured": true,
      "displayOrder": 7
    },
    {
      "id": "dep-008",
      "slug": "vortex-webgl-particle-portal",
      "title": "Vortex WebGL Particle Portal",
      "client": "Krypton Creative",
      "year": "2026",
      "category": "Animated Sites",
      "shortDescription": "Interactive GPU particle simulation landing page with audio-reactive shaders, cursor-following gravity fields, and GSAP transitions.",
      "fullDescription": "Stunning WebGL visual portal with 100,000 GPU-instanced particles computed in compute shaders with fluid mouse gravity interactions and smooth GSAP ScrollTrigger pinning.",
      "techStack": ["Three.js Shaders", "GSAP 3", "WebAudio", "GLSL"],
      "metrics": ["100k Particles", "60 FPS Locked", "Audio Reactive"],
      "demoUrl": "https://anorent.studio/demo/vortex-portal",
      "sourceUrl": "https://github.com/anorent/vortex-particles",
      "thumbnailUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      "coverImageUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
      "fpsBenchmark": 60,
      "auditScore": 98,
      "status": "Production",
      "isFeatured": false,
      "displayOrder": 8
    },
    {
      "id": "dep-009",
      "slug": "aetheria-ai-agent-workspace",
      "title": "Aetheria AI Agent Workspace",
      "client": "Hyperion AI",
      "year": "2026",
      "category": "Full-Stack Apps",
      "shortDescription": "Autonomous multi-agent orchestration dashboard with memory graph visualizers, tool execution logs, and Gemini live streaming.",
      "fullDescription": "Complete workflow canvas for commanding autonomous agent swarms, featuring interactive memory graph trees, live terminal output inspection, and human-in-the-loop approvals.",
      "techStack": ["React 19", "Gemini API", "Express.js", "TypeScript"],
      "metrics": ["Real-time Streaming", "Full Swarm Telemetry", "Zero Cold Start"],
      "demoUrl": "https://anorent.studio/demo/aetheria-ai",
      "sourceUrl": "https://github.com/anorent/aetheria-workspace",
      "thumbnailUrl": "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
      "coverImageUrl": "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1600&q=85",
      "fpsBenchmark": 60,
      "auditScore": 100,
      "status": "Production",
      "isFeatured": true,
      "displayOrder": 9
    },
    {
      "id": "dep-010",
      "slug": "prism-glassmorphic-ui-kit",
      "title": "Prism Glassmorphic UI Kit",
      "client": "DesignCore",
      "year": "2026",
      "category": "UI Templates",
      "shortDescription": "Next-gen frosted glass component suite with ambient glow borders, accessible color contrast tokens, and Tailwind v4 presets.",
      "fullDescription": "State-of-the-art frosted glass UI framework with mathematically layered backdrop-blur filters, dynamic specular glares, and harmonic spring interaction physics.",
      "techStack": ["React 19", "Tailwind v4", "Lucide Icons", "Motion"],
      "metrics": ["Sub-15kb CSS", "WCAG AA Passes", "Fluid Motion"],
      "demoUrl": "https://anorent.studio/demo/prism-glass",
      "sourceUrl": "https://github.com/anorent/prism-glass-ui",
      "thumbnailUrl": "https://images.unsplash.com/photo-1542744094-3a31b272c490?auto=format&fit=crop&w=800&q=80",
      "coverImageUrl": "https://images.unsplash.com/photo-1542744094-3a31b272c490?auto=format&fit=crop&w=1600&q=85",
      "fpsBenchmark": 60,
      "auditScore": 100,
      "status": "Production",
      "isFeatured": false,
      "displayOrder": 10
    },
    {
      "id": "dep-011",
      "slug": "krypton-liquidity-terminal",
      "title": "Krypton Liquidity Terminal",
      "client": "Chrono Labs",
      "year": "2026",
      "category": "SaaS Dashboards",
      "shortDescription": "DeFi yield optimization & multi-chain portfolio management HUD with automated rebalancing indicators and high-density telemetry.",
      "fullDescription": "High-density terminal for professional liquidity managers. Connects to Uniswap v4 pools, Curve hooks, and layer-2 bridges with live gas price estimators and MEV protection.",
      "techStack": ["React 19", "Ethers.js", "Recharts", "Tailwind v4"],
      "metrics": ["100% On-Chain Data", "Zero Index Latency", "Instant Swaps"],
      "demoUrl": "https://anorent.studio/demo/krypton-terminal",
      "sourceUrl": "https://github.com/anorent/krypton-terminal",
      "thumbnailUrl": "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80",
      "coverImageUrl": "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1600&q=85",
      "fpsBenchmark": 60,
      "auditScore": 99,
      "status": "Production",
      "isFeatured": true,
      "displayOrder": 11
    },
    {
      "id": "dep-012",
      "slug": "quantum-3d-product-studio",
      "title": "Quantum 3D Product Studio",
      "client": "Nexus Web3",
      "year": "2026",
      "category": "Animated Sites",
      "shortDescription": "Photorealistic 3D e-commerce product customizer with PBR texture swapping, exploded-view CAD animations, and AR preview.",
      "fullDescription": "Award-winning 3D product visualizer featuring studio lighting HDRI setups, interactive exploded view kinematics, procedural material configuration, and instant USDZ export for iOS QuickLook.",
      "techStack": ["Three.js", "GLTF Loader", "Canvas API", "WebXR"],
      "metrics": ["Photorealistic PBR", "60 FPS Orbit", "Instant USDZ Export"],
      "demoUrl": "https://anorent.studio/demo/quantum-3d",
      "sourceUrl": "https://github.com/anorent/quantum-3d-studio",
      "thumbnailUrl": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
      "coverImageUrl": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1600&q=85",
      "fpsBenchmark": 60,
      "auditScore": 100,
      "status": "Production",
      "isFeatured": true,
      "displayOrder": 12
    }
  ],

  "heroContent": {
    "id": "hero-section-content",
    "topBadgeText": "[ SOLO CREATIVE DEVELOPER & 3D ARTIST ]",
    "headlineLine1": "CYBERNETiC CRAFT",
    "headlineLine2": "DiGiTAL REALMS",
    "headlineLine3": "ENGiNEERED.",
    "bioSubtext": "I design and build high-performance 3D websites, WebGL shaders, and bespoke Next.js interfaces for founders who want to stand out.",
    "highlightWords": [
      "high-performance",
      "3D websites",
      "WebGL shaders",
      "bespoke Next.js interfaces",
      "founders",
      "stand out"
    ],
    "primaryCtaLabel": "START A PROJECT ↗",
    "primaryCtaRoute": "contact",
    "secondaryCtaLabel": "BROWSE DEPLOYMENTS",
    "secondaryCtaRoute": "deployments",
    "pricingNoticeText": "Custom builds starting at $1,000 // Fast turnaround",
    "particleModes": ["quantum", "orbital", "matrix"],
    "defaultParticleMode": "quantum",
    "baseNodeCount": 100,
    "targetFps": 60
  },

  "storyStages": [
    {
      "id": "stage-0",
      "stageIndex": 0,
      "stageBadge": "01 // ARCHITECTURAL MASTERY",
      "headlineLine1": "OBSIDIAN CORE &",
      "headlineLine2": "EDGE PRECISION.",
      "description": "Every interface is engineered from bare metal up. We eliminate sluggish third-party bloat in favor of sub-millisecond edge routes, strict TypeScript typing, and hardware-accelerated WebGL canvases.",
      "specTag1Title": "99.98% Uptime",
      "specTag1Sub": "Cluster Reliability",
      "specTag2Title": "< 8ms TTFB",
      "specTag2Sub": "Global Edge Latency",
      "specTag3Title": "Zero Bloat",
      "specTag3Sub": "Tailwind v4 Optimized",
      "bulletPoint1": "Microsecond Edge Compute Routing",
      "bulletPoint2": "Hardware-Accelerated WebGL Canvases",
      "defaultTension": 320,
      "defaultDamping": 24,
      "primaryCtaLabel": "EXPLORE ARCHITECTURE",
      "primaryCtaRoute": "deployments",
      "secondaryCtaLabel": "REQUEST AUDIT",
      "secondaryCtaRoute": "contact",
      "architectureNodes": [
        { "id": "node-1", "stageId": "stage-0", "key": "cdn", "name": "GLOBAL EDGE CLUSTER", "latency": "4ms", "summary": "Global CDN distribution with low-latency DNS routing and edge caching across 280+ nodes.", "order": 1 },
        { "id": "node-2", "stageId": "stage-0", "key": "api", "name": "NEXT.js 15 TURBOPACK", "latency": "12ms", "summary": "Server Components with zero client runtime overhead and streaming SSR.", "order": 2 },
        { "id": "node-3", "stageId": "stage-0", "key": "redis", "name": "DISTRIBUTED CACHE", "latency": "1.2ms", "summary": "Ultra-fast memory tier holding synchronized state and telemetry records.", "order": 3 },
        { "id": "node-4", "stageId": "stage-0", "key": "sql", "name": "PRISMA POSTGRES CORE", "latency": "6ms", "summary": "Type-safe relational persistence with connection pooling and strict schema validation.", "order": 4 },
        { "id": "node-5", "stageId": "stage-0", "key": "sockets", "name": "WEBGL GPU RUNTIME", "latency": "60 FPS", "summary": "Custom GLSL shader pipeline compiling directly to GPU hardware buffers.", "order": 5 }
      ]
    },
    {
      "id": "stage-1",
      "stageIndex": 1,
      "stageBadge": "02 // VISUAL SYNCHRONIZATION",
      "headlineLine1": "60 FPS SHADERS &",
      "headlineLine2": "KINETIC MOTION.",
      "description": "We treat visual engineering as fine mathematics. Seamlessly blend Three.js geometry, post-processing bloom, and GSAP scroll transitions that never drop a frame on mobile or desktop.",
      "specTag1Title": "Locked 60 FPS",
      "specTag1Sub": "Smooth WebGL Frame Rate",
      "specTag2Title": "Adaptive LOD",
      "specTag2Sub": "Dynamic Poly Optimization",
      "specTag3Title": "Raycasting Bounds",
      "specTag3Sub": "Instant Cursor Feedback",
      "bulletPoint1": "Mathematical Spring Physics Presets",
      "bulletPoint2": "GLSL Post-Processing Pipeline",
      "defaultTension": 360,
      "defaultDamping": 26,
      "primaryCtaLabel": "VIEW 3D EXPERIENCES",
      "primaryCtaRoute": "deployments",
      "secondaryCtaLabel": "INSPECT CODE",
      "secondaryCtaRoute": "about"
    },
    {
      "id": "stage-2",
      "stageIndex": 2,
      "stageBadge": "03 // SECURITY & ESCROW PROTOCOLS",
      "headlineLine1": "MILESTONE ESCROW &",
      "headlineLine2": "100% IP TRANSFER.",
      "description": "Zero financial risk for founders. Work under milestone-protected escrow where funds are released strictly upon your sign-off of interactive staging builds. Receive 100% source code ownership.",
      "specTag1Title": "100% IP Transfer",
      "specTag1Sub": "Complete Ownership",
      "specTag2Title": "Milestone Escrow",
      "specTag2Sub": "Protected Deliverables",
      "specTag3Title": "30-Day Warranty",
      "specTag3Sub": "Production Handover",
      "bulletPoint1": "Protected Milestone Escrow Workflow",
      "bulletPoint2": "Direct GitHub Repository Transfer",
      "defaultTension": 300,
      "defaultDamping": 22,
      "primaryCtaLabel": "START RISK-FREE BUILD",
      "primaryCtaRoute": "contact",
      "secondaryCtaLabel": "READ ESCROW FAQS",
      "secondaryCtaRoute": "faq",
      "escrowPhases": [
        { "id": "escrow-1", "stageId": "stage-2", "phaseNumber": 1, "title": "Phase 1: Architecture & Wireframes", "description": "Complete UI wireframes, architecture blueprint, and tech stack approval before coding starts.", "badgeText": "Protected" },
        { "id": "escrow-2", "stageId": "stage-2", "phaseNumber": 2, "title": "Phase 2: Interactive Staging Build", "description": "Live interactive Next.js + 3D deployment on private staging domain for testing and review.", "badgeText": "Staged" },
        { "id": "escrow-3", "stageId": "stage-2", "phaseNumber": 3, "title": "Phase 3: Performance & Security Audit", "description": "Rigorous profiling for 60 FPS frame rates, 100/100 Lighthouse score, and security hardening.", "badgeText": "Audited" },
        { "id": "escrow-4", "stageId": "stage-2", "phaseNumber": 4, "title": "Phase 4: IP Transfer & Production Handover", "description": "Full GitHub repository transfer, domain connection, and release of final escrow milestone.", "badgeText": "Ready" }
      ]
    },
    {
      "id": "stage-3",
      "stageIndex": 3,
      "stageBadge": "04 // DIRECT ARCHITECT COLLABORATION",
      "headlineLine1": "DIRECT ACCESS.",
      "headlineLine2": "NO MIDDLEMEN.",
      "description": "Work directly with Ahsan. No junior handoffs, no account managers, and no bloated agency retainer bills. Enjoy daily async progress video updates and fast response times.",
      "specTag1Title": "< 1-2h SLA",
      "specTag1Sub": "Average Response Time",
      "specTag2Title": "100% Solo Craft",
      "specTag2Sub": "Direct Creative Developer",
      "specTag3Title": "Async Videos",
      "specTag3Sub": "Daily Loom & PR Updates",
      "bulletPoint1": "Direct Daily Async Communication",
      "bulletPoint2": "Custom Next.js & 3D Builds from $1,000",
      "defaultTension": 340,
      "defaultDamping": 25,
      "primaryCtaLabel": "CONNECT DIRECTLY",
      "primaryCtaRoute": "contact",
      "secondaryCtaLabel": "VIEW REVIEWS",
      "secondaryCtaRoute": "about"
    }
  ],

  "aboutContent": {
    "id": "about-page-content",
    "profileName": "Ahsan",
    "handle": "@Ahsanwebdesign",
    "title": "Solo Creative Developer & 3D Artist",
    "executiveBio": "I design and engineer bespoke web experiences, interactive 3D WebGL environments, and production-ready Next.js interfaces directly for founders and modern brands. Operating as an independent developer, I provide end-to-end craft—from shaders and 3D assets to clean, scalable full-stack code with zero agency overhead or middlemen.",
    "contactEmail": "ahsxn3d@gmail.com",
    "locationTimezone": "Remote / Global (UTC+5)",
    "availabilityStatus": "Available for Hire",
    "techSkills": [
      "Next.js 15",
      "React 19",
      "Tailwind CSS v4",
      "Prisma ORM",
      "Three.js",
      "GSAP 3",
      "Blender PBR",
      "Maya",
      "Houdini",
      "Unreal Engine 5",
      "TypeScript",
      "WebGL / GLSL"
    ]
  },

  "proofMetricCards": [
    {
      "id": "proof-1",
      "cardKey": "systems",
      "title": "Curated Systems",
      "value": "12+",
      "label": "Deployments",
      "subtext": "Curated Deployments & Open-Source Tools built with production-grade Next.js, WebGL shaders, and clean React code.",
      "categoryBreakdownJson": [
        { "name": "UI Templates", "count": 3, "pct": 25, "color": "#8B00EE" },
        { "name": "Full-Stack Apps", "count": 3, "pct": 25, "color": "#06B6D4" },
        { "name": "Animated Sites", "count": 3, "pct": 25, "color": "#EC4899" },
        { "name": "SaaS Dashboards", "count": 3, "pct": 25, "color": "#10B981" }
      ],
      "percentage": 100,
      "displayOrder": 1
    },
    {
      "id": "proof-2",
      "cardKey": "satisfaction",
      "title": "Client Trust",
      "value": "5.0",
      "label": "Rating",
      "subtext": "Flawless 5.0-star delivery record on Fiverr Pro and direct enterprise contracts with zero dispute history.",
      "progressMetricsJson": [
        { "label": "Code Quality Score", "score": 100, "unit": "%" },
        { "label": "On-Time Milestone Delivery", "score": 100, "unit": "%" },
        { "label": "Client Retention / Rehires", "score": 94, "unit": "%" }
      ],
      "percentage": 100,
      "displayOrder": 2
    },
    {
      "id": "proof-3",
      "cardKey": "sla",
      "title": "Response SLA",
      "value": "<1-2h",
      "label": "Avg Response",
      "subtext": "Fast daily async turnaround across global timezones. Live direct communication without agency gatekeepers.",
      "slaTarget": "< 2 Hours SLA Guaranteed",
      "percentage": 98,
      "displayOrder": 3
    },
    {
      "id": "proof-4",
      "cardKey": "escrow",
      "title": "Escrow Security",
      "value": "100%",
      "label": "Protected",
      "subtext": "Zero financial risk milestone workflow. Full intellectual property and GitHub source transfer upon release.",
      "percentage": 100,
      "displayOrder": 4
    }
  ],

  "faqs": [
    {
      "id": "faq-1",
      "category": "Custom Projects & Pricing",
      "categoryTag": "Pricing & Scoping",
      "question": "What are your rates and turnaround times for custom builds?",
      "answer": "Custom Next.js & 3D WebGL builds start at $1,000. Typical turnarounds range from 1 to 3 weeks depending on complexity. You get direct daily async communication and working staging links throughout development.",
      "helpfulCount": 84,
      "displayOrder": 1,
      "isPublished": true
    },
    {
      "id": "faq-2",
      "category": "Licensing & Ownership",
      "categoryTag": "100% IP Transfer",
      "question": "Do I get full source code ownership and commercial rights?",
      "answer": "Yes, 100%. Upon final project sign-off, full repository ownership, intellectual property rights, and commercial licensing are transferred directly to your GitHub organization with zero royalty fees or recurring agency retainers.",
      "helpfulCount": 62,
      "displayOrder": 2,
      "isPublished": true
    },
    {
      "id": "faq-3",
      "category": "Workflow & Escrow",
      "categoryTag": "Milestone Escrow",
      "question": "How do payments, milestones, and escrow work?",
      "answer": "I work under milestone-protected escrow (via Fiverr Pro or direct milestone escrow agreements). Funds are only released once you test and approve each deliverable phase on a live interactive staging build.",
      "helpfulCount": 95,
      "displayOrder": 3,
      "isPublished": true
    },
    {
      "id": "faq-4",
      "category": "Tech Stack & Performance",
      "categoryTag": "Engineering",
      "question": "What technologies do you use for 3D and frontend development?",
      "answer": "I build with Next.js 15, React 19, TypeScript, Tailwind CSS v4, Three.js, WebGL GLSL shaders, Blender, and GSAP/Motion. Every build is profiled for 60 FPS smooth rendering and sub-second First Contentful Paint.",
      "helpfulCount": 51,
      "displayOrder": 4,
      "isPublished": true
    },
    {
      "id": "faq-5",
      "category": "Direct Communication",
      "categoryTag": "No Middlemen",
      "question": "Who will I be communicating with during the project?",
      "answer": "You communicate directly with me (Ahsan). There are no account managers, project coordinators, or junior handoffs. We collaborate via Email, WhatsApp, or async Loom/GitHub PRs with an average response time of under 1-2 hours.",
      "helpfulCount": 43,
      "displayOrder": 5,
      "isPublished": true
    },
    {
      "id": "faq-6",
      "category": "Post-Launch Support",
      "categoryTag": "Warranty",
      "question": "What happens after deployment? Is warranty included?",
      "answer": "Every custom project includes 30 days of post-launch bug fixing, performance monitoring, and seamless production handover. Ongoing retainer hours are available if you need iterative feature releases.",
      "helpfulCount": 39,
      "displayOrder": 6,
      "isPublished": true
    }
  ],

  "reviews": [
    {
      "id": "rev-1",
      "name": "Elena Rostova",
      "email": "elena@hyperion.ai",
      "roleCompany": "Product Lead @ Hyperion AI",
      "rating": 5,
      "comment": "Ahsan transformed our SaaS interface into a high-performance 3D visual experience. Working directly with an engineer of this caliber was lightning fast.",
      "dateString": "Aug 02, 2026",
      "isVerified": true,
      "isApproved": true
    },
    {
      "id": "rev-2",
      "name": "Darius Vance",
      "email": "darius@chronolabs.io",
      "roleCompany": "CTO @ Chrono Labs",
      "rating": 5,
      "comment": "Fast turnaround, pristine TypeScript, and unmatched shader animations. Escrow milestone delivery gave our team complete confidence.",
      "dateString": "Jul 28, 2026",
      "isVerified": true,
      "isApproved": true
    },
    {
      "id": "rev-3",
      "name": "Sophia Sterling",
      "email": "sophia@nexusweb.com",
      "roleCompany": "Head of Brand @ Nexus Web3",
      "rating": 5,
      "comment": "The WebGL shaders and 3D assets run at a locked 60 FPS. Seamless integration with our Next.js codebase and zero template bloat.",
      "dateString": "Jul 19, 2026",
      "isVerified": true,
      "isApproved": true
    },
    {
      "id": "rev-4",
      "name": "Marcus Thorne",
      "email": "marcus@synthwave.io",
      "roleCompany": "Founder @ Synthwave AI",
      "rating": 5,
      "comment": "Exceptional attention to micro-interactions and GPU shader optimization. Delivered ahead of deadline with direct, transparent communication.",
      "dateString": "Jul 11, 2026",
      "isVerified": true,
      "isApproved": true
    },
    {
      "id": "rev-5",
      "name": "Aria Chen",
      "email": "aria@metaverse3d.org",
      "roleCompany": "Design Director @ Metaverse3D",
      "rating": 5,
      "comment": "Ahsan built our interactive 3D product visualizer in under two weeks. Clean GLTF optimization and ultralight bundle footprint.",
      "dateString": "Jun 30, 2026",
      "isVerified": true,
      "isApproved": true
    },
    {
      "id": "rev-6",
      "name": "Liam O'Connor",
      "email": "liam@fintechx.com",
      "roleCompany": "VP Engineering @ FintechX Corp",
      "rating": 5,
      "comment": "Best solo frontend engineer we have hired. Clean code architecture, accessible components, and modern aesthetics without any agency fluff.",
      "dateString": "Jun 22, 2026",
      "isVerified": true,
      "isApproved": true
    }
  ],

  "contactChannels": [
    {
      "id": "channel-1",
      "cardNumber": "Card 01",
      "title": "Direct Email Brief",
      "handleOrUrl": "ahsxn3d@gmail.com",
      "badgeText": "SLA <24h",
      "description": "Send project parameters directly for guaranteed scoping & SLA reply.",
      "actionLabel": "SEND DIRECT EMAIL BRIEF",
      "variantColor": "primary",
      "order": 1
    },
    {
      "id": "channel-2",
      "cardNumber": "Card 02",
      "title": "Fiverr",
      "handleOrUrl": "https://fiverr.com/pro/anorent",
      "badgeText": "Escrow",
      "description": "Hire via verified Fiverr Pro milestone escrow with 100% protection.",
      "actionLabel": "FIVERR",
      "variantColor": "emerald",
      "order": 2
    },
    {
      "id": "channel-3",
      "cardNumber": "Card 03",
      "title": "Dribbble",
      "handleOrUrl": "https://dribbble.com/anorent",
      "badgeText": "40+ Shots",
      "description": "Explore UI design concepts, motion prototypes, and component systems.",
      "actionLabel": "DRIBBBLE",
      "variantColor": "pink",
      "order": 3
    },
    {
      "id": "channel-4",
      "cardNumber": "Card 04",
      "title": "Twitter",
      "handleOrUrl": "@Ahsanwebdesign",
      "badgeText": "Open DMs",
      "description": "Connect on Twitter / X for live code updates and open DMs.",
      "actionLabel": "TWITTER",
      "variantColor": "blue",
      "order": 4
    },
    {
      "id": "channel-5",
      "cardNumber": "Card 05",
      "title": "WhatsApp",
      "handleOrUrl": "+923000000000",
      "badgeText": "Instant",
      "description": "Instant mobile messaging for real-time project inquiries.",
      "actionLabel": "WHATSAPP",
      "variantColor": "emerald",
      "order": 5
    }
  ]
}
```

---

## SECTION 4: TARGET PRODUCTION `schema.prisma`

```prisma
// =============================================================================
// ANORENT STUDIO // TARGET PRODUCTION PRISMA ORM SCHEMA
// Database Engine: PostgreSQL 16+
// Compatibility: Next.js 15 App Router, Prisma ORM 6.x, TypeScript 5.5+
// =============================================================================

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["driverAdapters", "fullTextSearchPostgres"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// -----------------------------------------------------------------------------
// ENUMS
// -----------------------------------------------------------------------------

enum ProductStatus {
  Production
  Staging
  Archived
}

enum SubmissionStatus {
  UNREAD
  IN_REVIEW
  CONTACTED
  MILESTONE_ACTIVE
  CLOSED
  ARCHIVED
}

enum MetricCardKey {
  systems
  satisfaction
  sla
  escrow
}

// -----------------------------------------------------------------------------
// 1. DEPLOYMENTS & PRODUCT CATALOG
// -----------------------------------------------------------------------------

model DeploymentProduct {
  id               String        @id @default(cuid())
  slug             String        @unique
  title            String
  client           String?
  year             String?
  category         String
  shortDescription String        @db.Text
  fullDescription  String?       @db.Text
  techStack        String[]      @default([])
  metrics          String[]      @default([])
  demoUrl          String
  sourceUrl        String?
  thumbnailUrl     String
  coverImageUrl    String?
  previewVideoUrl  String?
  fpsBenchmark     Int           @default(60)
  auditScore       Int           @default(100)
  status           ProductStatus @default(Production)
  isFeatured       Boolean       @default(false)
  displayOrder     Int           @default(0)
  
  createdAt        DateTime      @default(now())
  updatedAt        DateTime      @updatedAt

  @@index([category])
  @@index([isFeatured])
  @@index([displayOrder])
  @@map("deployment_products")
}

// -----------------------------------------------------------------------------
// 2. HERO SECTION CONFIGURATION
// -----------------------------------------------------------------------------

model HeroSectionContent {
  id                  String   @id @default("hero-section-content")
  topBadgeText        String
  headlineLine1       String
  headlineLine2       String
  headlineLine3       String
  bioSubtext          String   @db.Text
  highlightWords      String[] @default([])
  primaryCtaLabel     String
  primaryCtaRoute     String
  secondaryCtaLabel   String
  secondaryCtaRoute   String
  pricingNoticeText   String
  particleModes       String[] @default(["quantum", "orbital", "matrix"])
  defaultParticleMode String   @default("quantum")
  baseNodeCount       Int      @default(100)
  targetFps           Int      @default(60)
  
  updatedAt           DateTime @updatedAt

  @@map("hero_section_content")
}

// -----------------------------------------------------------------------------
// 3. HORIZONTAL STORY STAGES & SUB-ENTITIES
// -----------------------------------------------------------------------------

model StoryStageContent {
  id                String             @id @default(cuid())
  stageIndex        Int                @unique
  stageBadge        String
  headlineLine1     String
  headlineLine2     String
  description       String             @db.Text
  specTag1Title     String?
  specTag1Sub       String?
  specTag2Title     String?
  specTag2Sub       String?
  specTag3Title     String?
  specTag3Sub       String?
  bulletPoint1      String?
  bulletPoint2      String?
  defaultTension    Int                @default(320)
  defaultDamping    Int                @default(24)
  primaryCtaLabel   String?
  primaryCtaRoute   String?
  secondaryCtaLabel String?
  secondaryCtaRoute String?

  architectureNodes ArchitectureNode[]
  escrowPhases      EscrowPhase[]

  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt

  @@index([stageIndex])
  @@map("story_stage_content")
}

model ArchitectureNode {
  id        String            @id @default(cuid())
  stageId   String
  stage     StoryStageContent @relation(fields: [stageId], references: [id], onDelete: Cascade)
  key       String
  name      String
  latency   String
  summary   String            @db.Text
  order     Int               @default(0)

  createdAt DateTime          @default(now())
  updatedAt DateTime          @updatedAt

  @@index([stageId])
  @@index([order])
  @@map("architecture_nodes")
}

model EscrowPhase {
  id          String            @id @default(cuid())
  stageId     String
  stage       StoryStageContent @relation(fields: [stageId], references: [id], onDelete: Cascade)
  phaseNumber Int
  title       String
  description String            @db.Text
  badgeText   String

  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt

  @@index([stageId])
  @@index([phaseNumber])
  @@map("escrow_phases")
}

// -----------------------------------------------------------------------------
// 4. ABOUT & PROOF METRICS
// -----------------------------------------------------------------------------

model AboutPageContent {
  id                 String   @id @default("about-page-content")
  profileName        String
  handle             String
  title              String
  executiveBio       String   @db.Text
  contactEmail       String
  locationTimezone   String
  availabilityStatus String
  techSkills         String[] @default([])

  updatedAt          DateTime @updatedAt

  @@map("about_page_content")
}

model ProofMetricCard {
  id                    String        @id @default(cuid())
  cardKey               MetricCardKey @unique
  title                 String
  value                 String
  label                 String
  subtext               String        @db.Text
  categoryBreakdownJson Json?
  progressMetricsJson   Json?
  slaTarget             String?
  percentage            Int?          @default(100)
  displayOrder          Int           @default(0)

  createdAt             DateTime      @default(now())
  updatedAt             DateTime      @updatedAt

  @@index([displayOrder])
  @@map("proof_metric_cards")
}

// -----------------------------------------------------------------------------
// 5. FAQ SECTION & ACCORDION REPOSITORY
// -----------------------------------------------------------------------------

model FAQItem {
  id           String   @id @default(cuid())
  category     String
  categoryTag  String
  question     String
  answer       String   @db.Text
  helpfulCount Int      @default(0)
  displayOrder Int      @default(0)
  isPublished  Boolean  @default(true)

  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@index([category])
  @@index([isPublished])
  @@index([displayOrder])
  @@map("faq_items")
}

model FaqSectionContent {
  id                String   @id @default("faq-section-content")
  badgeText         String
  pageTitle         String
  pageSubtitle      String   @db.Text
  searchPlaceholder String
  telemetry1Title   String
  telemetry1Sub     String
  telemetry2Title   String
  telemetry2Sub     String
  telemetry3Title   String
  telemetry3Sub     String
  telemetry4Title   String
  telemetry4Sub     String
  categories        String[] @default([])

  updatedAt         DateTime @updatedAt

  @@map("faq_section_content")
}

// -----------------------------------------------------------------------------
// 6. CONTACT PAGE CONFIGURATION & SUBMISSIONS CRM
// -----------------------------------------------------------------------------

model ContactPageContent {
  id                String   @id @default("contact-page-content")
  badgeText         String
  pageTitle         String
  pageSubtitle      String   @db.Text
  directEmail       String
  budgetTierOptions String[] @default([])

  updatedAt         DateTime @updatedAt

  @@map("contact_page_content")
}

model ContactChannelCard {
  id           String   @id @default(cuid())
  cardNumber   String
  title        String
  handleOrUrl  String
  badgeText    String
  description  String   @db.Text
  actionLabel  String
  variantColor String   @default("primary")
  order        Int      @default(0)

  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@index([order])
  @@map("contact_channel_cards")
}

model ContactSubmission {
  id           String           @id @default(cuid())
  clientName   String
  email        String
  company      String?
  budgetTier   String
  projectBrief String           @db.Text
  status       SubmissionStatus @default(UNREAD)
  notes        String?          @db.Text

  createdAt    DateTime         @default(now())
  updatedAt    DateTime         @updatedAt

  @@index([status])
  @@index([createdAt])
  @@map("contact_submissions")
}

// -----------------------------------------------------------------------------
// 7. CLIENT REVIEWS & TESTIMONIALS
// -----------------------------------------------------------------------------

model ReviewItem {
  id          String   @id @default(cuid())
  name        String
  email       String
  roleCompany String?
  rating      Int      @default(5)
  comment     String   @db.Text
  dateString  String
  isVerified  Boolean  @default(true)
  isApproved  Boolean  @default(true)
  avatarUrl   String?

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([isApproved])
  @@index([rating])
  @@map("review_items")
}
```
