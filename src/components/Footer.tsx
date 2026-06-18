import Link from 'next/link'
import { LinkedInIcon, XIcon, FacebookIcon, InstagramIcon } from '@/components/Icons'
import { getSiteSettings } from '@/sanity/queries'

export default async function Footer() {
  let settings = null
  try { settings = await getSiteSettings() } catch {}

  const email        = settings?.email        || 'info@astacraftsystems.com'
  const phone        = settings?.phone        || null
  const address      = settings?.address      || 'Accra, Ghana'
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

      {/* ── Submit RFP enterprise banner ── */}
      <div className="border-b border-[rgba(255,255,255,0.06)] px-[clamp(24px,5vw,80px)] py-8">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.50)] mb-1">
              Enterprise Procurement
            </p>
            <p className="text-[15px] font-medium text-white">
              Ready to start a formal engagement?
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-block font-mono text-[10px] tracking-[0.16em] uppercase font-medium border border-[rgba(255,255,255,0.38)] text-white px-7 py-3.5 hover:border-[#55AA49] hover:text-[#55AA49] transition-colors duration-200 shrink-0"
          >
            Submit RFP →
          </Link>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="px-[clamp(24px,5vw,80px)] pt-16 pb-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-16">

            {/* Brand column */}
            <div>
              <Link href="/" className="inline-block mb-4" aria-label="Astacraft Systems">
                <img
                  src="/astacraft-logo-white.svg"
                  alt="Astacraft Systems"
                  height={28}
                  className="h-10 w-auto"
                />
              </Link>
              <p className="text-[13px] text-[rgba(255,255,255,0.65)] leading-relaxed max-w-[38ch] mb-6">
                Technology, software, cloud, and digital transformation solutions helping African organizations modernize and scale.
              </p>
              <p className="font-mono text-[10px] tracking-[0.10em] text-[rgba(255,255,255,0.50)]">
                {address}
              </p>
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="font-mono text-[10px] tracking-[0.08em] text-[rgba(255,255,255,0.50)] hover:text-[#55AA49] transition-colors duration-200 mt-1 block"
                >
                  {phone}
                </a>
              )}
              <a
                href={`mailto:${email}`}
                className="font-mono text-[10px] tracking-[0.08em] text-[rgba(255,255,255,0.50)] hover:text-[#55AA49] transition-colors duration-200 mt-1 block"
              >
                {email}
              </a>
            </div>

            {/* Services column */}
            <div>
              <h4 className="font-mono text-[11px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.50)] mb-6">
                Services
              </h4>
              <ul className="space-y-3.5">
                {[
                  ['Software Development', '/services/software-development'],
                  ['Cloud & Infrastructure', '/services/cloud-solutions'],
                  ['Cybersecurity', '/services/cybersecurity'],
                  ['CRM & ERP Systems', '/services/crm-erp'],
                  ['Digital Transformation', '/services/digital-transformation'],
                  ['IT Consulting', '/services/it-consulting'],
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
                  ['Our Work',       '/work'],
                  ['AstaBill',       '/products'],
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
                    <Icon className="w-4 h-4 text-[rgba(255,255,255,0.45)] group-hover:text-[#55AA49] transition-colors duration-200 shrink-0" />
                    {label}
                  </a>
                ))}
              </div>
              <Link
                href="/contact"
                className="inline-block font-mono text-[10px] tracking-[0.14em] uppercase font-medium bg-[#55AA49] text-white px-5 py-3 hover:bg-[#489A3E] transition-colors duration-200"
              >
                Start a Project →
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
