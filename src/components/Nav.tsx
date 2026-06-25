'use client'

import { useState, useEffect, useRef, startTransition } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Code2, Server, Users, Receipt, RefreshCw, Zap, ShieldCheck, MonitorCheck, Rocket, TrendingUp, Workflow, Globe, BookOpen, Users2, CreditCard } from 'lucide-react'

type DropdownId = 'solutions' | 'products' | 'bundles' | null

const DARK_PAGES = ['/']

const solutionBundles = [
  {
    Icon: Rocket,
    href: '/solutions/launch',
    title: 'Astacraft Launch™',
    desc: 'Domain, website, email & hosting for startups',
    tag: 'Startups',
    price: 'from GH₵ 2,500',
  },
  {
    Icon: TrendingUp,
    href: '/solutions/growth',
    title: 'Astacraft Growth™',
    desc: 'CRM, automation & collaboration for scaling SMEs',
    tag: 'SMEs',
    price: 'from GH₵ 5,500',
  },
  {
    Icon: Workflow,
    href: '/solutions/operations',
    title: 'Astacraft Operations™',
    desc: 'Workflow automation, portals & document management',
    tag: 'Digitization',
    price: 'from GH₵ 8,500',
  },
  {
    Icon: ShieldCheck,
    href: '/solutions/secure',
    title: 'Astacraft Secure™',
    desc: 'Cybersecurity, endpoint protection & compliance',
    tag: 'Security',
    price: 'from GH₵ 2,000/mo',
  },
  {
    Icon: Globe,
    href: '/solutions/enterprise',
    title: 'Astacraft Enterprise™',
    desc: 'Cloud migration, custom software & transformation',
    tag: 'Enterprise',
    price: 'from GH₵ 5,000',
  },
]

const comingSoonProducts = [
  {
    Icon: BookOpen,
    title: 'AstaBooks',
    desc: 'Accounting, bookkeeping & financial reporting for African SMEs',
    status: 'In Development',
  },
  {
    Icon: Users2,
    title: 'AstaHR',
    desc: 'HR management, payroll & leave tracking',
    status: 'In Design',
  },
  {
    Icon: CreditCard,
    title: 'AstaPay',
    desc: 'Business payments, bulk disbursements & treasury',
    status: 'Planned',
  },
]

const productPlatforms = [
  { Icon: Receipt, href: '/products',              title: 'AstaBill',                        desc: 'Invoicing & payments for African businesses' },
  { Icon: Users,   href: '/services/crm-erp',      title: 'CRM & ERP Implementation',        desc: 'Salesforce, Odoo & SAP deployments' },
  { Icon: Zap,     href: '/services/api-automation', title: 'System Integration & Automation', desc: 'Connect systems, automate workflows end-to-end' },
]

