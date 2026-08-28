# CMS Data Dictionary & Headless Content Specification // Anorent Studio

**Document Version:** 1.0.0  
**Architect:** Principal Database Architect & Headless CMS Specialist  
**Target Stack:** PostgreSQL 16+, Prisma ORM 6.x, Next.js 15 App Router / Server Actions, TypeScript 5.5+  
**Objective:** Define a 100% dynamic, relational, type-safe content schema mapping every piece of copy, telemetry metric, interactive widget state, and relational collection across the Anorent Studio application.

---

## 1. Page-Level Content & Static Copy

### 1.1 Global Navigation & Header (`SiteHeaderConfig` / `NavigationItem`)

| UI Element / Field | Exact Current Value in Code | Recommended Prisma Field Name | Prisma Data Type | Target Model / Table | Nullable / Optional |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Brand Wordmark** | `"ANORENT"` | `brandName` | `String` | `SiteHeaderConfig` | `No` |
| **Studio Avatar Initials** | `"AN"` | `avatarInitials` | `String` | `SiteHeaderConfig` | `No` |
| **Studio Name Tag** | `"ANORENT STUDIO"` | `studioTitle` | `String` | `SiteHeaderConfig` | `No` |
| **Studio Sub-Tag** | `"DIGITAL ARTIST & DEV"` | `studioSubtitle` | `String` | `SiteHeaderConfig` | `No` |
| **Status Indicator** | `"Online"` (Emerald pulsing badge) | `isOnline` | `Boolean` | `SiteHeaderConfig` | `No (default: true)` |
| **Audio SFX Toggle Default** | `true` | `defaultAudioEnabled` | `Boolean` | `SiteHeaderConfig` | `No (default: true)` |
| **Navigation Item 1** | `{ id: "home", label: "Home", href: "/" }` | `label`, `routeKey`, `href`, `order` | `String`, `String`, `String`, `Int` | `NavigationItem` | `No` |
| **Navigation Item 2** | `{ id: "deployments", label: "Deployments", href: "/deployments" }` | `label`, `routeKey`, `href`, `order` | `String`, `String`, `String`, `Int` | `NavigationItem` | `No` |
| **Navigation Item 3** | `{ id: "about", label: "About", href: "/about" }` | `label`, `routeKey`, `href`, `order` | `String`, `String`, `String`, `Int` | `NavigationItem` | `No` |
| **Navigation Item 4** | `{ id: "faq", label: "FAQ", href: "/faq" }` | `label`, `routeKey`, `href`, `order` | `String`, `String`, `String`, `Int` | `NavigationItem` | `No` |
| **Navigation Item 5** | `{ id: "contact", label: "Contact", href: "/contact" }` | `label`, `routeKey`, `href`, `order` | `String`, `String`, `String`, `Int` | `NavigationItem` | `No` |
| **Header CTA Button Label** | `"START PROJECT ↗"` | `headerCtaLabel` | `String` | `SiteHeaderConfig` | `No` |
| **Header CTA Route** | `"contact"` | `headerCtaRoute` | `String` | `SiteHeaderConfig` | `No` |

---

### 1.2 Hero Section (`HeroSectionContent`)

| UI Element / Field | Exact Current Value in Code | Recommended Prisma Field Name | Prisma Data Type | Target Model / Table | Nullable / Optional |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Top Status Badge** | `"[ SOLO CREATIVE DEVELOPER & 3D ARTIST ]"` | `topBadgeText` | `String` | `HeroSectionContent` | `No` |
| **Headline Segment 1** | `"CYBERNETiC CRAFT"` | `headlineLine1` | `String` | `HeroSectionContent` | `No` |
| **Headline Segment 2** | `"DiGiTAL REALMS"` | `headlineLine2` | `String` | `HeroSectionContent` | `No` |
| **Headline Segment 3** | `"ENGiNEERED."` | `headlineLine3` | `String` | `HeroSectionContent` | `No` |
| **Hero Subtitle / Bio** | `"I design and build high-performance 3D websites, WebGL shaders, and bespoke Next.js interfaces for founders who want to stand out."` | `bioSubtext` | `String` (Text) | `HeroSectionContent` | `No` |
| **Subtitle Highlight Words** | `["high-performance", "3D websites", "WebGL shaders", "bespoke Next.js interfaces", "founders", "stand out"]` | `highlightWords` | `String[]` | `HeroSectionContent` | `No (default: [])` |
| **Primary CTA Label** | `"START A PROJECT ↗"` | `primaryCtaLabel` | `String` | `HeroSectionContent` | `No` |
| **Primary CTA Route** | `"contact"` | `primaryCtaRoute` | `String` | `HeroSectionContent` | `No` |
| **Secondary CTA Label** | `"BROWSE DEPLOYMENTS"` | `secondaryCtaLabel` | `String` | `HeroSectionContent` | `No` |
| **Secondary CTA Route** | `"deployments"` | `secondaryCtaRoute` | `String` | `HeroSectionContent` | `No` |
| **Pricing Pre-Qualification** | `"Custom builds starting at $1,000 // Fast turnaround"` | `pricingNoticeText` | `String` | `HeroSectionContent` | `No` |
| **Hologram Orb Modes** | `["quantum", "orbital", "matrix"]` | `particleModes` | `String[]` | `HeroSectionContent` | `No` |
| **Default Hologram Mode** | `"quantum"` | `defaultParticleMode` | `String` | `HeroSectionContent` | `No` |
| **Default Node Count** | `100` (quantum), `120` (orbital), `144` (matrix) | `baseNodeCount` | `Int` | `HeroSectionContent` | `No (default: 100)` |
| **Target FPS Benchmark** | `60` | `targetFps` | `Int` | `HeroSectionContent` | `No (default: 60)` |

