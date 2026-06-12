import Link from 'next/link'
import { getTestimonials, getCaseStudies } from '@/sanity/queries'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import { CountUp } from '@/components/CountUp'

const SERVICES = [
  { num: '01', slug: 'software-development',   title: 'Software Development',     desc: 'Custom platforms, mobile apps, and APIs — engineered for scale and built to last.' },
  { num: '02', slug: 'digital-transformation', title: 'Digital Transformation',   desc: 'We redesign how your business operates: processes, data, and the tools your teams rely on.' },
  { num: '03', slug: 'cloud-solutions',         title: 'Cloud & Infrastructure',   desc: 'Architecture, migrations, and managed services on AWS, Azure, and GCP.' },
  { num: '04', slug: 'cybersecurity',           title: 'Cybersecurity',            desc: 'Penetration testing, compliance frameworks, and continuous threat monitoring.' },
  { num: '05', slug: 'crm-erp',                 title: 'CRM & ERP Systems',        desc: 'Salesforce, Odoo, and SAP implementations that connect every part of your business.' },
  { num: '06', slug: 'digital-marketing',       title: 'Digital Marketing',        desc: 'Performance campaigns, SEO, and analytics that drive measurable pipeline growth.' },
  { num: '07', slug: 'brand-design',            title: 'Brand & Design',           desc: 'Identity systems, product design, and creative that makes your brand impossible to ignore.' },
  { num: '08', slug: 'it-consulting',           title: 'IT Strategy & Consulting', desc: 'Technology roadmaps and advisory for enterprise digital initiatives.' },
]

const STATS = [
  { prefix: '',  value: 200, suffix: '+',  label: 'Engagements delivered' },
  { prefix: '$', value: 28,  suffix: 'M+', label: 'Client revenue influenced' },
  { prefix: '',  value: 50,  suffix: '+',  label: 'Enterprise clients' },
  { prefix: '',  value: 98,  suffix: '%',  label: 'Client retention rate' },
]

const CLIENTS = [
  'Stanbic Bank', 'MTN Enterprise', 'Afreximbank', 'Volta River Authority',
  'QuickMart Retail', 'Nexus Health', 'Ghana Revenue Authority', 'Ecobank',
]

const INDUSTRIES = [
  'Financial Services', 'Telecoms', 'Energy & Utilities', 'Healthcare',
  'Retail & Commerce', 'Government', 'Real Estate', 'Agritech',
]

const ASTABILL_FEATURES = [
  { title: 'Smart Invoicing',   body: 'Create, send, and track invoices with automated payment reminders and real-time status.' },
  { title: 'Expense Tracking',  body: 'Capture receipts, categorize expenses, and sync with your bank automatically.' },
  { title: 'Financial Reports', body: 'P&L, cash flow, and tax summaries on demand — without the accountant.' },
  { title: 'Multi-Currency',    body: 'Invoice in GHS, USD, EUR, and 30+ currencies with live exchange rates.' },
]

const FALLBACK_CASES = [
  { _id: '1', client: 'Stanbic Business Finance', industry: 'Financial Services', summary: 'Full Salesforce CRM implementation for a pan-African business finance division — unifying 12 regional offices.', metric1_num: '62%', metric1_label: 'Faster deal cycle',       slug: { current: 'stanbic-crm-transformation' } },
  { _id: '2', client: 'MTN Enterprise',           industry: 'Telecoms',           summary: 'AWS cloud migration cutting infrastructure costs across four data centres while improving uptime.',             metric1_num: '38%', metric1_label: 'Cost reduction',           slug: { current: 'mtn-cloud-migration' } },
  { _id: '3', client: 'Afreximbank',              industry: 'Banking',            summary: 'Enterprise-wide cybersecurity audit, penetration testing, and ISO 27001 compliance framework.',                metric1_num: '47',  metric1_label: 'Vulnerabilities remediated', slug: { current: 'afrexim-security-audit' } },
]

