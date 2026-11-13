import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/PageHero'
import { JsonLd } from '@/components/JsonLd'
import { Check, Users, FileText, Receipt, ClipboardList, Smartphone, BarChart3 } from 'lucide-react'
import { PricingSection } from '@/components/PricingSection'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import { AstaBillMockup } from '@/components/AstaBillMockup'
import { StatusBadge } from '@/components/StatusBadge'
import { Placeholder } from '@/components/Placeholder'
import { placeholder } from '@/config/placeholders'
import { DONDO_PROGRAMME_LABEL } from '@/config/dondo'
import { PRODUCTS, SITE } from '@/config/site'
import { requirePage, pageVisible } from '@/lib/pages'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Products | AstaBill invoicing and Dondo customer messaging | Astacraft Systems',
  description: 'Software you subscribe to and run yourself, built for how Ghanaian businesses work. AstaBill for invoices and payments is available now; Dondo, a shared customer inbox, is in a pilot programme.',
  path: '/products',
})

const TESTIMONIALS = [
  {
    quote: 'The payment link changed everything. We send the invoice, the client pays on their phone, and the receipt is already waiting for them.',
    name: 'Ama Darko',
    role: 'Brand strategist',
    initials: 'AD',
  },
  {
    quote: 'AstaBill removed the spreadsheet lag from our week. The dashboard tells me what is paid, what is due, and what needs follow-up.',
    name: 'Kofi Mensah',
    role: 'IT consultant',
    initials: 'KM',
  },
]

const ASTABILL_FEATURES = [
  {
    Icon: FileText,
    title: 'Professional Invoicing',
    body: 'Build an invoice from one focused workspace — line items, discounts, taxes, and notes. Send it as a clean public payment page your client opens on their phone.',
    features: ['Live totals while you edit', 'Custom branded templates', 'Auto-reminders & follow-ups'],
  },
  {
    Icon: Receipt,
    title: 'Sales Receipts',
    body: 'Issue receipts in seconds for walk-in customers and cash sales. Share by email or a link — no printing required.',
    features: ['Point-of-sale ready', 'Email or shareable link delivery', 'Synced to your dashboard'],
  },
  {
    Icon: ClipboardList,
    title: 'Quotes',
    body: 'Prepare pre-work quotes and convert them directly into invoices without rebuilding the job details from scratch.',
    features: ['One-click quote → invoice', 'Line item reuse', 'Client-facing quote view'],
  },
  {
    Icon: Smartphone,
    title: 'Payment Collection',
    body: 'Accept Mobile Money and cards directly from the invoice page — powered by Paystack. No third-party checkout, no redirects.',
    features: ['MTN MoMo, Telecel Cash, AT Money', 'Visa & Mastercard via Paystack', 'Instant payment notifications'],
  },
  {
    Icon: BarChart3,
    title: 'Cash Flow Visibility',
    body: 'See invoiced, collected, and overdue numbers together from one operating view. Know exactly where your money is at any moment.',
    features: ['Real-time revenue dashboard', 'AR aging & overdue tracking', 'Customer payment insights'],
  },
  {
    Icon: Users,
    title: 'Team Access',
    body: 'Give your whole team access with clear permission levels — owner, admin, and member roles across all your businesses.',
    features: ['Owner, admin, member roles', 'Multi-business support', 'Workspace audit log (Business)'],
  },
]

const primaryBtn = 'inline-block text-center font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-cta)] text-white px-8 py-4 hover:bg-[var(--color-cta-hover)] transition-colors duration-200'
const jumpCls = 'flex items-center justify-between gap-4 border border-[rgba(255,255,255,0.35)] px-5 py-3 text-white hover:border-white transition-colors duration-200'

