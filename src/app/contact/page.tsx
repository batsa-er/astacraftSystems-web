import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Contact Astacraft Systems | Book a Free Technology Strategy Call',
  description: 'Book a complimentary 45-minute Technology Strategy Call with Astacraft Systems. Get expert advice on software development, cloud, CRM, ERP, and digital transformation for your business.',
  alternates: { canonical: 'https://astacraftsystems.com/contact' },
  openGraph: {
    title: 'Contact Astacraft Systems | Book a Free Technology Strategy Call',
    description: 'Book a complimentary 45-minute Technology Strategy Call with Astacraft Systems. Get expert advice on software, cloud, CRM, ERP, and digital transformation for your business.',
    url: 'https://astacraftsystems.com/contact',
    type: 'website',
  },
}

import { getSiteSettings } from '@/sanity/queries'
import PageHero from '@/components/PageHero'
import ContactForm from './ContactForm'

const STEPS = [
  {
    n: '01',
    title: 'We review your message',
    body: 'A senior team member reads your submission within 24 hours and prepares relevant questions for your specific situation.',
  },
  {
    n: '02',
    title: 'We schedule your call',
    body: 'You receive a calendar invite for a complimentary 45-minute Technology Strategy Call at a time that works for you.',
  },
  {
    n: '03',
    title: 'We map your path forward',
    body: 'We review your systems, identify the biggest opportunities, and present a clear technology roadmap — no commitment required.',
  },
]

const TRUST = [
  { stat: '98%',  label: 'Client retention' },
  { stat: '200+', label: 'Engagements' },
  { stat: '24h',  label: 'Response time' },
]

export default async function ContactPage() {
  let settings = null
  try { settings = await getSiteSettings() } catch {}

  const email   = settings?.email   || 'info@astacraftsystems.com'
  const address = settings?.address || 'Accra, Ghana · Remote-first'

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let&apos;s talk<br />technology.</>}
        description="Book a complimentary 45-minute Technology Strategy Call. We will review your current systems, identify the biggest opportunities, and map the right path forward — no commitment required."
      />

      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-24">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-16 xl:gap-24 items-start">

          {/* Left — process + trust + direct contact */}
          <div className="reveal">
            <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[var(--color-accent)] mb-10">
              What happens next
            </p>

            {/* 3-step process */}
            <div className="space-y-9 mb-14">
              {STEPS.map(({ n, title, body }) => (
                <div key={n} className="grid grid-cols-[52px_1fr] gap-3 items-start">
                  <span
                    className="font-serif font-black leading-none text-[rgba(var(--ch-accent),0.16)] select-none pt-0.5"
                    style={{ fontSize: 'clamp(32px,3vw,44px)' }}
                  >
                    {n}
                  </span>
                  <div>
                    <h3
                      className="font-serif font-bold text-[var(--color-text)] mb-1.5 leading-snug"
                      style={{ fontSize: 'clamp(16px,1.4vw,19px)' }}
                    >
                      {title}
                    </h3>
                    <p className="text-[13px] text-[rgba(var(--ch-text),0.55)] leading-relaxed">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust stats */}
            <div className="border-t border-b border-[rgba(var(--ch-accent),0.08)] py-7 mb-12">
              <div className="flex gap-10">
                {TRUST.map(({ stat, label }) => (
                  <div key={label}>
                    <p
                      className="font-serif font-black text-[var(--color-text)] leading-none mb-1"
                      style={{ fontSize: 'clamp(22px,2vw,30px)' }}
                    >
                      {stat}
                    </p>
                    <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(var(--ch-text),0.38)]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct contact */}
            <div>
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[rgba(var(--ch-text),0.32)] mb-5">
                Or reach us directly
              </p>
              <div className="space-y-3.5">
                {[
                  { label: 'Email',    value: email,   href: `mailto:${email}` },
                  { label: 'Location', value: address, href: undefined },
                ].map(({ label, value, href }) => (
                  <div key={label} className="flex items-center gap-4">
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[rgba(var(--ch-text),0.32)] w-20 shrink-0">
                      {label}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        className="text-[13px] text-[rgba(var(--ch-text),0.65)] hover:text-[var(--color-accent)] transition-colors duration-200"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-[13px] text-[rgba(var(--ch-text),0.65)]">{value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <ContactForm />
        </div>
      </section>
    </>
  )
}
