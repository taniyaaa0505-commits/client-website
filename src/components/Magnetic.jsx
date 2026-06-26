import React, { useRef } from 'react'

const reduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Magnetic hover — the wrapped element drifts toward the cursor and springs
 * back on leave. Subtle by default; bump `strength` for a stronger pull.
 */
export default function Magnetic({ children, className = '', strength = 0.35 }) {
  const ref = useRef(null)
  const still = reduceMotion()

  const onMove = (e) => {
    if (still) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}
