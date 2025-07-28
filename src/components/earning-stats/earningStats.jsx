import React, { useEffect, useState } from "react";
import { networkErrorHandeller } from "../../utils/helpers";
import { NetworkServices } from "../../network";

const EarningStats = ({ setShowModal }) => {
  const [data, setData] = useState([]);

  const stats = [
    {
      label: "Total Earnings",
      value: data?.total_earning,
      color: "bg-gradient-to-r from-[#D623FE] to-[#A530F2]",
    },
    {
      label: "Total Withdrawal",
      value: data?.withdrawn,
      color: "bg-gradient-to-r from-[#FA6464] to-[#DC2626]",
    },
    {
      label: "Available Withdrawal",
      value: data?.available_to_withdraw,
      color: "bg-gradient-to-r from-[#6BAAFC] to-[#305FEC]",
      hasWithdrawButton: true,
    },
  ];

  const fetchData = async () => {
    // setLoading(true);
    try {
      const response = await NetworkServices.Earning.index();
      console.log("responeeeese", response);
      if (response?.status === 200) {
        setData(response?.data?.data);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    // setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-1 font-poppins sm:grid-cols-3 gap-4 w-full">
      {stats?.map((stat, index) => (
        <div
          key={index}
          className={`rounded-xl text-white  p-5 shadow-md ${stat?.color}`}
        >
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium">{stat.label}</p>
              <p className="text-5xl font-semibold">{stat.value}</p>
            </div>
            {stat.hasWithdrawButton && (
              <div className="mt-4">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-white text-blue-700 font-semibold px-4 py-2 rounded hover:bg-gray-200"
                >
                  Withdraw
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EarningStats;
