# MASTER CORE DNA // Anorent Studio & Creative Engineering Platform
**Document Identifier:** `SPEC-CORE-DNA-2026.08`  
**Classification:** Single Source of Truth (SSOT) Architecture Blueprint  
**System Target:** Next.js 15 App Router (Turbopack / React 19), PostgreSQL 16, Prisma ORM 6.x, Three.js / WebGL, GSAP 3 + ScrollTrigger, Tailwind CSS v4  

---

## 1. VISUAL DNA & DESIGN TOKENS (EXACT VALUES ONLY)

### 1.1 Canvas, Surface & Overlay Tokens

```
+-----------------------------------------------------------------------------------------+
| OBSIDIAN CANVAS BASE     MIDNIGHT VIOLET SURFACE     PAGE AMBIENT        CARD GLASS BASE |
| #050508                  #080514                     #0A0B14             rgba(20,21,38,0.75) |
+-----------------------------------------------------------------------------------------+
```

| Token Name | Exact Hex / RGBA Value | Tailwind / CSS Rule | Semantic Purpose |
| :--- | :--- | :--- | :--- |
| **Obsidian Canvas Base** | `#050508` | `bg-[#050508]` | Primary root canvas, global viewport background |
| **Midnight Violet Deep** | `#080514` | `bg-[#080514]` | Secondary container fill, horizontal stage base |
| **Page Ambient Background** | `#0A0B14` | `bg-[#0A0B14]` | Body background color and default frame base |
| **Dark Violet Surface** | `#0D0E1A` | `bg-[#0D0E1A]/85` | Telemetry bar backgrounds, console shells |
| **Card Glass Surface** | `rgba(20, 21, 38, 0.75)` | `bg-[#141526]/75` | Default glassmorphic content cards |
| **Elevated Card Base** | `#130722` | `bg-[#130722]` | 3D HoloCard core background fill |
| **Interactive Stage Panel** | `rgba(8, 5, 20, 0.90)` | `bg-[#080514]/90` | Pinned GSAP narrative stages 1–4 |
| **Modal Backplate Surface** | `#130722` (95% Opacity) | `bg-[#130722]/95` | `DeploymentModal` inspect container |
| **Modal Backdrop Dimmer** | `rgba(6, 3, 12, 0.85)` | `bg-[#06030c]/85 backdrop-blur-2xl` | Fullscreen modal overlay shield |
| **Navbar Floating Glass** | `rgba(18, 19, 34, 0.80)` | `bg-[#121322]/80 backdrop-blur-xl` | Sticky top global navigation bar |
| **Footer Console Plate** | `#0a0614` (90% Opacity) | `bg-[#0a0614]/90` | Global bottom telemetry plate |

---

### 1.2 Neon Spectrum & Accent Color Matrix

```
   CYBER PURPLE         ELECTRIC CYAN        EMERALD TECH           NEON PINK          AMBER FLARE
     #A855F7               #06B6D4              #10B981              #EC4899             #F59E0B
 (Core Brand Lead)    (Interactive Glow)   (System Telemetry)   (Critical / Highlight) (5-Star Ratings)
```

| Token / Color Role | Exact Hex | Highlight Stop | Tailwind Color Classes | Box-Shadow / Radial Glow Signature |
| :--- | :--- | :--- | :--- | :--- |
| **Cyber Purple (Brand)** | `#A855F7` (`#8B00EE`) | `#C084FC` | `text-purple-400`, `bg-purple-500` | `0 0 25px rgba(139,0,238,0.50)` |
| **Electric Cyan (Action)** | `#06B6D4` (`#00F0FF`) | `#38BDF8` | `text-cyan-400`, `bg-cyan-500` | `0 0 25px rgba(6,182,212,0.50)` |
| **Emerald Tech (Status)** | `#10B981` (`#00FF9D`) | `#34D399` | `text-emerald-400`, `bg-emerald-500` | `0 0 20px rgba(16,185,129,0.45)` |
| **Neon Pink (Hot / Alert)** | `#EC4899` (`#FF0055`) | `#F472B6` | `text-pink-400`, `bg-pink-500` | `0 0 22px rgba(236,72,153,0.45)` |
| **Amber Flare (Review Stars)**| `#F59E0B` (`#FBBF24`) | `#FDE68A` | `text-amber-400`, `fill-amber-400` | `0 0 15px rgba(245,158,11,0.40)` |

---

### 1.3 Glassmorphism, Border Opacities & Shadow Hierarchy

| Element Type | Border Token | Backdrop Diffusion | Box-Shadow & Glow Spec |
| :--- | :--- | :--- | :--- |
| **Standard Card Glass** | `border-white/10` | `backdrop-blur-xl` (16px) | `shadow-[0_8px_25px_rgba(0,0,0,0.55)]` |
| **3D HoloCard Resting** | `border-purple-500/30` | `backdrop-blur-xl` (16px) | `shadow-[0_8px_25px_rgba(0,0,0,0.55)]` |
| **3D HoloCard Active Hover** | `border-purple-400/90 ring-1 ring-purple-400/50` | `backdrop-blur-xl` (16px) | `shadow-[0_25px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(139,0,238,0.5)]` |
| **Floating Modal Inspector** | `border-purple-500/40` | `backdrop-blur-2xl` (24px) | `shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(139,0,238,0.4)]` |
| **Horizontal Stage Panel** | `border-purple-500/25` | `backdrop-blur-2xl` (24px) | `shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(139,0,238,0.2)]` |
| **Top Specular Rims** | `h-[1.5px] bg-gradient-to-r from-transparent via-purple-300 to-transparent` | `none` | Top perimeter specular rim reflection |
| **Interactive Specular Glare**| `radial-gradient(circle at X% Y%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 45%, transparent 70%)` | `mix-blend-overlay` | Dynamic cursor-following highlight sheet |

---

### 1.4 Typography Tokens & Subpixel Anti-Aliasing Rules

```css
/* Core Typographic Font Stack */
--font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-display: 'Archivo Black', 'Plus Jakarta Sans', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, monospace;
```

#### Mandatory Anti-Aliasing & 3D Layer Composition CSS
```css
/* Base Canvas Smoothing */
html, body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* 3D Transform Elevation & Subpixel Clarity */
.holo-depth-typography,
.stage-card-title,
.interactive-stage-card h3 {
  transform: translateZ(46px);
  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: auto;
  text-rendering: optimizeLegibility;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  contain: layout paint;
}

/* Monospace Telemetry Numbers */
.telemetry-digits {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'zero' 1, 'tnum' 1;
}
```

---

