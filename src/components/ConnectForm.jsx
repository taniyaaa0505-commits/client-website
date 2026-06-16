import React, { useState } from 'react'
import { useInquiries } from '../context/InquiryContext'
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
  const [form, setForm] = useState({ ...initialForm })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    addInquiry(form)
    setSubmittedEmail(form.email || form.phone)
    setLoading(false)
    setSubmitted(true)
    setForm({ ...initialForm })
  }

  const handleCloseModal = () => {
    setSubmitted(false)
    setSubmittedEmail('')
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-stone-200/80 bg-white p-6 sm:p-7 space-y-4 shadow-sm"
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

        <button
          type="submit"
          disabled={loading}
          className="btn-primary rounded-xl w-full sm:w-auto min-w-[140px] disabled:opacity-60"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {submitted && (
        <SuccessModal email={submittedEmail} onClose={handleCloseModal} />
      )}
    </>
  )
}
