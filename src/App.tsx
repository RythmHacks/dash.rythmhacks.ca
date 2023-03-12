import React from 'react'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import { useAuth } from './contexts/Auth'

import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Sidebar from './components/Sidebar/Sidebar'

const App = () => {
  const { user } = useAuth()

  return (
    <div className='flex'>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={user ? <Navigate to='/dashboard' /> : <Navigate to="/login" />} />
          <Route path='/dashboard'>
            <Route index element={<Home />} />
            <Route path="test" element={<Login />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App