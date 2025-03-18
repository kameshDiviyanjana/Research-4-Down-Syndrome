import { useMutation, useQueryClient, useQuery } from "react-query";
import apiClient from "./apiClient";

export const AddWord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: "add_word", 
    mutationFn: async (data) => {
      try {
        const response = await apiClient.post(`/word`, data, {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }); 
        return response.data;
      } catch (ex) {
        throw ex; 
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["All_add_word"]);
     
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });
};

export const AllAddWord = (page, limit = 20, userme, pacticesword) => {
  return useQuery(
    ["All_add_word", page, limit, userme, pacticesword], 
    async () => {
      try {
       
        const response = await apiClient.get(
          `/word/words`,
          {
            params: { page, limit, userme, pacticesword },
          }
        );
        return response.data; 
      } catch (error) {
        throw error; 
      }
    },
    {
      onSuccess: () => {
    
      
      },
      onError: (error) => {
        console.error("Query error:", error); 
      },
    }
  );
};


export const findword = (id) => {
  return useQuery(
    ["All_add_word", id],
    async () => {
      try {
       
        const response = await apiClient.get(`/word/${id}`);
        return response.data; 
      } catch (error) {
        throw error; 
      }
    },
    {
      onSuccess: (data) => {
      
      },
      onError: (error) => {
        console.error("Query error:", error); 
      },
    }
  );
};
export const AddSpeechResults = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: "add__speech",
    mutationFn: async (data) => {
      console.log("📢 Sending Data:", data); // Debugging

      try {
        const response = await apiClient.post(`/speech/add`, data, {
          headers: {
            "Content-Type": "application/json", // ✅ Fix: Use JSON
          },
        });
        return response.data;
      } catch (ex) {
        console.error("❌ API Error:", ex.response?.data || ex.message);
        throw ex;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["All_add_word"]);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });
};


export const Allresults = ( id) => {
  return useQuery(
    ["All_add_results", id],
    async () => {
      try {
        const response = await apiClient.get(`/speech/avlable`, {
          params: { id },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: () => {},
      onError: (error) => {
        console.error("Query error:", error);
      },
    }
  );
};


export const lastresults = (id) => {
  return useQuery(
    ["All_lat_results", id],
    async () => {
      try {
        const response = await apiClient.get(`/speech/last-results`, {
          params: { id },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: () => {},
      onError: (error) => {
        console.error("Query error:", error);
      },
    }
  );
};

