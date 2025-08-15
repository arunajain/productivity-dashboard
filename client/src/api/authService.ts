import apiClient from "./apiClient";

export const registerUser = async (data: { name: string; email: string; password: string }) => {
  const res = await apiClient.post("/auth/register", data);
  return { status: res.status, data: res.data };
};

export const verifyEmail = async (data: { email: string; code: string }) => {
  const res = await apiClient.post("/auth/verify_email", data);
  return { status: res.status, data: res.data };
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await apiClient.post("/auth/login", data);
  return { status: res.status, data: res.data };
};