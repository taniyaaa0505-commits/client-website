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
  const rafRef = useRef(0)
  const nextRef = useRef(null)
  const still = reduceMotion()

  // Batch pointer updates into a single rAF so we touch the DOM at most once
  // per frame, and only repaint the glare position (a CSS var) — not a fresh
  // gradient string — each move.
  const apply = () => {
    rafRef.current = 0
    const el = ref.current
    const data = nextRef.current
    if (!el || !data) return
    const { rx, ry, px, py } = data
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`
    const g = glareRef.current
    if (g) {
      g.style.opacity = '1'
      g.style.setProperty('--gx', `${px * 100}%`)
      g.style.setProperty('--gy', `${py * 100}%`)
    }
  }

  const onMove = (e) => {
    if (still) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    nextRef.current = { px, py, rx: (0.5 - py) * max * 2, ry: (px - 0.5) * max * 2 }
    if (!rafRef.current) rafRef.current = requestAnimationFrame(apply)
  }

  const onEnter = () => {
    if (still || !ref.current) return
    ref.current.style.willChange = 'transform' // promote only while hovering
  }

  const onLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
    const el = ref.current
    if (el) {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
      el.style.willChange = 'auto'
    }
    if (glareRef.current) glareRef.current.style.opacity = '0'
  }

  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {children}
      {glare && !still && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300"
          style={{
            background:
              'radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.28), transparent 55%)',
          }}
        />
      )}
    </div>
  )
}
