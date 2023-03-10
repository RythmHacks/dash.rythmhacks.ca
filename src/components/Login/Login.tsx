import { useState } from 'react'
import { useAuth } from '../../contexts/Auth'
import logo from '../../assets/rythmhacks-circle.png'
import { BsCheckCircle } from 'react-icons/bs'

const Login = () => {
  const { signInWithOtp } = useAuth()

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleLogin = async (e: any) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await signInWithOtp({ email })
      if (error) throw error
      alert(`Check your email (${email}) for the login link!`)
      setSent(true)
    } catch (error: any) {
      alert(error.error_description || error.message)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id='login' className='w-4/12 p-10 mr-auto ml-auto mt-[5rem] rounded-lg bg-[#121313] min-w-[330px]'>
        <p className='uppercase text-[#888] text-[0.8rem] m-0'>log in</p>
        <div className='flex justify-between items-center gap-4'>
          <h1 className='mt-4'>Log In to RythmHacks</h1>
          <img src={logo} alt='loginlogo' className='rounded-md h-[4rem]'></img>
        </div>

        <div className="row flex w-full mt-8">
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
              {(sent) ? <p className='items-center flex gap-2 text-[#bbb]'><BsCheckCircle/> Magic link sent successfully, you can now close this window</p> : <p></p>}
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login