---

### 1.3 Horizontal Story Narrative: Stages 1–4 (`StoryStageContent` & `ArchitectureNode`)

#### Stage 1: Architectural Mastery
| UI Element / Field | Exact Current Value in Code | Recommended Prisma Field Name | Prisma Data Type | Target Model / Table | Nullable / Optional |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Stage Number & Category** | `"01 // ARCHITECTURAL MASTERY"` | `stageBadge` | `String` | `StoryStageContent` | `No` |
| **Scramble Headline Line 1** | `"SUB-MILLISECOND"` | `headlineLine1` | `String` | `StoryStageContent` | `No` |
| **Scramble Headline Line 2** | `"DIGITAL REALMS."` | `headlineLine2` | `String` | `StoryStageContent` | `No` |
| **Stage Description** | `"I reject slow, bloated website themes. Every interface is custom-architected on Next.js 15, React 19, and Tailwind v4 with zero runtime layout thrashing and hardware-accelerated shaders."` | `description` | `String` (Text) | `StoryStageContent` | `No` |
| **Telemetry Spec Tag 1** | `Title: "React 19 & Next 15", Sub: "Server Actions"` | `specTag1Title`, `specTag1Sub` | `String`, `String` | `StoryStageContent` | `No` |
| **Telemetry Spec Tag 2** | `Title: "WebGL / GLSL", Sub: "Hardware 60 FPS"` | `specTag2Title`, `specTag2Sub` | `String`, `String` | `StoryStageContent` | `No` |
| **Telemetry Spec Tag 3** | `Title: "Zero Thrash", Sub: "0 Cumulative Shift"` | `specTag3Title`, `specTag3Sub` | `String`, `String` | `StoryStageContent` | `No` |
| **GPU Controller Benchmark** | `"59 FPS // 0.18ms"` | `gpuBenchmark` | `String` | `StoryStageContent` | `No` |
| **GPU Tabs** | `["particle", "glsl", "edge", "reflow"]` | `interactiveTabs` | `String[]` | `StoryStageContent` | `No` |

#### Stage 2: Motion Choreography
| UI Element / Field | Exact Current Value in Code | Recommended Prisma Field Name | Prisma Data Type | Target Model / Table | Nullable / Optional |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Stage Number & Category** | `"02 // MOTION CHOREOGRAPHY"` | `stageBadge` | `String` | `StoryStageContent` | `No` |
| **Scramble Headline Line 1** | `"ELASTIC SPRINGS."` | `headlineLine1` | `String` | `StoryStageContent` | `No` |
| **Scramble Headline Line 2** | `"ZERO RIGIDITY."` | `headlineLine2` | `String` | `StoryStageContent` | `No` |
| **Stage Description** | `"Great interfaces feel tactile. I replace lifeless linear CSS transitions with calibrated mathematical damped springs and cursor attraction vectors."` | `description` | `String` (Text) | `StoryStageContent` | `No` |
| **Motion Bullet 1** | `"Damped Harmonic Oscillators calculated at 120Hz frame rates"` | `bulletPoint1` | `String` | `StoryStageContent` | `No` |
| **Motion Bullet 2** | `"Magnetic Vector Attraction towards interactive click targets"` | `bulletPoint2` | `String` | `StoryStageContent` | `No` |
| **Default Tension / Damping** | `tension: 300, damping: 24` | `defaultTension`, `defaultDamping` | `Int`, `Int` | `StoryStageContent` | `No` |
| **Spring Preset Modes** | `["snappy", "liquid", "elastic", "inertia"]` | `springPresets` | `String[]` | `StoryStageContent` | `No` |

