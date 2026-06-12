import Link from 'next/link'
import { getCaseStudies, getTestimonials } from '@/sanity/queries'
import CaseCard from '@/components/CaseCard'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import { urlFor } from '@/sanity/client'
import {
  CodeIcon, ZapIcon, ServerIcon, ShieldCheckIcon,
  DatabaseIcon, MegaphoneIcon, BrushIcon, ConsultIcon,
  CheckIcon,
} from '@/components/Icons'
import StatsBar from '@/components/StatsBar'

const fallbackCaseStudies = [
  {
    _id: '1', slug: { current: 'ghipay-payment-gateway' }, client: 'GhiPay Ltd',
    industry: 'Fintech', summary: 'Built a high-availability payment gateway and transaction monitoring system processing millions of transactions monthly without downtime.',
    metric1_num: '3×',   metric1_label: 'Payment Volume',
    metric2_num: '99.9%',metric2_label: 'System Uptime',
    metric3_num: '6wks', metric3_label: 'To Production', accent: 'cyan',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&q=80&auto=format&fit=crop',
  },
  {
    _id: '2', slug: { current: 'novamed-hospital-system' }, client: 'NovaMed Healthcare',
    industry: 'Healthcare', summary: 'Deployed a custom hospital management system with patient portal, clinical workflows, and automated billing across 12 facilities.',
    metric1_num: '70%',  metric1_label: 'Admin Time Saved',
    metric2_num: '12',   metric2_label: 'Hospitals Onboarded',
    metric3_num: '4mo',  metric3_label: 'Full Rollout', accent: 'purple',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&q=80&auto=format&fit=crop',
  },
  {
    _id: '3', slug: { current: 'retailpro-erp-integration' }, client: 'RetailPro Ghana',
    industry: 'Retail & E-Commerce', summary: 'Implemented an integrated ERP and multi-channel e-commerce platform with real-time inventory sync across 5 locations.',
    metric1_num: '48%',  metric1_label: 'Revenue Growth',
    metric2_num: '5',    metric2_label: 'Locations Unified',
    metric3_num: '90d',  metric3_label: 'Go-Live', accent: 'gold',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&q=80&auto=format&fit=crop',
  },
]

const fallbackTestimonials = [
  {
    quote: 'Astacraft built our payment infrastructure from scratch. The system handles millions of transactions and we have never had a critical downtime incident.',
    name: 'Kofi Mensah', role: 'CTO, GhiPay Ltd', initials: 'KM',
  },
  {
    quote: 'The ERP implementation transformed how we manage operations across all our locations. What used to take days now takes hours.',
    name: 'Ama Owusu', role: 'COO, RetailPro Ghana', initials: 'AO',
  },
  {
    quote: 'Their cybersecurity team uncovered vulnerabilities we did not know existed. Professional, thorough, and they delivered exactly what they promised.',
    name: 'Daniel Acheampong', role: 'IT Director, Accra Financial Group', initials: 'DA',
  },
]

