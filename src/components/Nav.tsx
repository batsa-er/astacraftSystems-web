'use client'

import { useState, useEffect, useRef, startTransition } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  CodeIcon, ZapIcon, ServerIcon, ShieldCheckIcon,
  DatabaseIcon, MegaphoneIcon, BrushIcon, ConsultIcon,
} from '@/components/Icons'

type DropdownId = 'solutions' | 'products' | null

const DARK_PAGES = ['/']

const solutionsTech = [
  { Icon: CodeIcon,        href: '/services/software-development',   title: 'Software Development',   desc: 'Web, mobile, SaaS & enterprise apps' },
  { Icon: ZapIcon,         href: '/services/digital-transformation', title: 'Digital Transformation', desc: 'Process automation & modernization' },
  { Icon: ServerIcon,      href: '/services/cloud-solutions',        title: 'Cloud & Infrastructure', desc: 'Hosting, migration & managed infra' },
  { Icon: ShieldCheckIcon, href: '/services/cybersecurity',          title: 'Cybersecurity',          desc: 'Audits, protection & compliance' },
]

const solutionsBusiness = [
  { Icon: DatabaseIcon,  href: '/services/crm-erp',           title: 'CRM & ERP Solutions',   desc: 'Salesforce, Odoo, SAP & custom CRM' },
  { Icon: MegaphoneIcon, href: '/services/digital-marketing', title: 'Digital Marketing',     desc: 'SEO, paid ads & lead generation' },
  { Icon: BrushIcon,     href: '/services/brand-design',      title: 'Brand & Design',        desc: 'Identity, product design & creative' },
  { Icon: ConsultIcon,   href: '/services/it-consulting',     title: 'IT Strategy',           desc: 'Technology roadmaps & advisory' },
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
  const wrapRef              = useRef<HTMLDivElement>(null)
  const closeTimer           = useRef<ReturnType<typeof setTimeout> | null>(null)
  const keyboardOpen         = useRef(false)
  const dropdownContainerRef = useRef<HTMLDivElement>(null)
  const mobileDialogRef      = useRef<HTMLDivElement>(null)

  const isDarkPage = DARK_PAGES.includes(pathname)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { startTransition(() => { setMobileOpen(false); setDropdown(null) }) }, [pathname])

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

  useEffect(() => {
    if (dropdown && keyboardOpen.current) {
      const first = dropdownContainerRef.current?.querySelector<HTMLElement>('[role="menuitem"]')
      first?.focus()
      keyboardOpen.current = false
    }
  }, [dropdown])

  useEffect(() => {
    if (!mobileOpen) return
    const el = mobileDialogRef.current
    if (!el) return
    const getFocusable = () =>
      Array.from(el.querySelectorAll<HTMLElement>('a, button, [tabindex]:not([tabindex="-1"])'))
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const items = getFocusable()
      if (!items.length) return
      const first = items[0]
      const last  = items[items.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [mobileOpen])

  function openDropdown(id: DropdownId) {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setDropdown(id)
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setDropdown(null), 120)
  }

  function handleTriggerKeyDown(e: React.KeyboardEvent, id: DropdownId) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault()
      keyboardOpen.current = true
      setDropdown(id)
    }
  }

  function handleMenuKeyDown(e: React.KeyboardEvent) {
    const items = dropdownContainerRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []
    const arr   = Array.from(items)
    const idx   = arr.indexOf(document.activeElement as HTMLElement)
    if (e.key === 'ArrowDown') { e.preventDefault(); arr[(idx + 1) % arr.length]?.focus() }
    if (e.key === 'ArrowUp')   { e.preventDefault(); arr[(idx - 1 + arr.length) % arr.length]?.focus() }
    if (e.key === 'Home')      { e.preventDefault(); arr[0]?.focus() }
    if (e.key === 'End')       { e.preventDefault(); arr[arr.length - 1]?.focus() }
    if (e.key === 'Tab')       { setDropdown(null) }
  }

  return (
    <>
      <div ref={wrapRef} className="fixed top-0 left-0 right-0 z-50">

        {/* ── Main bar ── */}
        <nav className={`flex items-center justify-between px-[clamp(24px,5vw,80px)] h-[72px] transition-all duration-500 border-b ${
          isDarkPage && !scrolled
            ? 'bg-transparent border-transparent'
            : 'bg-[rgba(var(--ch-bg),0.97)] backdrop-blur-xl border-[rgba(var(--ch-border),0.10)] shadow-sm'
        }`}>

          <Link href="/" className="shrink-0" aria-label="Astacraft Systems">
            <img
              src={isDarkPage && !scrolled ? '/astacraft-logo-white.svg' : '/astacraft-logo.svg'}
              alt="Astacraft Systems"
              height={32}
              className="h-11 w-auto transition-opacity duration-300"
            />
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
                onKeyDown={e => handleTriggerKeyDown(e, 'solutions')}
                aria-haspopup="menu"
                aria-expanded={dropdown === 'solutions'}
                className={`flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] uppercase px-4 py-2.5 transition-colors duration-200 ${
                  dropdown === 'solutions' || pathname.startsWith('/services')
                    ? isDarkPage && !scrolled ? 'text-white' : 'text-[var(--color-accent)]'
                    : isDarkPage && !scrolled ? 'text-[rgba(255,255,255,0.55)] hover:text-white' : 'text-[rgba(var(--ch-text),0.55)] hover:text-[var(--color-accent)]'
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
                onKeyDown={e => handleTriggerKeyDown(e, 'products')}
                aria-haspopup="menu"
                aria-expanded={dropdown === 'products'}
                className={`flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] uppercase px-4 py-2.5 transition-colors duration-200 ${
                  dropdown === 'products' || pathname.startsWith('/products')
                    ? isDarkPage && !scrolled ? 'text-white' : 'text-[var(--color-accent)]'
                    : isDarkPage && !scrolled ? 'text-[rgba(255,255,255,0.55)] hover:text-white' : 'text-[rgba(var(--ch-text),0.55)] hover:text-[var(--color-accent)]'
                }`}
              >
                Products <ChevronDown open={dropdown === 'products'} />
              </button>
            </li>

            {[
              { href: '/work',     label: 'Work' },
              { href: '/about',    label: 'About' },
              { href: '/insights', label: 'Insights' },
            ].map(l => (
              <li key={l.href} onMouseEnter={() => openDropdown(null)}>
                <Link
                  href={l.href}
                  className={`font-mono text-[11px] tracking-[0.12em] uppercase px-4 py-2.5 block transition-colors duration-200 ${
                    pathname.startsWith(l.href)
                      ? isDarkPage && !scrolled ? 'text-white' : 'text-[var(--color-accent)]'
                      : isDarkPage && !scrolled ? 'text-[rgba(255,255,255,0.55)] hover:text-white' : 'text-[rgba(var(--ch-text),0.55)] hover:text-[var(--color-accent)]'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}

            <li className="ml-3" onMouseEnter={() => openDropdown(null)}>
              <Link
                href="/contact"
                className={`font-mono text-[11px] tracking-[0.12em] uppercase font-medium px-5 py-2.5 transition-colors duration-200 ${
                  isDarkPage && !scrolled
                    ? 'bg-[#55AA49] text-white hover:bg-[#489A3E]'
                    : 'bg-[var(--color-green)] text-white hover:bg-[var(--color-green-hover)]'
                }`}
              >
                Start a Project →
              </Link>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] cursor-pointer p-3 -mr-3 min-w-[44px] min-h-[44px] items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {['top', 'mid', 'bot'].map((pos) => (
              <span
                key={pos}
                className={`block w-6 h-[1.5px] transition-all duration-300 ${
                  isDarkPage && !scrolled ? 'bg-white' : 'bg-[var(--color-text)]'
                } ${
                  pos === 'top' && mobileOpen ? 'translate-y-[6.5px] rotate-45' :
                  pos === 'mid' && mobileOpen ? 'opacity-0 scale-x-0' :
                  pos === 'bot' && mobileOpen ? '-translate-y-[6.5px] -rotate-45' : ''
                }`}
              />
            ))}
          </button>
        </nav>

        {/* ── Solutions mega-dropdown ── */}
        {dropdown === 'solutions' && (
          <div
            ref={dropdownContainerRef}
            role="menu"
            className="mega-dropdown hidden md:block bg-[rgba(var(--ch-bg),0.98)] backdrop-blur-2xl border-b border-[rgba(var(--ch-border),0.10)] shadow-[0_24px_80px_rgba(0,0,0,0.12)]"
            onMouseEnter={() => openDropdown('solutions')}
            onMouseLeave={scheduleClose}
            onKeyDown={handleMenuKeyDown}
          >
            <div className="max-w-[1280px] mx-auto px-[clamp(24px,5vw,80px)] py-10">
              <div className="grid grid-cols-3 gap-10">

                {/* Column 1: Technology */}
                <div>
                  <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[rgba(var(--ch-text),0.28)] mb-6">Technology</p>
                  <div className="space-y-1">
                    {solutionsTech.map(({ Icon, href, title, desc }) => (
                      <Link
                        key={href}
                        href={href}
                        role="menuitem"
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
                  <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[rgba(var(--ch-text),0.28)] mb-6">Business Solutions</p>
                  <div className="space-y-1">
                    {solutionsBusiness.map(({ Icon, href, title, desc }) => (
                      <Link
                        key={href}
                        href={href}
                        role="menuitem"
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
                    <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[rgba(var(--ch-text),0.28)] mb-6">Enterprise</p>
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
                    role="menuitem"
                    className="inline-block font-mono text-[10px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white px-6 py-3 hover:bg-[var(--color-green-hover)] transition-colors duration-200 self-start"
                  >
                    Start a Project →
                  </Link>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ── Products dropdown ── */}
        {dropdown === 'products' && (
          <div
            ref={dropdownContainerRef}
            role="menu"
            className="mega-dropdown hidden md:block bg-[rgba(var(--ch-bg),0.98)] backdrop-blur-2xl border-b border-[rgba(var(--ch-border),0.10)] shadow-[0_24px_80px_rgba(0,0,0,0.12)]"
            onMouseEnter={() => openDropdown('products')}
            onMouseLeave={scheduleClose}
            onKeyDown={handleMenuKeyDown}
          >
            <div className="max-w-[1280px] mx-auto px-[clamp(24px,5vw,80px)] py-10">
              <div className="flex gap-10 max-w-2xl">

                {/* AstaBill card */}
                <Link
                  href="/products"
                  role="menuitem"
                  className="flex-1 border border-[rgba(var(--ch-accent),0.12)] bg-[var(--color-surface)] p-6 hover:border-[rgba(34,166,86,0.40)] transition-colors duration-200 group"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-10 h-10 bg-[var(--color-green)] flex items-center justify-center shrink-0">
                      <span className="font-serif font-bold text-white text-[16px]">A</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-serif text-[18px] font-bold text-[var(--color-text)] group-hover:text-[var(--color-green)] transition-colors duration-200">AstaBill</h3>
                        <span className="font-mono text-[10px] tracking-[0.18em] uppercase px-2 py-0.5 bg-[rgba(34,166,86,0.10)] text-[var(--color-green)] border border-[rgba(34,166,86,0.20)]">Flagship</span>
                      </div>
                      <p className="text-[13px] text-[rgba(var(--ch-text),0.50)]">Cloud business management platform</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {['Invoicing', 'Payments', 'GRA Compliance', 'Analytics', 'Team Collaboration'].map(tag => (
                      <span key={tag} className="font-mono text-[11px] tracking-[0.12em] uppercase px-2.5 py-1 border border-[rgba(var(--ch-border),0.12)] text-[rgba(var(--ch-text),0.38)]">{tag}</span>
                    ))}
                  </div>
                  <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-accent)] group-hover:text-[var(--color-green)] transition-colors duration-200">
                    Explore AstaBill →
                  </p>
                </Link>

                {/* Demo CTA */}
                <div className="w-56 flex flex-col justify-between">
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[rgba(var(--ch-text),0.28)] mb-4">Get Started</p>
                    <p className="text-[14px] text-[rgba(var(--ch-text),0.55)] leading-relaxed mb-6">
                      See AstaBill live in a free 30-minute demo with our product team.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    role="menuitem"
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
        <div
          ref={mobileDialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 bg-[rgba(var(--ch-bg),0.98)] backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8"
        >
          {[
            { href: '/services',  label: 'Solutions' },
            { href: '/products',  label: 'Products' },
            { href: '/work',      label: 'Work' },
            { href: '/about',     label: 'About' },
            { href: '/insights',  label: 'Insights' },
          ].map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              autoFocus={i === 0}
              className="font-serif text-[clamp(28px,6vw,48px)] font-semibold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-4 font-mono text-[13px] tracking-[0.12em] uppercase font-medium bg-[var(--color-green)] text-white px-12 py-5 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
          >
            Start a Project
          </Link>
        </div>
      )}
    </>
  )
}
