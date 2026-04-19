import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Plus } from 'lucide-react'
import { useData } from '../../state/DataContext.jsx'
import Card from '../../components/Card.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import Button from '../../components/Button.jsx'
import RiskBadge from '../../components/RiskBadge.jsx'
import Input from '../../components/Input.jsx'
import { uid } from '../../lib/utils.js'

export default function Patients() {
  const nav = useNavigate()
  const { patients, upsertPatient } = useData()
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('All')

  const rows = useMemo(() => {
    const text = q.trim().toLowerCase()
    return patients
      .filter(p => (filter === 'All' ? true : p.lastRisk === filter))
      .filter(p => (text ? p.name.toLowerCase().includes(text) : true))
  }, [patients, q, filter])

  const quickAdd = () => {
    const p = {
      id: uid('pat'),
      name: 'New Patient ' + Math.floor(Math.random() * 99),
      gender: 'Male',
      age: 50,
      residence: 'Urban',
      lastRisk: 'Low Risk',
      assessments: [],
    }
    upsertPatient(p)
    nav(`/app/patients/${p.id}`)
  }

  return (
    <div className="max-w-6xl">
      <PageHeader
        title="Patients"
        subtitle="Search and open patient records. Data persists in localStorage (demo)."
        right={
          <>
            <Button variant="soft" onClick={quickAdd}><Plus size={16} /> Quick Add</Button>
            <Button variant="blue" onClick={() => nav('/app/assessment/new')}>New Assessment</Button>
          </>
        }
      />

      <div className="mb-4 grid gap-3 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Search size={18} /></span>
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search by patient name..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block">
            <div className="ml-1 text-xs font-black uppercase tracking-wider text-slate-400">Filter by Risk</div>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white p-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All</option>
              <option>Low Risk</option>
              <option>Moderate</option>
              <option>High Risk</option>
            </select>
          </label>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="grid grid-cols-12 border-b border-slate-100 bg-slate-50 px-6 py-3 text-xs font-black uppercase text-slate-500">
          <div className="col-span-5">Patient</div>
          <div className="col-span-2">Age</div>
          <div className="col-span-3">Residence</div>
          <div className="col-span-2">Risk</div>
        </div>

        {rows.map(p => (
          <Link
            key={p.id}
            to={`/app/patients/${p.id}`}
            className="grid grid-cols-12 items-center px-6 py-4 hover:bg-slate-50 transition"
          >
            <div className="col-span-5">
              <div className="font-black text-slate-900">{p.name}</div>
              <div className="text-xs text-slate-500">{p.gender}</div>
            </div>
            <div className="col-span-2 font-bold text-slate-700">{p.age}</div>
            <div className="col-span-3 text-slate-600">{p.residence}</div>
            <div className="col-span-2"><RiskBadge status={p.lastRisk} /></div>
          </Link>
        ))}

        {!rows.length && (
          <div className="p-8 text-center text-slate-500">
            No patients match your search/filter.
          </div>
        )}
      </Card>
    </div>
  )
}
``