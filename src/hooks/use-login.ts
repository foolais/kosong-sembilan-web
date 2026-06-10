import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

type LoginPayload = {
  email: string;
  password: string;
};

export function useLogin() {
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const response = await api.post("/auth/login", payload);

      return response.data;
    },
  });
}
