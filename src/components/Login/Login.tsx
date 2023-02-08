import './Login.scss'
import { useState } from 'react'
import { useAuth } from '../../contexts/Auth'
import logo from '../../assets/logo.png'

const Login = () => {
  const { signInWithOtp } = useAuth()

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (e: any) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await signInWithOtp({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error: any) {
      alert(error.error_description || error.message)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id='login' className='mr-auto ml-auto mt-[5rem]'>
        <p className='uppercase text-[#888] desc m-0'>log in</p>
        <div className='flex justify-between items-center'>
          <h1 className=''>Log In to RythmHacks</h1>
          <img src={logo} alt='loginlogo' className='rounded-full h-[4rem]'></img>
        </div>

        <form>
          
        </form>
        <div className="row flex-center flex">
        <div className="col-6 form-widget" aria-live="polite">
          <h1 className="header">Supabase + React</h1>
          <p className="description">Sign in via magic link with your email below</p>
          {loading ? (
            'Sending magic link...'
          ) : (
            <form onSubmit={handleLogin}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="inputField"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e:any) => setEmail(e.target.value)}
              />
              <button className="button block" aria-live="polite">
                Send magic link
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login