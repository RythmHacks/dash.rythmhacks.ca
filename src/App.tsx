import { Routes, Route  } from 'react-router-dom'
import { Navigate, useLocation, Link } from 'react-router-dom'

import { useAuth } from './contexts/Auth'

import Login from './components/Login/Login'
import Apply from './components/Apply/Apply'
import Home from './components/Home/Home'
import Sidebar from './components/Sidebar/Sidebar'

const App = () => {
  const { user } = useAuth()
  const location = useLocation();
  
  return (
    <div className='flex'>
      <Sidebar />
      <Routes>
        <Route path='/' element = {(user === null) ? <Navigate to='/login' /> : <Navigate to='/dashboard' />} />
        <Route path="/login" element={(user === null) ? <Login /> : <Navigate to='/dashboard' />} />
      </Routes>
      {(user === null && location.pathname !== '/login') ? <div>You're not logged in! Click <Link to='/login'>here</Link> to be redirected to the login page.</div> : 
      <Routes>
        <Route path='/dashboard'>
          <Route index element={<Home />} />
          <Route path="apply" element={<Apply />} />
        </Route>
        <Route path="*" element={<div>404</div>} />
      </Routes>
      }
    </div>
  )
}

export default App