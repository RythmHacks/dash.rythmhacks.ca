import { useEffect, useState } from "react"

import HackerApplication from "./HackerApplication"
import { useAuth } from "../../contexts/Auth"

const Apply = () => {
  const { supabase, user } = useAuth()

  const [editingInProgress, setEditingInProgress] = useState(false)
  const [status, setStatus] = useState('Loading...')

  let buttonMsg = 'Begin application'
  let msg, setMsg = 'You haven\'t started your application! Click the button below to begin.'
  
  useEffect(() => {
    supabase.from('hacker_applications').select('*').eq('id', user?.id)
      .then(({ data, error }: { data: any, error: any }) => {
        const fetchedStatus = data?.[0]?.status
        if (error || !fetchedStatus) {
            alert('Oh no! Your data could not be retrieved. If this error persists, contact the RythmHacks team.')
            if (error) throw error;
            else throw TypeError('no hacker application matching the id was found')
        }
        else {
            setStatus(fetchedStatus)
        }
      })
  }, [supabase, user?.id])
  console.log(status)
 
  if (status === 'In Progress') {
    buttonMsg = 'Continue application'
    msg = 'Click the button below to continue editing your application.'
  } else if (status === 'Submitted') {
    buttonMsg = 'Edit application'
    msg = 'Your application has been successfully submitted! You can continue to edit it until the deadline.'
  }

  return (
    <div className="p-12 flex-1" id="apply">
      { !editingInProgress ? 
        <div>
          <div className='container mb-4'>
            <h1>Application Dashboard</h1>
            <p>This is the hub for your RythmHacks application. Fill out your application, get a response from us, then RSVP for the event.</p>
          </div>
          <div className='flexwrap'>
            <div className="container w-1/2">
              <h2 className='flex items-center justify-between gap-2'>
                Apply to be a Hacker
                <p className="text-xl dark:text-gray-500 dark:bg-black bg-[#ddd] p-2 rounded-md flex items-center font-normal text-center capitalize">{status}</p>
              </h2>
              <p className='mt-4'>Want to attend the event in-person as a competitor? Fill out this application.</p>
              <p className='mt-4'>{msg}</p>
              <button onClick={() => {
                setEditingInProgress(true);
                if (status === 'Not Started') {
                  supabase.from('hacker_applications').update({
                    status: 'In Progress'
                  }).eq('id', user?.id)
                  .then(({ data, error }: { data: any, error: any}) => {
                      if (error) throw error;
                  })
                }
              }} className='mt-8'>{buttonMsg}</button>
            </div>
            <div className='container w-1/2'>
              <h2>Apply to be a Mentor/Judge</h2>
              <p className='mt-4'>Want to attend the event as a mentor/judge? You'll be on-site helping participants with their projects, giving technical advice and assistance when necessary. <br/><br/>Additionally, you'll be judging the projects at the end of the competition. You can also choose to run a self-hosted workshop on a topic of your choice.</p>
              <button className='mt-4' disabled>Stay tuned for more info!</button>
            </div>
          </div>
          <div className='flex gap-4'>
            <div className='container w-1/2 mt-4 dark:text-[#eee] text-textlight'>
              <h2>Hacker Info</h2>
              <p className='font-bold'>When are applications due?</p>
              Applications are due on July 31st, 2023.
              <p className='font-bold mt-2'>Who is eligible to apply?</p>
              Participants must be in grade 12 or lower as of June 2023.
              <p className='font-bold mt-2'>How do I submit my application?</p>
              Your application will be automatically saved as you edit it. The final saved product will be your application. You'll be able to edit it up until the deadline.
              <p className='mt-4'>If you have other questions, <a href='mailto:rythmhacks@gmail.com'>email us</a>, check out our <a href='https://rythmhacks.ca/' target='_blank' rel='noreferrer'>main website</a> or DM us on <a href='https://www.instagram.com/rythm.hacks/' target='_blank' rel='noreferrer'>Instagram</a>.</p>
            </div>
            <div className='container w-1/2 mt-4 dark:text-[#eee] text-textlight'>
              <h2>Mentor Info</h2>
              <p className='font-bold'>Can I join as a mentor online?</p>
              No. As a mentor, you'll be required to be on-site at our event.
            </div>
          </div>
        </div>
      :
        <HackerApplication onReturnToDashboard={() => setEditingInProgress(!editingInProgress)} />
      }
    </div>
  )
}

export default Apply