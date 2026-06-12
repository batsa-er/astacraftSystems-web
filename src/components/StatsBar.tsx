'use client'

import { useEffect, useRef, useState } from 'react'
import {
  TrendingUpIcon, UsersIcon, CurrencyIcon, ShieldCheckIcon,
} from '@/components/Icons'

const stats = [
  { Icon: TrendingUpIcon, num: '200+',  label: 'Businesses served across Africa' },
  { Icon: UsersIcon,      num: '50+',   label: 'Certified technology professionals' },
  { Icon: CurrencyIcon,   num: '$28M',  label: 'In client revenue powered by our systems' },
  { Icon: ShieldCheckIcon,num: '98%',   label: 'Client satisfaction rate' },
]

function parse(raw: string): { prefix: string; value: number; suffix: string; decimals: number } {
  const prefix = raw.match(/^[^0-9]*/)?.[0] ?? ''
  const suffix = raw.match(/[^0-9.]+$/)?.[0] ?? ''
  const value  = parseFloat(raw.replace(prefix, '').replace(suffix, ''))
  const decimals = (raw.includes('.') ? raw.split('.')[1]?.replace(/[^0-9]/g, '').length : 0) ?? 0
  return { prefix, value, suffix, decimals }
}

function useCountUp(target: number, decimals: number, active: boolean) {
  const [display, setDisplay] = useState(0)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    if (!active) return
    const duration = 1600
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(parseFloat((eased * target).toFixed(decimals)))
      if (progress < 1) raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)
    return () => { if (raf.current) cancelAnimationFrame(raf.current) }
  }, [active, target, decimals])

  return display
}

function StatItem({ Icon, num, label, active }: { Icon: React.FC<{ className?: string }>; num: string; label: string; active: boolean }) {
  const { prefix, value, suffix, decimals } = parse(num)
  const count = useCountUp(value, decimals, active)

  return (
    <div>
      <Icon className="w-5 h-5 text-[var(--color-accent)] mb-3 opacity-60" />
      <p
        className="font-serif font-bold text-[var(--color-text)] mb-1 tabular-nums"
        style={{ fontSize: 'clamp(36px,5vw,64px)', lineHeight: 1 }}
      >
        {prefix}{count.toFixed(decimals)}{suffix}
      </p>
      <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.40)]">{label}</p>
    </div>
  )
}

export default function StatsBar() {
  const ref  = useRef<HTMLElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect() } },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="bg-[var(--color-surface)] border-t-[3px] border-t-[var(--color-accent)] border-b border-b-[rgba(var(--ch-accent),0.08)] px-[clamp(24px,5vw,80px)] py-16"
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map(({ Icon, num, label }, i) => (
          <div key={label} className="reveal-scale" style={{ transitionDelay: `${i * 90}ms` }}>
            <StatItem Icon={Icon} num={num} label={label} active={active} />
          </div>
        ))}
      </div>
    </section>
  )
}
