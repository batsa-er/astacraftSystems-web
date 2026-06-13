import Link from 'next/link'
import { getServices } from '@/sanity/queries'
import {
  CodeIcon, ZapIcon, ServerIcon, ShieldCheckIcon,
  DatabaseIcon, MegaphoneIcon, BrushIcon, ConsultIcon,
  CheckIcon,
} from '@/components/Icons'
import PageHero from '@/components/PageHero'

function getServiceIcon(slug: string) {
  const map: Record<string, React.ComponentType<{ className?: string }>> = {
    'software-development': CodeIcon,
    'digital-transformation': ZapIcon,
    'cloud-solutions': ServerIcon,
    'cybersecurity': ShieldCheckIcon,
    'crm-erp': DatabaseIcon,
    'digital-marketing': MegaphoneIcon,
    'brand-design': BrushIcon,
    'it-consulting': ConsultIcon,
  }
  return map[slug] ?? ConsultIcon
}

const fallback = [
  {
    _id: '1', slug: { current: 'software-development' }, number: '01',
    title: 'Software Development',
    tagline: 'Custom software engineered for scale.',
    description: 'Full-stack web, mobile, and enterprise application development. From MVPs to large-scale systems, we architect, build, and maintain software that performs reliably at scale.',
    outcomes: ['Custom web application development', 'Mobile apps (iOS & Android)', 'Enterprise software integration', 'API design & development', 'Legacy system modernization', 'Ongoing maintenance & support'],
  },
  {
    _id: '2', slug: { current: 'digital-transformation' }, number: '02',
    title: 'Digital Transformation',
    tagline: 'Modernize operations. Accelerate growth.',
    description: 'We help organizations redesign processes, automate workflows, and replace legacy systems with modern technology — reducing costs and unlocking new capability.',
    outcomes: ['Business process automation', 'Workflow digitization', 'Legacy system replacement', 'Change management & training', 'Technology roadmap development', 'ROI measurement frameworks'],
  },
  {
    _id: '3', slug: { current: 'cloud-solutions' }, number: '03',
    title: 'Cloud Solutions',
    tagline: 'Infrastructure that scales with you.',
    description: 'Cloud architecture, migration, and managed services on AWS, Microsoft Azure, and Google Cloud. Secure, reliable, cost-optimized infrastructure for businesses at any scale.',
    outcomes: ['Cloud migration & lift-and-shift', 'Architecture design (AWS/Azure/GCP)', 'Managed cloud services', 'DevOps & CI/CD pipelines', 'Cost optimization & governance', 'Disaster recovery & backup'],
  },
  {
    _id: '4', slug: { current: 'cybersecurity' }, number: '04',
    title: 'Cybersecurity',
    tagline: 'Enterprise-grade protection.',
    description: 'Security audits, penetration testing, compliance frameworks, and 24/7 monitoring — designed to protect your business from modern threats and meet regulatory requirements.',
    outcomes: ['Security audits & vulnerability assessments', 'Penetration testing', 'Compliance (ISO 27001, GDPR, PCI-DSS)', 'SOC monitoring & incident response', 'Employee security awareness training', 'Security policy development'],
  },
  {
    _id: '5', slug: { current: 'crm-erp' }, number: '05',
    title: 'CRM & ERP Systems',
    tagline: 'Systems that run your business.',
    description: 'Implementation, customization, and integration of CRM and ERP platforms — Salesforce, Microsoft Dynamics, SAP, Odoo — configured for how African businesses actually operate.',
    outcomes: ['CRM implementation & configuration', 'ERP deployment & customization', 'Data migration & cleansing', 'Third-party system integrations', 'Staff training & adoption support', 'Ongoing system administration'],
  },
  {
    _id: '6', slug: { current: 'digital-marketing' }, number: '06',
    title: 'Digital Marketing',
    tagline: 'Growth-driven. Data-backed.',
    description: 'SEO, paid advertising, content strategy, and marketing automation — all tied to measurable growth. We build marketing systems that generate qualified leads and compounding revenue.',
    outcomes: ['SEO strategy & implementation', 'Paid advertising (Google, Meta, LinkedIn)', 'Content marketing & strategy', 'Marketing automation setup', 'Analytics & performance reporting', 'CRO & landing page optimization'],
  },
  {
    _id: '7', slug: { current: 'brand-design' }, number: '07',
    title: 'Brand & Design',
    tagline: 'Identity systems built to last.',
    description: 'Corporate brand identity, UI/UX design, and design systems — built to position your business as a credible, premium operator in your market and online.',
    outcomes: ['Brand identity & logo design', 'Corporate brand guidelines', 'UI/UX design for web & mobile', 'Design systems & component libraries', 'Corporate profiles & presentations', 'Website & app visual design'],
  },
  {
    _id: '8', slug: { current: 'it-consulting' }, number: '08',
    title: 'IT Consulting',
    tagline: 'Strategy before software.',
    description: 'Technology strategy, IT governance, architecture reviews, and digital roadmaps — giving leadership teams the clarity to make high-confidence technology decisions.',
    outcomes: ['Technology strategy & roadmaps', 'IT governance & policy frameworks', 'Architecture reviews & audits', 'Vendor selection & management', 'Technology team structuring', 'Budget planning & TCO analysis'],
  },
]

