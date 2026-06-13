import Image from 'next/image'
import Link from 'next/link'
import { type ReactNode } from 'react'

interface Props {
  eyebrow: string
  title: ReactNode
  description: string
  image?: { src: string; alt: string }
  cta?: { label: string; href: string }
}

export default function PageHero({ eyebrow, title, description, image, cta }: Props) {
  return (
    <section className="relative bg-[#060C18] px-[clamp(24px,5vw,80px)] mt-[72px] pt-24 pb-24 overflow-hidden">
      {image && (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover opacity-20"
            priority
          />
        </>
      )}
      <div className="absolute inset-0 hero-grid opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(29,71,118,0.22)_0%,transparent_60%)] pointer-events-none" />
      <div className="relative max-w-[1280px] mx-auto">
        <p className="font-mono text-[9px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.50)] mb-6 hero-in hero-in-1">
          {eyebrow}
        </p>
        <h1
          className="font-serif font-black text-white leading-[0.90] tracking-[-0.035em] mb-8 hero-in hero-in-2"
          style={{ fontSize: 'clamp(44px,7vw,88px)' }}
        >
          {title}
        </h1>
        <p className="text-[rgba(255,255,255,0.62)] max-w-[55ch] leading-relaxed hero-in hero-in-3" style={{ fontSize: 'clamp(15px,1.2vw,18px)' }}>
          {description}
        </p>
        {cta && (
          <div className="mt-10 hero-in hero-in-4">
            <Link
              href={cta.href}
              className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[#55AA49] text-white px-10 py-4 hover:bg-[#489A3E] transition-colors duration-200"
            >
              {cta.label}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
