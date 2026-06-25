import type { Metadata } from 'next'
import Link from 'next/link'
import { Rocket, TrendingUp, Workflow, ShieldCheck, Globe, ArrowRight } from 'lucide-react'
import { JsonLd } from '@/components/JsonLd'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Business Technology Solutions | Astacraft Systems',
  description: 'Productized technology bundles for every stage of business growth — from startup to enterprise. Launch, grow, operate, secure, and transform with Astacraft Systems.',
  keywords: 'technology solutions Ghana, business technology bundles Ghana, managed IT services Ghana, SME technology Africa, digital transformation Ghana, Astacraft Solutions',
  alternates: { canonical: 'https://astacraftsystems.com/solutions' },
  openGraph: {
    title: 'Business Technology Solutions | Astacraft Systems',
    description: 'Productized technology bundles for every stage of growth — Launch, Growth, Operations, Secure, and Enterprise. Start where you are, scale as you grow.',
    url: 'https://astacraftsystems.com/solutions',
    siteName: 'Astacraft Systems Limited',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://astacraftsystems.com/solutions/opengraph-image', width: 1200, height: 630, alt: 'Astacraft Systems — Business Technology Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@astacraftsys',
    title: 'Business Technology Solutions | Astacraft Systems',
    description: 'Technology bundles for every stage of business growth — from startup to enterprise.',
    images: ['https://astacraftsystems.com/solutions/opengraph-image'],
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Astacraft Business Technology Solutions',
    description: 'Productized technology bundles for every stage of business growth — Launch, Growth, Operations, Secure, and Enterprise.',
    url: 'https://astacraftsystems.com/solutions',
    provider: { '@type': 'Organization', name: 'Astacraft Systems Limited', url: 'https://astacraftsystems.com' },
    hasPart: [
      { '@type': 'Service', name: 'Astacraft Launch™', url: 'https://astacraftsystems.com/solutions/launch' },
      { '@type': 'Service', name: 'Astacraft Growth™', url: 'https://astacraftsystems.com/solutions/growth' },
      { '@type': 'Service', name: 'Astacraft Operations™', url: 'https://astacraftsystems.com/solutions/operations' },
      { '@type': 'Service', name: 'Astacraft Secure™', url: 'https://astacraftsystems.com/solutions/secure' },
      { '@type': 'Service', name: 'Astacraft Enterprise™', url: 'https://astacraftsystems.com/solutions/enterprise' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astacraftsystems.com' },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://astacraftsystems.com/solutions' },
    ],
  },
]

