import type { Metadata } from 'next'
import Link from 'next/link'
import { getServices } from '@/sanity/queries'
import type { Service } from '@/sanity/types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'SaaS Platforms & Enterprise Systems | Astacraft Systems',
  description: 'Software products, cloud infrastructure, CRM & ERP implementation, and digital transformation — delivered by Astacraft Systems for businesses across Ghana and Africa.',
  alternates: { canonical: 'https://astacraftsystems.com/services' },
  openGraph: {
    title: 'SaaS Platforms & Enterprise Systems | Astacraft Systems',
    description: 'Software products, cloud infrastructure, CRM & ERP implementation, and digital transformation — delivered by Astacraft Systems for businesses across Ghana and Africa.',
    url: 'https://astacraftsystems.com/services',
    type: 'website',
  },
}
import { Check } from 'lucide-react'
import PageHero from '@/components/PageHero'
import { PLATFORM_SLUGS, ENTERPRISE_SLUGS, getServiceIcon } from '@/config/services'

const fallback = [
  {
    _id: '1', slug: { current: 'crm-erp' }, number: '01',
    title: 'CRM & Business Systems',
    tagline: 'The platform your operations run on.',
    description: 'Purpose-built CRM and business automation platforms configured for how African enterprises actually operate — with Salesforce, Odoo, and SAP at the core.',
    outcomes: ['CRM implementation & configuration', 'ERP deployment & customization', 'Workflow automation & integration', 'Data migration & cleansing', 'Staff training & adoption support', 'Ongoing system administration'],
  },
  {
    _id: '9', slug: { current: 'api-automation' }, number: '02',
    title: 'API & Automation',
    tagline: 'Connect your systems. Automate your operations.',
    description: 'We design and build custom APIs, workflow automation systems, and integrations that eliminate manual work and connect every part of your business — from internal tools to enterprise systems and third-party platforms.',
    outcomes: ['Custom REST & GraphQL API development', 'Workflow automation (Zapier, Make, n8n)', 'System integrations & data pipelines', 'Webhook design & event-driven systems', 'ERP & CRM API connectors', 'Automated reporting & document generation'],
  },
  {
    _id: '2', slug: { current: 'software-development' }, number: '03',
    title: 'Software Development',
    tagline: 'SaaS platforms and enterprise software, built to scale.',
    description: 'Full-stack web, mobile, and SaaS application development. From product MVPs to enterprise-grade systems, we architect, build, and maintain software that performs at scale.',
    outcomes: ['SaaS product development', 'Custom web & mobile applications', 'API design & platform integrations', 'Enterprise software engineering', 'Legacy system modernization', 'Ongoing maintenance & support'],
  },
  {
    _id: '3', slug: { current: 'cloud-solutions' }, number: '04',
    title: 'Cloud & Infrastructure',
    tagline: 'Infrastructure that scales with you.',
    description: 'Cloud architecture, migration, and managed services on AWS, Microsoft Azure, and Google Cloud. Secure, reliable, cost-optimized infrastructure for businesses at any scale.',
    outcomes: ['Cloud migration & lift-and-shift', 'Architecture design (AWS/Azure/GCP)', 'Managed cloud services', 'DevOps & CI/CD pipelines', 'Cost optimization & governance', 'Disaster recovery & backup'],
  },
  {
    _id: '4', slug: { current: 'digital-transformation' }, number: '05',
    title: 'Digital Transformation',
    tagline: 'Modernize operations. Accelerate growth.',
    description: 'We help organizations redesign processes, automate workflows, and replace legacy systems with modern technology — reducing operational costs and unlocking new capability.',
    outcomes: ['Business process automation', 'Workflow digitization', 'Legacy system replacement', 'Change management & training', 'Technology roadmap development', 'ROI measurement frameworks'],
  },
  {
    _id: '5', slug: { current: 'cybersecurity' }, number: '06',
    title: 'Cybersecurity',
    tagline: 'Enterprise-grade protection.',
    description: 'Security audits, penetration testing, compliance frameworks, and 24/7 monitoring — designed to protect your business from modern threats and meet regulatory requirements.',
    outcomes: ['Security audits & vulnerability assessments', 'Penetration testing', 'Compliance (ISO 27001, GDPR, PCI-DSS)', 'SOC monitoring & incident response', 'Employee security awareness training', 'Security policy development'],
  },
  {
    _id: '6', slug: { current: 'it-consulting' }, number: '07',
    title: 'IT Strategy & Advisory',
    tagline: 'Strategy before software.',
    description: 'Technology strategy, IT governance, architecture reviews, and digital roadmaps — giving leadership teams the clarity to make high-confidence technology decisions.',
    outcomes: ['Technology strategy & roadmaps', 'IT governance & policy frameworks', 'Architecture reviews & audits', 'Vendor selection & management', 'Technology team structuring', 'Budget planning & TCO analysis'],
  },
]

