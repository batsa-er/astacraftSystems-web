import { SITE, WHATSAPP_URL } from '@/config/site'
import { PlaceholderMark } from '@/components/Placeholder'

export function WhatsAppButton({ label, className }: { label: string; className: string }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
      {SITE.whatsapp.isPlaceholder && <PlaceholderMark>[WhatsApp number]</PlaceholderMark>}
    </span>
  )
}
