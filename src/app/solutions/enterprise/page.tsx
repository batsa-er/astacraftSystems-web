import type { Metadata } from 'next'
import Link from 'next/link'
import { Globe, Cloud, Code2, Network, Map, Users2, ArrowRight, CheckCircle2 } from 'lucide-react'
import { JsonLd } from '@/components/JsonLd'
import { SolutionStickyBar } from '@/components/SolutionStickyBar'
import { SolutionLeadForm } from '@/components/SolutionLeadForm'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Astacraft Enterprise™ — Digital Transformation | Astacraft Systems',
  description: 'Full-scale digital transformation for large organisations — cloud migration, custom software, and a dedicated delivery team. Discovery from GH₵ 5,000. Retainer from GH₵ 8,000/month.',
  keywords: 'digital transformation Ghana, cloud migration Ghana, enterprise software Ghana, AWS partner Ghana, Azure partner Ghana, custom software development Ghana, Astacraft Enterprise',
  alternates: { canonical: 'https://astacraftsystems.com/solutions/enterprise' },
  openGraph: {
    title: 'Astacraft Enterprise™ — Digital Transformation',
    description: 'Cloud migration, custom software, and a dedicated delivery team for large organisations. Three engagement models: discovery, project, or retainer.',
    url: 'https://astacraftsystems.com/solutions/enterprise',
    siteName: 'Astacraft Systems Limited',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://astacraftsystems.com/solutions/enterprise/opengraph-image', width: 1200, height: 630, alt: 'Astacraft Enterprise™ — Digital Transformation' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@astacraftsys',
    title: 'Astacraft Enterprise™ — Digital Transformation',
    description: 'Cloud migration, custom software, and a dedicated delivery team. Three engagement models for large organisations.',
    images: ['https://astacraftsystems.com/solutions/enterprise/opengraph-image'],
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Astacraft Enterprise™',
    description: 'Enterprise digital transformation — cloud migration, custom software, infrastructure architecture, transformation roadmap, and dedicated delivery team.',
    provider: { '@type': 'Organization', name: 'Astacraft Systems Limited', url: 'https://astacraftsystems.com' },
    areaServed: [{ '@type': 'Country', name: 'Ghana' }, { '@type': 'Continent', name: 'Africa' }],
    serviceType: 'Digital Transformation and Cloud Migration Services',
    offers: [
      { '@type': 'Offer', name: 'Discovery', price: '5000', priceCurrency: 'GHS', description: 'Systems audit, gap analysis, and transformation roadmap' },
      { '@type': 'Offer', name: 'Project', price: '40000', priceCurrency: 'GHS', description: 'Fixed-scope delivery — cloud migration or custom software' },
      { '@type': 'Offer', name: 'Retainer', price: '8000', priceCurrency: 'GHS', description: 'Dedicated team on monthly managed retainer, GH₵ 8,000–25,000/month' },
    ],
    url: 'https://astacraftsystems.com/solutions/enterprise',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astacraftsystems.com' },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://astacraftsystems.com/solutions' },
      { '@type': 'ListItem', position: 3, name: 'Astacraft Enterprise™', item: 'https://astacraftsystems.com/solutions/enterprise' },
    ],
  },
]

const includes = [
  { Icon: Cloud,   title: 'Cloud Migration',             desc: 'End-to-end migration to AWS, Azure, or GCP — architecture, execution, and post-migration optimisation.' },
  { Icon: Code2,   title: 'Custom Software',             desc: 'Bespoke platforms, APIs, mobile apps, and enterprise systems built to your exact requirements.' },
  { Icon: Network, title: 'Infrastructure Architecture', desc: 'Scalable, secure infrastructure design — networking, compute, storage, and disaster recovery.' },
  { Icon: Map,     title: 'Transformation Roadmap',      desc: 'A structured 12–24 month digital transformation plan aligned with your business strategy and budget.' },
  { Icon: Users2,  title: 'Dedicated Delivery Team',     desc: 'A named project manager, solutions architect, and development team assigned to your account.' },
  { Icon: Globe,   title: 'SLA-Backed Support',          desc: '24/7 technical support with defined SLAs, monthly reviews, and a dedicated account manager.' },
]

