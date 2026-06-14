import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { CheckIcon, TrendingUpIcon, UsersIcon, ShieldCheckIcon, CurrencyIcon } from '@/components/Icons'
import { FileText, Receipt, UserCircle, Smartphone, ShieldCheck, BarChart3 } from 'lucide-react'
import { PricingSection } from '@/components/PricingSection'

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title={<>AstaBill — the business<br />platform built for Africa.</>}
        description="Astacraft&apos;s flagship SaaS product. One platform to invoice, manage expenses, collect payments, and stay GRA compliant — designed for how African businesses actually operate."
      />

      {/* Product overview */}
      <section className="bg-[var(--color-surface)] border-y border-[rgba(var(--ch-accent),0.08)] px-[clamp(24px,5vw,80px)] py-24">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="reveal">
            <span className="inline-block font-mono text-[11px] tracking-[0.22em] uppercase px-3 py-1.5 border border-[rgba(34,166,86,0.40)] text-[var(--color-green)] mb-8">
              Cloud-Based · GRA Compliant · Made in Ghana
            </span>
            <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight mb-6" style={{ fontSize: 'clamp(28px,3.5vw,48px)' }}>
              One platform.<br />Every business function.
            </h2>
            <p className="text-[15px] text-[rgba(var(--ch-text),0.60)] leading-relaxed mb-8">
              AstaBill was built from the ground up for African SMEs and enterprises. From the first invoice to year-end tax filing, AstaBill gives your team the tools to work smarter — without switching between five different systems.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white px-8 py-4 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
              >
                Get Free Demo
              </Link>
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
              { Icon: TrendingUpIcon, stat: '40%', label: 'Average reduction in billing time' },
              { Icon: UsersIcon,      stat: '500+', label: 'Invoices sent daily' },
              { Icon: ShieldCheckIcon,stat: '100%', label: 'GRA compliant invoicing' },
              { Icon: CurrencyIcon,   stat: '₵2B+', label: 'Transactions processed' },
            ].map(({ Icon, stat, label }, i) => (
              <div key={label} className="border border-[rgba(var(--ch-accent),0.12)] p-6 reveal-scale" style={{ transitionDelay: `${i * 70}ms` }}>
                <Icon className="w-5 h-5 text-[rgba(34,166,86,0.55)] mb-3" />
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
                title: 'Invoicing & Quotations',
                body: 'Create professional invoices and quotations in seconds. Automatic payment reminders, late fee calculations, and client portals included.',
                features: ['Custom branded templates', 'Auto-reminders & follow-ups', 'Multi-currency support'],
              },
              {
                Icon: Receipt,
                title: 'Expense Management',
                body: 'Capture, categorize, and approve expenses with receipt scanning and real-time budget tracking across departments.',
                features: ['Receipt scanning & OCR', 'Budget tracking by department', 'Approval workflows'],
              },
              {
                Icon: UserCircle,
                title: 'Customer Management',
                body: 'Maintain a complete record of every client — contact details, transaction history, outstanding balances, and communication logs.',
                features: ['Client transaction history', 'Outstanding balance tracking', 'Communication logs'],
              },
              {
                Icon: Smartphone,
                title: 'Payment Collection',
                body: 'Accept payments via Mobile Money, bank transfer, and card directly through AstaBill payment links — no third-party checkout required.',
                features: ['Mobile Money (MTN, Vodafone, AirtelTigo)', 'Bank transfer & card payments', 'Instant payment notifications'],
              },
              {
                Icon: ShieldCheck,
                title: 'GRA Tax Compliance',
                body: 'Stay fully compliant with Ghana Revenue Authority requirements. Automatic VAT calculation, e-levy handling, and tax report generation.',
                features: ['Automatic VAT & e-levy', 'GRA-ready tax reports', 'Annual filing preparation'],
              },
              {
                Icon: BarChart3,
                title: 'Business Analytics',
                body: 'Real-time dashboards showing revenue, expenses, outstanding payments, and cash flow — with drill-down into any metric.',
                features: ['Real-time revenue dashboards', 'Cash flow forecasting', 'Custom report builder'],
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

      <PricingSection />

      {/* CTA */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,166,86,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative max-w-[1280px] mx-auto text-center reveal">
          <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.28)] mb-4">Get started today</p>
          <h2
            className="font-serif font-bold text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(36px,5vw,64px)' }}
          >
            See AstaBill in action.
          </h2>
          <p className="text-[clamp(15px,1.1vw,17px)] text-[rgba(255,255,255,0.50)] max-w-lg mx-auto mb-10">
            Book a free 30-minute demo and we will walk you through the platform live. No commitment, no credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white px-12 py-5 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
            >
              Book Free Demo →
            </Link>
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
