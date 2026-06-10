import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

type ILoginPayload = {
  email: string;
  password: string;
};

export function useLogin() {
  return useMutation({
    mutationFn: async (payload: ILoginPayload) => {
      const response = await api.post("/auth/login", payload);

      return response.data;
    },
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const response = await api.post("/auth/logout");

      return response.data;
    },
  });
}
