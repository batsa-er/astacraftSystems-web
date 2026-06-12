import type { Metadata, Viewport } from 'next'
import { Manrope, DM_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
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
  themeColor: '#F6F7FB',
}

export const metadata: Metadata = {
  title: 'Astacraft Systems | Technology, Cloud & Digital Transformation — Ghana',
  description: 'Astacraft Systems Limited delivers software development, cloud infrastructure, cybersecurity, CRM/ERP implementation, and digital transformation solutions for African businesses.',
  metadataBase: new URL('https://astacraftsystems.com'),
  keywords: 'Software Development Ghana, Digital Transformation Ghana, Cloud Solutions Ghana, Cybersecurity Ghana, CRM Implementation Ghana, ERP Solutions Ghana, SaaS Development Ghana, Technology Consulting Ghana, Business Automation Ghana, IT Services Accra',
  authors: [{ name: 'Astacraft Systems Limited' }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 } },
  alternates: { canonical: 'https://astacraftsystems.com/' },
  openGraph: {
    title: 'Astacraft Systems | Technology, Cloud & Digital Transformation',
    description: 'We build software, automate operations, secure digital infrastructure, and deliver business solutions that help African organizations grow faster.',
    url: 'https://astacraftsystems.com',
    siteName: 'Astacraft Systems Limited',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: 'https://astacraftsystems.com/og-image.jpg', width: 1200, height: 630, alt: 'Astacraft Systems — Technology & Digital Transformation for Africa' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@astacraftsys',
    creator: '@astacraftsys',
    title: 'Astacraft Systems | Technology, Cloud & Digital Transformation',
    description: 'Software development, cloud infrastructure, cybersecurity, and digital transformation solutions for African businesses.',
    images: [{ url: 'https://astacraftsystems.com/og-image.jpg', alt: 'Astacraft Systems — Technology & Digital Transformation for Africa' }],
  },
  other: {
    'geo.region': 'GH-AA',
    'geo.placename': 'Accra, Ghana',
    'geo.position': '5.6037;-0.1870',
    'ICBM': '5.6037, -0.1870',
    'language': 'English',
    'revisit-after': '7 days',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${dmMono.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[var(--color-accent)] focus:text-white focus:font-mono focus:text-[11px] focus:tracking-[0.12em] focus:uppercase focus:px-5 focus:py-3"
        >
          Skip to main content
        </a>
        <ScrollReveal />
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