const enterpriseSystems = [
  { Icon: Code2,     href: '/services/software-development',   title: 'Software Development',           desc: 'Web, mobile, SaaS & enterprise apps' },
  { Icon: Server,    href: '/services/cloud-solutions',        title: 'Cloud & Infrastructure',          desc: 'Hosting, migration & managed infra' },
  { Icon: RefreshCw, href: '/services/digital-transformation', title: 'Business Process Transformation', desc: 'Process redesign & digitization' },
  { Icon: ShieldCheck, href: '/services/cybersecurity',        title: 'Cybersecurity & SOC Monitoring',  desc: 'Audits, pen testing & 24/7 monitoring' },
  { Icon: MonitorCheck, href: '/services/it-consulting',       title: 'IT Consulting & Managed Services', desc: 'Strategy, advisory & managed IT' },
]

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
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
    const first = mobileDialogRef.current?.querySelector<HTMLElement>('a, button')
    first?.focus()
  }, [mobileOpen])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

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

  const linkCls = (active: boolean) => `font-mono text-[11px] tracking-[0.12em] uppercase px-4 py-2.5 block transition-colors duration-200 ${
    active
      ? isDarkPage && !scrolled ? 'text-white' : 'text-[var(--color-accent)]'
      : isDarkPage && !scrolled ? 'text-[rgba(255,255,255,0.55)] hover:text-white' : 'text-[rgba(var(--ch-text),0.55)] hover:text-[var(--color-accent)]'
  }`

  const dropdownBtnCls = (active: boolean) => `flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] uppercase px-4 py-2.5 transition-colors duration-200 ${
    active
      ? isDarkPage && !scrolled ? 'text-white' : 'text-[var(--color-accent)]'
      : isDarkPage && !scrolled ? 'text-[rgba(255,255,255,0.55)] hover:text-white' : 'text-[rgba(var(--ch-text),0.55)] hover:text-[var(--color-accent)]'
  }`

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
            <Image
              src={isDarkPage && !scrolled ? '/astacraft-logo-white.svg' : '/astacraft-logo.svg'}
              alt="Astacraft Systems"
              width={191}
              height={44}
              className="h-11 w-auto transition-opacity duration-300"
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1 list-none">

            {/* Solutions — lifecycle bundles */}
            <li
              onMouseEnter={() => openDropdown('bundles')}
              onMouseLeave={scheduleClose}
            >
              <button
                onClick={() => setDropdown(dropdown === 'bundles' ? null : 'bundles')}
                onKeyDown={e => handleTriggerKeyDown(e, 'bundles')}
                aria-haspopup="menu"
                aria-expanded={dropdown === 'bundles'}
                className={dropdownBtnCls(dropdown === 'bundles' || pathname.startsWith('/solutions'))}
              >
                Solutions <ChevronDown open={dropdown === 'bundles'} />
              </button>
            </li>

            {/* Products — first, SaaS-first positioning */}
            <li
              onMouseEnter={() => openDropdown('products')}
              onMouseLeave={scheduleClose}
            >
              <button
                onClick={() => setDropdown(dropdown === 'products' ? null : 'products')}
                onKeyDown={e => handleTriggerKeyDown(e, 'products')}
                aria-haspopup="menu"
                aria-expanded={dropdown === 'products'}
                className={dropdownBtnCls(dropdown === 'products' || pathname.startsWith('/products'))}
              >
                Products <ChevronDown open={dropdown === 'products'} />
              </button>
            </li>

            {/* Enterprise — was Solutions */}
            <li
              onMouseEnter={() => openDropdown('solutions')}
              onMouseLeave={scheduleClose}
            >
              <button
                onClick={() => setDropdown(dropdown === 'solutions' ? null : 'solutions')}
                onKeyDown={e => handleTriggerKeyDown(e, 'solutions')}
                aria-haspopup="menu"
                aria-expanded={dropdown === 'solutions'}
                className={dropdownBtnCls(dropdown === 'solutions' || pathname.startsWith('/services'))}
              >
                Enterprise <ChevronDown open={dropdown === 'solutions'} />
              </button>
            </li>

            {[
              { href: '/work',     label: 'Customers' },
              { href: '/about',    label: 'About' },
              { href: '/insights', label: 'Insights' },
            ].map(l => (
              <li key={l.href} onMouseEnter={() => openDropdown(null)}>
                <Link href={l.href} className={linkCls(pathname.startsWith(l.href))}>
                  {l.label}
                </Link>
              </li>
            ))}

            {/* Dual CTAs */}
            <li className="ml-3 flex items-center gap-2" onMouseEnter={() => openDropdown(null)}>
              <a
                href="https://astabill.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] tracking-[0.12em] uppercase font-medium px-5 py-2.5 bg-[var(--color-green)] text-white hover:bg-[var(--color-green-hover)] transition-colors duration-200"
              >
                Try AstaBill →
              </a>
              <Link
                href="/contact"
                className={`font-mono text-[11px] tracking-[0.12em] uppercase font-medium px-5 py-2.5 border transition-colors duration-200 ${
                  isDarkPage && !scrolled
                    ? 'border-[rgba(255,255,255,0.30)] text-[rgba(255,255,255,0.70)] hover:border-[rgba(255,255,255,0.60)] hover:text-white'
                    : 'border-[rgba(var(--ch-accent),0.30)] text-[rgba(var(--ch-text),0.70)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
                }`}
              >
                Contact Sales
              </Link>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] cursor-pointer p-3 -mr-3 min-w-[44px] min-h-[44px] items-center justify-center"
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

        {/* ── Solutions bundles dropdown ── */}
        {dropdown === 'bundles' && (
          <div
            ref={dropdownContainerRef}
            role="menu"
            className="mega-dropdown hidden md:block bg-[rgba(var(--ch-bg),0.98)] backdrop-blur-2xl border-b border-[rgba(var(--ch-border),0.10)] shadow-[0_24px_80px_rgba(0,0,0,0.12)]"
            onMouseEnter={() => openDropdown('bundles')}
            onMouseLeave={scheduleClose}
            onKeyDown={handleMenuKeyDown}
          >
            <div className="max-w-[1280px] mx-auto px-[clamp(24px,5vw,80px)] py-10">
              <div className="grid grid-cols-[1fr_280px] gap-10">

                {/* Bundle list */}
                <div>
                  <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[var(--color-accent)] mb-6">Business Lifecycle</p>
                  <div className="grid grid-cols-1 gap-0">
                    {solutionBundles.map(({ Icon, href, title, desc, tag, price }) => (
                      <Link
                        key={href}
                        href={href}
                        role="menuitem"
                        className="flex items-start gap-4 py-3.5 border-b border-[rgba(var(--ch-border),0.08)] last:border-0 group transition-colors duration-150"
                      >
                        <div className="w-9 h-9 border border-[rgba(var(--ch-accent),0.12)] flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[var(--color-accent)] group-hover:bg-[rgba(var(--ch-accent),0.06)] transition-all duration-150">
                          <Icon className="w-4 h-4 text-[rgba(var(--ch-accent),0.45)] group-hover:text-[var(--color-accent)] transition-colors duration-150" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="font-mono text-[11px] tracking-[0.06em] font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-150">{title}</p>
                            <span className="font-mono text-[8px] tracking-[0.14em] uppercase px-1.5 py-0.5 bg-[rgba(var(--ch-accent),0.08)] text-[rgba(var(--ch-accent),0.60)] border border-[rgba(var(--ch-accent),0.12)]">{tag}</span>
                            <span className="ml-auto font-mono text-[10px] text-[rgba(var(--ch-text),0.30)] group-hover:text-[rgba(var(--ch-accent),0.55)] transition-colors duration-150 shrink-0">{price}</span>
                          </div>
                          <p className="text-[12px] text-[rgba(var(--ch-text),0.45)] leading-snug">{desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA panel */}
                <div className="bg-[var(--color-accent)] p-8 flex flex-col justify-between">
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[rgba(255,255,255,0.40)] mb-4">Find Your Bundle</p>
                    <h3 className="font-serif text-[20px] font-bold text-white mb-3 leading-tight">
                      From startup<br />to enterprise.
                    </h3>
                    <p className="text-[13px] text-[rgba(255,255,255,0.50)] leading-relaxed mb-6">
                      Every Astacraft bundle is designed for a specific stage of business growth. Start where you are — scale as you grow.
                    </p>
                    <ul className="space-y-2.5 mb-8">
                      {['Fixed-price bundles', 'Managed & supported', 'Upgrade at any stage'].map(item => (
                        <li key={item} className="flex items-center gap-2.5">
                          <span className="w-1 h-1 rounded-full bg-[var(--color-green)] shrink-0" />
                          <span className="text-[12px] text-[rgba(255,255,255,0.45)]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2.5">
                    <Link
                      href="/contact"
                      role="menuitem"
                      className="block font-mono text-[10px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white px-6 py-3 hover:bg-[var(--color-green-hover)] transition-colors duration-200 text-center"
                    >
                      Start a Project →
                    </Link>
                    <Link
                      href="/contact?ref=help-me-choose"
                      role="menuitem"
                      className="block font-mono text-[10px] tracking-[0.12em] uppercase border border-[rgba(255,255,255,0.20)] text-[rgba(255,255,255,0.50)] px-6 py-3 hover:border-[rgba(255,255,255,0.40)] hover:text-white transition-colors duration-200 text-center"
                    >
                      Not sure? We&apos;ll help →
                    </Link>
                  </div>
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
            <div className="max-w-[1280px] mx-auto px-[clamp(24px,5vw,80px)] py-0">
              <div className="grid grid-cols-[1fr_272px] gap-0">

                {/* ── Left: product suite ── */}
                <div className="py-10 pr-10 border-r border-[rgba(var(--ch-border),0.08)]">

                  {/* header row */}
                  <div className="flex items-center justify-between mb-6">
                    <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[rgba(var(--ch-text),0.35)]">Product Suite</p>
                    <span className="font-mono text-[8px] tracking-[0.14em] uppercase px-2 py-0.5 bg-[rgba(34,166,86,0.08)] text-[var(--color-green)] border border-[rgba(34,166,86,0.18)]">
                      1 live · 3 in development
                    </span>
                  </div>

                  {/* AstaBill — live featured row */}
                  <Link
                    href="/products"
                    role="menuitem"
                    className="flex items-center gap-6 border border-[rgba(var(--ch-border),0.10)] bg-[var(--color-surface)] px-5 py-4 mb-7 hover:border-[rgba(34,166,86,0.35)] transition-colors duration-200 group"
                  >
                    <div className="shrink-0">
                      <div className="flex items-center gap-2.5 mb-1">
                        <Image src="/astabill-logo.svg" alt="AstaBill" width={90} height={24} className="h-[22px] w-auto" />
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] animate-pulse shrink-0" />
                          <span className="font-mono text-[8px] tracking-[0.16em] uppercase text-[var(--color-green)]">Live</span>
                        </span>
                      </div>
                      <p className="text-[11px] text-[rgba(var(--ch-text),0.40)]">Invoicing & payments for African businesses</p>
                    </div>
                    <div className="flex items-center gap-6 ml-auto shrink-0">
                      {[
                        { stat: 'GH₵ 2M+', label: 'Processed' },
                        { stat: '<5 min',   label: 'First invoice' },
                        { stat: 'Free',     label: 'To start' },
                      ].map(({ stat, label }) => (
                        <div key={label} className="text-center">
                          <p className="font-serif font-bold text-[var(--color-text)] text-[14px] leading-none mb-0.5">{stat}</p>
                          <p className="font-mono text-[8px] tracking-[0.10em] uppercase text-[rgba(var(--ch-text),0.28)]">{label}</p>
                        </div>
                      ))}
                      <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[rgba(var(--ch-accent),0.50)] group-hover:text-[var(--color-green)] transition-colors duration-200 ml-1">
                        View →
                      </span>
                    </div>
                  </Link>

                  {/* In development divider */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-mono text-[9px] tracking-[0.20em] uppercase text-[rgba(var(--ch-text),0.28)]">In development</span>
                    <span className="flex-1 h-px bg-[rgba(var(--ch-border),0.10)]" />
                  </div>

                  {/* Coming soon cards */}
                  <div className="grid grid-cols-3 gap-3">
                    {comingSoonProducts.map(({ Icon, title, desc, status }) => (
                      <div
                        key={title}
                        className="border border-[rgba(var(--ch-border),0.10)] bg-[var(--color-surface)] p-5 hover:border-[rgba(var(--ch-accent),0.20)] transition-colors duration-200 cursor-default"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-8 h-8 border border-[rgba(var(--ch-accent),0.12)] bg-[rgba(var(--ch-accent),0.04)] flex items-center justify-center">
                            <Icon className="w-3.5 h-3.5 text-[rgba(var(--ch-accent),0.30)]" />
                          </div>
                          <span className={`font-mono text-[8px] tracking-[0.12em] uppercase px-1.5 py-0.5 border ${
                            status === 'In Development'
                              ? 'border-[rgba(var(--ch-accent),0.20)] text-[rgba(var(--ch-accent),0.55)] bg-[rgba(var(--ch-accent),0.05)]'
                              : status === 'In Design'
                              ? 'border-[rgba(var(--ch-border),0.18)] text-[rgba(var(--ch-text),0.40)]'
                              : 'border-[rgba(var(--ch-border),0.12)] text-[rgba(var(--ch-text),0.28)]'
                          }`}>
                            {status}
                          </span>
                        </div>
                        <p className="font-mono text-[11px] tracking-[0.04em] font-medium text-[var(--color-text)] mb-1.5">{title}</p>
                        <p className="text-[11px] text-[rgba(var(--ch-text),0.38)] leading-snug">{desc}</p>
                      </div>
                    ))}
                  </div>

                </div>

                {/* ── Right: navy roadmap panel ── */}
                <div className="bg-[var(--color-accent)] py-10 px-8 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute inset-0 hero-grid opacity-[0.12] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(var(--ch-green),0.10),transparent)] pointer-events-none" />

                  <div className="relative">
                    <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[rgba(255,255,255,0.30)] mb-8">Product Roadmap</p>

                    {/* Timeline */}
                    <div className="relative">
                      <div className="absolute left-[7px] top-2 bottom-0 w-px bg-[rgba(255,255,255,0.07)]" />
                      <div className="space-y-6">

                        {/* AstaBill — live */}
                        <div className="flex items-start gap-4">
                          <div className="relative mt-[3px] shrink-0 w-[15px] flex items-center justify-center">
                            <div className="w-[15px] h-[15px] rounded-full border-2 border-[var(--color-green)] bg-[var(--color-accent)] flex items-center justify-center">
                              <div className="w-[5px] h-[5px] rounded-full bg-[var(--color-green)]" />
                            </div>
                          </div>
                          <div>
                            <p className="font-mono text-[8px] tracking-[0.18em] uppercase text-[var(--color-green)] mb-0.5">Now — Live</p>
                            <p className="font-mono text-[11px] font-medium text-white leading-snug">AstaBill</p>
                            <p className="text-[11px] text-[rgba(255,255,255,0.28)]">Invoicing & payments</p>
                          </div>
                        </div>

                        {comingSoonProducts.map(({ title, desc, status }) => (
                          <div key={title} className="flex items-start gap-4">
                            <div className="mt-[3px] shrink-0 w-[15px] flex items-center justify-center">
                              <div className="w-[13px] h-[13px] rounded-full border border-[rgba(255,255,255,0.18)] bg-[var(--color-accent)]" />
                            </div>
                            <div>
                              <p className="font-mono text-[8px] tracking-[0.16em] uppercase text-[rgba(255,255,255,0.30)] mb-0.5">{status}</p>
                              <p className="font-mono text-[11px] font-medium text-[rgba(255,255,255,0.55)] leading-snug">{title}</p>
                              <p className="text-[11px] text-[rgba(255,255,255,0.22)]">{desc.split(',')[0]}</p>
                            </div>
                          </div>
                        ))}

                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="relative mt-8 pt-7 border-t border-[rgba(255,255,255,0.07)] space-y-2.5">
                    <a
                      href="https://astabill.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      className="block font-mono text-[10px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white px-5 py-3 hover:bg-[var(--color-green-hover)] transition-colors duration-200 text-center"
                    >
                      Try AstaBill Free →
                    </a>
                    <Link
                      href="/contact?ref=product-roadmap"
                      role="menuitem"
                      className="block font-mono text-[10px] tracking-[0.12em] uppercase border border-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.45)] px-5 py-3 hover:border-[rgba(255,255,255,0.30)] hover:text-[rgba(255,255,255,0.70)] transition-colors duration-200 text-center"
                    >
                      Get Early Access
                    </Link>
                  </div>

                </div>

              </div>
            </div>
          </div>
        )}

        {/* ── Enterprise mega-dropdown ── */}
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
              <div className="grid grid-cols-[1fr_1fr_300px] gap-10">

                {/* Column 1: Product Platforms */}
                <div>
                  <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[var(--color-green)] mb-6">Product Platforms</p>
                  <div>
                    {productPlatforms.map(({ Icon, href, title, desc }) => (
                      <Link
                        key={href + title}
                        href={href}
                        role="menuitem"
                        className="flex items-start gap-4 py-3.5 border-b border-[rgba(var(--ch-border),0.08)] last:border-0 group transition-colors duration-150"
                      >
                        <div className="w-9 h-9 border border-[rgba(var(--ch-green),0.18)] flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[var(--color-green)] group-hover:bg-[rgba(var(--ch-green),0.06)] transition-all duration-150">
                          <Icon className="w-4 h-4 text-[rgba(var(--ch-green),0.50)] group-hover:text-[var(--color-green)] transition-colors duration-150" />
                        </div>
                        <div>
                          <p className="font-mono text-[11px] tracking-[0.06em] font-medium text-[var(--color-text)] mb-0.5 group-hover:text-[var(--color-green)] transition-colors duration-150">{title}</p>
                          <p className="text-[12px] text-[rgba(var(--ch-text),0.45)] leading-snug">{desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 2: Enterprise Systems */}
                <div>
                  <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[rgba(var(--ch-text),0.50)] mb-6">Enterprise Solutions</p>
                  <div>
                    {enterpriseSystems.map(({ Icon, href, title, desc }) => (
                      <Link
                        key={href + title}
                        href={href}
                        role="menuitem"
                        className="flex items-start gap-4 py-3.5 border-b border-[rgba(var(--ch-border),0.08)] last:border-0 group transition-colors duration-150"
                      >
                        <div className="w-9 h-9 border border-[rgba(var(--ch-accent),0.12)] flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[var(--color-accent)] group-hover:bg-[rgba(var(--ch-accent),0.06)] transition-all duration-150">
                          <Icon className="w-4 h-4 text-[rgba(var(--ch-accent),0.45)] group-hover:text-[var(--color-accent)] transition-colors duration-150" />
                        </div>
                        <div>
                          <p className="font-mono text-[11px] tracking-[0.06em] font-medium text-[var(--color-text)] mb-0.5 group-hover:text-[var(--color-accent)] transition-colors duration-150">{title}</p>
                          <p className="text-[12px] text-[rgba(var(--ch-text),0.45)] leading-snug">{desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 3: Navy CTA panel */}
                <div className="bg-[var(--color-accent)] p-8 flex flex-col justify-between">
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[rgba(255,255,255,0.40)] mb-6">Our Solutions</p>
                    <h3 className="font-serif text-[20px] font-bold text-white mb-3 leading-tight">
                      SaaS-first.<br />Enterprise-grade.
                    </h3>
                    <p className="text-[13px] text-[rgba(255,255,255,0.50)] leading-relaxed mb-6">
                      Start with AstaBill free, or talk to us about a full enterprise systems engagement.
                    </p>
                    <ul className="space-y-2.5 mb-8">
                      {['Free to start with AstaBill', 'Enterprise systems on demand', 'African businesses, global standards'].map(item => (
                        <li key={item} className="flex items-center gap-2.5">
                          <span className="w-1 h-1 rounded-full bg-[var(--color-green)] shrink-0" />
                          <span className="text-[12px] text-[rgba(255,255,255,0.45)]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <a
                      href="https://astabill.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      className="block font-mono text-[10px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white px-6 py-3 hover:bg-[var(--color-green-hover)] transition-colors duration-200 text-center"
                    >
                      Try AstaBill Free →
                    </a>
                    <Link
                      href="/contact"
                      role="menuitem"
                      className="block font-mono text-[10px] tracking-[0.14em] uppercase border border-[rgba(255,255,255,0.25)] text-[rgba(255,255,255,0.65)] px-6 py-3 hover:border-[rgba(255,255,255,0.50)] hover:text-white transition-colors duration-200 text-center"
                    >
                      Book a Technology Call
                    </Link>
                  </div>
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
            { href: '/solutions', label: 'Solutions' },
            { href: '/products',  label: 'Products' },
            { href: '/services',  label: 'Enterprise' },
            { href: '/work',      label: 'Customers' },
            { href: '/about',     label: 'About' },
            { href: '/insights',  label: 'Insights' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-serif text-[clamp(28px,6vw,48px)] font-semibold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col items-center gap-3 w-full px-12">
            <a
              href="https://astabill.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center font-mono text-[13px] tracking-[0.12em] uppercase font-medium bg-[var(--color-green)] text-white px-12 py-5 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
            >
              Try AstaBill Free →
            </a>
            <Link
              href="/contact"
              className="w-full text-center font-mono text-[13px] tracking-[0.12em] uppercase font-medium border border-[rgba(var(--ch-accent),0.35)] text-[var(--color-text)] px-12 py-4 hover:border-[var(--color-accent)] transition-colors duration-200"
            >
              Contact Sales →
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
