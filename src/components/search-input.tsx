"use client";

import { Search, X } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFamilyStore } from "@/features/family/family.store";
import { toast } from "sonner";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setSearchFamily = useFamilyStore((state) => state.setSearchFamily);
  const clearSearchFamily = useFamilyStore((state) => state.clearSearchFamily);

  const searchFromUrl = searchParams.get("cari") || "";
  const [inputValue, setInputValue] = useState(searchFromUrl);

  useEffect(() => {
    setSearchFamily(searchFromUrl);
  }, [searchParams, setSearchFamily, searchFromUrl]);

  const handleSearch = () => {
    try {
      if (inputValue.length < 3) {
        toast.info("Pencarian nama minimal 3 huruf");
        return;
      }
      setSearchFamily(inputValue);
      const params = new URLSearchParams(searchParams.toString());

      if (inputValue.trim()) {
        params.set("cari", inputValue.toLocaleLowerCase());
      } else {
        params.delete("cari");
      }

      params.delete("halaman");

      const query = params.toString();

      router.replace(query ? `/daftar-keluarga?${query}` : "/daftar-keluarga");
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan pada pencarian");
    }
  };

  const handleClear = () => {
    setInputValue("");
    clearSearchFamily();

    const params = new URLSearchParams(searchParams.toString());
    params.delete("halaman");
    params.delete("cari");

    const query = params.toString();

    router.replace(query ? `/daftar-keluarga?${query}` : "/daftar-keluarga");
  };

  return (
    <div className="flex items-center gap-2">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Cari Nama Disini..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        {inputValue.length > 0 && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton className="cursor-pointer" onClick={handleClear}>
              <X />
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
      <Button
        onClick={handleSearch}
        className="px-4 cursor-pointer"
        disabled={inputValue.length === 0}
      >
        Cari
      </Button>
    </div>
  );
};

export default SearchInput;
