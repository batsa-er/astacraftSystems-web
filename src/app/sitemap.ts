import type { MetadataRoute } from 'next'
import { getServices, getCaseStudies, getInsights } from '@/sanity/queries'

const BASE = 'https://astacraftsystems.com'

const FALLBACK_SERVICE_SLUGS = [
  'software-development',
  'digital-transformation',
  'cloud-solutions',
  'cybersecurity',
  'crm-erp',
  'api-automation',
  'it-consulting',
]

const FALLBACK_INSIGHT_SLUGS = [
  { slug: 'brand-consistency-africa',       date: '2025-01-15' },
  { slug: 'website-conversion-fundamentals', date: '2024-12-10' },
  { slug: 'crm-implementation-guide-ghana', date: '2025-02-10' },
  { slug: 'b2b-social-creative-lessons',    date: '2024-11-20' },
  { slug: 'rebrand-checklist',              date: '2024-10-05' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, caseStudies, insights] = await Promise.all([
    getServices().catch(() => null),
    getCaseStudies().catch(() => null),
    getInsights().catch(() => null),
  ])

  const serviceSlugs = services?.map(s => s.slug.current) ?? FALLBACK_SERVICE_SLUGS

  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                       lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/about`,            lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services`,         lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/products`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/products/crm`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/work`,             lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/insights`,         lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
    { url: `${BASE}/contact`,          lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/security`,         lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/careers`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.6 },
    { url: `${BASE}/privacy`,          lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms`,            lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map(slug => ({
    url: `${BASE}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const workRoutes: MetadataRoute.Sitemap = (caseStudies ?? []).map(c => ({
    url: `${BASE}/work/${c.slug.current}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const insightRoutes: MetadataRoute.Sitemap = insights
    ? insights.map(i => ({
        url: `${BASE}/insights/${i.slug.current}`,
        lastModified: i.publishedAt ? new Date(i.publishedAt) : now,
        changeFrequency: 'yearly' as const,
        priority: 0.6,
      }))
    : FALLBACK_INSIGHT_SLUGS.map(({ slug, date }) => ({
        url: `${BASE}/insights/${slug}`,
        lastModified: new Date(date),
        changeFrequency: 'yearly' as const,
        priority: 0.6,
      }))

  return [...staticRoutes, ...serviceRoutes, ...workRoutes, ...insightRoutes]
}
