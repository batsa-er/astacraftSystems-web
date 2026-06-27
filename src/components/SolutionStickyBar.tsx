'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

interface Props {
  bundle: string
  name: string
  price: string
}

export function SolutionStickyBar({ bundle, name, price }: Props) {
  const [visible, setVisible]     = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 480)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-dark)] border-t border-[rgba(255,255,255,0.08)] px-[clamp(16px,4vw,60px)] py-4 transition-transform duration-300 ease-out ${
        visible && !dismissed ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!visible || dismissed}
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-6">

        {/* Left: bundle + price */}
        <div className="flex items-center gap-5">
          <div className="hidden sm:block">
            <p className="font-mono text-[8px] tracking-[0.18em] uppercase text-[rgba(255,255,255,0.28)] mb-0.5">Selected bundle</p>
            <p className="font-mono text-[11px] text-[rgba(255,255,255,0.65)]">{name}</p>
          </div>
          <div className="hidden sm:block w-px h-8 bg-[rgba(255,255,255,0.10)]" />
          <div>
            <p className="font-mono text-[8px] tracking-[0.18em] uppercase text-[rgba(255,255,255,0.28)] mb-0.5 hidden sm:block">Starting from</p>
            <p className="font-serif font-bold text-white leading-none" style={{ fontSize: 'clamp(16px,1.4vw,20px)' }}>{price}</p>
          </div>
        </div>

        {/* Right: CTAs + dismiss */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href={`/contact?bundle=${bundle}`}
            className="font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white px-6 py-3 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
          >
            Start a Project →
          </Link>
          <a
            href="https://calendly.com/astacraftsystems/technology-strategy-call"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block font-mono text-[10px] tracking-[0.12em] uppercase border border-[rgba(255,255,255,0.20)] text-[rgba(255,255,255,0.50)] px-5 py-3 hover:border-[rgba(255,255,255,0.40)] hover:text-[rgba(255,255,255,0.80)] transition-colors duration-200"
          >
            Book a Call
          </a>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="text-[rgba(255,255,255,0.25)] hover:text-[rgba(255,255,255,0.55)] transition-colors p-1.5 ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  )
}
