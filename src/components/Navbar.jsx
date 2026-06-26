import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, LogIn, LogOut, ChevronDown, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import LoginModal from './LoginModal'
import { scrollToSection } from '../utils/scroll'

const navItems = [
  { label: 'Home', section: null, path: '/' },
  { label: 'Products', section: 'serve', path: '/#serve' },
  { label: 'Catalogue', section: 'catalogues', path: '/#catalogues' },
  { label: 'Contact', section: 'connect', path: '/#connect' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const userMenuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (location.pathname !== '/') return

    const sections = ['hero', 'serve', 'catalogues', 'connect']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [location.pathname])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
    navigate('/')
  }

  const handleNavClick = (item) => (e) => {
    setMenuOpen(false)

    // Home: scroll back to the top when already on the home page,
    // otherwise let the Link navigate to '/'.
    if (!item.section) {
      if (location.pathname === '/') {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    e.preventDefault()

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: item.section } })
    } else {
      scrollToSection(item.section)
    }
  }

  const handleEnquire = (e) => {
    e.preventDefault()
    setMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: 'connect' } })
    } else {
      scrollToSection('connect')
    }
  }

  const isActive = (item) => {
    if (location.pathname !== '/') return false
    // Products -> 'serve', Contact -> 'connect'
    if (item.section) return activeSection === item.section
    // Home highlights only on the hero, not while a section is in view
    return activeSection === 'hero' || activeSection === ''
  }

  const isHome = location.pathname === '/'
  const onHero = isHome && !scrolled && (activeSection === '' || activeSection === 'hero')

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 pt-3 sm:pt-4">
        <div
          className={`max-w-6xl mx-auto transition-all duration-500 ${
            onHero
              ? 'bg-white shadow-lg shadow-sky-900/10 border border-white rounded-2xl sm:rounded-[2rem]'
              : scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-md border border-stone-200/80 rounded-2xl sm:rounded-[2rem]'
                : 'bg-white/92 backdrop-blur-sm border border-stone-200/80 rounded-2xl sm:rounded-[2rem] shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <Link
              to="/"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
              className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-w-0"
            >
              <img
                src={`${import.meta.env.BASE_URL}images/logo.png`}
                alt="Widespread Distribution"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="hidden sm:block min-w-0">
                <span className="font-display text-lg font-medium text-stone-800 tracking-wide block leading-tight">
                  Widespread
                </span>
                <span className="text-[10px] tracking-wide text-sky-600 font-body">
                  Distribution
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1 bg-sky-50/80 rounded-full p-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.section ? '/' : item.path}
                  onClick={handleNavClick(item)}
                  className={`nav-pill ${isActive(item) ? 'nav-pill-active' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 rounded-full border border-stone-200 bg-white pl-1.5 pr-3 py-1.5 text-sm font-body font-medium text-stone-600 hover:border-sky-200 hover:text-sky-700 transition-all"
                  >
                    <div className="w-7 h-7 bg-sky-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">A</span>
                    </div>
                    <span className="text-xs tracking-wide">Admin</span>
                    <ChevronDown size={14} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-12 curved-box-sm bg-white border border-stone-200 shadow-xl w-48 py-2 overflow-hidden">
                      <button
                        onClick={() => { navigate('/admin'); setUserMenuOpen(false) }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                      >
                        <LayoutDashboard size={14} />
                        Dashboard
                      </button>
                      <div className="border-t border-stone-100 my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-stone-600 hover:bg-stone-50 transition-colors"
                      >
                        <LogOut size={14} />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setLoginOpen(true)}
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-xs tracking-widest uppercase font-medium text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-all"
                >
                  <LogIn size={14} />
                  Login
                </button>
              )}
              <button onClick={handleEnquire} className="btn-primary rounded-full text-xs py-2 sm:py-2.5 px-4 sm:px-5">
                Enquire
              </button>
            </div>

            {/* Mobile menu toggle */}
            <button
              className={`md:hidden flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                menuOpen
                  ? 'bg-sky-600 text-white'
                  : 'bg-sky-50 text-sky-700 ring-1 ring-sky-200'
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden border-t border-stone-100 px-5 py-6 space-y-2 animate-fade-in">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.section ? '/' : item.path}
                  onClick={handleNavClick(item)}
                  className={`block rounded-xl sm:rounded-2xl px-4 py-3 text-sm font-body font-medium transition-colors ${
                    isActive(item)
                      ? 'bg-sky-600 text-white'
                      : 'text-stone-600 hover:bg-sky-50 hover:text-sky-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-stone-100 flex flex-col gap-3">
                {user ? (
                  <>
                    <Link to="/admin" className="btn-outline rounded-2xl text-center text-xs">Dashboard</Link>
                    <button onClick={handleLogout} className="btn-outline rounded-2xl text-center text-xs">Sign out</button>
                  </>
                ) : (
                  <button onClick={() => setLoginOpen(true)} className="btn-outline rounded-2xl text-center text-xs">Login</button>
                )}
                <button onClick={handleEnquire} className="btn-primary rounded-2xl text-center text-xs">Enquire Now</button>
              </div>
            </div>
          )}
        </div>
      </header>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}
