import Link from 'next/link'
import Image from 'next/image'
import { LinkedInIcon, XIcon, FacebookIcon, InstagramIcon } from '@/components/Icons'
import { getSiteSettings, hasCaseStudies } from '@/sanity/queries'
import { NewsletterCapture } from '@/components/NewsletterCapture'
import { Placeholder } from '@/components/Placeholder'
import { placeholder } from '@/config/placeholders'
import { SERVICES } from '@/config/services'
import { ADDRESS_LINE, PHONE_HREF, PRODUCTS, SITE } from '@/config/site'
import { pageVisible } from '@/lib/pages'

const linkCls = 'text-[13px] text-[rgba(255,255,255,0.82)] hover:text-white transition-colors duration-200'
const headingCls = 'font-mono text-[11px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.72)] mb-5'

type FooterLink = { label: string; href: string; external?: boolean }

function LinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="space-y-3 list-none">
      {links.map(({ label, href, external }) => (
        <li key={label}>
          {external ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className={linkCls}>{label}</a>
          ) : (
            <Link href={href} className={linkCls}>{label}</Link>
          )}
        </li>
      ))}
    </ul>
  )
}

export default async function Footer() {
  let settings = null
  try { settings = await getSiteSettings() } catch {}
  const showWork = pageVisible('work') && (await hasCaseStudies())

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

  const products: FooterLink[] = [
    { label: PRODUCTS.astabill.name, href: PRODUCTS.astabill.url, external: true },
    ...(pageVisible('dondo') ? [{ label: PRODUCTS.dondo.name, href: PRODUCTS.dondo.path }] : []),
  ]

  const services: FooterLink[] = pageVisible('services')
    ? SERVICES.map(s => ({ label: s.shortTitle, href: `/services#${s.slug}` }))
    : []

  const company: FooterLink[] = [
    ...(pageVisible('about') ? [{ label: 'About', href: '/about' }] : []),
    ...(showWork ? [{ label: 'Work', href: '/work' }] : []),
    { label: 'Insights', href: '/insights' },
    { label: 'Careers', href: '/careers' },
    ...(pageVisible('security') ? [{ label: 'Security', href: '/security' }] : []),
    ...(pageVisible('contact') ? [{ label: 'Contact', href: '/contact' }] : []),
  ]

  const dpa = placeholder('footer.dpa')

  return (
    <footer className="bg-[#1D4776]">
      <div className="px-[clamp(24px,5vw,80px)] pt-14 pb-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-[2fr_1fr_1.3fr_1fr_1fr] gap-x-8 gap-y-12 mb-14">

            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <Link href="/" className="inline-block mb-4" aria-label={`${SITE.companyShort} home`}>
                <Image src="/astacraft-logo-white.svg" alt={SITE.companyShort} width={173} height={40} className="h-10 w-auto" />
              </Link>
              <p className="text-[13px] text-[rgba(255,255,255,0.82)] leading-relaxed max-w-[44ch] mb-5">
                Astacraft builds software for African businesses: invoicing and payments, WhatsApp customer messaging, and automations that take repetitive work off your team.
              </p>
              <address className="not-italic font-mono text-[11px] tracking-[0.06em] text-[rgba(255,255,255,0.78)] space-y-1">
                <p>{ADDRESS_LINE}</p>
                <p><a href={PHONE_HREF} className="hover:text-white transition-colors duration-200">{SITE.phone}</a></p>
                <p><a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors duration-200">{SITE.email}</a></p>
              </address>
              <NewsletterCapture />
            </div>

            <div>
              <h2 className={headingCls}>Products</h2>
              <LinkList links={products} />
            </div>

            {services.length > 0 && (
              <div>
                <h2 className={headingCls}>Services</h2>
                <LinkList links={services} />
              </div>
            )}

            <div>
              <h2 className={headingCls}>Company</h2>
              <LinkList links={company} />
            </div>

            <div>
              <h2 className={headingCls}>Legal</h2>
              <ul className="space-y-3 list-none">
                <li><Link href="/privacy" className={linkCls}>Privacy policy</Link></li>
                <li><Link href="/terms" className={linkCls}>Terms</Link></li>
                {dpa.state === 'filled' && (
                  <li><a href={dpa.value} className={linkCls}>Data processing agreement</a></li>
                )}
                {dpa.state === 'open' && (
                  <li><Placeholder id="footer.dpa" /></li>
                )}
              </ul>
            </div>
          </div>

          <div className="border-t border-[rgba(255,255,255,0.16)] pt-7 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="font-mono text-[11px] tracking-[0.06em] text-[rgba(255,255,255,0.75)]">
              © {new Date().getFullYear()} {SITE.company} · Accra, Ghana
            </p>
            <div className="flex items-center gap-5">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[rgba(255,255,255,0.78)] hover:text-white transition-colors duration-200 p-2 -m-2"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
