import React, { useState } from 'react'
import { useInquiries } from '../context/InquiryContext'
import { isSupabaseConfigured } from '../lib/supabase'
import SuccessModal from './SuccessModal'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  city: '',
  message: '',
  type: 'Enquiry',
}

export default function ConnectForm() {
  const { addInquiry } = useInquiries()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [error, setError] = useState('')
  const [form, setForm] = useState({ ...initialForm })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isSupabaseConfigured) {
      setError('The contact form is being set up. Please email or call us directly for now.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await addInquiry(form)
      setSubmittedEmail(form.email || form.phone)
      setSubmitted(true)
      setForm({ ...initialForm })
    } catch (err) {
      setError('Something went wrong. Please try again or contact us directly.')
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
      <div className="rounded-2xl bg-gradient-to-br from-sage-400 via-mist-300 to-sand-300 p-[2px] shadow-xl shadow-sage-900/15">
      <form
        onSubmit={handleSubmit}
        className="rounded-[15px] bg-white p-6 sm:p-7 space-y-4"
      >
        <div>
          <label className="block text-sm text-stone-600 mb-1.5 font-body">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Your name"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-stone-600 mb-1.5 font-body">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="+91 00000 00000"
            />
          </div>
          <div>
            <label className="block text-sm text-stone-600 mb-1.5 font-body">City</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              className="form-input"
              placeholder="Your city"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-stone-600 mb-1.5 font-body">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-input"
            placeholder="you@email.com"
          />
        </div>

        <div>
          <label className="block text-sm text-stone-600 mb-1.5 font-body">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            className="form-input resize-none"
            placeholder="What do you need?"
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 font-body">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary rounded-xl w-full sm:w-auto min-w-[140px] disabled:opacity-60"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      </div>

      {submitted && (
        <SuccessModal email={submittedEmail} onClose={handleCloseModal} />
      )}
    </>
  )
}
