import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getInsight, getInsights } from '@/sanity/queries'
import type { Insight, InsightDetail } from '@/sanity/types'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/JsonLd'
import { urlFor } from '@/sanity/client'

export async function generateStaticParams() {
  try {
    const ins = await getInsights()
    return ins.map((i) => ({ slug: i.slug.current }))
  } catch {
    return []
  }
}

export const revalidate = 3600

const fallbackInsights: Record<string, Omit<InsightDetail, '_id' | 'slug'>> = {
  'brand-consistency-africa': {
    title: 'Why Brand Consistency Is the Highest-Leverage Investment for African Businesses',
    tag: 'Brand Strategy', publishedAt: '2025-01-15', readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&h=514&q=80&auto=format&fit=crop',
    excerpt: 'Most growing companies underinvest in brand consistency. Here is what happens to customer perception — and revenue — when you get it right across every touchpoint.',
    relatedServices: [
      { title: 'Brand & Design', slug: 'brand-design' },
      { title: 'Digital Marketing', slug: 'digital-marketing' },
    ],
    body: `Brand consistency is not a design preference — it is a revenue driver. When your brand looks and sounds the same across your website, social media, pitch deck, and office signage, customers trust you faster and pay more.

In African markets, where word-of-mouth and referrals drive a disproportionate share of business, trust is the primary currency. A fragmented brand erodes it quietly and consistently — and in Ghana's B2B market, where procurement decisions are often influenced by reputation and perceived credibility, the cost of inconsistency compounds over time.

**What Inconsistency Actually Costs**

When we audit new clients, the most common finding is not bad design — it is three or four different versions of the same brand operating simultaneously. A logo that changed last year but only got updated on the website. A colour palette that the marketing team uses differently from the sales team. A tone of voice that is formal in proposals and informal on Instagram.

Each discrepancy is small. Cumulatively, they signal to prospects that your organisation is not buttoned up. In competitive markets — and Ghana's enterprise technology sector is becoming significantly more competitive — that signal costs deals.

We have seen it directly: a Ghanaian fintech that was consistently losing late-stage deals traced the pattern to their pitch materials looking materially different from their website, which looked different again from their proposals. Prospects were subconsciously questioning whether the organization was as organized as it claimed to be. A focused brand consistency project resolved this within eight weeks.

**The Consistency Dividend**

Companies that invest in a proper brand system — a defined visual identity, a clear voice, templates for every format — see measurable returns. Sales cycles shorten because trust is established earlier. Referrals increase because your brand is memorable enough for clients to recommend it confidently. Recruitment improves because your employer brand is coherent, signalling that the organization is professionally run.

For businesses in Ghana competing for enterprise clients or international contracts, brand consistency is often the difference between being taken seriously and being seen as a local vendor rather than a credible partner.

**Where to Start**

Begin with an audit. Pull every customer-facing asset — website, proposals, presentations, social profiles, email signatures, business cards, signage — and lay them side by side. Document every inconsistency you find. Then build a single source of truth: a brand guide that your team can actually use, with templates that make consistency the path of least resistance.

Enforce it at every new touchpoint before launch. The investment is smaller than most companies expect. The return is larger than most companies track.`,
  },
  'website-conversion-fundamentals': {
    title: 'The 5 Website Fundamentals That Drive Conversions in African Markets',
    tag: 'Web & Digital', publishedAt: '2024-12-10', readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&h=514&q=80&auto=format&fit=crop',
    excerpt: 'Most business websites in Africa are information sites, not conversion tools. The gap between the two is where leads and deals are lost.',
    relatedServices: [
      { title: 'Software Development', slug: 'software-development' },
      { title: 'Digital Marketing', slug: 'digital-marketing' },
      { title: 'Brand & Design', slug: 'brand-design' },
    ],
    body: `The average business website in Africa was built to inform, not to convert. It tells visitors what the company does, lists its services, and provides a contact email. That is not a conversion tool — it is a brochure.

The gap between a brochure and a conversion engine is where most B2B leads are lost. In Ghana's B2B market, where a qualified prospect who cannot immediately understand your value proposition will simply navigate back and call one of your competitors, the cost of a poorly converting website is measured directly in lost revenue.

**1. A Clear Primary Action**

Every page should have one primary action you want the visitor to take. Not three. Not a contact form, a newsletter signup, and a download. One. For most B2B businesses in Ghana, that is a meeting request or a strategy call. Every element of the page should support that one action — not compete with it.

**2. Social Proof Above the Fold**

Trust signals — client logos, case study metrics, testimonials — should appear within the first scroll, not buried at the bottom of the page. In markets where reputation travels by referral and buyers rely heavily on social proof to reduce purchase risk, visible evidence of your work is your most powerful conversion asset. A logo from Stanbic Bank or the Ghana Revenue Authority does more in 0.5 seconds than three paragraphs of copy.

**3. Speed on Mobile**

Over 70% of business web traffic in sub-Saharan Africa is on mobile, often on variable 3G and 4G connections. A site that loads in 6 seconds on a mid-range Android device is a site that loses more than half its visitors before they read a single word. Page speed is not a technical consideration — it is a revenue consideration. Every second of load time costs you visitors, and in Ghana's market where mobile data costs are meaningful, you are also wasting your visitors' money.

**4. Specificity in Copy**

Vague copy — "we deliver excellence", "your trusted partner", "innovative solutions" — converts poorly everywhere and catastrophically in high-trust markets like Ghana. Replace it with specific, verifiable claims: client names, project outcomes, measurable results. "We reduced onboarding time by 40% for Stanbic Business Finance" is infinitely more compelling than "we help financial institutions improve efficiency". Specificity signals competence. Vagueness signals the opposite.

**5. A Frictionless Enquiry Path**

Count the steps between a visitor and a conversation with your team. Every unnecessary step — a CAPTCHA, a long form, an email that goes to a generic inbox with a 5-day response time — reduces conversion. Make it effortless to reach you. A phone number that actually gets answered. A form that takes 60 seconds to complete. An email that gets a human response within 24 hours. In a market where many competitors are slow and impersonal, being fast and accessible is itself a competitive advantage.`,
  },
  'crm-implementation-guide-ghana': {
    title: 'CRM Implementation in Ghana: A Complete Guide for Business Leaders',
    tag: 'CRM & ERP', publishedAt: '2025-02-10', readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=514&q=80&auto=format&fit=crop',
    excerpt: 'Choosing and implementing a CRM system is one of the most impactful technology decisions a Ghana business can make. Here is what to know before you start.',
    relatedServices: [
      { title: 'CRM & ERP Systems', slug: 'crm-erp' },
      { title: 'IT Consulting', slug: 'it-consulting' },
      { title: 'Digital Transformation', slug: 'digital-transformation' },
    ],
    body: `A customer relationship management system — CRM — is the technology backbone of any sales-driven business. It tracks every prospect, manages every pipeline stage, records every client interaction, and gives leadership teams the visibility to forecast revenue with confidence. For Ghana businesses that are growing, a CRM is not a nice-to-have — it is the foundation of a scalable sales operation.

Yet CRM implementation failures are extraordinarily common, in Ghana and globally. Industry estimates put the failure rate at 40–70% of CRM projects, where "failure" means the system was implemented but not adopted, or was abandoned within 18 months. Understanding why they fail is the most important thing to know before you start.

**Why CRM Implementations Fail in Ghana**

The most common failure mode is choosing a platform before defining requirements. A business hears that Salesforce is the industry standard, signs a contract, and begins implementation — only to discover that the system is far more complex than their team can manage, costs ten times what they budgeted for customization, and requires dedicated Salesforce administrators that do not exist in the Ghanaian job market.

The second most common failure mode is treating CRM as a technology project rather than a change management project. The technology is rarely the hard part. Getting your sales team to stop using WhatsApp and spreadsheets, and to log every conversation in a system they did not ask for, is the hard part. Organizations that invest heavily in training, incentives, and leadership commitment to the new system succeed. Those that assume staff will simply start using it after a two-hour training session do not.

**Choosing the Right CRM for Your Ghana Business**

For most Ghanaian SMEs and mid-market companies, Odoo is the strongest starting point. It is open-source, meaning no per-user licence fees, and it covers CRM, sales, accounting, inventory, and HR in a single integrated platform. It supports Ghana Cedis natively, can be configured for GRA VAT compliance, and has a growing ecosystem of local implementation partners including Astacraft Systems.

Salesforce is the right choice for enterprise organizations with complex, multi-stage sales processes, large sales teams, and the budget for proper implementation and ongoing administration. It is the global standard for a reason — but it requires significant investment to configure correctly for Ghanaian market conditions.

HubSpot works well for marketing-driven businesses focused on inbound lead generation, content marketing, and email automation. It is easier to implement than Salesforce and has a generous free tier, but it is primarily a marketing tool that has expanded into CRM — not a purpose-built sales system.

**What a Good CRM Implementation Looks Like**

A well-run CRM implementation in Ghana follows a clear sequence: first, requirements definition (what does your sales process actually look like, step by step?); then platform selection based on those requirements; then configuration and customization; then data migration from whatever you were using before; then staff training that focuses on daily workflows rather than system features; then a parallel running period where old and new processes operate simultaneously; and finally, cutover with dedicated support for the first 30 days.

Timeline: 6–10 weeks for a focused CRM implementation. 3–5 months for a full ERP deployment that includes finance, HR, and operations alongside sales.

**The ROI of a CRM Done Right**

Clients who implement CRM correctly — with proper configuration, clean data migration, and high adoption rates — typically see 25–40% improvement in sales cycle velocity within the first six months. Pipeline visibility improves from guesswork to data-driven forecasting. Leads stop falling through the cracks. Handoffs between marketing and sales become documented and measurable.

The investment pays for itself quickly. The question is not whether to implement a CRM, but how to do it right the first time.`,
  },
  'b2b-social-creative-lessons': {
    title: 'What Actually Works in B2B Social Media Creative — Lessons from 50+ Campaigns',
    tag: 'Marketing', publishedAt: '2024-11-20', readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=514&q=80&auto=format&fit=crop',
    excerpt: 'B2B social content in Africa tends to be too formal or too promotional. Here is what we have learned about creative that builds trust and drives enquiries.',
    relatedServices: [
      { title: 'Digital Marketing', slug: 'digital-marketing' },
      { title: 'Brand & Design', slug: 'brand-design' },
    ],
    body: `After producing creative for more than 50 B2B social campaigns across LinkedIn, Instagram, and Twitter/X in African markets — with particular focus on Ghana, Nigeria, and Kenya — the pattern is clear: most B2B brands are either too formal or too promotional, and both kill engagement.

The content that actually builds pipeline sits in a different register entirely. It is specific, it takes positions, and it shows the work.

**What Does Not Work**

Corporate announcements with stock photography. Award posts with no context about what the award means or why it matters. Promotional content that leads with the product rather than the problem it solves. Thought leadership articles that say nothing specific because the author is afraid to take a position that might alienate someone.

These formats generate low engagement and zero enquiries. They exist because they feel safe and require no creative courage — not because they perform.

In Ghana's LinkedIn ecosystem specifically, the most common failure is corporate formality that reads as distant and impersonal in a market where business relationships are built on personal trust. The B2B buyers who follow your page on LinkedIn are not looking for press releases — they are looking for evidence that you understand their problems and know how to solve them.

**What Actually Works**

Specificity wins without exception. A post that says "we helped a Ghana fintech reduce customer onboarding drop-off by 34% by redesigning one screen in their mobile app — here is what we changed and why" outperforms "we deliver results for financial services clients" by a factor of ten or more. Specificity signals competence. It also gives the reader something they can actually learn from, which is why they follow you.

Behind-the-scenes content works. Showing the work — the brief, the process, the internal debate, the decision and why it was made — builds trust faster than any case study PDF. People buy from people who show their thinking.

Point-of-view content works. Taking a clear, specific position on a contested question in your industry generates discussion, shares, and inbound enquiries from people who agree with your position. Fence-sitting generates nothing. If you think Salesforce is the wrong choice for most Ghana SMEs, say so and explain why. That article will find its audience.

Data-driven posts work well for B2B audiences in Ghana. If you have proprietary data — benchmarks, survey results, before-and-after metrics from client work — publish it. Original data is the scarcest resource in most industries and one of the most shared formats on LinkedIn.

**The Creative Brief That Drives Enquiries**

For every piece of B2B social content, answer these three questions before briefing the designer or writing a word: What specific thing does this teach or show? Why would someone who fits our ideal customer profile share this with a colleague? What should someone do after seeing this?

If you cannot answer all three, the brief is not ready. The most common failure in B2B social creative is designing before thinking — producing visually polished content that has no clear purpose. The question "what should someone think, feel, or do after seeing this?" should be answered before anything else.`,
  },
  'rebrand-checklist': {
    title: 'The Rebrand Checklist: When to Rebrand, When to Refresh, and When to Leave It Alone',
    tag: 'Brand Identity', publishedAt: '2024-10-05', readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=514&q=80&auto=format&fit=crop',
    excerpt: 'Not every brand problem needs a full rebrand. A strategic framework for diagnosing what your brand actually needs — and what it would cost to get it wrong.',
    relatedServices: [
      { title: 'Brand & Design', slug: 'brand-design' },
      { title: 'IT Consulting', slug: 'it-consulting' },
    ],
    body: `Every quarter, we speak to Ghana companies that want a rebrand when what they actually need is a refresh — or sometimes nothing at all. The distinction matters enormously because a full rebrand is a significant investment, and doing it unnecessarily is expensive. Missing the moment when it is genuinely needed is more expensive still.

Here is the framework we use to diagnose which situation a brand is actually in — and the diagnostic questions you should ask before briefing any agency.

**When to Leave It Alone**

If your brand is recognised in your target market, your customers describe you consistently in terms you are happy with, and your sales team is not losing deals because of how you present — your brand is working. Do not touch it.

The instinct to rebrand often comes from internal fatigue: the leadership team has looked at the same logo for five years and is bored of it. That is not a strategic reason to rebrand. Customer-facing assets age more slowly than internal perception suggests. Many of the most effective brands in Ghana and globally have maintained visual identities for 10–15 years with only minor refinements.

**When to Refresh**

A refresh — updating the visual execution while preserving the core identity — is appropriate in three situations: when your brand looks dated relative to how your competitive set presents; when you have expanded into new markets or new sectors that require different communication and your existing brand does not travel; or when execution quality has drifted significantly across formats and channels due to inconsistent use over time.

A refresh keeps the equity you have built while raising the quality of expression. It typically takes four to eight weeks and costs a fraction of a full rebrand. For most Ghanaian businesses that feel their brand is "a bit tired", a refresh — not a rebrand — is almost always the right answer.

**When to Rebrand**

A full rebrand is necessary when the business has fundamentally changed and the existing brand cannot carry the new meaning without creating confusion. Triggers include: new ownership that needs to signal a strategic shift; a merger or acquisition that requires unified identity; a deliberate move upmarket where the existing brand anchors you at a lower price point than you want to occupy; a pivot into new markets or products that are inconsistent with your existing positioning.

It is also necessary — and this is often overlooked — when the existing brand carries negative associations that cannot be overcome by better execution. If your brand is associated in your market with a specific negative perception, no amount of design refinement will resolve it. The name, the visual identity, or both need to change.

**The Diagnostic Questions**

Ask these questions honestly before briefing any design agency: Do customers describe our brand the way we want to be described — or something materially different? Is our brand a reason we win deals, lose deals, or is it neutral? Has the business changed enough in the last 3 years that our current brand no longer accurately represents who we are and where we are going? Are we considering this because the business genuinely needs it, or because someone internally is bored?

Honest answers to these four questions will tell you what you actually need. Any agency that recommends a full rebrand without asking them is not working in your interest.`,
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params

  let ins: InsightDetail | null = null
  try { ins = await getInsight(slug) } catch {}
  if (!ins) ins = (fallbackInsights[slug] as InsightDetail | undefined) ?? null
  if (!ins) return { title: 'Insight | Astacraft Systems Insights' }

  const title = `${ins.title} | Astacraft Systems`
  const description = (ins.seoDescription || ins.excerpt || '').slice(0, 160)

  return {
    title,
    description,
    alternates: { canonical: `https://astacraftsystems.com/insights/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://astacraftsystems.com/insights/${slug}`,
      type: 'article',
      ...(ins.publishedAt && { publishedTime: ins.publishedAt }),
    },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let ins: InsightDetail | null = null
  try {
    ins = await getInsight(slug)
  } catch {}
  if (!ins) ins = (fallbackInsights[slug] as InsightDetail | undefined) ?? null
  if (!ins) notFound()

  const bodyText: string = ins.body || ins.excerpt || ''

  const allFallback = Object.entries(fallbackInsights)
    .filter(([key]) => key !== slug)
    .slice(0, 2)
    .map(([key, val]) => ({ ...(val as InsightDetail), slug: { current: key }, _id: key } as Insight))

  let readNext: Insight[] = allFallback
  try {
    const list = await getInsights()
    if (list?.length) {
      readNext = list.filter((i) => i.slug.current !== slug).slice(0, 2)
    }
  } catch {}

  const coverSrc = ins.coverImage
    ? urlFor(ins.coverImage).width(1200).height(514).url()
    : ins.image ?? null

  return (
    <>
      <JsonLd data={[
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          '@id': `https://astacraftsystems.com/insights/${slug}#article`,
          headline: ins.title,
          description: ins.excerpt,
          datePublished: ins.publishedAt,
          dateModified: ins.publishedAt,
          url: `https://astacraftsystems.com/insights/${slug}`,
          author: { '@id': 'https://astacraftsystems.com/#organization' },
          publisher: { '@id': 'https://astacraftsystems.com/#organization' },
          mainEntityOfPage: `https://astacraftsystems.com/insights/${slug}`,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home',     item: 'https://astacraftsystems.com' },
            { '@type': 'ListItem', position: 2, name: 'Insights', item: 'https://astacraftsystems.com/insights' },
            { '@type': 'ListItem', position: 3, name: ins.title,  item: `https://astacraftsystems.com/insights/${slug}` },
          ],
        },
      ]} />

      {/* Hero — image as background, text overlaid */}
      <section
        className={`relative overflow-hidden flex flex-col justify-end ${coverSrc ? 'bg-[var(--color-dark)]' : 'bg-[var(--color-bg)]'}`}
        style={{ minHeight: coverSrc ? '520px' : undefined }}
      >
        {coverSrc && (
          <>
            <Image src={coverSrc} alt={ins.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,30,64,0.95)] via-[rgba(13,30,64,0.60)] to-[rgba(13,30,64,0.20)]" />
          </>
        )}

        <div className={`relative z-10 px-[clamp(24px,5vw,80px)] pb-14 ${coverSrc ? 'pt-36' : 'pt-40'}`}>
          <div className="max-w-[800px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Link
                href="/insights"
                className={`font-mono text-[10px] tracking-[0.16em] uppercase transition-colors ${coverSrc ? 'text-[rgba(255,255,255,0.55)] hover:text-white' : 'text-[rgba(var(--ch-text),0.40)] hover:text-[var(--color-accent)]'}`}
              >
                ← Insights
              </Link>
              <span className={coverSrc ? 'text-[rgba(255,255,255,0.25)]' : 'text-[rgba(var(--ch-text),0.20)]'}>/</span>
              <span className={`font-mono text-[11px] tracking-[0.2em] uppercase px-3 py-1 border ${coverSrc ? 'text-white border-[rgba(255,255,255,0.35)]' : 'text-[var(--color-accent)] border-[rgba(var(--ch-accent),0.30)]'}`}>
                {ins.tag}
              </span>
            </div>

            <h1
              className={`font-serif font-bold leading-tight mb-6 ${coverSrc ? 'text-white' : 'text-[var(--color-text)]'}`}
              style={{ fontSize: 'clamp(32px,5vw,56px)' }}
            >
              {ins.title}
            </h1>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${coverSrc ? 'bg-white/20' : 'bg-[#1D4776]'}`}>
                  <span className="font-mono text-[9px] font-bold text-white leading-none">AS</span>
                </div>
                <span className={`font-mono text-[10px] tracking-[0.1em] ${coverSrc ? 'text-[rgba(255,255,255,0.65)]' : 'text-[rgba(var(--ch-text),0.50)]'}`}>
                  Astacraft Systems
                </span>
              </div>
              <span className={coverSrc ? 'text-[rgba(255,255,255,0.30)]' : 'text-[rgba(var(--ch-text),0.15)]'}>·</span>
              <span className={`font-mono text-[10px] tracking-[0.1em] ${coverSrc ? 'text-[rgba(255,255,255,0.55)]' : 'text-[rgba(var(--ch-text),0.35)]'}`}>
                {formatDate(ins.publishedAt)}
              </span>
              <span className={coverSrc ? 'text-[rgba(255,255,255,0.30)]' : 'text-[rgba(var(--ch-text),0.15)]'}>·</span>
              <span className={`font-mono text-[10px] tracking-[0.1em] ${coverSrc ? 'text-[rgba(255,255,255,0.55)]' : 'text-[rgba(var(--ch-text),0.35)]'}`}>
                {ins.readTime}
              </span>
            </div>
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
                  return (
                    <h2 key={i} className="font-serif text-[26px] font-bold text-[var(--color-text)] mt-12 mb-2 leading-snug">
                      {para.replace(/\*\*/g, '')}
                    </h2>
                  )
                }
                if (para.startsWith('**')) {
                  const parts = para.split('**')
                  return (
                    <p key={i} className="text-[16px] text-[rgba(var(--ch-text),0.82)] leading-[1.85]">
                      {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-[var(--color-text)] font-semibold">{p}</strong> : p)}
                    </p>
                  )
                }
                if (i === 0) {
                  return (
                    <p key={i} className="text-[19px] text-[var(--color-text)] leading-[1.75] font-medium">
                      {para}
                    </p>
                  )
                }
                return <p key={i} className="text-[16px] text-[rgba(var(--ch-text),0.82)] leading-[1.85]">{para}</p>
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Read next */}
      {readNext.length > 0 && (
        <section className="bg-[var(--color-surface)] border-t border-[rgba(var(--ch-accent),0.08)] px-[clamp(24px,5vw,80px)] py-16">
          <div className="max-w-[800px] mx-auto">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-8">Read next</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {readNext.map((next) => {
                const nextSlug = next.slug.current
                const nextImg = next.coverImage
                  ? urlFor(next.coverImage).width(600).height(340).url()
                  : next.image ?? null
                return (
                  <Link
                    key={nextSlug}
                    href={`/insights/${nextSlug}`}
                    className="group flex flex-col border border-[rgba(var(--ch-accent),0.12)] bg-[var(--color-panel)] hover:border-[rgba(var(--ch-accent),0.30)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                  >
                    {nextImg && (
                      <div className="relative w-full aspect-[16/9] overflow-hidden">
                        <Image src={nextImg} alt={next.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      {next.tag && (
                        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-accent)] mb-3 self-start">
                          {next.tag}
                        </span>
                      )}
                      <h3 className="font-serif font-semibold text-[17px] text-[var(--color-text)] leading-snug group-hover:text-[var(--color-accent)] transition-colors duration-200 mb-3">
                        {next.title}
                      </h3>
                      <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[rgba(var(--ch-text),0.30)] group-hover:text-[var(--color-accent)] mt-auto transition-colors duration-200">
                        Read article →
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      {(ins.relatedServices || []).length > 0 && (
        <section className="bg-[var(--color-surface)] border-t border-[rgba(var(--ch-accent),0.08)] px-[clamp(24px,5vw,80px)] py-12">
          <div className="max-w-[800px] mx-auto">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[rgba(var(--ch-text),0.35)] mb-5">Related services</p>
            <div className="flex flex-wrap gap-3">
              {(ins.relatedServices as { title: string; slug: string }[]).map(({ title, slug: svcSlug }) => (
                <Link
                  key={svcSlug}
                  href={`/services/${svcSlug}`}
                  className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] uppercase border border-[rgba(var(--ch-accent),0.20)] text-[rgba(var(--ch-text),0.55)] px-5 py-3 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-200"
                >
                  {title} →
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#1D4776] px-[clamp(24px,5vw,80px)] py-24 text-center">
        <div className="max-w-[700px] mx-auto">
          <h2 className="font-serif font-bold text-white mb-4" style={{ fontSize: 'clamp(24px,3vw,40px)' }}>
            Want this applied to your business?
          </h2>
          <p className="text-[rgba(255,255,255,0.60)] mb-8 text-[15px] leading-relaxed">
            Book a complimentary strategy call and we will show you how these principles apply to your specific market and stage.
          </p>
          <Link
            href="/contact"
            className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-white text-[#1D4776] px-10 py-4 hover:bg-[#F6F7FB] transition-colors duration-200"
          >
            Book Strategy Call →
          </Link>
        </div>
      </section>
    </>
  )
}
