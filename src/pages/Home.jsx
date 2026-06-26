import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowRight, Mail, Phone, MapPin, ExternalLink, Sparkles } from 'lucide-react'
import { brands } from '../data/products'
import { CONTACT } from '../data/contact'
import BrandCard from '../components/BrandCard'
import ConnectForm from '../components/ConnectForm'
import ScrollIndicator from '../components/ScrollIndicator'
import Reveal from '../components/Reveal'
import Tilt from '../components/Tilt'
import CatalogueCinema from '../components/CatalogueCinema'
import SlideBackground from '../components/SlideBackground'
import { scrollToSection } from '../utils/scroll'
import { heroAccents } from '../theatre/cinema'

const serveItems = [
  { title: 'Tissue Paper', desc: 'Premium quality tissue paper for households and businesses.', image: `${import.meta.env.BASE_URL}images/categories/tissue.JPG` },
  { title: 'Disposable Products', desc: 'Convenient and hygienic disposable solutions for everyday use.', image: `${import.meta.env.BASE_URL}images/categories/disposable.JPG` },
  { title: 'Kitchen & Housekeeping', desc: 'Complete range of kitchen items and housekeeping products.', image: `${import.meta.env.BASE_URL}images/categories/housekeeping.WEBP` },
]

// Each category card gets its own bright accent so the row reads colorful.
const serveAccents = [
  { grad: 'from-sky-500 to-sky-600', ring: 'ring-sky-200/70', glow: 'group-hover:shadow-[0_28px_60px_-24px_rgba(61,168,224,0.5)]' },
  { grad: 'from-coral-400 to-coral-500', ring: 'ring-coral-200/70', glow: 'group-hover:shadow-[0_28px_60px_-24px_rgba(255,122,102,0.5)]' },
  { grad: 'from-lime-500 to-lime-600', ring: 'ring-lime-200/70', glow: 'group-hover:shadow-[0_28px_60px_-24px_rgba(122,199,79,0.5)]' },
]

