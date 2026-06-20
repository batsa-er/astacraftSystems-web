import Link from 'next/link'
import Image from 'next/image'
import { LinkedInIcon, XIcon, FacebookIcon, InstagramIcon } from '@/components/Icons'
import { getSiteSettings } from '@/sanity/queries'

export default async function Footer() {
  let settings = null
  try { settings = await getSiteSettings() } catch {}

  const email        = settings?.email        || 'info@astacraftsystems.com'
  const phone        = settings?.phone        || '+233 24 918 7555'
  const address      = settings?.address      || 'North Ridge, Accra, Ghana'
  const linkedinUrl  = settings?.linkedinUrl  || 'https://linkedin.com/company/astacraftsystems'
  const twitterUrl   = settings?.twitterUrl   || 'https://x.com/astacraftsys'
  const facebookUrl  = settings?.facebookUrl  || null
  const instagramUrl = settings?.instagramUrl || null

  const socials: { label: string; href: string; Icon: React.ComponentType<{ className?: string }> }[] = [
    { label: 'LinkedIn',    href: linkedinUrl, Icon: LinkedInIcon },
    { label: 'X / Twitter', href: twitterUrl,  Icon: XIcon },
    ...(facebookUrl  ? [{ label: 'Facebook',  href: facebookUrl,  Icon: FacebookIcon  }] : []),
    ...(instagramUrl ? [{ label: 'Instagram', href: instagramUrl, Icon: InstagramIcon }] : []),
  ]

  return (
    <footer className="bg-[var(--color-dark)]">

      {/* ── Main grid ── */}
      <div className="px-[clamp(24px,5vw,80px)] pt-16 pb-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-16">

            {/* Brand column */}
            <div>
              <Link href="/" className="inline-block mb-4" aria-label="Astacraft Systems">
                <Image
                  src="/astacraft-logo-white.svg"
                  alt="Astacraft Systems"
                  width={173}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
              <p className="text-[13px] text-[rgba(255,255,255,0.65)] leading-relaxed max-w-[38ch] mb-6">
                SaaS platforms and enterprise systems that power business automation and digital transformation across Africa.
              </p>
              <p className="font-mono text-[10px] tracking-[0.10em] text-[rgba(255,255,255,0.50)]">
                {address}
              </p>
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="font-mono text-[10px] tracking-[0.08em] text-[rgba(255,255,255,0.50)] hover:text-[var(--color-green)] transition-colors duration-200 mt-1 block"
                >
                  {phone}
                </a>
              )}
              <a
                href={`mailto:${email}`}
                className="font-mono text-[10px] tracking-[0.08em] text-[rgba(255,255,255,0.50)] hover:text-[var(--color-green)] transition-colors duration-200 mt-1 block"
              >
                {email}
              </a>
            </div>

            {/* Solutions column */}
            <div>
              <h4 className="font-mono text-[11px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.50)] mb-6">
                Enterprise
              </h4>
              <ul className="space-y-3.5">
                <li>
                  <a
                    href="https://astabill.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-[rgba(255,255,255,0.65)] hover:text-white transition-colors duration-200"
                  >
                    AstaBill
                  </a>
                </li>
                {[
                  ['Software Development',  '/services/software-development'],
                  ['Cloud & Infrastructure', '/services/cloud-solutions'],
                  ['CRM & ERP Systems',      '/services/crm-erp'],
                  ['Digital Transformation', '/services/digital-transformation'],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-[13px] text-[rgba(255,255,255,0.65)] hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company column */}
            <div>
              <h4 className="font-mono text-[11px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.50)] mb-6">
                Company
              </h4>
              <ul className="space-y-3.5">
                {[
                  ['About Us',       '/about'],
                  ['Careers',        '/careers'],
                  ['Case Studies',   '/work'],
                  ['AstaBill',       '/products'],
                  ['Security',       '/security'],
                  ['Insights',       '/insights'],
                  ['Contact',        '/contact'],
                  ['Privacy Policy', '/privacy'],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-[13px] text-[rgba(255,255,255,0.65)] hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect column */}
            <div>
              <h4 className="font-mono text-[11px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.50)] mb-6">
                Connect
              </h4>
              <div className="flex flex-col gap-3.5 mb-8">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-[13px] text-[rgba(255,255,255,0.65)] hover:text-white transition-colors duration-200 group"
                  >
                    <Icon className="w-4 h-4 text-[rgba(255,255,255,0.45)] group-hover:text-[var(--color-green)] transition-colors duration-200 shrink-0" />
                    {label}
                  </a>
                ))}
              </div>
              <Link
                href="/contact"
                className="inline-block font-mono text-[10px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white px-5 py-3 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
              >
                Contact Sales →
              </Link>
            </div>

          </div>

          {/* ── Bottom strip ── */}
          <div className="border-t border-[rgba(255,255,255,0.06)] pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <p className="font-mono text-[10px] tracking-[0.06em] text-[rgba(255,255,255,0.40)]">
              © {new Date().getFullYear()} Astacraft Systems Limited · Accra, Ghana
            </p>
            <div className="flex items-center gap-6">
              {[
                ['Terms',   '/terms'],
                ['Privacy', '/privacy'],
                ['Sitemap', '/sitemap.xml'],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="font-mono text-[10px] tracking-[0.08em] text-[rgba(255,255,255,0.40)] hover:text-[rgba(255,255,255,0.70)] transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
