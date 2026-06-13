import Link from 'next/link'
import { getServices } from '@/sanity/queries'
import { notFound } from 'next/navigation'
import {
  CodeIcon, ZapIcon, ServerIcon, ShieldCheckIcon,
  DatabaseIcon, MegaphoneIcon, BrushIcon, ConsultIcon,
} from '@/components/Icons'

export async function generateStaticParams() {
  try {
    const s = await getServices()
    return s.map((svc: any) => ({ slug: svc.slug?.current || svc.slug }))
  } catch {
    return [
      'software-development', 'digital-transformation', 'cloud-solutions', 'cybersecurity',
      'crm-erp', 'digital-marketing', 'brand-design', 'it-consulting',
    ].map(slug => ({ slug }))
  }
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'software-development': CodeIcon,
  'digital-transformation': ZapIcon,
  'cloud-solutions': ServerIcon,
  'cybersecurity': ShieldCheckIcon,
  'crm-erp': DatabaseIcon,
  'digital-marketing': MegaphoneIcon,
  'brand-design': BrushIcon,
  'it-consulting': ConsultIcon,
}

const fallbackServices: Record<string, any> = {
  'software-development': {
    number: '01', title: 'Software Development', tagline: 'Custom software engineered for scale.',
    description: 'Full-stack web, mobile, and enterprise application development. From MVPs to large-scale systems, we architect, build, and maintain software that performs reliably at scale.',
    detail: 'We build software end-to-end — from initial architecture to production deployment and beyond. Our engineering team works in modern stacks (React, Next.js, Node.js, Python, Go) and follows agile delivery practices that keep projects on time and on budget. Every system we build is designed for reliability, security, and long-term maintainability.',
    outcomes: ['Custom web application development', 'Mobile apps (iOS & Android)', 'Enterprise software integration', 'API design & development', 'Legacy system modernization', 'Ongoing maintenance & support'],
    process: ['Discovery & requirements', 'System architecture design', 'UI/UX design & prototyping', 'Agile development sprints', 'QA, testing & security review', 'Deployment, launch & handoff'],
    stats: [{ num: '200+', label: 'Systems built' }, { num: '98%', label: 'On-time delivery' }, { num: '8+', label: 'Years in development' }],
  },
  'digital-transformation': {
    number: '02', title: 'Digital Transformation', tagline: 'Modernize operations. Accelerate growth.',
    description: 'We help organizations redesign processes, automate workflows, and replace legacy systems with modern technology — reducing operational costs and unlocking new capability.',
    detail: 'Digital transformation is not a one-time project — it is a sustained shift in how an organization uses technology to operate and compete. We guide businesses through the full journey: diagnosing where manual processes and legacy systems are creating friction, designing the target state, and executing the change in phases that maintain business continuity.',
    outcomes: ['Business process automation', 'Workflow digitization', 'Legacy system replacement', 'Change management & training', 'Technology roadmap development', 'ROI measurement frameworks'],
    process: ['Current state assessment', 'Gap analysis & opportunity mapping', 'Roadmap & business case', 'Pilot implementation', 'Full rollout & change management', 'Optimization & continuous improvement'],
    stats: [{ num: '60%', label: 'Avg. process efficiency gain' }, { num: '40+', label: 'Transformations delivered' }, { num: '18mo', label: 'Avg. transformation timeline' }],
  },
  'cloud-solutions': {
    number: '03', title: 'Cloud Solutions', tagline: 'Infrastructure that scales with you.',
    description: 'Cloud architecture, migration, and managed services on AWS, Microsoft Azure, and Google Cloud. Secure, reliable, cost-optimized infrastructure for businesses at any scale.',
    detail: 'Cloud infrastructure is the backbone of every modern business. We help organizations migrate from on-premise to cloud, architect new cloud-native systems, and manage ongoing infrastructure with the reliability of a dedicated team. Our certified cloud architects work across AWS, Azure, and GCP — ensuring your infrastructure matches your actual workload and budget.',
    outcomes: ['Cloud migration & lift-and-shift', 'Architecture design (AWS/Azure/GCP)', 'Managed cloud services', 'DevOps & CI/CD pipelines', 'Cost optimization & governance', 'Disaster recovery & backup'],
    process: ['Cloud readiness assessment', 'Architecture design & costing', 'Migration planning & phasing', 'Execution & cutover', 'Performance optimization', 'Ongoing managed services'],
    stats: [{ num: '35%', label: 'Avg. infrastructure cost reduction' }, { num: '99.9%', label: 'Uptime SLA' }, { num: '50+', label: 'Cloud migrations completed' }],
  },
  'cybersecurity': {
    number: '04', title: 'Cybersecurity', tagline: 'Enterprise-grade protection.',
    description: 'Security audits, penetration testing, compliance frameworks, and 24/7 monitoring — designed to protect your business from modern threats and meet regulatory requirements.',
    detail: 'Cybersecurity is no longer optional for businesses of any size. A single breach can cost more than years of security investment — in downtime, data loss, regulatory fines, and reputational damage. Our certified security team provides the full spectrum of protection: from vulnerability identification to incident response and ongoing monitoring.',
    outcomes: ['Security audits & vulnerability assessments', 'Penetration testing', 'Compliance (ISO 27001, GDPR, PCI-DSS)', 'SOC monitoring & incident response', 'Employee security awareness training', 'Security policy development'],
    process: ['Security baseline assessment', 'Threat & risk modelling', 'Penetration testing', 'Remediation prioritization', 'Controls implementation', 'Continuous monitoring & reporting'],
    stats: [{ num: '0', label: 'Client breaches post-engagement' }, { num: 'ISO', label: '27001 certified practice' }, { num: '24/7', label: 'SOC monitoring capability' }],
  },
  'crm-erp': {
    number: '05', title: 'CRM & ERP Systems', tagline: 'Systems that run your business.',
    description: 'Implementation, customization, and integration of CRM and ERP platforms — Salesforce, Microsoft Dynamics, SAP, Odoo — configured for how African businesses actually operate.',
    detail: 'A poorly implemented ERP or CRM can cost more than it saves. We bring deep implementation experience across the leading platforms — with particular expertise in configuring them for African market realities: multi-currency, local tax compliance, mobile-first workflows, and integration with local payment systems. Our implementations are built to last.',
    outcomes: ['CRM implementation & configuration', 'ERP deployment & customization', 'Data migration & cleansing', 'Third-party system integrations', 'Staff training & adoption support', 'Ongoing system administration'],
    process: ['Requirements analysis', 'Platform selection & scoping', 'Configuration & customization', 'Data migration & testing', 'Team training & adoption', 'Post-launch support & optimization'],
    stats: [{ num: '80+', label: 'CRM/ERP implementations' }, { num: '94%', label: 'User adoption rate' }, { num: '3mo', label: 'Avg. go-live timeline' }],
  },
  'digital-marketing': {
    number: '06', title: 'Digital Marketing', tagline: 'Growth-driven. Data-backed.',
    description: 'SEO, paid advertising, content strategy, and marketing automation — all tied to measurable growth. We build marketing systems that generate qualified leads and compounding revenue.',
    detail: 'Marketing without measurement is just spending money. We build marketing systems that are fully instrumented from day one — so every channel, campaign, and piece of content is tied back to qualified leads and revenue. Our approach combines creative content with rigorous data analysis, and we report on the metrics that actually matter to your business.',
    outcomes: ['SEO strategy & implementation', 'Paid advertising (Google, Meta, LinkedIn)', 'Content marketing & strategy', 'Marketing automation setup', 'Analytics & performance reporting', 'CRO & landing page optimization'],
    process: ['Marketing audit & baseline', 'Strategy & channel selection', 'Asset creation & campaign setup', 'Launch & A/B testing', 'Performance optimization', 'Monthly reporting & scaling'],
    stats: [{ num: '3.2×', label: 'Avg. ROAS for paid clients' }, { num: '180%', label: 'Avg. organic traffic growth' }, { num: '90d', label: 'To measurable results' }],
  },
  'brand-design': {
    number: '07', title: 'Brand & Design', tagline: 'Identity systems built to last.',
    description: 'Corporate brand identity, UI/UX design, and design systems — built to position your business as a credible, premium operator in your market and online.',
    detail: 'A brand is more than a logo — it is the sum of every impression your business makes on a potential client or partner. We design brand identities that are built to scale: clear, consistent, and distinctive enough to hold their own in competitive markets. Every identity we deliver comes with a comprehensive system for use across digital and physical touchpoints.',
    outcomes: ['Brand identity & logo design', 'Corporate brand guidelines', 'UI/UX design for web & mobile', 'Design systems & component libraries', 'Corporate profiles & presentations', 'Website & app visual design'],
    process: ['Discovery & market research', 'Positioning & creative direction', 'Identity design exploration', 'Refinement & system build', 'Brand guidelines & asset delivery', 'Rollout & implementation support'],
    stats: [{ num: '150+', label: 'Brands designed' }, { num: '4.8/5', label: 'Client satisfaction score' }, { num: '3wk', label: 'Avg. identity turnaround' }],
  },
  'it-consulting': {
    number: '08', title: 'IT Consulting', tagline: 'Strategy before software.',
    description: 'Technology strategy, IT governance, architecture reviews, and digital roadmaps — giving leadership teams the clarity to make high-confidence technology decisions.',
    detail: 'Most technology failures begin not with bad engineering, but with poor strategy: choosing the wrong platform, under-specifying a system, or scaling too early or too late. Our consulting practice works at the intersection of business and technology — helping leadership teams understand their options, evaluate trade-offs, and build roadmaps they can actually execute.',
    outcomes: ['Technology strategy & roadmaps', 'IT governance & policy frameworks', 'Architecture reviews & audits', 'Vendor selection & management', 'Technology team structuring', 'Budget planning & TCO analysis'],
    process: ['Current state discovery', 'Stakeholder & requirement alignment', 'Options analysis & recommendation', 'Roadmap development', 'Implementation guidance', 'Advisory retainer & review cadence'],
    stats: [{ num: '$4M+', label: 'In client tech spend advised' }, { num: '100+', label: 'Architecture reviews' }, { num: '12+', label: 'Countries served' }],
  },
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  let svc: any = null
  try {
    const services = await getServices()
    svc = services?.find((s: any) => (s.slug?.current || s.slug) === params.slug)
  } catch {}
  if (!svc) svc = fallbackServices[params.slug]
  if (!svc) notFound()

  const Icon = iconMap[params.slug] ?? ConsultIcon
  const stats = svc.stats || fallbackServices[params.slug]?.stats || []
  const process = svc.process || fallbackServices[params.slug]?.process || []

  return (
    <>
      {/* Dark hero */}
      <section className="relative bg-[#080C12] px-[clamp(24px,5vw,80px)] pt-40 pb-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-50 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_60%_-10%,rgba(37,99,235,0.12),transparent)] pointer-events-none" />

        <div className="relative max-w-[1000px] mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(255,255,255,0.30)] hover:text-[rgba(255,255,255,0.70)] transition-colors mb-10 hero-in hero-in-1"
          >
            ← All Services
          </Link>

          <div className="hero-in hero-in-2">
            <span className="inline-flex items-center gap-2.5 font-mono text-[9px] tracking-[0.22em] uppercase px-3 py-1.5 border border-[rgba(37,99,235,0.35)] text-[rgba(100,160,255,0.80)] mb-8">
              <Icon className="w-3 h-3" />
              Service {svc.number}
            </span>
          </div>

          <h1
            className="font-serif font-bold text-white leading-tight mb-4 hero-in hero-in-3"
            style={{ fontSize: 'clamp(44px,7vw,80px)' }}
          >
            {svc.title}
          </h1>
          <p className="font-mono text-[14px] tracking-[0.06em] italic text-[rgba(255,255,255,0.35)] mb-8 hero-in hero-in-4">
            {svc.tagline}
          </p>
          <p
            className="text-[clamp(16px,1.4vw,20px)] text-[rgba(255,255,255,0.55)] leading-relaxed max-w-2xl hero-in hero-in-5"
          >
            {svc.description}
          </p>
        </div>
      </section>

      {/* Stats strip */}
      {stats.length > 0 && (
        <section className="bg-[var(--color-surface)] border-y border-[rgba(var(--ch-accent),0.08)] px-[clamp(24px,5vw,80px)] py-12">
          <div className="max-w-[1280px] mx-auto grid grid-cols-3 gap-8 max-w-2xl">
            {stats.map(({ num, label }: { num: string; label: string }, i: number) => (
              <div key={label} className="text-center reveal-scale" style={{ transitionDelay: `${i * 80}ms` }}>
                <p className="font-serif font-bold text-[var(--color-accent)] mb-1" style={{ fontSize: 'clamp(28px,3vw,44px)', lineHeight: 1 }}>{num}</p>
                <p className="font-mono text-[9px] tracking-[0.14em] uppercase text-[rgba(var(--ch-text),0.35)]">{label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Approach + Deliverables */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="reveal">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-6">The Approach</p>
            <p className="text-[15px] text-[rgba(var(--ch-text),0.65)] leading-relaxed">
              {svc.detail || svc.description}
            </p>
          </div>

          <div className="reveal" style={{ transitionDelay: '100ms' }}>
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-6">What&apos;s Included</p>
            <ul className="space-y-4">
              {(svc.outcomes || []).map((o: string, i: number) => (
                <li key={o} className="flex items-start gap-4">
                  <span className="font-mono text-[10px] text-[var(--color-accent)] mt-0.5 shrink-0 w-6">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[12px] tracking-[0.06em] text-[rgba(var(--ch-text),0.60)]">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process steps */}
      {process.length > 0 && (
        <section className="bg-[var(--color-surface)] px-[clamp(24px,5vw,80px)] py-28">
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-14 reveal">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-4">How We Work</p>
              <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight" style={{ fontSize: 'clamp(28px,3.5vw,48px)' }}>
                The engagement process.
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {process.map((step: string, i: number) => (
                <div key={step} className="relative reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                  {i < process.length - 1 && (
                    <div className="hidden lg:block absolute top-5 left-[calc(50%+24px)] right-0 h-px border-t border-dashed border-[rgba(var(--ch-accent),0.20)]" />
                  )}
                  <div className="w-10 h-10 border border-[rgba(var(--ch-accent),0.25)] flex items-center justify-center mb-4 bg-[var(--color-bg)]">
                    <span className="font-mono text-[10px] font-bold text-[var(--color-accent)]">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="font-mono text-[11px] tracking-[0.04em] text-[rgba(var(--ch-text),0.60)] leading-snug">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative bg-[#080C12] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(29,71,118,0.12),transparent)] pointer-events-none" />
        <div className="relative max-w-[700px] mx-auto text-center reveal">
          <p className="font-mono text-[9px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.28)] mb-4">Ready to begin?</p>
          <h2 className="font-serif font-bold text-white leading-tight mb-6" style={{ fontSize: 'clamp(32px,4.5vw,56px)' }}>
            Ready to get started?
          </h2>
          <p className="text-[clamp(15px,1.1vw,17px)] text-[rgba(255,255,255,0.50)] max-w-lg mx-auto mb-10">
            Book a complimentary strategy call. We will assess your current situation and outline exactly how {svc.title.toLowerCase()} applies to your business goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[#55AA49] text-white px-10 py-4 hover:bg-[#489A3E] transition-colors duration-200"
            >
              Start a Project →
            </Link>
            <Link
              href="/services"
              className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium border border-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.60)] px-10 py-4 hover:border-[rgba(255,255,255,0.40)] hover:text-white transition-colors duration-200"
            >
              All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
