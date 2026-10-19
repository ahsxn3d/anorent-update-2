import { Inter_Tight, Instrument_Serif } from 'next/font/google';

export const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ah-display',
  display: 'swap',
  preload: true, // hero / LCP face
});

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['italic'],
  variable: '--font-ah-serif',
  display: 'swap',
  preload: true, // hero line 2
});