#### Stage 3: Full-Stack Architecture & Distributed Nodes
| UI Element / Field | Exact Current Value in Code | Recommended Prisma Field Name | Prisma Data Type | Target Model / Table | Nullable / Optional |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Stage Number & Category** | `"03 // FULL-STACK ARCHITECTURE"` | `stageBadge` | `String` | `StoryStageContent` | `No` |
| **Scramble Headline Line 1** | `"SCALABLE SAAS."` | `headlineLine1` | `String` | `StoryStageContent` | `No` |
| **Scramble Headline Line 2** | `"ZERO DOWNTIME."` | `headlineLine2` | `String` | `StoryStageContent` | `No` |
| **Stage Description** | `"Visual brilliance requires hardened engineering. I build complete production-grade backends with authenticated RBAC APIs, serverless databases, real-time WebSockets, and Redis token bucket rate limiting."` | `description` | `String` (Text) | `StoryStageContent` | `No` |
| **Pill 1 (Auth)** | `Title: "Zero-Trust Auth", Sub: "JWT + Secure HTTP-only cookies"` | `specTag1Title`, `specTag1Sub` | `String`, `String` | `StoryStageContent` | `No` |
| **Pill 2 (Sockets)** | `Title: "Real-time WebSockets", Sub: "Sub-10ms pub/sub broadcast"` | `specTag2Title`, `specTag2Sub` | `String`, `String` | `StoryStageContent` | `No` |
| **Node 1: Edge CDN** | `Title: "GLOBAL EDGE CLUSTER", Latency: "4ms", Description: "Anycast routing across 300+ global edge nodes..."` | `key`, `name`, `latency`, `summary`, `order` | `String`, `String`, `String`, `String`, `Int` | `ArchitectureNode` | `No` |
| **Node 2: Next API** | `Title: "REST / GRAPHQL ROUTER", Latency: "12ms", Description: "Direct RPC function calls with compile-time TypeScript type validation..."` | `key`, `name`, `latency`, `summary`, `order` | `String`, `String`, `String`, `String`, `Int` | `ArchitectureNode` | `No` |
| **Node 3: Redis KV** | `Title: "UPSTASH KV CACHE", Latency: "1ms", Description: "Distributed rate limiting, session cache, and fast key-value lookups..."` | `key`, `name`, `latency`, `summary`, `order` | `String`, `String`, `String`, `String`, `Int` | `ArchitectureNode` | `No` |
| **Node 4: SQL Base** | `Title: "POSTGRESQL / CLOUDSQL", Latency: "40 Conns", Description: "Type-safe relational database schema management..."` | `key`, `name`, `latency`, `summary`, `order` | `String`, `String`, `String`, `String`, `Int` | `ArchitectureNode` | `No` |
| **Node 5: Sockets** | `Title: "WEBHOOK EVENT HUB", Latency: "Active", Description: "Bidirectional real-time notification dispatch..."` | `key`, `name`, `latency`, `summary`, `order` | `String`, `String`, `String`, `String`, `Int` | `ArchitectureNode` | `No` |

#### Stage 4: Escrow & Trust Lifecycle
| UI Element / Field | Exact Current Value in Code | Recommended Prisma Field Name | Prisma Data Type | Target Model / Table | Nullable / Optional |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Stage Number & Category** | `"04 // ZERO-RISK EXECUTION"` | `stageBadge` | `String` | `StoryStageContent` | `No` |
| **Scramble Headline Line 1** | `"VERIFIED ESCROW."` | `headlineLine1` | `String` | `StoryStageContent` | `No` |
| **Scramble Headline Line 2** | `"100% IP TRANSFER."` | `headlineLine2` | `String` | `StoryStageContent` | `No` |
| **Stage Description** | `"I work under protected milestone escrow via Fiverr Pro. You review and interact with live staging builds before approving each milestone release phase."` | `description` | `String` (Text) | `StoryStageContent` | `No` |
| **Escrow Phase 1** | `Title: "Phase 1: Architecture & Wireframes", Sub: "Design tokens, 3D moodboards, and architecture locked.", Badge: "Protected"` | `phaseNumber`, `title`, `description`, `badgeText` | `Int`, `String`, `String`, `String` | `EscrowPhase` | `No` |
| **Escrow Phase 2** | `Title: "Phase 2: Alpha Build & Motion", Sub: "Live staging domain for client interactive review.", Badge: "Staged"` | `phaseNumber`, `title`, `description`, `badgeText` | `Int`, `String`, `String`, `String` | `EscrowPhase` | `No` |
| **Escrow Phase 3** | `Title: "Phase 3: Production Hardening", Sub: "Lighthouse 95+ and zero-leak memory audit.", Badge: "Audited"` | `phaseNumber`, `title`, `description`, `badgeText` | `Int`, `String`, `String`, `String` | `EscrowPhase` | `No` |
| **Escrow Phase 4** | `Title: "Phase 4: Full Codebase & 100% IP Transfer", Sub: "Clean GitHub repo transfer and deployment.", Badge: "Ready"` | `phaseNumber`, `title`, `description`, `badgeText` | `Int`, `String`, `String`, `String` | `EscrowPhase` | `No` |
| **Stage 4 Primary CTA** | `"Start Project Brief"` $\to$ `/contact` | `primaryCtaLabel`, `primaryCtaRoute` | `String`, `String` | `StoryStageContent` | `No` |
| **Stage 4 Secondary CTA** | `"Inspect Deployments"` $\to$ `/deployments` | `secondaryCtaLabel`, `secondaryCtaRoute` | `String`, `String` | `StoryStageContent` | `No` |

---

### 1.4 About Page (`AboutPageContent` & `ProofMetricCard`)

