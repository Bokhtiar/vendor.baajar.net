import BestSellers from "../../components/best-seller";
import Card from "../../components/card/Card";
import DashboardChart from "../../components/chart/Chart";
import TrafficCard from "../../components/traffic";

const Dashboard = () => {
  return (
    <div>
  <Card/>
      <DashboardChart/>
<div className="flex flex-row gap-5 my-5">
  <div className="w-1/2">
    <BestSellers />
  </div>
  <div className="w-1/2">
    <TrafficCard />
  </div>
</div>


    </div>
  );
};

export default Dashboard;
