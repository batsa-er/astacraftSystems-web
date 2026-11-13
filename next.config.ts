import type { NextConfig } from "next";
import { unresolvedPlaceholders } from "./src/config/placeholders";

const isProductionSite = process.env.VERCEL_ENV === 'production' || process.env.SITE_ENV === 'production'

if (isProductionSite) {
  const open = unresolvedPlaceholders()
  if (open.length) {
    throw new Error(
      `Production build blocked: ${open.length} placeholder(s) are unresolved.\n` +
      open.map((p) => `  - ${p.id} (page: ${p.page}): ${p.text}`).join('\n') +
      `\nFill or omit them in src/config/placeholders.ts, src/config/packages.ts and src/config/site.ts.`,
    )
  }
}

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
]

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  async headers() {
    return [
      {
        source: '/((?!studio).*)',
        headers: securityHeaders,
      },
    ]
  },
  async redirects() {
    return [
      { source: '/solutions',            destination: '/services#packages',       permanent: true },
      { source: '/solutions/launch',     destination: '/services#start-up-kit',   permanent: true },
      { source: '/solutions/growth',     destination: '/services#sme-kit',        permanent: true },
      { source: '/solutions/operations', destination: '/services#automation-kit', permanent: true },
      { source: '/solutions/enterprise', destination: '/services#custom-project', permanent: true },
      { source: '/solutions/secure',     destination: '/services',                permanent: true },
      { source: '/solutions/:path*',     destination: '/services',                permanent: true },

      { source: '/services/crm-erp',                destination: '/services#crm-erp',             permanent: true },
      { source: '/services/api-automation',         destination: '/services#workflow-automation', permanent: true },
      { source: '/services/digital-transformation', destination: '/services#workflow-automation', permanent: true },
      { source: '/services/:slug',                  destination: '/services',                     permanent: true },

      { source: '/products/crm', destination: '/services#crm-erp', permanent: true },

      { source: '/industries/healthcare',         destination: '/industries#clinics',            permanent: true },
      { source: '/industries/real-estate',        destination: '/industries#real-estate',        permanent: true },
      { source: '/industries/retail-commerce',    destination: '/industries#retail',             permanent: true },
      { source: '/industries/financial-services', destination: '/industries#financial-services', permanent: true },
      { source: '/industries/:slug',              destination: '/industries',                    permanent: true },
    ]
  },
};

export default nextConfig;
