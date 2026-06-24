import React, { useState } from 'react'
import { ChevronDown, ChevronUp, ArrowRight, FileText } from 'lucide-react'
import Tilt from './Tilt'

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
      <Tilt className="h-full" max={8}>
      <div
        className={`brand-card group relative block h-full cursor-default overflow-hidden rounded-2xl sm:rounded-[1.75rem] border border-stone-200/80 bg-white transition-shadow duration-500 hover:shadow-xl`}
      >
        {/* Decorative default state — category-tinted glow + large monogram */}
        <div
          className="brand-accent pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-0"
          style={{ background: `radial-gradient(circle, ${brand.accent}55 0%, transparent 70%)` }}
        />
        <span className="brand-watermark pointer-events-none absolute -bottom-4 right-1 select-none font-display text-[5.5rem] sm:text-[7rem] font-semibold leading-none text-stone-900/[0.05] transition-opacity duration-500 group-hover:opacity-0">
          {brand.name.charAt(0)}
        </span>

        {/* Brand photo — revealed on hover (and on touch devices via CSS) */}
        {brand.photo && (
          <img
            src={brand.photo}
            alt={brand.name}
            loading="lazy"
            className="brand-photo absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        <div className="brand-overlay absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/30 to-stone-900/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Foreground content */}
        <div className="relative flex h-full flex-col justify-between p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <span className={`brand-badge inline-block rounded-full px-2.5 py-0.5 text-[10px] font-body tracking-wide transition-opacity duration-300 group-hover:opacity-0 ${style.badge}`}>
              {brand.category}
            </span>
            <div className="brand-logo flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-stone-100 bg-white overflow-hidden transition-opacity duration-300 group-hover:opacity-0">
              <img
                src={brand.image}
                alt={`${brand.name} logo`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <h3 className="brand-name font-display text-xl sm:text-2xl font-light leading-tight text-stone-800 transition-colors duration-300 group-hover:text-white">
              {brand.name}
            </h3>
            <p className="brand-tagline mt-1 text-xs italic font-display leading-snug text-stone-500 transition-colors duration-300 group-hover:text-white/90">
              {brand.tagline}
            </p>
            <div className="brand-feats mt-3 flex flex-wrap gap-1.5 transition-opacity duration-300 group-hover:opacity-0">
              {brand.features.slice(0, 2).map(f => (
                <span key={f} className="rounded-full border border-stone-200/80 bg-white/70 px-2 py-0.5 text-[9px] font-body tracking-wide text-stone-500">
                  {f}
                </span>
              ))}
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

      <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
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
        {brand.catalogue && (
          <a
            href={brand.catalogue}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-stone-200 px-3 py-1.5 text-xs font-body text-stone-600 hover:border-sage-400 hover:text-sage-700 transition-colors"
          >
            <FileText size={12} />
            Catalogue
          </a>
        )}
      </div>
    </div>
  )
}
