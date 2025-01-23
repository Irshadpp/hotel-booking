import axios from 'axios';
import { getAccessToken, refreshAccessToken } from './auth';

const API_URL = "http://localhost:4000/api/v1"

const apiClient = axios.create({
  baseURL: API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach the access token to headers
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    console.log(token, "---------------------------")
    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling refresh token logic
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken();
        const token = getAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return apiClient(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error('Failed to refresh token', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
