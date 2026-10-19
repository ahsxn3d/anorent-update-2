'use client';

import React, { useEffect, useState } from 'react';

/**
 * Height + opacity (+ optional blur) disclosure without an animation library.
 * Children mount on open and unmount after the close transition, like AnimatePresence did.
 */
export const Collapse: React.FC<{ open: boolean; blur?: boolean; children: React.ReactNode; ms?: number }> = ({
  open,
  blur = false,
  children,
  ms = 500,
}) => {
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const r = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      return () => cancelAnimationFrame(r);
    }
    setShown(false);
    const t = window.setTimeout(() => setMounted(false), ms + 40);
    return () => window.clearTimeout(t);
  }, [open, ms]);

  if (!mounted) return null;
  return (
    <div
      className={`ah-collapse ${blur ? 'is-blur' : ''} ${shown ? 'is-open' : ''}`}
      style={{ '--ah-c-ms': `${ms}ms` } as React.CSSProperties}
    >
      <div className="ah-collapse-in">{children}</div>
    </div>
  );
};
