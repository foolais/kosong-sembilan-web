import ListFamily from "@/components/list-family";
import SearchInput from "@/components/search-input";

const DaftarPage = () => {
  return (
    <div className="mx-auto space-y-4">
      <h2 className="text-lg font-semibold">Daftar Keluarga</h2>
      <SearchInput />
      <ListFamily />
    </div>
  );
};

export default DaftarPage;
