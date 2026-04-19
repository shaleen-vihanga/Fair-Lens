import React from 'react'
import { cx } from '../lib/utils.js'

export default function Button({ className, variant="primary", ...props }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 font-bold transition active:scale-[0.99]"
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-black shadow-lg",
    blue: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
    soft: "bg-slate-100 text-slate-900 hover:bg-slate-200",
    dangerSoft: "bg-red-500/10 text-red-600 hover:bg-red-500/20",
  }
  return <button className={cx(base, variants[variant], className)} {...props} />
}