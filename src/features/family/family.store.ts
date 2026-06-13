import { create } from "zustand";

export type IFamilyStatusIndo = "semua" | "penghuni-tetap" | "kos";

type IFamilyStore = {
  searchFamily: string;
  statusFamily: IFamilyStatusIndo;

  setSearchFamily: (search: string) => void;
  setStatusFamily: (status: IFamilyStatusIndo) => void;

  clearSearchFamily: () => void;
};

export const useFamilyStore = create<IFamilyStore>((set) => ({
  searchFamily: "",
  statusFamily: "semua",

  setSearchFamily: (searchFamily) => set({ searchFamily }),
  setStatusFamily: (statusFamily) => set({ statusFamily }),
  clearSearchFamily: () => set({ searchFamily: "" }),
}));
