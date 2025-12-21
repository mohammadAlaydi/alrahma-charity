import axios from "axios";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Placeholder interceptors: wire tokens / refresh / logging here later
http.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
