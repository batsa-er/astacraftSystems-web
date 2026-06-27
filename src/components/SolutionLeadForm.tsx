'use client'

import { useState } from 'react'
import { BUNDLE_LABEL_MAP } from '@/config/forms'

interface Props {
  bundle: string
}

const inputCls = 'w-full bg-[rgba(var(--ch-text),0.04)] border border-[rgba(var(--ch-accent),0.15)] px-4 py-3 text-[14px] text-[var(--color-text)] placeholder:text-[rgba(var(--ch-text),0.25)] hover:border-[rgba(var(--ch-accent),0.35)] focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-200'
const labelCls = 'block font-mono text-[11px] tracking-[0.2em] uppercase text-[rgba(var(--ch-text),0.38)] mb-2'

export function SolutionLeadForm({ bundle }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('email', form.email)
      fd.append('phone', form.phone)
      fd.append('service', `bundle-${bundle}`)
      fd.append('message', `Enquiry via ${BUNDLE_LABEL_MAP[bundle] ?? bundle} solution page.`)
      const res = await fetch('/api/contact', { method: 'POST', body: fd })
      if (!res.ok) throw new Error()
      setStatus('sent')
      window.gtag?.('event', 'form_submit', {
        event_category: 'SolutionPage',
        event_label: bundle,
        bundle: `bundle-${bundle}`,
      })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="text-center py-6">
        <div className="w-10 h-10 rounded-full bg-[rgba(var(--ch-green),0.12)] border border-[rgba(var(--ch-green),0.35)] flex items-center justify-center mx-auto mb-4">
          <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="var(--color-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="font-serif font-bold text-[var(--color-text)] text-[18px] mb-2">You&apos;re all set.</p>
        <p className="text-[13px] text-[rgba(var(--ch-text),0.55)] mb-5">
          A senior advisor will be in touch within 24 hours.
        </p>
        <a
          href="https://calendly.com/astacraftsystems/technology-strategy-call"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-mono text-[10px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white px-6 py-3 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
        >
          Book your call now →
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`slf-name-${bundle}`} className={labelCls}>Name *</label>
          <input
            id={`slf-name-${bundle}`} required type="text" autoComplete="name"
            value={form.name} onChange={set('name')}
            className={inputCls} placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor={`slf-email-${bundle}`} className={labelCls}>Work email *</label>
          <input
            id={`slf-email-${bundle}`} required type="email" autoComplete="email"
            value={form.email} onChange={set('email')}
            className={inputCls} placeholder="you@company.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor={`slf-phone-${bundle}`} className={labelCls}>
          Phone{' '}
          <span className="text-[rgba(var(--ch-text),0.28)] normal-case tracking-normal">— optional</span>
        </label>
        <input
          id={`slf-phone-${bundle}`} type="tel" autoComplete="tel"
          value={form.phone} onChange={set('phone')}
          className={inputCls} placeholder="+233 XX XXX XXXX"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-shimmer w-full font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white py-4 hover:bg-[var(--color-green-hover)] transition-colors duration-200 disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Book My Strategy Call →'}
      </button>
      {status === 'error' && (
        <p className="font-mono text-[10px] text-red-500 text-center tracking-[0.06em]">
          Send failed — please try again or email info@astacraftsystems.com
        </p>
      )}
      <p className="font-mono text-[10px] tracking-[0.10em] text-[rgba(var(--ch-text),0.30)] text-center">
        Free 45-min call · No commitment · Response within 24 hours
      </p>
    </form>
  )
}
