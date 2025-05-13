

import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [events, setEvents] = useState([
    {
      title: "Meeting with Client",
      start: new Date(2025, 2, 20, 10, 0),
      end: new Date(2025, 2, 20, 11, 30),
    },
    {
      title: "Project Deadline",
      start: new Date(2025, 2, 25),
      end: new Date(2025, 2, 25),
    },
  ]);

  return (
    <div className="h-[450px]  shadow-md p-3 dark:bg-darkCard bg-lightCard text-lightTitle dark:text-darkTitle rounded-md">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default CalendarComponent;


// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";

// const localizer = momentLocalizer(moment);

// const CalendarComponent = () => {
//   const [events, setEvents] = useState([
//     {
//       title: "Meeting with Client",
//       start: new Date(2025, 2, 20, 10, 0),
//       end: new Date(2025, 2, 20, 11, 30),
//       isHoliday: false, // Custom flag
//     },
//     {
//       title: "Project Deadline",
//       start: new Date(2025, 2, 25),
//       end: new Date(2025, 2, 28),
//       isHoliday: false,
//     },
//   ]);

//   // Fetch holidays from API
//   useEffect(() => {
//     const fetchHolidays = async () => {
//       try {
//         const response = await fetch(
//           "https://date.nager.at/Api/v2/PublicHolidays/2025/BD"
//         );
//         const data = await response;
//         console.log("data",data)

//         const holidayEvents = data.map((holiday) => ({
//           title: holiday.localName,
//           start: new Date(holiday.date),
//           end: new Date(holiday.date),
//           allDay: true,
//           isHoliday: true, // Custom flag for styling
//         }));

//         setEvents((prevEvents) => [...prevEvents, ...holidayEvents]);
//       } catch (error) {
//         console.error("Error fetching holidays:", error);
//       }
//     };

//     fetchHolidays();
//   }, []);

//   // Custom styling for holidays
//   const eventStyleGetter = (event) => {
//     let style = {
//       backgroundColor: event.isHoliday ? "#ff4d4d" : "#3174ad", // Holiday → Red, Others → Blue
//       color: "white",
//       borderRadius: "5px",
//       padding: "5px",
//     };
//     return { style };
//   };

//   return (
//     <div className="h-[600px] p-4">
//       <h2 className="text-xl font-bold text-center mb-4">
//         Bangladesh Holiday Calendar
//       </h2>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: "100%" }}
//         defaultDate={new Date()}
//         eventPropGetter={eventStyleGetter} // Apply custom styles
//       />
//     </div>
//   );
// };

// export default CalendarComponent;
