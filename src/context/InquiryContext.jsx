import React, { createContext, useContext, useState, useEffect } from 'react'

const InquiryContext = createContext(null)

export function InquiryProvider({ children }) {
  const [inquiries, setInquiries] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('velora_inquiries')
    if (saved) setInquiries(JSON.parse(saved))
  }, [])

  const addInquiry = (data) => {
    const entry = {
      ...data,
      id: Date.now(),
      submittedAt: new Date().toISOString(),
      status: 'New',
    }
    const updated = [entry, ...inquiries]
    setInquiries(updated)
    localStorage.setItem('velora_inquiries', JSON.stringify(updated))
    return entry
  }

  const updateStatus = (id, status) => {
    const updated = inquiries.map(i => i.id === id ? { ...i, status } : i)
    setInquiries(updated)
    localStorage.setItem('velora_inquiries', JSON.stringify(updated))
  }

  const deleteInquiry = (id) => {
    const updated = inquiries.filter(i => i.id !== id)
    setInquiries(updated)
    localStorage.setItem('velora_inquiries', JSON.stringify(updated))
  }

  return (
    <InquiryContext.Provider value={{ inquiries, addInquiry, updateStatus, deleteInquiry }}>
      {children}
    </InquiryContext.Provider>
  )
}

export const useInquiries = () => useContext(InquiryContext)
