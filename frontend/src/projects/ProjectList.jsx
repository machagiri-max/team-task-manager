import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import Layout from '../components/Layout'

export default function ProjectList() {
  const [projects, setProjects] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', description: '' })

  useEffect(function() { fetchProjects() }, [])

  const fetchProjects = async function() {
    const res = await api.get('/projects/')
    setProjects(res.data)
  }

  const handleCreate = async function(e) {
    e.preventDefault()
    await api.post('/projects/', form)
    setForm({ name: '', description: '' })
    setShowForm(false)
    fetchProjects()
  }

  return (
    <Layout>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>My Projects</h1>
        <button onClick={function() { setShowForm(!showForm) }}
          className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm'>
          + New Project
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleCreate} className='bg-white p-4 rounded-xl shadow mb-6 space-y-3'>
          <input className='w-full border rounded-lg px-3 py-2 text-sm'
            placeholder='Project name' value={form.name}
            onChange={function(e) { setForm({ ...form, name: e.target.value }) }} required />
          <textarea className='w-full border rounded-lg px-3 py-2 text-sm'
            placeholder='Description' value={form.description}
            onChange={function(e) { setForm({ ...form, description: e.target.value }) }} rows={2} />
          <div className='flex gap-2'>
            <button className='bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700'>Create</button>
            <button type='button' onClick={function() { setShowForm(false) }}
              className='bg-gray-100 px-4 py-2 rounded-lg text-sm hover:bg-gray-200'>Cancel</button>
          </div>
        </form>
      )}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {projects.map(function(p) {
          return (
            <Link key={p.id} to={'/projects/' + p.id}
              className='bg-white p-5 rounded-xl shadow hover:shadow-md transition block'>
              <h2 className='font-semibold text-gray-900 mb-1'>{p.name}</h2>
              <p className='text-sm text-gray-500'>{p.description || 'No description'}</p>
              <p className='text-xs text-gray-400 mt-3'>Created by {p.created_by_username}</p>
            </Link>
          )
        })}
        {projects.length === 0 && (
          <p className='text-gray-400 text-sm col-span-3'>No projects yet. Create one!</p>
        )}
      </div>
    </Layout>
  )
}
