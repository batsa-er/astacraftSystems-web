import type { Metadata } from 'next'
import Link from 'next/link'
import { Workflow, FileText, Users2, CheckSquare, Database, MonitorCheck, ArrowRight, CheckCircle2, X } from 'lucide-react'
import { JsonLd } from '@/components/JsonLd'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Astacraft Operations™ — Business Digitization Bundle | Astacraft Systems',
  description: 'Digitize internal operations with workflow automation, document management, and staff portals. From GH₵ 8,500 setup. Fully managed by Astacraft Systems.',
  keywords: 'business digitization Ghana, workflow automation Ghana, document management system Ghana, HR portal Ghana, operations digitization Africa, Astacraft Operations',
  alternates: { canonical: 'https://astacraftsystems.com/solutions/operations' },
  openGraph: {
    title: 'Astacraft Operations™ — Business Digitization Bundle',
    description: 'Replace paper, WhatsApp, and spreadsheets with digital portals, workflow automation, and document management. Fully managed.',
    url: 'https://astacraftsystems.com/solutions/operations',
    siteName: 'Astacraft Systems Limited',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://astacraftsystems.com/solutions/operations/opengraph-image', width: 1200, height: 630, alt: 'Astacraft Operations™ — Business Digitization Bundle' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@astacraftsys',
    title: 'Astacraft Operations™ — Business Digitization Bundle',
    description: 'Replace paper, WhatsApp, and spreadsheets with digital portals and workflow automation.',
    images: ['https://astacraftsystems.com/solutions/operations/opengraph-image'],
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Astacraft Operations™',
    description: 'Business digitization bundle — internal portals, workflow automation, document management, and employee self-service.',
    provider: { '@type': 'Organization', name: 'Astacraft Systems Limited', url: 'https://astacraftsystems.com' },
    areaServed: [{ '@type': 'Country', name: 'Ghana' }, { '@type': 'Continent', name: 'Africa' }],
    serviceType: 'Business Process Digitization and Managed IT Services',
    offers: [
      { '@type': 'Offer', name: 'Standard', price: '8500', priceCurrency: 'GHS', description: 'Operations portal, up to 30 users, 5 workflows' },
      { '@type': 'Offer', name: 'Professional', price: '16500', priceCurrency: 'GHS', description: 'Full portal, up to 80 users, unlimited workflows' },
      { '@type': 'Offer', name: 'Enterprise', price: '32000', priceCurrency: 'GHS', description: 'Custom portal, unlimited users, multi-branch' },
    ],
    url: 'https://astacraftsystems.com/solutions/operations',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astacraftsystems.com' },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://astacraftsystems.com/solutions' },
      { '@type': 'ListItem', position: 3, name: 'Astacraft Operations™', item: 'https://astacraftsystems.com/solutions/operations' },
    ],
  },
]

const includes = [
  { Icon: MonitorCheck, title: 'Operations Portal',     desc: 'A centralized internal portal where your team manages tasks, requests, and approvals.' },
  { Icon: Workflow,     title: 'Workflow Automation',   desc: 'Digitize leave approvals, purchase requests, expense claims, and more.' },
  { Icon: FileText,     title: 'Document Management',   desc: 'Secure, searchable document storage with version control and access permissions.' },
  { Icon: Users2,       title: 'Employee Self-Service', desc: 'Staff portal for HR requests, onboarding documents, payslips, and announcements.' },
  { Icon: CheckSquare,  title: 'Approval Workflows',    desc: 'Digital approval chains replacing paper sign-offs — faster decisions, full audit trail.' },
  { Icon: Database,     title: 'Operations Dashboard',  desc: 'Real-time operational reporting so management sees what is happening across the business.' },
]

