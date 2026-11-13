import { INDUSTRIES } from './industries'

export const CONTACT_TOPICS = [
  { value: 'astabill',            label: 'AstaBill' },
  { value: 'dondo',               label: 'Dondo' },
  { value: 'business-messaging',  label: 'Business messaging (WhatsApp, SMS, USSD)' },
  { value: 'workflow-automation', label: 'Workflow automation' },
  { value: 'ai-assistant',        label: 'AI assistant' },
  { value: 'crm-erp',             label: 'CRM or ERP' },
  { value: 'other',               label: 'Something else' },
] as const

export const CONTACT_TOPIC_VALUES = CONTACT_TOPICS.map(t => t.value)

export const WAITLIST_INDUSTRIES = [
  ...INDUSTRIES.map(i => ({ value: i.slug, label: i.name })),
  { value: 'other', label: 'Other' },
]

export const WAITLIST_INDUSTRY_VALUES = WAITLIST_INDUSTRIES.map(i => i.value)

// Not given in the brief; modelled on the Dondo consent line. Review before launch.
export const CONTACT_CONSENT = 'I agree that Astacraft may contact me about my enquiry by phone, WhatsApp and email.'
