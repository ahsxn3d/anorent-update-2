'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ButterButton } from '../ButterButton';
import { ArrowRight } from 'lucide-react';

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Cursor-reactive spotlight: writes --mx/--my on the parent hero, rAF-throttled. */
export const HeroSpotlight: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el || prefersReduced()) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${x}px`);
        el.style.setProperty('--my', `${y}px`);
      });
    };
    el.addEventListener('pointermove', onMove);
    return () => {
      el.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="lux-spotlight" aria-hidden="true" />;
};

/** Magnetic wrapper: child drifts up to 6px toward the cursor, springs back on leave. */
export const Magnetic: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    if (prefersReduced() || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    ref.current.style.transform = `translate3d(${dx * 6}px, ${dy * 4}px, 0)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = '';
  };
  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={`lux-magnetic ${className}`}>
      {children}
    </div>
  );
};

const ACCENTS = [
  { name: 'Blue', value: '#4F7CFF' },
  { name: 'Sage', value: '#7C9A82' },
  { name: 'Clay', value: '#C2785C' },
  { name: 'Ink', value: '#E8EBF2' },
];
const RADII = [
  { name: 'Sharp', value: 2 },
  { name: 'Soft', value: 10 },
  { name: 'Round', value: 20 },
];
const TYPES = [
  { name: 'Sans', value: 'var(--font-sans), system-ui, sans-serif' },
  { name: 'Serif', value: 'var(--font-serif), Georgia, serif' },
  { name: 'Mono', value: 'var(--font-mono), ui-monospace, monospace' },
];

