import React, { useState } from 'react'
import { UserPlus } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../state/AuthContext.jsx'
import Card from '../../components/Card.jsx'
import Input from '../../components/Input.jsx'
import Button from '../../components/Button.jsx'
import Navbar from '../../components/Navbar.jsx'

export default function Register() {
  const nav = useNavigate()
  const { register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState('Dr. Jane Doe')
  const [license, setLicense] = useState('MED-12345678')
  const [hospital, setHospital] = useState('Central Clinic')
  const [email, setEmail] = useState('jane@clinic.com')
  const [password, setPassword] = useState('password')

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await register({ name, license, hospital, email, password })
    setIsLoading(false)
    nav('/app/dashboard')
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-100 grid place-items-center p-4">
        <Card className="w-full max-w-md p-8 shadow-2xl">
          <div className="mb-8 flex flex-col items-center">
            <div className="rounded-2xl bg-blue-600 p-3 text-white">
              <UserPlus size={30} />
            </div>
            <h2 className="mt-4 text-2xl font-black">Medical Registration</h2>
            <p className="text-sm text-slate-500">Join the diagnostic network</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <Input label="Full Name" value={name} onChange={e => setName(e.target.value)} required />
            <Input label="Medical License ID" value={license} onChange={e => setLicense(e.target.value)} required />
            <Input label="Hospital / Institution" value={hospital} onChange={e => setHospital(e.target.value)} required />
            <Input label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />

            <Button variant="blue" className="w-full py-4" disabled={isLoading}>
              {isLoading ? (
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <Link to="/auth/login" className="font-bold text-blue-600 hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </Card>
      </div>
    </>
  )
}