const tiers = [
  {
    name: 'Standard',
    users: 'Up to 30 users',
    setup: 'GH₵ 8,500',
    monthly: 'GH₵ 2,200',
    setupLabel: 'project / setup fee',
    monthlyLabel: '/month retainer',
    description: 'Core digitization for growing businesses replacing paper and WhatsApp workflows.',
    highlighted: false,
    features: [
      { label: 'Internal operations portal', included: true },
      { label: 'Up to 30 users', included: true },
      { label: '5 automated workflows', included: true },
      { label: 'Document management (basic)', included: true },
      { label: 'Operations dashboard', included: true },
      { label: 'Employee self-service portal', included: false },
      { label: 'Unlimited workflows', included: false },
      { label: 'Multi-branch support', included: false },
    ],
    cta: 'Get Started',
  },
  {
    name: 'Professional',
    users: 'Up to 80 users',
    setup: 'GH₵ 16,500',
    monthly: 'GH₵ 4,200',
    setupLabel: 'project / setup fee',
    monthlyLabel: '/month retainer',
    description: 'Full operations digitization with self-service portal and approval chains.',
    highlighted: true,
    tag: 'Most Popular',
    features: [
      { label: 'Internal operations portal', included: true },
      { label: 'Up to 80 users', included: true },
      { label: 'Unlimited automated workflows', included: true },
      { label: 'Document management (full + versioning)', included: true },
      { label: 'Custom operations dashboard', included: true },
      { label: 'Employee self-service portal', included: true },
      { label: 'Digital approval workflows', included: true },
      { label: 'Multi-branch support', included: false },
    ],
    cta: 'Get Started',
  },
  {
    name: 'Enterprise',
    users: 'Unlimited users',
    setup: 'From GH₵ 32,000',
    monthly: 'From GH₵ 7,500',
    setupLabel: 'project / setup fee',
    monthlyLabel: '/month retainer',
    description: 'Custom portals, multi-branch operations, and dedicated delivery team.',
    highlighted: false,
    features: [
      { label: 'Custom operations portal', included: true },
      { label: 'Unlimited users', included: true },
      { label: 'Unlimited automated workflows', included: true },
      { label: 'Enterprise document management', included: true },
      { label: 'Custom BI dashboard', included: true },
      { label: 'Employee self-service portal', included: true },
      { label: 'Digital approval workflows', included: true },
      { label: 'Multi-branch + API integrations', included: true },
    ],
    cta: 'Request a Proposal',
  },
]

const forWho = [
  { label: 'Mid-size businesses',  desc: '50+ employees running on paper, WhatsApp, and spreadsheets.' },
  { label: 'Multi-branch orgs',    desc: 'Companies with multiple locations needing unified operations.' },
  { label: 'HR & finance teams',   desc: 'Teams drowning in manual approval and document management.' },
]

const steps = [
  { num: '01', title: 'Process mapping',    desc: 'We document your current workflows, identify bottlenecks, and design the digital equivalents.' },
  { num: '02', title: 'Build & configure',  desc: 'Portals, automations, and document systems are built and connected to your existing data.' },
  { num: '03', title: 'Rollout & training', desc: 'Phased rollout across departments with hands-on training and a dedicated change management plan.' },
]

