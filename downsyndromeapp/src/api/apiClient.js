import axios from "axios";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/bs`, // default to localhost if the env variable is not set
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor to add Authorization Token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      // If token is found, attach it to Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Optional: Response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => response, // Simply return the response if no issues
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle Unauthorized error, e.g., redirect to login or clear the token
      localStorage.removeItem("token");
      // You can also redirect to the login page here
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
