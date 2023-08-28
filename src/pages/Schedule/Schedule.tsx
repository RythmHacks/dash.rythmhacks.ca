import { useState, useEffect, useContext } from "react";
import "./Schedule.scss";
import { times, eventTypes, Friday, Saturday, Sunday } from "./Schedule.data";
import Day from "./Day";
import { useAuth } from "../../contexts/Auth";
import { useNavigate } from "react-router-dom";
import { BsFullscreen } from "react-icons/bs";
import Modal from "../../components/Modal/Modal";
import { useStatus } from "../../contexts/UserStatus";

const Schedule = () => {
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const { supabase, user } = useAuth();
  const navigate = useNavigate();

  const status = useStatus();

  if (status !== 'Confirmed') {
    navigate('/dashboard')
  }

  const today = new Date();
  if (today.getDate() >= 1 && today.getDate() <= 3 && today.getMonth() === 9 && today.getFullYear() === 2023) {
    setCurrentDay(today.getDate());
  }

  const days: Array<object> = [Friday, Saturday, Sunday];

  return (
    <>
    <div className="page w-full h-auto md:h-screen md:overflow-hidden pb-8">
      <div className='flex flex-col lg:flex-row gap-4'>
        <div className="container lg:w-1/3 !p-6">
          <h1 className='!mb-0'>Schedule</h1>
          <p>This is the full schedule for the event!</p>
        </div>
        <div className="container items-center justify-between lg:w-2/3 !p-6">
          <h1 className='!mb-0'>Legend</h1>
          <div className='gap-2 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 '>
            {eventTypes.map((type) => {
              return (
                <div className="flex items-center gap-2">
                  <div className='w-8 h-8 rounded-[5px]' style={{backgroundColor: type.color}}></div>
                  <p>{type.name}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 w-full toggle flex rounded-tl-[5px] rounded-tr-[5px]">
        <button
          className={`style-none w-full contrast ${(currentDay === 0) ? "dateActive" : ""}`}
          onClick={() => {setCurrentDay(0); document.getElementById('breyers')?.scrollIntoView();}}
          >
          Friday
        </button>
        <button className={`style-none w-full contrast !border-l-0 ${(currentDay === 1) ? "dateActive" : ""}`} onClick={() => {setCurrentDay(1); document.getElementById('breyers')?.scrollIntoView();}}>
          Saturday
        </button>
        <button
          className={`style-none w-full contrast !border-l-0 ${(currentDay === 2) ? "dateActive" : ""}`}
          onClick={() => {setCurrentDay(2); document.getElementById('breyers')?.scrollIntoView();}}
          >
          Sunday
        </button>
        <button
          className={`!rounded-none !rounded-tr-[5px] flex items-center justify-center !border-r-0`}
          id="fullscreen"
          onClick={() => setFullScreen(!fullScreen)}
          >
          <BsFullscreen />
        </button>
      </div>
      <div className={`container scheduleContainer !border-t-0 !pt-0 w-full md:h-full md:overflow-y-scroll !rounded-t-none`} >
        <div id='breyers' className='h-4'></div>
        <div className='flex mt-4'>
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
            {/* <div className="hidden md:block h-36"></div> */}
          </div>
          <Day scheduleData={days[currentDay]}></Day>
        </div>
      </div>
    </div>
    <Modal isOpened={fullScreen} setIsOpened={setFullScreen} closable={true}>
    <div id='breyers' className='h-4'></div>
        <div className='flex mt-4'>
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
            {/* <div className="hidden md:block h-36"></div> */}
          </div>
          <Day scheduleData={days[currentDay]}></Day>
        </div>
    </Modal>
    </>
  );
};

export default Schedule;
