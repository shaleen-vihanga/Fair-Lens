import React from 'react'
import { Activity, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'
import Button from './Button.jsx'

export default function Navbar() {
  const nav = useNavigate()
  const { user, logout } = useAuth()

  return (
    <div className="fixed top-0 left-0 right-0 z-40 border-b border-slate-200 bg-slate-900/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <button
          onClick={() => nav(user ? '/app/dashboard' : '/')}
          className="flex items-center gap-2 text-white"
        >
          <Activity className="text-blue-400" />
          <span className="text-lg font-black tracking-tight uppercase">Fair Lens</span>
        </button>

        {user ? (
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <div className="text-sm font-bold text-white">{user.name}</div>
              <div className="text-xs text-slate-400">{user.license} • {user.hospital}</div>
            </div>
            <Button
              variant="dangerSoft"
              onClick={() => { logout(); nav('/'); }}
            >
              <LogOut size={16} /> Logout
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => nav('/auth/login')} className="text-white hover:bg-white/10">
              Login
            </Button>
            <Button variant="blue" onClick={() => nav('/auth/register')}>
              Join Network
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}