| UI Element / Field | Exact Current Value in Code | Recommended Prisma Field Name | Prisma Data Type | Target Model / Table | Nullable / Optional |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Developer Name** | `"Ahsan"` | `profileName` | `String` | `AboutPageContent` | `No` |
| **Developer Handle** | `"@Ahsanwebdesign"` | `handle` | `String` | `AboutPageContent` | `No` |
| **Professional Title** | `"Solo Creative Developer & 3D Artist"` | `title` | `String` | `AboutPageContent` | `No` |
| **Executive Bio** | `"I design and engineer bespoke web experiences, interactive 3D WebGL environments, and production-ready Next.js interfaces directly for founders and modern brands..."` | `executiveBio` | `String` (Text) | `AboutPageContent` | `No` |
| **Direct Contact Email** | `"ahsxn3d@gmail.com"` | `contactEmail` | `String` | `AboutPageContent` | `No` |
| **Timezone & Location** | `"Remote / Global (UTC+5)"` | `locationTimezone` | `String` | `AboutPageContent` | `No` |
| **Availability Status** | `"Available for Hire"` (Pulsing emerald indicator) | `availabilityStatus` | `String` | `AboutPageContent` | `No` |
| **Technical Stack Array** | `["Next.js 15", "React 19", "Tailwind CSS", "Prisma ORM", "Three.js", "GSAP", "Blender", "Maya", "Houdini", "Unreal Engine 5", "TypeScript", "WebGL / GLSL"]` | `techSkills` | `String[]` | `AboutPageContent` | `No` |
| **Proof Card 1: Systems** | `Value: "12+ Deployments", Label: "Curated Systems", Sub: "UI Templates, Full-Stack Apps, Animated Sites, SaaS Dashboards"` | `title`, `value`, `subtext`, `categoryBreakdownJson` | `String`, `String`, `String`, `Json` | `ProofMetricCard` | `No` |
| **Proof Card 2: Satisfaction** | `Value: "99.9% (5.0 ★)", Label: "Client Satisfaction", Metrics: "100% Code Quality, 99.8% GPU 60 FPS, 100% On-Time"` | `title`, `value`, `subtext`, `progressMetricsJson` | `String`, `String`, `String`, `Json` | `ProofMetricCard` | `No` |
| **Proof Card 3: SLA Clock** | `Value: "< 1-2 Hours", Label: "Direct Communication", Sub: "Email & WhatsApp Daily Async Updates"` | `title`, `value`, `subtext`, `slaTarget` | `String`, `String`, `String`, `String` | `ProofMetricCard` | `No` |
| **Proof Card 4: IP Transfer** | `Value: "100% IP Transfer", Label: "Client Rights & Escrow", Sub: "Full source code transfer via verified milestone escrow"` | `title`, `value`, `subtext`, `percentage` | `String`, `String`, `String`, `Int` | `ProofMetricCard` | `No` |

---

### 1.5 FAQ Page (`FaqSectionContent` & `FAQItem`)

| UI Element / Field | Exact Current Value in Code | Recommended Prisma Field Name | Prisma Data Type | Target Model / Table | Nullable / Optional |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Top Protocol Pill** | `"DIRECT ARCHITECT DISPATCH // TRANSPARENT PROTOCOL"` | `badgeText` | `String` | `FaqSectionContent` | `No` |
| **Page Headline** | `"KNOWLEDGE VAULT & PROTOCOLS"` | `pageTitle` | `String` | `FaqSectionContent` | `No` |
| **Page Subtitle** | `"Clear answers on custom Next.js builds, WebGL shaders, milestone escrow security, and 100% full source code ownership."` | `pageSubtitle` | `String` (Text) | `FaqSectionContent` | `No` |
| **Search Bar Placeholder** | `"Search knowledge protocols (e.g. pricing, escrow, stack, 100% IP, timeline)..."` | `searchPlaceholder` | `String` | `FaqSectionContent` | `No` |
| **Telemetry Card 1** | `Title: "100% Code Transfer", Sub: "IP Ownership"` | `telemetry1Title`, `telemetry1Sub` | `String`, `String` | `FaqSectionContent` | `No` |
| **Telemetry Card 2** | `Title: "< 1-2h Response", Sub: "Average SLA"` | `telemetry2Title`, `telemetry2Sub` | `String`, `String` | `FaqSectionContent` | `No` |
| **Telemetry Card 3** | `Title: "60 FPS GPU Profiling", Sub: "Performance"` | `telemetry3Title`, `telemetry3Sub` | `String`, `String` | `FaqSectionContent` | `No` |
| **Telemetry Card 4** | `Title: "Fiverr Pro Escrow", Sub: "Security"` | `telemetry4Title`, `telemetry4Sub` | `String`, `String` | `FaqSectionContent` | `No` |
| **FAQ Filter Categories** | `["All", "Pricing & Scoping", "100% IP Transfer", "Milestone Escrow", "Engineering", "No Middlemen"]` | `categories` | `String[]` | `FaqSectionContent` | `No` |

---

### 1.6 Contact Page (`ContactPageContent` & `ContactChannelCard`)

