import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowRight, Mail, Phone, MapPin, ExternalLink, Sparkles } from 'lucide-react'
import { brands } from '../data/products'
import { CONTACT } from '../data/contact'
import BrandCard from '../components/BrandCard'
import ConnectForm from '../components/ConnectForm'
import ScrollIndicator from '../components/ScrollIndicator'
import Reveal from '../components/Reveal'
import { scrollToSection } from '../utils/scroll'

const serveItems = [
  { title: 'Tissue Paper', desc: 'Premium quality tissue paper for households and businesses.', image: `${import.meta.env.BASE_URL}images/categories/tissue.JPG` },
  { title: 'Disposable Products', desc: 'Convenient and hygienic disposable solutions for everyday use.', image: `${import.meta.env.BASE_URL}images/categories/disposable.JPG` },
  { title: 'Kitchen & Housekeeping', desc: 'Complete range of kitchen items and housekeeping products.', image: `${import.meta.env.BASE_URL}images/categories/housekeeping.WEBP` },
]

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    const hashTarget = window.location.hash?.slice(1)
    const scrollTarget = location.state?.scrollTo || hashTarget

    if (scrollTarget) {
      const timer = setTimeout(() => scrollToSection(scrollTarget), 150)
      return () => clearTimeout(timer)
    }
  }, [location])

  const categories = [...new Set(brands.map(b => b.category))]

  return (
    <div className="pt-20 sm:pt-24 pb-4 sm:pb-5 space-y-4 sm:space-y-5">
      {/* Hero */}
      <section id="hero" className="section-shell relative min-h-[80svh] sm:min-h-[88vh] flex items-center bg-sage-100">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src={`${import.meta.env.BASE_URL}videos/tissue.mp4`} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-white/5" />
        <div className="absolute inset-y-0 left-0 w-full max-w-4xl bg-gradient-to-r from-white/50 via-white/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/30 to-transparent" />

        <div className="relative site-container py-16 sm:py-24 lg:py-28">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
            <div>
              <p className="section-label mb-4 sm:mb-6">Widespread Distribution</p>
              <h1 className="font-display font-light text-transparent bg-clip-text bg-gradient-to-r from-sage-600 via-stone-800 to-stone-900 leading-[1.08] mb-5 sm:mb-6 max-w-2xl text-balance text-[clamp(2rem,5.5vw,4.5rem)]">
                <em className="text-transparent bg-clip-text bg-gradient-to-r from-sage-600 to-sage-700 not-italic">Distribute</em> with purpose.<br />
              
              </h1>
              <p className="text-stone-700 font-body text-base sm:text-lg max-w-xl mb-3 leading-relaxed">
                We bring together quality tissue, disposables and housekeeping products — so your business never runs short.
              </p>
              <p className="text-stone-600 font-body text-sm sm:text-base max-w-lg mb-8 leading-relaxed">
                Trusted by thousands of households and businesses.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                <a
                  href="#brands"
                  onClick={(e) => { e.preventDefault(); scrollToSection('brands') }}
                  className="btn-primary flex items-center justify-center gap-2 rounded-full shadow-md"
                >
                  View Brands
                  <ArrowRight size={14} />
                </a>
                <a
                  href="#connect"
                  onClick={(e) => { e.preventDefault(); scrollToSection('connect') }}
                  className="btn-outline flex items-center justify-center rounded-full bg-white/85 backdrop-blur-sm border-stone-300 hover:bg-white"
                >
                  Connect
                </a>
              </div>
            </div>

           
          </div>
        </div>

        <ScrollIndicator targetId="brands" variant="light" />
      </section>

      {/* Who we serve */}
      <section id="serve" className="section-shell bg-sand-50 scroll-mt-24 sm:scroll-mt-28 py-16 sm:py-24">
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <p className="section-label mb-2"></p>
            <h2 className="font-times font-bold text-4xl sm:text-5xl lg:text-6xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sage-600 via-stone-800 to-stone-800">Our Categories</h2>
            <p className="text-sm sm:text-base text-stone-600 font-body leading-relaxed">
              Comprehensive range of quality products from trusted brands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {serveItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 130} className="h-full">
                <div className="group flex h-full flex-col rounded-2xl sm:rounded-3xl bg-white/80 border border-white p-7 sm:p-8 text-center shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative mb-6 overflow-hidden">
                    <img src={item.image} alt={item.title} className="mx-auto h-24 w-24 sm:h-32 sm:w-32 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-sage-600 to-sage-700 mb-3 font-light">{item.title}</h3>
                  <p className="text-sm text-stone-600 font-body leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section id="brands" className="section-shell relative scroll-mt-24 sm:scroll-mt-28 py-8 sm:py-12 bg-sage-50">
        <div className="absolute top-0 right-0 h-48 sm:h-64 w-48 sm:w-64 rounded-full bg-sage-200/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-56 sm:h-72 w-56 sm:w-72 rounded-full bg-sand-100/50 blur-3xl pointer-events-none" />

        <div className="relative site-container">
          <div className="mb-6 sm:mb-8 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-sage-200/80 bg-white/70 px-4 py-1.5 mb-3 sm:mb-4">
              <Sparkles size={14} className="text-sage-500" />
              <span className="text-xs font-body text-stone-600">Our partners</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-sage-600 to-sage-700 mb-2">
              Our Trusted Brands
            </h2>
            <p className="text-stone-600 font-body text-xs sm:text-sm leading-relaxed px-2">
              Premium brands we proudly distribute
            </p>

            
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-5xl mx-auto">
            {brands.map((brand, index) => (
              <Reveal key={brand.id} delay={(index % 3) * 120} className="h-full">
                <BrandCard brand={brand} variant="compact" />
              </Reveal>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 overflow-hidden rounded-xl sm:rounded-2xl border border-sage-200/60 bg-white/60 py-3">
            <div className="flex animate-marquee whitespace-nowrap gap-6 sm:gap-8 px-4">
              {[...brands, ...brands].map((brand, i) => (
                <span key={`${brand.id}-${i}`} className="inline-flex items-center gap-2 text-xs sm:text-sm font-display text-stone-500">
                  <img src={brand.image} alt="" className="h-4 w-4 sm:h-5 sm:w-5 rounded-md" loading="lazy" />
                  {brand.name}
                  <span className="mx-2 text-sage-300">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="connect"
        className="section-shell relative scroll-mt-24 sm:scroll-mt-28 py-12 sm:py-16 bg-mist-50"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 right-4 sm:right-8 h-40 sm:h-56 w-40 sm:w-56 rounded-full bg-mist-200/50 blur-3xl" />
          <div className="absolute bottom-16 left-4 sm:left-8 h-48 sm:h-64 w-48 sm:w-64 rounded-full bg-sage-100/40 blur-3xl" />
        </div>

        <div className="relative site-container w-full">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start lg:items-center">
            <div>
              
              <h2 className="font-display text-3xl sm:text-4xl font-light text-stone-800 mb-3 sm:mb-4">
                Get In Touch
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-body mb-6 sm:mb-8 leading-relaxed">
                Ready to partner with us? Contact us today.
              </p>

              <div className="space-y-3">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 text-sm text-stone-600 font-body rounded-xl sm:rounded-2xl bg-white/90 px-4 py-3.5 border border-white shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage-50 text-sage-600">
                    <Mail size={16} />
                  </div>
                  <span className="break-all group-hover:text-stone-800 transition-colors">{CONTACT.email}</span>
                </a>

                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="flex items-center gap-3 text-sm text-stone-600 font-body rounded-xl sm:rounded-2xl bg-white/90 px-4 py-3.5 border border-white shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mist-100 text-mist-500">
                    <Phone size={16} />
                  </div>
                  <span className="group-hover:text-stone-800 transition-colors">{CONTACT.phone}</span>
                </a>

                <a
                  href={CONTACT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-stone-600 font-body rounded-xl sm:rounded-2xl bg-white/90 px-4 py-3.5 border border-white shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sand-100 text-sand-400">
                    <MapPin size={16} />
                  </div>
                  <span className="flex-1 group-hover:text-stone-800 transition-colors">
                    {CONTACT.locationLabel}
                  </span>
                  <ExternalLink size={14} className="text-stone-400 group-hover:text-mist-500 shrink-0" />
                </a>
              </div>
            </div>

            <div className="w-full">
              <ConnectForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
