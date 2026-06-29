import Link from 'next/link'
import Image from 'next/image'
import { Rocket, TrendingUp, Settings2, ShieldCheck, Building2 } from 'lucide-react'
import { getTestimonials, getCaseStudies } from '@/sanity/queries'
import type { Testimonial, CaseStudy } from '@/sanity/types'
import { DesignTestimonial } from '@/components/ui/design-testimonial'
import { CountUp } from '@/components/CountUp'
import { IndustriesWork } from '@/components/IndustriesWork'
import { ParticlesWrapper } from '@/components/ui/particles-wrapper'
import { INDUSTRIES } from '@/config/industries'

export const revalidate = 3600

const SERVICE_GROUPS = [
  {
    label: 'Product Platforms',
    accent: 'var(--color-green)',
    items: [
      { num: '01', href: '/products',               title: 'AstaBill — Billing & Payments',        desc: 'Send invoices, collect payments via Mobile Money and card, and track cash flow — all in one platform.' },
      { num: '02', href: '/services/crm-erp',        title: 'CRM & ERP Implementation',             desc: 'Salesforce, Odoo, and SAP implementations configured for how African enterprises operate.' },
      { num: '03', href: '/services/api-automation', title: 'System Integration & Automation',      desc: 'Custom APIs, workflow automation, and integrations that connect your systems and eliminate manual work.' },
    ],
  },
  {
    label: 'Enterprise Systems',
    accent: 'var(--color-accent)',
    items: [
      { num: '04', href: '/services/software-development',   title: 'Software Development',             desc: 'Custom platforms, mobile apps, and scalable backends engineered for enterprise performance.' },
      { num: '05', href: '/services/cloud-solutions',         title: 'Cloud & Infrastructure',           desc: 'Architecture, migrations, and managed services on AWS, Azure, and GCP.' },
      { num: '06', href: '/services/digital-transformation',  title: 'Business Process Transformation',  desc: 'We redesign how your business operates — processes, data, and the tools your teams rely on.' },
      { num: '07', href: '/services/cybersecurity',           title: 'Cybersecurity & SOC Monitoring',   desc: 'Security audits, penetration testing, and 24/7 threat monitoring for enterprise organisations.' },
      { num: '08', href: '/services/it-consulting',           title: 'IT Consulting & Managed Services', desc: 'Technology strategy, architecture advisory, and fully managed IT operations.' },
    ],
  },
]

const STATS = [
  { prefix: '',  value: 200, suffix: '+',  label: 'Clients served' },
  { prefix: '$', value: 28,  suffix: 'M+', label: 'Client revenue influenced' },
  { prefix: '',  value: 50,  suffix: '+',  label: 'Enterprise clients' },
  { prefix: '',  value: 98,  suffix: '%',  label: 'Client retention rate' },
]

const CLIENTS = [
  'Stanbic Bank', 'MTN Enterprise', 'Afreximbank', 'Volta River Authority',
  'QuickMart Retail', 'Nexus Health', 'Ghana Revenue Authority', 'Ecobank',
]


const FALLBACK_CASES: CaseStudy[] = [
  { _id: '1', client: 'Stanbic Business Finance', industry: 'Financial Services', summary: 'Full Salesforce CRM implementation for a pan-African business finance division — unifying 12 regional offices.', metric1_num: '62%', metric1_label: 'Faster deal cycle',       metric2_num: '', metric2_label: '', metric3_num: '', metric3_label: '', slug: { current: 'stanbic-crm-transformation' } },
  { _id: '2', client: 'MTN Enterprise',           industry: 'Telecoms',           summary: 'AWS cloud migration cutting infrastructure costs across four data centres while improving uptime.',             metric1_num: '38%', metric1_label: 'Cost reduction',           metric2_num: '', metric2_label: '', metric3_num: '', metric3_label: '', slug: { current: 'mtn-cloud-migration' } },
  { _id: '3', client: 'Afreximbank',              industry: 'Banking',            summary: 'Enterprise-wide cybersecurity audit, penetration testing, and ISO 27001 compliance framework.',                metric1_num: '47',  metric1_label: 'Vulnerabilities remediated', metric2_num: '', metric2_label: '', metric3_num: '', metric3_label: '', slug: { current: 'afrexim-security-audit' } },
]

