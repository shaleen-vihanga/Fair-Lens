import React from 'react'
import { cx } from '../lib/utils.js'

export default function RiskBadge({ status }) {
  const map = {
    'High Risk': 'bg-red-500 text-white',
    'Moderate': 'bg-amber-500 text-white',
    'Low Risk': 'bg-emerald-500 text-white',
  }
  return (
    <span className={cx("inline-flex items-center rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest",
      map[status] || "bg-slate-200 text-slate-700"
    )}>
      {status || 'Unknown'}
    </span>
  )
}