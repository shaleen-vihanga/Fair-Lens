import React, { useState } from 'react'
import { LogIn } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../state/AuthContext.jsx'
import Card from '../../components/Card.jsx'
import Input from '../../components/Input.jsx'
import Button from '../../components/Button.jsx'
import Navbar from '../../components/Navbar.jsx'

export default function Login() {
  const nav = useNavigate()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('doctor@hospital.com')
  const [password, setPassword] = useState('password')

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await login({ email, password })
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
              <LogIn size={30} />
            </div>
            <h2 className="mt-4 text-2xl font-black">Doctor Login</h2>
            <p className="text-sm text-slate-500">Access your clinical dashboard</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <Input label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />

            <Button variant="blue" className="w-full py-4" disabled={isLoading}>
              {isLoading ? (
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <Link to="/auth/register" className="font-bold text-blue-600 hover:underline">
              Don’t have an account? Register
            </Link>
          </div>
        </Card>
      </div>
    </>
  )
}