const FALLBACK_TESTIMONIALS = [
  { quote: "Astacraft didn't just deliver a system — they changed how we run our entire business. The team thinks like operators, not just engineers.", name: 'Kwame Asante',   role: 'CEO, QuickMart Retail',        initials: 'KA' },
  { quote: 'The cloud migration they ran for us was flawless. Zero downtime, costs dropped 38% in the first quarter. Genuinely impressive.',          name: 'Abena Mensah',   role: 'CTO, MTN Enterprise Ghana',    initials: 'AM' },
  { quote: 'We have worked with many tech firms across Africa. Astacraft is the only one that treats our problems as their own.',                      name: 'Emmanuel Ofori', role: 'Head of Technology, Afreximbank', initials: 'EO' },
]

export default async function HomePage() {
  let testimonials: any[] = []
  let caseStudies: any[]   = []
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
          HERO — left-aligned editorial, massive type, dark navy canvas
      ───────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[100dvh] flex flex-col bg-[#060C18] overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute -top-[25%] right-[-8%] w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(27,78,140,0.30)_0%,transparent_60%)] animate-orb-1 pointer-events-none" />
        <div className="absolute top-[30%] left-[-12%] w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(85,173,61,0.12)_0%,transparent_60%)] animate-orb-2 pointer-events-none" />
        <div className="absolute bottom-[-8%] right-[25%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(27,78,140,0.14)_0%,transparent_60%)] animate-orb-3 pointer-events-none" />
        <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />

        {/* Announcement badge */}
        <div className="relative flex items-center px-[clamp(24px,5vw,80px)] pt-32 hero-in hero-in-1">
          <div className="badge-announce inline-flex items-center gap-3 border border-[rgba(255,255,255,0.13)] bg-[rgba(255,255,255,0.05)] px-4 py-2 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#55AD3D] animate-status shrink-0" />
            <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.55)]">
              Systems online · Accra, Ghana
            </span>
            <span className="w-px h-3 bg-[rgba(255,255,255,0.14)]" />
            <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.30)]">
              Est. 2016 · ISO 27001 Ready
            </span>
          </div>
        </div>

        {/* Headline block */}
        <div className="relative px-[clamp(24px,5vw,80px)] flex-1 flex flex-col justify-center py-16">
          <div className="max-w-[1280px] mx-auto w-full">
            <h1
              className="font-serif font-black text-white leading-[0.88] tracking-[-0.035em]"
              style={{ fontSize: 'clamp(52px,9.5vw,132px)' }}
            >
              {['Technology', 'that moves'].map((word, i) => (
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
                  Africa forward.
                </span>
              </span>
            </h1>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end hero-in hero-in-3">
              <p
                className="text-[rgba(255,255,255,0.62)] leading-relaxed max-w-[52ch]"
                style={{ fontSize: 'clamp(15px,1.4vw,18px)' }}
              >
                Astacraft Systems builds the cloud infrastructure, custom software, and security frameworks that African enterprises need to compete globally.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="btn-shimmer inline-block bg-[#1B4E8C] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-8 py-4 hover:bg-[#163D70] transition-colors duration-200"
                >
                  Book Consultation
                </Link>
                <Link
                  href="/services"
                  className="inline-block border border-[rgba(255,255,255,0.14)] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-8 py-4 hover:border-[rgba(255,255,255,0.32)] transition-colors duration-200"
                >
                  Our Services
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Client trust strip at bottom of hero */}
        <div className="relative border-t border-[rgba(255,255,255,0.06)] hero-in hero-in-5">
          <div className="px-[clamp(24px,5vw,80px)] py-5 flex items-center gap-8 overflow-hidden">
            <p className="font-mono text-[8px] tracking-[0.28em] uppercase text-[rgba(255,255,255,0.18)] shrink-0 hidden sm:block">
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
          IMPACT NUMBERS — full-bleed, Accenture-scale type
      ───────────────────────────────────────────────────────────────── */}
      <section className="bg-[#040810]">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map(({ prefix, value, suffix, label }, i) => (
            <div
              key={label}
              className={[
                'px-[clamp(24px,5vw,72px)] py-20 md:py-28 reveal',
                'border-[rgba(255,255,255,0.06)]',
                i === 1 || i === 3 ? 'border-l' : '',
                i < 2 ? 'border-b md:border-b-0' : '',
                i === 2 ? 'md:border-l' : '',
              ].join(' ')}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <p
                className="stat-display font-serif font-black leading-none tracking-[-0.04em] mb-4"
                style={{ fontSize: 'clamp(56px,7vw,108px)' }}
              >
                {prefix}<CountUp to={value} />{suffix}
              </p>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.32)]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          SERVICES — editorial numbered list, not a card grid
      ───────────────────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 reveal">
            <div className="relative">
              <span className="absolute -top-6 left-0 font-serif font-black leading-none select-none pointer-events-none text-[rgba(var(--ch-text),0.04)]" style={{ fontSize: 'clamp(80px,11vw,148px)' }} aria-hidden="true">01</span>
              <p className="relative font-mono text-[9px] tracking-[0.26em] uppercase text-[#1B4E8C] mb-5">What We Do</p>
              <h2
                className="relative font-serif font-black text-[var(--color-text)] leading-[0.90] tracking-[-0.035em]"
                style={{ fontSize: 'clamp(36px,5.5vw,72px)' }}
              >
                Eight practices.<br />One mission.
              </h2>
            </div>
            <Link
              href="/services"
              className="mt-6 md:mt-0 font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.35)] hover:text-[#1B4E8C] transition-colors duration-200"
            >
              All services →
            </Link>
          </div>

          <div className="border-t border-[rgba(var(--ch-border),0.10)]">
            {SERVICES.map(({ num, slug, title, desc }, i) => (
              <Link
                key={num}
                href={`/services/${slug}`}
                className="service-row group flex items-center gap-6 md:gap-10 py-9 md:py-11 border-b border-[rgba(var(--ch-border),0.08)] hover:translate-x-3 transition-transform duration-300 reveal"
                style={{ transitionDelay: `${i * 45}ms` }}
              >
                <span className="font-mono text-[9px] tracking-[0.18em] text-[rgba(var(--ch-text),0.20)] w-7 shrink-0">
                  {num}
                </span>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-2 md:gap-10 items-center">
                  <h3
                    className="font-serif font-bold text-[var(--color-text)] group-hover:text-[#1B4E8C] transition-colors duration-200"
                    style={{ fontSize: 'clamp(16px,1.9vw,22px)' }}
                  >
                    {title}
                  </h3>
                  <p className="text-[13px] text-[rgba(var(--ch-text),0.40)] leading-relaxed hidden md:block">
                    {desc}
                  </p>
                </div>
                <span className="font-mono text-[12px] text-[rgba(var(--ch-text),0.18)] group-hover:text-[#1B4E8C] group-hover:translate-x-1.5 transition-all duration-200 shrink-0">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          ASTABILL — product showcase with mock UI dashboard
      ───────────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#060C18] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(85,173,61,0.10)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="reveal">
            <div className="relative inline-flex items-center gap-2.5 font-mono text-[9px] tracking-[0.24em] uppercase text-[#55AD3D] border border-[rgba(85,173,61,0.22)] px-4 py-2 mb-9">
              <span className="w-1 h-1 rounded-full bg-[#55AD3D] animate-status" />
              Featured Product
            </div>
            <h2
              className="font-serif font-black text-white leading-[0.90] tracking-[-0.035em] mb-6"
              style={{ fontSize: 'clamp(34px,5vw,64px)' }}
            >
              AstaBill —<br />
              <span style={{ color: '#55AD3D' }}>Finance made simple.</span>
            </h2>
            <p
              className="text-[rgba(255,255,255,0.52)] leading-relaxed mb-10 max-w-[52ch]"
              style={{ fontSize: 'clamp(14px,1.3vw,17px)' }}
            >
              The billing, invoicing, and financial management platform built for African businesses. No spreadsheets. No complexity. Just clarity.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {ASTABILL_FEATURES.map(({ title, body }) => (
                <div key={title} className="border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.025)] p-5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#55AD3D] mb-3" />
                  <p className="font-serif text-[14px] font-semibold text-white mb-1.5">{title}</p>
                  <p className="text-[12px] text-[rgba(255,255,255,0.35)] leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

            <Link
              href="/services/crm-erp"
              className="inline-flex items-center gap-3 bg-[#55AD3D] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-8 py-4 hover:bg-[#4A9933] transition-colors duration-200"
            >
              Learn about AstaBill →
            </Link>
          </div>

          {/* Mock dashboard */}
          <div className="reveal lg:pl-4" style={{ transitionDelay: '140ms' }}>
            <div className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.025)] shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.12)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.07)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.05)]" />
                <span className="ml-4 font-mono text-[10px] text-[rgba(255,255,255,0.20)] tracking-wide">
                  astabill.io — Dashboard
                </span>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-2">
                  {[
                    { label: 'Total Revenue',   val: 'GH₵ 84,200', note: '↑ 14%',      green: true  },
                    { label: 'Pending',         val: 'GH₵ 12,500', note: '⏳ Due soon', green: false },
                    { label: 'Paid This Month', val: 'GH₵ 31,700', note: '↑ 8%',       green: true  },
                  ].map(m => (
                    <div key={m.label} className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] p-4">
                      <p className="font-mono text-[8px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.24)] mb-2">{m.label}</p>
                      <p className="font-serif text-[14px] font-bold text-white leading-none mb-1">{m.val}</p>
                      <p className={`font-mono text-[9px] ${m.green ? 'text-[#55AD3D]' : 'text-[rgba(255,255,255,0.32)]'}`}>{m.note}</p>
                    </div>
                  ))}
                </div>
                <div className="border border-[rgba(255,255,255,0.06)]">
                  <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.05)] flex justify-between">
                    <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.22)]">Recent Invoices</span>
                    <span className="font-mono text-[9px] text-[#55AD3D]">View all</span>
                  </div>
                  {[
                    { id: 'INV-0042', client: 'Acme Ghana Ltd',    amount: 'GH₵ 4,800', paid: true  },
                    { id: 'INV-0041', client: 'Kente Exports Co',  amount: 'GH₵ 2,200', paid: false },
                    { id: 'INV-0040', client: 'TechBridge Africa', amount: 'GH₵ 7,500', paid: true  },
                  ].map(inv => (
                    <div key={inv.id} className="flex items-center justify-between px-4 py-3.5 border-b border-[rgba(255,255,255,0.04)] last:border-0">
                      <div>
                        <p className="font-mono text-[10px] text-[rgba(255,255,255,0.48)]">{inv.id}</p>
                        <p className="font-sans text-[11px] text-[rgba(255,255,255,0.26)] mt-0.5">{inv.client}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-[11px] text-white">{inv.amount}</p>
                        <span className={`font-mono text-[8px] tracking-[0.1em] uppercase ${inv.paid ? 'text-[#55AD3D]' : 'text-[#D97706]'}`}>
                          {inv.paid ? 'Paid' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          INDUSTRIES — clean tag layout
      ───────────────────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-24">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 reveal">
            <div>
              <p className="font-mono text-[9px] tracking-[0.26em] uppercase text-[#1B4E8C] mb-5">Industries</p>
              <h2
                className="font-serif font-black text-[var(--color-text)] leading-[0.92] tracking-[-0.035em]"
                style={{ fontSize: 'clamp(28px,4vw,52px)' }}
              >
                We work where<br />it matters most.
              </h2>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 reveal" style={{ transitionDelay: '100ms' }}>
            {INDUSTRIES.map((ind) => (
              <Link
                key={ind}
                href="/work"
                className="font-mono text-[10px] tracking-[0.14em] uppercase px-5 py-3.5 border border-[rgba(var(--ch-border),0.14)] text-[rgba(var(--ch-text),0.46)] hover:border-[rgba(27,78,140,0.38)] hover:text-[#1B4E8C] transition-all duration-200"
              >
                {ind}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          CASE STUDIES — dark canvas, large green metric callouts
      ───────────────────────────────────────────────────────────────── */}
      <section className="bg-[#040810] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 reveal">
            <div className="relative">
              <span className="absolute -top-6 left-0 font-serif font-black leading-none select-none pointer-events-none text-[rgba(255,255,255,0.04)]" style={{ fontSize: 'clamp(80px,11vw,148px)' }} aria-hidden="true">02</span>
              <p className="relative font-mono text-[9px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.40)] mb-5">Selected Work</p>
              <h2
                className="relative font-serif font-black text-white leading-[0.90] tracking-[-0.035em]"
                style={{ fontSize: 'clamp(32px,5vw,64px)' }}
              >
                Results speak.
              </h2>
            </div>
            <Link
              href="/work"
              className="mt-6 md:mt-0 font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(255,255,255,0.28)] hover:text-white transition-colors duration-200"
            >
              All case studies →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {displayCases.map((cs: any, i: number) => (
              <Link
                key={cs._id}
                href={`/work/${cs.slug?.current || cs.slug}`}
                className="group block border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.025)] hover:border-[rgba(255,255,255,0.18)] hover:bg-[rgba(255,255,255,0.035)] transition-all duration-300 reveal"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="p-7">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.26)] border border-[rgba(255,255,255,0.09)] px-3 py-1.5">
                      {cs.industry}
                    </span>
                    <span className="font-mono text-[12px] text-[rgba(255,255,255,0.18)] group-hover:text-white group-hover:translate-x-1 transition-all duration-200">
                      →
                    </span>
                  </div>
                  <h3
                    className="font-serif font-bold text-white mb-3 group-hover:text-[rgba(255,255,255,0.80)] transition-colors duration-200"
                    style={{ fontSize: 'clamp(17px,1.8vw,21px)' }}
                  >
                    {cs.client}
                  </h3>
                  <p className="text-[13px] text-[rgba(255,255,255,0.32)] leading-relaxed mb-8 max-w-[42ch]">{cs.summary}</p>
                  <div className="pt-6 border-t border-[rgba(255,255,255,0.07)]">
                    <p
                      className="stat-display font-serif font-black leading-none mb-1.5"
                      style={{ fontSize: 'clamp(32px,3.5vw,48px)' }}
                    >
                      {cs.metric1_num}
                    </p>
                    <p className="font-mono text-[9px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.28)]">
                      {cs.metric1_label}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          TESTIMONIALS — large editorial quote carousel
      ───────────────────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[1280px] mx-auto reveal">
          <p className="font-mono text-[9px] tracking-[0.26em] uppercase text-[#1B4E8C] mb-10 text-center">What Clients Say</p>
          <TestimonialCarousel testimonials={displayTestimonials} />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          FINAL CTA — full-bleed dark, type fills the section
      ───────────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#060C18] px-[clamp(24px,5vw,80px)] py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] rounded-full bg-[radial-gradient(ellipse,rgba(27,78,140,0.20)_0%,transparent_65%)] pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto reveal">
          <p className="font-mono text-[9px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.24)] mb-9">
            Start a Conversation
          </p>
          <h2
            className="font-serif font-black text-white leading-[0.88] tracking-[-0.04em] mb-12"
            style={{ fontSize: 'clamp(44px,9vw,124px)' }}
          >
            Let&apos;s build<br />
            something<br />
            <span className="text-gradient italic">extraordinary.</span>
          </h2>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href="/contact"
              className="btn-shimmer inline-block bg-[#1B4E8C] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-10 py-5 hover:bg-[#163D70] transition-colors duration-200"
            >
              Book Strategy Call
            </Link>
            <Link
              href="/services"
              className="inline-block border border-[rgba(255,255,255,0.14)] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-10 py-5 hover:border-[rgba(255,255,255,0.32)] transition-colors duration-200"
            >
              Explore Services
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
