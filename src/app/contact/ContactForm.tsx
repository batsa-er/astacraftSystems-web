'use client'

import Link from 'next/link'
import { useState } from 'react'

const SERVICES = [
  { value: 'software-development',  label: 'Software Development' },
  { value: 'digital-transformation', label: 'Digital Transformation' },
  { value: 'cloud-solutions',        label: 'Cloud & Infrastructure' },
  { value: 'cybersecurity',          label: 'Cybersecurity' },
  { value: 'crm-erp',               label: 'CRM & ERP Systems' },
  { value: 'digital-marketing',      label: 'Digital Marketing' },
  { value: 'brand-design',           label: 'Brand & Design' },
  { value: 'it-consulting',          label: 'IT Strategy & Consulting' },
  { value: 'astabill',               label: 'AstaBill' },
  { value: 'other',                  label: 'Not sure yet' },
]

const BUDGETS = [
  { value: 'under-10k',  label: 'Under GH₵ 10,000' },
  { value: '10k-50k',    label: 'GH₵ 10,000 – 50,000' },
  { value: '50k-200k',   label: 'GH₵ 50,000 – 200,000' },
  { value: '200k-plus',  label: 'GH₵ 200,000+' },
  { value: 'not-sure',   label: 'Not sure yet' },
]

const inputCls = 'w-full bg-[rgba(var(--ch-text),0.04)] border border-[rgba(var(--ch-accent),0.15)] px-4 py-3 text-[14px] text-[var(--color-text)] placeholder:text-[rgba(var(--ch-text),0.25)] focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-200'
const labelCls = 'block font-mono text-[11px] tracking-[0.2em] uppercase text-[rgba(var(--ch-text),0.38)] mb-2'

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '', email: '', company: '', service: '', budget: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="border border-[rgba(var(--ch-border),0.12)] bg-[var(--color-panel)] overflow-hidden shadow-sm reveal" style={{ transitionDelay: '160ms' }}>

      {/* Screen-reader live region */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {status === 'sent'  && 'Message sent. We will be in touch within 24 hours to confirm your strategy call.'}
        {status === 'error' && 'Message failed to send. Please try again or email info@astacraftsystems.com.'}
      </div>

      {status === 'sent' ? (
        /* ── Success state ── */
        <div className="px-10 py-16 text-center">
          <div className="w-14 h-14 rounded-full bg-[rgba(85,170,73,0.12)] border border-[rgba(85,170,73,0.35)] flex items-center justify-center mx-auto mb-8">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="#55AA49" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h2
            className="font-serif font-bold text-[var(--color-text)] mb-3"
            style={{ fontSize: 'clamp(22px,2vw,28px)' }}
          >
            You&apos;re all set.
          </h2>
          <p className="text-[14px] text-[rgba(var(--ch-text),0.55)] mb-10 max-w-[34ch] mx-auto leading-relaxed">
            A senior member of our team will be in touch within 24 hours to confirm your strategy call time.
          </p>

          <div className="text-left border border-[rgba(var(--ch-accent),0.10)] bg-[rgba(var(--ch-accent),0.03)] p-6 mb-10 space-y-3.5">
            <p className="font-mono text-[10px] tracking-[0.20em] uppercase text-[rgba(var(--ch-text),0.35)] mb-4">What to expect</p>
            {[
              'Calendar invite from our team',
              'Brief prep questions (optional)',
              '45 minutes with a senior technology advisor',
            ].map(item => (
              <div key={item} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#55AA49] shrink-0" />
                <span className="text-[13px] text-[rgba(var(--ch-text),0.62)]">{item}</span>
              </div>
            ))}
          </div>

          <Link
            href="/"
            className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.40)] hover:text-[var(--color-accent)] transition-colors duration-200"
          >
            ← Back to homepage
          </Link>
        </div>

      ) : (
        <>
          {/* ── Panel header ── */}
          <div className="bg-[#1D4776] px-8 py-7">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.20em] uppercase text-[#55AA49] border border-[rgba(85,170,73,0.28)] px-3 py-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55AA49] animate-status" />
              Free · 45 min · No commitment
            </span>
            <h2
              className="font-serif font-bold text-white leading-tight"
              style={{ fontSize: 'clamp(20px,2vw,26px)' }}
            >
              Book a Strategy Call
            </h2>
            <p className="text-[13px] text-[rgba(255,255,255,0.42)] mt-1.5">
              A senior technology advisor. Your systems, challenges, and goals.
            </p>
          </div>

          {/* ── Form body ── */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">

            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="cf-name" className={labelCls}>Name *</label>
                <input
                  id="cf-name" required type="text" autoComplete="name"
                  value={form.name} onChange={set('name')}
                  className={inputCls} placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="cf-email" className={labelCls}>Work email *</label>
                <input
                  id="cf-email" required type="email" autoComplete="email"
                  value={form.email} onChange={set('email')}
                  className={inputCls} placeholder="you@company.com"
                />
              </div>
            </div>

            {/* Company + Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="cf-company" className={labelCls}>Company</label>
                <input
                  id="cf-company" type="text" autoComplete="organization"
                  value={form.company} onChange={set('company')}
                  className={inputCls} placeholder="Your organisation"
                />
              </div>
              <div>
                <label htmlFor="cf-service" className={labelCls}>What are you looking for? *</label>
                <div className="relative">
                  <select
                    id="cf-service" required
                    value={form.service} onChange={set('service')}
                    className={`${inputCls} appearance-none pr-10 ${form.service ? 'text-[var(--color-text)]' : 'text-[rgba(var(--ch-text),0.35)]'}`}
                  >
                    <option value="" disabled>Select a service</option>
                    {SERVICES.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(var(--ch-text),0.38)] text-[10px]">▾</span>
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="cf-message" className={labelCls}>Tell us about your situation *</label>
              <textarea
                id="cf-message" required rows={4}
                value={form.message} onChange={set('message')}
                className={`${inputCls} resize-none`}
                placeholder="Current systems, key challenges, goals, rough timeline..."
              />
            </div>

            {/* Budget — optional */}
            <div>
              <label htmlFor="cf-budget" className={labelCls}>
                Approximate budget{' '}
                <span className="text-[rgba(var(--ch-text),0.28)] normal-case tracking-normal">— optional</span>
              </label>
              <div className="relative">
                <select
                  id="cf-budget"
                  value={form.budget} onChange={set('budget')}
                  className={`${inputCls} appearance-none pr-10 ${form.budget ? 'text-[var(--color-text)]' : 'text-[rgba(var(--ch-text),0.35)]'}`}
                >
                  <option value="">Select a range</option>
                  {BUDGETS.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(var(--ch-text),0.38)] text-[10px]">▾</span>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-shimmer w-full font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[#55AA49] text-white py-4 hover:bg-[#489A3E] transition-colors duration-200 disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Book My Strategy Call →'}
              </button>
              <p className="font-mono text-[10px] tracking-[0.10em] text-[rgba(var(--ch-text),0.30)] text-center mt-3">
                We respond within 24 hours · No spam, ever
              </p>
            </div>

            {/* Error state */}
            {status === 'error' && (
              <div className="flex items-center justify-between border border-red-200 bg-red-50 px-4 py-3" role="alert">
                <p className="font-mono text-[11px] text-red-600 tracking-[0.06em]">
                  Send failed — please try again or email{' '}
                  <a href="mailto:info@astacraftsystems.com" className="underline">
                    info@astacraftsystems.com
                  </a>
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="font-mono text-[10px] tracking-[0.1em] uppercase text-red-500 hover:text-red-700 transition-colors ml-4 shrink-0"
                >
                  Retry
                </button>
              </div>
            )}
          </form>
        </>
      )}
    </div>
  )
}
