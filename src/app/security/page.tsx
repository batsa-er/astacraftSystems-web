import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, Lock, Server, FileCheck, AlertTriangle, Users } from 'lucide-react'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Security & Compliance | Astacraft Systems',
  description: 'How Astacraft Systems protects enterprise data — cloud security, data residency, compliance frameworks, and incident response for businesses across Africa.',
  alternates: { canonical: 'https://astacraftsystems.com/security' },
  openGraph: {
    title: 'Security & Compliance | Astacraft Systems',
    description: 'How Astacraft Systems protects enterprise data — cloud security, data residency, compliance frameworks, and incident response for businesses across Africa.',
    url: 'https://astacraftsystems.com/security',
    type: 'website',
  },
}

const PRACTICES = [
  {
    Icon: Lock,
    title: 'Data Encryption',
    body: 'All data is encrypted at rest using AES-256 and in transit via TLS 1.2+. Encryption keys are managed separately from data stores.',
  },
  {
    Icon: Server,
    title: 'Cloud Infrastructure',
    body: 'Systems are hosted on AWS, Microsoft Azure, and Google Cloud — each with enterprise-grade physical and network security, redundancy, and disaster recovery.',
  },
  {
    Icon: FileCheck,
    title: 'GRA Compliance',
    body: 'AstaBill is compliant with Ghana Revenue Authority requirements for digital receipts and invoices. Our software generates GRA-compliant documentation by default.',
  },
  {
    Icon: ShieldCheck,
    title: 'ISO 27001 Roadmap',
    body: 'We are pursuing ISO 27001 certification. Our information security management practices are aligned with the standard and we conduct regular internal audits.',
  },
  {
    Icon: AlertTriangle,
    title: 'Incident Response',
    body: 'We maintain a documented incident response plan with defined response time SLAs, client notification protocols, and post-incident review processes.',
  },
  {
    Icon: Users,
    title: 'Access Controls',
    body: 'Role-based access controls, multi-factor authentication, and principle of least privilege are enforced across all internal systems and client-facing platforms.',
  },
]

const COMPLIANCE_ACTIVE = [
  { label: 'GRA Certified',                   status: 'Active',    note: 'Ghana Revenue Authority compliance for digital receipts' },
  { label: 'GDPR-aligned practices',          status: 'Active',    note: 'Data subject rights and processing agreements in place' },
  { label: 'Penetration testing',             status: 'Annual',    note: 'Third-party penetration tests conducted annually' },
  { label: 'Data residency',                  status: 'Available', note: 'Ghana and regional hosting options available on request' },
  { label: 'Vulnerability disclosure program', status: 'Active',   note: 'Responsible disclosure policy — contact security@astacraftsystems.com' },
]

