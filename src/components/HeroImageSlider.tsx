'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

type Slide = { src: string; alt: string }

const fallbackSlides: Slide[] = [
  {
    src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&h=1100&q=85&auto=format&fit=crop',
    alt: 'Creative team at work',
  },
  {
    src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&h=1100&q=85&auto=format&fit=crop',
    alt: 'Brand strategy session',
  },
  {
    src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&h=1100&q=85&auto=format&fit=crop',
    alt: 'Design in progress',
  },
  {
    src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=900&h=1100&q=85&auto=format&fit=crop',
    alt: 'Creative studio',
  },
]

export default function HeroImageSlider({ slides, className }: { slides?: Slide[]; className?: string }) {
  const images = slides?.length ? slides : fallbackSlides
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent(i => (i + 1) % images.length), 5000)
    return () => clearInterval(t)
  }, [images.length])

  return (
    <div className={`overflow-hidden ${className ?? 'relative aspect-[3/2] lg:aspect-[4/5]'}`}>
      {images.map(({ src, alt }, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-[1200ms]"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <div
            className="absolute inset-0"
            style={{
              animation: i === current ? 'kenburns 7s ease-out forwards' : 'none',
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              priority={i === 0}
            />
          </div>
        </div>
      ))}
      <div className="absolute inset-0 bg-[rgba(var(--ch-accent),0.06)] pointer-events-none" />
    </div>
  )
}
