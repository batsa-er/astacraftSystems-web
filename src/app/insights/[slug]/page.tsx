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
  'cloud-architecture-african-enterprise': {
    title: 'Cloud Architecture for African Enterprise: Building for Reliability When Infrastructure Works Against You',
    tag: 'Cloud & Infrastructure', publishedAt: '2026-05-12', readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=514&q=80&auto=format&fit=crop',
    excerpt: 'AWS, Azure, and GCP are available across Africa — but latency, last-mile connectivity, and power reliability demand a different architecture approach than what global guides recommend.',
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
  'salesforce-vs-dynamics-vs-odoo-africa': {
    title: 'Salesforce vs Microsoft Dynamics vs Odoo: Choosing the Right CRM for Your African Enterprise',
    tag: 'CRM & Enterprise Systems', publishedAt: '2026-05-05', readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=514&q=80&auto=format&fit=crop',
    excerpt: 'Not every CRM built for global enterprises fits the way African businesses operate. This guide compares Salesforce, Microsoft Dynamics 365, and Odoo across cost, customisation, and fit for African market realities.',
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
  'digital-transformation-ghana-roadmap': {
    title: 'Digital Transformation in Ghana: A Practical Roadmap for Mid-Size Enterprises',
    tag: 'Digital Transformation', publishedAt: '2026-04-22', readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=514&q=80&auto=format&fit=crop',
    excerpt: 'Digital transformation is not a single project — it is a shift in how a business operates. This roadmap breaks the journey into four phases that mid-size Ghanaian enterprises can execute without disrupting daily operations.',
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
  'mobile-money-integration-saas-africa': {
    title: 'Mobile Money Integration for African SaaS Products: What Developers and Founders Need to Know',
    tag: 'SaaS & Payments', publishedAt: '2026-04-10', readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=514&q=80&auto=format&fit=crop',
    excerpt: 'MTN MoMo, Telecel Cash, and AT Money collectively cover over 60 million active wallets in Ghana. If your SaaS product does not accept Mobile Money, you are locking out your most important payment channel.',
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
  'iso-27001-certification-africa': {
    title: 'ISO 27001 Certification in Africa: Why It Matters for Enterprise Technology Buyers and How to Get There',
    tag: 'Cybersecurity', publishedAt: '2026-03-28', readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=514&q=80&auto=format&fit=crop',
    excerpt: 'As procurement teams tighten vendor security requirements, ISO 27001 is shifting from a differentiator to a baseline expectation. This guide explains what it covers, how long it takes, and what to prioritise first.',
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
  'crm-west-african-banking': {
    title: 'How West African Banks Are Using CRM to Win Commercial Lending Relationships',
    tag: 'CRM & Enterprise Systems', publishedAt: '2026-03-14', readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=514&q=80&auto=format&fit=crop',
    excerpt: 'The battle for corporate banking clients in West Africa is being fought on relationship quality. Here is how Salesforce and Dynamics are being deployed to systematise what used to be purely human.',
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
  'erp-implementation-failure-africa': {
    title: 'Why ERP Implementations Fail in Africa — and the Five Decisions That Determine Success',
    tag: 'CRM & Enterprise Systems', publishedAt: '2026-02-27', readTime: '11 min read',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=514&q=80&auto=format&fit=crop',
    excerpt: 'A large share of ERP projects in Africa run over budget, miss their go-live date, or deliver a fraction of the intended value. The root causes are rarely technical — and they are preventable.',
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
  'legacy-system-cost-cfo-guide': {
    title: 'The Real Cost of Legacy Systems: A CFO\'s Guide to Building the Digital Transformation Business Case',
    tag: 'Digital Transformation', publishedAt: '2026-02-10', readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=514&q=80&auto=format&fit=crop',
    excerpt: 'The question African CFOs keep asking is not whether to modernise — it is how to justify the cost. Here is the financial model that makes the case from operational data.',
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
  'aws-azure-gcp-africa-comparison': {
    title: 'AWS vs Azure vs GCP for African Enterprises: A Practical Cloud Platform Comparison',
    tag: 'Cloud & Infrastructure', publishedAt: '2026-01-30', readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=514&q=80&auto=format&fit=crop',
    excerpt: 'All three hyperscalers have a presence in Africa, but their regional footprints, pricing models, and enterprise support offerings differ significantly. This comparison helps technology leaders choose the right platform.',
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
  'api-integration-african-business': {
    title: 'API Integration in African Business: Why Your Software Stack Is Siloed and How to Fix It',
    tag: 'Platform Engineering', publishedAt: '2026-01-15', readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=514&q=80&auto=format&fit=crop',
    excerpt: 'Most African businesses run five to eight disconnected software tools. The productivity loss from that fragmentation compounds every quarter. Here is what modern integration architecture looks like at scale.',
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
      images: [{ url: 'https://astacraftsystems.com/opengraph-image.png', width: 1200, height: 630 }],
      ...(ins.publishedAt && { publishedTime: ins.publishedAt }),
    },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

const SERVICE_TO_BUNDLE: Record<string, string> = {
  'cybersecurity':          'secure',
  'crm-erp':                'growth',
  'digital-transformation': 'operations',
  'api-automation':         'operations',
  'cloud-solutions':        'enterprise',
  'software-development':   'enterprise',
  'it-consulting':          'enterprise',
}

function bundleFromServices(services: { slug: string }[]): string | null {
  for (const svc of services) {
    const b = SERVICE_TO_BUNDLE[svc.slug]
    if (b) return b
  }
  return null
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

  const ctaBundle = bundleFromServices((ins.relatedServices || []) as { slug: string }[])
  const ctaHref = ctaBundle ? `/contact?bundle=${ctaBundle}` : '/contact'

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
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${coverSrc ? 'bg-white/20' : 'bg-[var(--color-accent)]'}`}>
                  <span className="font-mono text-[9px] font-bold text-white leading-none">
                    {ins.author ? ins.author.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : 'AS'}
                  </span>
                </div>
                <div className="flex flex-col leading-none gap-0.5">
                  <span className={`font-mono text-[10px] tracking-[0.1em] ${coverSrc ? 'text-[rgba(255,255,255,0.65)]' : 'text-[rgba(var(--ch-text),0.50)]'}`}>
                    {ins.author ?? 'Astacraft Systems'}
                  </span>
                  {ins.authorRole && (
                    <span className={`font-mono text-[9px] tracking-[0.08em] ${coverSrc ? 'text-[rgba(255,255,255,0.38)]' : 'text-[rgba(var(--ch-text),0.30)]'}`}>
                      {ins.authorRole}
                    </span>
                  )}
                </div>
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
      <section className="relative bg-[var(--color-dark)] px-[clamp(24px,5vw,80px)] py-28 overflow-hidden text-center">
        <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(29,71,118,0.14),transparent)] pointer-events-none" />
        <div className="relative max-w-[700px] mx-auto">
          <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[rgba(255,255,255,0.30)] mb-4">Let&apos;s talk strategy</p>
          <h2 className="font-serif font-bold text-white mb-4" style={{ fontSize: 'clamp(28px,3vw,48px)' }}>
            Want this applied to your business?
          </h2>
          <p className="text-[rgba(255,255,255,0.50)] mb-10 text-[15px] leading-relaxed max-w-[44ch] mx-auto">
            Book a complimentary strategy call and we will show you how these principles apply to your specific market and stage.
          </p>
          <Link
            href={ctaHref}
            className="btn-shimmer inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white px-10 py-4 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
          >
            Book Strategy Call →
          </Link>
        </div>
      </section>
    </>
  )
}