## 2. COMPONENT DNA & PROP INTERFACES

### 2.1 `CyberButton` & `ButterButton`

```typescript
export interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'purple' | 'cyan' | 'emerald' | 'green' | 'pink' | 'ghost' | 'glass' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  showArrow?: boolean;
  butterColor?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
```

* **Internal State:** `isHovered: boolean`, `pointerPos: { x: number; y: number }`, `hasPointer: boolean`
* **Interaction Formula:**
  - Cursor Tracking: `x = e.clientX - rect.left`, `y = e.clientY - rect.top`
  - Radial Wipe Clip-Path: `clipPath: 'circle(170% at ' + x + 'px ' + y + 'px)'`
  - Touch Fallback: `@media (hover: none)` locks clip-path to `circle(170% at 50% 50%)`
  - Audio Feedback: `sound.playHover()` on enter, `sound.playClick()` on trigger.

---

### 2.2 `ShowcaseConsole`

```typescript
export interface ShowcaseProject {
  id: string;
  title: string;
  category: string;
  rating: number;
  image: string;
  desc: string;
  tech: string[];
  fps: number;
  score: number;
  liveUrl?: string;
}

export interface ShowcaseConsoleProps {
  projects: ShowcaseProject[];
  onInspect?: (project: ShowcaseProject) => void;
  onLaunch?: (project: ShowcaseProject) => void;
}
```

* **Internal State:** `activeIndex: number (0..N-1)`, `isPaused: boolean`, `direction: 'left' | 'right'`
* **Interaction Mechanics:**
  - Autonomous 3800ms gliding timer with auto-pause on cursor enter (`onMouseEnter={() => setIsPaused(true)}`).
  - 3D Offset Projection: Active slide = `scale(1.0)`, Left neighbor = `scale(0.85) translate(-110%) rotateY(15deg)`, Right neighbor = `scale(0.85) translate(110%) rotateY(-15deg)`.

---

### 2.3 `HoloCard`

```typescript
export interface HoloCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  enableGlow?: boolean;
  onClick?: () => void;
}
```

* **Internal State:** `isHovered: boolean`, `glarePos: { x: number; y: number }`, `hasPointer: boolean`
* **Physics Motion Values:** `mouseX: MotionValue<number>`, `mouseY: MotionValue<number>`, `rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 220, damping: 20 })`, `rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 220, damping: 20 })`.
* **Layer Hierarchy:** Outer Spring Elevation Container $\to$ Inner 3D Rotation Card $\to$ Glare Sheet (`mix-blend-overlay`) $\to$ Ambient Glow Sheet $\to$ Elevated Content `translateZ(20px)` $\to$ Headings `translateZ(46px)`.

---

### 2.4 `DeploymentCard` & `DeploymentModal`

```typescript
export interface DeploymentCardProps {
  product: DeploymentProduct;
  onInspect: (product: DeploymentProduct) => void;
  onLaunch: (product: DeploymentProduct) => void;
}

export interface DeploymentModalProps {
  product: DeploymentProduct | null;
  onClose: () => void;
}
```

* **Modal Internal State:** `deviceView: 'desktop' | 'tablet' | 'mobile'`, `activeTab: 'preview' | 'specs' | 'telemetry'`, `copiedCode: boolean`.
* **Keyboard Listener:** `Escape` key trigger with `sound.playClick()`, body scroll-lock (`document.body.style.overflow = 'hidden'`).

---

### 2.5 `ReviewsDisplay` (Marquee Rows & Modal Form)

```typescript
export interface ReviewsDisplayProps {
  reviews: ReviewItem[];
}
```

* **Internal State:** `isFormOpen: boolean`, `formData: { name: string; email: string; role: string; rating: number; comment: string }`, `isSubmitted: boolean`.
* **Marquee Physics:** 3 staggered infinite linear marquee rows running at 45s, 55s, and 50s cycle speeds with hover-pause.

---

### 2.6 `HorizontalStory` (4-Stage Kinetic Pinned Experience)

* **Internal State:** `activeStage: number (0..3)`, `springConfig: { tension: number; damping: number }`, `activeTab: string`, `selectedNode: string`, `scrambleIndex: number`.
* **Interactive Sandbox:**
  - Stage 1: Live GPU controller benchmark simulator with particle/GLSL mode switching.
  - Stage 2: 120Hz damped harmonic spring ball playground with interactive draggable target.
  - Stage 3: Interactive 5-node distributed serverless network simulator with live packet dispatch.
  - Stage 4: Milestone escrow contract lifecycle progression explorer with interactive audit check.

---

## 3. MOTION & ANIMATION SPECIFICATIONS (GSAP & THREE/WEBGL)

### 3.1 GSAP ScrollTrigger Master Configuration

```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const mm = gsap.matchMedia();

// 1. DESKTOP PINNED HORIZONTAL SCRUB (>= 1024px)
mm.add('(min-width: 1024px)', () => {
  const track = document.querySelector('#horizontal-story-track') as HTMLElement;
  const section = document.querySelector('#horizontal-story-section') as HTMLElement;
  
  if (!track || !section) return;

  const getTotalScroll = () => track.scrollWidth - window.innerWidth;

  const masterTl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${getTotalScroll() * 1.3}`,
      pin: true,
      scrub: 0.7, // Ultra-smooth inertia damping
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        if (p < 0.25) setActiveStage(0);
        else if (p < 0.50) setActiveStage(1);
        else if (p < 0.75) setActiveStage(2);
        else setActiveStage(3);
      },
    },
  });

  masterTl.to(track, {
    x: () => -getTotalScroll(),
    ease: 'none',
    duration: 10,
  }, 0);

  // Staggered Stage Card Parallax Elevation
  masterTl.fromTo(
    '.interactive-stage-card',
    { y: 30, opacity: 0.75 },
    { y: -10, opacity: 1, stagger: 2, ease: 'power1.out', duration: 3 },
    0.2
  );
});

