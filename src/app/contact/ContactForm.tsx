'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import { Paperclip, X } from 'lucide-react'
import { CONTACT_SERVICES, CONTACT_BUDGETS } from '@/config/forms'

const inputCls = 'w-full bg-[rgba(var(--ch-text),0.04)] border border-[rgba(var(--ch-accent),0.15)] px-4 py-3 text-[14px] text-[var(--color-text)] placeholder:text-[rgba(var(--ch-text),0.25)] hover:border-[rgba(var(--ch-accent),0.35)] focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-200'
const labelCls = 'block font-mono text-[11px] tracking-[0.2em] uppercase text-[rgba(var(--ch-text),0.38)] mb-2'

const MAX_FILE_BYTES = 10 * 1024 * 1024
const ALLOWED_TYPES  = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg,.zip'

function formatBytes(b: number) {
  return b < 1024 * 1024 ? `${(b / 1024).toFixed(0)} KB` : `${(b / (1024 * 1024)).toFixed(1)} MB`
}

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '', email: '', company: '', service: '', budget: '', message: '',
  })
  const [file,      setFile]      = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [status,    setStatus]    = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null
    setFileError(null)
    if (f && f.size > MAX_FILE_BYTES) {
      setFileError('File exceeds 10 MB limit.')
      e.target.value = ''
      return
    }
    setFile(f)
  }

  function clearFile() {
    setFile(null)
    setFileError(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (fileError) return
    setStatus('sending')
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (file) fd.append('file', file)
      const res = await fetch('/api/contact', { method: 'POST', body: fd })
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
          <div className="w-14 h-14 rounded-full bg-[rgba(var(--ch-green),0.12)] border border-[rgba(var(--ch-green),0.35)] flex items-center justify-center mx-auto mb-8">
            <svg aria-hidden="true" className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="var(--color-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] shrink-0" />
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
          <div className="bg-[var(--color-accent)] px-8 py-7">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.20em] uppercase text-[var(--color-green)] border border-[rgba(var(--ch-green),0.28)] px-3 py-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] animate-status" />
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
                    {CONTACT_SERVICES.map(({ value, label }) => (
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
                  {CONTACT_BUDGETS.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(var(--ch-text),0.38)] text-[10px]">▾</span>
              </div>
            </div>

            {/* File attachment */}
            <div>
              <label className={labelCls}>
                Attach a file{' '}
                <span className="text-[rgba(var(--ch-text),0.28)] normal-case tracking-normal">— optional</span>
              </label>
              {file ? (
                <div className="flex items-center justify-between border border-[rgba(var(--ch-accent),0.15)] bg-[rgba(var(--ch-text),0.04)] px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <Paperclip className="w-4 h-4 text-[rgba(var(--ch-text),0.35)] shrink-0" aria-hidden="true" />
                    <span className="text-[13px] text-[var(--color-text)] truncate">{file.name}</span>
                    <span className="text-[11px] text-[rgba(var(--ch-text),0.35)] shrink-0">{formatBytes(file.size)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={clearFile}
                    aria-label="Remove attachment"
                    className="ml-3 text-[rgba(var(--ch-text),0.35)] hover:text-[var(--color-text)] transition-colors shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="group w-full border border-dashed border-[rgba(var(--ch-accent),0.20)] bg-[rgba(var(--ch-text),0.02)] px-4 py-4 text-left hover:border-[rgba(var(--ch-accent),0.40)] hover:bg-[rgba(var(--ch-text),0.04)] transition-colors duration-200"
                >
                  <span className="flex items-center gap-3">
                    <Paperclip className="w-4 h-4 text-[rgba(var(--ch-text),0.30)] group-hover:text-[rgba(var(--ch-text),0.55)] transition-colors duration-200" aria-hidden="true" />
                    <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[rgba(var(--ch-text),0.40)] group-hover:text-[rgba(var(--ch-text),0.60)] transition-colors duration-200">Choose file</span>
                  </span>
                  <span className="font-mono text-[10px] text-[rgba(var(--ch-text),0.22)] mt-1.5 block">
                    PDF, Word, Excel, images · Max 10 MB
                  </span>
                </button>
              )}
              <input
                ref={fileRef}
                type="file"
                accept={ALLOWED_TYPES}
                onChange={handleFile}
                className="sr-only"
              />
              {fileError && (
                <p className="font-mono text-[10px] tracking-[0.06em] text-red-500 mt-2">{fileError}</p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-shimmer w-full font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white py-4 hover:bg-[var(--color-green-hover)] transition-colors duration-200 disabled:opacity-60"
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
