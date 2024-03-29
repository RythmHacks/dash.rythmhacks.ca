import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'

import { useAuth } from './contexts/Auth'
import Devpost from './pages/Devpost/Devpost';

const Login = lazy(() => import('./pages/Login/Login'))
// const Register = lazy(() => import('./pages/Register/Register'))
const Home = lazy(() => import('./pages/Home/Home'))
const Settings = lazy(() => import('./pages/Settings/Settings'))
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'))
const Notfound = lazy(() => import('./pages/Notfound/Notfound'))
const Schedule = lazy(() => import('./pages/Schedule/Schedule'))
// const HackerRegistration = lazy(() => import('./pages/Register/HackerRegistration'))
// const HackerRSVP = lazy(() => import('./pages/Register/HackerRSVP'))
const Discord = lazy(() => import('./pages/Discord/Discord'))
const Guide = lazy(() => import('./pages/Guide/Guide'))

const App = () => {
  const { user } = useAuth()

  if (!localStorage.theme) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      localStorage.theme = 'dark'
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      localStorage.theme = 'light'
    } else {
      localStorage.theme = 'dark'
    }
  }

  if (localStorage.theme === 'dark' && !document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
  }
  if (localStorage.theme === 'light' && !document.documentElement.classList.contains('light')) {
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')
  }
  
  return (
    <Suspense fallback={<div className="lazy-preloader"></div>}>
      <Routes>
          <Route index element = {(user === null) ? <Navigate to='/login' /> : <Navigate to='/dashboard' />} />
          <Route path="login" element={(user === null) ? <Login /> : <Navigate to='/dashboard' />} />
          <Route path='dashboard' element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path='schedule' element={<Schedule />} />
            <Route path="discord" element={<Discord />} />
            {/* <Route path="register" element={<Outlet/>} >
              <Route index element={<Register />} />
            <Route path='rsvp' element={<HackerRSVP />} /> */}
              {/* <Route path="hacker" element={<HackerRegistration />} /> */}
            {/* </Route> */}
            <Route path="guide" element={<Guide />} />
            <Route path="devpost" element={<Devpost />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="dashboard/*" element={<Notfound />} />
          <Route path="*" element={<Notfound />} />
      </Routes>
    </Suspense>
  )
}

export default App