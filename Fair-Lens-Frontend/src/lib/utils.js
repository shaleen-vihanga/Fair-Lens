export const cx = (...classes) => classes.filter(Boolean).join(' ')

export function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`
}

export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}