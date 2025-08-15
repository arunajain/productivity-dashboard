import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Example: redirect to login if unauthorized
      window.location.href = "/login";
    }
    if(error.response?.status === 400 || error.response?.status === 404 || error.response?.status === 422 || error.response?.status === 401){
        const serverMsg = error.response?.data?.msg || "Something went wrong";
        return Promise.reject({ ...error, message: serverMsg });
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;