// import apiClient from "./apiClient";
// import {


//   useMutation,

//   useQueryClient,
// } from "react-query";

//  const AddWord = () => {
//  // const queryClient = useQueryClient();

//   return useMutation({
//     mutationKey: "add_user_details",
//     mutationFn: async (data) => {
//       console.log(data);
//       try {
//         const response = await apiClient.post("/word", data);
//         return response.data;
//       } catch (error) {
//         throw error;
//       }
//     },
//     onSuccess: (data) => {

//      // queryClient.invalidateQueries(["get_all_users_and_search_users"]);
//     },
//     onError: (error) => {
//       console.error("Mutation error:", error);
//      console.log(error);
//     },
//   });
// };


// export default AddWord;

import { useMutation, useQueryClient, useQuery } from "react-query";
import apiClient from "./apiClient"; // Axios instance

 const AddWord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: "add_word", // Unique key for this mutation
    mutationFn: async (data) => {
      try {
        const response = await apiClient.post("/word", data, {
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

export default AddWord;

 





