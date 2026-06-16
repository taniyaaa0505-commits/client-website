import React, { useState } from 'react'
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'

const categoryStyles = {
  Tissue: {
    badge: 'bg-sage-100 text-sage-700',
    hover: 'hover:border-sage-200 hover:bg-gradient-to-br hover:from-sage-50 hover:via-white hover:to-sand-50',
    accent: 'group-hover:text-sage-700',
    ring: 'group-hover:ring-sage-100',
  },
  Disposables: {
    badge: 'bg-sand-100 text-sand-400',
    hover: 'hover:border-sand-200 hover:bg-gradient-to-br hover:from-sand-50 hover:via-white hover:to-sand-100',
    accent: 'group-hover:text-sand-400',
    ring: 'group-hover:ring-sand-100',
  },
  Housekeeping: {
    badge: 'bg-mist-100 text-mist-500',
    hover: 'hover:border-mist-200 hover:bg-gradient-to-br hover:from-mist-50 hover:via-white hover:to-mist-100',
    accent: 'group-hover:text-mist-500',
    ring: 'group-hover:ring-mist-100',
  },
}

export default function BrandCard({ brand, variant = 'compact' }) {
  const [expanded, setExpanded] = useState(false)
  const style = categoryStyles[brand.category] || categoryStyles.Tissue

  if (variant === 'compact') {
    return (
      <div
        className={`brand-card group relative block cursor-default overflow-hidden rounded-2xl sm:rounded-[1.75rem] border border-stone-200/80 bg-white p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-4 ${style.hover} ${style.ring}`}
      >
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `radial-gradient(circle, ${brand.accent}44 0%, transparent 70%)` }}
        />

        <div className="relative flex items-start justify-between gap-3">
          <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-body tracking-wide ${style.badge}`}>
            {brand.category}
          </span>
          <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-stone-100 bg-white overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:shadow-sm">
            <img
              src={brand.image}
              alt={`${brand.name} logo`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <h3 className={`relative mt-3 sm:mt-4 font-display text-xl sm:text-2xl font-light leading-tight text-stone-800 transition-colors duration-300 ${style.accent}`}>
          {brand.name}
        </h3>

        <div className="relative mt-3 sm:mt-4 min-h-[2.25rem] sm:min-h-[2.5rem]">
          <p className="text-[10px] font-body tracking-wide text-stone-400 transition-opacity duration-300 group-hover:opacity-0">
            Hover to explore
          </p>
          <p className="absolute top-0 left-0 text-xs italic text-stone-500 font-display opacity-0 transition-opacity duration-300 group-hover:opacity-100 leading-snug">
            {brand.tagline}
          </p>
        </div>

        <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 h-0.5 rounded-full bg-stone-100 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-sage-300/60 group-hover:to-transparent" />
      </div>
    )
  }

  return (
    <div className={`group rounded-[1.75rem] border border-stone-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${style.hover}`}>
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
        className="flex items-center gap-2 text-xs font-body text-stone-500 hover:text-sage-700 transition-colors"
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

      <div className="mt-4 pt-4 border-t border-stone-100">
        <a
          href="#connect"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="flex items-center gap-2 text-xs font-body text-stone-500 hover:text-sage-700 transition-colors"
        >
          Enquire <ArrowRight size={12} />
        </a>
      </div>
    </div>
  )
}
