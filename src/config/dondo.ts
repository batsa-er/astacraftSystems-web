export type DondoStatus = 'In pilot' | 'Coming soon' | 'Planned'

export const DONDO_PROGRAMME_LABEL = 'Pilot programme'

// Update each status as features ship.
export const DONDO_FEATURES: { feature: string; status: DondoStatus }[] = [
  { feature: 'WhatsApp: shared inbox for your team',                 status: 'In pilot' },
  { feature: 'WhatsApp: templates, reminders and notifications',     status: 'In pilot' },
  { feature: 'SMS: notifications and reminders',                     status: 'In pilot' },
  { feature: 'AI assistant trained on your documents',               status: 'In pilot' },
  { feature: 'Website chat',                                         status: 'Coming soon' },
  { feature: 'Broadcasts to opted-in customers on WhatsApp and SMS', status: 'Coming soon' },
  { feature: 'AstaBill invoice and payment messages',                status: 'Coming soon' },
  { feature: 'Instagram and Facebook Messenger',                     status: 'Planned' },
]

// Set to true only once the SMS provider confirms customer replies can be received.
export const DONDO_SMS_REPLIES_SUPPORTED = false
export const DONDO_SMS_NOTE = 'SMS is used for notifications and reminders. Customers reply on WhatsApp.'

export const DONDO_LEGAL_LINE =
  'Dondo is provided by Astacraft Systems Limited. When you connect WhatsApp, Facebook will ask you to give Astacraft Systems access to your WhatsApp Business account.'

export const DONDO_CONSENT = 'I agree that Astacraft may contact me about Dondo by WhatsApp and email.'
