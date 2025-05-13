import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Sample data for the last 12 months
const data = [
  { month: "Jan", orders: 30 },
  { month: "Feb", orders: 40 },
  { month: "Mar", orders: 35 },
  { month: "Apr", orders: 50 },
  { month: "May", orders: 60 },
  { month: "Jun", orders: 55 },
  { month: "Jul", orders: 65 },
  { month: "Aug", orders: 70 },
  { month: "Sep", orders: 80 },
  { month: "Oct", orders: 85 },
  { month: "No", orders: 90 },
  { month: "Dec", orders: 100 },
];

const RecentOrderChart = () => {
  return (
    <div className="w-full h-[450px] dark:bg-darkCard bg-lightCard text-lightTitle dark:text-darkTitle  pt-3 pb-10 shadow-md pr-5 -pl-5 ">
      <h2 className="text-xl font-bold text-center mb-4">Recent Orders (Last 12 Months)</h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="orders"
            stroke="#1E40AF" // Blue line color
            fill="#1E40AF"  // Blue area fill color
            fillOpacity={0.3}  // Bottom area opacity
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RecentOrderChart;