// 2. MOBILE VERTICAL UNROLLED STACK (< 1024px)
mm.add('(max-width: 1023px)', () => {
  const panels = gsap.utils.toArray<HTMLElement>('.stage-panel');
  panels.forEach((panel, idx) => {
    gsap.fromTo(
      panel,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: panel,
          start: 'top 85%',
          onEnter: () => setActiveStage(idx),
          onEnterBack: () => setActiveStage(idx),
        },
      }
    );
  });
});
```

---

### 3.2 Spring Physics Sandbox Parameters

$$\text{Differential Equation: } a = -k \cdot x - c \cdot v$$
$$\text{Where } k = \text{Tension} \times 0.0008, \quad c = \text{Damping} \times 0.04$$

| Preset Identifier | Tension ($k$) | Damping ($c$) | Dynamic Behavior Profile |
| :--- | :--- | :--- | :--- |
| **`snappy`** *(Default)* | `360` | `26` | High responsiveness, zero overshoot, sharp settling |
| **`liquid`** | `180` | `16` | Organic viscous deceleration, gentle drift |
| **`elastic`** | `450` | `12` | High-energy rubber recoil with visible oscillation |
| **`inertia`** | `240` | `35` | Heavy mass, high resistance, industrial feel |

---

### 3.3 Three.js WebGL Hologram Shader Specs (`HeroHologramCanvas`)

* **Geometry & Node Counts:**
  - Mode `quantum`: 100 particle nodes distributed via Fibonacci spherical lattice.
  - Mode `orbital`: 120 particle nodes distributed in concentric 3-ring planes.
  - Mode `matrix`: 144 particle nodes aligned to a 3D isometric bounding cube.
* **Shader Attributes:**
  - Position: `vec3 aPosition`
  - Color Intensity: `float aIntensity` (pulsing between `0.4` and `1.0` via `sin(uTime * 2.0 + vDist)`)
  - Connection Threshold: Distance $d < 1.85$ units generates dynamic line segment geometry with `opacity = 1.0 - (d / 1.85)`.
* **Renderer Constraints:** `antialias: true`, `powerPreference: "high-performance"`, `pixelRatio = Math.min(window.devicePixelRatio, 2)`.

---

## 4. EXHAUSTIVE CMS CONTENT INVENTORY (EVERY LIVE STRING & NUMBER)

### 4.1 Global Navigation & Header

```json
{
  "brandName": "ANORENT",
  "avatarInitials": "AN",
  "studioTitle": "ANORENT STUDIO",
  "studioSubtitle": "DIGITAL ARTIST & DEV",
  "isOnline": true,
  "defaultAudioEnabled": true,
  "navItems": [
    { "id": "home", "label": "Home", "href": "/" },
    { "id": "deployments", "label": "Deployments", "href": "/deployments" },
    { "id": "about", "label": "About", "href": "/about" },
    { "id": "faq", "label": "FAQ", "href": "/faq" },
    { "id": "contact", "label": "Contact", "href": "/contact" }
  ],
  "headerCta": {
    "label": "START PROJECT ↗",
    "route": "contact"
  }
}
```

---

### 4.2 Hero Section

```json
{
  "topBadgeText": "[ SOLO CREATIVE DEVELOPER & 3D ARTIST ]",
  "headlineSegments": [
    "CYBERNETiC CRAFT",
    "DiGiTAL REALMS",
    "ENGiNEERED."
  ],
  "bioSubtext": "I design and build high-performance 3D websites, WebGL shaders, and bespoke Next.js interfaces for founders who want to stand out.",
  "highlightWords": [
    "high-performance",
    "3D websites",
    "WebGL shaders",
    "bespoke Next.js interfaces",
    "founders",
    "stand out"
  ],
  "primaryCta": {
    "label": "START A PROJECT ↗",
    "route": "contact"
  },
  "secondaryCta": {
    "label": "BROWSE DEPLOYMENTS",
    "route": "deployments"
  },
  "pricingNoticeText": "Custom builds starting at $1,000 // Fast turnaround",
  "particleModes": ["quantum", "orbital", "matrix"],
  "defaultParticleMode": "quantum",
  "baseNodeCount": 100,
  "targetFps": 60
}
```

---

### 4.3 Horizontal Story Narrative (Stages 1–4)

#### Stage 01: Architectural Mastery
```json
{
  "stageBadge": "01 // ARCHITECTURAL MASTERY",
  "headlineLine1": "SUB-MILLISECOND",
  "headlineLine2": "DIGITAL REALMS.",
  "description": "I reject slow, bloated website themes. Every interface is custom-architected on Next.js 15, React 19, and Tailwind v4 with zero runtime layout thrashing and hardware-accelerated shaders.",
  "specTags": [
    { "title": "React 19 & Next 15", "subtitle": "Server Actions" },
    { "title": "WebGL / GLSL", "subtitle": "Hardware 60 FPS" },
    { "title": "Zero Thrash", "subtitle": "0 Cumulative Shift" }
  ],
  "gpuBenchmark": "59 FPS // 0.18ms",
  "interactiveTabs": ["particle", "glsl", "edge", "reflow"]
}
```

#### Stage 02: Motion Choreography
```json
{
  "stageBadge": "02 // MOTION CHOREOGRAPHY",
  "headlineLine1": "ELASTIC SPRINGS.",
  "headlineLine2": "ZERO RIGIDITY.",
  "description": "Great interfaces feel tactile. I replace lifeless linear CSS transitions with calibrated mathematical damped springs and cursor attraction vectors.",
  "bulletPoints": [
    "Damped Harmonic Oscillators calculated at 120Hz frame rates",
    "Magnetic Vector Attraction towards interactive click targets"
  ],
  "defaultTension": 300,
  "defaultDamping": 24,
  "springPresets": ["snappy", "liquid", "elastic", "inertia"]
}
```

#### Stage 03: Full-Stack Architecture
```json
{
  "stageBadge": "03 // FULL-STACK ARCHITECTURE",
  "headlineLine1": "SCALABLE SAAS.",
  "headlineLine2": "ZERO DOWNTIME.",
  "description": "Visual brilliance requires hardened engineering. I build complete production-grade backends with authenticated RBAC APIs, serverless databases, real-time WebSockets, and Redis token bucket rate limiting.",
  "authPills": [
    { "title": "Zero-Trust Auth", "subtitle": "JWT + Secure HTTP-only cookies" },
    { "title": "Real-time WebSockets", "subtitle": "Sub-10ms pub/sub broadcast" }
  ],
  "architectureNodes": [
    {
      "key": "cdn",
      "name": "GLOBAL EDGE CLUSTER",
      "latency": "4ms",
      "summary": "Anycast routing across 300+ global edge nodes with instant stale-while-revalidate edge caching."
    },
    {
      "key": "api",
      "name": "REST / GRAPHQL ROUTER",
      "latency": "12ms",
      "summary": "Direct RPC function calls with compile-time TypeScript type validation and input sanitization."
    },
    {
      "key": "redis",
      "name": "UPSTASH KV CACHE",
      "latency": "1ms",
      "summary": "Distributed rate limiting, session cache, and fast key-value lookups."
    },
    {
      "key": "sql",
      "name": "POSTGRESQL / CLOUDSQL",
      "latency": "40 Conns",
      "summary": "Type-safe relational database schema management with Prisma and connection pooling."
    },
    {
      "key": "sockets",
      "name": "WEBHOOK EVENT HUB",
      "latency": "Active",
      "summary": "Bidirectional real-time notification dispatch and state synchronization across active clients."
    }
  ]
}
```

#### Stage 04: Zero-Risk Execution (Escrow & Trust)
```json
{
  "stageBadge": "04 // ZERO-RISK EXECUTION",
  "headlineLine1": "VERIFIED ESCROW.",
  "headlineLine2": "100% IP TRANSFER.",
  "description": "I work under protected milestone escrow via Fiverr Pro. You review and interact with live staging builds before approving each milestone release phase.",
  "escrowPhases": [
    {
      "phase": 1,
      "title": "Phase 1: Architecture & Wireframes",
      "description": "Design tokens, 3D moodboards, and architecture locked.",
      "badge": "Protected"
    },
    {
      "phase": 2,
      "title": "Phase 2: Alpha Build & Motion",
      "description": "Live staging domain for client interactive review.",
      "badge": "Staged"
    },
    {
      "phase": 3,
      "title": "Phase 3: Production Hardening",
      "description": "Lighthouse 95+ and zero-leak memory audit.",
      "badge": "Audited"
    },
    {
      "phase": 4,
      "title": "Phase 4: Full Codebase & 100% IP Transfer",
      "description": "Clean GitHub repo transfer and deployment.",
      "badge": "Ready"
    }
  ],
  "primaryCta": { "label": "Start Project Brief", "route": "contact" },
  "secondaryCta": { "label": "Inspect Deployments", "route": "deployments" }
}
```

---

### 4.4 Deployments Catalog (All 12 Production Records)

```json
[
  {
    "id": "dep-001",
    "slug": "cyberpunk-hud-ui-kit",
    "title": "Cyberpunk HUD UI Kit v3.4",
    "category": "SaaS Dashboards",
    "rating": 5.0,
    "image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
    "desc": "Next-gen telemetry and tactical dashboard kit with interactive WebGL radar screens, dynamic charts, and audio-reactive alerts.",
    "tech": ["React 19", "WebGL Shaders", "Tailwind CSS v4"],
    "fps": 60,
    "score": 100,
    "liveUrl": "https://example.com/demo/cyberpunk-hud",
    "sourceUrl": "https://github.com/example/cyberpunk-hud",
    "featured": true,
    "displayOrder": 1
  },
  {
    "id": "dep-002",
    "slug": "neo-tokyo-3d-vault",
    "title": "Neo-Tokyo 3D Asset Vault",
    "category": "Animated Sites",
    "rating": 4.9,
    "image": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop",
    "desc": "Real-time 3D rendered showcase featuring PBR materials, bloom post-processing, and interactive orbit controls.",
    "tech": ["Three.js", "Blender PBR", "GLTF/GLB"],
    "fps": 60,
    "score": 98,
    "liveUrl": "https://example.com/demo/neo-tokyo",
    "sourceUrl": "https://github.com/example/neo-tokyo",
    "featured": true,
    "displayOrder": 2
  },
  {
    "id": "dep-003",
    "slug": "omnichain-smart-contract-core",
    "title": "OmniChain Smart Contract Core",
    "category": "Full-Stack Apps",
    "rating": 5.0,
    "image": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop",
    "desc": "High-throughput decentralized protocol terminal with multi-wallet orchestration, transaction simulation, and instant balance caching.",
    "tech": ["Solidity", "Hardhat Core", "TypeScript"],
    "fps": 60,
    "score": 100,
    "liveUrl": "https://example.com/demo/omnichain",
    "sourceUrl": "https://github.com/example/omnichain",
    "featured": true,
    "displayOrder": 3
  },
  {
    "id": "dep-004",
    "slug": "synthetix-ar-canvas",
    "title": "Synthetix AR Spatial Canvas",
    "category": "Animated Sites",
    "rating": 4.8,
    "image": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?q=80&w=800&auto=format&fit=crop",
    "desc": "Spatial computing web interface built on WebXR standards, procedural audio synthesis, and real-time depth mapping.",
    "tech": ["WebXR Spec", "Three.js Spatial", "WebAudio API"],
    "fps": 60,
    "score": 96,
    "liveUrl": "https://example.com/demo/synthetix-ar",
    "sourceUrl": "https://github.com/example/synthetix-ar",
    "featured": false,
    "displayOrder": 4
  },
  {
    "id": "dep-005",
    "slug": "neural-engine-prompt-pipeline",
    "title": "Neural Engine Prompt Pipeline",
    "category": "Full-Stack Apps",
    "rating": 4.9,
    "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
    "desc": "Server-side multimodal generative AI studio integrated with Gemini API, token counters, live streaming response renderers, and workspace history.",
    "tech": ["Gemini SDK", "Node ESM", "Express API"],
    "fps": 60,
    "score": 99,
    "liveUrl": "https://example.com/demo/neural-engine",
    "sourceUrl": "https://github.com/example/neural-engine",
    "featured": false,
    "displayOrder": 5
  },
  {
    "id": "dep-006",
    "slug": "ghost-grid-saas-design-system",
    "title": "Ghost-Grid SaaS Design System",
    "category": "UI Templates",
    "rating": 5.0,
    "image": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
    "desc": "Production-grade accessible component library with 40+ accessible micro-interactions, dark mode tokens, and frictionless clipboard import.",
    "tech": ["React 19", "Tailwind v4", "Framer Motion"],
    "fps": 60,
    "score": 100,
    "liveUrl": "https://example.com/demo/ghost-grid",
    "sourceUrl": "https://github.com/example/ghost-grid",
    "featured": false,
    "displayOrder": 6
  },
  {
    "id": "dep-007",
    "slug": "apex-fintech-analytics-hud",
    "title": "Apex FinTech Analytics HUD",
    "category": "SaaS Dashboards",
    "rating": 4.9,
    "image": "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=800&auto=format&fit=crop",
    "desc": "Real-time algorithmic trading analytics engine featuring zero-latency WebSockets, candlestick rendering, and customizable viewport modularity.",
    "tech": ["React 19", "Recharts", "WebSockets", "Tailwind v4"],
    "fps": 60,
    "score": 99,
    "liveUrl": "https://example.com/demo/apex-fintech",
    "sourceUrl": "https://github.com/example/apex-fintech",
    "featured": true,
    "displayOrder": 7
  },
  {
    "id": "dep-008",
    "slug": "vortex-webgl-particle-portal",
    "title": "Vortex WebGL Particle Portal",
    "category": "Animated Sites",
    "rating": 5.0,
    "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    "desc": "Mesmerizing interactive particle field featuring custom GLSL curl noise shaders, audio reactivity, and fluid gravity simulations.",
    "tech": ["Three.js Shaders", "GSAP 3", "WebAudio"],
    "fps": 60,
    "score": 100,
    "liveUrl": "https://example.com/demo/vortex-portal",
    "sourceUrl": "https://github.com/example/vortex-portal",
    "featured": true,
    "displayOrder": 8
  },
  {
    "id": "dep-009",
    "slug": "aetheria-ai-agent-workspace",
    "title": "Aetheria AI Agent Workspace",
    "category": "Full-Stack Apps",
    "rating": 4.8,
    "image": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    "desc": "Autonomous agent orchestration cockpit with tree-of-thought visualizers, token cost monitoring, and automated execution workflows.",
    "tech": ["React 19", "Gemini API", "Express.js", "TypeScript"],
    "fps": 60,
    "score": 97,
    "liveUrl": "https://example.com/demo/aetheria-ai",
    "sourceUrl": "https://github.com/example/aetheria-ai",
    "featured": false,
    "displayOrder": 9
  },
  {
    "id": "dep-010",
    "slug": "prism-glassmorphic-ui-kit",
    "title": "Prism Glassmorphic UI Kit",
    "category": "UI Templates",
    "rating": 4.9,
    "image": "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
    "desc": "Ultra-modern frosted glass interface kit with chromatic aberration highlights, subtle neon borders, and fluid responsive layouts.",
    "tech": ["React 19", "Tailwind v4", "Lucide Icons"],
    "fps": 60,
    "score": 98,
    "liveUrl": "https://example.com/demo/prism-kit",
    "sourceUrl": "https://github.com/example/prism-kit",
    "featured": false,
    "displayOrder": 10
  },
  {
    "id": "dep-011",
    "slug": "krypton-liquidity-terminal",
    "title": "Krypton Liquidity Terminal",
    "category": "SaaS Dashboards",
    "rating": 5.0,
    "image": "https://images.unsplash.com/photo-1644352402446-218204625b07?q=80&w=800&auto=format&fit=crop",
    "desc": "Automated market maker management console with interactive depth charts, pool health analytics, and gas optimization simulators.",
    "tech": ["React 19", "Ethers.js", "Recharts", "Tailwind v4"],
    "fps": 60,
    "score": 100,
    "liveUrl": "https://example.com/demo/krypton-terminal",
    "sourceUrl": "https://github.com/example/krypton-terminal",
    "featured": false,
    "displayOrder": 11
  },
  {
    "id": "dep-012",
    "slug": "quantum-3d-product-studio",
    "title": "Quantum 3D Product Studio",
    "category": "Animated Sites",
    "rating": 4.9,
    "image": "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop",
    "desc": "E-commerce 3D product configurator with dynamic lighting controls, material swappers, and instant AR quick-look exports.",
    "tech": ["Three.js", "GLTF Loader", "Canvas API"],
    "fps": 60,
    "score": 99,
    "liveUrl": "https://example.com/demo/quantum-studio",
    "sourceUrl": "https://github.com/example/quantum-studio",
    "featured": false,
    "displayOrder": 12
  }
]
```

---

### 4.5 About Page & Proof Metrics

```json
{
  "profileName": "Ahsan",
  "handle": "@Ahsanwebdesign",
  "title": "Solo Creative Developer & 3D Artist",
  "executiveBio": "I design and engineer bespoke web experiences, interactive 3D WebGL environments, and production-ready Next.js interfaces directly for founders and modern brands. By eliminating junior handoffs and agency middle management, you communicate directly with the builder throughout the entire project lifecycle.",
  "contactEmail": "ahsxn3d@gmail.com",
  "locationTimezone": "Remote / Global (UTC+5)",
  "availabilityStatus": "Available for Hire",
  "techSkills": [
    "Next.js 15",
    "React 19",
    "Tailwind CSS",
    "Prisma ORM",
    "Three.js",
    "GSAP",
    "Blender",
    "Maya",
    "Houdini",
    "Unreal Engine 5",
    "TypeScript",
    "WebGL / GLSL"
  ],
  "proofCards": [
    {
      "id": "proof-systems",
      "title": "12+ Deployments",
      "value": "12+",
      "label": "Curated Systems",
      "subtext": "UI Templates, Full-Stack Apps, Animated Sites, SaaS Dashboards",
      "categoryBreakdown": {
        "UI Templates": 2,
        "Full-Stack Apps": 3,
        "Animated Sites": 4,
        "SaaS Dashboards": 3
      }
    },
    {
      "id": "proof-satisfaction",
      "title": "99.9% (5.0 ★)",
      "value": "99.9%",
      "label": "Client Satisfaction",
      "subtext": "100% Code Quality, 99.8% GPU 60 FPS, 100% On-Time",
      "progressMetrics": [
        { "name": "Code Quality", "percentage": 100 },
        { "name": "GPU 60 FPS Shaders", "percentage": 99.8 },
        { "name": "On-Time Staging Delivery", "percentage": 100 }
      ]
    },
    {
      "id": "proof-sla",
      "title": "< 1-2 Hours",
      "value": "< 1-2h",
      "label": "Direct Communication",
      "subtext": "Email & WhatsApp Daily Async Updates",
      "slaTarget": "1-2h Average"
    },
    {
      "id": "proof-escrow",
      "title": "100% IP Transfer",
      "value": "100%",
      "label": "Client Rights & Escrow",
      "subtext": "Full source code transfer via verified milestone escrow",
      "guarantee": "Zero Vendor Lock-in"
    }
  ]
}
```

---

### 4.6 FAQ Vault (All 6 Q&A Records)

```json
{
  "badgeText": "DIRECT ARCHITECT DISPATCH // TRANSPARENT PROTOCOL",
  "pageTitle": "KNOWLEDGE VAULT & PROTOCOLS",
  "pageSubtitle": "Clear answers on custom Next.js builds, WebGL shaders, milestone escrow security, and 100% full source code ownership.",
  "searchPlaceholder": "Search knowledge protocols (e.g. pricing, escrow, stack, 100% IP, timeline)...",
  "telemetryCards": [
    { "title": "100% Code Transfer", "subtitle": "IP Ownership" },
    { "title": "< 1-2h Response", "subtitle": "Average SLA" },
    { "title": "60 FPS GPU Profiling", "subtitle": "Performance" },
    { "title": "Fiverr Pro Escrow", "subtitle": "Security" }
  ],
  "categories": [
    "All",
    "Pricing & Scoping",
    "100% IP Transfer",
    "Milestone Escrow",
    "Engineering",
    "No Middlemen"
  ],
  "items": [
    {
      "id": "faq-1",
      "category": "Custom Projects & Pricing",
      "categoryTag": "Pricing & Scoping",
      "question": "What are your custom project rates and typical turnarounds?",
      "answer": "Custom builds start at $1,000. Typical turnarounds range from 1 to 3 weeks depending on 3D/shader complexity. You receive daily asynchronous progress updates, working staging links, and direct communication throughout.",
      "helpfulCount": 84,
      "order": 1
    },
    {
      "id": "faq-2",
      "category": "Ownership & Source Code",
      "categoryTag": "100% IP Transfer",
      "question": "Do I get 100% full source code ownership and commercial rights?",
      "answer": "Yes, absolutely. Upon milestone completion and approval, 100% of all intellectual property, private GitHub repositories, 3D assets, and custom GLSL shaders are transferred directly to you. Zero vendor lock-in.",
      "helpfulCount": 62,
      "order": 2
    },
    {
      "id": "faq-3",
      "category": "Payments & Security",
      "categoryTag": "Milestone Escrow",
      "question": "How do milestone payments and escrow protection work?",
      "answer": "All payments are structured in transparent milestone phases via Fiverr Pro or verified escrow contracts. Funds remain protected until you inspect, test, and approve each working staging deployment.",
      "helpfulCount": 95,
      "order": 3
    },
    {
      "id": "faq-4",
      "category": "Tech Stack & Performance",
      "categoryTag": "Engineering",
      "question": "What tech stack do you use, and how do you guarantee 60 FPS performance?",
      "answer": "I build exclusively with modern production stacks: Next.js 15, React 19, TypeScript, Tailwind CSS v4, Three.js, and GLSL shaders. Every site undergoes rigorous GPU performance profiling and memory leak testing before delivery.",
      "helpfulCount": 51,
      "order": 4
    },
    {
      "id": "faq-5",
      "category": "Collaboration & Process",
      "categoryTag": "No Middlemen",
      "question": "Who will I actually be working with during the project?",
      "answer": "You work directly with me—Ahsan, solo creative engineer and 3D artist. No project managers, no junior developers, and no agency communication delays. We connect via Email, WhatsApp, and private video walkthroughs.",
      "helpfulCount": 43,
      "order": 5
    },
    {
      "id": "faq-6",
      "category": "Post-Launch Support",
      "categoryTag": "Warranty",
      "question": "Do you provide post-launch support and performance warranties?",
      "answer": "Yes. Every custom build includes 30 days of complimentary post-launch support covering bug fixes, minor design refinements, and deployment assistance to ensure a flawless public launch.",
      "helpfulCount": 39,
      "order": 6
    }
  ]
}
```

---

### 4.7 Contact Page & Official Portals

```json
{
  "badgeText": "ANORENT Studio • Official Contact Portals",
  "pageTitle": "LET'S BUILD TOGETHER.",
  "pageSubtitle": "Reach out via any of our official channels: Direct Email, Fiverr Pro, Dribbble, Twitter, or WhatsApp.",
  "directEmail": "ahsxn3d@gmail.com",
  "budgetTierOptions": [
    "$1k - $3k (Micro Deployment)",
    "$3k - $7k (Full Web App)",
    "$7k - $15k (Enterprise Architecture)",
    "$15k+ (Bespoke Retainer / Studio Partner)"
  ],
  "channelCards": [
    {
      "cardNumber": "Card 01",
      "title": "Direct Email",
      "handleOrUrl": "ahsxn3d@gmail.com",
      "badgeText": "Official",
      "description": "Preferred channel for detailed project briefs, custom architecture requests, and formal RFPs. Direct reply within 1-2 hours.",
      "actionLabel": "COPY EMAIL",
      "variantColor": "primary",
      "order": 1
    },
    {
      "cardNumber": "Card 02",
      "title": "Fiverr",
      "handleOrUrl": "https://fiverr.com/pro/anorent",
      "badgeText": "Escrow Advantage",
      "description": "Official verified Fiverr Pro profile with guaranteed milestone escrow protection, automated invoicing, and secure payment processing.",
      "actionLabel": "FIVERR",
      "variantColor": "emerald",
      "order": 2
    },
    {
      "cardNumber": "Card 03",
      "title": "Dribbble",
      "handleOrUrl": "https://dribbble.com/anorent",
      "badgeText": "40+ Shots",
      "description": "Explore our portfolio of 3D visual concepts, interactive UI prototypes, shader experiments, and design case studies.",
      "actionLabel": "DRIBBBLE",
      "variantColor": "pink",
      "order": 3
    },
    {
      "cardNumber": "Card 04",
      "title": "Twitter",
      "handleOrUrl": "https://x.com/Ahsanwebdesign",
      "badgeText": "@Ahsanwebdesign",
      "description": "Follow live build logs, experimental WebGL shaders, Next.js tips, and industry insights. Open DMs for quick chats.",
      "actionLabel": "TWITTER",
      "variantColor": "blue",
      "order": 4
    },
    {
      "cardNumber": "Card 05",
      "title": "WhatsApp",
      "handleOrUrl": "https://wa.me/923284992759",
      "badgeText": "Instant",
      "description": "Direct WhatsApp line for active clients, rapid voice notes, urgent scope discussions, and real-time sprint coordination.",
      "actionLabel": "WHATSAPP",
      "variantColor": "emerald",
      "order": 5
    }
  ]
}
```

---

### 4.8 Client Reviews (All 6 Verified Records)

```json
[
  {
    "id": "rev-1",
    "name": "Elena Rostova",
    "email": "elena@hyperion.ai",
    "roleCompany": "Lead Product Architect @ Hyperion",
    "rating": 5,
    "comment": "Ahsan transformed our SaaS interface into a high-performance 3D visual experience. His WebGL shaders run buttery smooth at 60 FPS without any frame drops. Working with a solo builder of his caliber saved us months of agency back-and-forth.",
    "date": "Aug 02, 2026",
    "isVerified": true
  },
  {
    "id": "rev-2",
    "name": "Darius Vance",
    "email": "darius@chronolabs.io",
    "roleCompany": "Founder @ ChronoLabs",
    "rating": 5,
    "comment": "Fast turnaround, pristine TypeScript, and unmatched shader animations. Ahsan delivered our interactive spatial canvas in under 10 days, and our conversion rate jumped 42% on launch day.",
    "date": "Jul 28, 2026",
    "isVerified": true
  },
  {
    "id": "rev-3",
    "name": "Sophia Sterling",
    "email": "sophia@nexusweb.com",
    "roleCompany": "Creative Director @ Nexus Interactive",
    "rating": 5,
    "comment": "The WebGL shaders and 3D assets run at a locked 60 FPS across all mobile devices. Ahsan is one of the rare creative engineers who truly masters both visual craft and low-level code performance.",
    "date": "Jul 19, 2026",
    "isVerified": true
  },
  {
    "id": "rev-4",
    "name": "Marcus Thorne",
    "email": "marcus@synthwave.io",
    "roleCompany": "CTO @ Synthwave Systems",
    "rating": 5,
    "comment": "Exceptional attention to micro-interactions and GPU shader optimization. Milestone escrow via Fiverr gave our investors complete peace of mind, and the final codebase was pure craftsmanship.",
    "date": "Jul 11, 2026",
    "isVerified": true
  },
  {
    "id": "rev-5",
    "name": "Aria Chen",
    "email": "aria@metaverse3d.org",
    "roleCompany": "Head of Design @ SpatialCore",
    "rating": 5,
    "comment": "Ahsan built our interactive 3D product visualizer in under two weeks. The lighting, materials, and camera choreographies are world-class. He communicates clearly and delivers ahead of schedule.",
    "date": "Jun 30, 2026",
    "isVerified": true
  },
  {
    "id": "rev-6",
    "name": "Liam O'Connor",
    "email": "liam@fintechx.com",
    "roleCompany": "VP of Product @ Apex FinTech",
    "rating": 5,
    "comment": "Best solo frontend engineer we have hired. Clean code architecture, zero layout thrashing, and prompt daily communication. Highly recommended for any serious web venture.",
    "date": "Jun 22, 2026",
    "isVerified": true
  }
]
```

---

### 4.9 Global Footer

```json
{
  "brandName": "ANORENT",
  "brandTag": "Anorent Studio",
  "tagline": "Where Cyberpunk Aesthetics Meet High-Performance Web Engineering.",
  "copyrightText": "© 2026 ANORENT STUDIO. All rights reserved.",
  "bottomBadgeLeft": "Anorent Architecture // Modern Portfolio Showcase",
  "bottomBadgeRight": "Powered by Anorent Core Engine",
  "telemetryTitle": "System Telemetry & Live Clock",
  "systemTelemetry": {
    "uptime": "100% Uptime",
    "activeNodes": 16240,
    "latency": "0.18ms",
    "sla": "< 1-2 Hours",
    "timezone": "UTC+5 (Live)",
    "targetFps": 60
  }
}
```

---

## 5. DASHBOARD CMS CONTROL MATRIX & RELATIONAL SCHEMA MAPPING

| Entity / Field Group | Target Prisma Model & Column | Data Type | Dashboard UI Input Control | Server Action / API Route | Revalidation Target |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Global Brand Wordmark** | `SiteHeaderConfig.brandName` | `String` | Text Input (Single line) | `updateHeaderConfig(data)` | `revalidatePath('/', 'layout')` |
| **Online Status Toggle** | `SiteHeaderConfig.isOnline` | `Boolean` | Switch Toggle (Emerald/Gray) | `toggleOnlineStatus(boolean)` | `revalidatePath('/', 'layout')` |
| **Hero Headline Lines** | `HeroSectionContent.headlineLine1/2/3` | `String` | 3x Text Inputs | `updateHeroSection(data)` | `revalidatePath('/')` |
| **Hero Bio Text** | `HeroSectionContent.bioSubtext` | `String` (Text) | Markdown / Rich Text Area | `updateHeroSection(data)` | `revalidatePath('/')` |
| **Hero Highlight Words** | `HeroSectionContent.highlightWords` | `String[]` | Dynamic Tag Builder (Chips) | `updateHeroSection(data)` | `revalidatePath('/')` |
| **Hero Particle Modes** | `HeroSectionContent.particleModes` | `String[]` | Multi-select / Pill selector | `updateHeroSection(data)` | `revalidatePath('/')` |
| **Story Stage Headings** | `StoryStageContent.headlineLine1/2` | `String` | Text Input | `updateStoryStage(id, data)` | `revalidatePath('/')` |
| **Story Stage Description** | `StoryStageContent.description` | `String` (Text) | Rich Text Area | `updateStoryStage(id, data)` | `revalidatePath('/')` |
| **Architecture Nodes** | `ArchitectureNode` (Table) | Relational | Draggable Node Table & Form | `upsertArchitectureNode(data)` | `revalidatePath('/')` |
| **Escrow Lifecycle Phases** | `EscrowPhase` (Table) | Relational | 4-Stage Step Editor | `updateEscrowPhase(id, data)` | `revalidatePath('/')` |
| **Deployment Projects** | `DeploymentProduct` (Table) | Relational | Full CRUD Modal & Media Uploader | `upsertDeployment(data)`, `deleteDeployment(id)` | `revalidatePath('/deployments')`, `revalidatePath('/')` |
| **Deployment Tech Stack** | `DeploymentProduct.techStack` | `String[]` | Interactive Multi-Tag Builder | `upsertDeployment(data)` | `revalidatePath('/deployments')` |
| **Deployment Featured** | `DeploymentProduct.isFeatured` | `Boolean` | Toggle Switch | `toggleFeaturedDeployment(id)` | `revalidatePath('/')` |
| **About Bio Copy** | `AboutPageContent.executiveBio` | `String` (Text) | Rich Text Editor | `updateAboutPage(data)` | `revalidatePath('/about')` |
| **Skills Array** | `AboutPageContent.techSkills` | `String[]` | Tag Builder with Drag Sort | `updateAboutPage(data)` | `revalidatePath('/about')` |
| **Proof Metrics Json** | `ProofMetricCard.progressMetricsJson` | `Json` | Key-Value Numeric Percentage Grid | `updateProofCard(id, data)` | `revalidatePath('/about')` |
| **FAQ Item Q&A** | `FAQItem.question / answer` | `String / Text` | Accordion List + Rich Text | `upsertFaqItem(data)`, `deleteFaqItem(id)` | `revalidatePath('/faq')` |
| **FAQ Helpful Counter** | `FAQItem.helpfulCount` | `Int` | Number Stepper / Public increment | `incrementFaqHelpful(id)` | `revalidatePath('/faq')` |
| **Contact Direct Email** | `ContactPageContent.directEmail` | `String` | Email Input with regex validation | `updateContactSettings(data)` | `revalidatePath('/contact')` |
| **Contact Submissions** | `ContactSubmission` (Table) | Relational | Inbox Kanban Board (Status Pills) | `updateSubmissionStatus(id, status)` | `revalidatePath('/admin/inbox')` |
| **Client Review Approval** | `ReviewItem.isApproved` | `Boolean` | Approval Toggle Switch | `approveReview(id, status)` | `revalidatePath('/')`, `revalidatePath('/about')` |
| **Telemetry Defaults** | `SystemTelemetryConfig` | Relational | Live Metric Steppers | `updateTelemetryConfig(data)` | `revalidatePath('/', 'layout')` |

---

## 6. CODE EXTRACTION DUMP

### 6.1 Unified TypeScript Domain Types (`types.ts`)

```typescript
export type Page = 'home' | 'deployments' | 'about' | 'faq' | 'contact' | 'project-detail';

