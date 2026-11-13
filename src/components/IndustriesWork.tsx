import Link from 'next/link'
import type { IndustryConfig } from '@/config/industries'

export function IndustriesWork({ industries }: { industries: IndustryConfig[] }) {
  return (
    <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-20 md:py-24">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 reveal">
          <div>
            <h2
              className="font-serif font-black text-[var(--color-text)] leading-[0.95] tracking-[-0.035em]"
              style={{ fontSize: 'clamp(30px,4.5vw,60px)' }}
            >
              Who we work with
            </h2>
          </div>
          <Link
            href="/industries"
            className="font-mono text-[11px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.70)] hover:text-[var(--color-accent)] transition-colors duration-200 mt-6 md:mt-0"
          >
            All industries →
          </Link>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-l border-[rgba(var(--ch-border),0.12)] list-none reveal">
          {industries.map(({ short, slug, Icon }) => (
            <li key={slug} className="border-r border-b border-[rgba(var(--ch-border),0.12)]">
              <Link
                href={`/industries#${slug}`}
                className="group flex flex-col gap-6 p-6 h-full hover:bg-[var(--color-surface)] transition-colors duration-200"
              >
                <span className="w-10 h-10 border border-[rgba(var(--ch-accent),0.20)] flex items-center justify-center group-hover:border-[var(--color-accent)] transition-colors duration-200">
                  <Icon className="w-4 h-4 text-[var(--color-accent)]" aria-hidden="true" />
                </span>
                <span className="font-serif font-bold text-[var(--color-text)] text-[17px] leading-tight group-hover:text-[var(--color-accent)] transition-colors duration-200">
                  {short}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
