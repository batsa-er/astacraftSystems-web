import Link from 'next/link'

interface Props {
  title: string
  body?: string
  cta: { label: string; href: string }
}

export function CtaBand({ title, body, cta }: Props) {
  return (
    <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />
      <div className="relative max-w-[760px] mx-auto text-center reveal">
        <h2 className="font-serif font-bold text-white leading-tight mb-5" style={{ fontSize: 'clamp(28px,3.5vw,48px)' }}>
          {title}
        </h2>
        {body && <p className="text-[rgba(255,255,255,0.72)] mb-10">{body}</p>}
        <Link
          href={cta.href}
          className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-cta)] text-white px-10 py-4 hover:bg-[var(--color-cta-hover)] transition-colors duration-200"
        >
          {cta.label}
        </Link>
      </div>
    </section>
  )
}
