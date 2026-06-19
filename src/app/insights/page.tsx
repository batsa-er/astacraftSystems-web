import type { Metadata } from 'next'
import { getInsights } from '@/sanity/queries'
import type { Insight } from '@/sanity/types'
import PageHero from '@/components/PageHero'
import { InsightsGrid } from '@/components/InsightsGrid'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Insights | Technology Strategy & Business Growth — Astacraft Systems',
  description: 'Practical guides on CRM, ERP, software development, digital transformation, brand strategy, and technology consulting for businesses in Ghana and across Africa.',
  alternates: { canonical: 'https://astacraftsystems.com/insights' },
  openGraph: {
    title: 'Insights | Technology Strategy & Business Growth — Astacraft Systems',
    description: 'Practical guides on CRM, ERP, software development, digital transformation, brand strategy, and technology consulting for businesses in Ghana and across Africa.',
    url: 'https://astacraftsystems.com/insights',
    type: 'website',
  },
}

const fallback = [
  {
    _id: '1', slug: { current: 'brand-consistency-africa' },
    title: 'Why Brand Consistency Is the Highest-Leverage Investment for African Businesses',
    tag: 'Brand Strategy', label: 'Identity',
    excerpt: 'Most growing companies underinvest in brand consistency. Here is what happens to customer perception — and revenue — when you get it right across every touchpoint.',
    publishedAt: '2025-01-15', readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&h=600&q=80&auto=format&fit=crop',
  },
  {
    _id: '2', slug: { current: 'website-conversion-fundamentals' },
    title: 'The 5 Website Fundamentals That Drive Conversions in African Markets',
    tag: 'Web & Digital', label: 'CRO',
    excerpt: 'Most business websites in Africa are information sites, not conversion tools. The gap between the two is where leads and deals are lost.',
    publishedAt: '2024-12-10', readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=500&q=80&auto=format&fit=crop',
  },
  {
    _id: '3', slug: { current: 'b2b-social-creative-lessons' },
    title: 'What Actually Works in B2B Social Media Creative — Lessons from 50+ Campaigns',
    tag: 'Marketing', label: 'Social',
    excerpt: 'B2B social content in Africa tends to be too formal or too promotional. Here is what we have learned about creative that builds trust and drives enquiries.',
    publishedAt: '2024-11-20', readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=500&q=80&auto=format&fit=crop',
  },
  {
    _id: '4', slug: { current: 'rebrand-checklist' },
    title: 'The Rebrand Checklist: When to Rebrand, When to Refresh, and When to Leave It Alone',
    tag: 'Brand Identity', label: 'Strategy',
    excerpt: 'Not every brand problem needs a full rebrand. A strategic framework for diagnosing what your brand actually needs — and what it would cost to get it wrong.',
    publishedAt: '2024-10-05', readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&q=80&auto=format&fit=crop',
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
        description="Technology strategy, brand intelligence, and practical frameworks from the Astacraft Systems team — built from real client engagements, not theory."
        image={{ src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&h=700&q=85&auto=format&fit=crop', alt: 'Writing and strategy at work' }}
      />

      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] pb-28 pt-16">
        <InsightsGrid insights={insights} />
      </section>
    </>
  )
}
