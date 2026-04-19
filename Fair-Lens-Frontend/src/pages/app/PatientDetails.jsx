import React, { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ClipboardList, ArrowLeft } from 'lucide-react'
import { useData } from '../../state/DataContext.jsx'
import Card from '../../components/Card.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import Button from '../../components/Button.jsx'
import RiskBadge from '../../components/RiskBadge.jsx'

export default function PatientDetails() {
  const { id } = useParams()
  const nav = useNavigate()
  const { patients } = useData()

  const patient = useMemo(() => patients.find(p => p.id === id), [patients, id])

  if (!patient) {
    return (
      <div className="max-w-4xl">
        <Button variant="ghost" onClick={() => nav(-1)}><ArrowLeft size={16} /> Back</Button>
        <div className="mt-6 text-slate-600">Patient not found.</div>
      </div>
    )
  }

  const assessments = patient.assessments || []

  return (
    <div className="max-w-5xl space-y-6">
      <PageHeader
        title={patient.name}
        subtitle={`${patient.gender} • Age ${patient.age} • ${patient.residence}`}
        right={
          <>
            <RiskBadge status={patient.lastRisk} />
            <Button variant="blue" onClick={() => nav('/app/assessment/new')}>
              <ClipboardList size={16} /> New Assessment
            </Button>
          </>
        }
      />

      <Card className="p-6">
        <div className="text-sm font-black text-slate-900">Assessment History</div>
        <div className="mt-4 space-y-3">
          {!assessments.length && (
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-slate-600">
              No assessments yet. Create a new assessment to populate history.
            </div>
          )}

          {assessments.map((a) => (
            <div key={a.id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4">
              <div>
                <div className="font-black text-slate-900">{new Date(a.createdAt).toLocaleString()}</div>
                <div className="text-xs text-slate-500">Probability: {a.result?.probability}%</div>
              </div>
              <RiskBadge status={a.result?.status} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}