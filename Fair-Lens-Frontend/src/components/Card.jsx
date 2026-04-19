import React from 'react'
import { cx } from '../lib/utils.js'

export default function Card({ className, children }) {
  return (
    <div className={cx(
      "rounded-3xl border border-slate-100 bg-white shadow-sm",
      "transition hover:shadow-md",
      className
    )}>
      {children}
    </div>
  )
}
