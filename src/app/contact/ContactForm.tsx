'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CONTACT_CONSENT, CONTACT_TOPICS } from '@/config/forms'
import { SITE } from '@/config/site'
import { inputCls, labelCls, submitCls, consentCls, checkboxCls } from '@/lib/formStyles'

const EMPTY = { name: '', company: '', phone: '', email: '', topic: '', message: '', website: '' }

export default function ContactForm() {
  const requested = useSearchParams().get('topic') ?? ''
  const initialTopic = CONTACT_TOPICS.some(t => t.value === requested) ? requested : ''

  const [form, setForm] = useState({ ...EMPTY, topic: initialTopic })
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'invalid' | 'error'>('idle')

  const set = (field: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, consent }),
      })
      if (res.status === 400) { setStatus('invalid'); return }
      if (!res.ok) throw new Error()
      setStatus('sent')
      window.gtag?.('event', 'form_submit', { event_category: 'Contact', event_label: form.topic })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="border border-[rgba(var(--ch-green),0.50)] bg-[var(--color-panel)] p-8 md:p-10">
        <h2 className="font-serif font-bold text-[var(--color-text)] text-[24px] leading-tight mb-3">Message sent.</h2>
        <p className="text-[15px] text-[rgba(var(--ch-text),0.80)] leading-relaxed">
          Thank you. We&rsquo;ll reply within one working day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="border border-[rgba(var(--ch-border),0.14)] bg-[var(--color-panel)] p-6 sm:p-8 space-y-5">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-name" className={labelCls}>Name</label>
          <input id="cf-name" required type="text" autoComplete="name" maxLength={100} value={form.name} onChange={set('name')} className={inputCls} />
        </div>
        <div>
          <label htmlFor="cf-company" className={labelCls}>Company <span className="normal-case tracking-normal">(optional)</span></label>
          <input id="cf-company" type="text" autoComplete="organization" maxLength={200} value={form.company} onChange={set('company')} className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-phone" className={labelCls}>Phone</label>
          <input id="cf-phone" required type="tel" inputMode="tel" autoComplete="tel" maxLength={20} pattern="\+?[\d\s()\-]{7,20}" value={form.phone} onChange={set('phone')} className={inputCls} placeholder="+233 XX XXX XXXX" />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelCls}>Email</label>
          <input id="cf-email" required type="email" autoComplete="email" maxLength={254} value={form.email} onChange={set('email')} className={inputCls} />
        </div>
      </div>

      <div>
        <label htmlFor="cf-topic" className={labelCls}>What would you like help with?</label>
        <select id="cf-topic" required value={form.topic} onChange={set('topic')} className={inputCls}>
          <option value="" disabled>Select an option</option>
          {CONTACT_TOPICS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className={labelCls}>Message</label>
        <textarea id="cf-message" required rows={5} maxLength={5000} value={form.message} onChange={set('message')} className={`${inputCls} resize-y`} />
      </div>

      <label className={consentCls}>
        <input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)} className={checkboxCls} />
        <span>{CONTACT_CONSENT}</span>
      </label>

      <button type="submit" disabled={status === 'sending'} className={submitCls}>
        {status === 'sending' ? 'Sending…' : 'Send'}
      </button>

      <div role="alert">
        {status === 'invalid' && (
          <p className="text-[14px] text-[#B91C1C]">Please check the form: the phone number and email must be valid, and every field except company is required.</p>
        )}
        {status === 'error' && (
          <p className="text-[14px] text-[#B91C1C]">
            We couldn&rsquo;t send your message. Please try again, or email{' '}
            <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>.
          </p>
        )}
      </div>
    </form>
  )
}
