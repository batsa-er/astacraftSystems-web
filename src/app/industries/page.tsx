import Link from 'next/link'
import type { Metadata } from 'next'
import { INDUSTRIES } from '@/config/industries'

const BASE = 'https://astacraftsystems.com'
const url = `${BASE}/industries`
const title = 'Industries We Serve | Enterprise Technology Solutions Across Africa | Astacraft Systems'
const description = 'Technology solutions for financial services, telecoms, healthcare, government, retail and more. Astacraft Systems builds enterprise infrastructure for African businesses.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    siteName: 'Astacraft Systems',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': url,
      url,
      name: title,
      description,
      inLanguage: 'en',
      breadcrumb: { '@id': `${url}#breadcrumb` },
      publisher: { '@type': 'Organization', name: 'Astacraft Systems', url: BASE },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home',       item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Industries', item: url },
      ],
    },
  ],
}

export default function IndustriesPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-[var(--color-dark)] pt-32 pb-20 px-[clamp(24px,5vw,80px)] relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-[0.06] pointer-events-none" />
        <div className="max-w-[1280px] mx-auto relative">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-8">
            <Link href="/" className="font-mono text-[10px] tracking-[0.18em] uppercase text-[rgba(255,255,255,0.30)] hover:text-[rgba(255,255,255,0.60)] transition-colors duration-200">Home</Link>
            <span className="text-[rgba(255,255,255,0.18)] text-[10px]">/</span>
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-green)]">Industries</span>
          </nav>
          <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[var(--color-green)] mb-6">Industries</p>
          <h1
            className="font-serif font-black text-white leading-[0.92] tracking-[-0.035em] mb-6"
            style={{ fontSize: 'clamp(36px,5vw,72px)' }}
          >
            We work where<br />it matters most.
          </h1>
          <p className="text-[clamp(15px,1.4vw,19px)] text-[rgba(255,255,255,0.50)] max-w-[48ch] leading-relaxed">
            Eight sectors. Deep domain knowledge. Technology built for how African enterprises actually operate.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(var(--ch-border),0.10)]">
            {INDUSTRIES.map(({ name, slug, desc, Icon }, i) => (
              <Link
                key={slug}
                href={`/industries/${slug}`}
                className="group bg-[var(--color-bg)] p-8 hover:bg-[var(--color-surface)] transition-colors duration-200 flex flex-col justify-between min-h-[220px]"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-10 h-10 border border-[rgba(var(--ch-accent),0.12)] flex items-center justify-center group-hover:border-[var(--color-accent)] group-hover:bg-[rgba(var(--ch-accent),0.06)] transition-all duration-200">
                    <Icon className="w-4.5 h-4.5 text-[rgba(var(--ch-accent),0.40)] group-hover:text-[var(--color-accent)] transition-colors duration-200" />
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.16em] text-[rgba(var(--ch-text),0.20)] group-hover:text-[rgba(var(--ch-accent),0.45)] transition-colors duration-200">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <p className="font-serif font-bold text-[var(--color-text)] text-[18px] mb-2 leading-tight group-hover:text-[var(--color-accent)] transition-colors duration-200">
                    {name}
                  </p>
                  <p className="text-[12px] text-[rgba(var(--ch-text),0.42)] leading-snug">{desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/work"
              className="inline-block font-mono text-[10px] tracking-[0.16em] uppercase border border-[rgba(var(--ch-accent),0.20)] text-[rgba(var(--ch-text),0.55)] px-9 py-4 hover:border-[rgba(var(--ch-accent),0.45)] hover:text-[var(--color-accent)] transition-all duration-200"
            >
              All case studies →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