function ServiceCard({ s, i, accent, Icon }: { s: Service; i: number; accent: 'green' | 'navy' | 'muted'; Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> }) {
  const slug = s.slug.current
  const accentColor = accent === 'green' ? 'var(--color-green)' : accent === 'navy' ? 'var(--color-accent)' : 'rgba(var(--ch-text),0.30)'
  const checkColor  = accent === 'green' ? 'text-[var(--color-green)]' : accent === 'navy' ? 'text-[var(--color-accent)]' : 'text-[rgba(var(--ch-text),0.30)]'

  return (
    <div
      className="relative border border-[rgba(var(--ch-accent),0.12)] bg-[var(--color-surface)] p-10 md:p-12 overflow-hidden group hover:border-[rgba(var(--ch-accent),0.28)] transition-all duration-300 reveal"
      style={{ transitionDelay: `${i * 60}ms` }}
    >
      <span className="absolute bottom-6 right-10 font-serif font-bold text-[160px] leading-none text-[rgba(var(--ch-accent),0.04)] select-none pointer-events-none group-hover:text-[rgba(var(--ch-accent),0.07)] transition-colors duration-300">
        {s.number}
      </span>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div
            className="w-11 h-11 border flex items-center justify-center mb-6"
            style={{ borderColor: `${accentColor}33` }}
          >
            <Icon className="w-6 h-6" style={{ color: accentColor }} />
          </div>
          <h2 className="font-serif text-[clamp(24px,3vw,40px)] font-bold text-[var(--color-text)] mb-2">{s.title}</h2>
          <p className="font-mono text-[12px] tracking-[0.08em] italic text-[rgba(var(--ch-text),0.55)] mb-6">{s.tagline}</p>
          <p className="text-[15px] text-[rgba(var(--ch-text),0.60)] leading-relaxed mb-8">{s.description}</p>
          <Link
            href={`/services/${slug}`}
            className="inline-block font-mono text-[10px] tracking-[0.14em] uppercase border border-[rgba(var(--ch-accent),0.25)] text-[rgba(var(--ch-text),0.60)] px-6 py-3 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-200"
          >
            Explore {s.title} →
          </Link>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[rgba(var(--ch-text),0.30)] mb-5">Deliverables</p>
          <ul className="space-y-3">
            {(s.outcomes || []).map((o: string) => (
              <li key={o} className="flex items-start gap-3">
                <Check className={`${checkColor} shrink-0 mt-0.5 w-3.5 h-3.5`} />
                <span className="font-mono text-[12px] tracking-[0.06em] text-[rgba(var(--ch-text),0.55)]">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ label, accent, description }: { label: string; accent: string; description: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pt-16 reveal">
      <div>
        <span className="font-mono text-[11px] tracking-[0.26em] uppercase font-medium" style={{ color: accent }}>
          {label}
        </span>
        <div className="mt-2 h-px w-12" style={{ backgroundColor: accent, opacity: 0.4 }} />
      </div>
      <p className="mt-4 md:mt-0 text-[13px] text-[rgba(var(--ch-text),0.45)] max-w-[44ch] leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export default async function ServicesPage() {
  let services: Service[] = fallback
  try {
    const s = await getServices()
    if (s?.length) services = s
  } catch {}

  const platforms   = services.filter(s => PLATFORM_SLUGS.includes(s.slug.current))
  const enterprise  = services.filter(s => ENTERPRISE_SLUGS.includes(s.slug.current))
  const additional  = services.filter(s => !PLATFORM_SLUGS.includes(s.slug.current) && !ENTERPRISE_SLUGS.includes(s.slug.current))

  return (
    <>
      <PageHero
        eyebrow="Platforms & Systems"
        title={<>What we build<br />and deploy.</>}
        description="From SaaS platforms and cloud infrastructure to CRM and ERP implementation — AstaCraft Systems builds software products and enterprise-grade systems that power African businesses."
        image={{ src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=700&q=85&auto=format&fit=crop', alt: 'Astacraft Systems technology services' }}
      />

      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] pb-28">
        <div className="max-w-[1280px] mx-auto">

          {/* ── Product Platforms ── */}
          <SectionHeader
            label="Product Platforms"
            accent="var(--color-green)"
            description="Software platforms you adopt and automate your operations with."
          />
          <div className="space-y-6">
            {platforms.map((s, i) => (
              <ServiceCard key={s._id} s={s} i={i} accent="green" Icon={getServiceIcon(s.slug.current)} />
            ))}
          </div>

          {/* ── Enterprise Systems ── */}
          <SectionHeader
            label="Enterprise Systems"
            accent="var(--color-accent)"
            description="Infrastructure, security, and transformation capabilities for enterprise-scale organizations."
          />
          <div className="space-y-6">
            {enterprise.map((s, i) => (
              <ServiceCard key={s._id} s={s} i={i} accent="navy" Icon={getServiceIcon(s.slug.current)} />
            ))}
          </div>

          {/* ── Additional Services ── */}
          {additional.length > 0 && (
            <>
              <SectionHeader
                label="Additional Services"
                accent="rgba(var(--ch-text),0.28)"
                description="Complementary capabilities available as part of a broader engagement."
              />
              <div className="space-y-6">
                {additional.map((s, i) => (
                  <ServiceCard key={s._id} s={s} i={i} accent="muted" Icon={getServiceIcon(s.slug.current)} />
                ))}
              </div>
            </>
          )}

        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(29,71,118,0.12),transparent)] pointer-events-none" />
        <div className="relative max-w-[700px] mx-auto text-center reveal">
          <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.30)] mb-4">Ready to begin?</p>
          <h2 className="font-serif font-bold text-white mb-4" style={{ fontSize: 'clamp(28px,3vw,48px)' }}>
            Not sure which service fits your needs?
          </h2>
          <p className="text-[rgba(255,255,255,0.50)] mb-10">
            Book a complimentary 45-minute Technology Strategy Call. We will assess your current situation and recommend the right engagement — no commitment required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white px-10 py-4 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
            >
              Book a Technology Call →
            </Link>
            <a
              href="https://astabill.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium border border-[rgba(255,255,255,0.38)] text-white px-10 py-4 hover:border-[rgba(255,255,255,0.65)] transition-colors duration-200"
            >
              Try AstaBill Free
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
