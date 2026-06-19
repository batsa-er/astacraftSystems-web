import type { Metadata } from 'next'
import Link from 'next/link'
import { getServices, getServiceBySlug } from '@/sanity/queries'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/JsonLd'

export const revalidate = 3600
import {
  CodeIcon, ZapIcon, ServerIcon, ShieldCheckIcon,
  DatabaseIcon, MegaphoneIcon, BrushIcon, ConsultIcon,
} from '@/components/Icons'

export async function generateStaticParams() {
  try {
    const s = await getServices()
    return s.map((svc: any) => ({ slug: svc.slug?.current || svc.slug }))
  } catch {
    return [
      'software-development', 'digital-transformation', 'cloud-solutions', 'cybersecurity',
      'crm-erp', 'digital-marketing', 'brand-design', 'it-consulting',
    ].map(slug => ({ slug }))
  }
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'software-development':   CodeIcon,
  'digital-transformation': ZapIcon,
  'cloud-solutions':        ServerIcon,
  'cybersecurity':          ShieldCheckIcon,
  'crm-erp':                DatabaseIcon,
  'digital-marketing':      MegaphoneIcon,
  'brand-design':           BrushIcon,
  'it-consulting':          ConsultIcon,
}

const fallbackServices: Record<string, any> = {
  'software-development': {
    number: '01', title: 'Software Development', tagline: 'Custom software engineered for scale.',
    description: 'Full-stack web, mobile, and enterprise application development. From MVPs to large-scale systems, we architect, build, and maintain software that performs reliably at scale.',
    detail: 'We build software end-to-end — from initial architecture to production deployment and long-term maintenance. Our engineering team works in modern stacks (React, Next.js, Node.js, Python, Go) and follows agile practices that keep projects on time and on budget. Every system we build is designed for reliability, security, and long-term maintainability.\n\nOperating across Ghana and West Africa, we bring specific expertise to the challenges African businesses face: building mobile-first platforms that perform on variable network conditions, integrating with local payment providers such as MTN Mobile Money, Vodafone Cash, and AirtelTigo, and architecting systems that remain fast even when bandwidth is constrained. Whether you are a Ghana-based startup shipping your first product or an enterprise modernizing a legacy platform, we apply the same engineering discipline — understand the business problem deeply, design the right architecture, and ship with precision.',
    outcomes: ['Custom web application development', 'Mobile apps (iOS & Android)', 'Enterprise software integration', 'API design & development', 'Legacy system modernization', 'Ongoing maintenance & support'],
    process: ['Discovery & requirements', 'System architecture design', 'UI/UX design & prototyping', 'Agile development sprints', 'QA, testing & security review', 'Deployment, launch & handoff'],
    stats: [{ num: '200+', label: 'Systems built' }, { num: '98%', label: 'On-time delivery' }, { num: '8+', label: 'Years in development' }],
    faq: [
      {
        q: 'How long does custom software development take for a Ghana-based business?',
        a: 'Timeline depends on complexity. A web platform or mobile app typically takes 8–16 weeks from discovery to launch. Enterprise systems with multiple integrations can take 4–9 months. We work in two-week agile sprints with demos after each cycle, so you see real progress throughout — not just at the end.',
      },
      {
        q: 'Can you build software that works on slow or unreliable internet connections?',
        a: 'Yes. This is a core capability we have refined for African markets. We build progressive web apps, offline-first architectures, and data-efficient mobile experiences that continue working on 2G and 3G connections. Optimizing for Ghana\'s network realities is standard practice in every project we deliver, not an afterthought.',
      },
      {
        q: 'Do you work with startups or only large enterprises?',
        a: 'Both. We have helped early-stage Ghanaian startups build and launch their first products, and we run complex multi-system projects for enterprise and government clients. The engineering standards we apply are the same regardless of company size — what changes is scope and timeline.',
      },
      {
        q: 'Do you provide ongoing support and maintenance after the project launches?',
        a: 'Yes. Every engagement includes a post-launch warranty period, and we offer ongoing maintenance retainers for clients who need dedicated engineering support for updates, security patches, and new features. Most clients continue working with us well beyond the initial launch date.',
      },
    ],
  },
  'digital-transformation': {
    number: '02', title: 'Digital Transformation', tagline: 'Modernize operations. Accelerate growth.',
    description: 'We help organizations redesign processes, automate workflows, and replace legacy systems with modern technology — reducing operational costs and unlocking new capability.',
    detail: 'Digital transformation is not a one-time project — it is a fundamental shift in how an organization uses technology to operate and compete. We guide businesses through every stage of that journey: diagnosing where manual processes and legacy systems are creating friction, designing the target operating model, and executing change in phases that maintain business continuity.\n\nFor Ghanaian organizations, this often means replacing paper-based workflows with digitized systems, connecting siloed departments onto shared platforms, and building the data infrastructure that executive teams need to make faster decisions. We have led transformations across banking, telecoms, healthcare, NGOs, and government agencies in Ghana and across West Africa — and we understand the change management challenges that are unique to African organizational cultures.',
    outcomes: ['Business process automation', 'Workflow digitization', 'Legacy system replacement', 'Change management & training', 'Technology roadmap development', 'ROI measurement frameworks'],
    process: ['Current state assessment', 'Gap analysis & opportunity mapping', 'Roadmap & business case', 'Pilot implementation', 'Full rollout & change management', 'Optimization & continuous improvement'],
    stats: [{ num: '60%', label: 'Avg. process efficiency gain' }, { num: '40+', label: 'Transformations delivered' }, { num: '18mo', label: 'Avg. transformation timeline' }],
    faq: [
      {
        q: 'How do I know if my Ghana business is ready for digital transformation?',
        a: 'If your team is managing key business processes through spreadsheets, paper forms, or disconnected tools — and it is slowing you down or causing errors — you are ready. We start every engagement with a current-state assessment that identifies exactly where technology can have the biggest impact, and we build a business case that shows the projected ROI before any commitment to a full project.',
      },
      {
        q: 'Will digital transformation disrupt our day-to-day operations?',
        a: 'Not if it is managed correctly. We implement changes in phases, starting with the areas of highest friction and lowest risk. Staff training and change management are embedded in every phase — not bolted on at the end. Our approach is designed so your team can keep working while the transformation happens around them.',
      },
      {
        q: 'Do you work with NGOs and government agencies in Ghana?',
        a: 'Yes. A significant portion of our transformation work is in the public and non-profit sectors. We understand procurement processes, donor reporting requirements, and the specific constraints of government and NGO technology environments in Ghana. We have experience navigating these engagements efficiently.',
      },
      {
        q: 'How long does a digital transformation project take?',
        a: 'It depends on scope. A focused process automation project can deliver results in 8–12 weeks. A full organizational transformation — replacing core systems, retraining staff, and restructuring data flows — typically runs 12–24 months. We structure projects in phases so you can see value and measure ROI before committing to each subsequent stage.',
      },
    ],
  },
  'cloud-solutions': {
    number: '03', title: 'Cloud Solutions', tagline: 'Infrastructure that scales with you.',
    description: 'Cloud architecture, migration, and managed services on AWS, Microsoft Azure, and Google Cloud. Secure, reliable, cost-optimized infrastructure for businesses at any scale.',
    detail: 'Cloud infrastructure is the backbone of every modern business. We help organizations migrate from on-premise servers to cloud, architect new cloud-native systems from scratch, and manage ongoing infrastructure with the reliability of a dedicated team. Our certified cloud architects work across AWS, Azure, and GCP — designing infrastructure that matches your actual workload, not the workload you might hypothetically have one day.\n\nFor Ghana-based businesses, cloud adoption brings particular advantages: eliminating the cost and risk of maintaining physical servers in a country where reliable power and cooling are challenges, accessing global infrastructure with Verifiable uptime SLAs, and enabling remote teams to work from anywhere. We also address the data sovereignty and latency considerations that matter most to African businesses — including which cloud regions minimize latency for users in West Africa and how to structure data storage to meet Ghana\'s regulatory requirements.',
    outcomes: ['Cloud migration & lift-and-shift', 'Architecture design (AWS/Azure/GCP)', 'Managed cloud services', 'DevOps & CI/CD pipelines', 'Cost optimization & governance', 'Disaster recovery & backup'],
    process: ['Cloud readiness assessment', 'Architecture design & costing', 'Migration planning & phasing', 'Execution & cutover', 'Performance optimization', 'Ongoing managed services'],
    stats: [{ num: '35%', label: 'Avg. infrastructure cost reduction' }, { num: '99.9%', label: 'Uptime SLA' }, { num: '50+', label: 'Cloud migrations completed' }],
    faq: [
      {
        q: 'Is cloud computing reliable in Ghana given our internet infrastructure?',
        a: 'Yes. Cloud reliability is separate from local internet reliability. Your data and applications live on globally redundant servers with 99.9%+ uptime guarantees — far more reliable than any on-premise server room. When your internet connection drops, your data is safe and your systems continue running. We also architect offline-capable applications for environments where connectivity is intermittent.',
      },
      {
        q: 'Which cloud platform is best for Ghana businesses — AWS, Azure, or Google Cloud?',
        a: 'It depends on your existing software stack and business requirements. Microsoft Azure is often the best fit for businesses already using Microsoft 365 or Windows Server environments. AWS has the broadest service catalog and is ideal for new cloud-native builds. Google Cloud excels for data analytics and machine learning workloads. We assess your specific situation and recommend the platform that gives you the best combination of performance, cost, and integration — not the one we happen to prefer.',
      },
      {
        q: 'How much can a Ghana business save by moving to the cloud?',
        a: 'Our clients typically see 25–40% reduction in total infrastructure cost within the first year. This comes from eliminating hardware capital expenditure, reducing IT staff time spent on server maintenance, and right-sizing compute resources so you only pay for what you use. We provide a detailed cost comparison during the assessment phase so you can see the numbers before committing.',
      },
      {
        q: 'Can you migrate our existing on-premise system to the cloud without downtime?',
        a: 'In most cases, yes. We plan migrations in phases with parallel running periods — your old system and the new cloud environment operate simultaneously during the cutover, which means zero or near-zero downtime for your team. For mission-critical systems, we schedule final cutovers during low-traffic windows and provide rollback plans as standard.',
      },
    ],
  },
  'cybersecurity': {
    number: '04', title: 'Cybersecurity', tagline: 'Enterprise-grade protection.',
    description: 'Security audits, penetration testing, compliance frameworks, and 24/7 monitoring — designed to protect your business from modern threats and meet regulatory requirements.',
    detail: 'Cybersecurity is no longer optional for businesses of any size in Ghana. The Bank of Ghana\'s cybersecurity directives, Ghana\'s Data Protection Act 2012, and the increasing sophistication of attacks targeting West African organizations have made security a board-level concern. A single breach can cost more than years of security investment — in downtime, data loss, regulatory fines, and reputational damage that takes years to rebuild.\n\nOur certified security team delivers the full spectrum of protection: systematic vulnerability identification, simulated attacks that expose real weaknesses before criminals do, compliance frameworks that satisfy regulators and auditors, and continuous monitoring that catches threats before they become incidents. We work with financial institutions, telecoms, healthcare organizations, government agencies, and enterprises across Ghana — and we understand the specific threat landscape and regulatory requirements that apply to each sector.',
    outcomes: ['Security audits & vulnerability assessments', 'Penetration testing', 'Compliance (ISO 27001, GDPR, PCI-DSS)', 'SOC monitoring & incident response', 'Employee security awareness training', 'Security policy development'],
    process: ['Security baseline assessment', 'Threat & risk modelling', 'Penetration testing', 'Remediation prioritization', 'Controls implementation', 'Continuous monitoring & reporting'],
    stats: [{ num: '0', label: 'Client breaches post-engagement' }, { num: 'ISO', label: '27001 compliance advisory' }, { num: '24/7', label: 'SOC monitoring capability' }],
    faq: [
      {
        q: 'What cybersecurity laws apply to businesses in Ghana?',
        a: 'The primary legislation is the Data Protection Act 2012, which governs how personal data must be collected, stored, and processed. The Cybersecurity Act 2020 establishes the Cyber Security Authority and sets obligations for critical information infrastructure operators. The Bank of Ghana has issued specific cybersecurity directives for financial institutions. Healthcare organizations handling patient data face additional obligations. We help clients understand exactly which regulations apply to them and build compliance frameworks that satisfy all relevant requirements.',
      },
      {
        q: 'How do I know if my business has been breached?',
        a: 'Most breaches go undetected for months because attackers deliberately stay hidden. Common indicators include unusual login activity at odd hours, unexpected outbound data transfers, employee accounts accessing systems they normally do not use, and unexplained system slowdowns. The only reliable way to know your current exposure is a security audit. We run baseline assessments that identify vulnerabilities and, if a breach has already occurred, our incident response process can identify it and contain the damage.',
      },
      {
        q: 'What does a cybersecurity audit include and how long does it take?',
        a: 'A standard audit covers your network architecture, access controls, data handling practices, employee security hygiene, and vulnerability scanning across all internet-facing systems. We also review your existing security policies and compare them against industry frameworks like ISO 27001 and NIST. Depending on your environment, an audit takes 2–4 weeks and concludes with a prioritized remediation report that tells you exactly what to fix and in what order.',
      },
      {
        q: 'Do you offer ongoing security monitoring after the initial engagement?',
        a: 'Yes. We offer Security Operations Centre (SOC) monitoring as a managed service — continuous 24/7 threat detection across your environment with defined escalation and response procedures. This is available as a standalone service or as a continuation of an initial audit engagement. Ongoing monitoring is particularly important for financial institutions, healthcare organizations, and any business handling sensitive customer data.',
      },
    ],
  },
  'crm-erp': {
    number: '05', title: 'CRM & ERP Systems', tagline: 'Systems that run your business.',
    description: 'Implementation, customization, and integration of CRM and ERP platforms — Salesforce, Microsoft Dynamics, SAP, Odoo — configured for how African businesses actually operate.',
    detail: 'A poorly implemented CRM or ERP can cost more than it saves — in staff frustration, data inconsistency, and the hidden cost of maintaining workarounds around a system that does not fit how your business actually works. We bring deep implementation experience across Salesforce, Odoo, Microsoft Dynamics, and SAP, with particular expertise in configuring these platforms for African market realities.\n\nFor Ghana and West Africa, that means configuring multi-currency support with GHS as the primary currency, building GRA tax compliance directly into invoicing and financial workflows, integrating with local payment providers including Mobile Money, and designing user interfaces that work on the devices and network conditions your team actually has. Our implementations are built for adoption — we prioritize staff training and change management as heavily as we prioritize the technical configuration, because a system that your team does not use is worth nothing.',
    outcomes: ['CRM implementation & configuration', 'ERP deployment & customization', 'Data migration & cleansing', 'Third-party system integrations', 'Staff training & adoption support', 'Ongoing system administration'],
    process: ['Requirements analysis', 'Platform selection & scoping', 'Configuration & customization', 'Data migration & testing', 'Team training & adoption', 'Post-launch support & optimization'],
    stats: [{ num: '80+', label: 'CRM/ERP implementations' }, { num: '94%', label: 'User adoption rate' }, { num: '3mo', label: 'Avg. go-live timeline' }],
    faq: [
      {
        q: 'Which CRM is best for Ghana businesses — Salesforce, Odoo, or HubSpot?',
        a: 'It depends on your company size, budget, and what you are primarily trying to manage. Odoo is often the best fit for Ghanaian SMEs and mid-market companies — it is open-source, highly customizable, covers both CRM and ERP in one platform, and has strong GHS and GRA tax support. Salesforce is the enterprise standard and is ideal for larger organizations with complex sales processes and the budget to match. HubSpot works well for marketing-driven businesses focused on inbound lead generation. We assess your specific requirements and recommend the platform that gives you the best return — not the one with the highest margins for us.',
      },
      {
        q: 'Can Odoo or Salesforce handle GRA tax compliance and Ghanaian payroll?',
        a: 'Yes, with proper configuration. Odoo has strong multi-currency and tax module support that we configure for Ghana Revenue Authority VAT and withholding tax requirements. Ghanaian payroll including SSNIT contributions, PAYE, and tier 1/2/3 pension can also be configured within Odoo\'s HR module. Salesforce requires integration with a local payroll provider for full GRA compliance. We have implemented compliant financial configurations for numerous Ghanaian businesses and understand the specific requirements in detail.',
      },
      {
        q: 'How long does a CRM or ERP implementation take?',
        a: 'A focused CRM implementation for a single sales team typically takes 6–10 weeks from kick-off to go-live. A full ERP deployment covering finance, HR, inventory, and operations runs 3–6 months depending on complexity and the volume of data to migrate. We work in phases so your team can start seeing value before the full system is live, and we always build in a parallel-running period where your old and new systems operate simultaneously to catch any issues before the final cutover.',
      },
      {
        q: 'What happens to our existing data when we implement a new CRM or ERP?',
        a: 'Data migration is one of the most critical and most commonly underestimated parts of any CRM or ERP implementation. We run a full data audit before migration begins — cleaning, deduplicating, and transforming your existing records so they are accurate in the new system from day one. We build and test migration scripts in a staging environment first, validate results with your team, and only run the final migration once you are satisfied. Arriving on day one with clean, accurate data is what drives adoption — and adoption is what drives ROI.',
      },
    ],
  },
  'digital-marketing': {
    number: '06', title: 'Digital Marketing', tagline: 'Growth-driven. Data-backed.',
    description: 'SEO, paid advertising, content strategy, and marketing automation — all tied to measurable growth. We build marketing systems that generate qualified leads and compounding revenue.',
    detail: 'Marketing without measurement is just spending. We build marketing systems that are fully instrumented from day one — every channel, campaign, and piece of content is tied back to qualified leads and revenue. Our approach combines creative content with rigorous data analysis, and we report on the metrics that actually matter to your business: cost per qualified lead, pipeline contribution, and revenue influenced.\n\nIn Ghana and across West Africa, effective digital marketing requires understanding the local landscape: which platforms your target audience actually uses (LinkedIn for B2B, Facebook and Instagram for B2C, WhatsApp for direct engagement), how Ghanaian buyers research and evaluate vendors, and how to optimize for local search intent. We build campaigns and SEO strategies specifically for the Ghanaian market — not templates imported from markets with different audience behaviors and competitive dynamics.',
    outcomes: ['SEO strategy & implementation', 'Paid advertising (Google, Meta, LinkedIn)', 'Content marketing & strategy', 'Marketing automation setup', 'Analytics & performance reporting', 'CRO & landing page optimization'],
    process: ['Marketing audit & baseline', 'Strategy & channel selection', 'Asset creation & campaign setup', 'Launch & A/B testing', 'Performance optimization', 'Monthly reporting & scaling'],
    stats: [{ num: '3.2×', label: 'Avg. ROAS for paid clients' }, { num: '180%', label: 'Avg. organic traffic growth' }, { num: '90d', label: 'To measurable results' }],
    faq: [
      {
        q: 'How long does SEO take to show results for a Ghana business?',
        a: 'For a new website targeting Ghana-specific keywords — such as "CRM implementation Ghana" or "cloud solutions Accra" — you can expect to see meaningful ranking improvements within 60–90 days, and significant organic traffic growth within 4–6 months. The Ghana SEO landscape is significantly less competitive than UK or US markets, which means well-optimized pages can rank quickly. We prioritize keywords where ranking potential is highest relative to the effort required, so you see results as early as possible.',
      },
      {
        q: 'Which social media platform works best for B2B marketing in Ghana?',
        a: 'LinkedIn is the primary channel for reaching business decision-makers in Ghana — particularly in financial services, telecoms, government, and enterprise. Facebook still reaches a broad professional audience and works well for brand awareness campaigns. WhatsApp Business is increasingly important for direct engagement and sales conversations. We assess your specific target audience and recommend channel allocation based on where your buyers actually spend their attention, not where the platform is easiest to run campaigns.',
      },
      {
        q: 'What is a realistic monthly budget for digital marketing in Ghana?',
        a: 'A meaningful B2B digital marketing program in Ghana can be run effectively from GH₵ 8,000–15,000 per month covering content creation, paid advertising, and management. Enterprise campaigns with broader geographic coverage and multiple channels typically run GH₵ 25,000–60,000 per month. We scope campaigns to your budget and focus spend on the channels that give you the highest return — rather than spreading budget thinly across every available platform.',
      },
      {
        q: 'How do you measure digital marketing ROI?',
        a: 'We set measurement frameworks before any campaign launches, not after. This means agreeing on the key metrics upfront — cost per qualified lead, lead-to-opportunity conversion rate, pipeline value attributed to marketing, and revenue influenced — and putting tracking in place to capture those numbers accurately. Monthly reporting shows you exactly what is working and what is not, and we make optimization decisions based on data rather than instinct.',
      },
    ],
  },
  'brand-design': {
    number: '07', title: 'Brand & Design', tagline: 'Identity systems built to last.',
    description: 'Corporate brand identity, UI/UX design, and design systems — built to position your business as a credible, premium operator in your market and online.',
    detail: 'A brand is more than a logo — it is the sum of every impression your business makes on a potential client or partner. We design brand identities built to scale: clear, consistent, and distinctive enough to hold their own in competitive markets. Every identity we deliver comes with a comprehensive system for use across digital and physical touchpoints — not just a logo file and a colour palette, but a full brand guide, template library, and implementation support.\n\nFor businesses in Ghana and across West Africa, brand positioning carries particular weight. In markets where trust is built on reputation and referral, a credible, professional brand is a direct commercial asset — it shortens sales cycles, supports premium pricing, and signals to partners and investors that you operate at a serious level. We have designed brands for Ghanaian startups, established enterprises, NGOs, and government agencies — and we understand how to position organizations credibly in both local and international contexts.',
    outcomes: ['Brand identity & logo design', 'Corporate brand guidelines', 'UI/UX design for web & mobile', 'Design systems & component libraries', 'Corporate profiles & presentations', 'Website & app visual design'],
    process: ['Discovery & market research', 'Positioning & creative direction', 'Identity design exploration', 'Refinement & system build', 'Brand guidelines & asset delivery', 'Rollout & implementation support'],
    stats: [{ num: '150+', label: 'Brands designed' }, { num: '4.8/5', label: 'Client satisfaction score' }, { num: '3wk', label: 'Avg. identity turnaround' }],
    faq: [
      {
        q: 'How much does a brand identity cost for a Ghana business?',
        a: 'A professional brand identity — covering logo design, colour system, typography, core brand guidelines, and key application templates — typically ranges from GH₵ 12,000 to GH₵ 45,000 depending on scope and the complexity of the business. Startups and SMEs typically need a focused package. Enterprise clients with multiple product lines, international markets, and extensive application requirements invest more. We scope every project individually and provide a detailed proposal after a brief discovery conversation.',
      },
      {
        q: 'When should a Ghana business rebrand versus refresh?',
        a: 'A refresh — updating the visual execution while preserving the core identity — is right when your brand looks dated, you have expanded into new markets, or execution quality has drifted across formats. It is typically 4–6 weeks and a fraction of the cost of a full rebrand. A full rebrand is necessary when the business has fundamentally changed — new ownership, a merger, a deliberate move upmarket, or when the existing brand carries negative associations that cannot be overcome with better execution. We help you diagnose which situation you are actually in before recommending an approach.',
      },
      {
        q: 'What is included in a brand identity package?',
        a: 'A full identity package from Astacraft includes: primary and secondary logo versions, a colour system with accessibility-compliant combinations, typography selection and usage rules, an icon and illustration style guide, photography and imagery direction, and a brand guidelines document. Application templates — business cards, letterhead, email signatures, presentation decks, social media templates — are included in most packages. Website design and development are quoted separately.',
      },
      {
        q: 'How long does a brand identity project take?',
        a: 'A focused identity project typically takes 3–5 weeks from kick-off to final delivery. This includes a discovery phase to understand your business and market, a creative direction presentation with two or three distinct approaches, a refinement round based on your feedback, and final asset production and delivery. More complex brand systems — covering multiple sub-brands, product lines, or a full design system — take 8–12 weeks.',
      },
    ],
  },
  'it-consulting': {
    number: '08', title: 'IT Consulting', tagline: 'Strategy before software.',
    description: 'Technology strategy, IT governance, architecture reviews, and digital roadmaps — giving leadership teams the clarity to make high-confidence technology decisions.',
    detail: 'Most technology failures begin not with bad engineering, but with poor strategy: choosing the wrong platform, under-specifying a system, moving too fast before the organization is ready, or investing in technology before the business processes it is meant to support are well-defined. Our consulting practice works at the intersection of business and technology — helping leadership teams understand their options, evaluate trade-offs honestly, and build roadmaps they can actually execute and fund.\n\nFor organizations in Ghana and across West Africa, the stakes of poor technology decisions are particularly high: technology budgets are limited, implementation partners are harder to evaluate, and the consequences of a failed system implementation — lost productivity, data loss, staff frustration — can set an organization back by years. We bring independent, conflict-free advice. We do not sell software licences. We do not have preferred vendor relationships that influence our recommendations. We tell you what the right answer is for your organization — and then help you execute it.',
    outcomes: ['Technology strategy & roadmaps', 'IT governance & policy frameworks', 'Architecture reviews & audits', 'Vendor selection & management', 'Technology team structuring', 'Budget planning & TCO analysis'],
    process: ['Current state discovery', 'Stakeholder & requirement alignment', 'Options analysis & recommendation', 'Roadmap development', 'Implementation guidance', 'Advisory retainer & review cadence'],
    stats: [{ num: '$4M+', label: 'In client tech spend advised' }, { num: '100+', label: 'Architecture reviews' }, { num: '12+', label: 'Countries served' }],
    faq: [
      {
        q: 'What is IT consulting and does my Ghana business need it?',
        a: 'IT consulting means bringing in an external expert to help your leadership team make better technology decisions — before you commit to a platform, a vendor, or a major investment. You need it when you are facing a significant technology decision and do not have the internal expertise to evaluate your options confidently; when a technology project has stalled or failed and you need an independent view of why; or when your existing technology environment has grown complex and you need clarity on what to fix, replace, or retire. The cost of a consulting engagement is almost always less than the cost of making the wrong technology decision.',
      },
      {
        q: 'How is IT consulting different from hiring an in-house IT team?',
        a: 'An in-house IT team handles day-to-day operations — keeping systems running, managing user support, and implementing decisions that have already been made. IT consulting addresses strategic questions: which systems to invest in, how to architect your technology environment for the next 3–5 years, whether a vendor is giving you a fair deal, and how to structure your IT function as the business scales. We work alongside your internal team, not instead of them. Many of our consulting clients engage us specifically to help them hire and structure their internal IT capability.',
      },
      {
        q: 'Do you offer ongoing advisory retainer arrangements?',
        a: 'Yes. Many clients engage us on a monthly advisory retainer — a fixed number of consulting hours per month that can be used for strategic reviews, vendor negotiations, architecture questions, or escalated technical decisions. This gives leadership teams access to senior technology expertise without the cost of a full-time hire. Retainer clients also get priority access to our implementation teams when they are ready to execute on recommendations.',
      },
      {
        q: 'Can you help us select and evaluate technology vendors in Ghana?',
        a: 'Yes. Vendor selection is one of the most valuable things we do. We help you define your requirements clearly, build an evaluation framework, run structured RFP processes, assess vendor proposals objectively, and negotiate commercial terms. We have deep knowledge of the technology vendor landscape in Ghana and across Africa — including which vendors actually have local support capability versus those who claim to. Our recommendations are independent: we do not receive referral fees or commissions from any technology vendor.',
      },
    ],
  },
}

