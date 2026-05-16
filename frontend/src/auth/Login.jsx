import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from './AuthContext'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/auth/login/', form)
      login(data.user, data.access, data.refresh)
      navigate('/')
    } catch {
      setError('Invalid credentials')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='bg-white p-8 rounded-xl shadow w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Sign In</h1>
        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input className='w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Username' value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })} />
          <input type='password' className='w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Password' value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })} />
          <button className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium'>
            Login
          </button>
        </form>
        <p className='text-center text-sm mt-4'>
          No account? <Link to='/signup' className='text-blue-600 hover:underline'>Sign up</Link>
        </p>
      </div>
    </div>
  )
}
