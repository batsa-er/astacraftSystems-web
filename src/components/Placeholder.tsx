import { IS_PRODUCTION_SITE } from '@/config/env'
import { placeholder, type PlaceholderId } from '@/config/placeholders'

export function PlaceholderMark({ children }: { children: React.ReactNode }) {
  if (IS_PRODUCTION_SITE) return null
  return (
    <mark
      data-placeholder
      className="inline-block bg-[#FDE68A] text-[#451A03] border border-dashed border-[#92400E] px-1.5 font-mono text-[12px] leading-snug tracking-normal normal-case font-normal"
    >
      <span className="sr-only">Placeholder: </span>
      {children}
    </mark>
  )
}

export function Placeholder({ id }: { id: PlaceholderId }) {
  const p = placeholder(id)
  if (p.state === 'filled') return <>{p.value}</>
  if (p.state === 'omitted') return null
  return <PlaceholderMark>{p.text}</PlaceholderMark>
}
