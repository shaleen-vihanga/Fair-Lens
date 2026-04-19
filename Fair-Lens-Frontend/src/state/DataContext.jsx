import React, { createContext, useContext, useMemo, useState } from 'react'
import { load, save } from '../lib/storage.js'
import { seedPatients, seedTrends } from '../data/seed.js'

const DataContext = createContext(null)

const PATIENTS_KEY = 'ng_patients_v1'
const TRENDS_KEY = 'ng_trends_v1'

export function DataProvider({ children }) {
  const [patients, setPatients] = useState(() => load(PATIENTS_KEY, seedPatients()))
  const [trends] = useState(() => load(TRENDS_KEY, seedTrends()))

  const upsertPatient = (patient) => {
    setPatients(prev => {
      const exists = prev.some(p => p.id === patient.id)
      const next = exists ? prev.map(p => (p.id === patient.id ? patient : p)) : [patient, ...prev]
      save(PATIENTS_KEY, next)
      return next
    })
  }

  const addAssessment = (patientId, assessment) => {
    setPatients(prev => {
      const next = prev.map(p => {
        if (p.id !== patientId) return p
        const assessments = [assessment, ...(p.assessments || [])]
        return { ...p, assessments, lastRisk: assessment.result?.status || p.lastRisk }
      })
      save(PATIENTS_KEY, next)
      return next
    })
  }

  const value = useMemo(() => ({
    patients,
    trends,
    upsertPatient,
    addAssessment,
  }), [patients, trends])

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => useContext(DataContext)