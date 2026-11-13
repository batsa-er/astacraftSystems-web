// Set production to false to keep a page out of the production site
// (it returns 404 there and drops out of the menu, footer and sitemap).
export const PAGES = {
  home:       { path: '/',           production: true },
  services:   { path: '/services',   production: true },
  products:   { path: '/products',   production: true },
  dondo:      { path: '/dondo',      production: true },
  industries: { path: '/industries', production: true },
  work:       { path: '/work',       production: true },
  security:   { path: '/security',   production: true },
  about:      { path: '/about',      production: true },
  contact:    { path: '/contact',    production: true },
}

export type PageKey = keyof typeof PAGES
