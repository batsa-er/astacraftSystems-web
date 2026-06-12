'use client'

import { useState, useEffect, useCallback } from 'react'

type Testimonial = {
  quote: string
  name: string
  role?: string
  initials?: string
}

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setActive(i => (i + 1) % testimonials.length), [testimonials.length])
  const prev = () => setActive(i => (i - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    if (paused || testimonials.length <= 1) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [paused, next, testimonials.length])

  const t = testimonials[active]

  return (
    <div
      className="max-w-3xl mx-auto text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Stars */}
      <div className="inline-flex items-center gap-1 mb-10">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-[#F59E0B] text-lg">★</span>
        ))}
      </div>

      {/* Quote */}
      <blockquote
        key={active}
        className="font-serif font-black text-[var(--color-text)] leading-[1.08] tracking-[-0.02em] mb-10 animate-fade-in"
        style={{ fontSize: 'clamp(24px,3.5vw,44px)' }}
      >
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div key={`author-${active}`} className="flex items-center justify-center gap-4 mb-10 animate-fade-in">
        <div className="w-10 h-10 rounded-full bg-[rgba(var(--ch-accent),0.15)] border border-[rgba(var(--ch-accent),0.30)] flex items-center justify-center shrink-0">
          <span className="font-mono text-[10px] text-[var(--color-accent)]">{t.initials}</span>
        </div>
        <div className="text-left">
          <p className="font-mono text-[12px] tracking-[0.08em] text-[var(--color-text)]">{t.name}</p>
          <p className="font-mono text-[10px] tracking-[0.06em] text-[rgba(var(--ch-text),0.40)]">{t.role}</p>
        </div>
      </div>

      {/* Controls */}
      {testimonials.length > 1 && (
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-8 h-8 border border-[rgba(var(--ch-accent),0.25)] flex items-center justify-center text-[rgba(var(--ch-text),0.40)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-200"
          >
            ←
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === active
                    ? 'w-5 h-[3px] bg-[var(--color-accent)]'
                    : 'w-[3px] h-[3px] bg-[rgba(var(--ch-text),0.20)] hover:bg-[rgba(var(--ch-text),0.40)]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-8 h-8 border border-[rgba(var(--ch-accent),0.25)] flex items-center justify-center text-[rgba(var(--ch-text),0.40)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-200"
          >
            →
          </button>
        </div>
      )}
    </div>
  )
}
