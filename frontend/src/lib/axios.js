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

// Add response interceptor to handle errors better
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If we get a 404 "User not found" error and haven't retried yet
    if (
      error.response?.status === 404 && 
      error.response?.data?.message?.includes("User not found") &&
      !originalRequest._retry
    ) {
      console.error("User not synced to database. Attempting to sync...");
      originalRequest._retry = true;
      
      try {
        // Try to sync the user
        await axiosInstance.post("/auth/sync");
        console.log("✅ User synced successfully, retrying original request");
        
        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (syncError) {
        console.error("Failed to sync user:", syncError);
        // If sync fails, let the original error propagate
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
