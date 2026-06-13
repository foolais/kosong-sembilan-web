import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useAnalytic() {
  return useQuery({
    queryKey: ["analytic"],
    queryFn: async () => {
      const response = await api.get("/analytic");

      return response.data;
    },
  });
}
