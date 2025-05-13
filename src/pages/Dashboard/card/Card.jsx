import {
  FaShoppingBag,
  FaDollarSign,
  FaFileInvoice,
  FaUsers,
} from "react-icons/fa";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const stats = [
  {
    title: "Total Sales",
    value: "34,945",
    percentage: "1.56%",
    icon: <FaShoppingBag className="text-white" />,
    color: "bg-green-500",
    textColor: "text-green-500",
    chartColor: "#22c55e",
    gradientColor: "rgba(34, 197, 94, 0.3)", // Green with opacity
    data: [
      { x: 1, y: 30 },
      { x: 2, y: 80 },
      { x: 3, y: 35 },
      { x: 4, y: 100 },
      { x: 5, y: 45 },
      { x: 6, y: 120 },
      { x: 7, y: 50 },
    ],
  },
  {
    title: "Total Income",
    value: "$37,802",
    percentage: "-1.56%",
    icon: <FaDollarSign className="text-white" />,
    color: "bg-orange-500",
    textColor: "text-red-500",
    chartColor: "#f97316",
    gradientColor: "rgba(249, 115, 22, 0.3)", // Orange with opacity
    data: [
      { x: 1, y: 30 },
      { x: 2, y: 80 },
      { x: 3, y: 35 },
      { x: 4, y: 100 },
      { x: 5, y: 45 },
      { x: 6, y: 120 },
      { x: 7, y: 50 },
    ],
  },
  {
    title: "Orders Paid",
    value: "34,945",
    percentage: "0.00%",
    icon: <FaFileInvoice className="text-white" />,
    color: "bg-gray-500",
    textColor: "text-gray-500",
    chartColor: "#6b7280",
    gradientColor: "rgba(107, 114, 128, 0.3)", // Gray with opacity
    data: [
      { x: 1, y: 30 },
      { x: 2, y: 80 },
      { x: 3, y: 35 },
      { x: 4, y: 100 },
      { x: 5, y: 45 },
      { x: 6, y: 120 },
      { x: 7, y: 50 },
    ],
  },
  {
    title: "Total Visitor",
    value: "34,945",
    percentage: "1.56%",
    icon: <FaUsers className="text-white" />,
    color: "bg-blue-500",
    textColor: "text-blue-500",
    chartColor: "#3b82f6",
    gradientColor: "rgba(59, 130, 246, 0.3)", // Blue with opacity
    data: [
      { x: 1, y: 30 },
      { x: 2, y: 80 },
      { x: 3, y: 35 },
      { x: 4, y: 100 },
      { x: 5, y: 45 },
      { x: 6, y: 120 },
      { x: 7, y: 50 },
    ],
  },
];

export default function Card() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      {stats.map((stat, index) => (
        <div
          key={index}
          className=" dark:bg-darkCard bg-lightCard shadow-md rounded-xl p-4 relative overflow-hidden"
        >
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <div className={`${stat.color} p-3 rounded-full`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-lightTitle dark:text-darkTitle text-sm">{stat.title}</p>
                <h2 className=" text-lightSecondary dark:text-darkSecondary text-xl font-semibold">{stat.value}</h2>
              </div>
            </div>
            <p className={`text-sm ${stat.textColor} font-medium ml-auto`}>
              {stat.percentage}
            </p>
          </div>

          {/* Area Chart with Blurred Bottom Effect */}
          <div className="w-full h-16 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stat.data}>
                <defs>
                  <linearGradient
                    id={`gradient-${index}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={stat.chartColor}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={stat.gradientColor}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="y"
                  stroke={stat.chartColor}
                  fill={`url(#gradient-${index})`}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
}
