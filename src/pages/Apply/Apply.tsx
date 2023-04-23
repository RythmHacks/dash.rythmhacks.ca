import { useState } from "react"
import Editor from "../../components/Editor/Editor"

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
          <div className='flex gap-4'>
            <div className="container w-1/2">
              <h2 className='flex items-center justify-between'>
                Current Status
                <p className="text-xl text-gray-500 bg-black p-2 rounded-md flex items-center font-normal">Not started</p>
              </h2>
              <p className='mt-4'>You haven't started your application! Click the button below to start filling it out.</p>
              <button onClick={() => setEditingInProgress(true)} className='mt-8'>Begin application</button>
            </div>
            <div className='container w-1/2'>
              <h2>More info</h2>
              <p className='font-bold'>When are applications due?</p>
              <p>Applications are due on July 31st, 2023.</p>
            </div>
          </div>
        </div>
      :
        <>
          <Editor />
        </>
      }
    </div>
  )
}

export default Apply