'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import type { CaseStudy } from '@/sanity/types'

interface Industry { name: string; img: string }

export function IndustriesWork({
  industries,
  caseStudies,
}: {
  industries: Industry[]
  caseStudies: CaseStudy[]
}) {
  const [active, setActive] = useState<string | null>(null)
  const casesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (active && casesRef.current) {
      casesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [active])

  const filtered = active
    ? caseStudies.filter((cs) => cs.industry === active)
    : caseStudies

  const slugStr = (cs: CaseStudy) => cs.slug.current

  return (
    <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-24">
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 reveal">
          <div>
            <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[#1D4776] mb-5">
              Industries &amp; Work
            </p>
            <h2
              className="font-serif font-black text-[var(--color-text)] leading-[0.92] tracking-[-0.035em]"
              style={{ fontSize: 'clamp(28px,4vw,52px)' }}
            >
              We work where<br />it matters most.
            </h2>
          </div>
          <div className="flex items-center gap-5 mt-6 md:mt-0">
            {active && (
              <button
                onClick={() => setActive(null)}
                className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.45)] hover:text-[#1D4776] transition-colors duration-200"
              >
                ← All industries
              </button>
            )}
            <Link
              href={active ? `/work?industry=${encodeURIComponent(active)}` : '/work'}
              className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.55)] hover:text-[#1D4776] transition-colors duration-200"
            >
              All case studies →
            </Link>
          </div>
        </div>

        {/* Industry cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-14">
          {industries.map(({ name, img }, i) => {
            const isActive = active === name
            const isDimmed = active !== null && !isActive
            return (
              <button
                key={name}
                onClick={() => setActive(isActive ? null : name)}
                className={[
                  'group relative overflow-hidden aspect-[4/3] bg-[var(--color-dark)] w-full text-left [transform:translateZ(0)]',
                  'transition-all duration-300',
                  isDimmed ? 'opacity-35' : 'opacity-100',
                  isActive ? 'ring-1 ring-[#55AA49]' : '',
                ].join(' ')}
                style={{ transitionDelay: `${i * 25}ms` }}
              >
                {/* Photo — slides up on hover, stays revealed when active */}
                <div
                  className={[
                    'absolute inset-0 transition-transform duration-700 ease-out',
                    isActive ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0',
                  ].join(' ')}
                >
                  <Image
                    src={img}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[rgba(10,22,52,0.55)]" />
                </div>

                <div className="absolute inset-0 hero-grid opacity-10 pointer-events-none" />

                <span
                  className="absolute -bottom-3 -right-2 font-serif font-black leading-none select-none pointer-events-none"
                  style={{
                    fontSize: 'clamp(72px,7vw,108px)',
                    color: isActive ? 'rgba(85,170,73,0.14)' : 'rgba(255,255,255,0.05)',
                  }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="relative z-10 h-full flex flex-col justify-between p-5">
                  <span
                    className={[
                      'font-mono text-[10px] tracking-[0.22em] uppercase transition-colors duration-300',
                      isActive ? 'text-[#55AA49]' : 'text-[rgba(255,255,255,0.22)]',
                    ].join(' ')}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p
                      className="font-serif font-bold text-white mb-2.5 leading-tight"
                      style={{ fontSize: 'clamp(15px,1.5vw,20px)' }}
                    >
                      {name}
                    </p>
                    <span
                      className={[
                        'inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] uppercase transition-all duration-300',
                        isActive
                          ? 'text-[#55AA49]'
                          : 'text-[rgba(255,255,255,0)] group-hover:text-[rgba(255,255,255,0.75)] delay-200',
                      ].join(' ')}
                    >
                      {isActive ? 'Selected' : 'Filter'}
                      <span className={isActive ? '' : 'group-hover:translate-x-0.5 transition-transform duration-300'}>
                        {isActive ? '✓' : '→'}
                      </span>
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Divider — count label / scroll anchor */}
        <div ref={casesRef} className="flex items-center gap-5 mb-12 scroll-mt-24">
          <div className="flex-1 h-px bg-[rgba(var(--ch-border),0.10)]" />
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[rgba(var(--ch-text),0.28)] shrink-0">
            {active
              ? `${filtered.length} case stud${filtered.length === 1 ? 'y' : 'ies'} · ${active}`
              : `${caseStudies.length} case studies`}
          </p>
          <div className="flex-1 h-px bg-[rgba(var(--ch-border),0.10)]" />
        </div>

        {/* Case studies grid — keyed on active so fade-in fires on each filter change */}
        <div
          key={active ?? 'all'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in"
        >
          {filtered.length === 0 ? (
            <div className="col-span-full py-20 text-center border border-dashed border-[rgba(var(--ch-accent),0.15)]">
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[rgba(var(--ch-text),0.32)] mb-3">
                No case studies for {active} yet
              </p>
              <p className="text-[14px] text-[rgba(var(--ch-text),0.48)] mb-8 max-w-[38ch] mx-auto leading-relaxed">
                We work in this sector — get in touch to discuss your project.
              </p>
              <Link
                href="/contact"
                className="inline-block font-mono text-[10px] tracking-[0.14em] uppercase bg-[#1D4776] text-white px-8 py-3.5 hover:bg-[#163662] transition-colors duration-200"
              >
                Start a Conversation →
              </Link>
            </div>
          ) : (
            filtered.map((cs, i: number) => (
              <Link
                key={cs._id}
                href={`/work/${slugStr(cs)}`}
                className="group block border border-[rgba(var(--ch-border),0.10)] bg-[var(--color-panel)] hover:border-[rgba(29,71,118,0.28)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {cs.image && (
                  <div className="relative w-full aspect-[16/8] overflow-hidden">
                    <Image
                      src={cs.image}
                      alt={cs.client}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-7">
                  {/* Client name — primary hook */}
                  <h3
                    className="font-serif font-bold text-[var(--color-text)] mb-2 group-hover:text-[#1D4776] transition-colors duration-200 leading-tight"
                    style={{ fontSize: 'clamp(19px,2vw,26px)' }}
                  >
                    {cs.client}
                  </h3>

                  {/* Industry tag */}
                  <span className="inline-block font-mono text-[10px] tracking-[0.18em] uppercase text-[rgba(var(--ch-text),0.40)] border border-[rgba(var(--ch-accent),0.14)] px-2.5 py-1 mb-5">
                    {cs.industry}
                  </span>

                  {/* Summary */}
                  <p className="text-[13px] text-[rgba(var(--ch-text),0.55)] leading-relaxed mb-7">
                    {cs.summary}
                  </p>

                  {/* Metric as supporting evidence */}
                  <div className="pt-5 border-t border-[rgba(var(--ch-accent),0.08)] flex items-baseline gap-3">
                    <span
                      className="font-serif font-black text-[#1D4776] leading-none"
                      style={{ fontSize: 'clamp(24px,2.5vw,36px)' }}
                    >
                      {cs.metric1_num}
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[rgba(var(--ch-text),0.40)] leading-tight">
                      {cs.metric1_label}
                    </span>
                    <span className="ml-auto font-mono text-[12px] text-[rgba(var(--ch-text),0.20)] group-hover:text-[#1D4776] group-hover:translate-x-1 transition-all duration-200">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* View all */}
        {filtered.length > 0 && (
          <div className="text-center mt-12">
            <Link
              href={active ? `/work?industry=${encodeURIComponent(active)}` : '/work'}
              className="inline-block font-mono text-[10px] tracking-[0.16em] uppercase border border-[rgba(var(--ch-accent),0.20)] text-[rgba(var(--ch-text),0.55)] px-9 py-4 hover:border-[rgba(29,71,118,0.45)] hover:text-[#1D4776] transition-all duration-200"
            >
              {active ? `All ${active} work →` : 'All case studies →'}
            </Link>
          </div>
        )}

      </div>
    </section>
  )
}
