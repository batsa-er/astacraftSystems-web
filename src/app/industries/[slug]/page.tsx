import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { INDUSTRIES, INDUSTRY_MAP, BUNDLE_HREF } from '@/config/industries'
import { SolutionLeadForm } from '@/components/SolutionLeadForm'
import { getCaseStudies } from '@/sanity/queries'
import { urlFor } from '@/sanity/client'
import type { CaseStudy } from '@/sanity/types'

export const revalidate = 3600

const BASE = 'https://astacraftsystems.com'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return INDUSTRIES.map(i => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const industry = INDUSTRY_MAP[slug]
  if (!industry) return {}

  const title = `${industry.name} Technology Solutions in Africa | Astacraft Systems`
  const url = `${BASE}/industries/${slug}`

  return {
    title,
    description: industry.tagline,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: industry.tagline,
      url,
      siteName: 'Astacraft Systems',
      type: 'website',
      images: [{ url: industry.img, width: 800, height: 600, alt: `${industry.name} — Astacraft Systems` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: industry.tagline,
      images: [industry.img],
    },
  }
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params
  const industry = INDUSTRY_MAP[slug]
  if (!industry) notFound()

  const { Icon } = industry
  const bundleHref = BUNDLE_HREF[industry.bundle]
  const pageUrl = `${BASE}/industries/${slug}`

  let relatedCases: CaseStudy[] = []
  try {
    const all = await getCaseStudies()
    if (all?.length) {
      relatedCases = all.filter(c => c.industry === industry.name).slice(0, 3)
    }
  } catch {}

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': pageUrl,
        url: pageUrl,
        name: `${industry.name} Technology Solutions in Africa | Astacraft Systems`,
        description: industry.tagline,
        inLanguage: 'en',
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        publisher: {
          '@type': 'Organization',
          name: 'Astacraft Systems',
          url: BASE,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home',       item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Industries', item: `${BASE}/industries` },
          { '@type': 'ListItem', position: 3, name: industry.name, item: pageUrl },
        ],
      },
      {
        '@type': 'Service',
        name: `${industry.name} Technology Solutions`,
        description: industry.description,
        provider: {
          '@type': 'Organization',
          name: 'Astacraft Systems',
          url: BASE,
        },
        areaServed: 'Africa',
        serviceType: 'Technology Consulting',
      },
      {
        '@type': 'FAQPage',
        mainEntity: industry.faqs.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero — matches insights hero pattern ── */}
      <section
        className="relative overflow-hidden bg-[var(--color-dark)] flex flex-col justify-end"
        style={{ minHeight: '580px' }}
      >
        <Image
          src={industry.img}
          alt={industry.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,30,64,0.95)] via-[rgba(13,30,64,0.60)] to-[rgba(13,30,64,0.20)]" />

        <div className="relative z-10 px-[clamp(24px,5vw,80px)] pt-36 pb-14">
          <div className="max-w-[860px]">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-8">
              <Link href="/" className="font-mono text-[10px] tracking-[0.18em] uppercase text-[rgba(255,255,255,0.40)] hover:text-white transition-colors duration-200">Home</Link>
              <span className="text-[rgba(255,255,255,0.20)] text-[10px]">/</span>
              <Link href="/industries" className="font-mono text-[10px] tracking-[0.18em] uppercase text-[rgba(255,255,255,0.40)] hover:text-white transition-colors duration-200">Industries</Link>
              <span className="text-[rgba(255,255,255,0.20)] text-[10px]">/</span>
              <span className="font-mono text-[11px] tracking-[0.20em] uppercase px-3 py-1 border border-[rgba(255,255,255,0.30)] text-white">{industry.name}</span>
            </nav>

            {/* Icon + label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 border border-[rgba(var(--ch-green),0.40)] flex items-center justify-center">
                <Icon className="w-3.5 h-3.5 text-[var(--color-green)]" />
              </div>
              <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[var(--color-green)]">
                Industry Vertical
              </p>
            </div>

            <h1
              className="font-serif font-bold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(32px,5vw,56px)' }}
            >
              {industry.name} Technology Solutions
            </h1>

            <p className="text-[clamp(14px,1.4vw,18px)] text-[rgba(255,255,255,0.55)] leading-relaxed max-w-[54ch] mb-10">
              {industry.tagline}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://calendly.com/astacraftsystems/technology-strategy-call"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white px-8 py-4 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
              >
                Book a Strategy Call →
              </a>
              <Link
                href="/work"
                className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium border border-[rgba(255,255,255,0.25)] text-[rgba(255,255,255,0.65)] px-8 py-4 hover:border-[rgba(255,255,255,0.50)] hover:text-white transition-colors duration-200"
              >
                View Case Studies
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── Description + challenges ── */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-24">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 items-start">

            <div>
              <h2 className="font-mono text-[11px] tracking-[0.26em] uppercase text-[var(--color-accent)] mb-6">
                How we serve {industry.name}
              </h2>
              <p className="text-[clamp(15px,1.4vw,18px)] text-[rgba(var(--ch-text),0.65)] leading-relaxed">
                {industry.description}
              </p>
            </div>

            <div className="space-y-0">
              {industry.challenges.map(({ title, body }, i) => (
                <div
                  key={title}
                  className="border-b border-[rgba(var(--ch-border),0.10)] py-7 first:border-t"
                >
                  <div className="flex items-start gap-5">
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[rgba(var(--ch-text),0.25)] mt-0.5 shrink-0 w-6">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h2 className="font-serif font-bold text-[var(--color-text)] text-[17px] mb-2 leading-snug">{title}</h2>
                      <p className="text-[14px] text-[rgba(var(--ch-text),0.55)] leading-relaxed">{body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Stats — full width so numbers never wrap */}
          <div className="grid grid-cols-3 gap-px bg-[rgba(var(--ch-border),0.10)] border border-[rgba(var(--ch-border),0.10)] mt-16">
            {industry.stats.map(({ num, label }) => (
              <div key={label} className="bg-[var(--color-bg)] px-8 py-7">
                <p
                  className="font-serif font-black text-[var(--color-text)] leading-none mb-2 whitespace-nowrap"
                  style={{ fontSize: 'clamp(22px,3vw,40px)' }}
                >
                  {num}
                </p>
                <p className="font-mono text-[11px] tracking-[0.10em] text-[rgba(var(--ch-text),0.40)] leading-snug">
                  {label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Who we serve ── */}
      <section className="bg-[var(--color-surface)] border-t border-[rgba(var(--ch-border),0.08)] px-[clamp(24px,5vw,80px)] py-14">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10 items-start">
            <h2 className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(var(--ch-text),0.35)]">
              Who we work with
            </h2>
            <ul className="flex flex-wrap gap-2">
              {industry.whoWeServe.map(org => (
                <li
                  key={org}
                  className="font-mono text-[11px] tracking-[0.08em] border border-[rgba(var(--ch-accent),0.15)] text-[rgba(var(--ch-text),0.60)] px-4 py-2"
                >
                  {org}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-20">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(var(--ch-text),0.35)] mb-10">
            Capabilities we deploy
          </h2>
          <div className="flex flex-wrap gap-3">
            {industry.capabilities.map(({ title, href }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-2.5 border border-[rgba(var(--ch-accent),0.15)] bg-[var(--color-surface)] px-5 py-3 hover:border-[var(--color-accent)] hover:bg-[rgba(var(--ch-accent),0.04)] transition-all duration-200"
              >
                <span className="font-mono text-[11px] tracking-[0.08em] text-[rgba(var(--ch-text),0.65)] group-hover:text-[var(--color-accent)] transition-colors duration-200">
                  {title}
                </span>
                <span className="text-[rgba(var(--ch-text),0.25)] group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5 transition-all duration-200">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recommended bundle ── */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="border border-[rgba(var(--ch-accent),0.12)] bg-[var(--color-surface)] p-10 md:p-14">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
              <div>
                <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[var(--color-accent)] mb-4">
                  Recommended platform
                </p>
                <h2
                  className="font-serif font-black text-[var(--color-text)] leading-tight mb-4"
                  style={{ fontSize: 'clamp(24px,3vw,40px)' }}
                >
                  {industry.bundleLabel}
                </h2>
                <p className="text-[15px] text-[rgba(var(--ch-text),0.55)] leading-relaxed max-w-[52ch]">
                  {industry.bundleReason}
                </p>
              </div>
              <Link
                href={bundleHref}
                className="shrink-0 inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-accent)] text-white px-8 py-4 hover:bg-[var(--color-accent-hover)] transition-colors duration-200 whitespace-nowrap"
              >
                View bundle →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-start">
            <div>
              <h2
                className="font-serif font-black text-[var(--color-text)] leading-tight"
                style={{ fontSize: 'clamp(22px,2.5vw,32px)' }}
              >
                Frequently asked questions
              </h2>
            </div>
            <div className="space-y-0">
              {industry.faqs.map(({ q, a }, i) => (
                <div
                  key={i}
                  className="border-b border-[rgba(var(--ch-border),0.10)] py-7 first:border-t"
                >
                  <h3 className="font-serif font-semibold text-[var(--color-text)] text-[17px] leading-snug mb-3">
                    {q}
                  </h3>
                  <p className="text-[14px] text-[rgba(var(--ch-text),0.55)] leading-relaxed">
                    {a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Related case studies ── */}
      {relatedCases.length > 0 && (
        <section className="bg-[var(--color-surface)] border-t border-[rgba(var(--ch-accent),0.08)] px-[clamp(24px,5vw,80px)] py-16">
          <div className="max-w-[1280px] mx-auto">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-8">
              Case studies
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedCases.map(c => {
                const img = c.coverImage
                  ? urlFor(c.coverImage).width(600).height(340).url()
                  : c.image ?? null
                return (
                  <Link
                    key={c._id}
                    href={`/work/${c.slug.current}`}
                    className="group flex flex-col border border-[rgba(var(--ch-accent),0.12)] bg-[var(--color-bg)] hover:border-[rgba(var(--ch-accent),0.30)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                  >
                    {img && (
                      <div className="relative w-full aspect-[16/9] overflow-hidden">
                        <Image
                          src={img}
                          alt={c.client}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-accent)] mb-3 self-start">
                        {c.industry}
                      </span>
                      <h3 className="font-serif font-semibold text-[17px] text-[var(--color-text)] leading-snug group-hover:text-[var(--color-accent)] transition-colors duration-200 mb-2">
                        {c.client}
                      </h3>
                      <p className="text-[13px] text-[rgba(var(--ch-text),0.55)] leading-relaxed mb-4 flex-1">
                        {c.summary}
                      </p>
                      <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[rgba(var(--ch-text),0.30)] group-hover:text-[var(--color-accent)] transition-colors duration-200">
                        View case study →
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Lead form ── */}
      <section className="bg-[var(--color-surface)] border-t border-[rgba(var(--ch-accent),0.08)] px-[clamp(24px,5vw,80px)] py-24">
        <div className="max-w-[560px] mx-auto text-center">
          <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[var(--color-accent)] mb-5">
            Start a conversation
          </p>
          <h2
            className="font-serif font-black text-[var(--color-text)] leading-tight mb-4"
            style={{ fontSize: 'clamp(26px,3.5vw,44px)' }}
          >
            Ready to build your {industry.name} infrastructure?
          </h2>
          <p className="text-[14px] text-[rgba(var(--ch-text),0.50)] mb-10 leading-relaxed">
            A senior advisor will review your situation and respond within 24 hours.
          </p>
          <SolutionLeadForm bundle={industry.bundle} />
        </div>
      </section>

    </main>
  )
}
