import React from 'react'

export default function Input({ label, ...props }) {
  return (
    <label className="block">
      {label && <div className="ml-1 text-xs font-black uppercase tracking-wider text-slate-400">{label}</div>}
      <input
        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </label>
  )
}