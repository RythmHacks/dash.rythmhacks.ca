import './Login.scss'
import { useState } from 'react'
import { useAuth } from '../../contexts/Auth'
import logo from '../../assets/logo.png'

const Login = () => {
  const { signInWithOtp, user } = useAuth()
  console.log(user)


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
          <h1 className='leading-normal'>Log In to RythmHacks</h1>
          <img src={logo} alt='loginlogo' className='rounded-full h-[4rem]'></img>
        </div>

        <div className="row flex-center flex">
        <div className="col-6 form-widget" aria-live="polite">
          <p className="description">Sign in via magic link with your email below:</p>
          {loading ? (
            'Sending magic link...'
          ) : (
            <form onSubmit={handleLogin}>
              <input
                id="email"
                className="inputField border-style-none bg-gray-100 border-solid border-2 border-gray-100 rounded w-full py-2 px-4 mb-4 text-gray-700 focus:outline-none focus:bg-white focus:border-accent"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e:any) => setEmail(e.target.value)}
                required
              />
              <button className="button block border-none rounded-md text-white text-lg font-sans bg-accent  px-3 py-1" aria-live="polite">
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