export default function Home() {
  const location = useLocation()
  const heroContentRef = useRef(null)
  const heroGlowRef = useRef(null)

  useEffect(() => {
    const hashTarget = window.location.hash?.slice(1)
    const scrollTarget = location.state?.scrollTo || hashTarget

    if (scrollTarget) {
      const timer = setTimeout(() => scrollToSection(scrollTarget), 150)
      return () => clearTimeout(timer)
    }
  }, [location])

  // Cinematic hero: parallax-fade the headline as you scroll past it.
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    let raf = 0
    const update = () => {
      const el = heroContentRef.current
      if (!el) return
      const y = window.scrollY
      el.style.transform = `translateY(${y * 0.18}px)`
      el.style.opacity = String(Math.max(0, 1 - y / 620))
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Theatre.js drives the decorative hero glow (author keyframes in Studio).
  useEffect(() => {
    const unsub = heroAccents.onValuesChange((v) => {
      const el = heroGlowRef.current
      if (!el) return
      el.style.transform = `translate(${v.glowX}px, ${v.glowY}px) rotate(${v.driftRotate}deg)`
      el.style.opacity = String(v.glowOpacity)
    })
    return unsub
  }, [])

  const categories = [...new Set(brands.map(b => b.category))]

  return (
    <div className="pt-20 sm:pt-24 pb-4 sm:pb-5 space-y-4 sm:space-y-5">
      {/* Hero */}
      <section id="hero" className="section-shell relative min-h-[80svh] sm:min-h-[88vh] flex items-center bg-sky-50">
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

        {/* Theatre.js-driven decorative glow (tunable in Studio) */}
        <div
          ref={heroGlowRef}
          aria-hidden="true"
          className="pointer-events-none absolute right-[12%] top-[22%] h-72 w-72 rounded-full bg-sky-300/40 blur-3xl"
        />

        <div className="relative site-container py-16 sm:py-24 lg:py-28">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
            <div ref={heroContentRef}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 backdrop-blur-sm px-3.5 py-1.5 mb-5 sm:mb-7 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-coral-400" />
                <span className="text-[11px] tracking-wide text-stone-600 font-body">Widespread Distribution · Gurugram</span>
              </div>
              <h1 className="display-xl text-transparent bg-clip-text bg-gradient-to-br from-stone-800 to-stone-600 mb-5 sm:mb-6 max-w-2xl text-balance">
                <em className="text-transparent bg-clip-text bg-gradient-to-r from-sky-700 to-sky-600 not-italic">Distribute</em> with purpose.
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
      <section id="serve" className="section-shell relative overflow-hidden bg-gradient-to-br from-stone-50 via-white to-sky-50/40 scroll-mt-24 sm:scroll-mt-28 py-16 sm:py-24">
        <SlideBackground variant="corner-triangles" />
        <div className="relative z-10 site-container">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <p className="section-label mb-2">What we offer</p>
            <h2 className="font-times font-bold text-4xl sm:text-5xl lg:text-6xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-stone-800 to-stone-600">Our Categories</h2>
            <p className="text-sm sm:text-base text-stone-600 font-body leading-relaxed">
              Comprehensive range of quality products from trusted brands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {serveItems.map((item, index) => {
              const accent = serveAccents[index % serveAccents.length]
              return (
              <Reveal key={item.title} delay={index * 130} className="h-full">
                <Tilt className="h-full" max={7}>
                  <div className={`glass group relative flex h-full flex-col p-7 sm:p-8 text-center transition-shadow duration-500 ${accent.glow}`}>
                    <span className={`absolute inset-x-0 top-0 h-1.5 rounded-t-[1.75rem] bg-gradient-to-r ${accent.grad}`} />
                    <div className="relative mb-6 overflow-hidden rounded-2xl">
                      <img src={item.image} alt={item.title} className={`mx-auto h-24 w-24 sm:h-32 sm:w-32 object-cover rounded-2xl ring-4 ${accent.ring} transition-transform duration-700 ease-smooth group-hover:scale-110`} loading="lazy" />
                    </div>
                    <h3 className={`font-display text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r ${accent.grad} mb-3 font-light`}>{item.title}</h3>
                    <p className="text-sm text-stone-600 font-body leading-relaxed">{item.desc}</p>
                  </div>
                </Tilt>
              </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section id="brands" className="section-shell relative overflow-hidden scroll-mt-24 sm:scroll-mt-28 py-8 sm:py-12 bg-gradient-to-br from-white via-sky-50/30 to-stone-50">
        <SlideBackground variant="arcs" />
        <div className="absolute top-0 right-0 h-48 sm:h-64 w-48 sm:w-64 rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-56 sm:h-72 w-56 sm:w-72 rounded-full bg-stone-200/40 blur-3xl pointer-events-none" />

        <div className="relative z-10 site-container">
          <div className="mb-6 sm:mb-8 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-coral-200/80 bg-white/70 px-4 py-1.5 mb-3 sm:mb-4">
              <Sparkles size={14} className="text-coral-400" />
              <span className="text-xs font-body text-stone-600">Our partners</span>
            </div>
            <h2 className="font-times font-bold text-4xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-stone-800 to-stone-600 mb-3">
              Our Trusted Brands
            </h2>
            <p className="text-stone-600 font-body text-xs sm:text-sm leading-relaxed px-2">
              Premium brands we proudly distribute
            </p>

            
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-5 lg:gap-6 max-w-5xl mx-auto">
            {brands.slice(0, 6).map((brand, index) => (
              <Reveal key={brand.id} delay={(index % 3) * 120} className="h-full w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-1rem)]">
                <BrandCard brand={brand} variant="compact" />
              </Reveal>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 overflow-hidden rounded-xl sm:rounded-2xl border border-sky-200/60 bg-white/60 py-3">
            <div className="flex animate-marquee whitespace-nowrap gap-6 sm:gap-8 px-4">
              {[...brands, ...brands].map((brand, i) => (
                <span key={`${brand.id}-${i}`} className="inline-flex items-center gap-2 text-xs sm:text-sm font-display text-stone-500">
                  <img src={brand.image} alt="" className="h-4 w-4 sm:h-5 sm:w-5 rounded-md" loading="lazy" />
                  {brand.name}
                  <span className="mx-2 text-sky-400">·</span>
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 sm:mt-10 text-center">
            <p className="mb-3 text-xs sm:text-sm font-body text-stone-500">
              And many more brands in our range.
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
      </section>

      {/* Scroll-cinematic catalogue gallery */}
      <CatalogueCinema />

      {/* Contact */}
      <section
        id="connect"
        className="section-shell relative overflow-hidden scroll-mt-24 sm:scroll-mt-28 py-12 sm:py-16 bg-gradient-to-br from-stone-50 via-white/40 to-sky-50/40"
      >
        <SlideBackground variant="dots" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 right-4 sm:right-8 h-40 sm:h-56 w-40 sm:w-56 rounded-full bg-sky-100/50 blur-3xl" />
          <div className="absolute bottom-16 left-4 sm:left-8 h-48 sm:h-64 w-48 sm:w-64 rounded-full bg-stone-200/40 blur-3xl" />
        </div>

        <div className="relative z-10 site-container w-full">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start lg:items-center">
            <div>

              <h2 className="font-times font-bold text-4xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-stone-800 to-stone-600 mb-3 sm:mb-4">
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
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                    <Mail size={16} />
                  </div>
                  <span className="break-all group-hover:text-stone-800 transition-colors">{CONTACT.email}</span>
                </a>

                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="flex items-center gap-3 text-sm text-stone-600 font-body rounded-xl sm:rounded-2xl bg-white/90 px-4 py-3.5 border border-white shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-100 text-lime-600">
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
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-coral-100 text-coral-500">
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
