'use client'

import { useEffect, useCallback } from 'react'

export default function ParticlesBackground() {
  const initParticles = useCallback((isDark: boolean) => {
    const oldCanvas = document.querySelector('#particles-js canvas')
    if (oldCanvas) oldCanvas.remove()

    // @ts-expect-error - particles.js extends window
    if (window.pJSDom?.length > 0) {
      // @ts-expect-error - particles.js extends window
      window.pJSDom.forEach((p) => p.pJS.fn.vendors.destroypJS())
      // @ts-expect-error - particles.js extends window
      window.pJSDom = []
    }

    const colors = isDark
      ? { particles: '#55AD3D', lines: '#3E8A2C', accent: '#1B4E8C' }
      : { particles: '#1B4E8C', lines: '#2563EB', accent: '#55AD3D' }

    // @ts-expect-error - particles.js extends window
    window.particlesJS('particles-js', {
      particles: {
        number: { value: 140, density: { enable: true, value_area: 800 } },
        color: { value: colors.particles },
        shape: { type: 'circle', stroke: { width: 0.5, color: colors.accent } },
        opacity: {
          value: 0.7,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0.3 },
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: true, speed: 2, size_min: 1 },
        },
        line_linked: {
          enable: true,
          distance: 160,
          color: colors.lines,
          opacity: 0.4,
          width: 1.2,
        },
        move: { enable: true, speed: 2, random: true, out_mode: 'bounce' },
      },
      interactivity: {
        detect_on: 'window',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true,
        },
        modes: {
          grab: { distance: 220, line_linked: { opacity: 0.8 } },
          push: { particles_nb: 4 },
          repulse: { distance: 180, duration: 0.4 },
        },
      },
      retina_detect: true,
    })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      const html = document.documentElement
      const detectDark = () =>
        html.classList.contains('dark') ||
        html.getAttribute('data-theme') === 'dark'

      initParticles(detectDark())

      const observer = new MutationObserver(() => initParticles(detectDark()))
      observer.observe(html, {
        attributes: true,
        attributeFilter: ['class', 'data-theme'],
      })
    }

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script)
    }
  }, [initParticles])

  return (
    <div
      id="particles-js"
      className="fixed inset-0 w-full h-full -z-10 transition-colors duration-500 bg-gradient-to-tr from-[#0A1628] via-[#0D1A2E] to-[#1B4E8C] dark:from-[#0A1628] dark:via-[#0D1A2E] dark:to-[#1B4E8C]"
    />
  )
}
