

import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [data, setData] = useState([
    {
      title:"New Orders",
      value:5,
       color: "bg-gradient-to-r from-[#D623FE]  to-[#A530F2]", // Tailwind gradient
    },
    {
      title:"Total Orders",
      value:20,
       color: "bg-gradient-to-r from-[#FA6464]  to-[#DC2626]",
    },
    {
      title:"Shipped Orders",
      value:12,
       color: "bg-gradient-to-r from-[#6BAAFC]  to-[#305FEC]",
    },
   
  ]);

  return (
  <div className="grid grid-cols-1 lg:grid-col-3">
   {data.map((d, i) => (
  <div key={i} className={`bg-${d?.color}`}>
 
  </div>
))}

  </div>
  );
};

export default CalendarComponent;

