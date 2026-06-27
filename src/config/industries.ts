import { Landmark, Radio, Zap, Activity, ShoppingBag, Building, Home, Leaf } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface IndustryChallenge {
  title: string
  body: string
}

export interface IndustryConfig {
  name: string
  slug: string
  desc: string
  img: string
  tagline: string
  description: string
  challenges: IndustryChallenge[]
  capabilities: { title: string; href: string }[]
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
    description: 'From microfinance institutions to pan-African banks, we build the technology that keeps capital moving, clients engaged, and regulators satisfied. We understand the regulatory environment, the payment rails, and the operational realities of running financial services on the continent.',
    challenges: [
      { title: 'Fragmented customer data', body: 'Multiple legacy systems with no single customer view. We unify them with CRM implementation and custom integration layers that consolidate your client data in real time.' },
      { title: 'Compliance & audit readiness', body: 'ISO 27001, Bank of Ghana directives, and GDPR. We build the controls, audit trails, and documentation into the platform from day one — not bolted on after.' },
      { title: 'Mobile money integration', body: 'MTN, Vodafone Cash, and AirtelTigo Money are where your customers live. We connect your core systems to Africa\'s payment rails with resilient, monitored API integrations.' },
    ],
    capabilities: [
      { title: 'CRM & ERP Implementation',     href: '/services/crm-erp' },
      { title: 'Cybersecurity & Compliance',    href: '/services/cybersecurity' },
      { title: 'API & System Integration',      href: '/services/api-automation' },
      { title: 'Software Development',          href: '/services/software-development' },
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
    description: 'We help telecom providers cut infrastructure cost, digitise customer operations, and modernise the BSS/OSS systems that run their networks. From AWS migrations to self-service enterprise portals, we work at telco scale.',
    challenges: [
      { title: 'Legacy BSS/OSS systems', body: 'Decade-old billing and operations platforms dragging down agility. We modernise incrementally — maintaining live service continuity while replacing systems layer by layer.' },
      { title: 'Rising infrastructure costs', body: 'Data centre sprawl driving up OpEx with no elasticity. Our cloud migration practice moves workloads to AWS and Azure with 30–40% average cost reduction.' },
      { title: 'Enterprise customer portals', body: 'B2B customers expect self-service account management. We build the portals that reduce call centre load, improve NPS, and cut churn among high-value accounts.' },
    ],
    capabilities: [
      { title: 'Cloud & Infrastructure',        href: '/services/cloud-solutions' },
      { title: 'Software Development',          href: '/services/software-development' },
      { title: 'API & System Integration',      href: '/services/api-automation' },
      { title: 'IT Consulting & Strategy',      href: '/services/it-consulting' },
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
    tagline: 'ERP, workflow automation and field operations technology for energy companies.',
    description: 'Power utilities, oil & gas operators, and renewable energy developers trust us to digitise their operations — from field service management to automated regulatory reporting. We know the operational realities of managing distributed infrastructure across multiple regions.',
    challenges: [
      { title: 'Manual field operations', body: 'Paper-based inspection and maintenance workflows generating backlogs and compliance risk. We replace them with mobile-first digital tools that work in low-connectivity environments.' },
      { title: 'Regulatory reporting burden', body: 'Compliance reports that take teams weeks to compile from disparate sources. We automate data aggregation from your operational systems and generate regulator-ready reports on demand.' },
      { title: 'Asset lifecycle management', body: 'No single system tracking the full lifecycle of critical infrastructure assets. We deploy ERP modules purpose-configured for energy sector asset tracking, maintenance scheduling, and depreciation.' },
    ],
    capabilities: [
      { title: 'CRM & ERP Implementation',      href: '/services/crm-erp' },
      { title: 'API & System Integration',       href: '/services/api-automation' },
      { title: 'Process Transformation',         href: '/services/digital-transformation' },
      { title: 'Software Development',           href: '/services/software-development' },
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
    tagline: 'Hospital management systems, patient portals and data compliance for African healthcare.',
    description: 'We work with hospitals, clinics, and health networks to build digital infrastructure that improves patient outcomes, reduces administrative burden, and meets data protection requirements. Our healthcare practice understands both the clinical and compliance dimensions.',
    challenges: [
      { title: 'Disconnected clinical systems', body: 'Patient data spread across paper files and siloed software with no single record. We build unified integrations and patient data platforms that give clinicians a complete view at the point of care.' },
      { title: 'Patient engagement & retention', body: 'Low appointment adherence and poor follow-up driving avoidable readmissions. We build patient portals and automated SMS/WhatsApp communication flows that keep patients engaged.' },
      { title: 'Health data compliance', body: 'Patient data is among the most sensitive regulated data. We design systems with HIPAA-aligned controls, role-based access, full audit trails, and local health ministry compliance built in.' },
    ],
    capabilities: [
      { title: 'Software Development',          href: '/services/software-development' },
      { title: 'Cybersecurity & Compliance',    href: '/services/cybersecurity' },
      { title: 'API & System Integration',      href: '/services/api-automation' },
      { title: 'Process Transformation',        href: '/services/digital-transformation' },
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
    tagline: 'E-commerce platforms, POS integration and CRM for Africa\'s retail sector.',
    description: 'From FMCG distributors to multi-branch retail chains, we help commerce businesses build the technology stack that drives revenue, reduces shrinkage, and scales operations. We connect the systems that run your business into a single, manageable platform.',
    challenges: [
      { title: 'Omnichannel complexity', body: 'Online, in-store, and mobile channels operating with separate inventory and customer records, creating friction for staff and customers alike. We unify them under a single operational layer.' },
      { title: 'Payment collection gaps', body: 'Lost sales from limited payment options and manual reconciliation eating finance team time. We integrate mobile money, card, and alternative payment methods across every channel.' },
      { title: 'Inventory visibility', body: 'Stock variances discovered after the fact — either through shrinkage or missed sales. We connect real-time inventory management to your POS and e-commerce systems with live dashboards.' },
    ],
    capabilities: [
      { title: 'CRM & ERP Implementation',      href: '/services/crm-erp' },
      { title: 'Software Development',          href: '/services/software-development' },
      { title: 'API & System Integration',      href: '/services/api-automation' },
      { title: 'Process Transformation',        href: '/services/digital-transformation' },
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
    tagline: 'Digital service delivery, citizen portals and secure infrastructure for the public sector.',
    description: 'We partner with government agencies, ministries, and public institutions to modernise service delivery, digitise records, and build the secure technology infrastructure that citizens and staff depend on. Our government practice prioritises security, compliance, and local data sovereignty.',
    challenges: [
      { title: 'Paper-based service delivery', body: 'Citizens waiting days or weeks for services that could be delivered instantly online. We build digital service portals and case management systems that transform delivery without disrupting operations.' },
      { title: 'Data security & sovereignty', body: 'Government data requires the highest level of protection and must often remain within national borders. We deploy compliant, locally-hosted infrastructure with rigorous access controls.' },
      { title: 'Legacy system modernisation', body: 'Decades-old systems that block operational efficiency and create security exposure. We modernise incrementally — replacing components without disrupting the critical services that depend on them.' },
    ],
    capabilities: [
      { title: 'Software Development',          href: '/services/software-development' },
      { title: 'Cybersecurity & Compliance',    href: '/services/cybersecurity' },
      { title: 'Process Transformation',        href: '/services/digital-transformation' },
      { title: 'Cloud & Infrastructure',        href: '/services/cloud-solutions' },
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
    tagline: 'Property management systems, agent CRM and tenant portals for real estate.',
    description: 'Property developers, agents, and management companies use our platforms to manage listings, collect rent, track maintenance, and keep tenants engaged — all in one place. We understand the operational complexity of managing property portfolios across multiple locations.',
    challenges: [
      { title: 'Fragmented property data', body: 'Listings, tenants, leases, and maintenance tracked across spreadsheets and WhatsApp threads with no audit trail. We centralise everything into a managed, searchable platform.' },
      { title: 'Rent collection & receipting', body: 'Chasing payments manually and issuing receipts by hand is a full-time job. We automate the entire rent collection cycle — payment links, receipting, arrears notifications, and reconciliation.' },
      { title: 'Agent pipeline management', body: 'No visibility into leads in progress or deals at risk of falling through. We deploy CRM systems purpose-configured for real estate sales cycles and commission tracking.' },
    ],
    capabilities: [
      { title: 'Software Development',          href: '/services/software-development' },
      { title: 'CRM & ERP Implementation',      href: '/services/crm-erp' },
      { title: 'API & System Integration',      href: '/services/api-automation' },
      { title: 'Process Transformation',        href: '/services/digital-transformation' },
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
    tagline: 'Farm management platforms, supply chain digitisation and mobile-first tools for agriculture.',
    description: 'We build the digital infrastructure connecting smallholder farmers, aggregators, processors, and exporters — from field-level data capture to last-mile payments. Our agritech practice is built for low-connectivity environments and multi-stakeholder supply chains.',
    challenges: [
      { title: 'Farmer data collection at scale', body: 'No reliable way to collect and store farm-level data across thousands of smallholders. We build mobile-first tools — optimised for Android and low-bandwidth networks — that capture yield, quality, and compliance data at source.' },
      { title: 'Supply chain visibility', body: 'Produce lost, mislabelled, or under-valued between farm and market. We build traceability systems from field to fork, with QR code tracking, weight capture, and buyer-facing portals.' },
      { title: 'Input financing & payments', body: 'Farmers excluded from formal financial services and paid in cash after weeks of delay. We integrate mobile money, digital wallet systems, and revolving credit facilities into the platform.' },
    ],
    capabilities: [
      { title: 'Software Development',          href: '/services/software-development' },
      { title: 'API & System Integration',      href: '/services/api-automation' },
      { title: 'Process Transformation',        href: '/services/digital-transformation' },
      { title: 'Cloud & Infrastructure',        href: '/services/cloud-solutions' },
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
