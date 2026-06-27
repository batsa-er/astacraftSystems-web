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
