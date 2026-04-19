import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'

export default function AppShell() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto max-w-7xl">
        <Sidebar />
        <main className="md:pl-64 px-4 md:px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
