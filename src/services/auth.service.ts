import apiClient from "../lib/api/client";

const authService = {
  register: (data: { name: string; email: string; password: string }) =>
    apiClient.post("/auth/register", data),

  login: (data: { email: string; password: string }) =>
    apiClient.post("/auth/login", data),

  logout: () => apiClient.post("/auth/logout"),

  getProfile: () => apiClient.get("/auth/profile"),
};

export default authService;
