import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment); // or globalizeLocalizer

// Sample Events List
const myEventsList = [
  {
    id: 1,
    title: "Meeting with Client",
    start: new Date(2025, 2, 22, 10, 0), // March 22, 2025, 10:00 AM
    end: new Date(2025, 2, 22, 11, 30), // March 22, 2025, 11:30 AM
  },
  {
    id: 2,
    title: "Project Deadline",
    start: new Date(2025, 2, 25, 15, 0), // March 25, 2025, 3:00 PM
    end: new Date(2025, 2, 25, 16, 0), // March 25, 2025, 4:00 PM
  },
  {
    id: 3,
    title: "Team Standup Meeting",
    start: new Date(2025, 2, 28, 9, 30), // March 28, 2025, 9:30 AM
    end: new Date(2025, 2, 28, 10, 0), // March 28, 2025, 10:00 AM
  },
];

export const MyCalendar = () => (
  <div className="h-screen p-4  rounded-lg shadow-md dark:bg-darkCard bg-lightCard text-lightTitle dark:text-darkTitle">
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "80vh" }}
    />
  </div>
);
