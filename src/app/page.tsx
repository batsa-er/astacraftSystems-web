import Link from 'next/link'
import Image from 'next/image'
import { getTestimonials } from '@/sanity/queries'
import type { Testimonial } from '@/sanity/types'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import { IndustriesWork } from '@/components/IndustriesWork'
import { AstaBillMockup } from '@/components/AstaBillMockup'
import { StatusBadge } from '@/components/StatusBadge'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { INDUSTRIES } from '@/config/industries'
import { SERVICES } from '@/config/services'
import { DONDO_PROGRAMME_LABEL } from '@/config/dondo'
import { PRODUCTS } from '@/config/site'

export const revalidate = 3600

const WHAT_WE_DO = [
  {
    title: 'Get paid',
    copy: 'Send invoices and receipts, and take payment by Mobile Money or card through AstaBill.',
    link: { label: PRODUCTS.astabill.name, href: '/products#astabill' },
  },
  {
    title: 'Talk to customers',
    copy: 'Answer WhatsApp messages and send SMS reminders from one shared inbox, with an AI assistant that knows your business. More channels are on the way.',
    link: { label: PRODUCTS.dondo.name, href: PRODUCTS.dondo.path },
  },
  {
    title: 'Automate the rest',
    copy: 'We connect your systems and automate approvals, follow-ups and reports, so your team stops copying data by hand.',
    link: { label: 'Services', href: '/services' },
  },
]

const FALLBACK_TESTIMONIALS = [
  { quote: 'The payment link changed everything. We send the invoice, the client pays on their phone, and the receipt is already waiting for them.', name: 'Ama Darko',   role: 'Brand Strategist, Accra', initials: 'AD' },
  { quote: 'AstaBill removed the spreadsheet lag from our week. The dashboard tells me what is paid, what is due, and what needs follow-up.',      name: 'Kofi Mensah', role: 'IT Consultant, Kumasi',   initials: 'KM' },
]

const primaryBtn = 'btn-shimmer inline-block text-center bg-[var(--color-cta)] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-8 py-4 hover:bg-[var(--color-cta-hover)] transition-colors duration-200'
const ghostBtnDark = 'inline-block text-center border border-[rgba(255,255,255,0.45)] text-white font-mono text-[11px] tracking-[0.14em] uppercase font-medium px-8 py-4 hover:border-white transition-colors duration-200'
const sectionNum = 'absolute -top-6 left-0 font-serif font-black leading-none select-none pointer-events-none text-[rgba(var(--ch-text),0.04)]'
const h2Cls = 'relative font-serif font-black text-[var(--color-text)] leading-[0.95] tracking-[-0.035em]'

