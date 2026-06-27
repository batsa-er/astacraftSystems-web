import Link from 'next/link'
import Image from 'next/image'
import type { IndustryConfig } from '@/config/industries'

export function IndustriesWork({ industries }: { industries: IndustryConfig[] }) {
  return (
    <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-24">
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 reveal">
          <div>
            <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[var(--color-accent)] mb-5">
              Industries
            </p>
            <h2
              className="font-serif font-black text-[var(--color-text)] leading-[0.92] tracking-[-0.035em]"
              style={{ fontSize: 'clamp(28px,4vw,52px)' }}
            >
              We work where<br />it matters most.
            </h2>
          </div>
          <Link
            href="/work"
            className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.45)] hover:text-[var(--color-accent)] transition-colors duration-200 mt-6 md:mt-0"
          >
            All case studies →
          </Link>
        </div>

        {/* Industry cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {industries.map(({ name, slug, desc, img, Icon }, i) => (
            <Link
              key={slug}
              href={`/industries/${slug}`}
              className="group relative overflow-hidden aspect-[4/3] bg-[var(--color-dark)] reveal [transform:translateZ(0)]"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {/* Background image — low opacity at rest, brightens on hover */}
              <Image
                src={img}
                alt={name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover opacity-[0.22] group-hover:opacity-[0.55] transition-opacity duration-500"
              />

              {/* Gradient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,22,52,0.92)] via-[rgba(10,22,52,0.50)] to-[rgba(10,22,52,0.20)]" />

              {/* Content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div className="w-8 h-8 border border-[rgba(255,255,255,0.15)] flex items-center justify-center group-hover:border-[var(--color-accent)] group-hover:bg-[rgba(var(--ch-accent),0.15)] transition-all duration-300">
                    <Icon className="w-3.5 h-3.5 text-[rgba(255,255,255,0.45)] group-hover:text-[var(--color-accent)] transition-colors duration-300" />
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.16em] text-[rgba(255,255,255,0.20)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Bottom row */}
                <div>
                  <p
                    className="font-serif font-bold text-white mb-1 leading-tight"
                    style={{ fontSize: 'clamp(13px,1.3vw,17px)' }}
                  >
                    {name}
                  </p>
                  <p className="text-[11px] text-[rgba(255,255,255,0.42)] leading-snug mb-3">{desc}</p>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0)] group-hover:text-[rgba(255,255,255,0.70)] transition-all duration-300 translate-x-0 group-hover:translate-x-0.5">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
