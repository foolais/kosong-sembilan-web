import { create } from "zustand";

type IFamilyStore = {
  searchFamily: string;
  setSearchFamily: (searchFamily: string) => void;
  clearSearchFamily: () => void;
};

export const useFamilyStore = create<IFamilyStore>((set) => ({
  searchFamily: "",
  setSearchFamily: (searchFamily) => set({ searchFamily }),
  clearSearchFamily: () => set({ searchFamily: "" }),
}));
