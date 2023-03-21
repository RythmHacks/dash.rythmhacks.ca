import React, { lazy } from 'react';
import { Routes, Route  } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import { useAuth } from './contexts/Auth'

const Login = lazy(() => import('./components/Login/Login'))
const Apply = lazy(() => import('./components/Apply/Apply'))
const Home = lazy(() => import('./components/Home/Home'))
const Settings = lazy(() => import('./components/Settings/Settings'))
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'))

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