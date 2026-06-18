import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const InquiryContext = createContext(null)

// Map a database row (snake_case columns) to the camelCase shape the UI uses.
const fromRow = (row) => ({
  id: row.id,
  name: row.name,
  email: row.email,
  phone: row.phone,
  city: row.city,
  message: row.message,
  type: row.type,
  status: row.status,
  submittedAt: row.created_at,
})

export function InquiryProvider({ children }) {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(false)

  const refresh = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) setInquiries(data.map(fromRow))
    setLoading(false)
  }, [])

  useEffect(() => {
    // Only an authenticated admin can read inquiries (enforced by RLS); fetch
    // whenever a session is present and refetch on sign-in / sign-out.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) refresh()
      else setInquiries([])
    })
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) refresh()
    })
    return () => sub.subscription.unsubscribe()
  }, [refresh])

  // Public visitors submit inquiries; RLS allows anonymous inserts only.
  const addInquiry = async (form) => {
    const { data, error } = await supabase
      .from('inquiries')
      .insert({
        name: form.name,
        email: form.email || null,
        phone: form.phone || null,
        city: form.city || null,
        message: form.message,
        type: form.type || 'Enquiry',
      })
      .select()
      .single()
    if (error) throw error
    return fromRow(data)
  }

  const updateStatus = async (id, status) => {
    const { error } = await supabase.from('inquiries').update({ status }).eq('id', id)
    if (error) throw error
    setInquiries(prev => prev.map(i => (i.id === id ? { ...i, status } : i)))
  }

  const deleteInquiry = async (id) => {
    const { error } = await supabase.from('inquiries').delete().eq('id', id)
    if (error) throw error
    setInquiries(prev => prev.filter(i => i.id !== id))
  }

  return (
    <InquiryContext.Provider value={{ inquiries, loading, addInquiry, updateStatus, deleteInquiry, refresh }}>
      {children}
    </InquiryContext.Provider>
  )
}

export const useInquiries = () => useContext(InquiryContext)
