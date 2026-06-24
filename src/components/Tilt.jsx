import React, { useRef } from 'react'

const reduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Wraps content in an interactive 3D perspective tilt — the element leans
 * toward the cursor with a little depth and an optional moving sheen.
 * GPU-friendly (transform only), pointer-driven, and disabled for users who
 * prefer reduced motion. Keep `max` small for a subtle, classy effect.
 */
export default function Tilt({
  children,
  className = '',
  max = 8,
  scale = 1.02,
  glare = true,
}) {
  const ref = useRef(null)
  const glareRef = useRef(null)
  const still = reduceMotion()

  const onMove = (e) => {
    if (still) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    const rx = (0.5 - py) * max * 2
    const ry = (px - 0.5) * max * 2
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`
    if (glareRef.current) {
      glareRef.current.style.opacity = '1'
      glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.28), transparent 55%)`
    }
  }

  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
    if (glareRef.current) glareRef.current.style.opacity = '0'
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'transform',
      }}
    >
      {children}
      {glare && !still && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300"
        />
      )}
    </div>
  )
}
