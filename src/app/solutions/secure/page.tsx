import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, Eye, HardDrive, ClipboardList, BookOpen, AlertTriangle, ArrowRight, CheckCircle2, X } from 'lucide-react'
import { JsonLd } from '@/components/JsonLd'
import { SolutionStickyBar } from '@/components/SolutionStickyBar'
import { SolutionLeadForm } from '@/components/SolutionLeadForm'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Astacraft Secure™ — Managed Cybersecurity Bundle | Astacraft Systems',
  description: '24/7 SOC monitoring, endpoint protection, backup & recovery, and compliance for African businesses. MSP model from GH₵ 2,000/month. No setup fee.',
  keywords: 'managed cybersecurity Ghana, SOC monitoring Ghana, endpoint protection Ghana, cybersecurity MSP Africa, ISO 27001 Ghana, NDPA compliance Ghana, Astacraft Secure',
  alternates: { canonical: 'https://astacraftsystems.com/solutions/secure' },
  openGraph: {
    title: 'Astacraft Secure™ — Managed Cybersecurity Bundle',
    description: '24/7 SOC monitoring, endpoint protection, backup & recovery, and compliance. Enterprise-grade security for African businesses of every size.',
    url: 'https://astacraftsystems.com/solutions/secure',
    siteName: 'Astacraft Systems Limited',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://astacraftsystems.com/solutions/secure/opengraph-image', width: 1200, height: 630, alt: 'Astacraft Secure™ — Managed Cybersecurity Bundle' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@astacraftsys',
    title: 'Astacraft Secure™ — Managed Cybersecurity Bundle',
    description: '24/7 SOC monitoring, endpoint protection, and compliance. Enterprise-grade security for African businesses.',
    images: ['https://astacraftsystems.com/solutions/secure/opengraph-image'],
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Astacraft Secure™',
    description: 'Managed cybersecurity bundle — 24/7 SOC monitoring, endpoint protection, backup & recovery, compliance assessment, and staff security training.',
    provider: { '@type': 'Organization', name: 'Astacraft Systems Limited', url: 'https://astacraftsystems.com' },
    areaServed: [{ '@type': 'Country', name: 'Ghana' }, { '@type': 'Continent', name: 'Africa' }],
    serviceType: 'Managed Security Services',
    offers: [
      { '@type': 'Offer', name: 'Essentials', price: '2000', priceCurrency: 'GHS', description: 'Endpoint protection + backup, up to 20 users, GH₵ 2,000/month' },
      { '@type': 'Offer', name: 'Business', price: '5500', priceCurrency: 'GHS', description: '24/7 SOC + EDR + backup + training, up to 60 users, GH₵ 5,500/month' },
      { '@type': 'Offer', name: 'Enterprise', price: '9500', priceCurrency: 'GHS', description: 'Full SOC + compliance + incident response SLA, 60+ users' },
    ],
    url: 'https://astacraftsystems.com/solutions/secure',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astacraftsystems.com' },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://astacraftsystems.com/solutions' },
      { '@type': 'ListItem', position: 3, name: 'Astacraft Secure™', item: 'https://astacraftsystems.com/solutions/secure' },
    ],
  },
]

const ACCENT = '#C0392B'
const ACCENT_RGB = '192,57,43'

const includes = [
  { Icon: Eye,           title: '24/7 SOC Monitoring',     desc: 'Round-the-clock Security Operations Centre with real-time threat detection and response.' },
  { Icon: ShieldCheck,   title: 'Endpoint Protection',     desc: 'EDR + advanced antivirus across all company computers and mobile devices.' },
  { Icon: HardDrive,     title: 'Backup & Recovery',       desc: 'Automated daily backups with tested recovery procedures and offsite encrypted storage.' },
  { Icon: ClipboardList, title: 'Compliance Assessment',   desc: 'Gap analysis against ISO 27001, NDPA, PCI-DSS, or sector-specific requirements.' },
  { Icon: BookOpen,      title: 'Staff Security Training',  desc: 'Phishing simulation and security awareness training for all employees — quarterly.' },
  { Icon: AlertTriangle, title: 'Incident Response',       desc: 'Documented incident response plan and on-call support when a security event occurs.' },
]

