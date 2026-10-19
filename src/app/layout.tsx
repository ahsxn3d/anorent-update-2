import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
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
  themeColor: '#000000',
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
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="any" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-black text-[#f4f4f4] antialiased selection:bg-white selection:text-black overflow-x-clip min-h-screen">
        {children}
      </body>
    </html>
  );
}
