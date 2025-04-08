// utils/axiosInstance.ts
import axios from 'axios';
import { getCookie } from '../utils/cookieutil';
const API_URL = import.meta.env.VITE_API_URL;  

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = getCookie('token');  
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
