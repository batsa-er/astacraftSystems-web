import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCaseStudy, getCaseStudies } from '@/sanity/queries'
import type { CaseStudy, CaseStudyDetail } from '@/sanity/types'
import { JsonLd } from '@/components/JsonLd'

export const revalidate = 3600

const fallback: Record<string, Omit<CaseStudyDetail, '_id' | 'slug'>> = {
  'stanbic-crm-transformation': {
    client: 'Stanbic Business Finance',
    industry: 'Financial Services',
    summary: 'Full Salesforce CRM implementation and data migration for a pan-African business finance division — unifying 12 regional offices onto one system.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=700&q=85&auto=format&fit=crop',
    metric1_num: '62%', metric1_label: 'Faster deal cycle',
    metric2_num: '12',  metric2_label: 'Offices unified',
    metric3_num: '90d', metric3_label: 'Go-live timeline',
    services: ['CRM & ERP Systems', 'Digital Transformation', 'IT Strategy & Consulting'],
    challenge: 'Stanbic Business Finance operated across 12 regional offices in West Africa, each running its own spreadsheet-based tracking system for business lending pipelines. Deals were falling through the cracks between handoffs, forecast accuracy was near-zero, and the regional MD had no live view of the consolidated pipeline at any point in the month. The sales team were spending 3–4 hours per week manually collating status updates for weekly reporting.',
    solution: 'We designed and implemented a Salesforce Sales Cloud environment tailored to Stanbic\'s business lending workflow — with custom pipeline stages matching their credit approval process, automated handoff tasks between relationship managers and credit analysts, and a live executive dashboard that aggregated deal status across all 12 offices in real time. Data migration from 12 separate Excel environments was handled with a purpose-built ETL process to ensure no historical pipeline data was lost.',
    results: 'Within 90 days of go-live, the average deal cycle had shortened by 62% — primarily through eliminating manual status-chasing between teams. The regional MD gained a consolidated pipeline dashboard that updated in real time. Forecast accuracy improved from ad-hoc estimates to data-driven weekly projections within the first quarter. The sales team recovered an average of 3.5 hours per week previously spent on manual reporting.',
  },
  'mtn-cloud-migration': {
    client: 'MTN Enterprise',
    industry: 'Telecoms',
    summary: 'Cloud migration of legacy on-premise infrastructure to AWS — cutting infrastructure costs while improving uptime across four data centres.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&h=700&q=85&auto=format&fit=crop',
    metric1_num: '38%',    metric1_label: 'Infrastructure cost reduction',
    metric2_num: '99.97%', metric2_label: 'Uptime post-migration',
    metric3_num: '6mo',    metric3_label: 'Migration timeline',
    services: ['Cloud & Infrastructure', 'Digital Transformation', 'Cybersecurity'],
    challenge: 'MTN Enterprise\'s B2B division was running critical customer-facing systems on ageing on-premise infrastructure spread across four data centres. Maintenance costs were rising year-on-year, unplanned downtime incidents were increasing, and the infrastructure team was spending the majority of their capacity on firefighting rather than new capability development. The business case for cloud migration had been discussed for two years but had stalled due to concerns about data sovereignty, migration risk, and skills availability.',
    solution: 'We led a phased migration to AWS, beginning with a detailed workload assessment to categorise each system by migration complexity and business criticality. Low-risk workloads moved first via lift-and-shift, establishing team confidence and a working operational model before the more complex systems were re-architected. A dedicated AWS Landing Zone was configured to meet MTN\'s data residency and compliance requirements. We embedded two cloud engineers within the MTN infrastructure team throughout the engagement to build in-house capability alongside delivery.',
    results: 'The migration completed in six months — on schedule and within budget. Infrastructure costs fell 38% in the first year post-migration, primarily through right-sizing compute and eliminating idle capacity that had been provisioned for peak loads but never released. Uptime across the migrated workloads reached 99.97% in the 12 months following go-live, compared to a baseline of 99.1% on-premise. The infrastructure team shifted from reactive maintenance to proactive capacity planning.',
  },
  'afrexim-security-audit': {
    client: 'Afreximbank',
    industry: 'Financial Services',
    summary: 'Enterprise-wide cybersecurity audit, penetration testing, and ISO 27001 compliance framework — ahead of an international regulatory review.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600&h=700&q=85&auto=format&fit=crop',
    metric1_num: '47',   metric1_label: 'Vulnerabilities remediated',
    metric2_num: 'ISO',  metric2_label: '27001 certified',
    metric3_num: '8wks', metric3_label: 'Engagement timeline',
    services: ['Cybersecurity', 'IT Strategy & Consulting'],
    challenge: 'Afreximbank was preparing for a regulatory review by an international oversight body that required demonstrated compliance with ISO 27001 information security standards. An internal review had identified gaps in their security posture but lacked the depth to understand the full risk exposure or the roadmap to remediation. With eight weeks to the review date, they needed an authoritative external assessment and a clear remediation plan they could act on immediately.',
    solution: 'We conducted a comprehensive enterprise-wide security audit encompassing network infrastructure, application security, access controls, data handling procedures, and incident response capabilities. External and internal penetration testing was carried out across all public-facing systems and the internal network. Each finding was classified by severity and mapped to the relevant ISO 27001 control. We then worked with Afreximbank\'s IT and compliance teams directly to remediate critical and high findings within the engagement window, rather than handing over a report and leaving.',
    results: '47 vulnerabilities were identified and remediated within the eight-week engagement — including three critical findings that would have represented significant regulatory risk. Afreximbank achieved ISO 27001 certification ahead of the regulatory review date. The compliance team had a documented, auditor-ready evidence pack for every control. The regulatory review concluded with no material findings against information security controls.',
  },
  'quickmart-erp-odoo': {
    client: 'QuickMart Retail',
    industry: 'Retail & Commerce',
    summary: 'Odoo ERP deployment across 18 retail locations — replacing five disconnected systems with a single platform for inventory, POS, and procurement.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=700&q=85&auto=format&fit=crop',
    metric1_num: '18',  metric1_label: 'Locations live',
    metric2_num: '40%', metric2_label: 'Inventory accuracy improvement',
    metric3_num: '4mo', metric3_label: 'Phased rollout',
    services: ['CRM & ERP Systems', 'Software Development', 'Digital Transformation'],
    challenge: 'QuickMart was running five separate systems across its 18 retail locations — a legacy POS, a standalone inventory tool, a procurement spreadsheet, a manual accounts process, and a separate HR system. None of them talked to each other. Stock counts were manual and inaccurate, procurement was reactive rather than data-driven, and month-end close took two weeks because the finance team was reconciling data from five different sources.',
    solution: 'We implemented Odoo ERP as a unified platform covering POS, inventory management, procurement, and accounting — configured specifically for Ghana\'s VAT requirements and integrated with QuickMart\'s barcode scanning infrastructure. The rollout was phased across 18 locations over four months: a pilot at three high-volume locations in month one established the configuration baseline, followed by a regional rollout. Staff training was delivered in Twi and English by a team embedded at each location during their first week on the new system.',
    results: 'All 18 locations went live within the four-month timeline. Inventory accuracy improved by 40% in the first quarter post-go-live. Procurement shifted from reactive emergency purchasing to weekly automated reorder suggestions based on actual sales velocity. Month-end close dropped from two weeks to three days. The operations director now has a single dashboard showing real-time stock levels, sales performance, and procurement status across all 18 locations.',
  },
  'volta-river-digital-ops': {
    client: 'Volta River Authority',
    industry: 'Energy & Utilities',
    summary: 'Digital transformation of field operations — replacing paper-based inspection processes with a custom mobile app and real-time reporting dashboard.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&h=700&q=85&auto=format&fit=crop',
    metric1_num: '85%',    metric1_label: 'Faster field reporting',
    metric2_num: '2,400+', metric2_label: 'Daily reports digitized',
    metric3_num: '120d',   metric3_label: 'Build to launch',
    services: ['Software Development', 'Digital Transformation', 'Cloud & Infrastructure'],
    challenge: 'Volta River Authority\'s field teams across the Akosombo and Kpong hydroelectric facilities were completing infrastructure inspection reports on paper forms that were then physically transported to the operations centre, manually entered into a spreadsheet system, and reviewed days after the inspection had occurred. With over 2,400 inspection points across the facilities, the lag between a field observation and a management response was typically 48–72 hours — a safety and operational risk.',
    solution: 'We built a custom offline-capable mobile application for field inspection teams — designed to work reliably in the low-connectivity environments inside the dam facilities. Inspectors complete structured digital forms on ruggedised Android tablets, with photo capture and GPS tagging built in. When connectivity is restored, reports sync automatically to a real-time operations dashboard where anomalies are flagged immediately and assigned to the relevant engineering team.',
    results: 'Field reporting time fell by 85% — from an average of 45 minutes per inspection cycle to under seven minutes. Management visibility of field conditions shifted from a 48–72 hour lag to near-real time. In the first three months of operation, the system flagged two equipment anomalies that were resolved before they escalated into operational incidents. The entire build-to-launch cycle was completed in 120 days.',
  },
  'nexus-health-software': {
    client: 'Nexus Health Systems',
    industry: 'Healthcare',
    summary: 'Custom patient management platform with mobile check-in, EHR integration, and billing automation — deployed across 8 clinics in Accra and Kumasi.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&h=700&q=85&auto=format&fit=crop',
    metric1_num: '8',   metric1_label: 'Clinics deployed',
    metric2_num: '3×',  metric2_label: 'Faster patient registration',
    metric3_num: '5mo', metric3_label: 'Build timeline',
    services: ['Software Development', 'CRM & ERP Systems', 'Digital Transformation'],
    challenge: 'Nexus Health Systems operated eight private clinics across Accra and Kumasi with a paper-based patient registration and records system. Patient check-in queues were long, duplicate records were common, billing was manual and error-prone, and clinicians had no way to access a patient\'s history from a different clinic in the network. Previous attempts with off-the-shelf software had failed because none were configured for Ghana\'s NHIS billing requirements.',
    solution: 'We built a custom patient management platform — a web application for clinic staff and a mobile check-in app for patients — configured specifically for Ghana\'s NHIS billing codes and claim submission process. The platform included a unified patient record accessible across all eight clinics, automated NHIS claim generation from consultation records, EHR templates for the clinic\'s most common consultations, and a management dashboard showing patient volume, billing status, and claim pipeline.',
    results: 'Patient registration time fell from an average of 12 minutes to under four minutes. NHIS claim processing time dropped by 70% due to automated claim generation. Duplicate patient records were eliminated within 30 days of go-live. The medical director gained live visibility into patient volume, revenue, and claim status across all eight clinics from a single dashboard. All eight locations were live within the five-month build timeline.',
  },
}

