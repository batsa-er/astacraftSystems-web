'use client'

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"

type Testimonial = {
  quote: string
  name: string
  role?: string
  company?: string
  initials?: string
  photo?: { asset: { _id: string; url: string } }
}

export function DesignTestimonial({ testimonials }: { testimonials: Testimonial[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const numberX = useTransform(x, [-200, 200], [-20, 20])
  const numberY = useTransform(y, [-200, 200], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      mouseX.set(e.clientX - (rect.left + rect.width / 2))
      mouseY.set(e.clientY - (rect.top + rect.height / 2))
    }
  }

  const goNext = useCallback(
    () => setActiveIndex((prev) => (prev + 1) % testimonials.length),
    [testimonials.length],
  )
  const goPrev = () =>
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    const timer = setInterval(goNext, 6000)
    return () => clearInterval(timer)
  }, [goNext])

  const current = testimonials[activeIndex]

  // Derive company from role string ("CEO, Acme Ltd" → "Acme Ltd") when not explicit
  const company =
    current.company ??
    (current.role?.includes(",")
      ? current.role.split(",").slice(1).join(",").trim()
      : undefined)
  const roleLabel = current.company
    ? current.role
    : current.role?.split(",")[0]?.trim()

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Oversized index watermark */}
      <motion.div
        className="absolute -left-8 top-1/2 -translate-y-1/2 text-[28rem] font-bold text-[rgba(var(--ch-text),0.04)] select-none pointer-events-none leading-none tracking-tighter"
        style={{ x: numberX, y: numberY }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      {/* Asymmetric layout */}
      <div className="relative flex">
        {/* Left — vertical label + progress line */}
        <div className="hidden md:flex flex-col items-center justify-center pr-16 border-r border-[rgba(var(--ch-border),0.12)]">
          <motion.span
            className="text-xs font-mono text-[rgba(var(--ch-text),0.35)] tracking-widest uppercase"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Testimonials
          </motion.span>

          <div className="relative h-32 w-px bg-[rgba(var(--ch-border),0.12)] mt-8">
            <motion.div
              className="absolute top-0 left-0 w-full bg-[var(--color-text)] origin-top"
              animate={{ height: `${((activeIndex + 1) / testimonials.length) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        {/* Center — quote + author */}
        <div className="flex-1 md:pl-16 py-8 md:py-12">
          {/* Company badge */}
          <AnimatePresence mode="wait">
            {company && (
              <motion.div
                key={`company-${activeIndex}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 text-xs font-mono text-[rgba(var(--ch-text),0.40)] border border-[rgba(var(--ch-border),0.14)] rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                  {company}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quote */}
          <div className="relative mb-12 min-h-[120px] md:min-h-[140px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={activeIndex}
                className="text-3xl md:text-5xl font-light text-[var(--color-text)] leading-[1.15] tracking-tight"
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {current.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-[0.3em]"
                    variants={{
                      hidden: { opacity: 0, y: 20, rotateX: 90 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        transition: { duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
                      },
                      exit: {
                        opacity: 0,
                        y: -10,
                        transition: { duration: 0.2, delay: i * 0.02 },
                      },
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Author + nav */}
          <div className="flex items-end justify-between gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`author-${activeIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <motion.div
                  className="w-8 h-px bg-[var(--color-text)]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  style={{ originX: 0 }}
                />
                <div className="w-10 h-10 rounded-full bg-[rgba(var(--ch-accent),0.10)] border border-[rgba(var(--ch-accent),0.22)] flex items-center justify-center shrink-0 overflow-hidden">
                  {current.photo?.asset.url ? (
                    <Image
                      src={current.photo.asset.url}
                      alt={current.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-mono text-[10px] font-medium text-[var(--color-accent)]">
                      {current.initials ?? current.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-base font-medium text-[var(--color-text)]">{current.name}</p>
                  {roleLabel && (
                    <p className="text-sm text-[rgba(var(--ch-text),0.40)]">{roleLabel}</p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-3 shrink-0">
              <motion.button
                onClick={goPrev}
                aria-label="Previous testimonial"
                className="group relative w-11 h-11 rounded-full border border-[rgba(var(--ch-border),0.18)] flex items-center justify-center overflow-hidden"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-[var(--color-text)]"
                  variants={{ initial: { x: "-100%" }, hover: { x: 0 } }}
                  initial="initial"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="relative z-10 text-[var(--color-text)] group-hover:text-[var(--color-bg)] transition-colors duration-200"
                >
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>

              <motion.button
                onClick={goNext}
                aria-label="Next testimonial"
                className="group relative w-11 h-11 rounded-full border border-[rgba(var(--ch-border),0.18)] flex items-center justify-center overflow-hidden"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-[var(--color-text)]"
                  variants={{ initial: { x: "100%" }, hover: { x: 0 } }}
                  initial="initial"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="relative z-10 text-[var(--color-text)] group-hover:text-[var(--color-bg)] transition-colors duration-200"
                >
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker — company names scrolling */}
      <div className="mt-16 overflow-hidden opacity-[0.06] pointer-events-none">
        <motion.div
          className="flex whitespace-nowrap text-5xl font-bold tracking-tight text-[var(--color-text)]"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="mx-8">
              {testimonials
                .map(
                  (t) =>
                    t.company ??
                    (t.role?.includes(",")
                      ? t.role.split(",").slice(1).join(",").trim()
                      : t.role) ??
                    t.name,
                )
                .join(" • ")}{" "}
              •
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
