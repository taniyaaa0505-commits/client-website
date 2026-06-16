import React, { useEffect } from 'react'
import { CheckCircle, X, Sparkles } from 'lucide-react'

export default function SuccessModal({ email, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-label="Close"
      />

      <div className="relative w-full max-w-md max-h-[90dvh] overflow-y-auto curved-box bg-white p-8 sm:p-10 text-center shadow-2xl animate-scale-in">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition-colors hover:bg-stone-200 hover:text-stone-800"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sage-400 to-sage-600 shadow-lg shadow-sage-500/20">
          <CheckCircle size={32} className="text-white" strokeWidth={2} />
        </div>

        <div className="mb-2 flex items-center justify-center gap-1.5 text-accent">
          <Sparkles size={14} />
          <span className="text-[10px] font-mono uppercase tracking-widest">Success</span>
          <Sparkles size={14} />
        </div>

        <h3 id="success-title" className="font-display text-3xl font-light text-stone-900 mb-3">
          Message sent!
        </h3>
        <p className="text-sm text-stone-500 font-body leading-relaxed mb-8">
          Thanks for reaching out! We'll get back to you at{' '}
          <strong className="text-stone-700">{email}</strong> soon.
        </p>

        <button type="button" onClick={onClose} className="btn-primary rounded-full px-8">
          Got it
        </button>
      </div>
    </div>
  )
}
