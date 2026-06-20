import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCareerBySlug } from '@/sanity/queries'
import type { Career } from '@/sanity/types'
import { Briefcase, Clock, MapPin, Check } from 'lucide-react'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  let job: Career | null = null
  try { job = await getCareerBySlug(slug) } catch {}
  if (!job) return { title: 'Role Not Found | Astacraft Systems' }
  return {
    title: `${job.title} | Careers at Astacraft Systems`,
    description: job.excerpt,
    alternates: { canonical: `https://astacraftsystems.com/careers/${slug}` },
  }
}

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let job: Career | null = null
  try { job = await getCareerBySlug(slug) } catch {}
  if (!job) notFound()

  return (
    <>
      {/* Header */}
      <section className="bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] pt-40 pb-20">
        <div className="max-w-[1280px] mx-auto">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-[rgba(255,255,255,0.40)] hover:text-[rgba(255,255,255,0.75)] transition-colors duration-200 mb-12"
          >
            ← All Roles
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] uppercase px-3 py-1 text-[var(--color-green)] border border-[rgba(var(--ch-green),0.35)]">
              <Briefcase className="w-3 h-3" />{job.department}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] uppercase px-3 py-1 text-[rgba(255,255,255,0.50)] border border-[rgba(255,255,255,0.12)]">
              <Clock className="w-3 h-3" />{job.type}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.40)]">
              <MapPin className="w-3 h-3" />{job.location}
            </span>
          </div>

          <h1
            className="font-serif font-bold text-white leading-tight mb-8"
            style={{ fontSize: 'clamp(36px,5vw,64px)' }}
          >
            {job.title}
          </h1>

          {job.excerpt && (
            <p className="text-[clamp(15px,1.1vw,18px)] text-[rgba(255,255,255,0.55)] max-w-2xl leading-relaxed mb-10">
              {job.excerpt}
            </p>
          )}

          <a
            href={job.applyUrl || `mailto:careers@astacraftsystems.com?subject=${encodeURIComponent('Application: ' + job.title)}`}
            className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white px-10 py-4 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
          >
            Apply for this Role →
          </a>
        </div>
      </section>

      {/* JD body */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-24">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">

          {/* Left: JD content */}
          <div className="space-y-14">
            {job.description && (
              <div>
                <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-5">About the Role</h2>
                <p className="text-[15px] text-[rgba(var(--ch-text),0.65)] leading-relaxed">{job.description}</p>
              </div>
            )}

            {(job.responsibilities?.length ?? 0) > 0 && (
              <div>
                <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-5">Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities?.map((r: string) => (
                    <li key={r} className="flex items-start gap-3">
                      <Check className="w-3.5 h-3.5 text-[var(--color-accent)] shrink-0 mt-1" />
                      <span className="text-[14px] text-[rgba(var(--ch-text),0.70)] leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(job.requirements?.length ?? 0) > 0 && (
              <div>
                <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-5">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements?.map((r: string) => (
                    <li key={r} className="flex items-start gap-3">
                      <Check className="w-3.5 h-3.5 text-[var(--color-accent)] shrink-0 mt-1" />
                      <span className="text-[14px] text-[rgba(var(--ch-text),0.70)] leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(job.niceToHave?.length ?? 0) > 0 && (
              <div>
                <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-5">Nice to Have</h2>
                <ul className="space-y-3">
                  {job.niceToHave?.map((r: string) => (
                    <li key={r} className="flex items-start gap-3">
                      <span className="text-[var(--color-accent)] shrink-0 mt-0.5 text-[10px]">◦</span>
                      <span className="text-[14px] text-[rgba(var(--ch-text),0.60)] leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: sidebar */}
          <div className="space-y-6">
            {/* Apply card */}
            <div className="border border-[rgba(var(--ch-accent),0.15)] bg-[var(--color-surface)] p-8">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[rgba(var(--ch-text),0.40)] mb-3">Ready to apply?</p>
              <p className="text-[14px] text-[rgba(var(--ch-text),0.60)] leading-relaxed mb-6">
                Send us your CV and a short note on why this role is a fit.
              </p>
              <a
                href={job.applyUrl || `mailto:careers@astacraftsystems.com?subject=${encodeURIComponent('Application: ' + job.title)}`}
                className="block w-full text-center font-mono text-[10px] tracking-[0.14em] uppercase bg-[var(--color-green)] text-white px-6 py-4 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
              >
                Apply Now →
              </a>
            </div>

            {/* Benefits card */}
            {(job.benefits?.length ?? 0) > 0 && (
              <div className="border border-[rgba(var(--ch-accent),0.15)] bg-[var(--color-surface)] p-8">
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[rgba(var(--ch-text),0.40)] mb-5">What we offer</p>
                <ul className="space-y-3">
                  {job.benefits?.map((b: string) => (
                    <li key={b} className="flex items-start gap-3">
                      <Check className="w-3 h-3 text-[var(--color-green)] shrink-0 mt-1" />
                      <span className="text-[13px] text-[rgba(var(--ch-text),0.65)] leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Role details card */}
            <div className="border border-[rgba(var(--ch-accent),0.15)] bg-[var(--color-surface)] p-8 space-y-4">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[rgba(var(--ch-text),0.40)] mb-2">Role details</p>
              {job.department && (
                <div>
                  <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.30)] mb-1">Department</p>
                  <p className="text-[13px] text-[var(--color-text)]">{job.department}</p>
                </div>
              )}
              {job.type && (
                <div>
                  <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.30)] mb-1">Type</p>
                  <p className="text-[13px] text-[var(--color-text)]">{job.type}</p>
                </div>
              )}
              {job.location && (
                <div>
                  <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.30)] mb-1">Location</p>
                  <p className="text-[13px] text-[var(--color-text)]">{job.location}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
