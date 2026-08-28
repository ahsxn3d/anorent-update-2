# Design DNA Specification // Anorent Studio & Creative Engineering Lab

**Document Version:** 2.4.0  
**Architect:** Principal Design Systems Architect & Next.js 15 Specialist  
**Runtime Target:** Next.js 15 (App Router / Turbopack), React 19, Tailwind CSS v4, Three.js / WebGL, GSAP 3 + ScrollTrigger  
**Design Philosophy:** Dark-Mode Cyberpunk Precision, Sub-Millisecond Telemetry, Tactile Spring Physics, Anti-Slop Ergonomics  

---

## 1. Color Palette & Token System

The design system is grounded in a deep, ultra-dense obsidian universe with neon spectrum telemetry accents. High optical contrast is strictly preserved (passing WCAG AAA on body copy and AA on telemetry labels) without relying on washed-out grays or artificial purple-to-blue gradient mud.

```
       DEEP OBSIDIAN           MIDNIGHT VIOLET          CYBER PURPLE             ELECTRIC CYAN            EMERALD TELEMETRY
         #050508                  #080514                  #A855F7                  #06B6D4                   #10B981
   [Primary Canvas]         [Surface & Trays]       [Primary Accent]        [Interactive Glow]         [Telemetry Status]
```

### 1.1 Canvas & Background Color Hierarchy

| Token Name | Hex / RGBA Value | CSS Variable | Semantic Usage |
| :--- | :--- | :--- | :--- |
| **Obsidian Base** | `#050508` | `--bg-page-deep` | Root canvas, full-bleed viewport backdrop, WebGL canvas clearing color |
| **Midnight Violet** | `#080514` | `--bg-page` / `--bg-surface` | Secondary background, section transitions, sticky telemetry bars |
| **Page Ambient** | `#0A0B14` | `--bg-page-ambient` | Standard page wrapper, root body fill |
| **Card Glass Base** | `rgba(20, 21, 38, 0.75)` | `--bg-card` | Default glassmorphic card container with backdrop blur |
| **Deep Stage Glass** | `rgba(8, 5, 20, 0.90)` | `--bg-stage-panel` | Pinned GSAP interactive stage panels, modal backplates |
| **Cyber Console Dark** | `rgba(18, 12, 38, 0.85)` | `--bg-console` | Action controllers, terminal shells, audio mixer trays |
| **Navbar Glass** | `rgba(18, 19, 34, 0.80)` | `--bg-nav` | Fixed navigation bar with `backdrop-blur-xl` and border tint |

### 1.2 Core Neon Accent Spectrum

| Role | Token Name | Hex Value | Glow / Shader Gradient |
| :--- | :--- | :--- | :--- |
| **Primary Brand** | **Cyber Purple** | `#A855F7` (`#8B00EE`) | `linear-gradient(135deg, #C084FC 0%, #A855F7 50%, #7C3AED 100%)` |
| **Interactive Secondary** | **Electric Cyan** | `#06B6D4` (`#00F0FF`) | `linear-gradient(135deg, #00F0FF 0%, #0284C7 60%, #38BDF8 100%)` |
| **Success / Telemetry** | **Emerald Tech** | `#10B981` (`#00FF9D`) | `linear-gradient(135deg, #00FF9D 0%, #10B981 50%, #059669 100%)` |
| **Critical / Highlight** | **Neon Pink** | `#EC4899` (`#FF0055`) | `linear-gradient(135deg, #FF0055 0%, #EC4899 50%, #8B00EE 100%)` |
| **Rating / Warning** | **Amber Flare** | `#F59E0B` (`#FBBF24`) | `linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)` |

### 1.3 Border & Glass Surface Tokens

To prevent hazy, muddy layers, all glass surfaces combine single-pixel translucent borders with calibrated backdrop diffusion.

```css
/* Glass Surface Token Definitions */
:root {
  --glass-border-subtle: rgba(255, 255, 255, 0.08);
  --glass-border-purple: rgba(168, 85, 247, 0.28);
  --glass-border-purple-hover: rgba(168, 85, 247, 0.65);
  --glass-border-cyan: rgba(6, 182, 212, 0.35);
  --glass-border-emerald: rgba(16, 185, 129, 0.35);

  --radial-glow-purple: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(168, 85, 247, 0.35) 0%, transparent 70%);
  --radial-glow-cyan: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(6, 182, 212, 0.35) 0%, transparent 70%);
  --radial-glare-specular: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 45%, transparent 70%);
}
```

* **Border Rules:**
  * Base Cards: `border border-white/10` or `border-purple-500/25`
  * Active / Hovered Cards: `border-purple-400/80` or `border-cyan-400/80`
  * Outer Glass Rings: `ring-1 ring-purple-400/30`
