import type { Metadata } from 'next'
import Link from 'next/link'
import { getCaseStudies } from '@/sanity/queries'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Our Work | Technology Case Studies — Astacraft Systems',
  description: 'Explore how Astacraft Systems has delivered CRM implementations, software development, cloud migrations, and digital transformation for businesses across Ghana and Africa.',
  alternates: { canonical: 'https://astacraftsystems.com/work' },
  openGraph: {
    title: 'Our Work | Technology Case Studies — Astacraft Systems',
    description: 'Explore how Astacraft Systems has delivered CRM implementations, software development, cloud migrations, and digital transformation for businesses across Ghana and Africa.',
    url: 'https://astacraftsystems.com/work',
    type: 'website',
  },
}
import PageHero from '@/components/PageHero'
import WorkGrid from '@/components/WorkGrid'

const fallback = [
  {
    _id: '1', slug: { current: 'stanbic-crm-transformation' }, client: 'Stanbic Business Finance',
    industry: 'Financial Services', summary: 'Full Salesforce CRM implementation and data migration for a pan-African business finance division — unifying 12 regional offices onto one system.',
    metric1_num: '62%', metric1_label: 'Faster deal cycle',
    metric2_num: '12', metric2_label: 'Offices unified',
    metric3_num: '90d', metric3_label: 'Go-live', accent: 'blue',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&q=80&auto=format&fit=crop',
  },
  {
    _id: '2', slug: { current: 'mtn-cloud-migration' }, client: 'MTN Enterprise',
    industry: 'Telecoms', summary: 'Cloud migration of legacy on-premise infrastructure to AWS — cutting infrastructure costs while improving uptime across four data centres.',
    metric1_num: '38%', metric1_label: 'Infrastructure cost reduction',
    metric2_num: '99.97%', metric2_label: 'Uptime post-migration',
    metric3_num: '6mo', metric3_label: 'Migration timeline', accent: 'gold',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&q=80&auto=format&fit=crop',
  },
  {
    _id: '3', slug: { current: 'afrexim-security-audit' }, client: 'Afreximbank',
    industry: 'Financial Services', summary: 'Enterprise-wide cybersecurity audit, penetration testing, and ISO 27001 compliance framework — ahead of an international regulatory review.',
    metric1_num: '47', metric1_label: 'Vulnerabilities remediated',
    metric2_num: 'ISO', metric2_label: '27001 certified',
    metric3_num: '8wks', metric3_label: 'Engagement timeline', accent: 'cyan',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&q=80&auto=format&fit=crop',
  },
  {
    _id: '4', slug: { current: 'quickmart-erp-odoo' }, client: 'QuickMart Retail',
    industry: 'Retail & Commerce', summary: 'Odoo ERP deployment across 18 retail locations — replacing five disconnected systems with a single platform for inventory, POS, and procurement.',
    metric1_num: '18', metric1_label: 'Locations live',
    metric2_num: '40%', metric2_label: 'Inventory accuracy improvement',
    metric3_num: '4mo', metric3_label: 'Phased rollout', accent: 'blue',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&q=80&auto=format&fit=crop',
  },
  {
    _id: '5', slug: { current: 'volta-river-digital-ops' }, client: 'Volta River Authority',
    industry: 'Energy & Utilities', summary: 'Digital transformation of field operations — replacing paper-based inspection processes with a custom mobile app and real-time reporting dashboard.',
    metric1_num: '85%', metric1_label: 'Faster field reporting',
    metric2_num: '2,400+', metric2_label: 'Daily reports digitized',
    metric3_num: '120d', metric3_label: 'Build to launch', accent: 'cyan',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=500&q=80&auto=format&fit=crop',
  },
  {
    _id: '6', slug: { current: 'nexus-health-software' }, client: 'Nexus Health Systems',
    industry: 'Healthcare', summary: 'Custom patient management platform with mobile check-in, EHR integration, and billing automation — deployed across 8 clinics in Accra and Kumasi.',
    metric1_num: '8', metric1_label: 'Clinics deployed',
    metric2_num: '3×', metric2_label: 'Faster patient registration',
    metric3_num: '5mo', metric3_label: 'Build timeline', accent: 'gold',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&q=80&auto=format&fit=crop',
  },
]

export default async function WorkPage({ searchParams }: { searchParams: Promise<{ industry?: string }> }) {
  const { industry } = await searchParams

  let caseStudies = fallback as any[]
  try {
    const cs = await getCaseStudies()
    if (cs?.length) caseStudies = cs
  } catch {}

  return (
    <>
      <PageHero
        eyebrow="Selected Work"
        title={<>Results, not just<br />delivery.</>}
        description="Every engagement is measured by one thing: business outcomes. Here's a selection of what we've built and transformed for clients across Africa."
        image={{ src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=700&q=85&auto=format&fit=crop', alt: 'Astacraft Systems client work' }}
        cta={{ label: 'Start a Project →', href: '/contact' }}
      />

      <WorkGrid caseStudies={caseStudies} defaultIndustry={industry} />

      {/* CTA */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(29,71,118,0.12),transparent)] pointer-events-none" />
        <div className="relative max-w-[1280px] mx-auto text-center reveal">
          <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.28)] mb-4">Work With Us</p>
          <h2 className="font-serif font-bold text-white mb-6" style={{ fontSize: 'clamp(32px,4vw,56px)' }}>
            Your results could be next.
          </h2>
          <Link
            href="/contact"
            className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[#55AA49] text-white px-10 py-4 hover:bg-[#489A3E] transition-colors duration-200"
          >
            Start a Project →
          </Link>
        </div>
      </section>
    </>
  )
}
