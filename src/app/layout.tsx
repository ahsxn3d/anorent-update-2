import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Archivo_Black, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
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
  themeColor: '#0A0B14',
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
      className={`${plusJakartaSans.variable} ${archivoBlack.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="any" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-[#0A0B14] text-white antialiased selection:bg-[#8B00EE] selection:text-white overflow-x-clip min-h-screen">
        {children}
      </body>
    </html>
  );
}