export type DeploymentCategory = 
  | 'All'
  | 'UI Templates'
  | 'Full-Stack Apps'
  | 'Animated Sites'
  | 'SaaS Dashboards';

export interface DeploymentProduct {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription?: string;
  techStack: string[];
  demoUrl: string;
  sourceUrl?: string;
  thumbnailUrl: string;
  previewVideoUrl?: string;
  fpsBenchmark: number;
  auditScore: number;
  isFeatured: boolean;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  email: string;
  roleCompany?: string;
  rating: number;
  comment: string;
  date: string;
  isVerified: boolean;
  isApproved?: boolean;
}

export type SubmissionStatus = 
  | 'UNREAD' 
  | 'IN_REVIEW' 
  | 'CONTACTED' 
  | 'MILESTONE_ACTIVE' 
  | 'CLOSED' 
  | 'ARCHIVED';

export interface ContactSubmission {
  id: string;
  clientName: string;
  email: string;
  budgetTier: string;
  projectBrief: string;
  status: SubmissionStatus;
  notes?: string;
  createdAt: string;
}

export interface FAQItem {
  id: string;
  category: string;
  categoryTag: string;
  question: string;
  answer: string;
  helpfulCount: number;
  displayOrder: number;
  isPublished: boolean;
}

export interface ArchitectureNode {
  id: string;
  key: string;
  name: string;
  latency: string;
  summary: string;
  order: number;
}