| UI Element / Field | Exact Current Value in Code | Recommended Prisma Field Name | Prisma Data Type | Target Model / Table | Nullable / Optional |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Header Status Pill** | `"ANORENT Studio • Official Contact Portals"` | `badgeText` | `String` | `ContactPageContent` | `No` |
| **Page Headline** | `"LET'S BUILD TOGETHER."` | `pageTitle` | `String` | `ContactPageContent` | `No` |
| **Page Subtitle** | `"Reach out via any of our official channels: Direct Email, Fiverr Pro, Dribbble, Twitter, or WhatsApp."` | `pageSubtitle` | `String` (Text) | `ContactPageContent` | `No` |
| **Direct Contact Email** | `"ahsxn3d@gmail.com"` | `directEmail` | `String` | `ContactPageContent` | `No` |
| **Budget Tier Options** | `["$1k - $3k (Micro Deployment)", "$3k - $7k (Full Web App)", "$7k - $15k (Enterprise Architecture)", "$15k+ (Bespoke Retainer / Studio Partner)"]` | `budgetTierOptions` | `String[]` | `ContactPageContent` | `No` |
| **Channel 1: Email** | `Card 01: "Direct Email", Value: "ahsxn3d@gmail.com", SLA: "< 24h reply guaranteed"` | `title`, `handleOrUrl`, `badgeText`, `description`, `order` | `String`, `String`, `String`, `String`, `Int` | `ContactChannelCard` | `No` |
| **Channel 2: Fiverr** | `Card 02: "Fiverr", Sub: "Escrow Advantage", URL: "https://fiverr.com/pro/anorent", Tag: "Fiverr Pro"` | `title`, `handleOrUrl`, `badgeText`, `description`, `order` | `String`, `String`, `String`, `String`, `Int` | `ContactChannelCard` | `No` |
| **Channel 3: Dribbble** | `Card 03: "Dribbble", Sub: "40+ Shots", URL: "https://dribbble.com/anorent", Tag: "Dribbble Pro"` | `title`, `handleOrUrl`, `badgeText`, `description`, `order` | `String`, `String`, `String`, `String`, `Int` | `ContactChannelCard` | `No` |
| **Channel 4: Twitter** | `Card 04: "Twitter", Sub: "Open DMs", URL: "https://x.com/Ahsanwebdesign", Handle: "@Ahsanwebdesign"` | `title`, `handleOrUrl`, `badgeText`, `description`, `order` | `String`, `String`, `String`, `String`, `Int` | `ContactChannelCard` | `No` |
| **Channel 5: WhatsApp** | `Card 05: "WhatsApp", Sub: "Instant Line", Number: "03284992759", URL: "https://wa.me/923284992759"` | `title`, `handleOrUrl`, `badgeText`, `description`, `order` | `String`, `String`, `String`, `String`, `Int` | `ContactChannelCard` | `No` |

---

### 1.7 Global Footer (`FooterContent`)

| UI Element / Field | Exact Current Value in Code | Recommended Prisma Field Name | Prisma Data Type | Target Model / Table | Nullable / Optional |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Footer Brand Name** | `"ANORENT"` | `brandName` | `String` | `FooterContent` | `No` |
| **Brand Badge Tag** | `"Anorent Studio"` | `brandTag` | `String` | `FooterContent` | `No` |
| **Studio Tagline** | `"Where Cyberpunk Aesthetics Meet High-Performance Web Engineering."` | `tagline` | `String` | `FooterContent` | `No` |
| **Copyright Notice** | `"© 2026 ANORENT STUDIO. All rights reserved."` | `copyrightText` | `String` | `FooterContent` | `No` |
| **Bottom Badge Left** | `"Anorent Architecture // Modern Portfolio Showcase"` | `bottomBadgeLeft` | `String` | `FooterContent` | `No` |
| **Bottom Badge Right** | `"Powered by Anorent Core Engine"` | `bottomBadgeRight` | `String` | `FooterContent` | `No` |
| **Telemetry Clock Title** | `"System Telemetry & Live Clock"` | `telemetryTitle` | `String` | `FooterContent` | `No` |

---

## 2. Dynamic Collections & Relational Data

### 2.1 Deployments Catalog (`DeploymentProduct`)

```prisma
model DeploymentProduct {
  id               String   @id @default(cuid())
  slug             String   @unique
  title            String
  category         String   // 'UI Templates' | 'Full-Stack Apps' | 'Animated Sites' | 'SaaS Dashboards'
  shortDescription String   @db.Text
  fullDescription  String?  @db.Text
  techStack        String[]
  demoUrl          String
  sourceUrl        String?
  thumbnailUrl     String
  previewVideoUrl  String?
  fpsBenchmark     Int      @default(60)
  auditScore       Int      @default(100)
  isFeatured       Boolean  @default(false)
  displayOrder     Int      @default(0)
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  @@index([category])
  @@index([isFeatured])
  @@index([displayOrder])
}
```