const COMPLIANCE_ROADMAP = [
  { label: 'ISO 27001', status: 'In Progress', note: 'Certification expected 2026 — security management practices are aligned with the standard and internal audits are underway' },
]

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security & Compliance"
        title={<>Enterprise-grade<br />security posture.</>}
        description="How AstaCraft Systems protects enterprise data — covering infrastructure security, compliance frameworks, and data residency for organizations across Africa."
      />

      {/* Security practices */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-14 reveal">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-4">Security Practices</p>
            <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight" style={{ fontSize: 'clamp(28px,3.5vw,48px)' }}>
              How we protect your data.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRACTICES.map(({ Icon, title, body }, i) => (
              <div
                key={title}
                className="border border-[rgba(var(--ch-accent),0.10)] bg-[var(--color-surface)] p-8 reveal"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="w-10 h-10 border border-[rgba(var(--ch-accent),0.20)] flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 text-[var(--color-accent)]" strokeWidth={1.4} />
                </div>
                <h3 className="font-serif font-bold text-[var(--color-text)] mb-3" style={{ fontSize: 'clamp(17px,1.6vw,22px)' }}>{title}</h3>
                <p className="text-[14px] text-[rgba(var(--ch-text),0.55)] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance status table */}
      <section className="bg-[var(--color-surface)] border-y border-[rgba(var(--ch-accent),0.08)] px-[clamp(24px,5vw,80px)] py-24">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12 reveal">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-4">Compliance Status</p>
            <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight" style={{ fontSize: 'clamp(26px,3vw,42px)' }}>
              Active certifications and programs.
            </h2>
          </div>
          <div className="divide-y divide-[rgba(var(--ch-accent),0.08)] reveal" style={{ transitionDelay: '60ms' }}>
            {COMPLIANCE_ACTIVE.map(({ label, status, note }) => (
              <div key={label} className="grid grid-cols-1 sm:grid-cols-[1fr_120px_1fr] gap-4 sm:gap-8 py-6 items-start">
                <p className="font-medium text-[var(--color-text)] text-[15px]">{label}</p>
                <span className={`inline-block font-mono text-[9px] tracking-[0.18em] uppercase px-3 py-1.5 self-start w-fit ${
                  status === 'Active'    ? 'bg-[rgba(34,166,86,0.12)] text-[var(--color-green)] border border-[rgba(34,166,86,0.25)]' :
                  status === 'Annual'   ? 'bg-[rgba(34,166,86,0.08)] text-[var(--color-green)] border border-[rgba(34,166,86,0.18)]' :
                  status === 'Available'? 'bg-[rgba(var(--ch-accent),0.07)] text-[var(--color-accent)] border border-[rgba(var(--ch-accent),0.15)]' :
                  'bg-[rgba(var(--ch-text),0.05)] text-[rgba(var(--ch-text),0.45)] border border-[rgba(var(--ch-text),0.10)]'
                }`}>{status}</span>
                <p className="text-[13px] text-[rgba(var(--ch-text),0.50)] leading-relaxed">{note}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 pt-14 border-t border-[rgba(var(--ch-accent),0.08)] reveal" style={{ transitionDelay: '120ms' }}>
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[rgba(var(--ch-text),0.35)] mb-8">Certification Roadmap</p>
            <div className="divide-y divide-[rgba(var(--ch-accent),0.08)]">
              {COMPLIANCE_ROADMAP.map(({ label, status, note }) => (
                <div key={label} className="grid grid-cols-1 sm:grid-cols-[1fr_120px_1fr] gap-4 sm:gap-8 py-6 items-start">
                  <p className="font-medium text-[var(--color-text)] text-[15px]">{label}</p>
                  <span className="inline-block font-mono text-[9px] tracking-[0.18em] uppercase px-3 py-1.5 self-start w-fit bg-[rgba(var(--ch-accent),0.10)] text-[var(--color-accent)] border border-[rgba(var(--ch-accent),0.20)]">
                    {status}
                  </span>
                  <p className="text-[13px] text-[rgba(var(--ch-text),0.50)] leading-relaxed">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Data residency note */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-20">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center reveal">
          <div>
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-4">Data Residency</p>
            <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight mb-6" style={{ fontSize: 'clamp(24px,2.8vw,38px)' }}>
              Your data stays where you need it to.
            </h2>
            <p className="text-[15px] text-[rgba(var(--ch-text),0.58)] leading-relaxed mb-6">
              For enterprise clients with regulatory data residency requirements, we can provision Ghana-hosted or West Africa-regional infrastructure on AWS and Azure. This is particularly relevant for financial services, healthcare, and government clients operating under sector-specific data localization requirements.
            </p>
            <p className="text-[14px] text-[rgba(var(--ch-text),0.42)] leading-relaxed">
              Contact us to discuss data residency requirements as part of your engagement scoping.
            </p>
          </div>
          <div className="border border-[rgba(var(--ch-accent),0.12)] bg-[var(--color-surface)] p-8">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[rgba(var(--ch-text),0.35)] mb-6">Security contact</p>
            <div className="space-y-4">
              {[
                { label: 'General security inquiries', value: 'security@astacraftsystems.com' },
                { label: 'Vulnerability disclosure',   value: 'security@astacraftsystems.com' },
                { label: 'Enterprise compliance docs',  value: 'Available on request — contact sales' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(var(--ch-text),0.30)] mb-1">{label}</p>
                  <p className="text-[13px] text-[rgba(var(--ch-text),0.65)]">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] py-24 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-[700px] mx-auto text-center reveal">
          <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.30)] mb-4">Questions about security?</p>
          <h2 className="font-serif font-bold text-white mb-6" style={{ fontSize: 'clamp(28px,3.5vw,48px)' }}>
            Talk to our technology team.
          </h2>
          <p className="text-[rgba(255,255,255,0.45)] mb-10">
            We provide security documentation, compliance questionnaires, and architecture reviews for enterprise procurement processes.
          </p>
          <Link
            href="/contact"
            className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white px-10 py-4 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
          >
            Book a Technology Call →
          </Link>
        </div>
      </section>
    </>
  )
}
