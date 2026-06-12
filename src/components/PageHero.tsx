import Image from 'next/image'
import { type ReactNode } from 'react'

interface Props {
  eyebrow: string
  title: ReactNode
  description: string
  image?: { src: string; alt: string }
}

export default function PageHero({ eyebrow, title, description, image }: Props) {
  return (
    <section className="relative dot-grid bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] mt-[72px] pt-20 pb-24 overflow-hidden">
      {image && (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(11,15,20,0.45)] via-[rgba(11,15,20,0.30)] to-[rgba(11,15,20,0.60)]" />
        </>
      )}
      <div className="relative max-w-[1280px] mx-auto">
        <p className={`font-mono text-[10px] tracking-[0.22em] uppercase mb-6 hero-in hero-in-1 ${image ? 'text-[rgba(255,255,255,0.60)]' : 'text-[var(--color-accent)]'}`}>
          {eyebrow}
        </p>
        <h1
          className={`font-serif font-bold leading-tight mb-6 hero-in hero-in-2 ${image ? 'text-white' : 'text-[var(--color-text)]'}`}
          style={{ fontSize: 'clamp(44px,7vw,88px)' }}
        >
          {title}
        </h1>
        <p className={`text-[clamp(15px,1.2vw,18px)] max-w-2xl leading-relaxed hero-in hero-in-3 ${image ? 'text-[rgba(255,255,255,0.65)]' : 'text-[rgba(var(--ch-text),0.55)]'}`}>
          {description}
        </p>
      </div>
    </section>
  )
}
