'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { urlFor } from '@/sanity/client'
import { Calendar, Clock } from 'lucide-react'
import type { Insight } from '@/sanity/types'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function imgSrc(ins: Insight, w: number, h: number): string {
  return ins.coverImage ? urlFor(ins.coverImage).width(w).height(h).url() : ins.image ?? ''
}

export function InsightsGrid({ insights }: { insights: Insight[] }) {
  const tags = Array.from(new Set(insights.map((i) => i.tag).filter(Boolean))) as string[]
  const [active, setActive] = useState<string | null>(null)

  const filtered = active ? insights.filter((i) => i.tag === active) : insights
  const featured = filtered[0] ?? null
  const rest = filtered.slice(1)

  return (
    <div className="max-w-[1280px] mx-auto">

      {/* Filter pills */}
      <div className="flex items-center gap-2 flex-wrap mb-10 reveal">
        <button
          onClick={() => setActive(null)}
          className={[
            'font-mono text-[10px] tracking-[0.18em] uppercase px-4 py-2 border transition-colors duration-200',
            !active
              ? 'bg-[#1D4776] text-white border-[#1D4776]'
              : 'border-[rgba(var(--ch-accent),0.20)] text-[rgba(var(--ch-text),0.50)] hover:border-[rgba(var(--ch-accent),0.40)] hover:text-[var(--color-accent)]',
          ].join(' ')}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(active === tag ? null : tag)}
            className={[
              'font-mono text-[10px] tracking-[0.18em] uppercase px-4 py-2 border transition-colors duration-200',
              active === tag
                ? 'bg-[#1D4776] text-white border-[#1D4776]'
                : 'border-[rgba(var(--ch-accent),0.20)] text-[rgba(var(--ch-text),0.50)] hover:border-[rgba(var(--ch-accent),0.40)] hover:text-[var(--color-accent)]',
            ].join(' ')}
          >
            {tag}
          </button>
        ))}
        {active && (
          <span className="font-mono text-[10px] tracking-[0.12em] text-[rgba(var(--ch-text),0.30)] ml-2">
            {filtered.length} article{filtered.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Featured article — side-by-side editorial layout */}
      {featured && (
        <Link
          key={`featured-${active ?? 'all'}`}
          href={`/insights/${featured.slug?.current || featured.slug}`}
          className="group block mb-8 border border-[rgba(var(--ch-accent),0.12)] bg-[var(--color-panel)] hover:border-[rgba(var(--ch-accent),0.30)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden reveal animate-fade-in"
        >
          <div className="grid md:grid-cols-[1fr_1fr]">
            {/* Image */}
            {(featured.coverImage || featured.image) && (
              <div className="relative w-full aspect-[4/3] md:aspect-auto overflow-hidden min-h-[280px]">
                <Image
                  src={imgSrc(featured, 800, 600)}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div className="p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase bg-[rgba(29,71,118,0.07)] text-[var(--color-accent)] px-3 py-1.5">
                  Featured
                </span>
                {featured.tag && (
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase px-3 py-1.5 text-[var(--color-accent)] border border-[rgba(var(--ch-accent),0.30)]">
                    {featured.tag}
                  </span>
                )}
              </div>

              <h2
                className="font-serif font-bold text-[var(--color-text)] leading-tight mb-4 group-hover:text-[var(--color-accent)] transition-colors duration-200"
                style={{ fontSize: 'clamp(22px,2.4vw,34px)' }}
              >
                {featured.title}
              </h2>
              <p className="text-[15px] text-[rgba(var(--ch-text),0.55)] leading-relaxed mb-8">
                {featured.excerpt}
              </p>

              <div className="flex items-center gap-4 border-t border-[rgba(var(--ch-accent),0.08)] pt-6 mt-auto">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.1em] text-[rgba(var(--ch-text),0.45)]">
                  <Calendar className="w-3.5 h-3.5" />{formatDate(featured.publishedAt)}
                </span>
                <span className="text-[rgba(var(--ch-text),0.20)]">·</span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.1em] text-[rgba(var(--ch-text),0.45)]">
                  <Clock className="w-3.5 h-3.5" />{featured.readTime}
                </span>
                <span className="ml-auto font-mono text-[11px] tracking-[0.12em] uppercase text-[rgba(var(--ch-text),0.22)] group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5 transition-all duration-200">
                  Read →
                </span>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Grid header */}
      {rest.length > 0 && (
        <div className="flex items-center gap-5 mb-8 reveal">
          <div className="flex-1 h-px bg-[rgba(var(--ch-border),0.10)]" />
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[rgba(var(--ch-text),0.28)] shrink-0">
            {active ? `${rest.length} more in ${active}` : 'More insights'}
          </p>
          <div className="flex-1 h-px bg-[rgba(var(--ch-border),0.10)]" />
        </div>
      )}

      {/* Grid */}
      {rest.length > 0 && (
        <div key={active ?? 'all'} className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          {rest.map((ins, i: number) => (
            <Link
              key={ins._id}
              href={`/insights/${ins.slug?.current || ins.slug}`}
              className="group flex flex-col border border-[rgba(var(--ch-accent),0.12)] bg-[var(--color-panel)] hover:border-[rgba(var(--ch-accent),0.30)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {(ins.coverImage || ins.image) && (
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <Image
                    src={imgSrc(ins, 600, 340)}
                    alt={ins.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-8 flex flex-col flex-1">
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase px-3 py-1 text-[var(--color-accent)] border border-[rgba(var(--ch-accent),0.30)] self-start mb-5">
                  {ins.tag}
                </span>
                <h2 className="font-serif text-[20px] font-semibold text-[var(--color-text)] leading-snug mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-200">
                  {ins.title}
                </h2>
                <p className="text-[13px] text-[rgba(var(--ch-text),0.50)] leading-relaxed flex-1 mb-6">
                  {ins.excerpt}
                </p>
                <div className="flex items-center gap-3 border-t border-[rgba(var(--ch-accent),0.08)] pt-5">
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.1em] text-[rgba(var(--ch-text),0.40)]">
                    <Calendar className="w-3 h-3" />{formatDate(ins.publishedAt)}
                  </span>
                  <span className="text-[rgba(var(--ch-text),0.20)]">·</span>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.1em] text-[rgba(var(--ch-text),0.40)]">
                    <Clock className="w-3 h-3" />{ins.readTime}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-24 text-center border border-dashed border-[rgba(var(--ch-accent),0.15)]">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[rgba(var(--ch-text),0.32)] mb-3">
            No articles in this category yet
          </p>
          <button
            onClick={() => setActive(null)}
            className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-accent)] hover:underline mt-2"
          >
            View all insights →
          </button>
        </div>
      )}

    </div>
  )
}
