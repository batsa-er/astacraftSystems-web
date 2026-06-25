import type { Metadata } from 'next'
import Link from 'next/link'
import { TrendingUp, Users, Mail, Zap, MessageSquare, BarChart3, ArrowRight, CheckCircle2, X } from 'lucide-react'
import { JsonLd } from '@/components/JsonLd'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Astacraft Growth™ — SME CRM & Automation Bundle | Astacraft Systems',
  description: 'CRM, workflow automation, and collaboration tools for SMEs ready to scale. Odoo and HubSpot implementations with managed service. From GH₵ 5,500 setup.',
  keywords: 'CRM implementation Ghana, Odoo Ghana, HubSpot Ghana, SME automation Ghana, business growth bundle Ghana, Astacraft Growth',
  alternates: { canonical: 'https://astacraftsystems.com/solutions/growth' },
  openGraph: {
    title: 'Astacraft Growth™ — SME CRM & Automation Bundle',
    description: 'CRM, automation, and collaboration tools for SMEs ready to scale without scaling headcount. Odoo and HubSpot implementations fully managed.',
    url: 'https://astacraftsystems.com/solutions/growth',
    siteName: 'Astacraft Systems Limited',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://astacraftsystems.com/solutions/growth/opengraph-image', width: 1200, height: 630, alt: 'Astacraft Growth™ — SME CRM & Automation Bundle' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@astacraftsys',
    title: 'Astacraft Growth™ — SME CRM & Automation Bundle',
    description: 'CRM, automation, and collaboration tools for SMEs ready to scale without scaling headcount.',
    images: ['https://astacraftsystems.com/solutions/growth/opengraph-image'],
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Astacraft Growth™',
    description: 'SME scaling bundle — CRM, workflow automation, email marketing, and collaboration tools. Odoo and HubSpot implementations fully managed.',
    provider: { '@type': 'Organization', name: 'Astacraft Systems Limited', url: 'https://astacraftsystems.com' },
    areaServed: [{ '@type': 'Country', name: 'Ghana' }, { '@type': 'Continent', name: 'Africa' }],
    serviceType: 'CRM Implementation and Managed IT Services',
    offers: [
      { '@type': 'Offer', name: 'Starter', price: '5500', priceCurrency: 'GHS', description: 'CRM up to 5 users, 2 workflows, email marketing' },
      { '@type': 'Offer', name: 'Standard', price: '11000', priceCurrency: 'GHS', description: 'CRM up to 15 users, 5 workflows, full marketing stack' },
      { '@type': 'Offer', name: 'Scale', price: '22000', priceCurrency: 'GHS', description: 'CRM + ERP unlimited users, unlimited workflows' },
    ],
    url: 'https://astacraftsystems.com/solutions/growth',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astacraftsystems.com' },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://astacraftsystems.com/solutions' },
      { '@type': 'ListItem', position: 3, name: 'Astacraft Growth™', item: 'https://astacraftsystems.com/solutions/growth' },
    ],
  },
]

const includes = [
  { Icon: Users,         title: 'CRM Platform',         desc: 'Odoo, Zoho, or HubSpot configured for your sales pipeline, customer data, and follow-ups.' },
  { Icon: TrendingUp,    title: 'Website Upgrade',      desc: 'Redesign or upgrade your existing website with conversion-focused pages and SEO.' },
  { Icon: Mail,          title: 'Email Automation',     desc: 'Welcome sequences, follow-ups, and campaign infrastructure — set up and managed.' },
  { Icon: Zap,           title: 'Workflow Automation',  desc: 'Automate repetitive processes: quotes, onboarding, invoicing, and client follow-ups.' },
  { Icon: MessageSquare, title: 'Collaboration Suite',  desc: 'Slack or Microsoft Teams setup with channels, integrations, and team onboarding.' },
  { Icon: BarChart3,     title: 'Reporting Dashboard',  desc: "Sales and pipeline dashboard so leadership sees what's working and what isn't." },
]

