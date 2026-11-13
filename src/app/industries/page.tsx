import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import { CtaBand } from '@/components/CtaBand'
import { INDUSTRIES } from '@/config/industries'
import { requirePage } from '@/lib/pages'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Industries | Clinics, schools, real estate, retail and financial services | Astacraft Systems',
  description: 'We focus on businesses where better customer communication and less paperwork pay off within weeks: clinics, schools, real estate, retail and financial services.',
  path: '/industries',
})

const labelCls = 'font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--color-accent)] mb-2'

export default function IndustriesPage() {
  requirePage('industries')

  return (
    <>
      <PageHero
        title="Industries"
        description="We focus on businesses where better customer communication and less paperwork pay off within weeks."
        cta={{ label: 'Book a consultation', href: '/contact' }}
      />

      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-14 md:py-24">
        <div className="max-w-[1280px] mx-auto border-t border-[rgba(var(--ch-border),0.12)]">
          {INDUSTRIES.map(({ name, slug, problem, help, Icon }) => (
            <article
              key={slug}
              id={slug}
              className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr_1fr] gap-6 md:gap-12 py-9 md:py-12 border-b border-[rgba(var(--ch-border),0.12)] scroll-mt-24 reveal"
            >
              <div className="flex items-start gap-4">
                <span className="w-11 h-11 border border-[rgba(var(--ch-accent),0.30)] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[var(--color-accent)]" aria-hidden="true" />
                </span>
                <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight pt-1.5" style={{ fontSize: 'clamp(20px,2vw,26px)' }}>
                  {name}
                </h2>
              </div>
              <div>
                <h3 className={labelCls}>The problem</h3>
                <p className="text-[15px] text-[rgba(var(--ch-text),0.78)] leading-relaxed">{problem}</p>
              </div>
              <div>
                <h3 className={labelCls}>How we help</h3>
                <p className="text-[15px] text-[rgba(var(--ch-text),0.78)] leading-relaxed">{help}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand title="Tell us what slows your business down." body="We&rsquo;ll show you what can be automated, and what it would cost. The first consultation is free." cta={{ label: 'Book a consultation', href: '/contact' }} />
    </>
  )
}
