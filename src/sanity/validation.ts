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

// GROQ projections return null (not undefined) for missing fields,
// so every optional field must tolerate null.
const str = (fallback: string) => z.string().nullish().transform((v) => v ?? fallback)
const optStr = z.string().nullish().transform((v) => v ?? undefined)
const optArr = <T extends z.ZodType>(item: T) =>
  z.array(item).nullish().transform((v) => v ?? undefined)

// ── Case Studies ──────────────────────────────────────
export const CaseStudySchema = z.object({
  _id: z.string().min(1),
  slug: SlugSchema,
  client: z.string().min(1),
  industry: str(''),
  summary: str(''),
  metric1_num: str(''),
  metric1_label: str(''),
  metric2_num: str(''),
  metric2_label: str(''),
  metric3_num: str(''),
  metric3_label: str(''),
  accent: z.enum(['purple', 'cyan', 'gold']).nullish().transform((v) => v ?? 'cyan'),
  coverImage: z.any().optional(),
}) satisfies z.ZodType<CaseStudy>

export const CaseStudyDetailSchema = CaseStudySchema.extend({
  challenge: str(''),
  solution: str(''),
  results: str(''),
  services: optArr(z.string()),
  seoTitle: optStr,
  seoDescription: optStr,
}) satisfies z.ZodType<CaseStudyDetail>

// ── Insights ──────────────────────────────────────────
export const InsightSchema = z.object({
  _id: z.string().min(1),
  slug: SlugSchema,
  title: z.string().min(1),
  tag: str(''),
  label: optStr,
  excerpt: str(''),
  author: optStr,
  authorRole: optStr,
  publishedAt: str(''),
  readTime: str(''),
  coverImage: z.any().optional(),
}) satisfies z.ZodType<Insight>

export const InsightDetailSchema = InsightSchema.extend({
  body: str(''),
  relatedServices: optArr(z.object({ title: z.string(), slug: z.string() })),
  seoTitle: optStr,
  seoDescription: optStr,
}) satisfies z.ZodType<InsightDetail>

// ── Services ──────────────────────────────────────────
export const ServiceSchema = z.object({
  _id: z.string().min(1),
  slug: SlugSchema,
  number: str(''),
  title: z.string().min(1),
  tagline: str(''),
  description: str(''),
  outcomes: z.array(z.string()).nullish().transform((v) => v ?? []),
  price: optStr,
}) satisfies z.ZodType<Service>

const ServiceStatSchema = z.object({
  num:   str(''),
  label: str(''),
}) satisfies z.ZodType<ServiceStat>

const ServiceFaqSchema = z.object({
  q: z.string().min(1),
  a: z.string().min(1),
}) satisfies z.ZodType<ServiceFaq>

export const ServiceDetailSchema = ServiceSchema.extend({
  detail:         str(''),
  process:        optArr(z.union([z.string(), z.object({ title: z.string(), body: str('') })])),
  stats:          optArr(ServiceStatSchema),
  faq:            optArr(ServiceFaqSchema),
  coverImage:     z.any().optional(),
  seoTitle:       optStr,
  seoDescription: optStr,
}) satisfies z.ZodType<ServiceDetail>

// ── Testimonials ──────────────────────────────────────
export const TestimonialSchema = z.object({
  _id: z.string().min(1),
  quote: z.string().min(1),
  name: z.string().min(1),
  role: optStr,
  initials: optStr,
  photo: z.object({ asset: z.object({ _id: z.string(), url: z.string() }) }).nullish().transform((v) => v ?? undefined),
  featured: z.boolean().nullish().transform((v) => v ?? false),
}) satisfies z.ZodType<Testimonial>

// ── Careers ───────────────────────────────────────────
export const CareerSchema = z.object({
  _id: z.string().min(1),
  title: z.string().min(1),
  slug: z.object({ current: z.string() }).nullish().transform((v) => v ?? undefined),
  department: optStr,
  type: optStr,
  location: optStr,
  excerpt: optStr,
  description: optStr,
  responsibilities: optArr(z.string()),
  requirements: optArr(z.string()),
  niceToHave: optArr(z.string()),
  benefits: optArr(z.string()),
  applyUrl: optStr,
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
