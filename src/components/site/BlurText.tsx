import React from 'react';

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div' | 'blockquote';

interface BlurTextProps {
  text: string;
  as?: Tag;
  className?: string;
  /** Animate from first paint (hero copy) instead of on scroll-in */
  load?: boolean;
  /** Base delay in seconds */
  delay?: number;
  /** Words (or phrases) set in the italic serif */
  serif?: string[];
  /** Index offset so several BlurTexts can share one stagger */
  offset?: number;
  id?: string;
}

/**
 * Splits copy into words that blur, rise and sharpen in sequence.
 * Pure CSS transitions: the shared RevealObserver only toggles `.is-in`.
 * The full sentence stays in the DOM as real text (screen readers read it once via aria-label).
 */
export const BlurText: React.FC<BlurTextProps> = ({
  text,
  as = 'p',
  className = '',
  load = false,
  delay = 0,
  serif = [],
  offset = 0,
  id,
}) => {
  const Comp = as as React.ElementType;
  const lower = text.toLowerCase();
  const ranges: Array<[number, number]> = [];
  serif.filter(Boolean).forEach((p) => {
    const i = lower.indexOf(p.toLowerCase());
    if (i >= 0) ranges.push([i, i + p.length]);
  });
  const words: { w: string; s: boolean }[] = [];
  const re = /\S+/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const start = m.index;
    words.push({ w: m[0], s: ranges.some(([a, b]) => start >= a && start < b) });
  }

  return (
    <Comp
      id={id}
      className={`ah-bt ${load ? 'ah-bt-load' : ''} ${className}`}
      style={{ ['--d' as string]: `${delay}s` } as React.CSSProperties}
      aria-label={text}
    >
      {words.map((x, i) => (
        <React.Fragment key={`${x.w}-${i}`}>
          <span
            aria-hidden="true"
            className={`ah-bt-w ${x.s ? 'ah-serif' : ''}`}
            style={{ ['--i' as string]: i + offset } as React.CSSProperties}
          >
            {x.w}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </Comp>
  );
};

export const Arrow: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 14 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 12L12 2M12 2H4.5M12 2V9.5" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

export default BlurText;
