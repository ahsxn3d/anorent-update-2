import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ahsan | Frontend Developer & 3D Artist',
    short_name: 'Anorix',
    start_url: '/',
    display: 'standalone',
    background_color: '#051236',
    theme_color: '#051236',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { src: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
  };
}
