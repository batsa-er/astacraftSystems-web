import Link from 'next/link'
import { getInsight, getInsights } from '@/sanity/queries'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  try {
    const ins = await getInsights()
    return ins.map((i: any) => ({ slug: i.slug?.current || i.slug }))
  } catch {
    return []
  }
}

const fallbackInsights: Record<string, any> = {
  'brand-consistency-africa': {
    title: 'Why Brand Consistency Is the Highest-Leverage Investment for African Businesses',
    tag: 'Brand Strategy', publishedAt: '2025-01-15', readTime: '7 min read',
    excerpt: 'Most growing companies underinvest in brand consistency. Here is what happens to customer perception — and revenue — when you get it right across every touchpoint.',
    body: `Brand consistency is not a design preference — it is a revenue driver. When your brand looks and sounds the same across your website, social media, pitch deck, and office signage, customers trust you faster and pay more.

In African markets, where word-of-mouth and referrals drive a disproportionate share of business, trust is the primary currency. A fragmented brand erodes it quietly and consistently.

**What Inconsistency Actually Costs**

When we audit new clients, the most common finding is not bad design — it is three or four different versions of the same brand operating simultaneously. A logo that changed last year but only got updated on the website. A colour palette that the marketing team uses differently from the sales team. A tone of voice that is formal in proposals and informal on Instagram.

Each discrepancy is small. Cumulatively, they signal to prospects that your organisation is not buttoned up. In competitive markets, that signal costs deals.

**The Consistency Dividend**

Companies that invest in a proper brand system — a defined visual identity, a clear voice, templates for every format — see measurable returns. Sales cycles shorten because trust is established earlier. Referrals increase because your brand is memorable. Recruitment improves because your employer brand is coherent.

**Where to Start**

Begin with an audit. Pull every customer-facing asset and lay them side by side. Identify the inconsistencies. Then build a single source of truth — a brand guide that your team can actually use — and enforce it at every new touchpoint before launch.

The investment is smaller than most companies expect. The return is larger than most companies track.`,
  },
  'website-conversion-fundamentals': {
    title: 'The 5 Website Fundamentals That Drive Conversions in African Markets',
    tag: 'Web & Digital', publishedAt: '2024-12-10', readTime: '6 min read',
    excerpt: 'Most business websites in Africa are information sites, not conversion tools. The gap between the two is where leads and deals are lost.',
    body: `The average business website in Africa was built to inform, not to convert. It tells visitors what the company does, lists its services, and provides a contact email. That is not a conversion tool — it is a brochure.

The gap between a brochure and a conversion engine is where most B2B leads are lost.

**1. A Clear Primary Action**

Every page should have one primary action you want the visitor to take. Not three. Not a contact form, a newsletter signup, and a download. One. For most B2B businesses, that is a meeting request or a strategy call.

**2. Social Proof Above the Fold**

Trust signals — client logos, case study metrics, testimonials — should appear within the first scroll, not buried at the bottom of the page. In markets where reputation travels by referral, visible proof of work is your most powerful conversion asset.

**3. Speed on Mobile**

Over 70% of business web traffic in sub-Saharan Africa is on mobile, often on variable network connections. A site that loads in 6 seconds on a mid-range Android is a site that loses more than half its visitors before they read a word.

**4. Specificity in Copy**

Vague copy — "we deliver excellence" — converts poorly everywhere and catastrophically in high-trust markets. Replace it with specific claims: client names, project outcomes, measurable results. Specificity signals competence.

**5. A Frictionless Enquiry Path**

Count the steps between a visitor and a conversation with your team. Every unnecessary step — a CAPTCHA, a long form, an email that goes to a generic inbox — reduces conversion. Make it effortless to reach you.`,
  },
  'b2b-social-creative-lessons': {
    title: 'What Actually Works in B2B Social Media Creative — Lessons from 50+ Campaigns',
    tag: 'Marketing', publishedAt: '2024-11-20', readTime: '8 min read',
    excerpt: 'B2B social content in Africa tends to be too formal or too promotional. Here is what we have learned about creative that builds trust and drives enquiries.',
    body: `After producing creative for more than 50 B2B social campaigns across LinkedIn, Instagram, and Twitter/X in African markets, the pattern is clear: most B2B brands are either too formal or too promotional, and both kill engagement.

The content that actually builds pipeline sits in a different register entirely.

**What Does Not Work**

Corporate announcements with stock photography. Award posts with no context. Promotional content that leads with the product rather than the problem. Thought leadership articles that say nothing specific because the author is afraid to take a position.

These formats generate low engagement and zero enquiries. They exist because they feel safe, not because they perform.

**What Actually Works**

Specificity wins. A post that says "we helped a fintech client reduce onboarding drop-off by 34% by changing one screen" outperforms "we deliver results for financial services clients" by a factor of ten.

Behind-the-scenes content works. Showing the work — the brief, the process, the decision — builds trust faster than any case study PDF.

Point-of-view content works. Taking a clear position on a contested question in your industry generates discussion, shares, and inbound enquiries. Being neutral generates nothing.

**The Creative Brief That Drives Enquiries**

For every piece of B2B social content, answer these three questions before briefing the designer: What specific thing does this teach or show? Why would someone share this? What should someone do after seeing it?

If you cannot answer all three, the brief is not ready.`,
  },
  'rebrand-checklist': {
    title: 'The Rebrand Checklist: When to Rebrand, When to Refresh, and When to Leave It Alone',
    tag: 'Brand Identity', publishedAt: '2024-10-05', readTime: '9 min read',
    excerpt: 'Not every brand problem needs a full rebrand. A strategic framework for diagnosing what your brand actually needs — and what it would cost to get it wrong.',
    body: `Every quarter, we speak to companies that want a rebrand when what they actually need is a refresh — or sometimes nothing at all. The distinction matters because a full rebrand is a significant investment, and doing it unnecessarily is expensive. Missing the moment when it is genuinely needed is more expensive still.

Here is the framework we use to diagnose which situation a brand is actually in.

**When to Leave It Alone**

If your brand is recognised, your customers describe you consistently, and your sales team is not losing deals because of how you present, your brand is working. The instinct to rebrand often comes from internal fatigue — the team has looked at the same logo for five years and is bored of it. That is not a strategic reason to rebrand.

**When to Refresh**

A refresh — updating the visual execution while preserving the core identity — is appropriate when your brand looks dated relative to the competitive set, when you have expanded into new markets that require different communication, or when execution quality has drifted across formats and channels.

A refresh keeps the equity you have built and raises the quality of the expression. It typically takes four to eight weeks and a fraction of the budget of a full rebrand.

**When to Rebrand**

A full rebrand is necessary when the business has fundamentally changed — new ownership, new market position, a merger, or a deliberate move upmarket — and the existing brand cannot carry the new meaning without confusion.

It is also necessary when the existing brand carries negative associations that cannot be overcome with better execution.

**The Diagnostic Questions**

Ask these before briefing an agency: Do customers describe our brand the way we want to be described? Is our brand a reason we win or lose deals? Has the business changed enough that our current brand no longer reflects who we are?

Honest answers to these questions will tell you what you actually need.`,
  },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function InsightPage({ params }: { params: { slug: string } }) {
  let ins: any = null
  try {
    ins = await getInsight(params.slug)
  } catch {}
  if (!ins) ins = fallbackInsights[params.slug]
  if (!ins) notFound()

  const bodyText: string = ins.body || ins.excerpt || ''

  return (
    <>
      {/* Header */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] pt-40 pb-16">
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/insights" className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(var(--ch-text),0.40)] hover:text-[var(--color-accent)] transition-colors">
              ← Insights
            </Link>
            <span className="text-[rgba(var(--ch-text),0.20)]">/</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase px-3 py-1 text-[var(--color-accent)] border border-[rgba(var(--ch-accent),0.30)]">{ins.tag}</span>
          </div>
          <h1 className="font-serif font-bold text-[var(--color-text)] leading-tight mb-6"
            style={{ fontSize: 'clamp(32px,5vw,64px)' }}>{ins.title}</h1>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.1em] text-[rgba(var(--ch-text),0.35)]">{formatDate(ins.publishedAt)}</span>
            <span className="text-[rgba(var(--ch-text),0.15)]">·</span>
            <span className="font-mono text-[10px] tracking-[0.1em] text-[rgba(var(--ch-text),0.35)]">{ins.readTime}</span>
            <span className="text-[rgba(var(--ch-text),0.15)]">·</span>
            <span className="font-mono text-[10px] tracking-[0.1em] text-[rgba(var(--ch-text),0.35)]">Apex Growth</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] pb-24">
        <div className="max-w-[800px] mx-auto">
          <div className="border-t border-[rgba(var(--ch-accent),0.10)] pt-12">
            <div className="prose-custom space-y-6">
              {bodyText.split('\n\n').map((para, i) => {
                if (para.startsWith('**') && para.endsWith('**')) {
                  return <h2 key={i} className="font-serif text-[24px] font-bold text-[var(--color-text)] mt-10">{para.replace(/\*\*/g, '')}</h2>
                }
                if (para.startsWith('**')) {
                  const parts = para.split('**')
                  return (
                    <p key={i} className="text-[16px] text-[rgba(var(--ch-text),0.70)] leading-[1.85]">
                      {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-[var(--color-text)] font-semibold">{p}</strong> : p)}
                    </p>
                  )
                }
                return <p key={i} className="text-[16px] text-[rgba(var(--ch-text),0.70)] leading-[1.85]">{para}</p>
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-surface)] border-t border-[rgba(var(--ch-accent),0.08)] px-[clamp(24px,5vw,80px)] py-24 text-center">
        <div className="max-w-[700px] mx-auto">
          <h2 className="font-serif font-bold text-[var(--color-text)] mb-4" style={{ fontSize: 'clamp(24px,3vw,40px)' }}>
            Want this applied to your business?
          </h2>
          <p className="text-[rgba(var(--ch-text),0.55)] mb-8">
            Book a strategy call and we will show you how these principles apply to your specific market and stage.
          </p>
          <Link
            href="/contact"
            className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-accent)] text-white px-10 py-4 hover:bg-[var(--color-accent-hover)] transition-colors duration-200"
          >
            Book Strategy Call
          </Link>
        </div>
      </section>
    </>
  )
}