const services = [
  {
    Icon: CodeIcon,        num: '01', slug: 'software-development',   title: 'Software Development',
    tagline: 'Custom systems, built to scale.',
    description: 'Web apps, mobile, SaaS platforms, APIs, ERP, and CRM systems engineered for performance and long-term maintainability.',
    outcomes: ['Custom web & mobile applications', 'SaaS & enterprise software', 'API development & integration'],
    pricing: 'Project · Retainer',
  },
  {
    Icon: ZapIcon,         num: '02', slug: 'digital-transformation', title: 'Digital Transformation',
    tagline: 'Automate. Modernize. Scale.',
    description: 'Business process automation, workflow optimization, and digital strategy to eliminate inefficiency and accelerate operations.',
    outcomes: ['Process automation & reengineering', 'Workflow optimization', 'Technology modernization roadmaps'],
    pricing: 'Consulting · Implementation',
  },
  {
    Icon: ServerIcon,      num: '03', slug: 'cloud-infrastructure',   title: 'Cloud & Infrastructure',
    tagline: 'Reliable, elastic, always on.',
    description: 'Cloud hosting, migration, managed infrastructure, disaster recovery, and CDN on Azure, AWS, and Cloudflare.',
    outcomes: ['Cloud migration & managed hosting', 'Backup & disaster recovery', 'Performance optimization & CDN'],
    pricing: 'Managed Services',
  },
  {
    Icon: ShieldCheckIcon, num: '04', slug: 'cybersecurity',          title: 'Cybersecurity',
    tagline: 'Protect what matters most.',
    description: 'Security assessments, vulnerability testing, endpoint protection, compliance audits, and identity & access management.',
    outcomes: ['Security audits & pen testing', 'Endpoint & email protection', 'Compliance & IAM'],
    pricing: 'Audit · Managed Security',
  },
  {
    Icon: DatabaseIcon,    num: '05', slug: 'crm-erp',                title: 'CRM & ERP Solutions',
    tagline: 'Operational intelligence at scale.',
    description: 'CRM and ERP deployment, business automation, customer journey optimization across HubSpot, Zoho, and Odoo.',
    outcomes: ['HubSpot, Zoho, Odoo deployment', 'Business automation & analytics', 'Customer journey optimization'],
    pricing: 'Implementation · Support',
  },
  {
    Icon: MegaphoneIcon,   num: '06', slug: 'digital-marketing',      title: 'Digital Marketing',
    tagline: 'Campaigns that drive demand.',
    description: 'SEO, PPC, social media, B2B lead generation, marketing automation, and data-driven content strategy.',
    outcomes: ['SEO & paid advertising', 'B2B lead generation & automation', 'Content strategy & reporting'],
    pricing: 'Monthly Retainers',
  },
  {
    Icon: BrushIcon,       num: '07', slug: 'branding-creative',      title: 'Branding & Creative',
    tagline: 'Identity that commands authority.',
    description: 'Brand identity design, corporate branding, graphic design, and marketing collateral production.',
    outcomes: ['Brand identity & guidelines', 'Corporate communications', 'Print production & fulfilment'],
    pricing: 'Project · Retainer',
  },
  {
    Icon: ConsultIcon,     num: '08', slug: 'consulting',             title: 'Technology Consulting',
    tagline: 'Strategy before execution.',
    description: 'Technology consulting, digital transformation advisory, business strategy, and technology roadmap development.',
    outcomes: ['Technology strategy & roadmaps', 'Digital transformation advisory', 'Process improvement'],
    pricing: 'Consulting · Advisory',
  },
]

const clientNames = [
  'GhiPay Ltd', 'NovaMed Healthcare', 'RetailPro Ghana', 'Accra Financial Group',
  'TechBridge NG', 'AfriCare Group', 'Kora Finance', 'EduTech Ghana',
]

