import { useMutation, useQueryClient, useQuery } from "react-query";
import apiClient from "./apiClient"; // Axios instance
const AllAddWord = (page, limit = 20, userme, pacticesword) => {
  return useQuery(
    ["All_add_word", page, limit, userme, pacticesword], // Unique key for this query (helps with caching and refetching)
    async () => {
      try {
        // Pass page and limit to your API for pagination
        const response = await apiClient.get(`/word/words`, {
          params: { page, limit, userme, pacticesword },
        });
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

export default AllAddWord;