export default function ProductsPage() {
  requirePage('products')
  const pilotFee = placeholder('products.dondo-pilot-fee')
  const showDondo = pageVisible('dondo')

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': `${SITE.url}/products#astabill`,
        name: PRODUCTS.astabill.name,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: 'Create invoices, quotations and receipts, share a payment link, and get paid by Mobile Money or card.',
        url: PRODUCTS.astabill.url,
        publisher: { '@id': `${SITE.url}/#organization` },
        areaServed: { '@type': 'Country', name: 'Ghana' },
      }} />
      <PageHero
        title="Products"
        description="Software you subscribe to and run yourself, built for how Ghanaian businesses work."
      >
        <ul className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 list-none hero-in hero-in-4">
          <li>
            <a href="#astabill" className={jumpCls}>
              <span className="font-serif font-bold text-[17px]">{PRODUCTS.astabill.name}</span>
              <StatusBadge status="Available now" dark />
            </a>
          </li>
          {showDondo && (
            <li>
              <a href="#dondo" className={jumpCls}>
                <span className="font-serif font-bold text-[17px]">{PRODUCTS.dondo.name}</span>
                <StatusBadge status={DONDO_PROGRAMME_LABEL} dark />
              </a>
            </li>
          )}
        </ul>
      </PageHero>

      <section id="astabill" className="relative bg-[#1D4776] px-[clamp(24px,5vw,80px)] py-16 md:py-24 overflow-hidden scroll-mt-[72px]">
        <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />
        <div className="relative max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          <div className="reveal">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Image src="/astabill-logo-white.svg" alt={PRODUCTS.astabill.name} width={137} height={36} className="h-9 w-auto" />
              <StatusBadge status="Available now" dark />
            </div>
            <h2 className="font-serif font-black text-white leading-[0.95] tracking-[-0.035em] mb-6" style={{ fontSize: 'clamp(32px,4.2vw,58px)' }}>
              Invoices that get paid.
            </h2>
            <p className="text-[rgba(255,255,255,0.85)] leading-relaxed mb-8 max-w-[52ch]" style={{ fontSize: 'clamp(15px,1.2vw,17px)' }}>
              Create invoices, quotations and receipts, share a payment link, and get paid by MTN MoMo, Telecel Cash, AT Money or card. See who owes you and what came in this month.
            </p>
            <a href={PRODUCTS.astabill.url} target="_blank" rel="noopener noreferrer" className={primaryBtn}>
              Try {PRODUCTS.astabill.name} free
            </a>
          </div>
          <div className="reveal" style={{ transitionDelay: '100ms' }}>
            <AstaBillMockup />
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-10 reveal">{PRODUCTS.astabill.name} features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ASTABILL_FEATURES.map(({ Icon, title, body, features }) => (
              <div key={title} className="border border-[rgba(var(--ch-accent),0.12)] bg-[var(--color-surface)] p-7 reveal">
                <Icon className="w-5 h-5 text-[var(--color-accent)] mb-6 stroke-[1.4]" aria-hidden="true" />
                <h3 className="font-serif text-[21px] font-bold text-[var(--color-text)] mb-3">{title}</h3>
                <p className="text-[14px] text-[rgba(var(--ch-text),0.78)] leading-relaxed mb-6">{body}</p>
                <ul className="space-y-2 list-none">
                  {features.map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="text-[var(--color-accent)] mt-0.5 shrink-0 w-3.5 h-3.5" aria-hidden="true" />
                      <span className="font-mono text-[12px] tracking-[0.04em] text-[rgba(var(--ch-text),0.75)]">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-surface)] border-y border-[rgba(var(--ch-accent),0.08)] px-[clamp(24px,5vw,80px)] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto reveal">
          <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-accent)] text-center mb-12">What our customers say</h2>
          <TestimonialCarousel testimonials={TESTIMONIALS} />
        </div>
      </section>

      <PricingSection />

      {showDondo && (
        <section id="dondo" className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] py-16 md:py-24 overflow-hidden scroll-mt-[72px]">
          <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />
          <div className="relative max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-start">
            <div className="reveal">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <p className="font-serif font-black text-white text-[28px] leading-none tracking-[-0.03em]">{PRODUCTS.dondo.name}</p>
                <StatusBadge status={DONDO_PROGRAMME_LABEL} dark />
              </div>
              <h2 className="font-serif font-black text-white leading-[0.95] tracking-[-0.035em] mb-6" style={{ fontSize: 'clamp(32px,4.2vw,58px)' }}>
                Every customer conversation, one inbox.
              </h2>
              <p className="text-[rgba(255,255,255,0.85)] leading-relaxed mb-8 max-w-[60ch]" style={{ fontSize: 'clamp(15px,1.2vw,17px)' }}>
                The dondo is the Akan talking drum, used to carry messages across distances. Dondo carries your business&rsquo;s messages: one shared inbox for your customer conversations, starting with WhatsApp and SMS, reminders and broadcasts to customers who opted in, and an AI assistant that answers from your own information.
              </p>
              <Link href={PRODUCTS.dondo.path} className={primaryBtn}>Join the pilot</Link>
            </div>

            <dl className="border border-[rgba(255,255,255,0.22)] p-7 md:p-9 space-y-7 reveal" style={{ transitionDelay: '100ms' }}>
              <div>
                <dt className="font-mono text-[11px] tracking-[0.2em] uppercase text-white mb-3">What pilot businesses get</dt>
                <dd className="text-[15px] text-[rgba(255,255,255,0.85)] leading-relaxed">
                  Guided set-up of your WhatsApp Business number and SMS sender ID, a shared inbox for your team, and direct support from our product team.
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] tracking-[0.2em] uppercase text-white mb-3">What we ask</dt>
                <dd className="text-[15px] text-[rgba(255,255,255,0.85)] leading-relaxed">
                  {pilotFee.state === 'omitted'
                    ? 'Regular feedback.'
                    : <>Regular feedback and a pilot fee of <Placeholder id="products.dondo-pilot-fee" />.</>}
                </dd>
              </div>
            </dl>
          </div>
        </section>
      )}
    </>
  )
}
