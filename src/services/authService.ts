import api from "./api";


// Login api
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};


//Register api
export const register = async (userName: string, email: string, password: string) => {
  try {
    const response = await api.post('/register', { userName, email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
