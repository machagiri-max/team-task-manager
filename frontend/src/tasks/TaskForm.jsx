import { useState } from 'react'
import api from '../api/axios'

export default function TaskForm({ projectId, members, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: '', description: '', priority: 'medium', due_date: '', assigned_to: ''
  })

  const handleSubmit = async function(e) {
    e.preventDefault()
    const payload = { ...form, assigned_to: form.assigned_to || null }
    await api.post('/projects/' + projectId + '/tasks/', payload)
    onSaved()
    onClose()
  }

  return (
    <div className='bg-white rounded-xl shadow p-4 mb-4 border border-blue-100'>
      <h3 className='font-semibold mb-3'>New Task</h3>
      <form onSubmit={handleSubmit} className='space-y-3'>
        <input className='w-full border rounded-lg px-3 py-2 text-sm'
          placeholder='Title' value={form.title}
          onChange={function(e) { setForm({ ...form, title: e.target.value }) }} required />
        <textarea className='w-full border rounded-lg px-3 py-2 text-sm'
          placeholder='Description' rows={2} value={form.description}
          onChange={function(e) { setForm({ ...form, description: e.target.value }) }} />
        <div className='grid grid-cols-2 gap-3'>
          <select className='border rounded-lg px-3 py-2 text-sm'
            value={form.priority} onChange={function(e) { setForm({ ...form, priority: e.target.value }) }}>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>
          <input type='date' className='border rounded-lg px-3 py-2 text-sm'
            value={form.due_date} onChange={function(e) { setForm({ ...form, due_date: e.target.value }) }} />
        </div>
        <select className='w-full border rounded-lg px-3 py-2 text-sm'
          value={form.assigned_to} onChange={function(e) { setForm({ ...form, assigned_to: e.target.value }) }}>
          <option value=''>Unassigned</option>
          {members.map(function(m) {
            return <option key={m.user_id} value={m.user_id}>{m.username}</option>
          })}
        </select>
        <div className='flex gap-2'>
          <button className='bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700'>Create</button>
          <button type='button' onClick={onClose}
            className='bg-gray-100 px-4 py-2 rounded-lg text-sm hover:bg-gray-200'>Cancel</button>
        </div>
      </form>
    </div>
  )
}