export default async function ServicesPage() {
  let services = fallback as any[]
  try {
    const s = await getServices()
    if (s?.length) services = s
  } catch {}

  return (
    <>
      <PageHero
        eyebrow="Technology Services"
        title={<>Eight capabilities.<br />One technology partner.</>}
        description="From software development and cloud infrastructure to cybersecurity and digital marketing — Astacraft delivers end-to-end technology capability so your business can focus on growth."
        image={{ src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=700&q=85&auto=format&fit=crop', alt: 'Astacraft Systems technology services' }}
      />

      {/* Services list */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] pb-28">
        <div className="max-w-[1280px] mx-auto space-y-6">
          {services.map((s: any, i: number) => {
            const slug = s.slug?.current || s.slug || ''
            const Icon = getServiceIcon(slug)
            return (
              <div
                key={s._id}
                className="relative border border-[rgba(var(--ch-accent),0.12)] bg-[var(--color-surface)] p-12 overflow-hidden group hover:border-[rgba(var(--ch-accent),0.30)] transition-all duration-300 reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="absolute bottom-6 right-10 font-serif font-bold text-[160px] leading-none text-[rgba(var(--ch-accent),0.04)] select-none pointer-events-none group-hover:text-[rgba(var(--ch-accent),0.07)] transition-colors duration-300">
                  {s.number || String(i + 1).padStart(2, '0')}
                </span>

                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <div className="w-11 h-11 border border-[rgba(var(--ch-accent),0.20)] flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-[var(--color-accent)]" />
                    </div>
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)] mb-4">
                      {s.number || String(i + 1).padStart(2, '0')}
                    </p>
                    <h2 className="font-serif text-[clamp(28px,3.5vw,48px)] font-bold text-[var(--color-text)] mb-2">{s.title}</h2>
                    <p className="font-mono text-[12px] tracking-[0.08em] italic text-[rgba(var(--ch-text),0.40)] mb-6">{s.tagline}</p>
                    <p className="text-[15px] text-[rgba(var(--ch-text),0.60)] leading-relaxed mb-8">{s.description}</p>
                    <Link
                      href={`/services/${slug}`}
                      className="inline-block font-mono text-[10px] tracking-[0.14em] uppercase border border-[rgba(var(--ch-accent),0.25)] text-[rgba(var(--ch-text),0.60)] px-6 py-3 hover:border-[var(--color-green)] hover:text-[var(--color-green)] transition-colors duration-200"
                    >
                      Explore {s.title} →
                    </Link>
                  </div>

                  <div>
                    <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-[rgba(var(--ch-text),0.30)] mb-5">Deliverables</p>
                    <ul className="space-y-3">
                      {(s.outcomes || []).map((o: string) => (
                        <li key={o} className="flex items-start gap-3">
                          <CheckIcon className="text-[var(--color-accent)] shrink-0 mt-0.5 w-3.5 h-3.5" />
                          <span className="font-mono text-[12px] tracking-[0.06em] text-[rgba(var(--ch-text),0.55)]">{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#080C12] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(29,71,118,0.12),transparent)] pointer-events-none" />
        <div className="relative max-w-[700px] mx-auto text-center reveal">
          <p className="font-mono text-[9px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.30)] mb-4">Ready to begin?</p>
          <h2 className="font-serif font-bold text-white mb-4" style={{ fontSize: 'clamp(28px,3vw,48px)' }}>
            Not sure which service fits your needs?
          </h2>
          <p className="text-[rgba(255,255,255,0.50)] mb-10">
            Book a complimentary 45-minute Technology Strategy Call. We will assess your current situation and recommend the right engagement — no commitment required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[#55AA49] text-white px-10 py-4 hover:bg-[#489A3E] transition-colors duration-200"
            >
              Start a Project →
            </Link>
            <Link
              href="/contact"
              className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium border border-[rgba(255,255,255,0.18)] text-white px-10 py-4 hover:border-[rgba(255,255,255,0.40)] transition-colors duration-200"
            >
              Submit RFP
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
