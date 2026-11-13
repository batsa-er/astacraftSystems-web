import { MessagesSquare, Workflow, Bot, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { PlaceholderId } from './placeholders'

export interface ServiceConfig {
  slug: string
  number: string
  title: string
  shortTitle: string
  summary: string
  body: string
  details: { label: string; text?: string; placeholder?: PlaceholderId }[]
  Icon: LucideIcon
}

export const SERVICES: ServiceConfig[] = [
  {
    slug: 'business-messaging',
    number: '01',
    title: 'Business messaging: WhatsApp, SMS and USSD',
    shortTitle: 'Business messaging',
    summary: 'Reach every customer on the channel they use, whether they have a smartphone or not.',
    body: 'Reach every customer on the channel they use, whether they have a smartphone or not. We set up and automate your business messaging: WhatsApp for conversations, SMS for reminders and alerts, and USSD menus for customers without data or a smartphone.',
    details: [
      { label: 'What we build', text: 'Appointment and fee reminders, order and payment notifications, WhatsApp replies with handover to your staff, opt-in SMS campaigns, and USSD menus for enquiries, registrations and payments.' },
      { label: 'Includes', text: 'WhatsApp Business Platform setup and templates, SMS sender ID registration, USSD design and testing through our network partner, transactional email where needed, staff training.' },
      { label: 'Pricing', text: 'Setup fee plus monthly management. Messages are charged per use from a prepaid balance.' },
    ],
    Icon: MessagesSquare,
  },
  {
    slug: 'workflow-automation',
    number: '02',
    title: 'Workflow automation',
    shortTitle: 'Workflow automation',
    summary: 'Stop copying data between systems.',
    body: 'Stop copying data between systems. We automate lead routing, payment follow-ups, approvals and reports, connecting the tools you already use.',
    details: [
      { label: 'Includes', text: 'Process mapping, automation build, testing, monitoring and support.' },
      { label: 'Pricing', text: 'Fixed-price packages plus an optional support retainer.' },
    ],
    Icon: Workflow,
  },
  {
    slug: 'ai-assistants',
    number: '03',
    title: 'AI assistants',
    shortTitle: 'AI assistants',
    summary: 'An assistant that answers customer questions on WhatsApp or your website, using your own policies, prices and documents, and passes anything it can’t answer to your team.',
    body: 'An assistant that answers customer questions on WhatsApp or your website, using your own policies, prices and documents, and passes anything it can’t answer to your team.',
    details: [
      { label: 'Includes', text: 'Knowledge base set-up, testing against real questions, handover rules, monthly review.' },
      { label: 'Pricing', text: 'Setup fee plus monthly usage.' },
    ],
    Icon: Bot,
  },
  {
    slug: 'crm-erp',
    number: '04',
    title: 'CRM and ERP implementation',
    shortTitle: 'CRM and ERP implementation',
    summary: 'Customer and operations systems that fit how your business works, connected to WhatsApp, SMS and AstaBill.',
    body: 'Customer and operations systems that fit how your business works, connected to WhatsApp, SMS and AstaBill.',
    details: [
      { label: 'Platforms', placeholder: 'services.crm-platforms' },
      { label: 'Pricing', text: 'Project quotation plus support retainer.' },
    ],
    Icon: Users,
  },
]
