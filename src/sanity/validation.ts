import { z } from 'zod'
import type {
  CaseStudy,
  CaseStudyDetail,
  Insight,
  InsightDetail,
  Service,
  ServiceDetail,
  ServiceFaq,
  ServiceStat,
  Testimonial,
  Career,
} from './types'

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const SlugSchema = z.object({
  current: z
    .string()
    .min(1, 'Slug cannot be empty')
    .regex(slugPattern, 'Slug must be lowercase alphanumeric with hyphens only'),
})

// ── Case Studies ──────────────────────────────────────
export const CaseStudySchema = z.object({
  _id: z.string().min(1),
  slug: SlugSchema,
  client: z.string().min(1),
  industry: z.string().default(''),
  summary: z.string().default(''),
  metric1_num: z.string().default(''),
  metric1_label: z.string().default(''),
  metric2_num: z.string().default(''),
  metric2_label: z.string().default(''),
  metric3_num: z.string().default(''),
  metric3_label: z.string().default(''),
  accent: z.enum(['purple', 'cyan', 'gold']).default('cyan'),
}) satisfies z.ZodType<CaseStudy>

export const CaseStudyDetailSchema = CaseStudySchema.extend({
  challenge: z.string().default(''),
  solution: z.string().default(''),
  results: z.string().default(''),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
}) satisfies z.ZodType<CaseStudyDetail>

// ── Insights ──────────────────────────────────────────
export const InsightSchema = z.object({
  _id: z.string().min(1),
  slug: SlugSchema,
  title: z.string().min(1),
  tag: z.string().default(''),
  label: z.string().optional(),
  excerpt: z.string().default(''),
  publishedAt: z.string().default(''),
  readTime: z.string().default(''),
}) satisfies z.ZodType<Insight>

export const InsightDetailSchema = InsightSchema.extend({
  body: z.string().default(''),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
}) satisfies z.ZodType<InsightDetail>

// ── Services ──────────────────────────────────────────
export const ServiceSchema = z.object({
  _id: z.string().min(1),
  slug: SlugSchema,
  number: z.string().default(''),
  title: z.string().min(1),
  tagline: z.string().default(''),
  description: z.string().default(''),
  outcomes: z.array(z.string()).default([]),
  price: z.string().default(''),
}) satisfies z.ZodType<Service>

const ServiceStatSchema = z.object({
  num:   z.string().default(''),
  label: z.string().default(''),
}) satisfies z.ZodType<ServiceStat>

const ServiceFaqSchema = z.object({
  q: z.string().min(1),
  a: z.string().min(1),
}) satisfies z.ZodType<ServiceFaq>

export const ServiceDetailSchema = ServiceSchema.extend({
  detail:         z.string().default(''),
  process:        z.array(z.string()).optional(),
  stats:          z.array(ServiceStatSchema).optional(),
  faq:            z.array(ServiceFaqSchema).optional(),
  seoTitle:       z.string().optional(),
  seoDescription: z.string().optional(),
}) satisfies z.ZodType<ServiceDetail>

// ── Testimonials ──────────────────────────────────────
export const TestimonialSchema = z.object({
  _id: z.string().min(1),
  quote: z.string().min(1),
  name: z.string().min(1),
  role: z.string().optional(),
  initials: z.string().optional(),
  photo: z.object({ asset: z.object({ _id: z.string(), url: z.string() }) }).optional(),
  featured: z.boolean().default(false),
}) satisfies z.ZodType<Testimonial>

// ── Careers ───────────────────────────────────────────
export const CareerSchema = z.object({
  _id: z.string().min(1),
  title: z.string().min(1),
  department: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  excerpt: z.string().optional(),
  applyUrl: z.string().optional(),
}) satisfies z.ZodType<Career>

// ── Helpers ───────────────────────────────────────────

/** Validates an array from Sanity. Filters out invalid items and logs warnings. */
export function validateArray<T>(
  schema: z.ZodType<T>,
  data: unknown,
  label: string,
): T[] {
  if (!Array.isArray(data)) {
    console.warn(`[Sanity] Expected array for ${label}, got ${typeof data}`)
    return []
  }
  const results: T[] = []
  for (const item of data) {
    const parsed = schema.safeParse(item)
    if (parsed.success) {
      results.push(parsed.data)
    } else {
      console.warn(`[Sanity] Invalid ${label} item:`, parsed.error.flatten())
    }
  }
  return results
}

/** Validates a single document from Sanity. Returns null on failure. */
export function validateOne<T>(
  schema: z.ZodType<T>,
  data: unknown,
  label: string,
): T | null {
  if (data == null) return null
  const parsed = schema.safeParse(data)
  if (parsed.success) return parsed.data
  console.warn(`[Sanity] Invalid ${label}:`, parsed.error.flatten())
  return null
}
