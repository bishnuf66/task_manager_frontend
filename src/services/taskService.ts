import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL

// Fetch all tasks
export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


interface TaskUpdatePayload {
  title?: string;
  description?: string;
  priority?: string;
  startDate?: string;
  dueDate?: string;
  isCompleted?: boolean;
}
// Create a new task
export const createTask = async (title: string, description: string ,startDate:string, dueDate:string, priority:string,) => {

  try {
    const response = await axios.post(`${API_URL}/tasks`, { title, description, startDate,
      dueDate,
      priority, });
    return response.data;
  } catch (error) {
    throw error;
  }
};

interface TaskUpdatePayload {
  title?: string;
  description?: string;
  priority?: string;
  startDate?: string;
  dueDate?: string;
  isCompleted?: boolean;
}

// Update a task
export const updateTask = async (
  taskId: string,
  updatedFields: TaskUpdatePayload
) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${taskId}`, updatedFields);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Delete a task
export const deleteTask = async (taskId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


