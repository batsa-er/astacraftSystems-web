'use client'

import { useState } from 'react'

const inputCls = 'w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] px-4 py-3 text-[13px] text-white placeholder:text-[rgba(255,255,255,0.28)] hover:border-[rgba(255,255,255,0.22)] focus:outline-none focus:border-[rgba(255,255,255,0.45)] transition-colors duration-200'

export function NewsletterCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('sending')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
      window.gtag?.('event', 'newsletter_signup', {
        event_category: 'Engagement',
        event_label: 'footer',
      })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="mt-6">
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.50)] mb-3">
          The Infrastructure Brief
        </p>
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] shrink-0" />
          <span className="text-[13px] text-[rgba(255,255,255,0.65)]">You&apos;re in. First issue coming Friday.</span>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-6">
      <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.50)] mb-3">
        The Infrastructure Brief
      </p>
      <p className="text-[12px] text-[rgba(255,255,255,0.42)] mb-3 leading-relaxed">
        Weekly technology insights for African business leaders.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-0">
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your email"
          className={`${inputCls} flex-1`}
          disabled={status === 'sending'}
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="shrink-0 font-mono text-[10px] tracking-[0.12em] uppercase font-medium bg-[var(--color-green)] text-white px-4 hover:bg-[var(--color-green-hover)] transition-colors duration-200 disabled:opacity-60"
        >
          {status === 'sending' ? '…' : '→'}
        </button>
      </form>
      {status === 'error' && (
        <p className="font-mono text-[10px] text-red-400 mt-2 tracking-[0.06em]">
          Something went wrong — try again or email us directly.
        </p>
      )}
    </div>
  )
}
