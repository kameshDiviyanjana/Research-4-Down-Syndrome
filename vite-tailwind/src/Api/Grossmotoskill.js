import { useMutation, useQueryClient, useQuery } from "react-query";
import apiClient from "./apiClient"; // Axios instance
import axios from "axios";
export const CompareVedio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: "add_word", // Unique key for this mutation
    mutationFn: async (data) => {
      try {
        const response = await apiClient.post(`/word`, data, {
          headers: {
            "Content-Type": "multipart/form-data", // Set only for file upload requests
          },
        }); // POST to the /word endpoint
        return response.data;
      } catch (error) {
        throw error; // Handle errors as needed
      }
    },
    onSuccess: (data) => {
      console.log("Word added successfully", data);
      queryClient.invalidateQueries(["All_add_word"]);
      // Optionally invalidate queries or update state
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });
};