const engagementTypes = [
  {
    name: 'Discovery',
    type: 'One-time',
    price: 'GH₵ 5,000 – 12,000',
    priceNote: 'scoping engagement',
    description: 'For organisations that need to understand their technology landscape before committing to a transformation.',
    deliverables: [
      'Current systems audit',
      'Technology gap analysis',
      'Transformation roadmap (3–5 year)',
      'Budget and resource plan',
      'Vendor and platform recommendations',
    ],
    cta: 'Book a Discovery',
    highlighted: false,
  },
  {
    name: 'Project',
    type: 'Fixed-scope delivery',
    price: 'From GH₵ 40,000',
    priceNote: 'per project, scoped on discovery',
    description: 'Fixed-scope delivery for defined transformation initiatives — cloud migration, custom platform, or infrastructure redesign.',
    deliverables: [
      'Dedicated project team',
      'Fixed milestones and delivery schedule',
      'Cloud migration or software delivery',
      'Documentation and knowledge transfer',
      '90-day post-launch support included',
    ],
    cta: 'Start a Project',
    highlighted: true,
    tag: 'Most Common',
  },
  {
    name: 'Retainer',
    type: 'Ongoing managed service',
    price: 'GH₵ 8,000 – 25,000',
    priceNote: '/month, scoped on engagement size',
    description: 'A dedicated Astacraft team embedded in your organisation on an ongoing managed service retainer.',
    deliverables: [
      'Named account manager + architect',
      'Development capacity (agreed monthly hours)',
      'Infrastructure management and optimisation',
      'SLA-backed support and incident response',
      'Monthly executive reporting',
    ],
    cta: 'Discuss Retainer',
    highlighted: false,
  },
]

const forWho = [
  { label: 'Large enterprises',       desc: 'Organisations with complex legacy systems ready for modernisation.' },
  { label: 'Banks & financial orgs',  desc: 'Institutions needing secure, regulated infrastructure at scale.' },
  { label: 'Government agencies',     desc: 'Public sector entities digitizing citizen-facing and back-office services.' },
]

const steps = [
  { num: '01', title: 'Discovery engagement', desc: 'A structured scoping engagement to map your systems, goals, and constraints — delivered as a formal proposal.' },
  { num: '02', title: 'Architecture & design', desc: 'Solution architecture, project plan, and technology selection — aligned with your team before build begins.' },
  { num: '03', title: 'Deliver & transform',   desc: 'Phased delivery with regular milestones, executive reporting, and a dedicated account team throughout.' },
]