export interface EscrowPhase {
  id: string;
  phaseNumber: number;
  title: string;
  description: string;
  badgeText: string;
}

export interface SystemTelemetryConfig {
  globalUptimeRate: string;
  activeNodesCount: number;
  serverLatencyMs: number;
  averageSlaHours: string;
  liveTimezoneLabel: string;
  fpsTarget: number;
}
```

---

### 6.2 Complete Production Prisma Schema (`schema.prisma`)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// -----------------------------------------------------------------------------
// 1. GLOBAL SITE METADATA & SYSTEM CONFIGURATION
// -----------------------------------------------------------------------------

model SiteHeaderConfig {
  id                  String   @id @default("global-header-config")
  brandName           String   @default("ANORENT")
  avatarInitials      String   @default("AN")
  studioTitle         String   @default("ANORENT STUDIO")
  studioSubtitle      String   @default("DIGITAL ARTIST & DEV")
  isOnline            Boolean  @default(true)
  defaultAudioEnabled Boolean  @default(true)
  headerCtaLabel      String   @default("START PROJECT ↗")
  headerCtaRoute      String   @default("contact")
  updatedAt           DateTime @updatedAt
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

// -----------------------------------------------------------------------------
// 2. PAGE CONTENT MODELS
// -----------------------------------------------------------------------------

model HeroSectionContent {
  id                  String   @id @default("hero-section-content")
  topBadgeText        String   @default("[ SOLO CREATIVE DEVELOPER & 3D ARTIST ]")
  headlineLine1       String   @default("CYBERNETiC CRAFT")
  headlineLine2       String   @default("DiGiTAL REALMS")
  headlineLine3       String   @default("ENGiNEERED.")
  bioSubtext          String   @db.Text
  highlightWords      String[]
  primaryCtaLabel     String   @default("START A PROJECT ↗")
  primaryCtaRoute     String   @default("contact")
  secondaryCtaLabel   String   @default("BROWSE DEPLOYMENTS")
  secondaryCtaRoute   String   @default("deployments")
  pricingNoticeText   String   @default("Custom builds starting at $1,000 // Fast turnaround")
  particleModes       String[] @default(["quantum", "orbital", "matrix"])
  defaultParticleMode String   @default("quantum")
  baseNodeCount       Int      @default(100)
  targetFps           Int      @default(60)
  updatedAt           DateTime @updatedAt
}

model StoryStageContent {
  id                String             @id @default(cuid())
  stageIndex        Int                @unique // 0, 1, 2, 3
  stageBadge        String             // e.g. "01 // ARCHITECTURAL MASTERY"
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
  defaultTension    Int?               @default(300)
  defaultDamping    Int?               @default(24)
  primaryCtaLabel   String?
  primaryCtaRoute   String?
  secondaryCtaLabel String?
  secondaryCtaRoute String?
  architectureNodes ArchitectureNode[]
  escrowPhases      EscrowPhase[]
  updatedAt         DateTime           @updatedAt

  @@index([stageIndex])
}

model ArchitectureNode {
  id       String            @id @default(cuid())
  stageId  String
  stage    StoryStageContent @relation(fields: [stageId], references: [id], onDelete: Cascade)
  key      String            // 'cdn' | 'api' | 'redis' | 'sql' | 'sockets'
  name     String            // "GLOBAL EDGE CLUSTER"
  latency  String            // "4ms"
  summary  String            @db.Text
  order    Int               @default(0)

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

model ProofMetricCard {
  id                      String   @id @default(cuid())
  cardKey                 String   @unique // 'systems' | 'satisfaction' | 'sla' | 'escrow'
  title                   String
  value                   String
  label                   String
  subtext                 String
  categoryBreakdownJson   Json?
  progressMetricsJson     Json?
  slaTarget               String?
  percentage              Int?
  displayOrder            Int      @default(0)
  updatedAt               DateTime @updatedAt

  @@index([displayOrder])
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
  @@index([isPublished])
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

// -----------------------------------------------------------------------------
// 3. DYNAMIC RELATIONAL COLLECTIONS & MUTATIONS
// -----------------------------------------------------------------------------

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

  @@index([isApproved])
  @@index([rating])
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
*Authored by Principal Software Architect & Design Systems Lead // Anorent Studio MASTER CORE DNA 2026*
