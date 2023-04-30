import { useState, useEffect } from "react"
import Editor from "../../components/Editor/Editor"
import { Link } from 'react-router-dom'

const Apply = () => {
  const [editingInProgress, setEditingInProgress] = useState(false)

  const [applicationData, setApplicationData] = useState({
    gender: '',
    age: '',
    grade: '',
    phone_number: '',
    school: '',

    t_shirt_size: 'Not Selected',
    dietary_restrictions: [],

    country: '',
    province: '',
    address: '',
    apartment_suite: '',
    postal_code: '',

    question_1: '',
    question_2: '',

    mlh_newsletter: false
  })
 
 
  const dietaryRestrictions = [
    "vegetarian",
    "gluten-free",
    "lactose-free",
    "halal",
  ]
 
 
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(applicationData)
  }

  const handleInput = (event: Event) => {
    console.log('Input created')
    console.log(event)
  }

  useEffect(() => {
    if (editingInProgress) document.addEventListener('input', handleInput)

    return () => document.removeEventListener('input', handleInput)
  }, [editingInProgress])
 
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
                <p className="text-xl text-gray-500 bg-black p-2 rounded-md flex items-center font-normal text-center">Not started</p>
              </h2>
              <p className='mt-4'>You haven't started your application! Click the button below to start filling it out.</p>
              <button onClick={() => setEditingInProgress(true)} className='mt-8'>Begin application</button>
            </div>
            <div className='container w-1/2'>
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
          <form onSubmit={handleSubmit}>
            <h3>Basic Information</h3>
            <div>
              <label htmlFor="gender">Gender (optional)</label>
              <select id="gender" name="gender">
                <option>Prefer not to say</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>


            <div>
              <label htmlFor="age">Age</label>
              <input id="age" name="age" type="number" min={0} max={100} />
            </div>


            <div>
              <label htmlFor="grade">Grade (as of September 2023)</label>
              <select id="grade" name="grade">
                <option value="">Please select a grade</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>Graduating</option>
              </select>
            </div>


            <div>
              <label htmlFor="phone-number">Phone Number</label>
              <input id="phone-number" name="phone_number" />
            </div>


            <div>
              <label htmlFor="school">School</label>
              <input id="school" name="school" />
            </div>
          
            <h3>Event-specific Information</h3>
            <div>
              <label htmlFor="t-shirt-size">T-Shirt Size (optional)</label>
              <select id="t-shirt-size" name="t_shirt_size">
                <option>Not Selected</option>
                <option>XS</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div>


            <div>
              <label>Dietary Restrictions</label>

              { dietaryRestrictions.map((d) => (<>
                <input type="checkbox" id={d} name="dietary_restrictions" value={d} />
                <label htmlFor={d} className="capitalize">{d}</label>
              </>)) }
            
              <input type="checkbox" id="other" name="dietary_restrictions" value="other"></input>
              <label htmlFor="other">Other</label>
            </div>


            <h3>Address</h3>
            <p>These fields are optional if you want to recieve prizes.</p>

            <div>
              <input type="radio" name="country" id="canada" value="Canada" defaultChecked></input>
              <label htmlFor="canada">Canada</label>


              <input type="radio" name="country" id="usa" value="United States"></input>
              <label htmlFor="usa">United States</label>


              <input type="radio" name="country" id="other"></input>
              <label htmlFor="other">Other</label>
            </div>


            <div>
              <label htmlFor="province">Province</label>
              <input id="province" placeholder="Ontario" />
            </div>


            <div>
              <label htmlFor="city">City</label>
              <input id="city" placeholder="Waterloo" />
            </div>


            <div>
              <label htmlFor="address">Address</label>
              <input id="address" placeholder="10 Main Street" />
            </div>

            <div>
              <label htmlFor="apartment_suite">Apartment, Suite, etc. (optional)</label>
              <input id="apartment_suite" placeholder="Unit 4" />
            </div>


            <div>
              <label htmlFor="postal-code">Postal Code</label>
              <input id="postal-code" placeholder="N2V 3Q8" />
            </div>
          

            <h3>Application Questions</h3>
            <Editor />
            <Editor />
            
            <div className='flex gap-2 mt-4'>
              <button className='contrast' onClick={() => setEditingInProgress(false)}>Return to dashboard</button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        </>
      }
    </div>
  )
}

export default Apply