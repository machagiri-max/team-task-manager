import api from '../api/axios'

const PRIORITY_COLORS = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
}

const STATUS_NEXT = { todo: 'in_progress', in_progress: 'done', done: 'todo' }
const STATUS_LABEL = { todo: 'Start', in_progress: 'Done', done: 'Reset' }

export default function TaskCard({ task, isAdmin, onStatusChange, onUpdated }) {
  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== 'done'

  const handleDelete = async function() {
    if (window.confirm('Delete this task?')) {
      await api.delete('/tasks/' + task.id + '/')
      onUpdated()
    }
  }

  const borderClass = isOverdue ? 'border-red-300' : 'border-transparent'
  const priorityClass = PRIORITY_COLORS[task.priority]

  return (
    <div className={'bg-white rounded-lg p-3 shadow-sm border ' + borderClass}>
      <div className='flex items-start justify-between gap-2'>
        <p className='font-medium text-sm text-gray-800'>{task.title}</p>
        <span className={'text-xs px-2 py-0.5 rounded-full shrink-0 ' + priorityClass}>
          {task.priority}
        </span>
      </div>
      {task.description && <p className='text-xs text-gray-500 mt-1'>{task.description}</p>}
      <div className='flex items-center justify-between mt-2'>
        <div className='text-xs text-gray-400'>
          {task.assigned_to_username && <p>User: {task.assigned_to_username}</p>}
          {task.due_date && <p className={isOverdue ? 'text-red-500' : ''}> Due: {task.due_date}</p>}
        </div>
        <div className='flex gap-1'>
          <button onClick={function() { onStatusChange(task.id, STATUS_NEXT[task.status]) }}
            className='text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded'>
            {STATUS_LABEL[task.status]}
          </button>
          {isAdmin && (
            <button onClick={handleDelete}
              className='text-xs bg-red-50 hover:bg-red-100 text-red-500 px-2 py-1 rounded'>
              Del
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
