import { useState } from "react"
import './Schedule.scss'
import { times, Friday, Saturday, Sunday } from './Schedule.data'
import Day from './Day'

const Schedule = () => {

  const [currentDay, setCurrentDay] = useState<number>(0)

  const days:Array<object> = [
    Friday, Saturday, Sunday
  ]

  return (
    <div className='page w-full h-screen overflow-hidden'>
      <div className='container'>
        <h1>Schedule</h1>
        <p>This is the full schedule for the event!</p>
      </div>
      <div className='mt-4 w-full toggle'>
        <button className='style-none rounded-tl-[5px]' onClick={() => setCurrentDay(0)}>Friday</button>
        <button className='style-none' onClick={() => setCurrentDay(1)}>Saturday</button>
        <button className='style-none rounded-tr-[5px]' onClick={() => setCurrentDay(2)}>Sunday</button>
      </div>
      <div className='container flex w-full h-full overflow-y-scroll !rounded-t-none'>
        <div className='flex-col w-1/6 gap-4 flex'>
          {times.map((time, index) => {
            if (currentDay === 0 && index <= 14) {
              return null
            }
            if (currentDay === 2 && index <= 6) {
              return null 
            }
            return (
              <p className='pb-36 h-4 leading-4'>{time}</p>
            )
          })}
          <div className='h-36'></div>
        </div>
        <Day scheduleData={days[currentDay]}></Day>
      </div>
    </div>
  )
}

export default Schedule