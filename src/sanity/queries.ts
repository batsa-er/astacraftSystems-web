import { client } from './client'
import {
  CaseStudySchema,
  CaseStudyDetailSchema,
  InsightSchema,
  InsightDetailSchema,
  ServiceSchema,
  ServiceDetailSchema,
  TestimonialSchema,
  CareerSchema,
  validateArray,
  validateOne,
} from './validation'
import type { CaseStudy, CaseStudyDetail, Insight, InsightDetail, Service, ServiceDetail, Testimonial, Career } from './types'

// ── Case Studies ──────────────────────────────────────
export async function getCaseStudies(): Promise<CaseStudy[]> {
  const data = await client.fetch(`*[_type == "caseStudy" && published == true] | order(_createdAt desc) {
    _id, slug, client, industry, summary,
    metric1_num, metric1_label,
    metric2_num, metric2_label,
    metric3_num, metric3_label,
    accent, coverImage
  }`)
  return validateArray(CaseStudySchema, data, 'caseStudy')
}

export async function getCaseStudy(slug: string): Promise<CaseStudyDetail | null> {
  const data = await client.fetch(
    `*[_type == "caseStudy" && slug.current == $slug][0]`,
    { slug },
  )
  return validateOne(CaseStudyDetailSchema, data, 'caseStudy')
}

// ── Insights ──────────────────────────────────────────
export async function getInsights(): Promise<Insight[]> {
  const data = await client.fetch(`*[_type == "insight" && published == true] | order(publishedAt desc) {
    _id, slug, title, tag, label, excerpt, publishedAt, readTime, coverImage
  }`)
  return validateArray(InsightSchema, data, 'insight')
}

export async function getInsight(slug: string): Promise<InsightDetail | null> {
  const data = await client.fetch(
    `*[_type == "insight" && slug.current == $slug][0]`,
    { slug },
  )
  return validateOne(InsightDetailSchema, data, 'insight')
}

// ── Services ──────────────────────────────────────────
export async function getServices(): Promise<Service[]> {
  const data = await client.fetch(`*[_type == "service"] | order(order asc) {
    _id, slug, number, title, tagline, description, outcomes, price
  }`)
  return validateArray(ServiceSchema, data, 'service')
}

export async function getServiceBySlug(slug: string): Promise<ServiceDetail | null> {
  const data = await client.fetch(
    `*[_type == "service" && slug.current == $slug][0] {
      _id, slug, number, title, tagline, description, outcomes, price, detail, process, stats,
      faq[]{ q, a }, seoTitle, seoDescription
    }`,
    { slug },
  )
  return validateOne(ServiceDetailSchema, data, 'service')
}

// ── Testimonials ──────────────────────────────────────
export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await client.fetch(`*[_type == "testimonial" && published == true] | order(featured desc) {
    _id, quote, name, role, initials, featured,
    photo { asset->{ _id, url } }
  }`)
  return validateArray(TestimonialSchema, data, 'testimonial')
}

// ── Team Members ──────────────────────────────────────
export async function getTeamMembers() {
  return client.fetch(`*[_type == "teamMember"] | order(order asc) {
    _id, name, role, bio, photo
  }`)
}

// ── Site Settings ─────────────────────────────────────
export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings" && _id == "siteSettings"][0] {
    email, phone, address, responseTime, linkedinUrl, twitterUrl, facebookUrl, instagramUrl
  }`)
}

// ── Hero Slides ────────────────────────────────────────
export async function getHeroSlides(): Promise<Array<{ image: unknown; alt: string }>> {
  const data = await client.fetch(`*[_type == "siteSettings" && _id == "siteSettings"][0] {
    "slides": heroSlides[]{ alt, image }
  }`)
  return data?.slides ?? []
}

// ── Careers ───────────────────────────────────────────
export async function getCareers(): Promise<Career[]> {
  const data = await client.fetch(`*[_type == "career" && published == true] | order(_createdAt desc) {
    _id, title, department, type, location, excerpt, applyUrl
  }`)
  return validateArray(CareerSchema, data, 'career')
}
