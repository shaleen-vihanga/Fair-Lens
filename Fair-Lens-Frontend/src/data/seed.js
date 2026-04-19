import { uid } from '../lib/utils.js'

export function seedTrends() {
  return [
    { month: 'Jan', screenings: 45, highRisk: 12 },
    { month: 'Feb', screenings: 52, highRisk: 15 },
    { month: 'Mar', screenings: 48, highRisk: 10 },
    { month: 'Apr', screenings: 70, highRisk: 22 },
    { month: 'May', screenings: 61, highRisk: 18 },
    { month: 'Jun', screenings: 85, highRisk: 25 },
  ]
}

export function seedPatients() {
  return [
    {
      id: uid('pat'),
      name: 'John Perera',
      gender: 'Male',
      age: 67,
      residence: 'Urban',
      lastRisk: 'Moderate',
      assessments: [],
    },
    {
      id: uid('pat'),
      name: 'Ayesha Fernando',
      gender: 'Female',
      age: 73,
      residence: 'Rural',
      lastRisk: 'High Risk',
      assessments: [],
    },
    {
      id: uid('pat'),
      name: 'Malith Silva',
      gender: 'Male',
      age: 54,
      residence: 'Urban',
      lastRisk: 'Low Risk',
      assessments: [],
    },
  ]
}