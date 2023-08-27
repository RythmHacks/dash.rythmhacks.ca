import { useState } from "react";
import "./Schedule.scss";
import { times, eventTypes, Friday, Saturday, Sunday } from "./Schedule.data";
import Day from "./Day";

const Schedule = () => {
  const [currentDay, setCurrentDay] = useState<number>(0);

  const days: Array<object> = [Friday, Saturday, Sunday];

  return (
    <div className="page w-full h-screen md:overflow-hidden">
      <div className='flex flex-col lg:flex-row gap-2'>
        <div className="container lg:w-1/3">
          <h1>Schedule</h1>
          <p>This is the full schedule for the event!</p>
        </div>
        <div className="container lg:w-2/3">
          <h1>Legend</h1>
          <div className='legend'>
            {eventTypes.map((type) => {
              return (
                <div className="flex items-center gap-2 mt-2">
                  <div className='w-8 h-8 rounded-[5px]' style={{backgroundColor: type.color}}></div>
                  <p>{type.name}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="mt-4 w-full toggle">
        <button
          className="style-none rounded-tl-[5px]"
          onClick={() => setCurrentDay(0)}
        >
          Friday
        </button>
        <button className="style-none" onClick={() => setCurrentDay(1)}>
          Saturday
        </button>
        <button
          className="style-none rounded-tr-[5px]"
          onClick={() => setCurrentDay(2)}
        >
          Sunday
        </button>
      </div>
      <div className="container flex w-full md:h-full md:overflow-y-scroll !rounded-t-none">
        <div className="flex-col w-1/6 gap-4 flex">
          {times.map((time, index) => {
            if (currentDay === 0 && index <= 14) {
              return null;
            }
            if (currentDay === 2 && index <= 6) {
              return null;
            }
            return <p className="pb-36 h-4 leading-4">{time}</p>;
          })}
          <div className="hidden md:block h-36"></div>
        </div>
        <Day scheduleData={days[currentDay]}></Day>
      </div>
    </div>
  );
};

export default Schedule;
