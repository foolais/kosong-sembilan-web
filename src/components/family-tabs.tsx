"use client";

import {
  IFamilyStatusIndo,
  useFamilyStore,
} from "@/features/family/family.store";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const FamilyTabs = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const statusFromUrl = searchParams.get("status") || "semua";
  const setStatusFamily = useFamilyStore((state) => state.setStatusFamily);

  useEffect(() => {
    setStatusFamily(statusFromUrl as IFamilyStatusIndo);
  }, [searchParams, setStatusFamily, statusFromUrl]);

  const handleChange = (value: string) => {
    try {
      setStatusFamily(value as IFamilyStatusIndo);
      const params = new URLSearchParams(searchParams.toString());

      if (value === "semua") {
        params.delete("status");
      } else {
        params.set("status", value);
      }

      params.delete("halaman");

      const query = params.toString();

      router.replace(query ? `/daftar-keluarga?${query}` : "/daftar-keluarga");
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan pada tabs");
    }
  };

  return (
    <Tabs className="w-full" value={statusFromUrl} onValueChange={handleChange}>
      <TabsList className="w-full">
        <TabsTrigger
          value="semua"
          className="data-[state=active]:bg-muted-foreground data-[state=active]:text-white"
        >
          Semua
        </TabsTrigger>
        <TabsTrigger
          value="penghuni-tetap"
          className="data-[state=active]:bg-primary"
        >
          Warga
        </TabsTrigger>
        <TabsTrigger value="kos" className="data-[state=active]:bg-secondary">
          Kos
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default FamilyTabs;
