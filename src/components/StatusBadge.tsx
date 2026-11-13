const onLight: Record<string, string> = {
  'Available now':   'text-[var(--color-text)] bg-[rgba(var(--ch-green),0.14)] border-[var(--color-green)]',
  'In pilot':        'text-[var(--color-accent)] bg-[rgba(var(--ch-accent),0.08)] border-[rgba(var(--ch-accent),0.45)]',
  'Pilot programme': 'text-[var(--color-accent)] bg-[rgba(var(--ch-accent),0.08)] border-[rgba(var(--ch-accent),0.45)]',
  'Coming soon':     'text-[rgba(var(--ch-text),0.78)] bg-[rgba(var(--ch-text),0.04)] border-[rgba(var(--ch-text),0.35)]',
  'Planned':         'text-[rgba(var(--ch-text),0.72)] bg-transparent border-dashed border-[rgba(var(--ch-text),0.40)]',
}

const onDark: Record<string, string> = {
  'Available now':   'text-white bg-[rgba(104,202,80,0.18)] border-[rgba(104,202,80,0.65)]',
  'Pilot programme': 'text-white bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.50)]',
}

export function StatusBadge({ status, dark = false }: { status: string; dark?: boolean }) {
  const cls = (dark ? onDark[status] : undefined) ?? onLight[status] ?? onLight['Planned']
  return (
    <span className={`inline-block shrink-0 font-mono text-[10px] tracking-[0.14em] uppercase px-2.5 py-1 border whitespace-nowrap ${cls}`}>
      {status}
    </span>
  )
}
