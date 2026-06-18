export interface SanitySlug {
  current: string
}

export interface CaseStudy {
  _id: string
  slug: SanitySlug
  client: string
  industry: string
  summary: string
  metric1_num: string
  metric1_label: string
  metric2_num: string
  metric2_label: string
  metric3_num: string
  metric3_label: string
  accent: 'purple' | 'cyan' | 'gold'
}

export interface CaseStudyDetail extends CaseStudy {
  challenge: string
  solution: string
  results: string
  seoTitle?: string
  seoDescription?: string
}

export interface Insight {
  _id: string
  slug: SanitySlug
  title: string
  tag: string
  label?: string
  excerpt: string
  publishedAt: string
  readTime: string
}

export interface InsightDetail extends Insight {
  body: string
  seoTitle?: string
  seoDescription?: string
}

export interface Service {
  _id: string
  slug: SanitySlug
  number: string
  title: string
  tagline: string
  description: string
  outcomes: string[]
  price: string
}

export interface ServiceStat {
  num: string
  label: string
}

export interface ServiceFaq {
  q: string
  a: string
}

export interface ServiceDetail extends Service {
  detail: string
  process?: string[]
  stats?: ServiceStat[]
  faq?: ServiceFaq[]
  seoTitle?: string
  seoDescription?: string
}

export interface Testimonial {
  _id: string
  quote: string
  name: string
  role?: string
  initials?: string
  photo?: { asset: { _id: string; url: string } }
  featured: boolean
}

export interface Career {
  _id: string
  title: string
  department?: string
  type?: string
  location?: string
  excerpt?: string
  applyUrl?: string
}
