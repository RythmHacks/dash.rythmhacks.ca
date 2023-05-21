import { useState } from "react"
import Editor from "../../components/Editor/Editor"
import { Link } from 'react-router-dom'

const Apply = () => {
  const [editingInProgress, setEditingInProgress] = useState(false)

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
                Current Status
                <p className="text-xl dark:text-gray-500 dark:bg-black bg-[#ddd] p-2 rounded-md flex items-center font-normal text-center">Not started</p>
              </h2>
              <p className='mt-4'>You haven't started your application! Click the button below to start filling it out.</p>
              <button onClick={() => setEditingInProgress(true)} className='mt-8'>Begin application</button>
            </div>
            <div className='container w-1/2 text-textlight'>
              <h2>More info</h2>
              <p className='font-bold'>When are applications due?</p>
              Applications are due on July 31st, 2023.
              <p className='font-bold mt-2'>Who is eligible to apply?</p>
              Participants must be in grade 12 or lower as of June 2023.
              <p className='mt-4'>If you have other questions, <a href='mailto:rythmhacks@gmail.com'>email us</a>, check out our <a href='https://rythmhacks.ca/' target='_blank' rel='noreferrer'>main website</a> or DM us on <a href='https://www.instagram.com/rythm.hacks/' target='_blank' rel='noreferrer'>Instagram</a>.</p>
            </div>
          </div>
        </div>
      :
        <>
        <div className='container'>
          <h1>Hacker Application Form</h1>
          <p>Fill out this form to register for the event as a hacker. <Link to='/dashboard/apply'>Go back to the dashboard.</Link></p>
        </div>
        <div className='container mt-4'>
          <form>
            <p>First Name</p>
            <input
              type='text'
              placeholder='Amon'
              className='mt-2'
              // value = {firstname}
              required

            />
            <p className='mt-4'>Last Name</p>
            <input
              type='text'
              placeholder='Gus'
              className='mt-2'
              // value = {firstname}
              required

            />
          </form>
          <Editor />
          <div className='flex gap-2 mt-4'>
            <button className='contrast' onClick={() => setEditingInProgress(false)}>Return to dashboard</button>
            <button>Submit</button>
          </div>
        </div>
        </>
      }
    </div>
  )
}

export default Apply