import { PAGES, type PageKey } from './pages'
import { PACKAGES, formatGhs } from './packages'
import { SITE } from './site'

// Every [square bracket] placeholder from docs/website-restructure.md.
// To resolve one: set `value` to the real text, or set `omit: true` to drop the
// element it belongs to. A production build fails while any entry on an enabled
// page is unresolved.
export interface PlaceholderEntry {
  page: PageKey | 'footer'
  text: string
  value: string | null
  omit?: boolean
}

export const PLACEHOLDERS = {
  'services.crm-platforms':    { page: 'services', text: '[only list platforms the team has delivered, for example Odoo or Zoho]', value: null },
  'services.package-contents': { page: 'services', text: '[package contents, updated to match the four services]', value: null },
  // A confirmation, not a blank: set value to 'confirmed' once the USSD partner, pricing and set-up times are settled.
  'services.ussd-confirmed':   { page: 'services', text: '[USSD: confirm partner, pricing and set-up times before publishing]', value: null },
  'products.dondo-pilot-fee':  { page: 'products', text: '[amount]', value: null },
  'security.dpc-registration': { page: 'security', text: '[registration number]', value: null },
  'security.data-location':    { page: 'security', text: '[State the actual hosting providers and regions.]', value: null },
  'security.backups':          { page: 'security', text: '[State the backup frequency and recovery process.]', value: null },
  'security.email':            { page: 'security', text: '[security email address]', value: null },
  'about.team':                { page: 'about',    text: '[names, roles and photos of the founders and key staff]', value: null },
  'contact.calendar-link':     { page: 'contact',  text: '[calendar link]', value: null },
  'footer.dpa':                { page: 'footer',   text: '[Data processing agreement link]', value: null },
} satisfies Record<string, PlaceholderEntry>

export type PlaceholderId = keyof typeof PLACEHOLDERS

export type PlaceholderState =
  | { state: 'filled'; value: string }
  | { state: 'omitted' }
  | { state: 'open'; text: string }

export function placeholder(id: PlaceholderId): PlaceholderState {
  const entry: PlaceholderEntry = PLACEHOLDERS[id]
  if (entry.value !== null && entry.value.trim() !== '') return { state: 'filled', value: entry.value }
  if (entry.omit) return { state: 'omitted' }
  return { state: 'open', text: entry.text }
}

export interface OpenPlaceholder {
  id: string
  page: string
  text: string
}

export function unresolvedPlaceholders(): OpenPlaceholder[] {
  const open: OpenPlaceholder[] = []

  for (const id of Object.keys(PLACEHOLDERS) as PlaceholderId[]) {
    const entry: PlaceholderEntry = PLACEHOLDERS[id]
    const enabled = entry.page === 'footer' || PAGES[entry.page].production
    if (enabled && placeholder(id).state === 'open') {
      open.push({ id, page: entry.page, text: entry.text })
    }
  }

  if (PAGES.services.production) {
    for (const p of PACKAGES) {
      if (!p.priceConfirmed) {
        open.push({ id: `packages.${p.slug}.price`, page: 'services', text: `[${formatGhs(p.priceFromGhs)}]` })
      }
    }
  }

  if (SITE.whatsapp.isPlaceholder) {
    open.push({ id: 'site.whatsapp.number', page: 'home, contact', text: '[Astacraft business number, as a click-to-chat link]' })
  }

  return open
}
