import { useMutation, useQueryClient, useQuery } from "react-query";
 import apiClient from "./apiClient"; // Axios instance
import axios from "axios";
export const AddWord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: "add_word", // Unique key for this mutation
    mutationFn: async (data) => {
      try {
        const response = await apiClient.post(
          `/word`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set only for file upload requests
            },
          }
        ); // POST to the /word endpoint
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

export const AllAddWord = (page, limit = 20, userme, pacticesword) => {
  return useQuery(
    ["All_add_word", page, limit, userme, pacticesword], // Unique key for this query (helps with caching and refetching)
    async () => {
      try {
        // Pass page and limit to your API for pagination
        const response = await apiClient.get(
          `/word/words`,
          {
            params: { page, limit, userme, pacticesword },
          }
        );
        return response.data; // Return the fetched data
      } catch (error) {
        throw error; // Handle errors if the request fails
      }
    },
    {
      onSuccess: (data) => {
        console.log("Fetched words successfully", data);
        // Optionally process the data or update state here
      },
      onError: (error) => {
        console.error("Query error:", error); // Handle error
      },
    }
  );
};

// export default AddWord;
