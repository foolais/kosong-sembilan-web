import AnalyticCard from "@/components/analytic-card";
import SearchInput from "@/components/search-input";
import WelcomingText from "@/components/welcoming-text";
import { Loader } from "lucide-react";
import { Suspense } from "react";

const DashboardPage = () => {
  return (
    <div className="space-y-4">
      <WelcomingText />
      <Suspense fallback={<Loader className="animate-spin size-8" />}>
        <SearchInput />
      </Suspense>
      <div className="space-y-2">
        <h3 className="font-semibold">Statistik</h3>
        <AnalyticCard />
      </div>
    </div>
  );
};

export default DashboardPage;
