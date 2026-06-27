import type { Metadata } from 'next'
import Link from 'next/link'
import { Rocket, Globe, Mail, Server, ShieldCheck, Headphones, ArrowRight, CheckCircle2, X } from 'lucide-react'
import { JsonLd } from '@/components/JsonLd'
import { SolutionStickyBar } from '@/components/SolutionStickyBar'
import { SolutionLeadForm } from '@/components/SolutionLeadForm'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Astacraft Launch™ — Startup Technology Bundle | Astacraft Systems',
  description: 'Everything a new business needs to launch online — domain, website, business email, hosting, and SSL. Fully managed by Astacraft Systems. From GH₵ 2,500 setup.',
  keywords: 'startup website Ghana, business website Ghana, business email setup Ghana, web hosting Ghana, SME technology bundle Ghana, Astacraft Launch',
  alternates: { canonical: 'https://astacraftsystems.com/solutions/launch' },
  openGraph: {
    title: 'Astacraft Launch™ — Startup Technology Bundle',
    description: 'Domain, website, business email, hosting, and SSL — everything a new business needs to exist online. Professionally built and fully managed.',
    url: 'https://astacraftsystems.com/solutions/launch',
    siteName: 'Astacraft Systems Limited',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://astacraftsystems.com/solutions/launch/opengraph-image', width: 1200, height: 630, alt: 'Astacraft Launch™ — Startup Technology Bundle' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@astacraftsys',
    title: 'Astacraft Launch™ — Startup Technology Bundle',
    description: 'Domain, website, business email, hosting, and SSL — everything a new business needs to exist online.',
    images: ['https://astacraftsystems.com/solutions/launch/opengraph-image'],
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Astacraft Launch™',
    description: 'Startup technology bundle — domain, business website, business email, hosting, and SSL. Fully managed by Astacraft Systems.',
    provider: { '@type': 'Organization', name: 'Astacraft Systems Limited', url: 'https://astacraftsystems.com' },
    areaServed: [{ '@type': 'Country', name: 'Ghana' }, { '@type': 'Continent', name: 'Africa' }],
    serviceType: 'Managed IT Services',
    offers: [
      { '@type': 'Offer', name: 'Starter', price: '2500', priceCurrency: 'GHS', description: '3-page website, 2 email accounts, shared hosting + SSL' },
      { '@type': 'Offer', name: 'Standard', price: '5500', priceCurrency: 'GHS', description: '5-page website, 10 email accounts, managed hosting' },
      { '@type': 'Offer', name: 'Professional', price: '10000', priceCurrency: 'GHS', description: '10-page website + blog, unlimited email, premium hosting' },
    ],
    url: 'https://astacraftsystems.com/solutions/launch',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astacraftsystems.com' },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://astacraftsystems.com/solutions' },
      { '@type': 'ListItem', position: 3, name: 'Astacraft Launch™', item: 'https://astacraftsystems.com/solutions/launch' },
    ],
  },
]

const includes = [
  { Icon: Globe,       title: 'Domain & DNS',     desc: 'Register your business domain and configure DNS records correctly from day one.' },
  { Icon: Rocket,      title: 'Business Website', desc: '3 to 10-page professional website built to your brand, optimised for search.' },
  { Icon: Mail,        title: 'Business Email',   desc: 'Zoho Mail (Starter) or Google Workspace (Standard+) — branded email addresses configured and managed for your team. Email hosting is billed directly by the provider.' },
  { Icon: Server,      title: 'Web Hosting',      desc: 'Fast managed hosting on enterprise infrastructure — no technical setup needed.' },
  { Icon: ShieldCheck, title: 'SSL Certificate',  desc: 'HTTPS encryption installed and auto-renewed so your site is always secure.' },
  { Icon: Headphones,  title: 'Setup Support',    desc: 'Hands-on onboarding and setup support after launch.' },
]

