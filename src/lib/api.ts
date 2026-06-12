import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("ERROR STATUS:", error.response?.status);
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("TRY REFRESH");
      originalRequest._retry = true;

      try {
        const refresh = await axios.post(
          "/api/auth/refresh",
          {},
          {
            withCredentials: true,
          }
        );

        console.log("REFRESH SUCCESS", refresh.data);

        return api(originalRequest);
      } catch {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