const tiers = [
  {
    name: 'Essentials',
    users: 'Up to 20 users',
    monthly: 'GH₵ 2,000',
    perUser: '~GH₵ 100/user',
    description: 'Core endpoint protection and backup for small businesses.',
    highlighted: false,
    features: [
      { label: 'Endpoint protection (all devices)', included: true },
      { label: 'Up to 20 users / devices', included: true },
      { label: 'Automated daily backups', included: true },
      { label: 'Basic threat monitoring', included: true },
      { label: 'Monthly security report', included: true },
      { label: '24/7 SOC monitoring', included: false },
      { label: 'Compliance assessment', included: false },
      { label: 'Incident response SLA', included: false },
    ],
    cta: 'Get Started',
  },
  {
    name: 'Business',
    users: 'Up to 60 users',
    monthly: 'GH₵ 5,500',
    perUser: '~GH₵ 92/user',
    description: '24/7 SOC monitoring, EDR, backup, and staff training — MSP standard.',
    highlighted: true,
    tag: 'Most Popular',
    features: [
      { label: 'Endpoint protection (all devices)', included: true },
      { label: 'Up to 60 users / devices', included: true },
      { label: 'Automated daily backups + tested recovery', included: true },
      { label: '24/7 SOC threat monitoring', included: true },
      { label: 'Monthly security + compliance report', included: true },
      { label: 'Quarterly staff security training', included: true },
      { label: 'Compliance gap assessment (annual)', included: true },
      { label: '4-hour incident response SLA', included: false },
    ],
    cta: 'Get Started',
  },
  {
    name: 'Enterprise',
    users: '60+ users',
    monthly: 'From GH₵ 9,500',
    perUser: 'Custom per-user rate',
    description: 'Full SOC + compliance program with SLA-backed incident response.',
    highlighted: false,
    features: [
      { label: 'Endpoint protection (all devices)', included: true },
      { label: 'Unlimited users / devices', included: true },
      { label: 'Automated backups + DR testing', included: true },
      { label: '24/7 SOC threat monitoring', included: true },
      { label: 'Weekly security reporting + SIEM', included: true },
      { label: 'Quarterly staff security training', included: true },
      { label: 'Full compliance program (ISO/NDPA/PCI)', included: true },
      { label: '4-hour incident response SLA', included: true },
    ],
    cta: 'Request a Proposal',
  },
]

const forWho = [
  { label: 'Financial businesses',    desc: 'Banks, fintechs, and businesses handling customer financial data.' },
  { label: 'Healthcare providers',    desc: 'Hospitals and clinics managing sensitive patient records.' },
  { label: 'Regulated organisations', desc: 'Businesses subject to NDPA, PCI-DSS, or ISO compliance requirements.' },
]

const steps = [
  { num: '01', title: 'Security audit',     desc: 'We assess your current posture — systems, devices, access controls, and vulnerabilities.' },
  { num: '02', title: 'Deploy & configure', desc: 'Monitoring, endpoint protection, and backup systems are deployed to your environment.' },
  { num: '03', title: 'Monitor & respond',  desc: 'Ongoing 24/7 monitoring with monthly reporting and immediate incident response.' },
]