const tiers = [
  {
    name: 'Starter',
    setup: 'GH₵ 2,500',
    monthly: 'GH₵ 250',
    description: 'A clean online presence for sole traders and new businesses.',
    highlighted: false,
    tag: '',
    features: [
      { label: '3-page website', included: true },
      { label: 'Domain registration (1 year)', included: true },
      { label: 'Business email — 2 accounts (Zoho Mail)', included: true },
      { label: 'Shared hosting + SSL', included: true },
      { label: '30-day setup support', included: true },
      { label: 'Monthly content updates', included: false },
      { label: 'Blog / additional pages', included: false },
      { label: 'Priority support', included: false },
    ],
    cta: 'Get Started',
  },
  {
    name: 'Standard',
    setup: 'GH₵ 5,500',
    monthly: 'GH₵ 550',
    description: 'A full online presence with managed hosting and ongoing updates.',
    highlighted: true,
    tag: 'Most Popular',
    features: [
      { label: '5-page website', included: true },
      { label: 'Domain registration (1 year)', included: true },
      { label: 'Business email — 10 accounts (Google Workspace)', included: true },
      { label: 'Managed hosting + SSL', included: true },
      { label: '90-day setup support', included: true },
      { label: 'Monthly content updates', included: true },
      { label: 'Blog / additional pages', included: false },
      { label: 'Priority support', included: false },
    ],
    cta: 'Get Started',
  },
  {
    name: 'Professional',
    setup: 'GH₵ 10,000',
    monthly: 'GH₵ 1,200',
    description: 'A premium website with full managed service and priority support.',
    highlighted: false,
    tag: '',
    features: [
      { label: '10-page website + blog', included: true },
      { label: 'Domain registration (1 year)', included: true },
      { label: 'Business email — unlimited accounts (Google Workspace)', included: true },
      { label: 'Premium hosting + SSL', included: true },
      { label: '6-month setup & onboarding support', included: true },
      { label: 'Bi-weekly content updates', included: true },
      { label: 'Blog / additional pages', included: true },
      { label: 'Priority support (SLA 4hr response)', included: true },
    ],
    cta: 'Get Started',
  },
]

const forWho = [
  { label: 'Sole traders',   desc: 'Launching your first professional online presence.' },
  { label: 'New businesses', desc: 'Incorporated within the last 12 months and ready to go digital.' },
  { label: 'Entrepreneurs',  desc: 'Turning an idea into a credible, customer-ready brand.' },
]

const steps = [
  { num: '01', title: 'Discovery call',    desc: 'We learn about your business, brand, and goals in a 30-minute kickoff.' },
  { num: '02', title: 'Build & configure', desc: 'Our team builds your website, sets up email, and configures all technical components.' },
  { num: '03', title: 'Launch & handover', desc: 'We go live, train you on the essentials, and provide ongoing managed support.' },
]