export default async function HomePage() {
  let testimonials: Testimonial[] = []
  try {
    const t = await getTestimonials()
    if (t?.length) testimonials = t
  } catch {}

  const displayTestimonials = testimonials.length ? testimonials : FALLBACK_TESTIMONIALS

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-[var(--color-dark)]">
        <div className="absolute -top-[25%] right-[-8%] w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(29,71,118,0.55)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute top-[30%] left-[-12%] w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(85,170,73,0.12)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />

        <div className="relative px-[clamp(24px,5vw,80px)] flex-1 flex flex-col justify-center pt-28 pb-16">
          <div className="max-w-[1280px] mx-auto w-full">
            <h1
              className="font-serif font-black text-white leading-[0.95] tracking-[-0.035em]"
              style={{ fontSize: 'clamp(38px,8.4vw,116px)' }}
            >
              <span className="block clip-reveal" style={{ animationDelay: '0.05s' }}>Get paid,</span>
              <span className="block clip-reveal" style={{ animationDelay: '0.15s' }}>talk to customers,</span>
              <span className="block clip-reveal text-gradient italic pb-[0.08em]" style={{ animationDelay: '0.25s' }}>automate the rest.</span>
            </h1>

            <div className="mt-8 md:mt-12 flex flex-col gap-8 hero-in hero-in-3">
              <p
                className="text-[rgba(255,255,255,0.80)] leading-relaxed max-w-[58ch]"
                style={{ fontSize: 'clamp(15px,1.4vw,18px)' }}
              >
                Astacraft builds software for African businesses: invoicing and payments, WhatsApp customer messaging, and automations that take repetitive work off your team.
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4">
                <Link href="/contact" className={primaryBtn}>Book a consultation</Link>
                <a href={PRODUCTS.astabill.url} target="_blank" rel="noopener noreferrer" className={ghostBtnDark}>
                  Try {PRODUCTS.astabill.name} free
                </a>
              </div>
              <p className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.16em] uppercase text-[rgba(255,255,255,0.75)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#68CA50] shrink-0" aria-hidden="true" />
                Built in Accra for Ghanaian businesses
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 01 — WHAT WE DO */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto">
          <div className="relative mb-12 md:mb-16 reveal">
            <span className={sectionNum} style={{ fontSize: 'clamp(80px,11vw,148px)' }} aria-hidden="true">01</span>
            <p className="relative font-mono text-[11px] tracking-[0.26em] uppercase text-[var(--color-accent)] mb-5">What we do</p>
            <h2 className={`${h2Cls} max-w-[18ch]`} style={{ fontSize: 'clamp(30px,4.5vw,60px)' }}>
              Three ways we help your business run better
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(var(--ch-border),0.10)] reveal">
            {WHAT_WE_DO.map(({ title, copy, link }, i) => (
              <div key={title} className="bg-[var(--color-bg)] p-7 md:p-9 flex flex-col">
                <span className="font-mono text-[11px] tracking-[0.18em] text-[rgba(var(--ch-text),0.60)] mb-6" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-serif font-bold text-[var(--color-text)] mb-3" style={{ fontSize: 'clamp(20px,2vw,26px)' }}>{title}</h3>
                <p className="text-[15px] text-[rgba(var(--ch-text),0.75)] leading-relaxed flex-1 mb-7">{copy}</p>
                <Link
                  href={link.href}
                  className="font-mono text-[11px] tracking-[0.14em] uppercase font-medium text-[var(--color-accent)] underline underline-offset-4 decoration-[rgba(var(--ch-accent),0.35)] hover:decoration-[var(--color-accent)] w-fit py-1"
                >
                  {link.label} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — PRODUCTS */}
      <section className="relative bg-[#1D4776] px-[clamp(24px,5vw,80px)] py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto">
          <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.80)] mb-10 reveal">
            <span aria-hidden="true">02 · </span>Products
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
            <div className="reveal">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Image src="/astabill-logo-white.svg" alt="" width={137} height={36} className="h-9 w-auto" />
                <StatusBadge status="Available now" dark />
              </div>
              <h2 className="font-serif font-black text-white leading-[0.95] tracking-[-0.035em] mb-5" style={{ fontSize: 'clamp(32px,4.2vw,58px)' }}>
                {PRODUCTS.astabill.name}.
              </h2>
              <p className="text-[rgba(255,255,255,0.85)] leading-relaxed mb-8 max-w-[48ch]" style={{ fontSize: 'clamp(15px,1.2vw,17px)' }}>
                Invoicing and payments for Ghanaian businesses. Mobile Money, cards and GRA-ready invoices.
              </p>
              <a href={PRODUCTS.astabill.url} target="_blank" rel="noopener noreferrer" className={primaryBtn}>
                Try free<span className="sr-only"> — {PRODUCTS.astabill.name}</span>
              </a>
            </div>

            <div className="reveal" style={{ transitionDelay: '100ms' }}>
              <AstaBillMockup />
            </div>
          </div>

          <div className="mt-14 md:mt-20 border border-[rgba(255,255,255,0.22)] bg-[rgba(10,22,40,0.35)] p-7 md:p-10 reveal">
            <div className="flex flex-wrap items-center gap-4 mb-5">
              <h2 className="font-serif font-black text-white leading-none tracking-[-0.03em]" style={{ fontSize: 'clamp(28px,3.4vw,46px)' }}>
                {PRODUCTS.dondo.name}
              </h2>
              <StatusBadge status={DONDO_PROGRAMME_LABEL} dark />
            </div>
            <p className="text-[rgba(255,255,255,0.85)] leading-relaxed mb-8 max-w-[70ch]" style={{ fontSize: 'clamp(15px,1.2vw,17px)' }}>
              Named after the Akan talking drum, Dondo brings your customer conversations into one inbox, starting with WhatsApp and SMS. We are onboarding a small group of pilot businesses.
            </p>
            <Link href={PRODUCTS.dondo.path} className={ghostBtnDark}>Join the pilot</Link>
          </div>
        </div>
      </section>

      {/* 03 — SERVICES */}
      <section className="bg-[var(--color-surface)] px-[clamp(24px,5vw,80px)] py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14 reveal">
            <div className="relative">
              <span className={sectionNum} style={{ fontSize: 'clamp(80px,11vw,148px)' }} aria-hidden="true">03</span>
              <p className="relative font-mono text-[11px] tracking-[0.26em] uppercase text-[var(--color-accent)] mb-5">Services</p>
              <h2 className={`${h2Cls} max-w-[16ch]`} style={{ fontSize: 'clamp(30px,4.5vw,60px)' }}>
                When you need it built for you.
              </h2>
              <p className="relative mt-5 text-[15px] text-[rgba(var(--ch-text),0.75)] max-w-[48ch] leading-relaxed">
                Fixed-scope projects, delivered by our team in Accra.
              </p>
            </div>
            <Link
              href="/services"
              className="font-mono text-[11px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.72)] hover:text-[var(--color-accent)] transition-colors duration-200 py-1"
            >
              All services →
            </Link>
          </div>

          <ul className="border-t border-[rgba(var(--ch-border),0.12)] list-none">
            {SERVICES.map(({ number, slug, shortTitle, summary }) => (
              <li key={slug} className="reveal">
                <Link
                  href={`/services#${slug}`}
                  className="service-row group flex items-start md:items-center gap-5 md:gap-10 py-7 md:py-9 border-b border-[rgba(var(--ch-border),0.10)]"
                >
                  <span className="font-mono text-[11px] tracking-[0.18em] text-[rgba(var(--ch-text),0.60)] w-7 shrink-0 pt-1 md:pt-0" aria-hidden="true">{number}</span>
                  <span className="flex-1 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-2 md:gap-10 items-center">
                    <span className="font-serif font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-200" style={{ fontSize: 'clamp(17px,1.9vw,22px)' }}>
                      {shortTitle}
                    </span>
                    <span className="text-[14px] text-[rgba(var(--ch-text),0.75)] leading-relaxed">{summary}</span>
                  </span>
                  <span className="font-mono text-[12px] text-[rgba(var(--ch-text),0.50)] group-hover:text-[var(--color-accent)] transition-colors duration-200 shrink-0" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 — WHO WE WORK WITH */}
      <IndustriesWork industries={INDUSTRIES} />

      {/* 05 — PROOF */}
      <section className="bg-[var(--color-surface)] px-[clamp(24px,5vw,80px)] py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto reveal">
          <h2 className="font-mono text-[11px] tracking-[0.26em] uppercase text-[var(--color-accent)] text-center mb-12">
            <span aria-hidden="true">05 · </span>What our customers say
          </h2>
          <TestimonialCarousel testimonials={displayTestimonials} />
        </div>
      </section>

      {/* 06 — CLOSING CTA */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />
        <div className="relative max-w-[1280px] mx-auto reveal">
          <h2
            className="font-serif font-black text-white leading-[0.95] tracking-[-0.035em] mb-7 max-w-[16ch]"
            style={{ fontSize: 'clamp(34px,6.5vw,92px)' }}
          >
            Tell us what slows your business down.
          </h2>
          <p className="text-[rgba(255,255,255,0.80)] mb-10 max-w-[52ch]" style={{ fontSize: 'clamp(15px,1.3vw,18px)' }}>
            We&rsquo;ll show you what can be automated, and what it would cost. The first consultation is free.
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
            <Link href="/contact" className={primaryBtn}>Book a consultation</Link>
            <WhatsAppButton label="Chat with us on WhatsApp" className={ghostBtnDark} />
          </div>
        </div>
      </section>
    </>
  )
}
