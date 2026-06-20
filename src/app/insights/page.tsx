import type { Metadata } from 'next'
import { getInsights } from '@/sanity/queries'
import type { Insight } from '@/sanity/types'
import PageHero from '@/components/PageHero'
import { InsightsGrid } from '@/components/InsightsGrid'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Insights | Enterprise Technology & SaaS Strategy — Astacraft Systems',
  description: 'Practical thinking on cloud architecture, digital transformation, SaaS platforms, CRM implementation, and enterprise technology for businesses across Africa.',
  alternates: { canonical: 'https://astacraftsystems.com/insights' },
  openGraph: {
    title: 'Insights | Enterprise Technology & SaaS Strategy — Astacraft Systems',
    description: 'Practical thinking on cloud architecture, digital transformation, SaaS platforms, CRM implementation, and enterprise technology for businesses across Africa.',
    url: 'https://astacraftsystems.com/insights',
    type: 'website',
  },
}

const fallback = [
  {
    _id: '1', slug: { current: 'cloud-architecture-african-enterprise' },
    title: 'Cloud Architecture for African Enterprise: Building for Reliability When Infrastructure Works Against You',
    tag: 'Cloud & Infrastructure', label: 'Architecture',
    excerpt: 'AWS, Azure, and GCP are available across Africa — but latency, last-mile connectivity, and power reliability demand a different architecture approach than what global guides recommend.',
    publishedAt: '2025-03-10', readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&q=80&auto=format&fit=crop',
  },
  {
    _id: '2', slug: { current: 'crm-west-african-banking' },
    title: 'How West African Banks Are Using CRM to Win Commercial Lending Relationships',
    tag: 'CRM & Financial Services', label: 'Case Analysis',
    excerpt: 'The battle for corporate banking clients in West Africa is being fought on relationship quality. Here is how Salesforce and Dynamics are being deployed to systematize what used to be purely human.',
    publishedAt: '2025-02-18', readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&q=80&auto=format&fit=crop',
  },
  {
    _id: '3', slug: { current: 'legacy-system-cost-cfo-guide' },
    title: 'The Real Cost of Legacy Systems: A CFO\'s Guide to Building the Digital Transformation Business Case',
    tag: 'Digital Transformation', label: 'Finance',
    excerpt: 'The question African CFOs keep asking is not whether to modernize — it is how to justify the cost. Here is the financial model that makes the case from operational data.',
    publishedAt: '2025-01-22', readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&q=80&auto=format&fit=crop',
  },
  {
    _id: '4', slug: { current: 'api-integration-african-business' },
    title: 'API Integration in African Business: Why Your Software Stack Is Siloed and How to Fix It',
    tag: 'Platform Engineering', label: 'Integration',
    excerpt: 'Most African businesses run five to eight disconnected software tools. The productivity and data loss from that fragmentation compounds quarterly. Here is what integration architecture looks like at scale.',
    publishedAt: '2024-12-05', readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&q=80&auto=format&fit=crop',
  },
]

export default async function InsightsPage() {
  let insights: Insight[] = fallback
  try {
    const i = await getInsights()
    if (i?.length) insights = i
  } catch {}

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={<>Thinking<br />out loud.</>}
        description="Enterprise technology strategy, platform engineering insights, and digital transformation frameworks from the AstaCraft Systems team — built from real client engagements across Africa."
        image={{ src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&h=700&q=85&auto=format&fit=crop', alt: 'Technology strategy and research' }}
      />

      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] pb-28 pt-16">
        <InsightsGrid insights={insights} />
      </section>
    </>
  )
}