export default function EnterprisePage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ─── HERO ─── */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] mt-[72px] pt-20 pb-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-25 pointer-events-none" />
        <div className="absolute top-0 right-[-5%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(var(--ch-accent),0.22)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(var(--ch-green),0.08)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto">
          <div className="flex items-center gap-2 mb-10 hero-in hero-in-1">
            <Link href="/solutions" className="font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.35)] hover:text-[rgba(255,255,255,0.65)] transition-colors duration-150">Solutions</Link>
            <span className="text-[rgba(255,255,255,0.18)]">/</span>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.55)]">Enterprise</span>
          </div>

          <div className="flex items-center gap-3 mb-6 hero-in hero-in-1">
            <div className="w-10 h-10 flex items-center justify-center border border-[rgba(var(--ch-accent),0.35)] bg-[rgba(var(--ch-accent),0.12)]">
              <Globe className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.20em] uppercase px-2.5 py-1 border border-[rgba(var(--ch-accent),0.30)] bg-[rgba(var(--ch-accent),0.10)] text-[rgba(255,255,255,0.70)]">Enterprise</span>
          </div>

          <h1
            className="font-serif font-black text-white leading-[0.90] tracking-[-0.035em] mb-6 hero-in hero-in-2"
            style={{ fontSize: 'clamp(44px,7vw,88px)' }}
          >
            Astacraft Enterprise™
          </h1>
          <p
            className="text-[rgba(255,255,255,0.62)] max-w-[55ch] leading-relaxed mb-10 hero-in hero-in-3"
            style={{ fontSize: 'clamp(15px,1.2vw,18px)' }}
          >
            Full-scale digital transformation for large organisations — three engagement models aligned with how enterprises actually buy: a scoping discovery, a fixed-scope project, or an ongoing managed retainer.
          </p>

          <div className="flex flex-wrap items-center gap-8 mb-10 hero-in hero-in-3">
            <div>
              <span className="font-serif font-black text-white" style={{ fontSize: 'clamp(22px,2.5vw,34px)' }}>GH₵ 5,000</span>
              <span className="font-mono text-[11px] text-[rgba(255,255,255,0.35)] ml-2 tracking-[0.10em] uppercase">from / discovery</span>
            </div>
            <div>
              <span className="font-serif font-black text-white" style={{ fontSize: 'clamp(22px,2.5vw,34px)' }}>GH₵ 8,000</span>
              <span className="font-mono text-[11px] text-[rgba(255,255,255,0.35)] ml-2 tracking-[0.10em] uppercase">from / month retainer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 hero-in hero-in-4">
            <Link
              href="/contact?bundle=enterprise"
              className="btn-shimmer inline-block bg-[var(--color-accent)] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-8 py-4 hover:bg-[var(--color-accent-hover)] transition-colors duration-200"
            >
              Book a Discovery Call →
            </Link>
            <Link
              href="/contact"
              className="inline-block border border-[rgba(255,255,255,0.35)] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-8 py-4 hover:border-[rgba(255,255,255,0.60)] transition-colors duration-200"
            >
              Request a Proposal
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ENGAGEMENT MODELS ─── */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-24">
        <div className="max-w-[1280px] mx-auto">
          <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[rgba(var(--ch-text),0.35)] mb-10 reveal">Engagement Models</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[rgba(var(--ch-border),0.10)]">
            {engagementTypes.map(({ name, type, price, priceNote, description, deliverables, cta, highlighted, tag }, i) => (
              <div
                key={name}
                className={`p-8 border-r border-[rgba(var(--ch-border),0.10)] last:border-r-0 flex flex-col reveal ${highlighted ? 'bg-[var(--color-accent)]' : ''}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <p className={`font-mono text-[11px] tracking-[0.20em] uppercase font-medium ${highlighted ? 'text-[rgba(255,255,255,0.60)]' : 'text-[rgba(var(--ch-text),0.50)]'}`}>{name}</p>
                    {tag && <span className="font-mono text-[8px] tracking-[0.14em] uppercase px-1.5 py-0.5 bg-[var(--color-green)] text-white">{tag}</span>}
                  </div>
                  <p className={`font-mono text-[9px] tracking-[0.14em] uppercase mb-3 ${highlighted ? 'text-[rgba(255,255,255,0.35)]' : 'text-[rgba(var(--ch-text),0.30)]'}`}>{type}</p>
                  <div className="mb-1">
                    <span className={`font-serif font-bold text-[28px] leading-none ${highlighted ? 'text-white' : 'text-[var(--color-text)]'}`}>{price}</span>
                  </div>
                  <p className={`font-mono text-[10px] tracking-[0.10em] ${highlighted ? 'text-[rgba(255,255,255,0.40)]' : 'text-[rgba(var(--ch-text),0.35)]'}`}>{priceNote}</p>
                </div>
                <p className={`text-[13px] leading-relaxed mb-6 ${highlighted ? 'text-[rgba(255,255,255,0.50)]' : 'text-[rgba(var(--ch-text),0.50)]'}`}>{description}</p>
                <div className="space-y-2.5 mb-8 flex-1">
                  {deliverables.map(item => (
                    <div key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-green)] shrink-0 mt-0.5" />
                      <span className={`text-[12px] ${highlighted ? 'text-[rgba(255,255,255,0.65)]' : 'text-[rgba(var(--ch-text),0.65)]'}`}>{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/contact?bundle=enterprise&type=${name.toLowerCase()}`}
                  className={`block w-full text-center font-mono text-[10px] tracking-[0.14em] uppercase font-medium py-3.5 transition-colors duration-200 ${highlighted ? 'bg-[var(--color-green)] text-white hover:bg-[var(--color-green-hover)]' : 'border border-[rgba(var(--ch-accent),0.20)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)]'}`}
                >
                  {cta} →
                </Link>
              </div>
            ))}
          </div>
          <p className="font-mono text-[10px] tracking-[0.10em] text-[rgba(var(--ch-text),0.35)] mt-4">
            All prices in Ghana Cedis (GH₵). Enterprise retainer benchmarked against AWS/Azure partner managed service rates ($3,000–$8,000/month globally). Final pricing scoped on discovery.
          </p>
        </div>
      </section>

      {/* ─── INCLUDES ─── */}
      <section className="bg-[var(--color-surface)] px-[clamp(24px,5vw,80px)] py-24">
        <div className="max-w-[1280px] mx-auto">
          <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[rgba(var(--ch-text),0.35)] mb-10 reveal">What&apos;s Included</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[rgba(var(--ch-border),0.10)]">
            {includes.map(({ Icon, title, desc }, i) => (
              <div
                key={title}
                className="p-8 border-b border-r border-[rgba(var(--ch-border),0.10)] last:border-b-0 reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="w-9 h-9 flex items-center justify-center border border-[rgba(var(--ch-accent),0.15)] bg-[rgba(var(--ch-accent),0.05)] mb-5">
                  <Icon className="w-4 h-4 text-[var(--color-accent)]" />
                </div>
                <h3 className="font-serif font-bold text-[15px] text-[var(--color-text)] mb-2">{title}</h3>
                <p className="text-[13px] text-[rgba(var(--ch-text),0.50)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHO IT'S FOR + HOW IT WORKS ─── */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-24">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16 mb-24 reveal">
            <div>
              <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[rgba(var(--ch-text),0.35)] mb-4">Who It&apos;s For</p>
              <h2 className="font-serif font-bold text-[28px] text-[var(--color-text)] leading-[1.2]">For organisations ready for full transformation</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {forWho.map(({ label, desc }, i) => (
                <div key={label} className="border border-[rgba(var(--ch-border),0.10)] p-6 reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mb-4" />
                  <h3 className="font-serif font-bold text-[15px] text-[var(--color-text)] mb-2">{label}</h3>
                  <p className="text-[13px] text-[rgba(var(--ch-text),0.50)]">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[rgba(var(--ch-text),0.35)] mb-10 reveal">How It Works</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[rgba(var(--ch-border),0.10)]">
            {steps.map(({ num, title, desc }, i) => (
              <div
                key={num}
                className="p-8 border-r border-[rgba(var(--ch-border),0.10)] last:border-r-0 relative reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {i < steps.length - 1 && <ArrowRight className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 text-[rgba(var(--ch-border),0.25)] z-10" />}
                <p className="font-mono text-[11px] tracking-[0.18em] text-[rgba(var(--ch-text),0.25)] mb-4">{num}</p>
                <h3 className="font-serif font-bold text-[17px] text-[var(--color-text)] mb-3">{title}</h3>
                <p className="text-[13px] text-[rgba(var(--ch-text),0.50)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INLINE FORM ─── */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-20 border-t border-[rgba(var(--ch-border),0.08)]">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start reveal">
            <div>
              <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[rgba(var(--ch-text),0.35)] mb-4">Get started</p>
              <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight mb-4" style={{ fontSize: 'clamp(26px,2.5vw,36px)' }}>
                Start with a discovery call.
              </h2>
              <p className="text-[15px] text-[rgba(var(--ch-text),0.55)] leading-relaxed">
                We scope and price your engagement before any commitment. One call, full clarity.
              </p>
            </div>
            <SolutionLeadForm bundle="enterprise" />
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(29,71,118,0.12),transparent)] pointer-events-none" />
        <div className="relative max-w-[700px] mx-auto text-center reveal">
          <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.30)] mb-4">Ready to transform?</p>
          <h2 className="font-serif font-bold text-white mb-4" style={{ fontSize: 'clamp(28px,3vw,48px)' }}>
            Start with a discovery call.
          </h2>
          <p className="text-[rgba(255,255,255,0.50)] mb-10 max-w-[44ch] mx-auto leading-relaxed">
            We scope and price your engagement before any commitment. One call, full clarity.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?bundle=enterprise"
              className="btn-shimmer inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white px-10 py-4 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
            >
              Book a Discovery Call →
            </Link>
            <Link
              href="/solutions"
              className="inline-block border border-[rgba(255,255,255,0.38)] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-10 py-4 hover:border-[rgba(255,255,255,0.65)] transition-colors duration-200"
            >
              View All Bundles
            </Link>
          </div>
        </div>
      </section>
      <SolutionStickyBar bundle="enterprise" name="Astacraft Enterprise™" price="from GH₵ 5,000" />
    </>
  )
}