export default function LaunchPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ─── HERO ─── */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] mt-[72px] pt-20 pb-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-25 pointer-events-none" />
        <div className="absolute top-0 right-[-5%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(var(--ch-green),0.20)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[5%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(var(--ch-accent),0.10)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto">
          <div className="flex items-center gap-2 mb-10 hero-in hero-in-1">
            <Link href="/solutions" className="font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.35)] hover:text-[rgba(255,255,255,0.65)] transition-colors duration-150">Solutions</Link>
            <span className="text-[rgba(255,255,255,0.18)]">/</span>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.55)]">Launch</span>
          </div>

          <div className="flex items-center gap-3 mb-6 hero-in hero-in-1">
            <div className="w-10 h-10 flex items-center justify-center border border-[rgba(var(--ch-green),0.35)] bg-[rgba(var(--ch-green),0.12)]">
              <Rocket className="w-5 h-5 text-[var(--color-green)]" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.20em] uppercase px-2.5 py-1 border border-[rgba(var(--ch-green),0.30)] bg-[rgba(var(--ch-green),0.10)] text-[var(--color-green)]">Startups</span>
          </div>

          <h1
            className="font-serif font-black text-white leading-[0.90] tracking-[-0.035em] mb-6 hero-in hero-in-2"
            style={{ fontSize: 'clamp(44px,7vw,88px)' }}
          >
            Astacraft Launch™
          </h1>
          <p
            className="text-[rgba(255,255,255,0.62)] max-w-[55ch] leading-relaxed mb-10 hero-in hero-in-3"
            style={{ fontSize: 'clamp(15px,1.2vw,18px)' }}
          >
            Everything a new business needs to exist online — professionally built, fully managed, and ready in days not months.
          </p>

          <div className="flex items-center gap-6 mb-10 hero-in hero-in-3">
            <div>
              <span className="font-serif font-black text-white" style={{ fontSize: 'clamp(28px,3vw,44px)' }}>GH₵ 2,500</span>
              <span className="font-mono text-[11px] text-[rgba(255,255,255,0.35)] ml-2 tracking-[0.10em] uppercase">one-time setup</span>
            </div>
            <span className="text-[rgba(255,255,255,0.18)] text-xl">+</span>
            <div>
              <span className="font-serif font-black text-white" style={{ fontSize: 'clamp(22px,2.5vw,34px)' }}>GH₵ 250</span>
              <span className="font-mono text-[11px] text-[rgba(255,255,255,0.35)] ml-2 tracking-[0.10em] uppercase">/month</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 hero-in hero-in-4">
            <Link
              href="/contact?bundle=launch"
              className="btn-shimmer inline-block bg-[var(--color-green)] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-8 py-4 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
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
            {tiers.map(({ name, setup, monthly, description, highlighted, tag, features, cta }, i) => (
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
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={`font-serif font-bold text-[36px] leading-none ${highlighted ? 'text-white' : 'text-[var(--color-text)]'}`}>{setup}</span>
                  </div>
                  <p className={`font-mono text-[11px] tracking-[0.10em] mb-1 ${highlighted ? 'text-[rgba(255,255,255,0.40)]' : 'text-[rgba(var(--ch-text),0.35)]'}`}>one-time setup</p>
                  <p className={`font-mono text-[13px] font-medium mt-2 ${highlighted ? 'text-[rgba(255,255,255,0.70)]' : 'text-[rgba(var(--ch-text),0.55)]'}`}>
                    {monthly}
                    <span className={`text-[11px] font-normal ${highlighted ? 'text-[rgba(255,255,255,0.40)]' : 'text-[rgba(var(--ch-text),0.35)]'}`}>
                      /month managed service
                    </span>
                  </p>
                </div>
                <p className={`text-[13px] leading-relaxed mb-6 ${highlighted ? 'text-[rgba(255,255,255,0.50)]' : 'text-[rgba(var(--ch-text),0.50)]'}`}>{description}</p>
                <div className="space-y-2.5 mb-8 flex-1">
                  {features.map(({ label, included }) => (
                    <div key={label} className="flex items-center gap-2.5">
                      {included
                        ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[var(--color-green)]" />
                        : <X className={`w-3.5 h-3.5 shrink-0 ${highlighted ? 'text-[rgba(255,255,255,0.20)]' : 'text-[rgba(var(--ch-text),0.20)]'}`} />
                      }
                      <span className={`text-[12px] ${included ? (highlighted ? 'text-[rgba(255,255,255,0.65)]' : 'text-[rgba(var(--ch-text),0.65)]') : (highlighted ? 'text-[rgba(255,255,255,0.25)]' : 'text-[rgba(var(--ch-text),0.30)]')}`}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/contact?bundle=launch&tier=${name.toLowerCase()}`}
                  className={`block w-full text-center font-mono text-[10px] tracking-[0.14em] uppercase font-medium py-3.5 transition-colors duration-200 ${highlighted ? 'bg-[var(--color-green)] text-white hover:bg-[var(--color-green-hover)]' : 'border border-[rgba(var(--ch-accent),0.20)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)]'}`}
                >
                  {cta} →
                </Link>
              </div>
            ))}
          </div>
          <p className="font-mono text-[10px] tracking-[0.10em] text-[rgba(var(--ch-text),0.35)] mt-4">
            All prices in Ghana Cedis (GH₵). Setup is a one-time fee; monthly covers hosting, managed services, and support. Prices subject to scope. · Email hosting (Zoho Mail / Google Workspace) is billed directly by the provider at their standard per-user rates.
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
                <div className="w-9 h-9 flex items-center justify-center border border-[rgba(var(--ch-green),0.20)] bg-[rgba(var(--ch-green),0.06)] mb-5">
                  <Icon className="w-4 h-4 text-[var(--color-green)]" />
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
              <h2 className="font-serif font-bold text-[28px] text-[var(--color-text)] leading-[1.2]">Built for businesses just getting started</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {forWho.map(({ label, desc }, i) => (
                <div key={label} className="border border-[rgba(var(--ch-border),0.10)] p-6 reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] mb-4" />
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
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 text-[rgba(var(--ch-border),0.25)] z-10" />
                )}
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
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.35)] mb-2">Ready to scale?</p>
              <h3 className="font-serif font-bold text-[20px] text-[var(--color-text)]">Upgrade to Astacraft Growth™</h3>
              <p className="text-[14px] text-[rgba(var(--ch-text),0.50)] mt-1">Add CRM, automation, and collaboration tools when your business starts to scale.</p>
            </div>
            <Link
              href="/solutions/growth"
              className="shrink-0 flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-accent)] hover:gap-3 transition-all duration-200"
            >
              View Growth bundle <ArrowRight className="w-3.5 h-3.5" />
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
            <SolutionLeadForm bundle="launch" />
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(85,170,73,0.08),transparent)] pointer-events-none" />
        <div className="relative max-w-[700px] mx-auto text-center reveal">
          <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.30)] mb-4">Ready to launch?</p>
          <h2
            className="font-serif font-bold text-white mb-4"
            style={{ fontSize: 'clamp(28px,3vw,48px)' }}
          >
            Get your business online in days.
          </h2>
          <p className="text-[rgba(255,255,255,0.50)] mb-10 max-w-[44ch] mx-auto leading-relaxed">
            Get a proposal in 24 hours. No obligation, no commitment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?bundle=launch"
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
      <SolutionStickyBar bundle="launch" name="Astacraft Launch™" price="GH₵ 2,500" />
    </>
  )
}
