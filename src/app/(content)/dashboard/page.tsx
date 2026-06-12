import SearchInput from "@/components/search-input";
import WelcomingText from "@/components/welcoming-text";

const DashboardPage = () => {
  return (
    <div className="space-y-4">
      <WelcomingText />
      <SearchInput />
    </div>
  );
};

export default DashboardPage;
