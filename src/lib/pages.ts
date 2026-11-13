import { notFound } from 'next/navigation'
import { IS_PRODUCTION_SITE } from '@/config/env'
import { PAGES, type PageKey } from '@/config/pages'

export function pageVisible(key: PageKey): boolean {
  return !IS_PRODUCTION_SITE || PAGES[key].production
}

export function requirePage(key: PageKey): void {
  if (!pageVisible(key)) notFound()
}
