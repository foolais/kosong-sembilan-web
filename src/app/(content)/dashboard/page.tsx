import AnalyticCard from "@/components/analytic-card";
import SearchInput from "@/components/search-input";
import WelcomingText from "@/components/welcoming-text";

const DashboardPage = () => {
  return (
    <div className="space-y-4">
      <WelcomingText />
      <SearchInput />
      <div className="space-y-2">
        <h3 className="font-semibold">Statistik</h3>
        <AnalyticCard />
      </div>
    </div>
  );
};

export default DashboardPage;
