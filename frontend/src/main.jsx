import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Login from './auth/Login'
import Signup from './auth/Signup'
import ProjectList from './projects/ProjectList'
import ProjectDetail from './projects/ProjectDetail'
import Dashboard from './dashboard/Dashboard'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<PrivateRoute><ProjectList /></PrivateRoute>} />
          <Route path='/projects/:id' element={<PrivateRoute><ProjectDetail /></PrivateRoute>} />
          <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
