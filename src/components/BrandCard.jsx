import React, { useState } from 'react'
import { ChevronDown, ChevronUp, ArrowRight, FileText } from 'lucide-react'
import Tilt from './Tilt'

const categoryStyles = {
  Tissue: {
    badge: 'bg-sky-100 text-sky-700',
    hover: 'hover:border-sky-200 hover:bg-gradient-to-br hover:from-sky-50 hover:via-white hover:to-sky-100',
    accent: 'group-hover:text-sky-700',
    ring: 'group-hover:ring-sky-100',
  },
  Disposables: {
    badge: 'bg-sunny-100 text-sunny-600',
    hover: 'hover:border-sunny-200 hover:bg-gradient-to-br hover:from-sunny-50 hover:via-white hover:to-sunny-100',
    accent: 'group-hover:text-sunny-600',
    ring: 'group-hover:ring-sunny-100',
  },
  Housekeeping: {
    badge: 'bg-coral-100 text-coral-500',
    hover: 'hover:border-coral-200 hover:bg-gradient-to-br hover:from-coral-50 hover:via-white hover:to-coral-100',
    accent: 'group-hover:text-coral-500',
    ring: 'group-hover:ring-coral-100',
  },
}

export default function BrandCard({ brand, variant = 'compact' }) {
  const [expanded, setExpanded] = useState(false)
  const style = categoryStyles[brand.category] || categoryStyles.Tissue

  if (variant === 'compact') {
    return (
      <Tilt className="h-full" max={9}>
      <div className="group relative h-full">
        {/* Category-tinted ambient glow — intensifies on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-3 rounded-[2.25rem] opacity-35 blur-2xl transition-all duration-500 group-hover:opacity-80 group-hover:-inset-4"
          style={{ background: `radial-gradient(closest-side, ${brand.accent}, transparent)` }}
        />
      <div
        className={`brand-card relative z-10 block h-full overflow-hidden rounded-2xl sm:rounded-[1.75rem] ring-1 ring-stone-200/60 shadow-lg shadow-sky-700/10 transition-shadow duration-500 hover:shadow-[0_30px_64px_-24px_rgba(45,64,54,0.45)]`}
      >
        {/* Brand photo — always visible, gently zooms on hover */}
        {brand.photo ? (
          <img
            src={brand.photo}
            alt={brand.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.08]"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${brand.accent}, #2b4036)` }} />
        )}
        {/* Legibility gradient — deepens on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/25 to-stone-950/15 transition-opacity duration-500 group-hover:from-stone-950/95" />

        {/* Top row: category + logo */}
        <div className="relative flex items-start justify-between p-4">
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-body tracking-wide text-white/90 backdrop-blur-md ring-1 ring-white/20">
            {brand.category}
          </span>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/40 bg-white shadow-md transition-transform duration-500 ease-smooth group-hover:scale-105">
            {brand.image ? (
              <img src={brand.image} alt={`${brand.name} logo`} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <span className="font-display text-lg font-semibold text-stone-700">{brand.name.charAt(0)}</span>
            )}
          </div>
        </div>

        {/* Bottom: frosted glass info panel — name/tagline always shown,
            features slide open on hover */}
        <div className="absolute inset-x-0 bottom-0 p-3">
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
            <h3 className="font-display text-2xl sm:text-3xl font-light leading-none text-white">
              {brand.name}
            </h3>
            <p className="mt-1.5 text-xs italic font-display leading-snug text-white/80 line-clamp-1">
              {brand.tagline}
            </p>
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-smooth group-hover:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <div className="flex flex-wrap gap-1.5 pt-3">
                  {brand.features.slice(0, 3).map(f => (
                    <span key={f} className="rounded-full border border-white/25 bg-white/10 px-2 py-0.5 text-[9px] font-body tracking-wide text-white/85">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </Tilt>
    )
  }

  return (
    <div className={`group rounded-[1.75rem] border border-stone-200 bg-white p-6 transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:shadow-lg ${style.hover}`}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-body tracking-wide mb-2 ${style.badge}`}>
            {brand.category}
          </span>
          <h3 className="font-display text-2xl font-light text-stone-800">{brand.name}</h3>
          <p className="text-xs italic text-stone-500 font-display mt-1">{brand.tagline}</p>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-stone-100 overflow-hidden">
          <img src={brand.image} alt={`${brand.name} logo`} className="h-full w-full object-cover" loading="lazy" />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {brand.features.slice(0, 3).map(f => (
          <span key={f} className="text-[10px] text-stone-500 border border-stone-200 rounded-full px-2 py-0.5 font-body">
            {f}
          </span>
        ))}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-xs font-body text-stone-500 hover:text-sky-700 transition-colors"
      >
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {expanded ? 'Hide' : 'View'} Products ({brand.products.length})
      </button>

      {expanded && (
        <div className="mt-3 border-t border-stone-100 pt-3 space-y-2">
          {brand.products.map(p => (
            <div key={p.sku} className="flex items-center justify-between py-1.5 border-b border-stone-50 last:border-0">
              <p className="text-sm font-body text-stone-700">{p.name}</p>
              <span className="text-[10px] text-stone-400 font-body">{p.unit}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
        <a
          href="#connect"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="flex items-center gap-2 text-xs font-body text-stone-500 hover:text-sky-700 transition-colors"
        >
          Enquire <ArrowRight size={12} />
        </a>
        {brand.catalogue && (
          <a
            href={brand.catalogue}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-stone-200 px-3 py-1.5 text-xs font-body text-stone-600 hover:border-sky-400 hover:text-sky-700 transition-colors"
          >
            <FileText size={12} />
            Catalogue
          </a>
        )}
      </div>
    </div>
  )
}
