'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { CaseStudy } from '@/sanity/types'

export default function WorkGrid({ caseStudies, defaultIndustry }: { caseStudies: CaseStudy[], defaultIndustry?: string }) {
  const [active, setActive] = useState<string | null>(defaultIndustry ?? null)

  const industries: string[] = Array.from(new Set(caseStudies.map((cs) => cs.industry))).filter(Boolean) as string[]
  const filtered = active ? caseStudies.filter((cs) => cs.industry === active) : caseStudies

  return (
    <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] pb-28">
      <div className="max-w-[1280px] mx-auto">

        {/* Industry filter */}
        <div className="flex flex-wrap gap-2 mb-10 pt-10 border-t border-[rgba(var(--ch-accent),0.08)]">
          <button
            onClick={() => setActive(null)}
            className={`font-mono text-[11px] tracking-[0.14em] uppercase px-4 py-2 transition-colors duration-150 ${
              active === null
                ? 'bg-[var(--color-accent)] text-white'
                : 'border border-[rgba(var(--ch-accent),0.20)] text-[rgba(var(--ch-text),0.50)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
            }`}
          >
            All
          </button>
          {industries.map(ind => (
            <button
              key={ind}
              onClick={() => setActive(ind)}
              className={`font-mono text-[11px] tracking-[0.14em] uppercase px-4 py-2 transition-colors duration-150 ${
                active === ind
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'border border-[rgba(var(--ch-accent),0.20)] text-[rgba(var(--ch-text),0.50)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cs, i: number) => (
            <Link
              key={cs._id}
              href={`/work/${cs.slug.current}`}
              className="group flex flex-col border border-[rgba(var(--ch-border),0.12)] bg-[var(--color-panel)] hover:border-[rgba(var(--ch-accent),0.35)] hover:-translate-y-1 transition-all duration-300 overflow-hidden reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {cs.image && (
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <Image
                    src={cs.image}
                    alt={cs.client}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase px-3 py-1 text-[var(--color-accent)] border border-[rgba(var(--ch-accent),0.30)]">
                    {cs.industry}
                  </span>
                  <span className="font-mono text-[10px] text-[rgba(var(--ch-text),0.30)] group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5 transition-all duration-200">→</span>
                </div>
                <h2
                  className="font-serif font-bold text-[var(--color-text)] mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-200 leading-tight"
                  style={{ fontSize: 'clamp(19px,1.8vw,24px)' }}
                >
                  {cs.client}
                </h2>
                <p className="text-[13px] text-[rgba(var(--ch-text),0.50)] leading-relaxed flex-1 mb-7">{cs.summary}</p>
                <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[rgba(var(--ch-accent),0.08)]">
                  {[
                    [cs.metric1_num, cs.metric1_label],
                    [cs.metric2_num, cs.metric2_label],
                    [cs.metric3_num, cs.metric3_label],
                  ].filter(([n]) => n).map(([num, label]) => (
                    <div key={label}>
                      <p
                        className="font-serif font-black text-[#1D4776] leading-none mb-1"
                        style={{ fontSize: 'clamp(18px,2vw,26px)' }}
                      >
                        {num}
                      </p>
                      <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-[rgba(var(--ch-text),0.40)] leading-snug">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
