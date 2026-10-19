import type { Metadata, Viewport } from 'next';
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ahsan | Frontend Developer & 3D Artist',
  description:
    'Portfolio of Ahsan — Frontend Developer & 3D Artist specializing in high-performance Next.js architectures, interactive WebGL shaders, and bespoke digital experiences.',
  keywords: [
    'Frontend Developer',
    '3D Artist',
    'WebGL',
    'Three.js',
    'Next.js 16',
    'React 19',
    'Creative Developer',
    'UI Engineering',
    'Ahsan',
  ],
  authors: [{ name: 'Ahsan' }],
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
    shortcut: ['/favicon.ico'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0D12',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${serif.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="any" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-[#0B0D12] text-[#E8EBF2] antialiased selection:bg-[#4F7CFF] selection:text-[#E8EBF2] overflow-x-clip min-h-screen">
        {children}
      </body>
    </html>
  );
}