* **Blur Scales:**
  * Small chips / tooltips: `backdrop-blur-md` (8px)
  * Cards / Dashboards: `backdrop-blur-xl` (16px)
  * Floating Modals & Navbars: `backdrop-blur-2xl` (24px)

---

## 2. Typography & Rendering Standards

Typography is structured around three dedicated font axes: **Geometrical Body Typography**, **Heavy Display Kinetic Headlines**, and **Precision Monospace Telemetry**.

```
    DISPLAY HEADLINE                    SANS-SERIF UI                   MONOSPACE TELEMETRY
    'Archivo Black'                 'Plus Jakarta Sans'                   'JetBrains Mono'
[24px - 72px / Bold 900]         [14px - 18px / Regular-Bold]         [10px - 13px / Medium-Bold]
```

### 2.1 Font Stack Declarations

```css
/* Typography Stacks */
body {
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.font-display {
  font-family: 'Archivo Black', 'Plus Jakarta Sans', sans-serif;
  letter-spacing: -0.03em;
}

.font-mono-tech,
.font-mono {
  font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, monospace;
  font-feature-settings: 'zero' 1, 'liga' 0;
}
```

### 2.2 Scale Hierarchy & Metric Distribution

| Style Role | Font Family | Size (px / rem) | Tracking | Line Height | Case / Weight |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Headline** | `Archivo Black` | `clamp(2.5rem, 6vw, 4.5rem)` | `-0.035em` | `1.05` | Uppercase / 900 |
| **Stage Scramble Title** | `JetBrains Mono` | `clamp(1.75rem, 4vw, 3.75rem)` | `-0.025em` | `1.1` | Uppercase / 800 |
| **Section Title** | `Plus Jakarta Sans` | `2.25rem` (36px) | `-0.02em` | `1.2` | Bold / 700 |
| **Card Heading** | `Plus Jakarta Sans` | `1.125rem` (18px) | `-0.01em` | `1.35` | Bold / 700 |
| **Body Copy** | `Plus Jakarta Sans` | `0.9375rem` (15px) | `0em` | `1.65` | Regular / 400 |
| **Telemetry / Chip** | `JetBrains Mono` | `0.6875rem` (11px) | `+0.08em` | `1.4` | Uppercase / 600 |
| **Micro Badge** | `JetBrains Mono` | `0.5625rem` (9px) | `+0.12em` | `1.2` | Uppercase / 700 |

### 2.3 Subpixel Anti-Aliasing & 3D Layer Rasterization

When elements rotate or tilt in 3D perspective space (via `rotateX`, `rotateY`, or `translateZ`), WebKit and Blink engines often trigger texture filtering artifacts that blur vector typography. The system enforces strict hardware composition rules to lock razor-sharp subpixel rasterization:

```css
/* 3D Hardware Layer Typography Stabilization */
.holo-depth-typography,
.interactive-stage-card h2,
.interactive-stage-card h3,
.interactive-stage-card h4 {
  transform: translateZ(30px);
  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: auto;
  text-rendering: optimizeLegibility;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  contain: layout paint;
}

/* Card Outer Wrapper Stacking Fix */
.preserve-3d-card {
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  perspective: 1200px;
}
```

---

## 3. Component Architecture & Variants

### 3.1 `CyberButton` & `ButterButton` Specification

The button ecosystem features coordinate-reactive radial wipe physics, dual-mode mobile touch fallback, haptic audio triggers, and tactile scale feedback.

```
+-------------------------------------------------------------+
| [bracket-tl]                                                |
|   +-----------------------------------------------------+   |
|   | (Radial Wipe Clip-Path: circle(170% at Xpx Ypx))    |   |
|   |                                                     |   |
|   |  [ICON]   SYSTEM ACTION / DEMO LINK   [ARROW ->]   |   |
|   |                                                     |   |
|   +-----------------------------------------------------+   |
|                                                [bracket-br] |
+-------------------------------------------------------------+
```

#### TypeScript Interface Definition

```typescript
export interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual theme preset */
  variant?: 'purple' | 'cyan' | 'emerald' | 'green' | 'pink' | 'ghost' | 'glass' | 'primary' | 'secondary';
  /** Standard sizing scale */
  size?: 'sm' | 'md' | 'lg' | 'icon';
  /** If provided, renders semantic <a> element instead of <button> */
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  showArrow?: boolean;
  /** Optional custom CSS gradient wipe override */
  butterColor?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
```

#### Coordinate-Reactive Glow & Clip-Path Mechanics

1. **Desktop Pointer Movement:** On `onMouseEnter` / `onMouseMove`, compute cursor offsets relative to `element.getBoundingClientRect()`:
   $$\Delta X = \text{clientX} - \text{rect.left}, \quad \Delta Y = \text{clientY} - \text{rect.top}$$
