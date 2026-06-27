import { Code2, Server, ShieldCheck, MonitorCheck, RefreshCw, Users, Zap, Database } from 'lucide-react'

export const PLATFORM_SLUGS: readonly string[]  = ['crm-erp', 'software-development', 'api-automation']
export const ENTERPRISE_SLUGS: readonly string[] = ['cloud-solutions', 'digital-transformation', 'cybersecurity', 'it-consulting']

export const SERVICE_INDUSTRIES: Record<string, string[]> = {
  'crm-erp':                ['financial-services', 'retail-commerce', 'healthcare', 'real-estate'],
  'cybersecurity':          ['financial-services', 'government', 'telecoms', 'healthcare'],
  'cloud-solutions':        ['telecoms', 'energy-utilities', 'government', 'agritech'],
  'software-development':   ['healthcare', 'agritech', 'real-estate', 'retail-commerce'],
  'api-automation':         ['financial-services', 'retail-commerce', 'energy-utilities', 'telecoms'],
  'digital-transformation': ['energy-utilities', 'government', 'retail-commerce', 'healthcare'],
  'it-consulting':          ['telecoms', 'government', 'financial-services', 'energy-utilities'],
}

export const SERVICE_HERO_IMAGES: Record<string, string> = {
  'software-development':   'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&h=900&q=80&auto=format&fit=crop',
  'api-automation':         'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&h=900&q=80&auto=format&fit=crop',
  'cloud-solutions':        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&h=900&q=80&auto=format&fit=crop',
  'cybersecurity':          'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1600&h=900&q=80&auto=format&fit=crop',
  'crm-erp':                'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=900&q=80&auto=format&fit=crop',
  'digital-transformation': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&q=80&auto=format&fit=crop',
  'it-consulting':          'https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?w=1600&h=900&q=80&auto=format&fit=crop',
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'software-development':   Code2,
  'digital-transformation': RefreshCw,
  'cloud-solutions':        Server,
  'cybersecurity':          ShieldCheck,
  'crm-erp':                Users,
  'api-automation':         Zap,
  'it-consulting':          MonitorCheck,
}

export function getServiceIcon(slug: string): React.ComponentType<{ className?: string }> {
  return iconMap[slug] ?? Database
}
