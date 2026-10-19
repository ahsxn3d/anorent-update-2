'use client';

import React from 'react';

interface PlayfulLogoProps {
  onClick?: () => void;
  className?: string;
}

export const PlayfulLogo: React.FC<PlayfulLogoProps> = ({ onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`text-[15px] tracking-[-0.04em] text-white hover:opacity-60 transition-opacity duration-500 cursor-pointer ${className}`}
    >
      Anorix
    </button>
  );
};

export default PlayfulLogo;
