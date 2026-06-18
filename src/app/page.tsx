import Link from 'next/link'
import Image from 'next/image'
import { getTestimonials, getCaseStudies } from '@/sanity/queries'
import { DesignTestimonial } from '@/components/ui/design-testimonial'
import { CountUp } from '@/components/CountUp'
import ParticlesBackground from '@/components/ui/particles-bg'

export const revalidate = 3600

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
  { name: 'Financial Services', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&q=75&auto=format&fit=crop' },
  { name: 'Telecoms',           img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&q=75&auto=format&fit=crop' },
  { name: 'Energy & Utilities', img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&q=75&auto=format&fit=crop' },
  { name: 'Healthcare',         img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&q=75&auto=format&fit=crop' },
  { name: 'Retail & Commerce',  img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&q=75&auto=format&fit=crop' },
  { name: 'Government',         img: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=600&q=75&auto=format&fit=crop' },
  { name: 'Real Estate',        img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&q=75&auto=format&fit=crop' },
  { name: 'Agritech',           img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&q=75&auto=format&fit=crop' },
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
      <section className="relative min-h-[100dvh] flex flex-col overflow-hidden">
        <ParticlesBackground />
        {/* Ambient orbs */}
        <div className="absolute -top-[25%] right-[-8%] w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(29,71,118,0.30)_0%,transparent_60%)] animate-orb-1 pointer-events-none" />
        <div className="absolute top-[30%] left-[-12%] w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(85,170,73,0.12)_0%,transparent_60%)] animate-orb-2 pointer-events-none" />
        <div className="absolute bottom-[-8%] right-[25%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(29,71,118,0.14)_0%,transparent_60%)] animate-orb-3 pointer-events-none" />
        <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />

        {/* Eyebrow + status badge */}
        <div className="relative flex flex-col gap-3 px-[clamp(24px,5vw,80px)] pt-32 hero-in hero-in-1">
          <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-[rgba(255,255,255,0.38)]">
            Enterprise Technology Partner — Accra, Ghana
          </p>
          <div className="badge-announce inline-flex items-center gap-3 border border-[rgba(255,255,255,0.13)] bg-[rgba(255,255,255,0.05)] px-4 py-2 backdrop-blur-sm w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#55AA49] animate-status shrink-0" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.55)]">
              Systems online · Accra, Ghana
            </span>
            <span className="w-px h-3 bg-[rgba(255,255,255,0.14)]" />
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.30)]">
              Est. 2016 · Pursuing ISO 27001
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

            <div className="mt-12 flex flex-col gap-8 hero-in hero-in-3">
              <p
                className="text-[rgba(255,255,255,0.62)] leading-relaxed max-w-[52ch]"
                style={{ fontSize: 'clamp(15px,1.4vw,18px)' }}
              >
                Astacraft Systems builds the cloud infrastructure, custom software, and security frameworks that African enterprises need to compete globally.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="/contact"
                  className="btn-shimmer inline-block bg-[#55AA49] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-8 py-4 hover:bg-[#489A3E] transition-colors duration-200"
                >
                  Start a Project →
                </Link>
                <Link
                  href="/services"
                  className="inline-block border border-[rgba(255,255,255,0.35)] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-8 py-4 hover:border-[rgba(255,255,255,0.60)] transition-colors duration-200"
                >
                  View Services
                </Link>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-2 hero-in hero-in-4">
                {[
                  { num: '200+', label: 'projects delivered' },
                  { num: '12',   label: 'countries served' },
                  { num: '98%',  label: 'client retention' },
                ].map(({ num, label }) => (
                  <span key={label} className="font-mono text-[10px] tracking-[0.12em] uppercase">
                    <span className="text-[#55AA49] font-bold">{num}</span>
                    <span className="text-[rgba(255,255,255,0.30)] ml-2">{label}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Client trust strip at bottom of hero */}
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
          IMPACT NUMBERS — full-bleed, Accenture-scale type
      ───────────────────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-dark-deep)]">
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
              <p className="relative font-mono text-[11px] tracking-[0.26em] uppercase text-[#1D4776] mb-5">What We Do</p>
              <h2
                className="relative font-serif font-black text-[var(--color-text)] leading-[0.90] tracking-[-0.035em]"
                style={{ fontSize: 'clamp(36px,5.5vw,72px)' }}
              >
                Eight practices.<br />One mission.
              </h2>
            </div>
            <Link
              href="/services"
              className="mt-6 md:mt-0 font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.55)] hover:text-[#1D4776] transition-colors duration-200"
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
                <span className="font-mono text-[11px] tracking-[0.18em] text-[rgba(var(--ch-text),0.20)] w-7 shrink-0">
                  {num}
                </span>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-2 md:gap-10 items-center">
                  <h3
                    className="font-serif font-bold text-[var(--color-text)] group-hover:text-[#1D4776] transition-colors duration-200"
                    style={{ fontSize: 'clamp(16px,1.9vw,22px)' }}
                  >
                    {title}
                  </h3>
                  <p className="text-[13px] text-[rgba(var(--ch-text),0.60)] leading-relaxed mt-1 md:mt-0">
                    {desc}
                  </p>
                </div>
                <span className="font-mono text-[12px] text-[rgba(var(--ch-text),0.18)] group-hover:text-[#1D4776] group-hover:translate-x-1.5 transition-all duration-200 shrink-0">
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
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(85,170,73,0.10)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left — pitch */}
          <div className="reveal">
            <div className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.24em] uppercase text-[#55AA49] border border-[rgba(85,170,73,0.22)] px-4 py-2 mb-10">
              <span className="w-1 h-1 rounded-full bg-[#55AA49] animate-status" />
              Featured Product
            </div>

            <div className="mb-7">
              <img src="/astabill-logo-white.svg" alt="AstaBill" className="h-9 w-auto" />
            </div>

            <h2
              className="font-serif font-black text-white leading-[0.90] tracking-[-0.035em] mb-6"
              style={{ fontSize: 'clamp(32px,4.2vw,58px)' }}
            >
              Invoice smart.<br />
              <span style={{ color: '#55AA49' }}>Get paid faster.</span>
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
                  <span className="mt-1 w-4 h-4 rounded-full bg-[rgba(85,170,73,0.15)] border border-[rgba(85,170,73,0.35)] flex items-center justify-center shrink-0">
                    <svg className="w-2 h-2" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3.5 6L6.5 2" stroke="#55AA49" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="text-[14px] text-[rgba(255,255,255,0.60)] leading-snug">{point}</span>
                </li>
              ))}
            </ul>

            <div className="flex gap-8 mb-10 pb-10 border-b border-[rgba(255,255,255,0.07)]">
              {[
                { stat: '500+',    label: 'Invoices sent' },
                { stat: 'GHS 2M+', label: 'Collected' },
                { stat: 'Free',    label: 'To start' },
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
                className="btn-shimmer inline-block bg-[#55AA49] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-8 py-4 hover:bg-[#489A3E] transition-colors duration-200"
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

          {/* Right — mock dashboard */}
          <div className="reveal lg:pl-4" style={{ transitionDelay: '140ms' }}>
            <div className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.025)] shadow-2xl overflow-hidden">

              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[rgba(255,80,80,0.40)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[rgba(255,180,0,0.30)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[rgba(85,170,73,0.30)]" />
                <div className="ml-4 flex-1 bg-[rgba(255,255,255,0.05)] rounded-sm px-3 py-1 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 opacity-20">
                    <svg viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" stroke="white" strokeWidth="1"/><path d="M5 2v3l2 1" stroke="white" strokeWidth="1" strokeLinecap="round"/></svg>
                  </span>
                  <span className="font-mono text-[10px] text-[rgba(255,255,255,0.25)] tracking-wide">astabill.com/dashboard</span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                {/* Stat cards */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Total Revenue',   val: 'GH₵ 84,200', note: '↑ 14% this month', green: true  },
                    { label: 'Outstanding',     val: 'GH₵ 12,500', note: '3 invoices due',   green: false },
                    { label: 'Paid This Month', val: 'GH₵ 31,700', note: '↑ 8% vs last',     green: true  },
                  ].map(m => (
                    <div key={m.label} className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] p-3.5">
                      <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-[rgba(255,255,255,0.25)] mb-2">{m.label}</p>
                      <p className="font-serif text-[13px] font-bold text-white leading-none mb-1.5">{m.val}</p>
                      <p className={`font-mono text-[10px] ${m.green ? 'text-[#55AA49]' : 'text-[#D97706]'}`}>{m.note}</p>
                    </div>
                  ))}
                </div>

                {/* Invoice table */}
                <div className="border border-[rgba(255,255,255,0.06)]">
                  <div className="px-4 py-2.5 border-b border-[rgba(255,255,255,0.05)] flex justify-between items-center">
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.30)]">Recent Invoices</span>
                    <span className="font-mono text-[10px] text-[#55AA49] hover:text-[#68CA50] cursor-pointer">View all →</span>
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
                          inv.status === 'Paid'    ? 'text-[#55AA49] bg-[rgba(85,170,73,0.10)]' :
                          inv.status === 'Overdue' ? 'text-[#F87171] bg-[rgba(248,113,113,0.10)]' :
                          'text-[#D97706] bg-[rgba(217,119,6,0.10)]'
                        }`}>
                          {inv.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick action strip */}
                <div className="flex gap-2 pt-1">
                  {['New Invoice', 'Record Payment', 'Send Reminder'].map(action => (
                    <button key={action} className="flex-1 font-mono text-[9px] tracking-[0.10em] uppercase text-[rgba(255,255,255,0.35)] border border-[rgba(255,255,255,0.08)] py-2 hover:border-[rgba(85,170,73,0.40)] hover:text-[#55AA49] transition-colors duration-150">
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
          INDUSTRIES — image card grid
      ───────────────────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-24">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 reveal">
            <div>
              <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[#1D4776] mb-5">Industries</p>
              <h2
                className="font-serif font-black text-[var(--color-text)] leading-[0.92] tracking-[-0.035em]"
                style={{ fontSize: 'clamp(28px,4vw,52px)' }}
              >
                We work where<br />it matters most.
              </h2>
            </div>
            <Link
              href="/work"
              className="mt-6 md:mt-0 font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.55)] hover:text-[#1D4776] transition-colors duration-200"
            >
              All case studies →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 reveal" style={{ transitionDelay: '80ms' }}>
            {INDUSTRIES.map(({ name, img }, i) => (
              <Link
                key={name}
                href={`/work?industry=${encodeURIComponent(name)}`}
                className="group relative overflow-hidden aspect-[4/3] bg-[var(--color-dark)] block"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {/* Image — hidden below the card, slides up on hover */}
                <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out will-change-transform">
                  <Image
                    src={img}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[rgba(6,12,24,0.52)]" />
                </div>

                {/* Subtle grid texture on dark bg */}
                <div className="absolute inset-0 hero-grid opacity-10 pointer-events-none" />

                {/* Faint watermark number */}
                <span
                  className="absolute -bottom-3 -right-2 font-serif font-black leading-none select-none pointer-events-none text-[rgba(255,255,255,0.05)]"
                  style={{ fontSize: 'clamp(72px,7vw,108px)' }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Content — stays above image via z-10 */}
                <div className="relative z-10 h-full flex flex-col justify-between p-5">
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.22)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p
                      className="font-serif font-bold text-white mb-2.5 leading-tight"
                      style={{ fontSize: 'clamp(15px,1.5vw,20px)' }}
                    >
                      {name}
                    </p>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0)] group-hover:text-[rgba(255,255,255,0.75)] transition-colors duration-300 delay-300">
                      View work
                      <span className="group-hover:translate-x-0.5 transition-transform duration-300">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          CASE STUDIES — dark canvas, large green metric callouts
      ───────────────────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-dark-deep)] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 reveal">
            <div className="relative">
              <span className="absolute -top-6 left-0 font-serif font-black leading-none select-none pointer-events-none text-[rgba(255,255,255,0.04)]" style={{ fontSize: 'clamp(80px,11vw,148px)' }} aria-hidden="true">02</span>
              <p className="relative font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.40)] mb-5">Selected Work</p>
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
                    <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.26)] border border-[rgba(255,255,255,0.09)] px-3 py-1.5">
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
                    <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.28)]">
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
      <section className="bg-[var(--color-surface)] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        <div className="max-w-[1280px] mx-auto reveal">
          <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[#1D4776] mb-14">What Clients Say</p>
          <DesignTestimonial testimonials={displayTestimonials} />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          TECHNOLOGY PARTNERS — platforms we build on
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
              We work across the world&apos;s leading cloud and enterprise platforms — so your stack works with us from day one.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-px bg-[rgba(var(--ch-border),0.10)] reveal" style={{ transitionDelay: '80ms' }}>
            {[
              { name: 'Amazon Web Services', abbr: 'AWS' },
              { name: 'Microsoft Azure',     abbr: 'Azure' },
              { name: 'Google Cloud',        abbr: 'GCP' },
              { name: 'Salesforce',          abbr: 'CRM' },
              { name: 'Odoo',                abbr: 'ERP' },
              { name: 'SAP',                 abbr: 'SAP' },
            ].map(({ name, abbr }) => (
              <div
                key={name}
                className="bg-[var(--color-bg)] flex flex-col items-center justify-center gap-2 py-10 px-4 group hover:bg-[var(--color-surface)] transition-colors duration-200"
              >
                <span
                  className="font-serif font-black text-[rgba(var(--ch-text),0.12)] group-hover:text-[rgba(var(--ch-accent),0.20)] transition-colors duration-200"
                  style={{ fontSize: 'clamp(20px,2vw,28px)' }}
                >
                  {abbr}
                </span>
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.55)] text-center leading-tight">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          ABOUT TEASER — built in Ghana, built for Africa
      ───────────────────────────────────────────────────────────────── */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-[-10%] -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(29,71,118,0.16)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div className="reveal">
            <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.28)] mb-6">Who We Are</p>
            <h2
              className="font-serif font-black text-white leading-[0.90] tracking-[-0.035em] mb-8"
              style={{ fontSize: 'clamp(32px,5vw,64px)' }}
            >
              Built in Ghana.<br />
              Built for Africa.<br />
              <span className="text-gradient italic">Built for the world.</span>
            </h2>
            <p
              className="text-[rgba(255,255,255,0.50)] leading-relaxed mb-5 max-w-[52ch]"
              style={{ fontSize: 'clamp(14px,1.3vw,17px)' }}
            >
              Since 2016, Astacraft Systems has been the technology partner of choice for enterprises, governments, and organizations across Africa navigating digital change.
            </p>
            <p
              className="text-[rgba(255,255,255,0.34)] leading-relaxed mb-10 max-w-[52ch]"
              style={{ fontSize: 'clamp(14px,1.3vw,17px)' }}
            >
              Our engineers, architects, and strategists bring global standards to every engagement — building solutions that perform at scale and stand the test of time.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.16em] uppercase text-white border border-[rgba(255,255,255,0.38)] px-7 py-4 hover:border-[rgba(255,255,255,0.65)] transition-colors duration-200"
            >
              Meet the team →
            </Link>
          </div>

          {/* Right — stat grid */}
          <div className="grid grid-cols-2 gap-4 reveal" style={{ transitionDelay: '120ms' }}>
            {[
              { num: '8+',   label: 'Years in operation', sub: 'Est. 2016, Accra Ghana' },
              { num: '50+',  label: 'Enterprise clients',  sub: 'Across 12 countries'   },
              { num: '200+', label: 'Projects delivered',  sub: 'On time, on budget'    },
              { num: '98%',  label: 'Client retention',    sub: 'Long-term partnerships' },
            ].map(({ num, label, sub }, i) => (
              <div
                key={label}
                className="border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.025)] p-6"
                style={{ transitionDelay: `${120 + i * 60}ms` }}
              >
                <p
                  className="font-serif font-black text-white leading-none mb-2"
                  style={{ fontSize: 'clamp(28px,3vw,44px)' }}
                >
                  {num}
                </p>
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.42)] mb-1">
                  {label}
                </p>
                <p className="text-[11px] text-[rgba(255,255,255,0.20)]">{sub}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          FINAL CTA — full-bleed dark, type fills the section
      ───────────────────────────────────────────────────────────────── */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] rounded-full bg-[radial-gradient(ellipse,rgba(29,71,118,0.20)_0%,transparent_65%)] pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto reveal">
          <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.24)] mb-9">
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
              className="btn-shimmer inline-block bg-[#55AA49] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-10 py-5 hover:bg-[#489A3E] transition-colors duration-200"
            >
              Start a Project →
            </Link>
            <Link
              href="/services"
              className="inline-block border border-[rgba(255,255,255,0.35)] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-10 py-5 hover:border-[rgba(255,255,255,0.60)] transition-colors duration-200"
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
