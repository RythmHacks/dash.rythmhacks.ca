import { ScheduleData } from '../../types/schedule'

export const times:Array<string> = [
  '12:00 AM',
  '1:00 AM',
  '2:00 AM',
  '3:00 AM',
  '4:00 AM',
  '5:00 AM',
  '6:00 AM',
  '7:00 AM',
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
  '9:00 PM',
  '10:00 PM',
  '11:00 PM'
]

export const Friday = [
  [
    {
      title: 'Hacker Check-in',
      description: 'Head over to the front desk to check-in to the event and get ready for the weekend!',
      location: 'Front Desk',
      startTime: '3:00 PM',
      endTime: '6:00 PM',
      height: 3,
      type: 'mainEvent'
    }
  ],
  [
    {
      title: 'Opening Ceremony',
      description: 'Welcome to RythmHacks! We\'re so excited to bring you the first iteration of our event.',
      location: 'Event Space',
      startTime: '6:00 PM',
      endTime: '7:00 PM',
      height: 1,
      type: 'mainEvent'
    },
  ],
  [
    {
      title: 'Dinner',
      description: 'Come to the North wall to claim your pizza and snacks!',
      location: 'Food Pickup Area',
      startTime: '7:00 PM',
      endTime: '8:30 PM',
      height: 1.5,
      type: 'meal'
    }  
  ],
  [],
  [
    {
      title: 'Hacking Starts!',
      description: 'The allocated hacking time starts now!',
      startTime: '3:00 PM',
      height: 1,
      heightOffset: 0.5,
      type: 'mainEvent'
    }  
  ]
] as ScheduleData[][]

export const Saturday = [
  [
    {
      title: 'Hacker Check-in',
      description: 'Head over to the front desk to check-in to the event and get ready for the weekend!',
      location: 'Front Desk',
      startTime: '3:00 PM',
      endTime: '6:00 PM',
      height: 3,
      type: 'mainEvent'
    }
  ]
] as ScheduleData[][]

export const Sunday = [
  [
    {
      title: 'Hacker Check-in ssadfsd',
      description: 'Head over to the front desk to check-in to the event and get ready for the weekend!',
      location: 'Front Desk',
      startTime: '3:00 PM',
      endTime: '6:00 PM',
      height: 3,
      type: 'mainEvent'
    }
  ]
] as ScheduleData[][]