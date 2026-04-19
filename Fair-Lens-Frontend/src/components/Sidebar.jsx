import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ClipboardList, Users, ShieldCheck } from 'lucide-react'
import { cx } from '../lib/utils.js'

export default function Sidebar() {
  const item = ({ isActive }) =>
    cx(
      "flex items-center gap-3 rounded-2xl p-3 font-bold transition",
      isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100"
    )

  return (
    <aside className="hidden md:fixed md:top-[73px] md:flex md:h-[calc(100vh-73px)] md:w-64 md:flex-col md:border-r md:border-slate-200 md:bg-white md:p-4">
      <NavLink to="/app/dashboard" className={item}>
        <LayoutDashboard size={20} /> Dashboard
      </NavLink>
      <NavLink to="/app/patients" className={item}>
        <Users size={20} /> Patients
      </NavLink>
      <NavLink to="/app/assessment/new" className={item}>
        <ClipboardList size={20} /> New Assessment
      </NavLink>

      <div className="mt-auto rounded-3xl border border-slate-100 bg-slate-50 p-4">
        <div className="mb-2 text-xs font-black uppercase text-slate-400">System Status</div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          ML Models Online
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck size={14} className="text-blue-600" />
          Frontend-only demo storage
        </div>
      </div>
    </aside>
  )
}