import { useState, useEffect } from "react"
import Editor from "../../components/Editor/Editor"
import { Link } from 'react-router-dom'
import { useAuth } from "../../contexts/Auth"

const Apply = () => {
  const { supabase } = useAuth()

  const [editingInProgress, setEditingInProgress] = useState(false)

  const [applicationData, setApplicationData] = useState({
    gender: 'Prefer not to say',
    age: '',
    grade: '',
    phone_number: '',
    school: '',

    t_shirt_size: 'Not Selected',
    dietary_restrictions_vegetarian: false,
    dietary_restrictions_gluten_free: false,
    dietary_restrictions_dairy_free: false,
    dietary_restrictions_halal: false,
    dietary_restrictions_other: '',

    country: 'Canada',
    province: '',
    city: '',
    address: '',
    apartment_suite: '',
    postal_code: '',

    question_1: '',
    question_2: '',
  })

  const updateApplicationData = (column: string, value: string | boolean) => {
    setApplicationData(appData => ({
      ...appData,
      [column]: value,
    }))
  }

  const [isOtherDietaryRestrictionChecked, setIsOtherDietaryRestrictionChecked] = useState(false)
 
 
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    
  }

  /*useEffect(() => {
    supabase.from('applications-hackers').select('*')
      .then(({ data, error }) => {
        if (data === null || !data.length || error) {
          alert('Oh no! Your data could not be retrieved. If this error persists, contact the RythmHacks team.')
          if (error) throw error;
          else throw TypeError('no application matching the id was found')
        }
        
        setApplicationData(data[0])
      })
  }, [supabase])*/
 
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
              <select
                id="gender"
                value={["Prefer not to say", "Male", "Female", "Non-binary"].includes(applicationData.gender) ? applicationData.gender : ''}
                onChange={e => {
                  updateApplicationData('gender', e.target.value)
                }}
                >
                <option>Prefer not to say</option>
                <option>Male</option>
                <option>Female</option>
                <option>Non-binary</option>
                <option value="">Prefer to self-describe</option>
              </select>
              {!["Prefer not to say", "Male", "Female", "Non-binary"].includes(applicationData.gender) && (<>
                <label htmlFor="self-described-gender">Self-described Gender:</label>
                <input id="self-described-gender" value={applicationData.gender} onChange={e => {
                  updateApplicationData('gender', e.target.value)
                }}></input>
              </>)}
            </div>


            <div>
              <label htmlFor="age">Age (as of September 1, 2023)</label>
              <input
                id="age"
                type="number"
                min={0}
                max={100}
                value={applicationData.age}
                onChange={e => updateApplicationData('age', e.target.value)}
              />
            </div>


            <div>
              <label htmlFor="grade">Grade (as of September 1, 2023)</label>
              <select
                id="grade"
                value={applicationData.grade}
                onChange={e => updateApplicationData('grade', e.target.value)}
              >
                <option value="">Please select a grade</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>Graduating</option>
              </select>
            </div>


            <div>
              <label htmlFor="school">School</label>
              <input 
                id="school"
                value={applicationData.school}
                onChange={e => updateApplicationData('school', e.target.value)}
               />
            </div>


            <div>
              <label htmlFor="phone-number">Phone Number</label>
              <input
                id="phone-number"
                type="tel"
                required
                value={applicationData.phone_number}
                onChange={e => updateApplicationData('phone_number', e.target.value)}
              ></input>
            </div>

          
            <h3>Event-specific Information</h3>
            <div>
              <label htmlFor="t-shirt-size">T-Shirt Size (optional)</label>
              <select 
                id="t-shirt-size"
                value={applicationData.t_shirt_size}
                onChange={e => updateApplicationData('t_shirt_size', e.target.value)}
              >
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
              
              <div>
                <input 
                  type="checkbox"
                  id="dietary-restrictions-vegetarian"
                  checked={applicationData.dietary_restrictions_vegetarian}
                  onChange={e => updateApplicationData('dietary_restrictions_vegetarian', e.target.checked)} />
                <label htmlFor="dietary-restrictions-vegatarian" className="capitalize">Vegetarian</label>
              </div>

              <div>
                <input 
                  type="checkbox"
                  id="dietary-restrictions-halal"
                  checked={applicationData.dietary_restrictions_halal}
                  onChange={e => updateApplicationData('dietary_restrictions_halal', e.target.checked)} />
                <label htmlFor="dietary-restrictions-halal" className="capitalize">Halal</label>
              </div>

              <div>
                <input 
                  type="checkbox"
                  id="dietary-restrictions-gluten-free"
                  checked={applicationData.dietary_restrictions_gluten_free}
                  onChange={e => updateApplicationData('dietary_restrictions_gluten_free', e.target.checked)} />
                <label htmlFor="dietary-restrictions-gluten-free" className="capitalize">Gluten-Free</label>
              </div>

              <div>
                <input 
                  type="checkbox"
                  id="dietary-restrictions-dairy_free"
                  checked={applicationData.dietary_restrictions_dairy_free}
                  onChange={e => updateApplicationData('dietary_restrictions_dairy_free', e.target.checked)} />
                <label htmlFor="dietary-restrictions-dairy-free" className="capitalize">Dairy-Free</label>
              </div>


              <div>
                <input
                  type="checkbox"
                  id="other-dietary-restrictions-checkbox"
                  name="dietary_restrictions"
                  value={applicationData.dietary_restrictions_other}
                  onChange={() => setIsOtherDietaryRestrictionChecked(!isOtherDietaryRestrictionChecked)}
                ></input>
                <label htmlFor="other-dietary-restrictions-checkbox">Other restriction(s)</label>
              </div>

              
              {isOtherDietaryRestrictionChecked && (<>
                <label htmlFor="other-dietary-restrictions-input">Restriction(s):</label>
                <input id="other-dietary-restrictions-input" value={applicationData.dietary_restrictions_other} onChange={e => {
                    updateApplicationData('dietary_restrictions_other', e.target.value)
                  }}></input>
              </>)}
            </div>


            <h3>Address</h3>
            <p>These fields are optional if you want to recieve prizes.</p>

            <div>
              <input 
                type="radio"
                name="country"
                id="canada"
                checked={applicationData.country === 'Canada'}
                onChange={() => { updateApplicationData('country', 'Canada'); console.log(applicationData);}}
              ></input>
              <label htmlFor="canada">Canada</label>


              <input
                type="radio"
                name="country"
                id="usa"
                checked={applicationData.country === 'United States of America'}
                onChange={() => updateApplicationData('country', 'United States of America')}
              ></input>
              <label htmlFor="usa">United States</label>


              <input
                type="radio"
                name="country"
                id="other-country-checkbox"
                checked={applicationData.country !== 'Canada' && applicationData.country !== 'United States of America'}
                onChange={() => updateApplicationData('country', '')}></input>
              <label htmlFor="other-country-checkbox">Other</label>

              {applicationData.country !== 'Canada' && applicationData.country !== 'United States of America' && (<>
                <label htmlFor="other-country-input">Country (No abbrevations):</label>
                <input id="other-country-input" value={applicationData.country} onChange={e => {
                    updateApplicationData('country', e.target.value)
                  }}></input>
              </>)}
            </div>


            <div>
              <label htmlFor="province">Province</label>
              <input 
                id="province"
                placeholder="Ontario"
                value={applicationData.province}
                onChange={e => updateApplicationData('province', e.target.value)}
              />
            </div>


            <div>
              <label htmlFor="city">City</label>
              <input
                id="city"
                placeholder="Waterloo"
                value={applicationData.city}
                onChange={e => updateApplicationData('city', e.target.value)}
              />
            </div>


            <div>
              <label htmlFor="address">Address</label>
              <input
                id="address"
                placeholder="10 Main Street"
                value={applicationData.address}
                onChange={e => updateApplicationData('address', e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="apartment_suite">Apartment, Suite, etc. (optional)</label>
              <input
                id="apartment_suite"
                placeholder="Unit 4"
                value={applicationData.apartment_suite}
                onChange={e => updateApplicationData('apartment_suite', e.target.value)}
              />
            </div>


            <div>
              <label htmlFor="postal-code">Postal Code</label>
              <input
                id="postal-code"
                placeholder="N2V 3Q8"
                value={applicationData.postal_code}
                onChange={e => updateApplicationData('postal_code', e.target.value)}
              />
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