export default function SecurePage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ─── HERO ─── */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] mt-[72px] pt-20 pb-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-25 pointer-events-none" />
        <div
          className="absolute top-0 right-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, rgba(${ACCENT_RGB},0.18) 0%, transparent 60%)` }}
        />
        <div className="absolute bottom-[-10%] left-[5%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(var(--ch-accent),0.08)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto">
          <div className="flex items-center gap-2 mb-10 hero-in hero-in-1">
            <Link href="/solutions" className="font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.35)] hover:text-[rgba(255,255,255,0.65)] transition-colors duration-150">Solutions</Link>
            <span className="text-[rgba(255,255,255,0.18)]">/</span>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.55)]">Secure</span>
          </div>

          <div className="flex items-center gap-3 mb-6 hero-in hero-in-1">
            <div
              className="w-10 h-10 flex items-center justify-center border"
              style={{ borderColor: `rgba(${ACCENT_RGB},0.40)`, backgroundColor: `rgba(${ACCENT_RGB},0.14)` }}
            >
              <ShieldCheck className="w-5 h-5" style={{ color: ACCENT }} />
            </div>
            <span
              className="font-mono text-[10px] tracking-[0.20em] uppercase px-2.5 py-1 border"
              style={{ color: ACCENT, borderColor: `rgba(${ACCENT_RGB},0.35)`, backgroundColor: `rgba(${ACCENT_RGB},0.10)` }}
            >
              Security
            </span>
          </div>

          <h1
            className="font-serif font-black text-white leading-[0.90] tracking-[-0.035em] mb-6 hero-in hero-in-2"
            style={{ fontSize: 'clamp(44px,7vw,88px)' }}
          >
            Astacraft Secure™
          </h1>
          <p
            className="text-[rgba(255,255,255,0.62)] max-w-[55ch] leading-relaxed mb-10 hero-in hero-in-3"
            style={{ fontSize: 'clamp(15px,1.2vw,18px)' }}
          >
            Managed cybersecurity on the per-user MSP model — the same standard used by Microsoft and AWS partners globally, priced for African businesses. No setup fee.
          </p>

          <div className="flex items-center gap-6 mb-10 hero-in hero-in-3">
            <div>
              <span className="font-serif font-black text-white" style={{ fontSize: 'clamp(28px,3vw,44px)' }}>GH₵ 2,000</span>
              <span className="font-mono text-[11px] text-[rgba(255,255,255,0.35)] ml-2 tracking-[0.10em] uppercase">from / month</span>
            </div>
            <span className="font-mono text-[11px] text-[rgba(255,255,255,0.25)] uppercase tracking-[0.12em]">No setup fee</span>
          </div>

          <div className="flex flex-wrap gap-4 hero-in hero-in-4">
            <Link
              href="/contact?bundle=secure"
              className="btn-shimmer inline-block text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-8 py-4 transition-colors duration-200"
              style={{ backgroundColor: ACCENT }}
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
          <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[rgba(var(--ch-text),0.35)] mb-10 reveal">Pricing — MSP Monthly</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[rgba(var(--ch-border),0.10)]">
            {tiers.map(({ name, users, monthly, perUser, description, highlighted, tag, features, cta }, i) => (
              <div
                key={name}
                className={`p-8 border-r border-[rgba(var(--ch-border),0.10)] last:border-r-0 flex flex-col reveal ${highlighted ? 'bg-[var(--color-dark)]' : ''}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <p className={`font-mono text-[11px] tracking-[0.20em] uppercase font-medium ${highlighted ? 'text-[rgba(255,255,255,0.60)]' : 'text-[rgba(var(--ch-text),0.50)]'}`}>{name}</p>
                    {tag && <span className="font-mono text-[8px] tracking-[0.14em] uppercase px-1.5 py-0.5 text-white" style={{ backgroundColor: ACCENT }}>{tag}</span>}
                  </div>
                  <p className={`font-mono text-[9px] tracking-[0.14em] uppercase mb-3 ${highlighted ? 'text-[rgba(255,255,255,0.35)]' : 'text-[rgba(var(--ch-text),0.30)]'}`}>{users}</p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={`font-serif font-bold text-[36px] leading-none ${highlighted ? 'text-white' : 'text-[var(--color-text)]'}`}>{monthly}</span>
                  </div>
                  <p className={`font-mono text-[11px] tracking-[0.10em] mb-1 ${highlighted ? 'text-[rgba(255,255,255,0.40)]' : 'text-[rgba(var(--ch-text),0.35)]'}`}>/month managed service</p>
                  <p className={`font-mono text-[10px] ${highlighted ? 'text-[rgba(255,255,255,0.30)]' : 'text-[rgba(var(--ch-text),0.30)]'}`}>{perUser}</p>
                </div>
                <p className={`text-[13px] leading-relaxed mb-6 ${highlighted ? 'text-[rgba(255,255,255,0.50)]' : 'text-[rgba(var(--ch-text),0.50)]'}`}>{description}</p>
                <div className="space-y-2.5 mb-8 flex-1">
                  {features.map(({ label, included }) => (
                    <div key={label} className="flex items-center gap-2.5">
                      {included
                        ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[var(--color-green)]" />
                        : <X className={`w-3.5 h-3.5 shrink-0 ${highlighted ? 'text-[rgba(255,255,255,0.20)]' : 'text-[rgba(var(--ch-text),0.20)]'}`} />
                      }
                      <span className={`text-[12px] ${included ? (highlighted ? 'text-[rgba(255,255,255,0.65)]' : 'text-[rgba(var(--ch-text),0.65)]') : (highlighted ? 'text-[rgba(255,255,255,0.25)]' : 'text-[rgba(var(--ch-text),0.30)]')}`}>{label}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/contact?bundle=secure&tier=${name.toLowerCase()}`}
                  className={`block w-full text-center font-mono text-[10px] tracking-[0.14em] uppercase font-medium py-3.5 transition-colors duration-200 ${highlighted ? 'text-white' : 'border text-white'}`}
                  style={highlighted
                    ? { backgroundColor: ACCENT }
                    : { borderColor: `rgba(${ACCENT_RGB},0.30)`, color: ACCENT, backgroundColor: 'transparent' }
                  }
                >
                  {cta} →
                </Link>
              </div>
            ))}
          </div>
          <p className="font-mono text-[10px] tracking-[0.10em] text-[rgba(var(--ch-text),0.35)] mt-4">
            All prices in Ghana Cedis (GH₵). Pure MSP monthly model — no setup fee. Benchmarked against $50–80/user/month global MSP rates. Prices scale with user count.
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
                <div
                  className="w-9 h-9 flex items-center justify-center border mb-5"
                  style={{ borderColor: `rgba(${ACCENT_RGB},0.20)`, backgroundColor: `rgba(${ACCENT_RGB},0.06)` }}
                >
                  <Icon className="w-4 h-4" style={{ color: ACCENT }} />
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
              <h2 className="font-serif font-bold text-[28px] text-[var(--color-text)] leading-[1.2]">For businesses that can&apos;t afford a breach</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {forWho.map(({ label, desc }, i) => (
                <div
                  key={label}
                  className="border border-[rgba(var(--ch-border),0.10)] p-6 reveal"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="w-1.5 h-1.5 rounded-full mb-4" style={{ backgroundColor: ACCENT }} />
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
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.35)] mb-2">Need full-scale transformation?</p>
              <h3 className="font-serif font-bold text-[20px] text-[var(--color-text)]">Add Astacraft Enterprise™</h3>
              <p className="text-[14px] text-[rgba(var(--ch-text),0.50)] mt-1">Cloud migration, custom software, and a dedicated team for full digital transformation.</p>
            </div>
            <Link href="/solutions/enterprise" className="shrink-0 flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-accent)] hover:gap-3 transition-all duration-200">
              View Enterprise bundle <ArrowRight className="w-3.5 h-3.5" />
            </Link>
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
                Get a proposal in 24 hours.
              </h2>
              <p className="text-[15px] text-[rgba(var(--ch-text),0.55)] leading-relaxed">
                Tell us about your business and we&apos;ll be in touch within one business day to confirm your strategy call.
              </p>
            </div>
            <SolutionLeadForm bundle="secure" />
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 60% at 50% 100%, rgba(${ACCENT_RGB},0.08), transparent)` }}
        />
        <div className="relative max-w-[700px] mx-auto text-center reveal">
          <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.30)] mb-4">Ready to secure your business?</p>
          <h2 className="font-serif font-bold text-white mb-4" style={{ fontSize: 'clamp(28px,3vw,48px)' }}>
            Start protecting your business today.
          </h2>
          <p className="text-[rgba(255,255,255,0.50)] mb-10 max-w-[44ch] mx-auto leading-relaxed">
            No setup fee. Month-to-month. Cancel any time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?bundle=secure"
              className="btn-shimmer inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium text-white px-10 py-4 transition-colors duration-200"
              style={{ backgroundColor: ACCENT }}
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
      <SolutionStickyBar bundle="secure" name="Astacraft Secure™" price="from GH₵ 2,000/mo" />
    </>
  )
}
