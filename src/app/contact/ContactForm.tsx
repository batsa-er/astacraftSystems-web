'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '', service: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

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
    <div className="border border-[rgba(var(--ch-border),0.12)] bg-[var(--color-panel)] p-10 shadow-sm reveal" style={{ transitionDelay: '160ms' }}>
      {status === 'sent' ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-[rgba(var(--ch-accent),0.12)] border border-[rgba(var(--ch-accent),0.30)] flex items-center justify-center mx-auto mb-6">
            <span className="text-[var(--color-accent)] text-2xl">✓</span>
          </div>
          <h2 className="font-serif text-[24px] font-bold text-[var(--color-text)] mb-3">Message sent.</h2>
          <p className="text-[14px] text-[rgba(var(--ch-text),0.55)]">We will be in touch within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="cf-name" className="block font-mono text-[11px] tracking-[0.2em] uppercase text-[rgba(var(--ch-text),0.35)] mb-2">Name *</label>
              <input
                id="cf-name"
                required
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full bg-[rgba(var(--ch-text),0.04)] border border-[rgba(var(--ch-accent),0.15)] px-4 py-3 text-[14px] text-[var(--color-text)] font-mono placeholder:text-[rgba(var(--ch-text),0.25)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="cf-email" className="block font-mono text-[11px] tracking-[0.2em] uppercase text-[rgba(var(--ch-text),0.35)] mb-2">Email *</label>
              <input
                id="cf-email"
                required
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full bg-[rgba(var(--ch-text),0.04)] border border-[rgba(var(--ch-accent),0.15)] px-4 py-3 text-[14px] text-[var(--color-text)] font-mono placeholder:text-[rgba(var(--ch-text),0.25)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="cf-company" className="block font-mono text-[11px] tracking-[0.2em] uppercase text-[rgba(var(--ch-text),0.35)] mb-2">Company</label>
              <input
                id="cf-company"
                type="text"
                autoComplete="organization"
                value={form.company}
                onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                className="w-full bg-[rgba(var(--ch-text),0.04)] border border-[rgba(var(--ch-accent),0.15)] px-4 py-3 text-[14px] text-[var(--color-text)] font-mono placeholder:text-[rgba(var(--ch-text),0.25)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                placeholder="Your company"
              />
            </div>
            <div>
              <label htmlFor="cf-phone" className="block font-mono text-[11px] tracking-[0.2em] uppercase text-[rgba(var(--ch-text),0.35)] mb-2">Phone</label>
              <input
                id="cf-phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                className="w-full bg-[rgba(var(--ch-text),0.04)] border border-[rgba(var(--ch-accent),0.15)] px-4 py-3 text-[14px] text-[var(--color-text)] font-mono placeholder:text-[rgba(var(--ch-text),0.25)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                placeholder="+233 XX XXX XXXX"
              />
            </div>
          </div>

          <div>
            <label htmlFor="cf-service" className="block font-mono text-[11px] tracking-[0.2em] uppercase text-[rgba(var(--ch-text),0.35)] mb-2">What are you looking for?</label>
            <div className="relative">
              <select
                id="cf-service"
                value={form.service}
                onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                className="w-full bg-[rgba(var(--ch-text),0.04)] border border-[rgba(var(--ch-accent),0.15)] px-4 py-3 text-[14px] text-[rgba(var(--ch-text),0.60)] font-mono focus:outline-none focus:border-[var(--color-accent)] transition-colors appearance-none pr-10"
              >
                <option value="">Select a service</option>
                <option value="software-development">Software Development</option>
                <option value="digital-transformation">Digital Transformation</option>
                <option value="cloud-solutions">Cloud Solutions</option>
                <option value="cybersecurity">Cybersecurity</option>
                <option value="crm-erp">CRM &amp; ERP Systems</option>
                <option value="digital-marketing">Digital Marketing</option>
                <option value="brand-design">Brand &amp; Design</option>
                <option value="it-consulting">IT Consulting</option>
                <option value="astabill">AstaBill</option>
                <option value="other">Not sure yet</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(var(--ch-text),0.40)] text-[10px]">▾</span>
            </div>
          </div>

          <div>
            <label htmlFor="cf-message" className="block font-mono text-[11px] tracking-[0.2em] uppercase text-[rgba(var(--ch-text),0.35)] mb-2">Tell us about your situation *</label>
            <textarea
              id="cf-message"
              required
              rows={5}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              className="w-full bg-[rgba(var(--ch-text),0.04)] border border-[rgba(var(--ch-accent),0.15)] px-4 py-3 text-[14px] text-[var(--color-text)] font-mono placeholder:text-[rgba(var(--ch-text),0.25)] focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
              placeholder="Current systems, challenges, goals, timeline..."
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-accent)] text-white py-4 hover:bg-[var(--color-accent-hover)] transition-colors duration-200 disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
          {status === 'error' && (
            <div className="flex items-center justify-between border border-red-200 bg-red-50 px-4 py-3" role="alert">
              <p className="font-mono text-[11px] text-red-600 tracking-[0.06em]">
                Send failed — please try again or email{' '}
                <a href="mailto:info@astacraftsystems.com" className="underline">info@astacraftsystems.com</a>
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
      )}
    </div>
  )
}
