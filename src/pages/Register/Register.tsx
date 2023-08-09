import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../../contexts/Auth"
import { useReward } from 'react-rewards';

const Apply = () => {
  const { supabase, user, signOut } = useAuth()

  const [status, setStatus] = useState<string>('Loading...')

  const buttonMsgs = ['Begin registration', 'Continue registration', 'Edit registration']
  const msgs = ['You haven\'t started your registration! Click the button below to begin.', 'Click the button below to continue your registration.', 'Your registration has been successfully submitted! You can continue to edit it until the deadline.']
  const buttonBgs = ['#151821', '#447087', '#64B786']

  const { reward } = useReward('rewardId', 'confetti');

  const [msg, setMsg] = useState(msgs[0])
  const [buttonMsg, setButtonMsg] = useState(buttonMsgs[0])
  const [buttonBg, setButtonBg] = useState(buttonBgs[0])

  const navigate = useNavigate()

  const logout = async () => {
    const { error } = await signOut()
    if (error) throw error;
    navigate('/')
  }

  useEffect(() => {
    supabase.from('hacker_applications').select('*').eq('id', user?.id)
      .then(({ data, error }: { data: any, error: any }) => {
        const fetchedStatus = data?.[0]?.status
        if (error || !fetchedStatus) {
            alert('Oh no! Your data could not be retrieved. If this error persists, contact the RythmHacks team.')
            logout()
            if (error) throw error;
            else throw TypeError('no hacker registration matching the id was found')
        }
        else {
            setStatus(fetchedStatus)

            let statusInt = 0

            if (fetchedStatus === 'Not Started') {
              statusInt = 0
            }
            if (fetchedStatus === 'In Progress') {
              statusInt = 1
            }
            if (fetchedStatus === 'Submitted') {
              statusInt = 2
            }

            setMsg(msgs[statusInt])
            setButtonMsg(buttonMsgs[statusInt])
            setButtonBg(buttonBgs[statusInt])
        }
      })
  }, [supabase, user?.id])

  return (
    <div className="page w-full" id="Register">
      <div>
        <div className='container mb-4'>
          <h1>Registration Dashboard</h1>
          <p>This is the hub for your RythmHacks registration. Fill out your registration, get a response from us, then RSVP for the event.</p>
        </div>
        {status === 'Accepted' && <div className="container w-full">
          <h2>You're invited!</h2>  
          <p>
            Congratulations! We'd like to extend an offer for you to attend this year's event.<br/><br/>
            Welcome to RythmHacks 2023! We are excited to offer you the opportunity to hack with us.<br/><br/>
            Thanks for confirming your attendance. If can no longer join us in person, please click the button below.
          </p>

          <button className='mt-4'>I cannot come to RythmHacks</button>
        </div>}
        {status === 'Rejected' && <div className="container w-full"></div>}
        {status === 'Waitlisted' && <div className="container w-full"></div>}
        <div className="container w-full">
          <h2>Registration Closed</h2>
          <p>The registration deadline for this year's event has now passed. Thank you for your enthusiasm, and we hope to see you at our event!</p><br/>
          <p>Your registration status: <span className='font-bold'>{(status === 'Submitted' ? status : "Expired")}</span></p>
        </div>
        {/* <div className="container w-full">
          <h2 className='flex md:items-center flex-col md:flex-row justify-between gap-2'>
            Register to be a Hacker
            <button className="style-none text-xl !text-[#eee] cursor-pointer !p-2 rounded-md flex items-center font-normal text-center capitalize" style={{backgroundColor: buttonBg}} onClick={reward}>
              <span id="rewardId" style={{width: 2, height: 2, background: "red"}} />
              {status}
            </button>
          </h2>
          <p className='mt-4'>Want to attend the event in-person as a competitor? Fill out this registration.</p>
          <p className='mt-4'>{msg}</p>
          <button onClick={() => {
            if (status === 'Not Started') {
              supabase.from('hacker_applications').update({
                status: 'In Progress'
              }).eq('id', user?.id)
              .then(({ data, error }: { data: any, error: any}) => {
                  if (error) throw error;
              })
            }
            navigate('/dashboard/register/hacker')
          }} className='mt-8'>{buttonMsg}</button>
        </div> */}
          {/* <div className='container w-1/2'>
            <h2>Apply to be a Mentor/Judge</h2>
            <p className='mt-4'>Want to attend the event as a mentor/judge? You'll be on-site helping participants with their projects, giving technical advice and assistance when necessary. <br/><br/>Additionally, you'll be judging the projects at the end of the competition. You can also choose to run a self-hosted workshop on a topic of your choice.</p>
            <button className='mt-4' disabled>Stay tuned for more info!</button>
          </div> */}
        <div className='container w-full mt-4 dark:text-[#eee] text-textlight'>
          <h2>Hacker Info</h2>
          <p className='font-bold'>When are registrations due?</p>
          Registrations are due on August 8th, 2023, at 11:59 PM EST.
          <p className='font-bold mt-2'>Who is eligible to Register?</p>
          Participants must be in secondary school or below as of the 2023-24 school year.
          {/* <p className='font-bold mt-2'>How do I submit my registration?</p>
          Your registration will be automatically saved as you edit it. The final saved product will be your registration. You'll be able to edit it up until the deadline. */}
          <p className='mt-4'>If you have other questions, <a href='mailto:rythmhacks@gmail.com'>email us</a>, check out our <a href='https://rythmhacks.ca/' target='_blank' rel='noreferrer'>main website</a> or DM us on <a href='https://www.instagram.com/rythm.hacks/' target='_blank' rel='noreferrer'>Instagram</a>.</p>
        </div>
          {/* <div className='container w-1/2 dark:text-[#eee] text-textlight'>
            <h2>Mentor Info</h2>
            <p className='font-bold'>Can I join as a mentor online?</p>
            No. As a mentor, you'll be required to be on-site at our event.
          </div> */}
      </div>
    </div>
  )
}

export default Apply