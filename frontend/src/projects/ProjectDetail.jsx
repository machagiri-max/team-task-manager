import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'
import Layout from '../components/Layout'
import TaskBoard from '../tasks/TaskBoard'
import { useAuth } from '../auth/AuthContext'

export default function ProjectDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [project, setProject] = useState(null)
  const [members, setMembers] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [newMember, setNewMember] = useState('')

  useEffect(function() { fetchProject() }, [id])

  const fetchProject = async function() {
    const res = await api.get('/projects/' + id + '/')
    setProject(res.data)
    setMembers(res.data.members || [])
    const me = res.data.members && res.data.members.find(function(m) { return m.username === (user && user.username) })
    setIsAdmin(me && me.role === 'admin')
  }

  const addMember = async function(e) {
    e.preventDefault()
    try {
      await api.post('/projects/' + id + '/members/', { username: newMember })
      setNewMember('')
      fetchProject()
    } catch(err) { alert('User not found') }
  }

  const removeMember = async function(userId) {
    await api.delete('/projects/' + id + '/members/' + userId + '/')
    fetchProject()
  }

  if (!project) return <Layout><p className='text-gray-400'>Loading...</p></Layout>

  return (
    <Layout>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold'>{project.name}</h1>
        <p className='text-gray-500 text-sm mt-1'>{project.description}</p>
      </div>
      {isAdmin && (
        <div className='bg-white rounded-xl shadow p-4 mb-6'>
          <h2 className='font-semibold mb-3'>Members</h2>
          <div className='flex flex-wrap gap-2 mb-3'>
            {members.map(function(m) {
              return (
                <div key={m.id} className='flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm'>
                  <span>{m.username} ({m.role})</span>
                  {m.username !== (user && user.username) && (
                    <button onClick={function() { removeMember(m.user_id) }}
                      className='text-red-400 hover:text-red-600 text-xs'>x</button>
                  )}
                </div>
              )
            })}
          </div>
          <form onSubmit={addMember} className='flex gap-2'>
            <input className='border rounded-lg px-3 py-1 text-sm flex-1'
              placeholder='Username to add' value={newMember}
              onChange={function(e) { setNewMember(e.target.value) }} />
            <button className='bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700'>Add</button>
          </form>
        </div>
      )}
      <TaskBoard projectId={id} isAdmin={isAdmin} members={members} />
    </Layout>
  )
}