#### Seed Record Extraction (12 Current Production Deployments)
1. **`dep-001`**: *Cyberpunk HUD UI Kit v3.4* | SaaS Dashboards | `['React 19', 'WebGL Shaders', 'Tailwind CSS v4']`
2. **`dep-002`**: *Neo-Tokyo 3D Asset Vault* | Animated Sites | `['Three.js', 'Blender PBR', 'GLTF/GLB']`
3. **`dep-003`**: *OmniChain Smart Contract Core* | Full-Stack Apps | `['Solidity', 'Hardhat Core', 'TypeScript']`
4. **`dep-004`**: *Synthetix AR Spatial Canvas* | Animated Sites | `['WebXR Spec', 'Three.js Spatial', 'WebAudio API']`
5. **`dep-005`**: *Neural Engine Prompt Pipeline* | Full-Stack Apps | `['Gemini SDK', 'Node ESM', 'Express API']`
6. **`dep-006`**: *Ghost-Grid SaaS Design System* | UI Templates | `['React 19', 'Tailwind v4', 'Framer Motion']`
7. **`dep-007`**: *Apex FinTech Analytics HUD* | SaaS Dashboards | `['React 19', 'Recharts', 'WebSockets', 'Tailwind v4']`
8. **`dep-008`**: *Vortex WebGL Particle Portal* | Animated Sites | `['Three.js Shaders', 'GSAP 3', 'WebAudio']`
9. **`dep-009`**: *Aetheria AI Agent Workspace* | Full-Stack Apps | `['React 19', 'Gemini API', 'Express.js', 'TypeScript']`
10. **`dep-010`**: *Prism Glassmorphic UI Kit* | UI Templates | `['React 19', 'Tailwind v4', 'Lucide Icons']`
11. **`dep-011`**: *Krypton Liquidity Terminal* | SaaS Dashboards | `['React 19', 'Ethers.js', 'Recharts', 'Tailwind v4']`
12. **`dep-012`**: *Quantum 3D Product Studio* | Animated Sites | `['Three.js', 'GLTF Loader', 'Canvas API']`

---

### 2.2 Client Reviews Collection (`ReviewItem`)

```prisma
model ReviewItem {
  id             String   @id @default(cuid())
  name           String
  email          String
  roleCompany    String?
  rating         Int      @default(5) // 1 - 5
  comment        String   @db.Text
  dateString     String   // e.g. "Aug 02, 2026"
  isVerified     Boolean  @default(true)
  isApproved     Boolean  @default(true)
  avatarUrl      String?
  createdAt      DateTime @default(now())

  @@index([isApproved])
  @@index([rating])
}
```

#### Seed Record Extraction (6 Production Reviews)
1. **Elena Rostova** (`elena@hyperion.ai`): 5 Stars — *"Ahsan transformed our SaaS interface into a high-performance 3D visual experience..."* (Aug 02, 2026)
2. **Darius Vance** (`darius@chronolabs.io`): 5 Stars — *"Fast turnaround, pristine TypeScript, and unmatched shader animations..."* (Jul 28, 2026)
3. **Sophia Sterling** (`sophia@nexusweb.com`): 5 Stars — *"The WebGL shaders and 3D assets run at a locked 60 FPS..."* (Jul 19, 2026)
4. **Marcus Thorne** (`marcus@synthwave.io`): 5 Stars — *"Exceptional attention to micro-interactions and GPU shader optimization..."* (Jul 11, 2026)
5. **Aria Chen** (`aria@metaverse3d.org`): 5 Stars — *"Ahsan built our interactive 3D product visualizer in under two weeks..."* (Jun 30, 2026)
6. **Liam O'Connor** (`liam@fintechx.com`): 5 Stars — *"Best solo frontend engineer we have hired. Clean code architecture..."* (Jun 22, 2026)

---

### 2.3 FAQ Collection (`FAQItem`)

```prisma
model FAQItem {
  id           String   @id @default(cuid())
  category     String   // e.g. "Custom Projects & Pricing"
  categoryTag  String   // e.g. "Pricing & Scoping"
  question     String
  answer       String   @db.Text
  helpfulCount Int      @default(0)
  displayOrder Int      @default(0)
  isPublished  Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@index([categoryTag])
  @@index([isPublished])
}
```

#### Seed Record Extraction (6 Current FAQs)
1. **`faq-1`**: *Rates & Turnarounds* (Tag: `Pricing & Scoping` | Helpful: 84)
2. **`faq-2`**: *100% Source Code Ownership* (Tag: `100% IP Transfer` | Helpful: 62)
3. **`faq-3`**: *Payments & Milestone Escrow* (Tag: `Milestone Escrow` | Helpful: 95)
4. **`faq-4`**: *Tech Stack & Performance* (Tag: `Engineering` | Helpful: 51)
5. **`faq-5`**: *Direct Communication & No Middlemen* (Tag: `No Middlemen` | Helpful: 43)
6. **`faq-6`**: *30-Day Post-Launch Warranty* (Tag: `Warranty` | Helpful: 39)

---

### 2.4 Project Brief & Inquiries (`ContactSubmission`)

```prisma
enum SubmissionStatus {
  UNREAD
  IN_REVIEW
  CONTACTED
  MILESTONE_ACTIVE
  CLOSED
  ARCHIVED
}

model ContactSubmission {
  id           String           @id @default(cuid())
  clientName   String
  email        String
  budgetTier   String           // e.g. "$3k - $7k (Full Web App)"
  projectBrief String           @db.Text
  status       SubmissionStatus @default(UNREAD)
  ipAddress    String?
  userAgent    String?
  notes        String?          @db.Text
  createdAt    DateTime         @default(now())
  updatedAt    DateTime         @updatedAt

  @@index([status])
  @@index([createdAt])
}
```

---

## 3. Technical Props & Component Configurations