const ALL_SLUGS = Object.keys(fallbackServices)

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params

  let svc: any = null
  try { svc = await getServiceBySlug(slug) } catch {}
  if (!svc) svc = fallbackServices[slug]
  if (!svc) return { title: 'Service | Astacraft Systems' }

  const title = `${svc.title} in Ghana | Astacraft Systems`
  const description = (svc.seoDescription || svc.tagline || svc.description || '').slice(0, 160)

  return {
    title,
    description,
    alternates: { canonical: `https://astacraftsystems.com/services/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://astacraftsystems.com/services/${slug}`,
      type: 'website',
    },
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let svc: any = null
  try {
    svc = await getServiceBySlug(slug)
  } catch {}
  if (!svc) svc = fallbackServices[slug]
  if (!svc) notFound()

  const Icon    = iconMap[slug] ?? ConsultIcon
  const stats   = svc.stats   || fallbackServices[slug]?.stats   || []
  const process = svc.process || fallbackServices[slug]?.process || []

  const idx     = ALL_SLUGS.indexOf(slug)
  const related = [1, 2, 3].map(offset => {
    const s = ALL_SLUGS[(idx + offset) % ALL_SLUGS.length]
    return { ...fallbackServices[s], slug: s, Icon: iconMap[s] ?? ConsultIcon }
  })

  return (
    <>
      <JsonLd data={[
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          '@id': `https://astacraftsystems.com/services/${slug}#service`,
          name: svc.title,
          description: svc.description,
          provider: { '@id': 'https://astacraftsystems.com/#organization' },
          areaServed: { '@type': 'Country', name: 'Ghana' },
          url: `https://astacraftsystems.com/services/${slug}`,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home',     item: 'https://astacraftsystems.com' },
            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://astacraftsystems.com/services' },
            { '@type': 'ListItem', position: 3, name: svc.title,  item: `https://astacraftsystems.com/services/${slug}` },
          ],
        },
        ...((svc.faq || fallbackServices[slug]?.faq || []).length > 0 ? [{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: (svc.faq || fallbackServices[slug]?.faq || []).map(({ q, a }: { q: string; a: string }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        }] : []),
      ]} />

      {/* ─── HERO ─── */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] pt-40 pb-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-50 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_60%_-10%,rgba(27,78,140,0.14),transparent)] pointer-events-none" />

        <div className="relative max-w-[1000px] mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(255,255,255,0.30)] hover:text-[rgba(255,255,255,0.70)] transition-colors mb-10 hero-in hero-in-1"
          >
            ← All Services
          </Link>

          <div className="hero-in hero-in-2">
            <span className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.22em] uppercase px-3 py-1.5 border border-[rgba(85,170,73,0.25)] text-[#55AA49] mb-8 w-fit">
              <Icon className="w-3 h-3" />
              Service {svc.number}
            </span>
          </div>

          <h1
            className="font-serif font-black text-white leading-[0.90] tracking-[-0.035em] mb-5 hero-in hero-in-3"
            style={{ fontSize: 'clamp(44px,7vw,88px)' }}
          >
            {svc.title}
          </h1>
          <p className="font-mono text-[13px] tracking-[0.08em] italic text-[rgba(255,255,255,0.32)] mb-8 hero-in hero-in-4">
            {svc.tagline}
          </p>
          <p
            className="text-[rgba(255,255,255,0.55)] leading-relaxed max-w-2xl hero-in hero-in-5"
            style={{ fontSize: 'clamp(15px,1.4vw,19px)' }}
          >
            {svc.description}
          </p>
        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      {stats.length > 0 && (
        <section className="bg-[#1D4776] px-[clamp(24px,5vw,80px)] py-14">
          <div className="max-w-[860px] mx-auto grid grid-cols-3 gap-0">
            {stats.map(({ num, label }: { num: string; label: string }, i: number) => (
              <div
                key={label}
                className={`reveal-scale text-center ${i < stats.length - 1 ? 'border-r border-[rgba(255,255,255,0.12)]' : ''}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <p
                  className="font-serif font-black text-white leading-none mb-2"
                  style={{ fontSize: 'clamp(32px,4vw,56px)' }}
                >
                  {num}
                </p>
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[rgba(255,255,255,0.50)]">{label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── APPROACH + DELIVERABLES ─── */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-28">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          <div className="reveal">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-6">The Approach</p>
            <div className="space-y-4">
              {(svc.detail || svc.description || '').split('\n\n').map((para: string, i: number) => (
                <p key={i} className="text-[15px] text-[rgba(var(--ch-text),0.65)] leading-relaxed">{para}</p>
              ))}
            </div>
          </div>

          <div className="reveal" style={{ transitionDelay: '100ms' }}>
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-6">What&apos;s Included</p>
            <ul className="space-y-4">
              {(svc.outcomes || []).map((o: string, i: number) => (
                <li key={o} className="flex items-start gap-4">
                  <span className="font-mono text-[10px] text-[var(--color-green)] mt-0.5 shrink-0 w-6">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[13px] text-[rgba(var(--ch-text),0.60)] leading-relaxed">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── PROCESS STEPS ─── */}
      {process.length > 0 && (
        <section className="bg-[var(--color-surface)] px-[clamp(24px,5vw,80px)] py-28">
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-14 reveal">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-4">How We Work</p>
              <h2
                className="font-serif font-black text-[var(--color-text)] leading-[0.92] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(28px,3.5vw,48px)' }}
              >
                The engagement process.
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {process.map((step: string, i: number) => (
                <div key={step} className="relative reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                  {i < process.length - 1 && (
                    <div className="hidden lg:block absolute top-5 left-[calc(50%+24px)] right-0 h-px border-t border-dashed border-[rgba(var(--ch-accent),0.20)]" />
                  )}
                  <div className="w-10 h-10 border border-[rgba(var(--ch-accent),0.20)] flex items-center justify-center mb-4">
                    <span className="font-mono text-[10px] font-bold text-[var(--color-accent)]">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="text-[12px] text-[rgba(var(--ch-text),0.58)] leading-snug">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── RELATED SERVICES ─── */}
      <section className="bg-[var(--color-bg)] px-[clamp(24px,5vw,80px)] py-24">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12 reveal">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-4">Also From Astacraft</p>
            <h2
              className="font-serif font-black text-[var(--color-text)] leading-[0.92] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(24px,3vw,40px)' }}
            >
              Related services.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map(({ slug, number, title, tagline, description, Icon: RelIcon }, i) => (
              <Link
                key={slug}
                href={`/services/${slug}`}
                className="group block border border-[rgba(var(--ch-border),0.12)] bg-[var(--color-surface)] p-8 hover:border-[rgba(var(--ch-accent),0.28)] transition-all duration-300 reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-10 h-10 border border-[rgba(var(--ch-accent),0.18)] flex items-center justify-center">
                    <RelIcon className="w-5 h-5 text-[var(--color-accent)]" />
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.16em] text-[rgba(var(--ch-text),0.20)]">{number}</span>
                </div>
                <h3
                  className="font-serif font-bold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-200"
                  style={{ fontSize: 'clamp(16px,1.8vw,20px)' }}
                >
                  {title}
                </h3>
                <p className="font-mono text-[11px] tracking-[0.06em] italic text-[rgba(var(--ch-text),0.35)] mb-4">{tagline}</p>
                <p className="text-[12px] text-[rgba(var(--ch-text),0.45)] leading-relaxed mb-6 line-clamp-3">{description}</p>
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(var(--ch-text),0.30)] group-hover:text-[var(--color-accent)] transition-colors duration-200">
                  Explore {title} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      {(svc.faq || fallbackServices[slug]?.faq || []).length > 0 && (
        <section className="bg-[var(--color-surface)] px-[clamp(24px,5vw,80px)] py-28">
          <div className="max-w-[860px] mx-auto">
            <div className="mb-12 reveal">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-4">Common Questions</p>
              <h2
                className="font-serif font-black text-[var(--color-text)] leading-[0.92] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(28px,3.5vw,48px)' }}
              >
                Frequently asked questions.
              </h2>
            </div>
            <div className="space-y-px">
              {(svc.faq || fallbackServices[slug]?.faq || []).map(({ q, a }: { q: string; a: string }, i: number) => (
                <details
                  key={i}
                  className="group border border-[rgba(var(--ch-accent),0.10)] bg-[var(--color-bg)] reveal"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <summary className="flex items-center justify-between gap-4 px-8 py-6 cursor-pointer select-none list-none">
                    <span className="font-serif text-[clamp(15px,1.3vw,18px)] font-semibold text-[var(--color-text)] leading-snug">{q}</span>
                    <span className="font-mono text-[20px] text-[var(--color-accent)] shrink-0 transition-transform duration-200 group-open:rotate-45">+</span>
                  </summary>
                  <div className="px-8 pb-7 border-t border-[rgba(var(--ch-accent),0.07)]">
                    <p className="text-[14px] text-[rgba(var(--ch-text),0.60)] leading-[1.85] pt-5">{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(27,78,140,0.12),transparent)] pointer-events-none" />
        <div className="relative max-w-[700px] mx-auto text-center reveal">
          <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.28)] mb-4">Start a Conversation</p>
          <h2
            className="font-serif font-black text-white leading-[0.90] tracking-[-0.03em] mb-6"
            style={{ fontSize: 'clamp(32px,4.5vw,56px)' }}
          >
            Let&apos;s talk {svc.title.toLowerCase()}.
          </h2>
          <p
            className="text-[rgba(255,255,255,0.50)] max-w-lg mx-auto mb-10 leading-relaxed"
            style={{ fontSize: 'clamp(14px,1.1vw,17px)' }}
          >
            Book a complimentary strategy call. We will assess your current situation and outline exactly how {svc.title.toLowerCase()} applies to your business goals — no commitment required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[#55AA49] text-white px-10 py-4 hover:bg-[#489A3E] transition-colors duration-200"
            >
              Start a Project →
            </Link>
            <Link
              href="/services"
              className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium border border-[rgba(255,255,255,0.38)] text-white px-10 py-4 hover:border-[rgba(255,255,255,0.65)] transition-colors duration-200"
            >
              All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
