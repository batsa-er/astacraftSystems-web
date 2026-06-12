import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { CheckIcon, TrendingUpIcon, UsersIcon, ShieldCheckIcon, CurrencyIcon } from '@/components/Icons'

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
            <span className="inline-block font-mono text-[9px] tracking-[0.22em] uppercase px-3 py-1.5 border border-[rgba(34,166,86,0.40)] text-[var(--color-green)] mb-8">
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
              { Icon: UsersIcon,      stat: '500+', label: 'Businesses on AstaBill' },
              { Icon: ShieldCheckIcon,stat: '100%', label: 'GRA compliant invoicing' },
              { Icon: CurrencyIcon,   stat: '₵2B+', label: 'Transactions processed' },
            ].map(({ Icon, stat, label }, i) => (
              <div key={label} className="border border-[rgba(var(--ch-accent),0.12)] p-6 reveal-scale" style={{ transitionDelay: `${i * 70}ms` }}>
                <Icon className="w-5 h-5 text-[rgba(34,166,86,0.55)] mb-3" />
                <p className="font-serif font-bold text-[var(--color-green)] mb-1" style={{ fontSize: 'clamp(28px,3vw,44px)', lineHeight: 1 }}>{stat}</p>
                <p className="font-mono text-[9px] tracking-[0.14em] uppercase text-[rgba(var(--ch-text),0.35)]">{label}</p>
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
                title: 'Invoicing & Quotations',
                body: 'Create professional invoices and quotations in seconds. Automatic payment reminders, late fee calculations, and client portals included.',
                features: ['Custom branded templates', 'Auto-reminders & follow-ups', 'Multi-currency support'],
              },
              {
                title: 'Expense Management',
                body: 'Capture, categorize, and approve expenses with receipt scanning and real-time budget tracking across departments.',
                features: ['Receipt scanning & OCR', 'Budget tracking by department', 'Approval workflows'],
              },
              {
                title: 'Customer Management',
                body: 'Maintain a complete record of every client — contact details, transaction history, outstanding balances, and communication logs.',
                features: ['Client transaction history', 'Outstanding balance tracking', 'Communication logs'],
              },
              {
                title: 'Payment Collection',
                body: 'Accept payments via Mobile Money, bank transfer, and card directly through AstaBill payment links — no third-party checkout required.',
                features: ['Mobile Money (MTN, Vodafone, AirtelTigo)', 'Bank transfer & card payments', 'Instant payment notifications'],
              },
              {
                title: 'GRA Tax Compliance',
                body: 'Stay fully compliant with Ghana Revenue Authority requirements. Automatic VAT calculation, e-levy handling, and tax report generation.',
                features: ['Automatic VAT & e-levy', 'GRA-ready tax reports', 'Annual filing preparation'],
              },
              {
                title: 'Business Analytics',
                body: 'Real-time dashboards showing revenue, expenses, outstanding payments, and cash flow — with drill-down into any metric.',
                features: ['Real-time revenue dashboards', 'Cash flow forecasting', 'Custom report builder'],
              },
            ].map(({ title, body, features }, i) => (
              <div
                key={title}
                className="border border-[rgba(var(--ch-accent),0.08)] bg-[var(--color-surface)] p-8 reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-2 h-2 bg-[var(--color-green)] mb-6" />
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

      {/* Pricing */}
      <section id="pricing" className="bg-[var(--color-surface)] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-4">Pricing</p>
            <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight mb-4" style={{ fontSize: 'clamp(32px,4.5vw,56px)' }}>
              Simple, transparent pricing.
            </h2>
            <p className="text-[15px] text-[rgba(var(--ch-text),0.50)] max-w-xl mx-auto">
              Start free. Upgrade when you need more. Cancel anytime.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: 'Starter', price: 'Free', period: 'forever',
                desc: 'For freelancers and solo entrepreneurs getting started.',
                features: ['Up to 5 invoices/month', '1 user', 'Basic reporting', 'Email support'],
                cta: 'Get Started Free', primary: false,
              },
              {
                name: 'Growth', price: 'GH₵ 149', period: '/month',
                desc: 'For growing SMEs that need more volume and team access.',
                features: ['Unlimited invoices', 'Up to 5 users', 'GRA compliance tools', 'Payment links', 'Advanced reporting', 'Priority support'],
                cta: 'Start Free Trial', primary: true,
              },
              {
                name: 'Enterprise', price: 'Custom', period: '',
                desc: 'For multi-location businesses with custom requirements.',
                features: ['Unlimited everything', 'Custom integrations', 'Dedicated account manager', 'SLA guarantee', 'On-premise option', 'Training & onboarding'],
                cta: 'Book a Demo', primary: false,
              },
            ].map(({ name, price, period, desc, features, cta, primary }, i) => (
              <div
                key={name}
                className={`border p-8 flex flex-col reveal ${
                  primary
                    ? 'border-[var(--color-green)] bg-[var(--color-bg)] relative'
                    : 'border-[rgba(var(--ch-accent),0.12)] bg-[var(--color-bg)]'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {primary && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.18em] uppercase bg-[var(--color-green)] text-white px-4 py-1">
                    Most Popular
                  </span>
                )}
                <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-accent)] mb-4">{name}</p>
                <div className="mb-4">
                  <span className="font-serif font-bold text-[var(--color-text)]" style={{ fontSize: 'clamp(32px,4vw,48px)', lineHeight: 1 }}>{price}</span>
                  {period && <span className="font-mono text-[12px] text-[rgba(var(--ch-text),0.40)] ml-1">{period}</span>}
                </div>
                <p className="text-[13px] text-[rgba(var(--ch-text),0.50)] leading-relaxed mb-8">{desc}</p>
                <ul className="space-y-3 mb-10 flex-1">
                  {features.map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckIcon className="text-[var(--color-green)] mt-0.5 shrink-0 w-3 h-3" />
                      <span className="text-[13px] text-[rgba(var(--ch-text),0.60)]">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`font-mono text-[11px] tracking-[0.14em] uppercase font-medium py-4 text-center transition-colors duration-200 ${
                    primary
                      ? 'bg-[var(--color-green)] text-white hover:bg-[var(--color-green-hover)]'
                      : 'border border-[rgba(var(--ch-accent),0.35)] text-[rgba(var(--ch-text),0.70)] hover:border-[var(--color-accent)] hover:text-[var(--color-text)]'
                  }`}
                >
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#0B0F14] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,166,86,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative max-w-[1280px] mx-auto text-center reveal">
          <h2
            className="font-serif font-bold text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(36px,5vw,64px)' }}
          >
            See AstaBill in action.
          </h2>
          <p className="text-[clamp(15px,1.1vw,17px)] text-[rgba(255,255,255,0.50)] max-w-lg mx-auto mb-10">
            Book a free 30-minute demo and we will walk you through the platform live. No commitment, no credit card required.
          </p>
          <Link
            href="/contact"
            className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white px-12 py-5 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
          >
            Book Free Demo
          </Link>
        </div>
      </section>
    </>
  )
}
