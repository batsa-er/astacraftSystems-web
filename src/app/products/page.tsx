import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { JsonLd } from '@/components/JsonLd'
import { CheckIcon } from '@/components/Icons'
import { FileText, Receipt, ClipboardList, Smartphone, BarChart3, Users } from 'lucide-react'
import { PricingSection } from '@/components/PricingSection'
import TestimonialCarousel from '@/components/TestimonialCarousel'

export const metadata: Metadata = {
  title: 'AstaBill | Invoice Smart. Get Paid Faster.',
  description: 'AstaBill brings invoicing, sales receipts, payment collection, and cash flow visibility into one polished workflow — built for teams, solo operators, and walk-in businesses alike.',
  alternates: { canonical: 'https://astacraftsystems.com/products' },
  openGraph: {
    title: 'AstaBill | Invoice Smart. Get Paid Faster.',
    description: 'AstaBill brings invoicing, sales receipts, payment collection, and cash flow visibility into one polished workflow — built for teams, solo operators, and walk-in businesses alike.',
    url: 'https://astacraftsystems.com/products',
    type: 'website',
  },
}

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

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://astacraftsystems.com/products#astabill',
        name: 'AstaBill',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, iOS, Android',
        description: 'AstaBill brings invoicing, sales receipts, payment collection, and cash flow visibility into one polished workflow — built for teams, solo operators, and walk-in businesses alike.',
        url: 'https://astacraftsystems.com/products',
        publisher: { '@id': 'https://astacraftsystems.com/#organization' },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'GHS',
          price: '0',
          description: 'Free plan available. Paid plans from GHS 69/month.',
        },
        featureList: [
          'Professional invoicing with public payment pages',
          'Sales receipts for walk-in and cash customers',
          'Quotes that convert directly to invoices',
          'Mobile Money payments (MTN MoMo, Telecel Cash, AT Money)',
          'Card payments via Paystack (Visa, Mastercard)',
          'Cash flow visibility — invoiced, collected, and overdue at a glance',
          'Team access with owner, admin, and member roles',
          'Automated payment reminders via WhatsApp, SMS, and email',
        ],
        areaServed: { '@type': 'Country', name: 'Ghana' },
        screenshot: 'https://astacraftsystems.com/opengraph-image',
      }} />
      <PageHero
        eyebrow="Products"
        title={<>Invoice smart.<br />Get paid faster.</>}
        description="AstaBill brings invoicing, sales receipts, payment collection, and cash flow visibility into one polished workflow — built for teams, solo operators, and walk-in businesses alike."
      />

      {/* Product overview */}
      <section className="bg-[var(--color-surface)] border-y border-[rgba(var(--ch-accent),0.08)] px-[clamp(24px,5vw,80px)] py-24">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="reveal">
            <span className="inline-block font-mono text-[11px] tracking-[0.22em] uppercase px-3 py-1.5 border border-[rgba(34,166,86,0.40)] text-[var(--color-green)] mb-8">
              Cloud-Based · Paystack-Powered · Made in Ghana
            </span>
            <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight mb-6" style={{ fontSize: 'clamp(28px,3.5vw,48px)' }}>
              One workflow.<br />From invoice to payment.
            </h2>
            <p className="text-[15px] text-[rgba(var(--ch-text),0.60)] leading-relaxed mb-8">
              AstaBill was built from the ground up for African businesses. Create an invoice in one focused workspace, share it as a professional public payment page, and watch the money land — via Mobile Money or card, no chasing required.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://astabill.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white px-8 py-4 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
              >
                Get Started Free
              </a>
              <Link
                href="#pricing"
                className="font-mono text-[11px] tracking-[0.14em] uppercase font-medium border border-[rgba(var(--ch-accent),0.35)] text-[rgba(var(--ch-text),0.70)] px-8 py-4 hover:border-[var(--color-accent)] hover:text-[var(--color-text)] transition-colors duration-200"
              >
                View Pricing
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 reveal" style={{ transitionDelay: '100ms' }}>
            {[
              { stat: '50+',    label: 'Businesses onboarded' },
              { stat: '500+',   label: 'Invoices sent' },
              { stat: 'GHS 2M+', label: 'Collected via Paystack' },
              { stat: '<5 min', label: 'Average time to first invoice' },
            ].map(({ stat, label }, i) => (
              <div key={label} className="border border-[rgba(var(--ch-accent),0.12)] p-6 reveal-scale" style={{ transitionDelay: `${i * 70}ms` }}>
                <p className="font-serif font-bold text-[var(--color-green)] mb-1" style={{ fontSize: 'clamp(28px,3vw,44px)', lineHeight: 1 }}>{stat}</p>
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[rgba(var(--ch-text),0.35)]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-4">Core Capabilities</p>
            <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight" style={{ fontSize: 'clamp(32px,4.5vw,56px)' }}>
              Everything in one place.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
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
            ].map(({ Icon, title, body, features }, i) => (
              <div
                key={title}
                className="border border-[rgba(var(--ch-accent),0.08)] bg-[var(--color-surface)] p-8 reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <Icon className="w-5 h-5 text-[var(--color-green)] mb-6 stroke-[1.4]" />
                <h3 className="font-serif text-[22px] font-bold text-[var(--color-text)] mb-3">{title}</h3>
                <p className="text-[14px] text-[rgba(var(--ch-text),0.55)] leading-relaxed mb-6">{body}</p>
                <ul className="space-y-2">
                  {features.map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckIcon className="text-[var(--color-green)] mt-0.5 shrink-0 w-3 h-3" />
                      <span className="font-mono text-[11px] tracking-[0.06em] text-[rgba(var(--ch-text),0.50)]">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[var(--color-surface)] border-y border-[rgba(var(--ch-accent),0.08)] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[1280px] mx-auto reveal">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] text-center mb-12">What businesses say</p>
          <TestimonialCarousel testimonials={TESTIMONIALS} />
        </div>
      </section>

      <PricingSection />

      {/* CTA */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,166,86,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative max-w-[1280px] mx-auto text-center reveal">
          <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.28)] mb-4">Start today</p>
          <h2
            className="font-serif font-bold text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(36px,5vw,64px)' }}
          >
            Send your first invoice free.
          </h2>
          <p className="text-[clamp(15px,1.1vw,17px)] text-[rgba(255,255,255,0.50)] max-w-lg mx-auto mb-10">
            No credit card required. Get set up in under five minutes and start collecting payments the same day.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://astabill.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white px-12 py-5 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
            >
              Get Started Free →
            </a>
            <Link
              href="#pricing"
              className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium border border-[rgba(255,255,255,0.18)] text-white px-12 py-5 hover:border-[rgba(255,255,255,0.40)] transition-colors duration-200"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
