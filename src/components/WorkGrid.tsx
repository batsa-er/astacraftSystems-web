'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

function accentFor(accent: string) {
  if (accent === 'cyan') return { border: '#0891B2', text: '#0891B2', bg: 'rgba(8,145,178,0.06)' }
  if (accent === 'gold') return { border: '#D97706', text: '#D97706', bg: 'rgba(217,119,6,0.06)' }
  return { border: '#2563EB', text: '#2563EB', bg: 'rgba(37,99,235,0.06)' }
}

export default function WorkGrid({ caseStudies }: { caseStudies: any[] }) {
  const [active, setActive] = useState<string | null>(null)

  const industries: string[] = Array.from(new Set(caseStudies.map((cs: any) => cs.industry))).filter(Boolean) as string[]
  const filtered = active ? caseStudies.filter((cs: any) => cs.industry === active) : caseStudies

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
          {filtered.map((cs: any, i: number) => {
            const acc = accentFor(cs.accent)
            return (
              <Link
                key={cs._id}
                href={`/work/${cs.slug?.current || cs.slug}`}
                className="group block border border-[rgba(var(--ch-border),0.12)] bg-[var(--color-panel)] hover:border-[rgba(var(--ch-accent),0.40)] hover:-translate-y-1 transition-all duration-300 overflow-hidden reveal"
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

                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="font-mono text-[11px] tracking-[0.2em] uppercase px-3 py-1.5"
                      style={{ color: acc.text, border: `1px solid ${acc.border}` }}
                    >
                      {cs.industry}
                    </span>
                    <span className="font-mono text-[10px] text-[rgba(var(--ch-text),0.28)] group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </div>
                  <h2 className="font-serif text-[24px] font-semibold text-[var(--color-text)] mb-3">{cs.client}</h2>
                  <p className="text-[13px] text-[rgba(var(--ch-text),0.50)] leading-relaxed mb-8">{cs.summary}</p>
                  <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[rgba(var(--ch-accent),0.08)]">
                    {[
                      [cs.metric1_num, cs.metric1_label],
                      [cs.metric2_num, cs.metric2_label],
                      [cs.metric3_num, cs.metric3_label],
                    ].map(([num, label]) => (
                      <div key={label}>
                        <p className="font-serif text-[20px] font-bold mb-0.5" style={{ color: acc.text }}>{num}</p>
                        <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-[rgba(var(--ch-text),0.35)]">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
