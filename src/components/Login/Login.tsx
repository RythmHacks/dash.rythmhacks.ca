import { useState } from 'react'
import { useAuth } from '../../contexts/Auth'
import logo from '../../assets/rythmhacks-circle.png'

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
    <div id='login' className='w-5/12 p-10 mr-auto ml-auto mt-[5rem] rounded-lg bg-[#121313]'>
        <p className='uppercase text-[#888] text-[0.8rem] m-0'>log in</p>
        <div className='flex justify-between items-center'>
          <h1 className='leading-normal'>Log In to RythmHacks</h1>
          <img src={logo} alt='loginlogo' className='rounded-md h-[4rem]'></img>
        </div>

        <div className="row flex-center flex w-full">
        <div className="col-6 form-widget w-full" aria-live="polite">
          <p className="text-[#bbb]">Enter your email to get a magic link</p>
          {loading ? (
            'Sending magic link...'
          ) : (
            <form onSubmit={handleLogin}>
              <input
                id="email"
                className="mb-4 px-4 py-2 w-full"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e:any) => setEmail(e.target.value)}
                required
              />
              <button className='w-full text-white'>
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