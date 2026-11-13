import type { Metadata, Viewport } from 'next'
import { Manrope, DM_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import { JsonLd } from '@/components/JsonLd'
import { SITE } from '@/config/site'
import type { PageKey } from '@/config/pages'
import { pageVisible } from '@/lib/pages'
import { hasCaseStudies } from '@/sanity/queries'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4F6FB' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0E18' },
  ],
}

const TITLE = 'Astacraft Systems | Invoicing, customer messaging and automation for African businesses'
const DESCRIPTION = 'Astacraft builds software for African businesses: invoicing and payments, WhatsApp customer messaging, and automations that take repetitive work off your team.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(SITE.url),
  authors: [{ name: SITE.company }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 } },
  alternates: { canonical: `${SITE.url}/` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE.url,
    siteName: SITE.companyShort,
    locale: 'en_GH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@astacraftsys',
    creator: '@astacraftsys',
    title: TITLE,
    description: DESCRIPTION,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-light.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-dark.svg',  type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    ],
    shortcut: '/favicon.ico',
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
}

const NAV_LINKS: { key: PageKey | 'insights'; href: string; label: string }[] = [
  { key: 'services',   href: '/services',   label: 'Services' },
  { key: 'products',   href: '/products',   label: 'Products' },
  { key: 'industries', href: '/industries', label: 'Industries' },
  { key: 'work',       href: '/work',       label: 'Work' },
  { key: 'about',      href: '/about',      label: 'About' },
  { key: 'insights',   href: '/insights',   label: 'Insights' },
]

const ORGANIZATION_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.company,
    url: SITE.url,
    logo: `${SITE.url}/web-app-manifest-512x512.png`,
    description: DESCRIPTION,
    email: SITE.email,
    telephone: SITE.phone.replace(/\s/g, ''),
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${SITE.address.street}, ${SITE.address.area}`,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: SITE.phone.replace(/\s/g, ''),
      email: SITE.email,
      areaServed: 'GH',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://www.linkedin.com/company/astacraftsystems',
      'https://twitter.com/astacraftsys',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.companyShort,
    description: DESCRIPTION,
    publisher: { '@id': `${SITE.url}/#organization` },
  },
]

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const showWork = await hasCaseStudies()
  const navLinks = NAV_LINKS
    .filter(l => l.key === 'insights' || (pageVisible(l.key) && (l.key !== 'work' || showWork)))
    .map(({ href, label }) => ({ href, label }))

  return (
    <html lang="en">
      <head>
        <JsonLd data={ORGANIZATION_JSON_LD} />
      </head>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-7J9CQZBTMD" strategy="lazyOnload" />
      <Script id="ga4-init" strategy="lazyOnload">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-7J9CQZBTMD');
      `}</Script>
      <body className={`${manrope.variable} ${dmMono.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[var(--color-accent)] focus:text-white focus:font-mono focus:text-[11px] focus:tracking-[0.12em] focus:uppercase focus:px-5 focus:py-3"
        >
          Skip to main content
        </a>
        <ScrollReveal />
        <Nav links={navLinks} />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
