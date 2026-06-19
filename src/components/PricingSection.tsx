'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

const TIERS = [
  {
    label: 'FREE',
    name: 'Free',
    monthlyPrice: null,
    alwaysFree: true,
    desc: 'Send your first invoice for free and upgrade when you\'re ready.',
    features: [
      '12 invoices each month',
      '25 customers',
      'Paystack payment links included',
      '1 user / 1 business',
      '1 recurring invoice schedule',
      'Quotes and sales receipts (walk-in and cash sales)',
      'Item catalog included',
      'AstaBill branding stays on',
      'Basic expenses and reports included',
    ],
    popular: false,
  },
  {
    label: 'STARTER',
    name: 'Starter',
    monthlyPrice: 69,
    alwaysFree: false,
    desc: 'Look more professional and start collecting faster.',
    features: [
      '200 invoices each month',
      '250 customers',
      '2 users / 2 businesses',
      'Unlimited recurring invoice schedules',
      'Branding removed',
      'Quotes, credit notes, and sales receipts (walk-in and cash sales)',
      'Automated email reminders',
      'Expense CSV export',
    ],
    popular: true,
  },
  {
    label: 'GROWTH',
    name: 'Growth',
    monthlyPrice: 139,
    alwaysFree: false,
    desc: 'Get paid faster with richer follow-up, reporting, and compliance tools.',
    features: [
      'Unlimited invoices',
      '2,000 customers',
      'Up to 5 users / 3 businesses',
      'Branding removed',
      'Quotes, credit notes, and partial payments',
      'Automatic late fees',
      'Custom sender domain',
      'AR aging, customer insights, and invoice performance',
      'GRA VAT compliance, PDF/ZIP exports, and expense approvals',
      'WhatsApp and SMS reminders',
    ],
    popular: false,
  },
  {
    label: 'BUSINESS',
    name: 'Business',
    monthlyPrice: 239,
    alwaysFree: false,
    desc: 'Scale with team oversight, scheduled reports, and accounting integrations.',
    features: [
      'Unlimited invoices',
      'Unlimited customers',
      'Up to 10 users / Unlimited businesses',
      'Branding removed',
      'Advanced reports (all tiers)',
      'Scheduled reports and scheduled expense exports',
      'Accounting integrations (QB / Xero / Zoho)',
      'Workspace audit log and governance controls',
    ],
    popular: false,
  },
]

export function PricingSection() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-28">
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="text-center mb-12 reveal">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-4">Pricing</p>
          <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight mb-4" style={{ fontSize: 'clamp(32px,4.5vw,56px)' }}>
            Simple, transparent pricing.
          </h2>
        </div>

        {/* Toggle */}
        <div className="flex flex-col items-center gap-3 mb-10 reveal">
          <div className="flex items-center gap-4">
            <span className={`text-[15px] font-semibold transition-colors ${!annual ? 'text-[var(--color-text)]' : 'text-[var(--color-text-2)]'}`}>
              Monthly
            </span>
            <button
              aria-label="Toggle billing period"
              onClick={() => setAnnual(v => !v)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${annual ? 'bg-[var(--color-green)]' : 'bg-[rgba(var(--ch-border),0.18)]'}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${annual ? 'translate-x-5' : 'translate-x-0'}`}
              />
            </button>
            <span className={`text-[15px] font-semibold transition-colors ${annual ? 'text-[var(--color-text)]' : 'text-[var(--color-text-2)]'}`}>
              Annual
            </span>
            <span className="text-[12px] font-semibold text-[var(--color-green)] bg-[rgba(var(--ch-green),0.10)] border border-[rgba(var(--ch-green),0.22)] px-3 py-1 rounded-full">
              Save 10%
            </span>
          </div>
          <p className="text-[13px] text-[var(--color-text-2)]">All prices in GHS (Ghanaian Cedis)</p>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {['No credit card required', 'Cancel anytime', 'Trusted by businesses across Ghana'].map(t => (
              <span key={t} className="flex items-center gap-1.5 text-[13px] text-[var(--color-text-2)]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-green)]" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {TIERS.map(({ label, name, monthlyPrice, alwaysFree, desc, features, popular }, i) => {
            const displayPrice = monthlyPrice
              ? annual ? Math.round(monthlyPrice * 0.9) : monthlyPrice
              : null

            return (
              <div
                key={name}
                className={`relative flex flex-col rounded-2xl p-7 reveal ${
                  popular
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'bg-[var(--color-panel)] border border-[var(--color-border)]'
                }`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                {popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="flex items-center gap-1.5 bg-white text-[var(--color-accent)] text-[11px] font-bold tracking-[0.12em] uppercase px-4 py-1.5 rounded-full shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)]" />
                      Most Popular
                    </span>
                  </div>
                )}

                <p className={`font-mono text-[10px] tracking-[0.22em] uppercase mb-4 mt-2 ${popular ? 'text-white/50' : 'text-[var(--color-text-2)]'}`}>
                  {label}
                </p>

                <div className="mb-1">
                  {alwaysFree ? (
                    <span className={`font-bold ${popular ? 'text-white' : 'text-[var(--color-text)]'}`} style={{ fontSize: 'clamp(36px,3.5vw,52px)', lineHeight: 1 }}>
                      Free
                    </span>
                  ) : (
                    <span className={`font-bold ${popular ? 'text-white' : 'text-[var(--color-text)]'}`} style={{ fontSize: 'clamp(36px,3.5vw,52px)', lineHeight: 1 }}>
                      GHS {displayPrice}
                    </span>
                  )}
                </div>

                <p className={`text-[13px] mb-1 ${popular ? 'text-white/50' : 'text-[var(--color-text-2)]'}`}>
                  {alwaysFree ? 'always free' : '/ month'}
                </p>
                {!alwaysFree && (
                  <p className={`text-[11px] mb-3 ${popular ? 'text-white/35' : 'text-[rgba(var(--ch-text),0.28)]'}`}>
                    {annual ? 'billed annually' : 'billed monthly'}
                  </p>
                )}

                <p className={`text-[13px] leading-relaxed mb-7 mt-2 min-h-[56px] ${popular ? 'text-white/65' : 'text-[var(--color-text-2)]'}`}>
                  {desc}
                </p>

                <ul className="space-y-3 flex-1">
                  {features.map(f => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${popular ? 'text-white/70' : 'text-[var(--color-green)]'}`} />
                      <span className={`text-[13px] leading-snug ${popular ? 'text-white/70' : 'text-[var(--color-text-2)]'}`}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
