import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { JsonLd } from '@/components/JsonLd'
import {
  Check, Users, RefreshCw, BarChart3, Zap, Headphones,
  Database, Settings, ArrowRight,
} from 'lucide-react'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'CRM & Business Systems | Astacraft Systems',
  description: 'CRM and ERP implementation, customization, and integration for African enterprises. Salesforce, Odoo, and SAP configured as business automation systems — not just software installations.',
  alternates: { canonical: 'https://astacraftsystems.com/products/crm' },
  openGraph: {
    title: 'CRM & Business Systems | Astacraft Systems',
    description: 'CRM and ERP implementation, customization, and integration for African enterprises. Salesforce, Odoo, and SAP configured as business automation systems — not just software installations.',
    url: 'https://astacraftsystems.com/products/crm',
    type: 'website',
    images: [{ url: 'https://astacraftsystems.com/opengraph-image.png', width: 1200, height: 630 }],
  },
}

const PLATFORMS = [
  {
    name: 'Salesforce',
    category: 'Enterprise CRM',
    desc: 'The world\'s leading CRM platform. We handle full implementation, Sales Cloud, Service Cloud, custom objects, and AppExchange integrations — configured around your sales motion.',
    best: 'Mid-market and enterprise sales teams, financial services, telecoms',
  },
  {
    name: 'Odoo',
    category: 'All-in-One ERP',
    desc: 'An integrated suite covering CRM, inventory, accounting, HR, and more. One platform, one database, no integration overhead. Highly adaptable to Ghanaian business workflows.',
    best: 'SMEs, manufacturers, distributors, service businesses',
  },
  {
    name: 'SAP',
    category: 'Enterprise ERP',
    desc: 'Industry-grade ERP for complex, multi-entity organisations. We handle SAP S/4HANA implementations, migrations, and custom module development for enterprise-scale operations.',
    best: 'Large enterprises, government institutions, multi-subsidiary groups',
  },
  {
    name: 'HubSpot',
    category: 'Growth CRM',
    desc: 'A powerful, marketer-friendly CRM that ties sales, marketing, and customer success into one platform. Ideal for teams that want fast time-to-value and deep automation without heavy IT overhead.',
    best: 'Growth-stage businesses, digital agencies, professional services',
  },
]

const CAPABILITIES = [
  {
    Icon: Settings,
    title: 'Implementation & Configuration',
    body: 'End-to-end platform deployment — from requirements workshop through go-live. We configure every module to mirror your actual business processes, not a generic template.',
    features: ['Requirements workshops & process mapping', 'Platform selection advisory', 'Custom fields, workflows & automations', 'Role-based access & permission design'],
  },
  {
    Icon: Database,
    title: 'Data Migration',
    body: 'We migrate your existing data — from spreadsheets, legacy systems, or old CRMs — with full validation, deduplication, and zero downtime to live operations.',
    features: ['Source-to-target data mapping', 'Deduplication & cleansing', 'Staged migration with validation', 'Rollback safety & audit trail'],
  },
  {
    Icon: Zap,
    title: 'Workflow Automation',
    body: 'Replace manual handoffs and repetitive tasks with automated workflows. Approval flows, email sequences, status updates, and escalations — all running without human intervention.',
    features: ['Lead routing & assignment rules', 'Pipeline stage automations', 'Approval & escalation flows', 'Scheduled reports & alerts'],
  },
  {
    Icon: RefreshCw,
    title: 'Systems Integration',
    body: 'Connect your CRM or ERP to every other tool your business runs — accounting, ERP, marketing, payment gateways, and custom internal systems — via native connectors or custom API integrations.',
    features: ['Accounting (QuickBooks, Xero, Sage)', 'Payment & banking integrations', 'Marketing platform sync', 'Custom REST/GraphQL API builds'],
  },
  {
    Icon: BarChart3,
    title: 'Reporting & Dashboards',
    body: 'Build the visibility your leadership team needs. Custom dashboards, pipeline reports, revenue forecasts, and KPI tracking — so decisions are based on live data, not weekly spreadsheets.',
    features: ['Executive summary dashboards', 'Pipeline & revenue forecasting', 'Activity & performance reporting', 'Custom KPI tracking'],
  },
  {
    Icon: Users,
    title: 'Training & Adoption',
    body: 'A CRM is only as good as the team using it. We run structured onboarding — role-specific training, live workshops, and documentation — to drive adoption from day one.',
    features: ['Role-based training sessions', 'Admin & power-user workshops', 'User guides & SOPs', '30-day post-launch support'],
  },
]

