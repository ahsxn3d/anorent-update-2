import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
  preload: false,
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
  preload: true, // hero labels
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
  // favicon.ico, icon.svg, apple-icon.png, opengraph-image.jpg and manifest come from app/ file conventions
};

export const viewport: Viewport = {
  themeColor: '#051236',
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
        <script
          // flags JS before first paint so reveal states only hide content when they can also show it
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('ah-js')" }}
        />
      </head>
      <body className="bg-[#051236] text-[#fffde2] antialiased overflow-x-clip min-h-screen">
        {children}
      </body>
    </html>
  );
}
