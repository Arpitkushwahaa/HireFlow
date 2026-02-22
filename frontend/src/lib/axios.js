import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // by adding this field browser will send the cookies to server automatically, on every single req
});

// Add Clerk authentication token to all requests
axiosInstance.interceptors.request.use(
  async (config) => {
    // Try to get the Clerk session token if available
    try {
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn("No Clerk token available for request:", config.url);
      }
    } catch (error) {
      console.error("Could not get auth token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error messages
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Just log 404 errors without retrying to avoid infinite loops
    if (error.response?.status === 404) {
      const url = error.config?.url || 'unknown';
      console.error(`404 Error: ${url} not found`);
      
      if (error.response?.data?.message?.includes("User not found")) {
        console.error("User not found in database. Please ensure your account is synced.");
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