### 3.1 `CyberButton` & `ButterButton` Dynamic Configuration

```prisma
model ButtonVariantConfig {
  id              String   @id @default(cuid())
  variantKey      String   @unique // 'purple' | 'cyan' | 'emerald' | 'green' | 'pink' | 'ghost' | 'glass' | 'primary' | 'secondary'
  baseBgColor     String   // e.g. '#180A30'
  textColor       String   // e.g. '#FFFFFF'
  wipeGradient    String   // e.g. 'linear-gradient(135deg, #8B00EE 0%, #A855F7 50%, #38BDF8 100%)'
  glowBoxShadow   String   // e.g. '0 0 22px rgba(139,0,238,0.55)'
  cornerBrackets  Boolean  @default(true)
  hoverSoundKey   String?  @default('hover')
  clickSoundKey   String?  @default('click')
}
```

### 3.2 System Telemetry Defaults (`SystemTelemetryConfig`)

```prisma
model SystemTelemetryConfig {
  id                String   @id @default("global-telemetry-config")
  globalUptimeRate  String   @default("100% Uptime")
  activeNodesCount  Int      @default(16240)
  serverLatencyMs   Float    @default(0.18)
  averageSlaHours   String   @default("< 1-2 Hours")
  liveTimezoneLabel String   @default("UTC+5 (Live)")
  fpsTarget         Int      @default(60)
  updatedAt         DateTime @updatedAt
}
```

---

## 4. Complete Production Prisma Schema Specification (`schema.prisma`)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// ----------------------------------------------------
// 1. SITE METADATA & GLOBAL HEADER / FOOTER
// ----------------------------------------------------

model SiteHeaderConfig {
  id                 String   @id @default("global-header-config")
  brandName          String   @default("ANORENT")
  avatarInitials     String   @default("AN")
  studioTitle        String   @default("ANORENT STUDIO")
  studioSubtitle     String   @default("DIGITAL ARTIST & DEV")
  isOnline           Boolean  @default(true)
  defaultAudioEnabled Boolean @default(true)
  headerCtaLabel     String   @default("START PROJECT ↗")
  headerCtaRoute     String   @default("contact")
  updatedAt          DateTime @updatedAt
}

model NavigationItem {
  id       String @id @default(cuid())
  routeKey String @unique // 'home' | 'deployments' | 'about' | 'faq' | 'contact'
  label    String
  href     String
  order    Int    @default(0)

  @@index([order])
}

model FooterContent {
  id               String   @id @default("global-footer-config")
  brandName        String   @default("ANORENT")
  brandTag         String   @default("Anorent Studio")
  tagline          String   @default("Where Cyberpunk Aesthetics Meet High-Performance Web Engineering.")
  copyrightText    String   @default("© 2026 ANORENT STUDIO. All rights reserved.")
  bottomBadgeLeft  String   @default("Anorent Architecture // Modern Portfolio Showcase")
  bottomBadgeRight String   @default("Powered by Anorent Core Engine")
  telemetryTitle   String   @default("System Telemetry & Live Clock")
  updatedAt        DateTime @updatedAt
}

// ----------------------------------------------------
// 2. PAGE CONTENT MODELS
// ----------------------------------------------------

model HeroSectionContent {
  id                 String   @id @default("hero-section-content")
  topBadgeText       String   @default("[ SOLO CREATIVE DEVELOPER & 3D ARTIST ]")
  headlineLine1      String   @default("CYBERNETiC CRAFT")
  headlineLine2      String   @default("DiGiTAL REALMS")
  headlineLine3      String   @default("ENGiNEERED.")
  bioSubtext         String   @db.Text
  highlightWords     String[]
  primaryCtaLabel    String   @default("START A PROJECT ↗")
  primaryCtaRoute    String   @default("contact")
  secondaryCtaLabel  String   @default("BROWSE DEPLOYMENTS")
  secondaryCtaRoute  String   @default("deployments")
  pricingNoticeText  String   @default("Custom builds starting at $1,000 // Fast turnaround")
  particleModes      String[] @default(["quantum", "orbital", "matrix"])
  defaultParticleMode String  @default("quantum")
  baseNodeCount      Int      @default(100)
  targetFps          Int      @default(60)
  updatedAt          DateTime @updatedAt
}

model StoryStageContent {
  id               String             @id @default(cuid())
  stageIndex       Int                @unique // 0 to 3
  stageBadge       String             // "01 // ARCHITECTURAL MASTERY"
  headlineLine1    String
  headlineLine2    String
  description      String             @db.Text
  specTag1Title    String?
  specTag1Sub      String?
  specTag2Title    String?
  specTag2Sub      String?
  specTag3Title    String?
  specTag3Sub      String?
  bulletPoint1     String?
  bulletPoint2     String?
  defaultTension   Int?               @default(300)
  defaultDamping   Int?               @default(24)
  primaryCtaLabel  String?
  primaryCtaRoute  String?
  secondaryCtaLabel String?
  secondaryCtaRoute String?
  architectureNodes ArchitectureNode[]
  escrowPhases     EscrowPhase[]
  updatedAt        DateTime           @updatedAt

  @@index([stageIndex])
}

