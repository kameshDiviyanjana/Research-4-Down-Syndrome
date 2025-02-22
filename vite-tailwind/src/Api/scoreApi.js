import { useMutation, useQueryClient, useQuery } from "react-query";
import apiClient from "./apiClient"; // Axios instance

export const Addscore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: "add_score", // Unique key for this mutation
    mutationFn: async (data) => {
      try {
        const response = await apiClient.post(`/score`, data, {
          headers: {
            "Content-Type": "multipart/form-data", // Set only for file upload requests
          },
        });
        return response.data;
      } catch (ex) {
        throw ex;
      }
    },
    onSuccess: (data) => {
   
      queryClient.invalidateQueries(["All_add_score"]);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });
};

export const findscore = (id) => {
  return useQuery(
    ["All_add_score", id],
    async () => {
      try {
        const response = await apiClient.get(`/score/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: () => {
        onSuccess();
      },
      onError: (error) => {
        console.error("Query error:", error);
      },
    }
  );
};