export default async function HomePage() {
  let caseStudies  = fallbackCaseStudies  as any[]
  let testimonials = fallbackTestimonials as any[]

  try {
    const [cs, ts] = await Promise.all([getCaseStudies(), getTestimonials()])
    if (cs?.length) caseStudies  = cs.slice(0, 3)
    if (ts?.length) testimonials = ts
  } catch {
    // use fallback
  }

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          HERO  — full-dark, centered, animated gradient orbs
      ═══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-[clamp(24px,5vw,80px)] pt-24 pb-24 overflow-hidden bg-[#080C12]">

        {/* Animated gradient orbs */}
        <div className="absolute top-[-18%] left-[-12%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.22)_0%,transparent_65%)] animate-orb-1 pointer-events-none" />
        <div className="absolute top-[-8%] right-[-16%] w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(34,166,86,0.14)_0%,transparent_65%)] animate-orb-2 pointer-events-none" />
        <div className="absolute bottom-[-22%] left-[18%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.09)_0%,transparent_65%)] animate-orb-3 pointer-events-none" />

        {/* Subtle grid */}
        <div className="absolute inset-0 hero-grid pointer-events-none" />

        {/* Content */}
        <div className="relative text-center max-w-[960px] mx-auto w-full">

          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.42)] border border-[rgba(255,255,255,0.09)] px-4 py-2.5 mb-12 hero-in hero-in-1 bg-[rgba(255,255,255,0.03)] backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] animate-status shrink-0" />
            Technology · Cloud · Cybersecurity · Accra, Ghana
          </div>

          {/* Headline */}
          <h1
            className="font-serif font-bold leading-[0.95] tracking-[-0.03em] text-white hero-in hero-in-2"
            style={{ fontSize: 'clamp(52px,8.5vw,120px)' }}
          >
            Transforming<br />
            African Businesses<br />
            Through{' '}
            <span className="text-gradient italic">Technology</span>.
          </h1>

          {/* Subheadline */}
          <p className="text-[clamp(16px,1.35vw,20px)] text-[rgba(255,255,255,0.48)] max-w-2xl mx-auto leading-relaxed mt-10 mb-12 hero-in hero-in-3">
            We build software, automate operations, secure digital infrastructure, and deliver business solutions that help African organizations grow faster.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 hero-in hero-in-4">
            <Link
              href="/contact"
              className="font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-accent)] text-white px-10 py-4 hover:bg-[var(--color-accent-hover)] transition-colors duration-200"
            >
              Book Consultation
            </Link>
            <Link
              href="/services"
              className="font-mono text-[11px] tracking-[0.14em] uppercase font-medium border border-[rgba(255,255,255,0.18)] text-[rgba(255,255,255,0.62)] px-10 py-4 hover:border-[rgba(255,255,255,0.45)] hover:text-white transition-all duration-200 bg-[rgba(255,255,255,0.03)] backdrop-blur-sm"
            >
              Explore Solutions →
            </Link>
          </div>
        </div>

        {/* Trust bar */}
        <div className="relative max-w-[1280px] mx-auto w-full mt-24 hero-in hero-in-5">
          <div className="border-t border-[rgba(255,255,255,0.07)] pt-10">
            <p className="font-mono text-[9px] tracking-[0.24em] uppercase mb-7 text-[rgba(255,255,255,0.18)] text-center">
              Trusted by companies across Africa
            </p>
            <div className="overflow-hidden">
              <div className="flex gap-16 animate-marquee whitespace-nowrap" aria-hidden="true">
                {[...clientNames, ...clientNames].map((name, i) => (
                  <span key={i} className="font-mono text-[11px] tracking-[0.18em] uppercase text-[rgba(255,255,255,0.16)]">{name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════════════════════ */}
      <StatsBar />

      {/* ═══════════════════════════════════════════════════════
          SERVICES  — 4-col grid, top-accent on hover, card glow
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-16 reveal">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-4">Full-Service Technology</p>
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight" style={{ fontSize: 'clamp(36px,5vw,64px)' }}>
                Everything your<br />business needs to scale.
              </h2>
              <Link href="/services" className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.40)] hover:text-[var(--color-accent)] transition-colors duration-200 shrink-0">
                All Solutions →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map(({ Icon, num, slug, title, tagline, description, outcomes, pricing }, i) => (
              <Link
                key={num}
                href={`/services/${slug}`}
                className="group relative flex flex-col p-8 border border-[rgba(var(--ch-accent),0.08)] bg-[var(--color-surface)] overflow-hidden reveal card-glow"
                style={{ transitionDelay: `${i * 55}ms` }}
              >
                {/* Top accent line — slides in on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-green)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Watermark number */}
                <span className="absolute bottom-4 right-6 font-serif font-bold text-[110px] leading-none select-none pointer-events-none text-[rgba(37,99,235,0.04)] group-hover:text-[rgba(37,99,235,0.08)] transition-colors duration-300">
                  {num}
                </span>

                <div className="relative flex-1">
                  <div className="w-9 h-9 border border-[rgba(var(--ch-accent),0.14)] flex items-center justify-center mb-5 group-hover:border-[rgba(var(--ch-accent),0.35)] group-hover:bg-[rgba(var(--ch-accent),0.05)] transition-all duration-300">
                    <Icon className="w-4.5 h-4.5 text-[var(--color-accent)]" />
                  </div>
                  <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-4">{num}</p>
                  <h3 className="font-serif text-[21px] font-bold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-300">{title}</h3>
                  <p className="font-mono text-[11px] tracking-[0.08em] text-[rgba(var(--ch-text),0.38)] italic mb-5">{tagline}</p>
                  <p className="text-[13px] text-[rgba(var(--ch-text),0.52)] leading-relaxed mb-7">{description}</p>

                  <ul className="space-y-2 mb-7">
                    {outcomes.map(o => (
                      <li key={o} className="flex items-start gap-2">
                        <CheckIcon className="text-[var(--color-accent)] mt-0.5 shrink-0 w-3 h-3" />
                        <span className="font-mono text-[10px] tracking-[0.06em] text-[rgba(var(--ch-text),0.48)]">{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="relative font-mono text-[9px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.22)] border-t border-[rgba(var(--ch-accent),0.08)] pt-4">{pricing}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ASTABILL  — dark section, glassmorphism feature cards
      ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#080C12] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.10)_0%,transparent_65%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(34,166,86,0.08)_0%,transparent_65%)] pointer-events-none" />
        {/* Grid */}
        <div className="absolute inset-0 hero-grid pointer-events-none opacity-50" />

        <div className="relative max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Copy */}
            <div className="reveal">
              <span className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.22em] uppercase px-3 py-1.5 border border-[rgba(34,166,86,0.35)] text-[var(--color-green)] mb-8 bg-[rgba(34,166,86,0.06)]">
                <span className="w-1 h-1 rounded-full bg-[var(--color-green)]" />
                Flagship Product
              </span>
              <h2 className="font-serif font-bold text-white leading-tight mb-6" style={{ fontSize: 'clamp(36px,5vw,64px)' }}>
                Meet <span className="text-gradient">AstaBill</span>.<br />
                Built for African<br />businesses.
              </h2>
              <p className="text-[clamp(15px,1.1vw,17px)] text-[rgba(255,255,255,0.48)] leading-relaxed mb-10 max-w-lg">
                A cloud-based business management platform that handles invoicing, expenses, customer management, payments, and GRA compliance — all in one place.
              </p>
              <div className="grid grid-cols-2 gap-2.5 mb-10">
                {[
                  'Invoicing & Quotations', 'Expense Management',
                  'Customer Management',   'Payment Collection',
                  'GRA Tax Compliance',    'Business Analytics',
                  'Team Collaboration',    'Financial Reporting',
                ].map(f => (
                  <div key={f} className="flex items-center gap-2.5">
                    <CheckIcon className="text-[var(--color-green)] shrink-0 w-3 h-3" />
                    <span className="font-mono text-[10px] tracking-[0.06em] text-[rgba(255,255,255,0.48)]">{f}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/products" className="font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white px-8 py-4 hover:bg-[var(--color-green-hover)] transition-colors duration-200">
                  Get Free Demo
                </Link>
                <Link href="/products#pricing" className="font-mono text-[11px] tracking-[0.14em] uppercase font-medium border border-[rgba(255,255,255,0.16)] text-[rgba(255,255,255,0.55)] px-8 py-4 hover:border-[rgba(255,255,255,0.40)] hover:text-white transition-all duration-200 bg-[rgba(255,255,255,0.02)]">
                  View Pricing
                </Link>
              </div>
            </div>

            {/* Right: Glassmorphism feature cards */}
            <div className="grid grid-cols-2 gap-4 reveal" style={{ transitionDelay: '100ms' }}>
              {[
                { title: 'Smart Invoicing',   desc: 'Create branded invoices with automatic reminders and late-fee calculation.' },
                { title: 'GRA Compliance',    desc: 'Built-in VAT, e-levy, and Ghana Revenue Authority filing support.' },
                { title: 'Payment Links',     desc: 'Collect via Mobile Money, bank transfer, and card — no checkout redirect.' },
                { title: 'Business Insights', desc: 'Real-time dashboards, cash flow forecasting, and custom reports.' },
              ].map(({ title, desc }, i) => (
                <div
                  key={title}
                  className="border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] backdrop-blur-sm p-6 hover:border-[rgba(34,166,86,0.30)] hover:bg-[rgba(34,166,86,0.04)] transition-all duration-300 group reveal"
                  style={{ transitionDelay: `${i * 70 + 120}ms` }}
                >
                  <div className="w-2 h-2 bg-[var(--color-green)] mb-4 group-hover:scale-125 transition-transform duration-300" />
                  <h4 className="font-serif text-[15px] font-bold text-white mb-2">{title}</h4>
                  <p className="text-[12px] text-[rgba(255,255,255,0.38)] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          INDUSTRIES
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[var(--color-surface)] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-16 text-center reveal">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-4">Industries Served</p>
            <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight" style={{ fontSize: 'clamp(32px,4.5vw,56px)' }}>
              Solutions across<br />every sector.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: 'Financial Services',  desc: 'Banks, fintechs & insurance' },
              { name: 'Healthcare',          desc: 'Hospitals, clinics & pharma' },
              { name: 'Retail & E-Commerce', desc: 'Online & physical stores' },
              { name: 'Education',           desc: 'Universities, schools & e-learning' },
              { name: 'Manufacturing',       desc: 'Production & supply chain' },
              { name: 'Government & NGOs',   desc: 'Public sector & non-profits' },
              { name: 'SMEs & Startups',     desc: 'Growing businesses' },
              { name: 'Enterprise',          desc: 'Large-scale organizations' },
            ].map(({ name, desc }, i) => (
              <div
                key={name}
                className="border border-[rgba(var(--ch-accent),0.08)] bg-[var(--color-bg)] p-6 hover:border-[rgba(var(--ch-accent),0.24)] transition-all duration-300 group reveal"
                style={{ transitionDelay: `${i * 55}ms` }}
              >
                <div className="w-1.5 h-6 bg-[var(--color-accent)] mb-4 group-hover:bg-[var(--color-green)] transition-colors duration-300" />
                <h3 className="font-serif text-[15px] font-bold text-[var(--color-text)] mb-1">{name}</h3>
                <p className="text-[12px] text-[rgba(var(--ch-text),0.42)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TECHNOLOGY PARTNERS
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg)] border-b border-[rgba(var(--ch-border),0.07)] px-[clamp(24px,5vw,80px)] py-16">
        <div className="max-w-[1280px] mx-auto reveal">
          <p className="font-mono text-[9px] tracking-[0.24em] uppercase text-[rgba(var(--ch-text),0.25)] mb-10 text-center">
            Technology Partners & Ecosystem
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {['Microsoft', 'AWS', 'Cloudflare', 'Google Cloud', 'Paystack', 'Flutterwave', 'Zoho', 'HubSpot', 'Odoo', 'Fortinet', 'Sophos', 'Azure'].map(p => (
              <span
                key={p}
                className="font-mono text-[11px] tracking-[0.12em] uppercase text-[rgba(var(--ch-text),0.25)] hover:text-[rgba(var(--ch-text),0.60)] transition-colors duration-200"
              >{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CASE STUDIES
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[var(--color-surface)] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-end justify-between mb-16 gap-6 flex-wrap reveal">
            <div>
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-4">Verified Results</p>
              <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight" style={{ fontSize: 'clamp(36px,5vw,64px)' }}>
                The work<br />speaks clearly.
              </h2>
            </div>
            <Link href="/work" className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.40)] hover:text-[var(--color-accent)] transition-colors duration-200 shrink-0">
              All Case Studies →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((cs: any, i: number) => (
              <div key={cs._id} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <CaseCard
                  slug={cs.slug?.current || cs.slug}
                  client={cs.client}
                  industry={cs.industry}
                  summary={cs.summary}
                  metric1_num={cs.metric1_num}
                  metric1_label={cs.metric1_label}
                  metric2_num={cs.metric2_num}
                  metric2_label={cs.metric2_label}
                  metric3_num={cs.metric3_num}
                  metric3_label={cs.metric3_label}
                  accent={cs.accent}
                  image={cs.coverImage ? urlFor(cs.coverImage).width(800).height(450).url() : cs.image}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[1280px] mx-auto reveal">
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FINAL CTA  — dark, centered, gradient glow
      ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#080C12] px-[clamp(24px,5vw,80px)] py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(37,99,235,0.14)_0%,transparent_100%)] pointer-events-none" />
        <div className="absolute inset-0 hero-grid pointer-events-none opacity-40" />

        <div className="relative max-w-[1280px] mx-auto text-center reveal">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.30)] mb-6">Next Step</p>
          <h2
            className="font-serif font-bold text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(40px,6vw,80px)' }}
          >
            Ready to build your<br />technology foundation<br />with <span className="text-gradient italic">Astacraft</span>?
          </h2>
          <p className="text-[clamp(15px,1.2vw,18px)] text-[rgba(255,255,255,0.42)] max-w-lg mx-auto mb-12">
            Book a free 45-minute consultation with a senior Astacraft technologist. We will review your current setup, identify the highest-leverage opportunities, and outline a clear technology roadmap for your business.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-accent)] text-white px-12 py-5 hover:bg-[var(--color-accent-hover)] transition-colors duration-200"
            >
              Book Free Consultation
            </Link>
            <Link
              href="/work"
              className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium border border-[rgba(255,255,255,0.16)] text-[rgba(255,255,255,0.55)] px-8 py-5 hover:border-[rgba(255,255,255,0.40)] hover:text-white transition-all duration-200 bg-[rgba(255,255,255,0.02)]"
            >
              View Case Studies First
            </Link>
          </div>
          <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-[rgba(255,255,255,0.18)] mt-8">
            45 minutes &nbsp;·&nbsp; No obligation &nbsp;·&nbsp; Senior technologist &nbsp;·&nbsp; Accra & Remote
          </p>
        </div>
      </section>
    </>
  )
}
