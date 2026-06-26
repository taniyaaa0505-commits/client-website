import React, { useState } from 'react'
import { User, Phone, MapPin, Mail, MessageSquare, ArrowRight, Sparkles } from 'lucide-react'
import { useInquiries } from '../context/InquiryContext'
import { CONTACT, WEB3FORMS_ACCESS_KEY } from '../data/contact'
import SuccessModal from './SuccessModal'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  city: '',
  message: '',
  type: 'Enquiry',
}

const emailEnabled =
  WEB3FORMS_ACCESS_KEY && !WEB3FORMS_ACCESS_KEY.includes('YOUR_ACCESS_KEY')

/** Icon-prefixed input that lights up its icon on focus. */
function Field({ icon: Icon, label, children }) {
  return (
    <label className="group block">
      <span className="mb-1.5 block text-[11px] font-body font-medium uppercase tracking-wider text-stone-500">
        {label}
      </span>
      <div className="relative">
        <Icon
          size={16}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 transition-colors group-focus-within:text-sky-600"
        />
        {children}
      </div>
    </label>
  )
}

export default function ConnectForm() {
  const { addInquiry } = useInquiries()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [error, setError] = useState('')
  const [botField, setBotField] = useState('') // honeypot — humans never fill this
  const [form, setForm] = useState({ ...initialForm })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (botField) return // silently drop bots that filled the honeypot

    setLoading(true)
    setError('')
    try {
      // Keep a local record (admin dashboard).
      addInquiry(form)

      // Email the inquiry to the owner via Web3Forms (no backend needed).
      if (emailEnabled) {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `New website inquiry from ${form.name}`,
            from_name: 'Widespread Distribution Website',
            replyto: form.email || undefined,
            Name: form.name,
            Phone: form.phone,
            Email: form.email || '—',
            City: form.city || '—',
            Type: form.type,
            Message: form.message,
          }),
        })
        const data = await res.json()
        if (!data.success) throw new Error(data.message || 'Submission failed')
      }

      setSubmittedEmail(form.email || form.phone)
      setSubmitted(true)
      setForm({ ...initialForm })
    } catch (err) {
      setError(
        `Couldn't send right now. Please try again, or reach us at ${CONTACT.phone}.`
      )
    } finally {
      setLoading(false)
    }
  }

  const handleCloseModal = () => {
    setSubmitted(false)
    setSubmittedEmail('')
  }

  return (
    <>
      <div className="relative">
        {/* Soft ambient glow behind the form */}
        <div className="pointer-events-none absolute -inset-3 rounded-[2.25rem] bg-gradient-to-br from-sky-400/40 via-mist-300/40 to-sand-300/40 opacity-70 blur-2xl" />

        {/* Living gradient border */}
        <div className="animate-gradient relative rounded-[1.75rem] bg-gradient-to-br from-sky-500 via-mist-300 to-sand-300 p-[1.5px] shadow-2xl shadow-sky-700/20">
          <form
            onSubmit={handleSubmit}
            className="rounded-[1.65rem] bg-white/95 p-6 sm:p-8 backdrop-blur-xl"
          >
            {/* Heading */}
            <div className="mb-6 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
                <Sparkles size={16} />
              </span>
              <div>
                <h3 className="font-display text-xl font-medium leading-tight text-stone-800">
                  Send us a message
                </h3>
                <p className="text-xs text-stone-500 font-body">We'll get back to you within a day.</p>
              </div>
            </div>

            {/* Honeypot */}
            <input
              type="text"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              value={botField}
              onChange={(e) => setBotField(e.target.value)}
              className="hidden"
              aria-hidden="true"
            />

            <div className="space-y-4">
              <Field icon={User} label="Name">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="form-input pl-10"
                  placeholder="Your name"
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field icon={Phone} label="Phone">
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="form-input pl-10"
                    placeholder="+91 00000 00000"
                  />
                </Field>
                <Field icon={MapPin} label="City">
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="form-input pl-10"
                    placeholder="Your city"
                  />
                </Field>
              </div>

              <Field icon={Mail} label="Email">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-input pl-10"
                  placeholder="you@email.com"
                />
              </Field>

              <label className="group block">
                <span className="mb-1.5 block text-[11px] font-body font-medium uppercase tracking-wider text-stone-500">
                  Message
                </span>
                <div className="relative">
                  <MessageSquare
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-4 text-stone-400 transition-colors group-focus-within:text-sky-600"
                  />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="form-input resize-none pl-10"
                    placeholder="What do you need?"
                  />
                </div>
              </label>
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 font-body">
                {error}
              </div>
            )}

            {/* Premium submit */}
            <button
              type="submit"
              disabled={loading}
              className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 py-3.5 text-sm font-body font-semibold text-white shadow-lg shadow-sky-700/20 transition-all duration-300 ease-smooth hover:shadow-[0_14px_44px_-8px_rgba(95,143,116,0.85)] active:scale-[0.99] disabled:opacity-60"
            >
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  Send Message
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {submitted && (
        <SuccessModal email={submittedEmail} onClose={handleCloseModal} />
      )}
    </>
  )
}
