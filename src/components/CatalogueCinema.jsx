import React, { useState } from 'react'
import { FileText, ArrowRight } from 'lucide-react'
import { brands } from '../data/products'
import Reveal from './Reveal'
import Tilt from './Tilt'
import CatalogueViewer from './CatalogueViewer'

const catalogueBrands = brands.filter((b) => b.catalogue)

function CatalogueCard({ brand, onOpen }) {
  return (
    <Tilt className="h-full" max={9}>
    <button
      onClick={() => onOpen(brand)}
      className="group relative flex aspect-[3/4] w-full flex-col overflow-hidden rounded-2xl sm:rounded-[1.5rem] bg-stone-800 text-left shadow-xl shadow-black/40 ring-1 ring-white/10"
    >
      {brand.photo ? (
        <img
          src={brand.photo}
          alt={brand.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${brand.accent}, #2b4036)` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/40 to-stone-950/10" />

      {/* Top: category + logo */}
      <div className="relative flex items-center justify-between p-3 sm:p-4">
        <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-body tracking-wide text-white/90 backdrop-blur-sm">
          {brand.category}
        </span>
        <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-white/30 bg-white">
          <img src={brand.image} alt="" className="h-full w-full object-cover" />
        </div>
      </div>

      {/* Bottom: title + always-visible CTA */}
      <div className="relative mt-auto p-3.5 sm:p-4">
        <p className="mb-1 text-[9px] font-body uppercase tracking-[0.22em] text-sage-300">
          Catalogue
        </p>
        <h3 className="font-display text-xl sm:text-2xl font-light leading-tight text-white">
          {brand.name}
        </h3>
        <p className="mt-1 text-[11px] italic font-display text-white/70 line-clamp-1">
          {brand.tagline}
        </p>
        <span className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-white px-3 py-2 text-[11px] font-body font-semibold text-stone-900 shadow-lg transition-all duration-300 ease-smooth group-hover:gap-2.5 group-hover:bg-sage-50">
          <FileText size={12} className="text-sage-600" />
          View Catalogue
          <ArrowRight size={12} className="text-sage-600 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </button>
    </Tilt>
  )
}

export default function CatalogueCinema() {
  const [active, setActive] = useState(null)

  return (
    <section
      id="catalogues"
      className="section-shell relative overflow-hidden bg-gradient-to-br from-sage-50 via-white to-sand-50 py-16 sm:py-24 scroll-mt-24"
    >
      {/* Soft decorative glows, on-theme */}
      <div className="pointer-events-none absolute -top-20 right-[8%] h-72 w-72 rounded-full bg-sage-200/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-[5%] h-80 w-80 rounded-full bg-sand-200/50 blur-3xl" />

      <div className="relative site-container">
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-14">
          <p className="text-xs tracking-[0.2em] uppercase text-sage-600 font-body font-medium mb-3">
            Browse the range
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-stone-800">
            Brand <span className="italic text-sage-600">Catalogues</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 font-body leading-relaxed">
            Flip through each brand's full product range — sizes, packing, and specs in one place.
          </p>
        </div>

        {/* Static grid — cards simply visible, no horizontal scroll */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {catalogueBrands.map((brand, i) => (
            <Reveal key={brand.id} delay={(i % 4) * 100} className="h-full">
              <CatalogueCard brand={brand} onOpen={setActive} />
            </Reveal>
          ))}
        </div>

        {/* Closing call-to-action */}
        <div className="mt-12 sm:mt-14 flex flex-col items-start gap-4 rounded-[1.75rem] border border-stone-200/80 bg-white/70 p-7 sm:p-9 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-light text-stone-800">
              Need something specific?
            </h3>
            <p className="mt-1.5 text-sm text-stone-600 font-body">
              Tell us what you stock and we'll match you with the right brands and pricing.
            </p>
          </div>
          <a
            href="#connect"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-primary rounded-full inline-flex shrink-0 items-center gap-2"
          >
            Get in touch <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {active && <CatalogueViewer brand={active} onClose={() => setActive(null)} />}
    </section>
  )
}
