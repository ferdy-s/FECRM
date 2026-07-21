import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  console.log("INTERCEPTOR");
  console.log(config.baseURL);
  console.log(config.url);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("fecrm_token")
      : null;

  console.log("TOKEN =", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});