const tiers = [
  {
    name: 'Starter',
    users: 'Up to 5 users',
    setup: 'GH₵ 5,500',
    monthly: 'GH₵ 1,500',
    description: 'CRM and basic automation for small teams moving off spreadsheets.',
    highlighted: false,
    features: [
      { label: 'CRM (Zoho / Odoo Community)', included: true },
      { label: 'Up to 5 users', included: true },
      { label: '2 automated workflows', included: true },
      { label: 'Basic email marketing setup', included: true },
      { label: 'Reporting dashboard', included: true },
      { label: 'Website upgrade', included: false },
      { label: 'Collaboration tools (Slack/Teams)', included: false },
      { label: 'Unlimited workflows', included: false },
    ],
    cta: 'Get Started',
  },
  {
    name: 'Standard',
    users: 'Up to 15 users',
    setup: 'GH₵ 11,000',
    monthly: 'GH₵ 3,000',
    description: 'Full CRM, automation, and collaboration for growing SMEs.',
    highlighted: true,
    tag: 'Most Popular',
    features: [
      { label: 'CRM (Odoo Standard or HubSpot Starter)', included: true },
      { label: 'Up to 15 users', included: true },
      { label: '5 automated workflows', included: true },
      { label: 'Email automation + campaign tools', included: true },
      { label: 'Reporting dashboard', included: true },
      { label: 'Website upgrade', included: true },
      { label: 'Collaboration tools (Slack/Teams)', included: true },
      { label: 'Unlimited workflows', included: false },
    ],
    cta: 'Get Started',
  },
  {
    name: 'Scale',
    users: 'Unlimited users',
    setup: 'GH₵ 22,000',
    monthly: 'GH₵ 5,500',
    description: 'Full CRM + ERP stack with unlimited automation and dedicated support.',
    highlighted: false,
    features: [
      { label: 'CRM + ERP (Odoo Enterprise or HubSpot Pro)', included: true },
      { label: 'Unlimited users', included: true },
      { label: 'Unlimited automated workflows', included: true },
      { label: 'Full marketing automation stack', included: true },
      { label: 'Custom reporting + BI dashboard', included: true },
      { label: 'Website upgrade + SEO retainer', included: true },
      { label: 'Collaboration tools (Slack/Teams)', included: true },
      { label: 'Dedicated account manager', included: true },
    ],
    cta: 'Get Started',
  },
]

const forWho = [
  { label: 'Growing SMEs',       desc: 'Businesses with 5–50 employees ready to stop doing everything manually.' },
  { label: 'Sales teams',        desc: 'Teams losing deals because leads fall through the cracks.' },
  { label: 'Service businesses', desc: 'Agencies, consultancies, and professional firms scaling client delivery.' },
]

const steps = [
  { num: '01', title: 'Systems audit',     desc: 'We review your current tools, processes, and gaps before recommending a configuration.' },
  { num: '02', title: 'Build & integrate', desc: 'CRM, email, and automation are set up and connected to your existing systems.' },
  { num: '03', title: 'Train & optimise',  desc: 'Your team is trained and we optimise the first 90 days based on real usage data.' },
]

