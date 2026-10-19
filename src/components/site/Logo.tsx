import React from 'react';

/**
 * Anorix identity, drawn as strokes so it can draw itself in.
 * Wordmark: monoline geometric letters, flat-cut A apex and x terminals,
 * two coral squares (A counter + i tittle) as the signature.
 * Monogram: A + X fused at the foot; the coral stroke completes the X.
 */
type Props = { className?: string; draw?: boolean; title?: string };

const P: React.FC<React.SVGProps<SVGPathElement> & { i: number }> = ({ i, ...rest }) => (
  <path pathLength={1} style={{ '--i': i } as React.CSSProperties} {...rest} />
);

export const Wordmark: React.FC<Props> = ({ className = '', draw = true, title }) => {
  const uid = React.useId().replace(/:/g, '');
  return (
    <svg
      className={`ah-wm ${draw ? 'ah-draw' : ''} ${className}`}
      viewBox="-2 4 136 38"
      fill="none"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        <clipPath id={`${uid}a`}><rect x="-4" y="6" width="34" height="34" /></clipPath>
        <clipPath id={`${uid}x`}><rect x="108" y="16" width="28" height="24" /></clipPath>
      </defs>
      <g className="ah-wm-ink" stroke="currentColor" strokeWidth="4.4" strokeMiterlimit="10">
        <P i={0} clipPath={`url(#${uid}a)`} d="M-0.8,44 L13,4.2 L26.8,44" />
        <P i={1} d="M33,16 V40 M33,25 A8,8 0 0 1 49,25 V40" />
        <P i={2} d="M68.4,16.2 A11.8,11.8 0 1 0 68.4,39.8 A11.8,11.8 0 1 0 68.4,16.2" />
        <P i={3} d="M88,16 V40 M88,27 A11,11 0 0 1 99,16 H101" />
        <P i={4} d="M107,16 V40" />
        <P i={5} clipPath={`url(#${uid}x)`} d="M111.5,13 L132.5,43 M132.5,13 L111.5,43" />
      </g>
      <rect className="ah-wm-dot" style={{ '--i': 0 } as React.CSSProperties} x="10.8" y="28" width="4.4" height="4.4" />
      <rect className="ah-wm-dot" style={{ '--i': 1 } as React.CSSProperties} x="104.8" y="6" width="4.4" height="4.4" />
    </svg>
  );
};

export const Monogram: React.FC<Props> = ({ className = '', draw = true, title }) => {
  const uid = React.useId().replace(/:/g, '');
  return (
    <svg
      className={`ah-mono ${draw ? 'ah-draw' : ''} ${className}`}
      viewBox="0 0 64 64"
      fill="none"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        <clipPath id={`${uid}m`}><rect x="0" y="14" width="64" height="36" /></clipPath>
      </defs>
      <g clipPath={`url(#${uid}m)`} strokeWidth="4.6" strokeMiterlimit="10">
        <P i={0} className="ah-wm-ink" stroke="currentColor" d="M8.7,56 L22.5,8.6 L36.3,56" />
        <P i={1} className="ah-wm-ink" stroke="currentColor" d="M32.1,56 L54.1,8" />
        <P i={2} className="ah-wm-acc" d="M32.1,8 L54.1,56" />
      </g>
      <rect className="ah-wm-dot" style={{ '--i': 0 } as React.CSSProperties} x="20.3" y="37" width="4.6" height="4.6" />
    </svg>
  );
};
