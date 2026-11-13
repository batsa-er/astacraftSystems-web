'use client'

import { useState, useEffect, useRef, startTransition } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { PRODUCTS, SITE } from '@/config/site'

export interface NavLink {
  href: string
  label: string
}

const DARK_PAGES = ['/']

export default function Nav({ links }: { links: NavLink[] }) {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname        = usePathname()
  const mobileDialogRef = useRef<HTMLDivElement>(null)
  const menuButtonRef   = useRef<HTMLButtonElement>(null)

  const isDarkPage = DARK_PAGES.includes(pathname)
  const onDark = isDarkPage && !scrolled && !mobileOpen

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { startTransition(() => setMobileOpen(false)) }, [pathname])

  useEffect(() => {
    if (!mobileOpen) return
    const el = mobileDialogRef.current
    const focusable = () => [
      ...(menuButtonRef.current ? [menuButtonRef.current] : []),
      ...Array.from(el?.querySelectorAll<HTMLElement>('a, button') ?? []),
    ]
    el?.querySelector<HTMLElement>('a')?.focus()
    document.body.style.overflow = 'hidden'

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        menuButtonRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      const items = focusable()
      if (!items.length) return
      const first = items[0]
      const last  = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', handler)
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const linkCls = (active: boolean) => `font-mono text-[11px] tracking-[0.12em] uppercase px-3 xl:px-4 py-2.5 block transition-colors duration-200 ${
    active
      ? onDark ? 'text-white' : 'text-[var(--color-accent)]'
      : onDark ? 'text-[rgba(255,255,255,0.78)] hover:text-white' : 'text-[rgba(var(--ch-text),0.72)] hover:text-[var(--color-accent)]'
  }`

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <nav
          aria-label="Main"
          className={`flex items-center justify-between px-[clamp(24px,5vw,80px)] h-[72px] transition-colors duration-300 border-b ${
            onDark
              ? 'bg-transparent border-transparent'
              : 'bg-[rgba(var(--ch-bg),0.97)] backdrop-blur-xl border-[rgba(var(--ch-border),0.10)] shadow-sm'
          }`}
        >
          <Link href="/" className="shrink-0" aria-label={`${SITE.companyShort} home`}>
            <Image
              src={onDark ? '/astacraft-logo-white.svg' : '/astacraft-logo.svg'}
              alt={SITE.companyShort}
              width={191}
              height={44}
              priority
              className="h-10 sm:h-11 w-auto"
            />
          </Link>

          <ul className="hidden lg:flex items-center gap-0.5 list-none">
            {links.map(l => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={pathname.startsWith(l.href) ? 'page' : undefined}
                  className={linkCls(pathname.startsWith(l.href))}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="ml-3 flex items-center gap-2">
              <Link
                href="/contact"
                className="font-mono text-[11px] tracking-[0.12em] uppercase font-medium px-5 py-2.5 bg-[var(--color-cta)] text-white hover:bg-[var(--color-cta-hover)] transition-colors duration-200"
              >
                Book a consultation
              </Link>
              <a
                href={PRODUCTS.astabill.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-mono text-[11px] tracking-[0.12em] uppercase font-medium px-5 py-2.5 border transition-colors duration-200 ${
                  onDark
                    ? 'border-[rgba(255,255,255,0.40)] text-white hover:border-white'
                    : 'border-[rgba(var(--ch-accent),0.40)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
                }`}
              >
                Try {PRODUCTS.astabill.name} free
              </a>
            </li>
          </ul>

          <button
            ref={menuButtonRef}
            className="lg:hidden flex flex-col gap-[5px] cursor-pointer p-3 -mr-3 min-w-[44px] min-h-[44px] items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {['top', 'mid', 'bot'].map((pos) => (
              <span
                key={pos}
                className={`block w-6 h-[1.5px] transition-all duration-300 ${
                  onDark ? 'bg-white' : 'bg-[var(--color-text)]'
                } ${
                  pos === 'top' && mobileOpen ? 'translate-y-[6.5px] rotate-45' :
                  pos === 'mid' && mobileOpen ? 'opacity-0 scale-x-0' :
                  pos === 'bot' && mobileOpen ? '-translate-y-[6.5px] -rotate-45' : ''
                }`}
              />
            ))}
          </button>
        </nav>
      </div>

      {mobileOpen && (
        <div
          ref={mobileDialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 bg-[var(--color-bg)] z-40 flex flex-col items-center justify-center gap-6 pt-[72px] overflow-y-auto"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-serif text-[clamp(26px,6vw,44px)] font-semibold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col items-center gap-3 w-full px-8 pb-8">
            <Link
              href="/contact"
              className="w-full text-center font-mono text-[13px] tracking-[0.12em] uppercase font-medium bg-[var(--color-cta)] text-white px-6 py-4 hover:bg-[var(--color-cta-hover)] transition-colors duration-200"
            >
              Book a consultation
            </Link>
            <a
              href={PRODUCTS.astabill.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center font-mono text-[13px] tracking-[0.12em] uppercase font-medium border border-[rgba(var(--ch-accent),0.40)] text-[var(--color-text)] px-6 py-4 hover:border-[var(--color-accent)] transition-colors duration-200"
            >
              Try {PRODUCTS.astabill.name} free
            </a>
          </div>
        </div>
      )}
    </>
  )
}
