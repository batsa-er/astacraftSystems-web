'use client'

import { useState } from 'react'
import { WAITLIST_INDUSTRIES } from '@/config/forms'
import { DONDO_CONSENT } from '@/config/dondo'
import { SITE } from '@/config/site'
import { inputCls, labelCls, submitCls, consentCls, checkboxCls } from '@/lib/formStyles'

const EMPTY = { name: '', business: '', phone: '', email: '', industry: '', staff: '', website: '' }

export function WaitlistForm() {
  const [form, setForm] = useState(EMPTY)
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'invalid' | 'error'>('idle')

  const set = (field: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, consent }),
      })
      if (res.status === 400) { setStatus('invalid'); return }
      if (!res.ok) throw new Error()
      setStatus('sent')
      window.gtag?.('event', 'dondo_waitlist_signup', { event_category: 'Dondo', industry: form.industry })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="border border-[rgba(var(--ch-green),0.50)] bg-[var(--color-panel)] p-8 md:p-10">
        <h3 className="font-serif font-bold text-[var(--color-text)] text-[24px] leading-tight mb-3">You&rsquo;re on the pilot waitlist.</h3>
        <p className="text-[15px] text-[rgba(var(--ch-text),0.80)] leading-relaxed">
          Thank you. We&rsquo;ve received your details and will contact you about Dondo by WhatsApp or email.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="border border-[rgba(var(--ch-border),0.14)] bg-[var(--color-panel)] p-6 sm:p-8 space-y-5">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="wl-website">Website</label>
        <input id="wl-website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="wl-name" className={labelCls}>Name</label>
          <input id="wl-name" required type="text" autoComplete="name" maxLength={100} value={form.name} onChange={set('name')} className={inputCls} />
        </div>
        <div>
          <label htmlFor="wl-business" className={labelCls}>Business name</label>
          <input id="wl-business" required type="text" autoComplete="organization" maxLength={200} value={form.business} onChange={set('business')} className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="wl-phone" className={labelCls}>Phone (WhatsApp)</label>
          <input id="wl-phone" required type="tel" inputMode="tel" autoComplete="tel" maxLength={20} pattern="\+?[\d\s()\-]{7,20}" value={form.phone} onChange={set('phone')} className={inputCls} placeholder="+233 XX XXX XXXX" />
        </div>
        <div>
          <label htmlFor="wl-email" className={labelCls}>Email</label>
          <input id="wl-email" required type="email" autoComplete="email" maxLength={254} value={form.email} onChange={set('email')} className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="wl-industry" className={labelCls}>Industry</label>
          <select id="wl-industry" required value={form.industry} onChange={set('industry')} className={inputCls}>
            <option value="" disabled>Select an industry</option>
            {WAITLIST_INDUSTRIES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="wl-staff" className={labelCls}>Number of staff who answer customers</label>
          <input id="wl-staff" required type="number" inputMode="numeric" min={1} max={10000} value={form.staff} onChange={set('staff')} className={inputCls} />
        </div>
      </div>

      <label className={consentCls}>
        <input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)} className={checkboxCls} />
        <span>{DONDO_CONSENT}</span>
      </label>

      <button type="submit" disabled={status === 'sending'} className={submitCls}>
        {status === 'sending' ? 'Sending…' : 'Join the pilot'}
      </button>

      <div role="alert">
        {status === 'invalid' && (
          <p className="text-[14px] text-[#B91C1C]">Please check the form: every field is required, and the phone number and email must be valid.</p>
        )}
        {status === 'error' && (
          <p className="text-[14px] text-[#B91C1C]">
            We couldn&rsquo;t send your details. Please try again, or email{' '}
            <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>.
          </p>
        )}
      </div>
    </form>
  )
}
