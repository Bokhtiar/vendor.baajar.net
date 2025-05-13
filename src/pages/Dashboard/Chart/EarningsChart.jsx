import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Jan', Revenue: 12000, Profit: 9000 },
  { name: 'Feb', Revenue: 15000, Profit: 11000 },
  { name: 'Mar', Revenue: 7000, Profit: 5000 },
  { name: 'Apr', Revenue: 11000, Profit: 8500 },
  { name: 'May', Revenue: 16000, Profit: 12500 },
  { name: 'Jun', Revenue: 14000, Profit: 11000 },
  { name: 'Jul', Revenue: 5000, Profit: 4000 },
  { name: 'Aug', Revenue: 10000, Profit: 7500 },
];

export default function EarningsChart() {
  return (
    <div className="h-[450px] p-3 shadow-md rounded-md dark:bg-darkCard bg-lightCard text-lightTitle dark:text-darkTitle">
      <h2 className="text-lg font-semibold mb-2">Earnings</h2>
      <div className="flex justify-between items-center ">
        <div>
          <span className="text-sm text-gray-500">Revenue</span>
          <h3 className="text-xl font-bold">$37,802</h3>
          <span className="text-green-500 text-sm">▲ 0.56%</span>
        </div>
        <div>
          <span className="text-sm text-gray-500">Profit</span>
          <h3 className="text-xl font-bold">$28,305</h3>
          <span className="text-green-500 text-sm">▲ 0.56%</span>
        </div>
      </div>

      {/* Earnings Bar Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Revenue" fill="#3b82f6" />
          <Bar dataKey="Profit" fill="#93c5fd" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
