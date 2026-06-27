import { Landmark, Radio, Zap, Activity, ShoppingBag, Building, Home, Leaf } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface IndustryChallenge {
  title: string
  body: string
}

export interface IndustryStat {
  num: string
  label: string
}

export interface IndustryFaq {
  q: string
  a: string
}

export interface IndustryConfig {
  name: string
  slug: string
  desc: string
  img: string
  tagline: string
  description: string
  whoWeServe: string[]
  stats: IndustryStat[]
  challenges: IndustryChallenge[]
  capabilities: { title: string; href: string }[]
  faqs: IndustryFaq[]
  bundle: 'launch' | 'growth' | 'operations' | 'secure' | 'enterprise'
  bundleLabel: string
  bundleReason: string
  Icon: LucideIcon
}

export const INDUSTRIES: IndustryConfig[] = [
  {
    name: 'Financial Services',
    slug: 'financial-services',
    desc: 'Core banking, payments & compliance',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&q=75&auto=format&fit=crop',
    tagline: 'Core banking, payments and compliance infrastructure built for Africa\'s financial sector.',
    description: 'From microfinance institutions to pan-African banks, we build the technology that keeps capital moving, clients engaged, and regulators satisfied. We understand the regulatory environment, the payment rails, and the operational realities of running financial services across Ghana and West Africa. Our financial services practice has delivered CRM implementations, ISO 27001 compliance programmes, and mobile money integrations for institutions managing portfolios from GHS 10 million to over USD 1 billion.',
    whoWeServe: [
      'Commercial banks and universal banks',
      'Microfinance institutions (MFIs)',
      'Insurance companies and brokers',
      'Payment service providers and fintechs',
      'Savings and credit cooperatives (SACCOs)',
    ],
    stats: [
      { num: '62%', label: 'Average reduction in client onboarding time post-CRM' },
      { num: '90 days', label: 'Typical CRM go-live for a bank or MFI in Ghana' },
      { num: 'ISO 27001', label: 'Security standard we implement and audit against' },
    ],
    challenges: [
      { title: 'Fragmented customer data', body: 'Multiple legacy systems with no single customer view. We unify them with CRM implementation and custom integration layers that consolidate your client data in real time across every branch and channel.' },
      { title: 'Compliance & audit readiness', body: 'ISO 27001, Bank of Ghana directives, and GDPR. We build the controls, audit trails, and documentation into the platform from day one — not bolted on after.' },
      { title: 'Mobile money integration', body: 'MTN, Vodafone Cash, and AirtelTigo Money are where your customers live. We connect your core systems to Africa\'s payment rails with resilient, monitored API integrations.' },
    ],
    capabilities: [
      { title: 'CRM & ERP Implementation',     href: '/services/crm-erp' },
      { title: 'Cybersecurity & Compliance',    href: '/services/cybersecurity' },
      { title: 'API & System Integration',      href: '/services/api-automation' },
      { title: 'Software Development',          href: '/services/software-development' },
    ],
    faqs: [
      {
        q: 'How long does a CRM implementation take for a bank in Ghana?',
        a: 'Most core CRM deployments for banks and microfinance institutions in Ghana take 60–120 days depending on data volume and integration complexity. We use a phased approach, delivering a working pilot within the first 30 days so your team can validate the system before full rollout.',
      },
      {
        q: 'Can you integrate with MTN MoMo, Vodafone Cash, and other Ghanaian payment rails?',
        a: 'Yes. We build direct API integrations with all major mobile money providers operating in Ghana and across West Africa — including MTN MoMo, Vodafone Cash, AirtelTigo Money, and Interswitch. We handle authentication, real-time status callbacks, and automated reconciliation.',
      },
      {
        q: 'What compliance standards do you build financial systems to?',
        a: 'We build to Bank of Ghana directives, ISO 27001 information security controls, and GDPR principles for clients with EU-connected data flows. Compliance documentation, audit trails, and access controls are built into the system architecture from the start — not added after deployment.',
      },
    ],
    bundle: 'enterprise',
    bundleLabel: 'Astacraft Enterprise™',
    bundleReason: 'Financial institutions require enterprise-grade security, regulatory compliance, and fully custom development — all managed as one engagement.',
    Icon: Landmark,
  },
  {
    name: 'Telecoms',
    slug: 'telecoms',
    desc: 'Cloud infrastructure & digital BSS/OSS',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&q=75&auto=format&fit=crop',
    tagline: 'Cloud infrastructure and digital operations modernisation for Africa\'s telecom sector.',
    description: 'We help telecom providers across Ghana and West Africa cut infrastructure cost, digitise customer operations, and modernise the BSS/OSS systems that run their networks. From AWS migrations to self-service enterprise portals, we work at telco scale — maintaining live service continuity throughout every phase of transformation. Our telecoms practice has delivered cloud migrations, enterprise customer portals, and API integration programmes for operators managing millions of active subscribers.',
    whoWeServe: [
      'Mobile network operators (MNOs)',
      'Internet service providers (ISPs)',
      'Enterprise telecoms and managed service providers',
      'Data centre operators',
      'MVNOs and virtual service resellers',
    ],
    stats: [
      { num: '38%', label: 'Average infrastructure cost reduction on cloud migration' },
      { num: '99.97%', label: 'Post-migration uptime achieved for a major telecom client' },
      { num: '6 months', label: 'Typical cloud migration timeline for enterprise telecoms' },
    ],
    challenges: [
      { title: 'Legacy BSS/OSS systems', body: 'Decade-old billing and operations platforms dragging down agility. We modernise incrementally — maintaining live service continuity while replacing systems layer by layer.' },
      { title: 'Rising infrastructure costs', body: 'Data centre sprawl driving up OpEx with no elasticity. Our cloud migration practice moves workloads to AWS and Azure with 30–40% average cost reduction across telecoms deployments in Africa.' },
      { title: 'Enterprise customer portals', body: 'B2B customers expect self-service account management. We build the portals that reduce call centre load, improve NPS, and cut churn among high-value enterprise accounts.' },
    ],
    capabilities: [
      { title: 'Cloud & Infrastructure',        href: '/services/cloud-solutions' },
      { title: 'Software Development',          href: '/services/software-development' },
      { title: 'API & System Integration',      href: '/services/api-automation' },
      { title: 'IT Consulting & Strategy',      href: '/services/it-consulting' },
    ],
    faqs: [
      {
        q: 'Can you migrate live telecom systems without service disruption?',
        a: 'Yes. We use a parallel-run migration methodology — maintaining full service continuity on existing infrastructure while the new environment is built, tested, and validated alongside it. Cutover happens only after your team signs off, with a tested rollback plan in place. All our telecoms migrations have completed with zero unplanned outages.',
      },
      {
        q: 'Do you work with AWS or Azure for African telecom deployments?',
        a: 'Both. We are certified on AWS and Microsoft Azure and help clients choose based on latency requirements, data sovereignty constraints, and existing licence agreements. For Africa-specific workloads, we leverage AWS Africa (Cape Town) and Azure South Africa, alongside Ghanaian hosting partners where local data residency is required.',
      },
      {
        q: 'How do you modernise BSS/OSS systems without disrupting billing?',
        a: 'We replace systems incrementally — starting with peripheral modules such as reporting and CRM, and working inward toward the billing core. Each phase runs in parallel with the live system before cutover. Your revenue collection is never interrupted, and your team adapts to each change progressively rather than through a single high-risk migration.',
      },
    ],
    bundle: 'enterprise',
    bundleLabel: 'Astacraft Enterprise™',
    bundleReason: 'Telecom-scale deployments require custom cloud architecture, enterprise systems, and a dedicated engagement model.',
    Icon: Radio,
  },
  {
    name: 'Energy & Utilities',
    slug: 'energy-utilities',
    desc: 'ERP, automation & field operations',
    img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&q=75&auto=format&fit=crop',
    tagline: 'ERP, workflow automation and field operations technology for energy companies across Africa.',
    description: 'Power utilities, oil and gas operators, and renewable energy developers across Ghana and West Africa trust us to digitise their operations — from field service management to automated regulatory reporting. Our energy practice understands the operational realities of managing distributed infrastructure across multiple regions, including low-connectivity environments, complex asset registers, and multi-regulator compliance requirements. We have delivered field operations platforms, ERP implementations, and compliance reporting systems for utilities managing infrastructure at national scale.',
    whoWeServe: [
      'Power utilities and electricity distribution companies',
      'Oil and gas operators',
      'Renewable energy developers and IPPs',
      'Water utilities and sanitation authorities',
      'Mining operations and extractives companies',
    ],
    stats: [
      { num: '85%', label: 'Faster field reporting after mobile operations platform deployment' },
      { num: '2,400+', label: 'Daily inspection reports digitised for a Ghanaian utility client' },
      { num: '120 days', label: 'Typical delivery for a field operations platform' },
    ],
    challenges: [
      { title: 'Manual field operations', body: 'Paper-based inspection and maintenance workflows generating backlogs and compliance risk. We replace them with mobile-first digital tools built for offline-first use in Ghana\'s low-connectivity field environments.' },
      { title: 'Regulatory reporting burden', body: 'Compliance reports that take teams weeks to compile from disparate sources. We automate data aggregation from your operational systems and generate regulator-ready reports on demand.' },
      { title: 'Asset lifecycle management', body: 'No single system tracking the full lifecycle of critical infrastructure assets. We deploy ERP modules purpose-configured for energy sector asset tracking, maintenance scheduling, and depreciation across distributed infrastructure.' },
    ],
    capabilities: [
      { title: 'CRM & ERP Implementation',      href: '/services/crm-erp' },
      { title: 'API & System Integration',       href: '/services/api-automation' },
      { title: 'Process Transformation',         href: '/services/digital-transformation' },
      { title: 'Software Development',           href: '/services/software-development' },
    ],
    faqs: [
      {
        q: 'Do your field tools work in areas with poor connectivity across Ghana?',
        a: 'Yes. All our field operations applications are built offline-first — data is captured and stored locally on the device, then synced automatically when a connection is available. This is essential for Ghana\'s power grid and field environments where 3G and 4G coverage is inconsistent or unavailable in rural and peri-urban areas.',
      },
      {
        q: 'Can you integrate with SCADA or operational technology systems?',
        a: 'Yes. We build secure API bridges between OT systems and enterprise IT platforms, following strict network segmentation principles to ensure operational systems are never directly exposed. We have experience integrating with common SCADA platforms used by utilities across West Africa, with full documentation of integration points for your operations team.',
      },
      {
        q: 'What does ERP implementation cost for an energy company in Ghana?',
        a: 'Engagements typically range from GHS 250,000 to GHS 650,000 depending on the number of ERP modules, integration scope, number of sites, and data migration complexity. We provide a detailed fixed-cost estimate before the engagement starts — there is no open-ended billing on our implementations.',
      },
    ],
    bundle: 'operations',
    bundleLabel: 'Astacraft Operations™',
    bundleReason: 'Energy companies need workflow automation, operational portals, and document management as a foundation before advanced systems.',
    Icon: Zap,
  },
  {
    name: 'Healthcare',
    slug: 'healthcare',
    desc: 'Hospital systems & patient portals',
    img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&q=75&auto=format&fit=crop',
    tagline: 'Hospital management systems, patient portals and data compliance for healthcare organisations in Africa.',
    description: 'We work with hospitals, clinic chains, and health networks across Ghana and West Africa to build digital infrastructure that improves patient outcomes, reduces administrative burden, and meets data protection requirements. Our healthcare technology practice understands both the clinical workflow and the compliance dimensions — including the Ghana Data Protection Act 2012, NHIA integration requirements, and HIPAA-aligned controls for internationally connected health organisations. We have deployed hospital management systems, patient engagement platforms, and billing automation tools across multi-site clinical operations.',
    whoWeServe: [
      'Private hospitals and specialist centres',
      'Multi-location clinic chains',
      'Health maintenance organisations (HMOs)',
      'Health insurance providers',
      'Diagnostic centres and medical laboratories',
    ],
    stats: [
      { num: '3×', label: 'Faster patient registration after hospital management system deployment' },
      { num: '8 clinics', label: 'Deployed simultaneously in one platform rollout across Accra and Kumasi' },
      { num: '5 months', label: 'Typical hospital management system delivery timeline' },
    ],
    challenges: [
      { title: 'Disconnected clinical systems', body: 'Patient data spread across paper files and siloed software with no single record. We build unified patient data platforms and EHR integrations that give clinicians a complete view at the point of care across every facility.' },
      { title: 'Patient engagement & retention', body: 'Low appointment adherence and poor follow-up driving avoidable readmissions. We build patient portals and automated SMS and WhatsApp communication flows that keep patients engaged throughout their care journey.' },
      { title: 'Health data compliance', body: 'Patient data is among the most sensitive regulated data in Ghana. We design systems with the Ghana Data Protection Act, HIPAA-aligned controls, role-based access, and full audit trails built into the architecture from day one.' },
    ],
    capabilities: [
      { title: 'Software Development',          href: '/services/software-development' },
      { title: 'Cybersecurity & Compliance',    href: '/services/cybersecurity' },
      { title: 'API & System Integration',      href: '/services/api-automation' },
      { title: 'Process Transformation',        href: '/services/digital-transformation' },
    ],
    faqs: [
      {
        q: 'Can you build a system that integrates with Ghana\'s National Health Insurance Authority (NHIA)?',
        a: 'Yes. We build NHIA-compatible claims systems and the data pipelines needed for automated claims submission, status tracking, and reconciliation. We understand both the technical specifications and the administrative requirements for NHIA accreditation, and have delivered NHIA integrations for clinic chains across Accra and Kumasi.',
      },
      {
        q: 'How do you handle patient data privacy under Ghana\'s Data Protection Act?',
        a: 'We design all healthcare systems with compliance to Ghana\'s Data Protection Act 2012 as a baseline requirement. This includes role-based access that limits patient record visibility to authorised clinical staff, full encryption at rest and in transit, audit trails on every record access and modification, and documented data retention and deletion policies. We also align with HIPAA controls for any organisation with international clinical partnerships.',
      },
      {
        q: 'What is the difference between an HMS and an EHR — which does my hospital need?',
        a: 'A Hospital Management System (HMS) covers the full operational workflow — admissions, billing, pharmacy, laboratory, scheduling, and management reporting. An Electronic Health Record (EHR) focuses specifically on clinical documentation and patient history. Most private hospitals in Ghana need an integrated HMS that includes EHR capability. We help you assess the right scope for your size, specialisation, and budget before any commitment is made.',
      },
    ],
    bundle: 'growth',
    bundleLabel: 'Astacraft Growth™',
    bundleReason: 'Healthcare organisations at scale need CRM, workflow automation, and patient engagement infrastructure working together.',
    Icon: Activity,
  },
  {
    name: 'Retail & Commerce',
    slug: 'retail-commerce',
    desc: 'E-commerce, POS & CRM integration',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&q=75&auto=format&fit=crop',
    tagline: 'E-commerce platforms, POS integration and CRM for Africa\'s retail and commerce sector.',
    description: 'From FMCG distributors to multi-branch retail chains across Ghana and West Africa, we build the technology stack that drives revenue, reduces shrinkage, and scales operations. We connect the systems that run your business — POS, inventory, e-commerce, and accounting — into a single, manageable platform. Our retail practice has delivered Odoo ERP implementations, omnichannel integrations, and mobile money payment systems for retail businesses operating from 1 to 50+ locations across the region.',
    whoWeServe: [
      'FMCG distributors and wholesalers',
      'Multi-branch retail chains and supermarkets',
      'Franchise operators',
      'E-commerce and direct-to-consumer businesses',
      'Specialty retailers and boutique chains',
    ],
    stats: [
      { num: '40%', label: 'Average inventory accuracy improvement after ERP deployment' },
      { num: '18 locations', label: 'Unified on one platform in a four-month retail rollout in Ghana' },
      { num: '4 months', label: 'Typical phased ERP rollout for a retail chain' },
    ],
    challenges: [
      { title: 'Omnichannel complexity', body: 'Online, in-store, and mobile channels operating with separate inventory and customer records, creating friction for staff and customers alike. We unify them under a single operational layer that keeps stock, pricing, and customer data consistent in real time.' },
      { title: 'Payment collection gaps', body: 'Lost sales from limited payment options and manual reconciliation eating finance team time. We integrate mobile money, card, and alternative payment methods across every channel — and automate the reconciliation entirely.' },
      { title: 'Inventory visibility', body: 'Stock variances discovered after the fact — through shrinkage or missed sales. We connect real-time inventory management to your POS and e-commerce systems with live dashboards that flag discrepancies as they happen.' },
    ],
    capabilities: [
      { title: 'CRM & ERP Implementation',      href: '/services/crm-erp' },
      { title: 'Software Development',          href: '/services/software-development' },
      { title: 'API & System Integration',      href: '/services/api-automation' },
      { title: 'Process Transformation',        href: '/services/digital-transformation' },
    ],
    faqs: [
      {
        q: 'Can you integrate our e-commerce store with a local POS system in Ghana?',
        a: 'Yes. We build bidirectional integrations between e-commerce platforms (WooCommerce, Shopify, or custom-built) and POS systems — keeping inventory, pricing, and order data synchronised across all sales channels. We also integrate with Ghana\'s mobile money ecosystem so online and in-store collections reconcile automatically in your accounting system.',
      },
      {
        q: 'We have 12 branches across Ghana. Can you deploy across all locations at once?',
        a: 'We recommend a phased approach — deploying to 1–2 pilot locations first, validating workflows with your team, then rolling out to remaining branches with lessons already applied. For a 12-location chain in Ghana, expect 3–5 months from kickoff to full deployment depending on network infrastructure readiness and staff training requirements at each site.',
      },
      {
        q: 'Which ERP system do you recommend for retail businesses in Ghana?',
        a: 'We primarily implement Odoo for retail clients because of its strong inventory, POS, and e-commerce modules and its flexibility for Ghanaian tax structures and local supplier management workflows. For larger chains with more complex multi-entity requirements, we also implement SAP Business One and custom-built platforms where Odoo\'s standard scope is insufficient.',
      },
    ],
    bundle: 'growth',
    bundleLabel: 'Astacraft Growth™',
    bundleReason: 'Retail businesses need CRM, automation, and digital commerce infrastructure working as one system to scale.',
    Icon: ShoppingBag,
  },
  {
    name: 'Government',
    slug: 'government',
    desc: 'Digital services & citizen portals',
    img: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=600&q=75&auto=format&fit=crop',
    tagline: 'Digital service delivery, citizen portals and secure infrastructure for the public sector in Ghana and Africa.',
    description: 'We partner with government ministries, public agencies, and state institutions across Ghana to modernise service delivery, digitise records, and build the secure technology infrastructure that citizens and staff depend on. Our government technology practice prioritises data sovereignty, security, and compliance with Ghana\'s public procurement and data protection frameworks. We have built citizen service portals, regulatory case management systems, and secure document management platforms for agencies serving thousands of Ghanaians daily.',
    whoWeServe: [
      'Government ministries and agencies',
      'Metropolitan and district assemblies',
      'State-owned enterprises',
      'Regulatory bodies and commissions',
      'Public universities and research institutions',
    ],
    stats: [
      { num: '100%', label: 'In-country data hosting — all government deployments can be hosted within Ghana' },
      { num: 'ISO 27001', label: 'Security framework applied to every government engagement' },
      { num: '47', label: 'Vulnerabilities remediated in a recent public sector security audit' },
    ],
    challenges: [
      { title: 'Paper-based service delivery', body: 'Citizens waiting days or weeks for services that could be delivered instantly online. We build digital service portals and case management systems that transform delivery without disrupting the operations your staff already depend on.' },
      { title: 'Data security & sovereignty', body: 'Government data requires the highest level of protection and must remain within Ghana\'s borders. We deploy compliant, locally-hosted infrastructure with rigorous access controls and full alignment with the Ghana Data Protection Act.' },
      { title: 'Legacy system modernisation', body: 'Decades-old systems blocking operational efficiency and creating security exposure. We modernise incrementally — replacing components without disrupting the critical services that depend on them, with no forced big-bang cutover.' },
    ],
    capabilities: [
      { title: 'Software Development',          href: '/services/software-development' },
      { title: 'Cybersecurity & Compliance',    href: '/services/cybersecurity' },
      { title: 'Process Transformation',        href: '/services/digital-transformation' },
      { title: 'Cloud & Infrastructure',        href: '/services/cloud-solutions' },
    ],
    faqs: [
      {
        q: 'Can your systems be hosted on government servers or within Ghana?',
        a: 'Yes. We prioritise data sovereignty for all government and public sector clients in Ghana. We deploy to government-owned infrastructure, Ghanaian data centres, or sovereign cloud environments — ensuring citizen and institutional data remains within national borders in full compliance with the Ghana Data Protection Act 2012 and relevant ministry data governance policies.',
      },
      {
        q: 'How do you handle public procurement rules for technology projects in Ghana?',
        a: 'We are experienced with Ghana\'s Public Procurement Act and work within both sole-source and competitive tender processes. We provide full technical specifications, source code escrow, system documentation, and vendor-neutral recommendations as standard — giving you everything required for internal approval, audit committee review, and Public Procurement Authority compliance.',
      },
      {
        q: 'What digital services have you built for Ghanaian government agencies?',
        a: 'We have built citizen service portals with GhIPSS and mobile money payment integration, regulatory case management systems with role-based workflow, and document management platforms for government archives. All deployments include full audit trails, role-based access controls, and system handover documentation for in-house IT teams to manage and maintain.',
      },
    ],
    bundle: 'secure',
    bundleLabel: 'Astacraft Secure™',
    bundleReason: 'Government agencies need cybersecurity, compliance controls, and endpoint protection as the foundation of any digital programme.',
    Icon: Building,
  },
  {
    name: 'Real Estate',
    slug: 'real-estate',
    desc: 'Property management & agent CRM',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&q=75&auto=format&fit=crop',
    tagline: 'Property management systems, agent CRM and tenant portals for real estate businesses in Ghana.',
    description: 'Property developers, agents, and management companies across Ghana use our platforms to manage listings, collect rent, track maintenance, and keep tenants engaged — all in one place. We understand the operational complexity of managing property portfolios across multiple locations, from Accra and Kumasi to secondary cities, and the specific challenges of mobile money rent collection, lease management, and agent commission tracking in the Ghanaian market. We have built tenant portals, agent CRM systems, and custom property listing websites for real estate businesses managing from 50 to 5,000+ units.',
    whoWeServe: [
      'Property developers and housing companies',
      'Estate agencies and property brokers',
      'Property management companies',
      'Real estate investment trusts (REITs)',
      'Mortgage lenders and housing finance institutions',
    ],
    stats: [
      { num: '6 weeks', label: 'Typical time to launch a tenant portal and automated rent collection system' },
      { num: '100%', label: 'Automated rent cycle — from payment link to receipt to reconciliation' },
      { num: '3 platforms', label: 'Average number of disconnected tools we consolidate per client' },
    ],
    challenges: [
      { title: 'Fragmented property data', body: 'Listings, tenants, leases, and maintenance tracked across spreadsheets and WhatsApp threads with no audit trail. We centralise everything into a managed, searchable platform with role-based access for your whole team.' },
      { title: 'Rent collection & receipting', body: 'Chasing payments manually and issuing receipts by hand is a full-time job for property managers in Ghana. We automate the entire rent collection cycle — payment links, receipting, arrears notifications, and reconciliation — across mobile money and bank transfer.' },
      { title: 'Agent pipeline management', body: 'No visibility into leads in progress or deals at risk of falling through. We deploy CRM systems purpose-configured for real estate sales cycles, commission tracking, and property matching in the Ghanaian market.' },
    ],
    capabilities: [
      { title: 'Software Development',          href: '/services/software-development' },
      { title: 'CRM & ERP Implementation',      href: '/services/crm-erp' },
      { title: 'API & System Integration',      href: '/services/api-automation' },
      { title: 'Process Transformation',        href: '/services/digital-transformation' },
    ],
    faqs: [
      {
        q: 'Can you integrate mobile money rent collection with our accounting system in Ghana?',
        a: 'Yes. We build integrations between mobile money collections (MTN MoMo, Vodafone Cash, AirtelTigo Money), your property management platform, and accounting software like QuickBooks or Xero. This automates the reconciliation that currently takes your finance team hours each month and eliminates manual receipt management for landlords and tenants across Ghana.',
      },
      {
        q: 'Can the platform manage multiple property portfolios across different owners?',
        a: 'Yes. We design multi-portfolio, multi-owner structures into the platform architecture from the start. Property managers get a consolidated operational view across all portfolios, while each property owner sees only their own assets — with granular permissions controlling data visibility and report access at every level of the organisation.',
      },
      {
        q: 'Do you build property listing websites, or only back-office management systems?',
        a: 'Both. We build custom property listing websites with advanced search, neighbourhood filters, virtual tour embeds, and lead capture forms — and we connect them directly to your agent CRM so every enquiry is logged, assigned, and followed up automatically without any manual data entry between systems.',
      },
    ],
    bundle: 'operations',
    bundleLabel: 'Astacraft Operations™',
    bundleReason: 'Real estate operations need workflow automation, tenant portals, and document management working as one managed system.',
    Icon: Home,
  },
  {
    name: 'Agritech',
    slug: 'agritech',
    desc: 'Farm management & supply chain digitisation',
    img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&q=75&auto=format&fit=crop',
    tagline: 'Farm management platforms, supply chain digitisation and mobile-first tools for agriculture in Africa.',
    description: 'We build the digital infrastructure connecting smallholder farmers, aggregators, processors, and exporters — from field-level data capture in rural Ghana to last-mile payments and export documentation. Our agritech practice is built for the realities of agricultural operations in West Africa: low-connectivity environments, multi-stakeholder supply chains, and the need to reach farmers at scale without assuming smartphone access or reliable mobile data. We have delivered farm management platforms, farmer registration systems, and traceability solutions for agricultural programmes spanning thousands of smallholder households across Ghana and the region.',
    whoWeServe: [
      'Agricultural aggregators and commodity offtakers',
      'Smallholder farmer networks and cooperatives',
      'Agricultural input suppliers and distributors',
      'Food processors and exporters',
      'Development finance institutions and NGOs running agricultural programmes',
    ],
    stats: [
      { num: '10,000+', label: 'Smallholder farmers manageable on a single farm management platform' },
      { num: 'Offline-first', label: 'All tools built for low-bandwidth rural environments across Ghana and West Africa' },
      { num: '6 months', label: 'Typical MVP delivery timeline for a farm management platform' },
    ],
    challenges: [
      { title: 'Farmer data collection at scale', body: 'No reliable way to collect and store farm-level data across thousands of smallholders in Ghana\'s rural regions. We build mobile-first tools — optimised for low-cost Android devices and low-bandwidth networks — that capture yield, quality, and compliance data at source.' },
      { title: 'Supply chain visibility', body: 'Produce lost, mislabelled, or under-valued between farm and market. We build traceability systems from field to fork, with QR code tracking, weight capture, and buyer-facing portals for exporters and processors across West Africa.' },
      { title: 'Input financing & payments', body: 'Farmers excluded from formal financial services and paid in cash after weeks of delay. We integrate MTN MoMo, Vodafone Cash, digital wallet systems, and revolving credit facilities directly into the platform for fast, auditable disbursements at scale.' },
    ],
    capabilities: [
      { title: 'Software Development',          href: '/services/software-development' },
      { title: 'API & System Integration',      href: '/services/api-automation' },
      { title: 'Process Transformation',        href: '/services/digital-transformation' },
      { title: 'Cloud & Infrastructure',        href: '/services/cloud-solutions' },
    ],
    faqs: [
      {
        q: 'Can your platform work for farmers without smartphones or reliable internet in Ghana?',
        a: 'Yes. We design for the realities of rural Ghana and West Africa. Field agent applications run on low-cost Android devices with offline-first data capture that syncs automatically when connectivity returns. For farmers without smartphones, trained field agents capture data on their behalf through the same platform — giving you complete coverage of your farmer base regardless of device access or network availability.',
      },
      {
        q: 'Can you handle bulk mobile money disbursements to thousands of farmers?',
        a: 'Yes. We build bulk disbursement modules that push payments to thousands of farmer accounts simultaneously via MTN MoMo, Vodafone Cash, and AirtelTigo Money — with automated reconciliation, per-farmer transaction confirmation, and exception handling for failed payments. This replaces the manual cash payment processes that create security risks, audit gaps, and operational bottlenecks at scale.',
      },
      {
        q: 'Do you work with development organisations and NGOs running agricultural programmes in Africa?',
        a: 'Yes. We have experience building platforms for development finance programmes across West Africa, including donor reporting dashboards, farmer registration with Ghana Card and biometric ID integration, and multi-currency financial flows for cross-border agricultural projects. We understand both the technical requirements and the governance and reporting expectations of development organisation partners and international funders.',
      },
    ],
    bundle: 'launch',
    bundleLabel: 'Astacraft Launch™',
    bundleReason: 'Agritech platforms typically start with a mobile-first MVP and digital presence before scaling to enterprise infrastructure.',
    Icon: Leaf,
  },
]

export const INDUSTRY_MAP: Record<string, IndustryConfig> = Object.fromEntries(
  INDUSTRIES.map(i => [i.slug, i])
)

export const BUNDLE_HREF: Record<string, string> = {
  launch:     '/solutions/launch',
  growth:     '/solutions/growth',
  operations: '/solutions/operations',
  secure:     '/solutions/secure',
  enterprise: '/solutions/enterprise',
}