const bundles = [
  {
    num: '01',
    Icon: Rocket,
    href: '/solutions/launch',
    name: 'Astacraft Launch™',
    tag: 'Startups',
    tagline: 'Everything a new business needs to launch online with confidence.',
    accent: 'var(--color-green)',
    accentRgb: 'var(--ch-green)',
    includes: ['Domain & DNS', 'Business website', 'Business email', 'Hosting & SSL', 'Setup support'],
  },
  {
    num: '02',
    Icon: TrendingUp,
    href: '/solutions/growth',
    name: 'Astacraft Growth™',
    tag: 'SMEs',
    tagline: 'Systems and automation to scale your business without scaling headcount.',
    accent: 'var(--color-accent)',
    accentRgb: 'var(--ch-accent)',
    includes: ['CRM setup', 'Website upgrade', 'Email automation', 'Workflow tools', 'Collaboration suite'],
  },
  {
    num: '03',
    Icon: Workflow,
    href: '/solutions/operations',
    name: 'Astacraft Operations™',
    tag: 'Digitization',
    tagline: 'Digitize internal operations and eliminate manual, paper-based processes.',
    accent: 'var(--color-accent)',
    accentRgb: 'var(--ch-accent)',
    includes: ['Operations portal', 'Workflow automation', 'Document management', 'Staff portals', 'Approval flows'],
  },
  {
    num: '04',
    Icon: ShieldCheck,
    href: '/solutions/secure',
    name: 'Astacraft Secure™',
    tag: 'Security',
    tagline: 'Enterprise-grade cybersecurity and compliance for businesses of every size.',
    accent: '#C0392B',
    accentRgb: '192,57,43',
    includes: ['24/7 SOC monitoring', 'Endpoint protection', 'Backup & recovery', 'Compliance audit', 'Staff training'],
  },
  {
    num: '05',
    Icon: Globe,
    href: '/solutions/enterprise',
    name: 'Astacraft Enterprise™',
    tag: 'Enterprise',
    tagline: 'Full-scale digital transformation with cloud infrastructure and custom software.',
    accent: 'var(--color-accent)',
    accentRgb: 'var(--ch-accent)',
    includes: ['Cloud migration', 'Custom software', 'Infrastructure design', 'Transformation roadmap', 'Dedicated team'],
  },
]

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ─── HERO ─── */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] mt-[72px] pt-20 pb-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-25 pointer-events-none" />
        <div className="absolute top-0 right-[-5%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(var(--ch-accent),0.22)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(var(--ch-green),0.10)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto">
          <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-[rgba(255,255,255,0.38)] mb-6 hero-in hero-in-1">
            Business Lifecycle Bundles
          </p>
          <h1
            className="font-serif font-black text-white leading-[0.90] tracking-[-0.035em] mb-8 hero-in hero-in-2"
            style={{ fontSize: 'clamp(44px,7vw,88px)' }}
          >
            Technology bundles<br />
            <span className="text-gradient italic">for every stage.</span>
          </h1>
          <p
            className="text-[rgba(255,255,255,0.62)] max-w-[55ch] leading-relaxed mb-10 hero-in hero-in-3"
            style={{ fontSize: 'clamp(15px,1.2vw,18px)' }}
          >
            Productized solutions — fixed scope, clear pricing, managed delivery. Start where your business is today and upgrade as you grow.
          </p>
          <div className="flex flex-wrap gap-4 hero-in hero-in-4">
            <Link
              href="/contact"
              className="btn-shimmer inline-block bg-[var(--color-green)] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-8 py-4 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
            >
              Book a Free Consultation →
            </Link>
            <Link
              href="#bundles"
              className="inline-block border border-[rgba(255,255,255,0.35)] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-8 py-4 hover:border-[rgba(255,255,255,0.60)] transition-colors duration-200"
            >
              Explore Bundles
            </Link>
          </div>
        </div>
      </section>

      {/* ─── BUNDLES ─── */}
      <section id="bundles" className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-24">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 gap-0 border border-[rgba(var(--ch-border),0.10)]">
            {bundles.map(({ num, Icon, href, name, tag, tagline, accent, accentRgb, includes }, i) => (
              <Link
                key={href}
                href={href}
                className="group grid grid-cols-[80px_1fr_auto] items-start gap-8 p-8 border-b border-[rgba(var(--ch-border),0.10)] last:border-0 hover:bg-[rgba(var(--ch-accent),0.02)] transition-colors duration-200 reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="pt-1">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-[rgba(var(--ch-text),0.25)]">{num}</span>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-9 h-9 flex items-center justify-center border shrink-0"
                      style={{ borderColor: `rgba(${accentRgb},0.20)`, backgroundColor: `rgba(${accentRgb},0.06)` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: accent }} />
                    </div>
                    <h2 className="font-serif font-bold text-[20px] text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-200">
                      {name}
                    </h2>
                    <span
                      className="font-mono text-[9px] tracking-[0.14em] uppercase px-2 py-0.5 border"
                      style={{ color: accent, borderColor: `rgba(${accentRgb},0.25)`, backgroundColor: `rgba(${accentRgb},0.08)` }}
                    >
                      {tag}
                    </span>
                  </div>
                  <p className="text-[15px] text-[rgba(var(--ch-text),0.55)] mb-4 max-w-[520px]">{tagline}</p>
                  <div className="flex flex-wrap gap-2">
                    {includes.map(item => (
                      <span
                        key={item}
                        className="font-mono text-[10px] tracking-[0.08em] px-2.5 py-1 bg-[rgba(var(--ch-border),0.06)] border border-[rgba(var(--ch-border),0.10)] text-[rgba(var(--ch-text),0.45)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-1 opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-all duration-200">
                  <ArrowRight className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
              </Link>
            ))}
          </div>

          {/* "Not sure?" inline prompt */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[rgba(var(--ch-border),0.10)] bg-[var(--color-surface)] px-8 py-5 reveal">
            <div>
              <p className="font-serif font-medium text-[16px] text-[var(--color-text)]">Not sure which bundle fits your business?</p>
              <p className="text-[13px] text-[rgba(var(--ch-text),0.45)] mt-0.5">Book a free 30-minute call and we&apos;ll recommend the right one.</p>
            </div>
            <Link
              href="/contact?ref=help-me-choose"
              className="shrink-0 font-mono text-[10px] tracking-[0.14em] uppercase font-medium border border-[rgba(var(--ch-accent),0.25)] text-[var(--color-accent)] px-6 py-3 hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] transition-all duration-200"
            >
              Help Me Choose →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(29,71,118,0.12),transparent)] pointer-events-none" />
        <div className="relative max-w-[700px] mx-auto text-center reveal">
          <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.30)] mb-4">
            Not sure where to start?
          </p>
          <h2
            className="font-serif font-bold text-white mb-4"
            style={{ fontSize: 'clamp(28px,3vw,48px)' }}
          >
            Talk to a technology advisor
          </h2>
          <p className="text-[rgba(255,255,255,0.50)] mb-10 max-w-[44ch] mx-auto leading-relaxed">
            We&apos;ll map your business to the right bundle and build a custom proposal — no commitment required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="btn-shimmer inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white px-10 py-4 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
            >
              Book a Free Consultation →
            </Link>
            <Link
              href="/services"
              className="inline-block border border-[rgba(255,255,255,0.38)] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-10 py-4 hover:border-[rgba(255,255,255,0.65)] transition-colors duration-200"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
