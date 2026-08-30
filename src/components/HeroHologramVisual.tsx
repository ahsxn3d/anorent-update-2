'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MobileHeroHologram } from './MobileHeroHologram';

// Dynamically import desktop 3D canvas with ssr: false
const DesktopHeroCanvas = dynamic(
  () => import('./HeroHologramCanvas').then((mod) => mod.HeroHologramCanvas),
  {
    ssr: false,
    loading: () => <MobileHeroHologram />,
  }
);

export const HeroHologramVisual: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport, { passive: true });
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Before hydration or on mobile devices (< 768px), render 0-overhead CSS hologram
  if (!hasMounted || !isDesktop) {
    return <MobileHeroHologram />;
  }

  // On desktop screens (>= 768px), mount full interactive 3D WebGL / Canvas
  return <DesktopHeroCanvas />;
};

export default HeroHologramVisual;
