import type { Metadata } from 'next'
import Image from 'next/image'
import { getCareers, getTeamMembers } from '@/sanity/queries'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'About Astacraft Systems | Technology Partner for Africa',
  description: 'Astacraft Systems Limited is a technology and digital transformation company based in Accra, Ghana. Meet the team of engineers, architects, and strategists building technology for Africa.',
  alternates: { canonical: 'https://astacraftsystems.com/about' },
  openGraph: {
    title: 'About Astacraft Systems | Technology Partner for Africa',
    description: 'Astacraft Systems Limited is a technology and digital transformation company based in Accra, Ghana. Meet the team of engineers, architects, and strategists building technology for Africa.',
    url: 'https://astacraftsystems.com/about',
    type: 'website',
  },
}
import PageHero from '@/components/PageHero'
import { urlFor } from '@/sanity/client'
import {
  UsersIcon, LayersIcon, ClockIcon, ShieldCheckIcon,
  TargetIcon, GlobeIcon, TreeIcon,
  BriefcaseIcon, MapPinIcon,
} from '@/components/Icons'

const fallbackTeam = [
  {
    _id: '1', name: 'Kwame Asante', role: 'Founder & CEO',
    bio: 'Founded Astacraft Systems to address the technology gap facing African businesses. 15+ years in enterprise software, systems architecture, and digital transformation across West Africa.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&q=80&auto=format&fit=crop&crop=face',
  },
  {
    _id: '2', name: 'Adaeze Okonkwo', role: 'Head of Software Engineering',
    bio: 'Leads our engineering practice with deep expertise in enterprise systems, cloud architecture, and scalable API design. Previously led engineering teams across EMEA.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&q=80&auto=format&fit=crop&crop=face',
  },
  {
    _id: '3', name: 'Seun Bankole', role: 'Head of Cybersecurity',
    bio: 'Certified security architect with 10+ years in enterprise security, risk management, and compliance. Former security lead at a pan-African financial institution.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&q=80&auto=format&fit=crop&crop=face',
  },
  {
    _id: '4', name: 'Yemi Adesanya', role: 'Head of Cloud & Infrastructure',
    bio: 'AWS and Azure certified cloud architect with a track record of complex cloud migrations and managed infrastructure deployments across 12+ countries.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&q=80&auto=format&fit=crop&crop=face',
  },
]

const values = [
  {
    num: '01', title: 'Client Results First',
    body: 'We measure every engagement against business outcomes — not deliverables alone. If the technology we implement does not move the needle, we go back to the drawing board.',
  },
  {
    num: '02', title: 'Built for Africa',
    body: 'African markets have distinct infrastructure constraints, user behaviors, and regulatory requirements. We build solutions designed for these realities — not imported templates from elsewhere.',
  },
  {
    num: '03', title: 'Engineering Excellence',
    body: 'We do not cut corners. Every system we build is designed for reliability, security, and long-term maintainability — because your business depends on it running perfectly.',
  },
  {
    num: '04', title: 'Long-Term Partnership',
    body: 'Technology is not a one-time purchase. We build lasting relationships with ongoing support, optimization, and strategic guidance as your business evolves and scales.',
  },
]

const fallbackCareers = [
  {
    _id: '1', title: 'Senior Software Engineer', department: 'Engineering', type: 'Full-time', location: 'Accra / Remote',
    excerpt: 'Lead complex software projects across web, mobile, and enterprise platforms. Strong TypeScript and cloud integration experience required.',
  },
  {
    _id: '2', title: 'Cloud Infrastructure Engineer', department: 'Cloud', type: 'Full-time', location: 'Accra / Remote',
    excerpt: 'Design and manage cloud infrastructure for client deployments on AWS and Azure. AWS or Azure certification preferred.',
  },
]

