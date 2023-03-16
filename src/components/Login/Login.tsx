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
  { 
    question: "Why not use passwords?",
    answer: "Using passwords can be problematic because they are typically not as secure as other methods. Passwords can be easily forgotten or stolen, especially if they are weak or reused. Moreover, having to create and remember can be quite inconvenient."
  },
  {
    question: "Is there a sign up page?",
    answer: "No, the log in and sign up page are the same! On the log in page, just input your email and click the button. After you go to your email inbox and click the magic link, we'll create an account for you and you'll then go through the sign up process."
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

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const [helpModalOpened, setHelpModalOpened] = useState(false)

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

  return <>      
    <div id='login' className='container min-w-[330px] w-9/12 md:w-4/12 mr-auto ml-auto mt-[5rem]'>
        <p className='uppercase text-[#888] text-[0.8rem] m-0'>log in</p>
        <div className='flex justify-between items-center gap-4'>
          <h1 className='mt-4'>Log In to RythmHacks</h1>
          <img src={logo} alt='loginlogo' className='rounded-md h-[4rem]'></img>
        </div>

        <div className="row flex w-full mt-12">
        <div className="col-6 form-widget w-full" aria-live="polite">
          <p className="text-[#bbb]">Enter your email to get a magic link</p>
          {loading ? (
            'Sending magic link...'
          ) : (
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
              <button className='w-full text-white' type="submit">
                Send magic link
              </button>
              <button 
                className="style-link p-0 mt-2"
                type="button"
                onClick={() => setHelpModalOpened(true)}
              >
                Need help?
              </button>
              {(sent) ? <p className='items-center flex gap-2 text-[#bbb]'><BsCheckCircle/> Magic link sent successfully, you can now close this window</p> : <p></p>}
            </form>
          )}
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
          <h3 className="mb-2 font-bold">{question}</h3>
          <p className="text-sm">{answer}</p>
        </div>
      ))}

      <button className="mt-2" onClick={() => setHelpModalOpened(false)}>Ok!</button>
    </Modal>
    </>
}

export default Login