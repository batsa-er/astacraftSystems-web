'use client'

import { useState } from 'react'

type Testimonial = {
  quote: string
  name: string
  role?: string
  initials?: string
}

const arrowCls = 'w-11 h-11 border border-[rgba(var(--ch-accent),0.35)] flex items-center justify-center text-[rgba(var(--ch-text),0.75)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-200'

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0)
  const count = testimonials.length
  const t = testimonials[active]

  return (
    <div className="max-w-3xl mx-auto text-center">
      <div aria-live="polite">
        <blockquote
          key={active}
          className="font-serif font-bold text-[var(--color-text)] leading-[1.15] tracking-[-0.02em] mb-8 animate-fade-in"
          style={{ fontSize: 'clamp(22px,3.2vw,40px)' }}
        >
          &ldquo;{t.quote}&rdquo;
        </blockquote>

        <div className="flex items-center justify-center gap-4 mb-8">
          {t.initials && (
            <div aria-hidden="true" className="w-10 h-10 rounded-full bg-[rgba(var(--ch-accent),0.12)] border border-[rgba(var(--ch-accent),0.30)] flex items-center justify-center shrink-0">
              <span className="font-mono text-[10px] text-[var(--color-accent)]">{t.initials}</span>
            </div>
          )}
          <div className="text-left">
            <p className="font-mono text-[12px] tracking-[0.08em] text-[var(--color-text)]">{t.name}</p>
            {t.role && <p className="font-mono text-[11px] tracking-[0.06em] text-[rgba(var(--ch-text),0.70)]">{t.role}</p>}
          </div>
        </div>
      </div>

      {count > 1 && (
        <div className="flex items-center justify-center gap-5">
          <button onClick={() => setActive((active - 1 + count) % count)} aria-label="Previous testimonial" className={arrowCls}>
            ←
          </button>
          <span className="font-mono text-[11px] tracking-[0.10em] text-[rgba(var(--ch-text),0.70)]">
            {active + 1} / {count}
          </span>
          <button onClick={() => setActive((active + 1) % count)} aria-label="Next testimonial" className={arrowCls}>
            →
          </button>
        </div>
      )}
    </div>
  )
}