export default async function AboutPage() {
  let careers = fallbackCareers as any[]
  let team = fallbackTeam as any[]
  try {
    const [c, t] = await Promise.all([getCareers(), getTeamMembers()])
    if (c?.length) careers = c
    if (t?.length) team = t
  } catch {}

  return (
    <>
      <PageHero
        eyebrow="About Astacraft Systems"
        title={<>Technology partner<br />for Africa&apos;s<br />most ambitious teams.</>}
        description="Astacraft Systems Limited is a technology, software, cloud, and digital transformation company based in Accra, Ghana. We help organizations across Africa modernize operations, automate workflows, and scale through technology."
        image={{ src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=700&q=85&auto=format&fit=crop', alt: 'Astacraft Systems office' }}
      />

      {/* Mission */}
      <section className="bg-[var(--color-surface)] border-y border-[rgba(var(--ch-accent),0.08)] px-[clamp(24px,5vw,80px)] py-24">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-6">Our Mission</p>
            <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight mb-6" style={{ fontSize: 'clamp(28px,3.5vw,48px)' }}>
              Closing the technology gap for Africa&apos;s businesses.
            </h2>
            <p className="text-[15px] text-[rgba(var(--ch-text),0.60)] leading-relaxed">
              We believe Africa&apos;s best businesses deserve the same calibre of technology capability that top global enterprises take for granted. That means world-class engineering, reliable infrastructure, and systems built for African market realities.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { Icon: UsersIcon,       num: '200+',  label: 'Businesses Served' },
              { Icon: LayersIcon,      num: '500+',  label: 'Systems Deployed' },
              { Icon: ClockIcon,       num: '8+',    label: 'Years in Technology' },
              { Icon: ShieldCheckIcon, num: '98%',   label: 'Client Satisfaction' },
            ].map(({ Icon, num, label }, i) => (
              <div key={label} className="border border-[rgba(var(--ch-accent),0.12)] p-6 reveal-scale" style={{ transitionDelay: `${i * 80}ms` }}>
                <Icon className="w-5 h-5 text-[rgba(29,71,118,0.45)] mb-3" />
                <p className="font-serif font-bold text-[var(--color-accent)] mb-1" style={{ fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1 }}>{num}</p>
                <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.35)]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition band */}
      <section className="bg-[var(--color-dark)] border-y border-[rgba(255,255,255,0.05)] px-[clamp(24px,5vw,80px)] py-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[rgba(255,255,255,0.05)]">
            {[
              { num: 'Est. 2016', label: '8+ years in operation' },
              { num: 'ISO 27001', label: 'Pursuing certification' },
              { num: 'GRA',      label: 'Compliant & certified' },
              { num: '12+',      label: 'Countries served' },
            ].map(({ num, label }) => (
              <div key={label} className="bg-[var(--color-dark)] flex flex-col items-center justify-center gap-2 py-8 px-6 text-center">
                <p className="font-serif font-black text-white" style={{ fontSize: 'clamp(16px,2vw,24px)' }}>{num}</p>
                <p className="font-mono text-[10px] tracking-[0.20em] uppercase text-[rgba(255,255,255,0.28)]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[1280px] mx-auto">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-6 reveal">How We Work</p>
          <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight mb-16 reveal" style={{ fontSize: 'clamp(32px,4vw,56px)' }}>
            Principles we do not compromise on.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map(({ num, title, body }, i) => {
              const Icon = num === '01' ? TargetIcon : num === '02' ? GlobeIcon : num === '03' ? ShieldCheckIcon : TreeIcon
              return (
                <div key={num} className="border border-[rgba(var(--ch-accent),0.08)] bg-[var(--color-surface)] p-8 relative overflow-hidden reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                  <span className="absolute bottom-3 right-5 font-serif font-bold text-[100px] leading-none text-[rgba(29,71,118,0.04)] select-none pointer-events-none">
                    {num}
                  </span>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 border border-[rgba(var(--ch-accent),0.20)] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[var(--color-accent)]" />
                    </div>
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)]">{num}</p>
                  </div>
                  <h3 className="font-serif text-[22px] font-bold text-[var(--color-text)] mb-3">{title}</h3>
                  <p className="text-[14px] text-[rgba(var(--ch-text),0.55)] leading-relaxed">{body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[var(--color-surface)] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[1280px] mx-auto">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-6 reveal">The Team</p>
          <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight mb-16 reveal" style={{ fontSize: 'clamp(32px,4vw,56px)' }}>
            Engineers. Architects. Strategists.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member: any, i: number) => {
              const photoSrc = member.photo
                ? urlFor(member.photo).width(400).height(300).url()
                : member.image
              return (
                <div key={member._id || member.name} className="border border-[rgba(var(--ch-accent),0.08)] bg-[var(--color-bg)] overflow-hidden reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                  {photoSrc && (
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <Image
                        src={photoSrc}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-serif text-[18px] font-bold text-[var(--color-text)] mb-1">{member.name}</h3>
                    <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-accent)] mb-4">{member.role}</p>
                    <p className="text-[13px] text-[rgba(var(--ch-text),0.50)] leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section id="careers" className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[1280px] mx-auto">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-6 reveal">Careers</p>
          <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight mb-4 reveal" style={{ fontSize: 'clamp(32px,4vw,56px)' }}>
            Build technology that matters.
          </h2>
          <p className="text-[15px] text-[rgba(var(--ch-text),0.55)] max-w-xl mb-16 reveal" style={{ transitionDelay: '160ms' }}>
            We hire engineers, architects, and strategists who care about impact. Every hire at Astacraft has the opportunity to shape technology outcomes for hundreds of businesses across Africa.
          </p>

          <div className="space-y-4">
            {careers.map((job: any, i: number) => (
              <div key={job._id} className="border border-[rgba(var(--ch-accent),0.12)] bg-[var(--color-surface)] p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] uppercase px-3 py-1 text-[var(--color-accent)] border border-[rgba(var(--ch-accent),0.30)]">
                      <BriefcaseIcon className="w-3 h-3" />{job.department}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] uppercase px-3 py-1 text-[rgba(var(--ch-text),0.55)] border border-[rgba(var(--ch-border),0.10)]">
                      <ClockIcon className="w-3 h-3" />{job.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] uppercase text-[rgba(var(--ch-text),0.50)]">
                      <MapPinIcon className="w-3 h-3" />{job.location}
                    </span>
                  </div>
                  <h3 className="font-serif text-[22px] font-bold text-[var(--color-text)] mb-2">{job.title}</h3>
                  <p className="text-[13px] text-[rgba(var(--ch-text),0.50)] leading-relaxed">{job.excerpt}</p>
                </div>
                <a
                  href={job.applyUrl || '/contact'}
                  className="shrink-0 font-mono text-[10px] tracking-[0.14em] uppercase bg-[var(--color-green)] text-white px-6 py-3 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
                >
                  Apply →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
