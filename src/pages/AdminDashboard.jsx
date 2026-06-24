import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useInquiries } from '../context/InquiryContext'
import {
  Trash2,
  ChevronDown,
  ChevronUp,
  Download,
  LogOut,
  Inbox,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
} from 'lucide-react'

const STATUS_COLORS = {
  New: 'bg-sky-50 text-sky-700 border-sky-200',
  Reviewed: 'bg-amber-50 text-amber-700 border-amber-200',
  Contacted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Closed: 'bg-stone-100 text-stone-500 border-stone-200',
}

function InquiryRow({ inquiry, onStatus, onDelete }) {
  const [open, setOpen] = useState(false)

  const date = new Date(inquiry.submittedAt)
  const dateStr = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  const timeStr = date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

  const contactLine = [inquiry.phone, inquiry.email].filter(Boolean).join(' · ') || 'No contact info'

  return (
    <div className="rounded-2xl border border-stone-200/80 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div
        className="flex items-center justify-between gap-4 p-4 sm:p-5 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 shrink-0">
            <span className="text-sm font-display text-stone-600">{inquiry.name?.[0]?.toUpperCase()}</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-body font-medium text-stone-800 truncate">{inquiry.name}</p>
            <p className="text-xs text-stone-500 font-body truncate">{contactLine}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {inquiry.city && (
            <span className="hidden md:inline text-xs text-stone-500 font-body bg-stone-50 border border-stone-100 rounded-full px-2.5 py-1">
              {inquiry.city}
            </span>
          )}
          <select
            value={inquiry.status}
            onChange={e => { e.stopPropagation(); onStatus(inquiry.id, e.target.value) }}
            onClick={e => e.stopPropagation()}
            className={`text-xs border rounded-lg px-2.5 py-1.5 font-body cursor-pointer focus:outline-none focus:ring-2 focus:ring-stone-200 ${STATUS_COLORS[inquiry.status]}`}
          >
            {Object.keys(STATUS_COLORS).map(s => <option key={s}>{s}</option>)}
          </select>
          <span className="hidden lg:block text-xs text-stone-400 font-body whitespace-nowrap">{dateStr}</span>
          <button
            onClick={e => { e.stopPropagation(); onDelete(inquiry.id) }}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 hover:bg-red-50 hover:text-red-500 transition-colors"
            aria-label="Delete inquiry"
          >
            <Trash2 size={15} />
          </button>
          {open ? <ChevronUp size={16} className="text-stone-400" /> : <ChevronDown size={16} className="text-stone-400" />}
        </div>
      </div>

      {open && (
        <div className="border-t border-stone-100 p-5 sm:p-6 bg-[#faf9f7] space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {inquiry.phone && (
              <div className="flex items-start gap-3 rounded-xl bg-white border border-stone-100 p-3">
                <Phone size={15} className="text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-stone-400 font-mono mb-0.5">Phone</p>
                  <p className="text-sm font-body text-stone-700">{inquiry.phone}</p>
                </div>
              </div>
            )}
            {inquiry.email && (
              <div className="flex items-start gap-3 rounded-xl bg-white border border-stone-100 p-3">
                <Mail size={15} className="text-rose-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-stone-400 font-mono mb-0.5">Email</p>
                  <p className="text-sm font-body text-stone-700 break-all">{inquiry.email}</p>
                </div>
              </div>
            )}
            {inquiry.city && (
              <div className="flex items-start gap-3 rounded-xl bg-white border border-stone-100 p-3">
                <MapPin size={15} className="text-sky-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-stone-400 font-mono mb-0.5">City</p>
                  <p className="text-sm font-body text-stone-700">{inquiry.city}</p>
                </div>
              </div>
            )}
            <div className="flex items-start gap-3 rounded-xl bg-white border border-stone-100 p-3">
              <Inbox size={15} className="text-stone-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-stone-400 font-mono mb-0.5">Received</p>
                <p className="text-sm font-body text-stone-700">{dateStr} at {timeStr}</p>
              </div>
            </div>
          </div>

          {inquiry.message && (
            <div className="rounded-xl bg-white border border-stone-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare size={15} className="text-stone-400" />
                <p className="text-[10px] uppercase tracking-wider text-stone-400 font-mono">Message</p>
              </div>
              <p className="text-sm font-body text-stone-700 leading-relaxed">{inquiry.message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const { inquiries, updateStatus, deleteInquiry } = useInquiries()
  const [filterStatus, setFilterStatus] = useState('All')
  const [search, setSearch] = useState('')

  if (!user) return <Navigate to="/" replace />

  const filtered = inquiries.filter(i => {
    const matchStatus = filterStatus === 'All' || i.status === filterStatus
    const q = search.toLowerCase()
    const matchSearch = !search ||
      i.name?.toLowerCase().includes(q) ||
      i.email?.toLowerCase().includes(q) ||
      i.phone?.toLowerCase().includes(q) ||
      i.city?.toLowerCase().includes(q) ||
      i.message?.toLowerCase().includes(q)
    return matchStatus && matchSearch
  })

  const statusCounts = {
    All: inquiries.length,
    New: inquiries.filter(i => i.status === 'New').length,
    Reviewed: inquiries.filter(i => i.status === 'Reviewed').length,
    Contacted: inquiries.filter(i => i.status === 'Contacted').length,
    Closed: inquiries.filter(i => i.status === 'Closed').length,
  }

  const exportCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'City', 'Status', 'Date', 'Message']
    const rows = inquiries.map(i => [
      i.name,
      i.phone || '',
      i.email || '',
      i.city || '',
      i.status,
      new Date(i.submittedAt).toLocaleDateString('en-IN'),
      `"${i.message?.replace(/"/g, '""') || ''}"`,
    ])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'widespread_inquiries.csv'
    a.click()
  }

  return (
    <div className="pt-24 sm:pt-28 pb-10 min-h-screen bg-page">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Header card */}
        <div className="rounded-[2rem] bg-white border border-stone-200/80 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs tracking-widest uppercase text-accent font-mono mb-2">Admin</p>
              <h1 className="font-display text-3xl sm:text-4xl font-light text-stone-900">Inquiries</h1>
              <p className="text-sm text-stone-500 font-body mt-2">
                Messages from the contact form — {inquiries.length} total
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={exportCSV}
                className="btn-outline rounded-xl flex items-center gap-2 text-xs py-2.5 px-4"
              >
                <Download size={14} />
                Export
              </button>
              <button
                onClick={logout}
                className="flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-xs font-body text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors"
              >
                <LogOut size={14} />
                Sign out
              </button>
            </div>
          </div>
        </div>

        {/* Status pills */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(statusCounts).map(([status, count]) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`rounded-full px-4 py-2 text-sm font-body transition-all ${
                filterStatus === status
                  ? 'bg-sage-600 text-white shadow-md'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-sage-200'
              }`}
            >
              {status}
              <span className={`ml-2 text-xs ${filterStatus === status ? 'text-stone-300' : 'text-stone-400'}`}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="rounded-[2rem] bg-white border border-stone-200/80 shadow-sm p-4 sm:p-5">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, phone, email, city..."
            className="form-input w-full"
          />
        </div>

        {/* List */}
        <div className="rounded-[2rem] bg-[#f6f3ef] border border-stone-200/60 shadow-sm p-4 sm:p-6">
          {filtered.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-stone-200">
                <Inbox size={24} className="text-stone-400" />
              </div>
              <p className="font-display text-2xl font-light text-stone-600">No inquiries yet</p>
              <p className="text-sm text-stone-500 font-body mt-2 max-w-sm mx-auto">
                {inquiries.length === 0
                  ? 'When someone submits the contact form, it will show up here.'
                  : 'Nothing matches your search or filter. Try clearing them.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-stone-500 font-body px-1 mb-2">
                Showing {filtered.length} of {inquiries.length}
              </p>
              {filtered.map(inquiry => (
                <InquiryRow
                  key={inquiry.id}
                  inquiry={inquiry}
                  onStatus={updateStatus}
                  onDelete={deleteInquiry}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
