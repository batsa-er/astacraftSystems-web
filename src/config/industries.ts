import { Stethoscope, GraduationCap, Home, ShoppingBag, Landmark } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface IndustryConfig {
  name: string
  short: string
  slug: string
  problem: string
  help: string
  Icon: LucideIcon
}

export const INDUSTRIES: IndustryConfig[] = [
  {
    name: 'Clinics and diagnostic centres',
    short: 'Clinics',
    slug: 'clinics',
    problem: 'Missed appointments and phones ringing with the same questions',
    help: 'Appointment reminders, a WhatsApp assistant for common questions, invoicing and payment links',
    Icon: Stethoscope,
  },
  {
    name: 'Schools and training institutes',
    short: 'Schools',
    slug: 'schools',
    problem: 'Chasing fees and answering admissions questions',
    help: 'Fee reminders linked to AstaBill, parent notices, an admissions assistant',
    Icon: GraduationCap,
  },
  {
    name: 'Real estate',
    short: 'Real estate',
    slug: 'real-estate',
    problem: 'Leads lost when no one replies quickly',
    help: 'Instant replies, lead capture and routing to the right agent',
    Icon: Home,
  },
  {
    name: 'Retail and e-commerce',
    short: 'Retail',
    slug: 'retail',
    problem: 'Order and payment questions taking staff time',
    help: 'Order and payment notifications, a catalogue assistant, Mobile Money payments',
    Icon: ShoppingBag,
  },
  {
    name: 'Financial services',
    short: 'Financial services',
    slug: 'financial-services',
    problem: 'Customer notifications and manual approvals',
    help: 'Secure notifications, workflow automation, CRM and ERP implementation',
    Icon: Landmark,
  },
]
