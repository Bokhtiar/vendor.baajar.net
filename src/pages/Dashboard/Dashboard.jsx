import React from "react";
import Card from "./card/Card";
import CalendarComponent from "./calender/Calender";
import RecentOrderChart from "./Chart/RecentOrderChart";
import EarningsChart from "./Chart/EarningsChart";
import ShowTable from "./table/ShowTable";
import { MyCalendar } from "./calender/MyCalendar";

const Dashboard = () => {
  return (
    <div>
      <Card />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4 mt-8">
        <div className="col-span-3 ">
          <CalendarComponent />
          {/* <MyCalendar/> */}
        </div>
        <div className="col-span-3">
          <RecentOrderChart />
        </div>
        <div className="col-span-2">
          <EarningsChart />
        </div>
      </div>
      <div className="mt-6">
        <ShowTable />
      </div>
    </div>
  );
};

export default Dashboard;
