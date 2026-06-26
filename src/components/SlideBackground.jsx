import React from 'react'

/**
 * PowerPoint-style decorative slide backgrounds: clean, static geometric
 * accents anchored to the corners of a section — like the graphics on a
 * professional presentation template. Cohesive muted palette across all
 * variants so the sections read as slides from one deck.
 *
 * Purely decorative: sits behind content (z-0), pointer-events: none, and
 * never overlaps the readable center of the slide.
 */

// One shared, restrained corporate palette (sky / deep-sky / slate).
const C = {
  sky: '#3da8e0',
  deep: '#1f76ab',
  slate: '#6f8294',
  mist: '#aab6c4',
}

function CornerTriangles() {
  return (
    <>
      <svg
        viewBox="0 0 300 300"
        preserveAspectRatio="xMaxYMin slice"
        className="absolute -top-6 -right-6 h-64 w-64 sm:h-80 sm:w-80"
      >
        <polygon points="300,0 300,300 50,0" fill={C.sky} fillOpacity="0.10" />
        <polygon points="300,0 300,205 135,0" fill={C.deep} fillOpacity="0.12" />
        <polygon points="300,0 300,115 215,0" fill={C.slate} fillOpacity="0.10" />
      </svg>
      <svg
        viewBox="0 0 300 300"
        preserveAspectRatio="xMinYMax slice"
        className="absolute -bottom-8 -left-8 h-48 w-48 sm:h-64 sm:w-64"
      >
        <polygon points="0,300 0,90 300,300" fill={C.slate} fillOpacity="0.08" />
      </svg>
    </>
  )
}

function Arcs() {
  return (
    <>
      <svg
        viewBox="0 0 300 300"
        className="absolute -bottom-16 -right-16 h-72 w-72 sm:h-[26rem] sm:w-[26rem]"
      >
        {[150, 120, 90, 60, 30].map((r, i) => (
          <circle
            key={r}
            cx="300"
            cy="300"
            r={r}
            fill="none"
            stroke={C.sky}
            strokeOpacity={0.1 + i * 0.025}
            strokeWidth="2"
          />
        ))}
      </svg>
      <svg className="absolute -top-12 -left-12 h-40 w-40 sm:h-52 sm:w-52" viewBox="0 0 200 200">
        <circle cx="0" cy="0" r="150" fill={C.slate} fillOpacity="0.06" />
      </svg>
    </>
  )
}

function Ribbon() {
  return (
    <div className="absolute inset-0">
      <div className="absolute left-[-10%] top-[16%] h-24 w-[120%] rotate-[-8deg] bg-gradient-to-r from-sky-500/12 via-sky-600/10 to-transparent" />
      <div className="absolute left-[-10%] top-[27%] h-1.5 w-[120%] rotate-[-8deg] bg-gradient-to-r from-slate-400/20 to-transparent" />
      <div className="absolute bottom-[-6%] right-[-6%] h-56 w-56 sm:h-72 sm:w-72">
        <svg viewBox="0 0 300 300" preserveAspectRatio="xMaxYMax slice" className="h-full w-full">
          <polygon points="300,300 300,40 60,300" fill={C.deep} fillOpacity="0.08" />
        </svg>
      </div>
    </div>
  )
}

function Dots() {
  return (
    <>
      <svg className="absolute -top-4 -left-4 h-56 w-56 sm:h-72 sm:w-72" aria-hidden="true">
        <defs>
          <pattern id="slide-dots" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.6" fill={C.slate} fillOpacity="0.45" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#slide-dots)" />
      </svg>
      <svg
        viewBox="0 0 300 300"
        preserveAspectRatio="xMaxYMax slice"
        className="absolute -bottom-6 -right-6 h-56 w-56 sm:h-72 sm:w-72"
      >
        <polygon points="300,300 300,70 90,300" fill={C.sky} fillOpacity="0.10" />
        <polygon points="300,300 300,150 175,300" fill={C.deep} fillOpacity="0.10" />
      </svg>
    </>
  )
}

const VARIANTS = {
  'corner-triangles': CornerTriangles,
  arcs: Arcs,
  ribbon: Ribbon,
  dots: Dots,
}

export default function SlideBackground({ variant = 'corner-triangles', className = '' }) {
  const Shape = VARIANTS[variant] || CornerTriangles
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      <Shape />
    </div>
  )
}
