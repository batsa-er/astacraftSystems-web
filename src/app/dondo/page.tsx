import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import { StatusBadge } from '@/components/StatusBadge'
import { DONDO_FEATURES, DONDO_LEGAL_LINE, DONDO_PROGRAMME_LABEL, DONDO_SMS_NOTE, DONDO_SMS_REPLIES_SUPPORTED } from '@/config/dondo'
import { requirePage } from '@/lib/pages'
import { pageMetadata } from '@/lib/seo'
import { WaitlistForm } from './WaitlistForm'

export const metadata: Metadata = pageMetadata({
  title: 'Dondo by Astacraft | One inbox for customer conversations (pilot programme)',
  description: 'Dondo brings your customer conversations into one shared inbox, starting with WhatsApp and SMS. Now in a pilot programme for businesses in Ghana. Join the waitlist.',
  path: '/dondo',
})

export default function DondoPage() {
  requirePage('dondo')

  return (
    <>
      <PageHero
        eyebrow={<StatusBadge status={DONDO_PROGRAMME_LABEL} dark />}
        title="Dondo by Astacraft."
        description="Every customer conversation, one inbox."
        cta={{ label: 'Join the pilot', href: '#waitlist' }}
      />

      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-14 md:py-24">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-20 items-start">
          <div className="reveal">
            <h2 className="font-serif font-black text-[var(--color-text)] leading-[1.0] tracking-[-0.03em] mb-6" style={{ fontSize: 'clamp(28px,3.6vw,48px)' }}>
              For businesses that talk to customers all day.
            </h2>
            <p className="text-[16px] text-[rgba(var(--ch-text),0.80)] leading-relaxed max-w-[46ch]">
              If your team answers WhatsApp from one phone, loses messages, or sends reminders by hand, Dondo is built for you.
            </p>
          </div>

          <div className="reveal">
            <h2 className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--color-accent)] mb-4">Channels and features</h2>
            <ul className="border-t border-[rgba(var(--ch-border),0.14)] list-none">
              {DONDO_FEATURES.map(({ feature, status }) => (
                <li key={feature} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-6 py-4 border-b border-[rgba(var(--ch-border),0.14)]">
                  <span className="text-[15px] text-[var(--color-text)] leading-snug">{feature}</span>
                  <StatusBadge status={status} />
                </li>
              ))}
            </ul>
            {!DONDO_SMS_REPLIES_SUPPORTED && (
              <p className="mt-5 text-[14px] text-[rgba(var(--ch-text),0.78)] leading-relaxed">{DONDO_SMS_NOTE}</p>
            )}
          </div>
        </div>
      </section>

      <section id="waitlist" className="bg-[var(--color-surface)] border-t border-[rgba(var(--ch-accent),0.08)] px-[clamp(24px,5vw,80px)] py-14 md:py-24 scroll-mt-[72px]">
        <div className="max-w-[820px] mx-auto">
          <h2 className="font-serif font-black text-[var(--color-text)] leading-[1.0] tracking-[-0.03em] mb-8 reveal" style={{ fontSize: 'clamp(28px,3.6vw,48px)' }}>
            Join the pilot
          </h2>
          <WaitlistForm />
          <p className="mt-8 text-[13px] text-[rgba(var(--ch-text),0.75)] leading-relaxed">{DONDO_LEGAL_LINE}</p>
        </div>
      </section>
    </>
  )
}
