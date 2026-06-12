import Link from 'next/link'
import { LinkedInIcon, XIcon, FacebookIcon, InstagramIcon } from '@/components/Icons'
import { getSiteSettings } from '@/sanity/queries'

export default async function Footer() {
  let settings = null
  try { settings = await getSiteSettings() } catch {}

  const email        = settings?.email        || 'info@astacraftsystems.com'
  const address      = settings?.address      || 'Accra, Ghana'
  const linkedinUrl  = settings?.linkedinUrl  || 'https://linkedin.com/company/astacraftsystems'
  const twitterUrl   = settings?.twitterUrl   || 'https://x.com/astacraftsys'
  const facebookUrl  = settings?.facebookUrl  || null
  const instagramUrl = settings?.instagramUrl || null

  return (
    <footer className="bg-[var(--color-surface)] border-t border-[rgba(var(--ch-border),0.10)] px-[clamp(24px,5vw,80px)] py-20">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="font-serif text-[26px] font-bold text-[var(--color-text)] mb-4">
              Astacraft<span className="text-[var(--color-green)]"> Systems</span>
            </div>
            <p className="text-[14px] text-[rgba(var(--ch-text),0.55)] leading-relaxed max-w-sm">
              Technology, software, cloud, and digital transformation solutions helping African businesses modernize, automate, and scale.
            </p>
            <p className="mt-6 font-mono text-[11px] tracking-[0.12em] uppercase text-[rgba(var(--ch-text),0.28)]">
              {address} · {email}
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-accent)] mb-6">Solutions</h4>
            <ul className="space-y-3">
              {[
                ['Software Development', '/services/software-development'],
                ['Cloud & Infrastructure', '/services/cloud-infrastructure'],
                ['Cybersecurity', '/services/cybersecurity'],
                ['CRM & ERP', '/services/crm-erp'],
                ['Digital Transformation', '/services/digital-transformation'],
              ].map(([l, h]) => (
                <li key={h}>
                  <Link href={h} className="text-[13px] text-[rgba(var(--ch-text),0.55)] hover:text-[var(--color-accent)] transition-colors duration-200">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-accent)] mb-6">Company</h4>
            <ul className="space-y-3">
              {[
                ['Products', '/products'],
                ['About', '/about'],
                ['Case Studies', '/work'],
                ['Insights', '/insights'],
                ['Contact', '/contact'],
                ['Privacy Policy', '/privacy'],
              ].map(([l, h]) => (
                <li key={h}>
                  <Link href={h} className="text-[13px] text-[rgba(var(--ch-text),0.55)] hover:text-[var(--color-accent)] transition-colors duration-200">{l}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[rgba(var(--ch-border),0.10)] pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-mono text-[11px] tracking-[0.08em] text-[rgba(var(--ch-text),0.28)]">
            © {new Date().getFullYear()} Astacraft Systems Limited. All rights reserved.
          </p>
          <div className="flex gap-3">
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="w-8 h-8 border border-[rgba(var(--ch-border),0.10)] flex items-center justify-center text-[rgba(var(--ch-text),0.35)] hover:text-[var(--color-accent)] hover:border-[rgba(var(--ch-accent),0.30)] transition-colors duration-200">
              <LinkedInIcon className="w-4 h-4" />
            </a>
            <a href={twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"
              className="w-8 h-8 border border-[rgba(var(--ch-border),0.10)] flex items-center justify-center text-[rgba(var(--ch-text),0.35)] hover:text-[var(--color-accent)] hover:border-[rgba(var(--ch-accent),0.30)] transition-colors duration-200">
              <XIcon className="w-4 h-4" />
            </a>
            {facebookUrl && (
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-8 h-8 border border-[rgba(var(--ch-border),0.10)] flex items-center justify-center text-[rgba(var(--ch-text),0.35)] hover:text-[var(--color-accent)] hover:border-[rgba(var(--ch-accent),0.30)] transition-colors duration-200">
                <FacebookIcon className="w-4 h-4" />
              </a>
            )}
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-8 h-8 border border-[rgba(var(--ch-border),0.10)] flex items-center justify-center text-[rgba(var(--ch-text),0.35)] hover:text-[var(--color-accent)] hover:border-[rgba(var(--ch-accent),0.30)] transition-colors duration-200">
                <InstagramIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
