'use client';

import React, { useState, useEffect } from 'react';

import { motion } from 'motion/react';
import { Clock, Layers, Globe, Star, ShieldCheck, CheckCircle2, Award, Check } from 'lucide-react';
import { Page } from '../types';
import { sound } from '../utils/audio';

interface AboutStatsMatrixProps {
  setCurrentPage?: (page: Page) => void;
}

export const AboutStatsMatrix: React.FC<AboutStatsMatrixProps> = ({ setCurrentPage }) => {
  // 12 Curated deployments distribution across real categories
  const categoryBreakdown = [
    { name: 'UI Templates', count: 3, pct: 25, color: '#8B00EE' },
    { name: 'Full-Stack Apps', count: 3, pct: 25, color: '#06B6D4' },
    { name: 'Animated Sites', count: 3, pct: 25, color: '#EC4899' },
    { name: 'SaaS Dashboards', count: 3, pct: 25, color: '#10B981' },
  ];

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format UTC+5 time for live response availability
  const utc5Time = new Date(time.getTime() + (time.getTimezoneOffset() * 60000) + (5 * 3600000));
  const currentHour = utc5Time.getHours();
  const currentMinute = utc5Time.getMinutes();
  const currentSeconds = utc5Time.getSeconds();
  const formattedUtc5 = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}:${currentSeconds.toString().padStart(2, '0')}`;

  // Calculate clock hand angles
  const secondAngle = currentSeconds * 6; // 360 / 60
  const minuteAngle = currentMinute * 6 + currentSeconds * 0.1;
  const hourAngle = (currentHour % 12) * 30 + currentMinute * 0.5;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. CURATED DEPLOYMENTS (12+) - INTERACTIVE CATEGORY GRAPH */}
      {/* ------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-3.5 sm:p-6 bg-[#131422]/95 backdrop-blur-2xl rounded-xl sm:rounded-3xl border border-purple-400/50 sm:border-purple-500/30 shadow-[0_0_20px_rgba(139,0,238,0.2)] sm:shadow-2xl hover:border-purple-400/80 transition-all flex flex-col justify-between space-y-3 sm:space-y-4 group"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
            <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-[#8B00EE]/20 border border-[#8B00EE]/40 text-[#C084FC] shrink-0">
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-purple-300 block">
                Curated Systems
              </span>
              <h3 className="font-display font-black text-sm sm:text-xl md:text-2xl text-white leading-tight">
                12+ <span className="text-xs sm:text-base font-semibold text-slate-300">Deployments</span>
              </h3>
            </div>
          </div>

          <span className="px-2 py-0.5 sm:py-1 bg-purple-500/15 border border-purple-400/30 text-purple-200 text-[8px] sm:text-[10px] font-mono font-bold rounded-full flex items-center gap-1 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="whitespace-nowrap">Open-Source Tools</span>
          </span>
        </div>

        <p className="text-[11px] sm:text-xs text-slate-300 font-medium leading-relaxed">
          Curated Deployments & Open-Source Tools built with production-grade Next.js, WebGL shaders, and clean React code.
        </p>

        {/* Segmented Distribution Line Graph */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[8px] sm:text-[10px] font-mono text-slate-400">
            <span>SHOWCASE ARCHITECTURE</span>
            <span className="text-[#C084FC] font-bold">4 Categories</span>
          </div>

          <div className="h-2.5 w-full rounded-full bg-[#0A0B14] p-0.5 border border-purple-500/30 flex overflow-hidden gap-0.5 sm:gap-1">
            {categoryBreakdown.map((cat, idx) => (
              <motion.div
                key={cat.name}
                initial={{ width: 0 }}
                whileInView={{ width: `${cat.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + idx * 0.1, ease: 'easeOut' }}
                onMouseEnter={() => setActiveCategory(cat.name)}
                onMouseLeave={() => setActiveCategory(null)}
                style={{ backgroundColor: cat.color }}
                className={`h-full rounded-full transition-all duration-300 cursor-pointer ${
                  activeCategory && activeCategory !== cat.name ? 'opacity-40' : 'opacity-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Category Breakdown Badges List */}
        <div className="grid grid-cols-2 gap-1 sm:gap-2 pt-0.5">
          {categoryBreakdown.map((cat) => {
            const isHovered = activeCategory === cat.name;
            return (
              <div
                key={cat.name}
                onMouseEnter={() => setActiveCategory(cat.name)}
                onMouseLeave={() => setActiveCategory(null)}
                onClick={() => {
                  sound.playClick();
                  if (setCurrentPage) {
                    setCurrentPage('deployments');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isHovered
                    ? 'bg-[#1e1438] border-purple-400 shadow-md'
                    : 'bg-[#0A0B14]/80 border-purple-500/20 hover:border-purple-400/50'
                }`}
              >
                <div className="flex items-center gap-1 sm:gap-1.5 truncate">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-[9px] sm:text-xs font-semibold text-slate-200 truncate">
                    {cat.name}
                  </span>
                </div>
                <span
                  className="text-[8px] sm:text-[10px] font-mono font-bold px-1 py-0.2 rounded bg-black/50 border border-white/10"
                  style={{ color: cat.color }}
                >
                  {cat.count}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ------------------------------------------------------------- */}
      {/* 2. CLIENT SATISFACTION & VERIFIED PERFORMANCE (99.9% / 5.0) */}
      {/* ------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="p-3.5 sm:p-6 bg-[#131422]/95 backdrop-blur-2xl rounded-xl sm:rounded-3xl border border-purple-400/50 sm:border-purple-500/30 shadow-[0_0_20px_rgba(139,0,238,0.2)] sm:shadow-2xl hover:border-purple-400/80 transition-all flex flex-col justify-between space-y-3 sm:space-y-4 group"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
            <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 shrink-0">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 block">
                Client Satisfaction
              </span>
              <h3 className="font-display font-black text-sm sm:text-xl md:text-2xl text-white leading-tight">
                99.9% <span className="text-xs sm:text-base font-semibold text-amber-300 font-mono">5.0 ★</span>
              </h3>
            </div>
          </div>

          <span className="px-2 py-0.5 sm:py-1 bg-amber-500/15 border border-amber-400/30 text-amber-300 text-[8px] sm:text-[10px] font-mono font-bold rounded-full flex items-center gap-1 shrink-0">
            <Award className="w-2.5 h-2.5" />
            <span className="whitespace-nowrap">Top Rated</span>
          </span>
        </div>

        <p className="text-[11px] sm:text-xs text-slate-300 font-medium leading-relaxed">
          Excellence across custom engineering, smooth 60 FPS GPU rendering, on-time delivery, and clean production handovers.
        </p>

        {/* SLA & Performance Metric Bars with Staggered Motion */}
        <div className="space-y-2 pt-0.5">
          <div>
            <div className="flex justify-between text-[8px] sm:text-[10px] font-mono text-slate-300 mb-1">
              <span>Code Quality & Architecture</span>
              <span className="text-emerald-400 font-bold">100% Passed</span>
            </div>
            <div className="h-1.5 w-full bg-[#0A0B14] rounded-full overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[8px] sm:text-[10px] font-mono text-slate-300 mb-1">
              <span>GPU 60 FPS Framerate Stability</span>
              <span className="text-cyan-400 font-bold">99.8% Stable</span>
            </div>
            <div className="h-1.5 w-full bg-[#0A0B14] rounded-full overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '99.8%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[8px] sm:text-[10px] font-mono text-slate-300 mb-1">
              <span>On-Time Milestone Delivery</span>
              <span className="text-purple-400 font-bold">100% Rate</span>
            </div>
            <div className="h-1.5 w-full bg-[#0A0B14] rounded-full overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="pt-2 border-t border-purple-500/20 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-slate-400">
          <span>VERIFIED CLIENT RATINGS</span>
          <span className="text-amber-300 font-bold">5.0 / 5.0 Global Score</span>
        </div>
      </motion.div>

      {/* ------------------------------------------------------------- */}
      {/* 3. AVERAGE RESPONSE TIME (< 1-2 Hours) WITH LIVE ANIMATED CLOCK */}
      {/* ------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="p-3.5 sm:p-6 bg-[#131422]/95 backdrop-blur-2xl rounded-xl sm:rounded-3xl border border-purple-400/50 sm:border-purple-500/30 shadow-[0_0_20px_rgba(139,0,238,0.2)] sm:shadow-2xl hover:border-purple-400/80 transition-all flex flex-col justify-between space-y-3 sm:space-y-4 group"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
            <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shrink-0">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300 block">
                Direct Communication
              </span>
              <h3 className="font-display font-black text-sm sm:text-xl md:text-2xl text-white leading-tight">
                &lt; 1-2 Hours
              </h3>
            </div>
          </div>

          <span className="px-2 py-0.5 sm:py-1 bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[8px] sm:text-[10px] font-mono font-bold rounded-full flex items-center gap-1 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="whitespace-nowrap">Active Daily</span>
          </span>
        </div>

        <p className="text-[11px] sm:text-xs text-slate-300 font-medium leading-relaxed">
          Average Response Time (Active Daily). You communicate directly with the engineer building your product — no account managers or agency middlemen.
        </p>

        {/* RESTORED ANIMATED TIME CLOCK WIDGET WITH LIVE TICKING HANDS & PULSE */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-[#0A0B14]/90 border border-emerald-500/30 flex items-center justify-between gap-3 shadow-inner">
          
          {/* Animated SVG Clock Radar */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
            {/* Outer Pulsing Glow Circle */}
            <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-ping opacity-25" />
            
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 48 48">
              {/* Outer dial ring */}
              <circle
                cx="24"
                cy="24"
                r="21"
                fill="none"
                stroke="rgba(16, 185, 129, 0.15)"
                strokeWidth="2"
              />
              {/* Hour marker ticks */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <line
                  key={deg}
                  x1="24"
                  y1="5"
                  x2="24"
                  y2="7"
                  stroke={deg % 90 === 0 ? '#10B981' : 'rgba(16, 185, 129, 0.4)'}
                  strokeWidth={deg % 90 === 0 ? '1.5' : '1'}
                  transform={`rotate(${deg} 24 24)`}
                />
              ))}
              {/* Hour Hand */}
              <line
                x1="24"
                y1="24"
                x2="24"
                y2="14"
                stroke="#A7F3D0"
                strokeWidth="2"
                strokeLinecap="round"
                transform={`rotate(${hourAngle} 24 24)`}
              />
              {/* Minute Hand */}
              <line
                x1="24"
                y1="24"
                x2="24"
                y2="10"
                stroke="#34D399"
                strokeWidth="1.5"
                strokeLinecap="round"
                transform={`rotate(${minuteAngle} 24 24)`}
              />
              {/* Second Hand (Ticking) */}
              <line
                x1="24"
                y1="24"
                x2="24"
                y2="7"
                stroke="#10B981"
                strokeWidth="1"
                strokeLinecap="round"
                transform={`rotate(${secondAngle} 24 24)`}
              />
              {/* Center Pivot Point */}
              <circle cx="24" cy="24" r="2.5" fill="#10B981" />
              <circle cx="24" cy="24" r="1" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Timezone Digital Readout */}
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-emerald-400 font-bold uppercase">
              <Globe className="w-3 h-3 shrink-0 text-emerald-400" />
              <span>Timezone: UTC+5 (Live)</span>
            </div>
            <div className="font-mono text-sm sm:text-base font-black text-white tracking-widest mt-0.5">
              {formattedUtc5}
            </div>
            <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="truncate">Online • Average SLA &lt;2h</span>
            </div>
          </div>
        </div>

        {/* Availability Channels */}
        <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-purple-500/20 text-center font-mono text-[9px] sm:text-[10px]">
          <div className="p-1.5 rounded bg-[#0A0B14]/60 border border-white/5 text-slate-300">
            Email & WhatsApp
          </div>
          <div className="p-1.5 rounded bg-[#0A0B14]/60 border border-white/5 text-emerald-300 font-bold">
            Daily Async Updates
          </div>
        </div>
      </motion.div>

      {/* ------------------------------------------------------------- */}
      {/* 4. SOURCE CODE OWNERSHIP & ESCROW (100%) WITH CIRCLE LOADING */}
      {/* ------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-3.5 sm:p-6 bg-[#131422]/95 backdrop-blur-2xl rounded-xl sm:rounded-3xl border border-purple-400/50 sm:border-purple-500/30 shadow-[0_0_20px_rgba(139,0,238,0.2)] sm:shadow-2xl hover:border-purple-400/80 transition-all flex flex-col justify-between space-y-3 sm:space-y-4 group"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
            <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-[#A855F7]/20 border border-[#A855F7]/40 text-[#C084FC] shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-purple-300 block">
                Client Rights & Escrow
              </span>
              <h3 className="font-display font-black text-sm sm:text-xl md:text-2xl text-white leading-tight">
                100% IP Transfer
              </h3>
            </div>
          </div>

          <span className="px-2 py-0.5 sm:py-1 bg-purple-500/15 border border-purple-400/30 text-purple-300 text-[8px] sm:text-[10px] font-mono font-bold rounded-full flex items-center gap-1 shrink-0">
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
            <span className="whitespace-nowrap">Escrow Protected</span>
          </span>
        </div>

        <p className="text-[11px] sm:text-xs text-slate-300 font-medium leading-relaxed">
          Source Code Ownership & Escrow Protected. Full intellectual property transfer upon project sign-off via verified milestone escrow.
        </p>

        {/* RESTORED ANIMATED 100% CIRCULAR PROGRESS LOADING RING */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-[#0A0B14]/90 border border-purple-500/30 flex items-center justify-between gap-3 shadow-inner">
          
          {/* Animated Circular Progress Gauge */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
            {/* Background track circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="rgba(139, 0, 238, 0.2)"
                strokeWidth="3.5"
              />
              {/* Animated Progress Arc for 100% */}
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="url(#purpleProgressGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="125.6"
                initial={{ strokeDashoffset: 125.6 }}
                whileInView={{ strokeDashoffset: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
              />
              <defs>
                <linearGradient id="purpleProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B00EE" />
                  <stop offset="50%" stopColor="#C084FC" />
                  <stop offset="100%" stopColor="#38BDF8" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner 100% Number */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[11px] sm:text-xs font-mono font-black text-white leading-none">
                100%
              </span>
            </div>
          </div>

          {/* Details Column */}
          <div className="flex-1 min-w-0 text-left space-y-1">
            <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono">
              <span className="text-slate-300">GitHub Repo Transfer:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Check className="w-3 h-3" /> Full IP
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono">
              <span className="text-slate-300">Milestone Escrow:</span>
              <span className="text-purple-300 font-bold">Fiverr Pro</span>
            </div>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="pt-2 border-t border-purple-500/20 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-slate-400">
          <span>COMMERCIAL LICENSE</span>
          <span className="text-emerald-400 font-bold">0 Royalty Fees</span>
        </div>
      </motion.div>

    </div>
  );
};
