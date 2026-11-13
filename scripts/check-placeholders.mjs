// Post-build safety net: in a production build, no rendered page may contain a placeholder marker.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const isProduction = process.env.VERCEL_ENV === 'production' || process.env.SITE_ENV === 'production'
const root = '.next/server/app'

if (!isProduction || !existsSync(root)) process.exit(0)

const hits = []
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p)
    else if (p.endsWith('.html') && readFileSync(p, 'utf8').includes('data-placeholder')) hits.push(p)
  }
}
walk(root)

if (hits.length) {
  console.error(`\nPlaceholder text found in ${hits.length} built page(s):\n${hits.map((h) => `  - ${h}`).join('\n')}\n`)
  process.exit(1)
}
