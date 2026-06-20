import type { Metadata } from 'next'
import { getInsights } from '@/sanity/queries'
import type { Insight } from '@/sanity/types'
import PageHero from '@/components/PageHero'
import { InsightsGrid } from '@/components/InsightsGrid'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Insights | Cloud, CRM & Digital Transformation for African Enterprise — Astacraft Systems',
  description: 'Practical guides on cloud architecture, CRM implementation, ERP selection, digital transformation strategy, and SaaS payments for businesses across Ghana and Africa.',
  alternates: { canonical: 'https://astacraftsystems.com/insights' },
  openGraph: {
    title: 'Insights | Cloud, CRM & Digital Transformation for African Enterprise — Astacraft Systems',
    description: 'Practical guides on cloud architecture, CRM implementation, ERP selection, digital transformation strategy, and SaaS payments for businesses across Ghana and Africa.',
    url: 'https://astacraftsystems.com/insights',
    type: 'website',
  },
}

const fallback = [
  {
    _id: '1', slug: { current: 'cloud-architecture-african-enterprise' },
    title: 'Cloud Architecture for African Enterprise: Building for Reliability When Infrastructure Works Against You',
    tag: 'Cloud & Infrastructure', label: 'Architecture',
    excerpt: 'AWS, Azure, and GCP are available across Africa — but latency, last-mile connectivity, and power reliability demand a different architecture approach than what global guides recommend. Here is what enterprise-grade cloud design looks like when the environment is working against you.',
    publishedAt: '2026-05-12', readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&q=80&auto=format&fit=crop',
  },
  {
    _id: '2', slug: { current: 'salesforce-vs-dynamics-vs-odoo-africa' },
    title: 'Salesforce vs Microsoft Dynamics vs Odoo: Choosing the Right CRM for Your African Enterprise',
    tag: 'CRM & Enterprise Systems', label: 'Comparison',
    excerpt: 'Not every CRM built for global enterprises fits the way African businesses operate. This guide compares Salesforce, Microsoft Dynamics 365, and Odoo across cost, customisation, local support, and fit for African market realities — so you can choose with confidence.',
    publishedAt: '2026-05-05', readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&q=80&auto=format&fit=crop',
  },
  {
    _id: '3', slug: { current: 'digital-transformation-ghana-roadmap' },
    title: 'Digital Transformation in Ghana: A Practical Roadmap for Mid-Size Enterprises',
    tag: 'Digital Transformation', label: 'Strategy',
    excerpt: 'Digital transformation is not a single project — it is a shift in how a business operates, makes decisions, and delivers value. This roadmap breaks the journey into four phases that mid-size Ghanaian enterprises can execute without disrupting day-to-day operations.',
    publishedAt: '2026-04-22', readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&q=80&auto=format&fit=crop',
  },
  {
    _id: '4', slug: { current: 'mobile-money-integration-saas-africa' },
    title: 'Mobile Money Integration for African SaaS Products: What Developers and Founders Need to Know',
    tag: 'SaaS & Payments', label: 'Engineering',
    excerpt: 'MTN MoMo, Telecel Cash, and AT Money collectively cover over 60 million active wallets across Ghana alone. If your SaaS product does not accept Mobile Money, you are locking out your most important payment channel. Here is how to integrate correctly — and what to avoid.',
    publishedAt: '2026-04-10', readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&q=80&auto=format&fit=crop',
  },
  {
    _id: '5', slug: { current: 'iso-27001-certification-africa' },
    title: 'ISO 27001 Certification in Africa: Why It Matters for Enterprise Technology Buyers and How to Get There',
    tag: 'Cybersecurity', label: 'Compliance',
    excerpt: 'As procurement teams across African financial services, healthcare, and government tighten vendor security requirements, ISO 27001 is shifting from a differentiator to a baseline expectation. This guide explains what the certification covers, how long it takes, and what to prioritise first.',
    publishedAt: '2026-03-28', readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&q=80&auto=format&fit=crop',
  },
  {
    _id: '6', slug: { current: 'crm-west-african-banking' },
    title: 'How West African Banks Are Using CRM to Win Commercial Lending Relationships',
    tag: 'CRM & Enterprise Systems', label: 'Case Analysis',
    excerpt: 'The battle for corporate banking clients in West Africa is being fought on relationship quality. Here is how Salesforce and Dynamics are being deployed to systematise what used to be purely human — and the implementation decisions that determine whether the rollout actually sticks.',
    publishedAt: '2026-03-14', readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&q=80&auto=format&fit=crop',
  },
  {
    _id: '7', slug: { current: 'erp-implementation-failure-africa' },
    title: 'Why ERP Implementations Fail in Africa — and the Five Decisions That Determine Success',
    tag: 'CRM & Enterprise Systems', label: 'Implementation',
    excerpt: 'A large share of ERP projects in Africa run over budget, miss their go-live date, or deliver a fraction of the intended value. The root causes are rarely technical. They are organisational, and they are predictable — which means they are preventable.',
    publishedAt: '2026-02-27', readTime: '11 min read',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&q=80&auto=format&fit=crop',
  },
  {
    _id: '8', slug: { current: 'legacy-system-cost-cfo-guide' },
    title: 'The Real Cost of Legacy Systems: A CFO\'s Guide to Building the Digital Transformation Business Case',
    tag: 'Digital Transformation', label: 'Finance',
    excerpt: 'The question African CFOs keep asking is not whether to modernise — it is how to justify the cost. Here is the financial model that makes the case from operational data, with a framework for calculating the true cost of doing nothing.',
    publishedAt: '2026-02-10', readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&q=80&auto=format&fit=crop',
  },
  {
    _id: '9', slug: { current: 'aws-azure-gcp-africa-comparison' },
    title: 'AWS vs Azure vs GCP for African Enterprises: A Practical Cloud Platform Comparison',
    tag: 'Cloud & Infrastructure', label: 'Comparison',
    excerpt: 'All three hyperscalers have a presence in Africa, but their regional footprints, pricing models, and enterprise support offerings differ significantly. This comparison helps technology leaders choose the right platform for their workload, compliance requirements, and budget.',
    publishedAt: '2026-01-30', readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&q=80&auto=format&fit=crop',
  },
  {
    _id: '10', slug: { current: 'api-integration-african-business' },
    title: 'API Integration in African Business: Why Your Software Stack Is Siloed and How to Fix It',
    tag: 'Platform Engineering', label: 'Integration',
    excerpt: 'Most African businesses run five to eight disconnected software tools. The productivity loss and data fragmentation from that disconnect compounds every quarter. Here is what modern integration architecture looks like at scale — and how to build it without replacing everything at once.',
    publishedAt: '2026-01-15', readTime: '6 min read',
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
        description="Practical guides on cloud architecture, CRM and ERP selection, digital transformation, cybersecurity, and SaaS payments — written from real enterprise engagements across Ghana and Africa."
        image={{ src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&h=700&q=85&auto=format&fit=crop', alt: 'Technology strategy and research' }}
      />

      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] pb-28 pt-16">
        <InsightsGrid insights={insights} />
      </section>
    </>
  )
}
