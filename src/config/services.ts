import { Code2, Server, ShieldCheck, MonitorCheck, RefreshCw, Users, Zap, Database, Headphones, Radar } from 'lucide-react'

export const PLATFORM_SLUGS: readonly string[]  = ['crm-erp', 'software-development', 'api-automation']
export const ENTERPRISE_SLUGS: readonly string[] = ['cloud-solutions', 'digital-transformation', 'cybersecurity', 'managed-it-services', 'soc-monitoring', 'it-consulting']

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'software-development':   Code2,
  'digital-transformation': RefreshCw,
  'cloud-solutions':        Server,
  'cybersecurity':          ShieldCheck,
  'crm-erp':                Users,
  'api-automation':         Zap,
  'it-consulting':          MonitorCheck,
  'managed-it-services':    Headphones,
  'soc-monitoring':         Radar,
}

export function getServiceIcon(slug: string): React.ComponentType<{ className?: string }> {
  return iconMap[slug] ?? Database
}
