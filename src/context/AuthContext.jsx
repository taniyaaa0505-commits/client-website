import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const ADMIN_EMAIL = 'taniyaaa0505@gmail.com'
const ADMIN_PASSWORD = 'admin@velora2024'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('velora_user')
    if (saved) setUser(JSON.parse(saved))
  }, [])

  const login = (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const userData = { email, role: 'admin', name: 'Admin' }
      setUser(userData)
      localStorage.setItem('velora_user', JSON.stringify(userData))
      setLoginError('')
      return true
    } else {
      setLoginError('Invalid credentials. Access restricted.')
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('velora_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loginError, setLoginError }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
