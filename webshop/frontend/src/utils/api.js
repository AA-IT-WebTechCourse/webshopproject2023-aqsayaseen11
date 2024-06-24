import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // Get the auth token from localStorage
    const token = JSON.parse(localStorage.getItem("authTokens"));

    // If the token exists, add it to the request's headers
    if (token) {
      config.headers.Authorization = `Bearer ${token.access}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
