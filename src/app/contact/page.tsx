import type { ComponentType } from 'react'
import { EnvelopeIcon, MapPinIcon, ClockIcon } from '@/components/Icons'
import { getSiteSettings } from '@/sanity/queries'
import PageHero from '@/components/PageHero'
import ContactForm from './ContactForm'

export default async function ContactPage() {
  let settings = null
  try { settings = await getSiteSettings() } catch {}

  const email        = settings?.email        || 'info@astacraftsystems.com'
  const address      = settings?.address      || 'Accra, Ghana · Remote-first'
  const responseTime = settings?.responseTime || 'Within 24 hours'

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let&apos;s talk<br />technology.</>}
        description="Book a complimentary 45-minute Technology Strategy Call. We will review your current systems, identify the biggest opportunities, and map the right engagement for your goals — no commitment required."
      />

      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-24">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <div className="reveal">
            <p className="font-mono text-[9px] tracking-[0.26em] uppercase text-[var(--color-accent)] mb-8">Reach us directly</p>
            <div className="space-y-6">
              {[
                { Icon: EnvelopeIcon, label: 'Email',         value: email, href: `mailto:${email}` },
                { Icon: MapPinIcon,   label: 'Location',      value: address },
                { Icon: ClockIcon,    label: 'Response time', value: responseTime },
              ].map(({ Icon, label, value, href }: { Icon: ComponentType<{ className?: string }>, label: string, value: string, href?: string }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-8 h-8 border border-[rgba(var(--ch-accent),0.15)] flex items-center justify-center mt-1 shrink-0">
                    <Icon className="w-4 h-4 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-[rgba(var(--ch-text),0.28)] mb-1">{label}</p>
                    {href ? (
                      <a href={href} className="font-mono text-[13px] tracking-[0.06em] text-[rgba(var(--ch-text),0.70)] hover:text-[var(--color-accent)] transition-colors duration-200">{value}</a>
                    ) : (
                      <p className="font-mono text-[13px] tracking-[0.06em] text-[rgba(var(--ch-text),0.70)]">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  )
}