const FALLBACK_TESTIMONIALS = [
  { quote: "Astacraft didn't just deliver a system — they changed how we run our entire business. The team thinks like operators, not just engineers.", name: 'Kwame Asante',   role: 'CEO, QuickMart Retail',          initials: 'KA' },
  { quote: 'The payment link changed everything. We send the invoice, the client pays on their phone, and the receipt is already waiting for them.',     name: 'Ama Darko',      role: 'Brand Strategist, Accra',         initials: 'AD' },
  { quote: 'The cloud migration they ran for us was flawless. Zero downtime, costs dropped 38% in the first quarter. Genuinely impressive.',          name: 'Abena Mensah',   role: 'CTO, MTN Enterprise Ghana',      initials: 'AM' },
  { quote: 'AstaBill removed the spreadsheet lag from our week. The dashboard tells me what is paid, what is due, and what needs follow-up.',          name: 'Kofi Mensah',    role: 'IT Consultant, Kumasi',           initials: 'KM' },
  { quote: 'We have worked with many tech firms across Africa. Astacraft is the only one that treats our problems as their own.',                      name: 'Emmanuel Ofori', role: 'Head of Technology, Afreximbank', initials: 'EO' },
]

const SOLUTION_BUNDLES = [
  {
    num: '01',
    href: '/solutions/launch',
    name: 'Astacraft Launch™',
    tag: 'Startups',
    tagline: 'Domain, website & email — everything to go live with confidence.',
    price: 'from GH₵ 2,500',
    accent: 'var(--color-green)',
    accentRgb: 'var(--ch-green)',
    icon: Rocket,
  },
  {
    num: '02',
    href: '/solutions/growth',
    name: 'Astacraft Growth™',
    tag: 'SMEs',
    tagline: 'CRM, automation & collaboration to scale without scaling headcount.',
    price: 'from GH₵ 5,500',
    accent: 'var(--color-accent)',
    accentRgb: 'var(--ch-accent)',
    icon: TrendingUp,
  },
  {
    num: '03',
    href: '/solutions/operations',
    name: 'Astacraft Operations™',
    tag: 'Digitization',
    tagline: 'Workflow automation & portals to eliminate paper-based processes.',
    price: 'from GH₵ 8,500',
    accent: 'var(--color-accent)',
    accentRgb: 'var(--ch-accent)',
    icon: Settings2,
  },
  {
    num: '04',
    href: '/solutions/secure',
    name: 'Astacraft Secure™',
    tag: 'Security',
    tagline: '24/7 SOC monitoring, endpoint protection & compliance.',
    price: 'from GH₵ 2,000/mo',
    accent: '#C0392B',
    accentRgb: '192,57,43',
    icon: ShieldCheck,
  },
  {
    num: '05',
    href: '/solutions/enterprise',
    name: 'Astacraft Enterprise™',
    tag: 'Enterprise',
    tagline: 'Cloud migration, custom software & a dedicated delivery team.',
    price: 'from GH₵ 5,000',
    accent: 'var(--color-accent)',
    accentRgb: 'var(--ch-accent)',
    icon: Building2,
  },
]

