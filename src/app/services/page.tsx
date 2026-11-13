import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import { CtaBand } from '@/components/CtaBand'
import { Placeholder, PlaceholderMark } from '@/components/Placeholder'
import { JsonLd } from '@/components/JsonLd'
import { SERVICES } from '@/config/services'
import { PACKAGES, formatGhs } from '@/config/packages'
import { placeholder } from '@/config/placeholders'
import { SITE } from '@/config/site'
import { requirePage } from '@/lib/pages'
import { pageMetadata } from '@/lib/seo'

const DESCRIPTION = 'We design, build and run the systems behind your business. Fixed scope, clear prices, and support after launch.'

export const metadata: Metadata = pageMetadata({
  title: 'Services | Business messaging, automation, AI assistants and CRM | Astacraft Systems',
  description: 'Business messaging on WhatsApp and SMS, workflow automation, AI assistants, and CRM and ERP implementation for businesses in Ghana. Fixed scope and clear prices.',
  path: '/services',
})

export default function ServicesPage() {
  requirePage('services')
  const ussdOpen = placeholder('services.ussd-confirmed').state === 'open'
  const contents = placeholder('services.package-contents')

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Astacraft services',
        itemListElement: SERVICES.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Service',
            name: s.title,
            description: s.summary,
            url: `${SITE.url}/services#${s.slug}`,
            provider: { '@id': `${SITE.url}/#organization` },
            areaServed: 'GH',
          },
        })),
      }} />
      <PageHero
        title="Services"
        description={DESCRIPTION}
        cta={{ label: 'Book a consultation', href: '/contact' }}
      />

      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-14 md:py-24">
        <div className="max-w-[1280px] mx-auto space-y-6">
          {SERVICES.map(({ slug, number, title, body, details, Icon }) => (
            <article
              key={slug}
              id={slug}
              className="relative border border-[rgba(var(--ch-accent),0.14)] bg-[var(--color-surface)] p-6 sm:p-10 md:p-12 overflow-hidden scroll-mt-24 reveal"
            >
              <span className="absolute bottom-4 right-8 font-serif font-bold text-[120px] md:text-[160px] leading-none text-[rgba(var(--ch-accent),0.05)] select-none pointer-events-none" aria-hidden="true">
                {number}
              </span>

              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div>
                  <div className="w-11 h-11 border border-[rgba(var(--ch-accent),0.30)] flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5 text-[var(--color-accent)]" aria-hidden="true" />
                  </div>
                  <h2 className="font-serif text-[clamp(22px,3vw,38px)] font-bold text-[var(--color-text)] leading-tight mb-5">{title}</h2>
                  <p className="text-[15px] text-[rgba(var(--ch-text),0.78)] leading-relaxed">{body}</p>
                  {slug === 'business-messaging' && ussdOpen && (
                    <p className="mt-4"><Placeholder id="services.ussd-confirmed" /></p>
                  )}
                </div>

                <dl className="space-y-6">
                  {details.map(({ label, text, placeholder: id }) => (
                    <div key={label}>
                      <dt className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--color-accent)] mb-2">{label}</dt>
                      <dd className="text-[14px] text-[rgba(var(--ch-text),0.78)] leading-relaxed">
                        {id ? <Placeholder id={id} /> : text}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="packages" className="bg-[var(--color-surface)] border-y border-[rgba(var(--ch-accent),0.08)] px-[clamp(24px,5vw,80px)] py-16 md:py-24 scroll-mt-20">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-serif font-black text-[var(--color-text)] leading-[0.95] tracking-[-0.035em] mb-10 md:mb-14 reveal" style={{ fontSize: 'clamp(30px,4.5vw,60px)' }}>
            Packages
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(var(--ch-border),0.12)] list-none reveal">
            {PACKAGES.map(({ slug, name, audience, priceFromGhs, priceConfirmed }) => (
              <li key={slug} id={slug} className="bg-[var(--color-surface)] p-7 flex flex-col scroll-mt-24">
                <h3 className="font-serif font-bold text-[var(--color-text)] text-[22px] leading-tight mb-2">{name}</h3>
                <p className="text-[14px] text-[rgba(var(--ch-text),0.75)] mb-6">
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.65)] block mb-1">For</span>
                  {audience}
                </p>
                {contents.state !== 'omitted' && (
                  <p className="text-[14px] text-[rgba(var(--ch-text),0.75)] leading-relaxed mb-6">
                    <Placeholder id="services.package-contents" />
                  </p>
                )}
                <p className="mt-auto pt-5 border-t border-[rgba(var(--ch-border),0.12)]">
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.65)] block mb-1">From (GHS)</span>
                  {priceConfirmed ? (
                    <span className="font-serif font-bold text-[var(--color-accent)] text-[26px] leading-none">{formatGhs(priceFromGhs)}</span>
                  ) : (
                    <PlaceholderMark>[{formatGhs(priceFromGhs)}]</PlaceholderMark>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Tell us what slows your business down." body="We&rsquo;ll show you what can be automated, and what it would cost. The first consultation is free." cta={{ label: 'Book a consultation', href: '/contact' }} />
    </>
  )
}