2. **Transition Wipe Layer:** The pseudo-element `.cyber-button-wipe` animates its `clipPath` from `circle(0% at Xpx Ypx)` to `circle(170% at Xpx Ypx)` with a smooth easing curve `cubic-bezier(0.25, 1, 0.5, 1)` over `0.55s`.
3. **Mobile / Touch Coarse Fallback:** On touch devices (`@media (hover: none), (pointer: coarse)`), the wipe is permanently fixed to `circle(170% at 50% 50%)` to ensure immediate high-visibility vibrancy without broken hover states.

#### Variant Matrix

| Variant | Base Background | Text Color | Wipe Gradient Spectrum | Glow Box-Shadow |
| :--- | :--- | :--- | :--- | :--- |
| `purple` / `primary` | `#180A30` | `#FFFFFF` | `#8B00EE` $\to$ `#A855F7` $\to$ `#38BDF8` | `0 0 22px rgba(139,0,238,0.55)` |
| `cyan` | `#081F33` | `#FFFFFF` | `#00F0FF` $\to$ `#0284C7` $\to$ `#38BDF8` | `0 0 22px rgba(0,240,255,0.55)` |
| `secondary` | `#09152B` | `#FFFFFF` | `#0284C7` $\to$ `#06B6D4` $\to$ `#8B00EE` | `0 0 22px rgba(6,182,212,0.55)` |
| `emerald` / `green` | `#07241A` | `#FFFFFF` | `#00FF9D` $\to$ `#10B981` $\to$ `#059669` | `0 0 22px rgba(16,185,129,0.55)` |
| `pink` | `#2B0A23` | `#FFFFFF` | `#FF0055` $\to$ `#EC4899` $\to$ `#8B00EE` | `0 0 22px rgba(255,0,85,0.55)` |
| `ghost` / `glass` | `#15172C` | `#FFFFFF` | `#8B00EE` $\to$ `#C084FC` | `0 0 18px rgba(168,85,247,0.40)` |

---

### 3.2 Card System & 3D Layer Architecture

To prevent hover-out glitches, perspective clipping, or competing CSS transform rules, 3D cards follow a two-tier nested component structure:

```
[OUTER WRAPPER: Perspective (1200px) + Spring Elevation (Y: -6px, Scale: 1.03)]
   |
   +--> [ROTATIONAL CONTAINER: Physics Spring (rotateX, rotateY via pointer coords)]
           |
           +--> Specular Glare Overlay (mix-blend-overlay, opacity: 0 -> 0.6)
           |
           +--> Ambient Glow Layer (radial blur-lg, -z-10)
           |
           +--> Content Plane [translateZ(20px)]
                   |
                   +-- Badges & Status Pills: [translateZ(32px)]
                   +-- Vector Icons:         [translateZ(38px)]
                   +-- Card Headlines:       [translateZ(46px) + Drop Shadow]
                   +-- Description Copy:     [translateZ(26px)]
```

#### Layer Elevations (`translateZ` Elevation Tokens)

* **Base Card Surface:** `translateZ(0px)`
* **Content Container:** `translateZ(20px)`
* **Body Copy & Subtitles:** `translateZ(26px)`
* **Chips & Telemetry Status Pills:** `translateZ(32px)`
* **Tech Icons & Action Targets:** `translateZ(38px)`
* **Display Headings:** `translateZ(46px)` with `drop-shadow-[0_8px_14px_rgba(0,0,0,0.95)]`

---

## 4. Motion & Animation Physics

### 4.1 GSAP & ScrollTrigger Horizontal Architecture

The horizontal pinned narrative showcase (`#horizontal-showcase-story`) operates via a dual-mode responsive GSAP timeline.

