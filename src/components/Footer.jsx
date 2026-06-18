import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'
import { CONTACT } from '../data/contact'
import { scrollToSection } from '../utils/scroll'

const footerLinks = [
  { label: 'Home', section: null },
  { label: 'Products', section: 'brands' },
  { label: 'Contact', section: 'connect' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLinkClick = (section) => (e) => {
    if (!section) return

    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: section } })
    } else {
      scrollToSection(section)
    }
  }

  return (
    <footer className="mx-2 sm:mx-4 lg:mx-5 mb-4 sm:mb-5 rounded-2xl sm:rounded-[2.5rem] bg-sage-800 text-sage-100 overflow-hidden shadow-sm">
      <div className="site-container py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 pb-10 sm:pb-12 border-b border-sage-700/60">

          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src={`${import.meta.env.BASE_URL}images/logo.svg`} alt="" className="h-10 w-10 rounded-2xl brightness-110" />
              <span className="font-display text-xl font-medium text-white">Widespread Distribution</span>
            </div>
            <p className="text-sm leading-relaxed font-body text-sage-200/80 max-w-xs">
              Tissue, disposables & housekeeping — one reliable partner.
            </p>
          </div>

          <div>
            <p className="text-xs text-sage-300 font-body mb-5">Navigation</p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.section ? '/' : '/'}
                    onClick={handleLinkClick(link.section)}
                    className="text-sm text-sage-200/80 hover:text-white transition-colors font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs text-sage-300 font-body mb-5">Get in Touch</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 text-sm text-sage-200/80 hover:text-white transition-colors font-body break-all"
                >
                  <Mail size={14} className="text-sage-300 shrink-0" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="flex items-center gap-3 text-sm text-sage-200/80 hover:text-white transition-colors font-body"
                >
                  <Phone size={14} className="text-sage-300 shrink-0" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-sage-200/80 hover:text-white transition-colors font-body"
                >
                  <MapPin size={14} className="text-sage-300 shrink-0 mt-0.5" />
                  {CONTACT.locationLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <p className="text-xs text-sage-300/80 font-body">© {year} Widespread Distribution. All rights reserved.</p>
          <p className="text-xs text-sage-400/70 font-body">Paseo · Origami · Kressa · Premier · Opik · Milton</p>
        </div>
      </div>
    </footer>
  )
}
