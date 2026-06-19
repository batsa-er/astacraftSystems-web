import { Code2, Server, ShieldCheck, Megaphone, Paintbrush, MonitorCheck, RefreshCw, Users, Zap, Database } from 'lucide-react'

export const PLATFORM_SLUGS  = ['crm-erp', 'software-development', 'api-automation'] as const
export const ENTERPRISE_SLUGS = ['cloud-solutions', 'digital-transformation', 'cybersecurity', 'it-consulting'] as const

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'software-development':   Code2,
  'digital-transformation': RefreshCw,
  'cloud-solutions':        Server,
  'cybersecurity':          ShieldCheck,
  'crm-erp':                Users,
  'api-automation':         Zap,
  'digital-marketing':      Megaphone,
  'brand-design':           Paintbrush,
  'it-consulting':          MonitorCheck,
}

export function getServiceIcon(slug: string): React.ComponentType<{ className?: string }> {
  return iconMap[slug] ?? Database
}
