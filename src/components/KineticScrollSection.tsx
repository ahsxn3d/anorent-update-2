'use client';

import React, { useRef, useEffect, useState } from 'react';

import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Activity, Sparkles, Box, Cpu, ArrowRight } from 'lucide-react';

export const KineticScrollSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxDistance, setMaxDistance] = useState(4200);
  const [progressPercent, setProgressPercent] = useState(0);

  // Exact pixel measurement of horizontal track vs viewport width
  useEffect(() => {
    const updateMeasurement = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Total distance needed so the final section is fully in view with comfortable right margin
        const calculatedDistance = Math.max(0, trackWidth - viewportWidth + 140);
        setMaxDistance(calculatedDistance);
      }
    };

    updateMeasurement();
    const t1 = setTimeout(updateMeasurement, 150);
    const t2 = setTimeout(updateMeasurement, 600);
    const t3 = setTimeout(updateMeasurement, 1200);

    window.addEventListener('resize', updateMeasurement);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('resize', updateMeasurement);
    };
  }, []);

  // Motion hardware-accelerated scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Spring momentum physics for buttery fluid kinetic scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    mass: 0.5,
    restDelta: 0.0001,
  });

  // Horizontal X translation from 0 to -maxDistance px
  const x = useTransform(smoothProgress, [0, 1], [0, -maxDistance]);

  // ================= SCROLL-LINKED STAGE ANIMATIONS =================
  
  // Stage 1 (0.00 -> 0.25): Intro 3D Objects & Badges
  const s1TorusRotate = useTransform(smoothProgress, [0, 0.3], [0, 180]);
  const s1CloverScale = useTransform(smoothProgress, [0, 0.25], [1, 1.25]);
  const s1CloverRotate = useTransform(smoothProgress, [0, 0.3], [0, 45]);
  const s1DomeY = useTransform(smoothProgress, [0, 0.25], [0, 30]);

  // Stage 2 (0.15 -> 0.48): "Add Personality" & Tumbling Letters
  const s2TextOpacity = useTransform(smoothProgress, [0.12, 0.22, 0.5], [0.3, 1, 0.8]);
  const s2Scale = useTransform(smoothProgress, [0.12, 0.25], [0.92, 1]);
  
  // Tumbling letters individually timed to drop into place on scroll
  const letterS_Y = useTransform(smoothProgress, [0.15, 0.32], [-40, 24]);
  const letterS_Rot = useTransform(smoothProgress, [0.15, 0.32], [-45, -15]);

  const letterO_Y = useTransform(smoothProgress, [0.18, 0.34], [-60, 0]);
  const letterO_Rot = useTransform(smoothProgress, [0.18, 0.34], [-20, 12]);
  const rockStickerScale = useTransform(smoothProgress, [0.20, 0.35], [0, 1]);
  const rockStickerRot = useTransform(smoothProgress, [0.20, 0.35], [-30, 12]);

  const letterN_Y = useTransform(smoothProgress, [0.20, 0.36], [-50, 35]);
  const letterN_Rot = useTransform(smoothProgress, [0.20, 0.36], [30, -18]);

  const letterA_Y = useTransform(smoothProgress, [0.22, 0.38], [-40, 10]);
  const letterA_Rot = useTransform(smoothProgress, [0.22, 0.38], [-25, 20]);

  const letterL_Y = useTransform(smoothProgress, [0.24, 0.40], [-60, -8]);
  const letterL_Rot = useTransform(smoothProgress, [0.24, 0.40], [20, -10]);

  const letterI_Y = useTransform(smoothProgress, [0.26, 0.42], [-50, 30]);
  const letterI_Rot = useTransform(smoothProgress, [0.26, 0.42], [-30, 25]);

  const letterT_Y = useTransform(smoothProgress, [0.28, 0.44], [-40, -12]);
  const letterT_Rot = useTransform(smoothProgress, [0.28, 0.44], [15, -15]);

  const letterY_Y = useTransform(smoothProgress, [0.30, 0.46], [-55, 28]);
  const letterY_Rot = useTransform(smoothProgress, [0.30, 0.46], [-20, 18]);

  const starRotate = useTransform(smoothProgress, [0.2, 0.55], [0, 360]);

  // Stage 3 (0.38 -> 0.70): "Super Plug" & SVG Bézier Curves
  const s3SuperScale = useTransform(smoothProgress, [0.36, 0.48], [0.8, 1.05]);
  const s3SuperRot = useTransform(smoothProgress, [0.36, 0.48], [-12, -3]);
  const s3PlugScale = useTransform(smoothProgress, [0.40, 0.52], [0.8, 1]);
  const s3PlugRot = useTransform(smoothProgress, [0.40, 0.52], [15, 2]);

  // SVG Bézier float and handle animations
  const bezierFloat1 = useTransform(smoothProgress, [0.42, 0.65], [-12, 12]);
  const bezierHandle1_CX = useTransform(smoothProgress, [0.42, 0.62], [50, 70]);
  const bezierHandle2_CX = useTransform(smoothProgress, [0.42, 0.62], [150, 130]);

  // Tumbling letters for 'curves'
  const curve_C_Y = useTransform(smoothProgress, [0.45, 0.62], [-30, 20]);
  const curve_C_Rot = useTransform(smoothProgress, [0.45, 0.62], [-30, -15]);

  const curve_U_Y = useTransform(smoothProgress, [0.47, 0.64], [-40, -5]);
  const curve_U_Rot = useTransform(smoothProgress, [0.47, 0.64], [25, 12]);

  const curve_R_Y = useTransform(smoothProgress, [0.49, 0.66], [-35, 18]);
  const curve_R_Rot = useTransform(smoothProgress, [0.49, 0.66], [-20, -10]);

  const curve_V_Y = useTransform(smoothProgress, [0.51, 0.68], [-45, -12]);
  const curve_V_Rot = useTransform(smoothProgress, [0.51, 0.68], [30, 20]);

  const curve_E_Y = useTransform(smoothProgress, [0.53, 0.70], [-30, 15]);
  const curve_E_Rot = useTransform(smoothProgress, [0.53, 0.70], [-15, -8]);

  const curve_S_Y = useTransform(smoothProgress, [0.55, 0.72], [-40, 25]);
  const curve_S_Rot = useTransform(smoothProgress, [0.55, 0.72], [20, 16]);

  const bezierFloat2 = useTransform(smoothProgress, [0.50, 0.72], [10, -10]);

  // Stage 4 (0.62 -> 0.88): "Choreograph animation sequences in a snap"
  const s4ChoreoScale = useTransform(smoothProgress, [0.60, 0.75], [0.85, 1]);
  const s4ChoreoRot = useTransform(smoothProgress, [0.60, 0.75], [-8, -2]);

  const s4AnimScale = useTransform(smoothProgress, [0.64, 0.78], [0.85, 1]);
  const s4AnimRot = useTransform(smoothProgress, [0.64, 0.78], [8, 2]);

  const s4SeqScale = useTransform(smoothProgress, [0.68, 0.82], [0.85, 1]);
  const diamondRot = useTransform(smoothProgress, [0.65, 0.90], [45, 315]);
  const diamondScale = useTransform(smoothProgress, [0.65, 0.85], [0.8, 1.15]);

  // Stage 5 (0.80 -> 1.00): ANORENT Studio Tools Showcase
  const s5ArchScale = useTransform(smoothProgress, [0.80, 0.98], [0.85, 1.05]);
  const s5Card1X = useTransform(smoothProgress, [0.82, 1.00], [40, 0]);
  const s5Card2X = useTransform(smoothProgress, [0.85, 1.00], [60, 0]);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setProgressPercent(Math.round(Math.min(Math.max(latest, 0), 1) * 100));
    });
  }, [scrollYProgress]);

  return (
    <section
      ref={containerRef}
      className="relative h-[420vh] sm:h-[460vh] bg-[#02050B] text-white select-none w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] my-12 overflow-visible"
    >
      {/* Sticky Viewport Window (Locks to top for full duration of scroll) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center border-y border-cyan-500/20 bg-[radial-gradient(ellipse_90%_70%_at_50%_50%,#071328_0%,#02050B_100%)] shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]">
        
        {/* Ambient Cyber Grid Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#00f0ff15_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff15_1px,transparent_1px)] bg-[size:4rem_4rem]" 
        />

        {/* Ambient Top & Bottom Glows */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent pointer-events-none" />

        {/* Top HUD Telemetry Bar */}
        <div className="absolute top-4 sm:top-7 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between pointer-events-none z-30">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 font-mono text-xs backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.25)]">
            <Activity className="w-3.5 h-3.5 animate-spin" />
            <span className="font-bold tracking-wider text-[10px] sm:text-xs uppercase">
              GSAP KINEMATIC SHOWCASE // SCROLL TO EXPAND
            </span>
          </div>

          <div className="font-mono text-xs text-slate-400 flex items-center gap-3">
            <span className="hidden sm:inline text-[11px] font-bold tracking-wider text-slate-300">
              FRAME: 01 // KINETIC NARRATIVE
            </span>
            <div className="w-24 sm:w-36 h-2 bg-slate-900 rounded-full overflow-hidden border border-cyan-500/40 p-0.5">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00F0FF] via-[#7000FF] to-[#FF0055] rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-cyan-400 font-bold text-xs w-10 text-right">{progressPercent}%</span>
          </div>
        </div>

        {/* Massive Horizontal Kinetic Track (Hardware Accelerated) */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-center will-change-transform pl-8 sm:pl-16 md:pl-24 pr-36 py-8"
        >

          {/* ================= STAGE 1: INTRO (ANIMATE ANYTHING + 3D CLUSTER) ================= */}
          <div className="flex-shrink-0 flex items-center gap-10 lg:gap-16 mr-20 sm:mr-32 min-w-[85vw] sm:min-w-[70vw] lg:min-w-[60vw]">
            
            {/* Left: Badges & Narrative Copy */}
            <div className="space-y-5 max-w-xl">
              <div className="flex flex-wrap items-center gap-3">
                <div className="px-5 py-2 rounded-2xl bg-[#D8B4FE] text-[#2E1065] text-lg sm:text-2xl font-black shadow-[0_0_30px_rgba(216,180,254,0.5)] border border-purple-200/60">
                  Animate Anything
                </div>
                <div className="px-5 py-2 rounded-2xl bg-[#FB923C] text-black text-lg sm:text-2xl font-black rotate-1 shadow-[0_0_30px_rgba(251,146,60,0.5)] border border-orange-200/60">
                  That&apos;s right, Anything
                </div>
              </div>

              <p className="text-lg sm:text-2xl lg:text-3xl text-slate-100 font-medium leading-relaxed tracking-tight">
                Whether you&apos;re animating UI, SVG or creating immersive WebGL experiences, ANORENT has your back.
              </p>
            </div>

            {/* Right: 3D Spatial Geometry Cluster */}
            <div className="relative w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 flex items-center justify-center flex-shrink-0">
              
              {/* 3D Torus Donut Ring */}
              <motion.div
                style={{ rotate: s1TorusRotate }}
                className="absolute top-2 left-4 w-20 sm:w-24 h-20 sm:h-24 rounded-full border-[14px] sm:border-[18px] border-cyan-400 border-t-[#C084FC] border-r-[#7000FF] shadow-[0_0_40px_rgba(0,240,255,0.6)]"
              />

              {/* 3D Hourglass / Rhombus Prism */}
              <div className="absolute left-8 bottom-12 flex flex-col items-center">
                <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[24px] border-b-[#A855F7] filter drop-shadow-[0_0_15px_#A855F7]" />
                <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[24px] border-t-[#7000FF] filter drop-shadow-[0_0_15px_#7000FF]" />
              </div>

              {/* 3D 4-Petal Clover Sphere (Magenta to Lilac) */}
              <motion.div
                style={{ scale: s1CloverScale, rotate: s1CloverRotate }}
                className="absolute top-8 right-4 w-28 sm:w-36 h-28 sm:h-36 flex items-center justify-center filter drop-shadow-[0_0_35px_rgba(255,0,85,0.7)]"
              >
                <div className="relative w-24 sm:w-32 h-24 sm:h-32">
                  <div className="absolute inset-0 m-auto w-14 sm:w-18 h-24 sm:h-32 bg-gradient-to-b from-[#FF0055] via-[#C084FC] to-[#7000FF] rounded-full" />
                  <div className="absolute inset-0 m-auto w-24 sm:w-32 h-14 sm:h-18 bg-gradient-to-r from-[#FF0055] via-[#C084FC] to-[#7000FF] rounded-full" />
                </div>
              </motion.div>

              {/* Glowing Emerald Green Hemisphere Dome */}
              <motion.div
                style={{ y: s1DomeY }}
                className="absolute -bottom-3 right-8 w-36 sm:w-44 h-20 sm:h-24 bg-gradient-to-t from-[#00FF9D] to-[#10B981] rounded-t-full shadow-[0_0_50px_rgba(0,255,157,0.7)] border-t border-emerald-200"
              />

              {/* Neon Green 3D Pill Asset on Right Edge */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 sm:w-12 h-24 sm:h-28 bg-gradient-to-b from-[#00FF9D] to-[#059669] rounded-2xl rotate-12 shadow-[0_0_30px_rgba(0,255,157,0.6)]" />
            </div>

          </div>

          {/* ================= STAGE 2: "ADD PERSONALITY" WITH TUMBLING PHYSICS LETTERS ================= */}
          <motion.div 
            style={{ opacity: s2TextOpacity, scale: s2Scale }}
            className="flex-shrink-0 flex items-center gap-6 sm:gap-10 whitespace-nowrap mr-20 sm:mr-32"
          >
            
            {/* Stacked Pills: [Easy] [Easing] */}
            <div className="flex flex-col gap-2 -rotate-6">
              <span className="px-4 py-1.5 rounded-full bg-[#E9D5FF] text-[#581C87] text-lg sm:text-2xl font-black shadow-lg">
                Easy
              </span>
              <span className="px-4 py-1.5 rounded-full bg-[#F472B6] text-[#831843] text-lg sm:text-2xl font-black -rotate-3 shadow-lg">
                Easing
              </span>
            </div>

            {/* Giant Text: "Add per" */}
            <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white font-mono">
              Add per
            </span>

            {/* Tumbling Physics Letters for "s-o-n-a-l-i-t-y" */}
            <div className="relative inline-flex items-baseline text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-mono">
              
              {/* 's' */}
              <motion.span
                style={{ y: letterS_Y, rotate: letterS_Rot }}
                className="inline-block text-[#C084FC] drop-shadow-[0_0_20px_#C084FC]"
              >
                s
              </motion.span>

              {/* 'o' with rock gesture sticker floating above */}
              <div className="relative inline-block mx-0.5">
                <motion.span
                  style={{ y: letterO_Y, rotate: letterO_Rot }}
                  className="inline-block text-white"
                >
                  o
                </motion.span>
                {/* 🤘 Rock-on Hand Sign Sticker Badge */}
                <motion.div
                  style={{ scale: rockStickerScale, rotate: rockStickerRot }}
                  className="absolute -top-14 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-2xl bg-[#081226] border-2 border-purple-400 text-2xl sm:text-3xl shadow-[0_0_25px_rgba(168,85,247,0.7)] pointer-events-none"
                >
                  🤘
                </motion.div>
              </div>

              {/* 'n' */}
              <motion.span
                style={{ y: letterN_Y, rotate: letterN_Rot }}
                className="inline-block text-slate-300 mx-0.5"
              >
                n
              </motion.span>

              {/* 'a' */}
              <motion.span
                style={{ y: letterA_Y, rotate: letterA_Rot }}
                className="inline-block text-[#00FF9D] mx-0.5"
              >
                a
              </motion.span>

              {/* 'l' */}
              <motion.span
                style={{ y: letterL_Y, rotate: letterL_Rot }}
                className="inline-block text-white mx-0.5"
              >
                l
              </motion.span>

              {/* 'i' */}
              <motion.span
                style={{ y: letterI_Y, rotate: letterI_Rot }}
                className="inline-block text-[#38BDF8] mx-0.5"
              >
                i
              </motion.span>

              {/* 't' */}
              <motion.span
                style={{ y: letterT_Y, rotate: letterT_Rot }}
                className="inline-block text-white mx-0.5"
              >
                t
              </motion.span>

              {/* 'y' */}
              <motion.span
                style={{ y: letterY_Y, rotate: letterY_Rot }}
                className="inline-block text-[#FF0055] mx-0.5"
              >
                y
              </motion.span>
            </div>

            {/* Next text block */}
            <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white font-mono pl-4">
              to your animations
            </span>

            <span className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-400 font-mono">
              with a huge variety
            </span>

            {/* Glowing 8-Point Asterisk Star Icon */}
            <div className="relative flex items-center justify-center">
              <motion.div
                style={{ rotate: starRotate }}
                className="text-5xl sm:text-7xl text-[#FDA4AF] filter drop-shadow-[0_0_25px_#FDA4AF] font-serif"
              >
                ✱
              </motion.div>
              <span className="text-3xl sm:text-5xl font-black text-slate-400 ml-2 font-mono">
                of
              </span>
            </div>

          </motion.div>

          {/* ================= STAGE 3: "SUPER PLUG EASES & CUSTOM SVG CURVES" ================= */}
          <div className="flex-shrink-0 flex items-center gap-6 sm:gap-10 whitespace-nowrap mr-20 sm:mr-32">
            
            {/* [Super] Lime Green Capsule */}
            <motion.div
              style={{ scale: s3SuperScale, rotate: s3SuperRot }}
              className="px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-3xl bg-[#00FF9D] text-black text-3xl sm:text-5xl font-black shadow-[0_0_45px_rgba(0,255,157,0.75)] border-2 border-emerald-200"
            >
              Super
            </motion.div>

            {/* [Plug] Violet Capsule */}
            <motion.div
              style={{ scale: s3PlugScale, rotate: s3PlugRot }}
              className="px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-3xl bg-[#C084FC] text-[#2E1065] text-3xl sm:text-5xl font-black shadow-[0_0_40px_rgba(192,132,252,0.7)] border-2 border-purple-200"
            >
              Plug
            </motion.div>

            <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white font-mono">
              eases, or
            </span>

            {/* Interactive SVG Bézier Curve Handle (Ease In/Out Diagram) */}
            <motion.div
              style={{ y: bezierFloat1 }}
              className="relative w-52 sm:w-64 h-32 sm:h-40 bg-[#081226]/90 border-2 border-cyan-500/50 rounded-3xl p-3 backdrop-blur-xl flex items-center justify-center shadow-[0_0_35px_rgba(0,240,255,0.3)]"
            >
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 120">
                {/* Dashed tangent lines */}
                <line x1="20" y1="100" x2="65" y2="100" stroke="#00F0FF" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="180" y1="20" x2="135" y2="20" stroke="#00F0FF" strokeWidth="2" strokeDasharray="3 3" />
                
                {/* S-Curve Bézier Line */}
                <path
                  d="M 20 100 C 85 100, 115 20, 180 20"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="4"
                  className="filter drop-shadow-[0_0_10px_#FFFFFF]"
                />

                {/* Animated tangent control handles */}
                <motion.circle cx={bezierHandle1_CX} cy="100" r="7" className="fill-[#00FF9D] stroke-[#FFFFFF] stroke-2" />
                <motion.circle cx={bezierHandle2_CX} cy="20" r="7" className="fill-[#00FF9D] stroke-[#FFFFFF] stroke-2" />
                
                {/* Endpoints */}
                <rect x="13" y="93" width="14" height="14" rx="3" className="fill-[#00F0FF] stroke-[#FFFFFF]" />
                <rect x="173" y="13" width="14" height="14" rx="3" className="fill-[#00F0FF] stroke-[#FFFFFF]" />
              </svg>
              <span className="absolute -bottom-3 px-3 py-0.5 rounded-full bg-cyan-950 border border-cyan-500 text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
                GLSL Cubic Bézier
              </span>
            </motion.div>

            {/* "build your own" */}
            <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white font-mono pl-4">
              build your own
            </span>

            {/* Tumbling letters for 'curves' */}
            <div className="relative inline-flex items-baseline text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-mono">
              <motion.span style={{ y: curve_C_Y, rotate: curve_C_Rot }} className="inline-block text-[#C084FC]">
                c
              </motion.span>
              <motion.span style={{ y: curve_U_Y, rotate: curve_U_Rot }} className="inline-block text-white">
                u
              </motion.span>
              <motion.span style={{ y: curve_R_Y, rotate: curve_R_Rot }} className="inline-block text-[#FF0055]">
                r
              </motion.span>
              <motion.span style={{ y: curve_V_Y, rotate: curve_V_Rot }} className="inline-block text-[#00FF9D]">
                v
              </motion.span>
              <motion.span style={{ y: curve_E_Y, rotate: curve_E_Rot }} className="inline-block text-slate-300">
                e
              </motion.span>
              <motion.span style={{ y: curve_S_Y, rotate: curve_S_Rot }} className="inline-block text-[#38BDF8]">
                s
              </motion.span>
            </div>

            {/* Second Bézier Diagram (Elastic Physics) */}
            <motion.div
              style={{ y: bezierFloat2 }}
              className="relative w-52 sm:w-64 h-32 sm:h-40 bg-[#081226]/90 border-2 border-purple-500/50 rounded-3xl p-3 backdrop-blur-xl flex items-center justify-center shadow-[0_0_35px_rgba(168,85,247,0.3)]"
            >
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 120">
                <path
                  d="M 20 20 C 30 105, 170 105, 180 20"
                  fill="none"
                  stroke="#C084FC"
                  strokeWidth="4"
                  className="filter drop-shadow-[0_0_10px_#C084FC]"
                />
                <line x1="20" y1="20" x2="20" y2="85" stroke="#7000FF" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="180" y1="20" x2="180" y2="85" stroke="#7000FF" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="20" cy="85" r="7" className="fill-[#00FF9D] stroke-[#FFFFFF]" />
                <circle cx="180" cy="85" r="7" className="fill-[#00FF9D] stroke-[#FFFFFF]" />
                <rect x="13" y="13" width="14" height="14" rx="3" className="fill-[#FF0055] stroke-[#FFFFFF]" />
                <rect x="173" y="13" width="14" height="14" rx="3" className="fill-[#FF0055] stroke-[#FFFFFF]" />
              </svg>
              <span className="absolute -bottom-3 px-3 py-0.5 rounded-full bg-purple-950 border border-purple-500 text-[10px] font-mono text-purple-300 font-bold uppercase tracking-wider">
                Elastic Physics
              </span>
            </motion.div>

          </div>

          {/* ================= STAGE 4: "CHOREOGRAPH ANIMATION SEQUENCES IN A SNAP" ================= */}
          <div className="flex-shrink-0 flex items-center gap-6 sm:gap-10 whitespace-nowrap mr-20 sm:mr-32">
            
            {/* [Choreograph] Pink Capsule */}
            <motion.div
              style={{ scale: s4ChoreoScale, rotate: s4ChoreoRot }}
              className="px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-3xl bg-[#FF0055] text-white text-3xl sm:text-5xl font-black shadow-[0_0_45px_rgba(255,0,85,0.7)] border-2 border-pink-300"
            >
              Choreograph
            </motion.div>

            {/* [animation] Lime Green Capsule */}
            <motion.div
              style={{ scale: s4AnimScale, rotate: s4AnimRot }}
              className="px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-3xl bg-[#00FF9D] text-black text-3xl sm:text-5xl font-black shadow-[0_0_45px_rgba(0,255,157,0.75)] border-2 border-emerald-200"
            >
              animation
            </motion.div>

            {/* [sequences in a] Orange Capsule */}
            <motion.div
              style={{ scale: s4SeqScale }}
              className="px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-3xl bg-[#FB923C] text-black text-3xl sm:text-5xl font-black shadow-[0_0_40px_rgba(251,146,60,0.7)] border-2 border-orange-200"
            >
              sequences in a
            </motion.div>

            {/* 3D Glowing Rhombus Diamond Prism */}
            <motion.div
              style={{ rotate: diamondRot, scale: diamondScale }}
              className="w-14 sm:w-18 h-14 sm:h-18 bg-gradient-to-tr from-[#7000FF] via-[#C084FC] to-[#00F0FF] rounded-2xl shadow-[0_0_35px_rgba(192,132,252,0.8)] border-2 border-white/60 mx-2"
            />

            {/* Text: "snap" */}
            <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white font-mono">
              snap
            </span>

          </div>

          {/* ================= STAGE 5: FINAL STUDIO TOOLS SHOWCASE ================= */}
          <div className="flex-shrink-0 flex items-center gap-8 sm:gap-12 whitespace-nowrap">
            
            {/* Bracket Tag: { ANORENT® Tools } */}
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono text-xs sm:text-sm font-bold uppercase tracking-widest shadow-md">
                <span>{`{ ANORENT® Tools }`}</span>
              </div>
              <h3 className="text-3xl sm:text-5xl font-black text-white font-mono">
                Spatial Engine
              </h3>
            </div>

            {/* 3D Gradient Arch Shape */}
            <motion.div 
              style={{ scale: s5ArchScale }}
              className="relative w-32 sm:w-40 h-44 sm:h-52 flex items-center justify-center flex-shrink-0"
            >
              <div className="w-full h-full rounded-t-full bg-gradient-to-b from-[#C084FC] via-[#38BDF8] to-[#02050B] p-3 shadow-[0_0_50px_rgba(56,189,248,0.5)] border-t-2 border-cyan-200">
                <div className="w-full h-full rounded-t-full bg-[#081226] flex items-center justify-center">
                  <Sparkles className="w-8 sm:w-10 h-8 sm:h-10 text-cyan-400 animate-pulse" />
                </div>
              </div>
            </motion.div>

            {/* Feature Card 1: Silky Smooth Storytelling */}
            <motion.div
              style={{ x: s5Card1X }}
              className="p-6 sm:p-7 rounded-3xl bg-[#081226]/90 border-2 border-purple-500/40 backdrop-blur-xl shadow-[0_0_40px_rgba(139,0,238,0.3)] w-72 sm:w-88 space-y-2.5"
            >
              <span className="px-3 py-1 rounded-full bg-[#C084FC]/20 text-[#C084FC] text-[11px] font-mono font-bold uppercase">
                Scroll Kinetics
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-white">Silky Smooth Storytelling</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                Transform complex narratives into seamless, high-framerate horizontal and spatial experiences.
              </p>
            </motion.div>

            {/* Feature Card 2: GPU Shaders */}
            <motion.div
              style={{ x: s5Card2X }}
              className="p-6 sm:p-7 rounded-3xl bg-[#081226]/90 border-2 border-cyan-500/40 backdrop-blur-xl shadow-[0_0_40px_rgba(0,240,255,0.3)] w-72 sm:w-88 space-y-2.5"
            >
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-[11px] font-mono font-bold uppercase">
                SVG & Shaders
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-white">GPU-Accelerated Shaders</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                Move, morph, and deform vector geometry with raw GLSL shaders and zero frame-drops.
              </p>
            </motion.div>

          </div>

        </motion.div>

        {/* Bottom Subtitle Indicator */}
        <div className="absolute bottom-4 sm:bottom-7 left-4 sm:left-8 right-4 sm:right-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 pointer-events-none z-30 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[11px] font-bold text-cyan-300 tracking-wider">
              AESTHETICS MEETS GSAP-GRADE FULL-STACK INFRASTRUCTURE
            </span>
          </div>
          <div className="text-slate-500 font-bold uppercase tracking-widest text-[10px] sm:text-xs">
            ANORENT STUDIO // CRAFTED BY AHSAN
          </div>
        </div>

      </div>
    </section>
  );
};

export default KineticScrollSection;
