/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2678400,
    // Only for sandboxed QA machines whose DNS maps public hosts to 198.18.x (fake-IP proxy).
    // Never set in production; the default (false) keeps Next's SSRF guard on.
    dangerouslyAllowLocalIP: process.env.ANORIX_QA_FAKE_IP_DNS === '1',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
