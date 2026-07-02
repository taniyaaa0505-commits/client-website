import React, { useState } from 'react'
import { FileText, ArrowRight } from 'lucide-react'
import { brands } from '../data/products'
import Reveal from './Reveal'
import CatalogueViewer from './CatalogueViewer'
import SlideBackground from './SlideBackground'
import { scrollToSection } from '../utils/scroll'

const catalogueBrands = brands.filter((b) => b.catalogue)

// Rotating accent palette so the grid mixes sky / coral / lime / sunny.
const ACCENTS = [
  { grad: 'from-sky-500 to-sky-600', chip: 'bg-sky-500/25 text-white' },
  { grad: 'from-coral-400 to-coral-500', chip: 'bg-coral-400/30 text-white' },
  { grad: 'from-lime-500 to-lime-600', chip: 'bg-lime-500/30 text-white' },
  { grad: 'from-sunny-400 to-sunny-500', chip: 'bg-sunny-400/30 text-white' },
]

function CatalogueCard({ brand, onOpen, accent }) {
  return (
    <button
      onClick={() => onOpen(brand)}
      className="group relative flex aspect-[1/1] w-full flex-col overflow-hidden rounded-2xl bg-stone-800 text-left shadow-lg shadow-black/20 ring-1 ring-white/10 transition-shadow duration-500 hover:shadow-xl"
    >
      {brand.cover || brand.photo ? (
        <img
          src={brand.cover || brand.photo}
          alt={`${brand.name} catalogue cover`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${brand.accent}, #2b4036)` }} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/35 to-stone-950/10" />

      {/* Top: category + logo */}
      <div className="relative flex items-center justify-between p-3.5">
        <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] tracking-wide text-white/90 backdrop-blur-sm">
          {brand.category}
        </span>
        <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-white/30 bg-white">
          {brand.image ? (
            <img src={brand.image} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="font-display text-base font-semibold text-stone-700">{brand.name.charAt(0)}</span>
          )}
        </div>
      </div>

      {/* Bottom: title + CTA */}
      <div className="relative mt-auto p-4">
        <p className="mb-1 text-[9px] font-body uppercase tracking-[0.22em] text-white/75">Catalogue</p>
        <h3 className="font-display text-2xl font-light leading-none text-white">{brand.name}</h3>
        <p className="mt-1 text-[11px] italic font-display text-white/70 line-clamp-1">{brand.tagline}</p>
        <span className={`mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-r ${accent.grad} px-3 py-2.5 text-[11px] font-body font-semibold text-white shadow-lg ring-1 ring-white/25 transition-all duration-300 ease-smooth group-hover:gap-2.5 group-hover:shadow-xl`}>
          <FileText size={12} className="text-white" />
          View Catalogue
          <ArrowRight size={12} className="text-white transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </button>
  )
}

export default function CatalogueCinema() {
  const [active, setActive] = useState(null)

  return (
    <section
      id="catalogues"
      className="section-shell relative overflow-hidden flex flex-col justify-center min-h-[100svh] bg-gradient-to-br from-sky-50/50 via-white to-stone-50 py-16 sm:py-20 scroll-mt-24 sm:scroll-mt-28"
    >
      <SlideBackground variant="ribbon" />
      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute -top-24 right-[6%] h-80 w-80 rounded-full bg-sky-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 left-[8%] h-72 w-72 rounded-full bg-stone-200/40 blur-3xl" />

      <div className="relative z-10 site-container">
        <div className="max-w-2xl mb-12 sm:mb-14">
          <p className="section-label mb-2">Browse the range</p>
          <h2 className="font-times font-bold text-4xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-stone-800 to-stone-600">
            Brand Catalogues
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 font-body leading-relaxed">
            Flip through each brand's full product range — sizes, packing, and specs in one place.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
          {catalogueBrands.slice(0, 6).map((brand, i) => (
            <Reveal key={brand.id} delay={(i % 3) * 110} className="h-full w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
              <CatalogueCard brand={brand} onOpen={setActive} accent={ACCENTS[i % ACCENTS.length]} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 text-center">
          <p className="mb-3 text-xs sm:text-sm font-body text-stone-500">
            Looking for a specific catalogue or product?
          </p>
          <a
            href="#connect"
            onClick={(e) => { e.preventDefault(); scrollToSection('connect') }}
            className="btn-primary inline-flex items-center justify-center gap-2 rounded-full shadow-md"
          >
            See all products — Get in touch
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {active && <CatalogueViewer brand={active} onClose={() => setActive(null)} />}
    </section>
  )
}