const PROCESS = [
  { num: '01', title: 'Discovery & Scoping', body: 'We map your current processes, data sources, and team workflows before recommending a platform or architecture. No assumptions.' },
  { num: '02', title: 'Platform Selection', body: 'We match the right CRM or ERP to your business size, budget, and complexity. You get an honest recommendation, not a vendor pitch.' },
  { num: '03', title: 'Configuration & Build', body: 'We build out your CRM in a staging environment — modules, automations, custom fields, integrations — and review each milestone with your team.' },
  { num: '04', title: 'Data Migration', body: 'Existing customer records, pipeline data, and historical transactions are migrated, validated, and cleaned before go-live.' },
  { num: '05', title: 'Training & Go-Live', body: 'Role-specific training for your team, followed by a managed go-live. We stay on-call during the first 30 days to handle any issues in real time.' },
  { num: '06', title: 'Ongoing Optimisation', body: 'As your business evolves, we iterate on your CRM — adding modules, refining automations, and expanding integrations on a retained basis.' },
]

const FAQS = [
  {
    q: 'Which CRM is best for a Ghana business — Salesforce, Odoo, or HubSpot?',
    a: 'It depends on your size and complexity. Odoo is our most common recommendation for SMEs because it covers CRM, inventory, and accounting in one system at a fraction of the cost of Salesforce. HubSpot suits growth-stage businesses that need strong marketing integration. Salesforce is the right call for enterprise teams with complex sales processes and large deal volumes. We run a platform selection workshop before recommending anything.',
  },
  {
    q: 'Can you handle GRA compliance and Ghanaian payroll inside the ERP?',
    a: 'Yes. Odoo, in particular, can be configured with Ghanaian tax rules — including VAT, withholding tax, and NHIL — and local payroll structures. We also build integrations with GRA\'s invoicing portal where required for compliant e-invoicing.',
  },
  {
    q: 'How long does a CRM or ERP implementation take?',
    a: 'A focused Odoo or HubSpot implementation typically takes 6–12 weeks from kickoff to go-live. Salesforce or SAP engagements for mid-to-large organisations run 3–6 months. Timeline depends on scope, data complexity, and integration requirements. We give you a detailed project plan before work begins.',
  },
  {
    q: 'What happens to our existing data?',
    a: 'We start with a full data audit — what you have, where it lives, and what needs to move. We then build a migration plan with staged validation so nothing is lost or corrupted. All migrations include a rollback point and a parallel-run period before the old system is decommissioned.',
  },
  {
    q: 'Do you offer support after go-live?',
    a: 'Yes. All implementations include a 30-day post-launch support window at no additional cost. Beyond that, we offer monthly retainers covering admin support, new module development, user training, and system optimisation as your business grows.',
  },
]

