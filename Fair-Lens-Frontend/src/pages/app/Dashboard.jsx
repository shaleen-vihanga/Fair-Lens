import React from 'react'
import { Activity, AlertTriangle, CheckCircle, TrendingUp, Users } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from 'recharts'
import { useAuth } from '../../state/AuthContext.jsx'
import { useData } from '../../state/DataContext.jsx'
import Card from '../../components/Card.jsx'
import PageHeader from '../../components/PageHeader.jsx'

function Stat({ icon: Icon, label, val, hint, color }) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className={`rounded-2xl bg-slate-50 p-3 ${color}`}>
          <Icon size={24} />
        </div>
        <span className="rounded-lg bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-600">
          {hint}
        </span>
      </div>
      <div className="mt-4 text-xs font-black uppercase text-slate-400">{label}</div>
      <div className="text-2xl font-black text-slate-900">{val}</div>
    </Card>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const { trends, patients } = useData()

  const total = patients.length
  const highRisk = patients.filter(p => p.lastRisk === 'High Risk').length

  return (
    <div className="max-w-6xl space-y-8">
      <PageHeader
        title="Clinical Overview"
        subtitle={`Welcome back, ${user?.name}. Here's what's happening today.`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Activity} label="Total Patients" val={String(total)} hint="Live" color="text-blue-600" />
        <Stat icon={AlertTriangle} label="High Risk Cases" val={String(highRisk)} hint="+5%" color="text-amber-600" />
        <Stat icon={CheckCircle} label="Model Health" val="Online" hint="OK" color="text-emerald-600" />
        <Stat icon={TrendingUp} label="Active Alerts" val="3" hint="Stable" color="text-indigo-600" />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="h-[400px] p-6">
          <h3 className="mb-6 flex items-center gap-2 text-lg font-black">
            <TrendingUp className="text-blue-600" size={20} /> Stroke Risk Trends (6 Months)
          </h3>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 16, border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="screenings" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="highRisk" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="h-[400px] p-6">
          <h3 className="mb-6 flex items-center gap-2 text-lg font-black">
            <Users className="text-blue-600" size={20} /> Risk Distribution (Patients)
          </h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={[
              { name: 'Low', count: patients.filter(p => p.lastRisk === 'Low Risk').length },
              { name: 'Moderate', count: patients.filter(p => p.lastRisk === 'Moderate').length },
              { name: 'High', count: patients.filter(p => p.lastRisk === 'High Risk').length },
            ]}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Bar dataKey="count" radius={[12, 12, 0, 0]}>
                {['#10b981', '#f59e0b', '#ef4444'].map((c, i) => (
                  <Cell key={i} fill={c} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}