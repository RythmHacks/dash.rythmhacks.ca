import { useState } from 'react'
import { useAuth } from '../../contexts/Auth'
import logo from '../../assets/rythmhacks-circle.png'
import { BsCheckCircle } from 'react-icons/bs'
import Modal from '../../components/Modal/Modal'

const helpModalFAQ = [
  { 
    question: "What's a magic link?",
    answer: "A magic link is a simple way for you to sign up or log in without having to use a password. All you have to do is enter your email, then go to your email inbox and click on the link we sent you, and you'll be logged in! It's very similar to the process of resetting a password." 
  },
  // { 
  //   question: "Why not use passwords?",
  //   answer: "Using passwords can be problematic because they are typically not as secure as other methods. Passwords can be easily forgotten or stolen, especially if they are weak or reused. Moreover, having to create and remember can be quite inconvenient."
  // },
  {
    question: "How do I sign up?",
    answer: "The magic link doubles for logging in and signing up! On the log in page, just input your email and click the button. After you go to your email inbox and click the magic link, we'll create an account for you and you'll then go through the sign up process."
  },
  {
    question: "Why haven't I received the link in my inbox?",
    answer: "The link usually arrives after a few seconds, but it can take some time for the email to be sent. Check your spam folder as well. Sometimes extensions like Adblockers or a strong firewall can also block emails - in that case, try using another device."
  },
  {
    question: "Where can I receive further assistance?",
    answer: <>You can always shoot an email to <a href="mailto:rythmhacks@gmail.com">rythmhacks@gmail.com</a> if you have any questions or problems.</>
  }
]

const Login = () => {
  const { signInWithOtp } = useAuth()

  const [loading, setLoading] = useState(0)
  const [email, setEmail] = useState('')

  const [helpModalOpened, setHelpModalOpened] = useState(false)

  const [loadingDots, setLoadingDots] = useState<string>('.')

  const animateLoadingDots = () => {
    setLoadingDots(prevDots => (
      (prevDots === '...') ? prevDots = '.' : prevDots += '.'
    ))
  }

  const handleLogin = async (e: any) => {
    e.preventDefault()
    const loadingDotsInterval = setInterval(animateLoadingDots, 200)

    try {
      setLoading(1)
      const { error } = await signInWithOtp({
        email,
        options: {
          emailRedirectTo: import.meta.env.VITE_SITE_URL
        }
      })
      if (error) throw error
      setLoading(2)

    } catch (error: any) {
      alert(error.error_description || error.message)
      console.error(error)
      setLoading(3)
    } finally {
      clearInterval(loadingDotsInterval)
    }
  }

  const dialogs = ['Send magic link', 'Sending', (<p className='flex items-center gap-2 justify-center'><BsCheckCircle/> Magic link sent!</p>), 'Failed to send link']
  const colours = ['', '', 'rgb(17,184,129,0.5)', 'rgb(239,68,68,0.5)']

  return <div>      
    <div id='login' className='container !w-3/4 min-w-[270px] md:!w-1/2 mr-auto ml-auto mt-[5rem]'>
        <p className='hidden md:block uppercase dark:text-[#888] light:text-[#334155] text-[0.8rem] m-0'>log in</p>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          <img src={logo} alt='loginlogo' className='block md:hidden rounded-md h-[4rem]'></img>
          <h1 className='mt-4 text-center md:text-left'>Log In to RythmHacks</h1>
          <img src={logo} alt='loginlogo' className='hidden md:block rounded-md h-[4rem]'></img>
        </div>

        <div className="row flex w-full mt-4 md:mt-12">
        <div className="col-6 form-widget w-full" aria-live="polite">
          <p className="dark:text-[#888] light:text-[#334155]">Enter your email to get a magic link</p>
          <form onSubmit={handleLogin}>
            <input
              id="email"
              className="mb-4 px-4 py-2 w-full mt-4"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e:any) => setEmail(e.target.value)}
              required
            />
            <button 
              className='submit-button w-full text-white mb-2' 
              style={{backgroundColor: colours[loading]}}
              disabled={loading === 1}
              type="submit"
            >
              {dialogs[loading]}{loading === 1 && loadingDots}
            </button>
            <button 
              className="style-link p-0"
              type="button"
              onClick={() => setHelpModalOpened(true)}
            >
              Need help?
            </button>
          </form>
        </div>
      </div>
    </div>
    <Modal
      isOpened={helpModalOpened}
      setIsOpened={setHelpModalOpened}
      title="Help"
    >

      { helpModalFAQ.map(({ question, answer }, index) => (
        <div key={index} className="mb-4">
          <h3 className="mb-4 font-bold">{question}</h3>
          <p className="text-sm">{answer}</p>
        </div>
      ))}

      <button className="mt-2" onClick={() => setHelpModalOpened(false)}>Ok!</button>
    </Modal>
    </div>
}

export default Login