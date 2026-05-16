import { useState, useEffect } from 'react'
import api from '../api/axios'
import TaskCard from './TaskCard'
import TaskForm from './TaskForm'

const COLUMNS = [
  { key: 'todo', label: 'To Do', color: 'bg-gray-100' },
  { key: 'in_progress', label: 'In Progress', color: 'bg-blue-50' },
  { key: 'done', label: 'Done', color: 'bg-green-50' },
]

export default function TaskBoard({ projectId, isAdmin, members }) {
  const [tasks, setTasks] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(function() { fetchTasks() }, [projectId])

  const fetchTasks = async function() {
    const res = await api.get('/projects/' + projectId + '/tasks/')
    setTasks(res.data)
  }

  const updateStatus = async function(taskId, status) {
    await api.patch('/tasks/' + taskId + '/', { status: status })
    fetchTasks()
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='font-semibold text-lg'>Tasks</h2>
        {isAdmin && (
          <button onClick={function() { setShowForm(true) }}
            className='bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700'>
            + Add Task
          </button>
        )}
      </div>
      {showForm && (
        <TaskForm projectId={projectId} members={members}
          onClose={function() { setShowForm(false) }} onSaved={fetchTasks} />
      )}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {COLUMNS.map(function(col) {
          return (
            <div key={col.key} className={col.color + ' rounded-xl p-4 min-h-40'}>
              <h3 className='font-medium text-sm text-gray-600 mb-3'>
                {col.label}
                <span className='ml-2 bg-white text-gray-500 text-xs px-2 py-0.5 rounded-full'>
                  {tasks.filter(function(t) { return t.status === col.key }).length}
                </span>
              </h3>
              <div className='space-y-2'>
                {tasks.filter(function(t) { return t.status === col.key }).map(function(task) {
                  return (
                    <TaskCard key={task.id} task={task}
                      isAdmin={isAdmin} onStatusChange={updateStatus} onUpdated={fetchTasks} />
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
