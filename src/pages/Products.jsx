import React, { useState } from 'react'
import { brands, categories } from '../data/products'
import BrandCard from '../components/BrandCard'
import { Search } from 'lucide-react'

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = brands.filter(b => {
    const matchCat = activeCategory === 'all' || b.category === activeCategory
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase()) ||
      b.products.some(p => p.name.toLowerCase().includes(search.toLowerCase()))
    return matchCat && matchSearch
  })

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-stone-50 border-b border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label mb-3">Catalogue</p>
          <h1 className="font-display text-5xl font-light text-stone-900">Products</h1>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 bg-white border-b border-stone-200 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs tracking-widest uppercase font-mono px-4 py-2 transition-all ${
                  activeCategory === cat.id
                    ? 'bg-stone-900 text-white'
                    : 'border border-stone-200 text-stone-500 hover:border-stone-500 hover:text-stone-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="pl-9 pr-4 py-2 text-sm border border-stone-200 font-body text-stone-700 focus:outline-none focus:border-stone-400 bg-white w-56"
            />
          </div>
        </div>
      </section>

      {/* Category Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-display text-3xl font-light text-stone-400">No results found.</p>
              <p className="text-stone-400 mt-2 font-body text-sm">Try a different search term or category.</p>
            </div>
          ) : (
            <>
              {/* Group by category */}
              {['Tissue', 'Disposables', 'Housekeeping'].map(cat => {
                const catBrands = filtered.filter(b => b.category === cat)
                if (catBrands.length === 0) return null
                return (
                  <div key={cat} className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                      <h2 className="font-display text-2xl font-light text-stone-900">{cat}</h2>
                      <div className="flex-1 h-px bg-stone-100" />
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {catBrands.map(brand => (
                        <BrandCard key={brand.id} brand={brand} variant="full" />
                      ))}
                    </div>
                  </div>
                )
              })}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
