export interface ServicePackage {
  slug: string
  name: string
  formerName: string
  audience: string
  priceFromGhs: number
  // Prices are carried over from the old site. Set to true once reviewed.
  priceConfirmed: boolean
}

export const PACKAGES: ServicePackage[] = [
  { slug: 'start-up-kit',   name: 'Start-up Kit',   formerName: 'Launch',     audience: 'New businesses',        priceFromGhs: 2500, priceConfirmed: false },
  { slug: 'sme-kit',        name: 'SME Kit',        formerName: 'Growth',     audience: 'Growing SMEs',          priceFromGhs: 5500, priceConfirmed: false },
  { slug: 'automation-kit', name: 'Automation Kit', formerName: 'Operations', audience: 'Digitising operations', priceFromGhs: 8500, priceConfirmed: false },
  { slug: 'custom-project', name: 'Custom Project', formerName: 'Enterprise', audience: 'Larger organisations',  priceFromGhs: 5000, priceConfirmed: false },
]

export function formatGhs(amount: number): string {
  return amount.toLocaleString('en-GB')
}
