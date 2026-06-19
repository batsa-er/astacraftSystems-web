import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { getCareers } from '@/sanity/queries'
import type { Career } from '@/sanity/types'
import { Briefcase, Clock, MapPin } from 'lucide-react'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Careers | Astacraft Systems',
  description: 'Join Astacraft Systems and build technology that matters. We hire engineers, architects, and strategists who care about impact across Africa.',
  alternates: { canonical: 'https://astacraftsystems.com/careers' },
  openGraph: {
    title: 'Careers | Astacraft Systems',
    description: 'Join Astacraft Systems and build technology that matters. We hire engineers, architects, and strategists who care about impact across Africa.',
    url: 'https://astacraftsystems.com/careers',
    type: 'website',
  },
}

const fallbackCareers = [
  {
    _id: '1', slug: { current: 'senior-software-engineer' },
    title: 'Senior Software Engineer', department: 'Engineering', type: 'Full-time', location: 'Accra / Remote',
    excerpt: 'Lead complex software projects across web, mobile, and enterprise platforms. Strong TypeScript and cloud integration experience required.',
  },
  {
    _id: '2', slug: { current: 'cloud-infrastructure-engineer' },
    title: 'Cloud Infrastructure Engineer', department: 'Cloud', type: 'Full-time', location: 'Accra / Remote',
    excerpt: 'Design and manage cloud infrastructure for client deployments on AWS and Azure. AWS or Azure certification preferred.',
  },
]

export default async function CareersPage() {
  let careers: Career[] = fallbackCareers
  try {
    const c = await getCareers()
    if (c?.length) careers = c
  } catch {}

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={<>Build technology<br />that matters.</>}
        description="We hire engineers, architects, and strategists who care about impact. Every hire at Astacraft has the opportunity to shape technology outcomes for hundreds of businesses across Africa."
      />

      {/* Open roles */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[1280px] mx-auto">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-6 reveal">Open Roles</p>
          <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight mb-16 reveal" style={{ fontSize: 'clamp(32px,4vw,56px)' }}>
            Current opportunities.
          </h2>

          {careers.length === 0 ? (
            <div className="border border-[rgba(var(--ch-accent),0.10)] bg-[var(--color-surface)] p-16 text-center reveal">
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[rgba(var(--ch-text),0.35)] mb-3">No openings right now</p>
              <p className="text-[15px] text-[rgba(var(--ch-text),0.55)] max-w-md mx-auto">
                We don&apos;t have any listed roles at the moment — but we&apos;re always interested in exceptional people. Send us a note.
              </p>
            </div>
          ) : (
          <div className="space-y-6">
            {careers.map((job, i: number) => (
              <div
                key={job._id}
                className="relative border border-[rgba(var(--ch-accent),0.12)] bg-[var(--color-surface)] p-10 overflow-hidden group card-glow hover:border-[rgba(var(--ch-accent),0.30)] reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Background index number */}
                <span className="absolute bottom-4 right-8 font-serif font-bold text-[140px] leading-none text-[rgba(var(--ch-accent),0.04)] select-none pointer-events-none group-hover:text-[rgba(var(--ch-accent),0.07)] transition-colors duration-300">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <p className="font-mono text-[10px] tracking-[0.20em] uppercase text-[rgba(var(--ch-text),0.28)] mb-5">
                  {String(i + 1).padStart(2, '0')}
                </p>

                <div className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-5 mb-4">
                  <h3 className="font-serif font-bold text-[var(--color-text)]" style={{ fontSize: 'clamp(22px,2.5vw,32px)' }}>
                    {job.title}
                  </h3>
                  {job.slug?.current && (
                    <Link
                      href={`/careers/${job.slug.current}`}
                      className="shrink-0 self-start inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] uppercase border border-[rgba(var(--ch-accent),0.30)] text-[rgba(var(--ch-text),0.65)] px-6 py-3 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-200"
                    >
                      View Role →
                    </Link>
                  )}
                </div>

                <p className="relative text-[14px] text-[rgba(var(--ch-text),0.55)] leading-relaxed max-w-2xl mb-8">
                  {job.excerpt}
                </p>

                <div className="relative border-t border-[rgba(var(--ch-accent),0.08)] pt-5 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] uppercase px-3 py-1 text-[var(--color-accent)] border border-[rgba(var(--ch-accent),0.30)]">
                    <Briefcase className="w-3 h-3" />{job.department}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] uppercase px-3 py-1 text-[rgba(var(--ch-text),0.55)] border border-[rgba(var(--ch-border),0.10)]">
                    <Clock className="w-3 h-3" />{job.type}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] uppercase text-[rgba(var(--ch-text),0.40)] ml-auto">
                    <MapPin className="w-3 h-3" />{job.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(29,71,118,0.12),transparent)] pointer-events-none" />
        <div className="relative max-w-[700px] mx-auto text-center reveal">
          <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.30)] mb-4">Don&apos;t see your role?</p>
          <h2 className="font-serif font-bold text-white mb-4" style={{ fontSize: 'clamp(28px,3vw,48px)' }}>
            We&apos;re always looking for exceptional people.
          </h2>
          <p className="text-[rgba(255,255,255,0.50)] mb-10">
            If you don&apos;t see a role that fits, send us a message anyway. Tell us what you do and what you&apos;re looking for.
          </p>
          <Link
            href="/contact"
            className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white px-10 py-4 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
          >
            Get in Touch →
          </Link>
        </div>
      </section>
    </>
  )
}
