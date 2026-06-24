import { createElement } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getServices, getServiceBySlug } from '@/sanity/queries'
import type { ServiceDetail, ProcessStep } from '@/sanity/types'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/JsonLd'

export const revalidate = 3600
import { getServiceIcon } from '@/config/services'

export async function generateStaticParams() {
  try {
    const s = await getServices()
    return s.map((svc) => ({ slug: svc.slug.current }))
  } catch {
    return [
      'software-development', 'digital-transformation', 'cloud-solutions', 'cybersecurity',
      'crm-erp', 'api-automation', 'it-consulting',
    ].map(slug => ({ slug }))
  }
}

const categoryMap: Record<string, { label: string; color: string; colorRgb: string }> = {
  'software-development':   { label: 'Product Platform',  color: 'var(--color-green)',  colorRgb: 'var(--ch-green)' },
  'crm-erp':                { label: 'Product Platform',  color: 'var(--color-green)',  colorRgb: 'var(--ch-green)' },
  'api-automation':         { label: 'Product Platform',  color: 'var(--color-green)',  colorRgb: 'var(--ch-green)' },
  'cloud-solutions':        { label: 'Enterprise System', color: 'var(--color-accent)', colorRgb: 'var(--ch-accent)' },
  'digital-transformation': { label: 'Enterprise System', color: 'var(--color-accent)', colorRgb: 'var(--ch-accent)' },
  'cybersecurity':          { label: 'Enterprise System', color: 'var(--color-accent)', colorRgb: 'var(--ch-accent)' },
  'it-consulting':          { label: 'Enterprise System', color: 'var(--color-accent)', colorRgb: 'var(--ch-accent)' },
}

