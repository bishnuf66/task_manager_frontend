import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Login error:", error); // Log the error for debugging
    throw error;
  }
};

export const register = async (userName: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { userName, email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
