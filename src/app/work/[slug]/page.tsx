import type { Metadata } from 'next'
import Link from 'next/link'
import { getCaseStudy, getCaseStudies } from '@/sanity/queries'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/JsonLd'

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const cs = await getCaseStudies()
    return cs.map((c: any) => ({ slug: c.slug?.current || c.slug }))
  } catch {
    return []
  }
}

const fallbackStudies: Record<string, any> = {
  'fintech-expansion': {
    client: 'PanAfrica Pay', industry: 'Fintech',
    summary: 'Rebuilt pipeline architecture and demand gen motion across 6 African markets.',
    metric1_num: '312%', metric1_label: 'Pipeline Growth',
    metric2_num: '4.1×', metric2_label: 'SQL Velocity',
    metric3_num: '18mo', metric3_label: 'Payback Period',
    accent: 'purple',
    challenge: 'PanAfrica Pay had product-market fit but lacked a repeatable revenue system. Sales cycles were long, pipeline was unpredictable, and the team had no shared GTM playbook across markets.',
    solution: 'We audited the full revenue stack, redesigned the ICP framework, built a market-by-market GTM motion, and deployed a full-funnel demand program with ABM overlays for enterprise accounts.',
    results: 'Within 12 months, pipeline grew 312%, SQL velocity improved 4.1×, and the payback period for new customers dropped to under 18 months across all 6 markets.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params

  let cs: any = null
  try { cs = await getCaseStudy(slug) } catch {}
  if (!cs) cs = fallbackStudies[slug]
  if (!cs) return { title: 'Case Study | Astacraft Systems' }

  const title = `${cs.client} Case Study | Astacraft Systems`
  const description = (cs.seoDescription || cs.summary || '').slice(0, 160)

  return {
    title,
    description,
    alternates: { canonical: `https://astacraftsystems.com/work/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://astacraftsystems.com/work/${slug}`,
      type: 'website',
    },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let cs: any = null
  try {
    cs = await getCaseStudy(slug)
  } catch {}
  if (!cs) cs = fallbackStudies[slug]
  if (!cs) notFound()

  const accentColor = cs.accent === 'cyan' ? '#0891B2' : cs.accent === 'gold' ? '#D97706' : '#2563EB'

  return (
    <>
      <JsonLd data={[
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

      {/* Header */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] pt-40 pb-24">
        <div className="max-w-[900px] mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/work" className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.40)] hover:text-[var(--color-accent)] transition-colors">
              ← Work
            </Link>
            <span className="text-[rgba(var(--ch-text),0.20)]">/</span>
            <span
              className="font-mono text-[11px] tracking-[0.2em] uppercase px-3 py-1"
              style={{ color: accentColor, border: `1px solid ${accentColor}` }}
            >
              {cs.industry}
            </span>
          </div>
          <h1 className="font-serif font-bold text-[var(--color-text)] leading-tight mb-6"
            style={{ fontSize: 'clamp(44px,7vw,80px)' }}>{cs.client}</h1>
          <p className="text-[clamp(16px,1.4vw,20px)] text-[rgba(var(--ch-text),0.60)] leading-relaxed max-w-2xl">
            {cs.summary}
          </p>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="bg-[var(--color-surface)] border-y border-[rgba(var(--ch-accent),0.08)] px-[clamp(24px,5vw,80px)] py-14">
        <div className="max-w-[900px] mx-auto grid grid-cols-3 gap-8">
          {[
            [cs.metric1_num, cs.metric1_label],
            [cs.metric2_num, cs.metric2_label],
            [cs.metric3_num, cs.metric3_label],
          ].map(([num, label]) => (
            <div key={label}>
              <p className="font-serif font-bold mb-1" style={{ fontSize: 'clamp(36px,5vw,60px)', color: accentColor, lineHeight: 1 }}>{num}</p>
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.40)]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Body */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-24">
        <div className="max-w-[900px] mx-auto space-y-16">
          {cs.challenge && (
            <div>
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase mb-4" style={{ color: accentColor }}>The Challenge</p>
              <p className="text-[clamp(15px,1.2vw,18px)] text-[rgba(var(--ch-text),0.70)] leading-relaxed">{cs.challenge}</p>
            </div>
          )}
          {cs.solution && (
            <div>
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase mb-4" style={{ color: accentColor }}>Our Approach</p>
              <p className="text-[clamp(15px,1.2vw,18px)] text-[rgba(var(--ch-text),0.70)] leading-relaxed">{cs.solution}</p>
            </div>
          )}
          {cs.results && (
            <div>
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase mb-4" style={{ color: accentColor }}>The Results</p>
              <p className="text-[clamp(15px,1.2vw,18px)] text-[rgba(var(--ch-text),0.70)] leading-relaxed">{cs.results}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-surface)] border-t border-[rgba(var(--ch-accent),0.08)] px-[clamp(24px,5vw,80px)] py-24 text-center">
        <div className="max-w-[700px] mx-auto">
          <h2 className="font-serif font-bold text-[var(--color-text)] mb-4" style={{ fontSize: 'clamp(28px,3vw,48px)' }}>
            Ready to see similar results?
          </h2>
          <p className="text-[rgba(var(--ch-text),0.55)] mb-8">Book a strategy call and we&apos;ll audit your revenue system.</p>
          <Link
            href="/contact"
            className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-accent)] text-white px-10 py-4 hover:bg-[var(--color-accent-hover)] transition-colors duration-200"
          >
            Book Strategy Call
          </Link>
        </div>
      </section>
    </>
  )
}
