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
  title: 'Anorix — Digital Artist & Developer Studio',
  description:
    'High-performance 3D websites, WebGL shaders, and bespoke Next.js interfaces engineered for founders and cutting-edge brands.',
  keywords: [
    'Creative Technologist',
    '3D WebGL',
    'Next.js 15',
    'React 19',
    'Creative Developer',
    'UI Engineering',
    'Anorix',
  ],
  authors: [{ name: 'Anorix Studio' }],
  icons: {
    icon: '/favicon.ico',
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
      <body className="bg-[#0A0B14] text-white antialiased selection:bg-[#8B00EE] selection:text-white overflow-x-clip min-h-screen">
        {children}
      </body>
    </html>
  );
}
