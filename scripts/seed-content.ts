import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })

type ImageRef = { _type: 'image'; asset: { _type: 'reference'; _ref: string } }

const imageCache = new Map<string, Promise<ImageRef>>()

function uploadImage(url: string, filename: string): Promise<ImageRef> {
  if (!imageCache.has(url)) {
    imageCache.set(
      url,
      (async () => {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Image fetch failed (${res.status}): ${url}`)
        const buffer = Buffer.from(await res.arrayBuffer())
        const asset = await client.assets.upload('image', buffer, { filename })
        return { _type: 'image' as const, asset: { _type: 'reference' as const, _ref: asset._id } }
      })(),
    )
  }
  return imageCache.get(url)!
}

const unsplash = (id: string) => `https://images.unsplash.com/${id}?w=1600&q=85&auto=format&fit=crop`

// ── Case Studies (oldest first so _createdAt desc matches display order) ──

const caseStudies = [
  {
    _id: 'caseStudy-nexus-health-software',
    slug: 'nexus-health-software',
    client: 'Nexus Health Systems',
    industry: 'Healthcare',
    summary: 'Custom patient management platform with mobile check-in, EHR integration, and billing automation — deployed across 8 clinics in Accra and Kumasi.',
    imageId: 'photo-1576091160550-2173dba999ef',
    metric1_num: '8', metric1_label: 'Clinics deployed',
    metric2_num: '3×', metric2_label: 'Faster patient registration',
    metric3_num: '5mo', metric3_label: 'Build timeline',
    accent: 'gold',
    services: ['Software Development', 'CRM & ERP Systems', 'Digital Transformation'],
    challenge: "Nexus Health Systems operated eight private clinics across Accra and Kumasi with a paper-based patient registration and records system. Patient check-in queues were long, duplicate records were common, billing was manual and error-prone, and clinicians had no way to access a patient's history from a different clinic in the network. Previous attempts with off-the-shelf software had failed because none were configured for Ghana's NHIS billing requirements.",
    solution: "We built a custom patient management platform — a web application for clinic staff and a mobile check-in app for patients — configured specifically for Ghana's NHIS billing codes and claim submission process. The platform included a unified patient record accessible across all eight clinics, automated NHIS claim generation from consultation records, EHR templates for the clinic's most common consultations, and a management dashboard showing patient volume, billing status, and claim pipeline.",
    results: 'Patient registration time fell from an average of 12 minutes to under four minutes. NHIS claim processing time dropped by 70% due to automated claim generation. Duplicate patient records were eliminated within 30 days of go-live. The medical director gained live visibility into patient volume, revenue, and claim status across all eight clinics from a single dashboard. All eight locations were live within the five-month build timeline.',
  },
  {
    _id: 'caseStudy-volta-river-digital-ops',
    slug: 'volta-river-digital-ops',
    client: 'Volta River Authority',
    industry: 'Energy & Utilities',
    summary: 'Digital transformation of field operations — replacing paper-based inspection processes with a custom mobile app and real-time reporting dashboard.',
    imageId: 'photo-1473341304170-971dccb5ac1e',
    metric1_num: '85%', metric1_label: 'Faster field reporting',
    metric2_num: '2,400+', metric2_label: 'Daily reports digitized',
    metric3_num: '120d', metric3_label: 'Build to launch',
    accent: 'cyan',
    services: ['Software Development', 'Digital Transformation', 'Cloud & Infrastructure'],
    challenge: "Volta River Authority's field teams across the Akosombo and Kpong hydroelectric facilities were completing infrastructure inspection reports on paper forms that were then physically transported to the operations centre, manually entered into a spreadsheet system, and reviewed days after the inspection had occurred. With over 2,400 inspection points across the facilities, the lag between a field observation and a management response was typically 48–72 hours — a safety and operational risk.",
    solution: 'We built a custom offline-capable mobile application for field inspection teams — designed to work reliably in the low-connectivity environments inside the dam facilities. Inspectors complete structured digital forms on ruggedised Android tablets, with photo capture and GPS tagging built in. When connectivity is restored, reports sync automatically to a real-time operations dashboard where anomalies are flagged immediately and assigned to the relevant engineering team.',
    results: 'Field reporting time fell by 85% — from an average of 45 minutes per inspection cycle to under seven minutes. Management visibility of field conditions shifted from a 48–72 hour lag to near-real time. In the first three months of operation, the system flagged two equipment anomalies that were resolved before they escalated into operational incidents. The entire build-to-launch cycle was completed in 120 days.',
  },
  {
    _id: 'caseStudy-quickmart-erp-odoo',
    slug: 'quickmart-erp-odoo',
    client: 'QuickMart Retail',
    industry: 'Retail & Commerce',
    summary: 'Odoo ERP deployment across 18 retail locations — replacing five disconnected systems with a single platform for inventory, POS, and procurement.',
    imageId: 'photo-1441986300917-64674bd600d8',
    metric1_num: '18', metric1_label: 'Locations live',
    metric2_num: '40%', metric2_label: 'Inventory accuracy improvement',
    metric3_num: '4mo', metric3_label: 'Phased rollout',
    accent: 'cyan',
    services: ['CRM & ERP Systems', 'Software Development', 'Digital Transformation'],
    challenge: 'QuickMart was running five separate systems across its 18 retail locations — a legacy POS, a standalone inventory tool, a procurement spreadsheet, a manual accounts process, and a separate HR system. None of them talked to each other. Stock counts were manual and inaccurate, procurement was reactive rather than data-driven, and month-end close took two weeks because the finance team was reconciling data from five different sources.',
    solution: "We implemented Odoo ERP as a unified platform covering POS, inventory management, procurement, and accounting — configured specifically for Ghana's VAT requirements and integrated with QuickMart's barcode scanning infrastructure. The rollout was phased across 18 locations over four months: a pilot at three high-volume locations in month one established the configuration baseline, followed by a regional rollout. Staff training was delivered in Twi and English by a team embedded at each location during their first week on the new system.",
    results: 'All 18 locations went live within the four-month timeline. Inventory accuracy improved by 40% in the first quarter post-go-live. Procurement shifted from reactive emergency purchasing to weekly automated reorder suggestions based on actual sales velocity. Month-end close dropped from two weeks to three days. The operations director now has a single dashboard showing real-time stock levels, sales performance, and procurement status across all 18 locations.',
  },
  {
    _id: 'caseStudy-afrexim-security-audit',
    slug: 'afrexim-security-audit',
    client: 'Afreximbank',
    industry: 'Financial Services',
    summary: 'Enterprise-wide cybersecurity audit, penetration testing, and ISO 27001 compliance framework — ahead of an international regulatory review.',
    imageId: 'photo-1563986768609-322da13575f3',
    metric1_num: '47', metric1_label: 'Vulnerabilities remediated',
    metric2_num: 'ISO', metric2_label: '27001 certified',
    metric3_num: '8wks', metric3_label: 'Engagement timeline',
    accent: 'cyan',
    services: ['Cybersecurity', 'IT Strategy & Consulting'],
    challenge: 'Afreximbank was preparing for a regulatory review by an international oversight body that required demonstrated compliance with ISO 27001 information security standards. An internal review had identified gaps in their security posture but lacked the depth to understand the full risk exposure or the roadmap to remediation. With eight weeks to the review date, they needed an authoritative external assessment and a clear remediation plan they could act on immediately.',
    solution: "We conducted a comprehensive enterprise-wide security audit encompassing network infrastructure, application security, access controls, data handling procedures, and incident response capabilities. External and internal penetration testing was carried out across all public-facing systems and the internal network. Each finding was classified by severity and mapped to the relevant ISO 27001 control. We then worked with Afreximbank's IT and compliance teams directly to remediate critical and high findings within the engagement window, rather than handing over a report and leaving.",
    results: '47 vulnerabilities were identified and remediated within the eight-week engagement — including three critical findings that would have represented significant regulatory risk. Afreximbank achieved ISO 27001 certification ahead of the regulatory review date. The compliance team had a documented, auditor-ready evidence pack for every control. The regulatory review concluded with no material findings against information security controls.',
  },
  {
    _id: 'caseStudy-mtn-cloud-migration',
    slug: 'mtn-cloud-migration',
    client: 'MTN Enterprise',
    industry: 'Telecoms',
    summary: 'Cloud migration of legacy on-premise infrastructure to AWS — cutting infrastructure costs while improving uptime across four data centres.',
    imageId: 'photo-1558494949-ef010cbdcc31',
    metric1_num: '38%', metric1_label: 'Infrastructure cost reduction',
    metric2_num: '99.97%', metric2_label: 'Uptime post-migration',
    metric3_num: '6mo', metric3_label: 'Migration timeline',
    accent: 'gold',
    services: ['Cloud & Infrastructure', 'Digital Transformation', 'Cybersecurity'],
    challenge: "MTN Enterprise's B2B division was running critical customer-facing systems on ageing on-premise infrastructure spread across four data centres. Maintenance costs were rising year-on-year, unplanned downtime incidents were increasing, and the infrastructure team was spending the majority of their capacity on firefighting rather than new capability development. The business case for cloud migration had been discussed for two years but had stalled due to concerns about data sovereignty, migration risk, and skills availability.",
    solution: "We led a phased migration to AWS, beginning with a detailed workload assessment to categorise each system by migration complexity and business criticality. Low-risk workloads moved first via lift-and-shift, establishing team confidence and a working operational model before the more complex systems were re-architected. A dedicated AWS Landing Zone was configured to meet MTN's data residency and compliance requirements. We embedded two cloud engineers within the MTN infrastructure team throughout the engagement to build in-house capability alongside delivery.",
    results: 'The migration completed in six months — on schedule and within budget. Infrastructure costs fell 38% in the first year post-migration, primarily through right-sizing compute and eliminating idle capacity that had been provisioned for peak loads but never released. Uptime across the migrated workloads reached 99.97% in the 12 months following go-live, compared to a baseline of 99.1% on-premise. The infrastructure team shifted from reactive maintenance to proactive capacity planning.',
  },
  {
    _id: 'caseStudy-stanbic-crm-transformation',
    slug: 'stanbic-crm-transformation',
    client: 'Stanbic Business Finance',
    industry: 'Financial Services',
    summary: 'Full Salesforce CRM implementation and data migration for a pan-African business finance division — unifying 12 regional offices onto one system.',
    imageId: 'photo-1486406146926-c627a92ad1ab',
    metric1_num: '62%', metric1_label: 'Faster deal cycle',
    metric2_num: '12', metric2_label: 'Offices unified',
    metric3_num: '90d', metric3_label: 'Go-live',
    accent: 'cyan',
    featured: true,
    navMetric: '62% faster deal cycle',
    services: ['CRM & ERP Systems', 'Digital Transformation', 'IT Strategy & Consulting'],
    challenge: 'Stanbic Business Finance operated across 12 regional offices in West Africa, each running its own spreadsheet-based tracking system for business lending pipelines. Deals were falling through the cracks between handoffs, forecast accuracy was near-zero, and the regional MD had no live view of the consolidated pipeline at any point in the month. The sales team were spending 3–4 hours per week manually collating status updates for weekly reporting.',
    solution: "We designed and implemented a Salesforce Sales Cloud environment tailored to Stanbic's business lending workflow — with custom pipeline stages matching their credit approval process, automated handoff tasks between relationship managers and credit analysts, and a live executive dashboard that aggregated deal status across all 12 offices in real time. Data migration from 12 separate Excel environments was handled with a purpose-built ETL process to ensure no historical pipeline data was lost.",
    results: 'Within 90 days of go-live, the average deal cycle had shortened by 62% — primarily through eliminating manual status-chasing between teams. The regional MD gained a consolidated pipeline dashboard that updated in real time. Forecast accuracy improved from ad-hoc estimates to data-driven weekly projections within the first quarter. The sales team recovered an average of 3.5 hours per week previously spent on manual reporting.',
  },
]

// ── Insights ──────────────────────────────────────────

const insights = [
  {
    _id: 'insight-cloud-architecture-african-enterprise',
    slug: 'cloud-architecture-african-enterprise',
    title: 'Cloud Architecture for African Enterprise: Building for Reliability When Infrastructure Works Against You',
    tag: 'Cloud & Infrastructure', label: 'Architecture',
    excerpt: 'AWS, Azure, and GCP are available across Africa — but latency, last-mile connectivity, and power reliability demand a different architecture approach than what global guides recommend. Here is what enterprise-grade cloud design looks like when the environment is working against you.',
    publishedAt: '2026-05-12', readTime: '8 min read',
    imageId: 'photo-1558494949-ef010cbdcc31',
    relatedServices: [
      { title: 'Cloud & Infrastructure', slug: 'cloud-solutions' },
      { title: 'Software Development', slug: 'software-development' },
    ],
    body: `Cloud infrastructure in Africa is genuinely available. AWS operates from Cape Town and Bahrain with coverage across the continent. Azure has South Africa North and plans for additional African regions. GCP has Johannesburg. The infrastructure exists — but treating African cloud deployments the same way you would treat a deployment in London or Singapore is an architectural mistake that will cost you in uptime, latency, and user experience.

The constraints are real and specific. Last-mile connectivity is variable. Power supply in many countries involves outages that affect data centres and end users simultaneously. Submarine cable congestion causes periodic latency spikes. Mobile network conditions vary enormously between urban and rural users, and within cities between network operators. Building for reliability in this environment requires architectural decisions that most global cloud guides do not cover.

**Design for Intermittent Connectivity**

Your applications need to function gracefully when connectivity degrades. For web and mobile applications serving African users, this means implementing progressive loading — serve the critical content first, load supporting assets after. Implement service workers for offline capability wherever the use case supports it. Cache aggressively at the CDN layer. Design API responses to return complete, usable data in a single call rather than requiring multiple round trips.

For enterprise applications, assume that your users will periodically lose connectivity mid-session. Autosave. Queue write operations locally and sync when connection restores. Never let a dropped connection cause data loss.

**Choose Regions Strategically, Not Geographically**

The instinct is to choose the cloud region closest to your users. For West African deployments, that often points to a US East region or a European region rather than South Africa, because the routing via those regions to West Africa is frequently faster than routing through South Africa due to how subsea cable landing points are distributed. Test actual latency to your specific target geographies from each candidate region before committing. The results are often counter-intuitive.

**Multi-Cloud Is Not a Strategy — It Is an Overhead**

Enterprise clients regularly propose multi-cloud architectures as a resilience measure. In African enterprise contexts, this is almost always the wrong call. Managing infrastructure across AWS and Azure simultaneously doubles your operations overhead, complicates your network architecture, and introduces data transfer costs between providers. A well-architected single-cloud deployment with multi-region redundancy within that provider is more reliable, cheaper to operate, and easier to manage.

Reserve multi-cloud for specific scenarios where you have a genuine regulatory reason for it — some financial services regulators in West Africa have data residency requirements that may necessitate split deployments. In those cases, the complexity is warranted. In most others, it is not.

**Invest in Observability Before You Launch**

In environments with variable infrastructure, observability is not optional. Instrument everything from day one: application performance monitoring, infrastructure metrics, error tracking, and user session recording. African cloud incidents frequently cascade in ways that are difficult to diagnose without comprehensive telemetry. The operational cost of reactive debugging in a degraded environment is far higher than the cost of proper instrumentation upfront.

The organisations that run the most reliable systems in Africa are not the ones with the most sophisticated architectures. They are the ones that can see exactly what is happening in real time and respond before users notice.`,
  },
  {
    _id: 'insight-salesforce-vs-dynamics-vs-odoo-africa',
    slug: 'salesforce-vs-dynamics-vs-odoo-africa',
    title: 'Salesforce vs Microsoft Dynamics vs Odoo: Choosing the Right CRM for Your African Enterprise',
    tag: 'CRM & Enterprise Systems', label: 'Comparison',
    excerpt: 'Not every CRM built for global enterprises fits the way African businesses operate. This guide compares Salesforce, Microsoft Dynamics 365, and Odoo across cost, customisation, local support, and fit for African market realities — so you can choose with confidence.',
    publishedAt: '2026-05-05', readTime: '10 min read',
    imageId: 'photo-1460925895917-afdab827c52f',
    relatedServices: [
      { title: 'CRM & Business Systems', slug: 'crm-erp' },
      { title: 'IT Strategy & Advisory', slug: 'it-consulting' },
      { title: 'Digital Transformation', slug: 'digital-transformation' },
    ],
    body: `Choosing a CRM for an African enterprise is a different decision from choosing one for a European or North American company. Licence costs that are reasonable in US dollar terms become significant in Ghana cedis or Nigerian naira. Local currency support, GRA or FIRS compliance, and the availability of in-country implementation support all change the calculus considerably.

This comparison covers the three platforms we implement most frequently across our African enterprise client base — Salesforce, Microsoft Dynamics 365, and Odoo — assessed against what actually matters in this market.

**Salesforce**

Salesforce is the global standard for enterprise CRM for good reason. It is the most powerful, the most customisable, and has the deepest ecosystem of integrations, third-party apps, and implementation expertise worldwide. For African enterprises with large sales teams, complex multi-stage sales processes, and significant technology budgets, it remains the strongest choice.

The challenges in African deployment are specific. Per-user licensing costs are fixed in USD, which makes large Salesforce deployments expensive relative to local revenue. Qualified Salesforce administrators and developers are scarce in most African markets — implementation typically requires either bringing in expatriate consultants or investing heavily in training local staff. And the platform's depth becomes a liability if your organisation does not have the internal capability to govern and maintain a complex configuration.

Salesforce makes sense if you are a financial institution, a multinational, or a large enterprise with the budget and capability to do it properly.

**Microsoft Dynamics 365**

Dynamics 365 is Salesforce's closest competitor and increasingly compelling for African enterprises that are already invested in the Microsoft ecosystem — Office 365, Teams, Azure. The native integration with Microsoft tools is genuinely seamless in a way that no third-party integration can match, and for organisations where Outlook and Teams are the daily operating environment, this friction reduction is significant.

Dynamics is often moderately cheaper than Salesforce for comparable functionality, though still a substantial investment. Microsoft has a growing partner network in West Africa, and the familiarity of Microsoft products means that user adoption is often faster than with Salesforce.

The weakness is in depth of customisation and ecosystem breadth — Salesforce has a larger AppExchange and more implementation IP than the Dynamics partner network. For highly bespoke requirements, Salesforce still leads.

**Odoo**

Odoo is the platform we recommend most frequently to Ghanaian mid-market companies, and it is often the right answer for African enterprises more broadly. The fundamental reason is straightforward: Odoo is open-source, which means no per-user CRM licence fees. You pay for implementation, hosting, and optional support — not an ongoing per-seat charge that scales with your headcount.

Beyond cost, Odoo is genuinely comprehensive. It covers CRM, sales, accounting, inventory, manufacturing, HR, payroll, and project management in a single integrated platform with a shared data model. This means your sales data, finance data, and operational data all live in one place without costly integrations — which is significant for African businesses that currently run multiple disconnected tools.

Odoo supports multiple currencies including Ghana cedis, and it can be configured for GRA VAT compliance and invoice requirements. The community is large, documentation is good, and customisation is achievable by any competent developer without vendor lock-in.

The trade-offs: Odoo's UI is functional but less polished than Salesforce, it requires a capable implementation partner to configure correctly, and the default setup requires significant adjustment for African-specific workflows. The implementation investment is real — but it pays off because there is no ongoing licence cliff to fall off.

**The Decision Framework**

Choose Salesforce if you are a large enterprise with a complex, high-value sales process, a technology budget exceeding $100,000 per year, and the ability to hire or develop Salesforce-certified administrators.

Choose Dynamics 365 if you are a Microsoft-first organisation where Teams and Outlook are central to daily operations and you want a fully integrated CRM within that ecosystem.

Choose Odoo if you are a Ghanaian or West African mid-market business that wants an integrated business management platform without per-seat licensing costs, and you are willing to invest in a good implementation partner to configure it correctly.

In our experience, most Ghanaian enterprises choose Odoo after understanding the full cost picture. The total cost of ownership over three years is significantly lower, and the integrated nature of the platform delivers operational benefits that extend well beyond CRM.`,
  },
  {
    _id: 'insight-digital-transformation-ghana-roadmap',
    slug: 'digital-transformation-ghana-roadmap',
    title: 'Digital Transformation in Ghana: A Practical Roadmap for Mid-Size Enterprises',
    tag: 'Digital Transformation', label: 'Strategy',
    excerpt: 'Digital transformation is not a single project — it is a shift in how a business operates, makes decisions, and delivers value. This roadmap breaks the journey into four phases that mid-size Ghanaian enterprises can execute without disrupting day-to-day operations.',
    publishedAt: '2026-04-22', readTime: '9 min read',
    imageId: 'photo-1504384308090-c894fdcc538d',
    relatedServices: [
      { title: 'Digital Transformation', slug: 'digital-transformation' },
      { title: 'IT Strategy & Advisory', slug: 'it-consulting' },
      { title: 'API & Automation', slug: 'api-automation' },
    ],
    body: `Digital transformation is one of the most overused phrases in enterprise technology and one of the most poorly understood. It is not an ERP implementation. It is not a new website. It is not moving your email to Google Workspace. It is a fundamental shift in how a business creates value — replacing manual, paper-based, or disconnected processes with integrated digital systems that give leadership teams real-time visibility and give operational teams the tools to work faster with fewer errors.

For mid-size Ghanaian enterprises — companies with 50 to 500 employees operating in financial services, retail, manufacturing, healthcare, or logistics — the transformation journey is typically a four-phase process spanning 18 to 36 months.

**Phase 1: Foundation — Months 1 to 6**

Before any technology can be deployed effectively, the foundation has to be right. This means three things: a clear picture of your current state, a defined future state that the business is aligned behind, and a technology leadership function that has the authority and capability to drive the programme.

In practice, Phase 1 involves a comprehensive process audit — mapping every major operational process in the business, identifying manual steps, paper handoffs, and data silos. It involves interviewing department heads to understand where the biggest pain points are and where technology investment would have the highest return. And it involves building the internal business case that will get leadership aligned and keep them aligned when the programme hits inevitable friction.

The output of Phase 1 is a technology roadmap: a sequenced plan for which systems to implement, in what order, with what dependencies, over what timeline, at what budget.

**Phase 2: Core Systems — Months 6 to 18**

Phase 2 deploys the foundational systems that every other digital capability will depend on: an ERP or integrated business management platform, a CRM if the business has a significant sales function, and a core data infrastructure that ensures information is stored consistently and accessibly.

The sequencing is important. Finance and accounting go first — clean financial data is the backbone of every other reporting and decision-making capability. Operations systems (inventory, production, logistics depending on your sector) go second. CRM and customer-facing systems go third, because they need the operational data from Phase 2 to be most effective.

Every Phase 2 implementation requires parallel running: operating new and old systems simultaneously until confidence in the new system is high enough to cut over. This is uncomfortable but essential. The organisations that cut over too quickly create operational crises that erode confidence in the transformation programme and slow everything that follows.

**Phase 3: Integration and Automation — Months 12 to 24**

Phase 3 connects the systems deployed in Phase 2 and automates the workflows between them. This is where the return on investment becomes visible in operational metrics. When your CRM automatically updates the ERP when a deal closes. When your inventory system automatically raises a purchase order when stock falls below threshold. When your finance system automatically reconciles payments received through Mobile Money against open invoices.

These automations individually seem small. Together, they eliminate entire categories of manual work and the errors that come with it. A finance team that spent three days per month on manual reconciliation gets those days back. An operations manager who checked stock levels manually every morning gets a dashboard that does it in real time.

**Phase 4: Intelligence — Months 18 to 36**

Phase 4 builds the analytical capability to make better decisions faster. This means business intelligence dashboards that give leadership real-time visibility into the metrics that matter. It means predictive models that flag issues before they become crises — inventory shortfalls, cash flow gaps, customer churn risk. It means moving from a business that makes decisions based on last month's Excel reports to one that makes decisions based on today's data.

For most Ghanaian enterprises, this phase is the most transformative — and the most underestimated. The technology is not the hard part. Building the data literacy and decision-making culture to actually use the intelligence is where the real work happens.`,
  },
  {
    _id: 'insight-mobile-money-integration-saas-africa',
    slug: 'mobile-money-integration-saas-africa',
    title: 'Mobile Money Integration for African SaaS Products: What Developers and Founders Need to Know',
    tag: 'SaaS & Payments', label: 'Engineering',
    excerpt: 'MTN MoMo, Telecel Cash, and AT Money collectively cover over 60 million active wallets across Ghana alone. If your SaaS product does not accept Mobile Money, you are locking out your most important payment channel. Here is how to integrate correctly — and what to avoid.',
    publishedAt: '2026-04-10', readTime: '7 min read',
    imageId: 'photo-1563013544-824ae1b704d3',
    relatedServices: [
      { title: 'Software Development', slug: 'software-development' },
      { title: 'API & Automation', slug: 'api-automation' },
    ],
    body: `Mobile Money is not a niche payment method in Ghana — it is the dominant one. The Bank of Ghana's most recent data shows over 20 million registered Mobile Money accounts in the country, with monthly transaction values exceeding GH₵ 200 billion. MTN MoMo alone processes more transaction volume than most Ghanaian banks. If your SaaS product accepts only card payments, you are optimised for a minority of your potential market.

For SaaS founders and product teams building for African markets, integrating Mobile Money correctly is a product-critical decision. Here is what you need to know.

**Understand the Provider Landscape**

In Ghana, there are three major Mobile Money networks: MTN Mobile Money (MoMo), Telecel Cash (formerly Vodafone Cash), and AirtelTigo Money (AT Money). Each operates independently, has its own API, and requires its own merchant account and commercial agreement. This is important: accepting MTN MoMo does not mean you accept Telecel Cash. Users on different networks cannot pay through each other's wallets without interoperability infrastructure.

For most SaaS products, the practical path to accepting all three networks without maintaining three separate integrations is using a payment aggregator — Paystack being the leading option in Ghana. Paystack's Mobile Money integration handles all three networks through a single API, manages the underlying operator relationships, and provides a single reconciliation interface. The trade-off is aggregator fees on top of operator fees, but for most products the operational simplicity is worth it.

**The Integration Architecture**

A correct Mobile Money integration for SaaS has four components: payment initiation (your system requests that the user authorise a payment from their wallet), a push notification to the user's phone (sent by the operator), a callback to your server when payment is confirmed or failed, and idempotent payment recording on your side.

The most common implementation mistake is polling — repeatedly querying the payment status rather than implementing a proper webhook callback. Polling is unreliable in African network conditions, creates unnecessary load, and frequently results in duplicate payment records or missed confirmations. Implement webhooks from the start, and build your payment recording logic to be idempotent so that duplicate callbacks do not create duplicate charges.

**Handling the User Experience**

Mobile Money payment flows require the user to approve the transaction on their phone via a USSD prompt or app notification. This introduces a step that card payments do not have — and that step takes time, typically 30 to 90 seconds. Your UI needs to communicate clearly that payment is pending and the user should check their phone. A blank or unresponsive screen during this window creates abandonment and support tickets.

Design a clear pending state: "Check your phone and approve the payment" with a countdown or progress indicator. Implement a timeout — if payment is not confirmed within five minutes, treat it as failed and allow the user to retry. Handle failure states gracefully with specific error messages (insufficient balance is different from number not registered for Mobile Money is different from network timeout).

**Testing in Production**

Mobile Money sandboxes are available through Paystack and the individual operators, but they do not perfectly replicate production behaviour. Test with real amounts on real SIM cards before launch. The GH₵ 0.01 test transaction is standard practice and costs almost nothing. The alternative — discovering that your webhook is misconfigured after a customer has approved a payment that your system did not record — costs considerably more.`,
  },
  {
    _id: 'insight-iso-27001-certification-africa',
    slug: 'iso-27001-certification-africa',
    title: 'ISO 27001 Certification in Africa: Why It Matters for Enterprise Technology Buyers and How to Get There',
    tag: 'Cybersecurity', label: 'Compliance',
    excerpt: 'As procurement teams across African financial services, healthcare, and government tighten vendor security requirements, ISO 27001 is shifting from a differentiator to a baseline expectation. This guide explains what the certification covers, how long it takes, and what to prioritise first.',
    publishedAt: '2026-03-28', readTime: '8 min read',
    imageId: 'photo-1563986768609-322da13575f3',
    relatedServices: [
      { title: 'Cybersecurity', slug: 'cybersecurity' },
      { title: 'IT Strategy & Advisory', slug: 'it-consulting' },
    ],
    body: `ISO 27001 is the international standard for information security management. It defines a framework — the Information Security Management System, or ISMS — for how organisations identify, assess, and manage information security risks. Certification means an accredited third-party auditor has reviewed your ISMS and confirmed it meets the standard.

In African enterprise markets, ISO 27001 has historically been a differentiator — a credential that technology vendors could use to stand out from competitors in regulated sectors like financial services, healthcare, and government. That is changing. As African financial institutions, development finance organisations, and government agencies mature their vendor management processes, ISO 27001 is increasingly becoming a procurement gate rather than a competitive advantage. Vendors without it are being excluded from tenders they would previously have won on technical merit alone.

**What ISO 27001 Actually Requires**

The standard requires you to implement an ISMS — a set of policies, procedures, and controls that systematically manage information security risk. The controls span 14 domains including access control, cryptography, physical and environmental security, incident management, business continuity, and supplier relationships.

It is important to understand what ISO 27001 does not require. It does not require you to have zero security incidents. It does not require you to use specific technologies. It does not require a specific minimum number of controls. It requires you to have a defined, documented, and operating process for identifying what your information security risks are and managing them appropriately. The standard is about management maturity, not technical perfection.

**The Certification Timeline**

Realistically, organisations pursuing ISO 27001 certification for the first time should plan for 9 to 18 months from programme initiation to certification audit, depending on their starting maturity and the scope of the ISMS.

The first three months are typically spent on gap assessment — comparing your current security posture against the standard's requirements — and defining the scope and boundaries of your ISMS. Months three to nine are the implementation phase: writing the required policies and procedures, implementing the technical controls that are missing, training staff, and beginning to generate the evidence of operation that the auditor will review. Months nine to twelve are the internal audit and management review cycle required by the standard before the certification audit. Month twelve onwards is the certification audit itself, typically conducted in two stages.

**What to Prioritise First**

If you are beginning an ISO 27001 journey, the highest-leverage early investments are in four areas. First, access control — implementing least-privilege access, multi-factor authentication, and a formal joiners/movers/leavers process. These controls address the most common root causes of information security incidents and are relatively low-cost to implement. Second, asset management — knowing what information assets you have, where they live, and who is responsible for them. You cannot manage the security of assets you do not know about. Third, incident management — defining and testing a documented process for detecting, responding to, and recovering from security incidents. Fourth, supplier security — reviewing the security posture of your key third-party suppliers and documenting those assessments.

These four domains, taken seriously, address the majority of real-world information security risk and provide the evidential foundation that makes the certification audit straightforward.

**The Business Case**

Beyond procurement access, ISO 27001 certification delivers internal operational benefits that justify the investment independently of the certification itself. The discipline of maintaining an ISMS surfaces security weaknesses before attackers do. The policy and procedure framework reduces operational risk and supports staff consistency. The management review process creates a regular cycle of security improvement that compounds over time.

For African technology companies with enterprise ambitions, the question is not whether to pursue ISO 27001 — it is when to start.`,
  },
  {
    _id: 'insight-crm-west-african-banking',
    slug: 'crm-west-african-banking',
    title: 'How West African Banks Are Using CRM to Win Commercial Lending Relationships',
    tag: 'CRM & Enterprise Systems', label: 'Case Analysis',
    excerpt: 'The battle for corporate banking clients in West Africa is being fought on relationship quality. Here is how Salesforce and Dynamics are being deployed to systematise what used to be purely human — and the implementation decisions that determine whether the rollout actually sticks.',
    publishedAt: '2026-03-14', readTime: '7 min read',
    imageId: 'photo-1486406146926-c627a92ad1ab',
    relatedServices: [
      { title: 'CRM & Business Systems', slug: 'crm-erp' },
      { title: 'Digital Transformation', slug: 'digital-transformation' },
    ],
    body: `Commercial lending in West Africa is a relationship business. Corporate treasurers choose their banking partners not primarily on interest rates — they choose based on who they trust, who they can reach when something goes wrong, and who understands their business well enough to structure the right facility at the right time. For decades, this dynamic meant that the banks with the strongest relationship managers won the most business, and relationship management was a fundamentally human skill that technology could not touch.

That is changing. The banks gaining ground in commercial lending across Ghana, Nigeria, and the broader West African market are not just hiring better relationship managers — they are systematising relationship management in ways that make their entire teams more effective, not just their best performers.

**The Relationship Management Problem at Scale**

A senior corporate relationship manager at a Tier 1 Ghanaian bank might manage relationships with 40 to 60 corporate clients simultaneously. Each client has a complex financial picture: existing facilities, covenant obligations, upcoming renewals, key contacts at different levels, and a history of interactions going back years. Managing this in a relationship manager's head and a personal spreadsheet creates two serious problems.

First, the institutional knowledge lives with the individual. When a relationship manager leaves — and attrition in corporate banking is high — the bank loses not just the person but the relationship capital and context they have accumulated. The incoming RM has to rebuild trust and context from scratch, which is precisely the window when clients most commonly switch banks.

Second, senior leadership has no visibility into the portfolio. Branch directors and heads of corporate banking cannot see which clients are at renewal risk, which have unmet facilities needs that represent cross-sell opportunities, or which relationships have gone cold. Portfolio management by gut feel works at small scale. At 200+ corporate clients across a regional network, it does not.

**How CRM Changes the Equation**

The Salesforce and Dynamics 365 implementations we have run for West African financial institutions are built around two core use cases: relationship continuity and portfolio visibility.

For relationship continuity, the CRM becomes the system of record for every client interaction — meetings, calls, emails, facility discussions, covenant reviews. When a relationship manager logs a client visit, they record who they met, what was discussed, any commitments made, and the next action. This takes three minutes. But it means that if that RM is unavailable or leaves, any colleague can pick up the relationship with full context immediately.

For portfolio visibility, the CRM provides leadership with a real-time view of the entire corporate portfolio: which relationships are active, which are at risk (defined by inactivity triggers or upcoming covenant reviews), and where the pipeline sits for new facilities. Heads of corporate banking can see at a glance which relationship managers are most active, which clients have not been contacted in 60 days, and where cross-sell opportunities exist based on facility type and client profile.

**What Makes Financial Services CRM Implementations Succeed**

The implementations that deliver measurable results have three things in common. First, the system is built around the RM's daily workflow — not around what the system can do. Every data entry requirement is justified by a specific output that the RM or their manager values. If it does not serve a clear purpose, it does not go in.

Second, leadership uses the data visibly and consistently. RMs adopt CRM when they see that their managers reference it in conversations, when pipeline reviews are run from the system rather than from spreadsheets, and when the data they enter is used to inform decisions that affect them. When leadership ignores the CRM, so does the team.

Third, the first 90 days post-launch include dedicated support to build the habit. CRM adoption follows a curve: initial enthusiasm, a friction trough at weeks three to six where the team is not yet fast enough to see the benefit, and then accelerating adoption as the system becomes familiar. Bridging that trough with active support and incentives is what separates implementations that stick from those that do not.`,
  },
  {
    _id: 'insight-erp-implementation-failure-africa',
    slug: 'erp-implementation-failure-africa',
    title: 'Why ERP Implementations Fail in Africa — and the Five Decisions That Determine Success',
    tag: 'CRM & Enterprise Systems', label: 'Implementation',
    excerpt: 'A large share of ERP projects in Africa run over budget, miss their go-live date, or deliver a fraction of the intended value. The root causes are rarely technical. They are organisational, and they are predictable — which means they are preventable.',
    publishedAt: '2026-02-27', readTime: '11 min read',
    imageId: 'photo-1552664730-d307ca884978',
    relatedServices: [
      { title: 'CRM & Business Systems', slug: 'crm-erp' },
      { title: 'Digital Transformation', slug: 'digital-transformation' },
      { title: 'IT Strategy & Advisory', slug: 'it-consulting' },
    ],
    body: `ERP implementations have a notoriously poor success rate globally. In African enterprise contexts, the failure modes are compounded by specific local factors: shorter internal technology teams, fewer experienced implementation partners, currency volatility that affects project budgets mid-implementation, and organisational change management challenges in environments where manual and paper-based processes have been embedded for decades.

The result is that a significant proportion of ERP projects in Ghana, Nigeria, Kenya, and across the continent either run materially over budget, miss their go-live date by months or years, or are declared "live" but used by only a fraction of the intended users at a fraction of the intended scope. Having run ERP implementations across multiple sectors in West Africa, the root causes are predictable — and therefore preventable.

**Decision 1: Scope Before Software**

The single most common cause of ERP failure in Africa is choosing a software platform before defining what the system needs to do. A board or CEO is influenced by a peer, attends a vendor conference, or reads an article, and decides the company is implementing Sage or SAP before the first requirements conversation has happened. The implementation starts with the wrong scope or in the wrong part of the business, and the subsequent customisation and rework costs erase whatever budget was saved by not doing proper requirements definition upfront.

The correct sequence is: define your processes in their current state, define what you want them to be in the future state, identify the gaps between them, and then select the platform that closes those gaps at the best total cost of ownership. Two weeks of requirements definition prevents six months of expensive rework.

**Decision 2: Executive Sponsorship That Is Real, Not Nominal**

ERP implementations require an executive sponsor who does more than sign the budget approval. They need to attend steering committee meetings, make decisions that unblock the programme when departments are in conflict, and visibly use and champion the new system from go-live day one.

In African organisations where the managing director or CEO has delegated the ERP project to a middle manager who lacks the authority to resolve cross-functional conflicts, programmes stall. The finance team wants the system configured one way. The operations team wants it configured differently. Without an executive who can make the final call and hold both teams to the decision, projects enter extended negotiation cycles that cost months and erode team confidence.

**Decision 3: Change Management Is Not Training**

The most under-invested element of ERP implementations in Africa is change management — and the most common misunderstanding is treating training as a substitute for it. Training teaches staff how to use the system. Change management builds the motivation to use it and dismantles the resistance to changing from familiar processes.

Resistance to ERP adoption in African organisations often has specific roots: concern that the new system will expose manual practices or errors that were previously invisible, anxiety that automation will reduce headcount, distrust of system data quality during the transition period, and simple preference for established workflows. Each of these needs to be addressed explicitly and early — not after go-live when resistance has already set in.

**Decision 4: Data Migration Is a Programme in Itself**

Data migration is consistently underestimated in African ERP implementations because the quality of historical data is consistently worse than organisations expect. Years of Excel files, disconnected accounting systems, paper ledgers, and manual records mean that getting clean, consistent, complete data into the new system requires more time and more effort than any vendor proposal accounts for.

Organisations that treat data migration as a technical task to be completed in the final weeks of implementation are the ones that go live with corrupt data and spend the following year firefighting data quality issues. The correct approach is to start data cleansing at the beginning of the project, not at the end. Assign data owners for each entity type. Define the quality standards data must meet before import. Run migration trial runs months before go-live to surface issues while there is still time to resolve them.

**Decision 5: Go Live Small, Then Expand**

The most successful ERP implementations in Africa go live with a defined, contained scope — typically one business unit, one site, or one set of processes — before expanding to the full organisation. This approach allows the team to learn from the first deployment, fix issues in a contained environment, and build internal confidence and capability before scaling.

The alternative — a big bang go-live across the entire organisation simultaneously — is the highest-risk approach and the one most likely to produce the crisis that kills organisational confidence in the programme. In environments with limited internal technology capability, the support burden of a full-organisation go-live often overwhelms what the team can manage, and the visible operational disruption becomes the narrative that defines the programme.

Going live small is perceived as slow. It is actually faster, because it avoids the extended recovery period that big bang failures require.`,
  },
  {
    _id: 'insight-legacy-system-cost-cfo-guide',
    slug: 'legacy-system-cost-cfo-guide',
    title: "The Real Cost of Legacy Systems: A CFO's Guide to Building the Digital Transformation Business Case",
    tag: 'Digital Transformation', label: 'Finance',
    excerpt: 'The question African CFOs keep asking is not whether to modernise — it is how to justify the cost. Here is the financial model that makes the case from operational data, with a framework for calculating the true cost of doing nothing.',
    publishedAt: '2026-02-10', readTime: '9 min read',
    imageId: 'photo-1551288049-bebda4e38f71',
    relatedServices: [
      { title: 'Digital Transformation', slug: 'digital-transformation' },
      { title: 'IT Strategy & Advisory', slug: 'it-consulting' },
    ],
    body: `Every CFO conversation about digital transformation eventually arrives at the same question: what is this going to cost, and what is the return? The challenge is that the costs of transformation are visible and immediate — system licences, implementation fees, staff time, disruption to operations — while the returns are distributed, delayed, and difficult to attribute cleanly.

The result is that organisations defer transformation decisions year after year, not because they believe the status quo is optimal, but because the business case is hard to make. What CFOs rarely quantify is the equal and opposite problem: legacy systems have costs too, and those costs grow every year.

**The Hidden Cost of Doing Nothing**

Legacy system costs accumulate in four categories that rarely appear on a single budget line but are real and measurable when you look for them.

Maintenance costs escalate predictably. Systems that were built on technology stacks that are no longer current require increasingly specialised and expensive developers to maintain. Every year that a 10-year-old ERP or custom system stays in production, the pool of people who can work on it shrinks and the cost of finding them rises. Organisations routinely pay three to five times market rate for developers with specific legacy technology skills.

Integration costs compound. As the business grows and adds new tools — a new payment processor, a new HR system, a new reporting tool — each new system has to integrate with the legacy core. Every integration is a custom point-to-point connection that requires its own maintenance. Ten years of organic technology growth creates integration spaghetti that costs significant time and money to maintain and breaks routinely.

Opportunity costs are the largest category and the hardest to see. What decisions cannot be made, or are made slowly, because the data is not available in real time? What processes require manual steps that consume staff time? What customer service failures happen because staff cannot access complete, accurate information quickly? These costs do not appear on a budget line, but they are as real as any direct cost.

Risk costs are acute for regulated industries. Outdated systems are disproportionately likely to have unpatched security vulnerabilities. Data breaches on legacy platforms carry the same regulatory and reputational consequences as breaches on modern ones — but legacy platforms have significantly higher breach probability.

**Building the Financial Model**

A credible transformation business case for a Ghanaian enterprise quantifies three things: the cost of the current state, the cost of the transformation, and the value of the future state.

For the current state, the exercise is: list every cost category described above and put a number on each one. How many developer hours per month go to legacy maintenance? What is the cost rate? How much staff time is consumed by manual processes that would be automated in the new system? What is the staff cost of that time? How many integration failures occurred in the last 12 months and what did each one cost to resolve? This is uncomfortable analysis because it surfaces costs that were previously invisible. It is also powerful because the numbers are typically larger than leadership expected.

For the transformation cost, the principle is to include everything: software licences, implementation fees, internal staff time, training, parallel running costs, and a contingency of 20–25% for scope changes and delays. Most transformations cost more than the initial estimate because scope expands and data migration is more complex than anticipated. Build this in from the start.

For the future state value, model the specific savings and revenue impacts the transformation will deliver: staff time freed from manual processes, integration maintenance costs eliminated, new revenue enabled by capabilities the current system cannot support. Discount the future cash flows appropriately and calculate the net present value and payback period.

A well-constructed model for a Ghanaian mid-market enterprise typically shows payback within 24 to 36 months and an IRR that compares favourably to most capital investments the business makes. The difficulty is not the arithmetic — it is doing the uncomfortable analysis of current-state costs that makes the model credible. Once those numbers are on the table, the business case makes itself.`,
  },
  {
    _id: 'insight-aws-azure-gcp-africa-comparison',
    slug: 'aws-azure-gcp-africa-comparison',
    title: 'AWS vs Azure vs GCP for African Enterprises: A Practical Cloud Platform Comparison',
    tag: 'Cloud & Infrastructure', label: 'Comparison',
    excerpt: 'All three hyperscalers have a presence in Africa, but their regional footprints, pricing models, and enterprise support offerings differ significantly. This comparison helps technology leaders choose the right platform for their workload, compliance requirements, and budget.',
    publishedAt: '2026-01-30', readTime: '10 min read',
    imageId: 'photo-1451187580459-43490279c0fa',
    relatedServices: [
      { title: 'Cloud & Infrastructure', slug: 'cloud-solutions' },
      { title: 'IT Strategy & Advisory', slug: 'it-consulting' },
    ],
    body: `Amazon Web Services, Microsoft Azure, and Google Cloud Platform have all made meaningful investments in Africa in recent years. AWS opened its Cape Town region in 2020. Azure has had South Africa North since 2019 and continues to expand its African footprint. GCP opened its Johannesburg region in 2023. For West African enterprises, all three platforms deliver workloads reliably — but they have meaningfully different strengths, pricing structures, and ecosystem characteristics that should influence the choice.

This comparison is written for technology leaders at African enterprises choosing a primary cloud platform, not for developers evaluating specific services. The goal is to give decision-makers a framework for the choice, not a comprehensive service-by-service feature comparison.

**AWS: The Broadest Platform, the Richest Ecosystem**

AWS is the global market leader and has been for over a decade. It has the broadest service catalogue of the three platforms — over 200 distinct services covering compute, storage, database, networking, machine learning, security, and developer tools — and the largest ecosystem of third-party tools, integration partners, and implementation expertise.

For African enterprises, AWS has specific strengths: its partner network in West Africa is more developed than Azure's or GCP's, its documentation and community resources are the most extensive, and its managed services for common enterprise workloads (databases, messaging, containerisation) are the most mature.

The challenges are also specific. AWS pricing is complex — the cost model for a sophisticated multi-service deployment requires careful optimisation to avoid significant waste, and optimisation requires expertise that is less available in West African markets than in Europe or North America. AWS support contracts are expensive relative to local IT budgets. And while the Cape Town region is available, routing from West Africa to Cape Town is not always faster than routing to Europe, depending on the workload.

**Azure: The Enterprise Integration Play**

Microsoft Azure is the right choice for enterprises that are already deeply invested in the Microsoft ecosystem. If your organisation runs Microsoft 365, Teams, Active Directory, and potentially Dynamics 365, Azure's native integration with these products delivers operational benefits that no amount of cross-platform integration can replicate. Single sign-on works seamlessly. Security policies flow from Active Directory to cloud resources without additional configuration. Teams and SharePoint integrate with Azure DevOps and Azure-hosted applications natively.

Azure also has the strongest enterprise sales and support motion of the three platforms in Africa. Microsoft has a long-established presence across the continent, a mature partner channel, and enterprise agreement structures that give large organisations significant commercial flexibility.

The weakness is breadth — Azure's service catalogue, while comprehensive, is less deep than AWS in several areas, and its managed services for some workload types lag AWS in maturity. For enterprises whose primary integration story is not Microsoft-first, Azure's advantages diminish considerably.

**GCP: The Analytics and AI Platform**

Google Cloud Platform's Africa region is the newest of the three, but GCP has specific strengths that make it compelling for certain workloads. Its data and analytics services — BigQuery for data warehousing, Vertex AI for machine learning, Looker for business intelligence — are widely regarded as the strongest of the three platforms. For enterprises with significant analytics or AI ambitions, GCP has a meaningful capability advantage.

GCP is also competitive on pricing for compute and storage, and its Kubernetes offering (GKE) is considered the most mature of the three, reflecting Google's position as the originator of Kubernetes.

For general enterprise workloads, GCP is the least established of the three platforms in African markets. Its partner network in West Africa is smaller, its enterprise support options are less tailored to local markets, and its brand recognition is lower, which affects talent availability.

**The Decision Framework**

Choose AWS if you are starting from a neutral position without existing vendor commitments, want the broadest service selection and the most established partner ecosystem, and are willing to invest in optimisation to control costs.

Choose Azure if Microsoft is already your primary enterprise software vendor — if you run 365, Teams, and Dynamics, Azure is the natural cloud extension of that ecosystem and the integration benefits are real.

Choose GCP if your primary driver is advanced analytics, machine learning, or data platform capability, and you have the internal or partner expertise to operate a less locally-established platform.

For most Ghanaian and West African enterprises starting their cloud journey without strong existing vendor commitments, AWS provides the lowest-risk starting point: the most established local partner network, the broadest documentation, and the most reference architecture for African-specific workloads.`,
  },
  {
    _id: 'insight-api-integration-african-business',
    slug: 'api-integration-african-business',
    title: 'API Integration in African Business: Why Your Software Stack Is Siloed and How to Fix It',
    tag: 'Platform Engineering', label: 'Integration',
    excerpt: 'Most African businesses run five to eight disconnected software tools. The productivity loss and data fragmentation from that disconnect compounds every quarter. Here is what modern integration architecture looks like at scale — and how to build it without replacing everything at once.',
    publishedAt: '2026-01-15', readTime: '6 min read',
    imageId: 'photo-1518770660439-4636190af475',
    relatedServices: [
      { title: 'API & Automation', slug: 'api-automation' },
      { title: 'Software Development', slug: 'software-development' },
      { title: 'Digital Transformation', slug: 'digital-transformation' },
    ],
    body: `The average Ghanaian mid-market business runs between five and eight software systems simultaneously: an accounting package, a payroll system, a CRM or spreadsheet-based pipeline tracker, an inventory tool, a customer service platform, and various communication and productivity tools. Each of these systems holds data about the business. None of them talks to the others.

The result is that the same data is entered manually into multiple systems. Orders received in one place have to be manually transferred to the inventory system. Invoices raised in accounting have to be manually reconciled against CRM pipeline data. Payroll information has to be manually compiled from attendance records and then manually entered into the accounting system. This is not just inefficient — it is error-prone, and the errors compound over time into data quality problems that make reporting unreliable and decision-making harder.

**The Business Cost of Fragmentation**

Quantifying the cost of software fragmentation requires looking at three categories of loss.

Direct labour waste is the most visible. Count the hours per week your finance team, operations team, and sales team spend transferring data between systems. In most Ghanaian businesses we audit, this runs to 8–20 hours per week across the affected teams. At GH₵ 200 per hour for a finance professional, 15 hours per week of manual data transfer costs GH₵ 156,000 per year — before accounting for the time lost to error correction.

Errors and reconciliation cost are harder to quantify but equally real. Every manual data transfer has an error rate. Those errors surface in month-end reconciliation, in customer-facing mistakes, and in management reporting that does not tie out. The time spent finding and correcting errors is cost, and the decisions made on incorrect data are risk.

Decision latency is the most strategically costly impact. When getting a complete picture of the business requires assembling data from five systems, the process takes hours or days rather than seconds. In fast-moving business environments, the organisation that can see its complete picture in real time makes better decisions than one working from last week's data.

**What Integration Architecture Looks Like**

Modern integration architecture for African businesses follows one of three patterns depending on scale and complexity.

Point-to-point API integration is the simplest: build a direct connection between two systems using their APIs to automatically synchronise specific data. An order placed in your e-commerce platform automatically creates a customer record in your CRM and triggers an inventory reservation. This works well when you have two to three integrations to manage and the systems are relatively stable.

Integration middleware — platforms like Zapier, Make, or n8n — provides a layer between your systems that allows you to build workflows without writing code. Event in system A triggers action in system B, with transformation and routing logic defined visually. This is appropriate for standard integrations between common tools and scales to 10–20 integration flows before the complexity becomes difficult to manage.

Custom integration platform is appropriate for organisations with complex requirements, high data volumes, or bespoke systems that middleware cannot handle. This means building or deploying an integration layer — typically an API gateway with event streaming and transformation logic — that sits between your systems and manages the data flows. This approach has higher upfront cost but lower long-term cost for complex environments and provides the reliability and observability that enterprise workloads require.

**Where to Start**

Most businesses do not need to solve all their integration problems simultaneously. Identify the highest-cost fragmentation point — the manual transfer that consumes the most time or creates the most errors — and start there. A single integration that eliminates the most painful manual process delivers immediate, measurable return and builds internal confidence in the integration approach.

The organisations that try to integrate everything at once typically do it poorly and slowly. The ones that fix the highest-cost pain point first, learn from it, and then expand their integration coverage systematically end up with better, more maintainable integration architecture — and they get to the wins faster.`,
  },
]

// ── Services ──────────────────────────────────────────

const services = [
  {
    _id: 'service-crm-erp',
    slug: 'crm-erp',
    order: 1, number: '01',
    title: 'CRM & ERP Implementation',
    tagline: 'The platform your operations run on.',
    description: 'We implement, customize, and integrate CRM and ERP platforms — Salesforce, Odoo, SAP — configured as business automation systems, not just software installations. Built for how African enterprises actually operate.',
    detail: "Most CRM and ERP implementations fail not because of the technology, but because the system is configured for a generic business — not yours. We bring deep implementation experience across Salesforce, Odoo, Microsoft Dynamics, and SAP, with particular expertise in configuring these platforms as genuine business automation engines for African organizations.\n\nFor Ghana and West Africa, that means multi-currency support with GHS as the primary currency, GRA tax compliance built directly into invoicing and financial workflows, Mobile Money integrations, and user interfaces designed for the devices and network conditions your team actually works with. We treat adoption as the real success metric — a system your team does not use delivers zero ROI. Our implementations include dedicated change management, staff training, and a post-launch optimization period to ensure the platform is genuinely embedded in how your business operates.",
    outcomes: ['CRM implementation & configuration', 'ERP deployment & business automation', 'Workflow design & process integration', 'Data migration & cleansing', 'Staff training & adoption support', 'Ongoing system optimization'],
    process: [
      { title: 'Requirements analysis', body: 'We run structured workshops with sales, operations, and finance leaders to map processes, data flows, and automation requirements before selecting a platform.' },
      { title: 'Platform selection & scoping', body: 'We match your requirements to the right platform — Salesforce, Odoo, SAP, or HubSpot — and produce a detailed scope and cost estimate.' },
      { title: 'Configuration & customization', body: 'We configure the platform in a staging environment — modules, custom fields, automations, and integrations — with milestone reviews throughout.' },
      { title: 'Data migration & testing', body: 'Existing customer, pipeline, and financial data is cleaned, mapped, and migrated with full validation before go-live. No data loss, no surprises.' },
      { title: 'Team training & adoption', body: 'Role-specific training sessions for every user group — from admin configuration to daily use — before the system goes live.' },
      { title: 'Post-launch support & optimization', body: 'Thirty days of dedicated post-launch support, followed by iterative optimization as your team uncovers new automation opportunities.' },
    ],
    stats: [{ num: '80+', label: 'CRM/ERP implementations' }, { num: '94%', label: 'User adoption rate' }, { num: '3mo', label: 'Avg. go-live timeline' }],
    faq: [
      {
        q: 'Which CRM is best for Ghana businesses — Salesforce, Odoo, or HubSpot?',
        a: 'It depends on your company size, budget, and what you are primarily trying to manage. Odoo is often the best fit for Ghanaian SMEs and mid-market companies — it is open-source, highly customizable, covers both CRM and ERP in one platform, and has strong GHS and GRA tax support. Salesforce is the enterprise standard and is ideal for larger organizations with complex sales processes and the budget to match. HubSpot works well for marketing-driven businesses focused on inbound lead generation. We assess your specific requirements and recommend the platform that gives you the best return — not the one with the highest margins for us.',
      },
      {
        q: 'Can Odoo or Salesforce handle GRA tax compliance and Ghanaian payroll?',
        a: "Yes, with proper configuration. Odoo has strong multi-currency and tax module support that we configure for Ghana Revenue Authority VAT and withholding tax requirements. Ghanaian payroll including SSNIT contributions, PAYE, and tier 1/2/3 pension can also be configured within Odoo's HR module. Salesforce requires integration with a local payroll provider for full GRA compliance. We have implemented compliant financial configurations for numerous Ghanaian businesses and understand the specific requirements in detail.",
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
  {
    _id: 'service-api-automation',
    slug: 'api-automation',
    order: 2, number: '02',
    title: 'System Integration & Automation',
    tagline: 'Connect everything. Automate the rest.',
    description: 'We design and build custom APIs, workflow automation systems, and integrations that eliminate manual work and connect every part of your business — from internal tools to enterprise systems and third-party platforms.',
    detail: 'Manual processes and disconnected systems are a hidden tax on your business. Every time a team member copies data from one system to another, chases an approval via email, or re-enters information that already exists elsewhere, you are paying in time, accuracy, and speed. We build the automation infrastructure that eliminates these friction points — APIs that expose your core business logic cleanly, workflow engines that route tasks, approvals, and notifications automatically, and integrations that make your existing systems work as one.\n\nOur automation work spans the full stack: REST and GraphQL APIs built for performance and security, Zapier and Make integrations for rapid workflow automation, webhook systems for real-time event processing, and custom orchestration layers for complex enterprise workflows. We work with whatever you already have — Salesforce, Odoo, SAP, QuickBooks, local ERP systems, mobile apps, or bespoke internal tools — and build the connective tissue that makes them function as a single platform.',
    outcomes: ['Custom REST & GraphQL API development', 'Workflow automation (Zapier, Make, n8n)', 'System integrations & data pipelines', 'Webhook design & event-driven systems', 'ERP & CRM API connectors', 'Automated reporting & document generation'],
    process: [
      { title: 'Systems audit & integration mapping', body: 'We map every system, data source, and manual handoff in your current environment to identify exactly where automation will deliver the highest return.' },
      { title: 'API design & data model definition', body: 'We design data contracts, endpoint structures, and authentication models before writing a line of code — so integrations are maintainable and extensible.' },
      { title: 'Workflow design & automation logic', body: 'We document the exact logic for each automation: triggers, conditions, data transformations, error handling, and escalation paths.' },
      { title: 'Build & test in staging', body: 'All automations are built and thoroughly tested in a staging environment that mirrors production — including edge cases and failure scenarios.' },
      { title: 'Go-live & monitoring setup', body: 'Managed go-live with monitoring dashboards and alerting configured so you know immediately if any automation fails or behaves unexpectedly.' },
      { title: 'Ongoing optimization & expansion', body: 'As your business grows we expand coverage — adding new triggers, systems, and workflows on a retained basis.' },
    ],
    stats: [{ num: '120+', label: 'Integrations delivered' }, { num: '85%', label: 'Avg. manual work eliminated' }, { num: '48h', label: 'Time to first working prototype' }],
    faq: [
      {
        q: 'What is the difference between an API and workflow automation?',
        a: 'An API (Application Programming Interface) is a connection point that allows two systems to exchange data programmatically — think of it as a standardized doorway between software systems. Workflow automation is the logic built on top of those connections: routing data, triggering actions, sending notifications, and moving information through a defined process without human intervention. Most automation projects need both — the API to connect systems, and the workflow to orchestrate what happens when data moves between them.',
      },
      {
        q: 'Can you automate processes that involve our existing ERP or CRM?',
        a: 'Yes. This is where most of our automation work starts. We build connectors and integration layers for Salesforce, Odoo, SAP, QuickBooks, and most major enterprise platforms — as well as custom-built internal systems. We begin by mapping your current data flows and identifying which manual steps can be replaced with automated logic, then build and deploy the integrations in phases so you see results quickly without disrupting live operations.',
      },
      {
        q: 'How long does an automation project take?',
        a: 'A focused automation — such as connecting two systems, automating an approval workflow, or building a single API endpoint — can be live in 2–4 weeks. More complex automation programs covering multiple systems and workflows typically run 8–16 weeks. We always start with a scoping session that maps your current processes, identifies the highest-value automation opportunities, and produces a clear timeline and cost estimate before any build work begins.',
      },
      {
        q: 'Do you build automations using platforms like Zapier and Make, or do you code everything from scratch?',
        a: 'Both, and we choose based on what is right for your situation. For straightforward workflow automations between cloud tools, Zapier and Make are faster and cheaper to build and maintain — and your team can manage them going forward. For high-volume, performance-sensitive, or security-critical automations — or when you need custom business logic that platforms cannot express — we build directly in code. Many of our projects combine both: a custom API layer we build, wired to workflow tools your team can operate independently.',
      },
    ],
  },
  {
    _id: 'service-software-development',
    slug: 'software-development',
    order: 3, number: '03',
    title: 'Software Development',
    tagline: 'SaaS platforms and enterprise software, built to scale.',
    description: 'We build SaaS products, enterprise applications, and custom platforms — from initial architecture through production deployment. Purpose-built for African market realities and global performance standards.',
    detail: 'Building software in Africa is not the same as building software for a homogeneous market. Our engineering team designs for real-world African constraints: mobile-first platforms that perform on variable network conditions, integrations with MTN Mobile Money, Telecel Cash, and Paystack, and architectures that remain responsive even when bandwidth is constrained.\n\nWe work in modern stacks — React, Next.js, Node.js, Python, Go — and ship in two-week agile sprints with client demos after each cycle. Whether you are building your first SaaS product, modernizing a legacy enterprise platform, or launching a mobile application for your operations team, we apply the same engineering discipline: understand the business problem deeply, design the right architecture, and deliver with precision. Every system we hand over is documented, tested, and built to be maintained — by us or by your own team.',
    outcomes: ['SaaS product development', 'Custom web & mobile applications', 'API design & platform integrations', 'Enterprise software engineering', 'Legacy system modernization', 'Ongoing maintenance & support'],
    process: [
      { title: 'Discovery & requirements', body: 'We run structured workshops with your product and technical stakeholders to map business goals, user needs, and system constraints before a line of code is written.' },
      { title: 'System architecture design', body: 'We design the data model, system boundaries, API contracts, and infrastructure blueprint — reviewed and signed off before build begins.' },
      { title: 'UI/UX design & prototyping', body: 'Interactive prototypes in Figma, tested with real users. You see and approve the full user experience before development starts.' },
      { title: 'Agile development sprints', body: 'Two-week sprints with a live demo at the end of each cycle. You see working software every fortnight — not just status updates.' },
      { title: 'QA, testing & security review', body: 'Automated testing, manual QA, and a security review covering OWASP Top 10 vulnerabilities before any system goes live.' },
      { title: 'Deployment, launch & handoff', body: 'Managed deployment to production, post-launch monitoring, full documentation, and a knowledge transfer session for your team.' },
    ],
    stats: [{ num: '200+', label: 'Systems built' }, { num: '98%', label: 'On-time delivery' }, { num: '50+', label: 'Enterprise clients' }],
    faq: [
      {
        q: 'How long does custom software development take for a Ghana-based business?',
        a: 'Timeline depends on complexity. A web platform or mobile app typically takes 8–16 weeks from discovery to launch. Enterprise systems with multiple integrations can take 4–9 months. We work in two-week agile sprints with demos after each cycle, so you see real progress throughout — not just at the end.',
      },
      {
        q: 'Can you build software that works on slow or unreliable internet connections?',
        a: "Yes. This is a core capability we have refined for African markets. We build progressive web apps, offline-first architectures, and data-efficient mobile experiences that continue working on 2G and 3G connections. Optimizing for Ghana's network realities is standard practice in every project we deliver, not an afterthought.",
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
  {
    _id: 'service-cloud-solutions',
    slug: 'cloud-solutions',
    order: 4, number: '04',
    title: 'Cloud & Infrastructure',
    tagline: 'Infrastructure that scales with you.',
    description: 'Cloud architecture, migration, and managed services on AWS, Microsoft Azure, and Google Cloud. Secure, reliable, cost-optimized infrastructure for businesses at any scale.',
    detail: "Cloud infrastructure is the backbone of every modern business. We help organizations migrate from on-premise servers to cloud, architect new cloud-native systems from scratch, and manage ongoing infrastructure with the reliability of a dedicated team. Our certified cloud architects work across AWS, Azure, and GCP — designing infrastructure that matches your actual workload, not the workload you might hypothetically have one day.\n\nFor Ghana-based businesses, cloud adoption brings particular advantages: eliminating the cost and risk of maintaining physical servers in a country where reliable power and cooling are challenges, accessing global infrastructure with verifiable uptime SLAs, and enabling remote teams to work from anywhere. We also address the data sovereignty and latency considerations that matter most to African businesses — including which cloud regions minimize latency for users in West Africa and how to structure data storage to meet Ghana's regulatory requirements.",
    outcomes: ['Cloud migration & lift-and-shift', 'Architecture design (AWS/Azure/GCP)', 'Managed cloud services', 'DevOps & CI/CD pipelines', 'Cost optimization & governance', 'Disaster recovery & backup'],
    process: [
      { title: 'Cloud readiness assessment', body: 'We audit your current infrastructure, applications, and data to determine what can migrate as-is, what needs re-architecting, and what to retire.' },
      { title: 'Architecture design & costing', body: 'A detailed cloud architecture blueprint with a full cost model — so you know exactly what you will pay before committing to the migration.' },
      { title: 'Migration planning & phasing', body: 'We sequence the migration to minimize risk: non-critical workloads first, mission-critical systems last, with a parallel-run period for each.' },
      { title: 'Execution & cutover', body: 'Managed migration with real-time monitoring and rollback capability at every stage. Final cutover scheduled during your lowest-traffic window.' },
      { title: 'Performance optimization', body: 'Post-migration tuning of compute, storage, and networking to hit the performance and cost targets defined in the architecture phase.' },
      { title: 'Ongoing managed services', body: 'Continuous monitoring, patching, cost governance, and capacity planning — cloud infrastructure managed like an internal team, without the headcount.' },
    ],
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
  {
    _id: 'service-digital-transformation',
    slug: 'digital-transformation',
    order: 5, number: '05',
    title: 'Business Process Transformation',
    tagline: 'Redesign how your business operates.',
    description: 'We help organizations redesign processes, automate workflows, and replace legacy systems with modern technology — reducing operational costs and unlocking new capability.',
    detail: 'Digital transformation is not a one-time project — it is a fundamental shift in how an organization uses technology to operate and compete. We guide businesses through every stage of that journey: diagnosing where manual processes and legacy systems are creating friction, designing the target operating model, and executing change in phases that maintain business continuity.\n\nFor Ghanaian organizations, this often means replacing paper-based workflows with digitized systems, connecting siloed departments onto shared platforms, and building the data infrastructure that executive teams need to make faster decisions. We have led transformations across banking, telecoms, healthcare, NGOs, and government agencies in Ghana and across West Africa — and we understand the change management challenges that are unique to African organizational cultures.',
    outcomes: ['Business process automation', 'Workflow digitization', 'Legacy system replacement', 'Change management & training', 'Technology roadmap development', 'ROI measurement frameworks'],
    process: [
      { title: 'Current state assessment', body: 'A structured discovery of your existing processes, systems, and pain points — identifying where manual work, legacy systems, and data silos are costing the most.' },
      { title: 'Gap analysis & opportunity mapping', body: 'We map the delta between your current state and the target operating model, quantifying the value of each opportunity to prioritize effort.' },
      { title: 'Roadmap & business case', body: 'A phased transformation roadmap with a clear business case for each initiative — so leadership can approve and fund phases with confidence.' },
      { title: 'Pilot implementation', body: 'We start with the highest-value, lowest-risk change to prove the model and build organizational confidence before scaling.' },
      { title: 'Full rollout & change management', body: 'Phased rollout with structured change management, staff training, and communication plans to drive genuine adoption across the organization.' },
      { title: 'Optimization & continuous improvement', body: 'Post-rollout measurement against agreed KPIs, iterative improvements, and regular reviews to ensure the transformation delivers its promised return.' },
    ],
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
  {
    _id: 'service-cybersecurity',
    slug: 'cybersecurity',
    order: 6, number: '06',
    title: 'Cybersecurity & SOC Monitoring',
    tagline: 'Enterprise-grade protection. 24/7.',
    description: 'Security audits, penetration testing, compliance frameworks, and 24/7 Security Operations Centre monitoring — designed to protect your business from modern threats and meet Bank of Ghana and Data Protection Act requirements.',
    detail: "Cybersecurity is no longer optional for businesses of any size in Ghana. The Bank of Ghana's cybersecurity directives, Ghana's Data Protection Act 2012, and the increasing sophistication of attacks targeting West African organizations have made security a board-level concern. A single breach can cost more than years of security investment — in downtime, data loss, regulatory fines, and reputational damage that takes years to rebuild.\n\nOur certified security team delivers the full spectrum of protection: systematic vulnerability identification, simulated attacks that expose real weaknesses before criminals do, compliance frameworks that satisfy regulators and auditors, and continuous monitoring that catches threats before they become incidents. We work with financial institutions, telecoms, healthcare organizations, government agencies, and enterprises across Ghana — and we understand the specific threat landscape and regulatory requirements that apply to each sector.\n\nFor organizations that need continuous coverage, our Security Operations Centre (SOC) monitoring service provides 24/7 threat detection across your entire environment — endpoints, network, cloud, and applications — with analyst-reviewed escalations, real-time alerting, and the monthly reports and audit-ready evidence packs that Bank of Ghana examinations and compliance audits require.",
    outcomes: ['Security audits & vulnerability assessments', 'Penetration testing', 'Compliance (ISO 27001, GDPR, PCI-DSS)', '24/7 SOC monitoring & incident response', 'Endpoint Detection & Response (EDR)', 'Employee security awareness training', 'Security policy development', 'Monthly threat reports & audit evidence packs'],
    process: [
      { title: 'Security baseline assessment', body: 'A comprehensive review of your current security posture — network architecture, access controls, data handling, and existing policies — to establish what we are working with.' },
      { title: 'Threat & risk modelling', body: 'We build a threat model specific to your industry, data assets, and operating environment so remediation effort is focused where risk is highest.' },
      { title: 'Penetration testing', body: 'Simulated attacks against your systems — web applications, internal networks, and cloud infrastructure — conducted by certified ethical hackers.' },
      { title: 'Remediation prioritization', body: 'A prioritized report telling you exactly what to fix, in what order, with severity ratings and remediation guidance for every finding.' },
      { title: 'Controls implementation', body: 'We implement the recommended controls — patching, access hardening, encryption, monitoring — working with your IT team or handling it entirely.' },
      { title: 'Continuous monitoring', body: '24/7 SOC monitoring with defined escalation procedures, monthly threat reports, and quarterly security reviews to keep your posture current.' },
    ],
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
  {
    _id: 'service-it-consulting',
    slug: 'it-consulting',
    order: 7, number: '07',
    title: 'IT Consulting & Managed Services',
    tagline: 'Strategy, oversight, and day-to-day IT — under one roof.',
    description: 'Technology strategy, IT governance, architecture reviews, and fully managed IT services — giving leadership teams clarity on decisions and continuous management of their technology environment.',
    detail: 'Most technology failures begin not with bad engineering, but with poor strategy: choosing the wrong platform, under-specifying a system, moving too fast before the organization is ready, or investing in technology before the business processes it is meant to support are well-defined. Our consulting practice works at the intersection of business and technology — helping leadership teams understand their options, evaluate trade-offs honestly, and build roadmaps they can actually execute and fund.\n\nFor organizations in Ghana and across West Africa, the stakes of poor technology decisions are particularly high: technology budgets are limited, implementation partners are harder to evaluate, and the consequences of a failed system implementation — lost productivity, data loss, staff frustration — can set an organization back by years. We bring independent, conflict-free advice. We do not sell software licences. We do not have preferred vendor relationships that influence our recommendations. We tell you what the right answer is for your organization — and then help you execute it.\n\nBeyond strategy, we offer Managed IT Services for organizations that want a single trusted partner to handle their entire technology environment on an ongoing basis. This covers 24/7 infrastructure monitoring, helpdesk support for your team, security patching and vulnerability management, vendor management, and a dedicated senior technology advisor assigned to your account — giving you the equivalent of a fully capable internal IT department without the cost of building one.',
    outcomes: ['Technology strategy & roadmaps', 'IT governance & policy frameworks', 'Architecture reviews & audits', 'Vendor selection & management', '24/7 infrastructure monitoring & helpdesk', 'Security patching & vulnerability management', 'Technology team structuring', 'Budget planning & TCO analysis'],
    process: [
      { title: 'Current state discovery', body: 'We interview key stakeholders, review your existing technology stack, and document current-state systems, costs, and pain points without assumptions.' },
      { title: 'Stakeholder & requirement alignment', body: 'We facilitate alignment sessions with leadership, IT, and operations to ensure the strategy is built on shared priorities — not just the loudest voice in the room.' },
      { title: 'Options analysis & recommendation', body: 'We evaluate credible options against your requirements, budget, and risk tolerance — and deliver a clear recommendation with a documented rationale.' },
      { title: 'Roadmap development', body: 'A phased technology roadmap with estimated costs, timelines, dependencies, and decision points — built to be presented to leadership and board.' },
      { title: 'Implementation guidance', body: 'We oversee implementation partners, review proposals, and provide technical governance throughout delivery — keeping your interests front and centre.' },
      { title: 'Advisory retainer & review cadence', body: 'Ongoing strategic advice on retainer: quarterly roadmap reviews, vendor negotiations, and on-demand access to a senior technology advisor.' },
    ],
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
]

// ── Testimonials ──────────────────────────────────────

const testimonials = [
  { _id: 'testimonial-kwame-asante', quote: "Astacraft didn't just deliver a system — they changed how we run our entire business. The team thinks like operators, not just engineers.", name: 'Kwame Asante', role: 'CEO, QuickMart Retail', initials: 'KA', featured: true },
  { _id: 'testimonial-ama-darko', quote: 'The payment link changed everything. We send the invoice, the client pays on their phone, and the receipt is already waiting for them.', name: 'Ama Darko', role: 'Brand Strategist, Accra', initials: 'AD', featured: false },
  { _id: 'testimonial-abena-mensah', quote: 'The cloud migration they ran for us was flawless. Zero downtime, costs dropped 38% in the first quarter. Genuinely impressive.', name: 'Abena Mensah', role: 'CTO, MTN Enterprise Ghana', initials: 'AM', featured: false },
  { _id: 'testimonial-kofi-mensah', quote: 'AstaBill removed the spreadsheet lag from our week. The dashboard tells me what is paid, what is due, and what needs follow-up.', name: 'Kofi Mensah', role: 'IT Consultant, Kumasi', initials: 'KM', featured: false },
  { _id: 'testimonial-emmanuel-ofori', quote: 'We have worked with many tech firms across Africa. Astacraft is the only one that treats our problems as their own.', name: 'Emmanuel Ofori', role: 'Head of Technology, Afreximbank', initials: 'EO', featured: false },
]

// ── Site Settings ─────────────────────────────────────

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  email: 'info@astacraftsystems.com',
  phone: '+233 24 918 7555',
  address: 'Sam Nujoma Street, North Ridge, Accra',
  responseTime: 'Within 24 hours',
  linkedinUrl: 'https://linkedin.com/company/astacraftsystems',
  twitterUrl: 'https://x.com/astacraftsys',
}

// ── Seed ──────────────────────────────────────────────

const key = (prefix: string, i: number) => `${prefix}-${i + 1}`

async function seed() {
  console.log(`Seeding project ${client.config().projectId} / dataset ${client.config().dataset}\n`)

  console.log('Uploading images...')
  const imageRefs = new Map<string, ImageRef>()
  const allImageIds = [
    ...caseStudies.map((c) => c.imageId),
    ...insights.map((i) => i.imageId),
  ]
  for (const id of Array.from(new Set(allImageIds))) {
    const ref = await uploadImage(unsplash(id), `${id}.jpg`)
    imageRefs.set(id, ref)
    console.log(`  ✓ ${id} → ${ref.asset._ref}`)
  }

  console.log('\nCreating case studies (oldest first)...')
  for (const cs of caseStudies) {
    await client.createOrReplace({
      _id: cs._id,
      _type: 'caseStudy',
      client: cs.client,
      slug: { _type: 'slug', current: cs.slug },
      industry: cs.industry,
      summary: cs.summary,
      challenge: cs.challenge,
      solution: cs.solution,
      results: cs.results,
      metric1_num: cs.metric1_num, metric1_label: cs.metric1_label,
      metric2_num: cs.metric2_num, metric2_label: cs.metric2_label,
      metric3_num: cs.metric3_num, metric3_label: cs.metric3_label,
      accent: cs.accent,
      coverImage: imageRefs.get(cs.imageId),
      services: cs.services,
      published: true,
      featured: cs.featured ?? false,
      ...(cs.navMetric ? { navMetric: cs.navMetric } : {}),
    })
    console.log(`  ✓ ${cs.client}`)
    await new Promise((r) => setTimeout(r, 300))
  }

  console.log('\nCreating insights...')
  for (const ins of insights) {
    await client.createOrReplace({
      _id: ins._id,
      _type: 'insight',
      title: ins.title,
      slug: { _type: 'slug', current: ins.slug },
      tag: ins.tag,
      label: ins.label,
      excerpt: ins.excerpt,
      body: ins.body,
      publishedAt: ins.publishedAt,
      readTime: ins.readTime,
      coverImage: imageRefs.get(ins.imageId),
      relatedServices: ins.relatedServices.map((s, i) => ({ _key: key('rel', i), ...s })),
      published: true,
    })
    console.log(`  ✓ ${ins.slug}`)
  }

  console.log('\nCreating services...')
  for (const svc of services) {
    await client.createOrReplace({
      _id: svc._id,
      _type: 'service',
      title: svc.title,
      slug: { _type: 'slug', current: svc.slug },
      number: svc.number,
      order: svc.order,
      tagline: svc.tagline,
      description: svc.description,
      detail: svc.detail,
      outcomes: svc.outcomes,
      process: svc.process.map((p, i) => ({ _key: key('step', i), ...p })),
      stats: svc.stats.map((s, i) => ({ _key: key('stat', i), ...s })),
      faq: svc.faq.map((f, i) => ({ _key: key('faq', i), ...f })),
    })
    console.log(`  ✓ ${svc.slug}`)
  }

  console.log('\nCreating testimonials...')
  for (const t of testimonials) {
    await client.createOrReplace({
      _id: t._id,
      _type: 'testimonial',
      quote: t.quote,
      name: t.name,
      role: t.role,
      initials: t.initials,
      featured: t.featured,
      published: true,
    })
    console.log(`  ✓ ${t.name}`)
  }

  console.log('\nCreating site settings...')
  await client.createOrReplace(siteSettings)
  console.log('  ✓ siteSettings')

  console.log('\nDone.')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
