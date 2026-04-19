import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Activity, BrainCircuit, ClipboardList, Database, Stethoscope, Users } from 'lucide-react'
import Card from '../../components/Card.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import Button from '../../components/Button.jsx'
import Input from '../../components/Input.jsx'
import Select from '../../components/Select.jsx'
import RiskBadge from '../../components/RiskBadge.jsx'
import { useData } from '../../state/DataContext.jsx'
import { uid, clamp } from '../../lib/utils.js'

export default function NewAssessment() {
  const nav = useNavigate()
  const { patients, addAssessment } = useData()
  const [isLoading, setIsLoading] = useState(false)
  const [predictionResult, setPredictionResult] = useState(null)

  const [formData, setFormData] = useState({
    patientId: patients?.[0]?.id || '',
    patient_name: '',
    gender: 'Male',
    age: '',
    hypertension: '0',
    heart_disease: '0',
    ever_married: 'Yes',
    work_type: 'Private',
    Residence_type: 'Urban',
    avg_glucose_level: '',
    bmi: '',
    smoking_status: 'Never_smoked'
  })

  const chosenPatient = useMemo(
    () => patients.find(p => p.id === formData.patientId),
    [patients, formData.patientId]
  )

  const runPrediction = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setPredictionResult(null)

    // Simulated pipeline: RF -> RL adjust -> correction
    setTimeout(() => {
      const age = parseFloat(formData.age || chosenPatient?.age || 0)
      const glucose = parseFloat(formData.avg_glucose_level || 0)
      const bmi = parseFloat(formData.bmi || 0)
      const hyper = Number(formData.hypertension)
      const heart = Number(formData.heart_disease)

      // baseline “RF-ish” score
      let rf = Math.random() * 0.55
      rf += clamp((age - 45) / 100, 0, 0.25)
      rf += clamp((glucose - 110) / 300, 0, 0.20)
      rf += clamp((bmi - 25) / 100, 0, 0.10)
      rf += (hyper ? 0.08 : 0)
      rf += (heart ? 0.10 : 0)
      rf = clamp(rf, 0.05, 0.92)

      // RL agent adjustment
      const rlAdjustment = age > 65 ? 0.12 : -0.05

      // correction layer
      const corrected = clamp(rf + rlAdjustment, 0.05, 0.95)

      const status =
        corrected > 0.60 ? 'High Risk' :
        corrected > 0.30 ? 'Moderate' : 'Low Risk'

      const result = {
        probability: (corrected * 100).toFixed(1),
        status,
        pipeline: [
          { name: 'Random Forest Baseline', val: (rf * 100).toFixed(0) + '%' },
          { name: 'RL Agent Refinement', val: (rlAdjustment > 0 ? '+' : '') + (rlAdjustment * 100).toFixed(0) + '%' },
          { name: 'Clinical Correction', val: 'Applied' }
        ]
      }

      setPredictionResult(result)

      // save into patient assessments
      const assessment = {
        id: uid('asm'),
        createdAt: new Date().toISOString(),
        input: { ...formData, patient_name: chosenPatient?.name || formData.patient_name },
        result
      }

      addAssessment(formData.patientId, assessment)
      setIsLoading(false)
    }, 1600)
  }

  return (
    <div className="max-w-6xl">
      <PageHeader
        title="New Patient Assessment"
        subtitle="Fill clinical data to generate a risk estimate and store it in the patient record."
        right={<Button variant="soft" onClick={() => nav('/app/patients')}>Patients</Button>}
      />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8">
            <form onSubmit={runPrediction} className="space-y-8">
              <div className="grid gap-4 md:grid-cols-2">
                <Select
                  label="Select Patient"
                  value={formData.patientId}
                  onChange={e => setFormData(s => ({ ...s, patientId: e.target.value }))}
                >
                  {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </Select>

                <Input
                  label="Patient Full Name (override)"
                  value={formData.patient_name}
                  onChange={e => setFormData(s => ({ ...s, patient_name: e.target.value }))}
                  placeholder={chosenPatient?.name || "John Doe"}
                />
              </div>

              <section>
                <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase text-blue-600">
                  <Users size={16} /> Demographics
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input label="Age" type="number" value={formData.age} onChange={e => setFormData(s => ({ ...s, age: e.target.value }))} placeholder={chosenPatient?.age || "67"} required />
                  <Select label="Gender" value={formData.gender} onChange={e => setFormData(s => ({ ...s, gender: e.target.value }))}>
                    <option>Male</option>
                    <option>Female</option>
                  </Select>
                  <Select label="Married" value={formData.ever_married} onChange={e => setFormData(s => ({ ...s, ever_married: e.target.value }))}>
                    <option>Yes</option>
                    <option>No</option>
                  </Select>
                  <Select label="Residence" value={formData.Residence_type} onChange={e => setFormData(s => ({ ...s, Residence_type: e.target.value }))}>
                    <option>Urban</option>
                    <option>Rural</option>
                  </Select>
                </div>
              </section>

              <section>
                <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase text-blue-600">
                  <Stethoscope size={16} /> Clinical Metrics
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Select label="Hypertension (0/1)" value={formData.hypertension} onChange={e => setFormData(s => ({ ...s, hypertension: e.target.value }))}>
                    <option value="0">No (0)</option>
                    <option value="1">Yes (1)</option>
                  </Select>
                  <Select label="Heart Disease (0/1)" value={formData.heart_disease} onChange={e => setFormData(s => ({ ...s, heart_disease: e.target.value }))}>
                    <option value="0">No (0)</option>
                    <option value="1">Yes (1)</option>
                  </Select>
                  <Input label="Avg Glucose Level" type="number" step="0.01" value={formData.avg_glucose_level} onChange={e => setFormData(s => ({ ...s, avg_glucose_level: e.target.value }))} placeholder="228.67" required />
                  <Input label="BMI" type="number" step="0.1" value={formData.bmi} onChange={e => setFormData(s => ({ ...s, bmi: e.target.value }))} placeholder="36.6" required />
                </div>
              </section>

              <section>
                <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase text-blue-600">
                  <Activity size={16} /> Lifestyle & Work
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Select label="Work Type" value={formData.work_type} onChange={e => setFormData(s => ({ ...s, work_type: e.target.value }))}>
                    <option>Private</option>
                    <option>Self-employed</option>
                    <option>Govt_job</option>
                    <option>Children</option>
                    <option>Never_worked</option>
                  </Select>
                  <Select label="Smoking Status" value={formData.smoking_status} onChange={e => setFormData(s => ({ ...s, smoking_status: e.target.value }))}>
                    <option>Never_smoked</option>
                    <option>Formerly_smoked</option>
                    <option>smokes</option>
                    <option>Unknown</option>
                  </Select>
                </div>
              </section>

              <Button variant="primary" className="w-full py-5" disabled={isLoading}>
                {isLoading ? (
                  <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <>
                    <BrainCircuit size={20} />
                    Compute Risk Analysis
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>

        {/* Pipeline Result */}
        <div className="space-y-6">
          <div className="sticky top-24">
            <Card className="bg-slate-900 p-8 text-white shadow-xl border-white/10">
              <div className="mb-6 flex items-center gap-2 border-b border-white/10 pb-4 text-lg font-black">
                <Database size={20} className="text-blue-400" /> Pipeline Result
              </div>

              {!predictionResult ? (
                <div className="py-10 text-center text-slate-400">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                    <Activity size={32} />
                  </div>
                  <p className="text-sm">Submit patient data to run ML analysis pipeline.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="text-xs font-black uppercase tracking-widest text-blue-400">Estimated Probability</div>
                    <div className="mt-2 text-6xl font-black">{predictionResult.probability}%</div>
                    <div className="mt-4 flex justify-center">
                      <RiskBadge status={predictionResult.status} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-black uppercase text-slate-400">Process Audit</div>
                    {predictionResult.pipeline.map((step, i) => (
                      <div key={i} className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                        <span className="text-sm font-bold text-slate-200">{step.name}</span>
                        <span className="text-sm font-black text-blue-300">{step.val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
                    <p className="text-[11px] leading-relaxed text-blue-200">
                      Demo output: baseline scoring + adjustment + correction layer. Stored in patient record (localStorage).
                    </p>
                  </div>

                  <Button
                    variant="soft"
                    className="w-full"
                    onClick={() => window.print()}
                  >
                    <ClipboardList size={18} /> Print Report
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