export default function OperationsPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ─── HERO ─── */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] mt-[72px] pt-20 pb-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-25 pointer-events-none" />
        <div className="absolute top-0 right-[-5%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(var(--ch-accent),0.22)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[5%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(var(--ch-green),0.08)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto">
          <div className="flex items-center gap-2 mb-10 hero-in hero-in-1">
            <Link href="/solutions" className="font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.35)] hover:text-[rgba(255,255,255,0.65)] transition-colors duration-150">Solutions</Link>
            <span className="text-[rgba(255,255,255,0.18)]">/</span>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.55)]">Operations</span>
          </div>

          <div className="flex items-center gap-3 mb-6 hero-in hero-in-1">
            <div className="w-10 h-10 flex items-center justify-center border border-[rgba(var(--ch-accent),0.35)] bg-[rgba(var(--ch-accent),0.12)]">
              <Workflow className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.20em] uppercase px-2.5 py-1 border border-[rgba(var(--ch-accent),0.30)] bg-[rgba(var(--ch-accent),0.10)] text-[rgba(255,255,255,0.70)]">Digitization</span>
          </div>

          <h1
            className="font-serif font-black text-white leading-[0.90] tracking-[-0.035em] mb-6 hero-in hero-in-2"
            style={{ fontSize: 'clamp(44px,7vw,88px)' }}
          >
            Astacraft Operations™
          </h1>
          <p
            className="text-[rgba(255,255,255,0.62)] max-w-[55ch] leading-relaxed mb-10 hero-in hero-in-3"
            style={{ fontSize: 'clamp(15px,1.2vw,18px)' }}
          >
            Replace paper, WhatsApp, and spreadsheets with digital systems — internal portals, automated workflows, and document management.
          </p>

          <div className="flex items-center gap-6 mb-10 hero-in hero-in-3">
            <div>
              <span className="font-serif font-black text-white" style={{ fontSize: 'clamp(28px,3vw,44px)' }}>GH₵ 8,500</span>
              <span className="font-mono text-[11px] text-[rgba(255,255,255,0.35)] ml-2 tracking-[0.10em] uppercase">from / project</span>
            </div>
            <span className="text-[rgba(255,255,255,0.18)] text-xl">+</span>
            <div>
              <span className="font-serif font-black text-white" style={{ fontSize: 'clamp(22px,2.5vw,34px)' }}>GH₵ 2,200</span>
              <span className="font-mono text-[11px] text-[rgba(255,255,255,0.35)] ml-2 tracking-[0.10em] uppercase">/month</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 hero-in hero-in-4">
            <Link
              href="/contact?bundle=operations"
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
            {tiers.map(({ name, users, setup, monthly, setupLabel, monthlyLabel, description, highlighted, tag, features, cta }, i) => (
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
                    <span className={`font-serif font-bold text-[32px] leading-none ${highlighted ? 'text-white' : 'text-[var(--color-text)]'}`}>{setup}</span>
                  </div>
                  <p className={`font-mono text-[11px] tracking-[0.10em] mb-1 ${highlighted ? 'text-[rgba(255,255,255,0.40)]' : 'text-[rgba(var(--ch-text),0.35)]'}`}>{setupLabel}</p>
                  <p className={`font-mono text-[13px] font-medium mt-2 ${highlighted ? 'text-[rgba(255,255,255,0.70)]' : 'text-[rgba(var(--ch-text),0.55)]'}`}>
                    {monthly}<span className={`text-[11px] font-normal ${highlighted ? 'text-[rgba(255,255,255,0.40)]' : 'text-[rgba(var(--ch-text),0.35)]'}`}>{monthlyLabel}</span>
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
                  href={`/contact?bundle=operations&tier=${name.toLowerCase()}`}
                  className={`block w-full text-center font-mono text-[10px] tracking-[0.14em] uppercase font-medium py-3.5 transition-colors duration-200 ${highlighted ? 'bg-[var(--color-green)] text-white hover:bg-[var(--color-green-hover)]' : 'border border-[rgba(var(--ch-accent),0.20)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)]'}`}
                >
                  {cta} →
                </Link>
              </div>
            ))}
          </div>
          <p className="font-mono text-[10px] tracking-[0.10em] text-[rgba(var(--ch-text),0.35)] mt-4">
            All prices in Ghana Cedis (GH₵). Setup is the project delivery fee; monthly retainer covers managed service, licences, and support. Enterprise scoped on discovery.
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
              <h2 className="font-serif font-bold text-[28px] text-[var(--color-text)] leading-[1.2]">For businesses still running on manual processes</h2>
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
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.35)] mb-2">Protect what you&apos;ve built?</p>
              <h3 className="font-serif font-bold text-[20px] text-[var(--color-text)]">Add Astacraft Secure™</h3>
              <p className="text-[14px] text-[rgba(var(--ch-text),0.50)] mt-1">24/7 monitoring, endpoint protection, and compliance to secure your digital systems.</p>
            </div>
            <Link href="/solutions/secure" className="shrink-0 flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-accent)] hover:gap-3 transition-all duration-200">
              View Secure bundle <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(29,71,118,0.12),transparent)] pointer-events-none" />
        <div className="relative max-w-[700px] mx-auto text-center reveal">
          <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.30)] mb-4">Ready to digitize?</p>
          <h2 className="font-serif font-bold text-white mb-4" style={{ fontSize: 'clamp(28px,3vw,48px)' }}>
            Replace manual processes today.
          </h2>
          <p className="text-[rgba(255,255,255,0.50)] mb-10 max-w-[44ch] mx-auto leading-relaxed">
            Get a proposal in 24 hours. No obligation, no commitment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?bundle=operations"
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
