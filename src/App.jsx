import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { InquiryProvider } from './context/InquiryContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-page">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-page">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <InquiryProvider>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/products" element={<Navigate to="/" state={{ scrollTo: 'brands' }} replace />} />
          <Route path="/contact" element={<Navigate to="/" state={{ scrollTo: 'connect' }} replace />} />
          <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        </Routes>
      </InquiryProvider>
    </AuthProvider>
  )
}
