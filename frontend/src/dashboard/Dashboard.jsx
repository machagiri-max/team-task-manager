import { useState, useEffect } from 'react'
import api from '../api/axios'
import Layout from '../components/Layout'

export default function Dashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    api.get('/dashboard/').then(function(res) { setStats(res.data) })
  }, [])

  if (!stats) return <Layout><p className='text-gray-400'>Loading...</p></Layout>

  const statusMap = {}
  if (stats.by_status) stats.by_status.forEach(function(s) { statusMap[s.status] = s.count })

  return (
    <Layout>
      <h1 className='text-2xl font-bold mb-6'>Dashboard</h1>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
        <StatCard label='Total Tasks' value={stats.total_tasks} color='bg-blue-50 text-blue-700' />
        <StatCard label='To Do' value={statusMap.todo || 0} color='bg-gray-50 text-gray-700' />
        <StatCard label='In Progress' value={statusMap.in_progress || 0} color='bg-yellow-50 text-yellow-700' />
        <StatCard label='Overdue' value={stats.overdue} color='bg-red-50 text-red-700' />
      </div>
      <div className='bg-white rounded-xl shadow p-5'>
        <h2 className='font-semibold mb-4'>Tasks per user</h2>
        {stats.by_user && stats.by_user.map(function(u, i) {
          const pct = Math.min((u.count / stats.total_tasks) * 100, 100) + '%'
          return (
            <div key={i} className='flex items-center gap-3 mb-2'>
              <span className='text-sm w-32 text-gray-600 truncate'>{u.assigned_to__username || 'Unassigned'}</span>
              <div className='flex-1 bg-gray-100 rounded-full h-2'>
                <div className='bg-blue-500 h-2 rounded-full' style={{ width: pct }} />
              </div>
              <span className='text-sm text-gray-500 w-6 text-right'>{u.count}</span>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

function StatCard({ label, value, color }) {
  return (
    <div className={color + ' rounded-xl p-4'}>
      <p className='text-3xl font-bold'>{value}</p>
      <p className='text-sm mt-1 opacity-80'>{label}</p>
    </div>
  )
}
