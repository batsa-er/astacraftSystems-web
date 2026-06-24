'use client'

import dynamic from 'next/dynamic'

const ParticlesBackground = dynamic(() => import('./particles-bg'), { ssr: false })

export function ParticlesWrapper() {
  return <ParticlesBackground />
}
