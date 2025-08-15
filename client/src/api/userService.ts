import apiClient from "./apiClient";

export const getCurrentUser = async (data: { name: string; email: string; password: string }) => {
  const res = await apiClient.post("/auth/me", data);
  return { status: res.status, data: res.data };
};