model ArchitectureNode {
  id          String            @id @default(cuid())
  stageId     String
  stage       StoryStageContent @relation(fields: [stageId], references: [id], onDelete: Cascade)
  key         String            // 'cdn' | 'api' | 'redis' | 'sql' | 'sockets'
  name        String            // "GLOBAL EDGE CLUSTER"
  latency     String            // "4ms"
  summary     String            @db.Text
  order       Int               @default(0)

  @@index([stageId])
}

model EscrowPhase {
  id          String            @id @default(cuid())
  stageId     String
  stage       StoryStageContent @relation(fields: [stageId], references: [id], onDelete: Cascade)
  phaseNumber Int
  title       String            // "Phase 1: Architecture & Wireframes"
  description String            @db.Text
  badgeText   String            // "Protected" | "Staged" | "Audited" | "Ready"

  @@index([stageId])
}

model AboutPageContent {
  id                 String   @id @default("about-page-content")
  profileName        String   @default("Ahsan")
  handle             String   @default("@Ahsanwebdesign")
  title              String   @default("Solo Creative Developer & 3D Artist")
  executiveBio       String   @db.Text
  contactEmail       String   @default("ahsxn3d@gmail.com")
  locationTimezone   String   @default("Remote / Global (UTC+5)")
  availabilityStatus String   @default("Available for Hire")
  techSkills         String[]
  updatedAt          DateTime @updatedAt
}

model FaqSectionContent {
  id                String   @id @default("faq-section-content")
  badgeText         String   @default("DIRECT ARCHITECT DISPATCH // TRANSPARENT PROTOCOL")
  pageTitle         String   @default("KNOWLEDGE VAULT & PROTOCOLS")
  pageSubtitle      String   @db.Text
  searchPlaceholder String   @default("Search knowledge protocols (e.g. pricing, escrow, stack, 100% IP, timeline)...")
  telemetry1Title   String   @default("100% Code Transfer")
  telemetry1Sub     String   @default("IP Ownership")
  telemetry2Title   String   @default("< 1-2h Response")
  telemetry2Sub     String   @default("Average SLA")
  telemetry3Title   String   @default("60 FPS GPU Profiling")
  telemetry3Sub     String   @default("Performance")
  telemetry4Title   String   @default("Fiverr Pro Escrow")
  telemetry4Sub     String   @default("Security")
  categories        String[]
  updatedAt         DateTime @updatedAt
}

model ContactPageContent {
  id                String   @id @default("contact-page-content")
  badgeText         String   @default("ANORENT Studio • Official Contact Portals")
  pageTitle         String   @default("LET'S BUILD TOGETHER.")
  pageSubtitle      String   @db.Text
  directEmail       String   @default("ahsxn3d@gmail.com")
  budgetTierOptions String[]
  updatedAt         DateTime @updatedAt
}

model ContactChannelCard {
  id           String   @id @default(cuid())
  cardNumber   String   // "Card 01", "Card 02"
  title        String   // "Direct Email", "Fiverr", "Dribbble", "Twitter", "WhatsApp"
  handleOrUrl  String
  badgeText    String   // "Escrow", "40+ Shots", "Open DMs", "Instant"
  description  String   @db.Text
  actionLabel  String   // "COPY EMAIL", "FIVERR", "DRIBBBLE", "TWITTER", "WHATSAPP"
  variantColor String   // "primary" | "emerald" | "pink" | "blue"
  order        Int      @default(0)

  @@index([order])
}

// ----------------------------------------------------
// 3. DYNAMIC RELATIONAL COLLECTIONS
// ----------------------------------------------------

model DeploymentProduct {
  id               String   @id @default(cuid())
  slug             String   @unique
  title            String
  category         String
  shortDescription String   @db.Text
  fullDescription  String?  @db.Text
  techStack        String[]
  demoUrl          String
  sourceUrl        String?
  thumbnailUrl     String
  fpsBenchmark     Int      @default(60)
  auditScore       Int      @default(100)
  isFeatured       Boolean  @default(false)
  displayOrder     Int      @default(0)
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  @@index([category])
  @@index([isFeatured])
}

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

  @@index([categoryTag])
}

model ReviewItem {
  id             String   @id @default(cuid())
  name           String
  email          String
  roleCompany    String?
  rating         Int      @default(5)
  comment        String   @db.Text
  dateString     String
  isVerified     Boolean  @default(true)
  isApproved     Boolean  @default(true)
  createdAt      DateTime @default(now())

  @@index([isApproved])
}

enum SubmissionStatus {
  UNREAD
  IN_REVIEW
  CONTACTED
  MILESTONE_ACTIVE
  CLOSED
  ARCHIVED
}

model ContactSubmission {
  id           String           @id @default(cuid())
  clientName   String
  email        String
  budgetTier   String
  projectBrief String           @db.Text
  status       SubmissionStatus @default(UNREAD)
  notes        String?          @db.Text
  createdAt    DateTime         @default(now())
  updatedAt    DateTime         @updatedAt

  @@index([status])
}
```

---
*Authored by Principal Database Architect & Headless CMS Specialist // Anorent Studio Specification 2026*
