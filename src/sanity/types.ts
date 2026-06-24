export interface SanitySlug {
  current: string
}

export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
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
  accent?: string
  image?: string
  coverImage?: SanityImage
}

export interface CaseStudyDetail extends CaseStudy {
  challenge: string
  solution: string
  results: string
  services?: string[]
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
  author?: string
  authorRole?: string
  publishedAt: string
  readTime: string
  image?: string
  coverImage?: SanityImage
}

export interface InsightDetail extends Insight {
  body: string
  seoTitle?: string
  seoDescription?: string
  relatedServices?: { title: string; slug: string }[]
}

export interface Service {
  _id: string
  slug: SanitySlug
  number: string
  title: string
  tagline: string
  description: string
  outcomes: string[]
  price?: string
}

export interface ServiceStat {
  num: string
  label: string
}

export interface ServiceFaq {
  q: string
  a: string
}

export type ProcessStep = string | { title: string; body: string }

export interface ServiceDetail extends Service {
  detail: string
  process?: ProcessStep[]
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

export interface TeamMember {
  _id?: string
  name: string
  role?: string
  bio?: string
  image?: string
  photo?: SanityImage
}

export interface Career {
  _id: string
  title: string
  slug?: { current: string }
  department?: string
  type?: string
  location?: string
  excerpt?: string
  description?: string
  responsibilities?: string[]
  requirements?: string[]
  niceToHave?: string[]
  benefits?: string[]
  applyUrl?: string
}
