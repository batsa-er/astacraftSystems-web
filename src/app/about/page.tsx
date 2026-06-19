import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTeamMembers } from '@/sanity/queries'
import type { TeamMember } from '@/sanity/types'

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
import { Users, Layers, Clock, ShieldCheck } from 'lucide-react'

const fallbackTeam = [
  {
    _id: '1', name: 'Kwame Asante', role: 'Founder & CEO',
    bio: 'Founded Astacraft Systems to address the technology gap facing African businesses. 15+ years in enterprise software, systems architecture, and digital transformation across West Africa.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&q=80&auto=format&fit=crop&crop=face',
  },
  {
    _id: '2', name: 'Adaeze Okonkwo', role: 'Head of Software Engineering',
    bio: 'Leads our engineering practice with deep expertise in enterprise systems, cloud architecture, and scalable API design. Previously led engineering teams across EMEA.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&q=80&auto=format&fit=crop&crop=face',
  },
  {
    _id: '3', name: 'Seun Bankole', role: 'Head of Cybersecurity',
    bio: 'Certified security architect with 10+ years in enterprise security, risk management, and compliance. Former security lead at a pan-African financial institution.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&q=80&auto=format&fit=crop&crop=face',
  },
  {
    _id: '4', name: 'Yemi Adesanya', role: 'Head of Cloud & Infrastructure',
    bio: 'AWS and Azure certified cloud architect with a track record of complex cloud migrations and managed infrastructure deployments across 12+ countries.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&q=80&auto=format&fit=crop&crop=face',
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

export default async function AboutPage() {
  let team: TeamMember[] = fallbackTeam
  try {
    const t = await getTeamMembers()
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
              { Icon: Users,       num: '200+', label: 'Businesses Served' },
              { Icon: Layers,      num: '500+', label: 'Systems Deployed' },
              { Icon: Clock,       num: '8+',   label: 'Years in Technology' },
              { Icon: ShieldCheck, num: '98%',  label: 'Client Satisfaction' },
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
      <section className="bg-[#1D4776] border-y border-[rgba(255,255,255,0.08)] px-[clamp(24px,5vw,80px)] py-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[rgba(255,255,255,0.08)]">
            {[
              { num: 'Est. 2016', label: '8+ years in operation' },
              { num: 'ISO 27001', label: 'Pursuing certification' },
              { num: 'GRA',      label: 'Compliant & certified' },
              { num: '12+',      label: 'Countries served' },
            ].map(({ num, label }) => (
              <div key={label} className="bg-[#1D4776] flex flex-col items-center justify-center gap-2 py-8 px-6 text-center">
                <p className="font-serif font-black text-white" style={{ fontSize: 'clamp(16px,2vw,24px)' }}>{num}</p>
                <p className="font-mono text-[10px] tracking-[0.20em] uppercase text-[rgba(255,255,255,0.55)]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values — editorial rows */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[1280px] mx-auto">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-6 reveal">How We Work</p>
          <h2 className="font-serif font-bold text-[var(--color-text)] leading-tight mb-16 reveal" style={{ fontSize: 'clamp(32px,4vw,56px)' }}>
            Principles we do not compromise on.
          </h2>
          <div className="divide-y divide-[rgba(var(--ch-accent),0.08)]">
            {values.map(({ num, title, body }, i) => (
              <div
                key={num}
                className="grid grid-cols-1 md:grid-cols-[100px_1fr_1.4fr] gap-6 md:gap-16 py-12 items-start reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span
                  className="font-serif font-bold leading-none select-none"
                  style={{ fontSize: 'clamp(40px,5vw,64px)', color: 'rgba(29,71,118,0.15)' }}
                >
                  {num}
                </span>
                <h3 className="font-serif font-bold text-[var(--color-text)]" style={{ fontSize: 'clamp(20px,2vw,28px)' }}>
                  {title}
                </h3>
                <p className="text-[15px] text-[rgba(var(--ch-text),0.55)] leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i: number) => {
              const photoSrc = member.photo
                ? urlFor(member.photo).width(400).height(500).url()
                : member.image
              return (
                <div
                  key={member._id || member.name}
                  className="group border border-[rgba(var(--ch-accent),0.08)] bg-[var(--color-bg)] overflow-hidden card-glow reveal"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {photoSrc && (
                    <div className="relative w-full aspect-[3/4] overflow-hidden">
                      <Image
                        src={photoSrc}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,22,52,0.80)] via-[rgba(10,22,52,0.10)] to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="font-serif text-[18px] font-bold text-white mb-1">{member.name}</h3>
                        <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#55AA49]">{member.role}</p>
                      </div>
                    </div>
                  )}
                  <div className="p-5">
                    <p className="text-[13px] text-[rgba(var(--ch-text),0.55)] leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_110%,rgba(29,71,118,0.18),transparent)] pointer-events-none" />
        <div className="relative max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12 reveal">
          <div>
            <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.30)] mb-5">Work with us</p>
            <h2 className="font-serif font-bold text-white leading-tight" style={{ fontSize: 'clamp(32px,4.5vw,60px)' }}>
              Ready to build<br />something that lasts?
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/contact"
              className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[#55AA49] text-white px-10 py-4 hover:bg-[#489A3E] transition-colors duration-200"
            >
              Start a Project →
            </Link>
            <Link
              href="/careers"
              className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium border border-[rgba(255,255,255,0.35)] text-white px-10 py-4 hover:border-[rgba(255,255,255,0.65)] transition-colors duration-200"
            >
              View Careers
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
