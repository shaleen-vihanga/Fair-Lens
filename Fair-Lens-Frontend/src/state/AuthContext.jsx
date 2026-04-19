import React, { createContext, useContext, useMemo, useState } from 'react'
import { load, save } from '../lib/storage.js'

const AuthContext = createContext(null)
const KEY = 'ng_auth_v1'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => load(KEY, null))

  const login = async ({ email, password }) => {
    // mock auth
    await new Promise(r => setTimeout(r, 700))
    const u = {
      id: 'doc_' + Math.random().toString(16).slice(2),
      name: 'Dr. ' + (email.split('@')[0] || 'Clinician'),
      email,
      license: 'MD-' + Math.floor(10000 + Math.random() * 89999),
      hospital: 'NeuroGuard Network',
      role: 'doctor',
    }
    setUser(u)
    save(KEY, u)
    return u
  }

  const register = async ({ name, license, hospital, email, password }) => {
    await new Promise(r => setTimeout(r, 900))
    const u = {
      id: 'doc_' + Math.random().toString(16).slice(2),
      name,
      email,
      license,
      hospital,
      role: 'doctor',
    }
    setUser(u)
    save(KEY, u)
    return u
  }

  const logout = () => {
    setUser(null)
    save(KEY, null)
  }

  const value = useMemo(() => ({ user, login, register, logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)