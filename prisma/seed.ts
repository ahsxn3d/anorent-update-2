import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 [ANORENT SEED] Starting Neon PostgreSQL database seeding...\n');

  // =========================================================================
  // 1. ADMIN SUPERUSER
  // =========================================================================
  const superuser = await prisma.user.upsert({
    where: { email: 'muhammadahsanjaved09@gmail.com' },
    update: {
      name: 'Ahsan',
      role: 'SUPERADMIN',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    create: {
      email: 'muhammadahsanjaved09@gmail.com',
      name: 'Ahsan',
      role: 'SUPERADMIN',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
  });
  console.log('✅ 1. Admin Superuser seeded:', superuser.email);

  // =========================================================================
  // 2. GLOBAL SITE CONFIG & BRAND TELEMETRY
  // =========================================================================
  await prisma.siteConfig.upsert({
    where: { id: 'singleton' },
    update: {
      brandName: 'Anorix',
      brandLogoText: 'ANORIX',
      brandTagline: 'NEXT-GEN DIGITAL CRAFT & 3D WEB REALMS',
      liveBadgeStatus: '99.98% LIVE',
      pingLatency: '4ms',
      escrowCoverage: '100% ESCROW-PROTECTED',
      contactEmail: 'ahsxn3d@gmail.com',
      telegramHandle: '@anorix',
      discordHandle: 'anorix#0001',
      githubUrl: 'https://github.com',
      twitterUrl: 'https://x.com/ahsanwebdesign',
      metaTitle: 'Anorix — Next-Gen Digital Craft & 3D Web Realms',
      metaDescription:
        'Bespoke Next.js web applications, real-time WebGL shaders, and high-performance frontend engineering.',
      socialChannels: {
        dribbble: 'https://dribbble.com/ahsanwebdesign',
        github: 'https://github.com',
        discord: 'https://discord.gg',
        twitter: 'https://x.com/ahsanwebdesign',
        linkedin: 'https://linkedin.com',
      },
    },
    create: {
      id: 'singleton',
      brandName: 'Anorix',
      brandLogoText: 'ANORIX',
      brandTagline: 'NEXT-GEN DIGITAL CRAFT & 3D WEB REALMS',
      liveBadgeStatus: '99.98% LIVE',
      pingLatency: '4ms',
      escrowCoverage: '100% ESCROW-PROTECTED',
      contactEmail: 'ahsxn3d@gmail.com',
      telegramHandle: '@anorix',
      discordHandle: 'anorix#0001',
      githubUrl: 'https://github.com',
      twitterUrl: 'https://x.com/ahsanwebdesign',
      metaTitle: 'Anorix — Next-Gen Digital Craft & 3D Web Realms',
      metaDescription:
        'Bespoke Next.js web applications, real-time WebGL shaders, and high-performance frontend engineering.',
      socialChannels: {
        dribbble: 'https://dribbble.com/ahsanwebdesign',
        github: 'https://github.com',
        discord: 'https://discord.gg',
        twitter: 'https://x.com/ahsanwebdesign',
        linkedin: 'https://linkedin.com',
      },
    },
  });
  console.log('✅ 2. SiteConfig seeded (id: singleton)');

  // =========================================================================
  // 3. HERO HOLOGRAM CONTENT
  // =========================================================================
  await prisma.heroContent.upsert({
    where: { id: 'hero-content' },
    update: {
      badgeText: '[ SOLO CREATIVE DEVELOPER & 3D ARTIST ]',
      superTitle: '[ SOLO CREATIVE DEVELOPER & 3D ARTIST ]',
      headlineLine1: 'CYBERNETiC CRAFT',
      headlineLine2: 'DiGiTAL REALMS',
      headlineLine3: 'ENGiNEERED.',
      mainHeading: 'CYBERNETiC CRAFT',
      mainTitle: 'CYBERNETiC CRAFT',
      highlightedWord: 'CRAFT',
      bioSubtext:
        'I design and build high-performance 3D websites, WebGL shaders, and bespoke Next.js interfaces for founders who want to stand out.',
      subheading:
        'I design and build high-performance 3D websites, WebGL shaders, and bespoke Next.js interfaces for founders who want to stand out.',
      subtitle:
        'I design and build high-performance 3D websites, WebGL shaders, and bespoke Next.js interfaces for founders who want to stand out.',
      highlightWords: [
        'high-performance',
        '3D websites',
        'WebGL shaders',
        'bespoke Next.js interfaces',
        'founders',
        'stand out',
      ],
      primaryCtaLabel: 'START A PROJECT ↗',
      primaryCtaText: 'START A PROJECT ↗',
      primaryCtaRoute: 'contact',
      primaryCtaUrl: 'contact',
      secondaryCtaLabel: 'BROWSE DEPLOYMENTS',
      secondaryCtaText: 'BROWSE DEPLOYMENTS',
      secondaryCtaRoute: 'deployments',
      secondaryCtaUrl: 'deployments',
      pricingNoticeText: 'Custom builds starting at $500 - $1,000 // Fast turnaround',
      telemetryStatus: 'ONLINE',
      telemetryLatency: '4ms',
      telemetryUptime: '99.98%',
      particleModes: ['quantum', 'orbital', 'matrix'],
      defaultParticleMode: 'quantum',
      baseNodeCount: 100,
      targetFps: 60,
    },
    create: {
      id: 'hero-content',
      badgeText: '[ SOLO CREATIVE DEVELOPER & 3D ARTIST ]',
      superTitle: '[ SOLO CREATIVE DEVELOPER & 3D ARTIST ]',
      headlineLine1: 'CYBERNETiC CRAFT',
      headlineLine2: 'DiGiTAL REALMS',
      headlineLine3: 'ENGiNEERED.',
      mainHeading: 'CYBERNETiC CRAFT',
      mainTitle: 'CYBERNETiC CRAFT',
      highlightedWord: 'CRAFT',
      bioSubtext:
        'I design and build high-performance 3D websites, WebGL shaders, and bespoke Next.js interfaces for founders who want to stand out.',
      subheading:
        'I design and build high-performance 3D websites, WebGL shaders, and bespoke Next.js interfaces for founders who want to stand out.',
      subtitle:
        'I design and build high-performance 3D websites, WebGL shaders, and bespoke Next.js interfaces for founders who want to stand out.',
      highlightWords: [
        'high-performance',
        '3D websites',
        'WebGL shaders',
        'bespoke Next.js interfaces',
        'founders',
        'stand out',
      ],
      primaryCtaLabel: 'START A PROJECT ↗',
      primaryCtaText: 'START A PROJECT ↗',
      primaryCtaRoute: 'contact',
      primaryCtaUrl: 'contact',
      secondaryCtaLabel: 'BROWSE DEPLOYMENTS',
      secondaryCtaText: 'BROWSE DEPLOYMENTS',
      secondaryCtaRoute: 'deployments',
      secondaryCtaUrl: 'deployments',
      pricingNoticeText: 'Custom builds starting at $500 - $1,000 // Fast turnaround',
      telemetryStatus: 'ONLINE',
      telemetryLatency: '4ms',
      telemetryUptime: '99.98%',
      particleModes: ['quantum', 'orbital', 'matrix'],
      defaultParticleMode: 'quantum',
      baseNodeCount: 100,
      targetFps: 60,
    },
  });

  // Clean up any legacy hero-singleton record so only hero-content is active
  await prisma.heroContent.deleteMany({
    where: { id: { not: 'hero-content' } },
  });
  console.log('✅ 3. HeroContent seeded (id: hero-content)');

  // =========================================================================
  // 4. ABOUT PROFILE & PROOF TELEMETRY
  // =========================================================================
  await prisma.aboutContent.upsert({
    where: { id: 'about-content' },
    update: {
      name: 'Ahsan',
      artistName: 'Ahsan',
      role: 'Creative Technologist & Full-Stack Architect',
      tagline: 'Bridging high-end 3D WebGL visuals with zero-latency full-stack architecture.',
      handle: 'ahsxn.3d',
      executiveBio:
        'I design and engineer bespoke web experiences, interactive 3D WebGL environments, and production-ready Next.js interfaces directly for founders and modern brands who refuse to look generic. From custom GLSL shaders to full-stack database architectures, every deployment is engineered for 60 FPS performance and high conversion.',
      bio: 'I design and engineer bespoke web experiences, interactive 3D WebGL environments, and production-ready Next.js interfaces directly for founders and modern brands who refuse to look generic.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      location: 'Lahore, PK (UTC+5)',
      locationTimezone: 'UTC+5 Active',
      availabilityStatus: 'AVAILABLE FOR Q3/Q4 COMMISSIONS',
      yearsActive: '3+ Years',
      deploymentsDelivered: '12',
      clientSatisfaction: '100%',
      techSkills: [
        'Next.js 15',
        'React',
        'TypeScript',
        'Three.js / WebGL',
        'GLSL Shaders',
        'GSAP & Lenis',
        'Tailwind CSS',
        'Prisma & PostgreSQL',
        'Blender 3D Modeling',
        'UI/UX Design Systems',
      ],
      contactEmail: 'ahsxn3d@gmail.com',
    },
    create: {
      id: 'about-content',
      name: 'Ahsan',
      artistName: 'Ahsan',
      role: 'Creative Technologist & Full-Stack Architect',
      tagline: 'Bridging high-end 3D WebGL visuals with zero-latency full-stack architecture.',
      handle: 'ahsxn.3d',
      executiveBio:
        'I design and engineer bespoke web experiences, interactive 3D WebGL environments, and production-ready Next.js interfaces directly for founders and modern brands who refuse to look generic. From custom GLSL shaders to full-stack database architectures, every deployment is engineered for 60 FPS performance and high conversion.',
      bio: 'I design and engineer bespoke web experiences, interactive 3D WebGL environments, and production-ready Next.js interfaces directly for founders and modern brands who refuse to look generic.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      location: 'Lahore, PK (UTC+5)',
      locationTimezone: 'UTC+5 Active',
      availabilityStatus: 'AVAILABLE FOR Q3/Q4 COMMISSIONS',
      yearsActive: '3+ Years',
      deploymentsDelivered: '12',
      clientSatisfaction: '100%',
      techSkills: [
        'Next.js 15',
        'React',
        'TypeScript',
        'Three.js / WebGL',
        'GLSL Shaders',
        'GSAP & Lenis',
        'Tailwind CSS',
        'Prisma & PostgreSQL',
        'Blender 3D Modeling',
        'UI/UX Design Systems',
      ],
      contactEmail: 'ahsxn3d@gmail.com',
    },
  });
  console.log('✅ 4a. AboutContent seeded (id: about-content)');

  // Proof Metric Cards
  const proofCards = [
    {
      cardKey: 'deployments',
      id: 'proof-deployments',
      title: 'Production Deployments',
      value: '12+',
      subtext: 'Bespoke full-stack architectures & 3D WebGL platforms shipped worldwide.',
      percentage: 100,
      displayOrder: 1,
      slaTarget: null,
      metricsJson: {
        numericValue: 12,
        unit: '+',
        category: 'Core Metrics',
        categoryBreakdown: [
          { name: 'UI Templates', count: 3, pct: 25, color: '#8B00EE' },
          { name: 'Full-Stack Apps', count: 3, pct: 25, color: '#06B6D4' },
          { name: 'Animated Sites', count: 3, pct: 25, color: '#EC4899' },
          { name: 'SaaS Dashboards', count: 3, pct: 25, color: '#10B981' },
        ],
      },
    },
    {
      cardKey: 'framerate',
      id: 'proof-framerate',
      title: 'Render Performance',
      value: '60 FPS',
      subtext: 'Optimized WebGL draw calls and GPU GLSL fragment shader execution.',
      percentage: 100,
      displayOrder: 2,
      slaTarget: 'Locked 60 FPS',
      metricsJson: {
        numericValue: 60,
        unit: 'FPS',
        category: 'Engineering',
        progressMetrics: [
          { label: 'Shader Render Time', score: '0.18ms', unit: 'ms' },
          { label: 'Frame Rate Consistency', score: 100, unit: '%' },
          { label: 'Draw Call Optimization', score: 98, unit: '%' },
        ],
      },
    },
    {
      cardKey: 'satisfaction',
      id: 'proof-satisfaction',
      title: 'Milestone Execution',
      value: '100%',
      subtext: 'Zero-middleman execution backed by transparent milestone escrow parameters.',
      percentage: 100,
      displayOrder: 3,
      slaTarget: '100% Escrow Guarantee',
      metricsJson: {
        numericValue: 100,
        unit: '%',
        category: 'Reliability',
        progressMetrics: [
          { label: 'Code Quality Score', score: 100, unit: '%' },
          { label: 'On-Time Milestone Delivery', score: 100, unit: '%' },
          { label: 'Client Retention / Rehires', score: 94, unit: '%' },
        ],
      },
    },
    {
      cardKey: 'velocity',
      id: 'proof-velocity',
      title: 'Average Sprint Cycle',
      value: '< 2-4 Wks',
      subtext: 'Rapid architectural delivery from concept 3D staging to live deployment.',
      percentage: 95,
      displayOrder: 4,
      slaTarget: '< 2 Hours Async SLA',
      metricsJson: {
        numericValue: 3,
        unit: 'Wks',
        category: 'Delivery',
        progressMetrics: [
          { label: 'Concept to 3D Staging', score: '3-5 Days' },
          { label: 'Interactive Frontend', score: '7-10 Days' },
          { label: 'Full Production Polish', score: '3-5 Days' },
        ],
      },
    },
  ];

  for (const card of proofCards) {
    await prisma.proofMetricCard.upsert({
      where: { cardKey: card.cardKey },
      update: {
        title: card.title,
        value: card.value,
        subtext: card.subtext,
        percentage: card.percentage,
        displayOrder: card.displayOrder,
        slaTarget: card.slaTarget,
        metricsJson: card.metricsJson,
      },
      create: {
        id: card.id,
        cardKey: card.cardKey,
        title: card.title,
        value: card.value,
        subtext: card.subtext,
        percentage: card.percentage,
        displayOrder: card.displayOrder,
        slaTarget: card.slaTarget,
        metricsJson: card.metricsJson,
      },
    });
  }
  console.log('✅ 4b. ProofMetricCards seeded (4 cards)');

  // =========================================================================
  // 5. FAQ HEADER CONFIG & REAL FAQ ITEMS
  // =========================================================================
  await prisma.faqHeaderConfig.upsert({
    where: { id: 'faq-header-config' },
    update: {
      badgeText: '[ CLEAR ANSWERS // ZERO AMBIGUITY ]',
      pageTitle: 'Frequently Asked Questions',
      pageSubtitle:
        'Everything you need to know about custom WebGL builds, Next.js architecture, milestone escrow, and delivery pipelines.',
      searchPlaceholder: 'Search escrow, stack, timelines, pricing...',
      supportEmail: 'ahsxn3d@gmail.com',
      telemetry1Title: 'ESCROW PROTECTED',
      telemetry1Sub: '100% Milestone-gated',
      telemetry2Title: 'PERFORMANCE SLA',
      telemetry2Sub: '60 FPS WebGL Target',
      telemetry3Title: 'IP TRANSFERRED',
      telemetry3Sub: 'Full Commercial License',
      telemetry4Title: 'RESPONSE TIME',
      telemetry4Sub: '< 4h Direct Comm',
      categories: ['General', 'Architecture', 'Pricing & Escrow', 'Support'],
    },
    create: {
      id: 'faq-header-config',
      badgeText: '[ CLEAR ANSWERS // ZERO AMBIGUITY ]',
      pageTitle: 'Frequently Asked Questions',
      pageSubtitle:
        'Everything you need to know about custom WebGL builds, Next.js architecture, milestone escrow, and delivery pipelines.',
      searchPlaceholder: 'Search escrow, stack, timelines, pricing...',
      supportEmail: 'ahsxn3d@gmail.com',
      telemetry1Title: 'ESCROW PROTECTED',
      telemetry1Sub: '100% Milestone-gated',
      telemetry2Title: 'PERFORMANCE SLA',
      telemetry2Sub: '60 FPS WebGL Target',
      telemetry3Title: 'IP TRANSFERRED',
      telemetry3Sub: 'Full Commercial License',
      telemetry4Title: 'RESPONSE TIME',
      telemetry4Sub: '< 4h Direct Comm',
      categories: ['General', 'Architecture', 'Pricing & Escrow', 'Support'],
    },
  });

  const faqs = [
    {
      id: 'faq-001',
      category: 'General',
      question: 'What is your typical turnaround time for a custom 3D web experience?',
      answer:
        'Most custom builds are completed within 2 to 4 weeks depending on the 3D scene complexity, custom GLSL shader requirements, and backend database integrations.',
      helpfulCount: 84,
      displayOrder: 1,
    },
    {
      id: 'faq-002',
      category: 'General',
      question: 'Do I need to supply 3D models, or do you create them in-house?',
      answer:
        'I handle the full 3D pipeline in-house using Blender and WebGL optimization workflows, from 3D modeling and lighting to GLSL shader programming and Next.js integration. If you already have existing assets, I can optimize and integrate them directly.',
      helpfulCount: 62,
      displayOrder: 2,
    },
    {
      id: 'faq-003',
      category: 'Architecture',
      question: 'Will 3D WebGL elements slow down my website or affect mobile performance?',
      answer:
        'No. All WebGL canvases run asynchronously on dedicated GPU threads with progressive loading, mobile LOD downscaling, and zero render-blocking on the main Next.js thread. Lighthouse scores remain locked at 90+.',
      helpfulCount: 95,
      displayOrder: 3,
    },
    {
      id: 'faq-004',
      category: 'Architecture',
      question: 'What tech stack powers your custom deployments?',
      answer:
        'Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, Three.js/WebGL2 with custom GLSL shaders, Prisma ORM, and PostgreSQL for dynamic data management.',
      helpfulCount: 51,
      displayOrder: 4,
    },
    {
      id: 'faq-005',
      category: 'Pricing & Escrow',
      question: 'How does the milestone escrow payment structure work?',
      answer:
        'Projects follow a 4-stage milestone structure (25% per phase: Discovery & 3D Staging, Interactive Frontend, Full-Stack Database Wiring, and Final Production Launch). Funds are locked into escrow and released only upon your direct approval at each stage.',
      helpfulCount: 110,
      displayOrder: 5,
    },
    {
      id: 'faq-006',
      category: 'Pricing & Escrow',
      question: 'What are your standard project engagement rates?',
      answer:
        'Dedicated single-page 3D experiences start in the $1,000 to $1,500 range, while full-scale custom SaaS architectures and multi-page platforms are scoped based on custom shader, database, and CRM requirements.',
      helpfulCount: 78,
      displayOrder: 6,
    },
    {
      id: 'faq-007',
      category: 'Support',
      question: 'What post-launch support and warranty do you provide?',
      answer:
        'Every deployment includes 30 days of complimentary post-launch engineering support covering bug fixes, performance audits, and production monitoring on Vercel.',
      helpfulCount: 45,
      displayOrder: 7,
    },
  ];

  for (const faq of faqs) {
    await prisma.fAQItem.upsert({
      where: { id: faq.id },
      update: {
        category: faq.category,
        question: faq.question,
        answer: faq.answer,
        helpfulCount: faq.helpfulCount,
        displayOrder: faq.displayOrder,
        isPublished: true,
      },
      create: {
        id: faq.id,
        category: faq.category,
        question: faq.question,
        answer: faq.answer,
        helpfulCount: faq.helpfulCount,
        displayOrder: faq.displayOrder,
        isPublished: true,
      },
    });
  }
  console.log('✅ 5. FaqHeaderConfig & 7 FAQItems seeded');

  // =========================================================================
  // 6. 4-STAGE AUTONOMOUS STORY PIPELINE
  // =========================================================================
  const stages = [
    {
      id: 'stage-01',
      stageIndex: 1,
      phase: 'PHASE 01',
      year: '2026',
      title: 'Discovery & 3D Scene Architecture',
      subtitle: 'Concept Staging',
      description:
        'Translating client vision into interactive 3D concepts, spatial wireframes, and GLSL shader prototypes.',
      highlightTag: 'PROTOTYPING',
      stageBadge: '01 // DISCOVERY & 3D ARCHITECTURE',
      headlineLine1: 'DISCOVERY &',
      headlineLine2: '3D ARCHITECTURE.',
      specTag1Title: 'Blender 3D',
      specTag1Sub: 'Spatial Modeling',
      specTag2Title: 'DRACO',
      specTag2Sub: 'GLTF Compression',
      specTag3Title: 'GLSL',
      specTag3Sub: 'Custom Shaders',
      bulletPoint1: 'Microsecond Spatial Geometry Setup',
      bulletPoint2: 'Hardware-Accelerated WebGL Canvases',
    },
    {
      id: 'stage-02',
      stageIndex: 2,
      phase: 'PHASE 02',
      year: '2026',
      title: 'Kinetic UI & Frontend Engineering',
      subtitle: '60 FPS Interactions',
      description:
        'Coding the interactive Next.js 15 frontend with GSAP scroll triggers, Lenis smooth scrolling, and reactive UI controls.',
      highlightTag: 'FRONTEND',
      stageBadge: '02 // KINETIC UI & FRONTEND',
      headlineLine1: 'KINETIC UI &',
      headlineLine2: 'FRONTEND ENGINEERING.',
      specTag1Title: '60 FPS',
      specTag1Sub: 'Locked Framerate',
      specTag2Title: 'Next.js 15',
      specTag2Sub: 'App Router',
      specTag3Title: 'Lenis',
      specTag3Sub: 'Smooth Physics',
      bulletPoint1: 'Mathematical Spring Physics Presets',
      bulletPoint2: 'GLSL Post-Processing Pipeline',
    },
    {
      id: 'stage-03',
      stageIndex: 3,
      phase: 'PHASE 03',
      year: '2026',
      title: 'Full-Stack Neon & Prisma Wiring',
      subtitle: 'Zero-Latency Telemetry',
      description:
        'Connecting PostgreSQL with Prisma ORM, implementing server actions with optimistic updates, and testing API throughput.',
      highlightTag: 'BACKEND',
      stageBadge: '03 // DATABASE & SERVER ACTIONS',
      headlineLine1: 'NEON POSTGRES &',
      headlineLine2: 'PRISMA ORM CORE.',
      specTag1Title: 'PostgreSQL',
      specTag1Sub: 'Neon Serverless',
      specTag2Title: 'Prisma ORM',
      specTag2Sub: 'Type-Safe Queries',
      specTag3Title: '< 4ms',
      specTag3Sub: 'Query Response',
      bulletPoint1: 'Protected Milestone Escrow Workflow',
      bulletPoint2: 'Direct GitHub Repository Transfer',
    },
    {
      id: 'stage-04',
      stageIndex: 4,
      phase: 'PHASE 04',
      year: '2026',
      title: 'Production Launch & Escrow Settlement',
      subtitle: '100% IP Transfer',
      description:
        'Final Lighthouse audit score 95+, domain SSL verification, GitHub repository transfer, and warranty period kickoff.',
      highlightTag: 'DEPLOYMENT',
      stageBadge: '04 // PRODUCTION & IP HANDOVER',
      headlineLine1: 'PRODUCTION LAUNCH &',
      headlineLine2: '100% IP TRANSFER.',
      specTag1Title: '100% IP',
      specTag1Sub: 'Complete Ownership',
      specTag2Title: '30-Day',
      specTag2Sub: 'Warranty Support',
      specTag3Title: '98/100',
      specTag3Sub: 'Lighthouse Score',
      bulletPoint1: 'Direct Daily Async Communication',
      bulletPoint2: 'Custom Next.js & 3D Builds from $1,000',
    },
  ];

  for (const s of stages) {
    await prisma.storyStage.upsert({
      where: { stageIndex: s.stageIndex },
      update: s,
      create: s,
    });
  }

  // Architecture Nodes
  const nodes = [
    {
      id: 'node-stage-01',
      stageId: 'stage-01',
      key: '3d-viewport',
      name: 'Blender to WebGL Pipeline',
      latency: '< 1.2MB payload',
      summary: 'GLTF/GLB asset optimization with DRACO compression for sub-second network loads.',
      order: 1,
    },
    {
      id: 'node-stage-02',
      stageId: 'stage-02',
      key: 'render-engine',
      name: 'Kinetic Canvas HUD',
      latency: '16.6ms / frame',
      summary: 'GPU-accelerated fragment shaders running at a locked 60 FPS across all viewports.',
      order: 2,
    },
    {
      id: 'node-stage-03',
      stageId: 'stage-03',
      key: 'database-engine',
      name: 'Neon PostgreSQL Pool',
      latency: '4ms query time',
      summary: 'Connection-pooled serverless PostgreSQL with instant cold starts and Prisma caching.',
      order: 3,
    },
    {
      id: 'node-stage-04',
      stageId: 'stage-04',
      key: 'edge-distribution',
      name: 'Vercel Global Edge',
      latency: '8ms global TTFB',
      summary: 'Edge-distributed static assets and Server Components deployed with zero cold latency.',
      order: 4,
    },
  ];

  for (const n of nodes) {
    await prisma.architectureNode.upsert({
      where: { id: n.id },
      update: n,
      create: n,
    });
  }

  // Escrow Phases
  const phases = [
    {
      id: 'escrow-stage-01',
      stageId: 'stage-01',
      phaseNumber: 1,
      title: 'Phase 01 Lock & Milestone Deposit',
      description: 'Client deposits 25% milestone deposit into escrow; 3D staging commences immediately.',
      verificationCriteria: 'Figma mockup + interactive 3D prototype sign-off.',
      status: 'ACTIVE',
      allocationPercentage: 25,
      badgeText: 'Phase 01 Active',
    },
    {
      id: 'escrow-stage-02',
      stageId: 'stage-02',
      phaseNumber: 2,
      title: 'Phase 02 Frontend Delivery',
      description: 'Interactive frontend staging deployed to preview URL for client review.',
      verificationCriteria: '60 FPS interaction audit + responsive mobile verification.',
      status: 'PENDING',
      allocationPercentage: 25,
      badgeText: 'Phase 02 Staged',
    },
    {
      id: 'escrow-stage-03',
      stageId: 'stage-03',
      phaseNumber: 3,
      title: 'Phase 03 Full-Stack Integration',
      description: 'Prisma database wiring, Server Actions verification, and security testing.',
      verificationCriteria: 'All CRUD operations passing on staging database.',
      status: 'PENDING',
      allocationPercentage: 25,
      badgeText: 'Phase 03 Verified',
    },
    {
      id: 'escrow-stage-04',
      stageId: 'stage-04',
      phaseNumber: 4,
      title: 'Phase 04 Production Handover & IP Release',
      description: 'Full GitHub repository ownership transfer and final milestone release.',
      verificationCriteria: 'Production domain live + repository access transferred.',
      status: 'PENDING',
      allocationPercentage: 25,
      badgeText: 'Phase 04 Handover',
    },
  ];

  for (const p of phases) {
    await prisma.escrowPhase.upsert({
      where: { id: p.id },
      update: p,
      create: p,
    });
  }
  console.log('✅ 6. 4-Stage Autonomous Story Pipeline & Nodes seeded');

  // =========================================================================
  // 7. SHOWCASE DEPLOYMENTS (ZERO DUMMY PROJECTS)
  // =========================================================================
  await prisma.deploymentProduct.deleteMany({});
  console.log('✅ 7. Purged all placeholder deployments (0 dummy projects in database)');

  // =========================================================================
  // 8. CLIENT REVIEWS & TESTIMONIALS
  // =========================================================================
  const reviews = [
    {
      id: 'rev-001',
      name: 'Elena Rostova',
      role: 'Product Lead',
      company: 'Hyperion AI',
      rating: 5,
      comment:
        'Ahsan transformed our SaaS interface into a high-performance 3D visual experience. Working directly with an engineer of this caliber was lightning fast.',
      dateString: 'Aug 02, 2026',
    },
    {
      id: 'rev-002',
      name: 'Darius Vance',
      role: 'CTO',
      company: 'Chrono Labs',
      rating: 5,
      comment:
        'Fast turnaround, pristine TypeScript, and unmatched shader animations. Escrow milestone delivery gave our team complete confidence.',
      dateString: 'Jul 28, 2026',
    },
    {
      id: 'rev-003',
      name: 'Sophia Sterling',
      role: 'Head of Brand',
      company: 'Nexus Web3',
      rating: 5,
      comment:
        'The WebGL shaders and 3D assets run at a locked 60 FPS. Seamless integration with our Next.js codebase and zero template bloat.',
      dateString: 'Jul 19, 2026',
    },
    {
      id: 'rev-004',
      name: 'Marcus Thorne',
      role: 'Founder',
      company: 'Synthwave AI',
      rating: 5,
      comment:
        'Exceptional attention to micro-interactions and GPU shader optimization. Delivered ahead of deadline with direct, transparent communication.',
      dateString: 'Jul 11, 2026',
    },
  ];

  for (const r of reviews) {
    await prisma.reviewItem.upsert({
      where: { id: r.id },
      update: {
        ...r,
        isVerified: true,
        isApproved: true,
        isFeatured: true,
      },
      create: {
        ...r,
        isVerified: true,
        isApproved: true,
        isFeatured: true,
      },
    });
  }
  console.log('✅ 8. Client Reviews seeded (4 reviews)');

  console.log('\n🎉 [ANORENT SEED] Database seeding completed successfully!\n');
}

main()
  .catch((e: Error) => {
    console.error('❌ [ANORENT SEED ERROR]:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


