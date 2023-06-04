import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../../contexts/Auth"


const Apply = () => {
  const { supabase, user, signOut } = useAuth()

  const [status, setStatus] = useState<string>('Loading...')

  const buttonMsgs = ['Begin application', 'Continue application', 'Edit application']
  const msgs = ['You haven\'t started your application! Click the button below to begin.', 'Click the button below to continue your application.', 'Your application has been successfully submitted! You can continue to edit it until the deadline.']
  const buttonBgs = ['#151821', '#447087', '#64B786']
  
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
            else throw TypeError('no hacker application matching the id was found')
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
    <div className="page" id="apply">
      <div>
        <div className='container mb-4'>
          <h1>Application Dashboard</h1>
          <p>This is the hub for your RythmHacks application. Fill out your application, get a response from us, then RSVP for the event.</p>
        </div>
        <div className='flexwrap'>
          <div className="container w-1/2">
            <h2 className='flex md:items-center flex-col md:flex-row justify-between gap-2'>
              Apply to be a Hacker
              <p className="text-xl !text-[#eee] p-2 rounded-md flex items-center font-normal text-center capitalize" style={{backgroundColor: buttonBg}}>{status}</p>
            </h2>
            <p className='mt-4'>Want to attend the event in-person as a competitor? Fill out this application.</p>
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
              navigate('/dashboard/apply/hacker')
            }} className='mt-8'>{buttonMsg}</button>
          </div>
          <div className='container w-1/2'>
            <h2>Apply to be a Mentor/Judge</h2>
            <p className='mt-4'>Want to attend the event as a mentor/judge? You'll be on-site helping participants with their projects, giving technical advice and assistance when necessary. <br/><br/>Additionally, you'll be judging the projects at the end of the competition. You can also choose to run a self-hosted workshop on a topic of your choice.</p>
            <button className='mt-4' disabled>Stay tuned for more info!</button>
          </div>
        </div>
        <div className='flexwrap mt-4'>
          <div className='container w-1/2 dark:text-[#eee] text-textlight'>
            <h2>Hacker Info</h2>
            <p className='font-bold'>When are applications due?</p>
            Applications are due on July 31st, 2023.
            <p className='font-bold mt-2'>Who is eligible to apply?</p>
            Participants must be in grade 12 or lower as of June 2023.
            <p className='font-bold mt-2'>How do I submit my application?</p>
            Your application will be automatically saved as you edit it. The final saved product will be your application. You'll be able to edit it up until the deadline.
            <p className='mt-4'>If you have other questions, <a href='mailto:rythmhacks@gmail.com'>email us</a>, check out our <a href='https://rythmhacks.ca/' target='_blank' rel='noreferrer'>main website</a> or DM us on <a href='https://www.instagram.com/rythm.hacks/' target='_blank' rel='noreferrer'>Instagram</a>.</p>
          </div>
          <div className='container w-1/2 dark:text-[#eee] text-textlight'>
            <h2>Mentor Info</h2>
            <p className='font-bold'>Can I join as a mentor online?</p>
            No. As a mentor, you'll be required to be on-site at our event.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Apply