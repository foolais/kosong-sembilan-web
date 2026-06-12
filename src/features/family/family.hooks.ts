import api from "@/lib/api";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { IFamilyFormValues } from "./family.schema";

type IGetFamiliesParams = {
  search?: string;
};

export function useFamilies(params?: IGetFamiliesParams) {
  return useInfiniteQuery({
    queryKey: ["families", params],
    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const response = await api.get("/families", {
        params: {
          ...(params?.search && { cari: params.search }),
          ...(pageParam > 1 && { halaman: pageParam }),
        },
      });

      return response.data;
    },

    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasNextPage
        ? lastPage.pagination.page + 1
        : undefined;
    },
  });
}

export function useFamily(id: string) {
  return useQuery({
    queryKey: ["family", id],
    queryFn: async () => {
      const response = await api.get(`/families/${id}`);

      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateFamily() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: IFamilyFormValues) => {
      const response = await api.post("/families", payload);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["families"],
      });
    },
  });
}

export function useUpdateFamily() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: IFamilyFormValues;
    }) => {
      const response = await api.put(`/families/${id}`, payload);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["families"],
      });
    },
  });
}

export function useDeleteFamily() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/families/${id}`);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["families"],
      });
    },
  });
}