export default function CrmProductPage() {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': 'https://astacraftsystems.com/products/crm#service',
        name: 'CRM & Business Systems',
        description: 'CRM and ERP implementation, customization, and integration for African enterprises.',
        provider: { '@id': 'https://astacraftsystems.com/#organization' },
        areaServed: { '@type': 'Country', name: 'Ghana' },
        url: 'https://astacraftsystems.com/products/crm',
      }} />

      <PageHero
        eyebrow="CRM & Business Systems"
        title={<>Run your business<br />on systems that work.</>}
        description="We implement, customise, and integrate CRM and ERP platforms — Salesforce, Odoo, SAP, HubSpot — configured as business automation systems, not generic software installations."
        cta={{ label: 'Book a Discovery Call', href: '/contact' }}
      />

      {/* Overview + stats */}
      <section className="bg-[var(--color-surface)] border-y border-[rgba(var(--ch-accent),0.08)] px-[clamp(24px,5vw,80px)] py-24">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="reveal">
            <span className="inline-block font-mono text-[11px] tracking-[0.22em] uppercase px-3 py-1.5 border border-[rgba(var(--ch-accent),0.28)] text-[var(--color-accent)] mb-8">
              Salesforce · Odoo · SAP · HubSpot
            </span>
            <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight mb-6" style={{ fontSize: 'clamp(28px,3.5vw,48px)' }}>
              Implementation that drives adoption — not just deployment.
            </h2>
            <p className="text-[15px] text-[rgba(var(--ch-text),0.60)] leading-relaxed mb-6">
              Most CRM implementations fail because the software is installed but the business never truly moves inside it. We take a different approach — starting with your workflows, not the vendor demo.
            </p>
            <p className="text-[15px] text-[rgba(var(--ch-text),0.60)] leading-relaxed mb-8">
              Every engagement begins with a discovery workshop. We map your processes, migrate your data, train your team, and stay on-hand during the critical first 30 days after go-live.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-accent)] text-white px-8 py-4 hover:bg-[var(--color-accent-hover)] transition-colors duration-200"
            >
              Start with a Discovery Call <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 reveal" style={{ transitionDelay: '100ms' }}>
            {[
              { stat: '80+',  label: 'CRM & ERP implementations' },
              { stat: '94%',  label: 'User adoption rate at 90 days' },
              { stat: '3 mo', label: 'Average go-live timeline' },
              { stat: '4',    label: 'Platforms we specialise in' },
            ].map(({ stat, label }, i) => (
              <div key={label} className="border border-[rgba(var(--ch-accent),0.12)] p-6 reveal-scale" style={{ transitionDelay: `${i * 70}ms` }}>
                <p className="font-serif font-bold text-[var(--color-accent)] mb-1" style={{ fontSize: 'clamp(28px,3vw,44px)', lineHeight: 1 }}>{stat}</p>
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[rgba(var(--ch-text),0.35)]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-4">Platforms We Implement</p>
            <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight" style={{ fontSize: 'clamp(32px,4.5vw,56px)' }}>
              The right platform for your business.
            </h2>
            <p className="text-[15px] text-[rgba(var(--ch-text),0.50)] max-w-[52ch] mx-auto mt-4 leading-relaxed">
              We are certified partners across four major CRM and ERP platforms. We recommend based on fit — not margin.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PLATFORMS.map(({ name, category, desc, best }, i) => (
              <div
                key={name}
                className="border border-[rgba(var(--ch-accent),0.10)] bg-[var(--color-surface)] p-10 reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-[28px] font-bold text-[var(--color-text)] mb-1">{name}</h3>
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-accent)]">{category}</span>
                  </div>
                </div>
                <p className="text-[14px] text-[rgba(var(--ch-text),0.58)] leading-relaxed mb-6">{desc}</p>
                <div className="border-t border-[rgba(var(--ch-accent),0.08)] pt-5">
                  <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(var(--ch-text),0.30)] mb-2">Best for</p>
                  <p className="text-[13px] text-[rgba(var(--ch-text),0.50)]">{best}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-[var(--color-surface)] border-y border-[rgba(var(--ch-accent),0.08)] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-4">What We Deliver</p>
            <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight" style={{ fontSize: 'clamp(32px,4.5vw,56px)' }}>
              Every engagement. End to end.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPABILITIES.map(({ Icon, title, body, features }, i) => (
              <div
                key={title}
                className="border border-[rgba(var(--ch-accent),0.08)] bg-[var(--color-bg)] p-8 reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <Icon className="w-5 h-5 text-[var(--color-accent)] mb-6 stroke-[1.4]" />
                <h3 className="font-serif text-[22px] font-bold text-[var(--color-text)] mb-3">{title}</h3>
                <p className="text-[14px] text-[rgba(var(--ch-text),0.55)] leading-relaxed mb-6">{body}</p>
                <ul className="space-y-2">
                  {features.map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="text-[var(--color-accent)] mt-0.5 shrink-0 w-3 h-3" />
                      <span className="font-mono text-[11px] tracking-[0.06em] text-[rgba(var(--ch-text),0.50)]">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-16 reveal">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-4">How It Works</p>
            <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight" style={{ fontSize: 'clamp(32px,4.5vw,56px)' }}>
              A process built for adoption.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(var(--ch-accent),0.08)]">
            {PROCESS.map(({ num, title, body }, i) => (
              <div
                key={num}
                className="bg-[var(--color-bg)] p-10 reveal"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <p className="font-serif font-black text-[rgba(var(--ch-accent),0.15)] leading-none mb-6 select-none" style={{ fontSize: 'clamp(48px,5vw,72px)' }}>{num}</p>
                <h3 className="font-serif text-[20px] font-bold text-[var(--color-text)] mb-3">{title}</h3>
                <p className="text-[14px] text-[rgba(var(--ch-text),0.55)] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--color-surface)] border-t border-[rgba(var(--ch-accent),0.08)] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[860px] mx-auto">
          <div className="mb-14 reveal">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-4">Common Questions</p>
            <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight" style={{ fontSize: 'clamp(28px,3.5vw,44px)' }}>
              Before you decide.
            </h2>
          </div>
          <div className="space-y-0">
            {FAQS.map(({ q, a }, i) => (
              <div
                key={i}
                className="border-t border-[rgba(var(--ch-accent),0.10)] py-8 reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <h3 className="font-serif text-[18px] font-bold text-[var(--color-text)] mb-3">{q}</h3>
                <p className="text-[14px] text-[rgba(var(--ch-text),0.58)] leading-relaxed">{a}</p>
              </div>
            ))}
            <div className="border-t border-[rgba(var(--ch-accent),0.10)]" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(var(--ch-accent),0.14),transparent)] pointer-events-none" />
        <div className="relative max-w-[700px] mx-auto text-center reveal">
          <Headphones className="w-8 h-8 text-[var(--color-accent)] mx-auto mb-6 opacity-60" />
          <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.30)] mb-4">Start with a conversation</p>
          <h2 className="font-serif font-bold text-white mb-4" style={{ fontSize: 'clamp(28px,3.5vw,48px)' }}>
            Not sure which platform is right for you?
          </h2>
          <p className="text-[rgba(255,255,255,0.50)] mb-10 text-[15px] leading-relaxed">
            Book a complimentary 45-minute discovery call. We will review your current systems, understand your business processes, and recommend the right platform and scope — no obligation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-accent)] text-white px-10 py-4 hover:bg-[var(--color-accent-hover)] transition-colors duration-200"
            >
              Book a Discovery Call →
            </Link>
            <Link
              href="/services/crm-erp"
              className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium border border-[rgba(255,255,255,0.38)] text-white px-10 py-4 hover:border-[rgba(255,255,255,0.65)] transition-colors duration-200"
            >
              View Service Details
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
