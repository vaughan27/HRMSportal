import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attaches the admin token to every request if the user is logged in.
// Public pages (lead enquiry form, locations/salesmen search) ignore this
// header entirely on the backend, so it's harmless when absent or unused.
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("hrms_admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