export default function GrowthPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ─── HERO ─── */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] mt-[72px] pt-20 pb-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-25 pointer-events-none" />
        <div className="absolute top-0 right-[-5%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(var(--ch-accent),0.22)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[5%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(var(--ch-green),0.10)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto">
          <div className="flex items-center gap-2 mb-10 hero-in hero-in-1">
            <Link href="/solutions" className="font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.35)] hover:text-[rgba(255,255,255,0.65)] transition-colors duration-150">Solutions</Link>
            <span className="text-[rgba(255,255,255,0.18)]">/</span>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.55)]">Growth</span>
          </div>

          <div className="flex items-center gap-3 mb-6 hero-in hero-in-1">
            <div className="w-10 h-10 flex items-center justify-center border border-[rgba(var(--ch-accent),0.35)] bg-[rgba(var(--ch-accent),0.12)]">
              <TrendingUp className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.20em] uppercase px-2.5 py-1 border border-[rgba(var(--ch-accent),0.30)] bg-[rgba(var(--ch-accent),0.10)] text-[rgba(255,255,255,0.70)]">SMEs</span>
          </div>

          <h1
            className="font-serif font-black text-white leading-[0.90] tracking-[-0.035em] mb-6 hero-in hero-in-2"
            style={{ fontSize: 'clamp(44px,7vw,88px)' }}
          >
            Astacraft Growth™
          </h1>
          <p
            className="text-[rgba(255,255,255,0.62)] max-w-[55ch] leading-relaxed mb-10 hero-in hero-in-3"
            style={{ fontSize: 'clamp(15px,1.2vw,18px)' }}
          >
            The CRM, automation, and collaboration systems your business needs to scale — without scaling headcount.
          </p>

          <div className="flex items-center gap-6 mb-10 hero-in hero-in-3">
            <div>
              <span className="font-serif font-black text-white" style={{ fontSize: 'clamp(28px,3vw,44px)' }}>GH₵ 5,500</span>
              <span className="font-mono text-[11px] text-[rgba(255,255,255,0.35)] ml-2 tracking-[0.10em] uppercase">from / setup</span>
            </div>
            <span className="text-[rgba(255,255,255,0.18)] text-xl">+</span>
            <div>
              <span className="font-serif font-black text-white" style={{ fontSize: 'clamp(22px,2.5vw,34px)' }}>GH₵ 1,500</span>
              <span className="font-mono text-[11px] text-[rgba(255,255,255,0.35)] ml-2 tracking-[0.10em] uppercase">/month</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 hero-in hero-in-4">
            <Link
              href="/contact?bundle=growth"
              className="btn-shimmer inline-block bg-[var(--color-accent)] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-8 py-4 hover:bg-[var(--color-accent-hover)] transition-colors duration-200"
            >
              Start a Project →
            </Link>
            <Link
              href="/contact"
              className="inline-block border border-[rgba(255,255,255,0.35)] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-8 py-4 hover:border-[rgba(255,255,255,0.60)] transition-colors duration-200"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-24">
        <div className="max-w-[1280px] mx-auto">
          <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[rgba(var(--ch-text),0.35)] mb-10 reveal">Pricing</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[rgba(var(--ch-border),0.10)]">
            {tiers.map(({ name, users, setup, monthly, description, highlighted, tag, features, cta }, i) => (
              <div
                key={name}
                className={`p-8 border-r border-[rgba(var(--ch-border),0.10)] last:border-r-0 flex flex-col reveal ${highlighted ? 'bg-[var(--color-accent)]' : ''}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <p className={`font-mono text-[11px] tracking-[0.20em] uppercase font-medium ${highlighted ? 'text-[rgba(255,255,255,0.60)]' : 'text-[rgba(var(--ch-text),0.50)]'}`}>{name}</p>
                    {tag && <span className="font-mono text-[8px] tracking-[0.14em] uppercase px-1.5 py-0.5 bg-[var(--color-green)] text-white">{tag}</span>}
                  </div>
                  <p className={`font-mono text-[9px] tracking-[0.14em] uppercase mb-3 ${highlighted ? 'text-[rgba(255,255,255,0.35)]' : 'text-[rgba(var(--ch-text),0.30)]'}`}>{users}</p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={`font-serif font-bold text-[36px] leading-none ${highlighted ? 'text-white' : 'text-[var(--color-text)]'}`}>{setup}</span>
                  </div>
                  <p className={`font-mono text-[11px] tracking-[0.10em] mb-1 ${highlighted ? 'text-[rgba(255,255,255,0.40)]' : 'text-[rgba(var(--ch-text),0.35)]'}`}>one-time setup</p>
                  <p className={`font-mono text-[13px] font-medium mt-2 ${highlighted ? 'text-[rgba(255,255,255,0.70)]' : 'text-[rgba(var(--ch-text),0.55)]'}`}>
                    {monthly}<span className={`text-[11px] font-normal ${highlighted ? 'text-[rgba(255,255,255,0.40)]' : 'text-[rgba(var(--ch-text),0.35)]'}`}>/month managed service</span>
                  </p>
                </div>
                <p className={`text-[13px] leading-relaxed mb-6 ${highlighted ? 'text-[rgba(255,255,255,0.50)]' : 'text-[rgba(var(--ch-text),0.50)]'}`}>{description}</p>
                <div className="space-y-2.5 mb-8 flex-1">
                  {features.map(({ label, included }) => (
                    <div key={label} className="flex items-center gap-2.5">
                      {included
                        ? <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-green)] shrink-0" />
                        : <X className={`w-3.5 h-3.5 shrink-0 ${highlighted ? 'text-[rgba(255,255,255,0.20)]' : 'text-[rgba(var(--ch-text),0.20)]'}`} />
                      }
                      <span className={`text-[12px] ${included ? (highlighted ? 'text-[rgba(255,255,255,0.65)]' : 'text-[rgba(var(--ch-text),0.65)]') : (highlighted ? 'text-[rgba(255,255,255,0.25)]' : 'text-[rgba(var(--ch-text),0.30)]')}`}>{label}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/contact?bundle=growth&tier=${name.toLowerCase()}`}
                  className={`block w-full text-center font-mono text-[10px] tracking-[0.14em] uppercase font-medium py-3.5 transition-colors duration-200 ${highlighted ? 'bg-[var(--color-green)] text-white hover:bg-[var(--color-green-hover)]' : 'border border-[rgba(var(--ch-accent),0.20)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)]'}`}
                >
                  {cta} →
                </Link>
              </div>
            ))}
          </div>
          <p className="font-mono text-[10px] tracking-[0.10em] text-[rgba(var(--ch-text),0.35)] mt-4">
            All prices in Ghana Cedis (GH₵). Monthly fee includes platform licences (Odoo/Zoho/HubSpot), managed service, and support. Prices subject to user count and scope.
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
              <h2 className="font-serif font-bold text-[28px] text-[var(--color-text)] leading-[1.2]">SMEs ready to grow without growing pains</h2>
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

      {/* ─── UPGRADE PATH ─── */}
      <section className="bg-[var(--color-surface)] px-[clamp(24px,5vw,80px)] py-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="border border-[rgba(var(--ch-border),0.10)] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 reveal">
            <div>
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.35)] mb-2">Ready to digitize?</p>
              <h3 className="font-serif font-bold text-[20px] text-[var(--color-text)]">Upgrade to Astacraft Operations™</h3>
              <p className="text-[14px] text-[rgba(var(--ch-text),0.50)] mt-1">Add internal portals, document management, and approval workflows.</p>
            </div>
            <Link href="/solutions/operations" className="shrink-0 flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-accent)] hover:gap-3 transition-all duration-200">
              View Operations bundle <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(29,71,118,0.12),transparent)] pointer-events-none" />
        <div className="relative max-w-[700px] mx-auto text-center reveal">
          <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.30)] mb-4">Ready to scale?</p>
          <h2 className="font-serif font-bold text-white mb-4" style={{ fontSize: 'clamp(28px,3vw,48px)' }}>
            Build the systems your business needs.
          </h2>
          <p className="text-[rgba(255,255,255,0.50)] mb-10 max-w-[44ch] mx-auto leading-relaxed">
            Get a proposal in 24 hours. No obligation, no commitment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?bundle=growth"
              className="btn-shimmer inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white px-10 py-4 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
            >
              Start a Project →
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
    </>
  )
}