```typescript
// Master MatchMedia Setup for Production Next.js 15
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const mm = gsap.matchMedia();

// DESKTOP PINNED HORIZONTAL SCRUB (>= 1024px)
mm.add('(min-width: 1024px)', () => {
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
        // 4-Stage Calibration Matrix
        if (p < 0.25) setActiveStage(0);
        else if (p < 0.50) setActiveStage(1);
        else if (p < 0.75) setActiveStage(2);
        else setActiveStage(3);
      },
    },
  });

  // Track Translation
  masterTl.to(track, {
    x: () => -getTotalScroll(),
    ease: 'none',
    duration: 10,
  }, 0);

  // Parallax Depth for Floating Cards
  masterTl.fromTo(
    '.interactive-stage-card',
    { y: 25, opacity: 0.8 },
    { y: -5, opacity: 1, stagger: 2, ease: 'power1.out', duration: 3 },
    0.2
  );
});

// MOBILE VERTICAL UNROLLED STACK (< 1024px)
mm.add('(max-width: 1023px)', () => {
  const panels = gsap.utils.toArray<HTMLElement>('.stage-panel');
  panels.forEach((panel, idx) => {
    gsap.fromTo(
      panel,
      { opacity: 0, y: 35 },
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

### 4.2 Interactive Spring Sandbox Physics

The spring sandbox calculates motion using a discretized second-order damped harmonic oscillator differential equation executed on `requestAnimationFrame`:

$$a_x = -k \cdot x - c \cdot v_x$$

$$\text{Where } k = \text{tension} \times 0.0008, \quad c = \text{damping} \times 0.04$$

```typescript
// Damped Harmonic Oscillator Loop
const animateSpring = () => {
  const ax = -tension * 0.0008 * x - damping * 0.04 * vx;
  const ay = -tension * 0.0008 * y - damping * 0.04 * vy;
  vx += ax;
  vy += ay;
  x += vx;
  y += vy;

  if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1 && Math.abs(vx) < 0.1 && Math.abs(vy) < 0.1) {
    setBallOffset({ x: 0, y: 0 });
  } else {
    setBallOffset({ x, y });
    requestAnimationFrame(animateSpring);
  }
};
```

#### Calibrated Preset Parameters

| Preset Name | Tension ($k$) | Damping ($c$) | Feel & User Experience |
| :--- | :--- | :--- | :--- |
| **Snappy** *(Default)* | `360` | `26` | High responsiveness, crisp snap, minimal oscillation |
| **Liquid** | `180` | `16` | Fluid, organic, gentle viscous deceleration |
| **Elastic** | `450` | `12` | High-energy rubbery recoil with noticeable bounce |
| **Inertia** | `240` | `35` | Heavy, high-viscosity resistance for tactile controls |

---

## 5. Data Contracts & Content Tone

### 5.1 Persona & Voice Blueprint

* **Identity:** Authentic solo creative engineer, 3D WebGL artist, and full-stack systems architect (Ahsan / Anorent Studio).
* **Pronoun Policy:** Strictly first-person singular (**"I build"**, **"My studio"**, **"Direct collaboration with me"**). Never use fake agency collectives ("we are a global team of 500 gurus").
* **Core Value Proposition:** Fast, un-bloated, bespoke digital experiences combining Next.js 15, WebGL GLSL shaders, and hardware-accelerated micro-interactions. No WordPress themes, no junior handoffs, no middle management.

### 5.2 Pre-Qualified Pricing Copy Guidelines

All project pricing contracts and scope descriptions must be transparently pre-qualified to filter non-serious inquiries and set clear expectations:

```markdown
> "Custom builds starting at $1,000. Typical turnarounds range from 1 to 3 weeks depending on 3D/shader complexity. You receive daily asynchronous progress updates, working staging links, and direct communication throughout."
```

* **Tier 1 (Rapid Landing / 3D Asset Site):** Starting at $1,000 – $2,500
* **Tier 2 (Full-Stack SaaS / Custom WebGL Engine):** Starting at $2,500 – $6,000+
* **Retainer & Architecture Advisory:** $125 / hr or weekly sprint packages.

### 5.3 Transparent Trust Guarantees & Escrow Policy

1. **Milestone Escrow Protection:**
   Funds remain protected under milestone escrow (via Fiverr Pro or verified escrow contracts). Releases occur only when the client interacts with and signs off on live staging deployments.
2. **100% Intellectual Property & Code Ownership:**
   Zero vendor lock-in. Full private GitHub repository transfer, commercial license grant, and complete IP transfer upon final milestone completion.
3. **Direct Zero-Intermediary Communication:**
   Direct async access via Email, WhatsApp, and private Loom recordings. 1–2 hour typical response window during active sprint phases.
4. **30-Day Production Warranty:**
   Every custom deployment includes 30 days of post-launch performance monitoring, bug resolution, and Lighthouse 95+ certification.

---

## 6. Implementation Checklist & Verification

- [x] All base canvas fills use `#050508` or `#080514` with zero pure `#000000` clipping.
- [x] 3D Card typography contains `[transform:translateZ(30px)]` and `[backface-visibility:hidden]` for hardware subpixel rendering.
- [x] Hover-out glitch prevention is enforced by isolating pointer physics springs from outer scale/elevation transitions.
- [x] All buttons implement `ButterButton` / `CyberButton` touch fallbacks for zero hover defects on mobile.
- [x] GSAP ScrollTrigger utilizes `gsap.matchMedia()` with a 1024px breakpoint to switch between desktop pinned horizontal translation and mobile vertical unrolled cards.
- [x] Pre-qualified pricing ($1,000+) and first-person authentic developer copy are synchronized across all FAQ, About, and Contact entrypoints.

---
*Authored by Principal Design Systems Architect // Anorent Studio Specification 2026*
