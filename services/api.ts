import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://reqres.in/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("venuze-auth");
      if (stored) {
        try {
          const { state } = JSON.parse(stored);
          if (state?.user?.token) {
            config.headers.Authorization = `Bearer ${state.user.token}`;
          }
        } catch {
          // ignore parse errors
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message =
        error.response.data?.error ||
        error.response.data?.message ||
        "An unexpected error occurred";

      const formattedError = {
        status: error.response.status,
        message,
        data: error.response.data,
      };

      return Promise.reject(formattedError);
    }

    if (error.request) {
      return Promise.reject({
        status: 0,
        message: "Network error. Please check your connection.",
      });
    }

    return Promise.reject({
      status: 0,
      message: "An unexpected error occurred.",
    });
  }
);

export default apiClient;