export default async function HomePage() {
  let testimonials: Testimonial[] = []
  let caseStudies: CaseStudy[]   = []
  try {
    const [t, cs] = await Promise.all([getTestimonials(), getCaseStudies()])
    if (t?.length)  testimonials = t
    if (cs?.length) caseStudies  = cs
  } catch {}

  const displayCases        = (caseStudies.length  ? caseStudies  : FALLBACK_CASES).slice(0, 3)
  const displayTestimonials = testimonials.length  ? testimonials : FALLBACK_TESTIMONIALS

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────
          HERO
      ───────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[100dvh] flex flex-col overflow-hidden">
        <ParticlesWrapper />
        <div className="absolute -top-[25%] right-[-8%] w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(var(--ch-accent),0.30)_0%,transparent_60%)] animate-orb-1 pointer-events-none" />
        <div className="absolute top-[30%] left-[-12%] w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(var(--ch-green),0.12)_0%,transparent_60%)] animate-orb-2 pointer-events-none" />
        <div className="absolute bottom-[-8%] right-[25%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(var(--ch-accent),0.14)_0%,transparent_60%)] animate-orb-3 pointer-events-none" />
        <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />

        <div className="relative flex flex-col gap-3 px-[clamp(24px,5vw,80px)] pt-32 hero-in hero-in-1">
          <div className="badge-announce inline-flex items-center gap-3 border border-[rgba(255,255,255,0.13)] bg-[rgba(255,255,255,0.05)] px-4 py-2 backdrop-blur-sm w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] animate-status shrink-0" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.55)]">
              Systems online
            </span>
            <span className="w-px h-3 bg-[rgba(255,255,255,0.14)]" />
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.30)]">
              Est. 2026 · 12 Countries
            </span>
          </div>
        </div>

        <div className="relative px-[clamp(24px,5vw,80px)] flex-1 flex flex-col justify-center py-16">
          <div className="max-w-[1280px] mx-auto w-full">
            <h1
              className="font-serif font-black text-white leading-[0.88] tracking-[-0.035em]"
              style={{ fontSize: 'clamp(52px,9.5vw,132px)' }}
            >
              {['Enterprise software', 'and cloud systems'].map((word, i) => (
                <span key={word} className="block overflow-hidden">
                  <span
                    className="block clip-reveal"
                    style={{ animationDelay: `${0.12 + i * 0.14}s` }}
                  >
                    {word}
                  </span>
                </span>
              ))}
              <span className="block overflow-hidden">
                <span className="block clip-reveal text-gradient italic" style={{ animationDelay: '0.40s' }}>
                  for Africa.
                </span>
              </span>
            </h1>

            <div className="mt-12 flex flex-col gap-8 hero-in hero-in-3">
              <p
                className="text-[rgba(255,255,255,0.62)] leading-relaxed max-w-[52ch]"
                style={{ fontSize: 'clamp(15px,1.4vw,18px)' }}
              >
                AstaCraft Systems builds software products and enterprise-grade systems that automate business operations — from billing and payments to cloud infrastructure across Africa.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <a
                  href="https://astabill.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer inline-block bg-[var(--color-green)] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-8 py-4 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
                >
                  Try AstaBill Free →
                </a>
                <Link
                  href="/contact"
                  className="inline-block border border-[rgba(255,255,255,0.35)] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-8 py-4 hover:border-[rgba(255,255,255,0.60)] transition-colors duration-200"
                >
                  Contact Sales
                </Link>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-2 hero-in hero-in-4">
                {[
                  { num: '200+', label: 'clients served' },
                  { num: '12',   label: 'countries served' },
                  { num: '98%',  label: 'client retention' },
                ].map(({ num, label }) => (
                  <span key={label} className="font-mono text-[10px] tracking-[0.12em] uppercase">
                    <span className="text-[var(--color-green)] font-bold">{num}</span>
                    <span className="text-[rgba(255,255,255,0.30)] ml-2">{label}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-[rgba(255,255,255,0.06)] hero-in hero-in-5">
          <div className="px-[clamp(24px,5vw,80px)] py-5 flex items-center gap-8 overflow-hidden">
            <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-[rgba(255,255,255,0.18)] shrink-0 hidden sm:block">
              Trusted by
            </p>
            <div className="overflow-hidden flex-1">
              <div className="flex gap-14 animate-marquee whitespace-nowrap">
                {[...CLIENTS, ...CLIENTS].map((c, i) => (
                  <span key={i} className="font-mono text-[10px] tracking-[0.12em] uppercase text-[rgba(255,255,255,0.25)]">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          ASTABILL — flagship product, above the fold before services
      ───────────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#1D4776] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(var(--ch-green),0.15)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          <div className="reveal">
            <div className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.24em] uppercase text-[var(--color-green)] border border-[rgba(var(--ch-green),0.22)] px-4 py-2 mb-10">
              <span className="w-1 h-1 rounded-full bg-[var(--color-green)] animate-status" />
              Flagship Product
            </div>

            <div className="mb-7">
              <Image src="/astabill-logo-white.svg" alt="AstaBill" width={137} height={36} className="h-9 w-auto" />
            </div>

            <h2
              className="font-serif font-black text-white leading-[0.90] tracking-[-0.035em] mb-6"
              style={{ fontSize: 'clamp(32px,4.2vw,58px)' }}
            >
              Invoice smart.<br />
              <span style={{ color: 'var(--color-green)' }}>Get paid faster.</span>
            </h2>

            <p
              className="text-[rgba(255,255,255,0.52)] leading-relaxed mb-10 max-w-[48ch]"
              style={{ fontSize: 'clamp(14px,1.2vw,16px)' }}
            >
              The invoicing and payment platform built for African businesses. Send a professional invoice, collect via Mobile Money or card, and see your cash flow — all in one place.
            </p>

            <ul className="space-y-3.5 mb-10">
              {[
                'Professional invoices with public payment pages',
                'Mobile Money (MTN MoMo, Telecel, AT Money) & card via Paystack',
                'Real-time cash flow — invoiced, collected, and overdue at a glance',
              ].map(point => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 rounded-full bg-[rgba(var(--ch-green),0.15)] border border-[rgba(var(--ch-green),0.35)] flex items-center justify-center shrink-0">
                    <svg className="w-2 h-2" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3.5 6L6.5 2" stroke="var(--color-green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="text-[14px] text-[rgba(255,255,255,0.60)] leading-snug">{point}</span>
                </li>
              ))}
            </ul>

            <div className="flex gap-8 mb-10 pb-10 border-b border-[rgba(255,255,255,0.07)]">
              {[
                { stat: 'GH₵ 2M+', label: 'Payments processed' },
                { stat: '~5 min',   label: 'To first invoice' },
                { stat: 'Free',     label: 'To get started' },
              ].map(({ stat, label }) => (
                <div key={label}>
                  <p className="font-serif font-black text-white leading-none mb-1" style={{ fontSize: 'clamp(22px,2.2vw,32px)' }}>{stat}</p>
                  <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.35)]">{label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://astabill.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer inline-block bg-[var(--color-green)] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-8 py-4 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
              >
                Try Free →
              </a>
              <Link
                href="/products"
                className="inline-block border border-[rgba(255,255,255,0.25)] text-[rgba(255,255,255,0.70)] font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-8 py-4 hover:border-[rgba(255,255,255,0.55)] hover:text-white transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="reveal lg:pl-4" style={{ transitionDelay: '140ms' }}>
            <div className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.025)] shadow-2xl overflow-hidden">

              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[rgba(255,80,80,0.40)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[rgba(255,180,0,0.30)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[rgba(var(--ch-green),0.30)]" />
                <div className="ml-4 flex-1 bg-[rgba(255,255,255,0.05)] rounded-sm px-3 py-1 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 opacity-20">
                    <svg viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" stroke="white" strokeWidth="1"/><path d="M5 2v3l2 1" stroke="white" strokeWidth="1" strokeLinecap="round"/></svg>
                  </span>
                  <span className="font-mono text-[10px] text-[rgba(255,255,255,0.25)] tracking-wide">astabill.com/dashboard</span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Total Revenue',   val: 'GH₵ 84,200', note: '↑ 14% this month', green: true  },
                    { label: 'Outstanding',     val: 'GH₵ 12,500', note: '3 invoices due',   green: false },
                    { label: 'Paid This Month', val: 'GH₵ 31,700', note: '↑ 8% vs last',     green: true  },
                  ].map(m => (
                    <div key={m.label} className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] p-3.5">
                      <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-[rgba(255,255,255,0.25)] mb-2">{m.label}</p>
                      <p className="font-serif text-[13px] font-bold text-white leading-none mb-1.5">{m.val}</p>
                      <p className={`font-mono text-[10px] ${m.green ? 'text-[var(--color-green)]' : 'text-[#D97706]'}`}>{m.note}</p>
                    </div>
                  ))}
                </div>

                <div className="border border-[rgba(255,255,255,0.06)]">
                  <div className="px-4 py-2.5 border-b border-[rgba(255,255,255,0.05)] flex justify-between items-center">
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.30)]">Recent Invoices</span>
                    <span className="font-mono text-[10px] text-[var(--color-green)] hover:text-[var(--color-green-hover)] cursor-pointer">View all →</span>
                  </div>
                  {[
                    { id: 'INV-0042', client: 'Acme Ghana Ltd',    amount: 'GH₵ 4,800', status: 'Paid',    paid: true  },
                    { id: 'INV-0041', client: 'Kente Exports Co',  amount: 'GH₵ 2,200', status: 'Pending', paid: false },
                    { id: 'INV-0040', client: 'TechBridge Africa', amount: 'GH₵ 7,500', status: 'Paid',    paid: true  },
                    { id: 'INV-0039', client: 'Volta Agro Ltd',    amount: 'GH₵ 1,950', status: 'Overdue', paid: false },
                  ].map(inv => (
                    <div key={inv.id} className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.04)] last:border-0 hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-150">
                      <div>
                        <p className="font-mono text-[10px] text-[rgba(255,255,255,0.50)]">{inv.id}</p>
                        <p className="text-[11px] text-[rgba(255,255,255,0.30)] mt-0.5">{inv.client}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-[11px] text-white mb-0.5">{inv.amount}</p>
                        <span className={`font-mono text-[9px] tracking-[0.1em] uppercase px-1.5 py-0.5 ${
                          inv.status === 'Paid'    ? 'text-[var(--color-green)] bg-[rgba(var(--ch-green),0.10)]' :
                          inv.status === 'Overdue' ? 'text-[#F87171] bg-[rgba(248,113,113,0.10)]' :
                          'text-[#D97706] bg-[rgba(217,119,6,0.10)]'
                        }`}>
                          {inv.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-1">
                  {['New Invoice', 'Record Payment', 'Send Reminder'].map(action => (
                    <button key={action} className="flex-1 font-mono text-[9px] tracking-[0.10em] uppercase text-[rgba(255,255,255,0.35)] border border-[rgba(255,255,255,0.08)] py-2 hover:border-[rgba(var(--ch-green),0.40)] hover:text-[var(--color-green)] transition-colors duration-150">
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          IMPACT NUMBERS
      ───────────────────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-dark-deep)]">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map(({ prefix, value, suffix, label }, i) => (
            <div
              key={label}
              className={[
                'px-[clamp(12px,2.5vw,40px)] py-20 md:py-28 reveal',
                'border-[rgba(255,255,255,0.06)]',
                i === 1 || i === 3 ? 'border-l' : '',
                i < 2 ? 'border-b md:border-b-0' : '',
                i === 2 ? 'md:border-l' : '',
              ].join(' ')}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <p
                className="stat-display font-serif font-black leading-none tracking-[-0.04em] mb-4"
                style={{ fontSize: 'clamp(52px,6.5vw,100px)' }}
              >
                {prefix}<CountUp to={value} />{suffix}
              </p>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.32)]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          SOLUTION BUNDLES
      ───────────────────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[1280px] mx-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 reveal">
            <div>
              <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[var(--color-accent)] mb-5">
                Business Lifecycle Bundles
              </p>
              <h2
                className="font-serif font-black text-[var(--color-text)] leading-[0.90] tracking-[-0.035em]"
                style={{ fontSize: 'clamp(36px,5.5vw,72px)' }}
              >
                Technology for where<br />
                <span className="text-gradient italic">your business is today.</span>
              </h2>
            </div>
            <p className="text-[14px] text-[rgba(var(--ch-text),0.52)] max-w-[38ch] leading-relaxed md:text-right shrink-0">
              Five productized bundles — each built for a specific stage of growth. Fixed scope, clear pricing, fully managed. Start with Launch and upgrade to Enterprise without changing provider.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[rgba(var(--ch-border),0.10)] reveal" style={{ transitionDelay: '80ms' }}>
            {SOLUTION_BUNDLES.map(({ num, href, name, tag, tagline, price, accent, accentRgb, icon: Icon }) => (
              <Link
                key={num}
                href={href}
                className="group relative flex flex-col bg-[var(--color-surface)] p-7 hover:bg-[var(--color-panel)] transition-colors duration-300 overflow-hidden"
              >
                {/* Decorative background number */}
                <span
                  className="absolute -bottom-3 -right-1 font-serif font-black leading-none select-none pointer-events-none"
                  style={{ fontSize: 'clamp(72px,6vw,96px)', color: accent, opacity: 0.06 }}
                  aria-hidden="true"
                >
                  {num}
                </span>

                {/* Stage + icon */}
                <div className="flex items-center justify-between mb-7">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-[rgba(var(--ch-text),0.22)]">{num}</span>
                  <Icon
                    className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: accent }}
                  />
                </div>

                {/* Name */}
                <h3
                  className="font-serif font-bold text-[var(--color-text)] leading-tight mb-3"
                  style={{ fontSize: 'clamp(15px,1.15vw,18px)' }}
                >
                  {name}
                </h3>

                {/* Tag chip */}
                <span
                  className="inline-block font-mono text-[9px] tracking-[0.16em] uppercase px-2 py-0.5 border mb-5 w-fit"
                  style={{
                    color: accent,
                    borderColor: `rgba(${accentRgb},0.28)`,
                    backgroundColor: `rgba(${accentRgb},0.07)`,
                  }}
                >
                  {tag}
                </span>

                {/* Tagline */}
                <p className="text-[13px] text-[rgba(var(--ch-text),0.50)] leading-relaxed flex-1 mb-7">
                  {tagline}
                </p>

                {/* Price + arrow */}
                <div className="flex items-center justify-between border-t border-[rgba(var(--ch-border),0.08)] pt-5">
                  <span className="font-mono text-[11px] font-semibold" style={{ color: accent }}>
                    {price}
                  </span>
                  <span className="font-mono text-[12px] text-[rgba(var(--ch-text),0.18)] group-hover:translate-x-1 group-hover:text-[var(--color-accent)] transition-all duration-200">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-7 reveal" style={{ transitionDelay: '160ms' }}>
            <p className="text-[13px] text-[rgba(var(--ch-text),0.42)]">
              Not sure which bundle fits your business?{' '}
              <Link
                href="/contact?ref=help-me-choose"
                className="text-[var(--color-accent)] underline underline-offset-2 decoration-[rgba(var(--ch-accent),0.30)] hover:decoration-[var(--color-accent)] transition-colors duration-200"
              >
                Help me choose →
              </Link>
            </p>
            <Link
              href="/solutions"
              className="shrink-0 font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.45)] hover:text-[var(--color-accent)] transition-colors duration-200"
            >
              View all bundles and pricing →
            </Link>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          WHAT WE DO — two-tier: Product Platforms + Enterprise Systems
      ───────────────────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 reveal">
            <div className="relative">
              <span className="absolute -top-6 left-0 font-serif font-black leading-none select-none pointer-events-none text-[rgba(var(--ch-text),0.04)]" style={{ fontSize: 'clamp(80px,11vw,148px)' }} aria-hidden="true">01</span>
              <p className="relative font-mono text-[11px] tracking-[0.26em] uppercase text-[var(--color-accent)] mb-5">What We Do</p>
              <h2
                className="relative font-serif font-black text-[var(--color-text)] leading-[0.90] tracking-[-0.035em]"
                style={{ fontSize: 'clamp(36px,5.5vw,72px)' }}
              >
                Platforms and<br />systems.
              </h2>
            </div>
            <Link
              href="/services"
              className="mt-6 md:mt-0 font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.55)] hover:text-[var(--color-accent)] transition-colors duration-200"
            >
              All services →
            </Link>
          </div>

          <div className="space-y-12">
            {SERVICE_GROUPS.map((group, gi) => (
              <div key={group.label}>
                <div className="flex items-center gap-4 mb-2 reveal" style={{ transitionDelay: `${gi * 60}ms` }}>
                  <span
                    className="font-mono text-[10px] tracking-[0.24em] uppercase font-medium"
                    style={{ color: group.accent }}
                  >
                    {group.label}
                  </span>
                  <span className="flex-1 h-px bg-[rgba(var(--ch-border),0.10)]" />
                </div>
                <div className="border-t border-[rgba(var(--ch-border),0.10)]">
                  {group.items.map(({ num, href, title, desc }, i) => (
                    <Link
                      key={num}
                      href={href}
                      className="service-row group flex items-center gap-6 md:gap-10 py-9 md:py-11 border-b border-[rgba(var(--ch-border),0.08)] hover:translate-x-3 transition-transform duration-300 reveal"
                      style={{ transitionDelay: `${(gi * 3 + i) * 45}ms` }}
                    >
                      <span className="font-mono text-[11px] tracking-[0.18em] text-[rgba(var(--ch-text),0.20)] w-7 shrink-0">
                        {num}
                      </span>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-2 md:gap-10 items-center">
                        <h3
                          className="font-serif font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-200"
                          style={{ fontSize: 'clamp(16px,1.9vw,22px)' }}
                        >
                          {title}
                        </h3>
                        <p className="text-[13px] text-[rgba(var(--ch-text),0.60)] leading-relaxed mt-1 md:mt-0">
                          {desc}
                        </p>
                      </div>
                      <span className="font-mono text-[12px] text-[rgba(var(--ch-text),0.18)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1.5 transition-all duration-200 shrink-0">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          INDUSTRIES + WORK
      ───────────────────────────────────────────────────────────────── */}
      <IndustriesWork industries={INDUSTRIES} />

      {/* ─────────────────────────────────────────────────────────────────
          TESTIMONIALS
      ───────────────────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        <div className="max-w-[1280px] mx-auto reveal">
          <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[var(--color-accent)] mb-14">What Clients Say</p>
          <DesignTestimonial testimonials={displayTestimonials} />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          TECHNOLOGY PARTNERS
      ───────────────────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 reveal">
            <div>
              <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(var(--ch-text),0.50)] mb-2">Technology Ecosystem</p>
              <h2
                className="font-serif font-bold text-[var(--color-text)] leading-tight"
                style={{ fontSize: 'clamp(22px,2.8vw,36px)' }}
              >
                Platforms we build on
              </h2>
            </div>
            <p className="text-[13px] text-[rgba(var(--ch-text),0.62)] max-w-[40ch] leading-relaxed">
              We build on certified cloud and enterprise platforms — so your existing stack integrates from day one.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-px bg-[rgba(var(--ch-border),0.10)] reveal" style={{ transitionDelay: '80ms' }}>
            {[
              { name: 'Amazon Web Services', logo: '/logos/aws.svg' },
              { name: 'Microsoft',           logo: '/logos/microsoft.svg' },
              { name: 'Google Cloud',        logo: '/logos/gcp.svg' },
              { name: 'Salesforce',          logo: '/logos/salesforce.svg' },
              { name: 'HubSpot',             logo: '/logos/hubspot.svg' },
              { name: 'Odoo',                logo: '/logos/odoo.svg' },
              { name: 'Zoho',                logo: '/logos/zoho.svg' },
            ].map(({ name, logo }) => (
              <div
                key={name}
                className="bg-[var(--color-bg)] flex items-center justify-center py-10 px-4 group hover:bg-[var(--color-surface)] transition-colors duration-300"
              >
                <Image
                  src={logo}
                  alt={name}
                  width={110}
                  height={32}
                  className="h-8 w-auto max-w-[110px] object-contain grayscale brightness-[0.4] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          FINAL CTA
      ───────────────────────────────────────────────────────────────── */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] rounded-full bg-[radial-gradient(ellipse,rgba(var(--ch-accent),0.20)_0%,transparent_65%)] pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto reveal">
          <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.24)] mb-9">
            Africa&apos;s Business Software Platform
          </p>
          <h2
            className="font-serif font-black text-white leading-[0.88] tracking-[-0.04em] mb-8"
            style={{ fontSize: 'clamp(44px,9vw,124px)' }}
          >
            Africa runs<br />
            on AstaBill.<br />
            <span className="text-gradient italic">Scale further.</span>
          </h2>
          <p className="text-[rgba(255,255,255,0.45)] mb-12 max-w-[52ch]" style={{ fontSize: 'clamp(15px,1.3vw,18px)' }}>
            Start with AstaBill free — our invoicing and payments platform for African businesses. Or talk to us about building enterprise systems, cloud infrastructure, and digital transformation at scale.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="https://astabill.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer inline-block bg-[var(--color-green)] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-10 py-5 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
            >
              Try AstaBill Free →
            </a>
            <Link
              href="/contact"
              className="inline-block border border-[rgba(255,255,255,0.35)] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-10 py-5 hover:border-[rgba(255,255,255,0.60)] transition-colors duration-200"
            >
              Book a Technology Call
            </Link>
          </div>
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[rgba(255,255,255,0.16)]">
            Astacraft Systems Limited · Accra, Ghana ·{' '}
            <a href="mailto:info@astacraftsystems.com" className="hover:text-[rgba(255,255,255,0.40)] transition-colors duration-200">
              info@astacraftsystems.com
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
