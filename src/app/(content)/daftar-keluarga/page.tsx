import FamilyTabs from "@/components/family-tabs";
import ListFamily from "@/components/list-family";
import SearchInput from "@/components/search-input";
import { Loader } from "lucide-react";
import { Suspense } from "react";

const DaftarPage = () => {
  return (
    <div className="mx-auto space-y-4">
      <h2 className="text-lg font-semibold">Daftar Keluarga</h2>
      <Suspense fallback={<Loader className="animate-spin size-8" />}>
        <div className="mb-6">
          <FamilyTabs />
        </div>
      </Suspense>
      <Suspense fallback={<Loader className="animate-spin size-8" />}>
        <SearchInput />
      </Suspense>
      <ListFamily />
    </div>
  );
};

export default DaftarPage;
