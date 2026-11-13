import type { MetadataRoute } from 'next'
import { getInsights, hasCaseStudies, getCaseStudies } from '@/sanity/queries'
import { PAGES, type PageKey } from '@/config/pages'
import { SITE } from '@/config/site'
import { pageVisible } from '@/lib/pages'

const BASE = SITE.url

const PRIORITY: Record<PageKey, number> = {
  home: 1.0,
  services: 0.9,
  products: 0.9,
  dondo: 0.9,
  industries: 0.8,
  work: 0.7,
  security: 0.6,
  about: 0.7,
  contact: 0.7,
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [insights, showWork] = await Promise.all([
    getInsights().catch(() => null),
    hasCaseStudies(),
  ])
  const now = new Date()

  const mainRoutes: MetadataRoute.Sitemap = (Object.keys(PAGES) as PageKey[])
    .filter(key => pageVisible(key) && (key !== 'work' || showWork))
    .map(key => ({
      url: key === 'home' ? BASE : `${BASE}${PAGES[key].path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: PRIORITY[key],
    }))

  const otherRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/insights`, lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/careers`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.5 },
    { url: `${BASE}/privacy`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms`,    lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const insightRoutes: MetadataRoute.Sitemap = (insights ?? []).map(i => ({
    url: `${BASE}/insights/${i.slug.current}`,
    lastModified: i.publishedAt ? new Date(i.publishedAt) : now,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  const workRoutes: MetadataRoute.Sitemap = showWork && pageVisible('work')
    ? (await getCaseStudies().catch(() => [])).map(c => ({
        url: `${BASE}/work/${c.slug.current}`,
        lastModified: now,
        changeFrequency: 'yearly' as const,
        priority: 0.6,
      }))
    : []

  return [...mainRoutes, ...otherRoutes, ...insightRoutes, ...workRoutes]
}
