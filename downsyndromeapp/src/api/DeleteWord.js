import { useMutation, useQueryClient, useQuery } from "react-query";
import apiClient from "./apiClient"; // Axios instance

const DleteWord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: "add_word_Delete", // Unique key for this mutation
    mutationFn: async (data) => {
      try {
        const response = await apiClient.post("/word/deleteword", data); // POST to the /word endpoint
        return response.data;
      } catch (error) {
        throw error; // Handle errors as needed
      }
    },
    onSuccess: (data) => {
      console.log("Word added successfully", data);
     // queryClient.invalidateQueries(["All_add_word"]);
      // Optionally invalidate queries or update state
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });
};

export default DleteWord;