export async function generateStaticParams() {
  try {
    const cs = await getCaseStudies()
    return cs.map((c) => ({ slug: c.slug.current }))
  } catch {
    return Object.keys(fallback).map((slug) => ({ slug }))
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  let cs: CaseStudyDetail | null = null
  try { cs = await getCaseStudy(slug) } catch {}
  if (!cs) cs = (fallback[slug] as CaseStudyDetail | undefined) ?? null
  if (!cs) return { title: 'Case Study | Astacraft Systems' }

  const title = `${cs.client} | Astacraft Systems`
  const description = (cs.seoDescription || cs.summary || '').slice(0, 160)
  return {
    title,
    description,
    alternates: { canonical: `https://astacraftsystems.com/work/${slug}` },
    openGraph: { title, description, url: `https://astacraftsystems.com/work/${slug}`, type: 'article' },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let cs: CaseStudyDetail | null = null
  try { cs = await getCaseStudy(slug) } catch {}
  if (!cs) cs = (fallback[slug] as CaseStudyDetail | undefined) ?? null
  if (!cs) notFound()

  const coverSrc: string | null = (cs.coverImage as string | undefined) ?? cs.image ?? null
  const services: string[] = cs.services ?? []
  const metrics = [
    { num: cs.metric1_num, label: cs.metric1_label },
    { num: cs.metric2_num, label: cs.metric2_label },
    { num: cs.metric3_num, label: cs.metric3_label },
  ].filter((m) => m.num && m.label)

  let relatedWork: CaseStudy[] = []
  try {
    const all = await getCaseStudies()
    const sameIndustry = all.filter((c) => c.slug.current !== slug && c.industry === cs!.industry)
    const others = all.filter((c) => c.slug.current !== slug && c.industry !== cs!.industry)
    relatedWork = [...sameIndustry, ...others].slice(0, 2)
  } catch {
    relatedWork = Object.entries(fallback)
      .filter(([key]) => key !== slug)
      .slice(0, 2)
      .map(([key, val]) => ({ ...val, slug: { current: key }, _id: key } as CaseStudy))
  }

  return (
    <>
      <JsonLd data={[
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: `${cs.client} — ${cs.industry}`,
          description: cs.summary,
          url: `https://astacraftsystems.com/work/${slug}`,
          author: { '@id': 'https://astacraftsystems.com/#organization' },
          publisher: { '@id': 'https://astacraftsystems.com/#organization' },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astacraftsystems.com' },
            { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://astacraftsystems.com/work' },
            { '@type': 'ListItem', position: 3, name: cs.client, item: `https://astacraftsystems.com/work/${slug}` },
          ],
        },
      ]} />

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden flex flex-col justify-end bg-[var(--color-dark)]"
        style={{ minHeight: '520px' }}
      >
        {coverSrc && (
          <>
            <Image src={coverSrc} alt={cs.client} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,30,64,0.96)] via-[rgba(13,30,64,0.60)] to-[rgba(13,30,64,0.20)]" />
          </>
        )}
        <div className="relative z-10 px-[clamp(24px,5vw,80px)] pb-14 pt-36">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Link
                href="/work"
                className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(255,255,255,0.50)] hover:text-white transition-colors"
              >
                ← Work
              </Link>
              <span className="text-[rgba(255,255,255,0.25)]">/</span>
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase px-3 py-1 text-white border border-[rgba(255,255,255,0.30)]">
                {cs.industry}
              </span>
            </div>
            <h1
              className="font-serif font-bold text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(32px,5vw,60px)' }}
            >
              {cs.client}
            </h1>
            <p
              className="text-[rgba(255,255,255,0.62)] leading-relaxed max-w-[680px]"
              style={{ fontSize: 'clamp(15px,1.4vw,18px)' }}
            >
              {cs.summary}
            </p>
          </div>
        </div>
      </section>

      {/* ── Metrics strip ── */}
      <section className="bg-[#1D4776] px-[clamp(24px,5vw,80px)] py-14">
        <div className="max-w-[1280px] mx-auto">
          <div className={`grid gap-0 ${metrics.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
            {metrics.map(({ num, label }, i) => (
              <div
                key={i}
                className={`pr-8 ${i < metrics.length - 1 ? 'border-r border-[rgba(255,255,255,0.12)] mr-8' : ''}`}
              >
                <p
                  className="font-serif font-black text-white leading-none mb-2"
                  style={{ fontSize: 'clamp(36px,4vw,64px)' }}
                >
                  {num}
                </p>
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[rgba(255,255,255,0.50)]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Narrative + sidebar ── */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-24">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 xl:gap-24 items-start">

          {/* Narrative */}
          <div className="space-y-16">
            {[
              { label: 'The Challenge', body: cs.challenge },
              { label: 'Our Approach',  body: cs.solution },
              { label: 'The Results',   body: cs.results },
            ].filter((s) => s.body).map(({ label, body }) => (
              <div key={label}>
                <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[var(--color-accent)] mb-5">
                  {label}
                </p>
                <p
                  className="text-[rgba(var(--ch-text),0.82)] leading-[1.85]"
                  style={{ fontSize: 'clamp(15px,1.2vw,17px)' }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-32 space-y-5">
            <div className="border border-[rgba(var(--ch-accent),0.12)] p-6">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[rgba(var(--ch-text),0.30)] mb-3">
                Client
              </p>
              <p className="font-serif font-semibold text-[var(--color-text)] text-[17px] leading-snug">
                {cs.client}
              </p>
              <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-accent)] mt-1">
                {cs.industry}
              </p>
            </div>

            {services.length > 0 && (
              <div className="border border-[rgba(var(--ch-accent),0.12)] p-6">
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[rgba(var(--ch-text),0.30)] mb-4">
                  Services Delivered
                </p>
                <div className="space-y-2.5">
                  {services.map((s: string) => (
                    <div key={s} className="flex items-center gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-[#55AA49] shrink-0" />
                      <span className="text-[13px] text-[rgba(var(--ch-text),0.65)]">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Link
              href="/contact"
              className="block font-mono text-[10px] tracking-[0.16em] uppercase text-center bg-[#55AA49] text-white py-4 px-6 hover:bg-[#489A3E] transition-colors duration-200"
            >
              Start a Similar Project →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Related work ── */}
      {relatedWork.length > 0 && (
        <section className="bg-[var(--color-surface)] border-t border-[rgba(var(--ch-accent),0.08)] px-[clamp(24px,5vw,80px)] py-20">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center justify-between mb-10">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)]">More Work</p>
              <Link
                href="/work"
                className="font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(var(--ch-text),0.40)] hover:text-[var(--color-accent)] transition-colors"
              >
                All case studies →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedWork.map((related) => {
                const relSlug = related.slug.current
                const relImg: string | null = (related.coverImage as string | undefined) ?? related.image ?? null
                return (
                  <Link
                    key={relSlug}
                    href={`/work/${relSlug}`}
                    className="group flex flex-col border border-[rgba(var(--ch-accent),0.12)] bg-[var(--color-panel)] hover:border-[rgba(var(--ch-accent),0.30)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                  >
                    {relImg && (
                      <div className="relative w-full aspect-[16/9] overflow-hidden">
                        <Image
                          src={relImg}
                          alt={related.client}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-7 flex flex-col flex-1">
                      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-accent)] mb-3">
                        {related.industry}
                      </span>
                      <h3
                        className="font-serif font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-200 mb-3 leading-tight"
                        style={{ fontSize: 'clamp(18px,1.8vw,24px)' }}
                      >
                        {related.client}
                      </h3>
                      <p className="text-[13px] text-[rgba(var(--ch-text),0.50)] leading-relaxed flex-1 mb-5">
                        {related.summary}
                      </p>
                      <div className="flex items-center gap-6 border-t border-[rgba(var(--ch-accent),0.08)] pt-5">
                        <div>
                          <p
                            className="font-serif font-black text-[#1D4776] leading-none"
                            style={{ fontSize: 'clamp(20px,2vw,28px)' }}
                          >
                            {related.metric1_num}
                          </p>
                          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[rgba(var(--ch-text),0.40)] mt-1">
                            {related.metric1_label}
                          </p>
                        </div>
                        <span className="ml-auto font-mono text-[11px] text-[rgba(var(--ch-text),0.20)] group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5 transition-all duration-200">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(29,71,118,0.18),transparent)] pointer-events-none" />
        <div className="relative max-w-[1280px] mx-auto text-center">
          <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.28)] mb-4">
            Work With Us
          </p>
          <h2 className="font-serif font-bold text-white mb-6" style={{ fontSize: 'clamp(28px,4vw,52px)' }}>
            Your results could be next.
          </h2>
          <p className="text-[rgba(255,255,255,0.45)] mb-10 max-w-[48ch] mx-auto text-[15px] leading-relaxed">
            Book a complimentary strategy call and we will map the right technology path for your business.
          </p>
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
