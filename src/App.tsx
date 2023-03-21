import React from 'react';
import { Routes, Route  } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import { useAuth } from './contexts/Auth'

import Login from './components/Login/Login'
import Apply from './components/Apply/Apply'
import Home from './components/Home/Home'
import Settings from './components/Settings/Settings'
import Dashboard from './components/Dashboard/Dashboard'

const App = () => {
  const { user } = useAuth()

  return (
      <Routes>
        <Route path='/' element = {(user === null) ? <Navigate to='/login' /> : <Navigate to='/dashboard' />} />
        <Route path="/login" element={(user === null) ? <Login /> : <Navigate to='/dashboard' />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="apply" element={<Apply />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<div>404</div>} />
      </Routes>
  )
}

export default App