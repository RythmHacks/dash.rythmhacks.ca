import React from 'react'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import { useAuth } from './contexts/Auth'

import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'



const App = () => {
  const { user } = useAuth()
 
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App