/** Live design-token playground: switch accent / type / radius and watch a mini UI card re-skin. */
export const TokenPlayground: React.FC<{ title: string; body: string; cta: string; meta?: string }> = ({ title, body, cta, meta }) => {
  const [accent, setAccent] = useState(ACCENTS[0]);
  const [radius, setRadius] = useState(RADII[1]);
  const [type, setType] = useState(TYPES[0]);

  const Group = <T extends { name: string }>({ label, items, active, onPick }: { label: string; items: T[]; active: T; onPick: (t: T) => void }) => (
    <div role="radiogroup" aria-label={label} className="flex items-center justify-between gap-3">
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#5E667A]">{label}</span>
      <div className="flex gap-1 p-1 rounded-full border border-[#232837] bg-[#11141B]">
        {items.map((it) => (
          <button
            key={it.name}
            type="button"
            role="radio"
            aria-checked={active.name === it.name}
            onClick={() => onPick(it)}
            className={`px-3 h-7 rounded-full text-[12px] transition-colors duration-150 cursor-pointer ${
              active.name === it.name ? 'bg-[#232837] text-[#E8EBF2]' : 'text-[#8B93A7] hover:text-[#E8EBF2]'
            }`}
          >
            {it.name}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="lux-playground lux-card-surface grid md:grid-cols-2 gap-6 md:gap-10 items-center p-5 sm:p-8 rounded-[12px] border border-[#232837] bg-[#11141B]">
      <div className="space-y-4 order-2 md:order-1">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#5E667A]">Design tokens · try it</p>
        <Group label="Accent" items={ACCENTS} active={accent} onPick={setAccent} />
        <Group label="Type" items={TYPES} active={type} onPick={setType} />
        <Group label="Radius" items={RADII} active={radius} onPick={setRadius} />
      </div>
      <div
        className="order-1 md:order-2 p-6 border border-[#232837] bg-[#0B0D12] transition-all duration-200"
        style={{ borderRadius: radius.value + 6, fontFamily: type.value }}
        aria-live="polite"
      >
        <div className="flex items-center gap-2 mb-5">
          <span className="w-2 h-2 rounded-full transition-colors duration-200" style={{ background: accent.value }} />
          {meta && <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#5E667A]">{meta}</span>}
        </div>
        <p className="text-[22px] leading-[1.2] tracking-[-0.02em] text-[#E8EBF2]">{title}</p>
        <p className="mt-3 text-[14px] leading-relaxed text-[#8B93A7]">{body}</p>
        <span
          className="mt-6 inline-flex items-center h-10 px-5 text-[13px] font-medium transition-all duration-200"
          style={{ background: accent.value, color: accent.name === 'Ink' ? '#0B0D12' : '#E8EBF2', borderRadius: radius.value }}
        >
          {cta}
        </span>
      </div>
    </div>
  );
};

/** Before/after redesign slider. Range input drives the split (keyboard + touch accessible). */
export const BeforeAfter: React.FC<{ title: string; subtitle: string; cta: string }> = ({ title, subtitle, cta }) => {
  const [pos, setPos] = useState(50);
  const wrap = useRef<HTMLDivElement>(null);
  const drag = (clientX: number) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };
  const Before = (
    <div className="absolute inset-0 p-6 sm:p-10 bg-[#1A1030] overflow-hidden" aria-hidden="true">
      <div className="absolute -top-20 -left-10 w-72 h-72 rounded-full bg-[#7C3AED]/40 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-60 rounded-full bg-[#06B6D4]/30 blur-3xl" />
      <div className="relative flex gap-2 flex-wrap">
        {['NEW!!', 'HOT', 'SALE', '50% OFF'].map((t) => (
          <span key={t} className="px-2 py-0.5 text-[10px] font-black border-2 border-[#F472B6] text-[#F472B6] rotate-[-3deg]">{t}</span>
        ))}
      </div>
      <p className="relative mt-6 text-[28px] sm:text-[44px] font-black italic uppercase leading-none text-[#22D3EE] tracking-tight">{title}</p>
      <p className="relative mt-3 text-[11px] text-[#C4B5FD] max-w-xs line-clamp-2">{subtitle}</p>
      <span className="relative mt-5 inline-block px-4 py-2 text-[11px] font-black uppercase bg-gradient-to-r from-[#F472B6] to-[#7C3AED] text-[#E8EBF2] rounded-sm">{cta}!!!</span>
    </div>
  );
  const After = (
    <div className="absolute inset-0 p-6 sm:p-10 bg-[#11141B]" aria-hidden="true">
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#5E667A]">Studio</p>
      <p className="mt-6 text-[28px] sm:text-[44px] font-medium leading-[1] tracking-[-0.035em] text-[#E8EBF2]">{title}</p>
      <p className="mt-4 text-[13px] text-[#8B93A7] max-w-sm line-clamp-2">{subtitle}</p>
      <span className="mt-6 inline-flex items-center h-10 px-5 rounded-full bg-[#4F7CFF] text-[#E8EBF2] text-[13px]">{cta} →</span>
    </div>
  );
  return (
    <div className="space-y-4">
      <div
        ref={wrap}
        className="lux-ba relative h-[300px] sm:h-[420px] rounded-[12px] border border-[#232837] overflow-hidden select-none touch-none cursor-ew-resize"
        onPointerDown={(e) => { (e.target as HTMLElement).setPointerCapture?.(e.pointerId); drag(e.clientX); }}
        onPointerMove={(e) => { if (e.buttons) drag(e.clientX); }}
      >
        {After}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>{Before}</div>
        <div className="absolute inset-y-0 w-px bg-[#E8EBF2]/80" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#E8EBF2] text-[#0B0D12] grid place-items-center text-[13px]">⇆</span>
        </div>
        <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.12em] px-2 py-1 rounded-full bg-[#0B0D12]/70 text-[#E8EBF2]">Before</span>
        <span className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-[0.12em] px-2 py-1 rounded-full bg-[#0B0D12]/70 text-[#E8EBF2]">After</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Before and after comparison"
        className="lux-range w-full"
      />
    </div>
  );
};

/** Scope configurator: pick services, see the scope summary. Only shows prices that exist in content. */
export const ScopeConfigurator: React.FC<{
  items: { title: string; detail: string }[];
  notice?: string;
  cta: string;
  onCta: () => void;
}> = ({ items, notice, cta, onCta }) => {
  const [picked, setPicked] = useState<string[]>([items[0]?.title].filter(Boolean) as string[]);
  const toggle = (t: string) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));
  return (
    <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
      <div className="lg:col-span-7 grid gap-3" role="group" aria-label="Choose scope">
        {items.map((it, i) => {
          const on = picked.includes(it.title);
          return (
            <button
              key={it.title}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(it.title)}
              className={`lux-card lux-tilt text-left flex items-center justify-between gap-4 p-5 rounded-[12px] border transition-colors duration-150 cursor-pointer ${
                on ? 'border-[#4F7CFF]/60 bg-[#171B24]' : 'border-[#232837] bg-[#11141B] hover:border-[#2F3547]'
              }`}
            >
              <span className="flex items-baseline gap-4">
                <span className="font-mono text-[11px] text-[#5E667A]">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="block text-[17px] text-[#E8EBF2] tracking-[-0.01em]">{it.title}</span>
                  <span className="block mt-1 text-[13px] text-[#8B93A7]">{it.detail}</span>
                </span>
              </span>
              <span className={`w-5 h-5 rounded-full border grid place-items-center text-[11px] ${on ? 'bg-[#4F7CFF] border-[#4F7CFF] text-[#E8EBF2]' : 'border-[#2F3547] text-transparent'}`}>✓</span>
            </button>
          );
        })}
      </div>
      <div className="lux-card-surface lg:col-span-5 p-6 rounded-[12px] border border-[#232837] bg-[#11141B] self-start lg:sticky lg:top-24" aria-live="polite">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#5E667A]">Your scope</p>
        <ul className="mt-4 space-y-2 min-h-[48px]">
          {picked.length === 0 && <li className="text-[13px] text-[#5E667A]">—</li>}
          {picked.map((t) => (
            <li key={t} className="flex items-center justify-between text-[14px] text-[#E8EBF2] border-b border-[#232837] pb-2">
              {t}
              <span className="font-mono text-[11px] text-[#8B93A7]">{items.find((x) => x.title === t)?.detail}</span>
            </li>
          ))}
        </ul>
        {notice && <p className="mt-5 text-[13px] text-[#8B93A7] tabular-nums">{notice}</p>}
        <div className="mt-6">
          <ButterButton
            variant="outline"
            size="lg"
            onClick={onCta}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            className="lux-primary w-full justify-center uppercase tracking-wider !py-3.5 text-xs sm:text-sm"
          >
            {cta}
          </ButterButton>
        </div>
      </div>
    </div>
  );
};

/** Editorial project tile with cursor-follow "View" chip and image reveal. */
export const ProjectTile: React.FC<{
  title: string;
  category?: string;
  description?: string;
  image?: string;
  tags?: string[];
  year?: string;
  large?: boolean;
  onOpen: () => void;
}> = ({ title, category, description, image, tags = [], year, large, onOpen }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [broken, setBroken] = useState(false);
  const move = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r || !ref.current) return;
    ref.current.style.setProperty('--cx', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--cy', `${e.clientY - r.top}px`);
  };
  return (
    <button type="button" onClick={onOpen} className="lux-tile group text-left w-full cursor-pointer" aria-label={title}>
      <div
        ref={ref}
        onPointerMove={move}
        className={`lux-tilt relative overflow-hidden rounded-[12px] border border-[#232837] bg-[#171B24] ${large ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}
      >
        {image && !broken ? (
          <img
            src={image}
            alt=""
            loading="lazy"
            onError={() => setBroken(true)}
            className="absolute inset-0 w-full h-full object-cover scale-[1.02] group-hover:scale-[1.06] transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="text-[28px] tracking-[-0.03em] text-[#2F3547]">{title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="lux-view-chip">View</span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[18px] sm:text-[20px] tracking-[-0.02em] text-[#E8EBF2] truncate">{title}</p>
          {description && <p className="mt-1 text-[14px] text-[#8B93A7] line-clamp-2">{description}</p>}
          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.slice(0, 4).map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-full border border-[#232837] text-[11px] text-[#8B93A7]">{t}</span>
              ))}
            </div>
          )}
        </div>
        <div className="shrink-0 text-right">
          {category && <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#5E667A]">{category}</p>}
          {year && <p className="mt-1 font-mono text-[11px] text-[#5E667A]">{year}</p>}
        </div>
      </div>
    </button>
  );
};
