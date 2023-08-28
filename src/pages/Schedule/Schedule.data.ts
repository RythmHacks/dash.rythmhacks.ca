import { ScheduleData, EventTypes } from "../../types/schedule";

export const times: Array<string> = [
  "12:00 AM",
  "1:00 AM",
  "2:00 AM",
  "3:00 AM",
  "4:00 AM",
  "5:00 AM",
  "6:00 AM",
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
  "11:00 PM",
];

export const eventTypes = [
  {
    name: "Main Event",
    color: "#bfdbfe",
    id: "mainEvent",
  },
  {
    name: "Meal",
    color: "#fbcaca",
    id: "meal",
  },
  {
    name: "Workshop",
    color: "#bbf7cf",
    id: "workshop",
  },
  {
    name: "Sponsor",
    color: "#e9d5ff",
    id: "sponsor",
  },
  {
    name: "Activity",
    color: "#fef9c3",
    id: "activity",
  },
] as EventTypes[];

export const Friday = [
  [
    {
      title: "Hacker Check-in",
      description:
        "Head over to the front desk to check-in to the event and get ready for the weekend!",
      location: "Front Desk",
      startTime: "3:00 PM",
      endTime: "6:00 PM",
      height: 3,
      heightOffset: 0,
      type: "mainEvent",
    },
  ],
  [
    {
      title: "Opening Ceremony",
      description:
        "Welcome to RythmHacks! We're so excited to bring you the first iteration of our event.",
      location: "Event Space",
      startTime: "6:00 PM",
      endTime: "7:00 PM",
      height: 1,
      type: "mainEvent",
    },
  ],
  [
    {
      title: "Dinner",
      description: "Come to the North wall to claim your pizza and snacks!",
      location: "Food Pickup Area",
      startTime: "7:00 PM",
      endTime: "8:30 PM",
      height: 1.5,
      type: "meal",
    },
    {
      title: "Sponsor Networking",
      description: "Come meet our sponsors and learn about their companies!",
      location: "Event Space",
      startTime: "7:00 PM",
      endTime: "10:00 PM",
      height: 3,
      type: "sponsor",
    },
  ],
  [],
  [
    {
      title: "Intro to React",
      description: "An introduction to becoming yet another full-stack React developer.",
      startTime: "9:00 PM",
      endTime: "10:00 PM",
      height: 1,
      heightOffset: 0,
      width: 0.5,
      location: "Meeting Room 1",
      type: "workshop",
    }
  ],
  [
    {
      title: "Hacking Starts!",
      description: "The allocated hacking time starts now!",
      startTime: "10:00 PM",
      height: 1,
      heightOffset: 0,
      type: "mainEvent",
    },
  ],
] as ScheduleData[][];

export const Saturday = [
  [],
  [],
  [],
  [
    {
      title: "Among Us at 3 am",
      description:
        "Feeling too suspicious to sleep? Need a sussy break from hacking? Join us for a game of Among Us at 3 am!",
      location: "Meeting Room 1 & Online",
      startTime: "3:00 AM",
      endTime: "4:00 AM",
      height: 1,
      heightOffset: 0,
      type: "activity",
    },
  ],
  [],
  [],
  [],
  [
    {
      title: "Breakfast",
      description: "Come pick up your muffins and fruit for breakfast!",
      location: "Food Pickup Area",
      startTime: "7:30 AM",
      endTime: "9:00 AM",
      height: 1.5,
      heightOffset: 0.5,
      type: "meal",
    },
  ],
  [],
  [
    {
      title: "APIs 101 with Postman",
      description:
        "Join an industry professional from Postman in a beginner-friendly API fundamentals workshop that's been delivered to students around the world!",
      location: "Online",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      height: 1,
      type: "workshop",
    },
  ],
  [
    {
      title: "MLH Capture the Flag",
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      height: 1,
      heightOffset: 0,
      type: "activity",
    },
  ],
  [
    {
      title: "Lunch",
      description: "Come pick up your pretzel sandwiches for lunch!",
      location: "Food Pickup Area",
      startTime: "12:00 PM",
      endTime: "1:30 PM",
      height: 1.5,
      heightOffset: 0,
      type: "meal",
    },
  ],
  [
    {
      title:
        "Copilot Time! Let's build a PlugIn for ChatGPT, BingChat and other Copilots",
      description: "In this workshop, we will create a plugin for ChatGPT from scratch.",
      startTime: "2:00 PM",
      endTime: "3:00 PM",
      height: 1,
      heightOffset: 0.5,
      type: "workshop",
    },
  ],
  [],
  [
    {
      title: "Typing contest, sponsored by MonkeyType",
      description: "So easy, even a monkey could do it",
      location: "Meeting Room 1",
      startTime: "4:00 PM",
      endTime: "5:00 PM",
      height: 1,
      heightOffset: 0,
      type: "activity",
    },
  ],
  [
    {
      title: "Dinner",
      description: "Come pick up your chicken and rice for dinner!",
      location: "Food Pickup Area",
      startTime: "5:30 PM",
      endTime: "7:00 PM",
      height: 1.5,
      heightOffset: 0.5,
      type: "meal",
    },
  ],
  [
    {
      title: "MLH !Light",
      description: "Join us for this fun minigame of creating a website without seeing it first!",
      location: "Online",
      startTime: "7:00 PM",
      endTime: "8:00 PM",
      height: 1,
      heightOffset: 0,
      type: "activity",
    },
  ],
  [],
  [
    {
      title: "Jeopardy",
      description: "Test your knowledge with this fun game of Jeopardy!",
      location: "Meeting Room 1",
      startTime: "9:00 PM",
      endTime: "10:00 PM",
      height: 1,
      heightOffset: 0,
      type: "activity",
    }
  ]
] as ScheduleData[][];

export const Sunday = [
  [
    {
      title: "Breakfast",
      description: "Come pick up your muffins and fruit for breakfast!",
      location: "Food Pickup Area",
      startTime: "7:30 AM",
      endTime: "9:00 AM",
      height: 1.5,
      heightOffset: 0.5,
      type: "meal",
    },
  ],
  [],
  [
    {
      title: "Hacking Ends!",
      description:
        "The allocated hacking time has ended! Be sure to submit your projects on Devpost!",
      startTime: "10:00 AM",
      height: 1,
      heightOffset: 0,
      type: "mainEvent",
    },
  ],
  [
    {
      title: "Judging",
      description: "Ready to present your projects to the judges?",
      startTime: "11:00 AM",
      endTime: "1:30 PM",
      height: 2.5,
      heightOffset: 0,
      type: "mainEvent",
    },
    {
      title: "Lunch",
      description: "Come pick up your croissant sandwiches for lunch!",
      location: "Food Pickup Area",
      startTime: "12:00 PM",
      endTime: "1:30 PM",
      height: 1.5,
      heightOffset: 1,
      type: "meal",
    },
  ],
  [],
  [
    {
      title: "Soccer",
      description: "Kick a ball around for an hour",
      startTime: "1:45 PM",
      endTime: "2:45 PM",
      height: 1,
      heightOffset: 0.75,
      location: "Outside",
      type: "activity",
    }
  ],
  [],
  [
    {
      title: "Closing Ceremony",
      description:
        "Thanks for coming to RythmHacks! Come join us during the closing ceremony to collect your prizes!",
      location: "Event Space",
      startTime: "3:00 PM",
      endTime: "4:00 PM",
      height: 1,
      heightOffset: 0,
      type: "mainEvent",
    },
  ],
] as ScheduleData[][];
