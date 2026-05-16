import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'

export default function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/auth/register/', form)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.detail || 'Signup failed')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='bg-white p-8 rounded-xl shadow w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Create Account</h1>
        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input className='w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Username' value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })} />
          <input type='email' className='w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Email' value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} />
          <input type='password' className='w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Password' value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })} />
          <button className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium'>
            Sign Up
          </button>
        </form>
        <p className='text-center text-sm mt-4'>
          Have an account? <Link to='/login' className='text-blue-600 hover:underline'>Login</Link>
        </p>
      </div>
    </div>
  )
}
