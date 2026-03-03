import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LIVE_BASE_URL,
  // baseURL: process.env.NEXT_PUBLIC_LOCAL_TWO_BASE_URL,
  withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 && !originalRequest._retry) ||
      error.response.data.message === "User not found"
    ) {
      originalRequest._retry = true;
      const isInvalidTokenError = error.response.status === 401;
      const isUserNotFoundError =
        error.response.data.message === "User not found";
      // if (isInvalidTokenError || isUserNotFoundError) {
      //   localStorage.clear();
      //   window.location.href = "/login";
      //   toast.error("Please Login again", {
      //     position: toast.POSITION.TOP_CENTER,
      //   });
      // }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
