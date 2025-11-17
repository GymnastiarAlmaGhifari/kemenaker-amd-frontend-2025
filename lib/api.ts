import axios from "axios";

const API_BASE = "https://dummyjson.com";

const client = axios.create({
  baseURL: API_BASE,
});

// Interceptor untuk menambahkan Authorization header
client.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
