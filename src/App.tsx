import React from 'react'
import Login from './components/Login/Login'
import { AuthProvider } from './contexts/Auth'


const App = () => {
  return (
    <div>
      <AuthProvider><Login /></AuthProvider>

    </div>
  )
}

export default App