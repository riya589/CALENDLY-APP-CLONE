import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api"
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      const url = apiClient.defaults.baseURL || "unknown API endpoint";
      return Promise.reject(
        new Error(
          `Network Error: Could not reach ${url}. Make sure backend is running and CORS is configured for your frontend origin.`
        )
      );
    }

    const message =
      error.response.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";

    return Promise.reject(new Error(message));
  }
);