const fallbackServices: Record<string, Omit<ServiceDetail, '_id' | 'slug'>> = {
  'software-development': {
    number: '01', title: 'Software Development', tagline: 'SaaS platforms and enterprise software, built to scale.',
    description: 'We build SaaS products, enterprise applications, and custom platforms — from initial architecture through production deployment. Purpose-built for African market realities and global performance standards.',
    detail: 'Building software in Africa is not the same as building software for a homogeneous market. Our engineering team designs for real-world African constraints: mobile-first platforms that perform on variable network conditions, integrations with MTN Mobile Money, Telecel Cash, and Paystack, and architectures that remain responsive even when bandwidth is constrained.\n\nWe work in modern stacks — React, Next.js, Node.js, Python, Go — and ship in two-week agile sprints with client demos after each cycle. Whether you are building your first SaaS product, modernizing a legacy enterprise platform, or launching a mobile application for your operations team, we apply the same engineering discipline: understand the business problem deeply, design the right architecture, and deliver with precision. Every system we hand over is documented, tested, and built to be maintained — by us or by your own team.',
    outcomes: ['SaaS product development', 'Custom web & mobile applications', 'API design & platform integrations', 'Enterprise software engineering', 'Legacy system modernization', 'Ongoing maintenance & support'],
    process: [
      { title: 'Discovery & requirements',     body: 'We run structured workshops with your product and technical stakeholders to map business goals, user needs, and system constraints before a line of code is written.' },
      { title: 'System architecture design',   body: 'We design the data model, system boundaries, API contracts, and infrastructure blueprint — reviewed and signed off before build begins.' },
      { title: 'UI/UX design & prototyping',   body: 'Interactive prototypes in Figma, tested with real users. You see and approve the full user experience before development starts.' },
      { title: 'Agile development sprints',    body: 'Two-week sprints with a live demo at the end of each cycle. You see working software every fortnight — not just status updates.' },
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
  'api-automation': {
    number: '03', title: 'System Integration & Automation', tagline: 'Connect everything. Automate the rest.',
    description: 'We design and build custom APIs, workflow automation systems, and integrations that eliminate manual work and connect every part of your business — from internal tools to enterprise systems and third-party platforms.',
    detail: 'Manual processes and disconnected systems are a hidden tax on your business. Every time a team member copies data from one system to another, chases an approval via email, or re-enters information that already exists elsewhere, you are paying in time, accuracy, and speed. We build the automation infrastructure that eliminates these friction points — APIs that expose your core business logic cleanly, workflow engines that route tasks, approvals, and notifications automatically, and integrations that make your existing systems work as one.\n\nOur automation work spans the full stack: REST and GraphQL APIs built for performance and security, Zapier and Make integrations for rapid workflow automation, webhook systems for real-time event processing, and custom orchestration layers for complex enterprise workflows. We work with whatever you already have — Salesforce, Odoo, SAP, QuickBooks, local ERP systems, mobile apps, or bespoke internal tools — and build the connective tissue that makes them function as a single platform.',
    outcomes: ['Custom REST & GraphQL API development', 'Workflow automation (Zapier, Make, n8n)', 'System integrations & data pipelines', 'Webhook design & event-driven systems', 'ERP & CRM API connectors', 'Automated reporting & document generation'],
    process: [
      { title: 'Systems audit & integration mapping', body: 'We map every system, data source, and manual handoff in your current environment to identify exactly where automation will deliver the highest return.' },
      { title: 'API design & data model definition',  body: 'We design data contracts, endpoint structures, and authentication models before writing a line of code — so integrations are maintainable and extensible.' },
      { title: 'Workflow design & automation logic',  body: 'We document the exact logic for each automation: triggers, conditions, data transformations, error handling, and escalation paths.' },
      { title: 'Build & test in staging',             body: 'All automations are built and thoroughly tested in a staging environment that mirrors production — including edge cases and failure scenarios.' },
      { title: 'Go-live & monitoring setup',          body: 'Managed go-live with monitoring dashboards and alerting configured so you know immediately if any automation fails or behaves unexpectedly.' },
      { title: 'Ongoing optimization & expansion',    body: 'As your business grows we expand coverage — adding new triggers, systems, and workflows on a retained basis.' },
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
  'digital-transformation': {
    number: '02', title: 'Business Process Transformation', tagline: 'Redesign how your business operates.',
    description: 'We help organizations redesign processes, automate workflows, and replace legacy systems with modern technology — reducing operational costs and unlocking new capability.',
    detail: 'Digital transformation is not a one-time project — it is a fundamental shift in how an organization uses technology to operate and compete. We guide businesses through every stage of that journey: diagnosing where manual processes and legacy systems are creating friction, designing the target operating model, and executing change in phases that maintain business continuity.\n\nFor Ghanaian organizations, this often means replacing paper-based workflows with digitized systems, connecting siloed departments onto shared platforms, and building the data infrastructure that executive teams need to make faster decisions. We have led transformations across banking, telecoms, healthcare, NGOs, and government agencies in Ghana and across West Africa — and we understand the change management challenges that are unique to African organizational cultures.',
    outcomes: ['Business process automation', 'Workflow digitization', 'Legacy system replacement', 'Change management & training', 'Technology roadmap development', 'ROI measurement frameworks'],
    process: [
      { title: 'Current state assessment',          body: 'A structured discovery of your existing processes, systems, and pain points — identifying where manual work, legacy systems, and data silos are costing the most.' },
      { title: 'Gap analysis & opportunity mapping', body: 'We map the delta between your current state and the target operating model, quantifying the value of each opportunity to prioritize effort.' },
      { title: 'Roadmap & business case',           body: 'A phased transformation roadmap with a clear business case for each initiative — so leadership can approve and fund phases with confidence.' },
      { title: 'Pilot implementation',              body: 'We start with the highest-value, lowest-risk change to prove the model and build organizational confidence before scaling.' },
      { title: 'Full rollout & change management',  body: 'Phased rollout with structured change management, staff training, and communication plans to drive genuine adoption across the organization.' },
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
  'cloud-solutions': {
    number: '03', title: 'Cloud & Infrastructure', tagline: 'Infrastructure that scales with you.',
    description: 'Cloud architecture, migration, and managed services on AWS, Microsoft Azure, and Google Cloud. Secure, reliable, cost-optimized infrastructure for businesses at any scale.',
    detail: 'Cloud infrastructure is the backbone of every modern business. We help organizations migrate from on-premise servers to cloud, architect new cloud-native systems from scratch, and manage ongoing infrastructure with the reliability of a dedicated team. Our certified cloud architects work across AWS, Azure, and GCP — designing infrastructure that matches your actual workload, not the workload you might hypothetically have one day.\n\nFor Ghana-based businesses, cloud adoption brings particular advantages: eliminating the cost and risk of maintaining physical servers in a country where reliable power and cooling are challenges, accessing global infrastructure with Verifiable uptime SLAs, and enabling remote teams to work from anywhere. We also address the data sovereignty and latency considerations that matter most to African businesses — including which cloud regions minimize latency for users in West Africa and how to structure data storage to meet Ghana\'s regulatory requirements.',
    outcomes: ['Cloud migration & lift-and-shift', 'Architecture design (AWS/Azure/GCP)', 'Managed cloud services', 'DevOps & CI/CD pipelines', 'Cost optimization & governance', 'Disaster recovery & backup'],
    process: [
      { title: 'Cloud readiness assessment',    body: 'We audit your current infrastructure, applications, and data to determine what can migrate as-is, what needs re-architecting, and what to retire.' },
      { title: 'Architecture design & costing', body: 'A detailed cloud architecture blueprint with a full cost model — so you know exactly what you will pay before committing to the migration.' },
      { title: 'Migration planning & phasing',  body: 'We sequence the migration to minimize risk: non-critical workloads first, mission-critical systems last, with a parallel-run period for each.' },
      { title: 'Execution & cutover',           body: 'Managed migration with real-time monitoring and rollback capability at every stage. Final cutover scheduled during your lowest-traffic window.' },
      { title: 'Performance optimization',      body: 'Post-migration tuning of compute, storage, and networking to hit the performance and cost targets defined in the architecture phase.' },
      { title: 'Ongoing managed services',      body: 'Continuous monitoring, patching, cost governance, and capacity planning — cloud infrastructure managed like an internal team, without the headcount.' },
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
  'cybersecurity': {
    number: '04', title: 'Cybersecurity & SOC Monitoring', tagline: 'Enterprise-grade protection. 24/7.',
    description: 'Security audits, penetration testing, compliance frameworks, and 24/7 Security Operations Centre monitoring — designed to protect your business from modern threats and meet Bank of Ghana and Data Protection Act requirements.',
    detail: 'Cybersecurity is no longer optional for businesses of any size in Ghana. The Bank of Ghana\'s cybersecurity directives, Ghana\'s Data Protection Act 2012, and the increasing sophistication of attacks targeting West African organizations have made security a board-level concern. A single breach can cost more than years of security investment — in downtime, data loss, regulatory fines, and reputational damage that takes years to rebuild.\n\nOur certified security team delivers the full spectrum of protection: systematic vulnerability identification, simulated attacks that expose real weaknesses before criminals do, compliance frameworks that satisfy regulators and auditors, and continuous monitoring that catches threats before they become incidents. We work with financial institutions, telecoms, healthcare organizations, government agencies, and enterprises across Ghana — and we understand the specific threat landscape and regulatory requirements that apply to each sector.\n\nFor organizations that need continuous coverage, our Security Operations Centre (SOC) monitoring service provides 24/7 threat detection across your entire environment — endpoints, network, cloud, and applications — with analyst-reviewed escalations, real-time alerting, and the monthly reports and audit-ready evidence packs that Bank of Ghana examinations and compliance audits require.',
    outcomes: ['Security audits & vulnerability assessments', 'Penetration testing', 'Compliance (ISO 27001, GDPR, PCI-DSS)', '24/7 SOC monitoring & incident response', 'Endpoint Detection & Response (EDR)', 'Employee security awareness training', 'Security policy development', 'Monthly threat reports & audit evidence packs'],
    process: [
      { title: 'Security baseline assessment', body: 'A comprehensive review of your current security posture — network architecture, access controls, data handling, and existing policies — to establish what we are working with.' },
      { title: 'Threat & risk modelling',      body: 'We build a threat model specific to your industry, data assets, and operating environment so remediation effort is focused where risk is highest.' },
      { title: 'Penetration testing',          body: 'Simulated attacks against your systems — web applications, internal networks, and cloud infrastructure — conducted by certified ethical hackers.' },
      { title: 'Remediation prioritization',   body: 'A prioritized report telling you exactly what to fix, in what order, with severity ratings and remediation guidance for every finding.' },
      { title: 'Controls implementation',      body: 'We implement the recommended controls — patching, access hardening, encryption, monitoring — working with your IT team or handling it entirely.' },
      { title: 'Continuous monitoring',        body: '24/7 SOC monitoring with defined escalation procedures, monthly threat reports, and quarterly security reviews to keep your posture current.' },
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
  'crm-erp': {
    number: '02', title: 'CRM & ERP Implementation', tagline: 'The platform your operations run on.',
    description: 'We implement, customize, and integrate CRM and ERP platforms — Salesforce, Odoo, SAP — configured as business automation systems, not just software installations. Built for how African enterprises actually operate.',
    detail: 'Most CRM and ERP implementations fail not because of the technology, but because the system is configured for a generic business — not yours. We bring deep implementation experience across Salesforce, Odoo, Microsoft Dynamics, and SAP, with particular expertise in configuring these platforms as genuine business automation engines for African organizations.\n\nFor Ghana and West Africa, that means multi-currency support with GHS as the primary currency, GRA tax compliance built directly into invoicing and financial workflows, Mobile Money integrations, and user interfaces designed for the devices and network conditions your team actually works with. We treat adoption as the real success metric — a system your team does not use delivers zero ROI. Our implementations include dedicated change management, staff training, and a post-launch optimization period to ensure the platform is genuinely embedded in how your business operates.',
    outcomes: ['CRM implementation & configuration', 'ERP deployment & business automation', 'Workflow design & process integration', 'Data migration & cleansing', 'Staff training & adoption support', 'Ongoing system optimization'],
    process: [
      { title: 'Requirements analysis',          body: 'We run structured workshops with sales, operations, and finance leaders to map processes, data flows, and automation requirements before selecting a platform.' },
      { title: 'Platform selection & scoping',   body: 'We match your requirements to the right platform — Salesforce, Odoo, SAP, or HubSpot — and produce a detailed scope and cost estimate.' },
      { title: 'Configuration & customization',  body: 'We configure the platform in a staging environment — modules, custom fields, automations, and integrations — with milestone reviews throughout.' },
      { title: 'Data migration & testing',       body: 'Existing customer, pipeline, and financial data is cleaned, mapped, and migrated with full validation before go-live. No data loss, no surprises.' },
      { title: 'Team training & adoption',       body: 'Role-specific training sessions for every user group — from admin configuration to daily use — before the system goes live.' },
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
  'it-consulting': {
    number: '06', title: 'IT Consulting & Managed Services', tagline: 'Strategy, oversight, and day-to-day IT — under one roof.',
    description: 'Technology strategy, IT governance, architecture reviews, and fully managed IT services — giving leadership teams clarity on decisions and continuous management of their technology environment.',
    detail: 'Most technology failures begin not with bad engineering, but with poor strategy: choosing the wrong platform, under-specifying a system, moving too fast before the organization is ready, or investing in technology before the business processes it is meant to support are well-defined. Our consulting practice works at the intersection of business and technology — helping leadership teams understand their options, evaluate trade-offs honestly, and build roadmaps they can actually execute and fund.\n\nFor organizations in Ghana and across West Africa, the stakes of poor technology decisions are particularly high: technology budgets are limited, implementation partners are harder to evaluate, and the consequences of a failed system implementation — lost productivity, data loss, staff frustration — can set an organization back by years. We bring independent, conflict-free advice. We do not sell software licences. We do not have preferred vendor relationships that influence our recommendations. We tell you what the right answer is for your organization — and then help you execute it.\n\nBeyond strategy, we offer Managed IT Services for organizations that want a single trusted partner to handle their entire technology environment on an ongoing basis. This covers 24/7 infrastructure monitoring, helpdesk support for your team, security patching and vulnerability management, vendor management, and a dedicated senior technology advisor assigned to your account — giving you the equivalent of a fully capable internal IT department without the cost of building one.',
    outcomes: ['Technology strategy & roadmaps', 'IT governance & policy frameworks', 'Architecture reviews & audits', 'Vendor selection & management', '24/7 infrastructure monitoring & helpdesk', 'Security patching & vulnerability management', 'Technology team structuring', 'Budget planning & TCO analysis'],
    process: [
      { title: 'Current state discovery',            body: 'We interview key stakeholders, review your existing technology stack, and document current-state systems, costs, and pain points without assumptions.' },
      { title: 'Stakeholder & requirement alignment', body: 'We facilitate alignment sessions with leadership, IT, and operations to ensure the strategy is built on shared priorities — not just the loudest voice in the room.' },
      { title: 'Options analysis & recommendation',  body: 'We evaluate credible options against your requirements, budget, and risk tolerance — and deliver a clear recommendation with a documented rationale.' },
      { title: 'Roadmap development',                body: 'A phased technology roadmap with estimated costs, timelines, dependencies, and decision points — built to be presented to leadership and board.' },
      { title: 'Implementation guidance',            body: 'We oversee implementation partners, review proposals, and provide technical governance throughout delivery — keeping your interests front and centre.' },
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
}

const ALL_SLUGS = Object.keys(fallbackServices)

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params

  let svc: ServiceDetail | null = null
  try { svc = await getServiceBySlug(slug) } catch {}
  if (!svc) svc = (fallbackServices[slug] as ServiceDetail | undefined) ?? null
  if (!svc) return { title: 'Service | Astacraft Systems' }

  const titleMap: Record<string, string> = {
    'software-development':   'Custom Software Development Ghana | Astacraft Systems',
    'cloud-solutions':        'Cloud Infrastructure & Migration Services Ghana | Astacraft Systems',
    'cybersecurity':          'Cybersecurity Services Ghana — Penetration Testing & SOC | Astacraft Systems',
    'crm-erp':                'CRM & ERP Implementation Ghana — Salesforce, Odoo | Astacraft Systems',
    'digital-transformation': 'Digital Transformation Consulting Ghana | Astacraft Systems',
    'api-automation':         'API Integration & Workflow Automation Ghana | Astacraft Systems',
    'it-consulting':          'IT Consulting & Technology Strategy Ghana | Astacraft Systems',
  }
  const title = titleMap[slug] ?? `${svc.title} in Ghana | Astacraft Systems`
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
      images: [{ url: 'https://astacraftsystems.com/opengraph-image.png', width: 1200, height: 630 }],
    },
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let svc: ServiceDetail | null = null
  try {
    svc = await getServiceBySlug(slug)
  } catch {}
  if (!svc) svc = (fallbackServices[slug] as ServiceDetail | undefined) ?? null
  if (!svc) notFound()

  const category = categoryMap[slug] ?? { label: 'Service', color: 'rgba(255,255,255,0.40)' }
  const stats    = svc.stats   || fallbackServices[slug]?.stats   || []
  const process  = svc.process || fallbackServices[slug]?.process || []

  const idx     = ALL_SLUGS.indexOf(slug)
  const related = [1, 2, 3].map(offset => {
    const s = ALL_SLUGS[(idx + offset) % ALL_SLUGS.length]
    return { ...fallbackServices[s], slug: s, Icon: getServiceIcon(s) }
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
          areaServed: [
            { '@type': 'Country', name: 'Ghana' },
            { '@type': 'Country', name: 'Nigeria' },
            { '@type': 'Country', name: 'Kenya' },
            { '@type': 'Country', name: 'South Africa' },
            { '@type': 'Country', name: 'Ivory Coast' },
            { '@type': 'Country', name: 'Senegal' },
            { '@type': 'Country', name: 'Rwanda' },
            { '@type': 'Country', name: 'Tanzania' },
            { '@type': 'Country', name: 'Uganda' },
            { '@type': 'Country', name: 'Ethiopia' },
            { '@type': 'Country', name: 'Cameroon' },
            { '@type': 'Country', name: 'Zambia' },
          ],
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
            <span
              className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.22em] uppercase px-3 py-1.5 border mb-8 w-fit"
              style={{ borderColor: `rgba(${category.colorRgb},0.27)`, color: category.color }}
            >
              {createElement(getServiceIcon(slug), { className: 'w-3 h-3' })}
              {category.label}
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
        <section className="bg-[var(--color-accent)] px-[clamp(24px,5vw,80px)] py-14">
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
            <div className="mb-16 reveal">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-4">How We Work</p>
              <h2
                className="font-serif font-bold text-[var(--color-text)] leading-tight"
                style={{ fontSize: 'clamp(32px,4.5vw,56px)' }}
              >
                The engagement process.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(var(--ch-accent),0.10)]">
              {process.map((step: ProcessStep, i: number) => {
                const title = typeof step === 'string' ? step : step.title
                const body  = typeof step === 'string' ? null  : step.body
                return (
                  <div
                    key={i}
                    className="group bg-[var(--color-surface)] p-10 reveal hover:bg-[var(--color-panel)] transition-colors duration-300"
                    style={{ transitionDelay: `${i * 70}ms` }}
                  >
                    <p
                      className="font-serif font-black leading-none mb-6 select-none text-[rgba(var(--ch-accent),0.12)] group-hover:text-[rgba(var(--ch-accent),0.22)] transition-colors duration-300"
                      style={{ fontSize: 'clamp(48px,5vw,72px)' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="font-serif text-[20px] font-bold mb-3 leading-snug text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-300">{title}</h3>
                    {body && <p className="text-[14px] text-[rgba(var(--ch-text),0.55)] leading-relaxed">{body}</p>}
                  </div>
                )
              })}
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
              className="inline-block font-mono text-[11px] tracking-[0.14em] uppercase font-medium bg-[var(--color-green)] text-white px-10 py-4 hover:bg-[var(--color-green-hover)] transition-colors duration-200"
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
