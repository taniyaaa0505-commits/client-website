import { useState, useEffect, useRef } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Tracks how far a referenced element has travelled through the viewport.
 *
 * Returns [ref, progress] where progress goes 0 → 1 as the element scrolls
 * from "just entering the bottom of the viewport" to "just leaving the top".
 * Drives scroll-scrubbed (cinematic) animations. rAF-throttled and passive,
 * so it stays smooth; respects prefers-reduced-motion (pins progress at 0).
 */
export function useScrollProgress() {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    let raf = 0
    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const total = rect.height + vh
      const seen = vh - rect.top
      setProgress(Math.min(1, Math.max(0, seen / total)))
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return [ref, progress]
}

/** Linear interpolate. */
export const lerp = (a, b, t) => a + (b - a) * t

/** Map a sub-range of an overall 0–1 progress to its own 0–1 (with clamp). */
export const slice = (p, start, end) =>
  Math.min(1, Math.max(0, (p - start) / (end - start)))
