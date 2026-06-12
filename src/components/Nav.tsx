'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  CodeIcon, ZapIcon, ServerIcon, ShieldCheckIcon,
  DatabaseIcon, MegaphoneIcon, BrushIcon, ConsultIcon,
} from '@/components/Icons'

type DropdownId = 'solutions' | 'products' | null

const solutionsTech = [
  { Icon: CodeIcon,        href: '/services/software-development',   title: 'Software Development',    desc: 'Web, mobile, SaaS & enterprise apps' },
  { Icon: ZapIcon,         href: '/services/digital-transformation', title: 'Digital Transformation',  desc: 'Process automation & modernization' },
  { Icon: ServerIcon,      href: '/services/cloud-infrastructure',   title: 'Cloud & Infrastructure',  desc: 'Hosting, migration & managed infra' },
  { Icon: ShieldCheckIcon, href: '/services/cybersecurity',          title: 'Cybersecurity',           desc: 'Audits, protection & compliance' },
]

const solutionsBusiness = [
  { Icon: DatabaseIcon,  href: '/services/crm-erp',            title: 'CRM & ERP Solutions',   desc: 'HubSpot, Zoho, Odoo & custom CRM' },
  { Icon: MegaphoneIcon, href: '/services/digital-marketing',  title: 'Digital Marketing',     desc: 'SEO, paid ads & lead generation' },
  { Icon: BrushIcon,     href: '/services/branding-creative',  title: 'Branding & Creative',   desc: 'Identity, design & print production' },
  { Icon: ConsultIcon,   href: '/services/consulting',         title: 'Technology Consulting', desc: 'Strategy, roadmaps & advisory' },
]

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 12 12" fill="none"
    >
      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Nav() {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [dropdown, setDropdown]       = useState<DropdownId>(null)
  const pathname  = usePathname()
  const wrapRef   = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMobileOpen(false); setDropdown(null) }, [pathname])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMobileOpen(false); setDropdown(null) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setDropdown(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function openDropdown(id: DropdownId) {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setDropdown(id)
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setDropdown(null), 120)
  }

  return (
    <>
      <div ref={wrapRef} className="fixed top-0 left-0 right-0 z-50">

        {/* ── Main bar ── */}
        <nav className={`flex items-center justify-between px-[clamp(24px,5vw,80px)] h-[72px] transition-all duration-300 bg-[rgba(var(--ch-bg),0.96)] backdrop-blur-xl border-b border-[rgba(var(--ch-border),0.10)] ${scrolled ? 'shadow-sm' : ''}`}>

          <Link href="/" className="font-serif text-[22px] font-bold tracking-wide text-[var(--color-text)] shrink-0">
            Astacraft<span className="text-[var(--color-green)]"> Systems</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1 list-none">

            {/* Solutions */}
            <li
              onMouseEnter={() => openDropdown('solutions')}
              onMouseLeave={scheduleClose}
            >
              <button
                onClick={() => setDropdown(dropdown === 'solutions' ? null : 'solutions')}
                className={`flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] uppercase px-4 py-2.5 transition-colors duration-200 ${
                  dropdown === 'solutions' || pathname.startsWith('/services')
                    ? 'text-[var(--color-accent)]'
                    : 'text-[rgba(var(--ch-text),0.55)] hover:text-[var(--color-accent)]'
                }`}
              >
                Solutions <ChevronDown open={dropdown === 'solutions'} />
              </button>
            </li>

            {/* Products */}
            <li
              onMouseEnter={() => openDropdown('products')}
              onMouseLeave={scheduleClose}
            >
              <button
                onClick={() => setDropdown(dropdown === 'products' ? null : 'products')}
                className={`flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] uppercase px-4 py-2.5 transition-colors duration-200 ${
                  dropdown === 'products' || pathname.startsWith('/products')
                    ? 'text-[var(--color-accent)]'
                    : 'text-[rgba(var(--ch-text),0.55)] hover:text-[var(--color-accent)]'
                }`}
              >
                Products <ChevronDown open={dropdown === 'products'} />
              </button>
            </li>

            {[
              { href: '/about',    label: 'About' },
              { href: '/insights', label: 'Insights' },
            ].map(l => (
              <li key={l.href} onMouseEnter={() => openDropdown(null)}>
                <Link
                  href={l.href}
                  className={`font-mono text-[11px] tracking-[0.12em] uppercase px-4 py-2.5 block transition-colors duration-200 ${
                    pathname.startsWith(l.href)
                      ? 'text-[var(--color-accent)]'
                      : 'text-[rgba(var(--ch-text),0.55)] hover:text-[var(--color-accent)]'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}

            <li className="ml-3" onMouseEnter={() => openDropdown(null)}>
              <Link
                href="/contact"
                className="font-mono text-[11px] tracking-[0.12em] uppercase font-medium bg-[var(--color-accent)] text-white px-5 py-2.5 hover:bg-[var(--color-accent-hover)] transition-colors duration-200"
              >
                Book Consultation →
              </Link>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] cursor-pointer p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[1.5px] bg-[var(--color-text)] transition-all duration-300 ${mobileOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-[var(--color-text)] transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-[var(--color-text)] transition-all duration-300 ${mobileOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
          </button>
        </nav>

        {/* ── Solutions mega-dropdown ── */}
        {dropdown === 'solutions' && (
          <div
            className="mega-dropdown hidden md:block bg-[rgba(var(--ch-bg),0.98)] backdrop-blur-2xl border-b border-[rgba(var(--ch-border),0.10)] shadow-[0_24px_80px_rgba(0,0,0,0.12)]"
            onMouseEnter={() => openDropdown('solutions')}
            onMouseLeave={scheduleClose}
          >
            <div className="max-w-[1280px] mx-auto px-[clamp(24px,5vw,80px)] py-10">
              <div className="grid grid-cols-3 gap-10">

                {/* Column 1: Technology */}
                <div>
                  <p className="font-mono text-[9px] tracking-[0.24em] uppercase text-[rgba(var(--ch-text),0.28)] mb-6">Technology</p>
                  <div className="space-y-1">
                    {solutionsTech.map(({ Icon, href, title, desc }) => (
                      <Link
                        key={href}
                        href={href}
                        className="flex items-start gap-3 p-3 -mx-3 hover:bg-[rgba(var(--ch-accent),0.05)] transition-colors duration-150 group rounded-sm"
                      >
                        <div className="w-8 h-8 border border-[rgba(var(--ch-accent),0.12)] flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[rgba(var(--ch-accent),0.30)] group-hover:bg-[rgba(var(--ch-accent),0.05)] transition-all duration-150">
                          <Icon className="w-4 h-4 text-[var(--color-accent)]" />
                        </div>
                        <div>
                          <p className="font-mono text-[11px] tracking-[0.06em] font-medium text-[var(--color-text)] mb-0.5 group-hover:text-[var(--color-accent)] transition-colors duration-150">{title}</p>
                          <p className="text-[12px] text-[rgba(var(--ch-text),0.42)] leading-snug">{desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 2: Business Solutions */}
                <div>
                  <p className="font-mono text-[9px] tracking-[0.24em] uppercase text-[rgba(var(--ch-text),0.28)] mb-6">Business Solutions</p>
                  <div className="space-y-1">
                    {solutionsBusiness.map(({ Icon, href, title, desc }) => (
                      <Link
                        key={href}
                        href={href}
                        className="flex items-start gap-3 p-3 -mx-3 hover:bg-[rgba(var(--ch-accent),0.05)] transition-colors duration-150 group rounded-sm"
                      >
                        <div className="w-8 h-8 border border-[rgba(var(--ch-accent),0.12)] flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[rgba(var(--ch-accent),0.30)] group-hover:bg-[rgba(var(--ch-accent),0.05)] transition-all duration-150">
                          <Icon className="w-4 h-4 text-[var(--color-accent)]" />
                        </div>
                        <div>
                          <p className="font-mono text-[11px] tracking-[0.06em] font-medium text-[var(--color-text)] mb-0.5 group-hover:text-[var(--color-accent)] transition-colors duration-150">{title}</p>
                          <p className="text-[12px] text-[rgba(var(--ch-text),0.42)] leading-snug">{desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 3: Enterprise CTA panel */}
                <div className="border-l border-[rgba(var(--ch-border),0.10)] pl-10 flex flex-col justify-between">
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.24em] uppercase text-[rgba(var(--ch-text),0.28)] mb-6">Enterprise</p>
                    <h3 className="font-serif text-[22px] font-bold text-[var(--color-text)] mb-3 leading-tight">
                      End-to-end digital<br />transformation.
                    </h3>
                    <p className="text-[13px] text-[rgba(var(--ch-text),0.50)] leading-relaxed mb-6">
                      From strategy through deployment — we manage the full technology lifecycle for your organization.
                    </p>
                    <ul className="space-y-2 mb-8">
                      {['Technology roadmapping', 'Vendor selection & management', 'Change management support'].map(item => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] shrink-0" />
                          <span className="text-[12px] text-[rgba(var(--ch-text),0.45)]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-block font-mono text-[10px] tracking-[0.14em] uppercase font-medium bg-[var(--color-accent)] text-white px-6 py-3 hover:bg-[var(--color-accent-hover)] transition-colors duration-200 self-start"
                  >
                    Book Consultation →
                  </Link>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ── Products dropdown ── */}
        {dropdown === 'products' && (
          <div
            className="mega-dropdown hidden md:block bg-[rgba(var(--ch-bg),0.98)] backdrop-blur-2xl border-b border-[rgba(var(--ch-border),0.10)] shadow-[0_24px_80px_rgba(0,0,0,0.12)]"
            onMouseEnter={() => openDropdown('products')}
            onMouseLeave={scheduleClose}
          >
            <div className="max-w-[1280px] mx-auto px-[clamp(24px,5vw,80px)] py-10">
              <div className="flex gap-10 max-w-2xl">

                {/* AstaBill card */}
                <Link
                  href="/products"
                  className="flex-1 border border-[rgba(var(--ch-accent),0.12)] bg-[var(--color-surface)] p-6 hover:border-[rgba(34,166,86,0.40)] transition-colors duration-200 group"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-10 h-10 bg-[var(--color-green)] flex items-center justify-center shrink-0">
                      <span className="font-serif font-bold text-white text-[16px]">A</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-serif text-[18px] font-bold text-[var(--color-text)] group-hover:text-[var(--color-green)] transition-colors duration-200">AstaBill</h3>
                        <span className="font-mono text-[8px] tracking-[0.18em] uppercase px-2 py-0.5 bg-[rgba(34,166,86,0.10)] text-[var(--color-green)] border border-[rgba(34,166,86,0.20)]">Flagship</span>
                      </div>
                      <p className="text-[13px] text-[rgba(var(--ch-text),0.50)]">Cloud business management platform</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {['Invoicing', 'Payments', 'GRA Compliance', 'Analytics', 'Team Collaboration'].map(tag => (
                      <span key={tag} className="font-mono text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 border border-[rgba(var(--ch-border),0.12)] text-[rgba(var(--ch-text),0.38)]">{tag}</span>
                    ))}
                  </div>
                  <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-accent)] group-hover:text-[var(--color-green)] transition-colors duration-200">
                    Explore AstaBill →
                  </p>
                </Link>

                {/* Demo CTA */}
                <div className="w-56 flex flex-col justify-between">
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.24em] uppercase text-[rgba(var(--ch-text),0.28)] mb-4">Get Started</p>
                    <p className="text-[14px] text-[rgba(var(--ch-text),0.55)] leading-relaxed mb-6">
                      See AstaBill live in a free 30-minute demo with our product team.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-block font-mono text-[10px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white px-6 py-3 hover:bg-[var(--color-green-hover)] transition-colors duration-200 text-center"
                  >
                    Book Free Demo →
                  </Link>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── Mobile full-screen menu ── */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-[rgba(var(--ch-bg),0.98)] backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8">
          {[
            { href: '/services',  label: 'Solutions' },
            { href: '/products',  label: 'Products' },
            { href: '/about',     label: 'About' },
            { href: '/insights',  label: 'Insights' },
          ].map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="font-serif text-[clamp(28px,6vw,48px)] font-semibold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-4 font-mono text-[13px] tracking-[0.12em] uppercase font-medium bg-[var(--color-accent)] text-white px-12 py-5 hover:bg-[var(--color-accent-hover)] transition-colors duration-200"
          >
            Book Consultation
          </Link>
        </div>
      )}
    </>
  )
}
