import { useCallback, useEffect, useState } from "react";
import BestSellers from "../../components/best-seller";
import Card from "../../components/card/Card";
import DashboardChart from "../../components/chart/Chart";
import TrafficCard from "../../components/traffic";
import { NetworkServices } from "../../network";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

 const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);

      const response = await NetworkServices.Dashboard.index();

      if (response?.status === 200 && response?.data?.data) {
        setData(response.data.data);
      } else {
        console.warn("Unexpected response:", response);
        setData(null);
      }

    } catch (error) {
      console.error("Fetch Dashboard Data Error:", error);
      // Optionally call networkErrorHandeller(error);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array ensures it's only created once
// console.log("Dashboard Data:", data);
  useEffect(() => {
    document.title = "Vendor | Dashboard";
    fetchDashboardData()
  }, [fetchDashboardData]);
  return (
    <div>
      <Card data={data}/>
      <DashboardChart />
      <div className="flex flex-col md:flex-row gap-5 my-5">
        <div className="md:w-1/2">
          <BestSellers />
        </div>
        <div className="md:w-1/2">
          <TrafficCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
