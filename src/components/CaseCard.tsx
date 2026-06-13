'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface Props {
  slug: string
  client: string
  industry: string
  summary: string
  metric1_num: string
  metric1_label: string
  metric2_num: string
  metric2_label: string
  metric3_num: string
  metric3_label: string
  accent: string
  image?: string
}

function accentFor(accent: string) {
  if (accent === 'cyan') return { border: '#0891B2', text: '#0891B2', bg: 'rgba(8,145,178,0.06)' }
  if (accent === 'gold') return { border: '#D97706', text: '#D97706', bg: 'rgba(217,119,6,0.06)' }
  return { border: '#2563EB', text: '#2563EB', bg: 'rgba(37,99,235,0.06)' }
}

export default function CaseCard({ slug, client, industry, summary, metric1_num, metric1_label, metric2_num, metric2_label, metric3_num, metric3_label, accent, image }: Props) {
  const acc = accentFor(accent)
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={`/work/${slug}`}
      className="group block border transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      style={{
        borderColor: hovered ? acc.border : 'rgba(15,23,42,0.12)',
        backgroundColor: hovered ? acc.bg : '#FFFFFF',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Cover image */}
      {image && (
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={image}
            alt={client}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <span
            className="font-mono text-[11px] tracking-[0.2em] uppercase px-3 py-1.5"
            style={{ color: acc.text, border: `1px solid ${acc.border}`, opacity: 0.85 }}
          >
            {industry}
          </span>
          <span className="font-mono text-[10px] text-[rgba(var(--ch-text),0.28)] group-hover:translate-x-1 transition-transform duration-200">→</span>
        </div>

        <h3 className="font-serif text-[22px] font-semibold text-[var(--color-text)] mb-3">{client}</h3>
        <p className="text-[13px] text-[rgba(var(--ch-text),0.50)] leading-relaxed mb-8">{summary}</p>

        <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[rgba(var(--ch-accent),0.08)]">
          {[
            [metric1_num, metric1_label],
            [metric2_num, metric2_label],
            [metric3_num, metric3_label],
          ].map(([num, label]) => (
            <div key={label}>
              <p className="font-serif text-[20px] font-bold mb-0.5" style={{ color: acc.text }}>{num}</p>
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[rgba(var(--ch-text),0.35)]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </Link>
  )
}
