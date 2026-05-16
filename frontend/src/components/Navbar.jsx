import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className='bg-white border-b px-6 py-3 flex items-center justify-between'>
      <div className='flex items-center gap-6'>
        <Link to='/' className='text-lg font-bold text-blue-600'>TaskManager</Link>
        <Link to='/' className='text-sm text-gray-600 hover:text-gray-900'>Projects</Link>
        <Link to='/dashboard' className='text-sm text-gray-600 hover:text-gray-900'>Dashboard</Link>
      </div>
      <div className='flex items-center gap-4'>
        <span className='text-sm text-gray-600'>Hi, {user?.username}</span>
        <button onClick={handleLogout}
          className='text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg'>
          Logout
        </button>
      </div>
    </nav>
  )
}
