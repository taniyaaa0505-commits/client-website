import React, { useState, useEffect } from 'react'
import { X, Eye, EyeOff, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login, loginError, setLoginError } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      setEmail('')
      setPassword('')
      setLoginError('')
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const success = login(email, password)
    setLoading(false)
    if (success) {
      onClose()
      navigate('/admin')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md mx-4 shadow-2xl">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-stone-100">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-stone-900 flex items-center justify-center">
                  <Lock size={14} className="text-white" />
                </div>
                <span className="section-label">Restricted Access</span>
              </div>
              <h2 className="font-display text-3xl font-light text-stone-900">Admin Login</h2>
              <p className="text-sm text-stone-400 mt-1 font-body">Sign in to access the dashboard</p>
            </div>
            <button onClick={onClose} className="text-stone-400 hover:text-stone-700 transition-colors p-1">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">
          <div>
            <label className="block text-xs tracking-widest uppercase text-stone-500 mb-2 font-mono">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="form-input"
              placeholder="your@email.com"
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase text-stone-500 mb-2 font-mono">Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="form-input pr-10"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600 font-body">
              {loginError}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3.5 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Verifying...
                </span>
              ) : 'Sign In'}
            </button>
          </div>

          <p className="text-xs text-stone-400 text-center font-body">
            Access is restricted to authorised personnel only.
          </p>
        </form>
      </div>
    </div>
  )
}
