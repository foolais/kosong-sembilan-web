import { create } from "zustand";
type IUser = {
  id: string;
  name: string;
  email: string;
};

type IAuthStore = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  clearUser: () => void;
};

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
